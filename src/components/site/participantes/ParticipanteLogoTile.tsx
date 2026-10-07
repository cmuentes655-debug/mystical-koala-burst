import { participantLogoUrl } from "@/lib/committee";
import { cn } from "@/lib/utils";

interface ParticipanteLogoTileProps {
  /** Nombre de archivo dentro de `public/participantes/`. */
  file: string;
  /** Nombre de la organización, usado como `alt`/`aria-label`. */
  name: string;
  className?: string;
}

/**
 * Tarjeta clara tipo "porcelana" que unifica los logos (fondos blancos o
 * transparentes) sobre el fondo oscuro. El logo va en grises por defecto y
 * recupera su color al pasar el mouse, con leve elevación y glow turquesa.
 */
export function ParticipanteLogoTile({
  file,
  name,
  className,
}: ParticipanteLogoTileProps) {
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "group/tile grid h-24 w-full place-items-center rounded-2xl bg-komite-ink p-3.5",
        "ring-1 ring-komite-glow/20 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.85)]",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:ring-komite-glow/60 hover:shadow-[0_20px_45px_-18px_rgba(95,227,204,0.55)]",
        "sm:h-28 sm:p-5",
        className,
      )}
    >
      <img
        src={participantLogoUrl(file)}
        alt={name}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="max-h-full w-full object-contain opacity-75 grayscale transition duration-300 ease-out group-hover/tile:opacity-100 group-hover/tile:grayscale-0"
      />
    </div>
  );
}
