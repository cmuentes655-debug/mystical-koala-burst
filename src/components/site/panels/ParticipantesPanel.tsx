import { motion, type Variants } from "framer-motion";
import { User } from "lucide-react";
import { PARTICIPANT_GROUPS, PARTICIPANTS } from "@/lib/committee";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ParticipantesPanel() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <header className="flex flex-col items-center gap-1 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-komite-glow/80">
          Participantes
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-komite-ink sm:text-2xl">
          Quiénes participan del comité
        </h2>
        <p className="max-w-md text-xs leading-snug text-komite-soft/80 sm:text-[13px]">
          Organizaciones, instituciones, academia y aliados tecnológicos que
          construyen la red.
        </p>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {PARTICIPANT_GROUPS.map((group) => {
          const Icon = group.icon;
          const members = PARTICIPANTS.filter(
            (participant) => participant.type === group.type,
          );

          return (
            <motion.section
              key={group.type}
              variants={groupVariants}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-komite-glow/30 bg-komite-turquoise/15 text-komite-glow">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-mono text-[10.5px] uppercase tracking-[0.22em] text-komite-glow/85">
                      {group.label}
                    </h3>
                    <span
                      aria-label={`${members.length} participantes`}
                      className="shrink-0 rounded-full border border-komite-glow/25 bg-komite-turquoise/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-komite-glow"
                    >
                      {members.length}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-komite-glow/15"
                    />
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-komite-soft/70">
                    {group.description}
                  </p>
                </div>
              </div>

              {members.length === 0 ? (
                <p className="glass rounded-2xl px-4 py-5 text-center text-xs text-komite-soft/75">
                  Todavía no hay participantes en este grupo.
                </p>
              ) : (
                <motion.ul
                  variants={container}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {members.map((participant) => (
                    <motion.li
                      key={participant.id}
                      variants={cardVariants}
                      whileHover={{ y: -3 }}
                      className="glass flex flex-col gap-2.5 rounded-2xl p-4 transition-colors duration-200 hover:border-komite-glow/60"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                        <span className="font-display text-sm font-semibold leading-tight text-komite-ink">
                          {participant.name}
                        </span>
                        <span className="shrink-0 rounded-full border border-komite-glow/35 bg-komite-turquoise/15 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-komite-glow">
                          {participant.role}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[11px] text-komite-soft/80">
                        <User className="h-3.5 w-3.5 shrink-0 text-komite-glow/75" />
                        {participant.representative}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.section>
          );
        })}
      </motion.div>
    </div>
  );
}
