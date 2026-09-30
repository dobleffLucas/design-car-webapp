import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { categories } from "@/data/categories";
import { categoryCountByVehicle, productsByVehicle } from "@/data/products";
import { vehicleBySlug } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/site/category-icon";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { ProductGrid } from "@/components/site/product-grid";
import { Reveal } from "@/components/site/reveal";
import { SiteLayout } from "@/components/site/site-layout";
import { VehicleChips } from "@/components/site/vehicle-chips";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";
import { NotFoundContent } from "@/pages/NotFound";

/**
 * Reusable vehicle template. Same component serves Amarok, Hilux, Ranger, S10,
 * Toro and "otros modelos" — everything below is derived from the route slug.
 */
const VehiclePage = () => {
  const { vehiculo } = useParams();
  const vehicle = vehicleBySlug(vehiculo);
  const { setVehicle } = useVehicle();
  const navigate = useNavigate();

  // Landing on a vehicle page selects that vehicle for the whole site, so the
  // header chip, the listings and the WhatsApp messages stay in sync.
  useEffect(() => {
    if (vehicle) setVehicle(vehicle.slug);
  }, [vehicle, setVehicle]);

  if (!vehicle) {
    return (
      <NotFoundContent
        title="No encontramos ese modelo"
        description="Mirá los modelos que equipamos o escribinos con el tuyo: conseguimos accesorios por pedido."
      />
    );
  }

  const products = productsByVehicle(vehicle.slug);
  const counts = categoryCountByVehicle(vehicle.slug);

  return (
    <>
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            items={[
              { label: "Inicio", to: "/" },
              { label: "Por vehículo", to: "/vehiculos" },
              { label: vehicle.name },
            ]}
          />
        }
        eyebrow={`${vehicle.brand} · ${vehicle.years}`}
        title={`Accesorios para ${vehicle.name}`}
        description={vehicle.description}
        chips={
          <div className="flex flex-col gap-sm pt-sm">
            <p className="text-label text-muted-foreground">
              {products.length} accesorios compatibles con tu {vehicle.shortName}
            </p>
            <VehicleChips
              selected={vehicle.slug}
              onSelect={(slug) => {
                if (slug && slug !== vehicle.slug) navigate(`/vehiculos/${slug}`);
                if (!slug) navigate("/vehiculos");
              }}
              ariaLabel="Cambiar de modelo"
            />
          </div>
        }
        actions={
          <WhatsAppButton
            message={whatsappMessages.vehicle(vehicle.name)}
            label="Asesorarme para mi camioneta"
            shortLabel="Asesorarme"
            variant="whatsapp"
            size="lg"
          />
        }
        media={vehicle.media}
        mediaRatio="aspect-[4/3]"
      />

      <section aria-labelledby="atajos-title" className="border-b border-border bg-surface-sunken py-xl">
        <div className="container-page flex flex-col gap-lg">
          <h2 id="atajos-title" className="text-headline-s">
            Atajos por categoría
          </h2>
          <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = counts[category.slug] ?? 0;
              return (
                <li key={category.slug}>
                  <Link
                    to={`/productos/${category.slug}?vehiculo=${vehicle.slug}`}
                    className="flex h-full items-center justify-between gap-md rounded-lg border border-border bg-card p-md shadow-xs transition-[border-color,box-shadow] duration-base hover:border-border-strong hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span className="flex items-center gap-2.5">
                      <CategoryIcon name={category.icon} className="text-primary" />
                      <span className="font-display text-body-l font-semibold">{category.name}</span>
                    </span>
                    <span className="shrink-0 text-[0.8125rem] text-muted-foreground">
                      {count} {count === 1 ? "producto" : "productos"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compatibles-title" className="container-page section-y">
        <Reveal>
          <div className="flex flex-col gap-sm pb-lg">
            <p className="eyebrow">Compatibles</p>
            <h2 id="compatibles-title" className="text-display-s">
              Productos para {vehicle.name}
            </h2>
            <p className="max-w-prose text-body-l text-muted-foreground">
              Todo lo que ves acá está confirmado para {vehicle.name} ({vehicle.years}). Consultanos
              por precio, disponibilidad y turno de instalación.
            </p>
          </div>
        </Reveal>
        <ProductGrid
          products={products}
          scopeLabel={`accesorios para ${vehicle.name}`}
          hasFilters={false}
        />
      </section>

      <section className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page flex flex-col items-start gap-md">
          <h2 className="max-w-[26ch] text-display-s">
            ¿No encontrás lo que buscás? Te asesoramos.
          </h2>
          <p className="max-w-prose text-body-l text-muted-foreground">
            Decinos cómo usás tu {vehicle.shortName} y te recomendamos qué conviene poner primero.
            También conseguimos accesorios por pedido.
          </p>
          <div className="flex flex-wrap gap-sm pt-sm">
            <WhatsAppButton
              message={whatsappMessages.vehicle(vehicle.name)}
              label={`Consultar por ${vehicle.shortName}`}
              variant="whatsapp"
              size="lg"
            />
            <Button asChild variant="outline" size="lg">
              <Link to={`/contacto?vehiculo=${vehicle.slug}`}>
                Enviar consulta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container-page section-y">
        <CtaBand
          title={`Instalamos todo para tu ${vehicle.shortName} en el día`}
          description="Con turno previo en Warnes o San Isidro. Traés la camioneta y la retirás equipada y probada."
          message={whatsappMessages.installation(undefined, vehicle.name)}
          secondaryLabel="Ver instalación"
          secondaryTo="/instalacion"
        />
      </div>
    </>
  );
};

const VehiculoPage = () => (
  <SiteLayout>
    <VehiclePage />
  </SiteLayout>
);

export default VehiculoPage;
