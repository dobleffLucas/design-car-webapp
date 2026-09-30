import { Car, Headset, MessageCircle, Store, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  headset: Headset,
  car: Car,
  wrench: Wrench,
  chat: MessageCircle,
  store: Store,
};

/** Trust / benefit card used on the home page, Nosotros and Instalación. */
export const TrustCard = ({
  icon,
  title,
  text,
  tone = "default",
  className,
}: {
  icon: string;
  title: string;
  text: string;
  tone?: "default" | "inverse";
  className?: string;
}) => {
  const Icon = icons[icon] ?? Headset;

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-md rounded-lg border p-lg transition-[border-color,box-shadow] duration-base ease-out",
        tone === "inverse"
          ? "border-white/10 bg-white/[0.04] hover:border-white/20"
          : "border-border bg-card hover:border-border-strong hover:shadow-sm",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-md",
          tone === "inverse"
            ? "bg-white/10 text-surface-inverse-foreground"
            : "bg-primary-subtle text-primary-subtle-foreground",
        )}
      >
        <Icon className="h-[1.375rem] w-[1.375rem]" strokeWidth={1.6} />
      </span>
      <h3
        className={cn(
          "text-headline-s",
          tone === "inverse" && "text-surface-inverse-foreground",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-body-s",
          tone === "inverse" ? "text-surface-inverse-foreground/70" : "text-muted-foreground",
        )}
      >
        {text}
      </p>
    </div>
  );
};
