import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { useVehicle } from "@/hooks/use-vehicle";
import { useScrolled } from "@/hooks/use-scrolled";
import { useStickyBarVisible } from "@/hooks/use-sticky-bar";

import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Floating WhatsApp button, fixed bottom-right on every screen. It appears
 * after a short scroll on mobile (to keep the hero uncluttered) and lifts
 * itself automatically when a product page shows its sticky action bar.
 */
export const WhatsAppFloat = ({ className }: { className?: string }) => {
  const scrolled = useScrolled(320);
  const stickyBarVisible = useStickyBarVisible();
  const { vehicleName } = useVehicle();
  const message = whatsappMessages.vehicle(vehicleName ?? undefined);

  return (
    <div
      className={cn(
        "fixed right-4 z-40 transition-[bottom,opacity,transform] duration-200 ease-out md:right-6",
        stickyBarVisible
          ? "bottom-[calc(env(safe-area-inset-bottom)+104px)]"
          : "bottom-[calc(env(safe-area-inset-bottom)+16px)]",
        scrolled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 md:translate-y-0 md:opacity-100",
        className,
      )}
    >
      <a
        href={buildWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className={cn(
          "group grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-fab transition-[transform,background-color] duration-150 ease-out md:h-14 md:w-14",
          "hover:scale-105 hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        )}
      >
        <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-surface-inverse px-2.5 py-1.5 text-[0.75rem] font-medium text-surface-inverse-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 md:block"
      >
        Consultanos por WhatsApp
      </span>
    </div>
  );
};
