---
name: plain-writing
description: Apply to ALL user-facing text you write, every time, without being asked. This covers chat replies, UI copy, README and docs, code comments, commit messages, PR titles and bodies, issue comments, prompts, and generated content. Strips filler and decoration (em-dashes, unnecessary subheadings, label-style fragments, emoji, hype) and prefers complete, plain sentences.
---

# Plain writing

Use this on every piece of text you produce for a person to read. Do it as you write, then do one pass to check before you finish.

## Punctuation

- Follow the dash rule in CLAUDE.md: no long or short dashes. Rewrite with a full stop, a comma, a colon or brackets. Usually two sentences is clearest.
  - "Be specific — name a chapter" → "Be specific. Name a chapter."
  - "Oxygen — exactly right." → "Oxygen is exactly right."
- Keep minus signs and plain hyphens inside words. Write ranges as "3 to 5" or "3-5".
- Avoid semicolons in casual or UI text. Split the sentence instead.
- Don't stack exclamation marks, and use at most one exclamation per screen or message.

## Headings and labels

- Only add a heading when the text is long enough that a reader would navigate by it. Short replies, PR descriptions and small docs usually need none.
- When a heading is needed, prefer a complete sentence or a plain question: "How the code is organised", "Here's your progress this week." Avoid terse labels like "Overview", "Features", "Notes".
- Remove decorative extras: eyebrow text above titles, all-caps section labels, subtitles that repeat the title, taglines and slogans, sign-offs like "Happy coding!".
- Don't put a bold lead-in label on every bullet unless the reader needs to scan by it.

## Sentences

- Prefer complete sentences over fragments, in prose, bullets, helper text and empty states. "No quizzes yet" → "You haven't finished a quiz yet."
- Say the thing directly. Cut filler ("It's worth noting that", "Simply", "Just", "In order to", "Basically").
- No hype or marketing words (powerful, seamless, robust, delightful, cutting-edge, game-changing) unless quoting.
- No emoji unless the user uses them or asks.
- Use one idea per sentence and keep most sentences under about 25 words.
- Use plain words over jargon; define a term the first time if the reader may not know it.

## Structure

- Lead with the answer or the outcome, then the details.
- Use a list only for items that are truly parallel. Otherwise write a short paragraph.
- Don't repeat the same point in a summary at the end.

## Scope

- Apply to new text you write. When editing someone else's text, apply it only to the parts you change, unless the user asks for a full cleanup. For a full cleanup of UI or docs, use the declutter skill.
- Don't change quoted text, code identifiers, user-provided strings, legal text, or required template wording.
- If a project has its own style guide (CLAUDE.md, CONTRIBUTING, brand guide), follow it where it conflicts with this.

## Final check

Before finishing, scan your output for: long or short dashes, headings that aren't needed, all-caps labels, fragments that should be sentences, emoji, and hype words. Fix any you find.
