import type { GalleryItem } from "./types";

/**
 * Work gallery. Every entry is a labelled placeholder until the real shop and
 * installation photos arrive — the reserved ratio keeps the grid stable.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "trabajo-1",
    caption: "Amarok con barra antivuelco y lona marítima",
    media: {
      src: null,
      alt: "Amarok equipada con barra antivuelco y lona marítima",
      placeholderLabel: "Foto de trabajo: Amarok equipada",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-2",
    caption: "Hilux con portaequipajes y valijón",
    media: {
      src: null,
      alt: "Toyota Hilux equipada con portaequipajes y valijón",
      placeholderLabel: "Foto de trabajo: Hilux con valijón",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-3",
    caption: "Instalación de estribos en el taller de Warnes",
    media: {
      src: null,
      alt: "Instalación de estribos en el taller de Design Car Warnes",
      placeholderLabel: "Foto de taller: instalación de estribos",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-4",
    caption: "Ranger con cobertor rígido",
    media: {
      src: null,
      alt: "Ford Ranger con cobertor rígido colocado",
      placeholderLabel: "Foto de trabajo: Ranger con cobertor",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-5",
    caption: "Torre de estribos y cobertores en showroom",
    media: {
      src: null,
      alt: "Muestra de estribos y cobertores en el showroom de Design Car",
      placeholderLabel: "Foto de showroom: productos exhibidos",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-6",
    caption: "S10 lista para entregar con equipamiento completo",
    media: {
      src: null,
      alt: "Chevrolet S10 equipada lista para entregar",
      placeholderLabel: "Foto de entrega: S10 equipada",
      ratio: "aspect-[4/3]",
    },
  },
];
