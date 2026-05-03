# Architecture

The marketing site for Spruce — a design reasoning system that installs into AI coding tools. The site itself is the pitch: every section demonstrates the design quality Spruce produces.

For design tokens, primitives, and visual system rules, see [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). This document covers application structure, key mechanisms, and the patterns that hold them together.

## Stack

- **Next.js 16** with App Router and Turbopack (build + dev).
- **React 19** with `"use client"` only where state or effects require it; everything else is a Server Component.
- **TypeScript** with strict mode.
- **Tailwind CSS v4** with `@theme` for design tokens and `@custom-variant dark` for class-based dark mode.
- **`next/font/google`** for typeface loading (eight families across the site and demonstration surfaces).
- **Motion** (formerly Framer Motion) for shared-layout animations, AnimatePresence on conditional content, and FLIP-style layout transitions. Used surgically — most motion is still CSS — see the Motion section.

## Directory layout

```
app/
  layout.tsx                    Root layout — font variables, theme script, metadata
  page.tsx                      Composes the home page from section components
  globals.css                   Tailwind v4 @theme tokens, dark-mode class, base styles,
                                .surface-morph class for property transitions on demo surfaces
  commands/
    layout.tsx                  Persistent sidebar + main shell, wraps DetailFade
    page.tsx                    Index — essay introduction to the catalog
    [slug]/
      page.tsx                  Dynamic per-command route (19 prerendered via SSG)

components/
  Button.tsx Card.tsx Heading.tsx Link.tsx
                                Token-driven primitives (see DESIGN_SYSTEM.md)
  CodeBlock.tsx                 Shared code-rendering primitive (sm/md/lg, prompt prefix)
  Header.tsx                    Top nav + theme toggle
  Footer.tsx                    Single-row colophon
  Section.tsx                   Page-section wrapper with consistent vertical rhythm
  SectionHeader.tsx             Editorial eyebrow + § + rule pattern (rendered as h2)
  ThemeToggle.tsx               Light/dark/system toggle
  hero/                         Hero variants (HeroReduced is the live one; others
                                retained as exploration history)
  sections/
    Demonstration.tsx           Section frame + 19-command catalog grid
    Philosophy.tsx               Section frame
    Install.tsx                  Section frame
    demonstration/              The signature scroll-pinned demo (see below)
    philosophy/                 Philosophy variants (Strikethrough is live)
    install/                    Install variants (Parallel is live)
  commands/                     The /commands docs system (see below)
    data.ts                     Tier definitions + per-command content (all 19 full)
    CommandSidebar.tsx          Client component — sticky rail (lg+) / drawer (<lg) +
                                shared-layout em-dash marker (motion)
    CommandDetail.tsx           Server component — structured detail rendering
    DetailFade.tsx              Client wrapper — fades content between command routes
    BeforeAfterDemo.tsx         Shared shell for toggle demos (Pattern A)
    SpruceUpDemo.tsx            Setup — stepped Q&A → .spruce.md snippet
    FoundationsDemo.tsx         Generative — editorial token + primitive specimen
    DesignDemo.tsx              Generative — "Today" home screen mockup
    DecideDemo.tsx              Generative — stepped decisions → reflection screen
    RemixDemo.tsx               Generative — three side-by-side variants
    TypographyDemo.tsx          Corrective — daily reading card before/after
    ColorgradeDemo.tsx          Corrective — featured practice card before/after
    ArrangeDemo.tsx             Corrective — settings form before/after
    RefineDemo.tsx              Corrective — interactive Begin practice button
    PaceDemo.tsx                Corrective — drawer open/close, side-by-side timing
    VoiceDemo.tsx               Corrective — connection-dropped error before/after
    ReduceDemo.tsx              Corrective — practice library header before/after
    FortifyDemo.tsx             Corrective — state toggle (Loading/Empty/Error)
    FinishDemo.tsx              Corrective — ship-readiness verdict report
    SurveyDemo.tsx              Diagnostic — severity-tiered findings + action plan
    UxreviewDemo.tsx            Diagnostic — UX findings with state-completeness callout
    CritiqueDemo.tsx            Diagnostic — narrative essay (5 sections)
    DetectDemo.tsx              Diagnostic — domain-grouped scan report
    ExplainDemo.tsx             Diagnostic — decision-area walkthrough

hooks/
  useInViewOnce.ts              IntersectionObserver hook — fires once per element per
                                session; honors prefers-reduced-motion (returns true
                                immediately when set)

lib/
  motion.ts                     Motion tokens — EASE_CONSIDERED tuple, DURATION map,
                                MARKER_SPRING physics, FADE / LAYOUT_FLIP / PAYOFF
                                transition presets

.spruce.md                      Project context file — character, audience, voice
.claude/                        Spruce skill, reference docs, and slash commands
                                (this is what Spruce installs into a project; we
                                use it on ourselves to design the site)
```

