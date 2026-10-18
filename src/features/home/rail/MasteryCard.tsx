import { SUBJECT_ICONS } from "../../../components/ui";
import type { QuizRecord } from "../../../progress/types";
import { subjectMastery } from "./subjectMastery";

const MAX_ROWS = 4;

export function MasteryCard({ history }: { history: QuizRecord[] }) {
  const rows = subjectMastery(history, MAX_ROWS);

  return (
    <section className="card rail-card" aria-labelledby="mastery-heading">
      <h2 id="mastery-heading" className="rail-card__title">
        Here’s how you’re doing by subject.
      </h2>
      {rows.length === 0 && (
        <p className="rail-card__empty">
          Your accuracy by subject appears here after your first quiz.
        </p>
      )}
      {rows.map(({ subject, quizCount, accuracyPercent }) => {
        const Icon = SUBJECT_ICONS[subject];
        return (
          <div key={subject} className="mastery-row">
            <span className="mastery-row__icon">
              <Icon size={18} aria-hidden />
            </span>
            <div className="mastery-row__info">
              <p className="mastery-row__name">{subject}</p>
              <p className="mastery-row__meta">
                {quizCount} {quizCount === 1 ? "quiz" : "quizzes"}
              </p>
            </div>
            <p className="mastery-row__value">{accuracyPercent}%</p>
          </div>
        );
      })}
    </section>
  );
}
