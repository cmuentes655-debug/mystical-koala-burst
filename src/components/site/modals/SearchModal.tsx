import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Eye, FileSearch, Search, X } from "lucide-react";
import {
  FILE_KIND_META,
  searchFiles,
  type FileKind,
  type SearchableFile,
} from "@/lib/committee";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { showSuccess } from "@/utils/toast";
import { GlassDialog } from "./GlassDialog";
import { inputClass } from "./Field";
import { FilePreviewPanel } from "./FilePreviewPanel";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Orden fijo de los chips de filtro. */
const KIND_ORDER: FileKind[] = ["pdf", "sheet", "doc", "image"];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const reduced = useReducedMotion();
  const [query, setQuery] = React.useState("");
  const [activeKinds, setActiveKinds] = React.useState<FileKind[]>([]);
  const [previewFile, setPreviewFile] = React.useState<SearchableFile | null>(
    null,
  );

  // Reinicia el estado al cerrar, igual que los demás modales.
  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveKinds([]);
      setPreviewFile(null);
    }
  }, [open]);

  const results = React.useMemo(
    () => searchFiles(query, activeKinds),
    [query, activeKinds],
  );

  const toggleKind = (kind: FileKind) =>
    setActiveKinds((prev) =>
      prev.includes(kind) ? prev.filter((item) => item !== kind) : [...prev, kind],
    );

  const handleDownload = (file: SearchableFile) =>
    showSuccess(`Descarga de demostración: ${file.name}`);

  const trimmedQuery = query.trim();

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title={previewFile ? "Vista previa" : "Buscar archivos"}
      description={
        previewFile
          ? `${FILE_KIND_META[previewFile.kind].label} · documento de la red`
          : "Encuentra guías, indicadores y actas compartidos en la red de valor."
      }
    >
      {previewFile ? (
        <motion.div
          key={previewFile.id}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <button
            type="button"
            onClick={() => setPreviewFile(null)}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-komite-glow/25 bg-komite-deep/40 px-3.5 py-1.5 text-[13px] text-komite-ink transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
          >
            <ArrowLeft className="h-4 w-4 text-komite-glow" />
            Volver a la búsqueda
          </button>
          <FilePreviewPanel file={previewFile} onDownload={handleDownload} />
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-komite-soft/60" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busca por nombre de archivo…"
                aria-label="Buscar archivos por nombre"
                className={cn(inputClass, "pl-9 pr-9")}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-komite-soft/70 transition-colors duration-200 hover:bg-komite-glow/10 hover:text-komite-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            <div
              role="group"
              aria-label="Filtrar por tipo de archivo"
              className="flex flex-wrap gap-2"
            >
              {KIND_ORDER.map((kind) => {
                const active = activeKinds.includes(kind);
                const Icon = FILE_KIND_META[kind].icon;
                return (
                  <button
                    key={kind}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleKind(kind)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow",
                      active
                        ? "border-komite-glow bg-komite-glow/20 text-komite-ink"
                        : "border-komite-glow/25 bg-komite-deep/30 text-komite-soft hover:border-komite-glow/55 hover:text-komite-ink",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        active ? "text-komite-glow" : "text-komite-soft/70",
                      )}
                    />
                    {FILE_KIND_META[kind].label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-komite-soft/60">
              {results.length === 1 ? "1 archivo" : `${results.length} archivos`}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-komite-glow/20 bg-komite-deep/25 px-4 py-8 text-center">
              <FileSearch className="h-6 w-6 text-komite-glow/80" />
              <p className="text-[13px] text-komite-soft/85">
                No se encontraron archivos
                {trimmedQuery ? ` para «${trimmedQuery}»` : ""}.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {results.map((file) => {
                const Icon = FILE_KIND_META[file.kind].icon;
                return (
                  <li
                    key={file.id}
                    className="glass flex items-center gap-3 rounded-2xl px-3 py-2.5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-komite-turquoise/15 text-komite-glow">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[13px] text-komite-ink">
                        {file.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-komite-soft/60">
                        {FILE_KIND_META[file.kind].label} · {file.size}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewFile(file)}
                        title="Ver"
                        aria-label={`Ver ${file.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-komite-glow/25 text-komite-glow transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        title="Descargar"
                        aria-label={`Descargar ${file.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-komite-glow/25 text-komite-glow transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </GlassDialog>
  );
}
