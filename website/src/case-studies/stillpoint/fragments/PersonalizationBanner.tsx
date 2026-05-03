"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointLink } from "../components/StillpointLink";
import { PRACTICES } from "../content/practices";

/**
 * Stillpoint personalization banner — output of /decide.
 *
 * Sits above the practices grid on the home page. The recommendation
 * adapts to the visitor's local time of day (read on mount via
 * Date().getHours()) and points to the matching practice in the
 * library:
 *
 *   - Morning band (5–11): Morning Grounding
 *   - Mid-day band  (11–17): Mid-day Reset
 *   - Evening band  (17–5): Evening Wind-down
 *
 * The Begin practice CTA is a Next.js Link to the recommended
 * practice's detail page at /case-study/practice/[slug].
 *
 * SSR renders the evening band as the default (the band hardcoded by
 * /design's first pass before /fortify added the time-of-day
 * adaptation), and the client updates after mount if the visitor's
 * actual band differs. There's a brief content shift on the heading +
 * CTA destination during hydration; acceptable trade for keeping the
 * server render deterministic.
 *
 * The `forceBand` prop overrides time detection — used by DecideDemo
 * to lock the banner to "evening" so the demo's narrative payoff
 * (the Evening Wind-down recommendation that /decide built toward)
 * doesn't change with the visitor's local time.
 *
 * Imported by both `fragments/Home.tsx` (the live Stillpoint site) and
 * `components/commands/DecideDemo.tsx` (the catalog payoff). One source
 * of truth — what /decide produced lives in the actual site build, not
 * just in the demo.
 *
 * Wraps inside the parent's <StillpointScope>; doesn't apply its own
 * scope so it can render inside any Stillpoint surface that already
 * has the scope established.
 */

type Band = "morning" | "midday" | "evening";

function getBand(hour: number): Band {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "midday";
  return "evening";
}

const RECOMMENDATIONS: Record<
  Band,
  { eyebrow: string; intro: string; practiceSlug: string }
> = {
  morning: {
    eyebrow: "For this morning",
    intro: "It’s morning — start the day with",
    practiceSlug: "morning-grounding",
  },
  midday: {
    eyebrow: "Mid-day moment",
    intro: "Take a pause with",
    practiceSlug: "mid-day-reset",
  },
  evening: {
    eyebrow: "For tonight",
    intro: "It’s evening — let the day settle with",
    practiceSlug: "evening-wind-down",
  },
};

const CONTAINER_STYLE: CSSProperties = {
  // Sage to warmth gradient. The end color is theme-switching:
  // peach in light (sunset character against the warm-cream surface),
  // lavender in dark (cooler warmth accent that holds its own against
  // the deep indigo bg). See tokens/stillpoint.css for the override.
  background:
    "linear-gradient(135deg, var(--stp-color-sage-subtle) 0%, var(--stp-color-banner-gradient-end) 100%)",
  border: "1px solid var(--stp-color-sage)",
  borderRadius: "var(--stp-radius-md)",
  padding: "var(--stp-space-6)",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--stp-space-5)",
};

export function PersonalizationBanner({
  forceBand,
}: {
  /**
   * Override time-of-day detection. Used by DecideDemo to lock the
   * banner to a specific band so the demo's narrative stays consistent
   * regardless of when a visitor lands on the demo.
   */
  forceBand?: Band;
} = {}) {
  // Default to 'evening' for SSR; useEffect updates after mount.
  const [band, setBand] = useState<Band>(forceBand ?? "evening");

  useEffect(() => {
    if (forceBand) return; // forced; don't auto-detect
    setBand(getBand(new Date().getHours()));
  }, [forceBand]);

  const recommendation = RECOMMENDATIONS[band];
  const practice = PRACTICES.find(
    (p) => p.slug === recommendation.practiceSlug,
  )!;

  return (
    <div style={CONTAINER_STYLE}>
      <div style={{ flex: "1 1 280px", minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--stp-tracking-wide)",
            fontWeight: 500,
            color: "var(--stp-color-sage)",
            margin: "0 0 var(--stp-space-2) 0",
          }}
        >
          {recommendation.eyebrow}
        </p>
        <p
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-xl)",
            lineHeight: "var(--stp-leading-snug)",
            color: "var(--stp-color-text)",
            margin: "0 0 var(--stp-space-2) 0",
            letterSpacing: "var(--stp-tracking-tight)",
          }}
        >
          {recommendation.intro} <em>{practice.title}</em>.
        </p>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-sm)",
            color: "var(--stp-color-text-muted)",
            margin: 0,
          }}
        >
          {practice.duration}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--stp-space-3)",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link
          href={`/case-study/practice/${practice.slug}`}
          style={{ textDecoration: "none" }}
        >
          <StillpointButton variant="primary">Begin practice</StillpointButton>
        </Link>
        <StillpointLink href="#practices">Suggest a different one</StillpointLink>
      </div>
    </div>
  );
}
