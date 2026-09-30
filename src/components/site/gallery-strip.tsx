import { Instagram } from "lucide-react";

import { cn } from "@/lib/utils";
import { galleryItems } from "@/data/gallery";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";

import { MediaFrame } from "./media-frame";

/**
 * Work gallery plus the Instagram entry point. Each tile is a labelled
 * placeholder until the real shop photos arrive, with the ratio already
 * reserved so the swap does not move anything.
 */
export const GalleryStrip = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-lg", className)}>
    <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
      {galleryItems.map((item) => (
        <li key={item.id} className="flex flex-col gap-sm">
          <MediaFrame media={item.media} ratio="aspect-[4/3]" />
          <p className="text-[0.8125rem] text-muted-foreground">{item.caption}</p>
        </li>
      ))}
    </ul>

    <div className="flex flex-col items-start gap-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-body-s text-muted-foreground">
        Subimos trabajos y equipamientos nuevos todas las semanas.
      </p>
      <Button asChild variant="outline">
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver más trabajos en Instagram ${site.instagram.handle} (se abre en una pestaña nueva)`}
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Ver más en Instagram
        </a>
      </Button>
    </div>
  </div>
);
