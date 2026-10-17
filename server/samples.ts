import type { Quiz, QuizRequest, Subject } from "../shared/quiz.js";

// Offline quizzes used when no Anthropic credentials are configured, so the
// app stays fully playable in demos and tests.
const SAMPLES: Record<Subject, Quiz> = {
  Mathematics: {
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
  },
  Biology: {
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
  },
  Chemistry: {
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
  },
  Physics: {
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
  },
  English: {
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
  },
  History: {
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
  },
};

export function sampleQuiz(req: QuizRequest): Quiz {
  const base = SAMPLES[req.subject];
  return {
    ...base,
    title: `${base.title}`,
    level: req.level,
    questions: base.questions.slice(0, req.count),
  };
}
