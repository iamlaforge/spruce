"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { SurfaceDashboard, type Phase } from "./SurfaceDashboard";

const phaseInfo: Array<{ command: string | null; description: string }> = [
  { command: null, description: "AI default" },
  { command: "/typeface", description: "Typography swapped" },
  { command: "/colorgrade", description: "Colors swapped" },
  { command: "/reduce", description: "Excess stripped" },
  { command: "/refine", description: "Components disciplined" },
  { command: "/fortify", description: "Production-ready" },
];

/**
 * Temporary client wrapper around SurfaceDashboard that exposes a phase
 * scrubber for validating the surface mock-ups. Replaced in step 3 by the
 * scroll-pinned mechanic that drives phase changes from scroll position.
 */
export function DashboardPreview() {
  const [phase, setPhase] = useState<Phase>(0);
  const current = phaseInfo[phase];

  return (
    <div>
      {/* The pinned-area frame. The inner SurfaceDashboard occupies the full
          aspect-ratio box. */}
      <div className="bg-surface border border-rule-subtle rounded-md aspect-[16/10] overflow-hidden">
        <SurfaceDashboard phase={phase} />
      </div>

      {/* Typed-command CodeBlock — coupled to the current phase. Phase 0 has
          no command (the surface is "before"); phases 1-5 each show the
          command that produced the current state. */}
      <div className="mt-6 md:mt-8">
        {current.command ? (
          <CodeBlock size="md">{current.command}</CodeBlock>
        ) : (
          <div className="border border-rule-subtle rounded-md px-5 py-4 md:px-6 md:py-5 font-mono text-base md:text-lg leading-snug text-ink-subtle italic">
            No command run yet — this is the AI default.
          </div>
        )}
      </div>

      {/* Phase scrubber + current-phase label */}
      <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Phase" className="flex items-center gap-2">
          {phaseInfo.map((p, i) => {
            const isActive = i === phase;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Phase ${i}: ${p.description}`}
                onClick={() => setPhase(i as Phase)}
                className={`size-8 inline-flex items-center justify-center font-mono text-2xs uppercase tracking-widest rounded-sm transition-colors duration-fast ease-considered ${
                  isActive
                    ? "bg-ink text-ink-inverse"
                    : "bg-surface text-ink-muted hover:bg-surface-elevated hover:text-ink border border-rule-subtle"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {current.command ? (
            <>
              <span className="text-accent">{current.command}</span>
              {" · "}
              {current.description}
            </>
          ) : (
            current.description
          )}
        </p>
      </div>

      {/* Scaffold note — the scrubber is temporary, removed in step 3. */}
      <p className="mt-3 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
        Phase scrubber is temporary · replaced by scroll mechanic in step 3
      </p>
    </div>
  );
}
