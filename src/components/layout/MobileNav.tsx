import { CirclePlus, History, House, type LucideIcon } from "lucide-react";
import { NavButton } from "./NavButton";
import { NAV_LABELS, type NavTarget } from "./navigation";

interface MobileNavProps {
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onNewQuiz: () => void;
}

interface MobileNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function MobileNav({ active, onNavigate, onNewQuiz }: MobileNavProps) {
  const items: MobileNavItem[] = [
    { key: "home", label: NAV_LABELS.home, icon: House, isActive: active === "home", onClick: () => onNavigate("home") },
    { key: "new", label: "New quiz", icon: CirclePlus, isActive: false, onClick: onNewQuiz },
    { key: "history", label: NAV_LABELS.history, icon: History, isActive: active === "history", onClick: () => onNavigate("history") },
  ];

  return (
    <nav className="mobile-nav" aria-label="Primary">
      {items.map(({ key, label, icon: Icon, isActive, onClick }) => (
        <NavButton key={key} className="mobile-nav__item" active={isActive} onClick={onClick}>
          <Icon size={24} aria-hidden />
          {label}
          <span className="mobile-nav__indicator" />
        </NavButton>
      ))}
    </nav>
  );
}
