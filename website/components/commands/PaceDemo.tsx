"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";

/**
 * /pace demo. Two columns share a drawer interaction — visitors click
 * Open and both drawers slide in simultaneously; click again and both
 * slide out. The two columns differ only in the timing and easing
 * applied to the slide.
 *
 * Why a drawer instead of a card arrival: the longer translate distance
 * makes the linear-vs-curve difference visible, not just felt. A 360ms
 * linear slide reads as mechanical against a 240ms considered slide,
 * which the visitor can trigger as many times as they want via the
 * toggle. Open *and* close both exhibit the timing — /pace's argument
 * (curves communicate motion character) applies to exits too.
 *
 * The drawer surfaces and content render inside StillpointScope so the
 * stage backgrounds, borders, drawer card, typography, and accent all
 * pull from --stp-* tokens — and therefore cascade with Spruce's theme
 * toggle the same way every other Stillpoint-grounded demo does.
 *
 * The figure frame (header eyebrow, Open/Close trigger button, the
 * outer card stage's bg-surface, the annotations list) stays in Spruce
 * styling — those are catalog meta, not part of the Stillpoint surface
 * being demonstrated.
 */

const STP_FONT_SANS = "var(--stp-font-sans)";
const STP_FONT_SERIF = "var(--stp-font-serif)";

export function PaceDemo() {
  const [open, setOpen] = useState(false);

  return (
    <figure className="my-10 md:my-12 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
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

      <div className="border border-rule-subtle bg-surface rounded-md px-8 py-10 md:px-14 md:py-14">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6">
          <Column
            label="Before /pace"
            sublabel="200ms · linear"
            open={open}
            duration={0.2}
            easing="linear"
          />
          <Column
            label="After /pace"
            sublabel="320ms · ease-out"
            open={open}
            duration={0.32}
            easing={[0.16, 1, 0.3, 1]}
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
          Easing changed from linear to Stillpoint&rsquo;s --stp-ease-out
          (cubic-bezier(0.16, 1, 0.3, 1)) — strong deceleration matching
          the calm, settled product. Linear reads as mechanical; ease-out
          decelerates into rest, which reads as calm.
        </li>
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            2
          </span>
          Duration shifted from 200ms to Stillpoint&rsquo;s
          --stp-duration-base (320ms). The faster AI default is snappy
          and reactive; the calibrated 320ms gives the motion time to
          feel deliberate rather than dismissive.
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
          When set, the drawer appears in place without travel
          (.stillpoint primitives honor the system pref via
          tokens/stillpoint.css).
        </li>
      </ol>

      {/* Demo note — Stillpoint's home doesn't include a drawer pattern;
          this demo illustrates /pace's principle on a related abstraction.
          The motion tokens shown are the actual values used by .stp-card
          --interactive on the practices grid that ships at /case-study. */}
      <div className="border-t border-rule-subtle mt-7 md:mt-8 pt-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          On Stillpoint
        </p>
        <p className="text-sm text-ink-muted leading-snug max-w-prose text-pretty">
          Stillpoint&rsquo;s home doesn&rsquo;t include a drawer pattern —
          this demo illustrates /pace&rsquo;s principle on a related
          abstraction. The motion tokens in the after column (320ms ·
          ease-out) are the actual values wired into{" "}
          <code className="font-mono text-xs">.stp-card--interactive</code>{" "}
          on the practices grid that ships at /case-study; /pace&rsquo;s
          work on Stillpoint is verification, not incremental change.
        </p>
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Column — one variant of the drawer interaction. Header carries the
// eyebrow (variant name) + sublabel (timing/easing summary) in Spruce
// mono so it reads as catalog meta. The stage below sits inside a
// StillpointScope so its surface, borders, drawer, and typography all
// pull from --stp-* tokens and follow the theme cascade.
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

      {/* Stillpoint surface — the stage where the drawer animates. The
          stage's bg, border, page-chrome bars, and drawer all pull from
          --stp-* tokens, so the entire surface responds to Spruce's
          theme toggle. */}
      <StillpointScope>
        <div
          className="relative h-[200px] md:h-[220px] overflow-hidden rounded-md"
          style={{
            background: "var(--stp-color-bg)",
            border: "1px solid var(--stp-color-border)",
          }}
        >
          {/* Page chrome behind the drawer — abstract bars representing the
              underlying page content, tinted to read as Stillpoint surface. */}
          <div className="absolute inset-0 p-4 space-y-2.5">
            <Bar width="33%" />
            <Bar width="66%" />
            <Bar width="50%" />
            <Bar width="60%" />
          </div>

          {/* Drawer — slides from right edge. Width matches ~78% of stage so
              the underlying page edge stays visible, anchoring the motion as
              "drawer entering" rather than "background swap." */}
          <motion.div
            initial={false}
            animate={{ x: open ? "0%" : "100%" }}
            transition={{ duration, ease: easing as never }}
            className="absolute inset-y-0 right-0 w-[78%] px-4 py-4"
            style={{
              background: "var(--stp-color-surface-elevated)",
              borderLeft: "1px solid var(--stp-color-border)",
              boxShadow:
                "-4px 0 12px -2px oklch(28% 0.060 270 / 0.10)",
            }}
          >
            <p
              style={{
                fontFamily: STP_FONT_SANS,
                fontSize: "var(--stp-text-xs)",
                textTransform: "uppercase",
                letterSpacing: "var(--stp-tracking-wide)",
                fontWeight: 500,
                color: "var(--stp-color-sage)",
                margin: "0 0 var(--stp-space-2) 0",
              }}
            >
              Tonight
            </p>
            <h4
              style={{
                fontFamily: STP_FONT_SERIF,
                fontSize: "var(--stp-text-base)",
                lineHeight: "var(--stp-leading-snug)",
                letterSpacing: "var(--stp-tracking-tight)",
                color: "var(--stp-color-text)",
                margin: "0 0 var(--stp-space-2) 0",
                fontWeight: 400,
              }}
            >
              Evening Wind-down
            </h4>
            <p
              style={{
                fontFamily: STP_FONT_SANS,
                fontSize: "var(--stp-text-xs)",
                lineHeight: "var(--stp-leading-snug)",
                color: "var(--stp-color-text-muted)",
                margin: "0 0 var(--stp-space-3) 0",
              }}
            >
              Let the day settle. Seven minutes of body scan.
            </p>
            <div className="space-y-1.5">
              <Bar width="100%" subtle />
              <Bar width="80%" subtle />
              <Bar width="60%" subtle />
            </div>
          </motion.div>
        </div>
      </StillpointScope>
    </div>
  );
}

// Abstract horizontal bar — used for page-chrome skeleton and for the
// drawer's content list. Stillpoint-tinted so it tracks the theme.
function Bar({ width, subtle = false }: { width: string; subtle?: boolean }) {
  return (
    <div
      style={{
        height: subtle ? 6 : 8,
        width,
        borderRadius: 2,
        background: subtle
          ? "var(--stp-color-border)"
          : "var(--stp-color-border-strong)",
        opacity: subtle ? 0.6 : 0.7,
      }}
    />
  );
}
