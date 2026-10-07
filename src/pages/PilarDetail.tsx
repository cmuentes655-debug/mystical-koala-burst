import { motion, type Variants } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType2,
  FolderDown,
  ListChecks,
  ShieldAlert,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ParticlesBackground } from "@/components/site/ParticlesBackground";
import { TopBar } from "@/components/site/TopBar";
import { ActionButton } from "@/components/site/ActionButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  PILLAR_LINKS,
  getPillarDetail,
  type FileKind,
} from "@/lib/committee";

const FILE_ICONS: Record<FileKind, LucideIcon> = {
  pdf: FileText,
  sheet: FileSpreadsheet,
  doc: FileType2,
  image: FileImage,
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function SectionHeading({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-komite-ink sm:text-lg">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-komite-glow/25 bg-komite-turquoise/15 text-komite-glow">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {label}
    </h2>
  );
}

const PilarDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const detail = getPillarDetail(id);

  const goBack = () => navigate("/?tab=pilares");

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <ParticlesBackground />
      <div
        aria-hidden="true"
        className="content-veil pointer-events-none fixed inset-0 z-[1]"
      />

      <TopBar onLogin={() => {}} onJoin={() => {}} />

      {!detail ? (
        <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-8">
          <div className="glass-strong flex w-full max-w-md flex-col items-center gap-4 rounded-3xl p-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
              <ShieldAlert className="h-7 w-7" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="font-display text-xl font-semibold tracking-tight text-komite-ink">
                Pilar no encontrado
              </h1>
              <p className="text-sm leading-snug text-komite-soft/80">
                No existe un pilar con ese identificador. Vuelve a la lista para
                elegir uno.
              </p>
            </div>
            <ActionButton onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Volver a Pilares
            </ActionButton>
          </div>
        </main>
      ) : (
        <main className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-4 md:px-6 md:pt-5">
            <div className="flex shrink-0 flex-wrap items-center gap-3 pb-3">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 rounded-full border border-komite-glow/25 bg-komite-deep/40 px-3.5 py-1.5 text-[13px] text-komite-ink transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
              >
                <ArrowLeft className="h-4 w-4 text-komite-glow" />
                Volver
              </button>
              <nav
                aria-label="Ruta de navegación"
                className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-komite-soft/50"
              >
                <span>Pilares</span>
                <span className="text-komite-soft/30">/</span>
                <span className="truncate text-komite-glow/85">{detail.title}</span>
              </nav>
            </div>

            <motion.div
              key={detail.id}
              variants={container}
              initial={reduced ? false : "hidden"}
              animate="show"
              className="no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-6"
            >
              <motion.section
                variants={item}
                className="glass-strong flex flex-col gap-4 rounded-3xl p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow sm:h-14 sm:w-14">
                    <detail.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-komite-glow/80">
                      {detail.eyebrow}
                    </span>
                    <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-komite-ink sm:text-3xl">
                      {detail.title}
                    </h1>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-komite-soft/85 sm:text-[15px]">
                  {detail.summary}
                </p>
              </motion.section>

              <motion.section variants={item} className="flex flex-col gap-2.5">
                <SectionHeading icon={Target} label="Objetivos" />
                <ul className="grid gap-2 sm:grid-cols-2">
                  {detail.objectives.map((objective) => (
                    <li
                      key={objective}
                      className="glass flex items-start gap-2.5 rounded-2xl px-3.5 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-komite-glow" />
                      <span className="text-[13px] leading-snug text-komite-soft/90">
                        {objective}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section variants={item} className="flex flex-col gap-2.5">
                <SectionHeading icon={ListChecks} label="Iniciativas" />
                <ol className="flex flex-col gap-2">
                  {detail.initiatives.map((initiative, index) => (
                    <li
                      key={initiative.id}
                      className="glass flex items-start gap-3 rounded-2xl px-3.5 py-3"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-komite-glow/30 bg-komite-turquoise/15 font-mono text-[11px] text-komite-glow">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-display text-sm font-semibold leading-tight text-komite-ink">
                          {initiative.title}
                        </span>
                        <span className="text-xs leading-snug text-komite-soft/80">
                          {initiative.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.section>

              <motion.section variants={item} className="flex flex-col gap-2.5">
                <SectionHeading icon={FolderDown} label="Recursos descargables" />
                <ul className="flex flex-col gap-1.5">
                  {detail.resources.map((file) => {
                    const FileIcon = FILE_ICONS[file.kind];
                    return (
                      <li
                        key={file.id}
                        className="glass flex items-center gap-3 rounded-2xl px-3 py-2.5"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-komite-turquoise/15 text-komite-glow">
                          <FileIcon className="h-4 w-4" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[13px] text-komite-ink">
                            {file.name}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-komite-soft/60">
                            {file.size}
                          </span>
                        </span>
                        <button
                          type="button"
                          title="Descarga de demostración"
                          aria-label={`Descargar ${file.name}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-komite-glow/25 text-komite-glow transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.section>

              <motion.section variants={item} className="flex flex-col gap-2.5">
                <SectionHeading icon={Compass} label="Explorar otros pilares" />
                <div className="flex flex-wrap gap-2">
                  {PILLAR_LINKS.filter((pillar) => pillar.id !== detail.id).map(
                    (pillar) => (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => navigate(`/pilares/${pillar.id}`)}
                        className="group inline-flex items-center gap-2 rounded-full border border-komite-glow/25 bg-komite-deep/40 px-4 py-2 text-[13px] text-komite-ink transition-colors duration-200 hover:border-komite-glow/60 hover:bg-komite-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                      >
                        {pillar.title}
                        <ChevronRight className="h-3.5 w-3.5 text-komite-glow transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    ),
                  )}
                </div>
              </motion.section>

              <motion.div variants={item} className="flex justify-center pt-1">
                <ActionButton variant="outline" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Volver a Pilares
                </ActionButton>
              </motion.div>
            </motion.div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PilarDetail;
