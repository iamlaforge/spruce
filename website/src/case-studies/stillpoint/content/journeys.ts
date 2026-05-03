/**
 * Stillpoint .journeys.md content.
 *
 * Output of /journey — produced from .spruce.md + .personas.md +
 * .jtbd.md context (no observational research). Maps Maya doing her
 * morning practice (job F1) in both current-state and future-state for
 * comparison. Read by design + diagnostic commands that should ground
 * decisions in the morning home + first-practice flow's user
 * experience.
 *
 * Two exports, mirroring the case study's other content modules:
 *   - stillpointJourneys         — structured object for programmatic access
 *   - stillpointJourneysMarkdown — full markdown rendering for the
 *                                  actual .journeys.md artifact format
 *
 * Source: drafted by /journey in Mode A from
 * src/case-studies/stillpoint/content/context.ts +
 * src/case-studies/stillpoint/content/personas.ts +
 * src/case-studies/stillpoint/content/jtbd.ts on 2026-05-01.
 */

type Touchpoint = {
  name: string;
  whatHappens: string;
  emotionalState: string;
  friction?: string;
  opportunity?: string;
};

type Journey = {
  title: string;
  persona: string;
  job: string;
  state: "current-state" | "future-state";
  confidence: string;
  designDecisionsInformed: string[];
  setup: string;
  touchpoints: Touchpoint[];
  emotionalArcSummary: string;
  keyMoments: { touchpoint: string; whyItMatters: string }[];
  informsDesign: string[];
};

