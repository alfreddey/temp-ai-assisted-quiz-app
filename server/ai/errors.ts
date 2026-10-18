import Anthropic from "@anthropic-ai/sdk";

/** Thrown when Claude can't be reached for a reason the sample content can cover. */
export class AiUnavailableError extends Error {}

/** Thrown when Claude answered but the result can't be used. The message is safe to show. */
export class AiResultError extends Error {}

/** Maps SDK failures: connection and auth problems fall back to samples, API errors surface. */
export function toAiError(error: unknown): never {
  if (
    error instanceof Anthropic.AuthenticationError ||
    error instanceof Anthropic.PermissionDeniedError ||
    error instanceof Anthropic.APIConnectionError
  ) {
    throw new AiUnavailableError(error.message);
  }
  if (error instanceof Anthropic.APIError) throw error;
  // Anything else comes from the client before a request is sent, most often
  // "Could not resolve authentication method" when no credentials are configured.
  throw new AiUnavailableError(error instanceof Error ? error.message : String(error));
}
