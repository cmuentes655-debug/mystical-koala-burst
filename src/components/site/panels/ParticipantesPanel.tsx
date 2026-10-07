import { motion } from "framer-motion";
import { ParticipantesMarquee } from "@/components/site/participantes/ParticipantesMarquee";

export function ParticipantesPanel() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Quiénes participan de la red
        </h2>
        <p className="max-w-md text-xs leading-snug text-komite-soft/80 sm:text-[13px]">
          Empresas, instituciones y aliados que construyen la red de valor.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full"
      >
        <ParticipantesMarquee />
      </motion.div>
    </div>
  );
}
