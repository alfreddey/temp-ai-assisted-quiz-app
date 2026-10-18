interface QuizProgressProps {
  questionNumber: number;
  total: number;
  answeredCount: number;
  correctSoFar: number;
}

export function QuizProgress({ questionNumber, total, answeredCount, correctSoFar }: QuizProgressProps) {
  const percentAnswered = (answeredCount / total) * 100;
  return (
    <div className="progress">
      <div className="progress__labels">
        <span className="t-label">
          Question {questionNumber} of {total}
        </span>
        <span className="progress__score">{correctSoFar} correct so far</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label="Questions answered"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
      >
        <div className="progress__fill" style={{ width: `${percentAnswered}%` }} />
      </div>
    </div>
  );
}
