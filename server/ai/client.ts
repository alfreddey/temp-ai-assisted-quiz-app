import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-5-5";

// Server-side refusal fallback: if a safety classifier declines a request,
// the API re-runs it on a suitable fallback model in the same call.
export const REFUSAL_FALLBACK = {
  betas: ["server-side-fallback-2026-07-01"] as Anthropic.Beta.AnthropicBeta[],
  fallbacks: "default" as const,
};

let client: Anthropic | null = null;

/** Resolves ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN or an `ant auth login` profile. */
export function getClient(): Anthropic {
  client ??= new Anthropic();
  return client;
}
