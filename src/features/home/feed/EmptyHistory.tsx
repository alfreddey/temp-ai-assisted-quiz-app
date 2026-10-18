import { Sparkles } from "lucide-react";
import { Button } from "../../../components/ui";

export function EmptyHistory({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="empty-state">
      <Sparkles size={28} aria-hidden />
      <p className="empty-state__title">You haven’t finished a quiz yet.</p>
      <p>Finish a quiz and it’ll show up here so you can track how you’re growing.</p>
      <Button variant="secondary" compact onClick={onBrowse}>
        Browse suggestions
      </Button>
    </div>
  );
}
