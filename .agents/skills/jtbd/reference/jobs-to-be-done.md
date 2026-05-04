# Spruce Reference: Jobs-to-be-Done

---

## How to Use This File

This reference encodes the JTBD reasoning Spruce applies when producing or evaluating `.jtbd.md` artifacts. It is loaded alongside the core skill and consulted whenever the work involves understanding what the product's users are actually trying to accomplish — beneath the feature requests, beneath the surface descriptions of behavior, at the level of the underlying motivation.

This file is the domain drilldown for Jobs-to-be-Done specifically. The orchestrating reference (`human-centered-design.md`) covers how JTBDs relate to personas, journeys, and scenarios; this file covers what makes a JTBD a useful design artifact rather than a feature spec in disguise.

JTBDs are deceptively simple to write and frequently written badly. The wrong shape ("when I'm reviewing campaigns I want to see the dashboard so I can review them") looks like a JTBD but says nothing — it describes the feature, not the underlying job. The right shape names the situation, the motivation, and the outcome at the level of what the user is *fundamentally* trying to accomplish — so that any number of solutions could serve it. The discipline this reference teaches is the difference.

---

## Contents

1. The Foundational Commitment
2. The Three Layers of a Job
3. The Job Statement Shape
4. The Confidence Tier Discipline (Applied to JTBDs)
5. JTBDs and Personas — How They Connect
6. How JTBDs Inform Design Decisions
7. JTBD Anti-Patterns

---

## 1. The Foundational Commitment

### A job is what the user is trying to accomplish, not what your product does

**Principle:** A JTBD names the underlying motivation independent of any specific solution. It is the goal the user has — that they would have whether your product existed or not.

**Reasoning:** Most teams articulate "jobs" by describing what their product does in user-language: "When I'm using the dashboard, I want to see metrics, so I can make decisions." That isn't a job — it's a feature spec wearing job-language clothes. The test: would this statement still make sense if your product didn't exist? "When I'm using the dashboard" doesn't survive the test (no product, no dashboard, no statement). "When I need to know whether last quarter's campaign worked" does (the underlying need exists regardless of which product is solving it).

The discipline is to write JTBDs at a level of abstraction where multiple solutions could serve them. Your product is one solution; spreadsheets are another; asking a colleague is a third; reading a printed report is a fourth. The job is the same; only the solutions differ. When the JTBD names the job at this level, design decisions about the solution (which features, which flows, which surfaces) get to be deliberate choices about how to serve the job — rather than circular descriptions of features the team already built.

**Failure mode:** JTBDs that describe what the product does. They feel like they're capturing user intent but actually capture team intent. Design decisions made against them tend to reinforce existing features rather than identify whether those features are actually serving real jobs.

**Implementation guidance:**
- Test every JTBD: would this statement make sense if my product didn't exist? If the answer is no, the JTBD is too solution-coupled. Rewrite at a higher level of abstraction.
- Test every JTBD: could multiple solutions plausibly serve this job? If the answer is no (only my specific feature serves this exactly), the JTBD is too narrow.
- The job exists in the user's life. The product is one possible solution to the job. Keep the two distinct.

### Jobs are stable; solutions change

**Principle:** The underlying jobs users have tend to remain stable over time and across products. Solutions to those jobs change constantly. Anchoring design decisions to jobs (rather than to current solutions) produces more durable decisions.

**Reasoning:** "Help me feel calm before bed" has been a job for as long as humans have existed. The solutions have varied wildly — meditation, prayer, music, drugs, books, baths, screen-free hours, breathing exercises, apps, podcasts. A product designed against the job ("help me feel calm before bed") can evaluate any of those solutions on whether they serve the job. A product designed against a current solution ("help me complete my evening meditation session") gets locked into one solution shape and treats deviations as anomalies.

This is why JTBDs are powerful for design strategy: they outlast feature trends. A team that knows the jobs their users have can re-decide their solutions every release without losing the foundation.

**Implementation guidance:**
- When writing JTBDs, ask: would this still be a job if our product category disappeared? Cars don't change the job "I need to get from here to there." Email doesn't change the job "I need to communicate with this person." If the job depends on the product category existing, it's at the wrong level.
- A useful sanity check: write the job, then list 3-5 alternative solutions that could plausibly serve it. If you can't list any, the job is too narrow.

