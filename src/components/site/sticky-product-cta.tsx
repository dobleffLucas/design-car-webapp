import { useEffect } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { setStickyBarVisible } from "@/hooks/use-sticky-bar";

import { WhatsAppIcon } from "./whatsapp-icon";

interface StickyProductCtaProps {
  productName: string;
  /** Compatibility line, e.g. "Compatible con Toyota Hilux y 3 modelos más". */
  meta?: string;
  /** Prefilled WhatsApp message for the product (and the visitor's vehicle). */
  message: string;
  /** Whether the in-page CTAs have scrolled out of view. */
  visible: boolean;
  /** Deep link to the consult form, pre-filled with product and vehicle. */
  consultHref: string;
}

/**
 * Product action bar. On desktop it is a slim bar with the product identity on
 * the left; on mobile a two-button grid that keeps the WhatsApp CTA reachable
 * with one thumb. The floating WhatsApp button lifts out of its way.
 */
export const StickyProductCta = ({
  productName,
  meta,
  message,
  visible,
  consultHref,
}: StickyProductCtaProps) => {
  useEffect(() => {
    setStickyBarVisible(visible);
    return () => setStickyBarVisible(false);
  }, [visible]);

  return (
    <div
      role="region"
      aria-label="Acciones del producto"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 shadow-lg backdrop-blur-md transition-[transform,opacity] duration-200 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="container-page flex flex-col gap-sm py-sm pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:h-[72px] lg:flex-row lg:items-center lg:gap-lg lg:py-0 lg:pb-0">
        <p className="truncate text-[0.8125rem] text-muted-foreground lg:text-label lg:text-foreground">
          <span className="lg:block">{productName}</span>
          {meta ? <span className="hidden text-[0.75rem] lg:block lg:font-normal lg:text-muted-foreground">{meta}</span> : null}
        </p>

        <div className="grid grid-cols-2 gap-sm lg:ml-auto lg:flex lg:items-center">
          <Button asChild variant="whatsapp" className="lg:hidden">
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${productName} por WhatsApp (se abre en una pestaña nueva)`}
            >
              <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="lg:hidden">
            <Link to={consultHref}>Enviar consulta</Link>
          </Button>

          <Button asChild variant="outline" className="hidden lg:inline-flex">
            <Link to={consultHref}>Enviar consulta</Link>
          </Button>
          <Button asChild variant="whatsapp" className="hidden lg:inline-flex">
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${productName} por WhatsApp (se abre en una pestaña nueva)`}
            >
              <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
              Consultar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
