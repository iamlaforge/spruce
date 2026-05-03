"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import {
  MoonIcon,
  SunRisingIcon,
  WaveIcon,
} from "@/src/case-studies/stillpoint/components/StillpointIcons";

// AI-default palette tokens — defined as a parallel CSS-variable scope so
// the before-state responds to Spruce's theme toggle (without this, the
// AI-default rendering would stay light in dark mode while Stillpoint
// flipped). See the file for token definitions and dark-mode overrides.
import "./colorgrade-ai-palette.css";

/**
 * /colorgrade demo. Stillpoint-grounded big-impact diff using the
 * fabricated-before treatment (same precedent /typeface set). The two
 * surfaces shown are the personalization banner (output of /decide) and
 * the asymmetric practices grid (output of /refine).
 *
 *   - Before: a fabricated AI-default palette. Pure-white surfaces, cool
 *     gray neutrals, tech-blue accent on eyebrows + borders, blue-to-
 *     purple gradient on the banner — the cool/clinical SaaS palette
 *     that appears across hundreds of generic marketing surfaces. The
 *     moodboard's anti-references explicitly excluded this direction.
 *
 *   - After: the actual Stillpoint palette. Warm cream + sand surfaces,
 *     sage primary accent, lavender warmth on the banner gradient, deep
 *     indigo text. The warm-anchor character /foundations established.
 *
 * The before-state is fabricated in the same sense as /typeface's: the
 * actual Home.tsx without 'colorgrade' in its applied set still renders
 * the warm Stillpoint palette (the palette work is /foundations'
 * output, intact). The demo elevates the before to "what AI would have
 * produced if no palette discipline had been applied" so the character
 * difference becomes legible. A deliberate departure from Decision 3 of
 * the corrective tier (focused subsurfaces, no fabrication), justified
 * the same way: the actual /colorgrade work on Stillpoint is verification
 * rather than incremental change, and the demo needs visceral contrast
 * to show what /colorgrade preserves.
 *
 * Typography (Söhne sans + Lora serif), layout (banner + asymmetric
 * cards), and structure are held constant across both states. Only
 * color decisions differ — surface backgrounds, accent character, text
 * hierarchy.
 */

// ---------------------------------------------------------------------------
// Color sets — palette character expressed as a coherent token group.
// ---------------------------------------------------------------------------

type ColorSet = {
  /** Outer surface bg (the area around the banner + cards) */
  outerBg: string;
  /** Banner gradient (start, end, border) */
  bannerGradientStart: string;
  bannerGradientEnd: string;
  bannerBorder: string;
  /** Accent color used on eyebrows */
  accent: string;
  /** Card surface */
  cardBg: string;
  cardShadow: string;
  /** Text colors */
  textPrimary: string;
  textMuted: string;
};

const STILLPOINT_COLORS: ColorSet = {
  outerBg: "var(--stp-color-bg)",
  bannerGradientStart: "var(--stp-color-sage-subtle)",
  // Theme-switching warmth accent — peach in light, lavender in dark.
  // Resolves through stillpoint.css; tracks whatever the actual
  // PersonalizationBanner renders at /case-study.
  bannerGradientEnd: "var(--stp-color-banner-gradient-end)",
  bannerBorder: "var(--stp-color-sage)",
  accent: "var(--stp-color-sage)",
  cardBg: "var(--stp-color-surface-elevated)",
  cardShadow: "var(--stp-shadow-card)",
  textPrimary: "var(--stp-color-text)",
  textMuted: "var(--stp-color-text-muted)",
};

// All values reference --ai-* tokens defined in colorgrade-ai-palette.css.
// Those tokens have dark-mode counterparts that activate via the same
// html.dark cascade Stillpoint uses, so the before-state flips with Spruce's
// theme toggle just like the after-state does.
const AI_COLORS: ColorSet = {
  outerBg: "var(--ai-color-outer-bg)",
  bannerGradientStart: "var(--ai-color-banner-grad-start)",
  bannerGradientEnd: "var(--ai-color-banner-grad-end)",
  bannerBorder: "var(--ai-color-banner-border)",
  accent: "var(--ai-color-accent)",
  cardBg: "var(--ai-color-card-bg)",
  cardShadow: "var(--ai-color-card-shadow)",
  textPrimary: "var(--ai-color-text-primary)",
  textMuted: "var(--ai-color-text-muted)",
};

