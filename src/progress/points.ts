const POINTS_PER_CORRECT_ANSWER = 10;
const PERFECT_RUN_BONUS = 20;
const POINTS_PER_LEVEL = 100;

export function pointsFor(score: number, total: number): number {
  const isPerfect = total > 0 && score === total;
  return score * POINTS_PER_CORRECT_ANSWER + (isPerfect ? PERFECT_RUN_BONUS : 0);
}

export function levelFor(points: number): number {
  return Math.floor(points / POINTS_PER_LEVEL) + 1;
}

/** The most points one quiz of this size can earn. */
export function maxPointsFor(questionCount: number): number {
  return pointsFor(questionCount, questionCount);
}
