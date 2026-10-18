import type { Quiz } from "./schema.js";

/** "ai" when Claude wrote the content, "sample" when the server fell back to built-in content. */
export type ContentSource = "ai" | "sample";

export interface QuizResponse {
  quiz: Quiz;
  source: ContentSource;
  notice?: string;
}

export interface TutorResponse {
  reply: string;
  source: ContentSource;
}

export interface ErrorResponse {
  error: string;
}
