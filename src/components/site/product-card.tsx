import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { categoryBySlug } from "@/data/categories";
import type { Product } from "@/data/types";
import { whatsappMessages } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVehicle } from "@/hooks/use-vehicle";

import { CompatibilityChips } from "./compatibility-chips";
import { MediaFrame } from "./media-frame";
import { WhatsAppButton } from "./whatsapp-button";

/**
 * Product card. There is no cart and no price: the card's job is to route the
 * visitor to the product page or straight into a WhatsApp conversation that
 * already names the product and the visitor's vehicle.
 */
export const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { vehicleName, vehicleSlug } = useVehicle();
  const href = `/productos/${product.category}/${product.slug}`;
  const category = categoryBySlug(product.category);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <MediaFrame
          media={product.media[0]}
          ratio="aspect-[4/3]"
          className="rounded-none"
          showTag={false}
          imageClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        {product.installation ? (
          <span className="absolute left-3 top-3">
            <Badge variant="instalacion">Instalación disponible</Badge>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-sm p-lg">
        {category ? (
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            {category.name}
          </p>
        ) : null}
        <h3 className="text-headline-s">
          <Link
            to={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-body-s text-muted-foreground">{product.benefit}</p>
        <CompatibilityChips
          vehicleSlugs={product.vehicles}
          activeVehicleSlug={vehicleSlug}
          className="mt-auto pt-sm"
        />
        <p className="text-[0.8125rem] text-muted-foreground">
          Consultar precio y disponibilidad
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-sm px-lg pb-lg">
        <WhatsAppButton
          message={whatsappMessages.product(product.name, vehicleName ?? undefined)}
          label="Consultar por WhatsApp"
          shortLabel="WhatsApp"
          variant="whatsappSoft"
          size="sm"
          className="flex-1"
        />
        <Button asChild variant="outline" size="iconSm">
          <Link to={href} aria-label={`Ver ficha de ${product.name}`}>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
