"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  DURATION,
  EASE_CONSIDERED,
  MARKER_SPRING,
} from "@/lib/motion";
import {
  stillpointSketch,
  stillpointSketchMarkdown,
} from "@/src/case-studies/stillpoint/content/sketch";
import { stillpointMoodboard } from "@/src/case-studies/stillpoint/content/imagery";
import { SpecimenFrame } from "./DemoFrame";

/**
 * /sketch demonstration.
 *
 * Layout: stacked, payoffs first.
 *   1. Tabbed payoffs at the top — Moodboard (default tab) and .sketch.md.
 *      The moodboard is /sketch's most distinctive output and gets full
 *      width to read as a centerpiece. The .sketch.md tab shows the
 *      persistent textual artifact /foundations reads from.
 *   2. Dimensions list below — eight rows, each showing the dimension
 *      label plus a small character cue at all times. Click any row to
 *      expand the direction prose. Single-accordion behavior (clicking
 *      another row closes the active one) keeps the reading focus tight.
 *
 * Worked example: Stillpoint, the meditation-app case study threaded
 * through the catalog. The cues communicate /sketch's character calls
 * (typeface character, color families, motion bands, layout archetypes)
 * without committing to specific tokens — that's /foundations' job.
 */

type DimensionKey = keyof typeof stillpointSketch;

type Dimension = {
  key: DimensionKey;
  label: string;
  text: string;
  cue: React.ReactNode;
};

// Stillpoint palette — character representations approximated from the
// moodboard so the cue can render visible swatches. These hex values are
// NOT the canonical tokens — /foundations picks specific OKLCH values
// when it codifies the palette character /sketch established. They live
// inline (not in tokens) because they're case-study material that never
// escapes this demo, and because /sketch's job is character not values.
const STILLPOINT_PALETTE: Array<{ name: string; hex: string }> = [
  { name: "Cream", hex: "#F5EFE6" },
  { name: "Sand", hex: "#E8DDC8" },
  { name: "Sage", hex: "#A8B69A" },
  { name: "Indigo", hex: "#2D3A4F" },
  { name: "Lavender", hex: "#C9B8D4" },
  { name: "Peach", hex: "#E8B594" },
];

const DIMENSIONS: Dimension[] = [
  {
    key: "referenceImagery",
    label: "Reference imagery",
    text: stillpointSketch.referenceImagery,
    cue: <ReferenceImageryCue />,
  },
  {
    key: "typography",
    label: "Typography",
    text: stillpointSketch.typography,
    cue: <TypographyCue />,
  },
  {
    key: "color",
    label: "Color",
    text: stillpointSketch.color,
    cue: <ColorCue />,
  },
  {
    key: "textureAndMaterial",
    label: "Texture and material",
    text: stillpointSketch.textureAndMaterial,
    cue: <TextureCue />,
  },
  {
    key: "iconography",
    label: "Iconography",
    text: stillpointSketch.iconography,
    cue: <IconographyCue />,
  },
  {
    key: "layoutArchetypes",
    label: "Layout archetypes",
    text: stillpointSketch.layoutArchetypes,
    cue: <LayoutCue />,
  },
  {
    key: "motion",
    label: "Motion",
    text: stillpointSketch.motion,
    cue: <MotionCue />,
  },
  {
    key: "antiReferences",
    label: "Anti-references",
    text: stillpointSketch.antiReferences,
    cue: <AntiReferencesCue />,
  },
];

type PayoffTab = "moodboard" | "sketch-md";

export function SketchDemo() {
  const [activeTab, setActiveTab] = useState<PayoffTab>("moodboard");
  const [openKey, setOpenKey] = useState<DimensionKey | null>(null);

  return (
    <SpecimenFrame eyebrow="Visual direction" scope="Stillpoint · /sketch output">
      <PayoffSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <DimensionsSection openKey={openKey} setOpenKey={setOpenKey} />
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// PayoffSection — the two artifacts /sketch produces, presented as tabs.
// Moodboard is the default; .sketch.md is the persistent textual artifact
// /foundations reads next. Tab strip uses the same shared-layout marker
// pattern as the Install and Terminal sections on the home page.
// ---------------------------------------------------------------------------

function PayoffSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: PayoffTab;
  setActiveTab: (tab: PayoffTab) => void;
}) {
  return (
    <div className="mb-12 md:mb-14">
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Sketch payoffs"
        className="flex items-center gap-6 md:gap-8 border-b border-rule-subtle mb-6 md:mb-8"
      >
        <LayoutGroup>
          <PayoffTabButton
            label="Moodboard"
            tab="moodboard"
            isActive={activeTab === "moodboard"}
            onClick={() => setActiveTab("moodboard")}
          />
          <PayoffTabButton
            label=".sketch.md"
            tab="sketch-md"
            isActive={activeTab === "sketch-md"}
            onClick={() => setActiveTab("sketch-md")}
          />
        </LayoutGroup>
      </div>

      {/* Panel — swaps content with a fade. mode="wait" so the outgoing
          panel exits before the incoming one enters, preventing
          stack-up during the transition. */}
      <AnimatePresence mode="wait" initial={false}>
        {activeTab === "moodboard" ? (
          <MoodboardPanel key="moodboard" />
        ) : (
          <SketchMdPanel key="sketch-md" />
        )}
      </AnimatePresence>
    </div>
  );
}

