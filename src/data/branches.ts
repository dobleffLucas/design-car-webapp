import type { Branch } from "./types";

/**
 * The two Design Car stores. Hours are placeholder values taken from the
 * standard shop schedule and must be confirmed by the client.
 */
export const branches: Branch[] = [
  {
    slug: "warnes",
    name: "Sucursal Warnes",
    address: "Darwin 22 (alt. Warnes 1100)",
    city: "CABA",
    fullAddress: "Darwin 22, Buenos Aires (CABA)",
    hours: [
      "Lunes a viernes: 9 a 18 h",
      "Sábados: 9 a 13 h",
      "Horarios a confirmar por el cliente",
    ],
    mapsQuery: "Darwin 22, Buenos Aires, CABA, Argentina",
    note: "Local con showroom y taller de instalación. Estacionamiento sobre Darwin.",
    media: {
      src: "/assets/designcar/banners_logos/banner_empresa1.jpg",
      alt: "Frente de un local de Design Car en Warnes",
      placeholderLabel: "Foto: frente del local Darwin 22 — 4:3 · 1200×900",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "san-isidro",
    name: "Sucursal San Isidro",
    address: "Andrés Rolón 120",
    city: "San Isidro",
    fullAddress: "Andrés Rolón 120, San Isidro, Buenos Aires",
    hours: [
      "Lunes a viernes: 9 a 18 h",
      "Sábados: 9 a 13 h",
      "Horarios a confirmar por el cliente",
    ],
    mapsQuery: "Andrés Rolón 120, San Isidro, Buenos Aires, Argentina",
    note: "Ideal para la zona norte. Coordinamos el turno de instalación por WhatsApp.",
    media: {
      src: "/assets/designcar/banners_logos/banner_empresa2.jpg",
      alt: "Frente de un local de Design Car en San Isidro",
      placeholderLabel: "Foto: frente del local Andrés Rolón 120 — 4:3 · 1200×900",
      ratio: "aspect-[4/3]",
    },
  },
];

export const branchBySlug = (slug: string) =>
  branches.find((branch) => branch.slug === slug);

/** Builds the Google Maps directions link for a branch. */
export const directionsUrl = (branch: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.mapsQuery)}`;
