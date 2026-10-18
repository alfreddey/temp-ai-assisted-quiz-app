import type { Progress } from "../../../progress/types";
import { InviteCard } from "./InviteCard";
import { MasteryCard } from "./MasteryCard";
import { StreakCard } from "./StreakCard";

interface ActivityRailProps {
  progress: Progress;
  onSurprise: () => void;
  generating: boolean;
}

export function ActivityRail({ progress, onSurprise, generating }: ActivityRailProps) {
  return (
    <aside className="rail" aria-label="Learning activity">
      <StreakCard activeDays={progress.activeDays} />
      <MasteryCard history={progress.history} />
      <InviteCard onSurprise={onSurprise} disabled={generating} />
    </aside>
  );
}
