import type { RefObject } from "react";
import type { Subject } from "../../../shared/catalog";
import type { QuizRequest } from "../../../shared/schema";
import type { Progress } from "../../progress/types";
import { Composer } from "./composer/Composer";
import { QuizFeed, type FeedTab } from "./feed/QuizFeed";
import { ActivityRail } from "./rail/ActivityRail";
import { SubjectFilter } from "./SubjectFilter";
import { randomSuggestion, requestFor } from "./suggestions";

const DEFAULT_COMPOSER_SUBJECT: Subject = "Mathematics";

interface HomeProps {
  progress: Progress;
  feedTab: FeedTab;
  onFeedTab: (tab: FeedTab) => void;
  subjectFilter: Subject | null;
  onSubjectFilter: (subject: Subject | null) => void;
  onGenerate: (request: QuizRequest) => void;
  generating: boolean;
  error: string | null;
  composerRef: RefObject<HTMLInputElement | null>;
}

export function Home({
  progress,
  feedTab,
  onFeedTab,
  subjectFilter,
  onSubjectFilter,
  onGenerate,
  generating,
  error,
  composerRef,
}: HomeProps) {
  return (
    <div className="home">
      <Composer
        filterSubject={subjectFilter ?? DEFAULT_COMPOSER_SUBJECT}
        onGenerate={onGenerate}
        generating={generating}
        error={error}
        inputRef={composerRef}
      />
      <SubjectFilter value={subjectFilter} onChange={onSubjectFilter} />
      <div className="home__columns">
        <QuizFeed
          tab={feedTab}
          onTabChange={onFeedTab}
          history={progress.history}
          subjectFilter={subjectFilter}
          onGenerate={onGenerate}
          generating={generating}
        />
        <ActivityRail
          progress={progress}
          generating={generating}
          onSurprise={() => onGenerate(requestFor(randomSuggestion()))}
        />
      </div>
    </div>
  );
}
