import * as React from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCESS_LEVEL_META, ACCESS_LEVEL_ORDER } from "@/lib/committee";
import { RESOURCE_AUTHORS } from "./resourcesData";
import {
  RESOURCE_FILE_META,
  RESOURCE_FILE_ORDER,
  RESOURCE_SORT_OPTIONS,
  RESOURCE_TYPE_META,
  RESOURCE_TYPE_ORDER,
} from "./ResourceMeta";
import {
  DEFAULT_RESOURCE_FILTERS,
  type ResourceFiltersState,
} from "./ResourceTypes";

const FIELD_CLASS =
  "h-10 w-full appearance-none rounded-xl border border-resource-field-border bg-resource-field px-3 pr-9 text-[13px] text-resource-field-text transition-colors duration-200 hover:border-resource-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus disabled:cursor-not-allowed disabled:border-resource-border disabled:bg-resource-surface-2 disabled:text-resource-muted disabled:hover:border-resource-border";

const LABEL_CLASS =
  "font-mono text-[9.5px] uppercase tracking-[0.18em] text-resource-muted";

const HEADER_BUTTON_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-resource-field-border bg-resource-field px-3.5 py-2 text-[13px] font-semibold text-resource-field-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus";

const SELECT_ALL = "todos";

interface FieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className={LABEL_CLASS}>
        {label}
      </label>
      {children}
    </div>
  );
}

interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  id: string;
  label: string;
  className?: string;
}

function SelectField({ id, label, className, children, ...props }: SelectFieldProps) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <select id={id} className={FIELD_CLASS} {...props}>
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-resource-muted"
        />
      </div>
    </Field>
  );
}

interface ResourceFiltersProps {
  applied: ResourceFiltersState;
  activeFilterCount: number;
  onApply: (filters: ResourceFiltersState) => void;
  onClear: () => void;
  className?: string;
}

/**
 * Panel de filtros con estado "borrador": los valores no se aplican hasta
 * pulsar Aplicar (o Enter en el buscador). El contenedor se abre y se minimiza
 * con su botón de cabecera en cualquier tamaño de pantalla; al aplicar, se
 * minimiza para dejar ver los resultados y queda un resumen de lo activo.
 */
