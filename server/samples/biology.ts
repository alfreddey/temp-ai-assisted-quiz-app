import type { Quiz } from "../../shared/schema.js";

export const biologyQuiz: Quiz = {
  title: "Photosynthesis essentials",
  subject: "Biology",
  level: "Middle school",
  questions: [
    {
      prompt: "Why do plants need sunlight?",
      context: "Think about where a plant’s energy comes from.",
      options: [
        "To warm their roots",
        "To power photosynthesis and make glucose",
        "To absorb water faster",
        "To attract pollinators",
      ],
      answerIndex: 1,
      hint: "Light is a form of energy. What process turns energy into food?",
      explanation: {
        headline: "Light powers photosynthesis.",
        why: "Chlorophyll captures light energy and uses it to turn carbon dioxide and water into glucose.",
        steps: ["Light hits chlorophyll in the leaf", "Energy splits water and fixes CO₂", "Glucose (food) and oxygen are produced"],
        check: "No light → no glucose → the plant can’t grow.",
      },
    },
    {
      prompt: "Which gas do plants release during photosynthesis?",
      context: "",
      options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
      answerIndex: 2,
      hint: "It’s the gas you breathe in.",
      explanation: {
        headline: "Oxygen is exactly right.",
        why: "When water molecules are split using light energy, oxygen is released as a by-product.",
        steps: ["6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", "O₂ leaves through the stomata"],
        check: "Count the products in the equation: glucose and oxygen.",
      },
    },
    {
      prompt: "Where in the cell does photosynthesis happen?",
      context: "",
      options: ["Mitochondria", "Nucleus", "Chloroplast", "Cell wall"],
      answerIndex: 2,
      hint: "Look for the organelle that contains chlorophyll.",
      explanation: {
        headline: "The chloroplast is the plant’s solar panel.",
        why: "Chloroplasts hold chlorophyll, the pigment that captures light.",
        steps: ["Chlorophyll sits in the thylakoid membranes", "Glucose is built in the stroma"],
        check: "Mitochondria do the reverse: they release energy from glucose.",
      },
    },
    {
      prompt: "What is the difference between a food chain and a food web?",
      context: "",
      options: [
        "A food chain only includes plants",
        "A food web shows many connected chains in an ecosystem",
        "A food web has no producers",
        "They mean exactly the same thing",
      ],
      answerIndex: 1,
      hint: "Think: a single line vs. a net.",
      explanation: {
        headline: "A food web links many food chains together.",
        why: "Most animals eat more than one thing, so real ecosystems look like a web of overlapping chains.",
        steps: ["Chain: grass → rabbit → fox", "Web: rabbits, mice and birds all eat grass; foxes and hawks eat several of them"],
        check: "If you can trace more than one path to a predator, it’s a web.",
      },
    },
  ],
};
