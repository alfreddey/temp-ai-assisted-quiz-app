---
name: quiz
description: Quiz the user on a concept, one question at a time, with immediate feedback and an end-of-session score. Use when the user invokes /quiz, or says things like "quiz me on X" / "test my knowledge of X".
argument-hint: [topic] [count] [difficulty]
---

Run an interactive quiz. One question per turn — never dump a numbered list of questions at once.

## 1. Set up the quiz

- **Topic**: use $ARGUMENTS if a topic is given. If none, ask the user what to quiz them on.
- **Count**: if a number is in $ARGUMENTS, use it. Otherwise default to 5 questions.
- **Difficulty**: if the user names a level (e.g. "beginner", "advanced"), hold it fixed for the whole session. If not, start at a moderate level and adapt as you go (see step 3).
- **Source of questions**: draw from general knowledge by default. If the topic clearly matches something in the current project (a library, file, pattern actually used here), it's fine to ground questions in that real code/docs — check with Read/Grep first rather than guessing what's there.

## 2. Ask one question at a time

- Mix formats naturally: some multiple-choice, some open-ended/short-answer — whichever fits the concept being tested.
- Keep each question short and plain. No preamble before it.
- Wait for the user's answer before revealing anything.

## 3. Adapt difficulty (only if not fixed by the user)

- Two correct answers in a row → step difficulty up.
- A wrong answer → step difficulty down.
- Never announce the adjustment, just let the next question reflect it.

## 4. Give feedback immediately, every question

- Say whether they were right or wrong.
- If wrong: give the correct answer and a short, plain explanation. No hints, no retries — explain and move to the next question.
- Tone: neutral and direct. No cheerleading, no "great job!" filler.

## 5. Track score within the session only

- Keep a running tally (e.g. "3/4 so far") in your head — mention it only if asked, or in the final summary. Don't persist this anywhere after the quiz ends.

## 6. Mid-quiz follow-ups

- If the user asks a follow-up instead of answering (e.g. "why is that right?", "explain more"), answer it directly, then resume the quiz at the same question or move to the next one, whichever the user's reply implies.

## 7. End-of-quiz summary

Once the question count is reached (or the user says stop):
- Give the final score, e.g. "4/5 correct."
- Name the specific concept(s) behind any missed question(s) as weak areas worth reviewing. If nothing was missed, say so plainly instead of inventing a weak area.
