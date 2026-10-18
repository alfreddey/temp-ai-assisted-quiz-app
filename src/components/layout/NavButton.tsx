import type { ReactNode } from "react";
import { classNames } from "../../lib/classNames";

interface NavButtonProps {
  active: boolean;
  className: string;
  onClick: () => void;
  children: ReactNode;
}

/** A navigation button that marks itself as the current page when active. */
export function NavButton({ active, className, onClick, children }: NavButtonProps) {
  return (
    <button
      type="button"
      className={classNames(className, active && "is-active")}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
