import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  Check,
  CircleAlert,
  Flame,
  HandHeart,
  Lightbulb,
  RotateCcw,
  Shapes,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  LEVELS,
  SUBJECTS,
  type Level,
  type QuizRequest,
  type Subject,
} from "../../shared/quiz";
import {
  streakLength,
  weekActivity,
  type Progress,
  type QuizRecord,
} from "../progress";
import { Avatar, Badge, Button, SubjectChip, SUBJECT_ICONS, Tabs, cx } from "./ui";

export interface Suggestion {
  topic: string;
  blurb: string;
  subject: Subject;
  level: Level;
}

export const SUGGESTIONS: Suggestion[] = [
  { topic: "Solving linear equations", blurb: "Balance both sides and get x by itself.", subject: "Mathematics", level: "Middle school" },
  { topic: "How photosynthesis works", blurb: "Light, chlorophyll and the sugar a plant runs on.", subject: "Biology", level: "Middle school" },
  { topic: "Newton’s laws of motion", blurb: "Forces, mass and why you roll away from the wall.", subject: "Physics", level: "High school" },
  { topic: "Physical vs chemical changes", blurb: "Melting, rusting and what makes a new substance.", subject: "Chemistry", level: "Middle school" },
  { topic: "Metaphors, similes and more", blurb: "Spot the figurative language in a sentence.", subject: "English", level: "Middle school" },
  { topic: "Ancient Egypt and Mesopotamia", blurb: "Rivers, writing and the first cities.", subject: "History", level: "Middle school" },
  { topic: "Fractions, decimals and percentages", blurb: "Switch between forms without a calculator.", subject: "Mathematics", level: "Middle school" },
  { topic: "Cell structure and organelles", blurb: "What each part of the cell actually does.", subject: "Biology", level: "High school" },
];

const COUNTS = [3, 5, 10] as const;
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export type FeedTab = "suggested" | "recent";

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
}: {
  progress: Progress;
  feedTab: FeedTab;
  onFeedTab: (tab: FeedTab) => void;
  subjectFilter: Subject | null;
  onSubjectFilter: (subject: Subject | null) => void;
  onGenerate: (req: QuizRequest) => void;
  generating: boolean;
  error: string | null;
  composerRef: RefObject<HTMLInputElement | null>;
}) {
  const suggestions = SUGGESTIONS.filter((s) => !subjectFilter || s.subject === subjectFilter);
  const history = progress.history.filter((r) => !subjectFilter || r.subject === subjectFilter);

  return (
    <div className="home">
      <Composer
        subject={subjectFilter ?? "Mathematics"}
        onGenerate={onGenerate}
        generating={generating}
        error={error}
        inputRef={composerRef}
      />

      <div className="chip-row" role="group" aria-label="Filter by subject">
        <SubjectChip
          label="All subjects"
          icon={Shapes}
          selected={!subjectFilter}
          onClick={() => onSubjectFilter(null)}
        />
        {SUBJECTS.map((subject) => (
          <SubjectChip
            key={subject}
            label={subject}
            icon={SUBJECT_ICONS[subject]}
            selected={subjectFilter === subject}
            onClick={() => onSubjectFilter(subject)}
          />
        ))}
      </div>

      <div className="home__columns">
        <section className="feed" aria-labelledby="feed-heading">
          <div className="feed__heading">
            <h2 id="feed-heading" className="feed__title">
              Your daily dose of discovery
            </h2>
          </div>
          <Tabs
            label="Quiz feed"
            value={feedTab}
            onChange={onFeedTab}
            tabs={[
              { id: "suggested", label: "Suggested" },
              { id: "recent", label: `My quizzes${progress.history.length ? ` · ${progress.history.length}` : ""}` },
            ]}
          />

          {feedTab === "suggested" &&
            suggestions.map((s) => (
              <SuggestionCard
                key={s.topic}
                suggestion={s}
                disabled={generating}
                onStart={() =>
                  onGenerate({ topic: s.topic, subject: s.subject, level: s.level, count: 5 })
                }
              />
            ))}

          {feedTab === "recent" &&
            (history.length === 0 ? (
              <div className="empty-state">
                <Sparkles size={28} aria-hidden />
                <p className="empty-state__title">No quizzes yet</p>
                <p>Finish a quiz and it’ll show up here so you can track how you’re growing.</p>
                <Button variant="secondary" compact onClick={() => onFeedTab("suggested")}>
                  Browse suggestions
                </Button>
              </div>
            ) : (
              history.map((record) => (
                <HistoryCard
                  key={record.id}
                  record={record}
                  disabled={generating}
                  onRetake={() =>
                    onGenerate({
                      topic: record.topic,
                      subject: record.subject,
                      level: record.level as Level,
                      count: record.total,
                    })
                  }
                />
              ))
            ))}
        </section>

        <aside className="rail" aria-label="Learning activity">
          <StreakCard progress={progress} />
          <MasteryCard progress={progress} />
          <InviteCard
            disabled={generating}
            onSurprise={() => {
              const pick = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
              onGenerate({ topic: pick.topic, subject: pick.subject, level: pick.level, count: 5 });
            }}
          />
        </aside>
      </div>
    </div>
  );
}

