import { Lightbulb } from "lucide-react";

export function HintNote({ hint }: { hint: string }) {
  return (
    <div className="hint" role="note">
      <Lightbulb size={18} aria-hidden />
      <div>
        <p className="hint__label">Hint</p>
        <p>{hint}</p>
      </div>
    </div>
  );
}
