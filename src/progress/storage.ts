import type { Progress } from "./types";

const STORAGE_KEY = "loop-quiz-progress-v1";

export const DEFAULT_PROGRESS: Progress = {
  name: "Jamie",
  points: 0,
  history: [],
  activeDays: [],
};

export function loadProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_PROGRESS, ...JSON.parse(saved) } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage can be unavailable (private mode); progress then lives in memory only.
  }
}
