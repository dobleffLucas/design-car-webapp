import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { vehicles } from "@/data/vehicles";

const labelFor = (slug: string) =>
  vehicles.find((vehicle) => vehicle.slug === slug)?.shortName ?? slug;

/**
 * Static compatibility chips on product cards and detail pages. The chip that
 * matches the visitor's selected vehicle is highlighted, and the overflow is
 * collapsed so chips never wrap onto three lines.
 */
export const CompatibilityChips = ({
  vehicleSlugs,
  activeVehicleSlug,
  max = 4,
  className,
  size = "sm",
}: {
  vehicleSlugs: string[];
  activeVehicleSlug?: string | null;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}) => {
  const coversEverything = vehicleSlugs.length >= vehicles.length;
  const active = activeVehicleSlug && vehicleSlugs.includes(activeVehicleSlug) ? activeVehicleSlug : null;
  const rest = vehicleSlugs.filter((slug) => slug !== active);
  const shown = rest.slice(0, active ? max - 1 : max);
  const hidden = rest.length - shown.length;

  return (
    <ul role="list" className={cn("flex flex-wrap gap-1.5", className)}>
      {coversEverything ? (
        <li>
          <Chip tone="neutral" size={size}>
            Todas las camionetas
          </Chip>
        </li>
      ) : (
        <>
          {active ? (
            <li>
              <Chip tone="active" size={size}>
                <Check className="h-3 w-3" aria-hidden="true" />
                Tu {labelFor(active)}
              </Chip>
            </li>
          ) : null}
          {shown.map((slug) => (
            <li key={slug}>
              <Chip tone="neutral" size={size}>
                {labelFor(slug)}
              </Chip>
            </li>
          ))}
          {hidden > 0 ? (
            <li>
              <Chip tone="neutral" size={size}>
                +{hidden} más
              </Chip>
            </li>
          ) : null}
        </>
      )}
    </ul>
  );
};

const Chip = ({
  tone,
  size,
  children,
}: {
  tone: "neutral" | "active";
  size: "sm" | "md";
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full font-medium",
      size === "sm" ? "h-6 px-2 text-[0.6875rem]" : "h-7 px-2.5 text-[0.75rem]",
      tone === "active"
        ? "border border-primary/20 bg-primary-subtle text-primary-subtle-foreground"
        : "bg-muted text-muted-foreground",
    )}
  >
    {children}
  </span>
);
