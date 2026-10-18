import { HandHeart } from "lucide-react";
import { Button } from "../../../components/ui";

interface InviteCardProps {
  onSurprise: () => void;
  disabled: boolean;
}

export function InviteCard({ onSurprise, disabled }: InviteCardProps) {
  return (
    <section className="invite-card">
      <HandHeart size={30} aria-hidden />
      <h2 className="invite-card__title">
        Not sure where to start?
        <br />
        Let Loop pick.
      </h2>
      <p className="invite-card__body">
        A random topic is a great way to discover what you already know.
      </p>
      <Button variant="secondary" compact onClick={onSurprise} disabled={disabled}>
        Surprise me
      </Button>
    </section>
  );
}
