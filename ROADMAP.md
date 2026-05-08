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

### Visitor feedback + questions

Today, the spruce-website has no surface for visitors to submit feedback, questions, or bug reports. Anyone with something to say (a typo on a page, a question about install, a feature suggestion, a confusing UX moment) has to find the GitHub repo and open an issue, or just bounce. Most won't do either. The site needs a low-friction submission surface and a destination where submissions reach the maintainer reliably.

**Scope of the addition:**

- **Submission surface on the site** — likely a dedicated `/feedback` route (more deliberate, more typing room) or a footer-link modal (lower friction). Editorial register matching the rest of the site — not a generic SaaS form. Form captures: optional name, optional email (so we can reply if needed), optional category (feedback / question / bug / other), and the message itself.
- **Submission handling** — a Next.js API route at `/api/feedback` that validates the submission, runs basic spam protection (honeypot field at minimum; hCaptcha or Turnstile only if real abuse appears), and routes the submission to its destination.
- **Destination** — where submissions actually land for the maintainer to see.
- **Confirmation UX** — after submission, show a brief acknowledgment (specific, not "Thanks!") and let the visitor send another or return to where they came from.

**Destination — directed: email + GitHub combined.** Each submission goes to both:

- **Email forwarding** via Resend (or Postmark / Mailgun) — submission body delivered to the maintainer's inbox the moment it lands. Subject line includes the category if one was picked. Body includes the message + a deep link to the GitHub issue so the maintainer can jump straight from inbox to triage.
- **GitHub Issues** in a dedicated private intake repo (e.g., `iamlaforge/spruce-feedback`) — every submission becomes an issue with category-derived labels (`feedback`, `question`, `bug`, `other`). Maintainer triages, replies, closes, or escalates from there. Issues persist and become searchable history; reusable for trend-spotting later.

The composition gives the maintainer immediate notification (email) + a persistent record in the project's existing tooling (GitHub). API route fires both calls in parallel; either can fail without blocking the other (failed email still leaves the GitHub issue and vice versa).

**Other destination options not picked** (preserved for context if direction changes):

- **Database + private dashboard** via Vercel KV or Supabase — better browsability than GitHub if the volume gets high enough that issue navigation becomes friction. Worth revisiting later if that happens.
- **Slack / Discord webhook** — could compose with the above if real-time channel notification ever matters more than email.

**Remaining open decisions to direct before implementing:**

1. **Surface**: dedicated `/feedback` page vs. footer-link modal vs. both.
2. **Categories**: differentiate feedback vs. questions vs. bug reports up front, or keep it as one form and let the maintainer triage via labels in GitHub after the fact.

**Why on the roadmap:** the site is the public surface; without a feedback channel, useful signal from real visitors goes uncaptured. Especially valuable while Spruce is new and the audience is still forming — early questions and friction reports shape the next round of clarifications and the Discovery work for the product itself.

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

### Figma integration v1: Read + symmetric Discovery write

The first Figma release. Spruce gains the ability to **read** any Figma frame as input to its diagnostic commands, and to **symmetrically round-trip** the five Discovery artifacts (`/personas`, `/jtbd`, `/journey`, `/scenarios`, `/audit`) between their canonical markdown files and Figma frames. Designers using Spruce alongside Figma can refine artifacts in either surface and see the changes propagate to the other — Figma is a real workspace, not a one-way render target.

**Architecture — direct API + Node helper, no MCP dependency.**

Spruce ships a Node helper bundled into the existing npm distribution, parallel to `npx spruce-skill add` and the planned `npx spruce detect`. Skill instructions tell the AI to invoke the helper; the helper handles Figma REST + Plugin API calls directly. Same wrapper pattern that worked for the multi-tool install rollout.

- **`npx spruce figma push <command>`** — markdown → Figma. Renders the canonical markdown as a Figma frame.
- **`npx spruce figma pull <command>`** — Figma → markdown. Parses the Figma frame back into the canonical markdown, preserving structure.
- **`npx spruce figma sync <command>`** — bidirectional, conflict-aware. Detects drift on both sides and either applies cleanly or surfaces a diff for explicit resolution.
- **`npx spruce figma diff <command>`** — preview without applying. Shows what would change in either direction.
- **`npx spruce figma status`** — surface every artifact's sync state across the project.
- **`npx spruce figma auth`** — wire the user's Figma personal access token. PAT only for v1; OAuth deferred until team/enterprise demand surfaces.

The Anthropic Figma MCP is a possible bridge layer but rejected as the primary architecture — it forces every Spruce user to also install and configure the Figma MCP in their harness (install friction Spruce has worked hard to remove), and being downstream of someone else's roadmap on the write side specifically is a real risk for the bespoke artifact shapes (persona canvases, journey maps with emotional arcs, scenario cards) that the official MCP isn't designed around.

**Read scope — diagnostic commands accept Figma input.**

`/survey`, `/uxreview`, `/critique`, `/audit`, and `/detect` learn to take a Figma URL alongside their existing code-target inputs. Output format is unchanged — findings against `.spruce.md` + Discovery artifacts — but the input is the design artifact rather than running code. Use case: a designer brings work in Figma to Spruce for review before any code exists.

Frame-level scope (file/page-level dilutes feedback; component-level is too granular for the diagnostic commands). The user pastes a Figma frame URL; Spruce extracts the frame's structure, typography, color, spacing, and component treatment; the diagnostic command reasons against that input.

**Write scope — five Discovery artifacts, symmetric round-tripping.**

