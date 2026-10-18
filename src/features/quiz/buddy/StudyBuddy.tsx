import { Sparkles } from "lucide-react";
import type { Question } from "../../../../shared/schema";
import { BuddyInput } from "./BuddyInput";
import { BuddyThread } from "./BuddyThread";
import { starterQuestions } from "./starterQuestions";
import { useStudyBuddy } from "./useStudyBuddy";

interface StudyBuddyProps {
  question: Question;
  chosenIndex: number;
}

export function StudyBuddy({ question, chosenIndex }: StudyBuddyProps) {
  const { turns, pending, error, ask } = useStudyBuddy(question, chosenIndex);
  const hasConversation = turns.length > 0;

  return (
    <section className="card buddy" aria-labelledby="buddy-heading">
      <div className="buddy__heading">
        <Sparkles size={16} aria-hidden />
        <h2 id="buddy-heading">Still curious? Ask your AI study buddy.</h2>
      </div>

      {hasConversation ? (
        <BuddyThread turns={turns} pending={pending} />
      ) : (
        <div className="buddy__starters">
          {starterQuestions(question, chosenIndex).map((starter) => (
            <button
              key={starter}
              type="button"
              className="chip"
              onClick={() => void ask(starter)}
              disabled={pending}
            >
              {starter}
            </button>
          ))}
        </div>
      )}

      <BuddyInput onSend={(message) => void ask(message)} pending={pending} />
      {error && (
        <p className="field__helper field__helper--error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
