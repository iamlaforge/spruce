# Roadmap

Forward-looking work for Spruce. Items here are planned but not yet scoped or scheduled — they represent identified gaps and additions that should land in a future release.

## Recently shipped

- **Multi-tool support — all five major AI coding tools.** Spruce now installs into Claude Code, Cursor, Codex CLI, VS Code (with GitHub Copilot), and Gemini CLI via the same `npx spruce-skill add` command. Architecture: thin install wrapper around [`vercel-labs/skills`](https://github.com/vercel-labs/skills) (the open agent-skills installer) plus harness-specific build outputs at `.claude/skills/`, `.cursor/skills/`, `.github/skills/`, `.gemini/skills/`, and `.agents/skills/` — the same canonical source files (`source/commands/*.md`, `source/skills/spruce/`) authored once, written to each harness's expected path by `scripts/build.js`. 25 commands × 5 harnesses = 125 skill directories, plus 25 Claude Code slash commands at `.claude/commands/` for the slash UX. Each harness's adherence varies — Gemini is the strictest skill-follower (announces "Skill design activated" in its UI, cites `.spruce.md` in code comments), Codex and Cursor are clean, Copilot's training prior leaks through on specific avoid-list items in `/design`'s autonomous pass but the corrective tier (`/typeface`, `/refine`, etc.) reliably cleans them up via direct user instruction. Architecture validation: each new harness compatible with the [Anthropic Agent Skills](https://agentskills.io/specification) spec is a one-line addition to `HARNESS_SKILL_DIRS` in the build — proven across the rollout from Cursor (v0.3.0) → Codex (v0.4.0) → VS Code Copilot + Gemini (v0.5.0).
- **Discovery tier (HCD) — five commands + visual artifact demos.** A new Discovery tier shipped between Setup and the generative loop: `/personas`, `/jtbd`, `/journey`, `/scenarios`, `/audit`. Each produces an HCD artifact (`.personas.md`, `.jtbd.md`, `.journeys.md`, `.scenarios.md`, audit findings) downstream commands read from. Three modes per command — draft from `.spruce.md` context when no research exists, structure user-supplied research, or pressure-test a finished artifact for assumptions. `/audit` is the diagnostic counterpart — the only diagnostic command that frames findings against named personas + jobs rather than general principles; cross-references added to `/survey`, `/uxreview`, `/critique`, `/detect`, and `/finish` naming the distinct value of each lens versus `/audit`'s HCD-grounded frame. Stillpoint case study has working artifact files for all five (Maya + Jordan personas, six jobs across three layers, current/future morning-practice journey, two scenarios, HCD-grounded audit with severity tiers and behavioral anti-patterns). Each command page on the website renders the artifact in its proper visual format — persona canvas (header band with geometric avatar + name + role + anchor quote, four-quadrant body, informs-design footer band), job map (canonical When / I want to / So I can three-part flow plus a cross-persona panel surfacing diverging + conflicting jobs), journey map (phase band + smooth SVG emotional-arc curve as the inline preview, full artifact with touchpoint swim lanes opens in a Lightbox built on native HTML `<dialog>` with focus trap, ESC, and backdrop-click close), scenario cards, audit findings document with severity badges and persona-grounded "Affects" lines. Inline-expand pattern (`ExpandablePanel`) on `/personas`, `/jtbd`, and `/audit` preserves each artifact's signature element even when collapsed; the Lightbox is reserved for `/journey` since the format itself needs a wider viewport than the command-detail container allows.
- **Homepage + workflow repositioning around HCD foundation.** Hero tagline shifted from "design reasoning system that teaches AI tools how to think" to "The only AI design reasoning system that starts with users, not pixels" — supporting copy reinforces grounding in real people and the jobs they're doing rather than the average of training data. Philosophy section's alternative movement leads with the same positioning claim and unpacks the three-levels framing: the grounding makes the reasoning specific; the reasoning runs in the background; the commands put you in the chair. `/designing` reframed from "the loop in five moments" to "the loop on a foundation" — Discovery is a Foundation phase between Set up and the iteration loop, with a DiscoveryArtifact (Maya persona tile + footer naming the other Discovery artifacts). LoopVisualization extended with a foundation strip beneath the Decide/Review/Refine triangle naming the context files (`.spruce.md` + Discovery artifacts) the loop reads from, animated to land as the diagram's closing beat.
- **Stillpoint case study artifact.** A complete Stillpoint marketing site lives at `/case-study` (home page) and `/case-study/practice/[slug]` (three practice detail pages — Morning Grounding, Mid-day Reset, Evening Wind-down). Stillpoint is the hypothetical meditation app that threads through every demo in the catalog; the case study surfaces it as the cumulative live result of running the full Spruce workflow. Includes a Stillpoint design system scoped under `.stillpoint` class (Söhne + Lora typography, warm-cream palette with sage primary, sage→peach gradient in light / sage→lavender in dark on the personalization banner), a full set of Stillpoint primitives (Button, Card, Input, Heading, Link, Scope, ThemeToggle), first-class dark mode that cascades with Spruce's theme via CSS scope, and a thin Spruce context banner above each case-study route for navigation back to the catalog. Discreet links from `/commands` and `/designing` point visitors to the artifact.
- **Stillpoint catalog narrative thread.** Every demo in the catalog rebuilt to ground in the Stillpoint case study. Diagnostic tier (`/survey`, `/uxreview`, `/critique`, `/detect`, `/explain`) renders findings against the actual Stillpoint home; corrective tier (`/voice`, `/typeface`, `/refine`, `/colorgrade`, `/pace`, `/reduce`, `/fortify`, `/arrange`, `/finish`) shows before/after diffs on real Stillpoint surfaces. Four correctives gate real visible changes that ship to the case study via the `applied`-command iteration system; the soft-fit correctives carry visible "On Stillpoint" demo notes naming what's illustrative versus what shipped — keeping the catalog honest about which corrective work the case study actually contains.
- **Releases section on the homepage.** New `§ 05` section at the close of the homepage, server-fetches the latest GitHub releases at build time with hourly ISR revalidation. Renders the most recent four entries (capped to keep the section tight) as a two-line release-notes list — title (linked to the GitHub release) on the top line + date right-aligned, single-paragraph summary below in muted mono. No editorial display headline, no per-entry "Read full release" link; the title itself is the link, the section reads as a release-notes list rather than another marketing beat. Closing pointer to the full GitHub releases page. Optional `GITHUB_TOKEN` env var supported for private repos or to raise the unauthenticated rate limit. Graceful fallback when the API returns nothing.
- **Tutorials surfaces.** `/designing/tutorials` lists situation-shaped walkthroughs ("From scratch," "Inherited code," "Critique-driven," "In the browser" — last is a coming-soon placeholder reserved for the Chrome extension). `/designing/tutorials/[slug]` renders each walkthrough as a sequence of beats. Lives under a shared layout with `/designing` via a Workflow / Tutorials tab bar.
- **FAQ surfaces.** `/faq` dedicated page with nine questions across three groups (The system / Using it / License & support). Homepage FAQ accordion module (`§ 04`) surfaces a curated four for first-time visitors, with shared data source in `lib/faq.tsx`.
- **Homepage interactivity consolidation.** The Terminal section's three stacked snippets became one tabbed terminal (tabs inside the dark surface, terminal-app pattern). The Install section's three vertically-stacked patterns became tabs above a single panel with body copy restored. Both use the same shared-layout marker animation as the Designing tab bar — coherent vocabulary across all tabbed surfaces on the home page.

---

## Up next

### Imagery as an 8th dimension

Spruce currently has seven design dimensions (Typography, Color, Spatial, Component, Motion, UX Writing, UX Patterns). **Imagery is not first-class** — the `/spruce-up` interview doesn't ask about it, the `.spruce.md` template has no dedicated Imagery preferences section, no reference file documents imagery principles or anti-patterns, and no corrective command exists for imagery work.

A user installing Spruce today can't cleanly indicate "I want photography on my site," "I want generative illustration," "no imagery, typography only," or any other imagery direction through the structured interview. They'd have to express it indirectly in Character, "What this should NOT feel like," or Notes — and even then Spruce would have no reasoning about how to apply imagery decisions.

**Scope of the addition:**

- **Reference file** — `references/imagery.md` documenting imagery principles (when imagery serves the product, when it doesn't), categories (functional product imagery, decorative/character, diagrammatic, brand mark), and an anti-pattern catalog (stock photo defaults, abstract gradient blobs, AI-generated illustration tropes, hero-with-abstract-blob, decorative-without-purpose imagery).
- **`/spruce-up` interview question** — adds an imagery preferences moment to the conversation, calibrated to the product's character.
- **`.spruce.md` template section** — dedicated "Imagery preferences" section parallel to "Typography preferences" and "Color preferences," covering yes/no, what kind, what to avoid.
- **`/imagery` corrective command** — operates on existing imagery in code, applying the imagery reference's discipline. Removes decorative-without-purpose imagery; flags stock-photo or AI-generated tropes; recommends functional alternatives.
- **`/detect` and `/survey` updates** — anti-pattern catalog from the imagery reference file gets included in scans; severity-tiered findings cover imagery alongside the other dimensions.
- **Catalog page additions** — `/imagery` gets its own detail page with bespoke demo (probably a before/after showing decorative-stock-photo replaced with functional product imagery, or a side-by-side of imagery directions for the same product).

**Why next release rather than now:** Adding a dimension touches the reference files, the interview, the template, the data model, and adds at least one corrective command. It's a meaningful expansion rather than an incremental fix, and it deserves its own release window with proper scoping and design.

### Live browser iteration

A new interaction surface that lets the user pick an element in their running app and have Spruce generate three meaningfully distinct variants — rendered live in the actual product, side-by-side, with tunable parameters — then accept one into source. Pairs with `/decide` and `/remix` to make the creative-director seat literal: instead of choosing between text-described directions, the user sees them in their own product before committing.

Pattern validated by Impeccable's `live` system, which is the most differentiated capability in their stack. The architecture there is well-formed and worth borrowing rather than reinventing: a small local HTTP helper server, a picker script injected into the app's HTML, screenshot + annotation capture, an LLM round-trip that writes three variants as scoped HTML+CSS in a single source edit, and HMR-driven live preview. Acceptance rewrites the chosen variant as permanent code and cleans up the temporary scaffolding.

**Scope of the addition:**

- **Helper server** — a small Node script (`live.mjs` equivalent) that runs on localhost, serves the picker UI and SSE endpoints, shuts down cleanly. Stateless. Lives only in development.
- **Browser picker** — injected script that lets the user click an element, optionally annotate with strokes or comments, choose a Spruce action (`/decide`, `/remix`, or a corrective like `/typeface`), and trigger the variant generation.
- **Variant generation hook** — Spruce reads the screenshot + annotation, loads the relevant Discovery artifacts and design tokens, and generates three variants on different design axes. Writes all three as scoped HTML+CSS in a single source edit so HMR shows them simultaneously.
- **Parameter tuning** — exposed parameters per variant (density, color, scale, motion) with instant visual feedback. No regeneration cost.
- **Accept flow** — chosen variant rewritten as permanent code; other variants and scaffolding cleaned up; one commit per accepted iteration.
- **Site addition** — `/designing/tutorials/live-iteration` walkthrough showing a real iteration session on Stillpoint.

**Pairs especially well with `/decide` and `/remix`:**

- `/decide` already surfaces 2-4 directional tradeoffs as text, then generates from the user's answers. Live mode renders the chosen direction in the actual app before committing — the user sees the call rendered before saying yes.
- `/remix` already produces three distinct directions. Live mode renders them side-by-side in the real product surface rather than as separate text descriptions. The choice becomes a glance, not a parsing exercise.

**Why this fits Spruce's identity:** the user-in-the-creative-director-seat principle is already explicit in `/decide`. Live mode amplifies it by making direction choices tangible in the visitor's actual product, rather than abstract in chat. It doesn't dilute the HCD-first ethos — it adds an interaction surface that makes the creative-director model more visceral.

**Distinct from the Chrome extension** (separate roadmap entry below): the extension audits any web page from the browser. Live iteration runs against your own dev server with a Spruce-aware picker. Different products, different surfaces — both legitimate, neither subsumes the other.

### `.design.md` foundational artifact

A new project artifact alongside the Discovery quartet (`.personas.md`, `.jtbd.md`, `.journeys.md`, `.scenarios.md`), capturing the design language as **tokens plus named reasoning rules**. Today, `/foundations` generates tokens scattered in code; consolidating them into a structured artifact — with the *why* preserved alongside the values — closes the foundation chain so every downstream command reads the same source of truth for both design intent and design execution.

Pattern validated by Impeccable's DESIGN.md, which captures both the literal token values (OKLCH colors, type scale, spacing, components) **and** the named reasoning rules behind them ("The Paper-Not-White Rule," "The One Voice Rule"). The opening of their DESIGN.md encodes the system's philosophy in 131 characters: *"Warm-paper editorial sanctuary — committed serif display, one decisive magenta, flat surfaces at rest."* Spruce's equivalent would do the same — tokens in machine-readable form, named rules in prose, both load-bearing for downstream commands.

**Scope of the addition:**

- **Artifact format** — YAML or structured-markdown frontmatter for atomic tokens (colors in OKLCH, type scale, spacing, radii, shadows, motion durations + easings), then prose sections for component specifications (button, card, input, navigation), named reasoning rules ("The X Rule" pattern), and an explicit anti-patterns section naming what this system will not do.
- **`/foundations` extension** — currently emits tokens into code; extends to also write `.design.md` as the canonical artifact. Subsequent code generation reads from `.design.md` rather than re-deciding tokens.
- **Other commands read `.design.md`** — `/design`, `/critique`, `/refine`, `/colorgrade`, `/typeface`, `/finish` all calibrate against it. The named rules become enforceable: if `/critique` sees a design that violates "The One Voice Rule," it flags it specifically rather than generally.
- **Discovery + Design symmetry** — `.spruce.md` (project context) + `.personas.md`/`.jtbd.md`/`.journeys.md`/`.scenarios.md` (Discovery foundation) + `.design.md` (design foundation) together form the complete project foundation. Every generative and corrective command reads from this stack.
- **Catalog page update** — `/foundations` page renders the artifact format alongside the existing demo, mirroring how `/personas`, `/jtbd`, etc. now show their artifacts visually.

**Why next:** completes the foundation chain. Discovery shipped (the user-side foundation); `.design.md` is the design-side foundation. Together they ground every downstream decision in a single project-specific source of truth.

### Energy-modulation correctives: `/bolder`, `/quieter`

Two new commands in the corrective tier that modulate the **overall character** of a design rather than fixing a specific dimension. Today's correctives operate per dimension (`/typeface` for typography, `/colorgrade` for color, `/arrange` for spatial). Energy correctives operate orthogonally — they push the whole design toward more visual confidence (`/bolder`) or more disciplined restraint (`/quieter`) without restarting the reasoning chain.

Pattern validated by Impeccable's `bolder`, `quieter`, `delight`, `overdrive`. Their `bolder` opens with the right framing: *"AI defaults to the same tired tricks: cyan/purple gradients, glassmorphism, neon accents on dark backgrounds. True boldness rejects these clichés, instead increasing impact through stronger hierarchy, committed scale, and decisive typography."* `/quieter` opens with the harder discipline: *"Quiet design is harder than bold design. Subtlety needs precision."*

**Scope of the addition:**

- **`/bolder`** — pushes typography toward extreme scale jumps, color toward saturated and unexpected palettes, layout toward asymmetric drama, while explicitly rejecting AI-trope substitutes (gradient text, glassmorphism abuse, neon-on-dark). Calibrated to context: best for marketing-forward products where confidence matters; restrained dashboards stay restrained.
- **`/quieter`** — controlled palette, expanded whitespace, animation flourishes removed, decorative elements stripped. Surgical, not removal-for-removal's-sake. Hierarchy and character preserved.
- **Pairing with `/decide`** — after directing a design, the user can dial energy with `/bolder` or `/quieter` without restarting. Natural follow-on to the creative-director model.

**Why included rather than considered for later:** small in code (one corrective each), but they fill a gap in the corrective tier — character-level adjustment without dimension-by-dimension grinding. Cap at two; resist scope creep into `/delight`, `/overdrive`, etc. unless the catalog actually demands them.

### `SPRUCE_PREFLIGHT` declaration pattern

A system-wide reliability pattern that requires Spruce to state its readiness before file edits. Catches premature implementation — the AI can't quietly skip context loading and start coding.

Pattern validated by Impeccable's preflight declaration:

```
IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=pass shape=pass image_gate=pass mutation=open
```

Spruce's equivalent would force explicit confirmation that the foundation files have been loaded:

```
SPRUCE_PREFLIGHT: spruce_md=pass personas=pass|absent jtbd=pass|absent journeys=pass|absent design=pass|absent
```

This makes the HCD foundation actually load-bearing rather than just present. Today, Spruce's commands assume the AI will load `.personas.md` and `.jtbd.md` before generating. Sometimes it does; sometimes it skips. Preflight blocks the skip.

**Scope of the addition:**

- **SKILL.md update** — adds the preflight protocol to the orchestrating skill. Every generative and corrective command must declare its preflight state before mutating code.
- **Per-command guidance** — each command's "When to use" section gets a one-line preflight expectation (e.g., `/design` requires `personas` and `jtbd` to pass; `/typeface` requires `design`; `/critique` requires Discovery artifacts when present).
- **Failure mode** — if preflight fails for a required artifact, the command pauses and either prompts the user to run the appropriate Discovery command first, or proceeds with explicit acknowledgment ("running `/design` without personas — output will be calibrated to `.spruce.md` context only").

**Why included:** small in scope, high in reliability impact. The Discovery tier shipped; preflight is what makes it actually load-bearing rather than aspirational.

---

## Site additions

### Case studies (extending Stillpoint, second + third cases)

The Stillpoint case study shipped (see Recently shipped above) — a marketing home page + three practice detail pages live at `/case-study`. Forward work splits into extending Stillpoint and adding additional cases.

**Extending Stillpoint:**

- **More surfaces.** Stillpoint currently covers home + practice detail. Natural extensions: signup confirmation, account settings, practice library list, today/dashboard view. Each new surface lets more correctives do real work (the soft-fit `/colorgrade`, `/pace`, `/reduce`, `/arrange`, `/fortify` demos all carry "On Stillpoint" notes acknowledging that Stillpoint's current single-page surface didn't give them substantive incremental work — additional surfaces would close those gaps).
- **Real `/finish` pass.** The `/finish` demo's polish-applied list claims eight items (smart-quote sweeps, contrast confirmation, focus-ring offset audit, optical icon centering, etc.) as already-applied. Some of those are aspirational. Running `/finish` for real on the case study would close the gap between the verdict the report claims and the quality the artifact actually delivers.
- **Ship readiness.** Mobile responsiveness pass; final accessibility audit; lighthouse scoring; SEO surface check. The case study reads as "this is what Spruce produces" — making sure it actually meets the bar implied is worth doing.

**Additional case-study paths:**

1. **Document the Spruce site itself.** Meta-honest: the Spruce marketing site IS a Spruce-designed product. Show the design conversation, the `/spruce-up` setup, the iterative `/critique` rounds, the corrective passes. Visitors see Spruce eating its own dog food. Lowest external dependencies — the work is already done; documentation is the deliverable. Naturally pairs with the STYLE.md prose discipline addition below — the case study would document not just the design decisions but the editorial discipline that keeps the site's own marketing copy from reading as AI-generated.
2. **Partner case study.** Find a real company/product that's used Spruce, document their experience. Highest-credibility but depends on external partnerships.

**Implementation pattern (for future cases):**

- New cases would live at `/case-study/[case-slug]/` rather than at the route root, so Stillpoint becomes one case among several.
- Each case structured as: brief / setup → key decisions → corrective passes → final ship. With artifacts at each stage (reference imagery → tokens → mockups → live ship).
- The Stillpoint scaffold (StillpointScope wrapper, design-system tokens, primitives, content modules) is the reusable pattern — new cases would mirror this with their own scope class and tokens.

### STYLE.md prose discipline for spruce-website

A meta-quality addition: the spruce-website repo gets its own `STYLE.md` editorial brief plus a build-time validator that catches AI-prose tells in user-facing copy. Build fails if any appear.

Pattern validated by Impeccable's STYLE.md, which opens with the right framing: *"for every paragraph, point to the sentence that makes it specifically yours. If you can't, the paragraph is AI by default, even if a human typed it."* Their build-time `validateProse` function rejects "load-bearing", "highest-leverage", "biggest unlock", "delves", "elevate", "empower", "let's dive in", "tapestry", em-dashes, double-hyphen substitutes, and several other AI-prose patterns. Build fails if matched in user-facing copy.

This is exactly Spruce's anti-attractor philosophy turned on Spruce's own marketing surface. The site claims to help visitors resist AI defaults; ensuring the site itself doesn't default into them is practicing what we preach.

**Scope of the addition:**

- **`STYLE.md` in spruce-website** — editorial brief explaining the discipline, the denylist of banned phrases with rationales, and guidance about deeper patterns that need human judgment (audience-pandering openers, throat-clearing transitions, hollow positives, marketing-template structure).
- **Build-time validator** — small script in spruce-website's build pipeline that scans `app/`, `components/`, `lib/`, and the homepage prose for matches. Fails the build if any appear in user-facing surfaces. Scoped to user-facing copy only (not source command files, where technical phrasings are appropriate).
- **Coverage** — homepage section copy, FAQ answers, tutorial walkthrough text, install page copy, case study narratives, README. Excludes: command files, ARCHITECTURE.md, internal documentation.

**Why included:** small surface, high editorial value, fast to ship. Pairs naturally with the "document the Spruce site itself" case-study path — the case study would surface the editorial discipline as part of the design story.

---

## Distribution + integrations

### Chrome extension

A browser extension for Spruce. Scope and purpose to be defined — possibilities include:

- **In-page design audit** — run Spruce reasoning against any open web page (analyze typography, color, spacing, motion in the live DOM and report findings).
- **AI tool injection** — a way to install Spruce reasoning into AI tools that don't have native CLI install (e.g., chat-based tools, web-based AI editors).
- **Design-system inspector** — surface the design tokens, type scale, color palette of any page for inspection or comparison.
- **Spruce companion** — quick access to the catalog, reference files, or `/decide` flow from any page.

The product question is *what does the extension do that the CLI doesn't* — answering that defines the scope. The "In the browser" tutorial slot at `/designing/tutorials/chrome-extension` is reserved as a placeholder; when the extension ships, that walkthrough lands with it.

**Relationship to Live browser iteration** (separate roadmap entry under Up next): both touch the browser, but they're distinct surfaces. The extension audits *any* web page from the browser chrome — designed for inspecting other people's products or evaluating the wild. Live browser iteration runs against the user's *own* dev server with a Spruce-aware element picker — designed for in-flow design work on whatever the user is actively building. They could share infrastructure (the picker UI, the design-token extractor) but serve different jobs and ship independently.

### Figma read + write

Bidirectional integration with Figma so Spruce reasoning crosses the design ↔ code boundary in both directions.

**Read from Figma:**

- A Spruce command that ingests a Figma file (or specific frame/component) and treats it as design input — extract typography, color tokens, spacing, component structure, and layout into the same reasoning Spruce applies to code.
- Use cases: auditing an existing Figma design with `/survey`, `/uxreview`, or `/critique`; pressure-testing tokens in a Figma file with `/typeface`, `/colorgrade`, or `/refine`; running `/audit` against a Figma prototype with HCD artifacts already in place.
- Tactical question: how granular — file-level, page-level, frame-level, or component-level scope.

**Write to Figma:**

- A Spruce command that produces Figma artifacts as output — generate a moodboard from `/sketch`, push tokens from `/foundations` into Figma variables, write a persona canvas from `/personas` as a Figma frame, materialize a journey map from `/journey` with proper swim lanes.
- Use cases: design-team handoff (Spruce-generated context becomes Figma source-of-truth), parallel design-and-build workflows (the Discovery artifacts live in Figma alongside the codebase).
- Tactical question: how to handle round-tripping — is the relationship one-directional (Spruce → Figma) or symmetric (changes in either propagate)?

**Implementation considerations:**

- Likely uses Figma's REST API (read) and Plugin API (write). The MCP integration with Figma (already available for Claude Code via `claude_ai_Figma`) is a possible bridge layer that simplifies authentication and makes the integration tool-agnostic across harnesses.
- Authentication: Figma personal access tokens for individual use; OAuth for team/enterprise once that's relevant.
- Scope: start with read (lower complexity, immediate value for evaluation/audit workflows), then write (more complex, opens up generative + handoff workflows).

**Why on the roadmap:** Figma is where most design teams already work. Crossing the design ↔ code boundary makes Spruce useful in mixed workflows where some work happens in Figma and some in code, rather than forcing teams to commit fully to a code-first approach.

### Discovery commands → Figma artifacts

Once the Figma write integration is in place, extend the Discovery tier so each command can materialize its artifact as a Figma frame in addition to writing the canonical `.md` file.

**The disconnect today:** Discovery commands produce markdown — `.personas.md`, `.jtbd.md`, `.journeys.md`, `.scenarios.md`, audit findings. That's the canonical, version-controlled source of truth. But there's no visual rendering for handoff or team review. The Spruce marketing site shows what the artifacts *could* look like rendered (persona canvas with quadrants, job map with When / I want to / So I can flow, journey map with swim lanes and emotional arc), but those are React components on the site — not output that users get when they run the commands in their own projects.

**Scope when the Figma integration is available:**

- **`/personas` → Figma persona canvas frame.** Header band with avatar mark + name + role + anchor quote, four-quadrant body (Context+Expertise / Jobs / Motivations / Fears+Constraints), informs-design footer. Per persona; primary + secondary canvases as a paired frame.
- **`/jtbd` → Figma job map frame.** Per-job three-part flow (When / I want to / So I can) with persona grouping and per-layer (functional / emotional / social) sectioning. Cross-persona panel renders shared / diverging / conflicting jobs with the conflict visualization.
- **`/journey` → Figma journey map frame.** Phase band, smooth emotional-arc curve as a vector path, touchpoint columns with swim lanes (Action / Thought / Friction / Opportunity). Current-state and future-state as paired frames for direct comparison.
- **`/scenarios` → Figma scenario cards.** Editorial scenario cards anchored to persona + job + lived narrative + design implication.
- **`/audit` → Figma findings document.** Severity-tiered findings with behavioral-anti-pattern badges, persona-grounded "Affects" lines, recommended-corrective pointers.

**Why Figma rather than companion HTML files or a separate viewer tool:**

The strategic answer for visual artifacts. Most design teams already work in Figma; putting the artifacts there means they live alongside the design work they inform, rather than as standalone files that need to be opened separately. Markdown stays as the canonical source of truth (version-controlled, diffable, editable in any text editor); the Figma render becomes the team-facing handoff format. Round-tripping is a future question — does updating the Figma frame propagate back to the markdown? Likely no in v1; the markdown is canonical, the Figma frame is generated from it.

**Implementation considerations:**

- Depends on the Figma read + write item above shipping first — needs the Figma Plugin API integration in place before this work can begin.
- Each artifact type needs a Figma component template. The existing React components on the marketing site are visual references but won't translate directly — Figma's component model differs from React's.
- A render sub-command per Discovery command (e.g., `/personas render`) that takes the canonical `.md` and produces the Figma frame. Or a single `/render personas` / `/render journey` pattern that reuses one render orchestrator.
- The first concrete use case for the Figma write integration — proves the integration's value beyond moodboards and tokens.

**Why hold:** Depends on the Figma read + write item. Once that lands, this becomes the natural next step — and gives the Figma write integration its first concrete payoff.

### Deterministic `npx spruce detect` CLI

A standalone command-line tool that scans HTML and CSS for specific named anti-patterns — without invoking an AI. Fast, deterministic, no token cost, runnable in CI.

Today, `/detect` is AI-powered: a Spruce command that runs in a harness and uses the language model to flag anti-patterns from the reference catalogs. That's the right fit for nuanced, contextual cases ("is this gradient defensible for this product, or is it a default?"). But for cut-and-dry cases — gradient text, glassmorphism abuse, blue-purple gradients, hero-with-abstract-blob, side-stripe borders — a deterministic scanner runs in milliseconds, costs nothing, and produces the same result every time.

Pattern validated by Impeccable's `npx impeccable detect`, which scans for 27 specific named anti-patterns via deterministic CLI plus visual browser overlays.

**Scope of the addition:**

- **`npx spruce detect [path...]`** — scans files or directories for matched anti-patterns. Reports each match with file location, line number, the anti-pattern name, and the corrective command that would address it.
- **Anti-pattern catalog** — drawn from the existing reference files. Each anti-pattern documented in `references/typography.md`, `references/color-and-contrast.md`, etc., gets a deterministic detector when one is feasible (regex, CSS-property check, computed-style check). The reference file remains the canonical authority; the detector is the fast path.
- **Output formats** — terminal (default), JSON (for CI integration), GitHub Actions annotations.
- **Optional browser-overlay mode** — `npx spruce detect --browser` opens a local viewer that highlights matches inline on a rendered version of the page (reuses any infrastructure built for Live browser iteration).
- **Complements `/detect`, doesn't replace it** — the AI-powered command stays for nuanced cases; the CLI handles the obvious tells.

**Why included:** complements existing diagnostic surface without diluting it. CI integration is a new use case Spruce doesn't currently serve (today's commands all assume an interactive AI session); a deterministic detector can run in pre-commit hooks, GitHub Actions, etc., catching the most obvious anti-patterns before they ever reach review.

**Implementation considerations:**

- Could be the first non-skill artifact Spruce ships — a real Node CLI that lives in `bin/` and gets distributed via the same npm package as the skill installer.
- The anti-pattern catalog needs careful authoring — false positives are worse than false negatives for a CI-integrated tool.
- Optional integration with the Live browser iteration helper — both run a small local server; could share the picker/overlay infrastructure.
