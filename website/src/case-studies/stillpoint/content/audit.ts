/**
 * Stillpoint /audit output.
 *
 * HCD-grounded evaluation of Stillpoint's home page → personalization
 * banner → practice detail page → practice begins flow, against
 * .personas.md (Maya, Jordan), .jtbd.md (6 jobs), .journeys.md
 * (Maya morning practice — current + future state), .scenarios.md
 * (Maya morning kitchen, Jordan first-time curious).
 *
 * Two exports, mirroring the case study's other content modules.
 *
 * Source: produced by /audit on 2026-05-01 from
 * src/case-studies/stillpoint/content/{personas,jtbd,journeys,scenarios}.ts
 * evaluated against the actual Stillpoint home + practice detail
 * surfaces in app/case-study/.
 */

type Severity = "Blocking" | "Significant" | "Friction" | "Polish";

type Finding = {
  name: string;
  where: string;
  what: string;
  affects: string;
  severity: Severity;
  confidence: string;
  behavioralAntiPattern?: string;
  recommendedCorrective: string;
};

type PositiveFinding = {
  name: string;
  where: string;
  what: string;
  affects: string;
};

const positives: PositiveFinding[] = [
  {
    name: "Personalization banner placement",
    where:
      "Home page — personalization banner sits above the practices grid, recommendation visible immediately on app open.",
    what:
      "Maya can begin the recommended practice in one tap from app open without scrolling, scanning, or choosing. The banner removes the home-scan friction that the current-state journey identified at touchpoint 4.",
    affects:
      "Maya doing F1 (settle the nervous system before the day’s demands arrive). Removes the journey’s biggest current-state friction.",
  },
  {
    name: "Voice register",
    where: "Across home, banner, practice detail page, signup section.",
    what:
      "Copy is calm-supportive without performative warmth. CTAs name the action specifically (“Begin practice,” “Start practicing”) rather than reaching for SaaS-default verbs. The voice work that /voice did is intact.",
    affects:
      "Both Maya (E1: small good choice) and Jordan (E1: honest not packaged) — the voice doesn’t signal lifestyle product, which serves both personas’ social jobs simultaneously.",
  },
  {
    name: "Pull-quote moment",
    where: "Home page — pull quote section with candle still-life.",
    what:
      "The Lora editorial moment with curly quotes + warm material image is the page’s signature beat. Reads as work made by someone who has actually meditated rather than someone selling meditation.",
    affects:
      "Both personas’ social jobs (S1: not chasing wellness trends). The moment is concrete proof of the brand’s commitment.",
  },
];

