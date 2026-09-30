import type { ReactNode } from "react";

import { VehicleProvider } from "./vehicle-provider";
import { ScrollToTop } from "./scroll-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WhatsAppFloat } from "./whatsapp-float";

/**
 * Shared chrome for every page: skip link, header, main landmark, footer and the
 * floating WhatsApp button. Also owns the vehicle selection provider, which
 * needs to live inside the router so it can mirror `?vehiculo=`.
 */
export const SiteLayout = ({ children }: { children: ReactNode }) => (
  <VehicleProvider>
    <ScrollToTop />
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-label focus:text-foreground focus:shadow-lg"
    >
      Saltar al contenido principal
    </a>
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
    <WhatsAppFloat />
  </VehicleProvider>
);
