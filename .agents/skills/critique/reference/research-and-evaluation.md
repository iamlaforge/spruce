# Spruce Reference: Research and Evaluation

---

## How to Use This File

This reference encodes the evaluation reasoning Spruce applies when running heuristic evaluation grounded in HCD artifacts. It is loaded alongside the core skill and consulted whenever the work involves auditing an existing product against the named personas + jobs + journeys + scenarios — surfacing where the product serves real users well, where it fails them, and what to address.

This file is the domain drilldown for the evaluation methodology specifically. The orchestrating reference (`human-centered-design.md`) covers how research + evaluation relate to the rest of the HCD tier; this file covers what makes an HCD-grounded audit a useful diagnostic rather than a generic checklist exercise.

The fundamental distinction this reference enforces: evaluation grounded in *who the product serves* is different from evaluation grounded in *dimensional principles*. Both have value; both produce different findings. `/survey`, `/uxreview`, `/critique`, and `/detect` evaluate against dimensional principles (does the typography hold up? does the UX substrate work? does the design have a point of view? are anti-patterns present?). `/audit` evaluates against HCD artifacts (does this serve Maya doing F1? does it serve Jordan doing F1? where do real users fail?).

---

## Contents

1. The Foundational Commitment
2. HCD-Grounded Evaluation vs. Dimensional Evaluation
3. The Evaluation Pass Methodology
4. Behavioral Anti-Patterns vs. UI Anti-Patterns
5. Journey-Gap Analysis
6. The Confidence Tier Discipline (Applied to Audit Findings)
7. How Audit Findings Inform Corrective Work
8. Audit Anti-Patterns

---

## 1. The Foundational Commitment

### Evaluation must be tied to specific users + jobs to be useful

**Principle:** A finding is useful when it can be expressed as "this fails [Persona X] doing [Job Y]." A finding is generic when it can only be expressed as "this violates [generic principle]." Both can be true at once; the user-tied framing is what makes the finding actionable for *this* specific product.

**Reasoning:** Generic evaluation produces generic findings: "the typography is plain," "the empty state is uninformative," "the contrast is borderline." All true; none specific to who this product serves or what they're trying to accomplish. A team reading these findings has to decide which to address based on intuition about user impact.

HCD-grounded evaluation produces findings tied to specific users + jobs: "the empty state on the practices grid fails Jordan doing F1 because it offers no orientation context — Jordan needs to know what 'practices' are before she can engage." Same surface, different framing — and the second framing tells the team exactly who is affected, what job is blocked, and what the fix needs to address.

The discipline is to surface findings tied to specific personas + jobs whenever the artifacts support it. If `.personas.md` and `.jtbd.md` exist, every audit finding should reference them. If `.journeys.md` and `.scenarios.md` also exist, findings can be even more specific — tied to specific moments where the failure occurs.

**Failure mode:** Audits that produce generic findings against generic principles, leaving the team to translate them into "but who is this affecting and how badly?" The findings get deprioritized because nothing connects them to user impact.

**Implementation guidance:**
- Every audit finding must name the persona + job it affects. If a finding affects multiple personas, name them all.
- When `.journeys.md` exists, anchor findings to specific touchpoints in the journey rather than to whole surfaces.
- When `.scenarios.md` exists, test findings against specific scenarios — does the finding hold up in the scenario, or is it only theoretical?

### Audits surface findings; they don't fix them

**Principle:** `/audit` produces a structured finding report. The corrective tier (`/typeface`, `/voice`, `/refine`, etc.) addresses the findings. `/audit` does not modify code.

**Reasoning:** Mixing diagnostic and corrective work in one command tends to produce both poorly: the diagnostic gets cut short to leave room for fixes, and the fixes get applied before the team has decided which findings matter most. Separating the two — `/audit` produces findings; the team picks which to address; the corrective commands do the work — keeps each step honest.

This mirrors the existing diagnostic tier (`/survey`, `/uxreview`, `/critique`, `/detect`) — each produces findings, none modifies code. `/audit` follows the same pattern, just with HCD-grounded findings.

