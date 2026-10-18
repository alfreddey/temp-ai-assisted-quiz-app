import { useState } from "react";
import type { Question } from "../../../../shared/schema";
import { askTutor } from "../../../lib/api";

export interface ChatTurn {
  role: "learner" | "buddy";
  text: string;
}

/** Sends follow-up questions about one answered question and keeps the conversation. */
export function useStudyBuddy(question: Question, chosenIndex: number) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    setTurns((previous) => [...previous, { role: "learner", text: message }]);
    setPending(true);
    setError(null);
    try {
      const { reply } = await askTutor(question, chosenIndex, message);
      setTurns((previous) => [...previous, { role: "buddy", text: reply }]);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setPending(false);
    }
  }

  return { turns, pending, error, ask };
}
