import { site } from "@/data/site";

/**
 * Builds a wa.me link with a context-aware prefilled message, so every CTA
 * arrives at Design Car already telling them which vehicle and product the
 * person is asking about.
 */
export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const whatsappMessages = {
  general: () =>
    "Hola, quiero hacer una consulta sobre equipamiento para mi camioneta. ¿Me pueden asesorar?",

  vehicle: (vehicleName?: string) =>
    vehicleName
      ? `Hola, quiero asesoramiento para equipar mi ${vehicleName}. ¿Qué me recomiendan?`
      : whatsappMessages.general(),

  product: (productName: string, vehicleName?: string) =>
    vehicleName
      ? `Hola, tengo una ${vehicleName} y quiero consultar por ${productName}. ¿Tienen disponibilidad e instalación?`
      : `Hola, quiero consultar por ${productName}. ¿Tienen disponibilidad e instalación?`,

  category: (categoryName: string, vehicleName?: string) =>
    vehicleName
      ? `Hola, tengo una ${vehicleName} y quiero consultar por ${categoryName} para mi camioneta. ¿Qué opciones tienen?`
      : `Hola, quiero consultar por ${categoryName} para mi camioneta. ¿Qué opciones tienen?`,

  installation: (productName?: string, vehicleName?: string) => {
    if (productName && vehicleName) {
      return `Hola, quiero cotizar la instalación de ${productName} en mi ${vehicleName}. ¿Qué necesitan para darme un turno?`;
    }
    if (vehicleName) {
      return `Hola, quiero cotizar la instalación de accesorios en mi ${vehicleName}. ¿Qué necesitan para darme un turno?`;
    }
    return "Hola, quiero cotizar la instalación de accesorios para mi camioneta. ¿Qué necesitan para darme un turno?";
  },

  branch: (branchName: string, address: string) =>
    `Hola, quiero consultar con la sucursal de ${branchName} (${address}). ¿Me pueden ayudar?`,

  emptyResults: (scope: string, vehicleName?: string) =>
    vehicleName
      ? `Hola, busqué ${scope} para mi ${vehicleName} y no encontré lo que necesito. ¿Me pueden conseguir algo a pedido?`
      : `Hola, busqué ${scope} y no encontré lo que necesito. ¿Me pueden conseguir algo a pedido?`,
} as const;
