import { Badge } from "@/components/ui/badge";
import { ACCESS_LEVEL_META, type AccessLevel } from "@/lib/committee";
import { cn } from "@/lib/utils";

/**
 * Estilo por nivel de acceso:
 * - `publico`: turquesa/glow, lectura abierta.
 * - `miembros`: acento naranja sobre el vidrio oscuro (contraste AA), distinto
 *   del turquesa de un vistazo.
 */
const ACCESS_CLASS: Record<AccessLevel, string> = {
  publico: "border-komite-glow/45 bg-komite-turquoise/15 text-komite-glow",
  miembros: "border-komite-accent/60 bg-komite-accent/20 text-komite-accent",
};

interface AccessBadgeProps {
  accessLevel: AccessLevel;
  className?: string;
}

/**
 * Insignia reutilizable del nivel de acceso. Nunca distingue solo por color:
 * lleva ícono (globo/candado) + texto y además `aria-label`.
 */
export function AccessBadge({ accessLevel, className }: AccessBadgeProps) {
  const meta = ACCESS_LEVEL_META[accessLevel];
  const Icon = meta.icon;

  return (
    <Badge
      aria-label={`Nivel de acceso: ${meta.label}`}
      className={cn(
        "shrink-0 gap-1.5 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em]",
        ACCESS_CLASS[accessLevel],
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {meta.label}
    </Badge>
  );
}
