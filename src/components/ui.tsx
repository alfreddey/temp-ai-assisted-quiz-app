import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Atom,
  BookOpen,
  Calculator,
  FlaskConical,
  Landmark,
  Leaf,
  LoaderCircle,
  Shapes,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Subject } from "../../shared/quiz";

const cx = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(" ");

/* ---------- Brand ---------- */

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="brand" onClick={onClick} aria-label="Loop home">
      <span className="brand__symbol">
        <Sparkles size={20} strokeWidth={2} aria-hidden />
      </span>
      <span className="brand__word">loop</span>
    </button>
  );
}

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

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
  const iconSize = compact ? 16 : 18;
  return (
    <button
      type={type}
      className={cx("btn", `btn--${variant}`, compact && "btn--compact", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <LoaderCircle size={iconSize} className="spin" aria-hidden />
      ) : (
        Icon && <Icon size={iconSize} aria-hidden />
      )}
      <span>{children}</span>
    </button>
  );
}

export function IconButton({
  icon: Icon,
  label,
  className,
  ...rest
}: { icon: LucideIcon; label: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx("icon-btn", className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon size={20} aria-hidden />
    </button>
  );
}

/* ---------- Status badge ---------- */

export type BadgeTone = "success" | "warning" | "info" | "neutral" | "danger";

export function Badge({
  tone,
  icon: Icon,
  children,
}: {
  tone: BadgeTone;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <span className={`badge badge--${tone}`}>
      {Icon && <Icon size={14} strokeWidth={2.25} aria-hidden />}
      {children}
    </span>
  );
}

/* ---------- Subject chips ---------- */

export const SUBJECT_ICONS: Record<Subject, LucideIcon> = {
  Mathematics: Calculator,
  Biology: Leaf,
  Chemistry: FlaskConical,
  Physics: Atom,
  English: BookOpen,
  History: Landmark,
};

export function SubjectChip({
  label,
  icon: Icon = Shapes,
  selected,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cx("chip", selected && "chip--selected")}
      aria-pressed={selected}
      onClick={onClick}
    >
      <Icon size={17} aria-hidden />
      {label}
    </button>
  );
}

/* ---------- Avatars ---------- */

export function Avatar({
  initials,
  size = 40,
  tone = "lavender",
  expert,
  online,
}: {
  initials: string;
  size?: 24 | 32 | 36 | 40 | 56;
  tone?: "lavender" | "peach" | "mint";
  expert?: boolean;
  online?: boolean;
}) {
  return (
    <span
      className={cx("avatar", `avatar--${tone}`, expert && "avatar--expert")}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      aria-hidden
    >
      {initials}
      {online && <span className="avatar__online" />}
    </span>
  );
}

/* ---------- Tabs ---------- */

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === value}
          className={cx("tab", tab.id === value && "tab--active")}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export { cx };
