import { z } from "zod";

export const SUBJECTS = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "English",
  "History",
] as const;
export type Subject = (typeof SUBJECTS)[number];

export const LEVELS = ["Middle school", "High school", "University"] as const;
export type Level = (typeof LEVELS)[number];

export const QuestionSchema = z.object({
  prompt: z.string().describe("The question itself, one or two sentences."),
  context: z
    .string()
    .describe("Optional short framing shown under the question. Empty string if none."),
  options: z.array(z.string()).describe("Exactly four answer choices."),
  answerIndex: z.number().int().describe("Zero-based index of the correct option."),
  hint: z
    .string()
    .describe("A nudge toward the method that does not reveal the answer."),
  explanation: z.object({
    headline: z
      .string()
      .describe("One encouraging sentence that states the correct answer."),
    why: z.string().describe("Plain-language reasoning in two or three sentences."),
    steps: z
      .array(z.string())
      .describe("Two to four short worked steps. The last step reaches the answer."),
    check: z.string().describe("A one-line way for the learner to verify the answer."),
  }),
});

export const QuizSchema = z.object({
  title: z.string().describe("Short, friendly quiz title."),
  subject: z.string(),
  level: z.string(),
  questions: z.array(QuestionSchema),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;

export const QuizRequestSchema = z.object({
  topic: z.string().trim().min(3).max(200),
  subject: z.enum(SUBJECTS),
  level: z.enum(LEVELS),
  count: z.number().int().min(3).max(10),
});
export type QuizRequest = z.infer<typeof QuizRequestSchema>;

export const TutorRequestSchema = z.object({
  question: QuestionSchema,
  chosenIndex: z.number().int().min(0).max(3),
  message: z.string().trim().min(1).max(500),
});
export type TutorRequest = z.infer<typeof TutorRequestSchema>;

export type QuizSource = "ai" | "sample";

export interface QuizResponse {
  quiz: Quiz;
  source: QuizSource;
  notice?: string;
}

export interface TutorResponse {
  reply: string;
  source: QuizSource;
}

/** Normalises model output so the UI can rely on four options and a valid answer index. */
export function sanitizeQuiz(quiz: Quiz, count: number): Quiz {
  const questions = quiz.questions
    .filter(
      (q) =>
        q.options.length >= 2 &&
        q.answerIndex >= 0 &&
        q.answerIndex < q.options.length,
    )
    .map((q) => {
      if (q.options.length <= 4) return q;
      // Keep the correct option when trimming extras.
      const kept = q.options.slice(0, 4);
      if (q.answerIndex < 4) return { ...q, options: kept };
      kept[3] = q.options[q.answerIndex];
      return { ...q, options: kept, answerIndex: 3 };
    })
    .slice(0, count);
  return { ...quiz, questions };
}
