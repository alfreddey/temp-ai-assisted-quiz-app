import type { Subject } from "../../shared/catalog.js";
import type { Quiz, QuizRequest } from "../../shared/schema.js";
import { mathematicsQuiz } from "./mathematics.js";
import { biologyQuiz } from "./biology.js";
import { chemistryQuiz } from "./chemistry.js";
import { physicsQuiz } from "./physics.js";
import { englishQuiz } from "./english.js";
import { historyQuiz } from "./history.js";

// Offline quizzes used when Claude isn't available, so the app stays playable in demos and tests.
const SAMPLE_QUIZZES: Record<Subject, Quiz> = {
  Mathematics: mathematicsQuiz,
  Biology: biologyQuiz,
  Chemistry: chemistryQuiz,
  Physics: physicsQuiz,
  English: englishQuiz,
  History: historyQuiz,
};

export function sampleQuiz(request: QuizRequest): Quiz {
  const quiz = SAMPLE_QUIZZES[request.subject];
  return {
    ...quiz,
    level: request.level,
    questions: quiz.questions.slice(0, request.count),
  };
}
