import { motion } from "framer-motion";
import { ChevronRight, FileSearch, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FUNCTIONS, GOVERNANCE_PILLAR } from "@/lib/committee";
import { ActionButton } from "../ActionButton";

interface PilaresPanelProps {
  onUpload: () => void;
  onSearch: () => void;
}

export function PilaresPanel({ onUpload, onSearch }: PilaresPanelProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Los pilares de la red
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {FUNCTIONS.map((fn, index) => {
          const Icon = fn.icon;
          return (
            <motion.button
              key={fn.id}
              type="button"
              onClick={() => navigate(`/pilares/${fn.id}`)}
              aria-label={`Ver detalle: ${fn.title}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.05 * index },
              }}
              whileHover={{ y: -3 }}
              className="glass group col-span-1 flex w-full cursor-pointer flex-col gap-2.5 rounded-2xl px-4 pt-4 pb-3 text-left transition-colors duration-200 hover:border-komite-glow/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-2 focus-visible:ring-offset-komite-deep"
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
              <span className="mt-auto flex items-center justify-end gap-1 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-komite-glow/80 opacity-70 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                Ver detalle
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          );
        })}

        <motion.button
          key={GOVERNANCE_PILLAR.id}
          type="button"
          onClick={() => navigate(`/pilares/${GOVERNANCE_PILLAR.id}`)}
          aria-label={`Ver detalle: ${GOVERNANCE_PILLAR.title}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay: 0.05 * FUNCTIONS.length + 0.1 },
          }}
          whileHover={{ y: -3 }}
          className="glass-strong group col-span-full flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border border-komite-accent/40 px-5 py-5 text-left shadow-[0_0_40px_-12px] shadow-komite-glow/50 transition-colors duration-200 hover:border-komite-glow/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-2 focus-visible:ring-offset-komite-deep sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span className="font-display text-base font-semibold tracking-tight text-komite-ink sm:text-lg">
            {GOVERNANCE_PILLAR.title}
          </span>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-komite-glow/80 opacity-70 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            Ver detalle
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </motion.button>
      </div>

      <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <ActionButton variant="outline" onClick={onUpload} className="w-full sm:w-auto">
          <UploadCloud className="h-4 w-4" />
          Cargar archivos
        </ActionButton>
        <ActionButton variant="outline" onClick={onSearch} className="w-full sm:w-auto">
          <FileSearch className="h-4 w-4" />
          Buscar archivos
        </ActionButton>
      </div>
    </div>
  );
}