---

## 2. The Three Layers of a Job

A complete JTBD names three layers: the functional job, the emotional job, and the social job. The same situation produces all three; ignoring any of them produces designs that get the practical task right but feel wrong, or get the experience right but fail the practical task.

### Functional jobs

**What it is:** The practical task the user is trying to complete. The work they need to get done.

**Examples:**
- "When I have ten minutes between meetings, I want to clear my head."
- "When my campaign ends, I need to know whether it hit its targets."
- "When I'm onboarding a new team member, I need them to be productive within their first week."

**Test:** functional jobs answer "what task is the user trying to accomplish?" They tend to be the easiest layer to articulate because they're the most visible.

### Emotional jobs

**What it is:** How the user wants to *feel* — both during the job and after completing it. The internal experience.

**Examples:**
- "When I close the practice, I want to feel like I made a small good choice for myself, so the rest of the day starts from there."
- "When I look at the campaign results, I want to feel confident in what I'm telling my team — not anxious that I'm missing something."
- "When I finish onboarding the new team member, I want to feel like I've welcomed them, not just checked boxes."

**Test:** emotional jobs answer "how does the user want to feel about doing this — during, immediately after, and over time?" They're often the layer that distinguishes products that get adopted from products that get tried once.

### Social jobs

**What it is:** How the user wants to be *perceived* — by themselves or by others — as a result of doing the job.

**Examples:**
- "When I tell a friend I meditate, I want to come across as someone who has it together — not as someone who needs help."
- "When I share the campaign results, I want to come across as someone who knows their craft."
- "When the new team member tells their manager about onboarding, I want to come across as someone who runs a thoughtful team."

**Test:** social jobs answer "how does the user want to be seen — by themselves, by colleagues, by friends, by family — as a result of doing this job?" They're often the layer that influences whether users tell others about the product.

### When all three are present

A complete JTBD captures all three layers. Different products serve different layers more strongly:

- **Productivity tools** often emphasize functional jobs first (get the work done), with emotional jobs as a secondary concern (feel competent), and social jobs as tertiary (be seen as effective).
- **Wellness products** often invert this: emotional jobs first (feel calm), functional jobs second (do the practice), social jobs third (be seen as someone who takes care of themselves).
- **Status products** lead with social jobs (be seen as the kind of person who buys this), with functional jobs sometimes incidental.

The discipline is to name all three layers honestly, not to overweight whichever layer is easiest to design for. A meditation app that only addresses the functional job ("complete the meditation") will lose to one that addresses all three.

---

## 3. The Job Statement Shape

The classic JTBD shape: **"When [situation], I want to [motivation], so I can [outcome]."**

Each clause has a specific role.

### "When [situation]"

The trigger — the moment, context, or condition that makes the job arise. Specific, not generic. "When I have ten minutes between meetings" is useful; "When I'm working" is too vague to influence design.

The situation clause is what gives the JTBD its time and place. It's also the field most often skipped or made vague — and the field whose specificity most affects whether the JTBD informs design.

### "I want to [motivation]"

The underlying goal — what the user is fundamentally trying to do in that situation. Stated as the user's intent, not as the product's feature.

This clause should be solvable by multiple plausible solutions. "I want to clear my head" can be solved by meditation, a walk, a snack, calling a friend, lying down. "I want to use the breathing exercise" can only be solved by your specific feature — that's a feature spec, not a job.

### "So I can [outcome]"

The deeper purpose — why the motivation matters to the user. The outcome the user is ultimately seeking.

The outcome clause is what makes the JTBD complete. Without it, the statement says what the user wants to do but not why it matters; with it, the statement names the underlying value the job is creating for the user. "So I can clear my head" → "so the next meeting starts present." "So I can clear my head" → "so I sleep better tonight." Same motivation, different outcomes — different jobs.

### Putting it together

> "When I have ten minutes between meetings, I want to clear my head, so I can start the next meeting present."

> "When the campaign ends, I want to know whether it hit its targets, so I can recommend the next budget allocation with confidence."

> "When I'm onboarding a new team member, I want them to be productive within their first week, so they feel welcomed and the team's momentum doesn't break."

Each names a specific situation, an underlying motivation, and a deeper outcome. Each is solvable by multiple solutions; each gives the design enough specificity to make decisions.

