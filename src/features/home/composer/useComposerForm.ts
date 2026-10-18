import { useEffect, useState } from "react";
import { MIN_TOPIC_LENGTH, type Level, type Subject } from "../../../../shared/catalog";
import type { QuizRequest } from "../../../../shared/schema";
import { DEFAULT_QUESTION_COUNT } from "../suggestions";

const DEFAULT_LEVEL: Level = "Middle school";

/** Form state for the quiz composer. The subject follows the feed's filter when it changes. */
export function useComposerForm(filterSubject: Subject) {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState<Subject>(filterSubject);
  const [level, setLevel] = useState<Level>(DEFAULT_LEVEL);
  const [count, setCount] = useState(DEFAULT_QUESTION_COUNT);
  const [touched, setTouched] = useState(false);

  useEffect(() => setSubject(filterSubject), [filterSubject]);

  const isTopicTooShort = topic.trim().length < MIN_TOPIC_LENGTH;

  function toRequest(): QuizRequest {
    return { topic: topic.trim(), subject, level, count };
  }

  return {
    topic,
    setTopic,
    subject,
    setSubject,
    level,
    setLevel,
    count,
    setCount,
    markTouched: () => setTouched(true),
    showTopicError: touched && isTopicTooShort,
    isTopicTooShort,
    toRequest,
  };
}
