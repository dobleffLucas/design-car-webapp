import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";

/**
 * Design Car logo. The original file is used as-is — never redrawn or
 * recoloured. Swap `logo2.png` for the final artwork and nothing else changes.
 */
export const Logo = ({
  className,
  tone = "default",
}: {
  className?: string;
  /** "inverse" is for the dark footer band. */
  tone?: "default" | "inverse";
}) => (
  <img
    src={asset("/assets/designcar/logo2.png")}
    alt={`${site.name} — equipamiento e instalación para pickups y 4x4`}
    width={200}
    height={57}
    className={cn(
      "w-auto self-start object-contain",
      tone === "inverse" && "rounded-sm bg-surface-inverse-foreground/95 px-2 py-1.5",
      className,
    )}
  />
);

/** Displays the supplied vehicle brand artwork without approximating trademarks. */
export const BrandLogo = ({ brand, src }: { brand: string; src: string }) => (
  <div className="flex h-14 items-center justify-center rounded-md border border-border bg-card px-3">
    <img src={asset(src)} alt={`Logo de ${brand}`} className="max-h-9 w-auto max-w-full object-contain" />
  </div>
);