// ---------------------------------------------------------------------------
// Practice data — same as Home.tsx + RefineDemo.
// ---------------------------------------------------------------------------

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
    text: "Banner palette — sage-to-warmth gradient with sage border vs blue-to-purple gradient with tech-blue border. The blue-purple gradient is the SaaS marketing default the moodboard's anti-references explicitly excluded; the warmth color (peach in light mode, lavender in dark) carries the warm-anchor character /foundations established.",
  },
  {
    n: 2,
    text: "Accent — sage as the primary accent across eyebrows, borders, accent moments. AI default uses tech blue, the statistical accent for any AI-generated product. Sage commits to a specific palette character; tech blue commits to nothing.",
  },
  {
    n: 3,
    text: "Surface backgrounds — warm cream + paper-like elevated surfaces vs pure white + cool grays. Cream surfaces give the page warmth and material character; white surfaces read as clinical and characterless, generic for any product.",
  },
  {
    n: 4,
    text: "Text hierarchy — deep indigo (warm-anchor) for primary text, slightly lighter for secondary. AI default uses near-black + cool gray, no palette commitment in the text colors. Stillpoint's text colors carry the same warm character as the surfaces.",
  },
];

export function ColorgradeDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /colorgrade"
      afterLabel="After /colorgrade"
      annotations={ANNOTATIONS}
      demoNote={
        <>
          The personalization banner and practice cards above are real
          Stillpoint surfaces — their actual palette matches the after-state
          and renders that way at /case-study. The before-state is
          illustrative: what AI defaults would have produced if /foundations
          and /colorgrade hadn&rsquo;t established Stillpoint&rsquo;s warm
          palette character. /colorgrade&rsquo;s actual work on Stillpoint
          is verification — confirming the palette is intact, no token
          overrides shipped.
        </>
      }
      before={<Composition colors={AI_COLORS} mode="before" />}
      after={<Composition colors={STILLPOINT_COLORS} mode="after" />}
    />
  );
}

// ---------------------------------------------------------------------------
// Composition — the two stacked surfaces (banner + asymmetric cards) in
// either palette. Wrapped in StillpointScope for typography token cascade
// (font-family, sizes, line-heights all stay constant across modes — only
// colors differ). Inner div carries an explicit outer bg so the AI-default
// state shows pure-white instead of the .stillpoint scope's warm cream.
// ---------------------------------------------------------------------------

function Composition({
  colors,
  mode,
}: {
  colors: ColorSet;
  mode: "before" | "after";
}) {
  // The before-state needs the .colorgrade-ai-palette class so its
  // var(--ai-*) token references resolve (and respond to Spruce's theme
  // cascade). The after-state stays plain — its var(--stp-*) tokens
  // resolve from the .stillpoint scope already provided by StillpointScope.
  const aiPaletteClass =
    mode === "before" ? "colorgrade-ai-palette" : "";
  return (
    <StillpointScope>
      <div
        className={aiPaletteClass}
        style={{
          background: colors.outerBg,
          padding: "var(--stp-space-12) var(--stp-space-8)",
          display: "grid",
          gap: "var(--stp-space-8)",
        }}
      >
        <Banner colors={colors} mode={mode} />
        <CardsGrid colors={colors} mode={mode} />
      </div>
    </StillpointScope>
  );
}

// ---------------------------------------------------------------------------
// Banner — the personalization banner reduced to its color-bearing parts
// (no CTAs; the demo focuses on palette character). Marker 1 anchors the
// banner palette annotation in the after-state.
// ---------------------------------------------------------------------------

