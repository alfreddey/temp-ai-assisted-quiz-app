import { describe, expect, it } from "vitest";
import { sanitizeQuiz } from "../shared/sanitize";
import type { Question, Quiz } from "../shared/schema";

function makeQuestion(options: string[], answerIndex: number): Question {
  return {
    prompt: "prompt",
    context: "",
    options,
    answerIndex,
    hint: "hint",
    explanation: { headline: "headline", why: "why", steps: ["step"], check: "check" },
  };
}

const quiz: Quiz = {
  title: "title",
  subject: "Mathematics",
  level: "Middle school",
  questions: [
    makeQuestion(["a", "b", "c", "d"], 2),
    makeQuestion(["a", "b"], 5), // answer index out of range, so it's dropped
    makeQuestion(["a", "b", "c", "d", "e"], 4), // answer beyond four options, so it moves to the last slot
    makeQuestion(["a", "b", "c", "d"], 0),
  ],
};

describe("sanitizeQuiz", () => {
  it("drops invalid questions and keeps the correct option when trimming", () => {
    const result = sanitizeQuiz(quiz, 10);
    expect(result.questions).toHaveLength(3);
    expect(result.questions[1].options).toEqual(["a", "b", "c", "e"]);
    expect(result.questions[1].answerIndex).toBe(3);
  });

  it("caps the quiz to the requested number of questions", () => {
    expect(sanitizeQuiz(quiz, 2).questions).toHaveLength(2);
  });
});
