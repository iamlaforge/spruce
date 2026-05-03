/**
 * Stillpoint .scenarios.md content.
 *
 * Output of /scenarios — produced from .spruce.md + .personas.md +
 * .jtbd.md context (no observational research). Two scenarios
 * capturing the same general moment (opening the app fresh) from
 * Maya's and Jordan's perspectives, to test the home page's first-
 * impression design against both personas + their primary jobs.
 *
 * Two exports, mirroring the case study's other content modules.
 *
 * Source: drafted by /scenarios in Mode A from
 * src/case-studies/stillpoint/content/context.ts +
 * src/case-studies/stillpoint/content/personas.ts +
 * src/case-studies/stillpoint/content/jtbd.ts on 2026-05-01.
 */

type Scenario = {
  name: string;
  persona: string;
  job: string;
  confidence: string;
  designDecisionsInformed: string[];
  narrative: string;
  designImplication: string;
};

const mayaMorningKitchen: Scenario = {
  name: "Maya — morning kitchen",
  persona: "Maya (Daily Practitioner)",
  job: "Maya F1 — settle the nervous system before the day’s demands arrive.",
  confidence:
    "Drafted from .personas.md + .jtbd.md context — no observational research yet. The kitchen + coffee + kettle + cat details are plausible specifics that match Maya’s context-of-use (private moments, kitchen table) but are invented.",
  designDecisionsInformed: [
    "Whether the personalization banner placement on the home is serving Maya’s morning context.",
    "What attention level the home’s first surface can assume.",
  ],
  narrative:
    "Tuesday morning, 6:45am. Maya stands at the kitchen counter, coffee brewing, the kettle just starting to make noise. Her phone is in her hand; the lock screen shows fourteen overnight notifications she has not read yet. She wants 5 quiet minutes before any of them. She opens Stillpoint with the intention of starting a short practice. Her attention is half-with-the-phone and half-with-the-kettle; she’s dressed for the day but not yet engaged with it. The cat is in front of the cabinet she needs to open. The next twenty minutes will set the tone for the morning — she’s aware of that, lightly, without making it a project.",
  designImplication:
    "The home’s first surface needs to make “begin the recommended practice” reachable without scanning, scrolling, or choosing — Maya’s attention level can’t carry a multi-step front-door, and any friction here pushes the small-good-choice into a small-bad-task.",
};

const jordanFirstCurious: Scenario = {
  name: "Jordan — first-time curious, on the couch",
  persona: "Jordan (Skeptical First-Timer)",
  job: "Jordan F1 — sample what the practice actually feels like in 5 minutes or less.",
  confidence:
    "Drafted from .personas.md + .jtbd.md context — no observational research yet. The Sunday-couch-podcast-paused setup is invented but consistent with Jordan’s context (occasional, exploratory, low-commitment).",
  designDecisionsInformed: [
    "Whether the personalization banner serves first-impression for Jordan, or whether it would feel presumptuous to be told what to practice on first open.",
    "How much orientation context the home page needs to provide for someone who has never used Stillpoint.",
  ],
  narrative:
    "Sunday afternoon, 3:20pm. Jordan is on the couch, phone in hand, podcast paused. They downloaded Stillpoint a few minutes ago after a friend mentioned it — not enthusiastically, just in passing. They’ve tried two other meditation apps over the last few years; both lasted one session. They expect this one to do the same. They open the app with low investment and high skepticism. Their attention is mostly available — there’s nothing else they need to do for the next half-hour — but their patience for being sold to or warmed up is near zero. If the first surface signals “lifestyle product” in any visible way, they will close the app within ten seconds and not come back.",
  designImplication:
    "The home’s first 5-10 seconds carry disproportionate weight for Jordan — the opening visual + first copy line either pass the “honest, not packaged” test or fail it. A personalization banner that names a recommended practice may help (low friction, no choice required) or may feel presumptuous (the app doesn’t know me); the framing of the recommendation matters more than its presence.",
};

export const stillpointScenarios = {
  development:
    "Drafted from .spruce.md + .personas.md + .jtbd.md context — no observational research yet. Treat as structured assumptions about lived moments; observational research with real users would strengthen the surrounding-context details.",
  scenarios: [mayaMorningKitchen, jordanFirstCurious],
} as const;

export const stillpointScenariosMarkdown = `# Scenarios

*This file holds concrete narratives — each one anchoring a named persona doing a specific job in a specific moment where the design will be encountered. Scenarios are the lightest of the Discovery artifacts and the most concrete; they're what designers keep on the wall while making specific design decisions.*

---

## How these scenarios were developed

${stillpointScenarios.development}

---

${stillpointScenarios.scenarios
  .map(
    (s) => `## Scenario: ${s.name}

**Persona:** ${s.persona}

**Job:** ${s.job}

**Confidence:** ${s.confidence}

**Design decisions this scenario informs:**
${s.designDecisionsInformed.map((d) => `- ${d}`).join("\n")}

---

${s.narrative}

**Design implication:**

${s.designImplication}`,
  )
  .join("\n\n---\n\n")}
`;
