import { motion } from "framer-motion";
import { FUNCTIONS } from "@/lib/committee";

interface FuncionesPanelProps {
  onHoverFunction: (index: number | null) => void;
}

export function FuncionesPanel({ onHoverFunction }: FuncionesPanelProps) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3 sm:gap-4">
      <header className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Funciones
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Lo que articula el comité
        </h2>
      </header>

      <ul className="flex flex-col gap-1.5">
        {FUNCTIONS.map((fn, index) => {
          const Icon = fn.icon;
          return (
            <li key={fn.id}>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: 0.05 * index },
                }}
                whileHover={{ x: 4 }}
                onMouseEnter={() => onHoverFunction(index)}
                onMouseLeave={() => onHoverFunction(null)}
                onFocus={() => onHoverFunction(index)}
                onBlur={() => onHoverFunction(null)}
                className="group flex w-full items-start gap-3 rounded-2xl border border-transparent px-3 py-2 text-left transition-colors duration-200 hover:border-komite-glow/30 hover:bg-komite-turquoise/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-2 focus-visible:ring-offset-komite-deep"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-komite-glow/25 bg-komite-turquoise/15 text-komite-glow transition-colors group-hover:border-komite-glow/60 group-hover:text-komite-ink">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-[13px] font-semibold text-komite-ink sm:text-sm">
                    {fn.title}
                  </span>
                  <span className="text-[11.5px] leading-snug text-komite-soft/85 sm:text-xs">
                    {fn.description}
                  </span>
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
