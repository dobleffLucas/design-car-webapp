import { CircleAlert, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

const describedBy = (id: string, error?: string, hint?: string) =>
  [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

const FieldShell = ({ id, label, optional, error, hint, children }: FieldShellProps) => (
  <div className="flex flex-col gap-sm">
    <Label htmlFor={id} className="flex flex-wrap items-baseline gap-1.5">
      {label}
      {optional ? (
        <span className="font-normal text-muted-foreground">(opcional)</span>
      ) : (
        <span className="font-normal text-muted-foreground" aria-hidden="true">
          *
        </span>
      )}
    </Label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="flex items-center gap-1.5 text-[0.8125rem] text-destructive">
        <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {error}
      </p>
    ) : null}
    {!error && hint ? (
      <p id={`${id}-hint`} className="text-[0.8125rem] text-muted-foreground">
        {hint}
      </p>
    ) : null}
  </div>
);

interface BaseFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
}

export const TextField = ({
  id,
  label,
  optional,
  error,
  hint,
  ...props
}: BaseFieldProps & React.ComponentProps<typeof Input>) => (
  <FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
    <Input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      {...props}
    />
  </FieldShell>
);

export const TextareaField = ({
  id,
  label,
  optional,
  error,
  hint,
  ...props
}: BaseFieldProps & React.ComponentProps<typeof Textarea>) => (
  <FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
    <Textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      {...props}
    />
  </FieldShell>
);

export const SelectField = ({
  id,
  label,
  optional,
  error,
  hint,
  options,
  placeholder,
  className,
  ...props
}: BaseFieldProps & {
  options: { value: string; label: string }[];
  placeholder: string;
} & React.ComponentProps<"select">) => (
  <FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
    <div className="relative">
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(
          "h-11 w-full appearance-none rounded-md border border-input bg-card py-2 pl-3 pr-9 text-base text-foreground ring-offset-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-border-strong focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive sm:text-body-s",
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  </FieldShell>
);
