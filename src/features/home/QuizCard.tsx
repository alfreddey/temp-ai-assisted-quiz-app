import type { ReactNode } from "react";

interface QuizCardProps {
  subject: string;
  level: string;
  badge: ReactNode;
  title: string;
  body: string;
  /** Who made or took the quiz, shown bottom left. */
  author: ReactNode;
  action: ReactNode;
}

/** The kit's question card layout: subject and level, a status badge, the title, then author and action. */
export function QuizCard({ subject, level, badge, title, body, author, action }: QuizCardProps) {
  return (
    <article className="card question-card">
      <div className="question-card__meta">
        <p className="meta">
          <span className="meta__subject">{subject}</span>
          <span className="meta__level">•&nbsp;&nbsp;{level}</span>
        </p>
        {badge}
      </div>
      <div className="question-card__content">
        <h3 className="question-card__title">{title}</h3>
        <p className="question-card__body">{body}</p>
      </div>
      <div className="question-card__actions">
        {author}
        {action}
      </div>
    </article>
  );
}