The pattern of "live variant + retained alternates" reflects how the home page was built: every significant section was generated through `/remix`, evaluated, and one variant was wired into `app/page.tsx`. The unused variants are kept rather than deleted — they're useful reference for future iteration and they document the decision history.

## Page composition

`app/page.tsx` is intentionally flat:

```
Header
  HeroReduced
  PhilosophyCounterpointStrikethrough
  Demonstration
  InstallParallel
Footer
```

Each section is self-contained. There's no shared section state, no cross-section animation orchestration, no IA surfacing the page-as-an-arc. The arc is editorial — each section sets up the next through copy, not through code.

## Theme handling

Light/dark is class-based on `<html>`, controlled by a synchronous inline `<script>` in `<head>` that runs before first paint:

```js
// app/layout.tsx
const themeScript = `(function(){try{
  var s=localStorage.getItem('theme');
  var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(s==='dark'||(!s&&d))document.documentElement.classList.add('dark');
}catch(e){}})();`;
```

This is rendered as a raw `<script dangerouslySetInnerHTML>` rather than via `next/script`. With `strategy="beforeInteractive"` in App Router, `next/script` serializes the inline body into the RSC payload instead of emitting an executable inline script tag — so it never runs before paint. The plain script tag works; React 19 logs an informational warning that's expected and harmless. `suppressHydrationWarning` on `<html>` prevents hydration mismatches from the runtime class change.

CSS uses Tailwind v4's `@custom-variant dark (&:where(.dark, .dark *))` to drive variants from the `.dark` class.

## Motion

Motion is restrained by design — the `.spruce.md` describes motion as "considered, not crisp." The site uses Motion (formerly Framer Motion) surgically for the moments where shared-layout animation, AnimatePresence, or FLIP-style layout tweens are the right tool, and CSS transitions for everything else (hover state, color shifts, simple property changes).

### Token source of truth

`lib/motion.ts` exports the JS-side motion tokens that mirror the CSS tokens in `globals.css`:

```ts
export const EASE_CONSIDERED: [number, number, number, number] = [0.4, 0, 0.1, 1];

export const DURATION = {
  fast: 0.16,    // matches --duration-fast
  base: 0.24,    // matches --duration-base
  slow: 0.42,    // matches --duration-slow
  slower: 0.68,  // matches --duration-slower
};

export const MARKER_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

export const FADE = { duration: DURATION.base, ease: EASE_CONSIDERED };
export const LAYOUT_FLIP = { duration: DURATION.slow, ease: EASE_CONSIDERED };
export const PAYOFF = { duration: DURATION.slow, ease: EASE_CONSIDERED };
```

Why this file exists: before consolidation, every motion component embedded `[0.4, 0, 0.1, 1]` and ad hoc duration numbers (0.22, 0.26, 0.32). Values matched CSS tokens by accident, not by reference. The single source means the site's motion character is a property of the system rather than a coincidence across files.

### Motion patterns used on the site

