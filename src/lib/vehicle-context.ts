import { createContext } from "react";

import type { Vehicle } from "@/data/types";

export interface VehicleContextValue {
  /** Active vehicle slug, or `null` when the visitor has not chosen one yet. */
  vehicleSlug: string | null;
  vehicle: Vehicle | null;
  /** Full name for copy and WhatsApp messages, or `null` when unset. */
  vehicleName: string | null;
  setVehicle: (slug: string | null) => void;
  clearVehicle: () => void;
}

export const VehicleContext = createContext<VehicleContextValue | null>(null);
