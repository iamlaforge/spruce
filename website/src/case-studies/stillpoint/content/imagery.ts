/**
 * Stillpoint imagery registry.
 *
 * The moodboard image lives in `public/case-studies/stillpoint/moodboard.png`
 * (Next.js serves files in `public/` from the root URL, so the public path
 * resolves at runtime). This registry exports the structured metadata —
 * path, alt text, dimensions, caption — so consumers in the catalog or
 * case-study writeup import a typed reference rather than handling the
 * raw path.
 *
 * The moodboard is what /sketch would produce as the visual reference
 * artifact for Stillpoint when the harness supports image generation.
 * Even when image generation isn't available, /sketch always writes the
 * textual .sketch.md (`content/sketch.ts`) describing the same direction.
 */

export const stillpointMoodboard = {
  /** Public URL path. Use directly in next/image src. */
  src: "/case-studies/stillpoint/moodboard.png",
  /** Native dimensions of the source PNG. */
  width: 1448,
  height: 1086,
  alt:
    "Stillpoint moodboard — brand foundations, logo, color palette, typography, iconography, imagery direction, and product UI on a single editorial spread.",
  caption:
    "Stillpoint visual direction — humanist sans paired with an editorial serif, warm-neutral palette anchored by sage and deep indigo with restrained lavender and peach accents, line iconography, paper-like surfaces, and real-life imagery.",
} as const;
