import { Car, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { vehicles } from "@/data/vehicles";
import { useVehicle } from "@/hooks/use-vehicle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * The persistent "my vehicle" control. Once set, it retitles sections, filters
 * listings and is injected into every WhatsApp message on the site.
 */
export const VehiclePicker = ({ className }: { className?: string }) => {
  const { vehicle, vehicleSlug, setVehicle, clearVehicle } = useVehicle();

  return (
    <div className={cn("flex items-center gap-xs", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-md border px-md text-label transition-[background-color,border-color] duration-150 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            vehicle
              ? "border-primary/20 bg-primary-subtle text-primary-subtle-foreground hover:bg-primary-subtle/70"
              : "border-input bg-card text-foreground hover:border-border-strong hover:bg-muted",
          )}
        >
          <Car className="h-4 w-4" strokeWidth={1.7} />
          <span className="max-w-[11rem] truncate">{vehicle ? vehicle.name : "Elegí tu vehículo"}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-lg border-border p-1.5 shadow-lg">
          <DropdownMenuLabel className="px-2 py-1.5 text-eyebrow uppercase text-muted-foreground">
            Mi camioneta
          </DropdownMenuLabel>
          {vehicles.map((item) => (
            <DropdownMenuItem
              key={item.slug}
              onSelect={() => setVehicle(item.slug)}
              className={cn(
                "cursor-pointer rounded-sm px-2 py-2 text-body-s focus:bg-primary-subtle focus:text-primary-subtle-foreground",
                vehicleSlug === item.slug && "font-semibold text-primary",
              )}
            >
              <span className="flex flex-col">
                {item.name}
                <span className="text-[0.75rem] text-muted-foreground">{item.years}</span>
              </span>
            </DropdownMenuItem>
          ))}
          {vehicle ? (
            <>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onSelect={() => clearVehicle()}
                className="cursor-pointer rounded-sm px-2 py-2 text-body-s text-muted-foreground focus:bg-muted focus:text-foreground"
              >
                Ver todo el catálogo
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      {vehicle ? (
        <button
          type="button"
          onClick={clearVehicle}
          aria-label={`Quitar ${vehicle.name} de la selección`}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
