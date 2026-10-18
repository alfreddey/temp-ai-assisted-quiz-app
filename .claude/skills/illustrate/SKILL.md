---
name: illustrate
description: Make a UI more pleasing by adding relevant illustrations, photos or icons from free sources, referenced by stable links instead of downloaded into the project. Plans where each graphic goes, waits for approval, then adds them. Use when the user invokes /illustrate, or says things like "add graphics", "add illustrations", "add icons", "make the UI prettier", or "the pages look plain".
argument-hint: [optional - page, component or folder to illustrate; defaults to the project's main UI views]
---

Add graphics and icons to: $ARGUMENTS (if empty, use the project's main UI views).

## 1. Look before adding

- Read the target views, the layout, and the theme (colours, fonts, existing icon component).
- Note the brand accent colour. Graphics should match it.
- Find the spots that gain the most from a graphic:
  - Empty states (no data, no results, nothing pending).
  - Auth screens (login, register) side panels.
  - Landing or welcome hero.
  - Stat cards, section titles, list rows and buttons that need an icon to scan faster.
- Skip spots that are already busy. One graphic per screen area is usually enough.

## 2. Pick sources that give stable links

Never download graphics into the project. Link to a pinned, public URL instead. Check the licence allows free commercial use.

| Need | Source | Stable link pattern |
|------|--------|---------------------|
| Illustrations | unDraw via the `undraw-svg` npm package on jsDelivr | `https://cdn.jsdelivr.net/npm/undraw-svg@2.0.0/svgs/<name>.svg` |
| Icons (as files) | Lucide via `lucide-static` on jsDelivr | `https://cdn.jsdelivr.net/npm/lucide-static@1.47.0/icons/<name>.svg` |
| Photos | Unsplash (hotlinking is allowed by its licence) | `https://images.unsplash.com/photo-<id>?w=<width>&auto=format` |

Rules:
- Always pin an exact version in CDN links (never `@latest`), so the graphic never changes on its own.
- List available files before choosing, for example: `curl -s "https://data.jsdelivr.com/v1/packages/npm/undraw-svg@2.0.0?structure=flat"`.
- Check each chosen link returns `200` and an image content type with `curl -sI <url>`.
- Pick graphics whose subject matches the screen (a checklist for a task log, charts for reports), not generic decoration.

## 3. Colour graphics to match the brand

- unDraw SVGs use `currentColor` for their accent. Loaded as a plain `<img>`, the accent turns black. To get the brand colour, fetch the SVG at runtime and inline it inside a container that sets `color` to the brand colour.
- When inlining remote SVG, sanitise it first: remove `script`, `foreignObject` and `iframe` elements, and any `on*` attribute or `javascript:` value.
- Make loading fail quietly: a failed fetch leaves the space empty, never breaks the page.
- Wrap this in one small reusable component (for example `<x-illustration name="..." />` in Blade, or `<Illustration name="..." />` in React) plus one small loader module. Keep the base URL in a named constant.
- Mark decorative graphics `aria-hidden="true"`. Give meaningful photos real `alt` text.

## 4. Icons

- Prefer the project's existing icon component. If there is none, add one that renders inline SVG paths (Lucide paths work well) so icons inherit `currentColor` and need no network.
- Add icons where they help people scan: stat cards, section titles, status text, key buttons, list metadata.
- Do not add icons that repeat a word next to them just for decoration.
- Keep sizes consistent (for example 16px inline, 20px in section titles, 40px tile badges).

## 5. Respect the user's style rules

- No pills or soft tinted badges. Show status as plain text, coloured text, or a small dot with an icon.
- Keep labels short and plain. No new filler text alongside the graphics.
- Keep spacing tight. A graphic should fill an empty area, not add new white space.
- No long or short dashes in code, comments or text.

## 6. Plan, then wait

Before editing, show a short list:

```
resources/views/daily-log/index.blade.php
- empty state: undraw "empty" illustration (jsDelivr link, brand coloured)
- stat tiles: list, hourglass, clock icons
```

Say which links you will use. Then stop and wait for the user's OK. Apply only what they approve.

## 7. Apply and verify

- Add the component and loader once, then use them on each approved spot.
- Build the frontend and run the tests if the project has them. Report failures with their output.
- If a browser preview is available, check each changed page in light and dark mode, and at phone width, to confirm graphics load, take the brand colour and do not overflow.
- End with a short summary: what was added, per page, and the exact links used.
- Do not commit or push unless the user asks.
