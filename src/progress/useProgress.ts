import { useCallback, useEffect, useState } from "react";
import { localDay } from "./dates";
import { pointsFor } from "./points";
import { loadProgress, saveProgress } from "./storage";
import type { Progress, QuizRecord } from "./types";

const MAX_HISTORY = 50;
const MAX_ACTIVE_DAYS = 60;

export type NewQuizRecord = Omit<QuizRecord, "id" | "completedAt">;

function withRecord(progress: Progress, record: NewQuizRecord): Progress {
  const today = localDay();
  const savedRecord: QuizRecord = {
    ...record,
    id: crypto.randomUUID(),
    completedAt: new Date().toISOString(),
  };
  const activeDays = progress.activeDays.includes(today)
    ? progress.activeDays
    : [...progress.activeDays, today].slice(-MAX_ACTIVE_DAYS);

  return {
    ...progress,
    points: progress.points + pointsFor(record.score, record.total),
    history: [savedRecord, ...progress.history].slice(0, MAX_HISTORY),
    activeDays,
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => saveProgress(progress), [progress]);

  const recordQuiz = useCallback((record: NewQuizRecord) => {
    setProgress((previous) => withRecord(previous, record));
  }, []);

  return { progress, recordQuiz };
}
