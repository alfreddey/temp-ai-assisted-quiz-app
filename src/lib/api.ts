import type { QuizResponse, TutorResponse } from "../../shared/api";
import type { Question, QuizRequest } from "../../shared/schema";

const FALLBACK_ERROR = "Something went wrong. Please try again.";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? FALLBACK_ERROR);
  return data as T;
}

export function requestQuiz(request: QuizRequest): Promise<QuizResponse> {
  return postJson("/api/quiz", request);
}

export function askTutor(
  question: Question,
  chosenIndex: number,
  message: string,
): Promise<TutorResponse> {
  return postJson("/api/tutor", { question, chosenIndex, message });
}
