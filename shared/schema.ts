import { z } from "zod";
import {
  LEVELS,
  MAX_QUESTIONS,
  MAX_TOPIC_LENGTH,
  MAX_TUTOR_MESSAGE_LENGTH,
  MIN_QUESTIONS,
  MIN_TOPIC_LENGTH,
  OPTIONS_PER_QUESTION,
  SUBJECTS,
} from "./catalog.js";

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

export const QuizRequestSchema = z.object({
  topic: z.string().trim().min(MIN_TOPIC_LENGTH).max(MAX_TOPIC_LENGTH),
  subject: z.enum(SUBJECTS),
  level: z.enum(LEVELS),
  count: z.number().int().min(MIN_QUESTIONS).max(MAX_QUESTIONS),
});

export const TutorRequestSchema = z.object({
  question: QuestionSchema,
  chosenIndex: z.number().int().min(0).max(OPTIONS_PER_QUESTION - 1),
  message: z.string().trim().min(1).max(MAX_TUTOR_MESSAGE_LENGTH),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type QuizRequest = z.infer<typeof QuizRequestSchema>;
export type TutorRequest = z.infer<typeof TutorRequestSchema>;
