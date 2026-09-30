import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { branches } from "@/data/branches";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { BranchCard } from "@/components/site/branch-card";
import { CategoryGrid } from "@/components/site/category-card";
import { CtaBand } from "@/components/site/cta-band";
import { GalleryStrip } from "@/components/site/gallery-strip";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteLayout } from "@/components/site/site-layout";
import { StoreBand } from "@/components/site/store-band";
import { useVehicle } from "@/hooks/use-vehicle";

import { FeaturedProducts } from "./featured-products";
import { Hero, VehicleSelectorSection } from "./hero";
import { InstallationTeaser } from "./installation-teaser";
import { TrustSection } from "./trust-section";

const Home = () => {
  const { vehicle } = useVehicle();

  return (
    <>
      <Hero />
      <VehicleSelectorSection />

      <section aria-labelledby="categorias-home-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Categorías"
            title="Todo lo que necesitás para equipar tu camioneta"
            description="Barras antivuelco, estribos, lonas, portaequipajes, deflectores y equipamiento de camping. Todo con asesoramiento y opción de instalación."
            id="categorias-home-title"
            action={
              <Button asChild variant="outline">
                <Link to="/productos">
                  Ver todas las categorías
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <Reveal className="pt-lg" delay={60}>
          <CategoryGrid />
        </Reveal>
      </section>

      <FeaturedProducts />
      <TrustSection />
      <InstallationTeaser />

      <section aria-labelledby="trabajos-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Trabajos"
            title="Camionetas que ya pasaron por el taller"
            description="Una muestra de los equipamientos que instalamos en Warnes y San Isidro."
            id="trabajos-title"
          />
        </Reveal>
        <Reveal className="pt-lg" delay={60}>
          <GalleryStrip />
        </Reveal>
      </section>

      <section aria-labelledby="sucursales-home-title" className="container-page section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Sucursales"
            title="Dos locales para que elijas el más cercano"
            description="Warnes (CABA) y San Isidro. Podés pasar a ver los productos o coordinar la instalación con turno."
            id="sucursales-home-title"
            action={
              <Button asChild variant="outline">
                <Link to="/sucursales">
                  Ver sucursales y horarios
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ul role="list" className="flex flex-col gap-lg pt-lg">
          {branches.map((branch, index) => (
            <li key={branch.slug}>
              <Reveal delay={index * 60}>
                <BranchCard branch={branch} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-page section-y">
        <Reveal>
          <StoreBand />
        </Reveal>
      </div>

      <div className="container-page pb-section">
        <Reveal>
          <CtaBand
            title="¿No encontrás lo que buscás? Te asesoramos."
            description="Contanos qué camioneta tenés y para qué la usás. Te armamos una propuesta con lo que realmente le sirve."
            message={whatsappMessages.vehicle(vehicle?.name)}
            secondaryLabel="Completar formulario de consulta"
          />
        </Reveal>
      </div>
    </>
  );
};

const HomePage = () => (
  <SiteLayout>
    <Home />
  </SiteLayout>
);

export default HomePage;
