# Audit Report

*Output of `/audit`. HCD-grounded findings against the named personas + jobs (and journeys + scenarios when present). Each finding is tied to a specific persona + job, weighted by severity, and closes with a recommended corrective command. The audit does not modify code; the corrective tier addresses the findings.*

---

## Frame

**Audit scope:** [full product / specific surface or flow — be specific]

**Artifacts read:**
- `.personas.md` — [N personas; confidence summary]
- `.jtbd.md` — [N jobs; confidence summary]
- `.journeys.md` — [N journeys; confidence summary] (or "not yet mapped")
- `.scenarios.md` — [N scenarios; confidence summary] (or "not yet mapped")

**Findings shape:** [N blocking, N significant, N friction, N polish, plus N positive findings].

[One paragraph describing the high-level shape of what the audit surfaced. Where is the product working well; where is it falling short; what's the most pressing direction.]

---

## Positive findings

*2-4 specific things the product does well in serving the named personas + jobs. Brief; grounded in named personas + jobs.*

### [Positive finding name]

**Where:** [specific surface]

**What:** [what the product does well]

**Affects:** [which persona(s) + job(s) this serves]

---

## Findings

*Grouped by severity, highest first. Within each severity group, ordered by which persona is affected (primary's findings first).*

### Blocking

*Findings that prevent the primary persona from completing a primary job. Address before shipping.*

#### [Finding name — short descriptive label]

**Where:** [specific surface, flow, or touchpoint]

**What:** [what's happening at this surface that fails]

**Affects:** [Persona name + job ID(s)]. Example: "Maya doing F1 (settle the nervous system before the day's demands arrive)."

**Severity:** Blocking

**Confidence:** [research-grounded / context-derived / assumed] — [brief note on grounding]

**Behavioral anti-pattern (if applicable):** [Choice Overload / Premature Commitment / Cognitive Tax / Missing Recovery / Engagement Trap / Persona Mismatch]

**Recommended corrective:** `/[command]` — [one-line note on what the corrective should address]

---

#### [Next blocking finding]

[same shape]

---

### Significant

*Findings that meaningfully degrade the primary persona's experience or block secondary personas' primary jobs. Address in next iteration.*

#### [Finding name]

[same shape]

---

### Friction

*Findings that add avoidable friction without blocking. Address when convenient.*

#### [Finding name]

[same shape]

---

### Polish

*Findings that are small refinements without affecting any persona's job completion. Address in `/finish` or defer.*

#### [Finding name]

[same shape]

---

## Cross-persona summary

*If the audit surfaced cross-persona patterns — findings affecting multiple personas, conflicts between personas' needs, design tradeoffs that surface from the comparison — surface them here.*

### Findings affecting multiple personas

[Brief note on which findings span personas; usually highest priority.]

### Cross-persona conflicts

[Findings where serving one persona's job actively works against another's. Surface as `/decide` tradeoffs.]

---

## Recommended next steps

*3-5 specific moves. Order by impact.*

1. **[Action]** — [one-line reasoning]. Run `/[command]`.
2. **[Action]** — [reasoning]. Run `/[command]`.
3. **[Action]** — [reasoning].

---

## Closing

> Happy to:
> - Drill into any finding for more context.
> - Run a specific corrective on the highest-priority findings.
> - Re-audit after corrective work to verify findings are addressed.
