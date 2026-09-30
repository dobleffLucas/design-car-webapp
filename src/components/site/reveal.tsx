import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/** Subtle rise-and-fade on scroll. Reduced-motion visitors see it immediately. */
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
}) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </div>
  );
};
