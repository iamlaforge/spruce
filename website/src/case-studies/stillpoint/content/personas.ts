/**
 * Stillpoint .personas.md content.
 *
 * Output of /personas — produced from `.spruce.md` context (no research).
 * Read by every downstream Spruce command that should calibrate to who
 * the design serves: /design, /decide, /critique, /uxreview, and the
 * rest. Both personas are explicitly context-derived; the Confidence
 * line on each marks them as structured assumptions, not findings.
 *
 * Two exports, mirroring context.ts:
 *   - stillpointPersonas         — structured object for programmatic access
 *   - stillpointPersonasMarkdown — full markdown rendering for catalog
 *                                  illustrations + the actual .personas.md
 *                                  artifact format
 *
 * Source: drafted by /personas in Mode A from
 * src/case-studies/stillpoint/content/context.ts on 2026-05-01.
 */

export const stillpointPersonas = {
  development:
    "Drafted from .spruce.md context — no user research yet. Treat as structured assumptions.",
  primary: {
    name: "Maya",
    role: "Daily Practitioner",
    confidence:
      "Drafted from .spruce.md context — no user research yet.",
    fullRole:
      "Adult maintaining or building a sustainable mindfulness practice; uses Stillpoint as a daily anchor.",
    contextOfUse:
      "Daily use, mornings + evenings most days, occasionally mid-day. Phone is the primary device; headphones common but not required. Used in private moments — bedside, kitchen table, between meetings. Sessions are short (3–7 minutes) and habitual rather than scheduled.",
    primaryJobs: [
      "When the day is starting, settle the nervous system before demands arrive.",
      "When the day is ending, transition the body from work-state to rest-state.",
      "When mid-day stress peaks, take a short reset between obligations.",
    ],
    expertiseLevel:
      "Intermediate. Has tried meditation before — apps, occasional classes, books. Knows the basic vocabulary (breath awareness, body scan, returning to the breath). Not a teacher; not a beginner.",
    knowsComingIn:
      "Knows what meditation generally is and has formed opinions about which apps feel sincere vs. which feel hollow. Wary of wellness aesthetics that perform calm rather than cultivate it.",
    motivations:
      "Wants the practice to be a small, reliable good choice in the day — not a project, not a transformation. Values the act of returning to it more than any particular outcome.",
    fears:
      "Performative wellness branding (influencer cadence, “join 10,000 people”). Gamification (streaks, badges, points, completionism). Overly serene voice that reads as fake. Apps that try to maximize engagement rather than support the practice.",
    constraints:
      "Limited time. Limited attention for setup or browsing. Doesn’t want the app to compete for engagement; wants it to support the practice and step back.",
    informsDesign: [
      "Maya’s daily-use pattern argues for a home that surfaces the relevant practice quickly without exploration friction. The personalization banner serves her — quick recommendation, one tap to begin.",
      "Her anti-performance disposition means the product must NOT use social-proof copy, gamification, or saccharine voice. /voice should treat any of these as character violations.",
      "Her density tolerance is moderate — she values restraint over minimalism. The asymmetric practices grid (1 featured + 2 supporting) serves her by surfacing options without forcing browse-through-a-long-list.",
      "Her “wants the app to step back” disposition argues against persistent notifications, growth loops, social sharing, completionism. Features that violate this should be treated as out-of-scope unless explicitly requested.",
    ],
  },
  secondary: {
    name: "Jordan",
    role: "Skeptical First-Timer",
    confidence:
      "Drafted from .spruce.md context — no user research yet.",
    fullRole:
      "Adult exploring meditation for the first time. Drawn to the concept of mindfulness but skeptical of how the wellness genre typically packages it.",
    contextOfUse:
      "Occasional, exploratory. Phone primary. Tries a few sessions to see if the practice “lands”; if it does, becomes Maya within weeks. If it doesn’t, abandons the app and doesn’t return.",
    primaryJobs: [
      "When curious about meditation, sample what it actually feels like without committing to a regimen.",
      "When unsure whether “this is for me,” get a low-stakes way to find out.",
    ],
    expertiseLevel:
      "New to mindfulness. May have read about it casually or heard friends mention it. No regular practice.",
    knowsComingIn:
      "Vague positive associations with meditation. Active skepticism of wellness branding. Strong preference for products that treat them as a competent adult rather than someone to be sold to or warmed up.",
    motivations:
      "Wants to find out if the practice helps without committing to a daily habit upfront. Wants the entry point to feel low-pressure and the early sessions to feel honest rather than aspirational.",
    fears:
      "Being patronized (“you’ve got this!” copy). Being subscribed to before knowing if the product fits. Cliché meditation-app aesthetics — soft pastels, sun-drenched stock photography, “find your inner peace” copy. Any signal that the product is selling a lifestyle rather than supporting a practice.",
    constraints:
      "Very low commitment threshold. If the first session feels off — too long, too produced, too sales-y — they leave and don’t return. The product effectively gets one or two chances.",
    relationshipToPrimary:
      "Jordan is the entry point; Maya is the destination. Most Maya users were Jordan a year ago. Where the personas align (most of the time — both want low-performance, calm voice, restrained design), design choices serve both. Where they diverge: Jordan needs more onboarding context that Maya finds annoying.",
    tradeoffResolution:
      "Maya wins when the design choice would meaningfully harm her daily-use experience. Jordan wins when the design choice would meaningfully harm first-impression conversion AND Maya can adapt easily. Default: design for Jordan-friendly onboarding that Maya can skip after the first use, rather than designing without onboarding context.",
    informsDesign: [
      "Jordan’s first-impression sensitivity means the home page’s hero + first practice card carry disproportionate weight. /design and /finish should treat these as the highest-stakes surfaces.",
      "Their skepticism of wellness packaging means the product must NOT use stock-photo serenity, calming-emoji decoration, “begin your journey” copy, or any visual cue from the meditation-app cliché set the moodboard explicitly excluded. Vigilance from /voice, /critique, /detect.",
      "Their low-commitment threshold means the product should let them try a practice without account creation. /uxreview should flag any flow that requires signup before first practice as a Jordan-blocking failure.",
    ],
  },
  forwardImplications: [
    "Density direction: Maya’s intermediate expertise + Jordan’s first-time wariness both argue for spacious-leaning-balanced. Already calibrated in .spruce.md. /foundations and /design should hold this; deviations should surface as /decide calls.",
    "Voice register: Both personas are anti-performance + anti-wellness-cliché. /voice should treat the following as character violations: social-proof copy (“join thousands”), gamification language (“streaks,” “rewards,” “levels”), saccharine warmth (“you’ve got this!”), wellness-influencer cadence. /survey, /critique, /detect should flag these against either persona’s needs.",
    "Tradeoff resolution: Maya is primary. When Maya’s daily-use experience and Jordan’s first-impression conflict, surface as /decide rather than defaulting. When they align (which is most of the time), execute confidently.",
    "Engagement-pattern discipline: Both personas want the product to be opened-used-closed, not engagement-maximizing. No persistent notifications by default. No growth loops. No social sharing. /design and /decide should treat features that violate this as out-of-scope unless explicitly requested.",
    "Persona evolution: Most Jordan users become Maya users within weeks if the practice lands. The personas’ dynamic relationship means the product’s “new user” surfaces matter for both — Jordan today is Maya tomorrow.",
  ],
} as const;

