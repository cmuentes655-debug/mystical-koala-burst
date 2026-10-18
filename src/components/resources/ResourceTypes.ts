import type { AccessLevel } from "@/lib/committee";

/** Eje 1: qué es el recurso. */
export type ResourceType = "blog" | "documento";

/** Eje 2: formato del archivo (solo tiene sentido en documentos). */
export type ResourceFileType =
  | "pdf"
  | "word"
  | "excel"
  | "powerpoint"
  | "enlace"
  | "otro";

/** Cómo se incorporó el recurso. */
export type ResourceOrigin = "archivo" | "enlace";

/** Se reutiliza el nivel de acceso ya existente en la app. */
export type ResourceAccess = AccessLevel;

/** Orientación de la portada: ancha = foto, vertical = carátula de documento. */
export type ResourceCoverOrientation = "ancha" | "vertical";

/**
 * Recurso del repositorio. Los campos replican en snake_case la estructura
 * prevista en Supabase, para que migrar solo implique cambiar la fuente de
 * datos (`RESOURCES`) por un `fetch` que devuelva el mismo shape.
 */
export interface Resource {
  id: string;
  titulo: string;
  extracto: string;
  tipo_recurso: ResourceType;
  tipo_archivo: ResourceFileType | null;
  origen: ResourceOrigin;
  url_archivo?: string;
  url_externa?: string;
  portada_url?: string;
  autor: string;
  /** Fecha ISO (YYYY-MM-DD). */
  fecha_publicacion: string;
  nivel_acceso: ResourceAccess;
  /** Opcional: si falta se deduce de `tipo_archivo`. */
  portada_orientacion?: ResourceCoverOrientation;
}

export type ResourceSort = "recientes" | "antiguos" | "titulo-az" | "titulo-za";

export interface ResourceFiltersState {
  q: string;
  tipo: ResourceType | "todos";
  archivo: ResourceFileType | "todos";
  acceso: ResourceAccess | "todos";
  /** Cadena vacía = todos los autores. */
  autor: string;
  orden: ResourceSort;
}

export const DEFAULT_RESOURCE_FILTERS: ResourceFiltersState = {
  q: "",
  tipo: "todos",
  archivo: "todos",
  acceso: "todos",
  autor: "",
  orden: "recientes",
};

export const RESOURCE_PAGE_SIZE = 9;
