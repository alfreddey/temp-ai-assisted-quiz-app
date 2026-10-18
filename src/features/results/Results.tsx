import type { Quiz } from "../../../shared/schema";
import { countCorrect } from "../../../shared/scoring";
import { ResultsSummary } from "./ResultsSummary";
import { ReviewItem } from "./ReviewItem";

interface ResultsProps {
  quiz: Quiz;
  answers: number[];
  onRetake: () => void;
  onNewQuiz: () => void;
  onHome: () => void;
}

export function Results({ quiz, answers, onRetake, onNewQuiz, onHome }: ResultsProps) {
  return (
    <div className="results">
      <ResultsSummary
        score={countCorrect(quiz, answers)}
        total={quiz.questions.length}
        onRetake={onRetake}
        onNewQuiz={onNewQuiz}
        onHome={onHome}
      />
      <section className="review" aria-labelledby="review-heading">
        <h2 id="review-heading" className="feed__title">
          Review your answers.
        </h2>
        {quiz.questions.map((question, questionIndex) => (
          <ReviewItem
            key={questionIndex}
            question={question}
            questionNumber={questionIndex + 1}
            chosenIndex={answers[questionIndex]}
          />
        ))}
      </section>
    </div>
  );
}