- **Shared-layout markers.** The em-dash marker on the `/commands` sidebar that slides between active items, the accent underline on the home Demonstration's tab strip, the underline on `BeforeAfterDemo`'s toggle. All use `motion.span` with `layoutId` inside a `LayoutGroup` and the `MARKER_SPRING` transition. The marker reads as "one editorial mark moving" rather than "marker disappears here, appears there."
- **AnimatePresence on conditional content.** Used inside the Demonstration surfaces for elements that appear or disappear between phases (icons, gridlines, header eyebrow, sub-copy on the dashboard; "Most Popular" badge on pricing; sidebar label, save button vs auto-save indicator on settings).
- **Layout FLIP for structural rearrangement.** The home Demonstration's `SurfaceDashboard` wraps its metrics row + chart container in `motion.div layout` inside a `LayoutGroup`, so the `/arrange` phase's order swap animates as a synchronized FLIP rather than as a snap. `SurfacePricing` similarly wraps each tier in `motion.div layout` so the `/arrange` collapse from three equal cards to a 3/6/3 asymmetric layout reads as the cards repositioning.
- **Page transition.** `DetailFade` wraps the `/commands/[slug]` route content in `AnimatePresence` keyed on `usePathname`. Each navigation between commands triggers an exit on the previous content (small downward shift + fade) and an entry on the new one (small upward shift + fade), `mode="wait"` so they sequence rather than crossfade.
- **Stepped-demo entries.** `/spruce-up` and `/decide` use `motion.div` with `key`-based remount on each step; the FADE preset gives the new step a calm settled entry. The payoff artifact at the end (`.spruce.md` file, reflection screen) uses the PAYOFF preset for slightly more presence.
- **Demonstration surface property transitions.** A CSS class `.surface-morph` is applied to each surface root in the home Demonstration. The class transitions colors, borders, padding, font-weight, and similar across descendants with `var(--duration-base)` and `var(--ease-considered)`. When phase classes flip between phases, the swap animates rather than snaps. This is element-level diffing in CSS — the visitor sees only the properties each command actually changed.

### `prefers-reduced-motion` handling

Layered at three points:

1. **Global CSS rule** in `globals.css` reduces `transition-duration`, `animation-duration`, and `scroll-behavior` to ~0 for users with the preference set. Affects every CSS-driven transition.
2. **Motion library** automatically respects `prefers-reduced-motion` for JS-driven motion in v11+; we're on v12. Layout, AnimatePresence, and shared-layout transitions all degrade gracefully.
3. **`useInViewOnce` hook** checks the preference at mount and returns `inView=true` immediately when set, so viewport-triggered moments render to their final state directly without waiting for the IntersectionObserver.

The result: users with reduced-motion preferences see content arrive in its final state without animation; everyone else gets the considered curves and timings. No per-component opt-out is required.

## The Demonstration section

The most complex feature on the site. Lives in `components/sections/demonstration/`.

### What it does

A scroll-pinned arc shows three product surfaces transforming through five Spruce commands. The visitor sees the same surface go from "AI default" to "designed product" via `/arrange → /typeface → /colorgrade → /reduce → /refine`.

There are three surfaces (Dashboard, Pricing, Settings) selectable via tabs, and six phases (0–5) where phase 0 is the pre-command AI default and phases 1–5 each apply one command. The surfaces are deliberately different products — financial-analytics, consumer SaaS, enterprise admin — so the demo argues that Spruce produces *this product's* design rather than a single house style.

### Component tree

```
DemonstrationPreview      "use client" — master state, viewport split
  PinnedDemo              Desktop (lg+): scroll-pinned 500vh track
    TabStrip              Surface selection (shared-layout underline marker)
    SurfaceFrame          Surface viewport (16:10 aspect)
      SurfaceDashboard | SurfacePricing | SurfaceSettings
    TypedCommand          The /command rendered as code (AnimatePresence wait-mode)
    ProgressIndicator     Hairline progress bar
    PhaseLabel            Phase number + command label
  SteppedDemo             Mobile (<lg): tap-through stepper, same children
```

### Phase derivation

Desktop: scroll position within a 500vh pin track is mapped to a phase via:

```
phase = Math.min(PHASE_COUNT - 1, Math.floor(progress * PHASE_COUNT))
```

`progress` (0–1) comes from a `usePinScrollProgress` hook that reads `getBoundingClientRect()` on a scroll listener, throttled with `requestAnimationFrame`. The pinned area inside is `position: sticky; top: 0; height: 100vh`.

Mobile: phase is local component state, advanced/regressed with Next/Back buttons. Switching surfaces resets phase to 0 to avoid confusing handoff.

### Surface implementation pattern

