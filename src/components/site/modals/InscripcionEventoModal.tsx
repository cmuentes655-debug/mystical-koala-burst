import * as React from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarClock, CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { CommitteeEvent } from "@/lib/committee";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ActionButton";
import { ModalityBadge } from "../ModalityBadge";
import { GlassDialog } from "./GlassDialog";
import { Field, inputClass, inputInvalidClass } from "./Field";

interface InscripcionEventoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CommitteeEvent | null;
}

const EMPTY_FORM = {
  nombre: "",
  correo: "",
  organizacion: "",
  cargo: "",
};

type FormKey = keyof typeof EMPTY_FORM;

const REQUIRED: FormKey[] = ["nombre", "correo"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InscripcionEventoModal({
  open,
  onOpenChange,
  event,
}: InscripcionEventoModalProps) {
  const [values, setValues] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState<Partial<Record<FormKey, boolean>>>(
    {},
  );
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  // Reinicia el formulario al abrir/cerrar o al cambiar de evento.
  React.useEffect(() => {
    setValues(EMPTY_FORM);
    setErrors({});
    setEmailError(null);
    setSent(false);
  }, [open, event?.id]);

  const setField = (key: FormKey) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<FormKey, boolean>> = {};
    REQUIRED.forEach((key) => {
      if (!values[key].trim()) nextErrors[key] = true;
    });

    const correo = values.correo.trim();
    const formatoInvalido =
      !nextErrors.correo && correo !== "" && !EMAIL_RE.test(correo);

    setErrors(nextErrors);
    setEmailError(formatoInvalido ? "Ingresa un correo electrónico válido." : null);

    if (Object.keys(nextErrors).length === 0 && !formatoInvalido) setSent(true);
  };

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Inscripción"
      description="Reserva tu cupo en este encuentro del comité."
    >
      <div className="flex flex-col gap-4">
        {event ? (
          <div className="flex flex-col gap-2.5 rounded-2xl border border-komite-glow/20 bg-komite-deep/30 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-sm font-semibold leading-tight text-komite-ink">
                {event.title}
              </span>
              <ModalityBadge modality={event.modality} />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-komite-soft/80">
              <span className="inline-flex items-center gap-1.5 capitalize">
                <CalendarClock className="h-3.5 w-3.5 text-komite-glow/75" />
                {format(parseISO(event.date), "EEEE d 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-komite-glow/75" />
                {event.time}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-komite-glow/75" />
                {event.place}
              </span>
            </div>
          </div>
        ) : null}

        {sent ? (
          <div className="flex flex-col items-start gap-4">
            <span className="flex items-start gap-2.5 rounded-2xl border border-komite-glow/40 bg-komite-turquoise/15 px-4 py-3 text-sm text-komite-ink">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-komite-glow" />
              Inscripción registrada para «{event?.title}» (demostración).
            </span>
            <ActionButton onClick={() => onOpenChange(false)} className="px-6">
              Cerrar
            </ActionButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                htmlFor="inscripcion-nombre"
                required
                invalid={errors.nombre}
              >
                <Input
                  id="inscripcion-nombre"
                  value={values.nombre}
                  onChange={(e) => setField("nombre")(e.target.value)}
                  placeholder="Ana Martínez"
                  aria-invalid={Boolean(errors.nombre)}
                  className={cn(inputClass, errors.nombre && inputInvalidClass)}
                />
              </Field>

              <Field
                label="Correo"
                htmlFor="inscripcion-correo"
                required
                invalid={errors.correo}
              >
                <Input
                  id="inscripcion-correo"
                  type="email"
                  value={values.correo}
                  onChange={(e) => {
                    setField("correo")(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="ana@empresa.com"
                  aria-invalid={Boolean(errors.correo || emailError)}
                  className={cn(
                    inputClass,
                    (errors.correo || emailError) && inputInvalidClass,
                  )}
                />
                {emailError ? (
                  <span className="text-[11px] text-komite-accent">
                    {emailError}
                  </span>
                ) : null}
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Organización" htmlFor="inscripcion-organizacion">
                <Input
                  id="inscripcion-organizacion"
                  value={values.organizacion}
                  onChange={(e) => setField("organizacion")(e.target.value)}
                  placeholder="Logística Andina S.A."
                  className={inputClass}
                />
              </Field>

              <Field label="Cargo/Rol" htmlFor="inscripcion-cargo">
                <Input
                  id="inscripcion-cargo"
                  value={values.cargo}
                  onChange={(e) => setField("cargo")(e.target.value)}
                  placeholder="Gerente de Operaciones"
                  className={inputClass}
                />
              </Field>
            </div>

            <p className="text-[11px] leading-snug text-komite-soft/60">
              Formulario de demostración: tus datos no se almacenan ni se envían
              a ningún servicio.
            </p>

            <div className="flex justify-end">
              <ActionButton type="submit" className="px-6">
                <Send className="h-4 w-4" />
                Enviar
              </ActionButton>
            </div>
          </form>
        )}
      </div>
    </GlassDialog>
  );
}