export const stillpointPersonasMarkdown = `# Personas

*This file captures the user types Stillpoint is designed for. Every Spruce command that should calibrate to who the design serves reads this file before doing its work — /design, /decide, /critique, /uxreview, and the rest.*

---

## How these personas were developed

${stillpointPersonas.development}

---

## Primary persona

### ${stillpointPersonas.primary.name} — ${stillpointPersonas.primary.role}

**Confidence:** ${stillpointPersonas.primary.confidence}

**Role:**
${stillpointPersonas.primary.fullRole}

**Context of use:**
${stillpointPersonas.primary.contextOfUse}

**Primary jobs:**
${stillpointPersonas.primary.primaryJobs.map((j) => `- ${j}`).join("\n")}

**Expertise level:**
${stillpointPersonas.primary.expertiseLevel}

**What they know coming in:**
${stillpointPersonas.primary.knowsComingIn}

**Primary motivations:**
${stillpointPersonas.primary.motivations}

**Primary fears / what they want to avoid:**
${stillpointPersonas.primary.fears}

**Key constraints:**
${stillpointPersonas.primary.constraints}

---

**How this informs design:**

${stillpointPersonas.primary.informsDesign.map((i) => `- ${i}`).join("\n")}

---

## Secondary persona

### ${stillpointPersonas.secondary.name} — ${stillpointPersonas.secondary.role}

**Confidence:** ${stillpointPersonas.secondary.confidence}

**Role:**
${stillpointPersonas.secondary.fullRole}

**Context of use:**
${stillpointPersonas.secondary.contextOfUse}

**Primary jobs:**
${stillpointPersonas.secondary.primaryJobs.map((j) => `- ${j}`).join("\n")}

**Expertise level:**
${stillpointPersonas.secondary.expertiseLevel}

**What they know coming in:**
${stillpointPersonas.secondary.knowsComingIn}

**Primary motivations:**
${stillpointPersonas.secondary.motivations}

**Primary fears / what they want to avoid:**
${stillpointPersonas.secondary.fears}

**Key constraints:**
${stillpointPersonas.secondary.constraints}

**Relationship to primary persona:**
${stillpointPersonas.secondary.relationshipToPrimary}

**When tradeoffs surface:**
${stillpointPersonas.secondary.tradeoffResolution}

---

**How this informs design:**

${stillpointPersonas.secondary.informsDesign.map((i) => `- ${i}`).join("\n")}

---

## What this means for design work going forward

${stillpointPersonas.forwardImplications.map((i) => `- ${i}`).join("\n\n")}
`;