const mayaMorningCurrent: Journey = {
  title: "Maya’s morning practice — current state",
  persona: "Maya (Daily Practitioner)",
  job: "Maya F1 — settle the nervous system before the day’s demands arrive.",
  state: "current-state",
  confidence:
    "Drafted from .personas.md + .jtbd.md context — no observational research yet. The friction points are plausible based on Maya’s context (early-morning, half-attention, anti-engagement disposition); they would need usability research to verify.",
  designDecisionsInformed: [
    "Whether the personalization banner is doing the right work for Maya’s morning context.",
    "Whether the home → first-practice path has any avoidable friction.",
    "Whether the post-practice close pattern serves the emotional arc the journey calls for.",
  ],
  setup:
    "Tuesday morning, 6:45am. Maya is awake earlier than her alarm. Coffee is brewing. The house is quiet. She’s in the kitchen, phone in hand, dressed for the day. She wants to take 5 minutes before checking email and starting work — not as a project, just as a small good choice. The phone is the only device involved.",
  touchpoints: [
    {
      name: "Picks up the phone",
      whatHappens:
        "Maya picks up her phone with the intention of starting a short practice.",
      emotionalState:
        "Settled. She’s chosen this moment deliberately; the intention is clear.",
    },
    {
      name: "Sees lock screen full of overnight notifications",
      whatHappens:
        "The lock screen shows 14 notifications across email, news, and three other apps.",
      emotionalState:
        "First small dip. The notifications pull her attention toward the rest of the day before she’s started the practice.",
      friction:
        "The phone’s default surface is the day’s incoming demands. Even a 2-second scan of notifications shifts her mental state from “before the day” to “the day has started.”",
      opportunity:
        "Not Stillpoint’s problem to solve directly — but it shapes the emotional state Maya arrives at the app with. The app should NOT add to the cognitive load (no notification badge of its own, no “you missed yesterday” reminder).",
    },
    {
      name: "Opens Stillpoint",
      whatHappens:
        "Maya taps the Stillpoint icon. The app opens to the home page.",
      emotionalState:
        "Recovers slightly. She’s in the right tool now; the next move is clear in principle.",
    },
    {
      name: "Scans the home for what to practice",
      whatHappens:
        "Maya looks at the home page. There’s a hero, a practices section with three featured cards, a how-it-works section, a pull quote, a signup section.",
      emotionalState:
        "Task-focused, slightly impatient. She doesn’t want to read or browse; she wants to start.",
      friction:
        "Without personalization, Maya has to choose from three cards based on duration + type. The choice itself is small but is friction at this moment — she came to the app to begin, not to decide.",
      opportunity:
        "The personalization banner addresses this friction directly. Move it above the eyebrow + heading pair so it’s the first thing Maya sees; it should be possible to begin from the banner without scrolling.",
    },
    {
      name: "Picks Morning Grounding",
      whatHappens:
        "Maya taps the Morning Grounding card.",
      emotionalState:
        "Engaged. The choice is made; the practice is starting.",
    },
    {
      name: "Lands on the practice detail page",
      whatHappens:
        "The detail page loads with hero image + title + lede + Begin practice CTA + description sections + steps + guide bio + related practices.",
      emotionalState:
        "Brief reset of impatience. The detail page shows more than she needs in this moment — she’s already chosen; she wants to begin.",
      friction:
        "The detail page is rich for first-time users (Jordan) but excessive for daily users (Maya) who just want to begin. The Begin practice CTA is in the hero, so the friction is small — but the page’s scrollable depth implies “there is more to consider here” when Maya doesn’t want to consider.",
      opportunity:
        "From the personalization banner, the Begin practice CTA could start the practice directly — skipping the detail page when Maya already knows what she’s starting. Detail page remains for browsing-from-grid use cases.",
    },
    {
      name: "Practice begins",
      whatHappens:
        "Maya taps Begin practice. Audio starts; the screen transitions to a minimal practice surface.",
      emotionalState:
        "Settles. The intention from the start of the journey is now matching the surface.",
    },
    {
      name: "Practice ends",
      whatHappens:
        "Audio ends after ~5 minutes. Screen returns to a closing state.",
      emotionalState:
        "Quiet, lightly elevated. Maya completed the practice without it being a project; the small good choice landed.",
      friction:
        "Current Stillpoint scope doesn’t define the post-practice close. Default would be a CTA-heavy “Practice complete!” screen with sharing/streaks/next-practice prompts — exactly the gamification pattern Maya’s emotional job (E1) rejects.",
      opportunity:
        "Post-practice screen should hold the moment rather than push to engagement. Quiet acknowledgement (“Practice complete.”), no streak counter, no “keep going!” CTA. A “Browse the library” link is acceptable; a “Take another practice now” prompt is not.",
    },
  ],
  emotionalArcSummary:
    "The arc starts settled (Maya’s chosen this moment deliberately), dips at touchpoint 2 (lock-screen notifications shift her toward the day), recovers at touchpoint 3 (opening the app puts her back in the right context), dips again at touchpoints 4–6 (the home + detail page require small choices when she just wants to begin), settles at touchpoint 7 (the practice itself), and lands quietly elevated at touchpoint 8 (the practice ends). The dips at touchpoints 4 + 6 are the design opportunities — Stillpoint can’t fix the lock-screen problem, but it can remove its own contributions to the “small choices when I want to begin” friction.",
  keyMoments: [
    {
      touchpoint: "Touchpoint 4 — scanning the home for what to practice",
      whyItMatters:
        "Maya is task-focused and slightly impatient; the home’s structure either serves that or fights it. The personalization banner is the design’s answer to this moment.",
    },
    {
      touchpoint: "Touchpoint 6 — landing on the practice detail page",
      whyItMatters:
        "The detail page is rich for first-time users but excessive for daily users. The friction here is small but compounds across many morning sessions.",
    },
    {
      touchpoint: "Touchpoint 8 — practice ends",
      whyItMatters:
        "The post-practice close is undefined in current scope. Default patterns (CTA-heavy, gamified) would actively violate Maya’s emotional job (E1: small good choice, not a project). This is the highest-leverage design moment in the journey.",
    },
  ],
  informsDesign: [
    "Touchpoint 4 confirms the personalization banner’s placement decision: it should be the first thing Maya sees on the home, above the eyebrow + heading pair, so a one-tap begin is possible without scrolling. The current home page already does this; the journey validates the call.",
    "Touchpoint 6 surfaces an opportunity — the personalization banner’s Begin practice CTA could skip the detail page entirely when Maya is starting from the recommended practice. Detail page stays in the flow for browsing-from-grid use cases. /design or /decide should consider this as a future iteration.",
    "Touchpoint 8 names the post-practice close as the highest-leverage undesigned surface. Recommend adding the post-practice screen to the case study scope. /design should produce it; /voice should treat it as a critical voice-calibration surface (any push toward engagement violates Maya’s E1 job).",
  ],
};