**Implementation guidance:**
- Every audit finding closes with a recommended corrective command. The team picks which to run.
- The audit's closing summary names the highest-priority findings (those most blocking to the primary persona's primary job) so the team has a starting point.

---

## 2. HCD-Grounded Evaluation vs. Dimensional Evaluation

The Spruce diagnostic tier already covers four lenses on a product: `/survey` (all 7 dimensions), `/uxreview` (UX substrate), `/critique` (design-director read), `/detect` (anti-pattern scan). `/audit` is a fifth lens — HCD-grounded.

The lenses are complementary. Each produces different findings; together they form a complete diagnostic picture.

### What each lens surfaces

- **`/survey`** — findings against dimensional principles (typography, color, spatial, component, motion, voice, UX). "The eyebrow is missing tracking-wide." "The gradient is the AI default."
- **`/uxreview`** — findings against UX substrate principles (state coverage, IA, forms, errors, empty states, interaction contracts). "The signup form has no error state." "The empty state is null-check copy."
- **`/critique`** — narrative findings against design-direction principles (character, point of view, coherence). "The product hedges on its character." "Coherence is strong at the dimension level but the whole feels generic."
- **`/detect`** — fast scan against anti-pattern catalogs. "Three-equal-cards layout present." "Generic 'Get Started' CTA."
- **`/audit`** — findings against HCD artifacts (does this serve named personas doing named jobs?). "The home's first surface fails Maya doing F1 because it requires three taps before practice begins."

### When each lens is right

- **`/survey`**: comprehensive review when you want everything from every dimension.
- **`/uxreview`**: when something feels wrong but the visual design is strong; the substrate may be the issue.
- **`/critique`**: when you want a design-director-level read on whether the work feels like itself.
- **`/detect`**: fast triage; what anti-patterns are present.
- **`/audit`**: when you want to evaluate against real users + jobs; HCD-grounded.

The lenses overlap. A specific issue might be flagged by `/survey` (typography), `/detect` (anti-pattern), AND `/audit` (fails Persona X). That's fine — each frame produces different conversation.

### Why `/audit` is distinct

`/audit` is the only lens that requires HCD artifacts to exist (`.personas.md` and `.jtbd.md` minimum). The other diagnostic commands work without them; `/audit` doesn't, because its findings are framed against the personas + jobs. Without those artifacts, `/audit` would collapse into `/uxreview` or `/survey`.

This requirement is the discipline. If the team wants HCD-grounded evaluation, the team has to do the HCD work. The audit is what the work makes possible.

---

## 3. The Evaluation Pass Methodology

A useful `/audit` follows a structured pass through the product, evaluating against each available HCD artifact in sequence. The pass:

### Pass 1: Walk the product against each persona's primary jobs

For each persona in `.personas.md`:
- For each of the persona's primary jobs in `.jtbd.md`:
  - Walk through the product flow that should serve this job.
  - Note: where does the product serve the job well? Where does it fail?
  - Surface findings tied to specific persona + job + surface.

This is the most fundamental pass. Every audit produces findings from this pass.

### Pass 2: If `.journeys.md` exists, walk the mapped journeys

For each journey in `.journeys.md`:
- Walk the product through the touchpoints the journey describes.
- Compare: where does the actual product match the journey's assumptions? Where does it diverge?
- Note: any divergence is a finding (either the product or the journey is wrong).

This pass surfaces findings about journey-product alignment.

### Pass 3: If `.scenarios.md` exists, test against scenarios

For each scenario in `.scenarios.md`:
- Imagine the design encountered in the scenario's specific moment.
- Test: does the design hold up under the scenario's attention level, surrounding context, time pressure?
- Surface findings about specific moments where the design fails the scenario.

This pass surfaces findings about specific moments — usually the most actionable.

### Pass 4: Cross-persona check

Look across the findings:
- Are some findings affecting multiple personas? Those are usually highest-priority.
- Are some findings affecting only one persona? Note whether the affected persona is primary or secondary; weight accordingly.
- Are there findings where serving one persona's job actively works against another's? Surface as `/decide` tradeoffs.

### Pass 5: Positive findings

