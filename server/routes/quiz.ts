import { Router } from "express";
import type { ErrorResponse, QuizResponse } from "../../shared/api.js";
import { QuizRequestSchema } from "../../shared/schema.js";
import { AiResultError, AiUnavailableError } from "../ai/errors.js";
import { generateQuiz } from "../ai/generateQuiz.js";
import { config } from "../config.js";
import { sampleQuiz } from "../samples/index.js";

const INVALID_REQUEST = "Add a topic of at least 3 characters.";
const GENERATION_FAILED = "Quiz generation failed. Please try again.";

const sampleNotice = (subject: string) =>
  `Claude isn’t connected, so here’s a sample ${subject} quiz. Set ANTHROPIC_API_KEY to generate quizzes on any topic.`;

export const quizRouter = Router();

quizRouter.post("/", async (req, res) => {
  const parsed = QuizRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: INVALID_REQUEST } satisfies ErrorResponse);
    return;
  }
  const request = parsed.data;

  if (config.demoMode) {
    res.json({ quiz: sampleQuiz(request), source: "sample" } satisfies QuizResponse);
    return;
  }

  try {
    const quiz = await generateQuiz(request);
    res.json({ quiz, source: "ai" } satisfies QuizResponse);
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      console.warn("[quiz] Claude unavailable, serving sample quiz:", error.message);
      res.json({
        quiz: sampleQuiz(request),
        source: "sample",
        notice: sampleNotice(request.subject),
      } satisfies QuizResponse);
      return;
    }
    console.error("[quiz]", error);
    const message = error instanceof AiResultError ? error.message : GENERATION_FAILED;
    res.status(502).json({ error: message } satisfies ErrorResponse);
  }
});