Each surface (`SurfaceDashboard`, `SurfacePricing`, `SurfaceSettings`) takes a `phase: 0 | 1 | 2 | 3 | 4 | 5` prop and uses predicate variables to gate transformations:

```tsx
const post = (n: number) => phase >= n;
const isAfterArrange = post(1);
const isAfterTypeface = post(2);
const isAfterColor = post(3);
const isAfterReduce = post(4);
const isAfterRefine = post(5);
```

These predicates drive every conditional decision in the component — what classes to apply, which copy to render, what's structurally present. The pattern is verbose but readable: there's no clever abstraction sitting between the phase and the visual output, so anyone reading a surface can trace exactly what each command does.

### Per-surface typography and palette

Each surface loads its own typefaces and palette via CSS variables defined in `app/layout.tsx`:

| Surface   | Typefaces                              | Palette          | Character                |
|-----------|----------------------------------------|------------------|--------------------------|
| Dashboard | IBM Plex Sans + IBM Plex Mono          | Slate + amber    | Technical, financial     |
| Pricing   | Lora + Source Sans 3                   | Stone + rose     | Humanist, consumer       |
| Settings  | Mona Sans + JetBrains Mono             | Zinc + indigo    | Developer-tool admin     |

These differ from the site itself (Fraunces + Hanken Grotesk + JetBrains Mono, warm-neutral with spruce-green accent) because each surface represents a *different product*. The site's editorial system is what's selling Spruce; the demo surfaces are what Spruce produces for other contexts.

In phase 0 the surfaces converge on a generic AI-default appearance (white background, system-ui, mild blue accents) — this is realistic to how AI tools actually output, and the convergence-then-divergence is part of the demonstration's argument.

### Motion treatment

Each surface root carries the `.surface-morph` CSS class (defined in `globals.css`) which transitions the most common property changes (color, background, border, padding, font-weight) on every descendant when phase classes flip. This handles the visual majority of the per-phase changes — colors morphing across `/colorgrade`, padding tightening across `/arrange`, weight shifting across `/typeface`, radii adjusting across `/refine`.

Structural rearrangements (the `/arrange` phase swapping metric/chart order on Dashboard, or collapsing equal pricing cards into a 3/6/3 hierarchy on Pricing) use Motion's `layout` prop inside a `LayoutGroup` so the elements animate from one position to another via FLIP rather than snapping.

Element appearance/disappearance between phases (gridlines, icons, badges, the dashboard's header eyebrow, the settings save button vs auto-save indicator, pricing's "Most Popular" badge) uses `AnimatePresence` so elements fade in on entry and fade out on exit rather than popping.

The `TypedCommand` strip above each surface uses `AnimatePresence mode="wait"` keyed on phase, so the previous command label exits before the next one enters. The visitor reads "command X completed, now command Y running" rather than seeing two commands flicker over each other.

## The Commands docs system

A separate route at `/commands` documents all 19 Spruce commands in a sidebar-and-content docs layout. Each command has its own detail page at `/commands/[slug]`; all 19 have a bespoke demo embedded in the detail page that shows what the command produces.

### Routing

Three Next.js App Router files compose the system:

- **`app/commands/layout.tsx`** — persistent shell. Renders Header + Footer + a 12-col-aware grid that places the sidebar in a sticky left column on `lg+` and lets the main content fill the rest. The main content is wrapped in `DetailFade` so navigation between commands fades the previous content out and the new content in.
- **`app/commands/page.tsx`** — index. An essay introduction that frames the catalog by tier; doesn't list individual commands (the sidebar handles that). Reads as a manifesto, not as a re-grid of the home-page catalog.
- **`app/commands/[slug]/page.tsx`** — dynamic per-command route. Uses `generateStaticParams()` over `ALL_SLUGS` so all 19 commands are prerendered at build time. A `DEMOS` map maps each slug to its demo component.

### The catalog data model

`components/commands/data.ts` is the source of truth:

```ts
export type CommandTier = "setup" | "diagnostic" | "corrective" | "generative";

export type CommandData = {
  slug: string;        // anchor / route segment (no slash)
  name: string;        // with leading slash, e.g. "/typeface"
  tier: CommandTier;
  tagline: string;
  detail?: CommandDetail;   // full content for all 19; type allows stubs
};

export type Tier = {
  id: CommandTier;
  label: string;
  essay: string;       // rendered on the index page
  slugs: string[];     // order matters — drives sidebar + index ordering
};
```

