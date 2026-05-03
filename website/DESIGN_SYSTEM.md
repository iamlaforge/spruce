# Design system

This foundation exists so every page on the site inherits coherence rather than inventing it surface by surface. Tokens live in `app/globals.css`; primitives live in `components/`.

## Character

Restrained and editorial. The site is selling a design reasoning system, so its own craft is part of the pitch. The system expresses this by holding most surfaces quiet and letting typography and layout carry the personality. No decorative flourishes, no performance of "designed-ness" — the precision itself is the signal.

## Key decisions

- **Typography.** Fraunces for display (variable serif with real character, not the AI-default geometric sans), Hanken Grotesk for body and UI (quiet neo-grotesque, humanist warmth, avoids Inter), JetBrains Mono for code. The big/serif + small/sans pairing is an editorial move — it gives the site expression at headline moments and quietude everywhere else.
- **Color.** Warm-neutral paper-biased surfaces (hue ~75°) with a deep spruce-green accent (`oklch(40% 0.07 158)`). No blue, no purple, no gradients. The accent is muted rather than emerald — evergreen, not mint.
- **Density.** Balanced. The type scale is restrained in steps (1.2 ratio) but extends to a deliberately large display size (96px) for editorial moments.
- **Radius.** Small and deliberate — 4px for controls, 8px for cards, 14px for large surfaces. Sharp enough to read as considered, not so sharp it reads as aggressive.
- **Elevation.** Border-forward. Shadows are reserved for popovers and modals; structural separation uses rules and space.
- **Motion.** Considered, not crisp. The `--ease-considered` default (`cubic-bezier(0.4, 0, 0.1, 1)`) has strong deceleration so arrivals feel settled. Durations lean slightly slower than typical app UI (160–420ms range).
- **Voice.** Direct and precise. Minimal words, no hedging, no marketing throat-clearing.

## How to extend

- **New components reference tokens, never literals.** `bg-accent`, not `bg-green-700`. `rounded-md`, not `rounded-[8px]`. If a value doesn't exist in the system, add a token before using it.
- **Follow the editorial pairing.** Display-weight headings use `font-display` (Fraunces); everything else uses `font-sans` (Hanken). Don't introduce a third body face.
- **Respect the three-weight restriction.** Regular, medium, semibold. Resist adding bold or light — the type system's restraint is part of its character.
- **State coverage is not optional.** Any interactive component must cover default, hover, active, focus (global `:focus-visible` handles this), disabled, and loading where applicable.
- **Dark mode is first-class.** If a component reads colors directly rather than via tokens, it will break in dark mode. Always reference `--color-*` tokens.
- **Asymmetry is a feature.** The context sets "tension over symmetry" as a tradeoff default — asymmetric layouts and off-center compositions are welcome, especially above the fold.

## What's not included

This pass covers design tokens across every domain plus five primitives: **Button**, **Link**, **Heading**, **Card**, and **Section/Container**. It doesn't yet include navigation components, form controls beyond buttons, modals, code-block components for the command catalog, or motion primitives. Build these on top of the existing tokens as they're needed — each addition should respect the character and patterns set here.

The current `app/page.tsx` is still the default Next.js starter — `/design` or `/remix` is the next step to build the actual site surfaces on top of this foundation.
