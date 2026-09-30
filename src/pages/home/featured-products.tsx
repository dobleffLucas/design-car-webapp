import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { featuredProducts, productsByVehicle } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/product-grid";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { useVehicle } from "@/hooks/use-vehicle";

/**
 * Featured products. When a vehicle is selected the list switches to what
 * actually fits that pickup, which is the whole point of the selector.
 */
export const FeaturedProducts = () => {
  const { vehicleSlug, vehicle } = useVehicle();

  const compatible = vehicleSlug ? productsByVehicle(vehicleSlug) : [];
  const list = vehicle
    ? compatible.slice(0, 6)
    : featuredProducts.slice(0, 6);

  return (
    <section aria-labelledby="destacados-title" className="container-page section-y">
      <Reveal>
        <SectionHeading
          eyebrow={vehicle ? "Paso 2" : "Productos destacados"}
          title={vehicle ? `Recomendados para tu ${vehicle.name}` : "Lo que más piden nuestros clientes"}
          description={
            vehicle
              ? `Estos accesorios están confirmados para ${vehicle.name} (${vehicle.years}). Consultanos por precio, disponibilidad y turno de instalación.`
              : "Una selección de los accesorios que más instalamos. Elegí tu camioneta arriba y la lista se ajusta a tu modelo."
          }
          id="destacados-title"
          action={
            <Button asChild variant="outline">
              <Link to={vehicle ? `/vehiculos/${vehicle.slug}` : "/productos"}>
                {vehicle ? `Ver todo para ${vehicle.shortName}` : "Ver todo el catálogo"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
      </Reveal>

      <Reveal className="pt-lg" delay={60}>
        <ProductGrid
          products={list}
          scopeLabel={vehicle ? `accesorios para ${vehicle.name}` : "productos destacados"}
          hasFilters={false}
        />
      </Reveal>
    </section>
  );
};
