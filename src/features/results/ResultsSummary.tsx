import { House, PartyPopper, RotateCcw, Sparkles, Zap } from "lucide-react";
import { Badge, Button } from "../../components/ui";
import { pointsFor } from "../../progress/points";
import { encouragementFor } from "./encouragement";

interface ResultsSummaryProps {
  score: number;
  total: number;
  onRetake: () => void;
  onNewQuiz: () => void;
  onHome: () => void;
}

export function ResultsSummary({ score, total, onRetake, onNewQuiz, onHome }: ResultsSummaryProps) {
  const isPerfect = total > 0 && score === total;
  const { title, body } = encouragementFor(total ? score / total : 0);

  return (
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
        {isPerfect && (
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
  );
}
