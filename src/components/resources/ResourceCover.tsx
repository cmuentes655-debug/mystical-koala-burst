import * as React from "react";
import { ImageOff } from "lucide-react";
import { ACCESS_LEVEL_META } from "@/lib/committee";
import { cn } from "@/lib/utils";
import { RESOURCE_TYPE_META, resourceFileMeta } from "./ResourceMeta";
import type { Resource, ResourceCoverOrientation } from "./ResourceTypes";

/** Orientación efectiva: se respeta la declarada; si falta, los PDF son carátula. */
const coverOrientation = (resource: Resource): ResourceCoverOrientation =>
  resource.portada_orientacion ??
  (resource.tipo_archivo === "pdf" ? "vertical" : "ancha");

interface ResourceCoverProps {
  resource: Resource;
  /** Permite reutilizar solo la imagen (p. ej. en la página de detalle). */
  showOverlays?: boolean;
  className?: string;
}

/**
 * Portada de un recurso en proporción 16:10. Las imágenes anchas se recortan
 * (`object-cover`); las verticales tipo carátula se muestran completas
 * (`object-contain`) sobre fondo claro, como una hoja de documento. Sin
 * portada (o si la remota falla) se pinta un placeholder con los tokens
 * `cover-*`, para que no herede el vidrio oscuro del marco.
 */
export function ResourceCover({
  resource,
  showOverlays = true,
  className,
}: ResourceCoverProps) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [resource.portada_url]);

  const vertical = coverOrientation(resource) === "vertical";
  const hasImage = Boolean(resource.portada_url) && !failed;
  const fileMeta = resourceFileMeta(resource.tipo_archivo);
  const FileIcon = fileMeta?.icon ?? ImageOff;
  const accessMeta = ACCESS_LEVEL_META[resource.nivel_acceso];

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-resource-cover-bg",
        className,
      )}
    >
      {hasImage ? (
        <img
          src={resource.portada_url}
          alt={resource.titulo}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full",
            vertical
              ? "object-contain p-5 drop-shadow-[0_12px_22px_rgba(0,33,29,0.22)]"
              : "object-cover",
          )}
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-resource-cover-bg text-resource-cover-fg"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-resource-card-border bg-resource-card">
            <FileIcon className="h-6 w-6" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {fileMeta?.label ?? "Sin portada"}
          </span>
        </div>
      )}

      {showOverlays && (
        <>
          <span
            className={cn(
              "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-komite-deep shadow-[0_6px_16px_-6px_rgba(0,0,0,0.55)]",
              resource.nivel_acceso === "miembros"
                ? "bg-resource-member"
                : "bg-resource-public",
            )}
          >
            <accessMeta.icon className="h-3 w-3" aria-hidden="true" />
            {accessMeta.label}
          </span>

          <span className="absolute bottom-3 left-3 rounded-full bg-resource-tag px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-resource-tag-fg shadow-[0_6px_16px_-6px_rgba(0,0,0,0.55)]">
            {RESOURCE_TYPE_META[resource.tipo_recurso].tag}
          </span>
        </>
      )}
    </div>
  );
}
