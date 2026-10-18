import type { Level, Subject } from "../../../../shared/catalog";
import type { QuizRequest } from "../../../../shared/schema";
import { Tabs } from "../../../components/ui";
import type { QuizRecord } from "../../../progress/types";
import { requestFor, SUGGESTIONS } from "../suggestions";
import { EmptyHistory } from "./EmptyHistory";
import { HistoryCard } from "./HistoryCard";
import { SuggestionCard } from "./SuggestionCard";

export type FeedTab = "suggested" | "recent";

interface QuizFeedProps {
  tab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  history: QuizRecord[];
  subjectFilter: Subject | null;
  onGenerate: (request: QuizRequest) => void;
  generating: boolean;
}

function retakeRequest(record: QuizRecord): QuizRequest {
  return {
    topic: record.topic,
    subject: record.subject,
    level: record.level as Level,
    count: record.total,
  };
}

export function QuizFeed({
  tab,
  onTabChange,
  history,
  subjectFilter,
  onGenerate,
  generating,
}: QuizFeedProps) {
  const matchesFilter = (subject: Subject) => !subjectFilter || subject === subjectFilter;
  const suggestions = SUGGESTIONS.filter((suggestion) => matchesFilter(suggestion.subject));
  const records = history.filter((record) => matchesFilter(record.subject));
  const historyLabel = history.length ? `My quizzes · ${history.length}` : "My quizzes";

  return (
    <section className="feed" aria-labelledby="feed-heading">
      <h2 id="feed-heading" className="feed__title">
        Here’s your daily dose of discovery.
      </h2>
      <Tabs
        label="Quiz feed"
        value={tab}
        onChange={onTabChange}
        tabs={[
          { id: "suggested", label: "Suggested" },
          { id: "recent", label: historyLabel },
        ]}
      />

      {tab === "suggested" &&
        suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.topic}
            suggestion={suggestion}
            disabled={generating}
            onStart={() => onGenerate(requestFor(suggestion))}
          />
        ))}

      {tab === "recent" && records.length === 0 && (
        <EmptyHistory onBrowse={() => onTabChange("suggested")} />
      )}

      {tab === "recent" &&
        records.map((record) => (
          <HistoryCard
            key={record.id}
            record={record}
            disabled={generating}
            onRetake={() => onGenerate(retakeRequest(record))}
          />
        ))}
    </section>
  );
}
