# Spruce Reference: Personas

---

## How to Use This File

This reference encodes the persona development reasoning Spruce applies when producing or evaluating `.personas.md` artifacts. It is loaded alongside the core skill and consulted whenever the work involves understanding or articulating who a product is for.

This file is the domain drilldown for personas specifically. The orchestrating reference (`human-centered-design.md`) covers how personas relate to JTBDs, journeys, and scenarios; this file covers what makes a persona a useful design artifact rather than a marketing document.

Personas are the most over-produced and under-used artifact in design. Most products have personas; few products use them to make decisions. The discipline this reference teaches is the difference between persona theater and persona work that actually shapes design.

---

## Contents

1. The Foundational Commitment
2. What a Persona Is (and Isn't)
3. The Three Confidence Tiers
4. Persona Anatomy — What Belongs in the Artifact
5. Primary vs. Secondary Personas
6. The Anti-Stereotype Discipline
7. How Personas Inform Design Decisions
8. Persona Anti-Patterns

---

## 1. The Foundational Commitment

### A persona is a decision-influencing artifact

**Principle:** A persona is useful when it influences design decisions. It is useless — and counterproductive — when it sits in a deck unread, or when its details don't translate into design choices.

**Reasoning:** The test of a persona isn't how rich it sounds. It's whether it changes what gets built. A persona that names a user as "a senior marketing director at a mid-size B2B company who needs to review campaign performance daily and prioritizes signal over decoration" influences density choices, voice register, default views, information architecture, copy specificity. A persona that names a user as "Sarah, 32, marketing manager, loves dogs and matcha, drives a Subaru" influences nothing — those details have nothing to do with how the product should be designed.

The discipline is to include persona attributes that drive design decisions and exclude ones that don't. Every detail in a persona artifact should answer the implicit question: how would this detail change a design choice? If the answer is "it wouldn't," the detail doesn't belong in the artifact.

**Failure mode:** Personas that read like character sketches. Beautifully written, full of texture, completely useless for design work. The persona becomes a creative exercise rather than a design tool.

**Implementation guidance:**
- Default to including: role, context of use, expertise level, primary motivations, primary fears, key constraints, what they know coming in.
- Default to excluding: demographic details (age, gender, location) unless they directly drive design decisions; lifestyle markers (hobbies, brand preferences, family structure) unless they directly drive design decisions; physical descriptions; biographical narratives.
- For every persona attribute included, the writer should be able to name a downstream design decision that the attribute changes.

### The persona is calibrated to the design work, not to the user

**Principle:** A persona captures the dimensions of the user that matter for the design at hand. Different design work needs different persona detail.

**Reasoning:** A persona for a marketing site needs less depth than a persona for a complex product. A persona for an editorial product needs different details than a persona for a transactional one. The discipline is to include the persona attributes that the specific design work will reference — and skip the ones it won't.

A persona artifact built in the abstract ("a complete picture of this user") tends to over-include and under-specify. A persona artifact built in service of specific design decisions stays lean and useful.

**Implementation guidance:**
- Before producing a persona, ask: what design work is this persona going to inform? If the answer is "we're not sure yet," produce a minimal persona (role, context, primary jobs, top motivation/fear) and let it grow as design questions surface.
- When a design decision references a persona attribute that wasn't captured, that's a signal the persona needs to grow — not a signal the design decision is wrong.

---

## 2. What a Persona Is (and Isn't)

The category is muddied. Several adjacent concepts get called personas; only one of them is what this reference means by the term.

### What a persona IS

A persona is a named user type — a specific kind of person who uses the product, captured with the attributes that distinguish them from other user types and that influence design decisions made for them. Personas have names (so they're easy to reference), roles, contexts of use, and a small set of motivational and constraint dimensions that ground them.

### What a persona is NOT

- **Not a user segment.** Segments are statistical groupings ("users in EMEA," "users on free plans," "users who logged in this month"). They're useful for analytics but rarely useful for design — they don't capture the qualitative dimensions that make design decisions.
- **Not a JTBD.** JTBDs are statements of what users are trying to accomplish; personas are statements of who the users are. Both are needed; they aren't substitutes for each other. A persona has multiple JTBDs; a JTBD belongs to specific personas.
- **Not a marketing audience.** Marketing audiences describe who to communicate with; personas describe who to design for. Some attributes overlap; many don't.
- **Not a real person.** A persona represents a user type, not an individual. Naming the persona ("Maya," "Rohan") is a memory aid; the persona is the type, not the name.
- **Not a deliverable.** A persona is a tool. The artifact exists to inform decisions, not to be presented as the work itself.

---

## 3. The Three Confidence Tiers

Every persona is grounded in something. The three tiers in order of decreasing certainty:

### Research-grounded

Persona built from real user research: interviews, observations, usage data, surveys, usability testing. The persona reflects what the research found.

When a persona is research-grounded, the artifact should briefly cite the source. "Built from 8 interviews with B2B marketing directors at mid-size companies, Q3 2025" is enough.

Research-grounded personas are the strongest foundation but the rarest. Most projects don't have the budget or timeline for research at the depth required.

### Context-derived

Persona drafted from the project's existing context (`.spruce.md`, the user's description of the product, what's known about the audience) and reasoning about who would plausibly use a product like this. The persona captures structured assumptions, not findings.

Context-derived personas are useful starting points. They make the assumptions visible, structure them into decision-influencing artifacts, and give downstream commands somewhere real to anchor. They are not a substitute for research; they are a structured stand-in.

When a persona is context-derived, the artifact should state that explicitly. "Drafted from `.spruce.md` context — no user research yet" is the right framing. Downstream commands should treat findings against context-derived personas with appropriate caveats.

### Assumed

Persona built on intuition or general knowledge of the product category, with no project-specific grounding. Assumed personas are sometimes the only available option — early-stage products, exploratory work, situations where no context or research exists.

When a persona is assumed, the artifact should flag it loudly. "Fully assumed — no context, no research. Treat as a placeholder for early reasoning; do not present as a real user." Downstream commands should treat assumed personas as the weakest possible foundation and weight findings accordingly.

### How Spruce produces personas at each tier

- **Research-grounded:** the user provides research notes; Spruce structures them into the persona artifact format. The work is synthesis, not generation.
- **Context-derived:** Spruce drafts the persona from `.spruce.md` and the user's description of the audience, marks every speculative attribute, and asks for validation on the major calls. The work is structured drafting + transparent flagging.
- **Assumed:** Spruce produces a placeholder persona, flags it as fully assumed, and recommends running through it carefully before treating it as real. The work is best understood as scaffolding.

The tier should be set on each persona individually — a project can have one research-grounded persona and two context-derived ones in the same `.personas.md` file.

---

## 4. Persona Anatomy — What Belongs in the Artifact

The fields below are the default Spruce persona structure. Not every persona needs every field; lean toward the minimum that captures what design decisions will reference.

### Required

- **Name** — a memorable handle for the persona. Single first name is common ("Maya," "Rohan"). The name is not the persona; the name is just the handle.
- **Role** — what the persona does, in the context of the product. "Senior marketing director," "first-time meditator building a sustainable practice," "developer setting up a CI pipeline." Specific, not categorical.
- **Confidence** — research-grounded / context-derived / assumed. Cited briefly if research-grounded.
- **Context of use** — when, where, how often the persona uses the product. "Daily, mornings, on a desktop in a quiet office." "Twice a week, evenings, on a phone in bed before sleep." "Once per project setup, on a laptop in a meeting."
- **Primary jobs** — the top 1-3 things this persona uses the product to accomplish (link to `.jtbd.md` if it exists). Stated as outcomes, not features.

### Default include (most personas)

- **Expertise level** — how much does the persona know about the product's category, the product itself, the underlying domain. "Domain expert, new to this product." "Casual user with low domain knowledge." "Power user across the category."
- **What they know coming in** — what mental model, prior knowledge, or expectations they bring. Influences default state choices, copy specificity, progressive disclosure decisions.
- **Primary motivations** — what drives the persona to use the product. Not "they want to be efficient" (universal); "they want their morning routine to feel like a small good choice rather than a chore" (specific).
- **Primary fears / what they want to avoid** — what makes the persona disengage, abandon, or distrust. "Feels suspicious of products that try too hard to be friendly." "Anxious about losing work; wants visible save indicators."
- **Key constraints** — what limits the persona's engagement. Time, attention, expertise, environment, hardware. Influences design decisions about pacing, density, complexity.

### Optional (include when they drive decisions)

- **Tools they use alongside this product** — influences integration design, terminology consistency, mental-model assumptions.
- **Failure scenarios they've experienced** — influences error handling, recovery design, trust-building.
- **Decision-making style** — fast vs. deliberative, individual vs. consultative. Influences pacing, default behavior, confirmation patterns.
- **Communication preferences** — direct vs. warm, formal vs. casual, brief vs. detailed. Influences voice calibration.

### "How this informs design"

Every persona should close with a brief section answering: how does this persona shape design decisions for the product? Two or three sentences naming the most important downstream implications.

This is the test of whether the persona is decision-influencing or just a character sketch. If you can't write this section, the persona attributes aren't specific enough to matter.

---

## 5. Primary vs. Secondary Personas

Most products have one primary persona — the user the design serves first when tradeoffs surface. Many products also have secondary personas — users who matter and whose needs influence design, but whose tradeoffs lose to the primary persona's when they conflict.

### Naming the primary

The primary persona is the one the design serves when forced to choose. Surface this explicitly in `.personas.md`. "Maya is the primary persona; Rohan is secondary. When their needs conflict, design for Maya first."

The choice of primary should be deliberate, not implicit. Many products drift into serving the easier-to-design-for persona without naming the call. Spruce's discipline is to surface this as a real decision that the user makes.

### When all personas are equal

Some products genuinely serve multiple equal personas — a marketplace serving buyers and sellers, a collaboration tool serving owners and contributors. In these cases, name the equality explicitly. "Two equal primaries: buyers and sellers. Design choices that benefit one at the cost of the other should surface as `/decide` tradeoffs."

Equal primaries make design harder, not easier. They raise the cost of every design decision because tradeoffs can't be resolved by referencing the primary. Naming equality forces the tradeoffs to be acknowledged rather than papered over.

### When a persona shouldn't be there

Sometimes a persona gets articulated but doesn't actually influence design decisions for the product as scoped. The right move is to remove it from `.personas.md` rather than carry it as deadweight. A persona that doesn't change design isn't a persona; it's a placeholder.

---

## 6. The Anti-Stereotype Discipline

The most common failure mode in persona work is stereotype generation: filling out persona templates with demographic details and lifestyle markers that have nothing to do with how the product should be designed. The discipline is to resist this actively.

### Why stereotypes happen

When asked to "build a persona," the path of least resistance is to invent biographical detail. The template has fields for age, gender, location, hobbies — so those fields get filled. The result is a persona that reads as a complete person but is actually a collection of demographic projections that don't influence any design decision.

AI tools are particularly prone to this because the training data is full of persona templates that include these fields, and the statistical pattern is to produce them.

### The anti-stereotype rules

Every persona attribute should pass these tests:

1. **Does this attribute influence a design decision?** If no, drop it.
2. **Is this attribute grounded?** Research, context, or honest assumption (with the assumption flagged). If it's invention dressed as fact, drop it or rewrite it as an explicit assumption.
3. **Does this attribute apply to a user *type*, not a user *individual*?** Personas describe user types; biographical specificity belongs to actual users, not persona artifacts.
4. **Could this attribute be replaced with a more specific design-relevant attribute?** "Sarah, 32, marketing manager" → "Senior marketer, 5+ years in role, manages campaigns of $1M+ budget, reviews dashboards daily" is better because every detail influences density / voice / hierarchy decisions.

### What to default-include vs. default-exclude

**Default include:** role, context of use, expertise level, motivations, fears, constraints, what they know coming in. These influence design.

**Default exclude:** age, gender, location, photo, name beyond first-name handle, hobbies, family structure, brand preferences, lifestyle markers, biographical narratives. These rarely influence design and frequently smuggle in stereotype.

**Include only when justified:** demographic details that genuinely influence design decisions for this specific product (age for a product specifically serving older users; location for a product specifically serving a geographic context; family structure for a product specifically serving caregivers). The bar is "this product would be designed differently if this detail were different." If the answer is no, exclude.

---

## 7. How Personas Inform Design Decisions

The point of the persona artifact is to influence downstream decisions. This section catalogs the influences explicitly so the connections are easy to make.

### Personas inform UX substrate decisions

- **Information architecture** — what's surfaced vs. hidden. Expert personas can handle deeper navigation; novice personas need flatter hierarchy.
- **Default state choices** — which view is default depends on what most personas need most often.
- **Progressive disclosure** — how much complexity to expose at first contact. Calibrated to expertise + context.
- **Empty state design** — the introduction depends on what the persona needs to understand at that moment.
- **Error handling** — voice and recovery affordances calibrate to persona expertise + emotional state.
- **Form design** — field count, validation timing, required-vs-optional patterns calibrate to persona context.

### Personas inform visual execution decisions

- **Typography** — typeface character calibrates to persona register. Editorial typography for considered personas; technical typography for expert personas.
- **Color** — palette character calibrates to persona context + emotional register. Warm palettes for human-context personas; cooler palettes for technical-context personas.
- **Spatial density** — direct calibration. Spacious for novices and casual personas; balanced for moderate; dense for experts.
- **Component treatment** — interactive treatments calibrate to persona expertise (subtle affordances for power users; explicit affordances for casual users).
- **Motion** — character calibrates to persona context. Slow for calm-context personas; snappy for high-velocity-context personas.
- **Voice** — voice register calibrates to persona communication preferences.

### Personas inform decision tradeoffs

When `/decide` surfaces a real tradeoff, the personas often resolve it. "Direction A serves [Persona X] doing [Job Y]; Direction B serves [Persona Z] doing [Job W]. The primary persona is X, so direction A wins" is a clean tradeoff resolution.

When personas don't resolve a tradeoff (because the tradeoff genuinely affects all personas equally), that's a real `/decide` moment for the user.

### The integration test

The test of whether personas are influencing decisions: pick a recent design decision and ask whether it would be different with different personas. If the answer is "no, the design would be the same regardless," either the personas aren't being read or they aren't specific enough to matter.

---

## 8. Persona Anti-Patterns

The named patterns to recognize and resist.

### *The Sarah Persona*
Personas built from demographic shortcuts and lifestyle stereotypes. "Sarah, 32, marketing manager, loves matcha and dogs, drives a Subaru, lives in Brooklyn." None of those details inform a design decision; all of them are demographic projection. The fix: persona attributes should be the ones that influence design — role, expertise, context, motivations, fears, constraints. Demographics rarely qualify.

### *The Universal User*
Personas so generic they could describe anyone. "A user who wants to accomplish their goals efficiently and have a good experience." Useless because every persona could be described this way. The fix: specificity. Name what distinguishes this persona from other users of the same product.

### *The Marketing Persona*
Personas written for sales / marketing / positioning rather than design decisions. They emphasize purchasing motivation, brand affinity, segment characteristics. Useful for marketing; not useful for design. The fix: keep marketing personas in marketing artifacts; design personas live in `.personas.md` and prioritize design-decision-relevant attributes.

### *The Photo Persona*
Personas anchored by a stock photo of a fictional person. The photo invites projection; the projection becomes assumption; the assumption becomes design. The fix: skip the photo. The persona is the type, not the individual; visual identity invites stereotype.

### *Persona Theater*
Personas that exist as documentation but don't influence design decisions. Printed on the wall, presented in decks, but every design decision happens as if the personas don't exist. The fix: every persona should produce concrete design decision changes; if it doesn't, either the persona isn't specific enough or the design work isn't reading it.

### *The Unflagged Assumption*
Personas that read as research-grounded but were actually drafted from intuition. Without confidence-tier flagging, the artifact looks identical to a researched persona — and decisions get made on speculation that everyone treats as fact. The fix: every persona carries a `Confidence:` line. Drafted, derived, or grounded.

### *The Persona Avalanche*
Five personas, ten personas, twenty personas — each capturing a slightly different segment, none of them primary. The product can't serve them all; the design ends up serving none of them well. The fix: name 1-3 personas. Designate one primary. Add more only when a real design tradeoff demonstrates the need.

### *The Stale Persona*
Personas that were written once at project start and never revisited. The product evolves; the personas don't. Six months in, design decisions are being made for users who no longer match the persona file. The fix: revisit personas when the product's audience or scope shifts. Personas are living artifacts.

### *The Job-as-Persona*
Personas defined entirely by what the user does ("the report-runner," "the dashboard-viewer") with no other dimensions. These are jobs, not personas. The fix: separate the two. Personas describe who; JTBDs describe what they're trying to accomplish.

---

## A Closing Note

The discipline of persona work is restraint. Include what influences design decisions. Exclude what doesn't. Flag confidence honestly. Keep the persona artifact small enough that it gets read and specific enough that it gets used.

A `.personas.md` file with two well-grounded personas that genuinely influence design beats a file with seven richly described personas that influence nothing. The work is in the discipline, not the volume.
