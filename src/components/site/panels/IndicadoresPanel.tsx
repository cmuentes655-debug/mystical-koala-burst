import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";
import { INDICATORS } from "@/lib/committee";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  prefix: string;
}

function CountUp({ value, prefix }: CountUpProps) {
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const text = useTransform(count, (latest) => `${prefix}${Math.round(latest)}`);

  React.useEffect(() => {
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [count, reduced, value]);

  return <motion.span>{text}</motion.span>;
}

export function IndicadoresPanel() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Indicadores
        </span>
        <h2 className="max-w-md font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          La red avanza con métricas compartidas
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {INDICATORS.map((indicator, index) => (
          <motion.div
            key={indicator.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.08 * index },
            }}
            className="flex flex-col gap-1.5 rounded-2xl border border-komite-glow/15 bg-komite-turquoise/[0.07] p-3 backdrop-blur-sm sm:p-4"
          >
            <span className="font-mono text-2xl font-bold leading-none text-komite-ink sm:text-3xl lg:text-[2.6rem]">
              <CountUp value={indicator.value} prefix={indicator.prefix} />
            </span>
            <span className="font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-komite-glow/90 sm:text-[10.5px]">
              {indicator.label}
            </span>
            <span className="text-[10px] leading-tight text-komite-soft/70 sm:text-[11px]">
              {indicator.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
