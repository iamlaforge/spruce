import { SpecimenFrame } from "./DemoFrame";
import { ExpandablePanel } from "./ExpandablePanel";
import { stillpointJtbd } from "@/src/case-studies/stillpoint/content/jtbd";

/**
 * /jtbd demo. Renders the actual Stillpoint .jtbd.md content as a
 * proper job map — each job rendered as a three-part visual card
 * following the canonical "When / I want to / So I can" JTBD
 * statement structure, grouped per persona, with per-layer labels
 * (functional / emotional / social).
 *
 * Cross-persona analysis at the close: shared jobs (simple list),
 * diverging jobs (same situation, branching motivations per persona),
 * and conflicting jobs (side-by-side cards with a visual conflict
 * marker between them — the deliberate /decide tradeoff surfaces).
 *
 * Visual register: SpecimenFrame matches /personas + /journey. The
 * three-part When/I-want/So structure is the visual signature; per-
 * layer color coding is intentionally restrained (single accent +
 * clear layer labels) to match Spruce's character.
 */

type Job = {
  id: string;
  statement: string;
  confidence: string;
};

type ParsedJob = {
  situation: string;
  motivation: string;
  /** Connector after "so" — "I can", "that", "the", or empty string for raw outcomes. */
  outcomeConnector: string;
  outcome: string;
};

// Parse a JTBD statement into its three canonical parts. Handles the
// variants in the source data: "so I can X", "so X", "so that X", and
// statements without a "so" clause (some social jobs are just When/I-want).
function parseJob(statement: string): ParsedJob | null {
  const match = statement.match(
    /^When\s+(.+?),\s+I want\s+(?:to\s+)?(.+?)(?:,\s+so\s+(I can\s+|that\s+|the\s+)?(.+))?\.?\s*$/i,
  );
  if (!match) return null;
  const [, situation, motivation, connector, outcome] = match;
  return {
    situation: situation.trim(),
    motivation: motivation.trim(),
    outcomeConnector: (connector || "").trim(),
    outcome: (outcome || "").trim().replace(/\.\s*$/, ""),
  };
}

