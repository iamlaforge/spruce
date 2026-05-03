import { DocumentFrame } from "./DemoFrame";

/**
 * /uxreview demo. A faithful render of what /uxreview's UX-focused review
 * looks like — characterization paragraph + state-completeness audit
 * call-out + severity-tiered findings (UX-dimension grouped within tiers,
 * with state completeness sub-headings in accent to mark them as the lead
 * UX concern) + numbered action plan.
 *
 * Wraps in DocumentFrame (Pattern E chrome): document header bar with
 * OUTPUT eyebrow + scope, hairline-bound surface, end-of-output footer
 * marker.
 *
 * Differentiated from /survey through:
 *   - Eyebrow label ("UX review" vs "Survey")
 *   - UX-focused characterization paragraph
 *   - Dedicated state-completeness audit summary in the header
 *   - State-completeness sub-headings rendered in accent
 *   - Findings reference UX dimensions (Information architecture, State
 *     completeness, Forms and input, Trust and transparency, etc.)
 *     rather than the seven Spruce dimensions
 *
 * Differentiated from /detect through severity-tiered structure (matching
 * /survey + /finish) and the depth of each finding (description + fix
 * line, not single-line scan summary).
 *
 * Continues the meditation-app context. The findings represent a realistic
 * /uxreview pass on the practice library, reflection screen, and account
 * settings — surfaces visitors have seen in /pace, /fortify, /decide, and
 * the corrective demos.
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
    count: 1,
    findings: [
      {
        area: "Trust and transparency",
        name: "Account deletion confirmation has destructive default",
        description:
          "The “Delete account” confirmation dialog styles the destructive button as primary with “Delete” as the default action. Users who accidentally tap Enter trigger an irreversible delete.",
        fix: "Require deliberate selection — type the account name, or style destructive as secondary with Cancel as default.",
        command: "/refine",
      },
    ],
  },
  {
    key: "significant",
    label: "Significant",
    count: 4,
    findings: [
      {
        area: "State completeness",
        isStateCompleteness: true,
        name: "Practice library missing loading state",
        description:
          "Practices appear in pop after fetch — the screen is empty for several seconds, then content materializes. Users won't know whether the screen is loading or whether nothing is there.",
        fix: "Add skeleton screens matching the practice card shape.",
        command: "/fortify",
      },
      {
        area: "State completeness",
        isStateCompleteness: true,
        name: "Practice library missing error state",
        description:
          "If the library fetch fails, the screen stays blank — no notification, no retry path. Users encountering this state won't know what happened or how to recover.",
        fix: "Add error state with retry affordance.",
        command: "/fortify",
      },
      {
        area: "State completeness",
        isStateCompleteness: true,
        name: "Reflection screen missing save-failure state",
        description:
          "Auto-save runs silently. If the network drops, the user has no indication their reflection isn't saved — they may close the screen thinking their writing is preserved when it isn't.",
        fix: "Add visible save-failure state with manual retry.",
        command: "/fortify",
      },
      {
        area: "Forms and input",
        name: "Practice preferences uses save-on-submit",
        description:
          "Users change Default session length or Voice guide, then have to scroll to find a Save button. Easy to leave the screen without saving — and the form gives no indication that changes are unsaved.",
        fix: "Switch to inline auto-save with a brief saved indicator. This is a flow decision worth directing.",
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
        area: "Empty states",
        name: "Practice history missing first-time framing",
        description:
          "New users see “No practices yet” — null-check copy that doesn't explain what the area is or that completing a practice will populate it.",
        fix: "Three-part empty state: explanation of the space, why it's empty now, what to do.",
        command: "/fortify",
      },
      {
        area: "Interaction contracts",
        name: "Settings toggles lack hover treatment",
        description:
          "The toggle pill doesn't change visually on hover — users may not realize the row is interactive.",
        fix: "Add hover state to toggle pill and surrounding row.",
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
        area: "First impressions",
        name: "Onboarding doesn't establish the recovery framing",
        description:
          "The .spruce.md context describes recovery (not transformation) as the core experience, but onboarding doesn't surface this. Users may approach the product expecting transformation and feel mismatched.",
        fix: "Optional — onboarding moment that names the recovery framing. Worth directing.",
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

const NEXT_STEPS: Array<{ direction: string; command: string }> = [
  {
    direction:
      "Address the critical first — destructive default on account deletion is a real risk.",
    command: "/refine",
  },
  {
    direction:
      "Tackle state completeness next — it's the most systemic UX gap. Practice library and reflection screen both need loading + error states; reflection screen needs save-failure handling.",
    command: "/fortify",
  },
  {
    direction:
      "Direct the practice-preferences save behavior — auto-save vs explicit save is a flow decision worth surfacing before implementing.",
    command: "/decide",
  },
];

export function UxreviewDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/uxreview · meditation app"
      caption="/uxreview surfaces UX failures regardless of how the interface looks. The state-completeness audit runs on every review — it's the layer where polished-looking surfaces most often fail silently."
    >
      {/* UX review header — UX-focused characterization paragraph,
          severity-tier count line, then a dedicated state-completeness
          audit call-out per the skill ("If the state completeness check
          found significant gaps, call this out in the header"). */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        UX review
      </p>
        <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
          Reviewed UX fundamentals across the meditation app. Information
          architecture is sound and forms are mostly conversational.{" "}
          <span className="text-ink-muted">
            The most significant issues are state-completeness gaps across the
            practice library and reflection screen, plus a destructive-default
            risk in account deletion.
          </span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-4">
          {TOTAL_FINDINGS} UX issues ·{" "}
          {TIERS.map((t) => `${t.count} ${t.label.toLowerCase()}`).join(" · ")}
        </p>

        {/* State completeness audit call-out — sits inside the header
            block on a soft accent-tinted background, calling out the
            audit's findings count distinctly. The state-completeness
            audit is /uxreview's signature pass; surfacing it visually
            before the severity tiers makes the audit's prominence
            explicit. */}
        <div className="mt-5 border-l-2 border-accent pl-4 py-1">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
            State completeness audit
          </p>
          <p className="text-sm text-ink-muted leading-snug max-w-prose">
            {STATE_COMPLETENESS_COUNT} missing states found across the
            practice library and reflection screen. State-completeness
            findings are highlighted in accent within the severity tiers
            below.
          </p>
        </div>

        <div className="border-t border-rule-subtle mt-7 mb-7" />

        {/* Severity tiers — same italic Fraunces tier label register as
            /survey and /finish. Within each tier, findings group by UX
            dimension; state-completeness sub-headers render in accent. */}
        <div className="space-y-8">
          {TIERS.map((tier) => (
            <TierSection key={tier.key} tier={tier} />
          ))}
        </div>

        <div className="border-t border-rule mt-9 mb-7" />

        {/* Recommended next steps — same numbered action-plan structure as
            /survey, calibrated to UX concerns. */}
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
// TierSection — one severity tier with its findings grouped by UX area.
// State-completeness findings render together under an accent-colored
// "State completeness" sub-header to call out the audit's findings within
// the tier; other UX areas use the standard ink-subtle mono caps.
// ---------------------------------------------------------------------------

function TierSection({ tier }: { tier: SeverityTier }) {
  // Group findings by area, with state-completeness items grouped together
  // regardless of the order they appear in the tier definition.
  const stateFindings = tier.findings.filter((f) => f.isStateCompleteness);
  const otherFindings = tier.findings.filter((f) => !f.isStateCompleteness);

  // Group non-state findings by area.
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

      {/* State completeness group — accent eyebrow to mark it as the lead
          UX concern. */}
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

      {/* Other UX areas — standard mono-caps eyebrows in ink-subtle. */}
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
// FindingItem — same structure as /survey's FindingItem: name (body, ink,
// medium), description (body, ink-subtle), fix line ("Fix:" italic prefix
// + ink-subtle prose + mono accent command). The shared structure rhymes
// the two structured-findings demos visually while their content + section
// architecture differentiates them.
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
