import * as React from "react";
import { CheckCircle2, UploadCloud } from "lucide-react";
import { FILE_KIND_META, SAMPLE_FILES } from "@/lib/committee";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ActionButton";
import { GlassDialog } from "./GlassDialog";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [dragging, setDragging] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setDragging(false);
      setSent(false);
    }
  }, [open]);

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cargar archivos"
      description="Comparte documentos de la red: guías, indicadores y casos de pilotos."
    >
      <div className="flex flex-col gap-4">
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border border-dashed px-4 py-7 text-center transition-colors duration-200",
            dragging
              ? "border-komite-glow bg-komite-turquoise/20"
              : "border-komite-glow/30 bg-komite-deep/30",
          )}
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
            <UploadCloud className="h-5 w-5" />
          </span>
          <p className="text-[13px] font-medium text-komite-ink">
            Arrastra tus archivos aquí
          </p>
          <p className="text-[11px] text-komite-soft/75">
            PDF, XLSX, DOCX o PNG · máx. 25 MB (demostración visual)
          </p>
        </div>

        <ul className="flex flex-col gap-1.5">
          {SAMPLE_FILES.map((file) => {
            const Icon = FILE_KIND_META[file.kind].icon;
            return (
              <li
                key={file.id}
                className="flex items-center gap-3 rounded-xl border border-komite-glow/15 bg-komite-deep/30 px-3 py-2"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-komite-turquoise/15 text-komite-glow">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[12.5px] text-komite-ink">
                    {file.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-komite-soft/60">
                    {file.size}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        {sent ? (
          <span className="flex items-center gap-2 rounded-2xl border border-komite-glow/40 bg-komite-turquoise/15 px-4 py-3 text-[13px] text-komite-ink">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-komite-glow" />
            Archivos listos para subir (demostración, sin envío real).
          </span>
        ) : null}

        <div className="flex justify-end pt-1">
          <ActionButton onClick={() => setSent(true)} className="px-5">
            <UploadCloud className="h-4 w-4" />
            Subir
          </ActionButton>
        </div>
      </div>
    </GlassDialog>
  );
}
