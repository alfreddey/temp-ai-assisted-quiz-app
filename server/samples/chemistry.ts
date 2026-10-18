import type { Quiz } from "../../shared/schema.js";

export const chemistryQuiz: Quiz = {
  title: "States of matter",
  subject: "Chemistry",
  level: "Middle school",
  questions: [
    {
      prompt: "What happens to particles when a solid melts?",
      context: "",
      options: [
        "They stop moving",
        "They gain energy and move more freely",
        "They get smaller",
        "They turn into different atoms",
      ],
      answerIndex: 1,
      hint: "Melting needs heat. What does heat do to particle motion?",
      explanation: {
        headline: "They gain energy and move more freely.",
        why: "Heat gives particles enough energy to break out of their fixed positions and slide past each other.",
        steps: ["Solid: particles vibrate in place", "Add heat → particles overcome some attractions", "Liquid: particles flow past each other"],
        check: "The particles stay the same. Only their arrangement and energy change.",
      },
    },
    {
      prompt: "Which change is a chemical change?",
      context: "",
      options: ["Ice melting", "Sugar dissolving", "Iron rusting", "Water boiling"],
      answerIndex: 2,
      hint: "Which one makes a brand-new substance?",
      explanation: {
        headline: "Rusting is a chemical change.",
        why: "Iron reacts with oxygen and water to form iron oxide, a new substance with new properties.",
        steps: ["4Fe + 3O₂ → 2Fe₂O₃", "The product can’t be turned back into iron by cooling or drying"],
        check: "Melting, dissolving and boiling are all reversible physical changes.",
      },
    },
    {
      prompt: "At sea level, water boils at…",
      context: "",
      options: ["0 °C", "37 °C", "100 °C", "212 °C"],
      answerIndex: 2,
      hint: "212 is right, but only in Fahrenheit.",
      explanation: {
        headline: "100 °C.",
        why: "At standard atmospheric pressure, water’s vapour pressure equals air pressure at 100 °C.",
        steps: ["Boiling point depends on pressure", "At 1 atm, water boils at 100 °C (212 °F)"],
        check: "On a mountain, lower pressure means water boils below 100 °C.",
      },
    },
  ],
};
