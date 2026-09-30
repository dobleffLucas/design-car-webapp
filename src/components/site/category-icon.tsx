import { Footprints, Layers, LayoutGrid, Shield, Tent, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  shield: Shield,
  stairs: Footprints,
  tarp: Layers,
  grid: LayoutGrid,
  wind: Wind,
  tent: Tent,
};

/** Maps a category's `icon` key to its lucide glyph. */
export const CategoryIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = icons[name] ?? Shield;
  return <Icon className={cn("h-5 w-5", className)} strokeWidth={1.6} />;
};
