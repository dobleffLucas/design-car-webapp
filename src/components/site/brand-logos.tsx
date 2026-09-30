import { vehicleBrands } from "@/data/site";

import { BrandLogoPlaceholder } from "./logo";

/**
 * Brand strip. The real brand logos will be supplied later, so each tile states
 * plainly that its logo is still pending — no trademark is ever approximated.
 */
export const BrandLogos = ({ className }: { className?: string }) => (
  <ul
    role="list"
    aria-label="Marcas de vehículos con las que trabajamos"
    className={className ?? "grid grid-cols-2 gap-sm sm:grid-cols-4 lg:grid-cols-8"}
  >
    {vehicleBrands.map((brand) => (
      <li key={brand}>
        <BrandLogoPlaceholder brand={brand} />
      </li>
    ))}
  </ul>
);
