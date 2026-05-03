import { DocumentFrame } from "./DemoFrame";

/**
 * /detect demo. Faithful render of /detect's output — a structured anti-
 * pattern scan grouped by domain, each finding pointing to the corrective
 * command that addresses it. Accessibility section sits at the bottom;
 * highest-leverage next step closes.
 *
 * Subject: Stillpoint's home page after /design produced the first pass
 * and /decide added the personalization banner. The findings represent
 * the rough edges /design intentionally left for the corrective tier to
 * address — exactly what /detect would surface in a fast scan.
 *
 * Differentiated from /survey by no severity tiers, no narrative
 * characterization, no extended fix descriptions. /detect names what's
 * wrong, points to the corrective, and moves on.
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
    name: "UX Writing",
    systemic: true,
    findings: [
      {
        name: "The SaaS CTA",
        description:
          'Both hero and signup primary buttons use the generic "Get Started" default rather than Stillpoint\'s practice-led voice.',
        command: "/voice",
      },
      {
        name: "The Performative Proof",
        description:
          '"Join 10,000+ people finding their stillpoint" in the signup section — the wellness anti-reference the moodboard explicitly excluded.',
        command: "/voice",
      },
    ],
  },
  {
    name: "Component",
    findings: [
      {
        name: "The Three-Equal-Cards",
        description:
          "Practices section uses three uniform cards in a parallel grid — the aggressive symmetry the moodboard's anti-references named against the established asymmetric direction.",
        command: "/refine",
      },
    ],
  },
  {
    name: "Typography",
    findings: [
      {
        name: "The Missing Apostrophe",
        description:
          'Practices section eyebrow renders as "TODAYS PRACTICES" without the apostrophe.',
        command: "/typeface",
      },
      {
        name: "The Untracked All-Caps",
        description:
          "Practices eyebrow renders at default tracking; missing the foundation's tracking-wide token the rest of the page's all-caps eyebrows already use.",
        command: "/typeface",
      },
      {
        name: "The Unmarked Pull Quote",
        description:
          "Pull-quote section ships without opening or closing quotation marks; reads as caption rather than as quotation.",
        command: "/typeface",
      },
    ],
  },
];

const ACCESSIBILITY_BLOCKERS: Array<{
  description: string;
  command: string;
}> = [
  {
    description:
      "Signup email input uses `aria-label` only with no associated visible `<label>` — works for screen readers but lacks semantic robustness.",
    command: "/fortify accessibility",
  },
];

const TOTAL_FINDINGS = DOMAINS.reduce((n, d) => n + d.findings.length, 0);

export function DetectDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/detect · Stillpoint home"
      caption="/detect names what's wrong and tells you what to run. No severity tiers, no narrative analysis — that's /survey's and /critique's job."
    >
      {/* Scan summary — the one-line frame /detect always opens with. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
        Scan result
      </p>
      <p className="text-base md:text-lg text-ink leading-snug max-w-prose">
        Scanned Stillpoint&rsquo;s home page ·{" "}
        <span className="text-ink-muted">
          {TOTAL_FINDINGS} anti-patterns across {DOMAINS.length} domains, plus{" "}
          {ACCESSIBILITY_BLOCKERS.length} accessibility note.
        </span>
      </p>

      <div className="border-t border-rule-subtle mt-6 mb-6" />

      {/* Domain sections */}
      <div className="space-y-6 md:space-y-7">
        {DOMAINS.map((domain) => (
          <DomainSection key={domain.name} domain={domain} />
        ))}
      </div>

      {/* Accessibility section — set apart with a slightly heavier rule. */}
      <div className="border-t border-rule mt-7 pt-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
          Accessibility
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
          <code className="font-mono text-sm text-accent">/voice</code> first
          — the SaaS CTA and performative-proof copy are the most visible
          character drift on the page. Then{" "}
          <code className="font-mono text-sm text-accent">/refine</code> for
          the practices grid layout, and{" "}
          <code className="font-mono text-sm text-accent">/typeface</code>{" "}
          for the craft details.
        </p>
      </div>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// DomainSection — one domain heading + its findings list. Systemic-marked
// domains render an italic Fraunces "Systemic" eyebrow so the visitor reads
// the issue as project-wide rather than instance-level.
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
// FindingLine — one finding as a single editorial line. Anti-pattern name
// in italic Fraunces (cataloged-pattern feel), description in body, command
// pointer in mono accent.
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