function Banner({
  colors,
  mode,
}: {
  colors: ColorSet;
  mode: "before" | "after";
}) {
  const isAfter = mode === "after";
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.bannerGradientStart} 0%, ${colors.bannerGradientEnd} 100%)`,
        border: `1px solid ${colors.bannerBorder}`,
        borderRadius: "var(--stp-radius-md)",
        padding: "var(--stp-space-6)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--stp-tracking-wide)",
          fontWeight: 500,
          color: colors.accent,
          margin: "0 0 var(--stp-space-2) 0",
        }}
      >
        For tonight
        {isAfter ? <Marker n={1} /> : null}
      </p>
      <p
        style={{
          fontFamily: "var(--stp-font-serif)",
          fontSize: "var(--stp-text-xl)",
          lineHeight: "var(--stp-leading-snug)",
          color: colors.textPrimary,
          margin: "0 0 var(--stp-space-2) 0",
          letterSpacing: "var(--stp-tracking-tight)",
        }}
      >
        It&rsquo;s evening &mdash; let the day settle with{" "}
        <em>Evening Wind-down</em>.
      </p>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-sm)",
          color: colors.textMuted,
          margin: 0,
        }}
      >
        7 min · Body scan
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardsGrid — the asymmetric arrangement (featured Morning Grounding above
// two supporting cards), held in the same shape as /refine's after-state
// so the only thing that changes between /refine's after and /colorgrade's
// after is what /colorgrade adds (palette character).
// ---------------------------------------------------------------------------

function CardsGrid({
  colors,
  mode,
}: {
  colors: ColorSet;
  mode: "before" | "after";
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2"
      style={{ gap: "var(--stp-space-4)" }}
    >
      <Card
        practice={PRACTICES[0]}
        featured
        colors={colors}
        mode={mode}
        accentMarkerN={2}
        style={{ gridColumn: "1 / -1" }}
      />
      <Card
        practice={PRACTICES[1]}
        colors={colors}
        mode={mode}
        surfaceMarkerN={3}
      />
      <Card
        practice={PRACTICES[2]}
        colors={colors}
        mode={mode}
        textMarkerN={4}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card — practice card colored from the active ColorSet rather than from
// the .stp-card token (so the AI-default and Stillpoint palettes can be
// applied side-by-side without forking the underlying StillpointCard
// primitive). Markers anchor specific palette decisions.
// ---------------------------------------------------------------------------

function Card({
  practice,
  featured = false,
  colors,
  mode,
  accentMarkerN,
  surfaceMarkerN,
  textMarkerN,
  style,
}: {
  practice: (typeof PRACTICES)[number];
  featured?: boolean;
  colors: ColorSet;
  mode: "before" | "after";
  accentMarkerN?: number;
  surfaceMarkerN?: number;
  textMarkerN?: number;
  style?: CSSProperties;
}) {
  const Icon = practice.Icon;
  const isAfter = mode === "after";

  // Use the StillpointCard primitive for the after-state (so it picks up
  // the actual --stp-color-* tokens); fabricate a parallel surface inline
  // for the before-state (so the AI-default palette can be applied).
  const cardStyle: CSSProperties = isAfter
    ? { ...style }
    : {
        background: colors.cardBg,
        borderRadius: "var(--stp-radius-md)",
        padding: "var(--stp-space-6)",
        boxShadow: colors.cardShadow,
        ...style,
      };

  const inner = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--stp-space-2)",
          color: colors.accent,
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
          {isAfter && accentMarkerN ? <Marker n={accentMarkerN} /> : null}
        </span>
      </div>
      {/* Heading: use raw <h3> instead of StillpointHeading so the text
          color can be overridden inline per palette. */}
      {featured ? (
        <h3
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-2xl)",
            lineHeight: "var(--stp-leading-snug)",
            letterSpacing: "var(--stp-tracking-tight)",
            color: colors.textPrimary,
            margin: "0 0 var(--stp-space-3) 0",
            fontWeight: 400,
          }}
        >
          {practice.title}
          {isAfter && textMarkerN ? <Marker n={textMarkerN} /> : null}
        </h3>
      ) : (
        <h4
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-xl)",
            lineHeight: "var(--stp-leading-snug)",
            letterSpacing: "var(--stp-tracking-tight)",
            color: colors.textPrimary,
            margin: "0 0 var(--stp-space-3) 0",
            fontWeight: 400,
          }}
        >
          {practice.title}
          {isAfter && textMarkerN ? <Marker n={textMarkerN} /> : null}
        </h4>
      )}
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-base)",
          lineHeight: "var(--stp-leading-base)",
          color: colors.textMuted,
          margin: 0,
        }}
      >
        {practice.description}
        {isAfter && surfaceMarkerN ? <Marker n={surfaceMarkerN} /> : null}
      </p>
    </>
  );

  return isAfter ? (
    <StillpointCard style={cardStyle}>{inner}</StillpointCard>
  ) : (
    <div style={cardStyle}>{inner}</div>
  );
}
