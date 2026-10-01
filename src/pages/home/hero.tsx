import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaFrame } from "@/components/site/media-frame";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

/**
 * Home hero. Carries the two primary conversion actions and puts the vehicle
 * selector in the first screen, because "which pickup do you have?" is the
 * question every conversation with Design Car starts with.
 */
export const Hero = () => {
  const { vehicle } = useVehicle();

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary-subtle blur-3xl"
      />
      <div className="container-page relative grid items-center gap-xl py-xl lg:grid-cols-[1.05fr_0.95fr] lg:py-section">
        <div className="flex flex-col gap-lg">
          <p className="eyebrow">EQUIPAMIENTO PARA PICKUPS Y 4X4</p>

          <h1 className="max-w-[20ch] text-display-l">
            Equipá tu camioneta para lo que viene
          </h1>

          <p className="max-w-prose text-body-l text-muted-foreground">
            Accesorios, asesoramiento e instalación para pickups y 4x4. Te confirmamos compatibilidad
            antes de comprar.
          </p>

          <div className="flex flex-col gap-sm sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link to="/vehiculos">
                Ver productos para mi vehículo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <WhatsAppButton
              message={whatsappMessages.vehicle(vehicle?.name)}
              label="Hablar con un asesor"
              variant="whatsappSoft"
              size="lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-lg gap-y-sm pt-sm text-[0.8125rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-whatsapp" aria-hidden="true" strokeWidth={1.8} />
              Respondemos consultas en el día
            </span>
            <span>Dos sucursales: Warnes (CABA) y San Isidro</span>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <MediaFrame
            media={{
              src: "/assets/designcar/barras.jpg",
              alt: "Camioneta equipada con barra antivuelco en el taller de Design Car",
              placeholderLabel: "Foto: pickup equipada con barra antivuelco — 16:10",
              ratio: "aspect-[16/10]",
            }}
            ratio="aspect-[16/10]"
            className="rounded-xl shadow-lg"
            sizes="(max-width: 1024px) 100vw, 620px"
          />
          <div className="flex flex-wrap items-center gap-sm">
            <Badge variant="instalacion">Instalación profesional</Badge>
            <Badge variant="nuevo">Compatibilidad confirmada</Badge>
            <span className="text-[0.8125rem] text-muted-foreground">
              Taller propio en Warnes y San Isidro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Vehicle selector band, immediately under the hero. */
export const VehicleSelectorSection = () => {
  const { vehicleSlug, setVehicle, vehicle } = useVehicle();

  return (
    <section aria-labelledby="selector-title" className="border-b border-border bg-surface-sunken">
      <div className="container-page flex flex-col gap-lg py-xl">
        <div className="flex flex-col gap-sm">
          <p className="eyebrow">Elegí para empezar</p>
          <h2 id="selector-title" className="text-headline-l">
            ¿Qué camioneta tenés?
          </h2>
          <p className="max-w-prose text-body-s text-muted-foreground">
            Te mostramos accesorios compatibles y enriquecemos tu consulta de WhatsApp con el modelo elegido.
          </p>
        </div>

        <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((item) => {
            const selected = vehicleSlug === item.slug;
            return (
              <li key={item.slug}>
                  <article
                    className={
                      selected
                        ? "group relative flex h-full min-h-64 flex-col overflow-hidden rounded-lg border-2 border-primary bg-card shadow-md"
                        : "group relative flex h-full min-h-64 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[border-color,box-shadow,transform] duration-base hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
                    }
                  >
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setVehicle(selected ? null : item.slug)}
                      className="relative flex min-h-64 flex-1 flex-col justify-end text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <MediaFrame
                        media={item.media}
                        ratio="aspect-[4/3]"
                        className="absolute inset-0 h-full rounded-none"
                        showTag={false}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        imageClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" aria-hidden="true" />
                      <span className="relative z-10 flex flex-col gap-1 p-lg text-white">
                        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/75">{item.years}</span>
                        <span className="font-display text-body-l font-semibold">{item.name}</span>
                        <span className="line-clamp-2 text-[0.8125rem] text-white/80">{item.tagline}</span>
                      </span>
                      {selected ? <span className="absolute right-md top-md z-10 rounded-full bg-primary px-sm py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-primary-foreground">Seleccionada</span> : null}
                    </button>
                    <Link
                      to={`/vehiculos/${item.slug}`}
                      className="relative z-10 inline-flex items-center gap-1.5 border-t border-white/10 bg-black/45 px-lg py-sm text-[0.8125rem] font-semibold text-white underline-offset-4 hover:bg-black/60 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Ver accesorios
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </article>
              </li>
            );
          })}
        </ul>

        <p className="text-[0.8125rem] text-muted-foreground" aria-live="polite">
          {vehicle
            ? `Estás navegando el catálogo para tu ${vehicle.name}.`
            : "También podés escribirnos y te asesoramos con el modelo que tengas."}
        </p>
      </div>
    </section>
  );
};

/** Category shortcuts. */
export const CategoryShortcuts = () => (
  <section aria-labelledby="categorias-title" className="container-page section-y">
    <div className="flex flex-col gap-sm pb-lg">
      <p className="eyebrow">Categorías</p>
      <h2 id="categorias-title" className="text-display-s">
        Todo lo que necesitás para tu camioneta
      </h2>
    </div>
    <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            to={`/productos/${category.slug}`}
            className="flex h-full flex-col gap-1 rounded-lg border border-border bg-card p-lg shadow-sm transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
          >
            <span className="font-display text-headline-s">{category.name}</span>
            <span className="text-body-s text-muted-foreground">{category.description}</span>
          </Link>
        </li>
      ))}
    </ul>
    <p className="pt-lg text-body-s text-muted-foreground">
      ¿Buscás la tienda online para ver precios y envíos?{" "}
      <a
        href={site.onlineStore.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary underline-offset-4 hover:underline"
      >
        {site.onlineStore.label} (se abre en una pestaña nueva)
      </a>
    </p>
  </section>
);
