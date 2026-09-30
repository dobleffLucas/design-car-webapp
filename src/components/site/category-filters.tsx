import { cn } from "@/lib/utils";
import { useVehicle } from "@/hooks/use-vehicle";

import { VehicleChips } from "./vehicle-chips";

interface CategoryFiltersProps {
  /** Distinct product types available in this listing. */
  types: string[];
  activeType: string | null;
  onTypeChange: (type: string | null) => void;
  className?: string;
}

/**
 * Listing filters: the visitor's vehicle (shared with the whole site) and the
 * product type inside the current category. Both are chips, so the state is
 * visible at a glance and reachable by keyboard.
 */
export const CategoryFilters = ({
  types,
  activeType,
  onTypeChange,
  className,
}: CategoryFiltersProps) => {
  const { vehicleSlug, setVehicle } = useVehicle();

  return (
    <div className={cn("flex flex-col gap-lg", className)}>
      <fieldset className="flex flex-col gap-sm">
        <legend className="eyebrow mb-1">Filtrar por vehículo</legend>
        <VehicleChips
          selected={vehicleSlug}
          onSelect={setVehicle}
          allowClear
          clearLabel="Todas las camionetas"
        />
      </fieldset>

      {types.length > 1 ? (
        <fieldset className="flex flex-col gap-sm">
          <legend className="eyebrow mb-1">Tipo de producto</legend>
          <div role="group" aria-label="Filtrar por tipo de producto" className="flex flex-wrap gap-sm">
            <TypeChip selected={!activeType} onClick={() => onTypeChange(null)}>
              Todos
            </TypeChip>
            {types.map((type) => (
              <TypeChip
                key={type}
                selected={activeType === type}
                onClick={() => onTypeChange(activeType === type ? null : type)}
              >
                {type}
              </TypeChip>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
};

const TypeChip = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={cn(
      "inline-flex h-9 items-center rounded-full border px-md text-[0.8125rem] font-medium transition-[background-color,border-color,color] duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      selected
        ? "border-secondary bg-secondary text-secondary-foreground"
        : "border-input bg-card text-foreground hover:border-border-strong hover:bg-muted",
    )}
  >
    {children}
  </button>
);
