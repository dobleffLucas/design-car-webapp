import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A deliberate, labelled slot for a photo that is still pending. It reserves the
 * exact aspect ratio of the final photo, so dropping the real image in later
 * causes zero layout shift.
 */
export const ImageSlot = ({
  label,
  alt,
  ratio = "aspect-[4/3]",
  showTag = true,
  compact = false,
  className,
}: {
  /** Tells the client which photo goes here, e.g. "Foto: Amarok equipada — 4:3". */
  label: string;
  alt: string;
  ratio?: string;
  showTag?: boolean;
  /** Thumbnail-sized slot: icon only, since the caption would not fit. */
  compact?: boolean;
  className?: string;
}) => (
  <div
    role="img"
    aria-label={`Imagen pendiente: ${alt}`}
    className={cn(
      "image-placeholder relative grid w-full place-items-center overflow-hidden rounded-md border border-dashed border-border-strong",
      ratio,
      className,
    )}
  >
    {compact ? (
      <ImageIcon className="h-5 w-5 text-muted-foreground/70" strokeWidth={1.5} />
    ) : (
      <div className="flex max-w-[85%] flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 text-muted-foreground/70" strokeWidth={1.5} />
        <span className="text-[0.75rem] font-medium leading-snug text-muted-foreground">
          {label}
        </span>
      </div>
    )}
    {showTag && !compact ? (
      <span className="absolute right-2 top-2 rounded-xs border border-border bg-card/90 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        Placeholder
      </span>
    ) : null}
  </div>
);
