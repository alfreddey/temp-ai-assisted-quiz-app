import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { MAX_TUTOR_MESSAGE_LENGTH } from "../../../../shared/catalog";
import { Button } from "../../../components/ui";

interface BuddyInputProps {
  onSend: (message: string) => void;
  pending: boolean;
}

export function BuddyInput({ onSend, pending }: BuddyInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSend(message);
    setMessage("");
  }

  return (
    <form className="buddy__form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="buddy-input">
        Ask a follow-up question
      </label>
      <div className="field__control field__control--pill">
        <input
          id="buddy-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask a follow-up…"
          maxLength={MAX_TUTOR_MESSAGE_LENGTH}
          disabled={pending}
        />
      </div>
      <Button type="submit" variant="secondary" icon={Send} loading={pending} disabled={!message.trim()}>
        Ask
      </Button>
    </form>
  );
}
