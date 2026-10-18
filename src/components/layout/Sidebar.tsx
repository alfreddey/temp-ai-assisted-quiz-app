import { CircleHelp, History, House, Zap, type LucideIcon } from "lucide-react";
import { SUBJECTS, type Subject } from "../../../shared/catalog";
import { levelFor } from "../../progress/points";
import type { Progress } from "../../progress/types";
import { Avatar, Badge, SUBJECT_ICONS } from "../ui";
import { NavButton } from "./NavButton";
import { NAV_LABELS, type NavTarget } from "./navigation";

const SIDEBAR_LINKS: { target: NavTarget; icon: LucideIcon }[] = [
  { target: "home", icon: House },
  { target: "history", icon: History },
];
const SHORTCUT_SUBJECT_COUNT = 4;

interface SidebarProps {
  progress: Progress;
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onPickSubject: (subject: Subject) => void;
}

export function Sidebar({ progress, active, onNavigate, onPickSubject }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Learning sidebar">
      <div className="sidebar__learner">
        <Avatar initials="JL" size={56} />
        <div>
          <p className="sidebar__greeting">Hey, {progress.name}!</p>
          <p className="sidebar__meta">Curious mind · Level {levelFor(progress.points)}</p>
        </div>
        <Badge tone="warning" icon={Zap}>
          {progress.points.toLocaleString()} points
        </Badge>
      </div>

      <nav className="sidebar__links" aria-label="Workspace">
        {SIDEBAR_LINKS.map(({ target, icon: Icon }) => (
          <NavButton
            key={target}
            className="sidebar__item"
            active={active === target}
            onClick={() => onNavigate(target)}
          >
            <Icon size={20} aria-hidden /> {NAV_LABELS[target]}
          </NavButton>
        ))}
      </nav>

      <div className="sidebar__subjects">
        {SUBJECTS.slice(0, SHORTCUT_SUBJECT_COUNT).map((subject) => {
          const Icon = SUBJECT_ICONS[subject];
          return (
            <button
              key={subject}
              type="button"
              className="sidebar__subject"
              onClick={() => onPickSubject(subject)}
            >
              <Icon size={18} aria-hidden /> {subject}
            </button>
          );
        })}
      </div>

      <p className="sidebar__footer">
        <CircleHelp size={12} aria-hidden /> AI can make mistakes, so check explanations that
        feel off.
      </p>
    </aside>
  );
}
