import type { ButtonHTMLAttributes } from "react";
import { LoaderCircle, type LucideIcon } from "lucide-react";
import { classNames } from "../../lib/classNames";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

const ICON_SIZE = 18;
const COMPACT_ICON_SIZE = 16;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  compact?: boolean;
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  compact,
  icon: Icon,
  loading,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const iconSize = compact ? COMPACT_ICON_SIZE : ICON_SIZE;
  const LeadingIcon = loading ? LoaderCircle : Icon;
  return (
    <button
      type={type}
      className={classNames("btn", `btn--${variant}`, compact && "btn--compact", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {LeadingIcon && (
        <LeadingIcon size={iconSize} className={loading ? "spin" : undefined} aria-hidden />
      )}
      <span>{children}</span>
    </button>
  );
}
