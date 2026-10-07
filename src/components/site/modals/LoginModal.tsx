import * as React from "react";
import { CheckCircle2, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ActionButton";
import { GlassDialog } from "./GlassDialog";
import { Field, inputClass, inputInvalidClass } from "./Field";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [correo, setCorreo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    correo?: boolean;
    password?: boolean;
  }>({});
  const [sent, setSent] = React.useState(false);
  const [hint, setHint] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setCorreo("");
      setPassword("");
      setErrors({});
      setSent(false);
      setHint(false);
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { correo?: boolean; password?: boolean } = {};
    if (!correo.trim()) nextErrors.correo = true;
    if (!password.trim()) nextErrors.password = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Iniciar sesión"
      description="Accede al espacio de trabajo de la red. Demo visual, sin autenticación real."
    >
      {sent ? (
        <div className="flex flex-col items-start gap-4">
          <span className="flex items-center gap-2 rounded-2xl border border-komite-glow/40 bg-komite-turquoise/15 px-4 py-3 text-sm text-komite-ink">
            <CheckCircle2 className="h-5 w-5 text-komite-glow" />
            Credenciales registradas (demostración).
          </span>
          <ActionButton onClick={() => onOpenChange(false)}>Cerrar</ActionButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            label="Correo"
            htmlFor="login-correo"
            required
            invalid={errors.correo}
          >
            <Input
              id="login-correo"
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@organizacion.com"
              aria-invalid={Boolean(errors.correo)}
              className={cn(inputClass, errors.correo && inputInvalidClass)}
            />
          </Field>

          <Field
            label="Contraseña"
            htmlFor="login-password"
            required
            invalid={errors.password}
          >
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              className={cn(inputClass, errors.password && inputInvalidClass)}
            />
          </Field>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setHint(true)}
              className="self-start text-[12px] text-komite-glow underline decoration-komite-glow/40 underline-offset-4 transition-colors hover:text-komite-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
            >
              ¿Olvidaste tu contraseña?
            </button>
            {hint ? (
              <span className="text-[11px] text-komite-soft">
                Te enviaríamos un enlace de recuperación. Es una demostración.
              </span>
            ) : null}
          </div>

          <div className="flex justify-end pt-1">
            <ActionButton type="submit" className="px-5">
              <LogIn className="h-4 w-4" />
              Ingresar
            </ActionButton>
          </div>
        </form>
      )}
    </GlassDialog>
  );
}
