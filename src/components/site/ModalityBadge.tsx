import { Badge } from "@/components/ui/badge";
import type { EventModality } from "@/lib/committee";
import { cn } from "@/lib/utils";

const MODALITY_CLASS: Record<EventModality, string> = {
  Virtual: "border-komite-glow/45 bg-komite-turquoise/15 text-komite-glow",
  Presencial: "border-komite-accent/50 bg-komite-accent/15 text-komite-accent",
  Híbrido: "border-komite-mid/45 bg-komite-turquoise/20 text-komite-soft",
};

interface ModalityBadgeProps {
  modality: EventModality;
  className?: string;
}

/** Badge de modalidad de un evento, compartido entre el panel y el modal. */
export function ModalityBadge({ modality, className }: ModalityBadgeProps) {
  return (
    <Badge
      className={cn(
        "shrink-0 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em]",
        MODALITY_CLASS[modality],
        className,
      )}
    >
      {modality}
    </Badge>
  );
}
