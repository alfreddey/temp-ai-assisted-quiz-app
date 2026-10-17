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

- `src/styles/tokens.css` holds the design tokens from the Figma variables and the Loop text styles.
- `src/components/ui.tsx` holds the kit's basic components, such as buttons, badges, chips, avatars and tabs.
- `src/components/` also holds the app screens: the shell, home, quiz player and results.
- `server/ai.ts` calls Claude (`claude-opus-5-5`) through `@anthropic-ai/sdk`, with server-side refusal fallbacks enabled.
- `server/samples.ts` holds the offline sample quizzes, and `shared/quiz.ts` holds the shared schema and types.
