import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, CalendarDays, Lock, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { TopBar } from "@/components/site/TopBar";
import { ResourceCover } from "@/components/resources/ResourceCover";
import { getResourceById } from "@/components/resources/resourcesData";
import { useResourcePalette } from "@/components/resources/ResourcesThemeToggle";
import { openMemberAuth } from "@/lib/memberAuth";

const formatDate = (iso: string) =>
  format(parseISO(iso), "d MMM, yyyy", { locale: es });

const BACK_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-resource-border bg-resource-page px-3.5 py-1.5 text-[12.5px] font-semibold text-resource-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-tag focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2";

/** Página de detalle de un blog público del repositorio. */
const ResourceDetail = () => {
  const { id = "" } = useParams();
  const [palette] = useResourcePalette();
  const resource = getResourceById(id);
  const isBlog = resource?.tipo_recurso === "blog";
  const isMember = resource?.nivel_acceso === "miembros";

  return (
    <div
      data-resource-palette={palette}
      className="relative h-[100dvh] overflow-y-auto bg-resource-page text-resource-text"
    >
      <div className="sticky top-0 z-30">
        <TopBar onLogin={() => {}} onJoin={() => {}} />
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
        <div>
          <Link to="/recursos-nuevo" className={BACK_CLASS}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a recursos
          </Link>
        </div>

        {!resource || !isBlog ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-resource-border bg-resource-surface px-6 py-14 text-center">
            <h1 className="font-display text-xl font-semibold text-resource-text">
              Recurso no disponible
            </h1>
            <p className="max-w-md text-sm text-resource-muted">
              Este enlace corresponde a un recurso que no es un blog público.
              Vuelve al repositorio para elegir otro contenido.
            </p>
            <Link to="/recursos-nuevo" className={BACK_CLASS}>
              Ir al repositorio
            </Link>
          </div>
        ) : isMember ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-resource-border bg-resource-surface px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-resource-border bg-resource-page text-resource-member">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="font-display text-xl font-semibold text-resource-text">
              Contenido para miembros
            </h1>
            <p className="max-w-md text-sm text-resource-muted">
              “{resource.titulo}” está reservado a miembros del comité. Inicia
              sesión en el portal para acceder.
            </p>
            <button
              type="button"
              onClick={openMemberAuth}
              className="inline-flex items-center gap-2 rounded-full bg-resource-action px-5 py-2.5 text-[13px] font-semibold text-resource-action-fg transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              Acceso miembros
            </button>
          </div>
        ) : (
          <article className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-resource-border">
              <ResourceCover resource={resource} showOverlays={false} />
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-resource-muted">
                Blog · Redes de Valor
              </span>
              <h1 className="relative pl-4 font-display text-2xl font-bold leading-tight tracking-tight text-resource-text sm:text-3xl">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-resource-accent"
                />
                {resource.titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-resource-muted">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                  {resource.autor}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="capitalize">
                    {formatDate(resource.fecha_publicacion)}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-resource-border pt-5">
              <p className="text-[15px] font-medium leading-relaxed text-resource-text">
                {resource.extracto}
              </p>
              <p className="text-sm leading-relaxed text-resource-muted">
                Los equipos que ya operan con modelos predictivos descubrieron que
                el valor no está en el algoritmo sino en la calidad de los datos y
                en la capacidad de reaccionar a tiempo. La planeación deja de ser
                un ejercicio mensual para convertirse en un ciclo continuo que se
                ajusta con cada señal de la operación.
              </p>
              <p className="text-sm leading-relaxed text-resource-muted">
                En la red de valor del comité, los pilotos con mejores resultados
                comparten tres rasgos: datos homologados con sus socios, procesos
                medibles de punta a punta y un equipo capaz de supervisar las
                recomendaciones del modelo. Sin esas condiciones, la automatización
                solo acelera decisiones que ya traían error.
              </p>
              <p className="text-sm leading-relaxed text-resource-muted">
                El siguiente paso es institucionalizar lo aprendido: documentar los
                acuerdos de uso de datos, definir quién responde por cada decisión
                automatizada y medir el impacto antes de escalar a toda la cadena.
                Los recursos de este repositorio reúnen las plantillas y guías para
                hacerlo con el resto de la red.
              </p>
            </div>

            <div className="border-t border-resource-border pt-5">
              <Link to="/recursos-nuevo" className={BACK_CLASS}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver a recursos
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default ResourceDetail;
