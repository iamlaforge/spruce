"use client";

import { useState, type ReactNode } from "react";

/**
 * ExpandablePanel — single-level inline expand for the Discovery tier
 * artifact demos. The signature element (always-visible identity:
 * persona header band, emotional arc, severity counts) renders as the
 * panel's clickable surface; the details collapse beneath it.
 *
 * The whole signature region is the click target; a small chevron
 * indicator sits in the top-right corner. On hover, the whole region
 * picks up an accent treatment to communicate clickability without
 * adding chrome.
 *
 * Used by PersonasDemo, JtbdDemo, JourneyDemo, AuditDemo. Skipped for
 * ScenariosDemo (already short — no scroll problem to solve).
 */

type Props = {
  /** Always-visible signature region. Should be self-explanatory at a
   *  glance — the artifact's distinct visual identity. */
  signature: ReactNode;
  /** The collapsed details, rendered when expanded. */
  children: ReactNode;
  /** Open by default? Defaults to false (all collapsed on first paint). */
  defaultOpen?: boolean;
  /** Accessible label for the toggle ("Expand Maya's persona canvas"). */
  ariaLabel: string;
};

export function ExpandablePanel({
  signature,
  children,
  defaultOpen = false,
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="border border-rule bg-surface rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? `Collapse ${ariaLabel}` : `Expand ${ariaLabel}`}
        className="w-full text-left block relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0 hover:bg-surface-elevated/50 transition-colors duration-fast ease-considered"
      >
        {signature}
        <span
          aria-hidden
          className="absolute top-4 right-4 md:top-5 md:right-5 inline-flex items-center justify-center w-6 h-6 rounded-full border border-rule text-ink-subtle group-hover:border-accent group-hover:text-accent transition-colors duration-fast ease-considered"
        >
          <Chevron open={open} />
        </span>
      </button>

      {open ? <div className="border-t border-rule">{children}</div> : null}
    </article>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform duration-fast ease-considered ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M2 3.5 L5 6.5 L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
