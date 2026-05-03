# User Journeys

*This file holds maps of how specific personas accomplish specific jobs through real touchpoints, with their emotional state, friction, and opportunities tracked along the way. Each journey is scoped to one persona + one job; a project may have 0, 1, or 10 journeys depending on how much design work needs that grounding.*

*Each journey carries a `Confidence:` line. The three tiers, in order of decreasing certainty: research-grounded (built from real observations of users doing the job), context-derived (drafted from `.spruce.md` + `.personas.md` + `.jtbd.md`), assumed (intuition only).*

---

## How to read this file

- Journeys are added when specific design decisions need grounding in user experience. Each journey names the design decisions it's meant to inform.
- Current-state journeys map how the persona accomplishes the job today (with or without your product). Future-state journeys map how they would with the design you're producing. Pairing them surfaces the design's specific intent.
- The emotional axis is essential, not decorative. Specific language ("anxious about losing progress") beats generic labels or emojis.

---

## Journey: [Title]

*Example title: "Maya's morning practice — current state" or "Jordan's first session — future state."*

**Persona:** [Name from `.personas.md`]

**Job:** [ID + statement from `.jtbd.md`]. Example: "Maya F1 — settle the nervous system before the day's demands arrive."

**State:** Current-state / Future-state

**Confidence:** [research-grounded / context-derived / assumed] — [brief source citation if grounded]

**Design decisions this journey informs:**
- [Decision 1 — specific. Example: "Whether the personalization banner is doing the right work for Maya's morning context."]
- [Decision 2]

---

### Setup

[The situation at journey start. What just happened, what the persona is doing, where they are, what device they're on. One paragraph.]

*Example:*

> *Tuesday morning, 6:45am. Maya is awake earlier than her alarm. Coffee is brewing. The house is quiet. She's in the kitchen, phone in hand, dressed for the day. She wants to take 5 minutes before checking email and starting work — not as a project, just as a small good choice. The phone is the only device involved.*

---

### Touchpoints

*Sequence the journey through 5-15 touchpoints. Each touchpoint includes what happens, the emotional state, friction (when present), and opportunities (when present). Touchpoints are in chronological order.*

#### 1. [Touchpoint name]

**What happens:** [One sentence describing the user action or product event.]

**Emotional state:** [Specific language. Example: "Settled but slightly distracted by the thought of the day ahead."]

**Friction:** [What makes this step harder than it should be — when present. Skip if no friction.]

**Opportunity:** [What design intervention could address the friction or amplify the moment — when present. Skip if no opportunity.]

#### 2. [Touchpoint name]

[same shape]

*[Continue per touchpoint. Aim for 5-15 total. More than 15 usually means the scope is too broad.]*

---

### Emotional arc summary

[One paragraph naming the shape of the user's emotional experience through the journey. Where does it dip? Where does it lift? Where does it stay flat? Specific rather than generic.]

*Example:*

> *The arc starts settled (Maya's chosen this moment), dips briefly at touchpoint 3 (the home page asks her to choose when she'd rather just begin), recovers at touchpoint 4 (the personalization banner removes the choice), and ends quietly elevated (touchpoint 7, the practice closes with a calm transition rather than a CTA). The dip at 3 is the design opportunity.*

---

### Key moments

*2-4 specific moments in the journey where design has the most leverage.*

- **Touchpoint [N]: [moment label].** [Why this moment matters for design.]
- **Touchpoint [N]: [moment label].** [...]

---

### How this informs design

*The closing section. Specific design decisions this journey is meant to inform — translated from the touchpoint analysis. 2-4 specific implications.*

*Examples:*

- *Touchpoint 3's "task-focused, slightly impatient" emotional state argues against any home-page friction in the morning surface. `/design` should treat exploration prompts here as job-blocking failures.*

- *The dip at touchpoint 5 (audio starts) suggests the volume + voice character of the first 5 seconds carry disproportionate weight. `/voice` should evaluate first-audio copy + tone against this moment specifically.*

---

## Comparison: current-state vs. future-state

*This section appears when both states have been mapped for the same scope. Captures the delta between them.*

### Where the future-state removes friction

- **Touchpoint [N]:** [Current-state friction] → [How future-state addresses it.]

### Where the future-state preserves friction

- **Touchpoint [N]:** [Friction that survives the redesign — note whether intentional or worth revisiting.]

### Where the future-state adds friction the current world doesn't have

- **Touchpoint [N]:** [New friction — the most important to catch. Why was it added; is it worth the cost?]

---

## [Next journey]

*Same shape. Each journey gets its own subsection.*
