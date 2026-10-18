import type { Quiz } from "./schema.js";

export function countCorrect(quiz: Quiz, answers: number[]): number {
  return answers.filter((answer, index) => answer === quiz.questions[index]?.answerIndex).length;
}
