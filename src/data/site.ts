/**
 * Company-wide constants. The WhatsApp number is Design Car's real published
 * number, so every CTA in the demo opens a real conversation.
 */
export const site = {
  name: "Design Car",
  legalName: "Design Car Equipamientos",
  tagline: "Equipamiento e instalación para pickups y 4x4",
  /** Digits only, as wa.me expects. */
  whatsapp: "5491124730109",
  phoneDisplay: "+54 9 11 2473-0109",
  email: "warnes@designcar.com.ar",
  instagram: {
    handle: "@designcarequipamientos",
    url: "https://www.instagram.com/designcarequipamientos",
  },
  facebook: {
    handle: "designcarequipamientos",
    url: "https://www.facebook.com/designcarequipamientos",
  },
  onlineStore: {
    name: "Tienda online",
    label: "Ver tienda online",
    url: "https://designcar3.mitiendanube.com/",
  },
  establishedNote:
    "Más de dos décadas equipando camionetas en Buenos Aires.",
} as const;

/** Primary navigation. Productos and Por vehículo get dropdowns composed from data. */
export const mainNav = [
  { label: "Productos", to: "/productos" },
  { label: "Por vehículo", to: "/vehiculos" },
  { label: "Instalación", to: "/instalacion" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Sucursales", to: "/sucursales" },
  { label: "Contacto", to: "/contacto" },
] as const;

/**
 * Vehicle brands shown in the footer. The real logos will be dropped in later,
 * so these render as explicit "Logo de marca" placeholders — never redrawn.
 */
export const vehicleBrands = [
  "Volkswagen",
  "Toyota",
  "Ford",
  "Chevrolet",
  "Fiat",
  "Nissan",
  "Mitsubishi",
  "RAM",
] as const;

export const trustPoints = [
  {
    icon: "headset",
    title: "Asesoramiento especializado",
    text: "Te preguntamos qué camioneta tenés y para qué la usás antes de recomendarte cualquier cosa.",
  },
  {
    icon: "car",
    title: "Compatibilidad por vehículo",
    text: "Trabajamos por modelo y año. Sabemos qué le queda a cada Amarok, Hilux, Ranger, S10 y Toro.",
  },
  {
    icon: "wrench",
    title: "Instalación profesional",
    text: "Instalamos nosotros mismos, con repuestos correctos y sin perforaciones innecesarias.",
  },
  {
    icon: "chat",
    title: "Atención personalizada",
    text: "Un asesor te acompaña por WhatsApp desde la consulta hasta que el accesorio queda montado.",
  },
  {
    icon: "store",
    title: "Locales físicos",
    text: "Dos sucursales abiertas: Darwin 22 en Warnes (CABA) y Andrés Rolón 120 en San Isidro.",
  },
] as const;

export const contactReasons = [
  { value: "consulta", label: "Consulta general" },
  { value: "disponibilidad", label: "Precio y disponibilidad" },
  { value: "instalacion", label: "Cotizar instalación" },
  { value: "compatibilidad", label: "Compatibilidad con mi camioneta" },
  { value: "repuestos", label: "Repuestos y accesorios" },
] as const;
