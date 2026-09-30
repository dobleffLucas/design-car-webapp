import { ArrowRight, CircleCheckBig, PackageCheck, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { categoryBySlug } from "@/data/categories";
import { productBySlug, products } from "@/data/products";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompatibilityChips } from "@/components/site/compatibility-chips";
import { CtaBand } from "@/components/site/cta-band";
import { PageBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SiteLayout } from "@/components/site/site-layout";
import { StickyProductCta } from "@/components/site/sticky-product-cta";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { useInView } from "@/hooks/use-in-view";
import { useVehicle } from "@/hooks/use-vehicle";
import { NotFoundContent } from "@/pages/NotFound";

import { ProductGallery } from "./product-gallery";

/** Product detail page, consult-only: no price, no cart, no stock. */
const ProductPage = () => {
  const { producto } = useParams();
  const product = productBySlug(producto);
  const { vehicleName, vehicleSlug, vehicle } = useVehicle();
  const inlineCta = useInView<HTMLDivElement>({ threshold: 0, once: false, rootMargin: "-96px 0px -120px 0px" });

  if (!product) {
    return (
      <NotFoundContent
        title="No encontramos ese producto"
        description="Puede que ya no esté publicado. Mirá el catálogo completo o escribinos y te decimos si lo conseguimos."
      />
    );
  }

  const category = categoryBySlug(product.category);
  const message = whatsappMessages.product(product.name, vehicleName ?? undefined);
  const consultHref = `/contacto?producto=${product.slug}${vehicleSlug ? `&vehiculo=${vehicleSlug}` : ""}`;

  const related = products
    .filter((item) => item.slug !== product.slug)
    .filter(
      (item) =>
        item.category === product.category ||
        (vehicleSlug ? item.vehicles.includes(vehicleSlug) : false),
    )
    .slice(0, 3);

  const compatibleNames = product.vehicles
    .map((slug) => vehicles.find((item) => item.slug === slug)?.shortName)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+6rem)]">
      <div className="container-page pt-lg">
        <PageBreadcrumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "Productos", to: "/productos" },
            { label: category?.name ?? "Catálogo", to: `/productos/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <section aria-labelledby="producto-title" className="container-page grid gap-xl py-xl lg:grid-cols-[1.05fr_1fr] lg:gap-2xl">
        <ProductGallery media={product.media} productName={product.name} />

        <div className="flex flex-col gap-md">
          <div className="flex flex-wrap items-center gap-sm">
            {category ? (
              <Link
                to={`/productos/${category.slug}`}
                className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {category.name}
              </Link>
            ) : null}
            {product.installation ? <Badge variant="instalacion">Instalación disponible</Badge> : null}
            <Badge variant="neutro">{product.type}</Badge>
          </div>

          <h1 id="producto-title" className="text-display-s">
            {product.name}
          </h1>

          <p className="text-body-l text-muted-foreground">{product.benefit}</p>

          <div className="flex flex-col gap-sm">
            <p className="text-label text-foreground">Vehículos compatibles</p>
            <CompatibilityChips
              vehicleSlugs={product.vehicles}
              activeVehicleSlug={vehicleSlug}
              max={8}
              size="md"
            />
          </div>

          <div className="flex flex-col gap-sm rounded-lg border border-border bg-surface-sunken p-lg">
            <p className="text-label">Consultar precio y disponibilidad</p>
            <p className="text-body-s text-muted-foreground">
              No publicamos precios porque cambian por modelo y versión. Escribinos y te pasamos el
              valor con la opción de instalación incluida.
            </p>
            <div className="flex flex-col gap-sm pt-sm sm:flex-row">
              <WhatsAppButton message={message} label="Consultar por WhatsApp" size="lg" className="sm:flex-1" />
              <Button asChild variant="outline" size="lg">
                <Link to={consultHref}>Enviar consulta</Link>
              </Button>
            </div>
            {vehicle ? (
              <p className="text-[0.8125rem] text-muted-foreground">
                Vamos a consultar por tu {vehicle.name}.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-sm pt-sm">
            <h2 className="text-headline-s">Beneficios clave</h2>
            <ul role="list" className="flex flex-col gap-2">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-body-s text-muted-foreground">
                  <CircleCheckBig
                    className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp"
                    aria-hidden="true"
                    strokeWidth={1.8}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="detalle-title" className="border-y border-border bg-surface-sunken py-section">
        <div className="container-page grid gap-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-md">
            <h2 id="detalle-title" className="text-headline-l">
              Sobre este producto
            </h2>
            {product.description.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-body-l text-muted-foreground">
                {paragraph}
              </p>
            ))}

            {product.installation ? (
              <div className="mt-sm flex flex-col gap-sm rounded-lg border border-border bg-card p-lg">
                <h3 className="flex items-center gap-2 text-headline-s">
                  <Wrench className="h-5 w-5 text-primary" aria-hidden="true" strokeWidth={1.7} />
                  Instalación
                </h3>
                <p className="text-body-s text-muted-foreground">{product.installation.text}</p>
                <ul role="list" className="flex flex-col gap-1.5 pt-sm">
                  {product.installation.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-s text-muted-foreground">
                      <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={1.7} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-sm">
                  <WhatsAppButton
                    message={whatsappMessages.installation(product.name, vehicleName ?? undefined)}
                    label="Cotizar instalación"
                    variant="whatsappSoft"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-sm">
            <h3 className="text-headline-s">Información técnica</h3>
            <dl className="overflow-hidden rounded-lg border border-border bg-card">
              {product.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={
                    index % 2 === 0
                      ? "grid grid-cols-[1fr_1.2fr] gap-md border-b border-border px-lg py-3 last:border-b-0"
                      : "grid grid-cols-[1fr_1.2fr] gap-md border-b border-border bg-surface-sunken px-lg py-3 last:border-b-0"
                  }
                >
                  <dt className="text-label text-muted-foreground">{spec.label}</dt>
                  <dd className="text-body-s text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[0.8125rem] text-muted-foreground">
              Compatible con: {compatibleNames || "consultar por modelo"}.
            </p>
          </div>
        </div>
      </section>

      <div ref={inlineCta.ref} className="container-page section-y">
        <Reveal>
          <CtaBand
            title={`¿Te sirve ${product.name}? Te pasamos precio y turno`}
            description="Escribinos con el modelo y el año de tu camioneta y te confirmamos disponibilidad e instalación."
            message={message}
            secondaryLabel="Enviar consulta"
            secondaryTo={consultHref}
          />
        </Reveal>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="relacionados-title" className="container-page pb-section">
          <div className="flex flex-col gap-sm pb-lg sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-sm">
              <p className="eyebrow">Relacionados</p>
              <h2 id="relacionados-title" className="text-display-s">
                Suele ir con esto
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to={`/productos/${product.category}`}>
                Ver toda la categoría
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul role="list" className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} className="h-full" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <StickyProductCta
        productName={product.name}
        meta={`Compatible con ${compatibleNames || "consultar"}`}
        message={message}
        visible={!inlineCta.inView}
        consultHref={consultHref}
      />
    </div>
  );
};

const ProductoPage = () => (
  <SiteLayout>
    <ProductPage />
  </SiteLayout>
);

export default ProductoPage;
