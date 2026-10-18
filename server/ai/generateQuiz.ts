import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { sanitizeQuiz } from "../../shared/sanitize.js";
import { QuizSchema, type Quiz, type QuizRequest } from "../../shared/schema.js";
import { getClient, MODEL, REFUSAL_FALLBACK } from "./client.js";
import { AiResultError, toAiError } from "./errors.js";
import { QUIZ_SYSTEM_PROMPT, quizUserPrompt } from "./prompts.js";

const QUIZ_MAX_TOKENS = 16000;

export async function generateQuiz(request: QuizRequest): Promise<Quiz> {
  const response = await getClient()
    .beta.messages.parse({
      model: MODEL,
      max_tokens: QUIZ_MAX_TOKENS,
      ...REFUSAL_FALLBACK,
      output_config: {
        effort: "medium",
        format: betaZodOutputFormat(QuizSchema),
      },
      system: QUIZ_SYSTEM_PROMPT,
      messages: [{ role: "user", content: quizUserPrompt(request) }],
    })
    .catch(toAiError);

  if (response.stop_reason === "refusal") {
    throw new AiResultError("That topic couldn’t be turned into a quiz. Try rephrasing it.");
  }
  if (!response.parsed_output) {
    throw new AiResultError("The quiz came back incomplete. Please try again.");
  }

  const quiz = sanitizeQuiz(
    { ...response.parsed_output, subject: request.subject, level: request.level },
    request.count,
  );
  if (quiz.questions.length === 0) {
    throw new AiResultError("The quiz came back empty. Please try again.");
  }
  return quiz;
}