Audit reports that surface only failures read as adversarial and undervalue the work. Include positive findings too: where the product visibly serves the personas + jobs well. Two or three positive findings ground the negative ones in real evaluation rather than reading as a hit list.

---

## 4. Behavioral Anti-Patterns vs. UI Anti-Patterns

Spruce already has UI anti-pattern catalogs in each dimensional reference (typography anti-patterns, color anti-patterns, etc.) — `/detect` scans against these. `/audit` introduces a different category: behavioral anti-patterns.

### What's a behavioral anti-pattern

A behavioral anti-pattern is a design choice that fails users at the level of behavior rather than at the level of UI craft. The UI may be polished; the user is still failed. Examples:

- **The Choice Overload** — surface presents too many options for the user's attention level at the moment of encounter. UI may be clean; the user still freezes.
- **The Premature Commitment** — surface asks the user to commit (sign up, subscribe, choose a plan) before they have the information to commit confidently. UI may be friendly; the user still bounces.
- **The Cognitive Tax** — task that should be the product's responsibility (calculation, summarization, recommendation) is offloaded to the user. UI may be elegant; the user still has to think harder than necessary.
- **The Missing Recovery** — error state names the failure but doesn't help the user get back to what they were doing. UI may be on-brand; the user is still stuck.
- **The Engagement Trap** — design pattern (streak, badge, notification) optimizes for product engagement at the cost of user wellbeing. UI may be delightful; the user is still being manipulated.
- **The Persona Mismatch** — surface designed for a different audience than the named primary persona. UI may be beautiful; it's serving the wrong people.

### Why the distinction matters

UI anti-patterns are caught by craft work (typography discipline, color discipline, etc.). Fixing them improves the dimensional quality of the product.

Behavioral anti-patterns are only catchable when the evaluation is grounded in real users + jobs. Fixing them changes the user's experience in ways that don't always show up in dimensional review.

The distinction matters because a product can be "well-designed" by dimensional standards and still fail users badly. The reverse is also true: a product can be rough at the dimensional level and serve users brilliantly. Both kinds of evaluation surface different design opportunities.

`/audit` surfaces behavioral anti-patterns explicitly. When a finding fits a named behavioral anti-pattern, name it — gives the team a vocabulary for the issue beyond "this doesn't work."

---

## 5. Journey-Gap Analysis

When `.journeys.md` exists, the audit can do journey-gap analysis: comparing the actual product to the journey the artifact describes. The gaps fall into three categories:

### Product behind journey

The journey describes touchpoints or transitions the product doesn't currently support. Either the journey is aspirational (and the product hasn't caught up) or the journey is wrong (and the product is correctly limited).

If the journey is research-grounded, the product is the issue — surface as a finding with high priority.

If the journey is context-derived, both are candidates — note the gap and recommend either updating the journey to match the product or building toward the journey.

### Product ahead of journey

The product supports touchpoints or transitions the journey doesn't capture. The journey is stale and needs to be updated.

This is a common pattern in evolving products. The journey was mapped at one point; the product moved on. Recommend re-running `/journey` to update.

### Product diverges from journey

The product supports the same touchpoints the journey describes, but in a different order or with different friction profiles. Either the product or the journey is wrong about the user's actual experience.

Most often, this calls for observational research — neither artifact alone can resolve which is correct. Surface as a finding flagged for research.

---

## 6. The Confidence Tier Discipline (Applied to Audit Findings)

Audit findings carry their own confidence calibration, derived from the confidence of the HCD artifacts they're grounded in.

### Findings grounded in research-grounded artifacts

When the personas / jobs / journeys / scenarios that the finding draws on are research-grounded, the finding is high-confidence. The audit can speak with appropriate certainty: "This fails Persona X doing Job Y, per the research that grounds them."

### Findings grounded in context-derived artifacts

When the artifacts are context-derived, the finding is medium-confidence. The audit should soften its language slightly: "This appears to fail Persona X doing Job Y based on the personas + jobs we have, though research would strengthen the call."

### Findings grounded in assumed artifacts

When the artifacts are assumed, the finding is low-confidence. The audit should flag this clearly: "This may fail Persona X, but the persona itself is assumed; recommend grounding before treating as definitive."

