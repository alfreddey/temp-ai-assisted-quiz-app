const DAYS_PER_WEEK = 7;

/** Formats a date as YYYY-MM-DD in the learner's local time. */
export function localDay(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** Consecutive active days ending today, or yesterday so a streak survives until midnight. */
export function streakLength(activeDays: string[], today = new Date()): number {
  const active = new Set(activeDays);
  let cursor = active.has(localDay(today)) ? today : addDays(today, -1);
  let streak = 0;
  while (active.has(localDay(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Monday-first flags for whether each day of the current week was active. */
export function weekActivity(activeDays: string[], today = new Date()): boolean[] {
  const active = new Set(activeDays);
  const daysSinceMonday = (today.getDay() + 6) % DAYS_PER_WEEK;
  const monday = addDays(today, -daysSinceMonday);
  return Array.from({ length: DAYS_PER_WEEK }, (_, offset) =>
    active.has(localDay(addDays(monday, offset))),
  );
}
