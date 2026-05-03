# Spruce

A design reasoning system for AI-generated interfaces.

---

## Why Spruce Exists

AI can generate a UI in seconds. The problem is that most of those UIs share the same quiet failure: they look like design without actually being design. The hierarchy is plausible. The components are recognizable. The color palette is inoffensive. And yet something is missing — the sense that a human being thought carefully about the person who will actually use this thing.

Every AI model has been trained on the same statistical distribution of design choices. This produces strong attractors: specific choices the model reaches for reflexively because they're massively over-represented in training data. Inter on everything. The purple gradient. The 8-12px border radius. The friendly-professional SaaS voice. The three-equal-cards grid. The subtle drop shadow. The "Oops!" error messages. These aren't chosen — they're defaulted to. The result is interfaces that all look like each other, regardless of what product they're meant to be.

Spruce exists because looking designed and working well are not the same thing. Most AI design systems optimize for the former. Spruce is built around the latter — and around the belief that you, not the AI, should be the creative director.

There's a deeper move too: Spruce starts with users, not pixels. The Discovery tier produces named personas, jobs-to-be-done, journeys, and scenarios that downstream commands ground every decision in. Most AI design tools have no concept of users at all; in Spruce, that grounding is foundational.

---

## How It Works

Spruce is a skill system that installs into AI harnesses (Claude Code today; Cursor, Codex, VS Code, and Gemini coming) and gives them deep design reasoning across seven dimensions of craft, plus an HCD foundation layer and a command set that lets you direct the AI's work with creative-director precision.

Where most AI design tools decide for you, Spruce:

- Reasons from a foundation — `.spruce.md` captures your product's character; the Discovery tier writes `.personas.md`, `.jtbd.md`, `.journeys.md`, and `.scenarios.md` for the people the product serves; every other command calibrates its output to those specifics.
- Surfaces decisions — major design tradeoffs are presented to you before execution, not resolved silently.
- Explains reasoning — every output can be re-run with full design thinking exposed, so you develop taste rather than dependency.
- Actively resists the AI defaults — the specific typography, color, component, and voice patterns that mark "AI generated" output are explicitly named and replaced with deliberate alternatives.

---

## What's Included

### The skill

A core skill file (`SKILL.md`) orchestrates two layers of reference material — Discovery references for who the design serves, and Design references for how it expresses itself.

**Discovery references** — the HCD foundation:

| Reference | Covers |
|-----------|--------|
| Human-Centered Design | Orchestrating reference for the HCD tier; how personas, jobs, journeys, and scenarios feed downstream commands |
| Personas | Persona artifact format, three modes (draft from context / structure research / pressure-test), confidence labelling |
| Jobs-to-be-Done | JTBD theory, functional/emotional/social layers, cross-persona analysis |
| User Journeys | Touchpoint mapping, emotional arcs, current-state vs. future-state |
| Scenarios | Concrete narratives anchored to persona + job + moment |
| Research and Evaluation | HCD-grounded audit methodology, behavioral anti-patterns, severity tiers |

**Design references** — the seven dimensions:

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

Twenty-five commands organized into five tiers, in workflow order:

**Setup** — establish project context.
- `/spruce up` — interactive context file setup; writes `.spruce.md`

**Discovery** — ground the work in users.
- `/personas` — establish primary + secondary user types; writes `.personas.md`
- `/jtbd` — articulate functional/emotional/social jobs; writes `.jtbd.md`
- `/journey` — map persona + job through real touchpoints; writes `.journeys.md`
- `/scenarios` — anchor decisions in concrete moments; writes `.scenarios.md`
- `/audit` — HCD-grounded evaluation against named personas + jobs (the diagnostic counterpart of the Discovery tier)

**Generative** — create new work.
- `/sketch` — establish visual direction before tokens commit
- `/foundations` — generate a coherent design system (tokens + primitives)
- `/design` — generate with full Spruce reasoning
- `/remix` — generate three distinct design directions
- `/decide` — surface tradeoffs before generating (creative-director mode)

**Diagnostic** — analyze without changing code.
- `/survey` — comprehensive quality review across all seven dimensions
- `/uxreview` — UX-only review focused on the substrate
- `/critique` — opinionated design director feedback
- `/detect` — fast anti-pattern scan with command-pointers
- `/explain` — walk through the reasoning behind the most recent output

**Corrective** — fix specific problems in existing code.
- `/typeface` — typography corrections
- `/colorgrade` — color system corrections
- `/arrange` — spatial corrections
- `/refine` — component corrections
- `/pace` — motion corrections
- `/voice` — UX writing corrections
- `/reduce` — strip to essentials
- `/fortify` — edge cases and production readiness
- `/finish` — ship-ready final pass

---

## Getting Started

Install into Claude Code:

```sh
npx spruce-skill add
```

(Cursor, Codex, VS Code, and Gemini support is on the roadmap; see [`ROADMAP.md`](ROADMAP.md).)

Once installed, the workflow runs as a loop on a foundation:

1. **Setup.** Run `/spruce up` to establish your project's context — character, audience, density, voice direction, and preferences. Writes `.spruce.md`.
2. **Discovery (recommended, optional).** Run `/personas`, `/jtbd`, `/journey`, and `/scenarios` to ground the work in named users and the jobs they're hiring the product to do. Each command runs in three modes: draft from context when no research exists, structure user-supplied research when it does, or pressure-test a finished artifact.
3. **Generate / review / refine.** Run any of the generative, diagnostic, or corrective commands — each calibrates its output to the foundation you've established.

For example:

- `/design the onboarding flow` — generates an onboarding flow calibrated to your product's character and the personas you captured.
- `/decide the pricing page` — walks you through the key design decisions for a pricing page before generating.
- `/audit` — produces HCD-grounded findings tied to named personas + jobs (requires `.personas.md` + `.jtbd.md` in place).

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
│   ├── skills/spruce/  # Core skill, six Discovery references, seven Design references
│   └── commands/       # Twenty-five command files across five tiers
├── dist/               # Generated per-provider bundles (Claude Code today)
├── templates/          # The .spruce.md context file template + Discovery artifact templates
├── scripts/            # Build and packaging scripts
├── docs/               # Documentation source for the website
├── extension/          # Chrome extension (in development)
└── website/            # The public-facing spruce website
```

Edit source files in `source/`. The provider-specific distributions in `dist/` are generated by the build scripts, not hand-edited.

---

## Status

The knowledge layer (philosophy, skill, thirteen reference files), the command layer (twenty-five commands across five tiers), and the Claude Code distribution (`npx spruce-skill add`) are shipped. The public website is live with a complete catalog, a workflow page, an FAQ, and the Stillpoint case study demonstrating the end-to-end workflow.

In active development (see [`ROADMAP.md`](ROADMAP.md)):

- Imagery as an 8th design dimension
- Multi-tool support — Cursor, Codex, VS Code, Gemini
- Chrome extension
- Release notes section on the home page
- Additional case studies

---

## License

Apache 2.0. See [`LICENSE`](LICENSE).
