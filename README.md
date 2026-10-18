# Loop quiz coach

Loop is an AI-assisted practice quiz app built on the Loop design system from Figma.

You tell Loop what you're studying, and Claude writes a multiple-choice quiz. Every question comes with a hint, a step-by-step explanation and a quick way to check the answer. After each answer you can ask the AI study buddy a follow-up question, such as "Why isn't B right?". Your points, weekly streak, accuracy by subject and quiz history are saved in the browser.

## Running the app

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

The app runs at http://localhost:5173. Without credentials it still works and serves built-in sample quizzes for each subject. Set `LOOP_DEMO_MODE=1` to force sample mode.

Run `npm test` for the unit tests, `npm run typecheck` for type checks, and `npm run build && npm start` to serve a production build.

## How the code is organised

- `shared/` holds what the server and the app both use: the subject and level lists (`catalog.ts`), the quiz schema, API types, scoring and quiz cleanup.
- `server/` holds the Express app. `routes/` has one file per endpoint, `ai/` has the Claude client, prompts and calls, and `samples/` has one offline quiz per subject.
- `src/components/ui/` holds the design kit's basic components, one per file, such as `Button`, `Badge` and `Avatar`.
- `src/components/layout/` holds the top nav, sidebar and mobile nav.
- `src/features/` holds one folder per screen: `home`, `quiz` and `results`. Each screen keeps its logic in small hooks and helpers next to its components.
- `src/progress/` holds points, streaks and saved history.
- `src/styles/` holds the design tokens plus one stylesheet per component, layout area and feature. `index.css` loads them in order.
- `tests/` holds the unit tests.
