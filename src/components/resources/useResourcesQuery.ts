import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { RESOURCES } from "./resourcesData";
import {
  DEFAULT_RESOURCE_FILTERS,
  RESOURCE_PAGE_SIZE,
  type Resource,
  type ResourceAccess,
  type ResourceFileType,
  type ResourceFiltersState,
  type ResourceSort,
  type ResourceType,
} from "./ResourceTypes";

const TYPE_VALUES: readonly ResourceType[] = ["blog", "documento"];
const FILE_VALUES: readonly ResourceFileType[] = [
  "pdf",
  "word",
  "excel",
  "powerpoint",
  "enlace",
  "otro",
];
const ACCESS_VALUES: readonly ResourceAccess[] = ["publico", "miembros"];
const SORT_VALUES: readonly ResourceSort[] = [
  "recientes",
  "antiguos",
  "titulo-az",
  "titulo-za",
];

function pick<T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
): T {
  return value && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

/** Lee el estado de filtros desde la URL (compartible entre pestañas). */
function readFilters(params: URLSearchParams): ResourceFiltersState {
  return {
    q: params.get("q") ?? "",
    tipo: pick(params.get("tipo"), TYPE_VALUES, "todos"),
    archivo: pick(params.get("archivo"), FILE_VALUES, "todos"),
    acceso: pick(params.get("acceso"), ACCESS_VALUES, "todos"),
    autor: params.get("autor") ?? "",
    orden: pick(params.get("orden"), SORT_VALUES, DEFAULT_RESOURCE_FILTERS.orden),
  };
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const compareTitle = (a: Resource, b: Resource) =>
  a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" });

function sortResources(items: Resource[], orden: ResourceSort): Resource[] {
  const sorted = [...items];
  switch (orden) {
    case "antiguos":
      return sorted.sort((a, b) =>
        a.fecha_publicacion.localeCompare(b.fecha_publicacion),
      );
    case "titulo-az":
      return sorted.sort(compareTitle);
    case "titulo-za":
      return sorted.sort((a, b) => compareTitle(b, a));
    case "recientes":
    default:
      return sorted.sort((a, b) =>
        b.fecha_publicacion.localeCompare(a.fecha_publicacion),
      );
  }
}

function filterResources(items: Resource[], filters: ResourceFiltersState) {
  const term = normalize(filters.q.trim());
  return items.filter((resource) => {
    const matchesTerm =
      term === "" ||
      normalize(resource.titulo).includes(term) ||
      normalize(resource.extracto).includes(term);
    const matchesType = filters.tipo === "todos" || resource.tipo_recurso === filters.tipo;
    const matchesAccess =
      filters.acceso === "todos" || resource.nivel_acceso === filters.acceso;
    const matchesAuthor = filters.autor === "" || resource.autor === filters.autor;
    // El formato de archivo solo es un eje válido en documentos.
    const matchesFile =
      filters.tipo === "blog" ||
      filters.archivo === "todos" ||
      resource.tipo_archivo === filters.archivo;

    return matchesTerm && matchesType && matchesAccess && matchesAuthor && matchesFile;
  });
}

export interface ResourcesQuery {
  filters: ResourceFiltersState;
  /** Cantidad de filtros distintos de su valor por defecto. */
  activeFilterCount: number;
  total: number;
  page: number;
  pageCount: number;
  pageItems: Resource[];
  isLoading: boolean;
  applyFilters: (next: ResourceFiltersState) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
}

/**
 * Estado de consulta en la URL + filtrado, orden y paginación. La carga es
 * simulada (~350 ms) para que el estado de skeletons sea visible; al conectar
 * la fuente real basta con reemplazarla por el `isLoading` del fetch.
 */
export function useResourcesQuery(source: Resource[] = RESOURCES): ResourcesQuery {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = React.useMemo(() => readFilters(searchParams), [searchParams]);
  const rawPage = Number.parseInt(searchParams.get("page") ?? "1", 10);

  const [isLoading, setIsLoading] = React.useState(true);
  const queryKey = searchParams.toString();

  React.useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(timeout);
  }, [queryKey]);

  const filtered = React.useMemo(
    () => sortResources(filterResources(source, filters), filters.orden),
    [source, filters],
  );

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / RESOURCE_PAGE_SIZE));
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const page = Math.min(requestedPage, pageCount);
  const pageItems = filtered.slice(
    (page - 1) * RESOURCE_PAGE_SIZE,
    page * RESOURCE_PAGE_SIZE,
  );

  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (filters.q.trim() !== "") count += 1;
    if (filters.tipo !== "todos") count += 1;
    if (filters.tipo !== "blog" && filters.archivo !== "todos") count += 1;
    if (filters.acceso !== "todos") count += 1;
    if (filters.autor !== "") count += 1;
    if (filters.orden !== DEFAULT_RESOURCE_FILTERS.orden) count += 1;
    return count;
  }, [filters]);

  const applyFilters = React.useCallback(
    (next: ResourceFiltersState) => {
      const params = new URLSearchParams();
      if (next.q.trim() !== "") params.set("q", next.q.trim());
      if (next.tipo !== "todos") params.set("tipo", next.tipo);
      if (next.tipo !== "blog" && next.archivo !== "todos") {
        params.set("archivo", next.archivo);
      }
      if (next.acceso !== "todos") params.set("acceso", next.acceso);
      if (next.autor !== "") params.set("autor", next.autor);
      if (next.orden !== DEFAULT_RESOURCE_FILTERS.orden) {
        params.set("orden", next.orden);
      }
      setSearchParams(params);
    },
    [setSearchParams],
  );

  const clearFilters = React.useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const setPage = React.useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams);
      const safePage = Math.min(Math.max(1, nextPage), pageCount);
      if (safePage === 1) params.delete("page");
      else params.set("page", String(safePage));
      setSearchParams(params);
    },
    [searchParams, setSearchParams, pageCount],
  );

  return {
    filters,
    activeFilterCount,
    total,
    page,
    pageCount,
    pageItems,
    isLoading,
    applyFilters,
    clearFilters,
    setPage,
  };
}
