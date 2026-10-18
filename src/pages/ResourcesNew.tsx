import * as React from "react";
import { Library } from "lucide-react";
import { TopBar } from "@/components/site/TopBar";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourcePagination } from "@/components/resources/ResourcePagination";
import {
  ResourcesThemeToggle,
  useResourcePalette,
} from "@/components/resources/ResourcesThemeToggle";
import { useResourcesQuery } from "@/components/resources/useResourcesQuery";

/**
 * Entorno de pruebas del submenú "Recursos (nuevo)". Todo el color sale de los
 * tokens `resource.*`, así que el toggle A/B repinta la página sin duplicar
 * componentes. Cuando se fije la paleta, basta con dejar el default y quitar el
 * toggle.
 */
const ResourcesNew = () => {
  const [palette, setPalette] = useResourcePalette();
  const query = useResourcesQuery();
  const listTopRef = React.useRef<HTMLDivElement>(null);

  const handlePageChange = (next: number) => {
    query.setPage(next);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      data-resource-palette={palette}
      className="relative h-[100dvh] overflow-y-auto bg-resource-page text-resource-text"
    >
      <div className="sticky top-0 z-30">
        <TopBar onLogin={() => {}} onJoin={() => {}} />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-12 pt-6 sm:gap-6 sm:px-6 sm:pt-8 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-resource-muted">
              Repositorio del comité
            </span>
            <h1 className="font-display text-3xl font-bold tracking-tight text-resource-text sm:text-4xl">
              Recursos
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-resource-muted">
              Blogs, guías y documentos para adoptar IA en la red de valor.
              Filtra por tipo, formato, acceso o autor.
            </p>
          </div>
          <ResourcesThemeToggle value={palette} onChange={setPalette} />
        </header>

        <ResourceFilters
          applied={query.filters}
          activeFilterCount={query.activeFilterCount}
          onApply={query.applyFilters}
          onClear={query.clearFilters}
        />

        <div ref={listTopRef} className="scroll-mt-24" />

        <div className="flex flex-col gap-1">
          <p
            aria-live="polite"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-resource-muted"
          >
            {query.isLoading
              ? "Cargando recursos…"
              : `Mostrando ${query.pageItems.length} de ${query.total} recursos`}
          </p>
          {query.pageCount > 1 && !query.isLoading ? (
            <p className="text-[12px] text-resource-muted">
              Página {query.page} de {query.pageCount}
            </p>
          ) : null}
        </div>

        <ResourceGrid
          items={query.pageItems}
          isLoading={query.isLoading}
          onClearFilters={query.clearFilters}
        />

        <ResourcePagination
          page={query.page}
          pageCount={query.pageCount}
          onPageChange={handlePageChange}
        />

        <footer className="mt-4 flex flex-col items-center gap-2 border-t border-resource-border pt-6 text-center">
          <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-resource-text">
            <Library className="h-4 w-4 text-resource-tag" aria-hidden="true" />
            Adopción de IA · Redes de Valor
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-resource-muted">
            Recursos del comité · datos de ejemplo
          </span>
        </footer>
      </main>
    </div>
  );
};

export default ResourcesNew;
