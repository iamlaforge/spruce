"use client";

import { useState, type ReactNode } from "react";
import { SpecimenFrame } from "./DemoFrame";
import { Lightbox } from "./Lightbox";
import { stillpointJourneys } from "@/src/case-studies/stillpoint/content/journeys";

/**
 * /journey demo. Renders the actual Stillpoint .journeys.md content as
 * a proper journey map — phase band across the top, smooth SVG
 * emotional-arc curve overlaid on numbered touchpoint columns, and
 * stacked swim lanes beneath each column for action, thought,
 * friction, and opportunity.
 *
 * Journey maps are wide horizontal artifacts that don't fit cleanly
 * inside the constrained command-detail container. The inline preview
 * shows the signature elements (header + phase band + emotional arc);
 * a "View full journey map" button opens the complete artifact in a
 * Lightbox where the touchpoint grid + swim lanes + key moments +
 * informs design get proper breathing room.
 *
 * Visual register: SpecimenFrame matches /personas + /scenarios.
 * Spruce-system tokens (text-ink, accent, font-display, font-mono).
 */

type Touchpoint = {
  name: string;
  whatHappens: string;
  emotionalState: string;
  friction?: string;
  opportunity?: string;
};

type Phase = {
  label: string;
  /** 1-indexed touchpoint range (inclusive). */
  start: number;
  end: number;
};

type JourneyMapData = {
  title: string;
  persona: string;
  job: string;
  state: "current-state" | "future-state";
  setup: string;
  touchpoints: readonly Touchpoint[];
  emotionalArcSummary: string;
  keyMoments: readonly { touchpoint: string; whyItMatters: string }[];
  informsDesign: readonly string[];
  /** Per-touchpoint emotional intensity, 0–1. Hand-mapped from the
   *  emotionalState prose so the curve faithfully traces the arc the
   *  artifact describes. */
  emotionalScores: readonly number[];
  /** Phase grouping above the touchpoint columns. */
  phases: readonly Phase[];
};

// Map each touchpoint's emotionalState prose to a 0–1 score so the arc
// reads the way the artifact's narrative reads. Scores are interpretive
// presentation (kept in the demo, not in the data file) — the data file
// holds the source of truth in prose; this layer visualizes it.
const CURRENT_SCORES = [0.85, 0.3, 0.55, 0.4, 0.65, 0.5, 0.85, 0.95];
const FUTURE_SCORES = [0.85, 0.45, 0.7, 0.8, 0.92, 0.95, 0.92];

const CURRENT_PHASES: Phase[] = [
  { label: "Outside the app", start: 1, end: 2 },
  { label: "Entry", start: 3, end: 3 },
  { label: "Choosing", start: 4, end: 6 },
  { label: "Practice", start: 7, end: 7 },
  { label: "Close", start: 8, end: 8 },
];

const FUTURE_PHASES: Phase[] = [
  { label: "Outside the app", start: 1, end: 2 },
  { label: "Entry", start: 3, end: 3 },
  { label: "Begin", start: 4, end: 4 },
  { label: "Practice", start: 5, end: 5 },
  { label: "Close + beyond", start: 6, end: 7 },
];

// Touchpoint column width in px. The journey map renders at
// touchpoints.length × COL_WIDTH and scrolls horizontally inside the
// demo container — journey maps are wide artifacts, and squeezing
// them undermines the format.
const COL_WIDTH = 220;
const ARC_HEIGHT = 110;
const ARC_PADDING_Y = 16;

