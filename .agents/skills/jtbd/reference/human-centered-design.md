# Spruce Reference: Human-Centered Design

---

## How to Use This File

This reference encodes the human-centered design (HCD) reasoning that governs the upstream layer of Spruce's work. It is loaded alongside the core skill and consulted whenever a task involves understanding *who* the design is for and *what they're trying to do* — which is to say, before any visual decision lands.

HCD is the upstream of design. It establishes the foundation of users, jobs, and contexts that every downstream decision should serve. Spruce's UX substrate (UX Decision Patterns) and visual execution layers (Typography, Color, Spatial, Component, Motion, UX Writing) all calibrate against the HCD work this reference governs. A typography choice without an audience is a guess. A component without a user job is a feature. A polished interface without a journey is decoration.

Spruce's HCD work is structured around four artifacts: **personas**, **jobs-to-be-done**, **user journeys**, and **scenarios**. This file teaches the reasoning that connects them, the discipline that distinguishes useful HCD work from theater, and the integration with everything downstream. It is the orchestrating layer; the four domain references (`personas.md`, `jobs-to-be-done.md`, `user-journeys.md`, `research-and-evaluation.md`) drill into each method.

---

## Contents

1. The Foundational Commitment
2. The Four HCD Artifacts and How They Relate
3. The Confidence Tier Discipline
4. When to Use Which Method
5. How HCD Artifacts Inform Downstream Decisions
6. Integration with the UX and Visual Layers
7. HCD Anti-Patterns

---

## 1. The Foundational Commitment

### HCD precedes UX precedes visual

**Principle:** Before you decide what an interface should do, establish who it's for and what they're trying to accomplish. Before you decide how it should look, establish what it needs to do. The order matters.

**Reasoning:** AI-generated interfaces routinely fail not because the colors are wrong or the typography is generic — they fail because nobody asked who the design is for or what those people are trying to accomplish. An empty state designed without a user in mind defaults to "No items found." A signup form designed without a journey in mind defaults to fifteen fields because every product gets fifteen fields. A pricing page designed without a job in mind defaults to three equal columns because every pricing page has three equal columns.

The discipline is to start with users. Personas tell you who. Jobs-to-be-done tell you what they're trying to accomplish. Journeys tell you how they get there today and how the new design might serve them. Scenarios tell you the specific situations where the design will be encountered.

When this work is done well, every downstream decision has a real foundation. When it's skipped, every downstream decision is a guess weighted toward statistical defaults.

**Failure mode:** Polished interfaces that look right but serve the wrong people doing the wrong jobs. A meditation app whose copy speaks to wellness influencers when the real users are exhausted parents. An analytics tool whose dashboard layout serves casual viewers when the real users are senior specialists who need density.

**Implementation guidance:**
- Before any generative work on a new product, check for `.personas.md` and `.jtbd.md`. If they don't exist, recommend the discovery commands (`/personas`, `/jtbd`) before proceeding — or proceed with explicitly named assumptions.
- When a downstream command produces output, the decisions it surfaces should reference the personas + jobs they serve where relevant. "Used the larger heading level for editorial weight" is OK. "Used the larger heading level for editorial weight, calibrated to Maya's morning ritual context where the practice name needs to land before the audio starts" is grounded.
- Treat "we don't know our users yet" as a real answer. The discovery work doesn't manufacture knowledge; it captures what's known and flags what's assumed.

### Users are not generic

**Principle:** Different users doing different jobs need different designs. The discipline is to work with specific users (or honest assumptions about them), not with imagined averages.

**Reasoning:** "The user" is a fiction that produces averaged-out designs. Real products serve specific people in specific situations. A senior marketer reviewing campaign performance at 7am Monday is a different user from a junior marketer setting up their first campaign on a Friday afternoon — even when they're using the same tool. Treating them as one user means the design serves neither well.

The HCD methods exist to make these distinctions visible. Personas force you to name the specific user types and what distinguishes them. JTBDs force you to name the specific outcomes those users want. Journeys force you to map the specific paths through the product. Scenarios force you to anchor abstract personas in concrete moments.

When you find yourself making a design decision that "would work for any user," you're either designing for the lowest common denominator or you've collapsed important distinctions. Both produce generic output.

**Implementation guidance:**
- When personas exist, every significant design decision should be testable against the question: which persona does this serve, doing which job, in which scenario? If the answer is "all of them in any scenario," check whether the decision is too vague.
- Multiple personas can produce one decision when the decision genuinely serves all of them. They can also produce diverging decisions that surface as a real `/decide` tradeoff. Both are valid; collapsing them into a vague compromise is not.

---

## 2. The Four HCD Artifacts and How They Relate

