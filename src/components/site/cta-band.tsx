import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { useVehicle } from "@/hooks/use-vehicle";

import { WhatsAppButton } from "./whatsapp-button";

/**
 * Closing conversion band. Reused at the bottom of the home page, category
 * pages, vehicle pages and Nosotros, always offering the two channels that
 * matter: WhatsApp and the consult form.
 */
export const CtaBand = ({
  title,
  description,
  message,
  secondaryLabel = "Enviar consulta",
  secondaryTo = "/contacto",
  tone = "inverse",
  className,
}: {
  title: string;
  description?: string;
  message?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  tone?: "inverse" | "default";
  className?: string;
}) => {
  const { vehicleName } = useVehicle();
  const whatsappMessage = message ?? whatsappMessages.vehicle(vehicleName ?? undefined);
  const inverse = tone === "inverse";

  return (
    <section
      aria-labelledby="cta-band-title"
      className={cn(
        "overflow-hidden rounded-xl border px-lg py-xl md:px-xl",
        inverse ? "surface-inverse border-transparent" : "border-border bg-card",
        className,
      )}
    >
      <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-sm">
          <h2
            id="cta-band-title"
            className={cn(
              "max-w-[26ch] text-headline-l md:text-display-s",
              inverse && "text-surface-inverse-foreground",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "max-w-prose text-body-l",
                inverse ? "text-surface-inverse-foreground/75" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-sm sm:flex-row lg:flex-col xl:flex-row">
          <WhatsAppButton
            message={whatsappMessage}
            label="Hablar por WhatsApp"
            variant={inverse ? "whatsapp" : "whatsappSoft"}
            size="lg"
          />
          <Button asChild variant={inverse ? "inverse" : "outline"} size="lg">
            <Link to={secondaryTo}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
