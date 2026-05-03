import { DocumentFrame } from "./DemoFrame";

/**
 * /uxreview demo. Faithful render of /uxreview's UX-focused review —
 * characterization paragraph + state-completeness audit call-out +
 * severity-tiered findings (UX-dimension grouped within tiers, with
 * state completeness sub-headings in accent) + numbered action plan.
 *
 * Subject: Stillpoint's practices section + signup form. UX commands
 * are sharpest on form-and-state heavy surfaces, and Stillpoint's home
 * page concentrates those concerns in those two areas — practice cards
 * (interaction contracts), the personalization banner (empty-state
 * fallback), the email signup (form + state coverage).
 *
 * Differentiated from /survey through:
 *   - Eyebrow label ("UX review" vs "Survey")
 *   - Dedicated state-completeness audit summary in the header
 *   - State-completeness sub-headings rendered in accent
 *   - Findings reference UX dimensions (Forms / State completeness /
 *     Interaction contracts / Empty states / IA) rather than the seven
 *     Spruce dimensions
 */

type Severity = "critical" | "significant" | "polish" | "opportunity";

type Finding = {
  area: string;
  isStateCompleteness?: boolean;
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
        area: "State completeness",
        isStateCompleteness: true,
        name: "Signup form missing error state",
        description:
          "If the visitor submits an invalid email or the network fails, there's no error feedback — the form looks the same after submit as before. Users will assume submission worked and won't know to retry.",
        fix: "Add inline validation + visible error state with retry guidance.",
        command: "/fortify",
      },
      {
        area: "State completeness",
        isStateCompleteness: true,
        name: "Signup form missing success state",
        description:
          'After submission there\'s no confirmation that the email was received. The form simply renders the same "Get Started" button it did before — visitors who submit successfully have no acknowledgment.',
        fix: "Add success state — quiet confirmation matching Stillpoint's voice.",
        command: "/fortify",
      },
      {
        area: "Forms and input",
        name: "Signup input lacks client-side validation",
        description:
          "The email field accepts any input. Users typing an obviously incomplete address (no @, no domain) get no feedback until — at best — the back-end rejects on submit. A small live validation cue would catch errors at the source.",
        fix: "Add inline validation feedback (helper text, focus state on incomplete input).",
        command: "/fortify",
      },
      {
        area: "Information architecture",
        name: "Hero CTAs unclear in priority",
        description:
          'The hero pairs "Get Started" (primary button) with "How it works ↓" (tertiary button). Both compete for attention; the relationship between "begin" and "explain first" is unclear. A visitor unsure which action serves them might hesitate.',
        fix: "Direct the call: single CTA, or clearly subordinated secondary action.",
        command: "/decide",
      },
    ],
  },
  {
    key: "polish",
    label: "Polish",
    count: 2,
    findings: [
      {
        area: "Interaction contracts",
        name: "Practice cards lack interactivity affordance",
        description:
          "Cards have a quiet hover border-color shift but no lift, no shadow change, and no cursor change to indicate they're clickable (if they are). Users have to guess whether the cards do anything when tapped.",
        fix: "Add subtle elevation shift + cursor:pointer on hover to signal interactivity.",
        command: "/refine",
      },
      {
        area: "Empty states",
        isStateCompleteness: true,
        name: "Personalization banner has no fallback",
        description:
          "The banner /decide produced renders a hardcoded recommendation. If no time-of-day signal is available — or no recommendation lands — the banner has no quiet fallback. The space could go silent unhelpfully.",
        fix: "Add a quiet fallback state (or hide the banner when no recommendation is available).",
        command: "/fortify",
      },
    ],
  },
  {
    key: "opportunity",
    label: "Opportunity",
    count: 1,
    findings: [
      {
        area: "Information architecture",
        name: "Practices grid undersells natural ordering",
        description:
          "The three featured practices have an inherent time-of-day sequence — Morning, Mid-day, Evening. The current three-equal-cards layout treats them as parallel rather than as a daily rhythm. A tiered or sequential treatment could carry the structure visitors will already understand.",
        fix: "Optional — surface morning/mid-day/evening as a journey rather than as three equal cards.",
        command: "/decide",
      },
    ],
  },
];

const TOTAL_FINDINGS = TIERS.reduce((n, t) => n + t.count, 0);
const STATE_COMPLETENESS_COUNT = TIERS.reduce(
  (n, t) => n + t.findings.filter((f) => f.isStateCompleteness).length,
  0,
);

