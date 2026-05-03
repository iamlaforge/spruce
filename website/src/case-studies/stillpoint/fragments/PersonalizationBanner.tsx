import type { CSSProperties } from "react";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointLink } from "../components/StillpointLink";

/**
 * Stillpoint personalization banner — output of /decide.
 *
 * Sits above the practices grid on the home page. Reflects the three
 * decisions /decide surfaced and the directions captured for each:
 *
 *   - Placement: banner above grid (chosen over replacing-a-card,
 *     fourth-card-alongside, or inline-within-existing-cards).
 *   - Recognition strategy: time-of-day (chosen over mood-prompt and
 *     continuation; works for first-time + returning visitors equally).
 *   - Copy register: warm-conversational (chosen over direct-functional
 *     and quiet-recommendation; matches the calm, supportive-friend
 *     voice .spruce.md established).
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

const CONTAINER_STYLE: CSSProperties = {
  background:
    "linear-gradient(135deg, var(--stp-color-sage-subtle) 0%, var(--stp-color-lavender-subtle) 100%)",
  border: "1px solid var(--stp-color-sage)",
  borderRadius: "var(--stp-radius-md)",
  padding: "var(--stp-space-6)",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--stp-space-5)",
};

export function PersonalizationBanner() {
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
          For tonight
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
          It&rsquo;s evening &mdash; let the day settle with{" "}
          <em>Evening Wind-down</em>.
        </p>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-sm)",
            color: "var(--stp-color-text-muted)",
            margin: 0,
          }}
        >
          7 min · Body scan
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
        <StillpointButton variant="primary">Begin Practice</StillpointButton>
        <StillpointLink href="#">Suggest a different one</StillpointLink>
      </div>
    </div>
  );
}
