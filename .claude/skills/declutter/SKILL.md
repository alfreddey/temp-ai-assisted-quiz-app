---
name: declutter
description: Remove unnecessary extras from UI code and docs, such as decorative subheadings, eyebrow labels, filler text, emojis, decorative icons, mock content and hint text. Lists what it plans to remove, waits for approval, then edits. Use when the user invokes /declutter, or says things like "remove the extras", "trim the UI", "strip the fluff", or "cut the unnecessary text".
argument-hint: [optional - file, folder, or page to declutter; defaults to the project's UI views and docs]
---

Declutter the target: $ARGUMENTS (if empty, use the project's UI files and docs).

## 1. Find the target files

- UI: views, templates and components (Blade, JSX/TSX, Vue, Svelte, HTML), plus the CSS they use.
- Docs: README and other Markdown docs.
- Skip business logic, tests, config, migrations, and vendor or build folders.

## 2. Spot the extras

Remove anything that does not help the user do the task or understand the data:

- **Subheadings and eyebrows**: small labels above titles ("Overview", "01 / Sign in"), and taglines or descriptions under titles that repeat the title.
- **Filler text**: friendly or marketing lines ("Nice work!", "Pick up where you left off"), counts that repeat what is already shown, "Built with X", version stamps, footers that say nothing.
- **Emojis and symbols** used as decoration (✓, →, ✨, "!" before messages).
- **Decorative icons**: icons inside buttons or next to text that already says the same thing. Keep icon-only buttons (with their aria-label) and icons that carry meaning.
- **Hint text**: keyboard shortcut badges, "Press X to..." tips, placeholder text that repeats the label.
- **Mock content**: fake terminals, sample data, feature lists on landing pages.
- **Duplicate controls**: a second button or tile that does the same thing as one already on the page.
- **Decorative patterns**: dotted grids, noise, blobs, when they add clutter.
- **Pills and soft badges**: rounded pill labels and tinted badges (light background with coloured text, like a pale green "Done" chip). The user prefers not to have these in UI designs. Replace a status pill with plain text, coloured text, or a small dot next to the text. Remove pills that only decorate (for example a "New" or category pill above a heading).
- **Docs**: intro fluff, repeated summaries, badges, sections that restate other sections.

## 3. Always keep

- Page titles, form labels, button text, table headers and column labels.
- Error, warning, success and empty-state messages (shorten them, never delete them).
- Confirmation and warning text before destructive actions (for example "delete account").
- Accessibility text: aria-labels, sr-only text, alt text.
- Real data: names, dates, statuses, counts that are not shown elsewhere.
- Any text a test asserts on. Grep the tests for the string before removing it.
- Docs content people need: setup steps, commands, requirements, known gaps.

## 4. List, then wait

Before editing, show a short list grouped by file:

```
resources/views/auth/login.blade.php
- eyebrow "01 / Sign in"
- subtitle under "Welcome back"
- arrow icon in "Log in" button
```

Mark anything borderline with "(unsure)" so the user can decide. Then stop and wait for the user's OK. Apply only what they approve.

## 5. Apply

- Make the smallest edit that removes each extra. Do not redesign or restyle.
- Clean up what the removal leaves behind: unused props, variables, components, icons, CSS classes and imports. Remove them only if nothing else uses them (grep first).
- Fix spacing or layout that breaks once an element is gone.
- Follow the user's global rules: plain words, no long or short dashes, no commits.

## 6. Verify

- Run the build and the tests if the project has them. Report failures with their output.
- If a browser preview is available, check the changed pages.
- End with a short summary: what was removed, per file, and anything left for the user to decide.