// Coverage map — surfaces audited × the gaps found × the corrective.
// Different shape from /survey's numbered next-steps so the two
// structured-finding diagnostics close differently. Mirrors the
// state-completeness audit ribbon at the top of the document.
const COVERAGE: Array<{ surface: string; gaps: string; command: string }> = [
  {
    surface: "Signup form",
    gaps: "Missing error, success, and client-side validation states",
    command: "/fortify",
  },
  {
    surface: "Personalization banner",
    gaps: "Missing fallback state when no recommendation is available",
    command: "/fortify",
  },
  {
    surface: "Practice cards",
    gaps: "No interactivity affordance on hover",
    command: "/refine",
  },
  {
    surface: "Hero CTA group",
    gaps: "Two same-weight CTAs compete for attention",
    command: "/decide",
  },
];

export function UxreviewDemo() {
  // Filter empty tiers so "Critical (0)" doesn't render an empty section.
  const visibleTiers = TIERS.filter((t) => t.count > 0);

  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/uxreview · Stillpoint practices + signup"
      caption="/uxreview surfaces UX failures regardless of how the interface looks. The state-completeness audit runs on every review — it's the layer where polished-looking surfaces most often fail silently."
    >
      {/* UX review header — UX-focused characterization paragraph,
          severity-tier count line, then a dedicated state-completeness
          audit call-out. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        UX review
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
        Reviewed UX fundamentals across Stillpoint&rsquo;s practices
        section and signup form. Information architecture is sound;
        copy is mostly conversational; the practices grid is well-curated.{" "}
        <span className="text-ink-muted">
          The most significant issues are state-completeness gaps in the
          signup form and an unclear hero CTA hierarchy.
        </span>
      </p>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-4">
        {TOTAL_FINDINGS} UX issues ·{" "}
        {TIERS.map((t) => `${t.count} ${t.label.toLowerCase()}`).join(" · ")}
      </p>

      {/* State completeness audit call-out — sits inside the header
          block on a soft accent-bordered ribbon. */}
      <div className="mt-5 border-l-2 border-accent pl-4 py-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
          State completeness audit
        </p>
        <p className="text-sm text-ink-muted leading-snug max-w-prose">
          {STATE_COMPLETENESS_COUNT} missing states found across the
          signup form and personalization banner. State-completeness
          findings are highlighted in accent within the severity tiers
          below.
        </p>
      </div>

      <div className="border-t border-rule-subtle mt-7 mb-7" />

      {/* Severity tiers */}
      <div className="space-y-8">
        {visibleTiers.map((tier) => (
          <TierSection key={tier.key} tier={tier} />
        ))}
      </div>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Coverage map close — extends the state-completeness audit
          ribbon at the top into a final per-surface summary. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-1">
        Coverage map
      </p>
      <p className="font-display italic font-normal text-sm text-ink-muted mb-4">
        Surfaces audited, gaps marked
      </p>
      <ul role="list" className="list-none space-y-2.5 max-w-prose">
        {COVERAGE.map((row) => (
          <li
            key={row.surface}
            className="text-sm md:text-base leading-snug text-pretty"
          >
            <span className="font-display italic font-normal text-ink">
              {row.surface}
            </span>
            <span className="text-ink-subtle"> — {row.gaps}. Run </span>
            <code className="font-mono text-sm text-accent">{row.command}</code>
            <span className="text-ink-subtle">.</span>
          </li>
        ))}
      </ul>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// TierSection — one severity tier with its findings grouped by UX area.
// State-completeness findings render together under an accent-colored
// "State completeness" sub-header.
// ---------------------------------------------------------------------------

function TierSection({ tier }: { tier: SeverityTier }) {
  const stateFindings = tier.findings.filter((f) => f.isStateCompleteness);
  const otherFindings = tier.findings.filter((f) => !f.isStateCompleteness);

  const otherByArea = new Map<string, Finding[]>();
  for (const f of otherFindings) {
    const list = otherByArea.get(f.area) ?? [];
    list.push(f);
    otherByArea.set(f.area, list);
  }

  return (
    <section>
      <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-4">
        {tier.label}{" "}
        <span className="text-ink-subtle font-sans not-italic font-normal text-sm">
          ({tier.count})
        </span>
      </p>

      {stateFindings.length > 0 ? (
        <div className="mb-6">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
            State completeness ({stateFindings.length})
          </p>
          <ul role="list" className="list-none space-y-5">
            {stateFindings.map((f) => (
              <FindingItem key={f.name} finding={f} />
            ))}
          </ul>
        </div>
      ) : null}

      {Array.from(otherByArea.entries()).map(([area, findings]) => (
        <div key={area} className="mb-6 last:mb-0">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
            {area}
          </p>
          <ul role="list" className="list-none space-y-5">
            {findings.map((f) => (
              <FindingItem key={f.name} finding={f} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// FindingItem — same structure as /survey's FindingItem.
// ---------------------------------------------------------------------------

function FindingItem({ finding }: { finding: Finding }) {
  return (
    <li className="max-w-prose">
      <p className="text-sm md:text-base text-ink leading-snug font-medium mb-1.5">
        {finding.name}
      </p>
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