---

## 4. The Confidence Tier Discipline (Applied to JTBDs)

The same three confidence tiers from the orchestrating HCD reference apply to JTBDs:

- **Research-grounded** — JTBDs articulated from real user research. Switching interviews, jobs-to-be-done conversations, observations of users doing the job in their real context. Cite the source briefly.
- **Context-derived** — JTBDs drafted from `.spruce.md` + `.personas.md` context. Plausible jobs based on what's known about the personas + the product's intent. Mark as drafted.
- **Assumed** — JTBDs written from intuition or general knowledge of the product category, with no project-specific grounding. Flag loudly.

The same anti-pattern applies: JTBDs that read as research-grounded but were actually drafted from intuition mislead the team. The fix is the same: every JTBD carries a `Confidence:` line. Drafted, derived, grounded.

For JTBDs specifically, research-grounded artifacts are the most valuable because the switching-interview pattern (asking users about the previous solution they switched FROM and TO when adopting your product) surfaces jobs that no amount of intuition can predict. A product team often discovers, through real switching interviews, that users adopted the product for a different job than the team designed it for. That kind of finding is invisible to context-derived or assumed JTBDs — which is why the confidence tier matters.

---

## 5. JTBDs and Personas — How They Connect

JTBDs and personas are complementary artifacts that build on each other. The relationship:

**Personas describe who; JTBDs describe what they're trying to accomplish.** Both are needed; neither is a substitute for the other. A persona without jobs is a character sketch. A job without a persona is a feature spec.

**JTBDs are tied to personas.** Each JTBD belongs to one or more personas. The same product serving two personas may have:

- **Overlapping functional jobs.** Both personas often need the same practical tasks accomplished. A meditation app's "settle the nervous system" job may be functional for both the daily practitioner and the first-timer.
- **Diverging emotional jobs.** The daily practitioner's emotional job ("make a small good choice that becomes part of the day") differs from the first-timer's ("find out if this practice is for me without committing"). Same situation, different emotions.
- **Diverging social jobs.** Often the strongest divergence. Daily practitioner: "be seen as someone with a quiet daily ritual." First-timer: "not be seen as someone trying too hard / chasing wellness trends."

