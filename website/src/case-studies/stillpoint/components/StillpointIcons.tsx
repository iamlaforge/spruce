import type { SVGProps } from "react";

/**
 * Stillpoint iconography — output of /design's imagery decisions.
 *
 * Six custom-drawn line icons matching the moodboard's character:
 * line-based, rounded corners, consistent thin stroke (1.5px),
 * humanist warmth without sharp geometric edges.
 *
 * The set covers the home page's two iconography moments:
 *   - Practice categories (sun-rising / wave / moon) — natural-day theme
 *     paired with the three featured practices (morning / midday /
 *     evening).
 *   - How-it-works steps (list / leaf / settled) — botanical-growing
 *     theme paired with the three steps (pick / settle / let it land).
 *
 * Custom inline SVG was chosen over a library (Lucide, Phosphor) for
 * exact moodboard-character fidelity at the small surface area the
 * home page needs. If Stillpoint's surface grows beyond what custom
 * can sustain, we can adopt a library later — the API here matches
 * the lucide-react shape so the swap is trivial.
 *
 * Usage:
 *   <SunRisingIcon className="..." size={24} />
 *
 * Inherits color via `currentColor` — apply `color: var(--stp-color-sage)`
 * (or any token) on the parent to set the stroke.
 */

type IconProps = {
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height">;

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

// ───────────────────────────────────────────────────────────────────
// Practice category icons — natural-day theme
// ───────────────────────────────────────────────────────────────────

/** Sun rising over a horizon — for the Morning Grounding practice. */
export function SunRisingIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <path d="M3 18h18" />
      <path d="M6 18a6 6 0 0 1 12 0" />
      <path d="M12 5v3" />
      <path d="M5.5 8.5l1.5 1.5" />
      <path d="M18.5 8.5l-1.5 1.5" />
    </svg>
  );
}

/** Two soft horizontal waves — for the Mid-day Reset practice (calm breath). */
export function WaveIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  );
}

/** Crescent moon — for the Evening Wind-down practice. */
export function MoonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────
// How-it-works step icons — botanical-growing theme
// ───────────────────────────────────────────────────────────────────

/** Three horizontal lines with bullet dots — for "Pick a practice" (browsing). */
export function ListIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <line x1="9" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="9" y1="18" x2="21" y2="18" />
      <circle cx="4.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="4.5" cy="12" r="0.75" fill="currentColor" />
      <circle cx="4.5" cy="18" r="0.75" fill="currentColor" />
    </svg>
  );
}

/** Simple leaf with vein — for "Settle in" (becoming present). */
export function LeafIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 13-9 0 8-3 13-6 16Z" />
      <path d="M2 22c5-8 9-12 16-15" />
    </svg>
  );
}

/** Small circle resting on a horizon — for "Let it land" (settled, integrated). */
export function SettledIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      <path d="M3 18h18" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  );
}
