import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Section header: eyebrow + heading + supporting copy + optional action.
 * The eyebrow lives in its own paragraph so it never pollutes the heading's
 * accessible name.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  action,
  tone = "default",
  align = "start",
  headingLevel: Heading = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "default" | "inverse";
  align?: "start" | "center";
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) => (
  <div
    className={cn(
      "flex flex-col gap-md lg:flex-row lg:items-end lg:justify-between lg:gap-xl",
      align === "center" && "lg:flex-col lg:items-center lg:text-center",
      className,
    )}
  >
    <div className={cn("flex flex-col gap-sm", align === "center" && "items-center")}>
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "inverse" && "text-surface-inverse-foreground/70")}>
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "max-w-[24ch] text-display-s lg:text-display-l",
          tone === "inverse" && "text-surface-inverse-foreground",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-prose text-body-l",
            tone === "inverse" ? "text-surface-inverse-foreground/75" : "text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
    {action ? (
      <div className="flex shrink-0 flex-wrap items-center gap-sm max-sm:w-full">{action}</div>
    ) : null}
  </div>
);
