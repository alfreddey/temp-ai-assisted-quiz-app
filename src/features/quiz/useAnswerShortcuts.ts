import { useEffect } from "react";

const NUMBER_KEYS = ["1", "2", "3", "4"];
const LETTER_KEYS = ["a", "b", "c", "d"];

interface AnswerShortcuts {
  onSelect: (optionIndex: number) => void;
  /** Enter checks the answer, or moves on once it's checked. */
  onConfirm: () => void;
}

function optionIndexFor(key: string): number {
  const numberIndex = NUMBER_KEYS.indexOf(key);
  return numberIndex >= 0 ? numberIndex : LETTER_KEYS.indexOf(key);
}

/** Keys 1 to 4 or A to D pick an option, and Enter confirms. Ignored while typing in a field. */
export function useAnswerShortcuts({ onSelect, onConfirm }: AnswerShortcuts) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select")) return;

      const key = event.key.toLowerCase();
      const optionIndex = optionIndexFor(key);
      if (optionIndex >= 0) {
        onSelect(optionIndex);
      } else if (key === "enter" && !target.closest("button")) {
        onConfirm();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelect, onConfirm]);
}
