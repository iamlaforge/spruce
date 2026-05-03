# Personas

*This file captures the user types this product is designed for. Every Spruce command that should calibrate to who the design serves reads this file before doing its work — `/design`, `/decide`, `/critique`, `/uxreview`, and the rest. Keep it specific, lean, and honest about confidence.*

*Each persona carries a `Confidence:` line so downstream commands can weight findings appropriately. The three tiers, in order of decreasing certainty: research-grounded, context-derived, assumed.*

---

## How these personas were developed

*One-line summary. Examples:*
- *Drafted from `.spruce.md` context — no user research yet. Treat as structured assumptions.*
- *Built from 8 user interviews, Q3 2025 — pattern of [user type].*
- *User-supplied, pressure-tested by Spruce against design-decision-relevance.*

---

## Primary persona

### [Name] — [Role]

**Confidence:** [research-grounded / context-derived / assumed] — [brief source citation if grounded]

**Role:**
[Specific role in the context of the product. "Senior marketing director managing $1M+ campaigns at mid-size B2B companies" beats "marketer."]

**Context of use:**
[When, where, how often. Device, environment, what just happened, what's about to happen. "Daily, mornings + evenings, on a phone in bed or at the kitchen table" beats "regularly."]

**Primary jobs:**
[1-3 outcomes the persona uses the product to accomplish. Stated as goals, not features. Link to `.jtbd.md` if it exists.]
- [Job 1]
- [Job 2]
- [Job 3]

**Expertise level:**
[How much the persona knows about the product's category, the product itself, the underlying domain. "Domain expert, new to this product" beats "intermediate."]

**What they know coming in:**
[Mental model, prior knowledge, expectations. Influences default state choices, copy specificity, progressive disclosure.]

**Primary motivations:**
[What drives this persona to use the product. Specific, not universal. "Wants the morning routine to feel like a small good choice rather than a chore" beats "wants to feel good."]

**Primary fears / what they want to avoid:**
[What makes this persona disengage, abandon, or distrust. Specific to this product's category.]

**Key constraints:**
[What limits this persona's engagement. Time, attention, expertise, environment, hardware. Influences pacing, density, complexity.]

*Optional fields — include only when they directly influence design decisions:*

**Tools they use alongside this product:**
[Other apps / services in the persona's workflow. Influences integration design, terminology, mental-model assumptions.]

**Failure scenarios they've experienced:**
[Past pain points in the product category. Influences error handling, recovery design, trust-building.]

**Decision-making style:**
[Fast vs. deliberative, individual vs. consultative. Influences pacing, default behavior, confirmation patterns.]

**Communication preferences:**
[Direct vs. warm, formal vs. casual, brief vs. detailed. Influences voice calibration.]

---

**How this informs design:**
*[2-3 sentences naming the most important downstream implications. The test of whether this persona is decision-influencing or just a character sketch.]*

*Examples:*
- *[Persona]'s expertise + density tolerance argues for a more information-dense home page than a casual-user product would warrant. `/design` and `/foundations` should weight that direction.*
- *[Persona]'s anti-performance disposition means voice should never reach for "join thousands" copy or community-counter patterns; `/voice` and `/finish` should treat those as character violations.*

---

## Secondary personas

*Include only when they meaningfully influence design decisions and aren't already covered by the primary. If a "secondary" persona doesn't change anything in the design, leave it out — it's deadweight.*

### [Name] — [Role]

**Confidence:** [tier]

*Same field structure as primary. Mark as secondary; clarify how their needs relate to the primary's when tradeoffs surface.*

**Relationship to primary persona:**
[How this persona's needs relate to the primary's. Examples: "Subset of [primary] with additional [constraint]"; "Different journey, occasional overlap with [primary]"; "Adjacent user — uses the product alongside [primary]."]

**When tradeoffs surface:**
[Which persona wins when their needs conflict, and why. Default: primary wins. If you've designated equal primaries, state that explicitly.]

---

## What this means for design work going forward

*This section translates the persona artifact into concrete instructions for downstream commands. 2-4 specific implications.*

*Examples:*

- *Density direction: [persona]'s context argues for [direction]. `/foundations` and `/design` should default to that direction; deviations should surface as `/decide` calls.*

- *Voice register: [persona] is [characterization]. `/voice` should not introduce [pattern]; if it appears in source, `/survey` and `/critique` should flag as character violation.*

- *Tradeoff resolution pattern: when designs benefit [primary] at the cost of [secondary], primary wins. When the reverse, surface as `/decide`. When both are equally affected, that's a real tradeoff for the user to direct.*

- *Persona evolution: revisit this file when the product's audience or scope shifts. Persona work that was right at project start becomes wrong as the product evolves.*

---

## Notes

*Anything the team should know about how these personas were developed, what's known to be missing, or what specific research would strengthen them.*
