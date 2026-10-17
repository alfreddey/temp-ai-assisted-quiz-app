import { useState } from "react";
import { Check, ChevronDown, House, PartyPopper, RotateCcw, Sparkles, X, Zap } from "lucide-react";
import type { Quiz } from "../../shared/quiz";
import { pointsFor } from "../progress";
import { Explanation } from "./QuizPlayer";
import { Badge, Button, cx } from "./ui";

function cheer(ratio: number): { title: string; body: string } {
  if (ratio === 1) return { title: "Flawless. That’s the ‘aha!’", body: "You got every answer right. Try the next level up to keep stretching." };
  if (ratio >= 0.7) return { title: "Strong work!", body: "You’ve got the core idea. Review the misses below to lock it in." };
  if (ratio >= 0.4) return { title: "You’re getting there.", body: "Each explanation below is a step closer. A second round usually clicks." };
  return { title: "Every question is a good start.", body: "Read through the why for each one, then try a fresh version." };
}

export function Results({
  quiz,
  answers,
  onRetake,
  onNewQuiz,
  onHome,
}: {
  quiz: Quiz;
  answers: number[];
  onRetake: () => void;
  onNewQuiz: () => void;
  onHome: () => void;
}) {
  const total = quiz.questions.length;
  const score = answers.filter((a, i) => a === quiz.questions[i].answerIndex).length;
  const ratio = total ? score / total : 0;
  const { title, body } = cheer(ratio);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="results">
      <section className="results__hero" aria-labelledby="results-heading">
        <div className="results__heading">
          <h1 id="results-heading" tabIndex={-1}>
            {title}
          </h1>
          <PartyPopper size={28} aria-hidden />
        </div>
        <p className="results__score">
          {score} / {total} correct
        </p>
        <div className="results__badges">
          <Badge tone="warning" icon={Zap}>
            +{pointsFor(score, total)} points
          </Badge>
          {ratio === 1 && (
            <Badge tone="success" icon={Sparkles}>
              Perfect-run bonus
            </Badge>
          )}
        </div>
        <p className="results__body">{body}</p>
        <div className="results__actions">
          <Button icon={RotateCcw} onClick={onRetake}>
            Try a fresh version
          </Button>
          <Button variant="secondary" icon={Sparkles} onClick={onNewQuiz}>
            New topic
          </Button>
          <Button variant="tertiary" icon={House} onClick={onHome}>
            Back home
          </Button>
        </div>
      </section>

      <section className="review" aria-labelledby="review-heading">
        <h2 id="review-heading" className="feed__title">
          Review your answers
        </h2>
        {quiz.questions.map((q, i) => {
          const correct = answers[i] === q.answerIndex;
          const expanded = open === i;
          return (
            <article key={i} className="card review-item">
              <div className="question-card__meta">
                <p className="meta">
                  <span className="meta__subject">Question {i + 1}</span>
                </p>
                {correct ? (
                  <Badge tone="success" icon={Check}>
                    Correct
                  </Badge>
                ) : (
                  <Badge tone="danger" icon={X}>
                    Missed
                  </Badge>
                )}
              </div>
              <h3 className="question-card__title review-item__title">{q.prompt}</h3>
              <dl className="review-item__answers">
                <div>
                  <dt>Your answer</dt>
                  <dd className={cx(correct ? "is-correct" : "is-wrong")}>{q.options[answers[i]]}</dd>
                </div>
                {!correct && (
                  <div>
                    <dt>Correct answer</dt>
                    <dd className="is-correct">{q.options[q.answerIndex]}</dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                className="review-item__toggle"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
              >
                {expanded ? "Hide the why" : "Show the why"}
                <ChevronDown size={16} className={cx(expanded && "rotate")} aria-hidden />
              </button>
              {expanded && <Explanation question={q} correct={correct} />}
            </article>
          );
        })}
      </section>
    </div>
  );
}