const findings: Finding[] = [
  {
    name: "Practice detail page interstitial when starting from recommendation",
    where:
      "Personalization banner → tap Begin practice → currently lands on the practice detail page, not directly into the practice.",
    what:
      "When Maya taps Begin practice from the personalization banner, the flow routes through the practice detail page (hero + about + steps + guide + related). The detail page is rich — appropriate for browsing-from-grid use cases — but excessive when Maya already chose what to start. The friction is small per-session but compounds across daily use.",
    affects:
      "Maya doing F1. Surfaced as journey touchpoint 6 in the current-state map. The future-state journey explicitly addresses this with a banner-direct begin path.",
    severity: "Significant",
    confidence:
      "Context-derived — based on Maya’s daily-use pattern + the journey’s emotional-arc analysis. Usability research with daily Stillpoint users would strengthen the call.",
    behavioralAntiPattern: "Cognitive Tax",
    recommendedCorrective:
      "/decide — surface the banner-direct vs. detail-page-mediated choice as a deliberate flow decision; the future-state journey’s recommendation is to design for both (banner-direct from recommendation; detail-page-mediated from grid).",
  },
  {
    name: "Post-practice close screen is undefined",
    where:
      "Practice detail page → Begin practice → audio plays → audio ends → no defined post-practice screen.",
    what:
      "The flow currently has no design for what happens after the audio ends. Default behavior would be to return to the prior screen or auto-prompt the next practice — both violate Maya’s emotional job (E1: small good choice, not a project) and risk drifting into engagement-trap patterns (streaks, “great work!” copy, next-practice prompts).",
    affects:
      "Maya doing F1. Highest-leverage moment in the journey per the current-state + future-state map. Also affects Jordan’s first-session experience (the close shapes whether she comes back).",
    severity: "Blocking",
    confidence:
      "Context-derived — Maya’s E1 job + her anti-gamification disposition both rule out engagement-trap close patterns. The future-state journey specifies a quiet acknowledgement screen.",
    behavioralAntiPattern: "Engagement Trap (potential, if defaults are followed)",
    recommendedCorrective:
      "/design — produce the post-practice close screen per the future-state journey’s spec (single Lora line acknowledgement, optional supporting italic, no CTAs, no streak, no next-practice prompt). /critique should evaluate any drafts against Maya’s E1 specifically.",
  },
  {
    name: "Personalization banner is hardcoded to evening (only adapts post-/fortify)",
    where:
      "Personalization banner — currently displays “For tonight” + Evening Wind-down recommendation regardless of actual time of day.",
    what:
      "The banner’s recommendation is hardcoded rather than time-of-day adaptive. For Maya at 6:45am, the recommendation reads as wrong — she’s starting her morning, but the banner is recommending an evening practice. The mismatch undermines the trust the personalization is supposed to build.",
    affects:
      "Maya doing F1 (morning context specifically). Acute mismatch when she opens the app in the morning.",
    severity: "Blocking",
    confidence:
      "Context-derived from .personas.md (morning use case) + observable from current implementation.",
    recommendedCorrective:
      "/fortify — implement time-of-day adaptation for the personalization banner. /uxreview previously flagged this as a state-coverage gap; this audit confirms it as Blocking from the HCD-grounded lens.",
  },
  {
    name: "Practice detail page opens cold for first-time visitors",
    where:
      "Practice detail page — Jordan’s likely first deep look at the product.",
    what:
      "The detail page is well-crafted (eyebrow, lede, hero image, About, What to expect steps, Specs, Guide bio, Related practices). It’s also dense for a first-time visitor with no context. Jordan’s “honest not packaged” test depends on the first 5-10 seconds; the detail page asks her to take in a lot quickly.",
    affects:
      "Jordan doing F1 (sample what the practice feels like in 5 minutes or less). The detail page sits between her decision to try and the practice itself; if the page reads as “sales material” rather than as “quiet introduction,” she leaves before pressing Begin practice.",
    severity: "Significant",
    confidence:
      "Context-derived. Jordan’s scenario specifies the first-impression sensitivity; the detail page hasn’t been designed against that scenario specifically.",
    behavioralAntiPattern: "Premature Commitment (potential)",
    recommendedCorrective:
      "/critique the practice detail page through Jordan’s lens specifically. /reduce may be applicable if the page surfaces too much for first-time use; /decide may be needed if the detail page should differentiate first-time vs. returning use.",
  },
  {
    name: "Hero secondary action “Or see how it works” may pull Jordan toward orientation when she came to sample",
    where:
      "Home page hero — primary CTA Begin practice + secondary text link “Or see how it works.”",
    what:
      "The secondary text link was added to subordinate the previous tertiary button (per /uxreview’s prior flagging). For Maya, the subordination works — primary is clear, secondary is quietly available. For Jordan, the secondary link may pull her toward an orientation pattern (“how it works”) when her job is to sample what the practice feels like, not to learn how the product works. The risk: she clicks “see how it works,” reads orientation copy, and either bounces or shifts mode away from sampling.",
    affects:
      "Jordan doing F1. The conflict surfaced in /jtbd’s diverging-jobs section (Maya wants fast entry, Jordan wants orientation context) plays out at this specific control.",
    severity: "Friction",
    confidence:
      "Context-derived — the diverging jobs are explicit in .jtbd.md; the friction at this control is inferred.",
    recommendedCorrective:
      "/decide — surface as a real cross-persona tradeoff for the hero secondary affordance. The current resolution (secondary text link) may be right; the audit surfaces it as a deliberate tradeoff worth confirming.",
  },
  {
    name: "Signup form is non-functional (no error / success / validation states)",
    where: "Home page signup section — email input + Start practicing button.",
    what:
      "The signup form is currently visual-only. No client-side validation, no error state, no success state. A user who submits gets no feedback; the form reads as broken on submit.",
    affects:
      "Both Maya (returning user might sign up for daily reminders) and Jordan (might sign up after a positive first session). Both lose trust if the form silently fails.",
    severity: "Significant",
    confidence:
      "Observable from current implementation. Already flagged by /uxreview and /fortify; this audit confirms from the HCD-grounded lens.",
    recommendedCorrective:
      "/fortify — implement error / success / client-side validation states for the signup form. Defer until after Blocking findings are addressed.",
  },
  {
    name: "Footer links to non-existent anchors",
    where: "Footer — About / Practices / Privacy / Terms links.",
    what:
      "Footer links point to anchors that don’t exist on the site (#about, #privacy, #terms). Visitors clicking get no result. Demo decoration in current scope; would be a real failure in a shipped product.",
    affects:
      "Either persona, low frequency. Both would experience trust erosion if they explored.",
    severity: "Polish",
    confidence:
      "Observable from current implementation.",
    recommendedCorrective:
      "/finish — flagged in /finish’s prior report as well. Remove non-functional links or build the destination pages.",
  },
];

