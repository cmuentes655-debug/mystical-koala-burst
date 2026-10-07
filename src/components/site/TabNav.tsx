import { motion } from "framer-motion";
import { TABS, type TabId } from "@/lib/committee";
import { cn } from "@/lib/utils";

interface TabNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
  isMobile: boolean;
}

export function TabNav({ activeTab, onChange, isMobile }: TabNavProps) {
  if (isMobile) {
    return (
      <div
        role="tablist"
        aria-label="Secciones de la red"
        className="flex items-center justify-center gap-1.5"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              aria-label={tab.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className="grid h-9 w-9 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1 : 0.55,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={cn(
                  "block h-2.5 w-2.5 rounded-full",
                  isActive
                    ? "bg-komite-glow shadow-[0_0_14px_2px_rgba(95,227,204,0.7)]"
                    : "bg-komite-soft/50",
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="Secciones de la red"
      className="relative inline-flex max-w-full flex-nowrap items-center gap-1 rounded-full border border-komite-glow/15 bg-komite-deep/30 p-1 backdrop-blur-md"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow lg:px-4 lg:text-[11px] lg:tracking-[0.16em]",
              isActive
                ? "text-komite-ink"
                : "text-komite-soft/55 hover:text-komite-soft",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full border border-komite-glow/45 bg-komite-turquoise/20"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
