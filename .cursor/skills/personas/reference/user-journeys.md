# Spruce Reference: User Journeys

---

## How to Use This File

This reference encodes the journey-mapping reasoning Spruce applies when producing or evaluating `.journeys.md` artifacts. It is loaded alongside the core skill and consulted whenever the work involves understanding how a specific persona accomplishes a specific job through a sequence of touchpoints — with their emotional state, friction points, opportunities, and gaps along the way.

This file is the domain drilldown for user journeys specifically. The orchestrating reference (`human-centered-design.md`) covers how journeys relate to personas, JTBDs, and scenarios; this file covers what makes a journey a useful design artifact rather than a flowchart with emotional emojis on top.

Journey maps are the most visually appealing and most frequently abused HCD artifact. The wrong shape (a polished diagram with arc lines and friction stars that looks finished but doesn't change any design decision) looks like good work and produces nothing. The right shape (a scoped, specific, design-decision-changing map of one persona doing one job through real touchpoints) is harder to produce and worth the discipline. This reference teaches the difference.

---

## Contents

1. The Foundational Commitment
2. Current-State vs. Future-State Journeys
3. The Journey Anatomy
4. Scoping Discipline (Why "One Persona, One Job" Matters)
5. The Confidence Tier Discipline (Applied to Journeys)
6. How Journeys Inform Design Decisions
7. Journey Anti-Patterns

---

## 1. The Foundational Commitment

### A journey is a tool for changing design decisions

**Principle:** A journey map exists to influence specific design decisions. It is useless — and counterproductive — when it looks polished but doesn't change what gets built.

**Reasoning:** The visual appeal of journey maps is part of why they fail so often. A beautifully rendered map with emotional arcs and pain-point stars looks like good work; the team feels productive producing it; everyone agrees it captures something real. Then the design work that follows is the same design work that would have happened without the map. The map becomes wall art.

The discipline is to start every journey with the question: *what design decisions is this journey going to inform?* If you can't name them before mapping, the map is at risk of becoming a deliverable rather than a tool. If you can name them, the map can be evaluated against whether it actually shaped those decisions.

Spruce's journey work is intentionally scoped. Each journey covers one persona doing one job through one realistic sequence. The scope is small because the scope is what makes the journey usable. A journey that tries to cover "the entire user experience" produces nothing actionable; a journey scoped to "Maya's morning practice on a typical Tuesday" produces specific design decisions about the morning surface.

**Failure mode:** Polished journey maps that look complete but don't influence any specific design decision. The team feels productive; the design work that follows is unchanged.

**Implementation guidance:**
- Before producing a journey, name the design decisions the journey is meant to inform. If you can't name them, don't produce the journey.
- After producing the journey, check whether the closing implications section translates into specific design changes. If it doesn't, the journey is too abstract; iterate before treating it as done.
- A 200-word journey that informs three real design decisions beats a 2,000-word journey that informs none.

### Time and emotion are the journey's two axes

**Principle:** A journey map sequences touchpoints over time and tracks the user's emotional state through that sequence. Both axes are essential; either one alone produces a different artifact.

**Reasoning:** A flowchart sequences touchpoints over time but ignores how the user feels at each step. A persona's emotional profile names how they feel about the product but ignores when. A journey is the integration: at each touchpoint in time, what is the user feeling, and how does that feeling shift?

The emotional axis is what makes journeys distinct from flowcharts. A new-user onboarding may have technically clean steps but be emotionally costly throughout — a flowchart wouldn't surface that; a journey would. The emotional axis is also what surfaces specific design opportunities: the moments where emotional friction is highest are the moments where design intervention has the most leverage.

**Implementation guidance:**
- For every touchpoint in the journey, name the user's emotional state. Use specific language, not generic ("anxious about losing progress" not "frustrated"; "curious but unsure if this is for them" not "interested").
- The emotional arc of the journey is itself a design artifact. Where does it dip? Where does it lift? Where does it stay flat? Each of those patterns implies different design responses.
- Avoid the polished-emotional-arc trap. Real journeys have ragged emotional arcs, not smooth U-curves. If the arc looks too clean, it's probably idealized rather than observed.

---

## 2. Current-State vs. Future-State Journeys

Journeys come in two flavors that serve different design purposes. The right choice depends on what design decision the journey is meant to inform.

### Current-state journeys

**What it is:** A map of how the user accomplishes the job *today* — with or without your product. Captures the real friction the design has the chance to address.

**When to use it:**
- Designing a new product or feature: current-state journeys ground the design in real friction the new design has the chance to remove.
- Evaluating an existing product: current-state journeys surface where the product is failing the user today.
- Inheriting a project: current-state journeys give the new team a real picture of what users are dealing with rather than the team's beliefs about what users are dealing with.

**The discipline:** current-state journeys are honest about friction. They don't paper over the real costs of the current world; they name them. A current-state journey for "morning meditation" doesn't say "user opens app, has practice, feels calm" — it says "user fumbles to find headphones in the dark, opens app, sees aggressive notification badge they have to dismiss, picks practice while half-asleep, audio starts at jarring volume, abandons after 30 seconds."

The brutal-honesty version of the current-state journey is what makes the future-state journey valuable. Without honest current-state mapping, future-state design defaults to lipstick on existing patterns.

### Future-state journeys

**What it is:** A map of how the user *would* accomplish the job with the product you're designing. Captures the design's intended effect on the user's experience.

**When to use it:**
- Pitching a design direction internally: future-state journeys make the design's intent specific.
- Aligning across a team: future-state journeys give everyone the same picture of what they're building toward.
- Stress-testing a feature spec: future-state journeys reveal whether the spec actually addresses the friction the current-state journey surfaced.

**The discipline:** future-state journeys are specific, not aspirational. The temptation is to draft them as "and then everything is delightful." The useful version is "and at this step, the design specifically addresses [current-state friction X] by [specific affordance Y]." The future-state journey should make the design's intent legible, including what tradeoffs it accepts.

A future-state journey that doesn't tie back to specific current-state friction is design fiction; a future-state journey that does is a design plan.

### Why both have value

The most useful pattern: pair them. Map the current-state journey for one persona + one job; then map the future-state journey for the same scope. The comparison surfaces:

- Where the design is removing friction (good — design has clear intent here).
- Where the design is preserving friction (sometimes intentional, sometimes lazy — surface for review).
- Where the design is *adding* friction the current world doesn't have (this is the most important to catch — sometimes the new design is worse than the old in specific moments).

Pairing the two requires twice the work but produces twice the value. The comparison is the design conversation.

---

## 3. The Journey Anatomy

The fields below are the default Spruce journey structure. Not every journey needs every field; lean toward the minimum that captures what design decisions will reference.

### Required

- **Title** — a memorable handle. "Maya's morning practice — current state" or "Jordan's first session — future state."
- **Persona** — exactly one persona. Reference by name from `.personas.md`.
- **Job** — exactly one job. Reference by ID from `.jtbd.md` (e.g., "Maya F1 — settle the nervous system before the day's demands arrive").
- **State** — current-state or future-state.
- **Confidence** — research-grounded / context-derived / assumed (with citation if grounded).
- **Setup** — the situation at journey start. What just happened, what the user is doing, where they are, what device they're on.

### Touchpoints (the journey itself)

A sequence of touchpoints, each with:

- **Touchpoint name** — a short label for the step ("opens the app," "selects practice," "audio begins").
- **What happens** — one sentence describing what the user does or what the product does at this step.
- **Emotional state** — specific language. "Anxious about losing progress" not "frustrated." "Curious but unsure" not "interested."
- **Friction** (when present) — what's making this step harder than it should be. For current-state journeys, this is often the most populated field.
- **Opportunity** (when present) — what design intervention could address the friction or amplify the moment. Not the design itself; the design opportunity.

The touchpoint count varies by journey scope. A short journey (one practice session) might have 5-7 touchpoints. A longer journey (signing up + completing first session + deciding whether to continue) might have 12-15. More than 15 usually means the scope is too broad; consider splitting.

### Required closing fields

- **Emotional arc summary** — one paragraph naming the shape of the user's emotional experience through the journey. Does it dip? Where does it lift? Where does it stay flat? Specific rather than generic.
- **Key moments** — 2-4 specific moments in the journey where design has the most leverage. These are the moments worth designing against.
- **How this informs design** — the closing section. Specific design decisions this journey is meant to inform. If you can't write this section, the journey isn't useful as a design artifact.

### Optional

- **Mental model notes** — what the user is thinking at each touchpoint (vs. just feeling). Useful when the user's mental model is misaligned with the product's structure.
- **Quotes** (research-grounded only) — actual user language from research. Anchors the journey in real voice.
- **Channel notes** — what channel the touchpoint happens on (mobile, desktop, audio, etc.) when channel matters for design.

---

## 4. Scoping Discipline (Why "One Persona, One Job" Matters)

The single most common journey-mapping failure is over-scoping. The fix is the same in every case: scope each journey to one persona and one job.

### What "one persona, one job" looks like

- **Good:** "Maya's morning practice on a typical Tuesday" — one persona (Maya), one job (Maya F1: settle the nervous system before the day's demands arrive).
- **Good:** "Jordan's first-time discovery and first session" — one persona (Jordan), one job (Jordan F1: sample what the practice feels like).
- **Bad:** "The user's experience of Stillpoint" — multiple personas, multiple jobs, no scope.
- **Bad:** "Maya's practice over a year" — one persona but the job changes over time; treat as multiple journeys.
- **Bad:** "Maya's morning + mid-day + evening practices" — one persona but three different jobs; treat as three journeys.

### Why the discipline matters

A broad journey (multiple personas, multiple jobs, long time horizon) has no clear emotional arc, no clear friction points, and no clear design implications. The personas have different emotional trajectories; the jobs have different shapes; the time horizon hides specifics in averages.

A narrow journey has a single emotional arc, specific friction points, and specific design implications. The narrow scope is what makes the artifact usable.

When a real product has multiple personas doing multiple jobs across multiple touchpoints (which is most products), the answer is multiple journeys — not one big journey. Each journey is small; the set is comprehensive.

### When to add a journey

Don't try to map every possible journey upfront. Add a journey when:

- A specific design decision is pending and needs grounding in user experience.
- A current-state journey would surface friction the team hasn't named.
- A future-state journey would make the team's design intent legible.
- A new feature's flow needs to be designed and the team needs to understand the current path.

Don't add a journey when:

- The team is producing journeys to look thorough rather than to inform decisions.
- The journey would cover ground already covered by an existing journey.
- The persona + job combination is too rare to warrant the work.

---

## 5. The Confidence Tier Discipline (Applied to Journeys)

The same three confidence tiers from the orchestrating HCD reference apply to journeys:

- **Research-grounded** — Journey built from real observations of users doing the job: usability sessions, contextual interviews, analytics paired with qualitative research, diary studies. The touchpoints, emotional states, and friction points reflect what the research found. Cite the source briefly.
- **Context-derived** — Journey drafted from `.spruce.md` + `.personas.md` + `.jtbd.md` context, plus reasoning about how the named persona would plausibly accomplish the named job. Captures structured assumptions, not findings.
- **Assumed** — Journey written from intuition or general knowledge of the product category, with no project-specific grounding. Flag loudly.

For journeys specifically, the confidence tier matters even more than for personas or JTBDs because journey maps look most authoritative when polished. A research-grounded journey carries weight because the friction points are observed; a context-derived journey is a structured guess about what friction would plausibly exist; an assumed journey is fiction. Without explicit flagging, all three look the same — and the team makes design decisions on fiction treated as observation.

---

## 6. How Journeys Inform Design Decisions

The point of the journey artifact is to influence specific design decisions. The connections:

### Journeys inform flow design

- **Step sequence.** The order of steps in a feature's flow should serve the journey's emotional arc. A step that lands when the user is anxious needs different treatment from a step that lands when the user is curious.
- **Step removal.** Current-state journeys often surface steps that exist only because the current world makes them necessary. Future-state design can remove them.
- **Step addition.** Sometimes a future-state journey reveals that an additional step (a confirmation, a moment of pause, a transition) would serve the user even though the technical flow doesn't require it.

### Journeys inform state coverage

- **Loading states.** Where does the journey pause for the product to load something? Loading states should match the journey's emotional context at that moment — patient when the user is patient, fast when the user needs fast.
- **Empty states.** Where does the journey hit a "no data" condition? The empty state's three-part introduction (what the space is, why it's empty, what to do) should serve the journey's emotional state at that moment.
- **Error states.** Where could the journey break? The error states should help the user recover with the emotional support the journey calls for at that moment.

### Journeys inform copy + voice calibration

- **Per-step voice.** The voice register for copy at each step should match the user's emotional state at that step. Apologetic copy when the user is frustrated; quiet copy when the user is calm; energetic copy when the user is curious.
- **Pacing.** The pacing of copy through the journey should match the pacing of the user's experience. Long-form is right when the user is in a moment of consideration; brief is right when the user is in motion.

### Journeys inform motion + transition design

- **Transition timing.** Faster transitions when the user is task-focused; slower transitions when the user is in a moment of reflection.
- **Animation character.** The motion character should serve the journey's emotional character. Snappy motion fights a calm journey; slow motion fights a high-velocity one.

### Journeys inform `/decide` tradeoffs

When `/decide` surfaces a tradeoff, the journey often resolves it. "Direction A serves the journey's calm-arrival moment cleanly; direction B serves the journey's task-completion moment cleanly. The journey establishes calm-arrival as the higher-stakes moment, so direction A wins." Journeys give tradeoff resolution a specific user-experience anchor.

### The integration test

The test of whether a journey is influencing decisions: pick a recent design decision and ask whether it would be different with a different journey. If the answer is "no, the design would be the same regardless," either the journey isn't being read or it isn't specific enough to matter.

---

## 7. Journey Anti-Patterns

The named patterns to recognize and resist.

### *The Lipstick Journey*
A polished journey map with emotional arcs and friction stars that doesn't connect to specific design decisions. Beautiful diagrams; same design work afterward. The fix: a journey should produce specific design decision changes. If it doesn't, simplify the map and clarify what design decisions it's meant to inform.

### *The Whole-Product Journey*
A journey that tries to capture "the entire user experience" in one map. So broad it's useless for any specific decision. The fix: scope every journey to one persona + one job. The product as a whole has many journeys; that's expected.

### *The Smooth-Arc Journey*
A journey whose emotional arc is suspiciously smooth — gentle dip, neat recovery, satisfied resolution. Real user experience is rarely that clean. The fix: be honest about the ragged arc. Real journeys have moments of confusion, frustration, surprise, and recovery in unpredictable patterns. Idealizing the arc removes the design opportunities.

### *The Aspirational Future-State*
A future-state journey that reads as "and then everything is delightful." No tradeoffs named, no specific design responses to current-state friction. The fix: tie every future-state moment to a specific design decision that addresses specific current-state friction. Aspiration without specificity is design fiction.

### *The Flowchart-with-Emojis*
A journey that's actually a flowchart with emotional emojis added to each step. The emotional layer is decorative rather than informative. The fix: emotional states should be specific language, not emojis or generic labels. "Anxious about losing progress" influences design; "😟" doesn't.

### *The Confirmation Journey*
A journey produced to confirm what the team already wanted to build, rather than to discover what users need. The friction points are conveniently located where the team already planned to add features; the opportunities map to features already on the roadmap. The fix: produce journeys before deciding what to build, not after. If a journey only confirms decisions already made, it's not informing them.

### *The Persona-Free Journey*
A journey for "the user" rather than for a specific persona. Generic emotional states, generic friction, generic opportunities. The fix: every journey is for one persona by name; if the journey would apply to multiple personas, it's at the wrong scope.

### *The Job-Free Journey*
A journey for a specific persona but not for a specific job. The journey wanders through general product use without a clear anchor in what the persona is trying to accomplish. The fix: every journey serves one job from `.jtbd.md`; if the journey doesn't have a clear job anchor, scope it down.

### *The Stale Journey*
Journeys mapped at project start and never revisited. The product evolves; the touchpoints change; the friction points shift. Six months in, the journey is mapping a flow that no longer exists. The fix: revisit journeys when the product changes substantially. Journeys are living artifacts.

### *The Solo Future-State*
A future-state journey produced without a paired current-state journey. The future-state has nothing to compare against; the design intent looks impressive but isn't grounded in the friction the design is supposed to address. The fix: whenever possible, pair future-state with current-state for the same scope. The comparison is the design conversation.

---

## A Closing Note

The discipline of journey work is restraint in scope and honesty about confidence. Map small. Map specifically. Tie every map to a design decision it's meant to inform. Be honest about whether the journey is observed or assumed. Pair current-state with future-state when you can.

A `.journeys.md` file with two well-scoped, decision-influencing journeys beats a file with eight ambitious but disconnected ones. The work is in the discipline, not the volume.
