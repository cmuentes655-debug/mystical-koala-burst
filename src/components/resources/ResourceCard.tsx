import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Lock,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { openMemberAuth } from "@/lib/memberAuth";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";
import { ResourceCover } from "./ResourceCover";
import { resourceFileMeta } from "./ResourceMeta";
import type { Resource } from "./ResourceTypes";

const formatDate = (iso: string) =>
  format(parseISO(iso), "d MMM, yyyy", { locale: es });

const ACTION_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-resource-action px-4 py-2.5 text-[13px] font-semibold text-resource-action-fg transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2";

type ActionKind = "miembros" | "blog" | "enlace" | "descarga";

const actionKind = (resource: Resource): ActionKind => {
  if (resource.nivel_acceso === "miembros") return "miembros";
  if (resource.tipo_recurso === "blog") return "blog";
  if (resource.origen === "enlace") return "enlace";
  return "descarga";
};

const ACTION_LABEL: Record<ActionKind, string> = {
  miembros: "Acceso miembros",
  blog: "Leer más",
  enlace: "Abrir enlace",
  descarga: "Descargar",
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

/**
 * Card del repositorio: portada 16:10, título con barra de acento, fecha,
 * extracto y pie con autor, formato y la acción que corresponde al recurso
 * (miembros → portal externo, blog → detalle, enlace → nueva pestaña,
 * archivo → descarga). La card usa los tokens `card*` para ser una superficie
 * clara ("papel") sobre cualquier marco, oscuro o claro.
 */
export function ResourceCard({ resource, className }: ResourceCardProps) {
  const kind = actionKind(resource);
  const fileMeta = resourceFileMeta(resource.tipo_archivo);
  const FileIcon = fileMeta?.icon;
  const detailPath = `/recursos-nuevo/${resource.id}`;
  const isBlog = resource.tipo_recurso === "blog";

  const handleDownload = () => {
    if (resource.url_archivo) {
      window.open(resource.url_archivo, "_blank", "noopener,noreferrer");
      return;
    }
    showSuccess(`Descarga de demostración: ${resource.titulo}`);
  };

  const ActionIcon =
    kind === "miembros"
      ? Lock
      : kind === "enlace"
        ? ArrowUpRight
        : kind === "descarga"
          ? Download
          : null;

  const actionContent = (
    <>
      {ActionIcon ? <ActionIcon className="h-4 w-4" aria-hidden="true" /> : null}
      {ACTION_LABEL[kind]}
    </>
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-resource-card-border bg-resource-card shadow-[0_1px_2px_rgba(0,33,29,0.05)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-resource-accent hover:shadow-[0_18px_34px_-18px_rgba(0,33,29,0.45)] focus-within:border-resource-focus",
        className,
      )}
    >
      <ResourceCover resource={resource} />

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="relative pl-3 font-display text-[15px] font-bold leading-snug tracking-tight text-resource-card-text sm:text-base">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0.5 h-[calc(100%-0.25rem)] w-[3px] rounded-full bg-resource-accent"
          />
          {isBlog && kind !== "miembros" ? (
            <Link
              to={detailPath}
              className="line-clamp-3 rounded-sm hover:text-resource-accent focus-visible:outline-none"
            >
              {resource.titulo}
            </Link>
          ) : (
            <span className="line-clamp-3">{resource.titulo}</span>
          )}
        </h3>

        <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-resource-card-muted">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="capitalize">{formatDate(resource.fecha_publicacion)}</span>
        </p>

        <p className="line-clamp-3 text-[13px] leading-relaxed text-resource-card-muted">
          {resource.extracto}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-resource-card-border pt-3">
            <span className="inline-flex min-w-0 items-center gap-1.5 text-[12px] text-resource-card-text">
              <UserRound
                className="h-3.5 w-3.5 shrink-0 text-resource-card-muted"
                aria-hidden="true"
              />
              <span className="truncate">{resource.autor}</span>
            </span>

            {fileMeta && FileIcon ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-resource-chip px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-resource-chip-fg">
                <FileIcon className="h-3 w-3" aria-hidden="true" />
                {fileMeta.label}
              </span>
            ) : null}
          </div>

          {kind === "miembros" ? (
            <button
              type="button"
              onClick={openMemberAuth}
              className={ACTION_CLASS}
              aria-label={`Autenticarse en el portal de miembros para ver ${resource.titulo}`}
            >
              {actionContent}
            </button>
          ) : kind === "blog" ? (
            <Link
              to={detailPath}
              className={ACTION_CLASS}
              aria-label={`Leer el blog ${resource.titulo}`}
            >
              {actionContent}
            </Link>
          ) : kind === "enlace" && resource.url_externa ? (
            <a
              href={resource.url_externa}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_CLASS}
              aria-label={`Abrir enlace externo de ${resource.titulo}`}
            >
              {actionContent}
            </a>
          ) : (
            <button
              type="button"
              onClick={handleDownload}
              className={ACTION_CLASS}
              aria-label={`Descargar ${resource.titulo}`}
            >
              {actionContent}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