This discipline matters because audit reports look authoritative. Without explicit confidence calibration, low-confidence findings get treated as findings. Decisions are made on speculation that gets treated as fact.

---

## 7. How Audit Findings Inform Corrective Work

Each audit finding closes with a recommended corrective command — the same pattern `/survey` and `/uxreview` use. The mapping:

- **Findings about visual character** → `/typeface`, `/colorgrade`, `/refine`, `/arrange`, `/pace`
- **Findings about copy + voice** → `/voice`
- **Findings about state coverage + accessibility** → `/fortify`
- **Findings about content density** → `/reduce`
- **Findings about HCD-level mismatches** → may require revisiting `.personas.md` or `.jtbd.md` themselves rather than dimensional correctives. Surface this when relevant.
- **Findings about ship-readiness** → `/finish` after dimensional correctives have run.

Some findings won't map cleanly to a single corrective. For these, recommend the closest match and note the broader implication. "Recommend `/refine` for the layout shift; this finding also implies a broader `/decide` moment about the IA the team should consider."

---

## 8. Audit Anti-Patterns

The named patterns to recognize and resist when running audits.

### *The Generic Heuristic Audit*
Audits that apply Nielsen's ten heuristics (or any other generic checklist) without grounding the findings in specific personas + jobs. The findings are correct in the abstract and disconnected from the specific product's users. The fix: ground every finding in the named personas + jobs; flag findings against specific user impacts rather than against generic principles.

### *The Personas-Free Audit*
Audits run when `.personas.md` doesn't exist, where the audit invents personas on the fly. Inventing personas during the audit produces findings tied to fictional users. The fix: require `.personas.md` and `.jtbd.md` as prerequisites; recommend running `/personas` and `/jtbd` first if they don't exist.

### *The Adversarial Audit*
Audits that surface only failures and frame everything as a problem. The team reads it as a hit list and disengages. The fix: include positive findings (Pass 5 above). 2-3 specific things the product does well grounds the negative findings as part of real evaluation rather than as performative critique.

### *The Severity-Free Audit*
Audits that list findings without weighting them. The team gets twenty findings of unclear priority; nothing gets done. The fix: weight findings by their impact on the primary persona's primary jobs. Findings that block the primary persona's primary job are highest priority; findings that affect a secondary persona's secondary job are lowest.

### *The Recommendation-Free Audit*
Audits that surface findings without naming what to do about them. The team reads the report and asks "okay, now what?" The fix: every finding closes with a recommended corrective command. The team can override; at least there's a starting point.

### *The Research-Disguised Audit*
Audits that produce findings as if they're research-grounded when they're actually based on context-derived (or assumed) personas. The findings carry false authority. The fix: confidence tier flagging on every finding, derived from the confidence of the artifacts it's grounded in.

### *The Whole-Product Audit*
Audits that try to evaluate the entire product in one pass. The output is so broad it's unactionable. The fix: scope the audit. Most useful audits cover one surface or one flow against the relevant personas + jobs. Run multiple smaller audits rather than one giant one.

### *The Confirmation Audit*
Audits run to confirm what the team already wants to change. The findings conveniently match the team's existing direction. The fix: run audits before the team has settled on directions, or run them against a deliberately neutral lens. If an audit only confirms existing decisions, it's not informing them.

### *The Stale-Persona Audit*
Audits run against personas that haven't been updated since the project's audience or scope shifted. The findings are correct against personas that no longer represent real users. The fix: revisit `.personas.md` (and dependent artifacts) periodically; treat audit findings against stale personas with skepticism until the personas are updated.

---

## A Closing Note

The discipline of audit work is grounding every finding in real users + real jobs, calibrating confidence to the artifacts the findings draw on, and producing findings the team can actually act on. A short, sharp audit with five findings tied to specific personas + jobs beats a comprehensive audit with thirty findings the team won't read.

The audit is what makes the upstream HCD work pay off. Personas, jobs, journeys, and scenarios produce a foundation; the audit is what reveals where the existing product matches the foundation and where it doesn't. From there, the corrective tier has somewhere real to anchor.
