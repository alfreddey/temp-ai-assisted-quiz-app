import { Bell, Plus } from "lucide-react";
import { Avatar, Brand, Button } from "../ui";
import { NavButton } from "./NavButton";
import { NAV_LABELS, type NavTarget } from "./navigation";
import { QuickQuizSearch } from "./QuickQuizSearch";

const NAV_TARGETS: NavTarget[] = ["home", "history"];

interface TopNavProps {
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onNewQuiz: () => void;
  onQuickQuiz: (topic: string) => void;
  busy: boolean;
}

export function TopNav({ active, onNavigate, onNewQuiz, onQuickQuiz, busy }: TopNavProps) {
  return (
    <header className="topnav">
      <Brand onClick={() => onNavigate("home")} />
      <nav className="topnav__links" aria-label="Primary">
        {NAV_TARGETS.map((target) => (
          <NavButton
            key={target}
            className="topnav__link"
            active={active === target}
            onClick={() => onNavigate(target)}
          >
            {NAV_LABELS[target]}
          </NavButton>
        ))}
      </nav>
      <QuickQuizSearch onSubmit={onQuickQuiz} disabled={busy} />
      <Button icon={Plus} onClick={onNewQuiz} className="topnav__cta">
        New quiz
      </Button>
      <button type="button" className="topnav__bell" aria-label="Notifications">
        <Bell size={20} aria-hidden />
      </button>
      <Avatar initials="JL" online />
    </header>
  );
}
