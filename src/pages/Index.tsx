import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { GlobeCanvas } from "@/components/globe/GlobeCanvas";
import { TopBar } from "@/components/site/TopBar";
import { TabNav } from "@/components/site/TabNav";
import { InicioPanel } from "@/components/site/panels/InicioPanel";
import { FuncionesPanel } from "@/components/site/panels/FuncionesPanel";
import { IndicadoresPanel } from "@/components/site/panels/IndicadoresPanel";
import {
  MiembrosPanel,
  type MemberAction,
} from "@/components/site/panels/MiembrosPanel";
import { JoinModal } from "@/components/site/modals/JoinModal";
import { LoginModal } from "@/components/site/modals/LoginModal";
import { UploadModal } from "@/components/site/modals/UploadModal";
import { FUNCTIONS, TABS, type TabId } from "@/lib/committee";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type ModalId = MemberAction | null;

const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
};

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<TabId>("inicio");
  const [direction, setDirection] = React.useState(1);
  const [hoveredFunction, setHoveredFunction] = React.useState<number | null>(
    null,
  );
  const [activeModal, setActiveModal] = React.useState<ModalId>(null);

  const hoveredArcId =
    hoveredFunction === null ? null : FUNCTIONS[hoveredFunction]?.arcId ?? null;

  const changeTab = React.useCallback(
    (next: TabId) => {
      if (next === activeTab) return;
      const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
      const nextIndex = TABS.findIndex((tab) => tab.id === next);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveTab(next);
      setHoveredFunction(null);
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

  const handleMemberAction = React.useCallback(
    (action: MemberAction) => setActiveModal(action),
    [],
  );

  const renderPanel = () => {
    switch (activeTab) {
      case "inicio":
        return <InicioPanel onJoin={() => setActiveModal("join")} />;
      case "funciones":
        return <FuncionesPanel onHoverFunction={setHoveredFunction} />;
      case "indicadores":
        return <IndicadoresPanel />;
      case "miembros":
        return <MiembrosPanel onAction={handleMemberAction} />;
    }
  };

  return (
    <div
      className="relative flex h-screen flex-col overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <TopBar
        onLogin={() => setActiveModal("login")}
        onJoin={() => setActiveModal("join")}
      />

      <main className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Globo: bloque superior en móvil, mitad derecha en escritorio */}
        <div className="pointer-events-none relative z-0 h-[36%] min-h-[170px] shrink-0 md:pointer-events-auto md:absolute md:inset-y-0 md:right-0 md:h-full md:min-h-0 md:w-[46%] md:max-w-[780px]">
          <GlobeCanvas
            activeTab={activeTab}
            hoveredArcId={hoveredArcId}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 34%, rgba(0,33,29,0) 32%, rgba(0,33,29,0.72) 76%)",
            }}
          />
        </div>

        {/* Contenido navegable */}
        <section className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 justify-center px-4 pt-3 md:justify-start md:px-10 md:pt-6">
            <TabNav activeTab={activeTab} onChange={changeTab} isMobile={isMobile} />
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
            className="relative min-h-0 flex-1 overflow-hidden px-5 py-3 md:px-10 md:py-6"
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
                className="absolute inset-0 flex items-center"
              >
                <div className="no-scrollbar max-h-full w-full overflow-y-auto">
                  {renderPanel()}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="hidden shrink-0 items-center justify-between gap-4 px-10 pb-6 md:flex">
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
        </section>

        {/* Reserva de espacio para el globo en escritorio */}
        <div
          aria-hidden="true"
          className="hidden shrink-0 md:block md:w-[46%] md:max-w-[780px]"
        />
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
    </div>
  );
};

export default Index;
