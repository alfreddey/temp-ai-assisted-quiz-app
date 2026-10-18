---
name: blackbox-test
description: Write unit and/or integration tests for an implementation based purely on its spec/doc, without reading the implementation's logic — a fair, code-level check that it does what the spec says. Asks whether to write unit, integration, or both, then always organizes tests by domain (which method/feature is under test) first, with unit/integration and happy/edge/negative nested inside — using the framework's native grouping construct (e.g. JUnit 5 @Nested classes) so the structure shows up in the test run output, not just the source. Use when the user asks for "blackbox tests", asks to test a method/service/feature against a doc or spec, or invokes /blackbox-test. For testing against real running infra (a live DB, server, or queue), use /e2e-verify instead — this skill stays in-process.
argument-hint: [what to test, e.g. "the SeatMapService cancelSeat method" or "the PDF spec for OrderService"] [path to the spec/doc, if not obvious from context]
---

The user wants tests written from a spec ($ARGUMENTS, if present, names the target and/or the spec). The point of a blackbox test is that it catches real bugs — reading the implementation's logic first would let the tests quietly match whatever the code already does, defeating the purpose.

## 1. Ask what kind of tests, unless already clear

If $ARGUMENTS or the conversation doesn't already say, ask with AskUserQuestion before writing anything:

- **Unit, integration, or both** — unit tests one method/class in isolation; integration tests call several public methods together in one process the way a real caller would sequence them (e.g. book → cancel → rebook). Neither means real external infra (a live DB, server, queue) — that's `/e2e-verify`'s job, not this skill's.

Skip the question only when the request already answers it ("write unit tests for X", "add integration tests covering the whole flow").

## 2. Find the spec and the target, not the logic

- Identify the spec: a PDF, README, ticket, doc comment, or the user's own description of the contract. Read it fully before writing anything.
- Identify the target: which class/module/service the tests call.
- Recon the target's **public surface only**: class/method names, parameter types, return types, and exception types it declares or is known to throw. Use declaration-only greps (e.g. `grep -n "public \|class \|^}"`) or read just signatures — never read a method body or private helper's logic. If you catch yourself reading an `if`/loop/calculation inside the target, stop.
- If the target doesn't exist yet, or a method the spec describes hasn't been implemented, say so plainly and test only what exists — don't invent methods to make the suite look complete.
- If recon shows the target's public surface doesn't match the spec's vocabulary (different method names, extra/missing parameters, exception types the spec doesn't mention), tell the user before guessing.

## 3. Derive test cases from the spec, not from intuition

Pull cases from, in order of priority:

1. **Worked examples and result tables** in the spec — these are the ground truth; replicate them as tests near-verbatim.
2. **Explicit contract rules** — every "if X, throw/return Y" statement is at least one test.
3. **Boundaries implied by the contract** — empty/zero/one-item inputs, duplicates, the exact edge of a limit, case sensitivity of IDs, repeating an operation that should only succeed once, independence between separate instances (two flights/accounts/users not affecting each other).
4. **Undefined behavior** — if the spec is silent on a case, don't invent an expected result. Either skip it or ask the user what should happen; guessing here produces a test that enforces your assumption, not the spec's.

Sort every case into exactly one of three buckets — this taxonomy drives the file organization in step 4:

- **Happy path** — the documented, expected-to-succeed calls (source: mainly #1 and the non-throwing side of #2).
- **Edge cases** — boundary and unusual-but-valid inputs that should still succeed or behave predictably (source: mainly #3).
- **Negative cases** — inputs that should be rejected: throw, return an error, or otherwise refuse (source: mainly the throwing side of #2).

## 4. Organize and write the tests — always, both in source and in the run output

Organizing is not optional and not just a source-file nicety: the goal is that pass/fail results are easy to scan at a glance once the suite runs, not just that the file reads well. The primary grouping dimension is **domain — what is being tested** (which public method/feature), because that's what tells someone glancing at results what actually broke. Test type (unit/integration) and case type (happy/edge/negative) are secondary, nested dimensions.

The hierarchy, top to bottom:

1. **Domain** — one group per public method/feature under test (e.g. `AddFlight`, `BookSeat`, `CancelSeat`, `GetManifest`), matching the spec's own method-by-method structure. This is always present and is always the outermost level.
2. **Unit / Integration** — nested inside each domain group, only when both were requested in step 1. Skip this level entirely if only one kind was asked for.
3. **Happy path / Edge cases / Negative cases** — nested inside the level above (or directly inside the domain group, if step 2 doesn't apply). Skip any bucket the spec gave nothing to test — don't pad it.

Use the test framework's **native grouping construct** for this hierarchy, so it shows up in the console output, the report, and the IDE test tree — not only as comments a human has to open the file to see:

- **JUnit 5**: `@Nested` inner classes (with `@DisplayName` for readable names) — one nested class per domain, with `Unit`/`Integration` and `Happy path`/`Edge cases`/`Negative cases` nested further inside as needed.
- **pytest**: nested test classes (`class TestBookSeat:` at the top, `class TestHappyPath:` etc. inside it) — pytest's default output groups by class path.
- **Jest/Mocha**: nested `describe()` blocks mirroring the same levels, outermost `describe()` per domain.
- **Any other framework**: use its closest native suite/group/context construct. If it truly has none, fall back to the section-comment convention below and say so — don't invent a fake grouping mechanism.

Also:
- Still add plain `// ----- Section -----`-style comments at each boundary even when using a native construct like `@Nested` — the comment plus the construct together make both the source and the output easy to scan.
- Use descriptive test names that state the scenario and expected outcome (`cancelSeatOnUnknownFlightThrowsFlightNotFoundException`, not `test3`).
- Assert the most specific thing the spec + recon actually support — a named exception type if one exists for that case, a generic base exception only when the spec is generic and no specific type exists.
- **When extending an existing test file that predates this structure, don't reorganize or re-wrap what's already there.** Leave old tests exactly where they are, as flat methods, even if that means the file now has old flat tests alongside new domain-grouped ones — that's expected, not a defect to fix. Add the grouping construct only around the new tests being added in this run. Never move, re-sort, or re-parent a pre-existing test as a side effect of adding new ones.
- Check you're not duplicating a scenario that's already covered anywhere in the file, old sections included.
- Build and run the suite, and confirm the output actually renders the grouping (e.g. the nested class names appear in the test report) before reporting results. Fix compile errors that are on the test side only (test syntax, imports, effectively-final captures). Never edit the implementation to make a test pass — that defeats the point of a blackbox check.

## 5. Report, then offer to fix

- State the pass/fail count plainly.
- For every failure, show the real evidence (the exception/stack trace or actual vs. expected value) and say whether it looks like a genuine spec violation in the implementation or a mistake in the test itself — don't assume all failures are bugs.
- After reporting, ask the user whether they want you to fix the bug(s) found — don't fix implementation code without that go-ahead.
