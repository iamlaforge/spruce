# Spruce Reference: Scenarios

---

## How to Use This File

This reference encodes the scenario-writing reasoning Spruce applies when producing or evaluating `.scenarios.md` artifacts. It is loaded alongside the core skill and consulted whenever the work involves anchoring abstract personas + jobs in concrete moments where the design will be encountered.

This file is the domain drilldown for scenarios specifically. The orchestrating reference (`human-centered-design.md`) covers how scenarios relate to personas, JTBDs, and journeys; this file covers what makes a scenario a useful design anchor rather than a vignette.

Scenarios are the lightest of the Discovery artifacts and the easiest to skip. That's also why they earn their weight: a scoped, specific scenario is what a designer keeps on the wall while making decisions. It's the answer to "who is this for, doing what, when?" reduced to one paragraph specific enough to test a design against. The discipline this reference teaches is what separates that paragraph from generic fiction.

---

## Contents

1. The Foundational Commitment
2. What a Scenario Is (and Isn't)
3. The Scenario Anatomy
4. How Scenarios Relate to Personas, Jobs, and Journeys
5. The Confidence Tier Discipline (Applied to Scenarios)
6. How Scenarios Inform Design Decisions
7. Scenario Anti-Patterns

---

## 1. The Foundational Commitment

### A scenario is the bridge between abstract context and concrete design

**Principle:** A scenario takes a named persona and a specific job and lands them in a specific moment, place, time, and surrounding context. It exists so design decisions have something specific to test against.

**Reasoning:** Personas describe who the user is. JTBDs describe what they're trying to accomplish. Journeys map how they accomplish it. Scenarios narrate *one specific moment* where the design will be encountered. Each artifact serves a different question; scenarios serve "what's true about the user in this exact moment?"

The value of a scenario is concreteness. A persona alone tells you Maya is an intermediate meditator who values restraint. A scenario tells you Maya is opening Stillpoint at 6:45am on a Tuesday in her kitchen, half-attentive, with coffee brewing and the house still quiet. The persona shapes overall design direction; the scenario shapes specific design decisions for the exact moment described.

Designers who keep good scenarios on the wall make better decisions because every choice gets tested against a real moment rather than against an averaged abstraction. Scenarios are the answer to "would this design land for *this* person in *this* moment?"

**Failure mode:** Scenarios written as vignettes — narratives that read well but don't influence design decisions. The team enjoys producing them; the design that follows is the same design that would have happened without them.

**Implementation guidance:**
- Every scenario should answer a specific design question or shape a specific design decision. If you can't name the decisions a scenario is meant to inform, the scenario is at risk of becoming fiction.
- A scenario stays useful when it stays specific. "A user wants to start their day calmly" is a generic intent, not a scenario. "Maya, 6:45am Tuesday, kitchen, coffee brewing, phone in hand, wants 5 minutes before email" is a scenario.
- Scenarios accumulate. A project may have 5 or 15 scenarios across the personas + jobs combinations that matter. Each one is a small artifact; the set is the design wall.

### Scenarios are concrete, not aspirational

**Principle:** A scenario describes a real moment as it would actually unfold — including the messy parts. It does not describe an idealized version of the moment where the user is fully attentive, the environment is perfect, and the product works flawlessly.

**Reasoning:** Aspirational scenarios produce designs that work for users who don't exist. The fully-attentive Maya in a quiet office at the optimal time isn't the Maya the design needs to serve. The real Maya is half-attentive, in a noisy kitchen, while the kettle is whistling. The design that serves the real Maya is more robust than the design that serves the aspirational one.

The same principle applies to context: scenarios should name what's *also* happening at that moment, not just the user-product interaction in isolation. The user has a phone but they also have a kettle, a partner asking about the day, an email notification, a sleeping cat on their lap. Designing against scenarios that include the surrounding world produces designs that hold up in the surrounding world.

**Implementation guidance:**
- Include the messy specifics. What else is happening? What's the user's attention level? What just happened before the moment? What's about to happen after?
- Resist the polished version. If the scenario reads as "perfect user in perfect conditions doing perfect job," you've lost the value. Add the friction that real life carries.

---

## 2. What a Scenario Is (and Isn't)

The category is muddier than personas or journeys. Several adjacent concepts get called scenarios; this reference uses the term in a specific way.

### What a scenario IS

A scenario is a short narrative — typically one paragraph, sometimes two — that describes a specific moment where a named persona is attempting a specific job in a specific context. It includes time, place, what just happened, what's about to happen, the user's attention level, and what else is going on in the surrounding world.

A scenario is **named** (so it's easy to reference: "the morning-kitchen scenario," "the between-meetings scenario"), **persona-tied** (one persona by name), **job-tied** (one job by ID from `.jtbd.md`), and **scoped to a single moment** (not a sequence — sequences are journeys).

### What a scenario is NOT

- **Not a journey.** Journeys map sequences of touchpoints over time; scenarios capture single moments. A scenario is what's true at one point in a journey.
- **Not a use case (in the formal-spec sense).** Use cases tend to enumerate paths through a system; scenarios narrate the user's situation. Use cases are about the system; scenarios are about the person.
- **Not a user story (in the agile sense).** User stories are short statements of feature requirements ("As a [user], I want to [feature], so that [benefit]"). Scenarios describe lived moments, not feature requests.
- **Not a vignette.** A vignette is a creative-writing exercise that may or may not serve design. A scenario is a design tool that happens to take narrative form.
- **Not a marketing scenario.** Marketing scenarios optimize for purchasing intent ("imagine the day you finally..."); design scenarios optimize for design-decision relevance.

---

## 3. The Scenario Anatomy

A useful scenario captures the following elements. Not all need to be explicit; a single paragraph can carry most of them implicitly.

### Required

- **Name** — a short handle. "Maya — morning kitchen," "Jordan — first session in bed," "Maya — between-meetings reset."
- **Persona** — exactly one. By name from `.personas.md`.
- **Job** — exactly one. By ID from `.jtbd.md`. Example: "Maya F1 — settle the nervous system before the day's demands arrive."
- **Confidence** — research-grounded / context-derived / assumed.
- **Time + place** — when and where the scenario unfolds. Specific. "6:45am Tuesday, in the kitchen" beats "morning, at home."
- **Entry point** — how the user is arriving at the moment. What just happened? What was the trigger?
- **Surrounding context** — what else is going on. Other people, other devices, other tasks, other sensory inputs.
- **Attention level** — how much of the user's attention is available for the product. Specific.

### Default include

- **Device + environment** — what device the user is on, what the physical environment is like (quiet, noisy, dark, bright, etc.).
- **Constraints** — time pressure, cognitive load, hands-free needs, privacy considerations.
- **What success looks like** — what the user's state would be at the end of the scenario if it goes well. Often closely related to the JTBD's outcome clause but specific to this moment.

### The scenario itself

A short narrative — one paragraph (typically 80-150 words), occasionally two for richer scenarios. Written in the present tense, third person, with the persona named.

The narrative weaves the elements above into a single coherent moment. It does not list the elements separately; it integrates them. The reader should be able to picture the moment.

### Closing line

Each scenario closes with a one-sentence "design implication" — the specific design question or decision this scenario is meant to test against.

---

## 4. How Scenarios Relate to Personas, Jobs, and Journeys

Scenarios sit at the most concrete end of the HCD artifact spectrum. The relationship to the other artifacts:

**Personas** describe who. Scenarios anchor that "who" in a specific moment.

**JTBDs** describe what they're trying to accomplish. Scenarios situate that job in a specific time + place + surrounding context.

**Journeys** map how they accomplish it across a sequence. Scenarios capture single points in those sequences (or single moments that don't belong to a mapped journey).

Each artifact serves different design questions:

- "Who am I designing for?" → personas.
- "What is this person trying to accomplish?" → JTBDs.
- "How do they get there?" → journeys.
- "What's true in this exact moment?" → scenarios.

Scenarios are the artifact a designer keeps on the wall during specific design work. The persona file is read once and informs direction; the scenario is consulted repeatedly while making specific decisions.

### When to write a scenario vs. a journey

Use a **scenario** when:
- You need to test a design decision against a specific moment of use.
- You want to anchor abstract persona + job context in something concrete.
- You're handing off design work and the receiver needs context to make good downstream decisions.
- The decision in question doesn't span multiple touchpoints — it's about *this* moment specifically.

Use a **journey** when:
- The design decision spans multiple touchpoints (a flow, a multi-step process).
- You want to surface friction across an arc, not at a single point.
- You're comparing current-state to future-state.
- The emotional pacing across a sequence matters for the design.

Scenarios are lighter; journeys are richer. Both have value; the right choice depends on what design question is pending.

---

## 5. The Confidence Tier Discipline (Applied to Scenarios)

The same three confidence tiers from the orchestrating HCD reference apply to scenarios:

- **Research-grounded** — Scenario captured from real observation: contextual inquiry, diary studies, ethnographic observation, video-recorded user sessions in their real environment. Cite the source briefly.
- **Context-derived** — Scenario drafted from `.spruce.md` + `.personas.md` + `.jtbd.md` (and optionally `.journeys.md`) plus reasoning about how the named persona would plausibly inhabit a moment of doing the named job. Captures structured assumptions about lived moments.
- **Assumed** — Scenario written from intuition or general knowledge of the product category, with no project-specific grounding. Flag loudly.

For scenarios specifically, research-grounded matters because lived moments are full of details that are nearly impossible to invent accurately. The "kettle whistling," "phone on the counter," "partner asking about the day" details either come from observation or get manufactured. Manufactured details often feel right but don't actually match what happens — which leads to designs calibrated to fictional moments. The confidence tier matters; flag honestly.

---

## 6. How Scenarios Inform Design Decisions

The point of a scenario is to inform specific design decisions. The connections:

### Scenarios inform first-impression design

- The first 5-10 seconds of any design is encountered in a specific scenario. Scenarios make that moment legible — what device, what attention level, what surrounding context, what just happened. First-impression design tested against a real scenario is sharper than first-impression design tested against "the user opens the app."

### Scenarios inform attention-design

- Different scenarios carry different attention levels. The "morning kitchen" scenario has half-attention; the "lying in bed before sleep" scenario has dropping attention; the "between meetings" scenario has fragmented attention. Designs need to respect the attention available at the moment they're encountered.

### Scenarios inform input-design

- What device is the user on? What can they easily tap? Are their hands free? Is the environment noisy enough to require text or quiet enough for audio? Scenarios make these design constraints explicit.

### Scenarios inform copy-pacing

- A scenario where the user has 30 seconds before something else happens calls for different copy than a scenario where the user has chosen to spend 5 quiet minutes. Copy length, sentence rhythm, and information density all calibrate to the scenario.

### Scenarios inform error-recovery design

- What happens if the design fails in this scenario? A network failure during morning practice (alone, no time pressure) is recoverable; a network failure during the only 3 minutes before a meeting isn't. Error states should be designed against the worst-case scenario they'll be encountered in.

### Scenarios inform `/decide` tradeoffs

- When two design directions both serve the persona + job in general but produce different experiences in specific moments, the scenarios resolve the tradeoff. "Direction A serves the morning-kitchen scenario better; direction B serves the between-meetings scenario better. Which scenario is more frequent / more important?" surfaces a real tradeoff for the user to direct.

### The integration test

The test of whether scenarios are influencing decisions: pick a recent design decision and ask whether it would be different in different scenarios. If the answer is "no, the design would be the same regardless of when or where it's encountered," either the scenarios aren't being read or the design isn't sensitive enough to context.

---

## 7. Scenario Anti-Patterns

The named patterns to recognize and resist.

### *The Vignette*
Scenarios written as creative-writing exercises rather than design tools. Beautifully descriptive, atmospheric, immersive — and disconnected from any specific design decision. The fix: every scenario should close with a specific design implication. If it doesn't, simplify to a paragraph that earns its place.

### *The Generic Scenario*
Scenarios so abstract they could describe anyone using any product. "A user opens the app and wants to accomplish their goals." Useless because no design decision is sensitive to a generic scenario. The fix: specificity in time, place, persona, job, surrounding context, attention level.

### *The Aspirational Scenario*
Scenarios where the user is fully attentive, the environment is perfect, and the product works flawlessly. Designs calibrated to aspirational scenarios fail in real conditions. The fix: include the messy specifics. Real moments have distractions, half-attention, surrounding world.

### *The Marketing Scenario*
Scenarios written to optimize for purchase or signup intent. "Imagine the day you finally feel calm, balanced, ready..." Useful for landing pages; not useful for design. The fix: design scenarios optimize for design-decision relevance, which means they include the unflattering specifics that marketing copy excludes.

### *The Persona-Free Scenario*
Scenarios that don't name the persona. "A user is at home..." Generic by construction. The fix: every scenario is one named persona by reference from `.personas.md`. If the scenario could apply to multiple personas, it's at the wrong level of abstraction.

### *The Job-Free Scenario*
Scenarios that describe a moment but don't tie it to a specific job. The reader knows the user is somewhere doing something but not what they're trying to accomplish. The fix: every scenario serves one job by ID from `.jtbd.md`. The job is what makes the scenario design-relevant.

### *The Sequence-as-Scenario*
Scenarios that describe a sequence of actions — "user opens the app, then taps the practice, then..." That's a journey or a short flow, not a scenario. Scenarios capture single moments. The fix: extract the single moment that matters; if you need the sequence, write a journey instead.

### *Scenario Inflation*
Twenty scenarios that the team produced because scenarios are easy to generate. Most are never consulted; the file becomes a graveyard. The fix: write the scenarios that specific design decisions need. Add as design questions surface; don't pre-generate.

### *The Demographic Scenario*
Scenarios that pile on demographic detail (age, location, family structure, brand preferences) instead of design-relevant detail (attention level, surrounding context, device, time pressure). The fix: include only details that influence design decisions. The user's age usually doesn't; the user's hands being full does.

### *The Stale Scenario*
Scenarios written once at project start and never revisited. The product changes; the moments where users encounter it change too. The fix: revisit scenarios when the product or audience shifts. Like personas and journeys, scenarios are living artifacts.

---

## A Closing Note

The discipline of scenario work is concreteness and restraint. Specific moments. Real surrounding context. Honest attention levels. Tied to specific personas + jobs + design questions. Written when needed, not pre-generated.

A `.scenarios.md` file with three well-grounded scenarios that designers actually consult during decisions beats a file with twelve atmospheric vignettes that nobody reads. The work is in the discipline, not the volume.
