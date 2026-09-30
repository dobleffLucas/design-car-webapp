import { useMemo } from "react";

import { products } from "@/data/products";
import type { Product } from "@/data/types";

export interface ProductFilters {
  /** Restrict to one category slug. */
  categorySlug?: string;
  /** Restrict to products compatible with this vehicle slug. */
  vehicleSlug?: string | null;
  /** Restrict to one product type (from the per-category type filter). */
  type?: string | null;
}

/**
 * Single source of truth for listing results. Both the category page and the
 * vehicle page filter through this, so the two views can never disagree about
 * what is compatible with the selected vehicle.
 */
export const useFilteredProducts = ({
  categorySlug,
  vehicleSlug,
  type,
}: ProductFilters): Product[] =>
  useMemo(() => {
    return products.filter((product) => {
      if (categorySlug && product.category !== categorySlug) return false;
      if (vehicleSlug && !product.vehicles.includes(vehicleSlug)) return false;
      if (type && product.type !== type) return false;
      return true;
    });
  }, [categorySlug, vehicleSlug, type]);
