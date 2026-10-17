import { useState, type FormEvent } from "react";
import {
  Bell,
  CircleHelp,
  CirclePlus,
  History,
  House,
  Plus,
  Search,
  Zap,
} from "lucide-react";
import { SUBJECTS, type Subject } from "../../shared/quiz";
import { levelFor, type Progress } from "../progress";
import { Avatar, Badge, Brand, Button, SUBJECT_ICONS, cx } from "./ui";

export type NavTarget = "home" | "history";

export function TopNav({
  active,
  onNavigate,
  onNewQuiz,
  onQuickQuiz,
  busy,
}: {
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onNewQuiz: () => void;
  onQuickQuiz: (topic: string) => void;
  busy: boolean;
}) {
  const [query, setQuery] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim().length >= 3) {
      onQuickQuiz(query.trim());
      setQuery("");
    }
  }

  return (
    <header className="topnav">
      <Brand onClick={() => onNavigate("home")} />
      <nav className="topnav__links" aria-label="Primary">
        <button
          type="button"
          className={cx("topnav__link", active === "home" && "is-active")}
          aria-current={active === "home" ? "page" : undefined}
          onClick={() => onNavigate("home")}
        >
          For you
        </button>
        <button
          type="button"
          className={cx("topnav__link", active === "history" && "is-active")}
          aria-current={active === "history" ? "page" : undefined}
          onClick={() => onNavigate("history")}
        >
          My quizzes
        </button>
      </nav>
      <form className="global-search" role="search" onSubmit={submit}>
        <Search size={20} aria-hidden />
        <label className="sr-only" htmlFor="global-search">
          Quiz me on any topic
        </label>
        <input
          id="global-search"
          placeholder="Quiz me on any topic…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={busy}
        />
      </form>
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

export function Sidebar({
  progress,
  active,
  onNavigate,
  onPickSubject,
}: {
  progress: Progress;
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onPickSubject: (subject: Subject) => void;
}) {
  const level = levelFor(progress.points);
  return (
    <aside className="sidebar" aria-label="Learning sidebar">
      <div className="sidebar__learner">
        <Avatar initials="JL" size={56} />
        <div>
          <p className="sidebar__greeting">Hey, {progress.name}!</p>
          <p className="sidebar__meta">Curious mind · Level {level}</p>
        </div>
        <Badge tone="warning" icon={Zap}>
          {progress.points.toLocaleString()} points
        </Badge>
      </div>

      <nav className="sidebar__links" aria-label="Workspace">
        <button
          type="button"
          className={cx("sidebar__item", active === "home" && "is-active")}
          aria-current={active === "home" ? "page" : undefined}
          onClick={() => onNavigate("home")}
        >
          <House size={20} aria-hidden /> For you
        </button>
        <button
          type="button"
          className={cx("sidebar__item", active === "history" && "is-active")}
          aria-current={active === "history" ? "page" : undefined}
          onClick={() => onNavigate("history")}
        >
          <History size={20} aria-hidden /> My quizzes
        </button>
      </nav>

      <div className="sidebar__subjects">
        <p className="sidebar__heading">YOUR SUBJECTS</p>
        {SUBJECTS.slice(0, 4).map((subject) => {
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

      <div className="sidebar__footer">
        <p>
          <CircleHelp size={12} aria-hidden /> AI can make mistakes — check
          explanations that feel off.
        </p>
        <p>Loop · Learning together</p>
      </div>
    </aside>
  );
}

export function MobileNav({
  active,
  onNavigate,
  onNewQuiz,
}: {
  active: NavTarget | null;
  onNavigate: (target: NavTarget) => void;
  onNewQuiz: () => void;
}) {
  const items = [
    { id: "home" as const, label: "For you", icon: House, onClick: () => onNavigate("home") },
    { id: "new" as const, label: "New quiz", icon: CirclePlus, onClick: onNewQuiz },
    { id: "history" as const, label: "My quizzes", icon: History, onClick: () => onNavigate("history") },
  ];
  return (
    <nav className="mobile-nav" aria-label="Primary">
      {items.map(({ id, label, icon: Icon, onClick }) => (
        <button
          key={id}
          type="button"
          className={cx("mobile-nav__item", active === id && "is-active")}
          aria-current={active === id ? "page" : undefined}
          onClick={onClick}
        >
          <Icon size={24} aria-hidden />
          {label}
          <span className="mobile-nav__indicator" />
        </button>
      ))}
    </nav>
  );
}
