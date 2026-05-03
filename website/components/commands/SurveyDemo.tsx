import { DocumentFrame } from "./DemoFrame";

/**
 * /survey demo. A faithful render of what /survey's review document
 * looks like — characterization paragraph + summary count at the top,
 * severity-tiered findings in the middle, numbered action plan at the
 * close. Differentiated from /detect (no characterization, no severity)
 * and /finish (no big verdict; ends with a treatment plan instead of a
 * closing direction).
 *
 * Wraps in DocumentFrame (Pattern E chrome): document header bar with
 * OUTPUT eyebrow + scope, hairline-bound surface, end-of-output footer
 * marker.
 *
 * /survey is the diagnostic workhorse. The output is methodical: each
 * finding has a name, a description, and a fix line that ends in a
 * command pointer. Findings are organized by severity tier first, then
 * by domain within each tier. The recommended next steps section closes
 * with a prioritized 3-4 step action plan — the differentiator from
 * /detect's "highest-leverage next step" single line and /finish's
 * "ship as-is or address the substantial item" closing direction.
 *
 * Continues the meditation-app context. The findings represent a
 * realistic /survey output on a project that's largely in good shape
 * (the foundation has been built by earlier Spruce commands) but has
 * specific state-completeness gaps and craft items to address.
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
    count: 1,
    findings: [
      {
        domain: "UX Decision Patterns",
        name: "Missing loading states on the practice library",
        description:
          "Practices appear in pop after fetch — no skeleton or loading affordance. Users see the screen empty for several seconds before content materializes.",
        fix: "Add skeleton screens matching the practice card shape.",
        command: "/fortify",
      },
    ],
  },
  {
    key: "significant",
    label: "Significant",
    count: 3,
    findings: [
      {
        domain: "Component Patterns",
        name: "Touch targets below 44×44px on mobile",
        description:
          "Practice library tier cards are 32×32px on mobile — below the 44×44px recommended minimum. Affects mobile users disproportionately.",
        fix: "Resize tier cards to meet the touch-target minimum.",
        command: "/refine",
      },
      {
        domain: "Spatial Design",
        name: "Spacing scale drifts in the reflection screen",
        description:
          "Three places use 22px spacing instead of the 24px scale step — small drift, but cumulative across the screen.",
        fix: "Normalize to scale steps.",
        command: "/arrange rhythm",
      },
      {
        domain: "UX Writing",
        name: "Empty-state structure inconsistency",
        description:
          "Practice history and account pages use a slightly different three-part structure than the rest of the app — what / why / action are reordered.",
        fix: "Align empty-state structure across the project.",
        command: "/voice empty",
      },
    ],
  },
  {
    key: "polish",
    label: "Polish",
    count: 2,
    findings: [
      {
        domain: "Typography",
        name: "Straight quotes in onboarding copy",
        description:
          "Three instances of straight quotes in the onboarding sequence; smart quotes elsewhere in the app.",
        fix: "Convert to smart quotes.",
        command: "/typeface craft",
      },
      {
        domain: "Spatial Design",
        name: "Heading asymmetry has drifted on two h2s",
        description:
          "Two h2 elements drifted back to symmetric top/bottom margins after recent component work.",
        fix: "Restore asymmetric margins.",
        command: "/arrange rhythm",
      },
    ],
  },
  {
    key: "opportunity",
    label: "Opportunity",
    count: 1,
    findings: [
      {
        domain: "Typography",
        name: "Streak indicator could earn a typographic moment",
        description:
          "The reflection screen's “Day 12” streak count is the screen's focal moment but renders as mono-caps. An italic Fraunces numeral would mark it as significant rather than as metadata.",
        fix: "Optional — typographic accent on the streak.",
        command: "/typeface",
      },
    ],
  },
];

const TOTAL_FINDINGS = TIERS.reduce((n, t) => n + t.count, 0);

const NEXT_STEPS: Array<{ direction: string; command: string }> = [
  {
    direction:
      "Address the P0 first — loading states are visible to every user fetching practices.",
    command: "/fortify",
  },
  {
    direction:
      "Tackle the P1 set — touch targets, spacing drift, and empty-state structure together.",
    command: "/refine, /arrange rhythm, /voice empty",
  },
  {
    direction:
      "Polish pass for craft details before shipping.",
    command: "/typeface craft",
  },
];

export function SurveyDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/survey · meditation app"
      caption="/survey produces findings the user can act on, calibrated to the product's context and grouped by severity. Each finding is a specific observation, not an opinion — and each ends in a command that addresses it."
    >
      {/* Survey header — characterization paragraph + summary count line.
          The paragraph reads like an opening assessment (different from
          /detect's one-line scan summary and /finish's verdict
          statement); the count line gives glance-able tier breakdown. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Survey
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
        Reviewed the meditation app across all seven Spruce dimensions. The
        foundation is in strong shape — typography commits, color is
        calibrated, voice is direct.{" "}
        <span className="text-ink-muted">
          The issues below are state-completeness gaps and craft details, not
          character problems.
        </span>
      </p>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-4">
        {TOTAL_FINDINGS} findings ·{" "}
        {TIERS.map((t) => `${t.count} ${t.label.toLowerCase()}`).join(" · ")}
      </p>

      <div className="border-t border-rule-subtle mt-7 mb-7" />

      {/* Severity tiers — each tier renders its findings in a vertical
          stack. Tier label in italic Fraunces (matching /finish's tier
          label register), domain shown inline as a small mono-caps
          secondary marker on the finding. */}
      <div className="space-y-8">
        {TIERS.map((tier) => (
          <TierSection key={tier.key} tier={tier} />
        ))}
      </div>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Recommended next steps — the action-plan close. Numbered with
          mono accent numerals, body-register direction text, mono accent
          command pointer. The numbered structure differentiates this
          close from /detect's single-line "highest-leverage next step"
          and /finish's two-sentence closing direction. */}
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
// TierSection — one severity tier with its findings. Tier label in italic
// Fraunces (matching /finish's severity-tier vocabulary so the two
// diagnostic-style demos share that one editorial signature). Within each
// tier, findings are listed with the domain as a small inline marker so
// readers can scan by either severity or by which corrective the finding
// would touch.
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
// FindingItem — one finding rendered as: name (body, ink), domain marker
// (mono caps inline), description (body, ink-subtle), fix line (italic
// "Fix:" prefix + ink-subtle prose + mono accent command).
//
// The "Fix:" prefix is /survey's signature inline marker — it appears on
// every finding and reads as the bridge from observation to action. The
// italic treatment (Fraunces) matches the editorial register without
// promoting it to a heading.
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