`TIERS` defines the four-tier ordering: **Setup → Generative → Diagnostic → Corrective**. The order reflects a natural workflow path — set up the project, generate something, diagnose what was generated, correct what's drifted. `/spruce-up` lives alone in the Setup tier (lifted out of Generative for prominence as the entry-point command). `/finish` sits last in Corrective (the polish-before-shipping pass).

`COMMANDS` is keyed by slug. All 19 entries are now full (with `detail`); the type allows stubs but none remain.

### Sidebar

`CommandSidebar` is a client component (it needs `usePathname` for active state and `useState` for the mobile drawer). It renders two structurally different layouts from the same nav data:

- **Desktop (`lg+`)** — sticky `aside` in the layout's left grid column. Always visible.
- **Mobile (`<lg`)** — fixed top-left button labeled "Commands" that opens a slide-in drawer covering the screen. The drawer auto-closes on route change, on Escape, and on backdrop click. Body scroll is locked while open.

Active-state marker is a small em-dash positioned in the gutter to the left of the active item, in `text-accent`. The marker is a `motion.span` with `layoutId="sidebar-active-marker"` inside a `LayoutGroup` spanning every tier — so the marker animates between active items via shared-layout (slides between commands using `MARKER_SPRING` physics) rather than disappearing and reappearing.

### Detail page

`CommandDetail` is a server component that takes a `CommandData` and an optional `demo` slot. The detail page structure is consistent across all commands:

- Eyebrow `§ {Tier}` (mono caps)
- h1 — the command name in Fraunces display (`text-5xl md:text-6xl`)
- Italic Fraunces tagline
- Five sections, each with hairline rule + **regular Fraunces** heading:
  1. **What it does** — prose; demo embeds here (after the prose)
  2. **When to use it** — bullets
  3. **How to use it** — bare command + context paragraph + example invocations
  4. **Anti-patterns it addresses** — bullets, optional `slopAnchor` for future linking to a `/slop` page
  5. **See also** — related commands

Section headings use *regular* (non-italic) Fraunces so italic Fraunces stays reserved for content-bearing editorial moments — the page tagline, severity tier labels, anti-pattern names, decision questions, the `/finish` verdict, and demo section headings on `/critique` and `/explain`. Earlier the section headings were italic; that turned a special editorial gesture into the new default for headings. The current rule: italic Fraunces marks *content* moments (named things, displayed quotations, evaluative verdicts), not *structural* defaults that repeat on every page.

### Per-command demos

Demos are embedded inside the "What it does" section beneath the prose. All 19 commands have a demo. Six mechanic patterns coexist, each fitted to what the command actually produces.

**Pattern A — `BeforeAfterDemo` shell (toggle).** Two states with a toggle strip: AI default vs after-/command. Card-stage container, numbered markers on the after artifact, annotation legend below. Used by the six dimensional correctives: `/typeface`, `/colorgrade`, `/arrange`, `/refine`, `/voice`, `/reduce`. Each provides its own before + after artifacts and an annotations array; the shell handles the mechanic.

**Pattern B — Stepped reveal with payoff.** Visitor advances through ordered steps (Q&A or decisions); the demo accumulates the steps in a transcript and resolves into a payoff artifact at the close. Used by `/spruce-up` (5 questions → `.spruce.md` file snippet) and `/decide` (3 decisions → reflection-screen preview).

**Pattern C — Static specimen / mockup.** No interaction; the demo is the artifact the command produces. Used by `/foundations` (editorial token specimen sheet), `/design` (Today home screen), and `/remix` (three side-by-side variant cards labeled Editorial / Technical / Expressive).

**Pattern D — Side-by-side interactive comparison.** Two columns share a control; both columns respond simultaneously so the visitor experiences the difference. Used by `/pace` (drawer open/close toggle compares 360ms linear vs 240ms ease-considered) and `/fortify` (state toggle Loading/Empty/Error compares AI-default treatment vs `/fortify`-built treatment in both columns at once).