export function JourneyDemo() {
  const { mayaMorningCurrent, mayaMorningFuture, comparison } = stillpointJourneys;

  const current: JourneyMapData = {
    ...mayaMorningCurrent,
    touchpoints: mayaMorningCurrent.touchpoints,
    keyMoments: mayaMorningCurrent.keyMoments,
    informsDesign: mayaMorningCurrent.informsDesign,
    emotionalScores: CURRENT_SCORES,
    phases: CURRENT_PHASES,
  };

  const future: JourneyMapData = {
    ...mayaMorningFuture,
    touchpoints: mayaMorningFuture.touchpoints,
    keyMoments: mayaMorningFuture.keyMoments,
    informsDesign: mayaMorningFuture.informsDesign,
    emotionalScores: FUTURE_SCORES,
    phases: FUTURE_PHASES,
  };

  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/journey · Stillpoint"
      caption="/journey writes .journeys.md — a specific persona accomplishing a specific job through real touchpoints, with emotional state, friction, and opportunity tracked at every step. Current and future states paired so the comparison itself becomes the design brief."
    >
      <div className="space-y-6 md:space-y-8">
        <JourneyPanel journey={current} stateLabel="Current state" />
        <JourneyPanel journey={future} stateLabel="Future state" />
        <ComparisonPanel comparison={comparison} />
      </div>
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// JourneyPanel — header, setup, journey map proper, key moments,
// informs-design footer.
// ---------------------------------------------------------------------------

function JourneyPanel({
  journey,
  stateLabel,
}: {
  journey: JourneyMapData;
  stateLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const totalCols = journey.touchpoints.length;
  const totalWidth = totalCols * COL_WIDTH;

  return (
    <>
      <article className="border border-rule bg-surface rounded-md overflow-hidden">
        <div className="px-6 py-6 md:px-8 md:py-7">
          <header className="mb-5">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
              {stateLabel}
            </p>
            <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight mb-3">
              {journey.title}
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                Persona ·{" "}
                <span className="text-ink-muted normal-case">{journey.persona}</span>
              </p>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                Job · <span className="text-ink-muted normal-case">{journey.job}</span>
              </p>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                Touchpoints ·{" "}
                <span className="text-ink-muted normal-case">{totalCols}</span>
              </p>
            </div>
          </header>

          {/* Phase band + emotional arc — signature visual visible inline */}
          <div className="overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8">
            <div style={{ minWidth: `${totalWidth}px` }}>
              <PhaseBand phases={journey.phases} totalCols={totalCols} />
              <EmotionalArc
                scores={journey.emotionalScores}
                width={totalWidth}
                height={ARC_HEIGHT}
              />
            </div>
          </div>
        </div>

        {/* Open-in-viewer call to action */}
        <div className="border-t border-rule px-6 py-4 md:px-8 md:py-5 bg-surface-elevated flex items-center justify-between gap-4">
          <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug">
            View the full journey map with touchpoint swim lanes, friction,
            opportunities, and design implications.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white font-mono text-2xs uppercase tracking-widest hover:bg-accent-hover transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Open in viewer
            <ExpandIcon />
          </button>
        </div>
      </article>

      {/* Lightbox — the artifact viewer */}
      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        title={journey.title}
        subtitle={`${journey.persona} · ${journey.job}`}
      >
        <JourneyMapFull journey={journey} />
      </Lightbox>
    </>
  );
}

// ---------------------------------------------------------------------------
// JourneyMapFull — the complete journey artifact rendered inside the
// Lightbox. Re-renders the phase band + arc for full-document context,
// then the full touchpoint swim-lane grid, then setup, emotional-arc
// summary, key moments, and informs-design sections.
// ---------------------------------------------------------------------------

function JourneyMapFull({ journey }: { journey: JourneyMapData }) {
  const totalCols = journey.touchpoints.length;
  const totalWidth = totalCols * COL_WIDTH;

  return (
    <div className="px-6 py-7 md:px-8 md:py-9">
      {/* Setup */}
      <div className="mb-7 max-w-prose">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          Setup
        </p>
        <p className="text-sm md:text-base text-ink leading-snug text-pretty">
          {journey.setup}
        </p>
      </div>

      {/* Phase band + arc + touchpoint grid — the artifact at full breadth */}
      <div className="overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8 mb-7">
        <div style={{ minWidth: `${totalWidth}px` }}>
          <PhaseBand phases={journey.phases} totalCols={totalCols} />
          <EmotionalArc
            scores={journey.emotionalScores}
            width={totalWidth}
            height={ARC_HEIGHT}
          />
          <TouchpointGrid
            touchpoints={journey.touchpoints}
            totalCols={totalCols}
          />
        </div>
      </div>

      {/* Emotional arc summary */}
      <div className="mt-7 max-w-prose">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          Emotional arc
        </p>
        <p className="text-sm md:text-base text-ink-muted leading-snug text-pretty">
          {journey.emotionalArcSummary}
        </p>
      </div>

      {/* Key moments */}
      <div className="mt-6 max-w-prose">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          Key moments
        </p>
        <ul role="list" className="list-none space-y-3">
          {journey.keyMoments.map((m, i) => (
            <li
              key={i}
              className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
            >
              <span aria-hidden className="absolute left-0 top-0 text-accent">
                &mdash;
              </span>
              <span className="font-display italic text-ink">
                {m.touchpoint}.{" "}
              </span>
              <span className="text-ink-muted">{m.whyItMatters}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Informs design */}
      <div className="border-t border-rule-subtle mt-7 pt-6">
        <p className="font-display italic font-normal text-base md:text-lg text-ink leading-snug mb-4">
          How this informs design
        </p>
        <ul role="list" className="list-none space-y-3 max-w-prose">
          {journey.informsDesign.map((item, i) => (
            <li
              key={i}
              className="text-sm md:text-base text-ink-muted leading-snug pl-5 relative text-pretty"
            >
              <span aria-hidden className="absolute left-0 top-0 text-accent">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 4 L2 2 L4 2 M9 4 L9 2 L7 2 M2 7 L2 9 L4 9 M9 7 L9 9 L7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// PhaseBand — top band naming phases that group touchpoint ranges.
// ---------------------------------------------------------------------------

function PhaseBand({
  phases,
  totalCols,
}: {
  phases: readonly Phase[];
  totalCols: number;
}) {
  return (
    <div
      className="grid border-y border-rule"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, ${COL_WIDTH}px)`,
      }}
    >
      {phases.map((phase, i) => (
        <div
          key={i}
          className="px-3 py-2 border-l first:border-l-0 border-rule-subtle"
          style={{
            gridColumn: `${phase.start} / ${phase.end + 1}`,
          }}
        >
          <p className="font-mono text-2xs uppercase tracking-widest text-accent">
            {phase.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmotionalArc — SVG smooth curve through the per-touchpoint emotional
// scores, with circle markers at each touchpoint position. Y-axis runs
// from 0 (low) at the bottom to 1 (high) at the top, with padding so
// markers don't clip.
// ---------------------------------------------------------------------------

function EmotionalArc({
  scores,
  width,
  height,
}: {
  scores: readonly number[];
  width: number;
  height: number;
}) {
  const usableHeight = height - ARC_PADDING_Y * 2;

  const points = scores.map((score, i) => ({
    x: (i + 0.5) * COL_WIDTH,
    y: ARC_PADDING_Y + (1 - score) * usableHeight,
  }));

  // Smooth cubic bezier through consecutive points. Control points sit at
  // the horizontal midpoint between each pair of points, anchored to the
  // y-position of the start (cp1) and end (cp2) — produces an S-curve
  // between every adjacent pair without overshoot.
  const path = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const cp1X = prev.x + (point.x - prev.x) * 0.5;
    const cp2X = prev.x + (point.x - prev.x) * 0.5;
    return `${acc} C ${cp1X} ${prev.y}, ${cp2X} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <div className="relative" style={{ height: `${height}px`, width: `${width}px` }}>
      {/* Y-axis labels — high / low markers along the left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-3 pointer-events-none">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          High
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Low
        </span>
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block"
        aria-label="Emotional arc across the journey"
      >
        {/* Center reference line — neutral baseline */}
        <line
          x1={0}
          y1={ARC_PADDING_Y + usableHeight / 2}
          x2={width}
          y2={ARC_PADDING_Y + usableHeight / 2}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 4"
          className="text-ink-subtle/40"
        />
        {/* Smooth arc */}
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        />
        {/* Touchpoint markers */}
        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r={5}
              fill="var(--color-surface, white)"
              stroke="currentColor"
              strokeWidth={2}
              className="text-accent"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TouchpointGrid — swim-lane stack per touchpoint column. Each column
// has: numbered header with name, action prose, italic thought, friction
// callout (if present), opportunity callout (if present).
// ---------------------------------------------------------------------------

function TouchpointGrid({
  touchpoints,
  totalCols,
}: {
  touchpoints: readonly Touchpoint[];
  totalCols: number;
}) {
  return (
    <div
      className="grid border-t border-rule"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, ${COL_WIDTH}px)`,
      }}
    >
      {touchpoints.map((t, i) => (
        <TouchpointColumn key={i} touchpoint={t} step={i + 1} />
      ))}
    </div>
  );
}

function TouchpointColumn({
  touchpoint,
  step,
}: {
  touchpoint: Touchpoint;
  step: number;
}) {
  const stepLabel = String(step).padStart(2, "0");
  return (
    <div className="px-3 py-4 border-l first:border-l-0 border-rule-subtle flex flex-col gap-3">
      {/* Numbered header */}
      <div>
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
          Step {stepLabel}
        </p>
        <p className="text-sm text-ink font-medium leading-snug">
          {touchpoint.name}
        </p>
      </div>

      <SwimLane label="Action">
        <p className="text-xs text-ink-muted leading-snug text-pretty">
          {touchpoint.whatHappens}
        </p>
      </SwimLane>

      <SwimLane label="Thought">
        <p className="font-display italic text-xs text-ink leading-snug text-pretty">
          {touchpoint.emotionalState}
        </p>
      </SwimLane>

      {touchpoint.friction ? (
        <SwimCallout label="Friction" tone="negative">
          {touchpoint.friction}
        </SwimCallout>
      ) : null}

      {touchpoint.opportunity ? (
        <SwimCallout label="Opportunity" tone="positive">
          {touchpoint.opportunity}
        </SwimCallout>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SwimLane — labelled content row inside a touchpoint column.
// ---------------------------------------------------------------------------

function SwimLane({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SwimCallout — friction or opportunity block. Border-left treatment
// makes them read as design-relevant moments at a glance.
// ---------------------------------------------------------------------------

function SwimCallout({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "positive" | "negative";
  children: ReactNode;
}) {
  const accent = tone === "positive" ? "text-accent" : "text-ink";
  const border = tone === "positive" ? "border-accent" : "border-rule";
  return (
    <div className={`mt-1 border-l-2 pl-2 ${border}`}>
      <p className={`font-mono text-2xs uppercase tracking-widest mb-0.5 ${accent}`}>
        {label}
      </p>
      <p className="text-xs text-ink-muted leading-snug text-pretty">
        {children}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ComparisonPanel — closing comparison: removed / preserved / added
// friction across the two states.
// ---------------------------------------------------------------------------

function ComparisonPanel({
  comparison,
}: {
  comparison: {
    readonly removedFriction: readonly string[];
    readonly preservedFriction: readonly string[];
    readonly addedFriction: readonly string[];
  };
}) {
  return (
    <article className="border border-rule-subtle bg-surface rounded-md px-6 py-7 md:px-8 md:py-9">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Comparison
      </p>
      <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-5">
        Current state vs. future state
      </h3>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-8">
        <ComparisonColumn
          tone="positive"
          label="Removed friction"
          items={[...comparison.removedFriction]}
        />
        <ComparisonColumn
          tone="neutral"
          label="Preserved friction"
          items={[...comparison.preservedFriction]}
        />
        <ComparisonColumn
          tone="negative"
          label="Added friction"
          items={[...comparison.addedFriction]}
        />
      </div>
    </article>
  );
}

function ComparisonColumn({
  tone,
  label,
  items,
}: {
  tone: "positive" | "neutral" | "negative";
  label: string;
  items: string[];
}) {
  const accent =
    tone === "positive"
      ? "text-accent"
      : tone === "negative"
        ? "text-ink"
        : "text-ink-muted";
  return (
    <div>
      <p className={`font-mono text-2xs uppercase tracking-widest mb-3 ${accent}`}>
        {label}
      </p>
      <ul role="list" className="list-none space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-ink-muted leading-snug pl-4 relative text-pretty"
          >
            <span aria-hidden className="absolute left-0 top-0 text-ink-subtle">
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
