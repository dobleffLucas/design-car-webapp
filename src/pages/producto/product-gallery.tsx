import { useState } from "react";

import { cn } from "@/lib/utils";
import type { MediaRef } from "@/data/types";
import { MediaFrame } from "@/components/site/media-frame";

/**
 * Product gallery: one large frame plus thumbnails. Placeholder slots keep the
 * 4:3 ratio reserved so the real photos drop in without moving anything.
 */
export const ProductGallery = ({
  media,
  productName,
}: {
  media: MediaRef[];
  productName: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] ?? media[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-md">
      <MediaFrame
        media={active}
        ratio="aspect-[4/3]"
        className="rounded-xl shadow-md"
        sizes="(max-width: 1024px) 100vw, 620px"
      />

      {media.length > 1 ? (
        <ul role="list" className="flex gap-sm">
          {media.map((item, index) => (
            <li key={`${item.placeholderLabel}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagen ${index + 1} de ${productName}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "block w-20 overflow-hidden rounded-md border-2 transition-[border-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  index === activeIndex
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-border-strong",
                )}
              >
                <MediaFrame
                  media={item}
                  ratio="aspect-[4/3]"
                  className="rounded-none"
                  showTag={false}
                  compact
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
