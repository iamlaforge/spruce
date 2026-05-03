import { DocumentFrame } from "./DemoFrame";

/**
 * /finish demo. A faithful render of what /finish's ship-readiness
 * assessment looks like — the verdict line up front, the polish list
 * beneath, and remaining concerns grouped by severity (blockers,
 * substantial items, minor items).
 *
 * /finish doesn't transform a surface visually; it produces a verdict.
 * The demo's argument is showing that verdict — what an honest
 * ship-readiness signal reads like when the heavy work has been done and
 * only the final pass remains. Editorial register so the report reads as
 * a designed close-out document rather than a checklist dump.
 *
 * Continues the meditation-app context as if /finish were running on the
 * same project the rest of the Phase 2 demos have been working through.
 * The verdict — "Ready to ship · with minor items noted" — is the
 * pedagogically most useful output: it shows /finish making a confident
 * call while still naming what hasn't been resolved.
 */

const POLISH_ITEMS: string[] = [
  "Caught 3 remaining straight quotes in onboarding and practice-detail copy; converted to smart quotes.",
  "Enabled `text-wrap: balance` on 4 headlines — practice library hero, reflection-screen prompt, and the two onboarding pages.",
  "Tightened heading asymmetry on 2 h2 elements in the reflection screen and account settings.",
  "Normalized hover darkening across practice cards, library filters, and the begin CTA to a consistent 4% lightness shift.",
  "Aligned focus ring offset to 1px across interactive elements; the share button on the reflection screen had drifted to 2px.",
  "Verified `prefers-reduced-motion` handling on the new evening-practice card animation.",
  "Caught one instance of `undefined` appearing in a draft error message in the practice library; replaced with a human-readable fallback.",
  "Removed an accidental accent application on a divider in the practice detail screen — should be a hairline neutral.",
];

type ConcernItem = {
  body: string;
  recommendation: string;
};

const SUBSTANTIAL: ConcernItem[] = [
  {
    body:
      "Touch targets on the practice library tier cards are 32×32px on mobile — below the 44×44px recommended minimum. Not a blocker for desktop shipping but worth addressing before mobile users encounter it.",
    recommendation: "/refine",
  },
];

const MINOR: ConcernItem[] = [
  {
    body:
      "Two empty states on the practice history and account pages use a slightly different three-part structure than the rest of the app. Low user impact.",
    recommendation: "/voice empty",
  },
  {
    body:
      "Dark-mode contrast on the “Saved” status indicator on the reflection screen sits at 4.6:1 — passing, but tighter than the project's average of 5.5:1.",
    recommendation: "/colorgrade",
  },
];

export function FinishDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/finish · ship-readiness"
      caption="/finish closes out the work. By this point the heavy correctives have run; what remains is the final tightening and an honest signal about whether the project is genuinely ready to deploy."
    >
      {/* Verdict — the headline of the report and the most confident
          moment in the close-out. Sized larger than other section heads
          so the call lands as the primary moment; the heavier rule
          below marks the verdict as a major boundary, not a parallel
          section break. The qualifier sits in a muted weight so the
          call reads first and the qualification reads as a footnote,
          not as a hedge. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-4">
        Verdict
      </p>
        <p className="font-display font-normal italic text-3xl md:text-4xl text-ink leading-[1.1] tracking-tight max-w-prose">
          Ready to ship.{" "}
          <span className="text-ink-muted">
            With minor items noted.
          </span>
        </p>

        <div className="border-t border-rule mt-10 mb-8" />

        {/* What was polished — tight body-register list. The count in the
            eyebrow gives a sense of scale without listing every micro-edit
            as a separate finding. */}
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-4">
          Polish applied{" "}
          <span className="text-ink-subtle/70">
            ({POLISH_ITEMS.length} items)
          </span>
        </p>
        <ul role="list" className="list-none space-y-2.5 max-w-prose">
          {POLISH_ITEMS.map((item, i) => (
            <li
              key={i}
              className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[0.55em] font-mono text-sm leading-none text-ink-muted"
              >
                —
              </span>
              <PolishLine>{item}</PolishLine>
            </li>
          ))}
        </ul>

        <div className="border-t border-rule-subtle mt-8 mb-7" />

        {/* Remaining concerns — tiered by severity. Each tier renders even
            when empty (e.g., "None identified" for ship-blockers) so the
            verdict's confidence has visible grounding: blockers were checked
            and none found, not skipped. */}
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-5">
          Remaining concerns
        </p>

        <ConcernTier label="Ship-blockers" empty="None identified." items={[]} />
        <ConcernTier
          label="Substantial"
          empty="None identified."
          items={SUBSTANTIAL}
        />
        <ConcernTier
          label="Minor"
          empty="None identified."
          items={MINOR}
        />

      {/* Closing direction — matches /finish's spec: "Ship as-is if the
          concerns are acceptable for this release, or address specific
          items first." */}
      <div className="border-t border-rule-subtle mt-7 pt-5">
        <p className="text-sm md:text-base text-ink-muted leading-snug max-w-prose text-pretty">
          Ship as-is if the substantial item is acceptable for this release,
          or address it first. Minor items can land in the next iteration
          without affecting deployment.
        </p>
      </div>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// ConcernTier — one severity tier in the remaining-concerns section. When
// empty, renders a calm "None identified" line so the verdict has visible
// grounding (blockers were checked, not omitted). Substantial and Minor
// items render as recommendation-pointed entries — like /detect's findings,
// each item suggests the command that would address it.
// ---------------------------------------------------------------------------

function ConcernTier({
  label,
  empty,
  items,
}: {
  label: string;
  empty: string;
  items: ConcernItem[];
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-display italic font-normal text-base md:text-lg text-ink leading-snug mb-2">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="text-sm text-ink-subtle leading-relaxed max-w-prose">
          {empty}
        </p>
      ) : (
        <ul role="list" className="list-none space-y-2.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-sm md:text-base text-ink-subtle leading-snug pl-5 relative max-w-prose text-pretty"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[0.55em] font-mono text-sm leading-none text-ink-muted"
              >
                —
              </span>
              {item.body}{" "}
              <span className="text-ink-subtle">Run </span>
              <code className="font-mono text-sm text-accent">
                {item.recommendation}
              </code>
              <span className="text-ink-subtle">.</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PolishLine — splits a polish item's text into prose + inline mono code
// for any backtick-wrapped fragments (e.g., `text-wrap: balance`,
// `prefers-reduced-motion`). Lightweight inline rendering — keeps the
// editorial register without requiring a real markdown pipeline.
// ---------------------------------------------------------------------------

function PolishLine({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="font-mono text-sm text-ink">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
