# Stillpoint

A fictional meditation app, built specifically as a demonstration corpus for Spruce.

This directory contains the artifacts Spruce commands produce when run against Stillpoint. They exist to provide concrete examples for two places on the Spruce site:

1. The command catalog (`/commands`), which walks through all 20 Spruce commands using fragments of Stillpoint as the demonstration material.
2. The case study writeup (`/case-study`), which tells the narrative of building Stillpoint with Spruce.

Stillpoint is intentionally distinct from Spruce's own brand. To prevent style leakage, Stillpoint's design tokens are scoped under the `.stillpoint` CSS class and only activate inside elements wrapped in `<StillpointScope>` (or any element with `className="stillpoint"`).

Stillpoint is not a real product. It will not be deployed independently. It exists entirely as a teaching artifact for Spruce.

## Directory structure

```
src/case-studies/stillpoint/
├── README.md                 ← this file
├── content/                  ← text artifacts (.md content as typed exports)
│   ├── context.ts              · the .spruce.md content (/spruce-up output)
│   ├── sketch.ts               · the .sketch.md content (/sketch output)
│   ├── voice.ts                · voice samples for catalog demos
│   ├── microcopy.ts            · UI strings for catalog demos
│   └── imagery.ts              · asset registry (paths to public/case-studies/stillpoint/)
├── tokens/                   ← /foundations output: design tokens
│   └── stillpoint.css          · CSS variables scoped under .stillpoint
├── components/               ← /foundations + /design output: primitives
│   └── StillpointScope.tsx     · wrapper that applies the .stillpoint class
└── fragments/                ← /design output: composed surfaces (Stillpoint pages)

public/case-studies/stillpoint/
└── moodboard.png             ← /sketch reference image
```

Additional directories may appear as more commands run:

- `content/critiques/`, `content/surveys/`, `content/reviews/` — diagnostic outputs (`/critique`, `/survey`, `/uxreview`) typed as content exports.
- Per-command before/after snapshots in `fragments/` or `components/` when corrective commands (`/typeface`, `/colorgrade`, etc.) modify Stillpoint's existing artifacts.

## How the scope works

Stillpoint's design system uses warm sand and sage tones, a humanist sans + editorial serif typography pair, and a calm wellness voice — none of which overlap with Spruce's editorial restraint, deep spruce-green accent, and Fraunces + Hanken Grotesk pairing. The two systems coexist in the same site because:

1. **Tokens are scoped.** Every Stillpoint variable in `tokens/stillpoint.css` is defined inside `.stillpoint { ... }`. Variables only cascade to elements with that class.
2. **Variable names are prefixed.** Stillpoint tokens use `--stp-*` (for example, `--stp-color-bg`, `--stp-font-sans`) to avoid colliding with Spruce's own variables.
3. **A wrapper enforces the scope.** Any Stillpoint UI rendered inside the catalog or case-study surfaces is wrapped in `<StillpointScope>...</StillpointScope>`, which applies the `.stillpoint` class.
4. **The CSS loads once.** `app/commands/layout.tsx` imports `tokens/stillpoint.css`. Since the rules are scoped to `.stillpoint`, the import has no effect outside the scope.

## How commands write into this directory

| Command | Writes to | Example artifacts |
| ------- | --------- | ----------------- |
| `/spruce-up` | `content/context.ts` | The `.spruce.md` content as `stillpointContext` (object) and `stillpointContextMarkdown` (string). |
| `/sketch` | `content/sketch.ts`, `content/imagery.ts`, `public/case-studies/stillpoint/moodboard.png` | Visual direction across eight dimensions, plus the moodboard reference image. |
| `/foundations` | `tokens/stillpoint.css`, `components/`, `content/foundations.ts` | Design tokens, primitive components, and a brief system guide. |
| `/design` | `fragments/`, additional `components/` | Composed surfaces (Stillpoint home page, etc.) and any new components needed. |
| Diagnostic (`/critique`, `/survey`, `/uxreview`, `/detect`) | `content/{kind}/v{n}.ts` | Findings as typed content exports, paired with markdown for catalog rendering. |
| Corrective (`/typeface`, `/colorgrade`, `/arrange`, `/refine`, `/pace`, `/voice`, `/reduce`, `/fortify`) | Modifies existing files in `tokens/`, `components/`, `fragments/` | Before/after pairs may live as adjacent snapshots when needed for catalog demos. |
| `/finish` | `content/finish.ts` (verdict) | Ship-readiness verdict and remaining concerns. |

The catalog detail pages (`/commands/{slug}`) import from these locations to render their demos, so each command's catalog page shows real artifacts that command produced for Stillpoint.

## Importing into catalog demos

Tokens are loaded at the layout level (no per-demo CSS import needed). Demos render scoped UI like this:

```tsx
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";

export function FoundationsDemo() {
  return (
    <StillpointScope>
      <StillpointButton>Start Session</StillpointButton>
    </StillpointScope>
  );
}
```

Inside the scope, `var(--stp-*)` references resolve to the values defined in `tokens/stillpoint.css`. Outside the scope, those variables are undefined (and Spruce's own variables remain unaffected).
