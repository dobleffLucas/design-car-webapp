import { Car, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { mainNav, site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVehicle } from "@/hooks/use-vehicle";

import { Logo } from "./logo";
import { WhatsAppButton } from "./whatsapp-button";

/**
 * Mobile menu. Sections collapse the full site map into one panel: main pages,
 * categories, vehicles and the WhatsApp CTA, so nothing is unreachable on a
 * phone.
 */
export const MobileNavTrigger = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { vehicleSlug, setVehicle } = useVehicle();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menú de navegación">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="z-[60] w-full overflow-y-auto p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border p-lg text-left">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <SheetDescription className="sr-only">
            Accesos a productos, vehículos, instalación, sucursales y contacto.
          </SheetDescription>
          <Logo className="h-7" />
        </SheetHeader>

        <nav aria-label="Navegación mobile" className="flex flex-col gap-xl p-lg">
          <div className="flex flex-col gap-sm">
            <p className="eyebrow">Secciones</p>
            <ul role="list" className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.to) ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-md text-body-l transition-colors hover:bg-muted",
                      isActive(item.to) ? "font-semibold text-primary" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-sm">
            <p className="eyebrow">Tu camioneta</p>
            <ul role="list" className="flex flex-col">
              {vehicles.map((vehicle) => (
                <li key={vehicle.slug}>
                  <Link
                    to={`/vehiculos/${vehicle.slug}`}
                    onClick={() => {
                      setVehicle(vehicle.slug);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-11 items-center gap-2 rounded-md text-body-s transition-colors hover:bg-muted",
                      vehicleSlug === vehicle.slug ? "font-semibold text-primary" : "text-foreground",
                    )}
                  >
                    <Car className="h-4 w-4 text-muted-foreground" aria-hidden="true" strokeWidth={1.7} />
                    {vehicle.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-sm">
            <p className="eyebrow">Categorías</p>
            <ul role="list" className="flex flex-wrap gap-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/productos/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 items-center rounded-full border border-input bg-card px-md text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-sm">
            <WhatsAppButton
              message={whatsappMessages.general()}
              label="Hablar por WhatsApp"
              size="lg"
            />
            <p className="text-[0.8125rem] text-muted-foreground">
              {site.phoneDisplay} · {site.email}
            </p>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
