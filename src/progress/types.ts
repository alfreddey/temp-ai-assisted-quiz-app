import type { Subject } from "../../shared/catalog";

export interface QuizRecord {
  id: string;
  title: string;
  topic: string;
  subject: Subject;
  level: string;
  score: number;
  total: number;
  /** ISO timestamp. */
  completedAt: string;
}

export interface Progress {
  name: string;
  points: number;
  history: QuizRecord[];
  /** Local dates (YYYY-MM-DD) with at least one finished quiz. */
  activeDays: string[];
}
