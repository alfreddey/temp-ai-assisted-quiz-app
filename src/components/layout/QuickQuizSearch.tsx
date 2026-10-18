import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { MIN_TOPIC_LENGTH } from "../../../shared/catalog";

interface QuickQuizSearchProps {
  onSubmit: (topic: string) => void;
  disabled: boolean;
}

/** The top bar search field. Submitting a topic starts a quiz on it right away. */
export function QuickQuizSearch({ onSubmit, disabled }: QuickQuizSearchProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const topic = query.trim();
    if (topic.length < MIN_TOPIC_LENGTH) return;
    onSubmit(topic);
    setQuery("");
  }

  return (
    <form className="global-search" role="search" onSubmit={handleSubmit}>
      <Search size={20} aria-hidden />
      <label className="sr-only" htmlFor="global-search">
        Quiz me on any topic
      </label>
      <input
        id="global-search"
        placeholder="Quiz me on any topic…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        disabled={disabled}
      />
    </form>
  );
}