const mayaMorningFuture: Journey = {
  title: "Maya’s morning practice — future state",
  persona: "Maya (Daily Practitioner)",
  job: "Maya F1 — settle the nervous system before the day’s demands arrive.",
  state: "future-state",
  confidence:
    "Drafted from .personas.md + .jtbd.md context — no observational research yet. The friction-removal moves are based on the current-state journey’s surfaced opportunities; would need usability research to verify whether the future-state actually serves Maya’s emotional arc better than the current-state does.",
  designDecisionsInformed: [
    "How to evolve the home + first-practice path to better serve Maya’s morning context.",
    "What the post-practice close should look like.",
  ],
  setup:
    "Same setup as current-state. Tuesday morning, 6:45am, kitchen, phone, the small good choice. Differences emerge in how Stillpoint serves the moment.",
  touchpoints: [
    {
      name: "Picks up the phone",
      whatHappens: "Same as current-state.",
      emotionalState: "Settled.",
    },
    {
      name: "Sees lock screen full of notifications",
      whatHappens:
        "Same as current-state — Stillpoint doesn’t add a notification of its own.",
      emotionalState:
        "Small dip. Stillpoint is not contributing to the cognitive load; it’s honoring Maya’s anti-engagement disposition by not pushing.",
      opportunity:
        "Stillpoint preserves this discipline by NOT adding push notifications by default. Maya’s engagement is voluntary; the product is there when she opens it, absent when she doesn’t.",
    },
    {
      name: "Opens Stillpoint",
      whatHappens:
        "Maya taps the Stillpoint icon. The app opens to the home page.",
      emotionalState:
        "Recovers. The home page surfaces the personalization banner immediately — the recommended practice is the first thing she sees.",
    },
    {
      name: "Begins from the personalization banner",
      whatHappens:
        "Maya taps Begin practice on the personalization banner. The practice begins directly — no detail page interstitial.",
      emotionalState:
        "Engaged, then settling. The choice was made for her; she didn’t have to scan or decide.",
    },
    {
      name: "Practice runs",
      whatHappens:
        "Audio plays for 5 minutes against a minimal practice surface.",
      emotionalState:
        "Settles fully. The product is doing its job; Maya is doing hers.",
    },
    {
      name: "Practice ends — quiet close",
      whatHappens:
        "Audio ends. Screen shows a quiet acknowledgement: a single line in Lora — “Practice complete.” — and a small italic line beneath: “Take a moment if you have it.” No CTAs. No streak. No next-practice prompt.",
      emotionalState:
        "Quiet, lightly elevated. The close holds the moment rather than pushing to engagement. Maya can sit with the screen briefly or close the app and get on with the day; either is fine.",
      opportunity:
        "This screen IS the design intervention. Without it, the post-practice surface defaults to engagement patterns that violate Maya’s emotional job. With it, the practice ends in a register that matches what Maya came for.",
    },
    {
      name: "Closes the app",
      whatHappens:
        "Maya closes Stillpoint. Returns to her morning.",
      emotionalState:
        "Settled. The journey’s intention from touchpoint 1 has landed.",
    },
  ],
  emotionalArcSummary:
    "The arc is shorter and steadier than current-state. Settled → small dip (lock screen, unavoidable) → recovers (home shows the right thing) → engaged → settled (during practice) → quietly elevated (the close holds the moment). The friction-spots at current-state touchpoints 4 + 6 (home scan, detail page) are removed; the undesigned moment at current-state touchpoint 8 (post-practice) is now defined and serves the emotional job.",
  keyMoments: [
    {
      touchpoint: "Touchpoint 4 — begins from the personalization banner",
      whyItMatters:
        "The single biggest design intervention in the future-state. Removes the home-scan + detail-page friction by making the recommended practice one tap from app-open.",
    },
    {
      touchpoint: "Touchpoint 6 — quiet close",
      whyItMatters:
        "The newly-designed surface that current-state didn’t have. The voice + visual restraint here is what makes the practice feel like “a small good choice” (Maya’s E1) rather than an engagement loop.",
    },
  ],
  informsDesign: [
    "The home’s personalization-banner-first hierarchy is validated — the future-state journey’s biggest friction-removal moment depends on it. /design should treat moving the banner below the eyebrow + heading as a regression.",
    "The personalization banner’s Begin practice CTA should skip the practice detail page when used. The detail page stays as the path for browsing-from-grid (when Maya wants to consider before beginning, or when Jordan is exploring). Two paths to begin: detail-page-mediated (slower, contextual) and banner-direct (faster, momentum-preserving).",
    "The post-practice close screen needs design. Specifications surfaced by this journey: single Lora line acknowledgement, optional supporting italic line, no CTAs, no streak, no “next practice” prompt. The screen exists to hold the moment, not to push to the next thing. /design should produce it; /critique should evaluate any drafts against Maya’s E1 job specifically.",
  ],
};

