export const SUBJECTS = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "English",
  "History",
] as const;
export type Subject = (typeof SUBJECTS)[number];

export const LEVELS = ["Middle school", "High school", "University"] as const;
export type Level = (typeof LEVELS)[number];

export const OPTIONS_PER_QUESTION = 4;
export const MIN_QUESTIONS = 3;
export const MAX_QUESTIONS = 10;
export const MIN_TOPIC_LENGTH = 3;
export const MAX_TOPIC_LENGTH = 200;
export const MAX_TUTOR_MESSAGE_LENGTH = 500;
