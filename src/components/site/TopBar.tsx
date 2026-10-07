import { LogIn, UserPlus } from "lucide-react";
import { ActionButton } from "./ActionButton";

interface TopBarProps {
  onLogin: () => void;
  onJoin: () => void;
}

const SHOW_AUTH_ACTIONS = false;

export function TopBar({ onLogin, onJoin }: TopBarProps) {
  return (
    <header className="relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-komite-glow/15 bg-komite-deep/40 px-4 py-2.5 backdrop-blur-xl sm:px-6 sm:py-3 lg:px-10">
      <div className="flex min-w-0 items-center gap-2.5">
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          className="h-9 w-9 shrink-0"
        />
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-display text-sm font-semibold tracking-tight text-komite-ink sm:text-base">
            Adopción de IA
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-komite-glow/80 sm:text-[10px] sm:tracking-[0.3em]">
            Redes de Valor
          </span>
        </span>
      </div>

      {SHOW_AUTH_ACTIONS && (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ActionButton
            variant="ghost"
            onClick={onLogin}
            className="px-3 py-2 text-[13px] sm:px-4"
            aria-label="Iniciar sesión"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Iniciar sesión</span>
          </ActionButton>
          <ActionButton
            onClick={onJoin}
            className="px-3.5 py-2 text-[13px] sm:px-5"
            aria-label="Unirse"
          >
            <UserPlus className="h-4 w-4" />
            <span>Unirse</span>
          </ActionButton>
        </div>
      )}
    </header>
  );
}
