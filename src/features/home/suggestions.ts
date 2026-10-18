import type { Level, Subject } from "../../../shared/catalog";
import type { QuizRequest } from "../../../shared/schema";

export const DEFAULT_QUESTION_COUNT = 5;

export interface Suggestion {
  topic: string;
  blurb: string;
  subject: Subject;
  level: Level;
}

export const SUGGESTIONS: Suggestion[] = [
  { topic: "Solving linear equations", blurb: "Balance both sides and get x by itself.", subject: "Mathematics", level: "Middle school" },
  { topic: "How photosynthesis works", blurb: "Light, chlorophyll and the sugar a plant runs on.", subject: "Biology", level: "Middle school" },
  { topic: "Newton’s laws of motion", blurb: "Forces, mass and why you roll away from the wall.", subject: "Physics", level: "High school" },
  { topic: "Physical vs chemical changes", blurb: "Melting, rusting and what makes a new substance.", subject: "Chemistry", level: "Middle school" },
  { topic: "Metaphors, similes and more", blurb: "Spot the figurative language in a sentence.", subject: "English", level: "Middle school" },
  { topic: "Ancient Egypt and Mesopotamia", blurb: "Rivers, writing and the first cities.", subject: "History", level: "Middle school" },
  { topic: "Fractions, decimals and percentages", blurb: "Switch between forms without a calculator.", subject: "Mathematics", level: "Middle school" },
  { topic: "Cell structure and organelles", blurb: "What each part of the cell actually does.", subject: "Biology", level: "High school" },
];

export function requestFor(suggestion: Suggestion): QuizRequest {
  const { topic, subject, level } = suggestion;
  return { topic, subject, level, count: DEFAULT_QUESTION_COUNT };
}

export function randomSuggestion(): Suggestion {
  return SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
}
