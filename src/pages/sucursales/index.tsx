import { Link } from "react-router-dom";

import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { BranchCard } from "@/components/site/branch-card";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SiteLayout } from "@/components/site/site-layout";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

/** Stores page: address, hours, map slot, directions and a per-branch WhatsApp. */
const SucursalesPage = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Sucursales" }]} />
        }
        eyebrow="Sucursales"
        title="Te esperamos en Warnes y en San Isidro"
        description="Dos locales con showroom y taller de instalación. Podés pasar a ver los productos o coordinar el turno por WhatsApp."
        actions={
          <WhatsAppButton
            message={whatsappMessages.vehicle(vehicle?.name)}
            label="Consultar disponibilidad"
            variant="whatsapp"
            size="lg"
          />
        }
      />

      <section aria-labelledby="locales-title" className="container-page section-y">
        <h2 id="locales-title" className="sr-only">
          Nuestras sucursales
        </h2>
        <ul role="list" className="flex flex-col gap-lg">
          {branches.map((branch, index) => (
            <li key={branch.slug}>
              <Reveal delay={index * 60}>
                <BranchCard branch={branch} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-xl flex flex-col gap-md rounded-xl border border-dashed border-border-strong bg-surface-sunken p-lg">
          <h3 className="text-headline-s">Cómo coordinar tu visita</h3>
          <p className="max-w-prose text-body-s text-muted-foreground">
            Para ver productos no hace falta turno: podés acercarte en el horario de atención. Para
            instalar sí pedimos turno previo, así te aseguramos el lugar en el taller y el tiempo
            necesario para dejar todo ajustado.
          </p>
          <div className="flex flex-wrap gap-sm">
            <WhatsAppButton
              message={whatsappMessages.installation(undefined, vehicle?.name)}
              label="Pedir turno de instalación"
              variant="whatsappSoft"
            />
            <Button asChild variant="outline">
              <Link to="/contacto">Enviar consulta</Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={`mailto:${site.email}`}>Escribir a {site.email}</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container-page pb-section">
        <CtaBand
          title="¿No sabés cuál te queda más cerca para instalar?"
          description="Decinos dónde estás y te recomendamos la sucursal con mejor acceso y disponibilidad de turnos."
          message={whatsappMessages.vehicle(vehicle?.name)}
          secondaryLabel="Completar formulario"
        />
      </div>
    </>
  );
};

const Sucursales = () => (
  <SiteLayout>
    <SucursalesPage />
  </SiteLayout>
);

export default Sucursales;
