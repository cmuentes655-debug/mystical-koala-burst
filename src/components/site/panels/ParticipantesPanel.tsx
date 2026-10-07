import * as React from "react";
import { motion } from "framer-motion";
import { ParticipantesMarquee } from "@/components/site/participantes/ParticipantesMarquee";
import { ParticipantesCarousel } from "@/components/site/participantes/ParticipantesCarousel";
import { cn } from "@/lib/utils";

type VistaParticipantes = "marquee" | "carrusel";

const VISTAS: { id: VistaParticipantes; label: string }[] = [
  { id: "marquee", label: "Marquee" },
  { id: "carrusel", label: "Carrusel" },
];

export function ParticipantesPanel() {
  // TODO temporal: conmutador para comparar ambas variantes. Quitar (junto con
  // la variante descartada) cuando se elija una.
  const [vista, setVista] = React.useState<VistaParticipantes>("marquee");

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Quiénes participan del comité
        </h2>
        <p className="max-w-md text-xs leading-snug text-komite-soft/80 sm:text-[13px]">
          Empresas, instituciones y aliados que construyen la red de valor.
        </p>
      </header>

      {/* Conmutador de vista (temporal). */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-komite-soft/50">
          Vista previa
        </span>
        <div
          role="tablist"
          aria-label="Variante de presentación de logos"
          className="glass inline-flex items-center gap-1 rounded-full p-1"
        >
          {VISTAS.map((opcion) => {
            const active = vista === opcion.id;
            return (
              <button
                key={opcion.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setVista(opcion.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow",
                  active
                    ? "bg-komite-turquoise/20 text-komite-glow ring-1 ring-komite-glow/40"
                    : "text-komite-soft/60 hover:text-komite-ink",
                )}
              >
                {opcion.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={vista}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full"
      >
        {vista === "marquee" ? (
          <ParticipantesMarquee />
        ) : (
          <ParticipantesCarousel />
        )}
      </motion.div>
    </div>
  );
}
