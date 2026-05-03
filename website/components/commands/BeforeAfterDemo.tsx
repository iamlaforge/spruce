"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { FADE, MARKER_SPRING } from "@/lib/motion";

/**
 * Shared shell for the per-command before/after demonstrations.
 *
 * Each command-specific demo (TypographyDemo, ColorgradeDemo, etc.) supplies:
 *   - the after-tab label (e.g. "After /typeface")
 *   - a "before" artifact rendered in the AI-default state
 *   - an "after" artifact with inline numbered <Marker n={...} /> components
 *   - an annotations array mapping each marker number to its description
 *
 * The shell handles the toggle strip, card stage, and annotation legend
 * below the card. Markers and legend appear only on the "after" view.
 *
 * Motion notes:
 *   - The toggle underline glides between tabs via shared layoutId.
 *   - The artifact crossfades between states (~260ms) — true per-element
 *     diffing belongs in the home-page pinned demo where it carries the
 *     argument; here, a calm crossfade respects the editorial register
 *     without per-demo morphing logic.
 *   - Annotations stagger in when the "after" view appears, drawing the
 *     visitor's eye through the changes in order.
 */

export type Annotation = { n: number; text: string };

type Props = {
  afterLabel: string;
  before: ReactNode;
  after: ReactNode;
  annotations: Annotation[];
};

type View = "before" | "after";

export function BeforeAfterDemo({
  afterLabel,
  before,
  after,
  annotations,
}: Props) {
  const [view, setView] = useState<View>("before");

  return (
    <figure className="my-10 md:my-12">
      <header className="flex flex-wrap items-center justify-between gap-y-3 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Interactive
        </p>
        <ToggleStrip
          view={view}
          onChange={setView}
          afterLabel={afterLabel}
        />
      </header>

      {/* Card stage — bordered surface that visually contains the demo
          card. AnimatePresence with mode="wait" sequences the exit of the
          previous artifact before the next one enters; the brief gap reads
          as a deliberate transition rather than a sloppy crossfade. */}
      <div className="border border-rule-subtle bg-surface rounded-md px-7 py-8 md:px-9 md:py-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
          >
            {view === "before" ? before : after}
          </motion.div>
        </AnimatePresence>
      </div>

      {view === "after" ? (
        <ol role="list" className="list-none mt-7 md:mt-8 space-y-3 max-w-prose">
          {annotations.map((a) => (
            <li
              key={a.n}
              className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
              >
                {a.n}
              </span>
              {a.text}
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Marker — small accent-colored superscript number rendered inline next to
// the changed element on the "after" artifact. Pairs with the legend below.
// ---------------------------------------------------------------------------

export function Marker({ n }: { n: number }) {
  return (
    <sup aria-hidden className="ml-1 font-mono text-2xs text-accent">
      {n}
    </sup>
  );
}

// ---------------------------------------------------------------------------
// Toggle — editorial 2-tab strip. The accent underline is a shared-layout
// motion span so it slides between tabs, matching the home-page TabStrip
// vocabulary.
// ---------------------------------------------------------------------------

function ToggleStrip({
  view,
  onChange,
  afterLabel,
}: {
  view: View;
  onChange: (v: View) => void;
  afterLabel: string;
}) {
  const tabs: Array<[View, string]> = [
    ["before", "AI default"],
    ["after", afterLabel],
  ];
  return (
    <div
      role="tablist"
      aria-label="Demo state"
      className="inline-flex gap-x-5 border-b border-rule-subtle"
    >
      <LayoutGroup>
        {tabs.map(([v, label]) => {
          const active = view === v;
          return (
            <button
              key={v}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => onChange(v)}
              className={`relative font-mono text-2xs uppercase tracking-widest pb-2 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered ${
                active ? "text-accent" : "text-ink-subtle hover:text-ink"
              }`}
            >
              {label}
              {active ? (
                <motion.span
                  layoutId="before-after-toggle-underline"
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                  transition={MARKER_SPRING}
                />
              ) : null}
            </button>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
