import type { Category } from "./types";

/**
 * Product families. Order drives the home page grid and the catalog listing.
 * `media.src === null` means the photo is still pending and an image slot is
 * rendered instead of an empty box.
 */
export const categories: Category[] = [
  {
    slug: "barras-antivuelco",
    name: "Barras antivuelco",
    description: "Protección de caja y punto de anclaje para carga. Modelos cromados y negros.",
    longDescription:
      "Las barras antivuelco ordenan la carga y protegen la luneta en los frenados fuertes. Trabajamos modelos originales y deportivos, con kit de montaje incluido y sin perforar de más la caja.",
    icon: "shield",
    media: {
      src: "/assets/designcar/barras.jpg",
      alt: "Barras antivuelco para camionetas instaladas en Design Car",
      placeholderLabel: "Foto: barras antivuelco instaladas — 16:10",
      ratio: "aspect-[16/10]",
    },
  },
  {
    slug: "estribos",
    name: "Estribos",
    description: "Facilitan el ascenso y cuidan el zócalo de golpes y piedras.",
    longDescription:
      "Un estribo bien elegido cambia el uso diario: subís y bajás sin esfuerzo y el zócalo queda protegido de piedras y roces. Tenemos tubulares, de aluminio y eléctricos retráctiles.",
    icon: "stairs",
    media: {
      src: "/assets/designcar/estribos/estribos-camioneta-fba4ad7647d3.jpg",
      alt: "Camioneta con estribos tubulares instalados",
      placeholderLabel: "Foto: estribos montados en pickup — 16:10 · 1600×1000",
      ratio: "aspect-[16/10]",
    },
  },
  {
    slug: "lonas-y-cobertores",
    name: "Lonas y cobertores",
    description: "Lonas marítimas, cobertores rígidos y enrollables para cerrar la caja.",
    longDescription:
      "Cerramos la caja con la opción que mejor se adapte a tu uso: lona marítima reforzada para el trabajo pesado, o cobertor rígido y enrollable cuando buscás estética y practicidad. Todas con kit de sujeción.",
    icon: "tarp",
    media: {
      src: "/assets/designcar/novedad-lonas.jpg",
      alt: "Lonas y cobertores para cajas de camioneta",
      placeholderLabel: "Foto: lonas y cobertores — 16:10",
      ratio: "aspect-[16/10]",
    },
  },
  {
    slug: "portaequipajes",
    name: "Portaequipajes",
    description: "Parrillas, valijones y barrales para llevar más sin perder estabilidad.",
    longDescription:
      "Portaequipajes de techo, parrillas y valijones para viajar con equipaje, herramientas o material de trabajo. Te asesoramos por carga máxima según tu vehículo y te lo instalamos nosotros.",
    icon: "grid",
    media: {
      src: "/assets/designcar/portaequipaje.jpg",
      alt: "Portaequipajes y parrilla de techo para camioneta",
      placeholderLabel: "Foto: portaequipajes de techo — 16:10",
      ratio: "aspect-[16/10]",
    },
  },
  {
    slug: "deflectores",
    name: "Deflectores",
    description: "De capot, ventanillas y techo. Menos ruido, menos piedras, más confort.",
    longDescription:
      "Los deflectores reducen el ruido del viento, evitan que entre agua con la ventanilla entreabierta y protegen el capot de piedras. Se colocan sin perforar en la mayoría de los modelos.",
    icon: "wind",
    media: {
      src: "/assets/designcar/deflectores/amarok-deflector-99a7c1e4edad.jpg",
      alt: "Deflectores de capot y ventanillas colocados en una camioneta",
      placeholderLabel: "Foto: deflector de capot instalado — 16:10 · 1600×1000",
      ratio: "aspect-[16/10]",
    },
  },
  {
    slug: "camping",
    name: "Accesorios para camping",
    description: "Todo para la salida: reposeras, conservadoras, cadenas para nieve y organización.",
    longDescription:
      "La camioneta también es para el fin de semana. Sumamos equipamiento de camping y organización de caja probado en viajes reales: reposeras, conservadoras, cadenas para nieve y kits de amarre.",
    icon: "tent",
    media: {
      src: "/assets/designcar/camping/camping-e0cdc19dbf28.jpg",
      alt: "Equipamiento de camping y organización de caja de camioneta",
      placeholderLabel: "Foto: equipamiento de camping en la caja — 16:10 · 1600×1000",
      ratio: "aspect-[16/10]",
    },
  },
];

export const categoryBySlug = (slug: string | undefined) =>
  categories.find((category) => category.slug === slug);

export const categoryName = (slug: string) =>
  categoryBySlug(slug)?.name ?? "Productos";
