import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { classNames } from "../../lib/classNames";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  /** Accessible name, also shown as a tooltip. */
  label: string;
}

export function IconButton({ icon: Icon, label, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={classNames("icon-btn", className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon size={20} aria-hidden />
    </button>
  );
}