Each Discovery command gains a render path producing a structured Figma frame matching the visual format already shown on the marketing site:

- **`/personas` → persona canvas frame.** Header band with avatar mark + name + role + anchor quote, four-quadrant body (Context+Expertise / Jobs / Motivations / Fears+Constraints), informs-design footer. Primary + secondary canvases as paired frames.
- **`/jtbd` → job map frame.** Per-job three-part flow (When / I want to / So I can) with persona grouping and per-layer (functional / emotional / social) sectioning. Cross-persona panel surfaces shared / diverging / conflicting jobs.
- **`/journey` → journey map frame.** Phase band, smooth emotional-arc curve as a vector path, touchpoint columns with swim lanes (Action / Thought / Friction / Opportunity). Current-state and future-state as paired frames.
- **`/scenarios` → scenario card frames.** Editorial scenario cards anchored to persona + job + lived narrative + design implication.
- **`/audit` → findings document frame.** Severity-tiered findings with behavioral-anti-pattern badges, persona-grounded "Affects" lines, recommended-corrective pointers.

**Symmetric round-tripping — schema discipline becomes load-bearing.**

Each artifact's Figma frame structure has to map cleanly to its markdown structure in both directions. The five artifacts vary in parse-back difficulty:

- **Persona canvas, job map, audit findings** — structured layouts with named regions; parse back cleanly.
- **Journey map** — moderate complexity. The emotional-arc curve has to round-trip as numeric anchor points (not get re-traced as a free-form path that loses fidelity); touchpoints in swim lanes need consistent positional anchors.
- **Scenario cards** — hardest parse-back, largely prose. Strict frame-template discipline required so designers can't introduce structure that breaks the parser.

**Conflict resolution — required v1 work.**

Each artifact carries a `last_synced` timestamp and content hash. `spruce figma pull` and `spruce figma sync` check both surfaces for changes since last sync:

- **Only Figma changed** → apply to markdown.
- **Only markdown changed** → apply to Figma.
- **Both changed** → surface a diff for explicit resolution. No silent overwrites; no last-write-wins.

A `.spruce.figma.lock` file prevents concurrent writes during sync operations.

**Test gate before release — release blocker, not aspirational.**

Symmetric round-tripping fails dangerously when parse-back loses information. Before v1 ships:

- **Round-trip fidelity** — markdown → Figma → markdown produces byte-identical output when no edits are made.
- **Edit fidelity** — every supported edit in Figma round-trips to markdown losslessly. Per-artifact test matrix covering common edits (rename, restructure, prose changes, layout adjustments, addition/removal of items).
- **Conflict surfacing** — every conflict scenario triggers the diff UX; no silent data loss.
- **Lossy-edge cases** — when a designer makes an unsupported edit (custom layers, broken frame structure, nested groups outside the schema), the tool refuses to parse back rather than guessing. Clear error pointing to what broke.
- **Real-designer pilot** — at least one external designer uses the tool against a real project for a week before release. Their breakage list becomes the final fix list.

**Why one release rather than two.**

Read and Discovery write ship together rather than as separate releases. The integration arrives as a complete bidirectional moment with the Discovery write as the headline differentiator and read as the natural counterpart. Splitting them dilutes both ships.

**Why symmetric in v1 rather than one-way then later.**

Designers using Spruce alongside Figma will edit in Figma — that's where their workflow lives. A one-way integration trains them to not edit there (because their changes get overwritten on the next sync), which biases the data toward "we never needed round-tripping" and defeats the integration's purpose. Symmetric in v1 with rigorous testing as the gate is the honest position.

### Figma integration v2: Symmetric generative write

Once v1 ships and the round-tripping infrastructure is proven, extend the symmetric write to the generative tier so designs, tokens, decisions, and remixes round-trip too.

**Scope:**

- **`/design` → page/feature frames in Figma.** Generated designs materialize as Figma frames matching the structure of the markup. Edits in Figma round-trip back to the source.
- **`/foundations` → tokens written to Figma variables.** OKLCH colors, type scale, spacing, radii, shadows, motion durations + easings written as Figma variables (not local styles — variables for token-level interop). Updates in either surface propagate.
- **`/decide` → decision-direction comparison frames.** The directional options surfaced during a `/decide` walkthrough render as side-by-side frames in Figma, letting the user see directions visually before answering.
- **`/remix` → three-variant side-by-side frames.** Same value proposition as the Live browser iteration roadmap item, in the Figma surface — three meaningfully distinct variants rendered for comparison, with acceptance writing the chosen variant back to source.
- **`/sketch` → moodboard frames.** Reference imagery, type samples, color palettes assembled as a Figma moodboard frame.

**Test gate applies.**

Same release-blocking discipline as v1: round-trip fidelity, edit fidelity, conflict surfacing, lossy-edge handling, real-designer pilot. Schema discipline gets harder for generative artifacts (a `/design` output has more freeform structure than a Discovery artifact) — that's the reason this is a separate release rather than bundled with v1.

**Pairs especially well with Live browser iteration and `.design.md`.**

`/decide` and `/remix` already touch Live browser iteration's core idea (rendered variants, user picks one). Symmetric Figma write makes the same value proposition available in the Figma surface — designers who don't run a dev server get the same in-flow iteration loop. `.design.md` (a separate roadmap item) is the canonical home for the tokens that `/foundations` writes to Figma variables; the artifact and the integration ship together as a coherent design-foundation story.

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
