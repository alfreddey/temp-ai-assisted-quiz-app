import type { TutorRequest } from "../../shared/schema.js";
import { getClient, MODEL, REFUSAL_FALLBACK } from "./client.js";
import { toAiError } from "./errors.js";
import { TUTOR_SYSTEM_PROMPT, tutorUserPrompt } from "./prompts.js";

const TUTOR_MAX_TOKENS = 2000;
const REFUSAL_REPLY =
  "I can’t help with that one. Let’s stick to the question. What part of the explanation felt fuzzy?";
const EMPTY_REPLY = "Let’s look at it another way. Which step felt unclear?";

export async function tutorReply(request: TutorRequest): Promise<string> {
  const response = await getClient()
    .beta.messages.create({
      model: MODEL,
      max_tokens: TUTOR_MAX_TOKENS,
      ...REFUSAL_FALLBACK,
      output_config: { effort: "low" },
      system: TUTOR_SYSTEM_PROMPT,
      messages: [{ role: "user", content: tutorUserPrompt(request) }],
    })
    .catch(toAiError);

  if (response.stop_reason === "refusal") return REFUSAL_REPLY;

  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("")
    .trim();
  return text || EMPTY_REPLY;
}
