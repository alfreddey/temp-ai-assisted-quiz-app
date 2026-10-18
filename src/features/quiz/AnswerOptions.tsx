import { CircleCheck, CircleX } from "lucide-react";
import { classNames } from "../../lib/classNames";

const OPTION_LETTERS = ["A", "B", "C", "D"];

type OptionState = "idle" | "selected" | "correct" | "wrong" | "dimmed";

interface AnswerOptionsProps {
  options: string[];
  answerIndex: number;
  selected: number | null;
  checked: boolean;
  onSelect: (optionIndex: number) => void;
}

function optionState(
  optionIndex: number,
  { answerIndex, selected, checked }: Pick<AnswerOptionsProps, "answerIndex" | "selected" | "checked">,
): OptionState {
  if (!checked) return selected === optionIndex ? "selected" : "idle";
  if (optionIndex === answerIndex) return "correct";
  if (optionIndex === selected) return "wrong";
  return "dimmed";
}

export function AnswerOptions({ options, answerIndex, selected, checked, onSelect }: AnswerOptionsProps) {
  return (
    <div className="options" role="radiogroup" aria-label="Answer choices">
      {options.map((option, optionIndex) => {
        const state = optionState(optionIndex, { answerIndex, selected, checked });
        return (
          <button
            key={optionIndex}
            type="button"
            role="radio"
            aria-checked={selected === optionIndex}
            disabled={checked}
            className={classNames("option", `option--${state}`)}
            onClick={() => onSelect(optionIndex)}
          >
            <span className="option__letter" aria-hidden>
              {OPTION_LETTERS[optionIndex]}
            </span>
            <span className="option__text">{option}</span>
            {state === "correct" && (
              <CircleCheck size={20} className="option__icon" aria-label="Correct answer" />
            )}
            {state === "wrong" && (
              <CircleX size={20} className="option__icon" aria-label="Your answer" />
            )}
          </button>
        );
      })}
    </div>
  );
}
