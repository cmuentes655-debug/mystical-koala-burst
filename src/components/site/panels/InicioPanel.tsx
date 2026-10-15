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
      <motion.h1
        variants={item}
        className="text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-komite-ink sm:text-[2.75rem] lg:text-[3.5rem]"
      >
        Adopción de IA para la Colaboración{" "}
        <span className="text-komite-glow">en las Redes de Valor</span>
      </motion.h1>

      <motion.div variants={item} className="flex max-w-2xl flex-col gap-3 sm:gap-4">
        <p className="font-display text-lg font-medium leading-snug text-komite-glow sm:text-xl">
          IA y colaboración para avanzar juntos
        </p>
        <p className="text-base leading-relaxed text-komite-soft sm:text-lg">
          Impulsar la adopción de inteligencia artificial en las redes de valor
          requiere conectar actores, compartir conocimiento y experimentar
          juntos. Desde LOGYCA facilitamos ese trabajo como un articulador
          neutral y de confianza.
        </p>
        <p className="text-base leading-relaxed text-komite-soft sm:text-lg">
          Aquí encontrarás guías, herramientas y buenas prácticas para explorar
          la IA en la planeación colaborativa de la demanda, la coordinación
          logística y la gestión de incidencias. Un espacio para desarrollar
          capacidades, impulsar pilotos y compartir avances que potencien la
          colaboración en las redes de valor.
        </p>
      </motion.div>

      <EstrategiaPoints />
    </motion.div>
  );
}
