import type {
  Question,
  QuizRequest,
  QuizResponse,
  TutorResponse,
} from "../shared/quiz";

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
  return data as T;
}

export const requestQuiz = (req: QuizRequest) => post<QuizResponse>("/api/quiz", req);

export const askTutor = (question: Question, chosenIndex: number, message: string) =>
  post<TutorResponse>("/api/tutor", { question, chosenIndex, message });
