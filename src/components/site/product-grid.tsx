import { SearchX, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { useVehicle } from "@/hooks/use-vehicle";

import { ProductCard } from "./product-card";
import { WhatsAppButton } from "./whatsapp-button";

interface ProductGridProps {
  products: Product[];
  /** Human-readable scope for the count and the empty state, e.g. "estribos". */
  scopeLabel: string;
  /** Whether any filter is narrowing the list right now. */
  hasFilters: boolean;
  onClearFilters?: () => void;
  emptyTitle?: string;
  id?: string;
  className?: string;
}

/**
 * Listing grid with an announced result count and a real empty state — never a
 * blank region. The empty state still converts: it offers the filter reset and
 * a WhatsApp consult for the filtered scope.
 */
export const ProductGrid = ({
  products,
  scopeLabel,
  hasFilters,
  onClearFilters,
  emptyTitle,
  id,
  className,
}: ProductGridProps) => {
  const { vehicleName } = useVehicle();

  return (
    <div id={id} className={cn("flex flex-col gap-lg", className)}>
      <p
        aria-live="polite"
        className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        {products.length === 1 ? "1 producto" : `${products.length} productos`}
        {vehicleName ? ` para tu ${vehicleName}` : ""}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-md rounded-lg border border-dashed border-border-strong bg-surface-sunken px-lg py-xl text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-muted-foreground">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="text-headline-s">
            {emptyTitle ?? `No encontramos ${scopeLabel} para esa búsqueda`}
          </h3>
          <p className="max-w-prose text-body-s text-muted-foreground">
            Probá quitar un filtro o consultanos: conseguimos accesorios por pedido y te avisamos
            cuando llegan.
          </p>
          <div className="flex flex-col gap-sm sm:flex-row">
            {hasFilters && onClearFilters ? (
              <Button type="button" variant="outline" onClick={onClearFilters}>
                Limpiar filtros
              </Button>
            ) : null}
            <WhatsAppButton
              message={whatsappMessages.emptyResults(scopeLabel, vehicleName ?? undefined)}
              label="Consultar disponibilidad"
              variant="whatsappSoft"
            />
          </div>
        </div>
      ) : (
        <ul role="list" className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
