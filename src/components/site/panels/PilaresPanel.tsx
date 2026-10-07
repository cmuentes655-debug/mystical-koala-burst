import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { FUNCTIONS, GOVERNANCE_PILLAR } from "@/lib/committee";
import { ActionButton } from "../ActionButton";

interface PilaresPanelProps {
  onUpload: () => void;
}

export function PilaresPanel({ onUpload }: PilaresPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Los pilares del comité
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              className="glass col-span-1 flex flex-col gap-2.5 rounded-2xl px-4 pt-4 pb-3"
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

        <motion.div
          key={GOVERNANCE_PILLAR.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay: 0.05 * FUNCTIONS.length + 0.1 },
          }}
          className="glass-strong col-span-full flex items-center justify-center rounded-2xl border border-komite-accent/40 px-5 py-5 text-center shadow-[0_0_40px_-12px] shadow-komite-glow/50"
        >
          <span className="font-display text-base font-semibold tracking-tight text-komite-ink sm:text-lg">
            {GOVERNANCE_PILLAR.title}
          </span>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <ActionButton variant="outline" onClick={onUpload}>
          <UploadCloud className="h-4 w-4" />
          Cargar archivos
        </ActionButton>
      </div>
    </div>
  );
}