**JTBDs surface persona refinements.** Sometimes the work of articulating jobs reveals that what looked like one persona is actually two — the people doing Job A and the people doing Job B turn out to be meaningfully different user types. Conversely, sometimes work on JTBDs collapses two personas into one (their jobs are identical; the distinction wasn't useful).

**JTBDs surface tradeoffs.** When personas have diverging jobs, design decisions that serve one persona's job often work against the other's. Surface those as `/decide` tradeoffs rather than papering them over.

### When to articulate jobs per persona vs. shared jobs

The default: articulate jobs per persona. Each persona has their own job set. Shared functional jobs can be noted as such ("this is a shared functional job for both personas"); the emotional and social layers usually diverge.

The exception: when the product genuinely has one persona, jobs are simply that persona's jobs. No need to attribute.

---

## 6. How JTBDs Inform Design Decisions

The point of the JTBD artifact is to shape downstream decisions. The connections:

### JTBDs inform feature decisions

- **Feature prioritization.** Features that serve high-priority jobs get more design attention than features that serve incidental ones. When the team disagrees on what to build next, asking "which job does each option serve, and how important is that job to the primary persona?" usually resolves the question.
- **Feature scoping.** A job with a specific outcome ("so I can sleep better tonight") gives the feature design a specific success criterion. A feature designed without a job's outcome in mind tends to grow scope to cover possibilities the user never asked for.
- **Feature removal.** A feature that doesn't serve a real job is a candidate for removal. The discipline is to ask, for every feature, "which job does this serve?" Features without an answer are deadweight.

### JTBDs inform copy decisions

- **CTA labels.** Buttons that name the user's actual job land better than generic action verbs. "Start practicing" (job: practice) beats "Get Started" (no job).
- **Empty state copy.** The three-part empty state pattern (what this is / why it's empty / what to do) is impossible to write well without naming the job the user is trying to accomplish.
- **Error messages.** Copy that names what the user was trying to accomplish and helps them get back to it lands better than copy that describes what failed.
- **Onboarding copy.** Copy that names the job the user is trying to start lands better than copy that describes the product's features. "Let's set up your first practice" (job: practice) beats "Welcome to [Product]!" (no job).

### JTBDs inform IA + flow decisions

- **Default views.** The default view should serve the most common job for the primary persona.
- **Navigation.** The top-level navigation should map to the primary jobs, not to product features. "Today" / "Practices" / "Reflections" maps to jobs; "Library" / "Settings" / "Account" maps to features.
- **Flow design.** Flows should be designed around completing a job, not around using a feature. The flow ends when the job is complete; everything between the start and the end serves the job's progression.

### JTBDs inform `/decide` tradeoffs

When `/decide` surfaces a real tradeoff, the JTBDs often resolve it. "Direction A serves [Job X] cleanly but adds friction to [Job Y]. The primary persona's primary job is X, so direction A wins" is a clean tradeoff resolution. When jobs don't resolve a tradeoff, that's a real `/decide` moment for the user to direct.

### The integration test

The test of whether JTBDs are influencing decisions: pick a recent design decision and ask whether it would be different with different jobs in scope. If the answer is "no, the design would be the same regardless," either the JTBDs aren't being read or they aren't specific enough to matter.

---

## 7. JTBD Anti-Patterns

The named patterns to recognize and resist.

### *The Feature Job*
JTBDs that describe what the product does in user-language. "When I'm using the dashboard, I want to see the metrics, so I can review them." The test fails: this statement requires the product to exist. The fix: rewrite at a higher level of abstraction. "When I need to know whether last quarter's campaign worked, I want to see the relevant metrics, so I can decide where to allocate next quarter's budget."

### *The Solution Job*
JTBDs that name a specific solution as the motivation. "When I want to relax, I want to use the breathing exercise, so I can feel calm." The test fails: only one solution can serve this. The fix: name the underlying motivation. "When I'm overwhelmed mid-day, I want to step out of the flow for a moment, so I can return to work with more space."

### *The Universal Job*
JTBDs so generic they apply to any product in the category. "When I use the app, I want it to work well, so I have a good experience." Useless because every JTBD could be written this way. The fix: specificity in the situation, motivation, and outcome.

### *The Single-Layer Job*
JTBDs that capture only the functional layer and ignore emotional + social. "When I have ten minutes, I want to meditate, so I can practice." Functional only; the emotional and social motivations are missing. The fix: write all three layers; the design will serve the full job rather than just the practical task.

### *The Outcome-Free Job*
JTBDs that name the situation and the motivation but skip the outcome. "When I have ten minutes, I want to meditate." Useful but incomplete — the outcome is what makes the job land emotionally. The fix: ask "so I can [what]?" The outcome is the value the user is creating; without it, the design has no success criterion.

### *The Borrowed Job*
JTBDs that come from a competitor's positioning rather than from the product's actual users. "Users want to [thing competitor X says their users want]." The fix: ground in the project's actual personas + research. The competitor's positioning may or may not match what your users are doing.

### *Job Inflation*
Articulating ten or twenty jobs because the team brainstormed and didn't prune. The artifact becomes unusable because every design decision could be justified against some job in the list. The fix: 3-7 jobs per primary persona is usually enough. Rank them by importance to the persona; cut the ones that don't change design decisions.

### *The Stale Job*
JTBDs written once at project start and never revisited. The product evolves; the jobs don't. Six months in, design decisions are being made for jobs nobody verified are still relevant. The fix: revisit JTBDs when the product's audience or feature scope shifts. Jobs are living artifacts — they should be re-tested against reality periodically.

### *The Persona-Free Job*
JTBDs written without attribution to specific personas. The artifact reads as "users want to do X" without naming which users. The fix: every JTBD should be tied to one or more personas. Shared jobs across personas can be noted as such; persona-specific jobs should name the persona explicitly.

---

## A Closing Note

The discipline of JTBD work is restraint and abstraction. Resist the pull to describe what the product does; name what the user is trying to accomplish. Resist the pull to write only the functional layer; capture the emotional and social layers too. Resist the pull to write more jobs than the design needs.

A `.jtbd.md` file with three well-articulated jobs that genuinely influence design beats a file with twenty jobs that influence nothing. The work is in the discipline, not the volume.
