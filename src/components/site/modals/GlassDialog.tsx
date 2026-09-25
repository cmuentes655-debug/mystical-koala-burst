import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Modal de vidrio sobre el turquesa. Construido con los mismos primitivos de
 * Radix que usa shadcn para tener control total del estilo y del cierre.
 */
export function GlassDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: GlassDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-komite-deep/75 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            "glass-strong no-scrollbar fixed left-1/2 top-1/2 z-50 grid max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-3xl p-5 text-komite-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 sm:p-7",
            className,
          )}
        >
          <div className="flex flex-col gap-1 pr-10">
            <DialogPrimitive.Title className="font-display text-lg font-semibold tracking-tight text-komite-ink sm:text-xl">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="text-[13px] leading-relaxed text-komite-soft">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>

          {children}

          <DialogPrimitive.Close
            aria-label="Cerrar"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-komite-glow/25 text-komite-soft transition-colors hover:border-komite-glow/60 hover:text-komite-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