The four HCD methods produce distinct artifacts that build on each other. Used together, they form a coherent picture of who the product serves and how. Used in isolation, they have less value than they appear to.

### Personas — *who*

A persona is a named user type with the attributes that distinguish them from other users of the same product: their role, context of use, expertise, motivations, fears, constraints, and what they know coming in. A persona is useful when it influences design decisions; it's useless when it sits in a deck unread.

Personas answer the question: **who is this for, and what makes them different from other people who might use it?**

A product can have one persona, multiple personas, or a primary persona plus secondary personas. The choice depends on whether the product genuinely serves multiple distinct user types or one type with internal variation.

### Jobs-to-be-Done — *what they're trying to accomplish*

A JTBD is a statement of what a user is trying to get done — independent of any specific solution. JTBDs separate the underlying goal from the features that might serve it. The classic shape: "When [situation], I want to [motivation], so I can [outcome]."

JTBDs come in three layers:

- **Functional jobs** — the practical task. ("When I have ten minutes between meetings, I want to clear my head, so I can start the next meeting present.")
- **Emotional jobs** — how the user wants to feel. ("When I close the practice, I want to feel like I made a small good choice for myself, so the rest of the day starts from there.")
- **Social jobs** — how the user wants to be perceived (by themselves or others). ("When I tell a friend I meditate, I want to come across as someone who has it together, not as someone who needs help.")

JTBDs are tied to personas. The same product serving two personas may have overlapping jobs (the functional layer often) and diverging jobs (the emotional and social layers often). Surfacing the divergence is part of the value.

JTBDs answer the question: **what is this person actually trying to accomplish — beneath the feature requests?**

### User journeys — *how they get there*

A journey is a mapping of how a specific persona accomplishes a specific job through a sequence of touchpoints — with their emotional state, friction points, opportunities, and gaps along the way. Journeys come in two flavors:

- **Current-state journeys** — how the user gets the job done today, with or without your product. Captures the real friction the product has the chance to remove.
- **Future-state journeys** — how the user would get the job done with the product you're designing. Captures the design's intended effect on the user's experience.

Both have value. Current-state journeys ground the design in real friction; future-state journeys force the design's intent to be specific. The discipline is keeping each journey scoped to one persona + one job — broad "the entire product experience" maps don't survive contact with reality.

Journeys answer the question: **how does this user get this job done, and where does the current world fail them?**

### Scenarios — *specific moments*

A scenario is a concrete narrative of a named persona attempting a specific job in a specific context. Scenarios are the bridge between abstract HCD artifacts and concrete design decisions: they give you something specific to design against.

