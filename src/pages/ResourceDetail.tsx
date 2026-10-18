import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, CalendarDays, Lock, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { TopBar } from "@/components/site/TopBar";
import { ResourceCover } from "@/components/resources/ResourceCover";
import { getResourceById } from "@/components/resources/resourcesData";
import { openMemberAuth } from "@/lib/memberAuth";

const formatDate = (iso: string) =>
  format(parseISO(iso), "d MMM, yyyy", { locale: es });

const BACK_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-resource-field-border bg-resource-field px-3.5 py-1.5 text-[12.5px] font-semibold text-resource-field-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2";

/** Página de detalle de un blog público del repositorio. */
const ResourceDetail = () => {
  const { id = "" } = useParams();
  const resource = getResourceById(id);
  const isBlog = resource?.tipo_recurso === "blog";
  const isMember = resource?.nivel_acceso === "miembros";

  return (
    <div
      data-resource-palette="a"
      className="resource-page-bg relative h-[100dvh] overflow-y-auto text-resource-heading"
    >
      <div className="sticky top-0 z-30">
        <TopBar onLogin={() => {}} onJoin={() => {}} />
      </div>

      <main className="relative mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-10%] top-0 h-[30rem] rounded-[999px] bg-[radial-gradient(58%_62%_at_50%_0%,rgba(95,227,204,0.16),rgba(95,227,204,0)_72%)]"
        />

        <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link to="/recursos-nuevo" className={BACK_CLASS}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a recursos
          </Link>
          <nav
            aria-label="Ruta de navegación"
            className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-resource-muted"
          >
            <Link
              to="/"
              className="rounded-sm transition-colors duration-200 hover:text-resource-accent focus-visible:outline-none"
            >
              Inicio
            </Link>
            <span aria-hidden="true" className="text-resource-muted opacity-60">
              /
            </span>
            <Link
              to="/recursos-nuevo"
              className="rounded-sm transition-colors duration-200 hover:text-resource-accent focus-visible:outline-none"
            >
              Recursos
            </Link>
            {resource ? (
              <>
                <span aria-hidden="true" className="text-resource-muted opacity-60">
                  /
                </span>
                <span className="truncate text-resource-heading">
                  {resource.titulo}
                </span>
              </>
            ) : null}
          </nav>
        </div>

        {!resource || !isBlog ? (
          <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-dashed border-resource-border bg-resource-surface px-6 py-14 text-center">
            <h1 className="font-display text-xl font-semibold text-resource-heading">
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
          <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-resource-border bg-resource-surface px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-resource-field-border bg-resource-field text-resource-member">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="font-display text-xl font-semibold text-resource-heading">
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
          <article className="relative flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-resource-card-border bg-resource-card shadow-[0_18px_40px_-32px_rgba(0,33,29,0.55)]">
              <ResourceCover resource={resource} showOverlays={false} />
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-resource-muted">
                Blog · Redes de Valor
              </span>
              <h1 className="relative pl-4 font-display text-2xl font-bold leading-tight tracking-tight text-resource-heading sm:text-3xl">
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
              <p className="text-[15px] font-medium leading-relaxed text-resource-heading">
                {resource.extracto}
              </p>
              <p className="text-sm leading-relaxed text-resource-body">
                Los equipos que ya operan con modelos predictivos descubrieron que
                el valor no está en el algoritmo sino en la calidad de los datos y
                en la capacidad de reaccionar a tiempo. La planeación deja de ser
                un ejercicio mensual para convertirse en un ciclo continuo que se
                ajusta con cada señal de la operación.
              </p>
              <p className="text-sm leading-relaxed text-resource-body">
                En la red de valor del comité, los pilotos con mejores resultados
                comparten tres rasgos: datos homologados con sus socios, procesos
                medibles de punta a punta y un equipo capaz de supervisar las
                recomendaciones del modelo. Sin esas condiciones, la automatización
                solo acelera decisiones que ya traían error.
              </p>
              <p className="text-sm leading-relaxed text-resource-body">
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
