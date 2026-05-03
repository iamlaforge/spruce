import { DocumentFrame } from "./DemoFrame";
import { ExpandablePanel } from "./ExpandablePanel";
import { stillpointAudit } from "@/src/case-studies/stillpoint/content/audit";

/**
 * /audit demo. Renders the actual Stillpoint /audit output as a
 * structured findings document — frame paragraph + artifacts-read
 * summary at the top, positive findings prominently before issues,
 * severity-tiered findings (Blocking / Significant / Friction /
 * Polish) with HCD-specific elements (persona-grounded "affects"
 * line, behavioral anti-pattern badge, confidence label), cross-
 * persona summary, recommended next steps.
 *
 * Visual register: DocumentFrame matches SurveyDemo's structured-
 * findings shape; the HCD differentiation is in the per-finding
 * detail — every finding ties to named personas + jobs and points
 * to the corrective command that addresses it.
 *
 * Subject: Stillpoint's home → personalization banner → practice
 * detail → practice begins → post-practice close flow, audited
 * against Maya + Jordan personas, six jobs, the morning-practice
 * journey, and the morning-kitchen + first-time-curious scenarios.
 */

type Severity = "Blocking" | "Significant" | "Friction" | "Polish";

const SEVERITY_ORDER: Severity[] = [
  "Blocking",
  "Significant",
  "Friction",
  "Polish",
];

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

