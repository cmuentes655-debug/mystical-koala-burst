import * as React from "react";
import { ArrowLeft, Library } from "lucide-react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/site/TopBar";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourcePagination } from "@/components/resources/ResourcePagination";
import { useResourcesQuery } from "@/components/resources/useResourcesQuery";

const BACK_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-resource-field-border bg-resource-field px-3.5 py-1.5 text-[12.5px] font-semibold text-resource-field-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2";

/**
 * Repositorio de recursos: blogs, guías y documentos del comité. Todo el color
 * sale de los tokens `resource.*` del marco verde profundo (`data-resource-palette="a"`),
 * así que la vista comparte lienzo con la landing y las cards claras quedan como
 * "papeles sobre una mesa oscura".
 */
const ResourcesNew = () => {
  const query = useResourcesQuery();
  const listTopRef = React.useRef<HTMLDivElement>(null);

  const handlePageChange = (next: number) => {
    query.setPage(next);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      data-resource-palette="a"
      className="resource-page-bg relative h-[100dvh] overflow-y-auto text-resource-heading"
    >
      <div className="sticky top-0 z-30">
        <TopBar onLogin={() => {}} onJoin={() => {}} />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-12 pt-6 sm:gap-6 sm:px-6 sm:pt-8 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-6%] top-0 h-[34rem] rounded-[999px] bg-[radial-gradient(58%_62%_at_50%_0%,rgba(95,227,204,0.16),rgba(95,227,204,0)_72%)]"
        />

        <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link to="/" className={BACK_CLASS}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <nav
            aria-label="Ruta de navegación"
            className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-resource-muted"
          >
            <Link
              to="/"
              className="rounded-sm transition-colors duration-200 hover:text-resource-accent focus-visible:outline-none"
            >
              Inicio
            </Link>
            <span aria-hidden="true" className="text-resource-muted opacity-60">
              /
            </span>
            <span className="truncate text-resource-heading">Recursos</span>
          </nav>
        </div>

        <header className="relative flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-resource-muted">
            Repositorio del comité
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-resource-heading sm:text-4xl">
            Recursos
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-resource-muted">
            Blogs, guías y documentos para adoptar IA en la red de valor. Filtra
            por tipo, formato, acceso o autor.
          </p>
        </header>

        <ResourceFilters
          applied={query.filters}
          activeFilterCount={query.activeFilterCount}
          onApply={query.applyFilters}
          onClear={query.clearFilters}
        />

        <div ref={listTopRef} className="scroll-mt-24" />

        <div className="relative flex flex-col gap-1">
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
          <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-resource-heading">
            <Library className="h-4 w-4 text-resource-accent" aria-hidden="true" />
            Adopción de IA · Redes de Valor
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-resource-muted">
            Recursos del comité
          </span>
        </footer>
      </main>
    </div>
  );
};

export default ResourcesNew;
