import type { Quiz, QuizRequest } from "../../shared/schema";

/** Which screen is showing, with the data that screen needs. */
export type View =
  | { kind: "home" }
  | { kind: "quiz"; quiz: Quiz; request: QuizRequest; notice?: string }
  | { kind: "results"; quiz: Quiz; request: QuizRequest; answers: number[] };

export const HOME_VIEW: View = { kind: "home" };
