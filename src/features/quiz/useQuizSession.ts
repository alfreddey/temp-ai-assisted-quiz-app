import { useState } from "react";
import type { Quiz } from "../../../shared/schema";
import { countCorrect } from "../../../shared/scoring";

/** Tracks progress through a quiz: the current question, the picked option and past answers. */
export function useQuizSession(quiz: Quiz, onFinish: (answers: number[]) => void) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  const question = quiz.questions[questionIndex];
  const total = quiz.questions.length;
  const isLastQuestion = questionIndex === total - 1;

  function select(optionIndex: number) {
    if (checked || optionIndex < 0 || optionIndex >= question.options.length) return;
    setSelected(optionIndex);
  }

  function check() {
    if (selected === null || checked) return;
    setChecked(true);
    setAnswers((previous) => [...previous, selected]);
  }

  function advance() {
    if (!checked) return;
    if (isLastQuestion) {
      onFinish(answers);
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelected(null);
    setChecked(false);
    setHintOpen(false);
  }

  return {
    question,
    questionIndex,
    total,
    isLastQuestion,
    answeredCount: answers.length,
    correctSoFar: countCorrect(quiz, answers),
    selected,
    checked,
    isCorrect: checked && selected === question.answerIndex,
    hintOpen,
    toggleHint: () => setHintOpen((open) => !open),
    select,
    check,
    advance,
  };
}
