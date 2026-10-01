import { Link } from "react-router-dom";

import { branches } from "@/data/branches";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site, trustPoints } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { BrandLogos } from "@/components/site/brand-logos";
import { BranchCard } from "@/components/site/branch-card";
import { CtaBand } from "@/components/site/cta-band";
import { GalleryStrip } from "@/components/site/gallery-strip";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteLayout } from "@/components/site/site-layout";
import { TrustCard } from "@/components/site/trust-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

const stats = [
  { value: "2", label: "Sucursales abiertas" },
  { value: `${products.length}+`, label: "Productos en catálogo" },
  { value: `${categories.length}`, label: "Familias de accesorios" },
  { value: `${vehicles.length - 1}`, label: "Modelos de pickup que equipamos" },
];

/** About page: history, specialisation and the two stores. */
const NosotrosPage = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <PageHero
        breadcrumbs={<PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Nosotros" }]} />}
        eyebrow="Nosotros"
        title="Más de dos décadas equipando camionetas"
        description="Design Car acompaña a quienes usan pickups y 4x4 para trabajar, viajar y disfrutar. Te ayudamos a elegir, confirmar compatibilidad e instalar."
        actions={
          <WhatsAppButton
            message={whatsappMessages.vehicle(vehicle?.name)}
            label="Hablar con un asesor"
            size="lg"
          />
        }
        media={{
          src: "/assets/designcar/mercado.jpg",
          alt: "Equipamiento para camionetas 4x4 de Design Car",
          placeholderLabel: "Foto: equipo y local de Design Car — 16:10",
          ratio: "aspect-[16/10]",
        }}
        mediaRatio="aspect-[16/10]"
      />

      <section aria-labelledby="historia-title" className="container-page section-y">
        <div className="grid gap-xl lg:grid-cols-[1fr_0.85fr]">
          <div className="flex flex-col gap-md">
            <h2 id="historia-title" className="text-display-s">
              Una historia hecha alrededor de las pickups
            </h2>
            <p className="max-w-prose text-body-l text-muted-foreground">
              Design Car creció junto a una comunidad que necesita que su camioneta esté lista para el trabajo, la ruta y el tiempo libre. El catálogo fue ampliándose a medida que aparecían nuevas necesidades: protección, carga, confort y camping.
            </p>
            <p className="max-w-prose text-body-l text-muted-foreground">
              Lo que no cambió es la forma de trabajar: preguntamos para qué se usa la camioneta
              antes de recomendar. Nos evitamos vender de más y el cliente se evita comprar algo que
              no le sirve.
            </p>
            <p className="text-[0.75rem] uppercase tracking-[0.06em] text-muted-foreground">
              Esta historia queda preparada para sumar fotos reales del local, showroom, taller y equipo.
            </p>

            <dl className="mt-md grid gap-md sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-card p-lg shadow-sm"
                >
                  <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-[2rem] font-bold leading-none text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-md self-start rounded-xl border border-border bg-surface-sunken p-lg">
            <h3 className="text-headline-s">Nuestro catálogo</h3>
            <ul role="list" className="flex flex-col gap-2 text-body-s text-muted-foreground">
              {categories.map((category) => (
                <li key={category.slug} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <Link
                    to={`/productos/${category.slug}`}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="pt-sm text-body-s text-muted-foreground">
              Y si algo no está publicado, lo conseguimos: trabajamos por pedido con los principales
              importadores del rubro.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ejes-title" className="surface-inverse py-section">
        <div className="container-page flex flex-col gap-xl">
          <Reveal>
            <SectionHeading
              tone="inverse"
              eyebrow="Cómo trabajamos"
              title="Expertos en pickups, cerca del cliente"
              description="La experiencia se nota en cómo te ayudamos a decidir y en cómo dejamos instalada cada solución."
              id="ejes-title"
            />
          </Reveal>
          <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {trustPoints.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 60} className="h-full">
                  <TrustCard
                    icon={point.icon}
                    title={point.title}
                    text={point.text}
                    tone="inverse"
                    className="h-full"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="marcas-nosotros-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Compatibility"
            title="Trabajamos con las marcas que más se ven en la calle"
            description="Y con cualquier otra pickup o utilitario que nos consultes."
            id="marcas-nosotros-title"
          />
        </Reveal>
        <Reveal className="pt-lg" delay={60}>
          <BrandLogos />
        </Reveal>
      </section>

      <section aria-labelledby="trabajos-nosotros-title" className="container-page pb-section">
        <Reveal>
          <SectionHeading
            eyebrow="Trabajos"
            title="Lo que sale del taller"
            description="Equipamientos completos que instalamos en nuestras dos sucursales."
            id="trabajos-nosotros-title"
          />
        </Reveal>
        <Reveal className="pt-lg" delay={60}>
          <GalleryStrip />
        </Reveal>
      </section>

      <section aria-labelledby="locales-title" className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page flex flex-col gap-xl">
          <Reveal>
            <SectionHeading
              eyebrow="Sucursales"
              title="Conocé nuestros locales y taller"
              description="Podés venir a ver los productos antes de decidir, o coordinar la instalación con turno previo."
              id="locales-title"
              action={
                <Button asChild variant="outline">
                  <Link to="/sucursales">Ver horarios y cómo llegar</Link>
                </Button>
              }
            />
          </Reveal>
          <ul role="list" className="flex flex-col gap-lg">
            {branches.map((branch, index) => (
              <li key={branch.slug}>
                <Reveal delay={index * 60}>
                  <BranchCard branch={branch} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page section-y">
        <CtaBand
          title="Conocé lo que podemos hacer por tu camioneta"
          description={`Escribinos a ${site.email} o por WhatsApp. Te asesoramos con el modelo que tengas, incluso si todavía no sabés qué ponerle.`}
          message={whatsappMessages.vehicle(vehicle?.name)}
        />
      </div>
    </>
  );
};

const Nosotros = () => (
  <SiteLayout>
    <NosotrosPage />
  </SiteLayout>
);

export default Nosotros;
