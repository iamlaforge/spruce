import { DocumentFrame } from "./DemoFrame";

/**
 * /survey demo. Faithful render of what /survey's review document looks
 * like — characterization paragraph + summary count at the top, severity-
 * tiered findings in the middle, numbered action plan at the close.
 *
 * Wraps in DocumentFrame: document header bar with OUTPUT eyebrow + scope,
 * hairline-bound surface, end-of-output footer marker.
 *
 * Subject: Stillpoint's home page (Home.tsx) as it stands after /design
 * + /decide. Findings represent a realistic /survey output on a project
 * that's largely in good shape but has specific voice slips, layout
 * anti-references, and craft items left for the corrective tier.
 */

type Severity = "critical" | "significant" | "polish" | "opportunity";

type Finding = {
  domain: string;
  name: string;
  description: string;
  fix: string;
  command: string;
};

type SeverityTier = {
  key: Severity;
  label: string;
  count: number;
  findings: Finding[];
};

const TIERS: SeverityTier[] = [
  {
    key: "critical",
    label: "Critical",
    count: 0,
    findings: [],
  },
  {
    key: "significant",
    label: "Significant",
    count: 4,
    findings: [
      {
        domain: "UX Writing",
        name: "Generic SaaS-default CTA copy",
        description:
          'Both the hero and signup primary buttons say "Get Started" — the SaaS CTA pattern (friendly-professional default the moodboard warned against). Stillpoint\'s voice is calm-supportive-friend; "Begin Practice" or "Start Practicing" matches the established register.',
        fix: "Rewrite to specific practice-led labels.",
        command: "/voice",
      },
      {
        domain: "UX Writing",
        name: "Performative social-proof line",
        description:
          '"Join 10,000+ people finding their stillpoint" beneath the signup form is the performative-proof pattern the .sketch.md anti-references explicitly excluded — no "join thousands" copy. Reads as wellness-influencer marketing rather than as Stillpoint\'s voice.',
        fix: "Remove or rewrite to a quieter framing.",
        command: "/voice",
      },
      {
        domain: "Component Patterns",
        name: "Three-equal-cards practices grid",
        description:
          'The featured-practices section uses three identical cards in a uniform grid — the three-equal-cards anti-pattern the moodboard\'s anti-references named as "aggressive symmetry" against the established "quietly asymmetric" direction. Cards are clean; layout archetype is the issue.',
        fix: "Move to an asymmetric or tiered arrangement.",
        command: "/refine",
      },
      {
        domain: "Typography",
        name: 'Missing apostrophe in "TODAYS PRACTICES" eyebrow',
        description:
          'The practices section eyebrow renders as "TODAYS PRACTICES" without the apostrophe. Small but visible craft slip; reads as undercared on first glance at the section.',
        fix: "Add apostrophe; convert to smart apostrophe.",
        command: "/typeface",
      },
    ],
  },
  {
    key: "polish",
    label: "Polish",
    count: 3,
    findings: [
      {
        domain: "Typography",
        name: "Practices eyebrow renders at default tracking",
        description:
          "The practices section eyebrow is the only all-caps eyebrow on the page without the foundation's tracking-wide token applied. The rest already use it; the holdout reads as defaulted next to the established rhythm.",
        fix: "Apply --stp-tracking-wide to the practices eyebrow.",
        command: "/typeface",
      },
      {
        domain: "Typography",
        name: "Pull quote rendered without quote marks",
        description:
          "The pull-quote section's editorial sentence runs without opening or closing quotation marks. Pull quotes carry quote marks by editorial convention; the absence reads as caption rather than as quotation.",
        fix: "Add opening and closing curly quotes around the pull quote.",
        command: "/typeface",
      },
      {
        domain: "Component Patterns",
        name: "Practice cards lack interactivity affordance",
        description:
          "Cards have a hover border-color shift but no lift or shadow change — interactivity reads as implicit rather than explicit. On a content-marketing surface this matters less; for a product home where cards are the primary affordance, more explicit signaling helps.",
        fix: "Add subtle elevation shift on hover.",
        command: "/refine",
      },
    ],
  },
  {
    key: "opportunity",
    label: "Opportunity",
    count: 1,
    findings: [
      {
        domain: "UX Decision Patterns",
        name: "Personalization banner has no fallback",
        description:
          "The banner /decide produced renders a hardcoded recommendation; if no time-of-day signal or no recommendation is available, the banner has no quiet fallback state. Worth designing the empty/silent path.",
        fix: "Add a fallback state for missing recommendations.",
        command: "/design",
      },
    ],
  },
];

