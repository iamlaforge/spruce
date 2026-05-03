"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";

/**
 * /typeface demo. Stillpoint-grounded big-impact diff — the page's two
 * largest typographic moments (hero text + pull quote) shown in two
 * states:
 *
 *   - Before: a fabricated AI-default typography state. System-ui sans
 *     for everything, no letter-spacing on eyebrows, no curly quotes
 *     around the pull quote, generic display weight. Stillpoint colors,
 *     spacing, and layout tokens stay constant; only typography is
 *     defaulted.
 *
 *   - After: the actual Stillpoint typography the foundation established.
 *     Lora editorial serif for display moments, Söhne humanist sans for
 *     body, --stp-tracking-wide on the all-caps eyebrow, opening +
 *     closing curly quotes bracketing the pull quote.
 *
 * The before-state is deliberately MORE rough than what Home.tsx without
 * 'typeface' renders. Home.tsx's actual ungated state has only the
 * practices eyebrow + pull-quote quote-marks issues; the demo elevates
 * the before to "what AI would have produced if /foundations and
 * /typeface had never run" so the typographic character that /typeface
 * preserves and extends becomes legible. This is a deliberate departure
 * from Decision 3 of the corrective tier (focused Stillpoint subsurfaces,
 * no fabrication) — for /typeface the actual surgical changes don't
 * carry enough visual weight to demonstrate what /typeface does at the
 * level of typographic character.
 *
 * The case-study artifact at /case-study still renders the actual
 * Stillpoint typography (Home.tsx with 'typeface' applied). The demo's
 * fabricated before is hypothetical — a teaching state, not a real
 * iteration point.
 */

const SYSTEM_SANS =
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

type Mode = "before" | "after";

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Eyebrow — Söhne all-caps with the foundation's --stp-tracking-wide token. AI default uses system-ui sans without letter-spacing; the eyebrow reads as architectural at this tracking, as defaulted at zero.",
  },
  {
    n: 2,
    text: "Display typeface — Lora editorial serif. The foundation pairs Lora for display moments with a humanist sans for body. AI default reaches for system-ui sans across both registers, flattening the hierarchy and erasing the editorial character. Same Lora carries through to the pull-quote moment below.",
  },
  {
    n: 3,
    text: "Body typeface — Söhne humanist sans (Inter fallback). Paired against the Lora display rather than collapsing into a single-family system default, so display and body live in distinct typographic registers.",
  },
  {
    n: 4,
    text: "Pull-quote curly quotes — opening (“) and closing (”) marks in smart curly form. Pull quotes carry quote marks by editorial convention; without them the sentence reads as caption rather than as quotation.",
  },
];

export function TypographyDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /typeface"
      afterLabel="After /typeface"
      annotations={ANNOTATIONS}
      before={
        <CloseUps>
          <HeroCloseUp mode="before" />
          <PullQuoteCloseUp mode="before" />
        </CloseUps>
      }
      after={
        <CloseUps>
          <HeroCloseUp mode="after" />
          <PullQuoteCloseUp mode="after" />
        </CloseUps>
      }
    />
  );
}

// ---------------------------------------------------------------------------
// CloseUps — stacks the two surfaces vertically inside StillpointScope so
// the .stillpoint CSS scope cascades the --stp-* tokens for color and
// spacing. Typography (font-family, weight, letter-spacing) is overridden
// inline per-element so the before/after diff cleanly isolates the
// typographic decisions /typeface makes.
//
// Padding sits on the inner div (inside the .stillpoint scope) rather than
// on the BeforeAfterDemo card stage. The .stillpoint scope fills its
// container with --stp-color-bg, which means the BeforeAfterDemo's outer
// padding becomes a visually-invisible ring in dark mode (Spruce dark and
// Stillpoint dark are similar tones); the content needs its own breathing
// room from the visible Stillpoint surface edge.
// ---------------------------------------------------------------------------

function CloseUps({ children }: { children: ReactNode }) {
  return (
    <StillpointScope>
      <div
        style={{
          display: "grid",
          gap: "var(--stp-space-12)",
          gridTemplateColumns: "1fr",
          padding: "var(--stp-space-12) var(--stp-space-8)",
        }}
      >
        {children}
      </div>
    </StillpointScope>
  );
}

function CloseUpLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--stp-font-sans)",
        fontSize: "var(--stp-text-xs)",
        textTransform: "uppercase",
        letterSpacing: "var(--stp-tracking-wide)",
        fontWeight: 500,
        color: "var(--stp-color-text-subtle)",
        margin: "0 0 var(--stp-space-5) 0",
      }}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// HeroCloseUp — the hero's text portion: eyebrow + display heading + lede.
