import { useContext } from "react";

import { VehicleContext } from "@/lib/vehicle-context";

/** Reads the site-wide vehicle selection. Must be used inside `VehicleProvider`. */
export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
};
