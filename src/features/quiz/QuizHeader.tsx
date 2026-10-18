import { ChevronRight, X } from "lucide-react";
import { IconButton } from "../../components/ui";

interface QuizHeaderProps {
  subject: string;
  title: string;
  onExit: () => void;
}

export function QuizHeader({ subject, title, onExit }: QuizHeaderProps) {
  return (
    <div className="player__top">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button type="button" className="breadcrumb__link" onClick={onExit}>
          {subject}
        </button>
        <ChevronRight size={14} aria-hidden />
        <span aria-current="page">{title}</span>
      </nav>
      <IconButton icon={X} label="Leave quiz" onClick={onExit} />
    </div>
  );
}
