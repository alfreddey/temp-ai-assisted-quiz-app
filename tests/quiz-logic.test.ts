import { describe, expect, it } from "vitest";
import { countCorrect } from "../shared/scoring";
import { sampleQuiz } from "../server/samples/index";
import { encouragementFor } from "../src/features/results/encouragement";
import { subjectMastery } from "../src/features/home/rail/subjectMastery";
import type { QuizRecord } from "../src/progress/types";

describe("sample quizzes", () => {
  it("respect the requested count and have valid answers", () => {
    const quiz = sampleQuiz({ topic: "anything", subject: "Biology", level: "High school", count: 3 });
    expect(quiz.questions).toHaveLength(3);
    expect(quiz.level).toBe("High school");
    for (const question of quiz.questions) {
      expect(question.options).toHaveLength(4);
      expect(question.answerIndex).toBeLessThan(4);
    }
  });
});

describe("countCorrect", () => {
  it("counts answers that match the answer index", () => {
    const quiz = sampleQuiz({ topic: "anything", subject: "Mathematics", level: "Middle school", count: 3 });
    const answers = quiz.questions.map((question) => question.answerIndex);
    answers[0] = (answers[0] + 1) % 4;
    expect(countCorrect(quiz, answers)).toBe(2);
  });
});

describe("encouragementFor", () => {
  it("picks the message for the score band", () => {
    expect(encouragementFor(1).title).toMatch(/Flawless/);
    expect(encouragementFor(0.8).title).toBe("Strong work!");
    expect(encouragementFor(0).title).toBe("Every question is a good start.");
  });
});

describe("subjectMastery", () => {
  const record = (subject: QuizRecord["subject"], score: number, total: number): QuizRecord => ({
    id: `${subject}-${score}`,
    title: "title",
    topic: "topic",
    subject,
    level: "Middle school",
    score,
    total,
    completedAt: "2026-10-17T00:00:00.000Z",
  });

  it("averages accuracy and sorts by how often a subject was practised", () => {
    const rows = subjectMastery(
      [record("Biology", 4, 5), record("Physics", 1, 4), record("Physics", 3, 4)],
      4,
    );
    expect(rows.map((row) => row.subject)).toEqual(["Physics", "Biology"]);
    expect(rows[0].accuracyPercent).toBe(50);
    expect(rows[1].accuracyPercent).toBe(80);
  });
});