const crossPersonaSummary = {
  affectingMultiple: [
    "Both positive findings about voice register and pull-quote moment apply to both personas’ social jobs simultaneously — the strongest design wins so far are the ones that serve both.",
    "The signup form non-functional state affects both personas at the same touchpoint; fixing it serves both.",
  ],
  conflicts: [
    "The personalization banner’s strength for Maya (removes choice friction) may be a weakness for Jordan (feels presumptuous when the app doesn’t know her). Currently the banner serves Maya cleanly; whether the framing also serves Jordan is the open question. Surface as /decide.",
    "The hero secondary action (“Or see how it works”) is the explicit cross-persona tradeoff control. Maya doesn’t need it; Jordan may. Current treatment is a quiet text link, which is the conservative middle. Worth a /decide pass to confirm the resolution.",
  ],
};

const recommendedNextSteps = [
  {
    action:
      "Address the two Blocking findings first — implement the personalization banner’s time-of-day adaptation (/fortify) and design the post-practice close screen (/design). These are the highest-leverage moves.",
    command: "/fortify + /design",
  },
  {
    action:
      "Then address the practice detail page interstitial issue. Surface as a /decide call: design banner-direct path for recommendation flows; keep detail-page-mediated path for browsing-from-grid.",
    command: "/decide",
  },
  {
    action:
      "Run /critique on the practice detail page through Jordan’s lens specifically. The page is well-crafted for general use; the question is whether it reads as “quiet introduction” or as “sales material” to a skeptical first-time visitor.",
    command: "/critique",
  },
  {
    action:
      "Defer the signup form state-coverage work (/fortify) and the footer non-functional links (/finish) until the Blocking + Significant findings are resolved.",
    command: "Sequencing note",
  },
  {
    action:
      "Re-audit after the corrective work above. Expect the post-practice close + personalization banner adaptation findings to clear. The practice detail page interstitial finding will move from Significant to either resolved (if /decide produces the banner-direct path) or accepted-tradeoff (if the team chooses to keep current behavior).",
    command: "/audit (re-run)",
  },
];

