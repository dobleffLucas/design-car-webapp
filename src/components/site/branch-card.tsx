import { Clock, ExternalLink, MapPin, Navigation } from "lucide-react";

import { cn } from "@/lib/utils";
import { directionsUrl } from "@/data/branches";
import type { Branch } from "@/data/types";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

import { MediaFrame } from "./media-frame";
import { WhatsAppButton } from "./whatsapp-button";

/**
 * Branch card: address, hours, map slot, directions link and a WhatsApp CTA
 * that names the branch so the conversation starts in the right place.
 */
export const BranchCard = ({
  branch,
  className,
}: {
  branch: Branch;
  className?: string;
}) => (
  <article
    className={cn(
      "grid gap-lg rounded-lg border border-border bg-card p-lg shadow-sm md:grid-cols-[240px_1fr]",
      className,
    )}
  >
    <MediaFrame
      media={branch.media}
      ratio="aspect-[4/3] md:aspect-auto md:h-full"
      className="md:min-h-[220px]"
      showTag={false}
    />

    <div className="flex flex-col gap-sm">
      <h3 className="text-headline-s">{branch.name}</h3>

      <p className="flex items-start gap-2 text-body-s text-muted-foreground">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={1.7} />
        <span>
          {branch.address}
          <span className="block text-foreground">{branch.city}</span>
        </span>
      </p>

      <div className="flex items-start gap-2 text-body-s text-muted-foreground">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={1.7} />
        <ul role="list" className="flex flex-col gap-0.5">
          {branch.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <p className="text-body-s text-muted-foreground">{branch.note}</p>

      <div className="mt-auto flex flex-wrap gap-sm pt-md">
        <Button asChild variant="outline">
          <a
            href={directionsUrl(branch)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cómo llegar a ${branch.name} (se abre en una pestaña nueva)`}
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Cómo llegar
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          </a>
        </Button>
        <WhatsAppButton
          message={whatsappMessages.branch(branch.name, branch.fullAddress)}
          label="Escribir a esta sucursal"
          shortLabel="WhatsApp"
          variant="whatsappSoft"
        />
      </div>
    </div>
  </article>
);
