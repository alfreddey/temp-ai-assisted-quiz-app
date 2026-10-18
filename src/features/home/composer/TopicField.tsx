import type { RefObject } from "react";
import { CircleAlert } from "lucide-react";
import { MAX_TOPIC_LENGTH, MIN_TOPIC_LENGTH } from "../../../../shared/catalog";
import { classNames } from "../../../lib/classNames";

const HELP_TEXT = "Be specific. Name a chapter, a skill or a question you’re stuck on.";
const ERROR_TEXT = `Add a little detail. Use at least ${MIN_TOPIC_LENGTH} characters.`;

interface TopicFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  showError: boolean;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function TopicField({ value, onChange, onBlur, showError, disabled, inputRef }: TopicFieldProps) {
  return (
    <div className={classNames("field", showError && "is-error")}>
      <label className="field__label" htmlFor="topic">
        What are you studying?
      </label>
      <div className="field__control">
        <input
          id="topic"
          ref={inputRef}
          value={value}
          placeholder="e.g. the water cycle, solving 2-step equations…"
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={showError || undefined}
          aria-describedby="topic-help"
          maxLength={MAX_TOPIC_LENGTH}
          disabled={disabled}
        />
        {showError && <CircleAlert size={20} className="field__icon--error" aria-hidden />}
      </div>
      <p id="topic-help" className="field__helper">
        {showError ? ERROR_TEXT : HELP_TEXT}
      </p>
    </div>
  );
}
