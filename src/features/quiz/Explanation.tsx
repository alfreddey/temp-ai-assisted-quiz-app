import { BadgeCheck, CircleX } from "lucide-react";
import type { Question } from "../../../shared/schema";
import { Avatar, Badge } from "../../components/ui";
import { classNames } from "../../lib/classNames";

interface ExplanationProps {
  question: Question;
  correct: boolean;
}

/** The kit's answer card: verified styling when correct, plain styling when not. */
export function Explanation({ question, correct }: ExplanationProps) {
  const { headline, why, steps, check } = question.explanation;
  const lastStepIndex = steps.length - 1;

  return (
    <section
      className={classNames("card answer-card", correct && "answer-card--verified")}
      aria-label="Explanation"
    >
      <div className="answer-card__attribution">
        <div className="author">
          <Avatar initials="AI" size={40} tone="mint" expert={correct} />
          <p className="author__name author__name--regular">Loop AI</p>
        </div>
        {correct ? (
          <Badge tone="success" icon={BadgeCheck}>
            Correct
          </Badge>
        ) : (
          <Badge tone="danger" icon={CircleX}>
            Not quite
          </Badge>
        )}
      </div>
      <div className="answer-card__explanation">
        <h2 className="answer-card__headline">{headline}</h2>
        <p className="answer-card__why">{why}</p>
        {steps.length > 0 && (
          <ol className="worked-solution">
            {steps.map((step, stepIndex) => (
              <li
                key={stepIndex}
                className={classNames(stepIndex === lastStepIndex && "worked-solution__final")}
              >
                {step}
              </li>
            ))}
          </ol>
        )}
        {check && <p className="answer-card__check">Check: {check}</p>}
      </div>
    </section>
  );
}
