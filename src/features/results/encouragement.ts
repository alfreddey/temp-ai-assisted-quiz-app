interface Encouragement {
  title: string;
  body: string;
}

/** Messages from best to worst, each used when the score ratio reaches its threshold. */
const ENCOURAGEMENTS: { minRatio: number; message: Encouragement }[] = [
  { minRatio: 1, message: { title: "Flawless. That’s the ‘aha!’", body: "You got every answer right. Try the next level up to keep stretching." } },
  { minRatio: 0.7, message: { title: "Strong work!", body: "You’ve got the core idea. Review the misses below to lock it in." } },
  { minRatio: 0.4, message: { title: "You’re getting there.", body: "Each explanation below is a step closer. A second round usually clicks." } },
  { minRatio: 0, message: { title: "Every question is a good start.", body: "Read through the why for each one, then try a fresh version." } },
];

export function encouragementFor(scoreRatio: number): Encouragement {
  const match = ENCOURAGEMENTS.find(({ minRatio }) => scoreRatio >= minRatio);
  return (match ?? ENCOURAGEMENTS[ENCOURAGEMENTS.length - 1]).message;
}
