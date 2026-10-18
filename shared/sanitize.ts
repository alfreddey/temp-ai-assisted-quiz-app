import { OPTIONS_PER_QUESTION } from "./catalog.js";
import type { Question, Quiz } from "./schema.js";

function hasValidAnswer(question: Question): boolean {
  return (
    question.options.length >= 2 &&
    question.answerIndex >= 0 &&
    question.answerIndex < question.options.length
  );
}

/** Trims extra options while keeping the correct one in the last kept slot. */
function trimOptions(question: Question): Question {
  if (question.options.length <= OPTIONS_PER_QUESTION) return question;
  const keptOptions = question.options.slice(0, OPTIONS_PER_QUESTION);
  if (question.answerIndex < OPTIONS_PER_QUESTION) {
    return { ...question, options: keptOptions };
  }
  const lastSlot = OPTIONS_PER_QUESTION - 1;
  keptOptions[lastSlot] = question.options[question.answerIndex];
  return { ...question, options: keptOptions, answerIndex: lastSlot };
}

/** Normalises model output so the UI can rely on at most four options and a valid answer index. */
export function sanitizeQuiz(quiz: Quiz, maxQuestions: number): Quiz {
  const questions = quiz.questions
    .filter(hasValidAnswer)
    .map(trimOptions)
    .slice(0, maxQuestions);
  return { ...quiz, questions };
}
