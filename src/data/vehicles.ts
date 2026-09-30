import type { Vehicle } from "./types";

/**
 * The pickups Design Car works with. Each page at /vehiculos/:slug is driven by
 * this list, and every product declares compatibility against these slugs.
 */
export const vehicles: Vehicle[] = [
  {
    slug: "volkswagen-amarok",
    name: "Volkswagen Amarok",
    shortName: "Amarok",
    brand: "Volkswagen",
    years: "2010 – 2025",
    tagline: "La pickup más equipada por nuestros clientes",
    description:
      "Es la camioneta que más vemos en el taller. Hay mucha oferta de accesorios y no todos son iguales: te ayudamos a elegir piezas que calcen bien y duren en el uso diario.",
    media: {
      src: "/assets/designcar/barra-amarok.jpg",
      alt: "Volkswagen Amarok con barra antivuelco instalada en Design Car",
      placeholderLabel: "Foto: Amarok equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "toyota-hilux",
    name: "Toyota Hilux",
    shortName: "Hilux",
    brand: "Toyota",
    years: "2005 – 2025",
    tagline: "La referencia del trabajo y del uso 4x4",
    description:
      "La Hilux se usa para trabajar fuerte y también para viajar. Tenemos equipamiento para ambas: desde lonas de batea hasta portaequipajes para la caja.",
    media: {
      src: "/assets/designcar/hilux-barra-antivuelco4.jpg",
      alt: "Toyota Hilux con barra antivuelco instalada",
      placeholderLabel: "Foto: Hilux equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "ford-ranger",
    name: "Ford Ranger",
    shortName: "Ranger",
    brand: "Ford",
    years: "2012 – 2025",
    tagline: "Accesorios para la Ranger nueva y las generaciones previas",
    description:
      "Cuidamos la diferencia entre generaciones: la Ranger cambió bastante de medidas y el accesorio que entra en una no entra en la otra. Consultanos por tu año y te confirmamos.",
    media: {
      src: "/assets/designcar/barra-ranger.jpg",
      alt: "Ford Ranger con barra antivuelco instalada",
      placeholderLabel: "Foto: Ranger equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "chevrolet-s10",
    name: "Chevrolet S10",
    shortName: "S10",
    brand: "Chevrolet",
    years: "2012 – 2025",
    tagline: "Equipamiento probado en la S10",
    description:
      "Tenemos los accesorios que más se piden para la S10 y los instalamos en el día, coordinando turno en cualquiera de las dos sucursales.",
    media: {
      src: "/assets/designcar/barra-s10.jpg",
      alt: "Chevrolet S10 con barra antivuelco instalada",
      placeholderLabel: "Foto: S10 equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "fiat-toro",
    name: "Fiat Toro",
    shortName: "Toro",
    brand: "Fiat",
    years: "2016 – 2025",
    tagline: "Caja y estribos a medida para la Toro",
    description:
      "La Toro tiene medidas propias de caja y de zócalo. Tenemos cobertores y estribos pensados específicamente para el modelo, no adaptaciones universales.",
    media: {
      src: "/assets/designcar/barra-toro2.jpg",
      alt: "Fiat Toro con barra antivuelco instalada",
      placeholderLabel: "Foto: Toro equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
  {
    slug: "otros-modelos",
    name: "Otros modelos",
    shortName: "Otros modelos",
    brand: "Varias marcas",
    years: "Consultar",
    tagline: "Saveiro, Oroch, Frontier, L200 y más",
    description:
      "Trabajamos también con VW Saveiro, Renault Oroch, Nissan Frontier, Mitsubishi L200, RAM y otras pickups y utilitarios. Si no ves tu modelo, preguntanos: conseguimos por pedido.",
    media: {
      src: "/assets/designcar/barra-saveiro.jpg",
      alt: "Volkswagen Saveiro con barra antivuelco instalada",
      placeholderLabel: "Foto: Saveiro equipada — 4:3",
      ratio: "aspect-[4/3]",
    },
  },
];

export const vehicleBySlug = (slug: string | undefined) =>
  vehicles.find((vehicle) => vehicle.slug === slug);

export const vehicleName = (slug: string) =>
  vehicleBySlug(slug)?.name ?? "tu camioneta";