**Pattern E — Editorial document (structured findings).** Static rendering of the structured report the command produces. Card stage, mono-caps eyebrow at top, a body section with hairline-separated subsections (severity tiers, domain groupings, or audit blocks), inline command pointers in mono accent, a closing section. Used by `/detect` (domain-grouped scan + accessibility section + highest-leverage line), `/survey` (severity-tiered findings + numbered action plan), `/uxreview` (severity tiers with state-completeness audit callout + action plan), and `/finish` (prominent italic Fraunces verdict + polish list + tiered remaining concerns).

**Pattern F — Editorial document (narrative).** Same editorial register as Pattern E but prose-based rather than structured. Italic Fraunces section headings, body paragraphs with proper measure, hairline rules between sections, no bulleted findings. Used by `/critique` (5-section essay: Overall take / Character and POV / Coherence / Specific moments / Direction forward) and `/explain` (5-section walkthrough: Character direction / Layout archetype / Typography direction / Color direction / Voice direction, each as framing + reasoning pair).

Demo-card chrome is shared across all patterns: a `figure` element with a mono-caps "Demonstration" eyebrow at top-left, a complementary right-aligned label or interactive control (toggle, replay button), a bordered card-stage container, and a descriptive caption below.

### The cross-page workflow narrative

All 19 demos thread from the same hypothetical product context — a meditation app for parents established by `/spruce-up`'s sample interview. The same product flows through every demo:

| Command       | What the demo shows                                                  |
|---------------|----------------------------------------------------------------------|
| `/spruce-up`  | Interview captures the product's character into `.spruce.md`         |
| `/foundations`| Tokens calibrated to that character (Lora + Source Sans, Canvas + amber) |
| `/design`     | "Today" home screen using those tokens                               |
| `/decide`     | Reflection screen designed via guided decisions                      |
| `/remix`      | Three distinct directions for the same evening-practice surface      |
| `/typeface`   | Daily reading card — system-ui → Lora + Source Sans                  |
| `/colorgrade` | Featured practice card — blue/gradient → warm Canvas + amber         |
| `/arrange`    | Practice preferences settings — cramped → scale-conformant rhythm    |
| `/refine`     | Begin practice button — default-only states → all states covered     |
| `/pace`       | Drawer slide — 360ms linear vs 240ms ease-considered                 |
| `/voice`      | Connection-dropped error — "Oops!" → "Connection dropped"            |
| `/reduce`     | Practice library header — chrome accumulation → quiet title          |
| `/fortify`    | Practice library list — stubbed states → loading/empty/error built   |
| `/finish`     | Ship-readiness verdict on the meditation app                         |
| `/survey`     | Comprehensive findings on the meditation app                         |
| `/uxreview`   | UX findings + state-completeness audit on the meditation app         |
| `/critique`   | Narrative critique of the meditation app                             |
| `/detect`     | Anti-pattern scan on the meditation app                              |
| `/explain`    | Decision walkthrough for the Tonight home screen                     |

A visitor browsing the catalog in any order sees the same product surfacing across commands. The same Canvas color, type pair, and accent appear across every "after" state in the corrective tier; the same surfaces (practice library, reflection screen, account settings, evening practice card) recur across diagnostic findings, polish lists, and walkthroughs.

