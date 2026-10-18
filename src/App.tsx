import { useEffect, useRef, useState } from "react";
import { MIN_TOPIC_LENGTH, type Subject } from "../shared/catalog";
import type { QuizRequest } from "../shared/schema";
import { useQuizFlow } from "./app/useQuizFlow";
import { MobileNav } from "./components/layout/MobileNav";
import type { NavTarget } from "./components/layout/navigation";
import { Sidebar } from "./components/layout/Sidebar";
import { TopNav } from "./components/layout/TopNav";
import type { FeedTab } from "./features/home/feed/QuizFeed";
import { Home } from "./features/home/Home";
import { DEFAULT_QUESTION_COUNT } from "./features/home/suggestions";
import { QuizPlayer } from "./features/quiz/QuizPlayer";
import { Results } from "./features/results/Results";
import { useProgress } from "./progress/useProgress";

const QUICK_QUIZ_DEFAULTS: Omit<QuizRequest, "topic" | "subject"> = {
  level: "Middle school",
  count: DEFAULT_QUESTION_COUNT,
};
const FALLBACK_SUBJECT: Subject = "Mathematics";

export default function App() {
  const { progress, recordQuiz } = useProgress();
  const flow = useQuizFlow(recordQuiz);
  const { view } = flow;
  const [feedTab, setFeedTab] = useState<FeedTab>("suggested");
  const [subjectFilter, setSubjectFilter] = useState<Subject | null>(null);
  const composerRef = useRef<HTMLInputElement>(null);
  const shouldFocusComposer = useRef(false);

  const activeNav: NavTarget | null =
    view.kind !== "home" ? null : feedTab === "recent" ? "history" : "home";

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (view.kind === "home" && shouldFocusComposer.current) {
      shouldFocusComposer.current = false;
      composerRef.current?.focus();
    }
  }, [view]);

  function navigate(target: NavTarget) {
    setFeedTab(target === "history" ? "recent" : "suggested");
    flow.goHome();
  }

  function startNewQuiz() {
    if (view.kind === "home") {
      composerRef.current?.focus();
      composerRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    shouldFocusComposer.current = true;
    flow.goHome();
  }

  function startQuickQuiz(topic: string) {
    if (topic.length < MIN_TOPIC_LENGTH) return;
    flow.generate({ topic, subject: subjectFilter ?? FALLBACK_SUBJECT, ...QUICK_QUIZ_DEFAULTS });
  }

  function pickSubject(subject: Subject) {
    setSubjectFilter(subject);
    setFeedTab("suggested");
    flow.goHome();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopNav
        active={activeNav}
        onNavigate={navigate}
        onNewQuiz={startNewQuiz}
        onQuickQuiz={startQuickQuiz}
        busy={flow.generating}
      />
      <div className="workspace">
        <Sidebar
          progress={progress}
          active={activeNav}
          onNavigate={navigate}
          onPickSubject={pickSubject}
        />
        <main id="main" className="main">
          {view.kind === "home" && (
            <Home
              progress={progress}
              feedTab={feedTab}
              onFeedTab={setFeedTab}
              subjectFilter={subjectFilter}
              onSubjectFilter={setSubjectFilter}
              onGenerate={flow.generate}
              generating={flow.generating}
              error={flow.error}
              composerRef={composerRef}
            />
          )}
          {view.kind === "quiz" && (
            <QuizPlayer
              quiz={view.quiz}
              notice={view.notice}
              onExit={flow.goHome}
              onFinish={(answers) => flow.finish(view.quiz, view.request, answers)}
            />
          )}
          {view.kind === "results" && (
            <Results
              quiz={view.quiz}
              answers={view.answers}
              onRetake={() => flow.generate(view.request)}
              onNewQuiz={startNewQuiz}
              onHome={() => navigate("home")}
            />
          )}
        </main>
      </div>
      <MobileNav active={activeNav} onNavigate={navigate} onNewQuiz={startNewQuiz} />
    </>
  );
}