export function AuditDemo() {
  const {
    scope,
    artifactsRead,
    findingsShape,
    frame,
    positives,
    findings,
    crossPersonaSummary,
    recommendedNextSteps,
  } = stillpointAudit;

  const findingsBySeverity = SEVERITY_ORDER.map((sev) => ({
    severity: sev,
    items: (findings as readonly Finding[]).filter((f) => f.severity === sev),
  })).filter((g) => g.items.length > 0);

  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/audit · Stillpoint"
      caption="/audit produces HCD-grounded findings — every issue tied to a named persona doing a named job, with severity, confidence, and the corrective command that addresses it. The frame is 'this fails Maya doing her morning practice' rather than 'every list needs an empty state.'"
    >
      {/* Frame — characterization paragraph */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Audit
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
        {frame}
      </p>

      {/* Audit metadata — scope + artifacts read + shape */}
      <div className="mt-6 max-w-prose space-y-1.5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Scope · <span className="text-ink-muted normal-case">{scope}</span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Artifacts read ·{" "}
          <span className="text-ink-muted normal-case">
            {artifactsRead.personas} · {artifactsRead.jtbd} ·{" "}
            {artifactsRead.journeys} · {artifactsRead.scenarios}
          </span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Findings shape · <span className="text-ink-muted">{findingsShape}</span>
        </p>
      </div>

      <div className="border-t border-rule-subtle mt-7 mb-7" />

      {/* Positive findings — what's working, surfaced before issues */}
      <section>
        <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-4">
          Positive findings{" "}
          <span className="text-ink-subtle font-sans not-italic font-normal text-sm">
            ({positives.length})
          </span>
        </p>
        <ul role="list" className="list-none space-y-5">
          {(positives as readonly PositiveFinding[]).map((p) => (
            <PositiveItem key={p.name} positive={p} />
          ))}
        </ul>
      </section>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Findings by severity — each tier collapsible. Tier label + count
          + finding-name preview stay visible so visitors can scan what's
          in each tier and decide whether to expand. */}
      <div className="space-y-3 md:space-y-4">
        {findingsBySeverity.map(({ severity, items }) => (
          <SeveritySection
            key={severity}
            severity={severity}
            items={items}
          />
        ))}
      </div>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Cross-persona summary */}
      <section>
        <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-5">
          Cross-persona summary
        </p>
        <div className="space-y-6 max-w-prose">
          <CrossPersonaBlock
            label="Findings affecting multiple personas"
            items={[...crossPersonaSummary.affectingMultiple]}
            tone="positive"
          />
          <CrossPersonaBlock
            label="Cross-persona conflicts"
            items={[...crossPersonaSummary.conflicts]}
            tone="negative"
          />
        </div>
      </section>

      <div className="border-t border-rule mt-9 mb-7" />

      {/* Recommended next steps */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-4">
        Recommended next steps
      </p>
      <ol role="list" className="list-none space-y-4 max-w-prose">
        {recommendedNextSteps.map((step, i) => (
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
            {step.action}{" "}
            <span className="block mt-1.5 font-mono text-xs text-ink-subtle">
              <span className="text-ink-subtle">Run </span>
              <code className="text-accent">{step.command}</code>
            </span>
          </li>
        ))}
      </ol>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// PositiveItem — one positive finding rendered as: name + WHERE/WHAT/AFFECTS
// fields, with a small accent eyebrow indicating it's a working pattern.
// ---------------------------------------------------------------------------

function PositiveItem({ positive }: { positive: PositiveFinding }) {
  return (
    <li className="max-w-prose border-l-2 border-accent pl-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <p className="text-sm md:text-base text-ink leading-snug font-medium">
          {positive.name}
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          Working
        </p>
      </div>
      <FindingFields
        where={positive.where}
        what={positive.what}
        affects={positive.affects}
      />
    </li>
  );
}

// ---------------------------------------------------------------------------
// SeveritySection — one severity tier with its findings.
// ---------------------------------------------------------------------------

function SeveritySection({
  severity,
  items,
}: {
  severity: Severity;
  items: Finding[];
}) {
  // Severity dot tone — blocking/significant get accent treatment;
  // friction/polish read as ink so the visual hierarchy matches impact.
  const dotClass =
    severity === "Blocking" || severity === "Significant"
      ? "bg-accent"
      : "bg-ink-subtle";

  const signature = (
    <div className="px-5 py-4 md:px-6 md:py-5 pr-14 md:pr-16">
      <div className="flex items-baseline gap-3 mb-2">
        <span
          aria-hidden
          className={`inline-block w-2 h-2 rounded-full ${dotClass}`}
        />
        <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug">
          {severity}{" "}
          <span className="text-ink-subtle font-sans not-italic font-normal text-sm">
            ({items.length})
          </span>
        </p>
      </div>
      {/* Finding-name preview — visitors scan what's in the tier
          before expanding. Em-dash list, name + optional anti-pattern. */}
      <ul role="list" className="list-none space-y-1 pl-5">
        {items.map((f) => (
          <li
            key={f.name}
            className="text-sm text-ink-muted leading-snug pl-4 relative text-pretty"
          >
            <span aria-hidden className="absolute left-0 top-0 text-ink-subtle">
              &mdash;
            </span>
            {f.name}
            {f.behavioralAntiPattern ? (
              <span className="ml-2 font-mono text-2xs uppercase tracking-widest text-accent">
                {f.behavioralAntiPattern}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <ExpandablePanel
      ariaLabel={`${severity} findings`}
      signature={signature}
    >
      <ul role="list" className="list-none space-y-7 px-5 py-5 md:px-6 md:py-6">
        {items.map((f) => (
          <FindingItem key={f.name} finding={f} />
        ))}
      </ul>
    </ExpandablePanel>
  );
}

// ---------------------------------------------------------------------------
// FindingItem — one finding: name + behavioral anti-pattern badge,
// where/what/affects fields, confidence eyebrow, recommended corrective.
// ---------------------------------------------------------------------------

function FindingItem({ finding }: { finding: Finding }) {
  return (
    <li className="max-w-prose">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <p className="text-sm md:text-base text-ink leading-snug font-medium">
          {finding.name}
        </p>
        {finding.behavioralAntiPattern ? (
          <p className="font-mono text-2xs uppercase tracking-widest text-accent">
            {finding.behavioralAntiPattern}
          </p>
        ) : null}
      </div>
      <FindingFields
        where={finding.where}
        what={finding.what}
        affects={finding.affects}
      />
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-3">
        Confidence ·{" "}
        <span className="text-ink-muted normal-case">{finding.confidence}</span>
      </p>
      <p className="text-sm text-ink-subtle leading-snug mt-2 text-pretty">
        <span className="font-display italic text-ink-muted">
          Recommended corrective:{" "}
        </span>
        {finding.recommendedCorrective}
      </p>
    </li>
  );
}

// ---------------------------------------------------------------------------
// FindingFields — the WHERE / WHAT / AFFECTS triplet, shared between
// positive and negative findings. Mono-caps labels for scan-ability.
// ---------------------------------------------------------------------------

function FindingFields({
  where,
  what,
  affects,
}: {
  where: string;
  what: string;
  affects: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm md:text-base text-ink-muted leading-snug text-pretty">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mr-2">
          Where
        </span>
        {where}
      </p>
      <p className="text-sm md:text-base text-ink-muted leading-snug text-pretty">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mr-2">
          What
        </span>
        {what}
      </p>
      <p className="text-sm md:text-base text-ink leading-snug text-pretty">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent mr-2">
          Affects
        </span>
        {affects}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CrossPersonaBlock — labelled list for the cross-persona summary section.
// Tone toggles the accent treatment between positive (alignment) and
// negative (conflict).
// ---------------------------------------------------------------------------

function CrossPersonaBlock({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "positive" | "negative";
}) {
  const accent = tone === "positive" ? "text-accent" : "text-ink";
  const border = tone === "positive" ? "border-accent" : "border-rule";
  return (
    <div className={`border-l-2 pl-4 ${border}`}>
      <p
        className={`font-mono text-2xs uppercase tracking-widest mb-3 ${accent}`}
      >
        {label}
      </p>
      <ul role="list" className="list-none space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm md:text-base text-ink-muted leading-snug pl-4 relative text-pretty"
          >
            <span aria-hidden className="absolute left-0 top-0 text-ink-subtle">
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