const comparison = {
  removedFriction: [
    "Current touchpoint 4 (home scan, task-focused impatience) — addressed by personalization banner being the first thing on the home in future-state.",
    "Current touchpoint 6 (detail page interstitial when starting from recommendation) — addressed by banner-direct begin path in future-state.",
  ],
  preservedFriction: [
    "Current touchpoint 2 (lock screen notifications). Stillpoint can’t solve the OS-level problem; the future-state preserves the discipline of not adding to it (no push notifications). The friction survives the redesign because it’s not Stillpoint’s to remove.",
  ],
  addedFriction: [
    "None identified. The future-state removes friction without adding new friction in other touchpoints. The post-practice close is a newly-designed surface, not a friction addition — its visual restraint serves the emotional arc.",
  ],
};

export const stillpointJourneys = {
  development:
    "Drafted from .spruce.md + .personas.md + .jtbd.md context — no observational research yet. Treat as structured assumptions; usability research with real morning-practice users would strengthen the friction + emotional-state calls.",
  mayaMorningCurrent,
  mayaMorningFuture,
  comparison,
} as const;

export const stillpointJourneysMarkdown = `# User Journeys

*This file holds maps of how specific personas accomplish specific jobs through real touchpoints, with their emotional state, friction, and opportunities tracked along the way.*

---

## How these journeys were developed

${stillpointJourneys.development}

---

${[mayaMorningCurrent, mayaMorningFuture]
  .map(
    (j) => `## Journey: ${j.title}

**Persona:** ${j.persona}

**Job:** ${j.job}

**State:** ${j.state}

**Confidence:** ${j.confidence}

**Design decisions this journey informs:**
${j.designDecisionsInformed.map((d) => `- ${d}`).join("\n")}

### Setup

${j.setup}

### Touchpoints

${j.touchpoints
  .map(
    (t, i) => `**${i + 1}. ${t.name}**

*What happens:* ${t.whatHappens}

*Emotional state:* ${t.emotionalState}${
      t.friction ? `\n\n*Friction:* ${t.friction}` : ""
    }${t.opportunity ? `\n\n*Opportunity:* ${t.opportunity}` : ""}`,
  )
  .join("\n\n")}

### Emotional arc summary

${j.emotionalArcSummary}

### Key moments

${j.keyMoments.map((m) => `- **${m.touchpoint}** — ${m.whyItMatters}`).join("\n")}

### How this informs design

${j.informsDesign.map((i) => `- ${i}`).join("\n\n")}`,
  )
  .join("\n\n---\n\n")}

---

## Comparison: current-state vs. future-state

### Where the future-state removes friction

${comparison.removedFriction.map((f) => `- ${f}`).join("\n")}

### Where the future-state preserves friction

${comparison.preservedFriction.map((f) => `- ${f}`).join("\n")}

### Where the future-state adds friction the current world doesn’t have

${comparison.addedFriction.map((f) => `- ${f}`).join("\n")}
`;
