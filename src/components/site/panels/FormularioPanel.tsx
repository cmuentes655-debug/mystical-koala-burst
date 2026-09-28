import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ActionButton";
import { Field, inputClass, inputInvalidClass } from "../modals/Field";

const EMPTY_FORM = {
  nombre: "",
  correo: "",
  organizacion: "",
  mensaje: "",
};

type FormKey = keyof typeof EMPTY_FORM;

const REQUIRED: FormKey[] = ["nombre", "correo", "mensaje"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FormularioPanel() {
  const [values, setValues] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState<Partial<Record<FormKey, boolean>>>(
    {},
  );
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const setField = (key: FormKey) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setEmailError(null);
    setSent(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <header className="flex flex-col items-center gap-1 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Formulario
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Escríbenos
        </h2>
        <p className="max-w-md text-xs leading-snug text-komite-soft/80 sm:text-[13px]">
          Consultas, propuestas de colaboración o interés en sumarte al comité.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass rounded-3xl p-4 sm:p-6"
      >
        {sent ? (
          <div className="flex flex-col items-start gap-4">
            <span className="flex items-start gap-2.5 rounded-2xl border border-komite-glow/40 bg-komite-turquoise/15 px-4 py-3 text-sm text-komite-ink">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-komite-glow" />
              Respuesta registrada. Es una demostración: no se envía nada.
            </span>
            <ActionButton variant="outline" onClick={resetForm}>
              Enviar otra respuesta
            </ActionButton>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                htmlFor="contacto-nombre"
                required
                invalid={errors.nombre}
              >
                <Input
                  id="contacto-nombre"
                  value={values.nombre}
                  onChange={(e) => setField("nombre")(e.target.value)}
                  placeholder="Ana Martínez"
                  aria-invalid={Boolean(errors.nombre)}
                  className={cn(inputClass, errors.nombre && inputInvalidClass)}
                />
              </Field>

              <Field
                label="Correo"
                htmlFor="contacto-correo"
                required
                invalid={errors.correo}
              >
                <Input
                  id="contacto-correo"
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

            <Field label="Organización" htmlFor="contacto-organizacion">
              <Input
                id="contacto-organizacion"
                value={values.organizacion}
                onChange={(e) => setField("organizacion")(e.target.value)}
                placeholder="Logística Andina S.A."
                className={inputClass}
              />
            </Field>

            <Field
              label="Mensaje"
              htmlFor="contacto-mensaje"
              required
              invalid={errors.mensaje}
            >
              <Textarea
                id="contacto-mensaje"
                value={values.mensaje}
                onChange={(e) => setField("mensaje")(e.target.value)}
                placeholder="Cuéntanos qué necesitas o qué te gustaría explorar con el comité."
                aria-invalid={Boolean(errors.mensaje)}
                className={cn(
                  inputClass,
                  "h-auto min-h-[104px] resize-y py-2.5 leading-relaxed",
                  errors.mensaje && inputInvalidClass,
                )}
              />
            </Field>

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
      </motion.div>
    </div>
  );
}
