# Spruce

A design reasoning system for AI-generated interfaces.

---

## Why Spruce Exists

AI can generate a UI in seconds. The problem is that most of those UIs share the same quiet failure: they look like design without actually being design. The hierarchy is plausible. The components are recognizable. The color palette is inoffensive. And yet something is missing — the sense that a human being thought carefully about the person who will actually use this thing.

Every AI model has been trained on the same statistical distribution of design choices. This produces strong attractors: specific choices the model reaches for reflexively because they're massively over-represented in training data. Inter on everything. The purple gradient. The 8-12px border radius. The friendly-professional SaaS voice. The three-equal-cards grid. The subtle drop shadow. The "Oops!" error messages. These aren't chosen — they're defaulted to. The result is interfaces that all look like each other, regardless of what product they're meant to be.

Spruce exists because looking designed and working well are not the same thing. Most AI design systems optimize for the former. Spruce is built around the latter — and around the belief that you, not the AI, should be the creative director.

---

## How It Works

Spruce is a skill system that installs into AI harnesses (Claude Code, Cursor, Gemini CLI, and others) and gives them deep design reasoning across seven dimensions of craft, plus a command set that lets you direct the AI's work with creative-director precision.

Where most AI design tools decide for you, Spruce:

- Reasons from context — the `.spruce.md` file encodes your product's character, audience, and preferences, and every command calibrates its output to those specifics.
- Surfaces decisions — major design tradeoffs are presented to you before execution, not resolved silently.
- Explains reasoning — every output can be re-run with full design thinking exposed, so you develop taste rather than dependency.
- Actively resists the AI defaults — the specific typography, color, component, and voice patterns that mark "AI generated" output are explicitly named and replaced with deliberate alternatives.

---

## What's Included

### The skill

A core skill file (`SKILL.md`) that orchestrates seven reference files covering every design domain:

| Reference | Covers |
|-----------|--------|
| UX Decision Patterns | Information architecture, feedback, forms, empty/error states, cognitive load, interaction contracts |
| Typography | Typeface selection, type systems, hierarchy, measure and leading, craft details |
| Color & Contrast | OKLCH reasoning, palette construction, neutrals, accent strategy, dark mode as a parallel system |
| Spatial Design | Spacing scales, proximity and rhythm, density as character, grid discipline |
| Component Patterns | Layout archetypes, component anatomy, state completeness, specific component categories |
| Motion & Interaction | Motion purpose, timing, easing, micro-interactions, scroll behavior, accessibility |
| UX Writing | Voice dimensions, button labels, error messages, empty states, terminology consistency |

Each reference file teaches the reasoning behind good decisions and names the specific anti-patterns AI tends to produce.

### The commands

Twenty commands organized into three tiers:

**Diagnostic** — analyze without changing code.
- `/survey` — comprehensive quality review across all seven dimensions
- `/uxreview` — UX-only review focused on the substrate
- `/critique` — opinionated design director feedback
- `/detect` — fast anti-pattern scan with command-pointers
- `/explain` — walk through the reasoning behind the most recent output

**Corrective** — fix specific problems in existing code.
- `/finish` — ship-ready final pass
- `/typeface` — typography corrections
- `/colorgrade` — color system corrections
- `/arrange` — spatial corrections
- `/refine` — component corrections
- `/pace` — motion corrections
- `/voice` — UX writing corrections
- `/reduce` — strip to essentials
- `/fortify` — edge cases and production readiness

**Generative** — create new work.
- `/design` — generate with full Spruce reasoning
- `/decide` — surface tradeoffs before generating (creative-director mode)
- `/remix` — generate three distinct design directions
- `/foundations` — generate a coherent design system
- `/sketch` — establish visual direction before tokens commit
- `/spruce up` — interactive context file setup

---

## Getting Started

> **Note:** Spruce is currently in early development. Installation instructions, provider-specific bundles, and the website will be available in the first release.

Once installed into your AI harness:

1. Run `/spruce up` to establish your project's context — character, audience, density, voice direction, and preferences.
2. Run any other Spruce command to generate, review, or correct design work calibrated to your project.

For example:

- `/design the onboarding flow` — generates an onboarding flow calibrated to your product's character.
- `/decide the pricing page` — walks you through the key design decisions for a pricing page before generating.
- `/survey` — reviews the current state of your project with findings and recommendations.

---

## Philosophy

Spruce is built around eight principles. The short version: design is a decision, not a style; function is the brief and aesthetics is the execution; context is not optional; the user is the creative director; principles without understanding are just rules; good UX is invisible and bad UX is all you see; restraint is a skill and confidence is a choice; the work is never just the component.

The full philosophy is in [`source/PHILOSOPHY.md`](source/PHILOSOPHY.md).

---

## Repository Structure

```
spruce/
├── source/             # Canonical source files — the truth
│   ├── PHILOSOPHY.md
│   ├── skills/spruce/  # Core skill and seven reference files
│   └── commands/       # Twenty command files
├── dist/               # Generated per-provider bundles (Claude Code, Cursor, etc.)
├── templates/          # The .spruce.md context file template
├── scripts/            # Build and packaging scripts
├── docs/               # Documentation source for the website
├── extension/          # Chrome extension (in development)
└── website/            # The public-facing spruce website
```

Edit source files in `source/`. The provider-specific distributions in `dist/` are generated by the build scripts, not hand-edited.

---

## Status

Spruce is in active development. The knowledge layer (philosophy, skill, references) and command layer (twenty commands) are complete. Still in development:

- Provider-specific build and packaging
- Chrome extension
- Documentation site
- Public website
- Installation flow

---

## License

Apache 2.0. See [`LICENSE`](LICENSE).