// Three typographic registers in one block (sans-caps with tracking, serif
// display, sans body). CTAs omitted to keep the diff focused on type
// rather than on button styling. Identical content + identical Stillpoint
// color/spacing across modes; only typography differs.
// ---------------------------------------------------------------------------

function HeroCloseUp({ mode }: { mode: Mode }) {
  const isAfter = mode === "after";
  const sansFont = isAfter ? "var(--stp-font-sans)" : SYSTEM_SANS;
  const serifFont = isAfter ? "var(--stp-font-serif)" : SYSTEM_SANS;
  const eyebrowTracking = isAfter ? "var(--stp-tracking-wide)" : "normal";
  // Lora at display sizes reads weighty at 400; system-ui needs heavier
  // weight to feel like a heading rather than a paragraph.
  const displayWeight = isAfter ? 400 : 600;

  const eyebrowStyle: CSSProperties = {
    fontFamily: sansFont,
    fontSize: "var(--stp-text-xs)",
    textTransform: "uppercase",
    letterSpacing: eyebrowTracking,
    fontWeight: 500,
    color: "var(--stp-color-sage)",
    margin: "0 0 var(--stp-space-5) 0",
  };

  const displayStyle: CSSProperties = {
    fontFamily: serifFont,
    fontSize: "var(--stp-text-4xl)",
    fontWeight: displayWeight,
    lineHeight: "var(--stp-leading-tight)",
    letterSpacing: "var(--stp-tracking-tight)",
    color: "var(--stp-color-text)",
    margin: 0,
    textWrap: "balance",
  };

  const ledeStyle: CSSProperties = {
    fontFamily: sansFont,
    fontSize: "var(--stp-text-xl)",
    fontWeight: 400,
    lineHeight: "var(--stp-leading-relaxed)",
    color: "var(--stp-color-text-muted)",
    margin: "var(--stp-space-6) 0 0 0",
    maxWidth: "52ch",
  };

  return (
    <div>
      <CloseUpLabel>Hero — text</CloseUpLabel>
      <p style={eyebrowStyle}>
        Mindfulness for real life
        {isAfter ? <Marker n={1} /> : null}
      </p>
      <h2 style={displayStyle}>
        Find your stillpoint.
        {isAfter ? <Marker n={2} /> : null}
      </h2>
      <p style={ledeStyle}>
        Five-minute practices designed to fit into the spaces of an
        ordinary day. Take a breath. Begin where you are.
        {isAfter ? <Marker n={3} /> : null}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PullQuoteCloseUp — the page's most distinctive typographic beat. Lora
// at large size as the editorial moment; the same Lora that carries the
// hero display heading. Opening + closing curly quotes added in the
// after-state as one editorial move (single marker covers the pair —
// the annotation describes both).
// ---------------------------------------------------------------------------

function PullQuoteCloseUp({ mode }: { mode: Mode }) {
  const isAfter = mode === "after";
  const serifFont = isAfter ? "var(--stp-font-serif)" : SYSTEM_SANS;
  const sansFont = isAfter ? "var(--stp-font-sans)" : SYSTEM_SANS;
  const quoteWeight = isAfter ? 400 : 500;
  const open = isAfter ? "“" : "";
  const close = isAfter ? "”" : "";

  const quoteStyle: CSSProperties = {
    fontFamily: serifFont,
    fontSize: "var(--stp-text-3xl)",
    fontWeight: quoteWeight,
    lineHeight: "var(--stp-leading-snug)",
    letterSpacing: "var(--stp-tracking-tight)",
    color: "var(--stp-color-text)",
    margin: 0,
    maxWidth: "32ch",
  };

  const attributionStyle: CSSProperties = {
    fontFamily: sansFont,
    fontSize: "var(--stp-text-sm)",
    textTransform: "uppercase",
    letterSpacing: isAfter ? "var(--stp-tracking-wide)" : "normal",
    color: "var(--stp-color-text-subtle)",
    margin: "var(--stp-space-6) 0 0 0",
    fontWeight: 500,
  };

  return (
    <div>
      <CloseUpLabel>Pull-quote section</CloseUpLabel>
      <p style={quoteStyle}>
        {open}
        {isAfter ? <Marker n={4} /> : null}A few minutes for yourself are the
        ones you give back to everyone else.{close}
      </p>
      <p style={attributionStyle}>A note we hold close</p>
    </div>
  );
}
