import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import {
  QuizSchema,
  sanitizeQuiz,
  type Quiz,
  type QuizRequest,
  type TutorRequest,
} from "../shared/quiz.js";

const MODEL = "claude-opus-5-5";

// Server-side refusal fallback: if a request is declined by a safety
// classifier, the API re-runs it on a suitable fallback model in the same call.
const FALLBACK = {
  betas: ["server-side-fallback-2026-07-01"] as Anthropic.Beta.AnthropicBeta[],
  fallbacks: "default" as const,
};

let client: Anthropic | null = null;
function getClient(): Anthropic {
  // Resolves ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN or an `ant auth login` profile.
  client ??= new Anthropic();
  return client;
}

/** Thrown when Claude can't be reached for a reason the sample bank can cover. */
export class AiUnavailableError extends Error {}

const QUIZ_SYSTEM = `You write multiple-choice practice quizzes for Loop, a friendly community learning app.

Voice: optimistic, plain language, encouraging — like a patient older classmate. Never condescending.

For every question:
- Exactly four options. One is clearly correct; the distractors reflect real, common misconceptions.
- Vary the position of the correct answer across the quiz.
- The hint nudges toward the method without giving the answer away.
- The explanation teaches the "why": a headline that names the right answer and reads well whether the learner got it right or wrong, two or three sentences of reasoning, two to four short worked steps, and a quick way to check.
- Match the difficulty to the learner's level.
- Keep options short (under ~12 words). Use Unicode for math and chemistry (×, ÷, −, ², CO₂) rather than LaTeX.
- Set "context" to an empty string unless a short framing line genuinely helps.`;

const TUTOR_SYSTEM = `You are Loop's AI study buddy. A learner just answered a multiple-choice question and has a follow-up.
Reply in at most 120 words of plain text (no markdown headings). Be warm and specific, show the reasoning, and end with a short check-for-understanding question when it helps.
If they picked a wrong option, explain kindly what misconception that option reflects.
Stay on the topic of the question; politely steer back if asked about something unrelated.`;

/** Maps SDK failures: connection/auth problems fall back to samples, API errors surface. */
function wrap(error: unknown): never {
  if (
    error instanceof Anthropic.AuthenticationError ||
    error instanceof Anthropic.PermissionDeniedError ||
    error instanceof Anthropic.APIConnectionError
  ) {
    throw new AiUnavailableError(error.message);
  }
  if (error instanceof Anthropic.APIError) throw error;
  // Anything else comes from the client before a request is sent — most often
  // "Could not resolve authentication method" when no credentials are configured.
  throw new AiUnavailableError(error instanceof Error ? error.message : String(error));
}

export async function generateQuiz(req: QuizRequest): Promise<Quiz> {
  const response = await getClient()
    .beta.messages.parse({
      model: MODEL,
      max_tokens: 16000,
      ...FALLBACK,
      output_config: {
        effort: "medium",
        format: betaZodOutputFormat(QuizSchema),
      },
      system: QUIZ_SYSTEM,
      messages: [
        {
          role: "user",
          content: `Create a ${req.count}-question quiz.
Topic: ${req.topic}
Subject: ${req.subject}
Level: ${req.level}`,
        },
      ],
    })
    .catch(wrap);

  if (response.stop_reason === "refusal") {
    throw new Error("That topic couldn’t be turned into a quiz. Try rephrasing it.");
  }
  if (!response.parsed_output) {
    throw new Error("The quiz came back incomplete. Please try again.");
  }
  const quiz = sanitizeQuiz(
    { ...response.parsed_output, subject: req.subject, level: req.level },
    req.count,
  );
  if (quiz.questions.length === 0) {
    throw new Error("The quiz came back empty. Please try again.");
  }
  return quiz;
}

export async function tutorReply(req: TutorRequest): Promise<string> {
  const q = req.question;
  const letters = ["A", "B", "C", "D"];
  const optionList = q.options.map((o, i) => `${letters[i]}. ${o}`).join("\n");
  const response = await getClient()
    .beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      ...FALLBACK,
      output_config: { effort: "low" },
      system: TUTOR_SYSTEM,
      messages: [
        {
          role: "user",
          content: `Question: ${q.prompt}
${optionList}
Correct answer: ${letters[q.answerIndex]}
Learner picked: ${letters[req.chosenIndex]}
Reference explanation: ${q.explanation.why} ${q.explanation.steps.join(" → ")}

Learner's follow-up: ${req.message}`,
        },
      ],
    })
    .catch(wrap);

  if (response.stop_reason === "refusal") {
    return "I can’t help with that one — let’s stick to the question. What part of the explanation felt fuzzy?";
  }
  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("")
    .trim();
  return text || "Let’s look at it another way — which step felt unclear?";
}
