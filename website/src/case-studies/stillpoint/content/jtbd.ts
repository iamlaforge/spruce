/**
 * Stillpoint .jtbd.md content.
 *
 * Output of /jtbd — produced from .spruce.md + .personas.md context
 * (no jobs research). Articulates the underlying jobs Maya (primary)
 * and Jordan (secondary) are trying to accomplish, beneath the feature
 * descriptions. Read by every downstream command that should ground
 * feature + copy decisions in real user motivation: /design, /decide,
 * /critique, /uxreview, and the rest.
 *
 * Two exports, mirroring context.ts + personas.ts:
 *   - stillpointJtbd          — structured object for programmatic access
 *   - stillpointJtbdMarkdown  — full markdown rendering for the actual
 *                               .jtbd.md artifact format
 *
 * Source: drafted by /jtbd in Mode A from
 * src/case-studies/stillpoint/content/context.ts +
 * src/case-studies/stillpoint/content/personas.ts on 2026-05-01.
 */

export const stillpointJtbd = {
  development:
    "Drafted from .spruce.md + .personas.md context — no jobs research yet. Treat as structured assumptions.",
  primaryPersona: {
    name: "Maya",
    role: "Daily Practitioner",
    functional: [
      {
        id: "F1",
        statement:
          "When the day is starting and I want to set the tone for the next several hours, I want to settle the nervous system before the day’s first demands arrive, so I can engage with what’s coming from a steadier place rather than reacting from depleted reserves.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
      {
        id: "F2",
        statement:
          "When mid-day stress peaks between obligations, I want to step out of the flow for a few minutes, so I can return to work with more space rather than carrying compounding tension through the afternoon.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
      {
        id: "F3",
        statement:
          "When the day is ending and I want a transition between work and rest, I want to release the day’s accumulated tension from the body, so I can sleep more fully and start tomorrow from a less depleted baseline.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
    ],
    emotional: [
      {
        id: "E1",
        statement:
          "When I close a practice, I want to feel like I made a small good choice for myself, so the rest of the day or the night can start from there rather than from my last unfinished thought.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
      {
        id: "E2",
        statement:
          "When I return to the practice after missing a few days, I want to feel like I’m picking up rather than starting over, so the lapses don’t accumulate into a reason to stop entirely.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet. Inferred from Maya’s anti-gamification disposition + “values returning to it more than any particular outcome” motivation.",
      },
    ],
    social: [
      {
        id: "S1",
        statement:
          "When I tell a close friend or partner I meditate, I want to come across as someone with a quiet daily ritual — not as someone chasing wellness trends or selling a lifestyle.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
    ],
  },
  secondaryPersona: {
    name: "Jordan",
    role: "Skeptical First-Timer",
    functional: [
      {
        id: "F1",
        statement:
          "When I’m curious about meditation but haven’t committed to a practice, I want to sample what the practice actually feels like in 5 minutes or less, so I can decide whether to engage further without it costing me much.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
      {
        id: "F2",
        statement:
          "When I’ve completed a first session and I’m deciding whether to come back, I want to know whether what I just experienced was representative of the product or a one-off, so I can calibrate my expectation for what regular practice would feel like.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet. Surfaces the conversion-to-Maya transition as its own job.",
      },
    ],
    emotional: [
      {
        id: "E1",
        statement:
          "When I open the app for the first time, I want to feel like I’ve found something honest rather than something packaged, so I’m willing to give it a real try rather than abandoning at the first whiff of performance.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
    ],
    social: [
      {
        id: "S1",
        statement:
          "When I mention to a friend that I tried a meditation app, I want to come across as someone who’s curious about practice — not as someone who’s been sold to or who’s pretending to be the kind of person who meditates.",
        confidence:
          "Drafted from .personas.md context — no jobs research yet.",
      },
    ],
  },
  shared: [
    {
      description:
        "Both personas share the “step out of the flow for a moment” functional job — Maya does it daily, Jordan tries it once. Motivation and outcome are essentially the same; the difference is frequency, not shape.",
    },
  ],
  diverging: [
    {
      situation: "Arriving at the home page.",
      mayaMotivation:
        "Pick today’s practice quickly without exploration friction; begin within seconds of opening the app.",
      jordanMotivation:
        "Sample what the product feels like; decide whether the product is worth a real try without committing.",
      designImplication:
        "Same situation, different motivations — informs first-impression design weight. The home page has to serve both jobs simultaneously.",
    },
  ],
  conflicting: [
    {
      jobA: "Maya’s F1 — settle the nervous system before the day’s demands arrive (implies fast-entry-fast-exit, no friction between opening the app and starting the practice).",
      jobB: "Jordan’s F1 — sample what the practice feels like (implies more first-time orientation context, what to expect, how to settle in).",
      resolution:
        "Surface as /decide tradeoff for the home + first-practice flow. Design Jordan-friendly orientation that Maya can dismiss after first use, rather than picking one persona’s pattern over the other.",
    },
  ],
  forwardImplications: [
    "Maya’s F2 (mid-day reset) argues for a fast-entry-fast-exit pattern on the mid-day surface specifically. /design should treat any flow that requires more than two taps before practice begins as a job-blocking failure for this surface.",
    "Maya’s E2 (return-without-restart) rules out streak-broken UI patterns, gamification metrics, and missed-day anxiety patterns. /design and /decide should treat these as out-of-scope unless the team explicitly chooses to override Maya’s emotional job. /critique should flag any drift toward streak-language as a violation.",
    "Jordan’s E1 (honest-not-packaged) means the home page’s first 30 seconds carry disproportionate weight. Almost every wellness-app cliché is a violation of this job. /voice and /critique should evaluate first-impression copy against this job specifically.",
    "Jordan’s F1 (sample without commitment) means /uxreview should flag any flow requiring account creation before first practice as a Jordan-blocking failure. The product’s acquisition motion depends on this job being served well.",
    "Both personas’ social jobs (S1) argue against any pattern that signals “lifestyle product” or “wellness trend.” No “join 10,000+ people” copy. No completed-practices counters. No social sharing. /design and /decide should treat features that violate this as out-of-scope unless the team explicitly chooses to override.",
    "Conflict between Maya’s F1 and Jordan’s F1 will surface as a real /decide tradeoff for the home + first-practice flow design. Default resolution: design Jordan-friendly orientation that Maya can dismiss after first use, rather than choosing one persona’s pattern outright.",
  ],
} as const;

export const stillpointJtbdMarkdown = `# Jobs-to-be-Done

*This file articulates what the personas in .personas.md are trying to accomplish — the underlying jobs, independent of any specific solution. Every Spruce command that should ground feature or copy decisions in real user motivation reads this file: /design, /decide, /critique, /uxreview, and the rest.*

---

## How these jobs were developed

${stillpointJtbd.development}

---

## Jobs for ${stillpointJtbd.primaryPersona.name} (${stillpointJtbd.primaryPersona.role})

### Functional jobs

${stillpointJtbd.primaryPersona.functional
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

### Emotional jobs

${stillpointJtbd.primaryPersona.emotional
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

### Social jobs

${stillpointJtbd.primaryPersona.social
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

---

## Jobs for ${stillpointJtbd.secondaryPersona.name} (${stillpointJtbd.secondaryPersona.role}) — Secondary

### Functional jobs

${stillpointJtbd.secondaryPersona.functional
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

### Emotional jobs

${stillpointJtbd.secondaryPersona.emotional
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

### Social jobs

${stillpointJtbd.secondaryPersona.social
  .map(
    (j) =>
      `**${j.id}.** ${j.statement}\n\n**Confidence:** ${j.confidence}`,
  )
  .join("\n\n")}

---

## Shared and diverging jobs

### Shared

${stillpointJtbd.shared.map((s) => `- ${s.description}`).join("\n")}

### Diverging (same situation, different motivation per persona)

${stillpointJtbd.diverging
  .map(
    (d) =>
      `**Situation:** ${d.situation}\n\n- *${stillpointJtbd.primaryPersona.name}:* ${d.mayaMotivation}\n- *${stillpointJtbd.secondaryPersona.name}:* ${d.jordanMotivation}\n\n${d.designImplication}`,
  )
  .join("\n\n")}

### Conflicting (serving one works against another)

${stillpointJtbd.conflicting
  .map(
    (c) =>
      `**Job A:** ${c.jobA}\n\n**Job B:** ${c.jobB}\n\n**Resolution:** ${c.resolution}`,
  )
  .join("\n\n")}

---

## What these jobs mean for design work going forward

${stillpointJtbd.forwardImplications.map((i) => `- ${i}`).join("\n\n")}
`;
