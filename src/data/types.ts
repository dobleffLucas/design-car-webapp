/**
 * Shared content types. Everything the site renders comes from `src/data/*`,
 * so swapping placeholder copy or photos for the real material is a data edit,
 * never a component rewrite.
 */

/** A reference to a photo. `src === null` renders an intentional image slot. */
export interface MediaRef {
  /** Real asset path under `public/`, or `null` when the photo is still pending. */
  src: string | null;
  /** Alt text for the real photo; also describes the pending photo in the slot. */
  alt: string;
  /** Caption shown inside the placeholder, so the client knows which photo to drop in. */
  placeholderLabel: string;
  /** Reserved aspect-ratio utility class, keeps the layout stable after the swap. */
  ratio?: string;
}

export interface Vehicle {
  slug: string;
  /** Full name shown in headings, e.g. "Toyota Hilux". */
  name: string;
  /** Short label for chips and selectors, e.g. "Hilux". */
  shortName: string;
  brand: string;
  years: string;
  tagline: string;
  description: string;
  media: MediaRef;
}

export interface Category {
  slug: string;
  name: string;
  /** Short description used on cards. */
  description: string;
  /** Longer intro used on the category page. */
  longDescription: string;
  /** Key into the category icon map. */
  icon: string;
  media: MediaRef;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Category slug. */
  category: string;
  /** Compatible vehicle slugs. */
  vehicles: string[];
  /** Product type, powers the per-category type filter. */
  type: string;
  /** One-line benefit shown on cards. */
  benefit: string;
  /** Benefit-focused paragraphs for the product page. */
  description: string[];
  /** Key benefits list. */
  highlights: string[];
  specs: ProductSpec[];
  installation?: {
    text: string;
    includes: string[];
  };
  /** Gallery: the first entry is the main image. */
  media: MediaRef[];
  /** Optional real Mercado Libre listing; never invent or infer this URL. */
  mercadoLibreUrl?: string;
  featured?: boolean;
}

export interface Branch {
  slug: string;
  name: string;
  address: string;
  city: string;
  fullAddress: string;
  hours: string[];
  /** Query used for the "Cómo llegar" Google Maps link. */
  mapsQuery: string;
  note: string;
  media: MediaRef;
}

export interface GalleryItem {
  id: string;
  caption: string;
  media: MediaRef;
}
