import { Sparkles } from "lucide-react";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="brand" onClick={onClick} aria-label="Loop home">
      <span className="brand__symbol">
        <Sparkles size={20} aria-hidden />
      </span>
      <span className="brand__word">loop</span>
    </button>
  );
}
