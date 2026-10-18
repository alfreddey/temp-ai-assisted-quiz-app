import type { Question } from "../../../../shared/schema";

/** One-tap follow-ups, tailored to whether the learner got the question right. */
export function starterQuestions(question: Question, chosenIndex: number): string[] {
  if (chosenIndex === question.answerIndex) {
    return ["Why are the other options wrong?", "Give me a harder one like this"];
  }
  return [`Why isn’t “${question.options[chosenIndex]}” right?`, "Explain it a different way"];
}