The "after" state in every corrective demo uses the meditation app's actual design system — not a generic disciplined treatment. `/typeface`'s after uses Lora + Source Sans (the meditation app's pair, established by `/foundations`); `/colorgrade`'s after uses warm Canvas + amber-700; `/refine`'s button is amber-700 in both states (color held constant; only state coverage differs). This means the corrective demos read as "Spruce running on this project" rather than "Spruce running on a generic project."

This is the catalog's quiet superpower: the workflow argument becomes tactile rather than described. Visitors don't read "Spruce produces coherent design across commands on a real project" — they see the same project being designed, scanned, polished, and shipped through 19 demos.

## Tailwind v4 + token strategy

`app/globals.css` uses Tailwind v4's `@theme` block to declare design tokens directly:

```css
@theme {
  --color-canvas: oklch(98% 0.01 75);
  --color-ink: oklch(20% 0.005 75);
  --color-accent: oklch(40% 0.07 158);
  --font-display: var(--font-fraunces);
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --ease-considered: cubic-bezier(0.4, 0, 0.1, 1);
  /* ... */
}

:root.dark {
  --color-canvas: oklch(15% 0.005 75);
  /* dark overrides */
}

@custom-variant dark (&:where(.dark, .dark *));
```

Plus a single application-specific class for the home Demonstration's surfaces:

```css
.surface-morph,
.surface-morph * {
  transition-property:
    background-color, color, border-color, border-radius,
    padding, margin, font-weight, opacity, box-shadow;
  transition-duration: var(--duration-base);
  transition-timing-function: var(--ease-considered);
}
```

Two consequences:

1. **Components reference tokens, never literals.** `bg-canvas`, `text-ink`, `font-display`, `duration-fast`, `ease-considered` — never `bg-stone-50` or `font-["Fraunces"]`. The exception is the demonstration surfaces, which deliberately use Tailwind palette utilities (`bg-blue-500`, `text-slate-900`) because they're emulating other products' visual systems, not the site's. The same exception applies to the corrective demos that use meditation-app-specific palette values (warm stone, amber-700) to thread with the meditation-app workflow narrative.

2. **Dark mode is automatic for token-driven components.** A component using `bg-canvas text-ink` flips correctly with no per-component dark variant. Components that read color literals directly will break in dark mode — this is the failure mode the token discipline prevents.

## Conventions

- **Server Components by default.** `"use client"` is added only where required (state, effects, event handlers, browser APIs). Client-heavy areas: the home-page demonstration's scroll-pinned mechanic, the commands sidebar (`usePathname` + drawer state), the `DetailFade` route transition, the stepped/interactive demos (`SpruceUpDemo`, `RefineDemo`, `DecideDemo`, `PaceDemo`, `FortifyDemo`), and the surface components for the home Demonstration (which use Motion components).
- **Section components compose, not inherit.** Each section composes `Section`, `SectionHeader`, layout primitives, and content. There's no Section base class.
- **Variants live alongside the live one.** When a home-page section was generated from `/remix`, the unused variants stay in `components/sections/<section>/`. They're not exported from `app/page.tsx` so they don't ship to the runtime, but they're available for reference.
- **Per-command demos opt in via the `DEMOS` map.** Adding a demo for a slug is one entry in `app/commands/[slug]/page.tsx`. Demos are kept in `components/commands/` rather than co-located with the command's content (which lives in `data.ts`); this separates JSX from data.
- **Demo-card chrome is shared across patterns.** Every per-command demo wraps in a `figure` with a mono-caps "Demonstration" eyebrow at top, a bordered card-stage container, and a descriptive caption below. Card stage uses `bg-surface` for most demos; demos working from the meditation-app context use Canvas (`#FAFAF9`) so the demo reads as "the generated system itself" rather than as the site's docs chrome.
- **Italic Fraunces is reserved for content moments, not structural defaults.** Page taglines, severity tier labels, anti-pattern names, decision questions, the `/finish` verdict, demo section headings on `/critique` and `/explain` — these are italic Fraunces. Detail-page section headings (which repeat on every page) are *regular* Fraunces. The discipline keeps italic Fraunces reading as a signature gesture rather than as the typographic default.
- **Motion uses tokens or `lib/motion.ts` presets, never inline values.** Inline `[0.4, 0, 0.1, 1]` arrays or magic-number durations are linted out by convention; reach for `EASE_CONSIDERED`, `DURATION.base`, `MARKER_SPRING`, or one of the named presets (`FADE`, `LAYOUT_FLIP`, `PAYOFF`).
- **Editorial restraint in copy.** Section eyebrows use `§ NN` notation; mono captions use `text-2xs uppercase tracking-widest`; em-dashes and middots are spelled (`&middot;` `&mdash;` or literal `·` `—`). The voice is direct and precise — see `.spruce.md` for the full character.
- **Command-page ledes follow a shared rhetorical pattern.** Each detail page opens by naming a concrete AI-default failure mode in the command's domain, then introduces the command as the response. The pattern is consistent enough to feel like one catalog and varied enough in *content* to avoid templated reading.
