import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  CircleX,
  Info,
  Lightbulb,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { Question, Quiz } from "../../shared/quiz";
import { askTutor } from "../api";
import { Avatar, Badge, Button, IconButton, cx } from "./ui";

const LETTERS = ["A", "B", "C", "D"];

export function QuizPlayer({
  quiz,
  notice,
  onFinish,
  onExit,
}: {
  quiz: Quiz;
  notice?: string;
  onFinish: (answers: number[]) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const question = quiz.questions[index];
  const total = quiz.questions.length;
  const isLast = index === total - 1;
  const correctSoFar = answers.filter((a, i) => a === quiz.questions[i].answerIndex).length;

  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  function check() {
    if (selected === null || checked) return;
    setChecked(true);
    setAnswers((prev) => [...prev, selected]);
  }

  function next() {
    if (!checked) return;
    if (isLast) {
      onFinish(answers);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
    setHintOpen(false);
  }

  // Keyboard: 1–4 / A–D pick an option, Enter checks then advances.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select")) return;
      const key = event.key.toLowerCase();
      const pick = ["1", "2", "3", "4"].indexOf(key) >= 0 ? Number(key) - 1 : ["a", "b", "c", "d"].indexOf(key);
      if (!checked && pick >= 0 && pick < question.options.length) {
        setSelected(pick);
      } else if (key === "enter" && !target.closest("button")) {
        if (checked) next();
        else check();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const isCorrect = checked && selected === question.answerIndex;

  return (
    <div className="player">
      <div className="player__top">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <button type="button" className="breadcrumb__link" onClick={onExit}>
            {quiz.subject}
          </button>
          <ChevronRight size={14} aria-hidden />
          <span aria-current="page">{quiz.title}</span>
        </nav>
        <IconButton icon={X} label="Leave quiz" onClick={onExit} />
      </div>

      {notice && (
        <p className="notice" role="status">
          <Info size={18} aria-hidden /> {notice}
        </p>
      )}

      <div className="progress" aria-label={`Question ${index + 1} of ${total}`}>
        <div className="progress__labels">
          <span className="t-label">
            Question {index + 1} of {total}
          </span>
          <span className="progress__score">{correctSoFar} correct so far</span>
        </div>
        <div
          className="progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answers.length}
        >
          <div className="progress__fill" style={{ width: `${(answers.length / total) * 100}%` }} />
        </div>
      </div>

      <article className="card question-card question-card--live">
        <div className="question-card__meta">
          <p className="meta">
            <span className="meta__subject">{quiz.subject}</span>
            <span className="meta__level">•&nbsp;&nbsp;{quiz.level}</span>
          </p>
          <Badge tone="neutral">
            {index + 1}/{total}
          </Badge>
        </div>
        <div className="question-card__content">
          <h1 className="question-card__title" tabIndex={-1} ref={headingRef}>
            {question.prompt}
          </h1>
          {question.context && <p className="question-card__body">{question.context}</p>}
        </div>

        <div className="options" role="radiogroup" aria-label="Answer choices">
          {question.options.map((option, i) => {
            const state = !checked
              ? selected === i
                ? "selected"
                : "idle"
              : i === question.answerIndex
                ? "correct"
                : i === selected
                  ? "wrong"
                  : "dimmed";
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={selected === i}
                disabled={checked}
                className={cx("option", `option--${state}`)}
                onClick={() => setSelected(i)}
              >
                <span className="option__letter" aria-hidden>
                  {LETTERS[i]}
                </span>
                <span className="option__text">{option}</span>
                {state === "correct" && <CircleCheck size={20} className="option__icon" aria-label="Correct answer" />}
                {state === "wrong" && <CircleX size={20} className="option__icon" aria-label="Your answer" />}
              </button>
            );
          })}
        </div>

        {hintOpen && !checked && (
          <div className="hint" role="note">
            <Lightbulb size={18} aria-hidden />
            <div>
              <p className="hint__label">Hint</p>
              <p>{question.hint}</p>
            </div>
          </div>
        )}

        <div className="question-card__actions">
          {!checked ? (
            <>
              <Button
                variant="tertiary"
                icon={Lightbulb}
                onClick={() => setHintOpen((o) => !o)}
                aria-expanded={hintOpen}
              >
                {hintOpen ? "Hide hint" : "Show a hint"}
              </Button>
              <Button onClick={check} disabled={selected === null}>
                Check answer
              </Button>
            </>
          ) : (
            <>
              <p className={cx("verdict", isCorrect ? "verdict--correct" : "verdict--wrong")} role="status">
                {isCorrect ? "Nailed it! +10 points" : "Not quite — here’s the why."}
              </p>
              <Button icon={isLast ? Sparkles : ArrowRight} onClick={next}>
                {isLast ? "See results" : "Next question"}
              </Button>
            </>
          )}
        </div>
      </article>

      {checked && selected !== null && (
        <>
          <Explanation question={question} correct={isCorrect} />
          <StudyBuddy key={index} question={question} chosenIndex={selected} />
        </>
      )}
    </div>
  );
}

export function Explanation({ question, correct }: { question: Question; correct: boolean }) {
  const { explanation } = question;
  const steps = explanation.steps;
  return (
    <section
      className={cx("card answer-card", correct && "answer-card--verified")}
      aria-label="Explanation"
    >
      <div className="answer-card__attribution">
        <div className="author">
          <Avatar initials="AI" size={40} tone="mint" expert={correct} />
          <div>
            <p className="author__name author__name--regular">Loop AI</p>
            <p className="author__detail author__detail--12">Step-by-step explanation</p>
          </div>
        </div>
        {correct ? (
          <Badge tone="success" icon={BadgeCheck}>
            Correct
          </Badge>
        ) : (
          <Badge tone="danger" icon={CircleX}>
            Not quite
          </Badge>
        )}
      </div>
      <div className="answer-card__explanation">
        <h2 className="answer-card__headline">{explanation.headline}</h2>
        <p className="answer-card__why">{explanation.why}</p>
        {steps.length > 0 && (
          <ol className="worked-solution">
            {steps.map((step, i) => (
              <li key={i} className={cx(i === steps.length - 1 && "worked-solution__final")}>
                {step}
              </li>
            ))}
          </ol>
        )}
        {explanation.check && <p className="answer-card__check">Check: {explanation.check}</p>}
      </div>
    </section>
  );
}

interface ChatTurn {
  role: "learner" | "buddy";
  text: string;
}

function StudyBuddy({ question, chosenIndex }: { question: Question; chosenIndex: number }) {
  const [message, setMessage] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const correct = chosenIndex === question.answerIndex;
  const starters = correct
    ? ["Why are the other options wrong?", "Give me a harder one like this"]
    : [`Why isn’t “${question.options[chosenIndex]}” right?`, "Explain it a different way"];

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setTurns((t) => [...t, { role: "learner", text: trimmed }]);
    setMessage("");
    setPending(true);
    setError(null);
    try {
      const { reply } = await askTutor(question, chosenIndex, trimmed);
      setTurns((t) => [...t, { role: "buddy", text: reply }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setPending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(message);
  }

  return (
    <section className="card buddy" aria-labelledby="buddy-heading">
      <div className="buddy__heading">
        <Sparkles size={16} aria-hidden />
        <h2 id="buddy-heading">Still curious? Ask your AI study buddy.</h2>
      </div>

      {turns.length > 0 && (
        <ol className="buddy__thread" aria-live="polite">
          {turns.map((turn, i) => (
            <li key={i} className={`bubble bubble--${turn.role}`}>
              {turn.text}
            </li>
          ))}
          {pending && <li className="bubble bubble--buddy bubble--typing">Thinking…</li>}
        </ol>
      )}

      {turns.length === 0 && (
        <div className="buddy__starters">
          {starters.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => void send(s)} disabled={pending}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="buddy__form" onSubmit={submit}>
        <label className="sr-only" htmlFor="buddy-input">
          Ask a follow-up question
        </label>
        <div className="field__control field__control--pill">
          <input
            id="buddy-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a follow-up…"
            maxLength={500}
            disabled={pending}
          />
        </div>
        <Button type="submit" variant="secondary" icon={Send} loading={pending} disabled={!message.trim()}>
          Ask
        </Button>
      </form>
      {error && (
        <p className="field__helper field__helper--error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
