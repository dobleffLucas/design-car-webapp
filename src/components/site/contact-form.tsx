import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { categories, categoryBySlug } from "@/data/categories";
import { productBySlug } from "@/data/products";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { whatsappMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useVehicle } from "@/hooks/use-vehicle";

import { SelectField, TextareaField, TextField } from "./form-field";
import { WhatsAppButton } from "./whatsapp-button";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre y apellido"),
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu email")
    .refine((value) => emailPattern.test(value), "Ingresá un email válido"),
  telefono: z.string().trim().min(6, "Ingresá un teléfono donde podamos contactarte"),
  vehiculo: z.string().optional(),
  interes: z.string().optional(),
  mensaje: z.string().trim().min(10, "Contanos brevemente qué necesitás"),
});

type FormValues = z.infer<typeof schema>;

const interestOptions = [
  ...categories.map((category) => ({ value: category.slug, label: category.name })),
  { value: "instalacion", label: "Instalación y colocación" },
  { value: "kit-montaje", label: "Repuestos y kit de montaje" },
  { value: "otro", label: "Otra consulta" },
];

/**
 * Consult form. Frontend only by design: on submit it shows a polished success
 * state instead of posting anywhere, so the demo never pretends to have a
 * backend. WhatsApp stays one tap away as the immediate alternative.
 */
export const ContactForm = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const { vehicleSlug } = useVehicle();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const productParam = searchParams.get("producto");
  const reasonParam = searchParams.get("motivo");

  const prefill = useMemo(() => {
    const product = productParam ? productBySlug(productParam) : undefined;
    const category = product
      ? categoryBySlug(product.category)
      : productParam
        ? categoryBySlug(productParam)
        : undefined;

    const interesFromParam =
      reasonParam === "instalacion" ? "instalacion" : category?.slug ?? "";

    const mensaje = product
      ? `Hola, quiero consultar por ${product.name}. ¿Tienen disponibilidad e instalación?`
      : "";

    return { interes: interesFromParam, mensaje, productName: product?.name };
  }, [productParam, reasonParam]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      vehiculo: vehicleSlug ?? "",
      interes: prefill.interes,
      mensaje: prefill.mensaje,
    },
  });

  // Keep the vehicle field in sync when the visitor changes it elsewhere.
  useEffect(() => {
    if (vehicleSlug) setValue("vehiculo", vehicleSlug);
  }, [vehicleSlug, setValue]);

  const onSubmit = (values: FormValues) => {
    setSentTo(values.nombre);
    toast.success("Recibimos tu consulta. Te responderemos a la brevedad.", {
      description: "Si necesitás una respuesta inmediata, escribinos por WhatsApp.",
    });
  };

  if (sentTo) {
    return (
      <div
        className={className ?? "rounded-xl border border-border bg-card p-lg shadow-sm md:p-xl"}
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-start gap-md">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-success-subtle text-success-subtle-foreground">
            <CircleCheckBig className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="text-headline-l">Recibimos tu consulta. Te responderemos a la brevedad.</h2>
          <p className="max-w-prose text-body-l text-muted-foreground">
            Gracias por escribirnos, {sentTo}. Un asesor de Design Car va a revisar tu consulta y te
            responde por email o teléfono. Si tu camioneta está sin equipar y querés avanzar hoy
            mismo, escribinos por WhatsApp y lo vemos al toque.
          </p>
          <div className="flex flex-wrap gap-sm pt-sm">
            <WhatsAppButton
              message={whatsappMessages.general()}
              label="Hablar por WhatsApp ahora"
              variant="whatsapp"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSentTo(null);
                reset({
                  nombre: "",
                  email: "",
                  telefono: "",
                  vehiculo: vehicleSlug ?? "",
                  interes: "",
                  mensaje: "",
                });
              }}
            >
              Enviar otra consulta
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="form-consulta-title"
      className={className ?? "rounded-xl border border-border bg-card p-lg shadow-sm md:p-xl"}
    >
      <div className="flex flex-col gap-sm pb-lg">
        <p className="eyebrow">Formulario de consulta</p>
        <h2 id="form-consulta-title" className="text-headline-l">
          Contanos qué necesita tu camioneta
        </h2>
        <p className="text-body-s text-muted-foreground">
          Completá el formulario y un asesor te responde con precio, disponibilidad y opciones de
          instalación. Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.
        </p>
        {prefill.productName ? (
          <p className="rounded-md border border-primary/20 bg-primary-subtle px-3 py-2 text-[0.8125rem] text-primary-subtle-foreground">
            Estás consultando por <strong>{prefill.productName}</strong>. Podés cambiar el detalle
            abajo.
          </p>
        ) : null}
      </div>

      <div className="grid gap-lg sm:grid-cols-2">
        <TextField
          id="nombre"
          label="Nombre y apellido"
          autoComplete="name"
          placeholder="Juan Pérez"
          error={errors.nombre?.message}
          {...register("nombre")}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="juan@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="telefono"
          label="Teléfono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="11 5555 5555"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
        <SelectField
          id="vehiculo"
          label="Vehículo / modelo"
          optional
          placeholder="Elegí tu camioneta"
          error={errors.vehiculo?.message}
          options={vehicles.map((vehicle) => ({ value: vehicle.slug, label: vehicle.name }))}
          {...register("vehiculo")}
        />
        <SelectField
          id="interes"
          label="Producto o categoría de interés"
          optional
          placeholder="Elegí una opción"
          error={errors.interes?.message}
          options={interestOptions}
          {...register("interes")}
        />
        <div className="sm:col-span-2">
          <TextareaField
            id="mensaje"
            label="Mensaje"
            placeholder="Contanos qué accesorio buscás, para qué modelo y año, y si necesitás instalación."
            error={errors.mensaje?.message}
            {...register("mensaje")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-sm pt-lg sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Enviando…" : "Enviar consulta"}
        </Button>
        <p className="text-[0.8125rem] text-muted-foreground">
          Al enviar, no compartimos tus datos con terceros. También podés escribirnos a{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
};
