import { cn } from "@/lib/utils";

/**
 * Globo estático en CSS/SVG para cuando WebGL no está disponible.
 * Mantiene la composición visual sin romper el layout.
 */
export function FallbackGlobe({ className }: { className?: string }) {
  return (
    <div className={cn("grid place-items-center", className)}>
      <div className="relative aspect-square w-[80%] max-w-[520px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, rgba(0,179,152,0.40) 0%, rgba(2,38,31,0.85) 55%, rgba(0,33,29,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-[6%] rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(#5FE3CC 1px, transparent 1.5px)",
            backgroundSize: "15px 15px",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 60%, transparent 71%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 60%, transparent 71%)",
            opacity: 0.75,
          }}
        />
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M34 142 Q82 28 172 72"
            fill="none"
            stroke="#00B398"
            strokeWidth="1.6"
            opacity="0.7"
          />
          <path
            d="M22 96 Q96 124 176 132"
            fill="none"
            stroke="#00B398"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <circle cx="172" cy="72" r="3.6" fill="#FC4C02" />
        </svg>
      </div>
    </div>
  );
}
