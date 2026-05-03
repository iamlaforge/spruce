# Jobs-to-be-Done

*This file articulates what the personas in `.personas.md` are trying to accomplish — the underlying jobs, independent of any specific solution. Every Spruce command that should ground feature or copy decisions in real user motivation reads this file: `/design`, `/decide`, `/critique`, `/uxreview`, and the rest. Keep jobs specific, layered (functional + emotional + social), and tied to specific personas.*

*Each job carries a `Confidence:` line so downstream commands can weight findings appropriately. The three tiers, in order of decreasing certainty: research-grounded (built from real jobs research), context-derived (drafted from `.spruce.md` + `.personas.md`), assumed (intuition only).*

---

## How these jobs were developed

*One-line summary. Examples:*
- *Drafted from `.spruce.md` + `.personas.md` context — no jobs research yet. Treat as structured assumptions.*
- *Built from 6 switching-interview transcripts, Q3 2025 — pattern of [user type] switching from [previous solution] to [our product] for [primary job].*
- *User-supplied, pressure-tested by Spruce against feature-job + outcome-clause discipline.*

---

## Jobs for [Primary persona name]

*The primary persona's jobs get the most depth — 3-7 jobs total across the three layers. The functional layer is usually the most populated; emotional and social layers may have 1-2 each.*

### Functional jobs

*What practical tasks the persona is trying to accomplish. The work they need to get done.*

**Job 1**

> When [specific situation], I want to [solution-independent motivation], so I can [outcome that names the underlying value].

**Confidence:** [research-grounded / context-derived / assumed]

*Example:*
> *When the day is starting and I want to set the tone for the next several hours, I want to settle the nervous system before the day's first demands arrive, so I can engage with what's coming from a steadier place rather than reacting from depleted reserves.*

**Job 2**

> When [...], I want to [...], so I can [...].

**Confidence:** [tier]

*[Repeat per functional job — typically 2-4 per primary persona.]*

### Emotional jobs

*How the persona wants to feel — during the job and after completing it. The internal experience.*

**Job 1**

> When [...], I want to feel [...], so [outcome of that feeling].

**Confidence:** [tier]

*Example:*
> *When I close the practice, I want to feel like I made a small good choice for myself, so the rest of the day starts from there.*

*[Typically 1-3 emotional jobs per primary persona.]*

### Social jobs

*How the persona wants to be perceived — by themselves or others — as a result of doing the job. Optional layer; some products are heavy with social signaling, others have none.*

**Job 1**

> When [...], I want to come across as [...], so [outcome of that perception].

**Confidence:** [tier]

*Example:*
> *When I tell a friend I meditate, I want to come across as someone with a quiet daily ritual — not as someone chasing wellness trends.*

*[Typically 0-2 social jobs per primary persona; skip the layer entirely if the product doesn't involve meaningful social signaling.]*

---

## Jobs for [Secondary persona name]

*Secondary personas get fewer jobs — 1-3 per layer that distinguish them from the primary. Don't repeat shared jobs here; note them in the cross-persona section below.*

*Same field structure as primary. Mark each job's `Confidence:` line.*

### Functional jobs

[...]

### Emotional jobs

[...]

### Social jobs

[...]

---

## Shared and diverging jobs

*This section makes the cross-persona patterns visible.*

### Shared jobs (apply to multiple personas)

*Jobs where multiple personas have the same shape of intent. Note the personas the job applies to.*

**[Job statement]** — applies to [persona A] and [persona B]. Both have the same functional motivation; the emotional and social layers may differ (capture below).

### Diverging jobs (same situation, different motivation per persona)

*Jobs where personas share the situation but the motivation, outcome, or emotional layer diverges. These are often the most important to surface because they're where design tradeoffs will arise.*

**Situation: [shared situation]**
- *[Persona A]*: motivation X, outcome Y. Emotional layer: feel Z.
- *[Persona B]*: motivation P, outcome Q. Emotional layer: feel R.

*Example:*
> *Situation: arriving at the home page for the first time.*
> - *Maya: motivation = pick today's practice quickly; outcome = start the practice without exploration friction.*
> - *Jordan: motivation = sample what the product feels like; outcome = decide whether to engage further without committing.*
> *Same situation, different motivations — informs first-impression design.*

### Conflicting jobs (serving one works against another)

*Jobs where serving one persona's job actively works against another's. Surface these as future `/decide` tradeoffs.*

**[Job A for persona X]** conflicts with **[Job B for persona Y]** because [reason]. Surface as `/decide` tradeoff when relevant features come up.

---

## What these jobs mean for design work going forward

*This section translates the abstract jobs into concrete instructions for downstream commands. 2-4 specific implications.*

*Examples:*

- *[Persona]'s [specific job] argues for [specific design direction]. `/design` should treat any flow that [violates this] as a job-blocking failure for this surface.*

- *[Persona]'s social job ["not be seen as someone chasing wellness trends"] means `/voice` should treat any [pattern: influencer-cadence copy, community-counter pattern, etc.] as a violation of the social job. `/critique` should flag when the design drifts toward this register.*

- *[Shared job across personas] argues for [direction]. When this job and a feature decision conflict, the job wins by default; surface conflicts as `/decide` calls.*

- *Job evolution: revisit this file when the product's feature scope or audience shifts. Jobs that were right at project start become wrong as the product evolves; periodic re-articulation keeps the artifact aligned with reality.*

---

## Notes

*Anything the team should know about how these jobs were developed, what's known to be missing, what specific research would strengthen them, or what tradeoffs the team has chosen to defer.*
