import * as React from "react";
import { cn } from "@/lib/utils";

export type ResourcePalette = "a" | "b";

const STORAGE_KEY = "komite.resource-palette";

/**
 * Paleta activa con persistencia en `localStorage`. Mientras se decide entre A
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

const OPTIONS: { value: ResourcePalette; label: string; hint: string }[] = [
  { value: "a", label: "A", hint: "Etiqueta verde profunda y acción naranja" },
  { value: "b", label: "B", hint: "Etiqueta turquesa y acción turquesa" },
];

interface ResourcesThemeToggleProps {
  value: ResourcePalette;
  onChange: (next: ResourcePalette) => void;
  className?: string;
}

/** Segmented control para comparar las dos paletas en vivo. */
export function ResourcesThemeToggle({
  value,
  onChange,
  className,
}: ResourcesThemeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Paleta de colores de la página de Recursos"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-resource-border bg-resource-surface px-2 py-1",
        className,
      )}
    >
      <span className="pl-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-resource-muted">
        Paleta
      </span>
      <div className="flex items-center gap-0.5">
        {OPTIONS.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              aria-label={`Paleta ${option.label}: ${option.hint}`}
              title={option.hint}
              className={cn(
                "min-w-[2.1rem] rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
                active
                  ? "bg-resource-tag text-resource-tag-fg"
                  : "text-resource-muted hover:bg-resource-surface2 hover:text-resource-text",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
