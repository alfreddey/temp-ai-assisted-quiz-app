import { Zap } from "lucide-react";
import { Badge, Button } from "../../../components/ui";
import { maxPointsFor } from "../../../progress/points";
import { AuthorLine } from "../AuthorLine";
import { QuizCard } from "../QuizCard";
import { DEFAULT_QUESTION_COUNT, type Suggestion } from "../suggestions";

interface SuggestionCardProps {
  suggestion: Suggestion;
  onStart: () => void;
  disabled: boolean;
}

export function SuggestionCard({ suggestion, onStart, disabled }: SuggestionCardProps) {
  return (
    <QuizCard
      subject={suggestion.subject}
      level={suggestion.level}
      badge={
        <Badge tone="warning" icon={Zap}>
          Up to +{maxPointsFor(DEFAULT_QUESTION_COUNT)} points
        </Badge>
      }
      title={suggestion.topic}
      body={suggestion.blurb}
      author={
        <AuthorLine
          avatar={{ initials: "AI", tone: "mint" }}
          name="Loop AI"
          detail={`${DEFAULT_QUESTION_COUNT} questions, explained`}
        />
      }
      action={
        <Button variant="secondary" compact onClick={onStart} disabled={disabled}>
          Start quiz
        </Button>
      }
    />
  );
}
