"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { DURATION, EASE_CONSIDERED, MARKER_SPRING } from "@/lib/motion";
import { SpecimenFrame } from "./DemoFrame";
import { StillpointHome } from "@/src/case-studies/stillpoint/fragments/Home";
import { StillpointHomeLetter } from "@/src/case-studies/stillpoint/fragments/HomeLetter";
import { StillpointHomeRitual } from "@/src/case-studies/stillpoint/fragments/HomeRitual";

/**
 * /remix demo. Three genuinely distinct directions for the Stillpoint
 * home page, all reading from the same context (.spruce.md), the same
 * visual direction (.sketch.md), and the same foundation
 * (tokens/stillpoint.css + the five Stillpoint primitives). The
 * directions differ at a level the same brief permits — page archetype,
 * structural backbone, surface treatment — not in the underlying tokens
 * or character.
 *
 * Catalog narrative position: /remix sits between /design and /decide.
 * /design produced the first-pass home (Direction 1); /remix surfaces
 * two genuinely distinct alternatives the same context could have
 * produced. The visitor picks the direction that resonates, then uses
 * /decide to ideate adjustments on top of it.
 *
 * Tabbed selector at the top lets the visitor flip between v1 / v2 / v3.
 * One direction renders at a time; tab strip uses the same
 * shared-layout marker as the home page Install and Terminal sections
 * for visual coherence.
 *
 * The three directions:
 *   v1 · Editorial — the magazine-style spread (current Home.tsx)
 *   v2 · Letter    — single-column narrative, no grids, no cards
 *   v3 · Ritual    — three time-of-day chapters as the page's spine
 */

type Variant = "editorial" | "letter" | "ritual";

const VARIANTS: Array<{
  key: Variant;
  version: string;
  label: string;
  description: string;
}> = [
  {
    key: "editorial",
    version: "v1",
    label: "Editorial",
    description:
      "Magazine-style spread. Hero with photo, three-card practices grid, numbered how-it-works steps, editorial pull quote, signup. Content-forward, generous spacing.",
  },
  {
    key: "letter",
    version: "v2",
    label: "Letter",
    description:
      "Single-column narrative scroll. No grids, no cards — pure typography flowing top to bottom. A pull quote and a single still-life interlude break the rhythm. Maximum editorial restraint.",
  },
  {
    key: "ritual",
    version: "v3",
    label: "Ritual",
    description:
      "Three chapters: morning, mid-day, evening. Each is a full editorial block with its own image and tinted background. Time-of-day is the structural backbone.",
  },
];

export function RemixDemo() {
  const [active, setActive] = useState<Variant>("editorial");
  const activeVariant = VARIANTS.find((v) => v.key === active) ?? VARIANTS[0];

  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/remix · Stillpoint home"
      caption="Three genuinely distinct directions /remix produced for the Stillpoint home page. All read from the same context, sketch, and foundation — the differences sit at the level of page archetype, not tokens. Flip between v1, v2, and v3 to see how the same brief commits in different directions."
    >
      {/* Tab strip — version selector */}
      <div
        role="tablist"
        aria-label="Remix variants"
        className="flex items-center gap-6 md:gap-8 border-b border-rule mb-6 md:mb-8"
      >
        <LayoutGroup>
          {VARIANTS.map((v) => (
            <VariantTab
              key={v.key}
              variantKey={v.key}
              version={v.version}
              label={v.label}
              isActive={active === v.key}
              onClick={() => setActive(v.key)}
            />
          ))}
        </LayoutGroup>
      </div>

      {/* Active variant description — small editorial line under the tab
          strip naming what visitors are about to see */}
      <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty max-w-prose mb-6 md:mb-8">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent mr-2">
          {activeVariant.version} · {activeVariant.label}
        </span>
        {activeVariant.description}
      </p>

      {/* Active variant render — full home page rendered inside a
          hairline frame so the catalog reads it as the artifact */}
      <div
        style={{
          border: "1px solid var(--color-rule)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
          >
            {/* applied={['design']} — /remix runs after /design but
                before /decide, so the Editorial direction reflects the
                post-design state without the personalization banner.
                v2 (Letter) and v3 (Ritual) are separate fragments that
                don't render the banner regardless. */}
            {active === "editorial" ? (
              <StillpointHome applied={["design"]} />
            ) : null}
            {active === "letter" ? <StillpointHomeLetter /> : null}
            {active === "ritual" ? <StillpointHomeRitual /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </SpecimenFrame>
  );
}

// ──────────────────────────────────────────────────────────────────────
// VariantTab — version + label tab. Active state gets the accent
// underline via Motion's shared-layout marker so the underline slides
// between tabs as visitors flip variants.
// ──────────────────────────────────────────────────────────────────────

function VariantTab({
  variantKey,
  version,
  label,
  isActive,
  onClick,
}: {
  variantKey: Variant;
  version: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`remix-panel-${variantKey}`}
      id={`remix-tab-${variantKey}`}
      onClick={onClick}
      className={`relative font-mono text-2xs uppercase tracking-widest py-3 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${
        isActive ? "text-accent" : "text-ink-subtle hover:text-ink"
      }`}
    >
      <span className="font-medium">{version}</span>
      <span className="mx-2 text-ink-subtle/60">·</span>
      <span>{label}</span>
      {isActive ? (
        <motion.span
          layoutId="remix-tab-underline"
          aria-hidden
          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
          transition={MARKER_SPRING}
        />
      ) : null}
    </button>
  );
}
