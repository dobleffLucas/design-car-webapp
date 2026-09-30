import { Clock, Facebook, Instagram, Mail, MapPin, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { branches, directionsUrl } from "@/data/branches";
import { categories } from "@/data/categories";
import { mainNav, site, vehicleBrands } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";

import { Logo } from "./logo";
import { WhatsAppButton } from "./whatsapp-button";

/** Full footer: contact channels, site map, both stores and the brand strip. */
export const SiteFooter = () => (
  <footer className="surface-inverse mt-section">
    <div className="container-page flex flex-col gap-xl py-2xl">
      <div className="flex flex-col gap-lg border-b border-white/10 pb-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-md">
          <Logo tone="inverse" className="h-8" />
          <p className="max-w-prose text-body-s text-surface-inverse-foreground/70">
            {site.tagline}. {site.establishedNote}
          </p>
        </div>

        <div className="flex flex-col gap-md">
          <div className="flex flex-col gap-sm text-body-s text-surface-inverse-foreground/80">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-surface-inverse-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={1.7} />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" strokeWidth={1.7} />
              WhatsApp {site.phoneDisplay}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagram.handle} (se abre en una pestaña nueva)`}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/5 text-surface-inverse-foreground transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-inverse-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Design Car (se abre en una pestaña nueva)"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/5 text-surface-inverse-foreground transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-inverse-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-xl lg:grid-cols-[1fr_1fr_1fr_1.1fr] xl:grid-cols-[0.9fr_1fr_1fr_1.1fr]">
        <FooterColumn title="Secciones">
          {mainNav.map((item) => (
            <FooterLink key={item.to} to={item.to}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Productos">
          {categories.map((category) => (
            <FooterLink key={category.slug} to={`/productos/${category.slug}`}>
              {category.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Por vehículo">
          {vehicles.map((vehicle) => (
            <FooterLink key={vehicle.slug} to={`/vehiculos/${vehicle.slug}`}>
              {vehicle.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Sucursales y contacto">
          {branches.map((branch) => (
            <li key={branch.slug} className="flex flex-col gap-1 pb-md">
              <span className="inline-flex items-start gap-2 font-medium text-surface-inverse-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" strokeWidth={1.7} />
                {branch.name}
              </span>
              <span className="pl-[1.375rem]">{branch.address}</span>
              <span className="pl-[1.375rem]">{branch.city}</span>
              <a
                href={directionsUrl(branch)}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-[1.375rem] underline-offset-4 transition-colors hover:text-surface-inverse-foreground hover:underline"
              >
                Cómo llegar (se abre en una pestaña nueva)
              </a>
            </li>
          ))}
          <li>
            <WhatsAppButton
              message={whatsappMessages.general()}
              label="Hablar por WhatsApp"
              variant="whatsapp"
              size="sm"
            />
          </li>
        </FooterColumn>
      </div>

      <div className="flex flex-col gap-md border-t border-white/10 pt-xl">
        <p className="text-eyebrow uppercase text-surface-inverse-foreground/60">
          Marcas con las que trabajamos
        </p>
        <ul role="list" className="flex flex-wrap gap-sm">
          {vehicleBrands.map((brand) => (
            <li
              key={brand}
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[0.6875rem] font-medium text-surface-inverse-foreground/80"
            >
              <span className="block text-[0.625rem] uppercase tracking-[0.06em]">Logo de marca</span>
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-md border-t border-white/10 pt-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-sm">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[0.8125rem] font-medium text-surface-inverse-foreground transition-colors hover:bg-white/15"
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            {site.onlineStore.label}
          </Link>
          <a
            href={site.onlineStore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8125rem] text-surface-inverse-foreground/70 underline-offset-4 transition-colors hover:text-surface-inverse-foreground hover:underline"
          >
            {site.onlineStore.url.replace("https://", "")} (se abre en una pestaña nueva)
          </a>
        </div>
        <p className="text-[0.8125rem] text-surface-inverse-foreground/60">
          © {new Date().getFullYear()} {site.legalName}. Sitio de demostración.
        </p>
      </div>
    </div>
  </footer>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-md">
    <h2 className="text-label text-surface-inverse-foreground">{title}</h2>
    <ul role="list" className="flex flex-col gap-1 text-body-s text-surface-inverse-foreground/75">
      {children}
    </ul>
  </div>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="inline-flex min-h-[2rem] items-center transition-colors hover:text-surface-inverse-foreground"
    >
      {children}
    </Link>
  </li>
);
