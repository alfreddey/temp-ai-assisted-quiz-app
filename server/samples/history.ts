import type { Quiz } from "../../shared/schema.js";

export const historyQuiz: Quiz = {
  title: "Ancient civilisations",
  subject: "History",
  level: "Middle school",
  questions: [
    {
      prompt: "Which river was central to ancient Egyptian civilisation?",
      context: "",
      options: ["Tigris", "Nile", "Indus", "Yangtze"],
      answerIndex: 1,
      hint: "It flooded every year and made the desert farmable.",
      explanation: {
        headline: "The Nile.",
        why: "Annual floods left rich silt along the Nile’s banks, letting Egyptians farm in the desert.",
        steps: ["Floods deposited fertile soil", "Farming surpluses supported cities and pyramids"],
        check: "The Tigris and Euphrates fed Mesopotamia instead.",
      },
    },
    {
      prompt: "What writing system did the ancient Sumerians develop?",
      context: "",
      options: ["Hieroglyphs", "Cuneiform", "The Latin alphabet", "Kanji"],
      answerIndex: 1,
      hint: "It was pressed into clay with wedge-shaped marks.",
      explanation: {
        headline: "Cuneiform.",
        why: "Sumerian scribes pressed a reed stylus into wet clay, leaving wedge-shaped marks.",
        steps: ["“Cuneus” is Latin for wedge", "It began around 3200 BCE for record keeping"],
        check: "Hieroglyphs were Egypt’s picture-based script.",
      },
    },
    {
      prompt: "Athens is best known as an early example of…",
      context: "",
      options: ["Monarchy", "Democracy", "Feudalism", "Empire"],
      answerIndex: 1,
      hint: "“Demos” means people.",
      explanation: {
        headline: "Democracy.",
        why: "Athenian citizens voted directly on laws in the assembly.",
        steps: ["Demos = people, kratos = power", "Citizens met in the Ekklesia to vote"],
        check: "Only adult male citizens could vote, which is a limit worth noticing.",
      },
    },
  ],
};
