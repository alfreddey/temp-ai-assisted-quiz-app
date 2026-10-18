import { describe, expect, it } from "vitest";
import { streakLength, weekActivity } from "../src/progress/dates";
import { levelFor, maxPointsFor, pointsFor } from "../src/progress/points";

describe("points", () => {
  it("awards a perfect-run bonus", () => {
    expect(pointsFor(5, 5)).toBe(70);
    expect(pointsFor(3, 5)).toBe(30);
    expect(pointsFor(0, 0)).toBe(0);
    expect(maxPointsFor(5)).toBe(70);
  });

  it("levels up every 100 points", () => {
    expect(levelFor(0)).toBe(1);
    expect(levelFor(250)).toBe(3);
  });
});

describe("streaks", () => {
  // 2026-10-17 is a Saturday.
  const saturday = new Date(2026, 9, 17);

  it("counts a streak that survives until midnight", () => {
    expect(streakLength(["2026-10-15", "2026-10-16", "2026-10-17"], saturday)).toBe(3);
    expect(streakLength(["2026-10-15", "2026-10-16"], saturday)).toBe(2);
    expect(streakLength(["2026-10-14"], saturday)).toBe(0);
  });

  it("maps active days onto a Monday-first week", () => {
    const week = weekActivity(["2026-10-12", "2026-10-17"], saturday);
    expect(week).toEqual([true, false, false, false, false, true, false]);
  });
});
