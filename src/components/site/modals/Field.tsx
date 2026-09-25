import type * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  invalid?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  htmlFor,
  required,
  invalid,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.16em] text-komite-soft"
      >
        {label}
        {required ? <span className="text-komite-accent"> *</span> : null}
      </Label>
      {children}
      {invalid ? (
        <span className="text-[11px] text-komite-accent">
          Este campo es obligatorio.
        </span>
      ) : null}
    </div>
  );
}

export const inputClass =
  "h-10 rounded-xl border-komite-glow/25 bg-komite-deep/40 px-3 text-[14px] text-komite-ink placeholder:text-komite-soft/45 focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-0";

export const inputInvalidClass = "border-komite-accent/80";
