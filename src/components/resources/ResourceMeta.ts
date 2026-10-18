import {
  File,
  FileSpreadsheet,
  FileText,
  FileType2,
  Link2,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import type {
  ResourceFileType,
  ResourceSort,
  ResourceType,
} from "./ResourceTypes";

/**
 * Etiqueta e ícono de cada formato de archivo. Es el eje del chip del pie y
 * del filtro "Tipo de archivo": distinto del tipo de recurso (blog/documento).
 */
export const RESOURCE_FILE_META: Record<
  ResourceFileType,
  { label: string; icon: LucideIcon }
> = {
  pdf: { label: "PDF", icon: FileText },
  word: { label: "Word", icon: FileType2 },
  excel: { label: "Excel", icon: FileSpreadsheet },
  powerpoint: { label: "PowerPoint", icon: Presentation },
  enlace: { label: "Enlace externo", icon: Link2 },
  otro: { label: "Otro", icon: File },
};

/** Metadatos de un formato; `null` cuando el recurso no tiene archivo. */
export const resourceFileMeta = (tipo: ResourceFileType | null) =>
  tipo ? RESOURCE_FILE_META[tipo] : null;

/** Orden de exhibición de los formatos en el filtro. */
export const RESOURCE_FILE_ORDER: ResourceFileType[] = [
  "pdf",
  "word",
  "excel",
  "powerpoint",
  "enlace",
  "otro",
];

/** Etiqueta corta y etiqueta de la pastilla sobre la portada. */
export const RESOURCE_TYPE_META: Record<
  ResourceType,
  { label: string; tag: string }
> = {
  blog: { label: "Blog", tag: "Blog" },
  documento: { label: "Documento", tag: "Documento" },
};

export const RESOURCE_TYPE_ORDER: ResourceType[] = ["blog", "documento"];

/** Opciones del selector de orden. */
export const RESOURCE_SORT_OPTIONS: { value: ResourceSort; label: string }[] = [
  { value: "recientes", label: "Más recientes" },
  { value: "antiguos", label: "Más antiguos" },
  { value: "titulo-az", label: "Título A–Z" },
  { value: "titulo-za", label: "Título Z–A" },
];
