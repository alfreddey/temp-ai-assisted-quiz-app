import type { ChatTurn } from "./useStudyBuddy";

export function BuddyThread({ turns, pending }: { turns: ChatTurn[]; pending: boolean }) {
  return (
    <ol className="buddy__thread" aria-live="polite">
      {turns.map((turn, turnIndex) => (
        <li key={turnIndex} className={`bubble bubble--${turn.role}`}>
          {turn.text}
        </li>
      ))}
      {pending && <li className="bubble bubble--buddy bubble--typing">Thinking…</li>}
    </ol>
  );
}
