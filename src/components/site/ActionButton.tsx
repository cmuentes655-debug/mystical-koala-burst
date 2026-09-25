import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-komite-accent text-komite-deep font-semibold shadow-[0_14px_34px_-12px_rgba(252,76,2,0.85)] hover:brightness-110",
  ghost: "text-komite-soft hover:bg-komite-glow/10 hover:text-komite-ink",
  outline:
    "border border-komite-glow/30 text-komite-ink hover:border-komite-glow/70 hover:bg-komite-glow/10",
};

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(({ className, variant = "primary", type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-[transform,background-color,border-color,filter] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komite-glow focus-visible:ring-offset-2 focus-visible:ring-offset-komite-deep disabled:cursor-not-allowed disabled:opacity-50",
      VARIANTS[variant],
      className,
    )}
    {...props}
  />
));
ActionButton.displayName = "ActionButton";
