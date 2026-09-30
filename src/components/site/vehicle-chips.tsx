import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { vehicles } from "@/data/vehicles";

interface VehicleChipsProps {
  selected: string | null;
  onSelect: (slug: string | null) => void;
  /** Adds a "Todas las camionetas" chip that clears the selection. */
  allowClear?: boolean;
  clearLabel?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Selectable vehicle chips. Used as the home hero selector and as the vehicle
 * filter on listing pages — same component, same keyboard behaviour.
 */
export const VehicleChips = ({
  selected,
  onSelect,
  allowClear = false,
  clearLabel = "Todas las camionetas",
  className,
  ariaLabel = "Elegí tu camioneta",
}: VehicleChipsProps) => (
  <div role="group" aria-label={ariaLabel} className={cn("flex flex-wrap gap-sm", className)}>
    {allowClear ? (
      <Chip selected={!selected} onClick={() => onSelect(null)}>
        {clearLabel}
      </Chip>
    ) : null}
    {vehicles.map((vehicle) => (
      <Chip
        key={vehicle.slug}
        selected={selected === vehicle.slug}
        onClick={() => onSelect(selected === vehicle.slug ? null : vehicle.slug)}
      >
        {vehicle.shortName}
      </Chip>
    ))}
  </div>
);

const Chip = ({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={cn(
      "inline-flex h-9 items-center gap-1.5 rounded-full border px-md text-[0.8125rem] font-medium transition-[background-color,border-color,color] duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      selected
        ? "border-primary bg-primary text-primary-foreground"
        : "border-input bg-card text-foreground hover:border-border-strong hover:bg-muted",
      className,
    )}
  >
    {selected ? <Check className="h-3.5 w-3.5" /> : null}
    {children}
  </button>
);
