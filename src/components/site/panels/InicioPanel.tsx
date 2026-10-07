import { motion, type Variants } from "framer-motion";
import { EstrategiaPoints } from "../EstrategiaPoints";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function InicioPanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
    >
      <motion.span
        variants={item}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-komite-glow/25 bg-komite-turquoise/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-komite-glow sm:mt-7"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-komite-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-komite-accent" />
        </span>
        Convocatoria abierta
      </motion.span>

      <motion.h1
        variants={item}
        className="text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-komite-ink sm:text-[2.75rem] lg:text-[3.5rem]"
      >
        Adopción de IA para la Colaboración{" "}
        <span className="text-komite-glow">en las Redes de Valor</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-xl text-base leading-relaxed text-komite-soft sm:text-lg"
      >
        Impulsamos la inteligencia artificial para que la logística colabore
        mejor, de extremo a extremo.
      </motion.p>

      <EstrategiaPoints />
    </motion.div>
  );
}
