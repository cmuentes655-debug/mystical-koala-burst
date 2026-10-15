import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilePlus2, Link2, UploadCloud } from "lucide-react";
import {
  ACCESS_LEVEL_META,
  ACCESS_LEVEL_ORDER,
  PILLAR_ORDER,
  PILLAR_SHORT_LABELS,
  inferFileKind,
  pillarShortLabel,
  type AccessLevel,
} from "@/lib/committee";
import { useFiles } from "@/lib/filesStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { showSuccess } from "@/utils/toast";
import { ActionButton } from "../ActionButton";
import { Field, inputClass, inputInvalidClass } from "./Field";
import { GlassDialog } from "./GlassDialog";

type UploadMode = "archivo" | "enlace";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pilar preseleccionado (p. ej. al abrir desde el detalle de un pilar). */
  defaultPillarId?: string;
}

const MODES: { id: UploadMode; label: string; icon: typeof UploadCloud }[] = [
  { id: "archivo", label: "Subir archivo", icon: UploadCloud },
  { id: "enlace", label: "Enlazar URL", icon: Link2 },
];

/** Qué implica cada nivel de acceso (se muestra bajo el selector). */
const ACCESS_HINT: Record<AccessLevel, string> = {
  publico:
    "Abierto para cualquiera: se podrá previsualizar y descargar (a futuro, alojado en Azure Blob).",
  miembros:
    "Solo miembros: al abrir el documento se pedirá autenticación en miembros.logyca.org.",
};

interface PickedFile {
  name: string;
  size: number;
}

