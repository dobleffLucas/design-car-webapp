import { vehicleBrands } from "@/data/site";

import { BrandLogo } from "./logo";

const brandLogoPaths: Record<string, string> = {
  Volkswagen: "/assets/designcar/logos_marcas/logo_volkswagen.png",
  Toyota: "/assets/designcar/logos_marcas/logo_toyota.png",
  Ford: "/assets/designcar/logos_marcas/logo_ford.jpg",
  Chevrolet: "/assets/designcar/logos_marcas/logo_chevrolet.jpg",
  Fiat: "/assets/designcar/logos_marcas/logo_fiat.jpg",
  Nissan: "/assets/designcar/logos_marcas/logo_nissan.jpg",
  Mitsubishi: "/assets/designcar/logos_marcas/logo_mitsubishi.png",
  RAM: "/assets/designcar/logos_marcas/logo_ram.jpg",
};

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
        <BrandLogo brand={brand} src={brandLogoPaths[brand]} />
      </li>
    ))}
  </ul>
);
