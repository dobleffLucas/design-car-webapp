import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { whatsappMessages } from "@/lib/whatsapp";
import { BrandLogos } from "@/components/site/brand-logos";
import { CategoryIcon } from "@/components/site/category-icon";
import { CtaBand } from "@/components/site/cta-band";
import { MediaFrame } from "@/components/site/media-frame";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteLayout } from "@/components/site/site-layout";
import { VehicleChips } from "@/components/site/vehicle-chips";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

/**
 * Full catalog: every category with its product count, plus the vehicle filter
 * so the visitor can narrow the whole store in one tap.
 */
const CatalogPage = () => {
  const { vehicle, vehicleSlug, setVehicle } = useVehicle();

  const totalForVehicle = vehicle
    ? categories.reduce((acc, category) => {
        const count = productsByCategory(category.slug).filter((product) =>
          product.vehicles.includes(vehicle.slug),
        ).length;
        return acc + count;
      }, 0)
    : null;

  return (
    <>
      <PageHero
        breadcrumbs={<PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Productos" }]} />}
        eyebrow="Catálogo"
        title={vehicle ? `Productos para tu ${vehicle.name}` : "Productos para pickups y 4x4"}
        description={
          vehicle
            ? `Mostramos ${totalForVehicle} accesorios confirmados para ${vehicle.name} (${vehicle.years}). Consultanos por precio, disponibilidad y turno de instalación.`
            : "Barras antivuelco, estribos, lonas y cobertores, portaequipajes, deflectores y equipamiento de camping. Todo con asesoramiento e instalación propia."
        }
        chips={
          <div className="flex flex-col gap-sm pt-sm">
            <p className="text-label text-muted-foreground">Filtrar por vehículo</p>
            <VehicleChips selected={vehicleSlug} onSelect={setVehicle} allowClear />
          </div>
        }
        actions={
          <WhatsAppButton
            message={whatsappMessages.vehicle(vehicle?.name)}
            label="Consultar por WhatsApp"
            variant="whatsapp"
            size="lg"
          />
        }
      />

      <section aria-labelledby="catalogo-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow={`${categories.length} categorías`}
            title="Elegí por dónde empezar"
            description="Cada categoría tiene su página con los productos, la compatibilidad por modelo y las opciones de instalación."
            id="catalogo-title"
          />
        </Reveal>

        <ul role="list" className="grid gap-lg pt-lg md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const all = productsByCategory(category.slug);
            const compatible = vehicle
              ? all.filter((product) => product.vehicles.includes(vehicle.slug))
              : all;

            return (
              <li key={category.slug}>
                <Reveal delay={index * 60} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
                    <MediaFrame
                      media={category.media}
                      ratio="aspect-[16/10]"
                      className="rounded-none"
                      showTag={false}
                      imageClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    />
                    <div className="flex flex-1 flex-col gap-sm p-lg">
                      <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                        <CategoryIcon name={category.icon} className="h-3.5 w-3.5 text-primary" />
                        {vehicle
                          ? `${compatible.length} compatibles con tu ${vehicle.shortName}`
                          : `${all.length} productos`}
                      </p>
                      <h3 className="text-headline-s">
                        <Link
                          to={`/productos/${category.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                        >
                          {category.name}
                        </Link>
                      </h3>
                      <p className="text-body-s text-muted-foreground">{category.longDescription}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-sm text-label text-primary">
                        Ver categoría
                        <ArrowRight className="h-4 w-4 transition-transform duration-base group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="marcas-title" className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page flex flex-col gap-lg">
          <Reveal>
            <SectionHeading
              eyebrow="Compatibility"
              title="Trabajamos con las camionetas más usadas del país"
              description="Amarok, Hilux, Ranger, S10, Toro y otras pickups y utilitarios. Si no ves tu modelo, preguntanos: conseguimos por pedido."
              id="marcas-title"
            />
          </Reveal>
          <Reveal delay={60}>
            <BrandLogos />
          </Reveal>
        </div>
      </section>

      <div className="container-page section-y">
        <Reveal>
          <CtaBand
            title="¿No sabés qué le queda a tu camioneta?"
            description="Escribinos con el modelo y el año. Te confirmamos compatibilidad, precio y disponibilidad sin compromiso."
            message={whatsappMessages.vehicle(vehicle?.name)}
          />
        </Reveal>
      </div>
    </>
  );
};

const ProductosPage = () => (
  <SiteLayout>
    <CatalogPage />
  </SiteLayout>
);

export default ProductosPage;
