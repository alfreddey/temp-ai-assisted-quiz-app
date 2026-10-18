---
name: loop-ui
description: Build or change UI in this repo using the Loop design system from Figma. Use whenever you add or edit a screen, component or style in src/, so new UI matches the Figma kit and reuses existing tokens and components.
---

# Build UI with the Loop design system

The source of truth is the Figma file "Loop UI kit v1.0" (Foundations, Controls and identity, Community patterns, and the Learning home example). This repo mirrors it.

## Reuse before you write

1. Colours, spacing, radius and fonts live in `src/styles/tokens.css`. Use the CSS variables. Never hard-code a hex value or pixel size that has a token.
2. Basic components live in `src/components/ui.tsx`: `Button`, `IconButton`, `Badge`, `SubjectChip`, `Avatar`, `Tabs` and `Brand`. Extend these with a prop before making a new one.
3. Shared class patterns live in `src/styles/app.css`: `.card`, `.question-card`, `.answer-card`, `.field`, `.chip`, `.option` and the rail cards.
4. Icons come from `lucide-react`, the same set the Figma kit uses. Match the icon name used in Figma.

## Rules from the kit

- Buttons are pill shaped. They are 48px tall by default and 40px when compact.
  - Primary is mint on ink text, for the main action.
  - Secondary is white with a 2px ink border.
  - Tertiary is white with no border.
- Focus uses a 2px green edge and a 4px soft ring (`--focus-ring`). Every interactive element needs a visible focus state.
- Cards use a 24px radius, a 1px border and 24px padding. A verified or correct state uses a 2px green border.
- Inputs are 52px tall with a 16px radius. Search fields are pill shaped.
- Mint is for actions and highlights only. Never use mint as body text on white.
- Pair every status colour with an icon or a label, so meaning never depends on colour alone.
- Headings use Nunito Sans (800 or 900). Body text uses Inter.

## Layout

- The desktop layout follows the Learning home example: top nav, 190px sidebar, main column and a 294px rail.
- Below 1100px the sidebar hides. Below 720px the mobile bottom bar from the kit takes over.
- Check new UI at 1440px and 390px wide with the run-loop skill.

## Copy

Follow the plain-writing skill for all UI text. If the Figma file isn't reachable, ask before guessing a value that has no token.
