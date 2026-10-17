import { useCallback, useEffect, useState } from "react";
import type { Subject } from "../shared/quiz";

export interface QuizRecord {
  id: string;
  title: string;
  topic: string;
  subject: Subject;
  level: string;
  score: number;
  total: number;
  completedAt: string; // ISO timestamp
}

export interface Progress {
  name: string;
  points: number;
  history: QuizRecord[];
  activeDays: string[]; // YYYY-MM-DD, local time
}

const KEY = "loop-quiz-progress-v1";
const DEFAULT: Progress = { name: "Jamie", points: 0, history: [], activeDays: [] };

/** Points: 10 per correct answer, +20 bonus for a perfect run. */
export function pointsFor(score: number, total: number): number {
  return score * 10 + (score === total && total > 0 ? 20 : 0);
}

export function localDay(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Consecutive active days ending today (or yesterday, so a streak survives until midnight). */
export function streakLength(activeDays: string[], today = new Date()): number {
  const set = new Set(activeDays);
  const cursor = new Date(today);
  if (!set.has(localDay(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(localDay(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Monday-first flags for the current week. */
export function weekActivity(activeDays: string[], today = new Date()): boolean[] {
  const set = new Set(activeDays);
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return set.has(localDay(day));
  });
}

export function levelFor(points: number): number {
  return Math.floor(points / 100) + 1;
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // Storage can be unavailable (private mode); progress stays in memory.
    }
  }, [progress]);

  const recordQuiz = useCallback((record: Omit<QuizRecord, "id" | "completedAt">) => {
    setProgress((prev) => {
      const today = localDay();
      return {
        ...prev,
        points: prev.points + pointsFor(record.score, record.total),
        history: [
          { ...record, id: crypto.randomUUID(), completedAt: new Date().toISOString() },
          ...prev.history,
        ].slice(0, 50),
        activeDays: prev.activeDays.includes(today)
          ? prev.activeDays
          : [...prev.activeDays, today].slice(-60),
      };
    });
  }, []);

  return { progress, recordQuiz };
}
