"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CodeBlock } from "@/components/CodeBlock";
import { FADE, MARKER_SPRING } from "@/lib/motion";
import { SurfaceDashboard, type Phase } from "./SurfaceDashboard";
import { SurfacePricing } from "./SurfacePricing";
import { SurfaceSettings } from "./SurfaceSettings";

type SurfaceId = "dashboard" | "pricing" | "settings";

const surfaces: Array<{ id: SurfaceId; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "pricing", label: "Pricing" },
  { id: "settings", label: "Settings" },
];

const phaseInfo: Array<{ command: string | null; description: string }> = [
  { command: null, description: "AI default" },
  { command: "/arrange", description: "Spatial discipline" },
  { command: "/typeface", description: "Typography swapped" },
  { command: "/colorgrade", description: "Colors swapped" },
  { command: "/reduce", description: "Excess stripped" },
  { command: "/refine", description: "Components disciplined" },
];

const PHASE_COUNT = phaseInfo.length;

/**
 * Master demonstration preview. Holds the selected surface; renders two
 * variants in parallel and shows the right one based on viewport via Tailwind
 * responsive classes. Desktop derives phase from scroll position within a
 * tall pin track; mobile derives phase from a tap-through stepper.
 */
export function DemonstrationPreview() {
  const [surfaceId, setSurfaceId] = useState<SurfaceId>("dashboard");

  return (
    <>
      {/* Desktop — scroll-pinned. Motion-reduce fallback was attempted via
          stacked variants (lg:motion-safe:block) but appears to break the
          desktop pin entirely. Reverting to plain breakpoint logic; a
          motion-reduce fallback will need a different mechanism (e.g., JS
          detection via window.matchMedia) when revisited. */}
      <div className="hidden lg:block">
        <PinnedDemo surfaceId={surfaceId} onSurfaceChange={setSurfaceId} />
      </div>
      <div className="lg:hidden">
        <SteppedDemo surfaceId={surfaceId} onSurfaceChange={setSurfaceId} />
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Desktop: scroll-pinned demo
// ---------------------------------------------------------------------------

type PinnedDemoProps = {
  surfaceId: SurfaceId;
  onSurfaceChange: (id: SurfaceId) => void;
};

function PinnedDemo({ surfaceId, onSurfaceChange }: PinnedDemoProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = usePinScrollProgress(trackRef);
  const phase = Math.min(PHASE_COUNT - 1, Math.floor(progress * PHASE_COUNT)) as Phase;

  return (
    // Pin track — 500vh of scrollable height. The sticky pinned area inside
    // pins to the viewport top for the duration of this track. Phase is
    // derived from how far the visitor has scrolled through the track.
    //
    // Layout: command sits ABOVE the surface so each phase reads as
    // cause → effect — visitor sees "/typeface" then watches the surface
    // respond. The command is the protagonist; the surface is the result.
    <div ref={trackRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen flex flex-col py-8 overflow-hidden">
        <TabStrip
          surfaceId={surfaceId}
          onSurfaceChange={onSurfaceChange}
          className="mb-4 lg:mb-6 shrink-0"
        />

        {/* Tighter gap below than above: TabStrip → Command keeps the
            16/24px peer separation, but Command → Surface tightens to
            12/16px so the command and the surface read as cause + effect
            bound together. The progress strip below mirrors this gap. */}
        <div className="mb-3 lg:mb-4 shrink-0">
          <TypedCommand phase={phase} />
        </div>

        <div className="flex-1 min-h-0 flex items-center">
          <SurfaceFrame surfaceId={surfaceId} phase={phase} className="w-full" />
        </div>

        <div className="mt-3 lg:mt-4 shrink-0 flex items-center justify-between gap-4">
          <ProgressIndicator progress={progress} />
          <PhaseLabel phase={phase} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile: tap-through stepper
// ---------------------------------------------------------------------------

type SteppedDemoProps = {
  surfaceId: SurfaceId;
  onSurfaceChange: (id: SurfaceId) => void;
};

function SteppedDemo({ surfaceId, onSurfaceChange }: SteppedDemoProps) {
  const [phase, setPhase] = useState<Phase>(0);

  function next() {
    setPhase((p) => Math.min(PHASE_COUNT - 1, p + 1) as Phase);
  }
  function back() {
    setPhase((p) => Math.max(0, p - 1) as Phase);
  }

  // Reset phase when surface changes — avoids confusing handoff mid-demo.
  function changeSurface(id: SurfaceId) {
    onSurfaceChange(id);
    setPhase(0);
  }

  const atStart = phase === 0;
  const atEnd = phase === PHASE_COUNT - 1;

  return (
    <div>
      <TabStrip
        surfaceId={surfaceId}
        onSurfaceChange={changeSurface}
        className="mb-4"
      />

      {/* Same rhythm as desktop — Command binds tighter to the Surface
          below than to the TabStrip above. The bottom button strip keeps
          a slightly looser gap (mt-4) since those are interactive nav
          controls rather than passive metadata. */}
      <div className="mb-3">
        <TypedCommand phase={phase} />
      </div>

      <SurfaceFrame surfaceId={surfaceId} phase={phase} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={atStart}
          className="font-mono text-2xs uppercase tracking-widest text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-fast ease-considered"
        >
          ← Back
        </button>

        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle text-center">
          <span className="text-ink">{phase + 1}</span>
          {" / "}
          {PHASE_COUNT}
          {" · "}
          {phaseInfo[phase].command ? (
            <span className="text-accent">{phaseInfo[phase].command}</span>
          ) : (
            phaseInfo[phase].description
          )}
        </p>

        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-fast ease-considered"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

type TabStripProps = {
  surfaceId: SurfaceId;
  onSurfaceChange: (id: SurfaceId) => void;
  className?: string;
};

function TabStrip({ surfaceId, onSurfaceChange, className = "" }: TabStripProps) {
  return (
    <div
      role="tablist"
      aria-label="Demo surface"
      className={`flex items-center gap-6 md:gap-10 border-b border-rule-subtle ${className}`}
    >
      {/* LayoutGroup lets the accent underline animate between tabs via a
          shared layoutId. The static border (border-b-2 transparent on each
          tab + border-b on the strip) preserves the strip's visual rhythm so
          the underline reads as overlay, not as a swap. */}
      <LayoutGroup>
        {surfaces.map((s, i) => {
          const isActive = surfaceId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSurfaceChange(s.id)}
              className={`relative flex items-center gap-3 pb-3 lg:pb-4 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered ${
                isActive
                  ? "text-ink"
                  : "text-ink-subtle hover:text-ink-muted"
              }`}
            >
              <span
                className={`font-mono text-2xs uppercase tracking-widest ${isActive ? "text-accent" : "text-ink-subtle"}`}
              >
                0{i + 1}
              </span>
              <span className="font-mono text-2xs uppercase tracking-widest">
                {s.label}
              </span>
              {isActive ? (
                <motion.span
                  layoutId="demo-tab-underline"
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

type SurfaceFrameProps = {
  surfaceId: SurfaceId;
  phase: Phase;
  className?: string;
};

function SurfaceFrame({ surfaceId, phase, className = "" }: SurfaceFrameProps) {
  return (
    <div
      className={`bg-surface border border-rule-subtle rounded-md aspect-[16/10] max-h-[55vh] mx-auto overflow-hidden ${className}`}
    >
      {surfaceId === "dashboard" && <SurfaceDashboard phase={phase} />}
      {surfaceId === "pricing" && <SurfacePricing phase={phase} />}
      {surfaceId === "settings" && <SurfaceSettings phase={phase} />}
    </div>
  );
}

type TypedCommandProps = {
  phase: Phase;
};

function TypedCommand({ phase }: TypedCommandProps) {
  const command = phaseInfo[phase].command;
  // Each phase swaps the command label. AnimatePresence with mode="wait"
  // sequences the exit + entry so the visitor reads "command X completed,
  // now command Y running" rather than seeing two commands flicker over
  // each other. The y-shift is small — the strip is narrative chrome, not
  // the centerpiece. Dimensions deliberately match CodeBlock size="sm"
  // (rounded-sm, px-4 py-3, text-sm md:text-base) so the strip height
  // stays constant.
  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={FADE}
        >
          {command ? (
            <CodeBlock size="sm">{command}</CodeBlock>
          ) : (
            <div className="border border-rule-subtle rounded-sm px-4 py-3 font-mono text-sm md:text-base leading-snug text-ink-subtle italic">
              No command run yet — this is the AI default.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type ProgressIndicatorProps = {
  progress: number;
};

function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div
      className="h-px bg-rule-subtle relative overflow-hidden flex-1 max-w-xs"
      role="progressbar"
      aria-label="Demo progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-100 ease-out"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}

type PhaseLabelProps = {
  phase: Phase;
};

function PhaseLabel({ phase }: PhaseLabelProps) {
  const info = phaseInfo[phase];
  return (
    <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle text-right shrink-0">
      <span className="text-ink">{phase + 1}</span>
      {" / "}
      {PHASE_COUNT}
      {info.command ? (
        <>
          {" · "}
          <span className="text-accent">{info.command}</span>
        </>
      ) : null}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Scroll progress hook
// ---------------------------------------------------------------------------

/**
 * Tracks scroll progress through the referenced element. Returns a value
 * between 0 (element top at viewport top) and 1 (element bottom at viewport
 * bottom). rAF-throttled for smooth updates without scroll-event spam.
 */
function usePinScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let pending = false;

    function update() {
      pending = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableLength = rect.height - viewport;
      if (scrollableLength <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.max(0, Math.min(1, scrolled / scrollableLength));
      setProgress(next);
    }

    function onScroll() {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return progress;
}
