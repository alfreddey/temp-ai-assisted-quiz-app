---
name: run-loop
description: Start, check and drive the Loop quiz app in this repo. Use when asked to run the app, check that a change works in the browser, take screenshots, or test the Claude quiz and study buddy endpoints.
---

# Run the Loop quiz app

1. Install once with `npm install`.
2. Pick a mode:
   - With Claude: set `ANTHROPIC_API_KEY`, then run `npm run dev`.
   - Without Claude: run `LOOP_DEMO_MODE=1 npm run dev`. The server serves the sample quizzes in `server/samples.ts`.
   - With no key and no demo flag, the server also falls back to sample quizzes and shows a notice in the quiz.
3. Open http://localhost:5173. Set `PORT` to change it.
4. Check the server is up with `curl -s localhost:5173/api/health`.

## Check the API directly

```bash
curl -s -X POST localhost:5173/api/quiz -H 'content-type: application/json' \
  -d '{"topic":"photosynthesis","subject":"Biology","level":"Middle school","count":3}'
```

The response has `source: "ai"` when Claude wrote the quiz and `source: "sample"` when it fell back.

## Check the UI in a browser

1. Use Playwright with the preinstalled Chromium at `/opt/pw-browsers/chromium` if it exists. Don't download browsers.
2. Walk the main flow: type a topic in the composer, select "Generate quiz", pick an answer, select "Check answer", ask the study buddy a question, finish the quiz, then go back home.
3. Check both 1440px and 390px wide. Fail the check if the page scrolls sideways or the console logs errors.
4. Progress is stored in `localStorage` under `loop-quiz-progress-v1`. Clear it to test a first visit.

## Before you finish

Run `npm run typecheck`, `npm test` and `npm run build`. Report any failure with its output.