function PayoffTabButton({
  label,
  tab,
  isActive,
  onClick,
}: {
  label: string;
  tab: PayoffTab;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`sketch-payoff-${tab}`}
      id={`sketch-payoff-tab-${tab}`}
      onClick={onClick}
      className={`relative font-mono text-2xs uppercase tracking-widest py-3 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${
        isActive ? "text-accent" : "text-ink-subtle hover:text-ink"
      }`}
    >
      {label}
      {isActive ? (
        <motion.span
          layoutId="sketch-payoff-underline"
          aria-hidden
          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
          transition={MARKER_SPRING}
        />
      ) : null}
    </button>
  );
}

function MoodboardPanel() {
  return (
    <motion.div
      role="tabpanel"
      id="sketch-payoff-moodboard"
      aria-labelledby="sketch-payoff-tab-moodboard"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
    >
      <figure className="border border-rule rounded-sm overflow-hidden bg-surface">
        <Image
          src={stillpointMoodboard.src}
          width={stillpointMoodboard.width}
          height={stillpointMoodboard.height}
          alt={stillpointMoodboard.alt}
          sizes="(min-width: 768px) 720px, 100vw"
          className="w-full h-auto"
          priority={false}
        />
      </figure>
      <p className="mt-4 text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose">
        {stillpointMoodboard.caption}
      </p>
    </motion.div>
  );
}

function SketchMdPanel() {
  return (
    <motion.div
      role="tabpanel"
      id="sketch-payoff-sketch-md"
      aria-labelledby="sketch-payoff-tab-sketch-md"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
    >
      <pre className="font-mono text-xs md:text-sm leading-relaxed text-ink border border-rule rounded-sm p-4 md:p-5 overflow-auto max-h-[480px] whitespace-pre-wrap">
        {stillpointSketchMarkdown}
      </pre>
      <p className="mt-4 text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose">
        The persistent textual artifact /sketch always writes, regardless of
        whether the harness can generate imagery. /foundations reads this
        next, picking the specific values that express the character
        captured here.
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// DimensionsSection — the eight visual-direction dimensions /sketch
// reasons across, presented as an expand/collapse list. Each row shows
// the dimension label plus a small character cue at all times; clicking
// reveals the direction prose. Single-accordion behavior — clicking
// another row closes the active one.
// ---------------------------------------------------------------------------

function DimensionsSection({
  openKey,
  setOpenKey,
}: {
  openKey: DimensionKey | null;
  setOpenKey: (key: DimensionKey | null) => void;
}) {
  return (
    <section className="border-t border-rule pt-8 md:pt-10">
      <header className="mb-5 md:mb-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          The breakdown
        </p>
        <p className="text-base md:text-lg text-ink leading-snug text-pretty max-w-prose">
          Eight dimensions of visual direction.{" "}
          <span className="text-ink-muted">
            Each names the character /sketch established for that layer. Tap
            a row to read the direction.
          </span>
        </p>
      </header>

      <ul role="list" className="list-none">
        {DIMENSIONS.map((dim) => (
          <DimensionRow
            key={dim.key}
            dim={dim}
            isOpen={openKey === dim.key}
            onToggle={() => setOpenKey(openKey === dim.key ? null : dim.key)}
          />
        ))}
      </ul>
    </section>
  );
}

function DimensionRow({
  dim,
  isOpen,
  onToggle,
}: {
  dim: Dimension;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `sketch-dim-panel-${dim.key}`;
  const buttonId = `sketch-dim-button-${dim.key}`;

  return (
    <li className="border-t border-rule-subtle last:border-b">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full grid grid-cols-12 gap-x-4 md:gap-x-6 items-center py-4 md:py-5 text-left group transition-colors duration-fast ease-considered hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
      >
        {/* Cue — left gutter, consistent across all rows so they form a
            visible column that signals "/sketch's visual output." */}
        <div className="col-span-4 md:col-span-3 flex items-center">
          {dim.cue}
        </div>
        {/* Label */}
        <div className="col-span-7 md:col-span-8">
          <p
            className={`font-display italic font-normal text-lg md:text-xl leading-snug text-pretty transition-colors duration-fast ease-considered ${
              isOpen ? "text-accent" : "text-ink group-hover:text-accent"
            }`}
          >
            {dim.label}
          </p>
        </div>
        {/* Plus glyph — rotates 45° to read as × when expanded. */}
        <div className="col-span-1 flex justify-end items-center">
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_CONSIDERED }}
            className="font-mono text-lg leading-none text-accent"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded prose — reveals beneath the row, indented past the cue
          column on wider viewports so the prose aligns with the label
          rather than starting at the row's left edge. */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 pb-5 md:pb-6">
              <div className="col-span-12 md:col-start-4 md:col-span-9">
                <p className="text-base text-ink leading-relaxed text-pretty max-w-prose">
                  {dim.text}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Per-dimension cues. Each is a small visual signal of the character
// /sketch established for that dimension. Stylistic restraint — they
// communicate character without competing with the moodboard payoff.
// ---------------------------------------------------------------------------

function ReferenceImageryCue() {
  // Three stacked horizontal slabs in warm earth tones — abstract gesture
  // toward the moodboard's natural-light, organic-texture imagery.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] aspect-[4/3] flex flex-col rounded-sm overflow-hidden border border-rule"
    >
      <div className="flex-1" style={{ backgroundColor: "#E8DDC8" }} />
      <div className="flex-1" style={{ backgroundColor: "#A8B69A" }} />
      <div className="flex-1" style={{ backgroundColor: "#C9B8D4" }} />
    </div>
  );
}

function TypographyCue() {
  // Serif + sans pair labeled by character, not by specific typeface.
  // /sketch establishes "humanist sans + editorial serif" as the
  // direction; /foundations picks the specific faces from the candidates
  // (Söhne / Halyard / Inter Display; Lora / Tiempos / Newsreader).
  // System fonts stand in to show the contrast pattern.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] flex items-baseline gap-3 px-3 py-2 border border-rule rounded-sm bg-surface"
    >
      <div className="flex flex-col items-start">
        <span
          className="text-2xl text-ink leading-none"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        >
          Aa
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mt-1">
          Humanist sans
        </span>
      </div>
      <div className="flex flex-col items-start">
        <span
          className="text-2xl text-ink leading-none"
          style={{ fontFamily: "ui-serif, Georgia, serif" }}
        >
          Aa
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mt-1">
          Editorial serif
        </span>
      </div>
    </div>
  );
}

function ColorCue() {
  // Six approximate swatches representing the palette's character —
  // warm cream / sand / sage / indigo / lavender / peach. /sketch sets
  // the families and accent strategy; /foundations picks the specific
  // OKLCH values within each family.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] flex flex-col gap-1.5"
    >
      <div className="flex gap-1">
        {STILLPOINT_PALETTE.map((swatch) => (
          <span
            key={swatch.name}
            title={swatch.name}
            className="flex-1 aspect-square rounded-sm border border-rule"
            style={{ backgroundColor: swatch.hex }}
          />
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
        Earth tones · restrained accents
      </p>
    </div>
  );
}

function TextureCue() {
  // Soft gradient suggesting paper/ceramic surface — quiet warmth, no
  // gloss. Three stops between cream and sand for subtle variation.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] aspect-[4/3] rounded-sm border border-rule overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5EFE6 0%, #ECE3D2 60%, #E0D3B8 100%)",
      }}
    />
  );
}

