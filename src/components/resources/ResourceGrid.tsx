import { SearchX } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { ResourceSkeletons } from "./ResourceSkeletons";
import type { Resource } from "./ResourceTypes";

interface ResourceGridProps {
  items: Resource[];
  isLoading: boolean;
  onClearFilters: () => void;
}

/**
 * Grid responsivo de recursos (1 / 2 / 3 columnas) con sus dos estados:
 * skeletons durante la carga y mensaje de vacío con acción de limpieza.
 */
export function ResourceGrid({ items, isLoading, onClearFilters }: ResourceGridProps) {
  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        <ResourceSkeletons count={6} />
        <span className="sr-only">Cargando recursos…</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-resource-border bg-resource-surface px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-resource-border bg-resource-page text-resource-muted">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-base font-semibold text-resource-text">
            No encontramos recursos con estos filtros
          </p>
          <p className="text-sm text-resource-muted">
            Prueba con otros términos o quita algunos filtros para ampliar la búsqueda.
          </p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 rounded-full border border-resource-tag px-4 py-2 text-[13px] font-semibold text-resource-tag transition-colors duration-200 hover:bg-resource-tag hover:text-resource-tag-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2"
        >
          Limpiar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {items.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
