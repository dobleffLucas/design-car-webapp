import { ArrowUpRight, ShoppingBag } from "lucide-react";

import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { Button } from "@/components/ui/button";

/**
 * Online store band. Design Car already sells through its own store, so the new
 * site keeps that channel visible without competing with the WhatsApp CTA.
 * Uses the original store banner artwork.
 */
export const StoreBand = ({ className }: { className?: string }) => (
  <section
    aria-labelledby="tienda-online-title"
    className={className ?? "rounded-xl border border-border bg-card p-lg shadow-sm md:p-xl"}
  >
    <div className="grid items-center gap-xl lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-md">
        <p className="eyebrow">También online</p>
        <h2 id="tienda-online-title" className="text-display-s">
          Tienda online de Design Car
        </h2>
        <p className="max-w-prose text-body-l text-muted-foreground">
          Si preferís comprar desde tu casa, el catálogo completo con precios y envíos está en
          nuestra tienda online. Y si te queda alguna duda de compatibilidad, escribinos por
          WhatsApp antes de comprar: te lo confirmamos nosotros.
        </p>
        <div className="flex flex-wrap gap-sm pt-sm">
          <Button asChild size="lg">
            <a
              href={site.onlineStore.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.onlineStore.label} (se abre en una pestaña nueva)`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {site.onlineStore.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <img
          src={asset("/assets/designcar/banner-tienda.png")}
          alt="Banner de la tienda online de Design Car con equipamiento para camionetas"
          width={1400}
          height={507}
          loading="lazy"
          decoding="async"
          className="w-full rounded-lg border border-border object-cover"
        />
        <img
          src={asset("/assets/designcar/mercado.jpg")}
          alt="Design Car en canales de venta online"
          width={707}
          height={243}
          loading="lazy"
          decoding="async"
          className="w-full rounded-lg border border-border object-cover"
        />
      </div>
    </div>
  </section>
);