export const stillpointAudit = {
  scope:
    "Home page → personalization banner → practice detail page → practice begins → post-practice close. Scoped to the daily-use flow (the highest-stakes flow for the primary persona).",
  artifactsRead: {
    personas:
      ".personas.md — 2 personas (Maya primary, Jordan secondary). Both context-derived.",
    jtbd:
      ".jtbd.md — 6 jobs across 3 layers (functional, emotional, social). All context-derived.",
    journeys:
      ".journeys.md — 1 journey scope (Maya morning practice) mapped in both current-state and future-state. Both context-derived.",
    scenarios:
      ".scenarios.md — 2 scenarios (Maya morning kitchen, Jordan first-time curious). Both context-derived.",
  },
  findingsShape:
    "2 Blocking, 2 Significant, 1 Friction, 1 Polish, plus 3 positive findings.",
  frame:
    "The audit surfaces a clear pattern: Stillpoint serves Maya’s daily-use job well at most touchpoints (the personalization banner placement, the voice register, the pull-quote moment all earn the positive findings) but has two Blocking gaps — the personalization banner’s hardcoded recommendation breaks trust for Maya in the morning, and the post-practice close screen is undefined and would default to engagement-trap patterns that violate Maya’s emotional job. Jordan’s first-impression flow has a Significant friction in the practice detail page (well-crafted but dense for first-time visitors) and an open cross-persona tradeoff at the hero secondary action that the team should /decide deliberately. The voice + character work is the strongest layer; the state-coverage + flow-design work is where the remaining gaps live.",
  positives,
  findings,
  crossPersonaSummary,
  recommendedNextSteps,
} as const;

export const stillpointAuditMarkdown = `# Audit Report

*Output of /audit. HCD-grounded findings against .personas.md + .jtbd.md + .journeys.md + .scenarios.md, evaluated against the actual Stillpoint home + practice detail flow.*

---

## Frame

**Audit scope:** ${stillpointAudit.scope}

**Artifacts read:**
- ${stillpointAudit.artifactsRead.personas}
- ${stillpointAudit.artifactsRead.jtbd}
- ${stillpointAudit.artifactsRead.journeys}
- ${stillpointAudit.artifactsRead.scenarios}

**Findings shape:** ${stillpointAudit.findingsShape}

${stillpointAudit.frame}

---

## Positive findings

${positives
  .map(
    (p) => `### ${p.name}

**Where:** ${p.where}

**What:** ${p.what}

**Affects:** ${p.affects}`,
  )
  .join("\n\n---\n\n")}

---

## Findings

${(["Blocking", "Significant", "Friction", "Polish"] as const)
  .map((sev) => {
    const inSeverity = findings.filter((f) => f.severity === sev);
    if (inSeverity.length === 0) return "";
    return `### ${sev}

${inSeverity
      .map(
        (f) =>
          `#### ${f.name}

**Where:** ${f.where}

**What:** ${f.what}

**Affects:** ${f.affects}

**Severity:** ${f.severity}

**Confidence:** ${f.confidence}${
            f.behavioralAntiPattern
              ? `\n\n**Behavioral anti-pattern:** ${f.behavioralAntiPattern}`
              : ""
          }

**Recommended corrective:** ${f.recommendedCorrective}`,
      )
      .join("\n\n---\n\n")}`;
  })
  .filter(Boolean)
  .join("\n\n---\n\n")}

---

## Cross-persona summary

### Findings affecting multiple personas

${crossPersonaSummary.affectingMultiple.map((s) => `- ${s}`).join("\n")}

### Cross-persona conflicts

${crossPersonaSummary.conflicts.map((s) => `- ${s}`).join("\n")}

---

## Recommended next steps

${recommendedNextSteps
  .map((s, i) => `${i + 1}. **${s.command}** — ${s.action}`)
  .join("\n\n")}

---

## Closing

> Happy to:
> - Drill into any finding for more context.
> - Run a specific corrective on the highest-priority findings.
> - Re-audit after corrective work to verify findings are addressed.
`;
