import * as React from "react";
import { CheckCircle2, Send } from "lucide-react";
import { ACTOR_TYPES } from "@/lib/committee";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ActionButton";
import { GlassDialog } from "./GlassDialog";
import { Field, inputClass, inputInvalidClass } from "./Field";

interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_FORM = {
  nombre: "",
  organizacion: "",
  cargo: "",
  correo: "",
  tipoActor: "",
};

type FormKey = keyof typeof EMPTY_FORM;

const REQUIRED: FormKey[] = [
  "nombre",
  "organizacion",
  "cargo",
  "correo",
  "tipoActor",
];

export function JoinModal({ open, onOpenChange }: JoinModalProps) {
  const [values, setValues] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState<Partial<Record<FormKey, boolean>>>(
    {},
  );
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setValues(EMPTY_FORM);
      setErrors({});
      setSent(false);
    }
  }, [open]);

  const setField = (key: FormKey) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FormKey, boolean>> = {};
    REQUIRED.forEach((key) => {
      if (!values[key].trim()) nextErrors[key] = true;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Unirse al comité"
      description="Cuéntanos quién eres. Revisaremos tu solicitud y te contactaremos para sumarte a la red."
    >
      {sent ? (
        <div className="flex flex-col items-start gap-4">
          <span className="flex items-center gap-2 rounded-2xl border border-komite-glow/40 bg-komite-turquoise/15 px-4 py-3 text-sm text-komite-ink">
            <CheckCircle2 className="h-5 w-5 text-komite-glow" />
            Solicitud registrada. Es una demostración: no se envía nada.
          </span>
          <ActionButton onClick={() => onOpenChange(false)}>Cerrar</ActionButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nombre"
              htmlFor="join-nombre"
              required
              invalid={errors.nombre}
            >
              <Input
                id="join-nombre"
                value={values.nombre}
                onChange={(e) => setField("nombre")(e.target.value)}
                placeholder="Ana Martínez"
                aria-invalid={Boolean(errors.nombre)}
                className={cn(inputClass, errors.nombre && inputInvalidClass)}
              />
            </Field>

            <Field
              label="Organización"
              htmlFor="join-organizacion"
              required
              invalid={errors.organizacion}
            >
              <Input
                id="join-organizacion"
                value={values.organizacion}
                onChange={(e) => setField("organizacion")(e.target.value)}
                placeholder="Logística Andina S.A."
                aria-invalid={Boolean(errors.organizacion)}
                className={cn(
                  inputClass,
                  errors.organizacion && inputInvalidClass,
                )}
              />
            </Field>

            <Field
              label="Cargo"
              htmlFor="join-cargo"
              required
              invalid={errors.cargo}
            >
              <Input
                id="join-cargo"
                value={values.cargo}
                onChange={(e) => setField("cargo")(e.target.value)}
                placeholder="Gerente de Operaciones"
                aria-invalid={Boolean(errors.cargo)}
                className={cn(inputClass, errors.cargo && inputInvalidClass)}
              />
            </Field>

            <Field
              label="Correo"
              htmlFor="join-correo"
              required
              invalid={errors.correo}
            >
              <Input
                id="join-correo"
                type="email"
                value={values.correo}
                onChange={(e) => setField("correo")(e.target.value)}
                placeholder="ana@empresa.com"
                aria-invalid={Boolean(errors.correo)}
                className={cn(inputClass, errors.correo && inputInvalidClass)}
              />
            </Field>
          </div>

          <Field
            label="Tipo de actor"
            htmlFor="join-tipo"
            required
            invalid={errors.tipoActor}
          >
            <Select
              value={values.tipoActor || undefined}
              onValueChange={setField("tipoActor")}
            >
              <SelectTrigger
                id="join-tipo"
                aria-invalid={Boolean(errors.tipoActor)}
                className={cn(
                  inputClass,
                  "justify-between data-[placeholder]:text-komite-soft/45",
                  errors.tipoActor && inputInvalidClass,
                )}
              >
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-komite-glow/25">
                {ACTOR_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="text-[13px]">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="flex justify-end pt-1">
            <ActionButton type="submit" className="px-5">
              <Send className="h-4 w-4" />
              Enviar
            </ActionButton>
          </div>
        </form>
      )}
    </GlassDialog>
  );
}
