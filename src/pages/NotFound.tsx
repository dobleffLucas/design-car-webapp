import { Link } from "react-router-dom";

import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/site-layout";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

/** Shared 404 body so in-page "not found" states look the same as the route. */
export const NotFoundContent = ({
  title = "No encontramos esta página",
  description = "Puede que el enlace haya cambiado. Probá desde el catálogo o escribinos y te ayudamos a encontrar lo que buscás.",
}: {
  title?: string;
  description?: string;
}) => (
  <section className="container-page flex flex-col items-start gap-md py-section">
    <p className="eyebrow">Error 404</p>
    <h1 className="max-w-[22ch] text-display-s md:text-display-l">{title}</h1>
    <p className="max-w-prose text-body-l text-muted-foreground">{description}</p>
    <div className="flex flex-wrap gap-sm pt-sm">
      <Button asChild size="lg">
        <Link to="/productos">Ver el catálogo</Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link to="/vehiculos">Buscar por vehículo</Link>
      </Button>
      <WhatsAppButton
        message={whatsappMessages.general()}
        label="Consultar por WhatsApp"
        variant="whatsappSoft"
        size="lg"
      />
    </div>
  </section>
);

const NotFound = () => (
  <SiteLayout>
    <NotFoundContent />
  </SiteLayout>
);

export default NotFound;
