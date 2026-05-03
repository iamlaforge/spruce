"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import { StillpointHeading } from "@/src/case-studies/stillpoint/components/StillpointHeading";
import {
  MoonIcon,
  SunRisingIcon,
  WaveIcon,
} from "@/src/case-studies/stillpoint/components/StillpointIcons";

/**
 * /refine demo. Stillpoint-grounded diff — the practices grid before
 * and after the layout + hover-affordance refinement.
 *
 *   - Before: three identical practice cards in a uniform row, no
 *     hover treatment. The moodboard's anti-references explicitly
 *     excluded "aggressive symmetry" against the established "quietly
 *     asymmetric" direction; the equal grid sits exactly in the
 *     failure mode.
 *
 *   - After: asymmetric arrangement — Morning Grounding featured
 *     full-width above the two supporting practices side-by-side.
 *     Featured card uses the larger heading level (StillpointHeading
 *     'section' instead of 'sub') for editorial weight. All cards
 *     gain the .stp-card--interactive modifier so they respond to
 *     hover with a subtle lift + deeper shadow.
 *
 * The actual layout + interactivity changes shown here also populate
 * Home.tsx via the `applied` system — when 'refine' is in the applied
 * set, the practices section renders this same arrangement. The hover
 * treatment is live: mouse over a card in the after view to see it.
 *
 * Card rendering duplicates Home.tsx's PracticeCard structure rather
 * than importing it — same primitives, same props, but staying
 * decoupled keeps demo isolation clean (the demo doesn't depend on
 * Home.tsx's internals).
 */

const PRACTICES = [
  {
    title: "Morning Grounding",
    duration: "5 min · Breath",
    description: "Begin the day with a few mindful minutes.",
    Icon: SunRisingIcon,
  },
  {
    title: "Mid-day Reset",
    duration: "3 min · Breath",
    description: "A short pause to reset between meetings.",
    Icon: WaveIcon,
  },
  {
    title: "Evening Wind-down",
    duration: "7 min · Body scan",
    description: "Let the day settle before sleep.",
    Icon: MoonIcon,
  },
];

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Layout shift — three identical cards in a uniform grid → asymmetric arrangement. Morning Grounding featured full-width above the two supporting practices side-by-side; the featured card uses a larger heading level (StillpointHeading 'section' instead of 'sub') for editorial weight. The moodboard's anti-references explicitly excluded the 'aggressive symmetry' the equal grid was producing.",
  },
  {
    n: 2,
    text: "Hover affordance — cards become interactive, responding to hover with a subtle lift and deeper shadow. The before-state had no hover treatment (users had to guess whether the cards did anything); cards now signal they're tap targets. Try hovering any card in the after view to see the lift.",
  },
];

export function RefineDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /refine"
      afterLabel="After /refine"
      annotations={ANNOTATIONS}
      before={<BeforeLayout />}
      after={<AfterLayout />}
    />
  );
}

// ---------------------------------------------------------------------------
// CloseUp — wraps the layout in StillpointScope with internal padding so
// the cards have breathing room from the visible Stillpoint surface edge
// (the .stillpoint scope's bg fills the BeforeAfterDemo card stage; in
// dark mode the outer card-stage ring is invisible against the dark
// Stillpoint surface, so the inner padding is what shows up visually).
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
// BeforeLayout — three identical cards in a row. Stack to single column
// at narrow widths (matches Home.tsx's existing responsive collapse).
// ---------------------------------------------------------------------------

function BeforeLayout() {
  return (
    <CloseUp>
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ gap: "var(--stp-space-4)" }}
      >
        {PRACTICES.map((p) => (
          <PracticeCard key={p.title} practice={p} />
        ))}
      </div>
    </CloseUp>
  );
}

// ---------------------------------------------------------------------------
// AfterLayout — featured card spans full width above two supporting cards
// side-by-side. Featured card carries Marker 1 in its heading; the first
// supporting card carries Marker 2 to anchor the hover affordance
// annotation (the hover itself is live — mouse over any card to feel it).
// ---------------------------------------------------------------------------

function AfterLayout() {
  return (
    <CloseUp>
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: "var(--stp-space-4)" }}
      >
        <PracticeCard
          practice={PRACTICES[0]}
          featured
          interactive
          headingMarkerN={1}
          style={{ gridColumn: "1 / -1" }}
        />
        <PracticeCard
          practice={PRACTICES[1]}
          interactive
          headingMarkerN={2}
        />
        <PracticeCard practice={PRACTICES[2]} interactive />
      </div>
    </CloseUp>
  );
}

// ---------------------------------------------------------------------------
// PracticeCard — same structure as Home.tsx's PracticeCard, plus an
// optional `headingMarkerN` slot so the demo can anchor markers without
// modifying the home-page component. The featured prop bumps the icon
// size and switches the heading level; interactive opts into the hover
// lift via .stp-card--interactive.
// ---------------------------------------------------------------------------

function PracticeCard({
  practice,
  featured = false,
  interactive = false,
  headingMarkerN,
  style,
}: {
  practice: (typeof PRACTICES)[number];
  featured?: boolean;
  interactive?: boolean;
  headingMarkerN?: number;
  style?: CSSProperties;
}) {
  const Icon = practice.Icon;
  return (
    <StillpointCard interactive={interactive} style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--stp-space-2)",
          color: "var(--stp-color-sage)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        <Icon size={featured ? 24 : 20} aria-hidden />
        <span
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--stp-tracking-wide)",
            fontWeight: 500,
          }}
        >
          {practice.duration}
        </span>
      </div>
      <StillpointHeading
        level={featured ? "section" : "sub"}
        style={{ marginBottom: "var(--stp-space-3)" }}
      >
        {practice.title}
        {headingMarkerN ? <Marker n={headingMarkerN} /> : null}
      </StillpointHeading>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-base)",
          lineHeight: "var(--stp-leading-base)",
          color: "var(--stp-color-text-muted)",
          margin: 0,
        }}
      >
        {practice.description}
      </p>
    </StillpointCard>
  );
}
