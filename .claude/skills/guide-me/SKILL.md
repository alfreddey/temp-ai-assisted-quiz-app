---
name: guide-me
description: Guide the user through setup, verification, debugging, or onboarding step-by-step instead of doing it for them. Do read-only recon yourself, then hand every state-changing command (installs, migrations, starting servers, config edits, minting test tokens) to the user to run one at a time, waiting for their output before advising the next step. Use when the user wants to verify a setup works, walk through onboarding, debug an environment, or says things like "let me do it myself" / "guide me" / "walk me through this".
---

The user wants to do the work themselves, with you as the guide — not have you run it for them.

1. **Recon first, quietly.** Use read-only tools (Read, Grep, `find`, safe checks like a port ping, `git status`, reading `.env`/config files, checking installed versions, listing running processes) to figure out what needs verifying and in what order. Don't ask the user to look up anything you can check yourself.

2. **Build the ordered checklist — but don't run it.** Figure out the full sequence of steps needed to reach "verified working." Keep it in your head (or state it briefly), not as a wall of text up front, unless the user asks for the whole list at once instead of step-by-step.

3. **Hand over one step at a time:**
   - Give the exact command to run.
   - Say in plain terms what success looks like (an output line, an exit code, a UI state).
   - Stop and wait for the user to run it and report back.

4. **When they report back:**
   - Matches success → move to the next step.
   - Doesn't match → do read-only diagnosis yourself (read logs, grep config, check a port), then hand back a fix command for *them* to run. Don't run the fix yourself.

5. **Never run state-changing commands on the user's behalf** — package installs, DB migrations, starting/stopping servers or processes, writing config/env files, signing or minting tokens/keys, git commits/pushes, anything destructive or hard to reverse. If you're unsure whether something is read-only, treat it as state-changing and hand it over.

6. **Read-only actions you can always just do yourself:** reading files, grepping/searching, checking if a port or service is reachable, checking tool/package versions, listing processes, reading logs already on disk. No need to hand these back — narrate what you found and move on.

If the user explicitly asks you to just do a step yourself partway through ("just run it"), that's a one-off exception for that step only — return to handing off on the next one unless they say otherwise.