const TOTAL_FINDINGS = TIERS.reduce((n, t) => n + t.count, 0);

const NEXT_STEPS: Array<{ direction: string; command: string }> = [
  {
    direction:
      "Address the voice slips first — they're the most visible character drift on the page.",
    command: "/voice",
  },
  {
    direction:
      "Reconsider the practices grid layout. Three-equal-cards contradicts the established direction; an asymmetric arrangement is the moodboard's call.",
    command: "/refine",
  },
  {
    direction:
      "Typography craft pass — apostrophes, letter-spacing, smart-quote conversion across the page.",
    command: "/typeface",
  },
];

export function SurveyDemo() {
  // Filter empty tiers so "Critical (0)" doesn't render an empty section.
  const visibleTiers = TIERS.filter((t) => t.count > 0);

  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/survey · Stillpoint home"
      caption="/survey produces findings the user can act on, calibrated to the product's context and grouped by severity. Each finding is a specific observation, not an opinion — and each ends in a command that addresses it."
    >
      {/* Survey header — characterization paragraph + summary count line. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Survey
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
        Reviewed Stillpoint&rsquo;s home page across all seven Spruce
        dimensions. The foundation is in strong shape — typography
        commits to the Söhne + Lora pair, the warm-neutral palette is
        calibrated, the meditation photography is on direction.{" "}
        <span className="text-ink-muted">
          The issues below are voice slips and craft details, not
          character problems.
        </span>
      </p>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-4">
        {TOTAL_FINDINGS} findings ·{" "}
        {TIERS.map((t) => `${t.count} ${t.label.toLowerCase()}`).join(" · ")}
      </p>

      <div className="border-t border-rule-subtle mt-7 mb-7" />

      {/* Severity tiers — each tier renders its findings in a vertical
          stack. Tier label in italic Fraunces, domain shown inline as a
          small mono-caps secondary marker on the finding. */}
      <div className="space-y-8">
        {visibleTiers.map((tier) => (
          <TierSection key={tier.key} tier={tier} />
        ))}
      </div>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Recommended next steps — the action-plan close. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-4">
        Recommended next steps
      </p>
      <ol role="list" className="list-none space-y-3 max-w-prose">
        {NEXT_STEPS.map((step, i) => (
          <li
            key={i}
            className="text-sm md:text-base text-ink leading-snug pl-7 relative text-pretty"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
            >
              {i + 1}.
            </span>
            {step.direction}{" "}
            <span className="text-ink-subtle">Run </span>
            <code className="font-mono text-sm text-accent">
              {step.command}
            </code>
            <span className="text-ink-subtle">.</span>
          </li>
        ))}
      </ol>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// TierSection — one severity tier with its findings.
// ---------------------------------------------------------------------------

function TierSection({ tier }: { tier: SeverityTier }) {
  return (
    <section>
      <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-4">
        {tier.label}{" "}
        <span className="text-ink-subtle font-sans not-italic font-normal text-sm">
          ({tier.count})
        </span>
      </p>
      <ul role="list" className="list-none space-y-5">
        {tier.findings.map((f) => (
          <FindingItem key={f.name} finding={f} />
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FindingItem — one finding rendered as: name + domain marker, description,
// fix line with italic "Fix:" prefix and mono accent command pointer.
// ---------------------------------------------------------------------------

function FindingItem({ finding }: { finding: Finding }) {
  return (
    <li className="max-w-prose">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
        <p className="text-sm md:text-base text-ink leading-snug font-medium">
          {finding.name}
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {finding.domain}
        </p>
      </div>
      <p className="text-sm md:text-base text-ink-subtle leading-snug text-pretty mb-1.5">
        {finding.description}
      </p>
      <p className="text-sm text-ink-subtle leading-snug text-pretty">
        <span className="font-display italic text-ink-muted">Fix: </span>
        {finding.fix}{" "}
        <span>Run </span>
        <code className="font-mono text-sm text-accent">{finding.command}</code>
        <span>.</span>
      </p>
    </li>
  );
}
