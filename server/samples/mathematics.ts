import type { Quiz } from "../../shared/schema.js";

export const mathematicsQuiz: Quiz = {
  title: "Linear equations warm-up",
  subject: "Mathematics",
  level: "Middle school",
  questions: [
    {
      prompt: "Solve for x: 3x + 7 = 22",
      context: "Get x by itself. Whatever you do to one side, do to the other.",
      options: ["x = 3", "x = 5", "x = 7", "x = 15"],
      answerIndex: 1,
      hint: "Undo the + 7 first, then undo the multiplication by 3.",
      explanation: {
        headline: "x = 5. Undo each step in reverse.",
        why: "We isolate x by reversing each operation in the opposite order it was applied.",
        steps: ["3x + 7 = 22 → subtract 7 → 3x = 15", "Divide both sides by 3 → x = 5"],
        check: "3(5) + 7 = 22. It works!",
      },
    },
    {
      prompt: "Solve for y: 2y − 4 = 10",
      context: "",
      options: ["y = 3", "y = 5", "y = 7", "y = 14"],
      answerIndex: 2,
      hint: "Add 4 to both sides before dividing.",
      explanation: {
        headline: "Nice work, y = 7.",
        why: "Adding 4 cancels the − 4, leaving 2y alone so we can divide.",
        steps: ["2y − 4 = 10 → add 4 → 2y = 14", "Divide both sides by 2 → y = 7"],
        check: "2(7) − 4 = 10. ✓",
      },
    },
    {
      prompt: "Which equation has the solution x = −2?",
      context: "Substitute −2 into each one and see which balances.",
      options: ["x + 5 = 7", "4x = 8", "x − 3 = −5", "2x + 1 = 3"],
      answerIndex: 2,
      hint: "Plug x = −2 into each equation. Only one will balance.",
      explanation: {
        headline: "x − 3 = −5 is the one.",
        why: "Substituting is a fast way to test a candidate solution without solving each equation.",
        steps: ["−2 − 3 = −5", "Both sides equal −5, so x = −2 is a solution"],
        check: "The others give 3 = 7, −8 = 8 and −3 = 3, which are all false.",
      },
    },
    {
      prompt: "A phone plan costs $15 plus $2 per GB. Your bill is $27. How many GB did you use?",
      context: "Write it as an equation first: 15 + 2g = 27.",
      options: ["4 GB", "6 GB", "12 GB", "21 GB"],
      answerIndex: 1,
      hint: "Remove the fixed $15 before thinking about the per-GB price.",
      explanation: {
        headline: "6 GB. You translated the story perfectly.",
        why: "The fixed fee comes off first; what’s left is the usage charge.",
        steps: ["15 + 2g = 27 → subtract 15 → 2g = 12", "Divide by 2 → g = 6"],
        check: "15 + 2(6) = 27. ✓",
      },
    },
    {
      prompt: "Solve: 5(x − 1) = 20",
      context: "",
      options: ["x = 3", "x = 4", "x = 5", "x = 21/5"],
      answerIndex: 2,
      hint: "You can divide both sides by 5 before touching the brackets.",
      explanation: {
        headline: "x = 5. Clean work!",
        why: "Dividing by 5 first keeps the numbers small; expanding works too.",
        steps: ["5(x − 1) = 20 → divide by 5 → x − 1 = 4", "Add 1 → x = 5"],
        check: "5(5 − 1) = 5 × 4 = 20. ✓",
      },
    },
  ],
};
