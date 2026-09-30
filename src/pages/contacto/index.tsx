import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { branches, directionsUrl } from "@/data/branches";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { ContactForm } from "@/components/site/contact-form";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SiteLayout } from "@/components/site/site-layout";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

/** Contact page: the consult form plus every other channel in one column. */
const ContactoPage = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <PageHero
        breadcrumbs={<PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]} />}
        eyebrow="Contacto"
        title="Contanos qué necesita tu camioneta"
        description="Podés escribirnos por WhatsApp para una respuesta inmediata, o dejarnos la consulta en el formulario y te respondemos a la brevedad."
      />

      <section aria-labelledby="consulta-title" className="container-page section-y">
        <div className="grid gap-xl lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-lg">
            <Reveal delay={60}>
              <div className="flex flex-col gap-md rounded-xl border border-border bg-card p-lg shadow-sm">
                <h2 id="consulta-title" className="text-headline-s">
                  Preferís WhatsApp
                </h2>
                <p className="text-body-s text-muted-foreground">
                  Es la vía más rápida. Te contesta un asesor que ya sabe qué accesorios tenemos
                  disponibles.
                </p>
                <WhatsAppButton
                  message={whatsappMessages.vehicle(vehicle?.name)}
                  label="Escribir por WhatsApp"
                  size="lg"
                />
                <p className="text-[0.8125rem] text-muted-foreground">
                  {site.phoneDisplay} · Lunes a sábados en horario comercial.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col gap-md rounded-xl border border-border bg-card p-lg shadow-sm">
                <h2 className="text-headline-s">Otros canales</h2>
                <ul role="list" className="flex flex-col gap-sm text-body-s">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail className="h-4 w-4 text-primary" aria-hidden="true" strokeWidth={1.7} />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Instagram className="h-4 w-4 text-primary" aria-hidden="true" strokeWidth={1.7} />
                      {site.instagram.handle} (se abre en una pestaña nueva)
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Facebook className="h-4 w-4 text-primary" aria-hidden="true" strokeWidth={1.7} />
                      Facebook de Design Car (se abre en una pestaña nueva)
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" strokeWidth={1.7} />
                    Repuestos y consultas por pedido
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-col gap-md rounded-xl border border-border bg-card p-lg shadow-sm">
                <h2 className="text-headline-s">Sucursales</h2>
                <ul role="list" className="flex flex-col gap-md">
                  {branches.map((branch) => (
                    <li key={branch.slug} className="flex flex-col gap-1 text-body-s">
                      <span className="inline-flex items-start gap-2 font-semibold text-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={1.7} />
                        {branch.name}
                      </span>
                      <span className="pl-6 text-muted-foreground">
                        {branch.address}, {branch.city}
                      </span>
                      <span className="inline-flex items-start gap-2 pl-6 text-muted-foreground">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.7} />
                        {branch.hours[0]}
                      </span>
                      <a
                        href={directionsUrl(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pl-6 font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Cómo llegar (se abre en una pestaña nueva)
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/sucursales"
                  className="text-label text-primary underline-offset-4 hover:underline"
                >
                  Ver horarios completos
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container-page pb-section">
        <CtaBand
          title="¿Ya sabés qué querés instalar?"
          description="Contanos el modelo y el accesorio y coordinamos directamente el turno en la sucursal que te quede mejor."
          message={whatsappMessages.installation(undefined, vehicle?.name)}
          secondaryLabel="Ver instalación"
          secondaryTo="/instalacion"
        />
      </div>
    </>
  );
};

const Contacto = () => (
  <SiteLayout>
    <ContactoPage />
  </SiteLayout>
);

export default Contacto;
