import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { whatsappMessages } from "@/lib/whatsapp";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteLayout } from "@/components/site/site-layout";
import { TrustCard } from "@/components/site/trust-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useVehicle } from "@/hooks/use-vehicle";

const benefits = [
  {
    icon: "wrench",
    title: "Lo hacemos nosotros, no un tercero",
    text: "El mismo equipo que te asesora instala. Si algo no queda bien, respondemos nosotros.",
  },
  {
    icon: "car",
    title: "Conocemos cada modelo",
    text: "Trabajamos todos los días con Amarok, Hilux, Ranger, S10 y Toro. Sabemos por dónde entrar y por dónde no.",
  },
  {
    icon: "chat",
    title: "Sin perforaciones de más",
    text: "Usamos los anclajes originales siempre que se puede y sellamos los puntos que quedan expuestos.",
  },
  {
    icon: "store",
    title: "Turno en el día en dos sucursales",
    text: "Coordinás por WhatsApp y elegís Warnes o San Isidro según lo que te quede más cómodo.",
  },
];

const steps = [
  {
    title: "1. Consultá",
    text: "Escribinos por WhatsApp con el modelo y año de tu camioneta y el accesorio que buscás, o completá el formulario de consulta.",
  },
  {
    title: "2. Confirmamos compatibilidad",
    text: "Verificamos medida y versión, te pasamos el precio con instalación y coordinamos día y sucursal.",
  },
  {
    title: "3. Coordinamos instalación",
    text: "Traés la camioneta en el horario acordado y la retirás equipada, ajustada y probada.",
  },
];

const faqs = [
  {
    q: "¿Cuánto tarda la instalación?",
    a: "La mayoría de los accesorios se colocan en el día: barras, estribos y cobertores suelen resolverse en pocas horas. Los sistemas eléctricos, como los estribos retráctiles, requieren más tiempo y los coordinamos con turno especial.",
  },
  {
    q: "¿Puedo llevar el accesorio que compré en otro lado?",
    a: "Sí. Lo revisamos primero para confirmar que sea el correcto para tu modelo y, si está en condiciones, lo instalamos. Si notamos que no corresponde, te lo decimos antes de tocar la camioneta.",
  },
  {
    q: "¿Hay que perforar la caja o el techo?",
    a: "En la mayoría de los casos usamos los anclajes originales del vehículo. Cuando hace falta una fijación adicional, te explicamos por qué antes de hacerla y sellamos el punto para evitar filtraciones.",
  },
  {
    q: "¿Instalan camionetas levantadas o con cubiertas más grandes?",
    a: "Sí. En esos casos evaluamos primero el despeje y te recomendamos la variante que mejor se adapte, por ejemplo estribos tipo peldaño en lugar de tubulares.",
  },
  {
    q: "¿Atienden sin turno?",
    a: "Podés pasar por cualquiera de las dos sucursales a ver los productos y consultar. Para la instalación sí pedimos turno previo, así te aseguramos el tiempo y el lugar en el taller.",
  },
];

/** Installation page: process, benefits, what is included and the FAQ. */
const InstalacionPage = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Instalación" }]} />
        }
        eyebrow="Instalación profesional"
        title="Instalamos en nuestras sucursales, con turno y sin sorpresas"
        description="No vendemos cajas para que las coloques como puedas: asesoramos, confirmamos compatibilidad e instalamos nosotros mismos. La mayoría de los accesorios quedan listos en el día."
        actions={
          <>
            <WhatsAppButton
              message={whatsappMessages.installation(undefined, vehicle?.name)}
              label="Cotizar instalación por WhatsApp"
              shortLabel="Cotizar instalación"
              size="lg"
            />
            <Button asChild variant="outline" size="lg">
              <Link to="/contacto?motivo=instalacion">Enviar consulta</Link>
            </Button>
          </>
        }
        media={{
          src: null,
          alt: "Instalación de accesorios en el taller de Design Car",
          placeholderLabel: "Foto: taller de instalación en plena tarea — 4:3 · 1600×1200",
          ratio: "aspect-[4/3]",
        }}
      />

      <section aria-labelledby="beneficios-instalacion-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué instalar con nosotros"
            title="Instalamos como si la camioneta fuera nuestra"
            description="Dos décadas colocando accesorios en pickups enseñan dónde están los problemas: por eso los resolvemos antes de que aparezcan."
            id="beneficios-instalacion-title"
          />
        </Reveal>
        <ul role="list" className="grid gap-md pt-lg sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <Reveal delay={index * 60} className="h-full">
                <TrustCard
                  icon={benefit.icon}
                  title={benefit.title}
                  text={benefit.text}
                  className="h-full"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proceso-title" className="surface-inverse py-section">
        <div className="container-page flex flex-col gap-xl">
          <Reveal>
            <SectionHeading
              tone="inverse"
              eyebrow="Cómo funciona"
              title="Un proceso simple, en tres pasos"
              description="Sin vueltas: consultás, confirmamos compatibilidad y coordinamos el turno."
              id="proceso-title"
            />
          </Reveal>
          <ol role="list" className="grid gap-md md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col gap-sm rounded-lg border border-white/10 bg-white/[0.04] p-lg">
                    <span className="font-display text-[2rem] font-bold leading-none text-surface-inverse-foreground/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-headline-s text-surface-inverse-foreground">{step.title}</h3>
                    <p className="text-body-s text-surface-inverse-foreground/70">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo que más nos consultan antes de instalar"
            id="faq-title"
          />
        </Reveal>
        <div className="max-w-3xl pt-lg">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="container-page pb-section">
        <CtaBand
          title="Coordinemos el turno de tu camioneta"
          description="Decinos qué accesorio querés instalar y en qué sucursal te queda mejor. Te confirmamos día y horario."
          message={whatsappMessages.installation(undefined, vehicle?.name)}
          secondaryLabel="Sucursales y horarios"
          secondaryTo="/sucursales"
        />
      </div>
    </>
  );
};

const Instalacion = () => (
  <SiteLayout>
    <InstalacionPage />
  </SiteLayout>
);

export default Instalacion;
