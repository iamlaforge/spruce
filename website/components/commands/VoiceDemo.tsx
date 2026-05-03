"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointButton } from "@/src/case-studies/stillpoint/components/StillpointButton";
import { StillpointInput } from "@/src/case-studies/stillpoint/components/StillpointInput";

/**
 * /voice demo. Stillpoint-grounded diff — focused close-ups of the two
 * surfaces /voice addresses on Stillpoint home: the hero primary CTA
 * and the signup section. Three discrete copy moves: hero CTA "Get
 * Started" → "Begin practice", signup CTA "Get Started" → "Start
 * practicing", and the performative-proof line removed.
 *
 * Diff-style per Decision 1 of the corrective tier; isolated state per
 * Decision 2 (each demo's after = Home with only that command applied).
 * The actual changes shown here also populate Home.tsx via the `applied`
 * system — when 'voice' is in the applied set, the home renders these
 * same edits. Single source of truth for what /voice did.
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Hero CTA — \"Begin practice\" matches Stillpoint's calm-supportive-friend voice. \"Get Started\" was the friendly-professional SaaS default the moodboard's anti-references explicitly excluded.",
  },
  {
    n: 2,
    text: "Signup CTA — \"Start practicing\" speaks to the actual commitment (signing up to begin a daily practice), not the generic \"begin a flow\" framing. Slight variation from the hero CTA fits the more specific moment.",
  },
  {
    n: 3,
    text: "Performative-proof line removed. The moodboard explicitly excluded \"join thousands\" copy — wellness-influencer marketing in a product the .spruce.md describes as quiet, supportive, anti-performance. The line wasn't carrying weight; it was the SaaS instinct showing up.",
  },
];

export function VoiceDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /voice"
      afterLabel="After /voice"
      annotations={ANNOTATIONS}
      before={
        <CloseUps>
          <HeroCloseUp ctaLabel="Get Started" />
          <SignupCloseUp
            ctaLabel="Get Started"
            socialProofState="present"
          />
        </CloseUps>
      }
      after={
        <CloseUps>
          <HeroCloseUp ctaLabel="Begin practice" markerN={1} />
          <SignupCloseUp
            ctaLabel="Start practicing"
            socialProofState="removed"
            ctaMarkerN={2}
            removalMarkerN={3}
          />
        </CloseUps>
      }
    />
  );
}

// ---------------------------------------------------------------------------
// CloseUps — stacks the two focused close-ups vertically. StillpointScope
// applies the .stillpoint CSS scope so the --stp-* tokens cascade into
// the primitives below, matching how they render inside Home.tsx.
//
// Padding sits on the inner div (inside the .stillpoint scope) rather than
// on the BeforeAfterDemo card stage — the scope fills its container with
// --stp-color-bg, so content needs its own breathing room from the visible
// Stillpoint surface edge (especially in dark mode, where the BeforeAfter
// card stage's bg-surface ring is invisible against dark Stillpoint).
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

// ---------------------------------------------------------------------------
// CloseUpLabel — small mono-caps eyebrow naming the surface the close-up
// is showing. Reads as a section pointer, not as Stillpoint UI itself.
// ---------------------------------------------------------------------------

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
        margin: "0 0 var(--stp-space-4) 0",
      }}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// HeroCloseUp — the hero's CTA row in isolation: primary + tertiary side
// by side, matching the layout in Home.tsx's <Hero>. Marker on the primary
// CTA in the after-state.
// ---------------------------------------------------------------------------

function HeroCloseUp({
  ctaLabel,
  markerN,
}: {
  ctaLabel: string;
  markerN?: number;
}) {
  return (
    <div>
      <CloseUpLabel>Hero — primary CTA</CloseUpLabel>
      <div
        style={{
          display: "flex",
          gap: "var(--stp-space-4)",
          flexWrap: "wrap",
        }}
      >
        <StillpointButton variant="primary">
          {ctaLabel}
          {markerN ? <Marker n={markerN} /> : null}
        </StillpointButton>
        <StillpointButton variant="tertiary">How it works ↓</StillpointButton>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SignupCloseUp — the signup form row + the social-proof line beneath.
// In the before-state both are present; in the after-state the form has
// the rewritten CTA and the social-proof line is replaced by an editorial
// "removed" caption that anchors marker 3.
// ---------------------------------------------------------------------------

const REMOVAL_CAPTION_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-xs)",
  fontStyle: "italic",
  color: "var(--stp-color-text-subtle)",
  margin: "var(--stp-space-5) 0 0 0",
  opacity: 0.75,
};

function SignupCloseUp({
  ctaLabel,
  socialProofState,
  ctaMarkerN,
  removalMarkerN,
}: {
  ctaLabel: string;
  socialProofState: "present" | "removed";
  ctaMarkerN?: number;
  removalMarkerN?: number;
}) {
  return (
    <div>
      <CloseUpLabel>Signup section</CloseUpLabel>
      <div style={{ maxWidth: "480px" }}>
        <div
          style={{
            display: "flex",
            gap: "var(--stp-space-3)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <StillpointInput
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
            />
          </div>
          <StillpointButton variant="primary">
            {ctaLabel}
            {ctaMarkerN ? <Marker n={ctaMarkerN} /> : null}
          </StillpointButton>
        </div>
        {socialProofState === "present" ? (
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-sm)",
              color: "var(--stp-color-text-subtle)",
              margin: "var(--stp-space-5) 0 0 0",
            }}
          >
            Join 10,000+ people finding their stillpoint.
          </p>
        ) : (
          <p style={REMOVAL_CAPTION_STYLE}>
            ↳ Performative-proof line removed
            {removalMarkerN ? <Marker n={removalMarkerN} /> : null}
          </p>
        )}
      </div>
    </div>
  );
}
