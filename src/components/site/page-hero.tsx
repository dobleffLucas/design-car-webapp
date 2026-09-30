import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { MediaRef } from "@/data/types";

import { MediaFrame } from "./media-frame";

/**
 * Inner page hero: breadcrumbs, eyebrow, h1, supporting copy, actions and an
 * optional media panel. Keeps every secondary page on the same rhythm.
 */
export const PageHero = ({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  chips,
  media,
  mediaRatio,
  children,
  className,
}: {
  breadcrumbs?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  chips?: ReactNode;
  media?: MediaRef;
  mediaRatio?: string;
  children?: ReactNode;
  className?: string;
}) => (
  <section className={cn("border-b border-border bg-background", className)}>
    <div className="container-page flex flex-col gap-lg py-x md:py-xl">
      {breadcrumbs}

      <div
        className={cn(
          "grid items-center gap-xl",
          media ? "lg:grid-cols-[1.05fr_1fr]" : "max-w-3xl",
        )}
      >
        <div className="flex flex-col gap-md">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="text-display-s md:text-display-l">{title}</h1>
          {description ? (
            <p className="max-w-prose text-body-l text-muted-foreground">{description}</p>
          ) : null}
          {chips}
          {actions ? <div className="flex flex-wrap items-center gap-sm pt-sm">{actions}</div> : null}
          {children}
        </div>

        {media ? (
          <MediaFrame
            media={media}
            ratio={mediaRatio ?? "aspect-[4/3]"}
            className="rounded-xl shadow-lg"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        ) : null}
      </div>
    </div>
  </section>
);
