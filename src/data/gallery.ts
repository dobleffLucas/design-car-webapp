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
      src: "/assets/designcar/barra-amarok.jpg",
      alt: "Amarok equipada con barra antivuelco y lona marítima",
      placeholderLabel: "Foto de trabajo: Amarok equipada",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-2",
    caption: "Hilux con portaequipajes y valijón",
    media: {
      src: "/assets/designcar/hilux-barra-antivuelco4.jpg",
      alt: "Toyota Hilux equipada con portaequipajes y valijón",
      placeholderLabel: "Foto de trabajo: Hilux con valijón",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-3",
    caption: "Ranger con barra antivuelco instalada",
    media: {
      src: "/assets/designcar/barra-ranger.jpg",
      alt: "Instalación de estribos en el taller de Design Car Warnes",
      placeholderLabel: "Foto de taller: instalación de estribos",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-4",
    caption: "Lona marítima instalada sobre caja de pickup",
    media: {
      src: "/assets/designcar/novedad-lonas.jpg",
      alt: "Ford Ranger con cobertor rígido colocado",
      placeholderLabel: "Foto de trabajo: Ranger con cobertor",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-5",
    caption: "Portaequipaje instalado para ampliar la capacidad de carga",
    media: {
      src: "/assets/designcar/portaequipaje.jpg",
      alt: "Muestra de estribos y cobertores en el showroom de Design Car",
      placeholderLabel: "Foto de showroom: productos exhibidos",
      ratio: "aspect-[4/3]",
    },
  },
  {
    id: "trabajo-6",
    caption: "S10 con barra antivuelco instalada",
    media: {
      src: "/assets/designcar/barra-s10.jpg",
      alt: "Chevrolet S10 equipada lista para entregar",
      placeholderLabel: "Foto de entrega: S10 equipada",
      ratio: "aspect-[4/3]",
    },
  },
];
