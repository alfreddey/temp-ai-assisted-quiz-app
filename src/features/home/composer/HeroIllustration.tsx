import { Check, Lightbulb } from "lucide-react";

/** The equation, solution and lightbulb tiles from the Figma hero. Decorative only. */
export function HeroIllustration() {
  return (
    <div className="illustration" aria-hidden>
      <div className="illustration__circle" />
      <div className="illustration__equation">3x + 7 = 22</div>
      <div className="illustration__solved">
        x = 5 <Check size={20} strokeWidth={3} />
      </div>
      <div className="illustration__bulb">
        <Lightbulb size={28} />
      </div>
    </div>
  );
}
