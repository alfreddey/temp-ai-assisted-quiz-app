# Personal preferences

## Response length
Be precise and concise. This is a hard rule, not a preference:
- Lead with the direct answer in the first sentence. No preamble, no restating my question.
- Default to the shortest reply that fully answers, often 1 to 3 sentences. Add length only when the task genuinely needs it.
- No exhaustive option surveys, no recapping what I can already see, no filler closers ("Let me know if...").
- Cut anything that doesn't change my decision or my next action.

## Plain language and small chunks
I find it hard to take in a lot of content at once, so this is a hard rule for every response, in every project:
- Always use plain, everyday words. No jargon, no fancy vocabulary. If a technical term is unavoidable, define it in one plain line right where you use it.
- Never write a big, dense block of text. Break anything longer than a couple of sentences into short chunks: numbered steps, bullet points, or short paragraphs, one idea per chunk.
- This works together with "Response length" above: keep it short, AND keep it broken into small, simple pieces.

## Punctuation: no long or short dashes
Never use the long dash (em dash) or the short dash (en dash). This is a hard rule, and it applies to everything you produce, not just chat replies: code, comments, docs, README text, commit messages, PR descriptions, diagram labels, and any file you write.
- Instead of a long dash, use a comma, a colon, brackets, or start a new sentence.
- Instead of a short dash in a range, write "1 to 3", or use a plain hyphen: "1-3".
- Plain hyphens inside words are fine (well-known, read-only, kebab-case).
- If you catch yourself about to type one, rewrite the sentence instead.

## Version control
Never run `git commit` or `git push` unless I have explicitly told you to do so in that moment. Preparing/staging changes is fine. Committing and pushing are not, until I say so.

## Explanations
When I ask you to explain something, answer **concisely and simply**, and **always prefer examples** over prose:
- Use plain, everyday language; avoid jargon, or define it in one line if unavoidable.
- Lead with the direct answer in one sentence, then stop.
- When detail is needed, drop an example. It carries the explanation better than paragraphs.
- If you can answer with just an example (inline or a few lines of code/config), do that.

## Generating code
When you generate code, prefer the **simplest version that does the job**, without sacrificing quality:
- Fewest moving parts: avoid needless abstraction, indirection, and config knobs I didn't ask for.
- Still maintain quality: clear names, sensible error handling, and the project's existing conventions.
- Readability over cleverness; don't gold-plate or add speculative features.
- Readable names: variables and functions should have descriptive, intention-revealing names. No cryptic abbreviations or single-letter names (except trivial loop indices like `i`).
- Prefer named constants over inline literal values: every meaningful string, number, or configuration value belongs in a named const, never inlined.

## Version-specific conventions
Before giving instructions that depend on a library's version (env var names, config keys, API shapes), grep the actually-installed package source (e.g. inside `node_modules`) to confirm the current convention instead of relying on memorized/training-data knowledge. Libraries rename things across major versions and memory goes stale.

## Code organization
- Prefer many small, focused files over one large file with multiple responsibilities.
- Extract reusable functions/modules to avoid duplication and long inline logic.
- Use named variables/constants for non-obvious values (magic numbers, ARNs, resource names), not trivial literals like `0`, `true`, or empty string.
- Apply these rules across all languages (code, config, infrastructure).

## Diagrams
Keep every label short: 3 words or fewer, or a single relevant noun (e.g. a resource name). Applies to all diagrams (architecture, flowcharts, sequence diagrams, and so on), not just AWS/infra ones.

# This project
Loop is an AI-assisted quiz app built from the Loop design system in Figma. Claude writes the quizzes on the server.
- Always follow the plain-writing skill for any text you write.
- Use the loop-ui skill whenever you add or change UI.
- Use the run-loop skill to start the app or check a change in the browser.