export function JtbdDemo() {
  const {
    primaryPersona,
    secondaryPersona,
    shared,
    diverging,
    conflicting,
    forwardImplications,
  } = stillpointJtbd;

  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/jtbd · Stillpoint"
      caption="/jtbd writes .jtbd.md — the underlying jobs each persona is hiring the product to do, articulated in the canonical When / I want to / So I can structure. Cross-persona conflicts surface as deliberate /decide tradeoffs rather than averaged away."
    >
      <div className="space-y-6 md:space-y-8">
        <PersonaJobMap
          tier="Primary persona"
          name={primaryPersona.name}
          role={primaryPersona.role}
          functional={[...primaryPersona.functional]}
          emotional={[...primaryPersona.emotional]}
          social={[...primaryPersona.social]}
        />

        <PersonaJobMap
          tier="Secondary persona"
          name={secondaryPersona.name}
          role={secondaryPersona.role}
          functional={[...secondaryPersona.functional]}
          emotional={[...secondaryPersona.emotional]}
          social={[...secondaryPersona.social]}
        />

        <CrossPersonaPanel
          primaryName={primaryPersona.name}
          secondaryName={secondaryPersona.name}
          shared={[...shared]}
          diverging={[...diverging]}
          conflicting={[...conflicting]}
        />

        <ForwardImplications items={[...forwardImplications]} />
      </div>
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// PersonaJobMap — header (persona name + role), then three layered
// sections (functional / emotional / social) each with a stack of job
// cards.
// ---------------------------------------------------------------------------

function PersonaJobMap({
  tier,
  name,
  role,
  functional,
  emotional,
  social,
}: {
  tier: string;
  name: string;
  role: string;
  functional: Job[];
  emotional: Job[];
  social: Job[];
}) {
  const signature = (
    <header className="bg-surface-elevated px-6 py-5 md:px-8 md:py-6 pr-14 md:pr-16">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        {tier}
      </p>
      <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight mb-4">
        {name}
        <span className="text-ink-muted"> — {role}</span>
      </h3>
      {/* Layer summary — three labels with counts. Stays visible when
          collapsed so visitors see the artifact's shape at a glance. */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-rule-subtle">
        <LayerCount label="Functional" count={functional.length} />
        <LayerCount label="Emotional" count={emotional.length} />
        <LayerCount label="Social" count={social.length} />
      </div>
    </header>
  );

  return (
    <ExpandablePanel ariaLabel={`${name}'s job map`} signature={signature}>
      <div className="divide-y divide-rule-subtle">
        <JobLayer label="Functional jobs" sub="What they’re trying to get done" jobs={functional} />
        <JobLayer label="Emotional jobs" sub="How they want to feel about it" jobs={emotional} />
        <JobLayer label="Social jobs" sub="How they want to be perceived" jobs={social} />
      </div>
    </ExpandablePanel>
  );
}

function LayerCount({ label, count }: { label: string; count: number }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-mono text-2xs uppercase tracking-widest text-accent">
        {label}
      </span>
      <span className="font-mono text-xs text-ink-muted">
        {count} {count === 1 ? "job" : "jobs"}
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// JobLayer — labelled section with a stack of job cards inside.
// ---------------------------------------------------------------------------

function JobLayer({
  label,
  sub,
  jobs,
}: {
  label: string;
  sub: string;
  jobs: Job[];
}) {
  return (
    <section className="px-6 py-6 md:px-8 md:py-7">
      <header className="mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
          {label}
        </p>
        <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug">
          {sub}
        </p>
      </header>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// JobCard — the visual signature of the artifact. Three-part horizontal
// flow: WHEN → I WANT TO → SO I CAN, with visual connectors between
// parts. ID badge top-left, confidence below the parts.
// ---------------------------------------------------------------------------

function JobCard({ job }: { job: Job }) {
  const parsed = parseJob(job.statement);

  return (
    <div className="border border-rule-subtle rounded-md p-4 md:p-5 bg-surface-elevated">
      {/* ID + confidence header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Job {job.id}
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Confidence ·{" "}
          <span className="text-ink-muted normal-case">{job.confidence}</span>
        </p>
      </div>

      {/* Three-part visual flow */}
      {parsed ? (
        <JobFlow parsed={parsed} />
      ) : (
        <p className="text-sm md:text-base text-ink leading-snug text-pretty">
          {job.statement}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// JobFlow — the canonical When / I want to / So I can structure rendered
// as three connected parts. Horizontal arrows between parts on desktop;
// vertical stack with downward arrows on mobile.
// ---------------------------------------------------------------------------

function JobFlow({ parsed }: { parsed: ParsedJob }) {
  const hasOutcome = parsed.outcome.length > 0;

  // Determine outcome label based on the connector found in the statement.
  const outcomeLabel = parsed.outcomeConnector === "I can"
    ? "So I can"
    : parsed.outcomeConnector === "that"
      ? "So that"
      : parsed.outcomeConnector === "the"
        ? "So"
        : "So";

  // For "so [the/(blank)] X" we put the connector word back into the body;
  // for "so I can X" / "so that X" the connector is the label and the body
  // is just the outcome.
  const outcomeBody =
    parsed.outcomeConnector === "the" && parsed.outcome.length > 0
      ? `the ${parsed.outcome}`
      : parsed.outcome;

  return (
    <div
      className={`grid grid-cols-1 ${hasOutcome ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr]"} gap-3 md:gap-2 items-stretch`}
    >
      <FlowPart label="When" body={parsed.situation} />
      <Connector />
      <FlowPart label="I want to" body={parsed.motivation} accent />
      {hasOutcome ? (
        <>
          <Connector />
          <FlowPart label={outcomeLabel} body={outcomeBody} />
        </>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FlowPart — one of the three blocks inside a JobFlow. Mono-caps label
// on top, body prose below, contained in a cell that reads as a
// distinct part of the structure.
// ---------------------------------------------------------------------------

function FlowPart({
  label,
  body,
  accent = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`p-3 md:p-4 rounded ${
        accent
          ? "bg-accent/[0.06] border border-accent/30"
          : "bg-surface border border-rule-subtle"
      }`}
    >
      <p
        className={`font-mono text-2xs uppercase tracking-widest mb-2 ${
          accent ? "text-accent" : "text-ink-subtle"
        }`}
      >
        {label}
      </p>
      <p className="text-sm text-ink leading-snug text-pretty">{body}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connector — visual arrow between flow parts. Horizontal arrow on
// desktop, downward arrow on mobile.
// ---------------------------------------------------------------------------

function Connector() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center text-ink-subtle"
    >
      <span className="hidden md:inline font-mono text-base">&rarr;</span>
      <span className="md:hidden font-mono text-base">&darr;</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CrossPersonaPanel — shared / diverging / conflicting analysis with
// dedicated visualisations for each pattern type.
// ---------------------------------------------------------------------------

function CrossPersonaPanel({
  primaryName,
  secondaryName,
  shared,
  diverging,
  conflicting,
}: {
  primaryName: string;
  secondaryName: string;
  shared: { description: string }[];
  diverging: {
    situation: string;
    mayaMotivation: string;
    jordanMotivation: string;
    designImplication: string;
  }[];
  conflicting: { jobA: string; jobB: string; resolution: string }[];
}) {
  const signature = (
    <header className="bg-surface-elevated px-6 py-5 md:px-8 md:py-6 pr-14 md:pr-16">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        Cross-persona analysis
      </p>
      <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight mb-4">
        Where the jobs converge, diverge, and conflict
      </h3>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-rule-subtle">
        <LayerCount label="Shared" count={shared.length} />
        <LayerCount label="Diverging" count={diverging.length} />
        <LayerCount label="Conflicting" count={conflicting.length} />
      </div>
    </header>
  );

  return (
    <ExpandablePanel
      ariaLabel="Cross-persona analysis"
      signature={signature}
    >
      <div className="divide-y divide-rule-subtle">
        {/* Shared */}
        <section className="px-6 py-6 md:px-8 md:py-7">
          <header className="mb-4">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
              Shared
            </p>
            <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug">
              Both personas hire the product for the same job
            </p>
          </header>
          <ul role="list" className="list-none space-y-2 max-w-prose">
            {shared.map((s, i) => (
              <li
                key={i}
                className="text-sm md:text-base text-ink-muted leading-snug pl-5 relative text-pretty"
              >
                <span aria-hidden className="absolute left-0 top-0 text-accent">
                  &mdash;
                </span>
                {s.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Diverging — same situation, two motivations */}
        <section className="px-6 py-6 md:px-8 md:py-7">
          <header className="mb-5">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
              Diverging
            </p>
            <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug">
              Same situation, different motivation per persona
            </p>
          </header>
          <div className="space-y-6">
            {diverging.map((d, i) => (
              <DivergingCard
                key={i}
                primaryName={primaryName}
                secondaryName={secondaryName}
                diverging={d}
              />
            ))}
          </div>
        </section>

        {/* Conflicting — side-by-side jobs with conflict marker */}
        <section className="px-6 py-6 md:px-8 md:py-7">
          <header className="mb-5">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
              Conflicting
            </p>
            <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug">
              Serving one job works against another — surfaces as a /decide tradeoff
            </p>
          </header>
          <div className="space-y-6">
            {conflicting.map((c, i) => (
              <ConflictingCard key={i} conflicting={c} />
            ))}
          </div>
        </section>
      </div>
    </ExpandablePanel>
  );
}

// ---------------------------------------------------------------------------
// DivergingCard — one situation branching to two motivations. Visual:
// situation block at top, then a Y-split into two motivation blocks
// (primary | secondary), with a closing implication beneath.
// ---------------------------------------------------------------------------

function DivergingCard({
  primaryName,
  secondaryName,
  diverging,
}: {
  primaryName: string;
  secondaryName: string;
  diverging: {
    situation: string;
    mayaMotivation: string;
    jordanMotivation: string;
    designImplication: string;
  };
}) {
  return (
    <div className="border border-rule-subtle rounded-md p-4 md:p-5 bg-surface-elevated">
      {/* Top: shared situation */}
      <div className="mb-3">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          Same situation
        </p>
        <div className="p-3 rounded bg-surface border border-rule-subtle">
          <p className="font-display italic font-normal text-sm md:text-base text-ink leading-snug text-pretty">
            {diverging.situation}
          </p>
        </div>
      </div>

      {/* Y-split visual + two motivations */}
      <div aria-hidden className="flex justify-center my-2 text-ink-subtle">
        <span className="font-mono text-base">&darr; &darr;</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MotivationBranch persona={primaryName} body={diverging.mayaMotivation} />
        <MotivationBranch persona={secondaryName} body={diverging.jordanMotivation} />
      </div>

      {/* Implication */}
      <div className="mt-4 pt-3 border-t border-rule-subtle">
        <p className="text-sm text-ink-subtle leading-snug text-pretty">
          <span className="font-display italic text-ink-muted">
            Implication:{" "}
          </span>
          {diverging.designImplication}
        </p>
      </div>
    </div>
  );
}

function MotivationBranch({
  persona,
  body,
}: {
  persona: string;
  body: string;
}) {
  return (
    <div className="p-3 rounded bg-accent/[0.06] border border-accent/30">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        {persona} wants
      </p>
      <p className="text-sm text-ink leading-snug text-pretty">{body}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ConflictingCard — two jobs side-by-side with a "vs." conflict marker
// between them, plus a resolution line beneath.
// ---------------------------------------------------------------------------

function ConflictingCard({
  conflicting,
}: {
  conflicting: { jobA: string; jobB: string; resolution: string };
}) {
  return (
    <div className="border border-accent/40 rounded-md p-4 md:p-5 bg-surface-elevated">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-stretch">
        <ConflictBlock label="Job A" body={conflicting.jobA} />
        <div
          aria-hidden
          className="flex items-center justify-center font-mono text-xs uppercase tracking-widest text-accent"
        >
          <span className="hidden md:inline">vs.</span>
          <span className="md:hidden">&mdash; vs. &mdash;</span>
        </div>
        <ConflictBlock label="Job B" body={conflicting.jobB} />
      </div>
      <div className="mt-4 pt-3 border-t border-rule-subtle">
        <p className="text-sm text-ink-subtle leading-snug text-pretty">
          <span className="font-display italic text-ink-muted">
            Resolution:{" "}
          </span>
          {conflicting.resolution}
        </p>
      </div>
    </div>
  );
}

function ConflictBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="p-3 rounded bg-surface border border-rule-subtle">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        {label}
      </p>
      <p className="text-sm text-ink leading-snug text-pretty">{body}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ForwardImplications — closing panel naming what the jobs mean for
// design work going forward. Mirrors the personas demo pattern.
// ---------------------------------------------------------------------------

function ForwardImplications({ items }: { items: string[] }) {
  return (
    <article className="border border-rule-subtle bg-surface rounded-md px-6 py-7 md:px-8 md:py-9">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Forward implications
      </p>
      <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-5">
        What these jobs mean for design work going forward
      </h3>
      <ul role="list" className="list-none space-y-4 max-w-prose">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
          >
            <span aria-hidden className="absolute left-0 top-0 text-accent">
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

