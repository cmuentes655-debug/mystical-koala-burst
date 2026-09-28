import { motion } from "framer-motion";
import { FUNCTIONS } from "@/lib/committee";
import { cn } from "@/lib/utils";

export function FuncionesPanel() {
  return (
    <div className="mx-auto flex w-full flex-col gap-5">
      <header className="flex flex-col items-center gap-1 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Funciones
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Lo que articula el comité
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
        {FUNCTIONS.map((fn, index) => {
          const Icon = fn.icon;
          return (
            <motion.div
              key={fn.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.05 * index },
              }}
              whileHover={{ y: -3 }}
              className={cn(
                "glass col-span-1 flex flex-col gap-3 rounded-2xl p-4 sm:col-span-2",
                index === 3 && "sm:col-start-2",
              )}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-sm font-semibold leading-tight text-komite-ink">
                  {fn.title}
                </span>
                <span className="text-xs leading-snug text-komite-soft/85">
                  {fn.description}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
