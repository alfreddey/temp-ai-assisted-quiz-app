/** The top-level destinations shared by the top nav, sidebar and mobile nav. */
export type NavTarget = "home" | "history";

export const NAV_LABELS: Record<NavTarget, string> = {
  home: "For you",
  history: "My quizzes",
};
