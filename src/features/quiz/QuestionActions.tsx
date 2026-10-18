import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "../../components/ui";
import { classNames } from "../../lib/classNames";

interface QuestionActionsProps {
  checked: boolean;
  isCorrect: boolean;
  isLastQuestion: boolean;
  hasSelection: boolean;
  hintOpen: boolean;
  onToggleHint: () => void;
  onCheck: () => void;
  onNext: () => void;
}

export function QuestionActions({
  checked,
  isCorrect,
  isLastQuestion,
  hasSelection,
  hintOpen,
  onToggleHint,
  onCheck,
  onNext,
}: QuestionActionsProps) {
  if (!checked) {
    return (
      <div className="question-card__actions">
        <Button variant="tertiary" icon={Lightbulb} onClick={onToggleHint} aria-expanded={hintOpen}>
          {hintOpen ? "Hide hint" : "Show a hint"}
        </Button>
        <Button onClick={onCheck} disabled={!hasSelection}>
          Check answer
        </Button>
      </div>
    );
  }

  return (
    <div className="question-card__actions">
      <p
        className={classNames("verdict", isCorrect ? "verdict--correct" : "verdict--wrong")}
        role="status"
      >
        {isCorrect ? "Nailed it! +10 points" : "Not quite. Here’s why."}
      </p>
      <Button icon={isLastQuestion ? Sparkles : ArrowRight} onClick={onNext}>
        {isLastQuestion ? "See results" : "Next question"}
      </Button>
    </div>
  );
}
