import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CloudUpload, Download } from "lucide-react";
import { FILE_KIND_META, type SearchableFile } from "@/lib/committee";
import { ActionButton } from "../ActionButton";

interface FilePreviewPanelProps {
  file: SearchableFile;
  onDownload: (file: SearchableFile) => void;
}

/** Fila de metadatos (etiqueta + valor) del panel de demostración. */
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-komite-glow/10 py-2 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-komite-soft/70">
        {label}
      </span>
      <span className="truncate text-right text-[13px] text-komite-ink">
        {value}
      </span>
    </div>
  );
}

/**
 * Vista previa de un archivo dentro del modal de búsqueda. Soporta `previewUrl`
 * reales (imagen/PDF) y muestra un panel de demostración con metadatos cuando
 * todavía no existen (caso de los datos de ejemplo).
 */
export function FilePreviewPanel({ file, onDownload }: FilePreviewPanelProps) {
  const meta = FILE_KIND_META[file.kind];
  const Icon = meta.icon;

  const canRenderImage = file.kind === "image" && Boolean(file.previewUrl);
  const canRenderPdf = file.kind === "pdf" && Boolean(file.previewUrl);

  return (
    <div className="flex flex-col gap-4">
      {canRenderImage ? (
        <div className="overflow-hidden rounded-2xl border border-komite-glow/20 bg-komite-deep/40">
          <img
            src={file.previewUrl}
            alt={file.name}
            className="max-h-[46dvh] w-full object-contain"
          />
        </div>
      ) : canRenderPdf ? (
        <object
          data={file.previewUrl}
          type="application/pdf"
          aria-label={`Vista previa de ${file.name}`}
          className="h-[52dvh] w-full rounded-2xl border border-komite-glow/20 bg-komite-deep/40"
        >
          <iframe
            src={file.previewUrl}
            title={`Vista previa de ${file.name}`}
            className="h-full w-full rounded-2xl border-0"
          />
        </object>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-komite-glow/20 bg-komite-deep/30 px-4 py-7 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-3xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
            <Icon className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="break-all font-display text-sm font-semibold text-komite-ink">
              {file.name}
            </span>
            <span className="inline-flex items-center justify-center gap-1.5 text-[11px] text-komite-soft/75">
              <CloudUpload className="h-3.5 w-3.5 text-komite-glow" />
              Vista previa disponible al conectar el almacenamiento (Azure Blob).
            </span>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-komite-glow/15 bg-komite-deep/25 px-3.5 py-1.5">
        <MetaRow label="Nombre" value={file.name} />
        <MetaRow label="Tipo" value={meta.label} />
        <MetaRow label="Tamaño" value={file.size} />
        {file.updatedAt ? (
          <MetaRow
            label="Actualizado"
            value={format(parseISO(file.updatedAt), "d 'de' MMMM 'de' yyyy", {
              locale: es,
            })}
          />
        ) : null}
      </div>

      <div className="flex justify-end">
        <ActionButton variant="outline" onClick={() => onDownload(file)}>
          <Download className="h-4 w-4" />
          Descargar
        </ActionButton>
      </div>
    </div>
  );
}