function IconographyCue() {
  // Three line-icons at consistent thin stroke, rounded caps — leaf,
  // moon, sun. Representative of meditation-app vocabulary; matches the
  // moodboard's iconography style.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] flex items-center gap-3 px-3 py-3 border border-rule rounded-sm bg-surface"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-ink-muted"
      >
        <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 13-9 0 8-3 13-6 16Z" />
        <path d="M2 22c5-8 9-12 16-15" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-ink-muted"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-ink-muted"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </div>
  );
}

function LayoutCue() {
  // Editorial-spread wireframe — large hero block, text column, two
  // stacked supporting blocks below. Magazine, not dashboard.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] aspect-[4/3] p-2 border border-rule rounded-sm bg-surface flex flex-col gap-1.5"
    >
      <div className="flex gap-1.5 flex-1">
        <div className="flex-[2] bg-ink/10 rounded-[2px]" />
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-1 bg-ink/15 rounded-full w-full" />
          <div className="h-1 bg-ink/15 rounded-full w-4/5" />
          <div className="h-1 bg-ink/15 rounded-full w-3/5" />
        </div>
      </div>
      <div className="flex gap-1.5 h-1/3">
        <div className="flex-1 bg-ink/8 rounded-[2px]" />
        <div className="flex-1 bg-ink/8 rounded-[2px]" />
      </div>
    </div>
  );
}

function MotionCue() {
  // Mono-caps tag with the timing band /sketch is naming. /foundations
  // commits to specific durations within this band.
  return (
    <div
      aria-hidden
      className="w-full max-w-[140px] flex flex-col gap-2 px-3 py-3 border border-rule rounded-sm bg-surface"
    >
      <span className="font-mono text-2xs uppercase tracking-widest text-ink leading-snug">
        300 – 500 ms
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle leading-snug">
        ease-out · settled
      </span>
    </div>
  );
}

function AntiReferencesCue() {
  // Three struck-through tokens — visual shorthand for "not this." Names
  // the categories /sketch is steering away from.
  return (
    <ul
      aria-hidden
      className="w-full max-w-[140px] flex flex-col gap-1.5 px-3 py-2 border border-rule rounded-sm bg-surface text-[10px] font-mono uppercase tracking-widest text-ink-subtle"
    >
      <li className="line-through">SaaS purple</li>
      <li className="line-through">Wellness stock</li>
      <li className="line-through">Loud gradients</li>
    </ul>
  );
}
