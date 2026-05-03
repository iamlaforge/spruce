"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import { SunRisingIcon } from "@/src/case-studies/stillpoint/components/StillpointIcons";

/**
 * /reduce demo. Stillpoint-grounded fabricated-before treatment scoped
 * to a single featured practice card.
 *
 *   - Before: the same card padded with everything AI tends to add to a
 *     library card — level badge, "Most loved this week" flag, audio-
 *     length label, multi-paragraph description, rating row, "Free for
 *     7 days" badge, primary + secondary CTAs. The "show everything"
 *     impulse, even on a Stillpoint surface that already commits to
 *     restraint.
 *
 *   - After: the actual featured card from Home.tsx — icon + duration
 *     eyebrow + title + one-sentence description. No CTA (the card
 *     itself is the affordance via .stp-card--interactive). What
 *     remains after stripping anything that doesn't help a visitor
 *     decide whether to start the practice now.
 *
 * Both states use Stillpoint typography and colors. /reduce isolates
 * the content-discipline argument: even with right palette and right
 * typography, you can still over-fill a card. /reduce enforces what
 * gets to stay on the surface.
 *
 * The before-state is fabricated in the same sense as /typeface and
 * /colorgrade — Home.tsx without 'reduce' in its applied set still
 * renders the lean Stillpoint card; the demo elevates the before to
 * "what AI would have produced if no content discipline had been
 * applied" so the reduction is legible. /reduce's actual work on
 * Stillpoint is verification (no incremental Home.tsx changes).
 */

const PRACTICE = {
  title: "Morning Grounding",
  duration: "5 min · Breath",
  description: "Begin the day with a few mindful minutes.",
  Icon: SunRisingIcon,
};

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Decoration stripped — \"Beginner\" level badge and audio-length sub-meta line removed. Neither helped a visitor decide whether to start the practice; they padded the card with metadata that obscured the actual content.",
  },
  {
    n: 2,
    text: "Description reduced — multi-paragraph copy (\"Begin the day with a few mindful minutes of breath awareness. Designed for beginners and experienced practitioners alike. This guided session…\") becomes one specific sentence. Same idea, less text, no setup before the meaning lands.",
  },
  {
    n: 3,
    text: "Actions consolidated — primary \"Begin Practice\" + secondary \"Save for later\" become no explicit CTA at all. The card itself is the primary affordance via .stp-card--interactive (added by /refine); a save action belongs in the practice's own detail view, not on the discovery card.",
  },
];

export function ReduceDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /reduce"
      afterLabel="After /reduce"
      annotations={ANNOTATIONS}
      demoNote={
        <>
          The after-state matches the actual practice card that ships at
          /case-study — Stillpoint&rsquo;s cards are already lean. The
          before-state is illustrative: the same card padded with the
          metadata, badges, multi-paragraph copy, and dual CTAs AI tends to
          add when content discipline isn&rsquo;t applied. /reduce&rsquo;s
          actual work on Stillpoint is verification — no incremental Home.tsx
          changes were needed.
        </>
      }
      before={
        <CloseUp>
          <BeforeCard />
        </CloseUp>
      }
      after={
        <CloseUp>
          <AfterCard />
        </CloseUp>
      }
    />
  );
}

// ---------------------------------------------------------------------------
// CloseUp — wraps the card in StillpointScope with internal padding so
// the visible Stillpoint surface has breathing room (matching the other
// Stillpoint-grounded demos' pattern).
// ---------------------------------------------------------------------------

function CloseUp({ children }: { children: ReactNode }) {
  return (
    <StillpointScope>
      <div style={{ padding: "var(--stp-space-12) var(--stp-space-8)" }}>
        {children}
      </div>
    </StillpointScope>
  );
}

// ---------------------------------------------------------------------------
// AfterCard — the actual featured card from Home.tsx. Icon + duration +
// title + one-sentence description. Marker 1 sits on the duration
// eyebrow (which carries the meta annotation); marker 2 on the
// description (the reduced-copy annotation); marker 3 on the title (the
// no-CTA / card-as-affordance annotation).
// ---------------------------------------------------------------------------

function AfterCard() {
  const Icon = PRACTICE.Icon;
  return (
    <StillpointCard interactive>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--stp-space-2)",
          color: "var(--stp-color-sage)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        <Icon size={24} aria-hidden />
        <span
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--stp-tracking-wide)",
            fontWeight: 500,
          }}
        >
          {PRACTICE.duration}
          <Marker n={1} />
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--stp-font-serif)",
          fontSize: "var(--stp-text-2xl)",
          lineHeight: "var(--stp-leading-snug)",
          letterSpacing: "var(--stp-tracking-tight)",
          color: "var(--stp-color-text)",
          margin: "0 0 var(--stp-space-3) 0",
          fontWeight: 400,
        }}
      >
        {PRACTICE.title}
        <Marker n={3} />
      </h3>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-base)",
          lineHeight: "var(--stp-leading-base)",
          color: "var(--stp-color-text-muted)",
          margin: 0,
        }}
      >
        {PRACTICE.description}
        <Marker n={2} />
      </p>
    </StillpointCard>
  );
}

