import { Check, Flame, RotateCcw } from "lucide-react";
import { Badge, Button } from "../../../components/ui";
import type { QuizRecord } from "../../../progress/types";
import { AuthorLine } from "../AuthorLine";
import { QuizCard } from "../QuizCard";

/** Scores at or above this share count as a pass. */
const PASSING_RATIO = 0.7;

interface HistoryCardProps {
  record: QuizRecord;
  onRetake: () => void;
  disabled: boolean;
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const passed = total > 0 && score / total >= PASSING_RATIO;
  return passed ? (
    <Badge tone="success" icon={Check}>
      {score}/{total} correct
    </Badge>
  ) : (
    <Badge tone="warning" icon={Flame}>
      {score}/{total}, room to grow
    </Badge>
  );
}

export function HistoryCard({ record, onRetake, disabled }: HistoryCardProps) {
  const completedOn = new Date(record.completedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  return (
    <QuizCard
      subject={record.subject}
      level={record.level}
      badge={<ScoreBadge score={record.score} total={record.total} />}
      title={record.title}
      body={`Topic: ${record.topic}`}
      author={<AuthorLine avatar={{ initials: "JL" }} name="You" detail={completedOn} />}
      action={
        <Button variant="secondary" compact icon={RotateCcw} onClick={onRetake} disabled={disabled}>
          New version
        </Button>
      }
    />
  );
}
