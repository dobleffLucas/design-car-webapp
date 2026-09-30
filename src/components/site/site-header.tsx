import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { mainNav, site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrolled } from "@/hooks/use-scrolled";

import { Logo } from "./logo";
import { MobileNavTrigger } from "./mobile-nav";
import { VehiclePicker } from "./vehicle-picker";
import { WhatsAppButton } from "./whatsapp-button";

/**
 * Site header. Sticky on every page, with the vehicle picker always reachable:
 * choosing a vehicle is the single most useful action on this site.
 */
export const SiteHeader = () => {
  const scrolled = useScrolled(8);
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="container-page flex h-16 items-center gap-lg lg:h-[72px]">
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`${site.name} — ir al inicio`}
        >
          <Logo className="h-7 lg:h-8" />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul role="list" className="flex items-center gap-1">
            <li>
              <NavDropdown label="Productos" active={isActive("/productos")}>
                <DropdownMenuLabel className="px-2 py-1.5 text-eyebrow uppercase text-muted-foreground">
                  Categorías
                </DropdownMenuLabel>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link
                      to={`/productos/${category.slug}`}
                      className="cursor-pointer rounded-sm px-2 py-2 text-body-s"
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </NavDropdown>
            </li>
            <li>
              <NavDropdown label="Por vehículo" active={isActive("/vehiculos")}>
                <DropdownMenuLabel className="px-2 py-1.5 text-eyebrow uppercase text-muted-foreground">
                  Elegí tu camioneta
                </DropdownMenuLabel>
                {vehicles.map((vehicle) => (
                  <DropdownMenuItem key={vehicle.slug} asChild>
                    <Link
                      to={`/vehiculos/${vehicle.slug}`}
                      className="cursor-pointer rounded-sm px-2 py-2 text-body-s"
                    >
                      {vehicle.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </NavDropdown>
            </li>
            {mainNav.slice(2).map((item) => (
              <li
                key={item.to}
                className={cn(
                  "whitespace-nowrap",
                  (item.to === "/nosotros" || item.to === "/sucursales") && "hidden xl:block",
                )}
              >
                <Link
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center rounded-md px-3 text-label transition-colors duration-150 hover:bg-muted",
                    isActive(item.to) ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-sm">
          <VehiclePicker className="hidden lg:flex" />
          <WhatsAppButton
            message={whatsappMessages.general()}
            label="Hablar por WhatsApp"
            iconOnly
            ariaLabel="Hablar por WhatsApp"
            className="hidden h-10 lg:inline-flex xl:hidden"
          />
          <WhatsAppButton
            message={whatsappMessages.general()}
            label="Hablar por WhatsApp"
            className="hidden h-10 xl:inline-flex"
          />
          <MobileNavTrigger />
        </div>
      </div>
    </header>
  );
};

const NavDropdown = ({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(
        "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-label transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active ? "text-primary" : "text-foreground",
      )}
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-60 rounded-lg border-border p-1.5 shadow-lg">
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);
