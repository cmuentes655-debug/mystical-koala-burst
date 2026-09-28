import * as React from "react";
import * as tsparticlesReact from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Paleta ponderada: tsParticles elige el color de forma uniforme dentro del
 * arreglo, así que repetimos entradas para dar más peso al turquesa (~11 de 15)
 * y dejar el naranja como acento ocasional (~1 de 15).
 */
const PARTICLE_COLORS: string[] = [
  ...Array<string>(11).fill("#00B398"),
  ...Array<string>(3).fill("#5FE3CC"),
  "#FC4C02",
];

export function ParticlesBackground() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const options = React.useMemo<ISourceOptions>(
    () => ({
      fpsLimit: 60,
      pauseOnBlur: true,
      detectRetina: true,
      fullScreen: { enable: false },
      particles: {
        number: {
          value: isMobile ? 35 : 80,
          density: { enable: false },
        },
        paint: {
          color: { value: PARTICLE_COLORS },
        },
        size: { value: { min: 1, max: 2.5 } },
        shape: { type: "circle" },
        links: {
          enable: true,
          distance: 130,
          color: "#00B398",
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: !reduced,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: !isMobile, mode: "repulse" },
          onClick: { enable: !isMobile, mode: "push" },
        },
        modes: {
          repulse: { distance: 120, duration: 0.4, factor: 100, speed: 1 },
          push: { quantity: 4 },
        },
      },
    }),
    [isMobile, reduced],
  );

  return (
    <div
      className="particles-bg pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <tsparticlesReact.ParticlesProvider init={loadSlim}>
        <tsparticlesReact.Particles
          id="komite-particles"
          options={options}
          className="h-full w-full"
        />
      </tsparticlesReact.ParticlesProvider>
    </div>
  );
}
