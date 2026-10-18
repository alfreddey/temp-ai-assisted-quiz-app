---
name: e2e-verify
description: Verify a feature actually works by exercising it for real — real process, real database/queue/API, not just unit tests. Use when the user asks to "verify this works end to end", "e2e test this", "prove this fix works", "test this for real", or invokes /e2e-verify. Works for any implemented feature (a bug fix, a new endpoint, a background job, a UI flow) in any project.
argument-hint: [optional - what to verify, e.g. "the kafka retry fix" or "the new /login endpoint"]
---

The user wants proof a feature works, not just a description of the code. $ARGUMENTS (if present) names the feature or change to verify — if absent, verify whatever was just implemented in this conversation.

Plain-language summary: run the real thing, with real inputs, and read the real result back out — the same way a careful human tester would, not by reasoning about the code.

## 1. Understand the feature before touching anything

- Read the diff / recent commits for the feature. Identify: what triggers it (HTTP call, queue message, cron, CLI command, UI action), what it's supposed to do, and what "worked" looks like (a row in a database, a response body, a file written, a message published).
- Identify the failure modes worth proving, not just the happy path — especially if the change's own description mentions a specific bug ("survives a crash", "handles a retry", "rejects invalid input"). The verification should target THAT scenario directly, not a generic smoke test.
- If genuinely unclear what "done" means for this feature, ask the user in one short question rather than guessing.

## 2. Check for existing test infrastructure first

Before improvising anything, look for what the project already has:

- `docker-compose*.yml`, a `.claude/launch.json`, a `test/jest-e2e.json` or equivalent e2e config, a `scripts/` folder with producer/seed scripts, a Makefile/README section describing local setup.
- CI config (`.github/workflows`, `Jenkinsfile`) often shows exactly how the project stands up dependencies for testing — reuse that recipe.
- If a working local setup already exists, use it as-is. Only build one-off scripts or manual infra when nothing usable exists — and say so ("no existing e2e harness found, improvising one for this run").

## 3. Plan the risky steps and pause before them

This is the one part of the process that must NOT run fully autonomously. Before executing, list out any step in your plan that is:

- **Destructive or hard to reverse**: killing/restarting a process, stopping or restarting a container, deleting rows, truncating a table, force-crashing something on purpose.
- **Mutating shared config**: editing `.env` or any config file, even temporarily — always back up the original first and restore it when done, and say you're doing both.
- **Touching a database or broker that might not be a disposable local instance** — check the connection string/hostname. If it points at anything that looks remote/shared (an RDS endpoint, a staging domain, a hostname that isn't `localhost`/a local Docker container), STOP and ask the user before writing or deleting anything there. Prefer redirecting to a local equivalent (a local Docker Postgres/Kafka, a local Postgres db, a sqlite file, an in-memory instance) and say that's what you're doing.

Present the plan (what you'll spin up, what you'll simulate — e.g. "kill the process mid-retry to simulate a crash" — and what you'll clean up afterward) and get a go-ahead before running the risky parts. Non-risky recon (reading files, checking `docker ps`, running the existing test suite) does not need this pause.

## 4. Execute

A typical run looks like:

1. Run the project's existing automated tests relevant to the feature first (unit/integration) as a baseline — fast, cheap, catches obvious breaks before you spend time on live infra.
2. Stand up or confirm local dependencies are running (check `docker ps` before starting anything new — it may already be up).
3. Point the app at local/disposable infra if it isn't already (see step 3's config-mutation rule).
4. Start the real process (server, worker, consumer — whatever actually runs the feature).
5. Drive it with real inputs that match how it's really triggered:
   - HTTP/GraphQL: real requests (curl, a small script, or the Browser tool for UI flows) — not calling the handler function directly.
   - Queue/event-driven: a real producer/publish, not a direct method call on the consumer class.
   - Scheduled/cron: trigger it directly if there's a manual hook, otherwise wait for it or temporarily shorten the interval (ask first if that means editing config).
   - UI: actually click through it in the Browser pane; check the golden path AND the edge cases the change targets.
6. For the specific scenario the fix/feature targets (a crash, a retry, a rejection, a race), reproduce it as faithfully as possible rather than a proxy for it — e.g. an actual `kill -9` mid-operation beats asserting the code "should" survive one. If the real trigger genuinely can't be reproduced safely, say so and explain what you tested instead and why it's a reasonable stand-in.
7. Observe the real result: query the database, read the actual log output, check the actual response, take a screenshot — whatever "worked" means for this feature (from step 1).
8. If you notice a related gap while testing — a code path that looks like it should be covered by the fix but isn't (e.g. an error swallowed before it reaches the mechanism you're testing) — flag it distinctly from the main verification result. Don't silently expand scope to fix it.

## 5. Clean up

- Stop anything you started that wasn't already running (unless the user wants it left up).
- Restore any config file you backed up in step 3.
- Delete any test data you created (rows, files, topics/messages) — check `git status`/DB state before and after so you know exactly what to remove, and don't touch anything you didn't create.
- Remove any throwaway scripts you wrote for this run, unless the user asks to keep them.

## 6. Report

State plainly, per scenario tested: what you did, what real evidence you observed (not "should work" — the actual log line, row, or response), and pass/fail. Call out any gap found in step 4.8 as a separate, clearly-labeled finding, and ask whether to file/fix it rather than doing so automatically.