/** Tamaño legible a partir de los bytes del archivo elegido. */
function formatSize(bytes: number) {
  if (bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

export function UploadModal({
  open,
  onOpenChange,
  defaultPillarId,
}: UploadModalProps) {
  const reduced = useReducedMotion();
  const { addRecord } = useFiles();

  const [mode, setMode] = React.useState<UploadMode>("archivo");
  const [dragging, setDragging] = React.useState(false);
  const [file, setFile] = React.useState<PickedFile | null>(null);
  const [linkName, setLinkName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [pillarId, setPillarId] = React.useState("");
  const [accessLevel, setAccessLevel] = React.useState<AccessLevel>("publico");
  const [errors, setErrors] = React.useState<{
    name?: boolean;
    url?: boolean;
    pillar?: boolean;
  }>({});

  // Cada apertura parte de cero, con el pilar recibido preseleccionado.
  React.useEffect(() => {
    if (!open) return;
    setMode("archivo");
    setDragging(false);
    setFile(null);
    setLinkName("");
    setUrl("");
    setPillarId(defaultPillarId ?? "");
    setAccessLevel("publico");
    setErrors({});
  }, [open, defaultPillarId]);

  const linkUrl = url.trim();
  const urlMalformed =
    mode === "enlace" && linkUrl !== "" && !isHttpUrl(linkUrl);

  const pickFile = (picked: File | null) => {
    if (!picked) return;
    // Simulación: solo se leen nombre y tamaño, el binario no se envía a ningún
    // lado todavía.
    // TODO: cuando exista el backend, subir el archivo a Azure Blob (público) y
    // guardar la URL resultante antes de dar de alta el registro.
    setFile({ name: picked.name, size: picked.size });
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleSubmit = () => {
    const name = mode === "archivo" ? (file?.name ?? "") : linkName.trim();
    const nextErrors = {
      name: name === "",
      url: mode === "enlace" && (linkUrl === "" || urlMalformed),
      pillar: pillarId === "",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    addRecord({
      name,
      size: mode === "archivo" && file ? formatSize(file.size) : "Enlace",
      kind: inferFileKind(mode === "archivo" ? name : linkUrl),
      pillarId,
      accessLevel,
      source: mode === "archivo" ? "archivo" : "enlace",
      url: mode === "enlace" ? linkUrl : undefined,
    });

    showSuccess(
      `«${name}» agregado a ${pillarShortLabel(pillarId)} · ${
        ACCESS_LEVEL_META[accessLevel].label
      }`,
    );
    onOpenChange(false);
  };

  return (
    <GlassDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cargar archivos"
      description="Sube un documento o enlaza una URL, y clasifícalo por pilar y nivel de acceso."
    >
      <div className="flex flex-col gap-4">
        <div
          role="tablist"
          aria-label="Modo de carga"
          className="grid grid-cols-2 gap-1 rounded-2xl border border-komite-glow/20 bg-komite-deep/40 p-1"
        >
          {MODES.map((item) => {
            const active = mode === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`upload-tab-${item.id}`}
                aria-selected={active}
                aria-controls={`upload-panel-${item.id}`}
                onClick={() => setMode(item.id)}
                className={cn(
                  "relative inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow",
                  active
                    ? "text-komite-ink"
                    : "text-komite-soft hover:text-komite-ink",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="upload-mode-pill"
                    aria-hidden="true"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                    className="absolute inset-0 rounded-xl border border-komite-glow/50 bg-komite-turquoise/15"
                  />
                ) : null}
                <Icon
                  aria-hidden="true"
                  className={cn(
                    "relative h-4 w-4",
                    active ? "text-komite-glow" : "text-komite-soft/70",
                  )}
                />
                <span className="relative font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            id={`upload-panel-${mode}`}
            role="tabpanel"
            aria-labelledby={`upload-tab-${mode}`}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {mode === "archivo" ? (
              <label
                htmlFor="upload-file"
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
                  pickFile(event.dataTransfer.files?.[0] ?? null);
                }}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed px-4 py-7 text-center transition-colors duration-200",
                  dragging
                    ? "border-komite-glow bg-komite-turquoise/20"
                    : "border-komite-glow/30 bg-komite-deep/30 hover:border-komite-glow/55",
                  errors.name && !file ? "border-komite-accent/70" : null,
                )}
              >
                <input
                  id="upload-file"
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.docx,.doc,.png,.jpg,.jpeg,.webp"
                  className="sr-only"
                  onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
                />
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
                  <UploadCloud className="h-5 w-5" aria-hidden="true" />
                </span>
                {file ? (
                  <>
                    <span className="max-w-full break-all text-[13px] font-medium text-komite-ink">
                      {file.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-komite-soft/70">
                      {formatSize(file.size)} · listo para clasificar
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[13px] font-medium text-komite-ink">
                      Arrastra tu archivo aquí
                    </span>
                    <span className="text-[11px] text-komite-soft/75">
                      o haz clic para seleccionarlo · PDF, XLSX, DOCX o PNG
                    </span>
                  </>
                )}
              </label>
            ) : (
              <div className="flex flex-col gap-3">
                <Field
                  label="URL del documento"
                  htmlFor="upload-url"
                  required
                  invalid={errors.url && linkUrl === ""}
                >
                  <Input
                    id="upload-url"
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://…"
                    aria-invalid={Boolean(errors.url)}
                    className={cn(
                      inputClass,
                      errors.url && inputInvalidClass,
                    )}
                  />
                </Field>
                {urlMalformed ? (
                  <span className="-mt-2 text-[11px] text-komite-accent">
                    Escribe una URL válida que empiece por https://
                  </span>
                ) : null}
                <Field
                  label="Nombre visible"
                  htmlFor="upload-url-name"
                  required
                  invalid={errors.name}
                >
                  <Input
                    id="upload-url-name"
                    value={linkName}
                    onChange={(event) => {
                      setLinkName(event.target.value);
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    placeholder="Guía de interoperabilidad 2026"
                    className={cn(inputClass, errors.name && inputInvalidClass)}
                  />
                </Field>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-3 border-t border-komite-glow/15 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-komite-soft/60">
            Clasificación
          </span>

          <Field
            label="Pilar"
            htmlFor="upload-pillar"
            required
            invalid={errors.pillar}
          >
            <Select
              value={pillarId || undefined}
              onValueChange={(value) => {
                setPillarId(value);
                setErrors((prev) => ({ ...prev, pillar: false }));
              }}
            >
              <SelectTrigger
                id="upload-pillar"
                aria-invalid={Boolean(errors.pillar)}
                className={cn(
                  inputClass,
                  "justify-between data-[placeholder]:text-komite-soft/45",
                  errors.pillar && inputInvalidClass,
                )}
              >
                <SelectValue placeholder="Selecciona un pilar" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-komite-glow/25">
                {PILLAR_ORDER.map((id) => (
                  <SelectItem key={id} value={id} className="text-[13px]">
                    {PILLAR_SHORT_LABELS[id]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-komite-soft">
              Nivel de acceso <span className="text-komite-accent">*</span>
            </span>
            <div
              role="group"
              aria-label="Nivel de acceso"
              className="grid grid-cols-2 gap-2"
            >
              {ACCESS_LEVEL_ORDER.map((level) => {
                const meta = ACCESS_LEVEL_META[level];
                const Icon = meta.icon;
                const active = accessLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setAccessLevel(level)}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow",
                      active
                        ? level === "miembros"
                          ? "border-komite-accent bg-komite-accent/20 text-komite-accent"
                          : "border-komite-glow bg-komite-glow/20 text-komite-ink"
                        : "border-komite-glow/25 bg-komite-deep/30 text-komite-soft hover:border-komite-glow/55 hover:text-komite-ink",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {meta.label}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] leading-snug text-komite-soft/75">
              {ACCESS_HINT[accessLevel]}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <ActionButton onClick={handleSubmit} className="px-5">
            <FilePlus2 className="h-4 w-4" />
            Agregar
          </ActionButton>
        </div>
      </div>
    </GlassDialog>
  );
}
