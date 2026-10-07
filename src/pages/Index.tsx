import * as React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ParticlesBackground } from "@/components/site/ParticlesBackground";
import { TopBar } from "@/components/site/TopBar";
import { TabNav } from "@/components/site/TabNav";
import { InicioPanel } from "@/components/site/panels/InicioPanel";
import { ParticipantesPanel } from "@/components/site/panels/ParticipantesPanel";
import { ProximasFechasPanel } from "@/components/site/panels/ProximasFechasPanel";
import { FormularioPanel } from "@/components/site/panels/FormularioPanel";
import { PilaresPanel } from "@/components/site/panels/PilaresPanel";
import { JoinModal } from "@/components/site/modals/JoinModal";
import { LoginModal } from "@/components/site/modals/LoginModal";
import { UploadModal } from "@/components/site/modals/UploadModal";
import { InscripcionEventoModal } from "@/components/site/modals/InscripcionEventoModal";
import { TABS, type TabId, type CommitteeEvent } from "@/lib/committee";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type ModalId = "join" | "login" | "upload" | "inscribirse" | null;

const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
};

const Index = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  // Restaura la pestaña desde `?tab=` (validado contra TABS) para que el
  // regreso desde una página de detalle no pierda el contexto.
  const [activeTab, setActiveTab] = React.useState<TabId>(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    return TABS.some((item) => item.id === tab) ? (tab as TabId) : "inicio";
  });
  const [direction, setDirection] = React.useState(1);
  const [activeModal, setActiveModal] = React.useState<ModalId>(null);
  const [registerEvent, setRegisterEvent] = React.useState<CommitteeEvent | null>(
    null,
  );

  const changeTab = React.useCallback(
    (next: TabId) => {
      if (next === activeTab) return;
      const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
      const nextIndex = TABS.findIndex((tab) => tab.id === next);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveTab(next);
    },
    [activeTab],
  );

  const stepTab = React.useCallback(
    (delta: number) => {
      const index = TABS.findIndex((tab) => tab.id === activeTab);
      const next = TABS[(index + delta + TABS.length) % TABS.length].id;
      changeTab(next);
    },
    [activeTab, changeTab],
  );

  // Navegación por flechas del teclado.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      if (activeModal) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      event.preventDefault();
      stepTab(event.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal, stepTab]);

  const renderPanel = () => {
    switch (activeTab) {
      case "inicio":
        return <InicioPanel onJoin={() => setActiveModal("join")} />;
      case "participantes":
        return <ParticipantesPanel />;
      case "fechas":
        return (
          <ProximasFechasPanel
            onRegister={(event) => {
              setRegisterEvent(event);
              setActiveModal("inscribirse");
            }}
          />
        );
      case "formulario":
        return <FormularioPanel />;
      case "pilares":
        return <PilaresPanel onUpload={() => setActiveModal("upload")} />;
    }
  };

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Fondo de partículas fijo detrás de todo el contenido. */}
      <ParticlesBackground />

      {/* Veladura radial para asegurar contraste del texto sobre las partículas. */}
      <div
        aria-hidden="true"
        className="content-veil pointer-events-none fixed inset-0 z-[1]"
      />

      <TopBar
        onLogin={() => setActiveModal("login")}
        onJoin={() => setActiveModal("join")}
      />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-[900px] flex-1 flex-col">
          <div className="flex shrink-0 justify-center px-4 pt-4 md:pt-6">
            <TabNav
              activeTab={activeTab}
              onChange={changeTab}
              isMobile={isMobile}
            />
          </div>

          <motion.div
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70 || info.velocity.x < -420) stepTab(1);
              else if (info.offset.x > 70 || info.velocity.x > 420) stepTab(-1);
            }}
            className="relative min-h-0 flex-1 overflow-hidden px-4 py-4 md:px-6 md:py-6"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.36, ease: "easeOut" }}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="no-scrollbar max-h-full w-full overflow-y-auto">
                  {renderPanel()}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex shrink-0 items-center justify-center gap-4 px-4 pb-5">
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  aria-label={`Ir a ${tab.label}`}
                  className="group flex items-center rounded-full px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
                >
                  <span
                    className={cn(
                      "block h-[3px] rounded-full transition-all duration-300",
                      tab.id === activeTab
                        ? "w-9 bg-komite-glow shadow-[0_0_10px_rgba(95,227,204,0.7)]"
                        : "w-4 bg-komite-soft/25 group-hover:bg-komite-soft/50",
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-komite-soft/45">
              Usa ← → o desliza
            </span>
          </div>
        </div>
      </main>

      <JoinModal
        open={activeModal === "join"}
        onOpenChange={(open) => setActiveModal(open ? "join" : null)}
      />
      <LoginModal
        open={activeModal === "login"}
        onOpenChange={(open) => setActiveModal(open ? "login" : null)}
      />
      <UploadModal
        open={activeModal === "upload"}
        onOpenChange={(open) => setActiveModal(open ? "upload" : null)}
      />
      <InscripcionEventoModal
        open={activeModal === "inscribirse"}
        onOpenChange={(open) => {
          setActiveModal(open ? "inscribirse" : null);
          if (!open) setRegisterEvent(null);
        }}
        event={registerEvent}
      />
    </div>
  );
};

export default Index;
