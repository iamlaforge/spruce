import { SpecimenFrame } from "./DemoFrame";
import { StillpointHome } from "@/src/case-studies/stillpoint/fragments/Home";

/**
 * /design demo. Renders the actual Stillpoint home page that /design
 * generated, composing the foundation's tokens and primitives into a
 * complete marketing surface.
 *
 * The fragment lives at src/case-studies/stillpoint/fragments/Home.tsx.
 * This component is a thin specimen wrapper — the real artifact is the
 * Home fragment itself, rendered inline so visitors see the actual page
 * /design produced rather than a curated excerpt.
 *
 * The page is /design's first pass: a few intentional rough edges remain
 * — generic CTA copy in the hero and signup, a performative social-proof
 * line in the signup section, a missing apostrophe in one eyebrow, the
 * featured-practices grid leaning into the three-equal-cards pattern the
 * moodboard's anti-references warned against. These will be addressed
 * by subsequent commands in the catalog narrative (/voice, /typeface,
 * /critique, /refine) so visitors can see the loop apply to a real
 * artifact.
 */

export function DesignDemo() {
  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/design · Stillpoint home"
      caption="The Stillpoint home page /design generated, composing the foundation's tokens and primitives into a complete marketing surface. Subsequent corrective commands in the catalog refine specific layers without rebuilding the page."
    >
      <div
        // Hairline frame around the fragment so the catalog page reads it
        // as the artifact, not as the page chrome. The fragment renders
        // its own self-contained Stillpoint scope inside.
        style={{
          border: "1px solid var(--color-rule)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* applied={['design']} — show the post-design, pre-decide
            state. The personalization banner /decide later produces
            doesn't render here; visitors see what /design specifically
            generated, not the cumulative home with later modifications. */}
        <StillpointHome applied={["design"]} />
      </div>
    </SpecimenFrame>
  );
}
