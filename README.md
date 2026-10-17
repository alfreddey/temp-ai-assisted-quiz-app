# Loop · AI quiz coach

An AI-assisted practice-quiz app built on the **Loop** design system from Figma
(foundations, controls, community patterns and the learning-home example).

Tell Loop what you're studying and Claude writes a multiple-choice quiz where every
question comes with a hint, a step-by-step explanation and a way to check the answer.
After each answer you can ask the **AI study buddy** a follow-up ("why isn't B right?").

## Features

- **Quiz composer**: topic, subject, level and question count, plus one-tap suggested topics and "Surprise me".
- **Quiz player**: answer states from the kit (selected / correct / wrong), hints, worked solutions, keyboard shortcuts (`1–4` / `A–D` to pick, `Enter` to check and continue).
- **AI study buddy**: follow-up questions answered in the context of the question and your choice.
- **Progress**: points, levels, a weekly streak, per-subject accuracy and quiz history, saved in `localStorage`.
- **Responsive**: desktop layout from the Figma example; on phones the sidebar collapses into the mobile bottom bar.

## Running it

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # or sign in with `ant auth login`
npm run dev                          # http://localhost:5173
```

Without credentials the app still works: it serves built-in sample quizzes for each subject
and shows a notice. Set `LOOP_DEMO_MODE=1` to force sample mode.

```bash
npm test            # unit tests (vitest)
npm run typecheck
npm run build && npm start   # production build served by Express
```

## How it's built

| Path | What |
|---|---|
| `src/styles/tokens.css` | Design tokens mirrored from the Figma variables (`surface/canvas` → `--surface-canvas`) and Loop text styles |
| `src/components/ui.tsx` | Kit primitives: Button, IconButton, Badge, SubjectChip, Avatar, Tabs, Brand |
| `src/components/*` | Shell (top nav, sidebar, mobile nav), Home, QuizPlayer, Results |
| `server/ai.ts` | Claude calls via `@anthropic-ai/sdk`: structured output (Zod) for quizzes, short replies for the study buddy |
| `server/samples.ts` | Offline sample quizzes |
| `shared/quiz.ts` | Shared schema and types |

Claude calls use `claude-opus-5-5` with server-side refusal fallbacks (`fallbacks: "default"`) enabled.
Icons are Lucide, the same set the Figma kit uses.
