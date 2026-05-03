/**
 * Motion tokens for Motion (Framer Motion) components. Mirrors the CSS
 * duration + easing tokens in globals.css so JS-driven motion and CSS-driven
 * motion stay in sync.
 *
 * Why this file exists: before /pace, every motion component embedded the
 * same `[0.4, 0, 0.1, 1]` easing array and ad hoc duration numbers (0.22,
 * 0.26, 0.32, 0.42). The values matched the CSS tokens by accident, not by
 * reference. A single source of truth makes the motion character a property
 * of the system rather than a coincidence across files.
 */

// Easing curve — matches `--ease-considered` in globals.css. Strong
// deceleration with a gentle start; arrivals feel settled, not snappy.
export const EASE_CONSIDERED: [number, number, number, number] = [0.4, 0, 0.1, 1];

// Durations in seconds (Motion expects seconds; CSS tokens are in ms).
// Names mirror the CSS tokens: --duration-fast, --duration-base, etc.
export const DURATION = {
  fast: 0.16,
  base: 0.24,
  slow: 0.42,
  slower: 0.68,
} as const;

// Spring physics for shared-layout markers — the em-dash that slides between
// active commands in the /commands sidebar, accent underlines on tab strips,
// the before/after toggle. High stiffness + strong damping + lightly heavy
// mass produces a confident landing without overshoot, which is what
// "considered" looks like in a spring.
export const MARKER_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

// Common transition presets. Use these directly on motion components when
// the timing matches the standard register; reach for explicit values only
// when the moment genuinely warrants something off-system.

/** Standard fade — small property changes, content swaps. */
export const FADE = {
  duration: DURATION.base,
  ease: EASE_CONSIDERED,
} as const;

/** Structural layout shifts — FLIP animations on element-level diffs. */
export const LAYOUT_FLIP = {
  duration: DURATION.slow,
  ease: EASE_CONSIDERED,
} as const;

/** Payoff entries — the moment a stepped demo lands its resolution. */
export const PAYOFF = {
  duration: DURATION.slow,
  ease: EASE_CONSIDERED,
} as const;
