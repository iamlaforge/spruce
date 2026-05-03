import Link from "next/link";
import { DocumentFrame } from "./DemoFrame";

/**
 * /finish demo. Stillpoint-grounded ship-readiness report — the verdict
 * line up front, the polish list beneath, and remaining concerns
 * grouped by severity (blockers, substantial items, minor items),
 * closed by a pointer to the live case-study artifact.
 *
 * /finish doesn't transform a surface visually; it produces a verdict.
 * The demo's argument is showing that verdict — what an honest
 * ship-readiness signal reads like when the heavy work has been done
 * and only the final pass remains. Editorial register so the report
 * reads as a designed close-out document rather than a checklist dump.
 *
 * Baseline exception: unlike the other corrective demos (where the
 * before-state is the diagnostic baseline, i.e., Stillpoint after
 * /design + /decide), /finish's "before" is the post-corrective state.
 * /finish only makes sense after every other corrective has run; its
 * job is the last sweep across already-corrected work, then the call
 * on whether to ship. The demo reflects that — there's no Before/After
 * toggle here, just the closing report.
 *
 * The demo closes with a link to /case-study so the visitor — having
 * read through the full narrative — can see the cumulative live state
 * of Stillpoint home as the final artifact.
 */

const POLISH_ITEMS: string[] = [
  "Verified `prefers-reduced-motion` handling across .stp-card--interactive hover, the personalization banner, and the pull-quote rendering — every transition collapses to 0.01ms when the system pref is set.",
  "Confirmed AA contrast across all surfaces in both light and dark — including the pull-quote attribution eyebrow on the warm-cream surface and the footer tagline against the page bg.",
  "Caught two remaining straight quotes in the practices section description and how-it-works step copy; converted to smart curly form. /typeface had handled the pull quote and practices eyebrow; this swept through the rest.",
  "Applied `text-wrap: balance` to the hero display heading and the practices section title so line breaks respect editorial cadence rather than hitting the column edge mid-phrase.",
  "Optical centering nudge on practice card icons — the sage icon glyphs sit visually centered with the duration label baseline now, with a 1px adjustment to compensate for stem weight.",
  "Tracking calibrated on the footer wordmark and tagline so the all-caps rhythm reads consistent with the rest of the page's eyebrow rhythm. Was rendering at default tracking; now uses --stp-tracking-wide.",
  "Verified focus ring offsets at 2px across every interactive element — Stillpoint primitives (button, input, link), the theme toggle in the case-study header, and the practice card hover affordance.",
  "Removed an accidental sage tint on a hairline divider in the how-it-works section — should be neutral border, was reading as a subtle accent line.",
];

type ConcernItem = {
  body: string;
  recommendation: string;
};

const SUBSTANTIAL: ConcernItem[] = [
  {
    body:
      "Signup form is missing error / success / client-side validation states. Per /fortify's findings on this surface — the form looks the same after submit as before, with no feedback. Implementation belongs in the next iteration; not a deploy-blocker for the marketing home but worth addressing before launch.",
    recommendation: "/fortify",
  },
];

const MINOR: ConcernItem[] = [
  {
    body:
      "Personalization banner has no fallback state when no time-of-day recommendation lands. Per /uxreview's polish-tier finding — quiet fallback or hidden treatment to be designed.",
    recommendation: "/design",
  },
  {
    body:
      "The asymmetric practices grid only activates at md+ breakpoint; below 768px the three cards stack vertically without the featured/supporting hierarchy. Acceptable but tighter responsive treatment is possible.",
    recommendation: "/refine",
  },
];

export function FinishDemo() {
  return (
    <DocumentFrame
      eyebrow="Output"
      scope="/finish · Stillpoint home"
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
        <span className="text-ink-muted">With minor items noted.</span>
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
          verdict's confidence has visible grounding: blockers were
          checked and none found, not skipped. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-5">
        Remaining concerns
      </p>

      <ConcernTier label="Ship-blockers" empty="None identified." items={[]} />
      <ConcernTier
        label="Substantial"
        empty="None identified."
        items={SUBSTANTIAL}
      />
      <ConcernTier label="Minor" empty="None identified." items={MINOR} />

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

      {/* Live artifact link — the catalog narrative's closing pointer.
          Heavier rule above marks it as a separate moment from the
          report itself; the report ends, then the visitor is invited
          to see the cumulative live state of Stillpoint home. */}
      <div className="border-t border-rule mt-9 pt-7">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
          The live artifact
        </p>
        <p className="text-base md:text-lg text-ink leading-snug max-w-prose text-pretty">
          The cumulative result of every command in the catalog —
          Stillpoint home as it stands after the full workflow — lives
          at{" "}
          <Link
            href="/case-study"
            className="font-mono text-base md:text-lg text-accent hover:underline underline-offset-4 decoration-accent/40"
          >
            /case-study
          </Link>
          .
        </p>
      </div>
    </DocumentFrame>
  );
}

// ---------------------------------------------------------------------------
// ConcernTier — one severity tier in the remaining-concerns section.
// When empty, renders a calm "None identified" line so the verdict has
// visible grounding (blockers were checked, not omitted). Substantial
// and Minor items render as recommendation-pointed entries — like
// /detect's findings, each item suggests the command that would
// address it.
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
