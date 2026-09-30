import { trustPoints } from "@/data/site";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TrustCard } from "@/components/site/trust-card";

/** Trust band: why buying from Design Car is different from an online listing. */
export const TrustSection = () => (
  <section aria-labelledby="confianza-title" className="surface-inverse py-section">
    <div className="container-page flex flex-col gap-xl">
      <Reveal>
        <SectionHeading
          tone="inverse"
          eyebrow="Por qué Design Car"
          title="Equipamos camionetas desde hace más de dos décadas"
          description="No somos una tienda que despacha cajas: asesoramos, confirmamos compatibilidad e instalamos nosotros mismos en nuestras dos sucursales."
          id="confianza-title"
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
);
