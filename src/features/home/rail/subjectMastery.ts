import { SUBJECTS, type Subject } from "../../../../shared/catalog";
import type { QuizRecord } from "../../../progress/types";

export interface SubjectMastery {
  subject: Subject;
  quizCount: number;
  accuracyPercent: number;
}

/** Accuracy per subject the learner has practised, most practised first. */
export function subjectMastery(history: QuizRecord[], limit: number): SubjectMastery[] {
  return SUBJECTS.map((subject) => {
    const records = history.filter((record) => record.subject === subject);
    const correct = records.reduce((sum, record) => sum + record.score, 0);
    const answered = records.reduce((sum, record) => sum + record.total, 0);
    return {
      subject,
      quizCount: records.length,
      accuracyPercent: answered ? Math.round((correct / answered) * 100) : 0,
    };
  })
    .filter((row) => row.quizCount > 0)
    .sort((a, b) => b.quizCount - a.quizCount)
    .slice(0, limit);
}
