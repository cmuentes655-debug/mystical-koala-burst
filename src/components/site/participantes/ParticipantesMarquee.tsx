import { PARTICIPANT_LOGOS } from "@/lib/committee";
import { ParticipanteLogoTile } from "./ParticipanteLogoTile";

/** Degradado en los bordes para que los logos entren/salgan suavemente. */
const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)";

/**
 * Franja de logos con scroll infinito. La lista se duplica para que el
 * desplazamiento (translateX 0 → -50%) se repita sin costura. Se pausa al pasar
 * el mouse o al enfocar con el teclado y respeta `prefers-reduced-motion`.
 */
export function ParticipantesMarquee() {
  const loop = [...PARTICIPANT_LOGOS, ...PARTICIPANT_LOGOS];

  return (
    <div
      className="group/marquee relative w-full overflow-hidden py-2"
      style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
    >
      <ul
        aria-label="Organizaciones participantes de la red"
        className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {loop.map((logo, index) => {
          const isClone = index >= PARTICIPANT_LOGOS.length;
          return (
            <li
              key={`${logo.id}-${index}`}
              aria-hidden={isClone}
              className="w-32 shrink-0 pr-3 sm:w-44 sm:pr-5"
            >
              <ParticipanteLogoTile
                file={logo.file}
                name={logo.name}
                nudgeY={logo.nudgeY}
                scale={logo.scale}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