// ---------------------------------------------------------------------------
// BeforeCard — the same featured card with the AI default's
// "everything-on-surface" impulse: level badge, popular flag, audio-
// length label, multi-paragraph description, rating row, free-trial
// badge, primary + secondary CTAs. Uses Stillpoint colors and
// typography (so the before/after diff isolates content density rather
// than mixing in palette or type concerns).
// ---------------------------------------------------------------------------

function BeforeCard() {
  const Icon = PRACTICE.Icon;
  return (
    <StillpointCard>
      {/* Top row: icon + duration meta + level badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--stp-space-3)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--stp-space-2)",
            color: "var(--stp-color-sage)",
          }}
        >
          <Icon size={24} aria-hidden />
          <span
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--stp-tracking-wide)",
              fontWeight: 500,
            }}
          >
            {PRACTICE.duration}
          </span>
        </div>
        <Pill>Beginner</Pill>
      </div>

      {/* Audio-length sub-meta line */}
      <p style={SUB_META_STYLE}>Audio: 5:32 · Guided by Maya Okafor</p>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--stp-font-serif)",
          fontSize: "var(--stp-text-2xl)",
          lineHeight: "var(--stp-leading-snug)",
          letterSpacing: "var(--stp-tracking-tight)",
          color: "var(--stp-color-text)",
          margin: "var(--stp-space-3) 0 var(--stp-space-3) 0",
          fontWeight: 400,
        }}
      >
        {PRACTICE.title}
      </h3>

      {/* Multi-paragraph description */}
      <p style={DESC_STYLE}>
        Begin the day with a few mindful minutes of breath awareness.
        Designed for beginners and experienced practitioners alike, this
        guided session walks you through three rounds of grounding breath
        before settling into open awareness.
      </p>
      <p style={{ ...DESC_STYLE, marginTop: "var(--stp-space-2)" }}>
        Sit comfortably or lie down. The audio cues are gentle and
        infrequent — most of the practice is silence.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: "var(--stp-space-3)",
          flexWrap: "wrap",
          marginTop: "var(--stp-space-5)",
        }}
      >
        <FakeButton variant="primary">Begin Practice</FakeButton>
        <FakeButton variant="secondary">Save for later</FakeButton>
      </div>
    </StillpointCard>
  );
}

// ---------------------------------------------------------------------------
// Shared style constants for the before-state extras.
// ---------------------------------------------------------------------------

const SUB_META_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-xs)",
  color: "var(--stp-color-text-subtle)",
  margin: 0,
};

const DESC_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-base)",
  lineHeight: "var(--stp-leading-base)",
  color: "var(--stp-color-text-muted)",
  margin: 0,
};

// ---------------------------------------------------------------------------
// Pill — small rounded sage-tinted badge. Used in the before-state for
// the "Beginner" tag so the over-loading reads with Stillpoint colors
// (the argument is content discipline, not palette character).
// ---------------------------------------------------------------------------

function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "var(--stp-color-sage-subtle)",
        color: "var(--stp-color-sage)",
        fontFamily: "var(--stp-font-sans)",
        fontSize: "var(--stp-text-xs)",
        textTransform: "uppercase",
        letterSpacing: "var(--stp-tracking-wide)",
        fontWeight: 500,
        padding: "var(--stp-space-1) var(--stp-space-3)",
        borderRadius: "var(--stp-radius-pill)",
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// FakeButton — visual-only button stand-ins for the before-state CTAs.
// Stillpoint-styled so the before-state's bloat reads in Stillpoint's
// own design language (the argument is content density, not styling).
// Named "Fake" to make explicit that they're demo decoration — not
// hooked up, not the real StillpointButton.
// ---------------------------------------------------------------------------

function FakeButton({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--stp-font-sans)",
        fontSize: "var(--stp-text-base)",
        fontWeight: 500,
        padding: "var(--stp-space-3) var(--stp-space-6)",
        borderRadius: "var(--stp-radius-sm)",
        background: isPrimary ? "var(--stp-color-sage)" : "transparent",
        color: isPrimary ? "var(--stp-color-bg)" : "var(--stp-color-text)",
        border: `1px solid ${
          isPrimary ? "var(--stp-color-sage)" : "var(--stp-color-border-strong)"
        }`,
      }}
    >
      {children}
    </span>
  );
}
