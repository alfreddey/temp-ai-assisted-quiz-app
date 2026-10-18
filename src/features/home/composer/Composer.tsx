import type { FormEvent, RefObject } from "react";
import { CircleAlert, Sparkles } from "lucide-react";
import { LEVELS, SUBJECTS, type Subject } from "../../../../shared/catalog";
import type { QuizRequest } from "../../../../shared/schema";
import { Button } from "../../../components/ui";
import { HeroIllustration } from "./HeroIllustration";
import { SegmentedControl } from "./SegmentedControl";
import { SelectField } from "./SelectField";
import { TopicField } from "./TopicField";
import { useComposerForm } from "./useComposerForm";

const QUESTION_COUNTS = [3, 5, 10] as const;

interface ComposerProps {
  filterSubject: Subject;
  onGenerate: (request: QuizRequest) => void;
  generating: boolean;
  error: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
}

/** The mint hero where the learner describes a topic and starts a new quiz. */
export function Composer({ filterSubject, onGenerate, generating, error, inputRef }: ComposerProps) {
  const form = useComposerForm(filterSubject);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    form.markTouched();
    if (form.isTopicTooShort) {
      inputRef.current?.focus();
      return;
    }
    onGenerate(form.toRequest());
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <form className="hero__copy" onSubmit={handleSubmit} noValidate>
        <h1 id="hero-heading" className="hero__title">
          Stuck on something?
          <br />
          Let’s quiz it out.
        </h1>
        <p className="hero__body">
          Tell Loop what you’re learning. AI builds a practice quiz that explains the why
          behind every answer.
        </p>

        <TopicField
          value={form.topic}
          onChange={form.setTopic}
          onBlur={() => form.topic && form.markTouched()}
          showError={form.showTopicError}
          disabled={generating}
          inputRef={inputRef}
        />

        <div className="hero__options">
          <SelectField
            label="Subject"
            value={form.subject}
            options={SUBJECTS}
            onChange={form.setSubject}
            disabled={generating}
          />
          <SelectField
            label="Level"
            value={form.level}
            options={LEVELS}
            onChange={form.setLevel}
            disabled={generating}
          />
          <SegmentedControl
            legend="Questions"
            name="count"
            value={form.count}
            options={QUESTION_COUNTS}
            onChange={form.setCount}
            disabled={generating}
          />
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

      <HeroIllustration />
    </section>
  );
}
