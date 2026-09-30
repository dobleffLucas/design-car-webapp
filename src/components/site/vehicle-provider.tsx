import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import { vehicles } from "@/data/vehicles";
import { VehicleContext } from "@/lib/vehicle-context";

const STORAGE_KEY = "designcar.vehiculo";

const isKnownVehicle = (slug: string | null) =>
  !!slug && vehicles.some((vehicle) => vehicle.slug === slug);

/**
 * Holds the "my vehicle" selection for the whole site: it retitles sections,
 * filters listings, highlights compatibility chips and feeds the WhatsApp
 * messages. Persisted in localStorage and mirrored into `?vehiculo=` so a
 * filtered view can be shared or reloaded.
 */
export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stored, setStored] = useState<string | null>(null);

  // Read once on mount: URL wins over the stored preference.
  useEffect(() => {
    const fromUrl = searchParams.get("vehiculo");
    if (isKnownVehicle(fromUrl)) {
      setStored(fromUrl);
      return;
    }
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (isKnownVehicle(fromStorage)) {
      setStored(fromStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setVehicle = useCallback(
    (slug: string | null) => {
      const next = isKnownVehicle(slug) ? slug : null;
      setStored(next);
      if (next) {
        window.localStorage.setItem(STORAGE_KEY, next);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setSearchParams(
        (params) => {
          if (next) {
            params.set("vehiculo", next);
          } else {
            params.delete("vehiculo");
          }
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearVehicle = useCallback(() => setVehicle(null), [setVehicle]);

  const value = useMemo(() => {
    const vehicle = stored ? vehicles.find((item) => item.slug === stored) ?? null : null;
    return {
      vehicleSlug: vehicle?.slug ?? null,
      vehicle,
      vehicleName: vehicle?.name ?? null,
      setVehicle,
      clearVehicle,
    };
  }, [stored, setVehicle, clearVehicle]);

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
};
