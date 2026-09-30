import { useState } from "react";
import { useParams } from "react-router-dom";

import { categoryBySlug } from "@/data/categories";
import { productTypes, productsByCategory } from "@/data/products";
import { whatsappMessages } from "@/lib/whatsapp";
import { CategoryFilters } from "@/components/site/category-filters";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { ProductGrid } from "@/components/site/product-grid";
import { SiteLayout } from "@/components/site/site-layout";
import { VehicleChips } from "@/components/site/vehicle-chips";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useFilteredProducts } from "@/hooks/use-filtered-products";
import { useVehicle } from "@/hooks/use-vehicle";
import { NotFoundContent } from "@/pages/NotFound";

/**
 * Category listing. Filters by the site-wide vehicle plus a product type, with
 * a real empty state when the combination has no results.
 */
const CategoryPage = () => {
  const { categoria } = useParams();
  const category = categoryBySlug(categoria);
  const { vehicle, vehicleSlug, setVehicle } = useVehicle();
  const [type, setType] = useState<string | null>(null);

  const types = category ? productTypes(category.slug) : [];
  const activeType = type && types.includes(type) ? type : null;

  const products = useFilteredProducts({
    categorySlug: category?.slug,
    vehicleSlug,
    type: activeType,
  });

  if (!category) {
    return (
      <NotFoundContent
        title="No encontramos esa categoría"
        description="Puede que el enlace haya cambiado. Mirá todas las categorías disponibles en el catálogo."
      />
    );
  }

  const all = productsByCategory(category.slug);
  const hasFilters = Boolean(vehicleSlug || activeType);
  const compatibleCount = vehicle
    ? all.filter((product) => product.vehicles.includes(vehicle.slug)).length
    : all.length;

  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            items={[
              { label: "Inicio", to: "/" },
              { label: "Productos", to: "/productos" },
              { label: category.name },
            ]}
          />
        }
        eyebrow={vehicle ? `${compatibleCount} productos para tu ${vehicle.shortName}` : `${all.length} productos`}
        title={vehicle ? `${category.name} para ${vehicle.name}` : category.name}
        description={category.longDescription}
        media={category.media}
        mediaRatio="aspect-[16/10]"
        actions={
          <WhatsAppButton
            message={whatsappMessages.category(category.name, vehicle?.name)}
            label="Consultar por WhatsApp"
            shortLabel="Consultar"
            variant="whatsapp"
            size="lg"
          />
        }
      />

      <section aria-labelledby="filtros-title" className="border-b border-border bg-surface-sunken py-xl">
        <div className="container-page flex flex-col gap-lg">
          <h2 id="filtros-title" className="text-headline-s">
            Filtrar productos
          </h2>
          <CategoryFilters
            types={types}
            activeType={activeType}
            onTypeChange={setType}
          />
        </div>
      </section>

      <section aria-labelledby="grilla-title" className="container-page section-y">
        <h2 id="grilla-title" className="pb-lg text-headline-l">
          {vehicle ? `${category.name} para ${vehicle.name}` : `Todo en ${category.name}`}
        </h2>

        <ProductGrid
          products={products}
          scopeLabel={category.name.toLowerCase()}
          hasFilters={hasFilters}
          onClearFilters={() => {
            setType(null);
            setVehicle(null);
          }}
        />
      </section>

      <section className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page flex flex-col gap-lg">
          <h2 className="max-w-[24ch] text-display-s">
            Elegí tu camioneta y confirmamos la compatibilidad
          </h2>
          <p className="max-w-prose text-body-l text-muted-foreground">
            Cada modelo tiene sus medidas. Seleccioná el tuyo y la lista se acomoda sola.
          </p>
          <VehicleChips selected={vehicleSlug} onSelect={setVehicle} allowClear />
        </div>
      </section>

      <div className="container-page section-y">
        <CtaBand
          title="¿No encontrás lo que buscás? Te asesoramos."
          description={`Contanos qué necesitás para tu camioneta y te decimos si lo tenemos, si va con adaptación o si lo conseguimos por pedido.`}
          message={whatsappMessages.category(category.name, vehicle?.name)}
        />
      </div>
    </div>
  );
};

const CategoriaPage = () => (
  <SiteLayout>
    <CategoryPage />
  </SiteLayout>
);

export default CategoriaPage;
