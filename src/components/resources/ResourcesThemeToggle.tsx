import * as React from "react";
import { cn } from "@/lib/utils";

export type ResourcePalette = "a" | "b";

const STORAGE_KEY = "komite.resource-palette";

/**
 * Marco activo con persistencia en `localStorage`. Mientras se decide entre A
 * y B el toggle de la página la escribe en `data-resource-palette`; el día que
 * se fije una ganadora basta con dejar de renderizar el toggle y fijar el
 * atributo (o el default) en la página.
 */
export function useResourcePalette(): [ResourcePalette, (next: ResourcePalette) => void] {
  const [palette, setPaletteState] = React.useState<ResourcePalette>(() => {
    if (typeof window === "undefined") return "a";
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "b" ? "b" : "a";
    } catch {
      return "a";
    }
  });

  const setPalette = React.useCallback((next: ResourcePalette) => {
    setPaletteState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Almacenamiento no disponible (modo privado): el cambio sigue en memoria.
    }
  }, []);

  return [palette, setPalette];
}

interface DesignOption {
  value: ResourcePalette;
  label: string;
  /** Nombre corto que se muestra como leyenda del diseño activo. */
  name: string;
  /** Descripción extensa para `aria-label`/`title`. */
  description: string;
  /** Colores del mini-swatch: marco + superficie de card. */
  frame: string;
  card: string;
  swatchBorder: string;
}

const OPTIONS: DesignOption[] = [
  {
    value: "a",
    label: "A",
    name: "Marco verde profundo",
    description:
      "Diseño A, marco verde profundo de marca: lienzo oscuro, cards claras y filtros en vidrio",
    frame: "#00211d",
    card: "#fbfdfc",
    swatchBorder: "#014a3f",
  },
  {
    value: "b",
    label: "B",
    name: "Papel claro tintado",
    description:
      "Diseño B, papel claro tintado en turquesa: lienzo claro, cards blancas y filtros en tarjeta blanca",
    frame: "#eef5f3",
    card: "#ffffff",
    swatchBorder: "#c7ded9",
  },
];

interface ResourcesThemeToggleProps {
  value: ResourcePalette;
  onChange: (next: ResourcePalette) => void;
  className?: string;
}

/**
 * Comparador de los dos marcos completos de la página (fondo, superficies,
 * campos y cards, no solo el acento). La leyenda nombra el diseño activo y se
 * oculta en móvil para dejar solo el segmented control.
 */
export function ResourcesThemeToggle({
  value,
  onChange,
  className,
}: ResourcesThemeToggleProps) {
  const active = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  return (
    <div className={cn("flex flex-col items-start gap-1.5 sm:items-end", className)}>
      <div
        role="group"
        aria-label="Diseño del marco de la página de Recursos"
        className="inline-flex items-center gap-2 rounded-full border border-resource-border bg-resource-surface px-2 py-1 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.6)]"
      >
        <span className="pl-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-resource-muted">
          Diseño
        </span>
        <div className="flex items-center gap-0.5">
          {OPTIONS.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={isActive}
                aria-label={option.description}
                title={option.description}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus",
                  isActive
                    ? "bg-resource-tag text-resource-tag-fg ring-1 ring-resource-field-border"
                    : "text-resource-muted hover:bg-resource-surface-2 hover:text-resource-heading",
                )}
              >
                <span
                  aria-hidden="true"
                  className="relative h-3.5 w-3.5 rounded-full border"
                  style={{
                    backgroundColor: option.frame,
                    borderColor: option.swatchBorder,
                  }}
                >
                  <span
                    className="absolute inset-[3px] rounded-full"
                    style={{ backgroundColor: option.card }}
                  />
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p
        className="hidden items-center gap-1.5 pl-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-resource-muted sm:inline-flex"
        aria-live="polite"
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-resource-accent" />
        {active.name}
      </p>
    </div>
  );
}
