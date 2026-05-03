"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE_CONSIDERED } from "@/lib/motion";

/**
 * /pace demo. Two columns share a drawer interaction — visitors click
 * Open and both drawers slide in simultaneously; click again and both
 * slide out. The two columns differ only in the timing and easing applied
 * to the slide.
 *
 * Why a drawer instead of a card arrival: the longer translate distance
 * makes the linear-vs-curve difference visible, not just felt. A 360ms
 * linear slide reads as mechanical against a 240ms considered slide,
 * which the visitor can trigger as many times as they want via the
 * toggle. Open *and* close both exhibit the timing — /pace's argument
 * (curves communicate motion character) applies to exits too.
 *
 * Continuing the meditation-app context from earlier demos so the drawer
 * content reads as familiar surface rather than abstract UI. The motion
 * is what differs; the content is constant.
 */

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

export function PaceDemo() {
  const [open, setOpen] = useState(false);

  return (
    <figure className="my-10 md:my-12">
      <header className="flex flex-wrap items-center justify-between gap-y-3 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Interactive
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-pressed={open}
          className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {open ? "Close ←" : "Open →"}
        </button>
      </header>

      <div className="border border-rule-subtle bg-surface rounded-md px-5 py-7 md:px-7 md:py-9">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6">
          <Column
            label="AI default"
            sublabel="360ms · linear"
            open={open}
            duration={0.36}
            easing="linear"
          />
          <Column
            label="After /pace"
            sublabel="240ms · ease-considered"
            open={open}
            duration={0.24}
            easing={EASE_CONSIDERED as never}
            isAfter
          />
        </div>
      </div>

      <ol role="list" className="list-none mt-7 md:mt-8 space-y-3 max-w-prose">
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            1
          </span>
          Easing changed from linear to a considered cubic-bezier curve
          (0.4, 0, 0.1, 1). The drawer settles on entry and releases on
          exit — both directions read as character, not as mechanism.
        </li>
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            2
          </span>
          Duration shortened from 360ms to 240ms. Substantial transforms
          land confidently at base register; longer durations read as
          sluggish.
        </li>
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            3
          </span>
          Both motions respect{" "}
          <code className="font-mono text-xs">prefers-reduced-motion</code>.
          When set, the drawer appears in place without travel.
        </li>
      </ol>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Column — one variant of the drawer interaction. Header carries the
// eyebrow (variant name) + sublabel (timing/easing summary). The stage
// below is a clipped surface; the drawer slides in from the right edge.
// Below the drawer's resting position, lightweight skeleton bars stand in
// for the underlying page chrome — enough to read as "drawer over a page"
// without distracting from the motion.
// ---------------------------------------------------------------------------

type ColumnProps = {
  label: string;
  sublabel: string;
  open: boolean;
  duration: number;
  easing: string | readonly number[];
  isAfter?: boolean;
};

function Column({
  label,
  sublabel,
  open,
  duration,
  easing,
  isAfter = false,
}: ColumnProps) {
  return (
    <div>
      <div className="mb-3">
        <p
          className={`font-mono text-2xs uppercase tracking-widest mb-0.5 ${
            isAfter ? "text-accent" : "text-ink-subtle"
          }`}
        >
          {label}
        </p>
        <p className="font-mono text-2xs text-ink-subtle">{sublabel}</p>
      </div>

      {/* Stage — fixed height, clips the drawer when off-canvas. */}
      <div
        className="relative h-[200px] md:h-[220px] overflow-hidden border border-stone-200 rounded-md"
        style={{ backgroundColor: "#FAFAF9" }}
      >
        {/* Page chrome behind the drawer — skeleton bars read as "this is
            the page the drawer overlays" without competing for attention. */}
        <div className="absolute inset-0 p-4 space-y-2.5">
          <div className="h-2 w-1/3 bg-stone-200 rounded-sm" />
          <div className="h-2 w-2/3 bg-stone-200 rounded-sm" />
          <div className="h-2 w-1/2 bg-stone-200 rounded-sm" />
          <div className="h-2 w-3/5 bg-stone-200 rounded-sm" />
        </div>

        {/* Drawer — slides from right edge. Width matches ~78% of stage so
            the underlying page edge stays visible, anchoring the motion as
            "drawer entering" rather than "background swap." */}
        <motion.div
          initial={false}
          animate={{ x: open ? "0%" : "100%" }}
          transition={{ duration, ease: easing as never }}
          className="absolute inset-y-0 right-0 w-[78%] border-l border-stone-300 px-3.5 py-4 bg-white shadow-[-4px_0_12px_-6px_rgba(0,0,0,0.08)]"
        >
          <p
            className="font-mono text-2xs uppercase tracking-widest text-stone-500 mb-2"
            style={{ fontFamily: SOURCE_SANS }}
          >
            Tonight
          </p>
          <h4
            className="text-base text-stone-900 leading-tight tracking-tight mb-2"
            style={{ fontFamily: LORA }}
          >
            Evening practice
          </h4>
          <p
            className="text-xs text-stone-700 leading-snug mb-3"
            style={{ fontFamily: SOURCE_SANS }}
          >
            Five minutes of guided breath.
          </p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-stone-100 rounded-sm" />
            <div className="h-1.5 w-4/5 bg-stone-100 rounded-sm" />
            <div className="h-1.5 w-3/5 bg-stone-100 rounded-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
