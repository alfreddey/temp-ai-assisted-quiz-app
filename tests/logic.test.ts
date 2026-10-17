import { describe, expect, it } from "vitest";
import { sanitizeQuiz, type Quiz } from "../shared/quiz";
import { pointsFor, streakLength, weekActivity } from "../src/progress";
import { sampleQuiz } from "../server/samples";

const q = (options: string[], answerIndex: number) => ({
  prompt: "p",
  context: "",
  options,
  answerIndex,
  hint: "h",
  explanation: { headline: "x", why: "y", steps: ["s"], check: "c" },
});

describe("sanitizeQuiz", () => {
  const quiz: Quiz = {
    title: "t",
    subject: "Mathematics",
    level: "Middle school",
    questions: [
      q(["a", "b", "c", "d"], 2),
      q(["a", "b"], 5), // invalid answer index → dropped
      q(["a", "b", "c", "d", "e"], 4), // correct answer beyond 4 → kept in last slot
      q(["a", "b", "c", "d"], 0),
    ],
  };

  it("drops invalid questions and keeps the correct option when trimming", () => {
    const out = sanitizeQuiz(quiz, 10);
    expect(out.questions).toHaveLength(3);
    expect(out.questions[1].options).toEqual(["a", "b", "c", "e"]);
    expect(out.questions[1].answerIndex).toBe(3);
  });

  it("caps to the requested count", () => {
    expect(sanitizeQuiz(quiz, 2).questions).toHaveLength(2);
  });
});

describe("progress", () => {
  it("awards a perfect-run bonus", () => {
    expect(pointsFor(5, 5)).toBe(70);
    expect(pointsFor(3, 5)).toBe(30);
    expect(pointsFor(0, 0)).toBe(0);
  });

  it("counts a streak that survives until midnight", () => {
    const today = new Date(2026, 9, 17);
    expect(streakLength(["2026-10-15", "2026-10-16", "2026-10-17"], today)).toBe(3);
    expect(streakLength(["2026-10-15", "2026-10-16"], today)).toBe(2);
    expect(streakLength(["2026-10-14"], today)).toBe(0);
  });

  it("maps active days onto a Monday-first week", () => {
    // 2026-10-17 is a Saturday.
    const week = weekActivity(["2026-10-12", "2026-10-17"], new Date(2026, 9, 17));
    expect(week).toEqual([true, false, false, false, false, true, false]);
  });
});

describe("sample quizzes", () => {
  it("respects the requested count and answer indexes are valid", () => {
    const quiz = sampleQuiz({ topic: "anything", subject: "Biology", level: "High school", count: 3 });
    expect(quiz.questions).toHaveLength(3);
    expect(quiz.level).toBe("High school");
    for (const question of quiz.questions) {
      expect(question.options).toHaveLength(4);
      expect(question.answerIndex).toBeLessThan(4);
    }
  });
});
