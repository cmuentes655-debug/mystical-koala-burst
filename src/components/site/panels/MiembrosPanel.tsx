import { motion } from "framer-motion";
import { ArrowUpRight, LogIn, UploadCloud, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MemberAction = "login" | "upload" | "join";

interface MemberCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action: MemberAction;
}

const CARDS: MemberCard[] = [
  {
    id: "login",
    title: "Iniciar sesión",
    description: "Accede al panel de trabajo del comité.",
    icon: LogIn,
    action: "login",
  },
  {
    id: "upload",
    title: "Cargar archivos",
    description: "Comparte documentos, guías e indicadores.",
    icon: UploadCloud,
    action: "upload",
  },
  {
    id: "join",
    title: "Unirse al comité",
    description: "Súmate a la red y participa en los pilotos.",
    icon: UserPlus,
    action: "join",
  },
];

interface MiembrosPanelProps {
  onAction: (action: MemberAction) => void;
}

export function MiembrosPanel({ onAction }: MiembrosPanelProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <header className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Miembros
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Accesos del comité
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.07 * index },
              }}
              whileHover={{ y: -3 }}
              onClick={() => onAction(card.action)}
              className="glass group flex flex-col gap-2 rounded-2xl p-3 text-left transition-colors duration-200 hover:border-komite-glow/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-2 focus-visible:ring-offset-komite-deep sm:gap-2.5 sm:p-4"
            >
              <span className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowUpRight className="hidden h-4 w-4 text-komite-glow/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-komite-glow sm:block" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-[12px] font-semibold leading-tight text-komite-ink sm:text-sm">
                  {card.title}
                </span>
                <span className="hidden text-[11px] leading-snug text-komite-soft/85 sm:block">
                  {card.description}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
