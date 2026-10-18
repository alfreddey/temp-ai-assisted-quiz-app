import { useState } from "react";
import type { Quiz, QuizRequest } from "../../shared/schema";
import { countCorrect } from "../../shared/scoring";
import { requestQuiz } from "../lib/api";
import type { NewQuizRecord } from "../progress/useProgress";
import { HOME_VIEW, type View } from "./views";

/** Moves between home, quiz and results, and asks the server for new quizzes. */
export function useQuizFlow(recordQuiz: (record: NewQuizRecord) => void) {
  const [view, setView] = useState<View>(HOME_VIEW);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(request: QuizRequest) {
    if (generating) return;
    setGenerating(true);
    setError(null);
    // Generation shows its progress in the composer, so return home while it runs.
    setView(HOME_VIEW);
    try {
      const { quiz, notice } = await requestQuiz(request);
      setView({ kind: "quiz", quiz, request, notice });
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  function finish(quiz: Quiz, request: QuizRequest, answers: number[]) {
    recordQuiz({
      title: quiz.title,
      topic: request.topic,
      subject: request.subject,
      level: request.level,
      score: countCorrect(quiz, answers),
      total: quiz.questions.length,
    });
    setView({ kind: "results", quiz, request, answers });
  }

  return {
    view,
    generating,
    error,
    generate: (request: QuizRequest) => void generate(request),
    finish,
    goHome: () => setView(HOME_VIEW),
  };
}
