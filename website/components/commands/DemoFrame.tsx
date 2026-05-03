import type { ReactNode } from "react";

/**
 * Demo frame variants for the per-command catalog. Each frame applies a
 * structurally-distinct chrome treatment per pattern category — visitors
 * scrolling through the catalog encounter genuinely different document
 * types rather than the same bordered-card-with-eyebrow chrome on every
 * page.
 *
 * The internal editorial vocabulary is shared (typography, accent, em-dash
 * bullets, mono-caps eyebrows). Only the structural chrome differs:
 *
 *   - DocumentFrame   — Pattern E (structured findings reports). Header
 *                        bar with command + metadata, hairline-bound, end-
 *                        of-report footer marker.
 *   - ManuscriptFrame — Pattern F (narrative editorial essays). Header with
 *                        document type + subject, manuscript register, "by
 *                        Spruce" attribution at the foot.
 *   - SpecimenFrame   — Pattern C (static generated artifacts). Plate
 *                        identifier in the corner, generated-by attribution.
 *   - TranscriptFrame — Pattern B (stepped Q&A / decision flows). Lighter
 *                        rule-bound container (no full card border),
 *                        "Transcript" eyebrow + step counter.
 *
 * Pattern A (BeforeAfterDemo) and Pattern D (PaceDemo, FortifyDemo) keep
 * their existing toggle/comparison chrome — the toggle/control IS the
 * visual differentiator for those, and rebuilding their frames would be
 * disruptive without adding meaningful differentiation.
 */

type FrameProps = {
  /** Mono-caps eyebrow text (left side of the header). */
  eyebrow: string;
  /** Right-side eyebrow / metadata. Optional. Pass either a string or a
   *  ReactNode (for cases where you need a rendered control). */
  scope?: ReactNode;
  /** The demo content rendered inside the frame's container. */
  children: ReactNode;
  /** Caption below the frame. Optional. */
  caption?: ReactNode;
};

// ---------------------------------------------------------------------------
// DocumentFrame — Pattern E (structured-findings reports). Header bar with
// command name in mono accent + OUTPUT eyebrow, hairline-bound surface, and
// an end-of-report footer marker. Reads as a printed report rather than as
// a UI card.
// ---------------------------------------------------------------------------

export function DocumentFrame({
  eyebrow,
  scope,
  children,
  caption,
}: FrameProps) {
  return (
    <figure className="my-10 md:my-12">
      {/* Document header — heavier rule above the content marks the start
          of the report; hairline rule below it separates the metadata bar
          from the report body. */}
      <header className="border-t border-rule pt-3 mb-0">
        <div className="flex flex-wrap items-baseline justify-between gap-y-2 pb-3">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          {scope ? (
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
              {scope}
            </p>
          ) : null}
        </div>
      </header>

      {/* Report body — surface contained within hairline rules at top and
          bottom rather than a full bordered card. The document register
          comes from the rule treatment, not from a card. */}
      <div className="border-y border-rule-subtle bg-surface px-6 py-7 md:px-8 md:py-9">
        {children}
      </div>

      {/* Document footer — closing marker. */}
      <div className="flex items-baseline justify-between pt-3 border-b border-rule">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          End of output
        </p>
      </div>

      {caption ? (
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-5">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// ManuscriptFrame — Pattern F (narrative editorial essays). Manuscript
// register: subject metadata in the header, body in the editorial card, "by
// Spruce" attribution at the foot. Reads as a published critique rather
// than as a docs page demo.
// ---------------------------------------------------------------------------

export function ManuscriptFrame({
  eyebrow,
  scope,
  children,
  caption,
}: FrameProps) {
  return (
    <figure className="my-10 md:my-12">
      {/* Manuscript header — italic Fraunces eyebrow on the left names the
          document type (Critique / Walkthrough) more substantially than a
          mono-caps eyebrow would. Subject metadata sits on the right in
          mono caps. */}
      <header className="flex flex-wrap items-baseline justify-between gap-y-2 mb-5 pb-4 border-b border-rule">
        <p className="font-display italic font-normal text-base md:text-lg text-ink leading-snug">
          {eyebrow}
        </p>
        {scope ? (
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            {scope}
          </p>
        ) : null}
      </header>

      {/* Manuscript body — bordered card with bg-surface, matching the
          interactive-demo container so the editorial document still reads
          as part of the same catalog system. */}
      <div className="border border-rule-subtle bg-surface rounded-md px-6 py-8 md:px-9 md:py-10">
        {children}
      </div>

      {/* Manuscript footer — attribution. Italic Fraunces attribution
          mark sits as the closing editorial gesture. */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-4 text-right">
        &mdash; by <span className="text-accent">Spruce</span>
      </p>

      {caption ? (
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-5">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// SpecimenFrame — Pattern C (static generated artifacts). Plate identifier
// in the corner, generated-by attribution. Reads as a designed deliverable
// (a specimen sheet) rather than as a UI demonstration.
//
// Unlike the other frames, SpecimenFrame is chrome-only — header + caption
// without an inner bordered container. Pattern C demos render their own
// internal surface (typically the meditation app's Canvas color) so the
// specimen reads as "a piece of that product," not "a demo of a piece."
// ---------------------------------------------------------------------------

export function SpecimenFrame({
  eyebrow,
  scope,
  children,
  caption,
}: FrameProps) {
  return (
    <figure className="my-10 md:my-12">
      {/* Specimen header — plate identifier left, generation source right. */}
      <header className="flex flex-wrap items-baseline justify-between gap-y-2 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          <span className="text-accent">{eyebrow}</span>
        </p>
        {scope ? (
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            {scope}
          </p>
        ) : null}
      </header>

      {/* Specimen body — provided by the demo. Pattern C demos use the
          meditation app's Canvas color so the specimen reads as a real
          piece of the project's design system. */}
      {children}

      {caption ? (
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-5">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// TranscriptFrame — Pattern B (stepped Q&A / decision flows). Lighter
// rule-bound container instead of the bordered card, "Transcript" eyebrow
// + step counter. Reads as a printed conversation transcript rather than
// as a UI card.
// ---------------------------------------------------------------------------

export function TranscriptFrame({
  eyebrow,
  scope,
  children,
  caption,
}: FrameProps) {
  return (
    <figure className="my-10 md:my-12">
      <header className="flex flex-wrap items-baseline justify-between gap-y-2 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {eyebrow}
        </p>
        {scope ? (
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            {scope}
          </p>
        ) : null}
      </header>

      {/* Transcript body — hairline-bound (no full card border), no
          background fill. Reads as a printed page rather than as a UI
          card. The internal demo content carries its own visual register. */}
      <div className="border-y border-rule px-6 py-8 md:px-8 md:py-10">
        {children}
      </div>

      {caption ? (
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-5">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}
