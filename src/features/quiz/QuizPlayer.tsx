import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import type { Quiz } from "../../../shared/schema";
import { Badge } from "../../components/ui";
import { AnswerOptions } from "./AnswerOptions";
import { StudyBuddy } from "./buddy/StudyBuddy";
import { Explanation } from "./Explanation";
import { HintNote } from "./HintNote";
import { QuestionActions } from "./QuestionActions";
import { QuizHeader } from "./QuizHeader";
import { QuizProgress } from "./QuizProgress";
import { useAnswerShortcuts } from "./useAnswerShortcuts";
import { useQuizSession } from "./useQuizSession";

interface QuizPlayerProps {
  quiz: Quiz;
  /** Shown above the quiz, for example when sample content is being used. */
  notice?: string;
  onFinish: (answers: number[]) => void;
  onExit: () => void;
}

export function QuizPlayer({ quiz, notice, onFinish, onExit }: QuizPlayerProps) {
  const session = useQuizSession(quiz, onFinish);
  const { question, questionIndex, total, checked, selected } = session;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => headingRef.current?.focus(), [questionIndex]);

  useAnswerShortcuts({
    onSelect: session.select,
    onConfirm: checked ? session.advance : session.check,
  });

  return (
    <div className="player">
      <QuizHeader subject={quiz.subject} title={quiz.title} onExit={onExit} />

      {notice && (
        <p className="notice" role="status">
          <Info size={18} aria-hidden /> {notice}
        </p>
      )}

      <QuizProgress
        questionNumber={questionIndex + 1}
        total={total}
        answeredCount={session.answeredCount}
        correctSoFar={session.correctSoFar}
      />

      <article className="card question-card question-card--live">
        <div className="question-card__meta">
          <p className="meta">
            <span className="meta__subject">{quiz.subject}</span>
            <span className="meta__level">•&nbsp;&nbsp;{quiz.level}</span>
          </p>
          <Badge tone="neutral">
            {questionIndex + 1}/{total}
          </Badge>
        </div>
        <div className="question-card__content">
          <h1 className="question-card__title" tabIndex={-1} ref={headingRef}>
            {question.prompt}
          </h1>
          {question.context && <p className="question-card__body">{question.context}</p>}
        </div>

        <AnswerOptions
          options={question.options}
          answerIndex={question.answerIndex}
          selected={selected}
          checked={checked}
          onSelect={session.select}
        />

        {session.hintOpen && !checked && <HintNote hint={question.hint} />}

        <QuestionActions
          checked={checked}
          isCorrect={session.isCorrect}
          isLastQuestion={session.isLastQuestion}
          hasSelection={selected !== null}
          hintOpen={session.hintOpen}
          onToggleHint={session.toggleHint}
          onCheck={session.check}
          onNext={session.advance}
        />
      </article>

      {checked && selected !== null && (
        <>
          <Explanation question={question} correct={session.isCorrect} />
          <StudyBuddy key={questionIndex} question={question} chosenIndex={selected} />
        </>
      )}
    </div>
  );
}
