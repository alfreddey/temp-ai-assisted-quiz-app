import type { Quiz } from "../../shared/schema.js";

export const englishQuiz: Quiz = {
  title: "Figurative language",
  subject: "English",
  level: "Middle school",
  questions: [
    {
      prompt: "“The classroom was a zoo.” What kind of figurative language is this?",
      context: "",
      options: ["Simile", "Metaphor", "Onomatopoeia", "Alliteration"],
      answerIndex: 1,
      hint: "Is there a “like” or “as”?",
      explanation: {
        headline: "It’s a metaphor.",
        why: "A metaphor says one thing *is* another, without “like” or “as”.",
        steps: ["No “like” or “as” → not a simile", "Classroom = zoo → direct comparison → metaphor"],
        check: "“The classroom was like a zoo” would be a simile.",
      },
    },
    {
      prompt: "Which sentence uses alliteration?",
      context: "",
      options: [
        "The bees buzzed loudly.",
        "Peter picked a peck of peppers.",
        "Her smile was as bright as the sun.",
        "Time is a thief.",
      ],
      answerIndex: 1,
      hint: "Listen for repeated starting sounds.",
      explanation: {
        headline: "“Peter picked a peck of peppers.”",
        why: "Alliteration repeats the same first consonant sound in nearby words.",
        steps: ["Peter, picked, peck, peppers", "Four words start with /p/"],
        check: "Say it out loud and the repeated sound pops.",
      },
    },
    {
      prompt: "What does “onomatopoeia” describe?",
      context: "",
      options: [
        "Exaggeration for effect",
        "Words that imitate sounds",
        "Giving human traits to objects",
        "A comparison using “like”",
      ],
      answerIndex: 1,
      hint: "Buzz, sizzle, bang…",
      explanation: {
        headline: "Words that imitate sounds.",
        why: "Onomatopoeic words sound like the noise they describe.",
        steps: ["“Buzz” sounds like a bee", "“Sizzle” sounds like frying food"],
        check: "If you can hear the word’s meaning, it’s onomatopoeia.",
      },
    },
  ],
};
