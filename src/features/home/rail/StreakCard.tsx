import { Check, Flame } from "lucide-react";
import { classNames } from "../../../lib/classNames";
import { streakLength, weekActivity } from "../../../progress/dates";

const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakCard({ activeDays }: { activeDays: string[] }) {
  const streak = streakLength(activeDays);
  const week = weekActivity(activeDays);
  const message =
    streak > 0
      ? "One quiz today keeps the streak alive and brings you closer to your weekly goal."
      : "Finish one quiz today to light your first spark.";

  return (
    <section className="streak-card" aria-labelledby="streak-heading">
      <div className="streak-card__heading">
        <h2 id="streak-heading">Keep your spark.</h2>
        <Flame size={26} aria-hidden />
      </div>
      <p className="streak-card__value">{streak}-day streak</p>
      <ol className="streak-card__week" aria-label="This week">
        {week.map((practised, dayIndex) => (
          <li key={dayIndex}>
            <span className={classNames("streak-day", practised && "is-done")}>
              {practised && <Check size={15} strokeWidth={3} aria-hidden />}
            </span>
            <span aria-hidden>{WEEKDAY_INITIALS[dayIndex]}</span>
            <span className="sr-only">{practised ? "practised" : "not yet"}</span>
          </li>
        ))}
      </ol>
      <p className="streak-card__copy">{message}</p>
    </section>
  );
}
