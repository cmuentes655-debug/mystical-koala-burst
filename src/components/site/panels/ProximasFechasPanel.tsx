import { motion, type Variants } from "framer-motion";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarClock, CalendarPlus, Clock, MapPin } from "lucide-react";
import { EVENTS, type CommitteeEvent } from "@/lib/committee";
import { ModalityBadge } from "../ModalityBadge";
import { ActionButton } from "../ActionButton";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function stripDot(value: string) {
  return value.replace(/\.$/, "");
}

interface ProximasFechasPanelProps {
  onRegister: (event: CommitteeEvent) => void;
}

export function ProximasFechasPanel({ onRegister }: ProximasFechasPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Agenda del comité
        </h2>
      </header>

      {EVENTS.length === 0 ? (
        <p className="glass rounded-2xl px-4 py-6 text-center text-sm text-komite-soft/80">
          Todavía no hay fechas programadas.
        </p>
      ) : (
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
        >
          {EVENTS.map((event) => {
            const date = parseISO(event.date);
            return (
              <motion.li
                key={event.id}
                variants={item}
                whileHover={{ y: -3 }}
                className="glass flex items-stretch gap-3 rounded-2xl p-3 transition-colors duration-200 hover:border-komite-glow/60 sm:gap-4 sm:p-4"
              >
                <div className="flex w-[3.75rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border border-komite-glow/25 bg-komite-turquoise/10 px-2 py-2.5 text-center sm:w-[4.25rem]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-komite-glow/85">
                    {stripDot(format(date, "EEE", { locale: es }))}
                  </span>
                  <span className="font-display text-2xl font-bold leading-none text-komite-ink sm:text-[1.75rem]">
                    {format(date, "d")}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-komite-soft/70">
                    {stripDot(format(date, "MMM", { locale: es }))}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                    <span className="font-display text-sm font-semibold leading-tight text-komite-ink">
                      {event.title}
                    </span>
                    <div className="ml-auto flex shrink-0 flex-col items-end gap-1.5">
                      <ModalityBadge modality={event.modality} />
                      <ActionButton
                        onClick={() => onRegister(event)}
                        className="px-4 py-2 text-[13px]"
                      >
                        <CalendarPlus className="h-4 w-4" />
                        Inscribirse
                      </ActionButton>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-komite-soft/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-komite-glow/75" />
                      {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-komite-glow/75" />
                      {event.place}
                    </span>
                  </div>

                  <p className="text-xs leading-snug text-komite-soft/75">
                    {event.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      <p className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-komite-soft/45">
        <CalendarClock className="h-3.5 w-3.5" />
        Fechas sujetas a cambios
      </p>
    </div>
  );
}
