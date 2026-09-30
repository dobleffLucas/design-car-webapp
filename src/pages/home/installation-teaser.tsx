import { ArrowRight, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Consultá",
    text: "Escribinos por WhatsApp con el modelo y el año de tu camioneta, o completá el formulario.",
  },
  {
    icon: ShieldCheck,
    title: "2. Confirmamos compatibilidad",
    text: "Verificamos que el accesorio calce en tu vehículo y te pasamos precio y disponibilidad.",
  },
  {
    icon: Wrench,
    title: "3. Coordinamos instalación",
    text: "Elegís sucursal y horario. Lo instalamos nosotros y te lo entregamos probado.",
  },
];

/** Installation teaser with the simple three-step process. */
export const InstallationTeaser = () => {
  const { vehicle } = useVehicle();

  return (
    <section aria-labelledby="instalacion-teaser-title" className="container-page section-y">
      <Reveal>
        <SectionHeading
          eyebrow="Instalación"
          title="Lo instalamos nosotros, con turno y sin sorpresas"
          description="Trabajamos con repuestos correctos y sin perforaciones innecesarias. La mayoría de los accesorios se colocan en el día."
          id="instalacion-teaser-title"
        />
      </Reveal>

      <ol role="list" className="grid gap-md pt-xl md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 60} className="h-full">
              <div className="flex h-full flex-col gap-sm rounded-lg border border-border bg-card p-lg shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-subtle text-primary-subtle-foreground">
                  <step.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="text-headline-s">{step.title}</h3>
                <p className="text-body-s text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-sm pt-xl">
        <WhatsAppButton
          message={whatsappMessages.installation(undefined, vehicle?.name)}
          label="Cotizar instalación por WhatsApp"
          variant="whatsapp"
          size="lg"
        />
        <Button asChild variant="outline" size="lg">
          <Link to="/instalacion">
            Ver cómo trabajamos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
