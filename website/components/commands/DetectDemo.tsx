import { DocumentFrame } from "./DemoFrame";

/**
 * /detect demo. A faithful render of what /detect's output looks like —
 * a structured anti-pattern scan grouped by domain, each finding pointing
 * to the corrective command that addresses it. The accessibility section
 * is set apart at the bottom; the highest-leverage next step closes.
 *
 * /detect doesn't have visual output the way generative or corrective
 * commands do; it produces a report. The demo's argument is showing what
 * that report looks like in your terminal — at speed, in a structured
 * form, with clear next actions per finding. Editorial register so the
 * report reads as a designed document rather than a terminal dump.
 *
 * Wraps in DocumentFrame (Pattern E chrome): document header bar with
 * OUTPUT eyebrow + scope, hairline-bound surface, end-of-output footer
 * marker. Reads as a printed report rather than as a UI card.
 *
 * Continuing the meditation-app context for narrative continuity, but
 * the findings here represent the kind of AI-default scan results that
 * appear before /spruce-up has been run — the catalogue of slop that
 * Spruce's correctives address.
 */

type Finding = {
  name: string;
  description: string;
  command: string;
};

type Domain = {
  name: string;
  findings: Finding[];
  systemic?: boolean;
};

const DOMAINS: Domain[] = [
  {
    name: "Typography",
    findings: [
      {
        name: "The Inter Reflex",
        description: "Inter as the primary typeface across every screen.",
        command: "/typeface",
      },
      {
        name: "The Straight Quote",
        description: "Straight quotes in onboarding and practice-detail copy.",
        command: "/typeface craft",
      },
    ],
  },
  {
    name: "Color",
    findings: [
      {
        name: "The Tech-Blue Default",
        description: "Generic electric blue (#3b82f6) on CTAs across onboarding, library, and the reflection screen.",
        command: "/colorgrade accent",
      },
      {
        name: "The Pure Black and Pure White",
        description: "Untreated #000 on #FFF on the practice list and reflection screen.",
        command: "/colorgrade neutrals",
      },
    ],
  },
  {
    name: "Spatial",
    findings: [
      {
        name: "The Symmetric Heading",
        description: "Symmetric heading margins on the practice detail and onboarding screens.",
        command: "/arrange rhythm",
      },
    ],
  },
  {
    name: "Component",
    findings: [
      {
        name: "The Cardocalypse",
        description: "Cards wrap content unnecessarily in the practice library and reflection feed.",
        command: "/reduce cards",
      },
    ],
  },
  {
    name: "UX Writing",
    systemic: true,
    findings: [
      {
        name: "The Friendly Professional",
        description: "Generic SaaS voice across error states, empty states, and onboarding.",
        command: "/voice",
      },
    ],
  },
];

const ACCESSIBILITY_BLOCKERS: Array<{ description: string; command: string }> = [
  {
    description: "Missing focus treatment on 9 interactive elements across the practice library and account settings (`outline: none` without replacement).",
    command: "/fortify accessibility",
  },
  {
    description: "Icon-only close buttons without aria-label in the reflection-screen modal.",
    command: "/fortify accessibility",
  },
];

const TOTAL_FINDINGS = DOMAINS.reduce((n, d) => n + d.findings.length, 0);

export function DetectDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/detect · meditation app"
      caption="/detect names what's wrong and tells you what to run. No severity tiers, no narrative analysis — that's /survey's and /critique's job."
    >
      {/* Scan summary — the one-line frame /detect always opens with. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        Scan result
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose">
        Scanned the meditation app ·{" "}
        <span className="text-ink-muted">
          {TOTAL_FINDINGS} anti-patterns across {DOMAINS.length} domains, plus{" "}
          {ACCESSIBILITY_BLOCKERS.length} accessibility blockers.
        </span>
      </p>

      <div className="border-t border-rule-subtle mt-6 mb-6" />

      {/* Domain sections — each domain is a small block with a mono-caps
          heading and its findings listed beneath. Hairlines separate
          domains so the scan reads as a structured document. */}
      <div className="space-y-6 md:space-y-7">
        {DOMAINS.map((domain) => (
          <DomainSection key={domain.name} domain={domain} />
        ))}
      </div>

      {/* Accessibility section — set apart with a slightly heavier rule
          because blockers affect users right now. */}
      <div className="border-t border-rule mt-7 pt-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
          Accessibility blockers
        </p>
        <ul role="list" className="list-none space-y-2.5">
          {ACCESSIBILITY_BLOCKERS.map((b, i) => (
            <FindingLine
              key={i}
              description={b.description}
              command={b.command}
            />
          ))}
        </ul>
      </div>

      {/* Highest-leverage next step — closes the report. */}
      <div className="border-t border-rule-subtle mt-6 pt-5">
        <p className="text-sm md:text-base text-ink leading-snug max-w-prose">
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mr-2">
            Highest-leverage next step
          </span>
          Run{" "}
          <code className="font-mono text-sm text-accent">/fortify accessibility</code>{" "}
          first to clear the blockers, then{" "}
          <code className="font-mono text-sm text-accent">/voice</code> for
          the systemic copy issue.
        </p>
      </div>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// DomainSection — one domain heading + its findings list. If the domain has
// `systemic: true`, mark the systemic finding distinctly (italic Fraunces
// "Systemic:" eyebrow) so the visitor reads it as a project-wide issue
// rather than an instance-level one.
// ---------------------------------------------------------------------------

function DomainSection({ domain }: { domain: Domain }) {
  return (
    <section>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        {domain.name}
      </p>
      {domain.systemic ? (
        <p className="font-display italic font-normal text-sm text-ink-muted mb-2">
          Systemic
        </p>
      ) : null}
      <ul role="list" className="list-none space-y-2.5">
        {domain.findings.map((f) => (
          <FindingLine
            key={f.name}
            name={f.name}
            description={f.description}
            command={f.command}
          />
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FindingLine — one finding rendered as a single editorial line. Anti-
// pattern name in italic Fraunces (these are named, indexed patterns;
// italic display matches their cataloged feel), description in body
// register, command pointer in mono accent. Em-dash separators mirror the
// rest of the site's editorial vocabulary.
// ---------------------------------------------------------------------------

function FindingLine({
  name,
  description,
  command,
}: {
  name?: string;
  description: string;
  command: string;
}) {
  return (
    <li className="text-sm md:text-base leading-snug text-pretty max-w-prose">
      {name ? (
        <>
          <span className="font-display italic font-normal text-ink">
            {name}
          </span>
          <span className="text-ink-subtle"> — {description} </span>
        </>
      ) : (
        <span className="text-ink-subtle">{description} </span>
      )}
      <span className="text-ink-subtle">Run </span>
      <code className="font-mono text-sm text-accent">{command}</code>
      <span className="text-ink-subtle">.</span>
    </li>
  );
}
