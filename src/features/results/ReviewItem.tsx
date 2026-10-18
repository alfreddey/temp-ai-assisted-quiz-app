import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import type { Question } from "../../../shared/schema";
import { Badge } from "../../components/ui";
import { classNames } from "../../lib/classNames";
import { Explanation } from "../quiz/Explanation";

interface ReviewItemProps {
  question: Question;
  questionNumber: number;
  chosenIndex: number;
}

export function ReviewItem({ question, questionNumber, chosenIndex }: ReviewItemProps) {
  const [expanded, setExpanded] = useState(false);
  const correct = chosenIndex === question.answerIndex;

  return (
    <article className="card review-item">
      <div className="question-card__meta">
        <p className="meta">
          <span className="meta__subject">Question {questionNumber}</span>
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
      <h3 className="question-card__title review-item__title">{question.prompt}</h3>
      <dl className="review-item__answers">
        <div>
          <dt>Your answer</dt>
          <dd className={correct ? "is-correct" : "is-wrong"}>{question.options[chosenIndex]}</dd>
        </div>
        {!correct && (
          <div>
            <dt>Correct answer</dt>
            <dd className="is-correct">{question.options[question.answerIndex]}</dd>
          </div>
        )}
      </dl>
      <button
        type="button"
        className="review-item__toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((open) => !open)}
      >
        {expanded ? "Hide the why" : "Show the why"}
        <ChevronDown size={16} className={classNames(expanded && "rotate")} aria-hidden />
      </button>
      {expanded && <Explanation question={question} correct={correct} />}
    </article>
  );
}