A useful scenario names the persona, the job, the context (time, place, what just happened, what's about to happen), and the entry point into the product. It doesn't prescribe the design; it describes the situation the design has to serve.

Scenarios answer the question: **in what specific moments will this design be encountered, and what's true about the user in those moments?**

### How they connect

The artifacts have a natural dependency:

```
Personas → JTBDs → Journeys + Scenarios
```

Personas come first because everything else needs to be tied to specific user types. JTBDs come second because they're statements of what those personas are trying to accomplish. Journeys and scenarios both build on personas + JTBDs — journeys by mapping a longer arc, scenarios by anchoring abstract personas in concrete moments.

In practice, you don't always do them in strict order. JTBDs can surface persona refinements ("this job is actually two different jobs for two different personas"); journeys can surface JTBD additions ("the current-state journey reveals an emotional job we didn't name"). The methods inform each other.

What stays consistent: the artifacts are *connected*. A persona without jobs is a character sketch. A JTBD without a persona is a feature spec. A journey without a persona + job is a flowchart. Used together, they form a coherent foundation. Used in isolation, they're each less than they appear.

---

## 3. The Confidence Tier Discipline

Every HCD artifact is grounded in something — research, context, or assumption. The discipline is to be explicit about which.

Three tiers, in order of decreasing certainty:

### Research-grounded

The artifact is built from real user research: interviews, observations, analytics, surveys, usability testing. The artifact reflects what the research found, not what the designer hoped it would find.

Research-grounded artifacts are the strongest foundation. They're also the rarest — most projects don't have the research budget or timeline to ground every artifact this way.

When an artifact is research-grounded, its source should be cited (briefly, in the artifact itself). "Persona built from 8 interviews with mid-size B2B marketing directors, Q3 2025" is enough to signal the grounding.

### Context-derived

The artifact is drafted from the project's existing context (`.spruce.md`, the user's description of the product, what's known about the audience) and the designer's reasoning about who would use a product like this. The artifact captures plausible users + jobs based on the product's stated character and audience.

Context-derived artifacts are useful starting points. They make assumptions visible, structure them into decision-influencing artifacts, and give downstream commands somewhere real to anchor. They are not a substitute for research; they're a structured stand-in until research happens.

When an artifact is context-derived, that should be stated explicitly. "Persona drafted from `.spruce.md` context — no user research yet" is the right framing.

### Assumed

The artifact is built on the designer's intuition or general knowledge of the product category, with no project-specific grounding. Assumed artifacts are the weakest foundation but sometimes the only available one — early-stage products, exploratory work, situations where any user input is unavailable.

Assumed artifacts should be flagged loudly. "This persona is fully assumed — no context, no research. Treat as a placeholder for early reasoning; do not present as a real user." Downstream commands should weight findings against assumed personas accordingly.

### Why the discipline matters

Without confidence tier flagging, all HCD artifacts read the same — a research-grounded persona looks identical to a fully-assumed one in the artifact file. This produces two failure modes:

- **Assumed work treated as research.** A designer drafts a persona from intuition, the artifact gets shared, and three sprints later the team is making decisions based on persona traits nobody actually verified. The design serves a fictional user.
- **Research work dismissed as assumption.** A genuinely research-grounded artifact gets dismissed as "just a persona document" because there's nothing distinguishing it from speculative ones. The research stops informing decisions.

The fix is small: every artifact carries a `Confidence:` line per persona / per JTBD / per journey. Downstream commands that read the artifact know to weight findings accordingly.

---

## 4. When to Use Which Method

Not every project needs all four artifacts. The right starting point depends on what's known, what's missing, and what design decisions are pending.

### Start with personas when:
- You don't have a clear sense of who uses the product.
- The product serves multiple user types and you haven't named them.
- Design decisions are being made for "the user" generically.
- You're inheriting a project and need to ground the work in user types before doing anything else.

### Start with JTBDs when:
- Personas exist but feature decisions are being driven by feature requests rather than underlying jobs.
- You're trying to scope a new feature and need to articulate what job it serves.
- You're evaluating a feature for removal and need to articulate which job (if any) it actually serves.

### Map a journey when:
- You're designing or evaluating a multi-step flow (onboarding, checkout, complex setup, recovery from error).
- Friction is suspected somewhere in the user's experience but the location isn't obvious.
- You want to compare current-state to future-state to make the design's intended effect explicit.

### Write scenarios when:
- Personas + JTBDs feel abstract and you need concrete situations to design against.
- You're handing off design work and the receiver needs context to make good downstream decisions.
- You're testing whether a design holds up across multiple realistic moments of use.

### Skip what you don't need

A small product with one obvious persona may need that persona named, two or three JTBDs articulated, and nothing else. A complex multi-flow product may need full journeys for the critical paths. The discipline is to use the methods that serve the design work — not to produce the full HCD artifact set as a deliverable.

---

## 5. How HCD Artifacts Inform Downstream Decisions

HCD work is only valuable if it influences design decisions. The connection has to be specific.

### Personas influence:
- **Density direction** — expert personas tolerate density; novice personas need more space.
- **Voice register** — different personas need different tone (direct vs. warm vs. formal).
- **Information architecture** — what gets surfaced vs. hidden depends on which personas are expected to need what.
- **Default state choices** — what's default depends on what most personas need most often.

### JTBDs influence:
- **Feature prioritization** — features that serve high-priority jobs get more design attention than features that serve incidental ones.
- **Copy specificity** — copy that names the user's actual job lands better than copy that describes the feature in feature-language.
- **Empty state design** — the three-part empty state pattern (what this is / why it's empty / what to do) is impossible to write well without naming the job the user is trying to accomplish.
- **CTA labels** — buttons that name the user's job land better than generic action verbs.

### Journeys influence:
- **Flow design** — how steps connect, what comes before vs. after each.
- **State coverage** — every step in the journey has states that have to be designed.
- **Emotional pacing** — moments where the user is anxious need different treatment from moments where the user is curious.
- **Recovery paths** — current-state journeys reveal where users get stuck today; future-state journeys design the recovery.

### Scenarios influence:
- **Edge case design** — scenarios surface specific moments the design has to handle.
- **Default behavior** — scenarios reveal what users are typically doing when they encounter the design.
- **Voice calibration** — scenarios anchor abstract voice register in specific moments where copy will be read.

### The integration test

A useful test of whether HCD artifacts are influencing downstream work: pick a recent design decision and ask whether it would have been different with different personas / JTBDs / journeys. If the answer is "no, the design would be the same regardless," either the HCD artifacts aren't being read or they aren't specific enough to matter. Both are fixable.

---

## 6. Integration with the UX and Visual Layers

HCD doesn't replace the UX substrate or the visual execution layers — it precedes them. Every dimension reference (Typography, Color, Spatial, Component, Motion, UX Writing) becomes more useful when calibrated to the HCD artifacts.

### How HCD informs each dimension

- **Typography** — the audience persona shapes typeface choice (expert technical users want different typography than warm consumer users). JTBDs influence type scale (jobs that involve sustained reading need different scale than jobs that involve quick scanning).
- **Color** — palette character calibrates to persona character. Density-tolerant expert personas can handle higher-contrast palettes; novice personas often need softer ones. JTBDs that involve emotional content (the meditation app's calm) influence color temperature.
- **Spatial** — density direction calibrates to persona expertise. Spacious for novices and casual users; dense for experts who value screen real estate.
- **Component** — component archetypes calibrate to JTBDs. A card layout serves "browse and pick" jobs; a list layout serves "scan and act" jobs; a table serves "compare and decide" jobs.
- **Motion** — motion character calibrates to persona context. A meditation app's persona wants slow, settled motion; a financial-trading persona wants snappy, immediate motion.
- **UX Writing** — voice calibrates to persona register. Copy that names the user's actual job lands better than copy that describes the feature in feature-language.

### How HCD informs UX Decision Patterns

The UX substrate (the dimension that establishes what the interface needs to *do*) is where HCD has the most direct influence. Information architecture, system feedback, forms, empty states, error handling, progressive disclosure — all of these have right answers that depend on who the user is and what they're trying to accomplish.

A surface designed against generic users defaults to generic UX patterns. A surface designed against named personas + JTBDs can choose patterns that fit those specific users + jobs. The difference is the difference between competent UX and considered UX.

---

## 7. HCD Anti-Patterns

The named patterns to recognize and resist. The first three are universal; the rest are specific to each method (and detailed in the domain references).

### *The Imagined Average User*
Designs built for "the user" — a generic, undifferentiated abstraction that produces averaged-out output that serves no one well. The fix: name the specific personas, even if drafted from context. Specificity always beats averaging.

### *Persona Theater*
HCD artifacts that exist as documentation but never influence decisions. Personas printed on the wall, JTBDs in a deck nobody opens, journeys mapped but disconnected from the design work that follows. The fix: every HCD artifact should produce concrete decision changes; if it doesn't, either the artifact isn't specific enough or the downstream work isn't reading it.

### *Assumption-as-Research*
Artifacts that read as research-grounded but were actually drafted from intuition. Without explicit confidence tier flagging, an assumed persona looks identical to a researched one — and decisions get made on speculation that everyone treats as fact. The fix: every artifact carries a `Confidence:` line. Downstream weighting follows.

### *The Stereotype Persona*
Personas built from demographic shortcuts and lifestyle stereotypes. "Sarah, 32, marketing manager, loves dogs and matcha, drives a Subaru." None of those details inform a design decision; all of them are projections. The fix: persona attributes should be the ones that influence design decisions — role, expertise, context of use, motivations, fears, constraints. Demographics rarely qualify.

### *The Feature Job*
JTBDs that are actually feature requests in disguise. "When I'm reviewing campaigns, I want to see the dashboard, so I can review them." Functional but uninformative. The fix: a JTBD names the underlying motivation, not the solution. The job exists whether your product exists or not.

### *The Lipstick Journey*
Journey maps that look polished but don't connect to design decisions. Beautiful diagrams with emotional arcs and friction points marked, but the design that follows is the same design that would have been built without the map. The fix: a journey should produce specific design decision changes — feature additions, removals, sequence changes, emotional pacing adjustments. If it doesn't, simplify the map and clarify the connection.

### *The Whole-Product Map*
Journeys that try to capture "the entire user experience" in one map. They become so broad they're useless for any specific design decision. The fix: scope every journey to one persona + one job. If you need to map another persona or another job, that's another map.

### *The Generic Heuristic Audit*
Heuristic evaluations that apply Nielsen's ten heuristics (or any other generic checklist) without grounding the findings in specific personas + journeys. The findings are correct in the abstract and disconnected from the specific product's users. The fix: ground heuristic evaluation in the named personas + journeys; flag findings against specific user impacts rather than against generic principles.

---

## A Closing Note

Human-centered design is the upstream of design reasoning. Done well, it makes every downstream decision sharper because the calibration has somewhere real to anchor. Done poorly, it adds documentation overhead without changing what gets built.

The discipline is to do it well: specific personas, real jobs, scoped journeys, concrete scenarios, honest confidence flags. The downstream work — the typography, the components, the copy, the motion, the polish pass — gets to be specific because the foundation is specific. That's the trade Spruce is making by adding HCD as the upstream layer.
