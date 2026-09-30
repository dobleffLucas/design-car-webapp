import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { productsByVehicle } from "@/data/products";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { BrandLogos } from "@/components/site/brand-logos";
import { CtaBand } from "@/components/site/cta-band";
import { MediaFrame } from "@/components/site/media-frame";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SiteLayout } from "@/components/site/site-layout";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

/** Hub for the vehicle-first flow: the entry point most pickup owners use. */
const VehiclesPage = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Por vehículo" }]} />
        }
        eyebrow="Por vehículo"
        title="Elegí tu camioneta"
        description="Trabajamos por modelo y año: así te mostramos solo los accesorios que le quedan bien y te confirmamos la compatibilidad antes de comprar."
        actions={
          <WhatsAppButton
            message={whatsappMessages.vehicle(vehicle?.name)}
            label="Consultar por mi camioneta"
            variant="whatsapp"
            size="lg"
          />
        }
      />

      <section aria-labelledby="vehiculos-title" className="container-page section-y">
        <h2 id="vehiculos-title" className="sr-only">
          Modelos disponibles
        </h2>
        <ul role="list" className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((item, index) => (
            <li key={item.slug}>
              <Reveal delay={index * 60} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
                  <MediaFrame
                    media={item.media}
                    ratio="aspect-[4/3]"
                    className="rounded-none"
                    showTag={false}
                    imageClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                  />
                  <div className="flex flex-1 flex-col gap-sm p-lg">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                      {item.brand} · {item.years}
                    </p>
                    <h3 className="text-headline-s">
                      <Link
                        to={`/vehiculos/${item.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-body-s text-muted-foreground">{item.tagline}</p>
                    <p className="text-[0.8125rem] text-muted-foreground">
                      {productsByVehicle(item.slug).length} accesorios compatibles
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-sm text-label text-primary">
                      Ver accesorios
                      <ArrowRight className="h-4 w-4 transition-transform duration-base group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="marcas-vehiculos-title" className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page flex flex-col gap-lg">
          <h2 id="marcas-vehiculos-title" className="max-w-[26ch] text-display-s">
            También equipamos otras pickups y utilitarios
          </h2>
          <p className="max-w-prose text-body-l text-muted-foreground">
            Saveiro, Oroch, Frontier, L200, RAM y más. Si tu modelo no está en la lista, escribinos:
            lo conseguimos por pedido.
          </p>
          <BrandLogos />
        </div>
      </section>

      <div className="container-page section-y">
        <CtaBand
          title="Decinos qué camioneta tenés y te armamos la propuesta"
          description="Te recomendamos por uso real: trabajo, familia, viaje o 4x4. Sin venderte lo que no necesitás."
          message={whatsappMessages.vehicle(vehicle?.name)}
        />
      </div>
    </>
  );
};

const VehiculosPage = () => (
  <SiteLayout>
    <VehiclesPage />
  </SiteLayout>
);

export default VehiculosPage;
