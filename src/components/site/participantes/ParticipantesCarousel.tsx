import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PARTICIPANT_LOGOS } from "@/lib/committee";
import { ParticipanteLogoTile } from "./ParticipanteLogoTile";
import { cn } from "@/lib/utils";

const arrowClass =
  "glass-strong absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-komite-ink transition-all duration-200 hover:bg-komite-turquoise/25 hover:text-komite-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow";

/**
 * Carrusel de logos con avance manual (sin autoplay): flechas a los lados y
 * puntos que reflejan la posición activa. Muestra 2 slides en móvil, 3 en
 * tablet y 4 en escritorio.
 */
export function ParticipantesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [snaps, setSnaps] = React.useState(0);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    // Evita que las flechas del teclado cambien de pestaña globalmente cuando
    // el foco está dentro del carrusel.
    <div
      className="relative w-full"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.stopPropagation();
        }
      }}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", slidesToScroll: 1 }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {PARTICIPANT_LOGOS.map((logo) => (
            <CarouselItem
              key={logo.id}
              className="basis-1/2 pl-3 sm:basis-1/3 sm:pl-4 lg:basis-1/4"
            >
              <ParticipanteLogoTile file={logo.file} name={logo.name} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Ver logos anteriores"
          className={cn(arrowClass, "left-1")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Ver siguientes logos"
          className={cn(arrowClass, "right-1")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </Carousel>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: snaps }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir a la posición ${index + 1}`}
            aria-current={selected === index ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow",
              selected === index
                ? "w-5 bg-komite-glow"
                : "w-1.5 bg-komite-soft/30 hover:bg-komite-soft/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
