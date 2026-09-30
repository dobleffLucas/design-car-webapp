import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button, type ButtonProps } from "@/components/ui/button";

import { WhatsAppIcon } from "./whatsapp-icon";

interface WhatsAppButtonProps extends Omit<ButtonProps, "asChild"> {
  /** Prefilled, context-aware message. */
  message: string;
  label: string;
  /** Shorter label used below `sm`, where space is tight. */
  shortLabel?: string;
  /** Renders only the glyph, for card action rows. */
  iconOnly?: boolean;
  /** Required when `iconOnly`, since there is no visible text. */
  ariaLabel?: string;
}

/**
 * The canonical WhatsApp CTA. Always opens in a new tab and always announces
 * that fact to screen readers.
 */
export const WhatsAppButton = ({
  message,
  label,
  shortLabel,
  iconOnly = false,
  ariaLabel,
  className,
  variant = "whatsapp",
  size,
  ...props
}: WhatsAppButtonProps) => (
  <Button
    asChild
    variant={variant}
    size={size ?? (iconOnly ? "icon" : "default")}
    className={className}
    {...props}
  >
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconOnly ? ariaLabel : undefined}
    >
      <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
      {iconOnly ? null : (
        <>
          <span className={shortLabel ? "hidden sm:inline" : undefined}>{label}</span>
          {shortLabel ? <span className="sm:hidden">{shortLabel}</span> : null}
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </>
      )}
    </a>
  </Button>
);

/** Small inline WhatsApp link, for body copy and detail rows. */
export const WhatsAppInlineLink = ({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={buildWhatsAppUrl(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center gap-1.5 font-semibold text-whatsapp-soft-foreground underline-offset-4 hover:underline",
      className,
    )}
  >
    <WhatsAppIcon className="h-4 w-4" />
    {children}
    <span className="sr-only">(se abre en una pestaña nueva)</span>
  </a>
);
