import type { Quiz } from "../../shared/schema.js";

export const physicsQuiz: Quiz = {
  title: "Forces and motion",
  subject: "Physics",
  level: "High school",
  questions: [
    {
      prompt: "A 2 kg cart accelerates at 3 m/s². What net force acts on it?",
      context: "Use Newton’s second law.",
      options: ["1.5 N", "5 N", "6 N", "9 N"],
      answerIndex: 2,
      hint: "F = m × a.",
      explanation: {
        headline: "6 N of net force.",
        why: "Newton’s second law says net force equals mass times acceleration.",
        steps: ["F = m × a", "F = 2 kg × 3 m/s² = 6 N"],
        check: "6 N ÷ 2 kg = 3 m/s². ✓",
      },
    },
    {
      prompt: "What is the speed of a runner who covers 100 m in 20 s?",
      context: "",
      options: ["2 m/s", "5 m/s", "20 m/s", "2,000 m/s"],
      answerIndex: 1,
      hint: "Speed = distance ÷ time.",
      explanation: {
        headline: "5 m/s.",
        why: "Average speed is how much distance is covered each second.",
        steps: ["speed = 100 m ÷ 20 s", "speed = 5 m/s"],
        check: "5 m/s × 20 s = 100 m. ✓",
      },
    },
    {
      prompt: "Which statement describes Newton’s third law?",
      context: "",
      options: [
        "Objects at rest stay at rest",
        "Force equals mass times acceleration",
        "Every action has an equal and opposite reaction",
        "Energy cannot be created or destroyed",
      ],
      answerIndex: 2,
      hint: "Think of pushing off a wall on a skateboard.",
      explanation: {
        headline: "Equal and opposite reactions.",
        why: "Forces always come in pairs: if A pushes B, B pushes back on A just as hard.",
        steps: ["You push the wall forward", "The wall pushes you backward with the same force"],
        check: "That’s why you roll away from the wall.",
      },
    },
  ],
};