function Composer({
  subject: initialSubject,
  onGenerate,
  generating,
  error,
  inputRef,
}: {
  subject: Subject;
  onGenerate: (req: QuizRequest) => void;
  generating: boolean;
  error: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState<Subject>(initialSubject);
  const [level, setLevel] = useState<Level>("Middle school");
  const [count, setCount] = useState<number>(5);
  const [touched, setTouched] = useState(false);
  const previousSubject = useRef(initialSubject);

  // Follow the feed's subject filter so the composer matches what the learner is browsing.
  useEffect(() => {
    if (previousSubject.current !== initialSubject) {
      previousSubject.current = initialSubject;
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const tooShort = topic.trim().length < 3;
  const showError = touched && tooShort;

  function submit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (tooShort) {
      inputRef.current?.focus();
      return;
    }
    onGenerate({ topic: topic.trim(), subject, level, count });
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <form className="hero__copy" onSubmit={submit} noValidate>
        <p className="hero__eyebrow">EVERY QUESTION IS A GOOD START.</p>
        <h1 id="hero-heading" className="hero__title">
          Stuck on something?
          <br />
          Let’s quiz it out.
        </h1>
        <p className="hero__body">
          Tell Loop what you’re learning. AI builds a practice quiz that explains the why
          behind every answer.
        </p>

        <div className={cx("field", showError && "is-error")}>
          <label className="field__label" htmlFor="topic">
            What are you studying?
          </label>
          <div className="field__control">
            <input
              id="topic"
              ref={inputRef}
              value={topic}
              placeholder="e.g. the water cycle, solving 2-step equations…"
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => topic && setTouched(true)}
              aria-invalid={showError || undefined}
              aria-describedby="topic-help"
              maxLength={200}
              disabled={generating}
            />
            {showError && <CircleAlert size={20} className="field__icon--error" aria-hidden />}
          </div>
          <p id="topic-help" className="field__helper">
            {showError
              ? "Add a little detail. Use at least 3 characters."
              : "Be specific — a chapter, a skill or a question you’re stuck on."}
          </p>
        </div>

        <div className="hero__options">
          <label className="select">
            <span className="field__label">Subject</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              disabled={generating}
            >
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="select">
            <span className="field__label">Level</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              disabled={generating}
            >
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <fieldset className="segmented">
            <legend className="field__label">Questions</legend>
            <div className="segmented__track">
              {COUNTS.map((n) => (
                <label key={n} className={cx("segmented__item", count === n && "is-selected")}>
                  <input
                    type="radio"
                    name="count"
                    value={n}
                    checked={count === n}
                    onChange={() => setCount(n)}
                    disabled={generating}
                  />
                  {n}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="hero__actions">
          <Button type="submit" variant="secondary" icon={Sparkles} loading={generating}>
            {generating ? "Writing your quiz…" : "Generate quiz"}
          </Button>
        </div>
        <p className="sr-only" aria-live="polite">
          {generating ? "Loop AI is writing your quiz." : ""}
        </p>
        {error && (
          <p className="hero__error" role="alert">
            <CircleAlert size={16} aria-hidden /> {error}
          </p>
        )}
      </form>

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
    </section>
  );
}

function SuggestionCard({
  suggestion,
  onStart,
  disabled,
}: {
  suggestion: Suggestion;
  onStart: () => void;
  disabled: boolean;
}) {
  return (
    <article className="card question-card">
      <div className="question-card__meta">
        <p className="meta">
          <span className="meta__subject">{suggestion.subject}</span>
          <span className="meta__level">•&nbsp;&nbsp;{suggestion.level}</span>
        </p>
        <Badge tone="warning" icon={Zap}>
          Up to +70 points
        </Badge>
      </div>
      <div className="question-card__content">
        <h3 className="question-card__title">{suggestion.topic}</h3>
        <p className="question-card__body">{suggestion.blurb}</p>
      </div>
      <div className="question-card__actions">
        <div className="author">
          <Avatar initials="AI" size={32} tone="mint" />
          <div>
            <p className="author__name">Loop AI</p>
            <p className="author__detail">5 questions · explained</p>
          </div>
        </div>
        <Button variant="secondary" compact onClick={onStart} disabled={disabled}>
          Start quiz
        </Button>
      </div>
    </article>
  );
}

function HistoryCard({
  record,
  onRetake,
  disabled,
}: {
  record: QuizRecord;
  onRetake: () => void;
  disabled: boolean;
}) {
  const ratio = record.total ? record.score / record.total : 0;
  const date = new Date(record.completedAt);
  return (
    <article className="card question-card">
      <div className="question-card__meta">
        <p className="meta">
          <span className="meta__subject">{record.subject}</span>
          <span className="meta__level">•&nbsp;&nbsp;{record.level}</span>
        </p>
        {ratio >= 0.7 ? (
          <Badge tone="success" icon={Check}>
            {record.score}/{record.total} correct
          </Badge>
        ) : (
          <Badge tone="warning" icon={Flame}>
            {record.score}/{record.total} · room to grow
          </Badge>
        )}
      </div>
      <div className="question-card__content">
        <h3 className="question-card__title">{record.title}</h3>
        <p className="question-card__body">Topic: {record.topic}</p>
      </div>
      <div className="question-card__actions">
        <div className="author">
          <Avatar initials="JL" size={32} />
          <div>
            <p className="author__name">You</p>
            <p className="author__detail">
              {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </p>
          </div>
        </div>
        <Button variant="secondary" compact icon={RotateCcw} onClick={onRetake} disabled={disabled}>
          New version
        </Button>
      </div>
    </article>
  );
}

function StreakCard({ progress }: { progress: Progress }) {
  const streak = streakLength(progress.activeDays);
  const week = weekActivity(progress.activeDays);
  return (
    <section className="streak-card" aria-labelledby="streak-heading">
      <div className="streak-card__heading">
        <h2 id="streak-heading">Keep your spark.</h2>
        <Flame size={26} aria-hidden />
      </div>
      <p className="streak-card__value">
        {streak}-day streak
      </p>
      <ol className="streak-card__week" aria-label="This week">
        {week.map((done, i) => (
          <li key={i}>
            <span className={cx("streak-day", done && "is-done")}>
              {done && <Check size={15} strokeWidth={3} aria-hidden />}
            </span>
            <span aria-hidden>{WEEKDAYS[i]}</span>
            <span className="sr-only">{done ? "practised" : "not yet"}</span>
          </li>
        ))}
      </ol>
      <p className="streak-card__copy">
        {streak > 0
          ? "One quiz today keeps the streak alive and brings you closer to your weekly goal."
          : "Finish one quiz today to light your first spark."}
      </p>
    </section>
  );
}

function MasteryCard({ progress }: { progress: Progress }) {
  const rows = SUBJECTS.map((subject) => {
    const records = progress.history.filter((r) => r.subject === subject);
    const correct = records.reduce((n, r) => n + r.score, 0);
    const total = records.reduce((n, r) => n + r.total, 0);
    return { subject, quizzes: records.length, pct: total ? Math.round((correct / total) * 100) : null };
  })
    .filter((r) => r.quizzes > 0)
    .sort((a, b) => b.quizzes - a.quizzes)
    .slice(0, 4);

  return (
    <section className="card rail-card" aria-labelledby="mastery-heading">
      <div>
        <h2 id="mastery-heading" className="rail-card__title">
          Your subjects
        </h2>
        <p className="rail-card__subtitle">Accuracy across your quizzes.</p>
      </div>
      {rows.length === 0 ? (
        <p className="rail-card__empty">Your accuracy by subject appears here after your first quiz.</p>
      ) : (
        rows.map((row) => {
          const Icon = SUBJECT_ICONS[row.subject];
          return (
            <div key={row.subject} className="mastery-row">
              <span className="mastery-row__icon">
                <Icon size={18} aria-hidden />
              </span>
              <div className="mastery-row__info">
                <p className="mastery-row__name">{row.subject}</p>
                <p className="mastery-row__meta">
                  {row.quizzes} {row.quizzes === 1 ? "quiz" : "quizzes"}
                </p>
              </div>
              <p className="mastery-row__value">{row.pct}%</p>
            </div>
          );
        })
      )}
    </section>
  );
}

function InviteCard({ onSurprise, disabled }: { onSurprise: () => void; disabled: boolean }) {
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
