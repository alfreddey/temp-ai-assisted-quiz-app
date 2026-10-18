import { Shapes, type LucideIcon } from "lucide-react";
import { classNames } from "../../lib/classNames";

interface SubjectChipProps {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}

export function SubjectChip({ label, icon: Icon = Shapes, selected, onClick }: SubjectChipProps) {
  return (
    <button
      type="button"
      className={classNames("chip", selected && "chip--selected")}
      aria-pressed={selected}
      onClick={onClick}
    >
      <Icon size={17} aria-hidden />
      {label}
    </button>
  );
}
