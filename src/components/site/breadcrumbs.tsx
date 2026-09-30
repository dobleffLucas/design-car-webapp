import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface Crumb {
  label: string;
  /** Omit on the current page. */
  to?: string;
}

/**
 * Breadcrumbs on tablet and up, a single back link on mobile where the trail
 * would otherwise wrap onto three lines.
 */
export const PageBreadcrumbs = ({ items }: { items: Crumb[] }) => {
  const parent = [...items].reverse().find((item) => item.to);

  return (
    <div className="flex flex-col gap-sm">
      <nav aria-label="Ruta de navegación" className="hidden sm:block">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <span key={`${item.label}-${index}`} className="contents">
                <BreadcrumbItem>
                  {item.to ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.to}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="max-w-[26ch] truncate">{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 ? <BreadcrumbSeparator /> : null}
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      {parent?.to ? (
        <Link
          to={parent.to}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a {parent.label}
        </Link>
      ) : null}
    </div>
  );
};
