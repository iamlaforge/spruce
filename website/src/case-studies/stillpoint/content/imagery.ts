/**
 * Stillpoint imagery registry.
 *
 * Two exports:
 *   - stillpointMoodboard — the moodboard reference image /sketch
 *     produced. Lives at public/case-studies/stillpoint/moodboard.png.
 *   - stillpointImagery — the photography library /design uses for
 *     hero, accents, and other surfaces. Lives at
 *     public/case-studies/stillpoint/imagery/.
 *
 * Files in `public/` are served from the root URL at runtime, so the
 * `src` paths render directly via next/image without any import. The
 * registry holds the structured metadata (path, native dimensions, alt
 * text, caption) so consumers in the catalog or case-study writeup
 * import a typed reference rather than juggling raw paths.
 *
 * The image set is organized into three groups:
 *   - meditation: real people in real spaces (1:2 portrait, 512×1024)
 *   - stillLife: ceramic, candles, journal, fabric textures (4:3, ~592×443)
 *   - abstract: gradient and geometric compositions (4:3, ~592×444)
 *
 * Captions describe what's pictured plus the imagery role — useful for
 * catalog illustrations that want to label what /sketch's anti-references
 * specifically excluded vs. what /design's hybrid imagery direction
 * embraces.
 */

type ImageEntry = {
  /** Public URL path. Use directly in next/image src. */
  src: string;
  /** Native dimensions of the source PNG. */
  width: number;
  height: number;
  alt: string;
  caption: string;
};

// ───────────────────────────────────────────────────────────────────
// Moodboard — output of /sketch
// ───────────────────────────────────────────────────────────────────

export const stillpointMoodboard = {
  src: "/case-studies/stillpoint/moodboard.png",
  width: 1448,
  height: 1086,
  alt:
    "Stillpoint moodboard — brand foundations, logo, color palette, typography, iconography, imagery direction, and product UI on a single editorial spread.",
  caption:
    "Stillpoint visual direction — humanist sans paired with an editorial serif, warm-neutral palette anchored by sage and deep indigo with restrained lavender and peach accents, line iconography, paper-like surfaces, and real-life imagery.",
} as const;

// ───────────────────────────────────────────────────────────────────
// Imagery library — output of commissioned photography for /design
// ───────────────────────────────────────────────────────────────────

const IMAGERY_BASE = "/case-studies/stillpoint/imagery";

export const stillpointImagery = {
  // Meditation — real people in real spaces. 1:2 portrait orientation.
  meditationIndoor: {
    src: `${IMAGERY_BASE}/stillpoint_meditation_indoor_soft_light.png`,
    width: 512,
    height: 1024,
    alt:
      "A person seated cross-legged on a meditation cushion in a calm interior with soft natural light and a small plant in the background.",
    caption: "Indoor practice in soft natural light.",
  },
  meditationNature: {
    src: `${IMAGERY_BASE}/stillpoint_meditation_nature_view.png`,
    width: 512,
    height: 1024,
    alt:
      "A person seated cross-legged outdoors at golden hour with mountains and a lake in the distance.",
    caption: "Outdoor practice at golden hour.",
  },
  meditationNeutral: {
    src: `${IMAGERY_BASE}/stillpoint_meditation_neutral_space.png`,
    width: 512,
    height: 1024,
    alt: "A person seated in a neutral, minimal space, mid-practice.",
    caption: "Practice in a quiet, neutral interior.",
  },

  // Still life — material moments. 4:3 landscape.
  stillLifeCandle: {
    src: `${IMAGERY_BASE}/stillpoint_stilllife_candle_stones.png`,
    width: 591,
    height: 443,
    alt:
      "A lit candle on a wood surface with a small stack of smooth stones, a ceramic mug, and a sprig of eucalyptus alongside.",
    caption: "Candle, stones, eucalyptus — a moment of presence.",
  },
  stillLifeHeadphones: {
    src: `${IMAGERY_BASE}/stillpoint_stilllife_headphones_fabric.png`,
    width: 592,
    height: 443,
    alt:
      "A pair of over-ear headphones resting on a soft folded fabric in a warm-neutral light.",
    caption: "Headphones on fabric — listening, settling.",
  },
  stillLifeJournal: {
    src: `${IMAGERY_BASE}/stillpoint_stilllife_journal_tea.png`,
    width: 591,
    height: 443,
    alt:
      "A linen-bound journal with a brass pen, a ceramic vase holding a sage sprig, and a small dish with an incense stick on a warm-toned surface.",
    caption: "Journal, vase, incense — quiet morning ritual.",
  },

  // Abstract — gradient and geometric compositions for accent moments.
  abstractGeometric: {
    src: `${IMAGERY_BASE}/stillpoint_abstract_geometric_balance.png`,
    width: 592,
    height: 444,
    alt:
      "An abstract geometric composition — soft balanced shapes in warm-neutral and sage tones.",
    caption: "Abstract geometric — balance.",
  },
  abstractGradient: {
    src: `${IMAGERY_BASE}/stillpoint_abstract_gradient_warm_cool.png`,
    width: 591,
    height: 444,
    alt:
      "An abstract gradient field moving from warm sand and cream into cool sage and lavender.",
    caption: "Abstract gradient — warm-to-cool palette transition.",
  },
  abstractLandscape: {
    src: `${IMAGERY_BASE}/stillpoint_abstract_landscape_layers.png`,
    width: 591,
    height: 444,
    alt:
      "Abstract layered landscape forms in sage, sand, and indigo — soft horizons, no detail.",
    caption: "Abstract landscape — soft layered horizons.",
  },
} as const;

export type StillpointImageKey = keyof typeof stillpointImagery;
