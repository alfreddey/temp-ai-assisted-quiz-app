import { useEffect, useRef, useState } from "react";
import type { Quiz, QuizRequest, Subject } from "../shared/quiz";
import { requestQuiz } from "./api";
import { Home, type FeedTab } from "./components/Home";
import { QuizPlayer } from "./components/QuizPlayer";
import { Results } from "./components/Results";
import { MobileNav, Sidebar, TopNav, type NavTarget } from "./components/Shell";
import { useProgress } from "./progress";

type View =
  | { kind: "home" }
  | { kind: "quiz"; quiz: Quiz; request: QuizRequest; notice?: string }
  | { kind: "results"; quiz: Quiz; request: QuizRequest; answers: number[] };

export default function App() {
  const { progress, recordQuiz } = useProgress();
  const [view, setView] = useState<View>({ kind: "home" });
  const [feedTab, setFeedTab] = useState<FeedTab>("suggested");
  const [subjectFilter, setSubjectFilter] = useState<Subject | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const composerRef = useRef<HTMLInputElement>(null);
  const focusComposer = useRef(false);

  const active: NavTarget | null =
    view.kind !== "home" ? null : feedTab === "recent" ? "history" : "home";

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (view.kind === "home" && focusComposer.current) {
      focusComposer.current = false;
      composerRef.current?.focus();
    }
  }, [view]);

  async function generate(request: QuizRequest) {
    if (generating) return;
    setGenerating(true);
    setError(null);
    if (view.kind !== "home") setView({ kind: "home" });
    try {
      const { quiz, notice } = await requestQuiz(request);
      setView({ kind: "quiz", quiz, request, notice });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  function navigate(target: NavTarget) {
    setFeedTab(target === "history" ? "recent" : "suggested");
    setView({ kind: "home" });
  }

  function newQuiz() {
    focusComposer.current = true;
    setView({ kind: "home" });
    if (view.kind === "home") {
      composerRef.current?.focus();
      composerRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  function finish(quiz: Quiz, request: QuizRequest, answers: number[]) {
    const score = answers.filter((a, i) => a === quiz.questions[i].answerIndex).length;
    recordQuiz({
      title: quiz.title,
      topic: request.topic,
      subject: request.subject,
      level: request.level,
      score,
      total: quiz.questions.length,
    });
    setView({ kind: "results", quiz, request, answers });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopNav
        active={active}
        onNavigate={navigate}
        onNewQuiz={newQuiz}
        onQuickQuiz={(topic) =>
          void generate({
            topic,
            subject: subjectFilter ?? "Mathematics",
            level: "Middle school",
            count: 5,
          })
        }
        busy={generating}
      />
      <div className="workspace">
        <Sidebar
          progress={progress}
          active={active}
          onNavigate={navigate}
          onPickSubject={(subject) => {
            setSubjectFilter(subject);
            setFeedTab("suggested");
            setView({ kind: "home" });
          }}
        />
        <main id="main" className="main">
          {view.kind === "home" && (
            <Home
              progress={progress}
              feedTab={feedTab}
              onFeedTab={setFeedTab}
              subjectFilter={subjectFilter}
              onSubjectFilter={setSubjectFilter}
              onGenerate={(req) => void generate(req)}
              generating={generating}
              error={error}
              composerRef={composerRef}
            />
          )}
          {view.kind === "quiz" && (
            <QuizPlayer
              key={view.quiz.title + view.request.topic}
              quiz={view.quiz}
              notice={view.notice}
              onExit={() => setView({ kind: "home" })}
              onFinish={(answers) => finish(view.quiz, view.request, answers)}
            />
          )}
          {view.kind === "results" && (
            <Results
              quiz={view.quiz}
              answers={view.answers}
              onRetake={() => void generate(view.request)}
              onNewQuiz={newQuiz}
              onHome={() => navigate("home")}
            />
          )}
        </main>
      </div>
      <MobileNav active={active} onNavigate={navigate} onNewQuiz={newQuiz} />
    </>
  );
}
