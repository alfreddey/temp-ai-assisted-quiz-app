import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type BadgeTone = "success" | "warning" | "info" | "neutral" | "danger";

interface BadgeProps {
  tone: BadgeTone;
  icon?: LucideIcon;
  children: ReactNode;
}

export function Badge({ tone, icon: Icon, children }: BadgeProps) {
  return (
    <span className={`badge badge--${tone}`}>
      {Icon && <Icon size={14} strokeWidth={2.25} aria-hidden />}
      {children}
    </span>
  );
}
