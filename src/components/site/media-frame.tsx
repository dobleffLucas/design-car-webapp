import { cn } from "@/lib/utils";
import { resolveMedia } from "@/lib/asset";
import type { MediaRef } from "@/data/types";

import { ImageSlot } from "./image-slot";

/**
 * Renders a real photo when the asset exists, or a labelled slot when it does
 * not. Every image in the site goes through here, so replacing placeholder
 * photos with the real material is a data-only change.
 */
export const MediaFrame = ({
  media,
  ratio,
  className,
  imageClassName,
  showTag = true,
  compact = false,
  sizes,
}: {
  media: MediaRef;
  /** Overrides the ratio declared in the data. */
  ratio?: string;
  className?: string;
  imageClassName?: string;
  showTag?: boolean;
  /** Thumbnail-sized frame: placeholder shows the icon only. */
  compact?: boolean;
  sizes?: string;
}) => {
  const src = resolveMedia(media);

  if (!src) {
    return (
      <ImageSlot
        label={media.placeholderLabel}
        alt={media.alt}
        ratio={ratio ?? media.ratio}
        showTag={showTag}
        compact={compact}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-surface-sunken",
        ratio ?? media.ratio,
        className,
      )}
    >
      <img
        src={src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
};
