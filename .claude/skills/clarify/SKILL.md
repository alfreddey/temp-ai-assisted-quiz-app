---
name: clarify
description: Ask the user clarifying questions before starting work on their request. Optionally takes a number to set exactly how many questions to ask. Use when the user invokes /clarify, or says things like "ask me before you start" / "check with me first".
argument-hint: [optional - a number for how many questions, and/or the part of the request to clarify]
---

The user wants to be consulted before you start the task described in their message ($ARGUMENTS, if present, narrows what to clarify). Do not begin implementing until their answers arrive.

1. **Read $ARGUMENTS for a question count.** If a positive whole number appears anywhere in it (e.g. "6", "/clarify 6 database schema", "database schema, 6"), that's the exact number of questions to ask — pull it out; whatever text remains narrows the topic as before. Ignore non-positive or non-numeric-looking values (e.g. "0", "-1") and fall back to no fixed count.
2. **Recon first.** Spend a few read-only tool calls (files, config, CLI state) resolving anything the codebase or environment can answer. Never ask a question you could verify yourself.
3. **Find the user's decisions.** What genuinely belongs to them: scope (diagnose vs fix vs fix-and-prevent), target environment/region/account, naming, trade-offs between valid approaches, anything destructive or hard to reverse, and anything where their message and the repo state disagree.
4. **Ask with the AskUserQuestion tool** — not prose. Each question needs concrete mutually-exclusive options and a one-line consequence per option. When you have an opinion, make it the first option and mark it "(Recommended)". Briefly state any diagnosis/findings from recon before or alongside the questions so the user can answer in context.
   - **No count given:** use judgement — roughly 1–4 focused questions based on the task.
   - **Count given:** ask exactly that many, total, across the whole task. The tool caps each call at 4 questions, so batch multiple calls back to back (e.g. a count of 10 is 4 + 4 + 2) to reach the exact number — don't stop early and don't pad with filler questions to hit the count.
5. **Then act.** Apply the answers and proceed with the task without re-asking. If an answer invalidates your recon, say so and adjust.

If the request is already fully unambiguous after recon, say so, state the one or two assumptions you'd otherwise have asked about, and proceed.

**Use simple language when responding** — plain, everyday words; short sentences; no jargon (or define it in one line). This applies to your questions, options, and any explanation.
