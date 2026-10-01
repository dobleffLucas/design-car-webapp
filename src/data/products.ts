import type { MediaRef, Product } from "./types";

/** Real photo already available for the product. */
const photo = (src: string, alt: string): MediaRef => ({
  src,
  alt,
  placeholderLabel: alt,
  ratio: "aspect-[4/3]",
});

/** Photo still pending: renders an intentional slot with the ratio reserved. */
const slot = (placeholderLabel: string, alt: string, ratio = "aspect-[4/3]"): MediaRef => ({
  src: null,
  alt,
  placeholderLabel,
  ratio,
});

const ALL = [
  "volkswagen-amarok",
  "toyota-hilux",
  "ford-ranger",
  "chevrolet-s10",
  "fiat-toro",
  "otros-modelos",
];

/**
 * The catalog. 30 products across the 6 categories, all consult-only:
 * no prices, no stock, no cart — every card drives to WhatsApp.
 */
export const products: Product[] = [
  /* ----------------------------- Barras antivuelco ---------------------------- */
  {
    slug: "barra-antivuelco-amarok",
    name: "Barra antivuelco para Amarok",
    category: "barras-antivuelco",
    vehicles: ["volkswagen-amarok"],
    type: "Barra negra",
    benefit: "Protege la luneta y da un punto de anclaje firme para la carga.",
    description: [
      "Barra de acero con terminación negro texturado, pensada para el ancho exacto de la caja de la Amarok. No queda corta ni sobresale de la línea del vehículo.",
      "Además de proteger la luneta en los frenados, te da dónde amarrar bultos altos sin apoyarlos contra el vidrio.",
    ],
    highlights: [
      "Calce exacto para la caja de la Amarok, sin adaptaciones",
      "Terminación negro texturado resistente al sol y a la lluvia",
      "Kit de montaje y tornillería incluidos",
      "Se instala sin modificar la estructura de la caja",
    ],
    specs: [
      { label: "Material", value: "Acero con terminación texturada" },
      { label: "Diámetro de tubo", value: "60 mm" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Incluye", value: "Kit de montaje y tornillería" },
      { label: "Vehículos", value: "Volkswagen Amarok (2010 – 2025)" },
    ],
    installation: {
      text: "La instalamos en el día, con turno previo en cualquiera de las dos sucursales.",
      includes: ["Desmontaje de piezas necesarias", "Sellado de puntos de anclaje", "Prueba de ajuste y torque final"],
    },
    media: [
      photo("/assets/designcar/barra-amarok.jpg", "Barra antivuelco instalada en una Volkswagen Amarok"),
      slot("Foto: detalle del anclaje en la caja — 4:3 · 1200×900", "Detalle del anclaje de la barra antivuelco en la caja"),
      slot("Foto: barra vista desde atrás — 4:3 · 1200×900", "Barra antivuelco vista desde la parte trasera de la Amarok"),
    ],
    featured: true,
  },
  {
    slug: "barra-antivuelco-hilux",
    name: "Barra antivuelco para Hilux",
    category: "barras-antivuelco",
    vehicles: ["toyota-hilux"],
    type: "Barra negra",
    benefit: "La opción más pedida para la Hilux: protege y ordena la caja.",
    description: [
      "Modelo medido sobre la caja de la Hilux, disponible para las generaciones que se venden en el país. Al ser específica, no necesitás adaptar ni recortar nada.",
      "Es la barra que más colocamos porque resuelve dos cosas a la vez: cuida la luneta y te deja sujetar carga alta.",
    ],
    highlights: [
      "Diseño específico para Hilux, sin adaptaciones",
      "Estructura de acero con refuerzos internos",
      "Compatible con lona marítima y cobertores de la misma medida",
      "Kit de montaje incluido",
    ],
    specs: [
      { label: "Material", value: "Acero estructural" },
      { label: "Diámetro de tubo", value: "60 mm" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Incluye", value: "Kit de montaje y tornillería" },
      { label: "Vehículos", value: "Toyota Hilux (2005 – 2025)" },
    ],
    installation: {
      text: "Instalación coordinada con turno. Se entrega armada y ajustada.",
      includes: ["Ajuste sobre los puntos originales", "Sellado de anclajes", "Control de torque"],
    },
    media: [
      photo("/assets/designcar/hilux-barra-antivuelco4.jpg", "Barra antivuelco instalada en una Toyota Hilux"),
      slot("Foto: detalle lateral del montaje — 4:3 · 1200×900", "Detalle lateral del montaje de la barra en la Hilux"),
    ],
    featured: true,
  },
  {
    slug: "barra-antivuelco-ranger",
    name: "Barra antivuelco para Ranger",
    category: "barras-antivuelco",
    vehicles: ["ford-ranger"],
    type: "Barra deportiva",
    benefit: "Perfil deportivo que acompaña la línea de la Ranger nueva.",
    description: [
      "Barra de perfil deportivo para la Ranger, con la medida de cada generación. Consultanos el año y te confirmamos la versión que le corresponde.",
      "Mantiene la agresividad justa de la línea sin caer en el tuning: se ve como equipo original bien puesto.",
    ],
    highlights: [
      "Perfil deportivo que respeta la línea del vehículo",
      "Versiones por generación: confirmamos por año",
      "Acero con protección anticorrosiva",
      "Compatible con cobertor rígido",
    ],
    specs: [
      { label: "Material", value: "Acero con protección anticorrosiva" },
      { label: "Perfil", value: "Deportivo" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Vehículos", value: "Ford Ranger (2012 – 2025)" },
    ],
    media: [
      photo("/assets/designcar/barra-ranger.jpg", "Barra antivuelco instalada en una Ford Ranger"),
      slot("Foto: barra con cobertor montado — 4:3 · 1200×900", "Barra antivuelco de Ranger junto al cobertor de caja"),
    ],
    featured: true,
  },
  {
    slug: "barra-antivuelco-s10",
    name: "Barra antivuelco para S10",
    category: "barras-antivuelco",
    vehicles: ["chevrolet-s10"],
    type: "Barra cromada",
    benefit: "Terminación cromada que le da presencia a la S10.",
    description: [
      "Si buscás que la camioneta se vea mejor sin exagerar, la versión cromada es la que más nos piden para la S10.",
      "Misma función de protección y anclaje, con una terminación que aguanta el lavado y el sol sin picarse.",
    ],
    highlights: [
      "Terminación cromada de larga duración",
      "Calce específico para la S10",
      "Acero con tratamiento anticorrosivo",
      "Kit de montaje incluido",
    ],
    specs: [
      { label: "Material", value: "Acero cromado" },
      { label: "Terminación", value: "Cromada" },
      { label: "Incluye", value: "Kit de montaje" },
      { label: "Vehículos", value: "Chevrolet S10 (2012 – 2025)" },
    ],
    media: [
      photo("/assets/designcar/barra-s10.jpg", "Barra antivuelco cromada instalada en una Chevrolet S10"),
      slot("Foto: detalle de la terminación cromada — 4:3 · 1200×900", "Detalle de la terminación cromada de la barra antivuelco"),
    ],
  },
  {
    slug: "barra-antivuelco-toro",
    name: "Barra antivuelco para Fiat Toro",
    category: "barras-antivuelco",
    vehicles: ["fiat-toro"],
    type: "Barra deportiva",
    benefit: "Diseñada para las medidas propias de la caja de la Toro.",
    description: [
      "La Toro tiene una caja más corta y con medidas particulares: una barra genérica queda mal. Esta está pensada para el modelo.",
      "Queda firme, sin ruidos y sin sobresalir del contorno de la caja.",
    ],
    highlights: [
      "Medida propia de la caja de la Toro",
      "Sin ruidos ni vibraciones a velocidad de ruta",
      "Compatible con lona de batea original",
      "Instalación sin perforaciones innecesarias",
    ],
    specs: [
      { label: "Material", value: "Acero estructural" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Incluye", value: "Kit de montaje" },
      { label: "Vehículos", value: "Fiat Toro (2016 – 2025)" },
    ],
    media: [
      photo("/assets/designcar/barra-toro2.jpg", "Barra antivuelco instalada en una Fiat Toro"),
      slot("Foto: barra montada con lona — 4:3 · 1200×900", "Barra antivuelco de Fiat Toro con la lona de batea colocada"),
    ],
  },
  {
    slug: "barra-antivuelco-saveiro-utilitarios",
    name: "Barra antivuelco para Saveiro y utilitarios",
    category: "barras-antivuelco",
    vehicles: ["otros-modelos"],
    type: "Barra universal",
    benefit: "Para Saveiro, Oroch y utilitarios de caja chica.",
    description: [
      "Versión para cajas chicas y utilitarios: Saveiro, Oroch y similares. Si tenés otro modelo, escribinos con el año y te confirmamos la medida.",
      "Es la solución para quien usa la camioneta para trabajar y necesita sujetar carga sin apoyarla contra la luneta.",
    ],
    highlights: [
      "Para cajas chicas y utilitarios",
      "Consultamos el año antes de confirmar la medida",
      "Estructura de acero reforzada",
      "Kit de montaje incluido",
    ],
    specs: [
      { label: "Material", value: "Acero reforzado" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Vehículos", value: "VW Saveiro, Renault Oroch y similares" },
      { label: "Incluye", value: "Kit de montaje" },
    ],
    media: [
      photo("/assets/designcar/barra-saveiro.jpg", "Barra antivuelco instalada en una Volkswagen Saveiro"),
      slot("Foto: barra sobre caja chica — 4:3 · 1200×900", "Barra antivuelco montada sobre una caja chica de utilitario"),
    ],
  },

  /* --------------------------- Lonas y cobertores ---------------------------- */
  {
    slug: "lona-maritima-reforzada",
    name: "Lona marítima reforzada",
    category: "lonas-y-cobertores",
    vehicles: ALL,
    type: "Lona marítima",
    benefit: "Cierra la caja y aguanta lluvia, sol y uso pesado.",
    description: [
      "Es la lona que recomendamos cuando la camioneta trabaja todos los días: material marítimo reforzado, costuras dobles y grampas inoxidables.",
      "Se corta a la medida de la caja de tu modelo, con los broches ya colocados para que la sujetes en el acto.",
    ],
    highlights: [
      "Tela marítima reforzada, resistente a UV y lluvia",
      "Costuras dobles y grampas inoxidables",
      "Se corta a la medida de tu caja",
      "Kit de sujeción y tensores incluidos",
    ],
    specs: [
      { label: "Material", value: "Tela marítima reforzada" },
      { label: "Sujeción", value: "Grampas inoxidables y elásticos tensores" },
      { label: "Medida", value: "Cortada según el modelo" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger, S10, Toro y más" },
    ],
    media: [
      photo("/assets/designcar/novedad-lonas.jpg", "Lona marítima reforzada colocada sobre la caja de una camioneta"),
      slot("Foto: detalle de costura y grampas — 4:3 · 1200×900", "Detalle de la costura doble y las grampas de la lona"),
      slot("Foto: lona tensada vista trasera — 4:3 · 1200×900", "Lona marítima tensada vista desde la parte trasera"),
    ],
    featured: true,
  },
  {
    slug: "cobertor-rigido-plastico",
    name: "Cobertor rígido de plástico",
    category: "lonas-y-cobertores",
    vehicles: ALL,
    type: "Cobertor rígido",
    benefit: "Caja cerrada, prolija y con llave. Se abre en segundos.",
    description: [
      "El cobertor rígido cierra la caja como si fuera un baúl: deja de entrar agua y polvo, y lo que llevás queda fuera de la vista.",
      "Se acciona con llave y se levanta de una sola vez, así que cargar y descargar sigue siendo rápido.",
    ],
    highlights: [
      "Cierre con llave, contenido fuera de la vista",
      "Protege la carga de lluvia y polvo",
      "Apertura simple y rápida, sin desmontar nada",
      "Pintado o texturado, según la versión",
    ],
    specs: [
      { label: "Material", value: "Plástico reforzado" },
      { label: "Apertura", value: "Con llave, de una sola pieza" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger, S10, Toro y más" },
    ],
    installation: {
      text: "Se coloca con los herrajes del modelo. Coordinamos turno si preferís que lo instalemos nosotros.",
      includes: ["Calce sobre la caja", "Regulación de cierre y bisagras", "Prueba de estanqueidad"],
    },
    media: [
      photo("/assets/designcar/lonas_cobertores/amarok-cobertor-e6931d4a94bd.jpg", "Cobertor rígido de plástico montado sobre la caja de una camioneta"),
      photo("/assets/designcar/lonas_cobertores/cobertor-amarok-de4667f59314.jpg", "Detalle de los herrajes y la apertura del cobertor"),
    ],
    featured: true,
  },
  {
    slug: "cobertor-enrollable",
    name: "Cobertor enrollable",
    category: "lonas-y-cobertores",
    vehicles: ALL,
    type: "Cobertor enrollable",
    benefit: "Práctico para el día a día: se enrolla y liberás la caja completa.",
    description: [
      "Si cargás y descargás varias veces por día, el enrollable es el más cómodo: lo corrés hacia el frente y la caja queda libre.",
      "Mantiene la línea baja de la camioneta y no te limita la altura cuando llevás un bulto grande.",
    ],
    highlights: [
      "Se enrolla y deja la caja completamente libre",
      "Perfil bajo, no cambia la altura del vehículo",
      "Cierre con llave en toda la barra",
      "Instalación sin perforar la caja",
    ],
    specs: [
      { label: "Material", value: "Lona reforzada con barra de aluminio" },
      { label: "Accionamiento", value: "Manual, enrollable" },
      { label: "Terminación", value: "Negro" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger, S10, Toro y más" },
    ],
    media: [
      slot("Foto: cobertor enrollable cerrado — 4:3 · 1200×900", "Cobertor enrollable cerrado sobre la caja"),
      slot("Foto: cobertor enrollado — 4:3 · 1200×900", "Cobertor enrollado hacia el frente de la caja"),
    ],
  },
  {
    slug: "lona-de-batea-con-estructura",
    name: "Lona de batea con estructura",
    category: "lonas-y-cobertores",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10"],
    type: "Lona con estructura",
    benefit: "Altura extra y cierre firme para carga alta o herramientas.",
    description: [
      "Suma un marco de estructura que le da altura a la caja: podés cargar más alto y igual queda tapado y cerrado.",
      "Es la opción de los que trabajan con la camioneta: herramientas, materiales y equipos quedan protegidos y fuera de la vista.",
    ],
    highlights: [
      "Estructura con altura extra sobre la caja",
      "Arcos desmontables en minutos",
      "Lona tensada con elásticos y broches",
      "Ideal para uso de trabajo",
    ],
    specs: [
      { label: "Estructura", value: "Arcos metálicos desmontables" },
      { label: "Lona", value: "Tela marítima reforzada" },
      { label: "Altura", value: "Versiones baja y alta" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger y S10" },
    ],
    installation: {
      text: "Es el accesorio que más conviene que instalemos nosotros: lleva regulación de arcos y tensado final.",
      includes: ["Montaje de arcos", "Tensado y regulación de lona", "Explicación de desmontaje"],
    },
    media: [
      slot("Foto: lona con estructura montada — 4:3 · 1200×900", "Lona de batea con estructura montada sobre la caja"),
      slot("Foto: detalle de arcos — 4:3 · 1200×900", "Detalle de los arcos desmontables de la estructura"),
    ],
  },
  {
    slug: "kit-sujecion-y-tensores",
    name: "Kit de sujeción y tensores",
    category: "lonas-y-cobertores",
    vehicles: ALL,
    type: "Kit de sujeción",
    benefit: "Repuestos para que la lona siga tensando como el primer día.",
    description: [
      "Con el uso, los elásticos se vencen y las grampas se pierden. Este kit repone todo para que la lona vuelva a quedar tensa.",
      "También sirve si compraste la camioneta usada y la lona no tiene sus broches completos.",
    ],
    highlights: [
      "Elásticos, grampas y broches de repuesto",
      "Compatible con lonas marítimas y cobertores",
      "Se coloca sin herramientas especiales",
      "Ideal para revisión antes de un viaje largo",
    ],
    specs: [
      { label: "Incluye", value: "Elásticos tensores, grampas y broches" },
      { label: "Material", value: "Acero inoxidable y elástico reforzado" },
      { label: "Compatibilidad", value: "Lonas y cobertores de caja" },
    ],
    media: [
      slot("Foto: kit completo de sujeción — 4:3 · 1200×900", "Kit completo de elásticos, grampas y broches de sujeción"),
    ],
  },

  /* --------------------------------- Estribos -------------------------------- */
  {
    slug: "estribos-tubulares-negros",
    name: "Estribos tubulares negros",
    category: "estribos",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10", "fiat-toro"],
    type: "Estribo tubular",
    benefit: "Subís y bajás sin esfuerzo y el zócalo queda protegido.",
    description: [
      "Estribo tubular de 3 pulgadas con superficie antideslizante y terminación negra. Es el clásico que combina con cualquier color de camioneta.",
      "Protege el zócalo de piedras en el camino de tierra y evita que los pasajeros se trepen al asiento desde el borde.",
    ],
    highlights: [
      "Tubo de 3\" con superficie antideslizante",
      "Soporta el peso de dos adultos sin flexar",
      "Terminación negra resistente a piedras y lavado",
      "Se monta en los anclajes originales del vehículo",
    ],
    specs: [
      { label: "Material", value: "Acero tubular con pintura epoxi" },
      { label: "Diámetro", value: "3 pulgadas" },
      { label: "Terminación", value: "Negro epoxi" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger, S10 y Toro" },
    ],
    installation: {
      text: "La instalación es rápida y la hacemos sin modificar los soportes originales.",
      includes: ["Montaje sobre anclajes originales", "Silicona selladora en los apoyos", "Control de torque"],
    },
    media: [
      photo("/assets/designcar/estribos/estribos-camioneta-fba4ad7647d3.jpg", "Estribo tubular negro montado en una camioneta"),
      photo("/assets/designcar/estribos/estribo-hilux-negro-066186f86e3b.jpg", "Detalle de la superficie antideslizante del estribo"),
    ],
    featured: true,
  },
  {
    slug: "estribos-de-aluminio",
    name: "Estribos de aluminio antideslizante",
    category: "estribos",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10"],
    type: "Estribo de aluminio",
    benefit: "Más livianos y con plataforma ancha para pisar seguro.",
    description: [
      "Plataforma ancha de aluminio con nervaduras antideslizantes: la pisada es firme incluso con barro en la suela.",
      "Al ser de aluminio pesan menos que los tubulares de acero y no se oxidan.",
    ],
    highlights: [
      "Plataforma ancha con nervaduras antideslizantes",
      "Aluminio liviano, no se oxida",
      "Pisada segura con barro o lluvia",
      "Terminación en negro o plateado",
    ],
    specs: [
      { label: "Material", value: "Aluminio extruido" },
      { label: "Superficie", value: "Nervaduras antideslizantes" },
      { label: "Terminación", value: "Negro o plateado" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger y S10" },
    ],
    media: [
      slot("Foto: estribo de aluminio montado — 4:3 · 1200×900", "Estribo de aluminio con plataforma antideslizante montado"),
    ],
  },
  {
    slug: "estribos-tipo-peldano",
    name: "Estribos tipo peldaño",
    category: "estribos",
    vehicles: ["toyota-hilux", "ford-ranger", "chevrolet-s10", "otros-modelos"],
    type: "Estribo tipo peldaño",
    benefit: "Un escalón sólido para camionetas levantadas.",
    description: [
      "Si levantaste la suspensión o calzás cubiertas más grandes, el peldaño resuelve la altura: es un escalón fijo, bien anclado, donde apoyás el pie completo.",
      "Muy elegido en camionetas de trabajo y en las que se usan con barro.",
    ],
    highlights: [
      "Escalón fijo de apoyo completo",
      "Ideal para camionetas con suspensión levantada",
      "Anclaje reforzado al chasis",
      "No acumula barro entre el estribo y el zócalo",
    ],
    specs: [
      { label: "Material", value: "Acero con pintura epoxi" },
      { label: "Tipo", value: "Peldaño fijo" },
      { label: "Terminación", value: "Negro" },
      { label: "Vehículos", value: "Hilux, Ranger, S10 y utilitarios" },
    ],
    media: [
      slot("Foto: estribo peldaño montado — 4:3 · 1200×900", "Estribo tipo peldaño montado en una camioneta levantada"),
    ],
  },
  {
    slug: "estribos-electricos-retractiles",
    name: "Estribos eléctricos retráctiles",
    category: "estribos",
    vehicles: ["volkswagen-amarok", "ford-ranger", "chevrolet-s10"],
    type: "Estribo eléctrico",
    benefit: "Aparecen al abrir la puerta y se esconden al cerrarla.",
    description: [
      "El estribo baja automáticamente cuando abrís la puerta y se retrae al cerrarla. La camioneta queda con la línea limpia y sin estribo a la vista.",
      "Incluye motores por lado, módulo de control e iluminación de cortesía.",
    ],
    highlights: [
      "Despliegue automático al abrir la puerta",
      "Línea limpia cuando está retraído",
      "Iluminación LED de cortesía",
      "Kit eléctrico completo con módulo de control",
    ],
    specs: [
      { label: "Accionamiento", value: "Eléctrico, un motor por lado" },
      { label: "Material", value: "Aluminio con terminación antideslizante" },
      { label: "Incluye", value: "Motores, módulo de control y arnés" },
      { label: "Vehículos", value: "Amarok, Ranger y S10 (consultar año)" },
    ],
    installation: {
      text: "Requiere instalación eléctrica: lo hacemos en el taller y verificamos el funcionamiento puerta por puerta.",
      includes: ["Conexionado eléctrico", "Programación del módulo", "Prueba de apertura y cierre"],
    },
    media: [
      slot("Foto: estribo eléctrico desplegado — 4:3 · 1200×900", "Estribo eléctrico retráctil desplegado junto a la puerta"),
      slot("Foto: estribo eléctrico retraído — 4:3 · 1200×900", "Estribo eléctrico retraído bajo el zócalo"),
    ],
  },
  {
    slug: "kit-montaje-estribos",
    name: "Kit de montaje para estribos",
    category: "estribos",
    vehicles: ALL,
    type: "Kit de montaje",
    benefit: "Soportes y tornillería para reinstalar o reponer el estribo.",
    description: [
      "Si perdiste un soporte, doblaste un anclaje o compraste estribos usados sin herrajes, este kit repone lo que falta.",
      "Incluye soportes, tornillería y arandelas del modelo que nos indiques.",
    ],
    highlights: [
      "Soportes y tornillería por modelo",
      "Permite reinstalar estribos existentes",
      "Tornillería de acero con tratamiento anticorrosivo",
      "Consultanos por el modelo y año",
    ],
    specs: [
      { label: "Incluye", value: "Soportes, tornillería y arandelas" },
      { label: "Material", value: "Acero con tratamiento anticorrosivo" },
      { label: "Compatibilidad", value: "Según modelo y año" },
    ],
    media: [
      slot("Foto: soportes y tornillería del kit — 4:3 · 1200×900", "Soportes y tornillería que componen el kit de montaje"),
    ],
  },

  /* ------------------------------ Portaequipajes ----------------------------- */
  {
    slug: "portaequipajes-de-techo",
    name: "Portaequipajes de techo",
    category: "portaequipajes",
    vehicles: ALL,
    type: "Parrilla de techo",
    benefit: "Sumá espacio de carga sin ocupar la caja.",
    description: [
      "Parrilla de techo para llevar equipaje, herramientas o material de trabajo liberando la caja. Se monta sobre los anclajes del vehículo.",
      "Te ayudamos a calcular la carga según el modelo: cada techo tiene su límite y no conviene pasarlo.",
    ],
    highlights: [
      "Libera la caja para lo que realmente va adentro",
      "Montaje sobre anclajes originales del techo",
      "Estructura de aluminio o acero, según versión",
      "Calculamos la carga máxima junto con vos",
    ],
    specs: [
      { label: "Material", value: "Aluminio o acero, según versión" },
      { label: "Montaje", value: "Sobre anclajes originales" },
      { label: "Uso", value: "Equipaje, herramientas y carga de trabajo" },
      { label: "Vehículos", value: "Todos los modelos de la línea" },
    ],
    installation: {
      text: "Lo instalamos nosotros y te explicamos cómo distribuir la carga de forma segura.",
      includes: ["Montaje de barrales", "Fijación de la parrilla", "Recomendación de distribución de carga"],
    },
    media: [
      photo("/assets/designcar/portaequipaje.jpg", "Portaequipajes de techo instalado en una camioneta"),
      slot("Foto: detalle del anclaje al techo — 4:3 · 1200×900", "Detalle del anclaje del portaequipajes al techo"),
    ],
    featured: true,
  },
  {
    slug: "parrilla-valijon",
    name: "Parrilla valijón",
    category: "portaequipajes",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10", "fiat-toro"],
    type: "Valijón",
    benefit: "Superficie amplia y contenida para valijas y bultos grandes.",
    description: [
      "El valijón tiene baranda perimetral, así que nada se corre ni se vuela en la ruta. Es lo que más eligen los que viajan en familia.",
      "Se combina con los barrales del portaequipajes y con bolsos de techo.",
    ],
    highlights: [
      "Baranda perimetral que contiene la carga",
      "Superficie amplia para valijas y bolsos",
      "Compatible con bolso de techo",
      "Estructura liviana y resistente",
    ],
    specs: [
      { label: "Material", value: "Aluminio con baranda" },
      { label: "Superficie", value: "Amplia, con contención perimetral" },
      { label: "Uso", value: "Equipaje y bultos de viaje" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger, S10 y Toro" },
    ],
    media: [
      slot("Foto: valijón con equipaje — 4:3 · 1200×900", "Parrilla valijón cargada con equipaje"),
    ],
  },
  {
    slug: "barrales-transversales",
    name: "Barrales transversales",
    category: "portaequipajes",
    vehicles: ALL,
    type: "Barrales transversales",
    benefit: "La base del sistema: sobre ellos va todo lo demás.",
    description: [
      "Son los travesaños que sostienen parrillas, valijones y portabicicletas. Si ya tenés barrales de fábrica, te sumamos el travesaño que falta.",
      "Con llave de seguridad, para que nadie desarme el sistema en la calle.",
    ],
    highlights: [
      "Base para parrillas, valijones y portabicicletas",
      "Cierre con llave de seguridad",
      "Compatible con barrales de fábrica",
      "Perfil aerodinámico que no silba en ruta",
    ],
    specs: [
      { label: "Material", value: "Aluminio anodizado" },
      { label: "Seguridad", value: "Cierre con llave" },
      { label: "Perfil", value: "Aerodinámico" },
      { label: "Vehículos", value: "Todos los modelos de la línea" },
    ],
    media: [
      slot("Foto: barrales transversales montados — 4:3 · 1200×900", "Barrales transversales montados sobre el techo"),
    ],
  },
  {
    slug: "rack-porta-canasta",
    name: "Rack porta canasta",
    category: "portaequipajes",
    vehicles: ["toyota-hilux", "ford-ranger", "chevrolet-s10", "otros-modelos"],
    type: "Rack",
    benefit: "Carga alta sobre el techo para el trabajo pesado.",
    description: [
      "Rack cerrado, tipo canasta, para transportar carga voluminosa y liviana: caños, escaleras, aislantes, maderas.",
      "Muy usado por instaladores y contratistas, porque permite trabajar sin desarmar la caja.",
    ],
    highlights: [
      "Estructura cerrada tipo canasta",
      "Pensado para caños, escaleras y perfiles",
      "Terminación resistente a la intemperie",
      "Compatible con barrales del vehículo",
    ],
    specs: [
      { label: "Material", value: "Acero con pintura epoxi" },
      { label: "Formato", value: "Cerrado tipo canasta" },
      { label: "Uso", value: "Carga de trabajo alta y voluminosa" },
      { label: "Vehículos", value: "Hilux, Ranger, S10 y utilitarios" },
    ],
    media: [
      slot("Foto: rack porta canasta con carga — 4:3 · 1200×900", "Rack porta canasta transportando perfiles y caños"),
    ],
  },
  {
    slug: "portabicicletas-de-techo",
    name: "Portabicicletas de techo",
    category: "portaequipajes",
    vehicles: ALL,
    type: "Portabicicletas",
    benefit: "Llevá las bicis afuera, sin ocupar la caja.",
    description: [
      "Soporte de techo para bicicletas, con sujeción de cuadro y ruedas. Se monta sobre los barrales transversales.",
      "La opción para los que salen a pedal y no quieren ensuciar la caja ni la carga del viaje.",
    ],
    highlights: [
      "Sujeción de cuadro y ruedas con correas",
      "Montaje sobre barrales transversales",
      "Compatible con bicis de adulto y rodado 29",
      "Se coloca y se saca sin herramientas",
    ],
    specs: [
      { label: "Material", value: "Aluminio y acero" },
      { label: "Capacidad", value: "1 bicicleta por soporte" },
      { label: "Montaje", value: "Sobre barrales transversales" },
      { label: "Vehículos", value: "Todos los modelos de la línea" },
    ],
    media: [
      slot("Foto: portabicicletas con bici montada — 4:3 · 1200×900", "Portabicicletas de techo con una bicicleta montada"),
    ],
  },

  /* ------------------------------- Deflectores ------------------------------- */
  {
    slug: "deflector-de-capot",
    name: "Deflector de capot",
    category: "deflectores",
    vehicles: ALL,
    type: "Deflector de capot",
    benefit: "Menos piedras en el parabrisas y menos bichos en el capot.",
    description: [
      "Es la pieza que más agradecen los que hacen ruta: desvía el aire y con él las piedras y los insectos, antes de que lleguen al parabrisas.",
      "Se coloca sin perforar y se nota apenas en la línea del frente.",
    ],
    highlights: [
      "Desvía piedras y reduce el impacto en el parabrisas",
      "Colocación sin perforar (versión autoadhesiva)",
      "Acrílico tratado contra los rayos UV",
      "Se puede quitar sin dejar marcas",
    ],
    specs: [
      { label: "Material", value: "Acrílico tratado UV" },
      { label: "Colocación", value: "Autoadhesiva, sin perforar" },
      { label: "Terminación", value: "Oscuro ahumado" },
      { label: "Vehículos", value: "Según modelo y año" },
    ],
    media: [
      slot("Foto: deflector de capot colocado — 4:3 · 1200×900", "Deflector de capot colocado en la parte delantera"),
      slot("Foto: detalle del ajuste al capot — 4:3 · 1200×900", "Detalle del ajuste del deflector sobre el capot"),
    ],
    featured: true,
  },
  {
    slug: "deflector-de-ventanillas",
    name: "Deflector de ventanillas",
    category: "deflectores",
    vehicles: ALL,
    type: "Deflector de ventanillas",
    benefit: "Ventanilla entreabierta sin que entre lluvia ni viento.",
    description: [
      "Permite ventilar la camioneta con la ventanilla baja, incluso con lluvia. Se termina el empañado del parabrisas en invierno.",
      "Juego completo para las cuatro puertas, con la medida de cada modelo.",
    ],
    highlights: [
      "Ventilación con lluvia, sin mojarte",
      "Menos empañado del parabrisas en invierno",
      "Reduce el ruido del viento con ventanilla baja",
      "Juego completo, medida por modelo",
    ],
    specs: [
      { label: "Material", value: "Acrílico ahumado" },
      { label: "Juego", value: "4 piezas (las cuatro puertas)" },
      { label: "Colocación", value: "Sin perforar" },
      { label: "Vehículos", value: "Según modelo y año" },
    ],
    media: [
      slot("Foto: deflectores en las cuatro puertas — 4:3 · 1200×900", "Juego de deflectores de ventanillas colocado en las cuatro puertas"),
    ],
  },
  {
    slug: "rompevientos-de-techo",
    name: "Rompevientos de techo",
    category: "deflectores",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10"],
    type: "Rompevientos",
    benefit: "Corta el ruido del viento y la turbulencia sobre la cabina.",
    description: [
      "Se coloca en el borde delantero del techo y ordena el aire antes de que llegue al parabrisas. En ruta se nota en el ruido.",
      "También ayuda a mantener más limpio el frente de la camioneta.",
    ],
    highlights: [
      "Reduce el ruido del viento en ruta",
      "Menos insectos en el frente y el techo",
      "Terminación oscura que combina con el vehículo",
      "Colocación sin perforar",
    ],
    specs: [
      { label: "Material", value: "Acrílico ahumado" },
      { label: "Colocación", value: "Autoadhesiva" },
      { label: "Terminación", value: "Oscuro ahumado" },
      { label: "Vehículos", value: "Amarok, Hilux, Ranger y S10" },
    ],
    media: [
      slot("Foto: rompevientos montado — 4:3 · 1200×900", "Rompevientos de techo montado sobre la cabina"),
    ],
  },
  {
    slug: "faldon-cubre-capot",
    name: "Faldón cubre capot",
    category: "deflectores",
    vehicles: ALL,
    type: "Faldón",
    benefit: "Protege el frente de la camioneta de piedrazos y arena.",
    description: [
      "Cubretapón de capot de vinilo reforzado, para los que hacen mucho camino de tierra: se lleva el golpe en lugar de la pintura.",
      "Se ajusta con broches y no necesita ninguna modificación.",
    ],
    highlights: [
      "Protege la pintura del frente de la camioneta",
      "Vinilo reforzado resistente al sol y la arena",
      "Ajuste con broches, sin perforar",
      "Se lava y se coloca en minutos",
    ],
    specs: [
      { label: "Material", value: "Vinilo reforzado" },
      { label: "Fijación", value: "Broches, sin perforar" },
      { label: "Terminación", value: "Negro texturado" },
      { label: "Vehículos", value: "Según modelo y año" },
    ],
    media: [
      slot("Foto: faldón colocado sobre el capot — 4:3 · 1200×900", "Faldón cubre capot colocado sobre la parte delantera"),
    ],
  },

  /* --------------------------------- Camping --------------------------------- */
  {
    slug: "reposera-plegable",
    name: "Reposera plegable",
    category: "camping",
    vehicles: ALL,
    type: "Reposeras",
    benefit: "Se guarda plana en la caja y se arma en dos segundos.",
    description: [
      "Reposera de estructura plegable y lona resistente. Se guarda plana y entra sin ocupar lugar entre los otros bultos.",
      "La llevamos en todos los viajes: es de esas cosas que parecen un detalle y se usan siempre.",
    ],
    highlights: [
      "Se pliega plana para el traslado",
      "Estructura de acero liviana",
      "Lona resistente, fácil de limpiar",
      "Soporta uso intensivo en camping y playa",
    ],
    specs: [
      { label: "Estructura", value: "Acero plegable" },
      { label: "Lona", value: "Tela reforzada" },
      { label: "Plegada", value: "Formato plano" },
      { label: "Uso", value: "Camping, playa y pesca" },
    ],
    media: [
      slot("Foto: reposera en uso — 4:3 · 1200×900", "Reposera plegable armada en una salida de camping"),
    ],
  },
  {
    slug: "conservadora-50-litros",
    name: "Conservadora 50 litros",
    category: "camping",
    vehicles: ALL,
    type: "Conservadoras",
    benefit: "Mantiene el frío y el hielo durante todo el viaje largo.",
    description: [
      "Conservadora de 50 litros con paredes de alta densidad, pensada para viajes largos y para llevar la carga completa sin perder frío.",
      "Tiene asas reforzadas y drenaje inferior para vaciarla sin darla vuelta.",
    ],
    highlights: [
      "Capacidad de 50 litros",
      "Paredes de alta densidad que conservan el hielo",
      "Drenaje inferior para vaciar el agua",
      "Asas reforzadas para carga y descarga",
    ],
    specs: [
      { label: "Capacidad", value: "50 litros" },
      { label: "Aislación", value: "Paredes de alta densidad" },
      { label: "Drenaje", value: "Inferior, con tapón" },
      { label: "Uso", value: "Viajes largos y campamentos" },
    ],
    media: [
      slot("Foto: conservadora cargada — 4:3 · 1200×900", "Conservadora de 50 litros cargada en la caja de la camioneta"),
    ],
  },
  {
    slug: "cadenas-para-nieve",
    name: "Cadenas para nieve",
    category: "camping",
    vehicles: ALL,
    type: "Cadenas para nieve",
    benefit: "Indispensables para subir a la nieve con seguridad.",
    description: [
      "Si vas a la nieve en invierno, las cadenas son obligatorias en varios tramos. Te asesoramos por la medida correcta según el rodado.",
      "Se colocan rápido con la camioneta detenida y traen el ajustador.",
    ],
    highlights: [
      "Medidas por rodado: consultanos la tuya",
      "Colocación rápida con ajustador incluido",
      "Eslabones reforzados para uso en ruta de montaña",
      "Incluye bolso de guardado",
    ],
    specs: [
      { label: "Material", value: "Eslabones de acero templado" },
      { label: "Medidas", value: "Según rodado (consultar)" },
      { label: "Incluye", value: "Ajustador y bolso de guardado" },
      { label: "Uso", value: "Rutas de montaña y nieve" },
    ],
    media: [
      slot("Foto: cadena montada en la rueda — 4:3 · 1200×900", "Cadena para nieve montada sobre la cubierta de la camioneta"),
    ],
  },
  {
    slug: "kit-amarre-y-organizador",
    name: "Kit de amarre y organizador de caja",
    category: "camping",
    vehicles: ALL,
    type: "Organización de caja",
    benefit: "Todo sujeto y a mano: nada suelto ni golpeando en la caja.",
    description: [
      "Juego de cintas de amarre, ganchos y caja organizadora para que los bultos chicos no anden sueltos por la caja.",
      "Es lo primero que recomendamos después de poner la lona: cambia el orden de todo el vehículo.",
    ],
    highlights: [
      "Cintas de amarre con tensor y ganchos protegidos",
      "Caja organizadora para herramientas y accesorios",
      "Evita golpes entre bultos durante el viaje",
      "Kit completo listo para usar",
    ],
    specs: [
      { label: "Incluye", value: "Cintas de amarre, ganchos y caja organizadora" },
      { label: "Cintas", value: "Con tensor de trinquete" },
      { label: "Material", value: "Poliéster de alta resistencia" },
      { label: "Uso", value: "Trabajo, viaje y camping" },
    ],
    media: [
      slot("Foto: kit de amarre completo — 4:3 · 1200×900", "Kit de cintas de amarre y caja organizadora para la caja de la camioneta"),
    ],
  },
  {
    slug: "carpa-para-caja-de-pickup",
    name: "Carpa para caja de pickup",
    category: "camping",
    vehicles: ["volkswagen-amarok", "toyota-hilux", "ford-ranger", "chevrolet-s10"],
    type: "Carpa",
    benefit: "Dormís arriba de la camioneta, seco y lejos del suelo.",
    description: [
      "Carpa que se monta sobre la caja, ideal para viajes de pesca y campamentos largos: dormís en altura, sin barro ni humedad del piso.",
      "Se arma sobre las barras antivuelco y los barrales, y trae colchoneta y escalera.",
    ],
    highlights: [
      "Se monta sobre la caja, sin dormir en el suelo",
      "Base rígida que nivela el descanso",
      "Incluye colchoneta y escalera de acceso",
      "Armado rápido para campamentos de ruta",
    ],
    specs: [
      { label: "Montaje", value: "Sobre caja, con barras antivuelco" },
      { label: "Incluye", value: "Colchoneta y escalera" },
      { label: "Capacidad", value: "2 personas" },
      { label: "Uso", value: "Campamentos y travesías" },
    ],
    installation: {
      text: "Coordinamos el montaje sobre las barras de tu camioneta y verificamos el ajuste de la base.",
      includes: ["Montaje sobre barras", "Ajuste de tensores", "Prueba de armado con vos"],
    },
    media: [
      slot("Foto: carpa montada en la caja — 4:3 · 1200×900", "Carpa montada sobre la caja de una pickup en un campamento"),
    ],
  },
];

export const productBySlug = (slug: string | undefined) =>
  products.find((product) => product.slug === slug);

export const productsByCategory = (categorySlug: string) =>
  products.filter((product) => product.category === categorySlug);

export const productsByVehicle = (vehicleSlug: string) =>
  products.filter((product) => product.vehicles.includes(vehicleSlug));

/** Distinct product types inside a category, used to build the type filter. */
export const productTypes = (categorySlug: string) =>
  Array.from(new Set(productsByCategory(categorySlug).map((product) => product.type)));

export const featuredProducts = products.filter((product) => product.featured);

/** Counts of compatible products per category for a given vehicle. */
export const categoryCountByVehicle = (vehicleSlug: string): Record<string, number> =>
  productsByVehicle(vehicleSlug).reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});
