"use client";

/**
 * Stillpoint theme toggle — a quiet sun/moon icon button that lives in
 * the Stillpoint nav. Renders the moon when current theme is light (the
 * icon represents the destination, not the current state), the sun when
 * current theme is dark.
 *
 * The component is presentational only — parent (typically /case-study)
 * owns the theme state and toggle handler. Visual styling lives in
 * tokens/stillpoint.css under .stp-theme-toggle so the button picks up
 * Stillpoint's color tokens automatically across light/dark.
 */

export function StillpointThemeToggle({
  theme,
  onToggle,
}: {
  /** Current rendered theme — drives which icon shows. */
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const showsMoon = theme === "light";
  const label = showsMoon ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="stp-theme-toggle"
    >
      {showsMoon ? <MoonGlyph /> : <SunGlyph />}
    </button>
  );
}

const GLYPH_SIZE = 18;

const glyphProps = {
  width: GLYPH_SIZE,
  height: GLYPH_SIZE,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function MoonGlyph() {
  return (
    <svg {...glyphProps} aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunGlyph() {
  return (
    <svg {...glyphProps} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