export function ResourceFilters({
  applied,
  activeFilterCount,
  onApply,
  onClear,
  className,
}: ResourceFiltersProps) {
  const [draft, setDraft] = React.useState<ResourceFiltersState>(applied);
  // Si la página llega con filtros ya aplicados (URL compartida o vuelta desde
  // el detalle), el panel arranca abierto para poder ajustarlos.
  const [open, setOpen] = React.useState(() => activeFilterCount > 0);

  // Mantiene el borrador alineado con el estado aplicado (URL, limpiar, atrás).
  const appliedKey = JSON.stringify(applied);
  React.useEffect(() => {
    setDraft(JSON.parse(appliedKey) as ResourceFiltersState);
  }, [appliedKey]);

  const isBlog = draft.tipo === "blog";

  const summary = React.useMemo(() => {
    const items: string[] = [];
    const query = applied.q.trim();
    if (query) items.push(`“${query}”`);
    if (applied.tipo !== "todos") items.push(RESOURCE_TYPE_META[applied.tipo].label);
    if (applied.tipo !== "blog" && applied.archivo !== "todos") {
      items.push(RESOURCE_FILE_META[applied.archivo].label);
    }
    if (applied.acceso !== "todos") items.push(ACCESS_LEVEL_META[applied.acceso].label);
    if (applied.autor) items.push(applied.autor);
    const sort = RESOURCE_SORT_OPTIONS.find((option) => option.value === applied.orden);
    if (sort && applied.orden !== DEFAULT_RESOURCE_FILTERS.orden) {
      items.push(sort.label);
    }
    return items;
  }, [applied]);

  const update = <K extends keyof ResourceFiltersState>(
    key: K,
    value: ResourceFiltersState[K],
  ) => setDraft((current) => ({ ...current, [key]: value }));

  const handleType = (value: ResourceFiltersState["tipo"]) =>
    setDraft((current) => ({
      ...current,
      tipo: value,
      archivo: value === "blog" ? SELECT_ALL : current.archivo,
    }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      ...draft,
      archivo: draft.tipo === "blog" ? SELECT_ALL : draft.archivo,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setDraft(DEFAULT_RESOURCE_FILTERS);
    onClear();
    setOpen(false);
  };

  return (
    <section
      aria-label="Filtros de recursos"
      className={cn(
        "rounded-2xl border border-resource-border bg-resource-surface p-3 backdrop-blur-md sm:p-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="resource-filters-panel"
            aria-label={open ? "Minimizar filtros" : "Expandir filtros"}
            className={HEADER_BUTTON_CLASS}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtros
            {activeFilterCount > 0 ? (
              <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-resource-tag px-1 font-mono text-[10px] text-resource-tag-fg">
                {activeFilterCount}
              </span>
            ) : null}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>

          {!open ? (
            <p className="hidden min-w-0 text-[12px] text-resource-muted sm:block">
              Busca, filtra y ordena los recursos
            </p>
          ) : null}
        </div>

        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-resource-muted transition-colors duration-200 hover:text-resource-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Limpiar
          </button>
        ) : null}
      </div>

      {!open && summary.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-resource-muted">
            Activos
          </span>
          {summary.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-resource-border bg-resource-field px-2 py-0.5 text-[11.5px] text-resource-field-text"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div
        id="resource-filters-panel"
        className={cn("flex flex-col gap-2", open ? "mt-3" : "hidden")}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="resource-q" className={LABEL_CLASS}>
              Buscar
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-resource-muted"
              />
              <input
                id="resource-q"
                type="search"
                value={draft.q}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Título o descripción del recurso"
                className={cn(
                  "h-10 w-full rounded-xl border border-resource-field-border bg-resource-field pl-9 pr-3 text-[13px] text-resource-field-text placeholder:text-resource-muted transition-colors duration-200 hover:border-resource-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus",
                )}
              />
            </div>
          </div>

          <SelectField
            id="resource-tipo"
            label="Tipo de recurso"
            value={draft.tipo}
            onChange={(event) => handleType(event.target.value as ResourceFiltersState["tipo"])}
          >
            <option value={SELECT_ALL}>Todos</option>
            {RESOURCE_TYPE_ORDER.map((tipo) => (
              <option key={tipo} value={tipo}>
                {RESOURCE_TYPE_META[tipo].label}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="resource-archivo"
            label="Tipo de archivo"
            value={draft.archivo}
            disabled={isBlog}
            aria-describedby={isBlog ? "resource-archivo-hint" : undefined}
            onChange={(event) =>
              update("archivo", event.target.value as ResourceFiltersState["archivo"])
            }
          >
            <option value={SELECT_ALL}>{isBlog ? "No aplica en blogs" : "Todos"}</option>
            {RESOURCE_FILE_ORDER.map((archivo) => (
              <option key={archivo} value={archivo}>
                {RESOURCE_FILE_META[archivo].label}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="resource-acceso"
            label="Acceso"
            value={draft.acceso}
            onChange={(event) =>
              update("acceso", event.target.value as ResourceFiltersState["acceso"])
            }
          >
            <option value={SELECT_ALL}>Todos</option>
            {ACCESS_LEVEL_ORDER.map((level) => (
              <option key={level} value={level}>
                {ACCESS_LEVEL_META[level].label}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="resource-autor"
            label="Autor"
            value={draft.autor}
            onChange={(event) => update("autor", event.target.value)}
          >
            <option value="">Todos</option>
            {RESOURCE_AUTHORS.map((autor) => (
              <option key={autor} value={autor}>
                {autor}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="resource-orden"
            label="Ordenar por"
            value={draft.orden}
            onChange={(event) =>
              update("orden", event.target.value as ResourceFiltersState["orden"])
            }
          >
            {RESOURCE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1 lg:col-start-4">
            <span className={cn(LABEL_CLASS, "hidden lg:block")} aria-hidden="true">
              &nbsp;
            </span>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-resource-action px-4 text-[13px] font-semibold text-resource-action-fg transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-resource-field-border bg-resource-field px-3.5 text-[13px] font-semibold text-resource-field-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </form>

        {isBlog ? (
          <p id="resource-archivo-hint" className="text-[11.5px] text-resource-muted">
            El formato de archivo solo aplica a documentos; en blogs queda deshabilitado.
          </p>
        ) : null}
      </div>
    </section>
  );
}
