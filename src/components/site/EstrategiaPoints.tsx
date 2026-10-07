import { motion, type Variants } from "framer-motion";
import { STRATEGY_POINTS } from "@/lib/committee";
import { cn } from "@/lib/utils";

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/**
 * Resumen estratégico (Objetivo · Rol LOGYCA · Meta 2026) que acompaña al CTA
 * en la pestaña Inicio. Es contenido de lectura: una lista semántica sin
 * interacción, cuyos `motion` heredan `initial`/`animate` del `InicioPanel`
 * para aparecer después de la entrada del hero.
 */
export function EstrategiaPoints() {
  return (
    <motion.ul
      variants={listContainer}
      className="glass w-full max-w-2xl divide-y divide-komite-glow/12 overflow-hidden rounded-3xl text-left"
    >
      {STRATEGY_POINTS.map((point) => {
        const Icon = point.icon;
        return (
          <motion.li
            key={point.id}
            variants={listItem}
            className={cn(
              "flex items-start gap-3.5 px-4 py-4 sm:px-5 sm:py-[18px]",
              point.emphasized && "bg-komite-accent/10",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                point.emphasized
                  ? "bg-komite-accent text-komite-deep"
                  : "border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>

            <span className="flex min-w-0 flex-col gap-1">
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.22em]",
                  point.emphasized ? "text-komite-accent" : "text-komite-glow/80",
                )}
              >
                {point.label}
              </span>
              <span
                className={cn(
                  "text-[13px] leading-snug sm:text-sm",
                  point.emphasized ? "text-komite-ink" : "text-komite-soft",
                )}
              >
                {point.text}
              </span>
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
