import { Router } from "express";
import type { ErrorResponse, TutorResponse } from "../../shared/api.js";
import { TutorRequestSchema, type Question } from "../../shared/schema.js";
import { AiUnavailableError } from "../ai/errors.js";
import { tutorReply } from "../ai/tutorReply.js";
import { config } from "../config.js";

const INVALID_REQUEST = "Ask a question about this problem.";
const TUTOR_FAILED = "The study buddy couldn’t answer just now. Try again.";

/** Builds a reply from the question's own explanation when Claude isn't available. */
function offlineReply(question: Question): TutorResponse {
  const { why, steps, check } = question.explanation;
  return {
    reply: `${why} ${steps.join(" → ")}. ${check} (Connect Claude for personalised follow-ups.)`,
    source: "sample",
  };
}

export const tutorRouter = Router();

tutorRouter.post("/", async (req, res) => {
  const parsed = TutorRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: INVALID_REQUEST } satisfies ErrorResponse);
    return;
  }

  if (config.demoMode) {
    res.json(offlineReply(parsed.data.question));
    return;
  }

  try {
    const reply = await tutorReply(parsed.data);
    res.json({ reply, source: "ai" } satisfies TutorResponse);
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      res.json(offlineReply(parsed.data.question));
      return;
    }
    console.error("[tutor]", error);
    res.status(502).json({ error: TUTOR_FAILED } satisfies ErrorResponse);
  }
});
