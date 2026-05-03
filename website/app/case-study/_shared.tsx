"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "stillpoint-theme";
export type StillpointPageTheme = "light" | "dark";

/**
 * Shared theme state + context banner for the case-study route. Both
 * /case-study (Stillpoint home) and /case-study/practice/[slug] use
 * these so the case-study experience reads as one product across its
 * sub-routes — same theme persistence, same Spruce context banner.
 *
 * Theme resolution mirrors the original CaseStudyShell logic:
 *   1. localStorage 'stillpoint-theme' if set
 *   2. otherwise document.documentElement.classList for 'dark'
 *      (matches Spruce's current rendered theme on first visit so the
 *      transition into the case study isn't jarring)
 *   3. defaults to 'light' if neither is available
 *
 * Once the user toggles, the explicit choice persists in localStorage
 * and Stillpoint stops following Spruce's theme.
 */

export function useStillpointTheme() {
  const [theme, setTheme] = useState<StillpointPageTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) {
      setTheme(stored);
    } else if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
    ) {
      setTheme("dark");
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: StillpointPageTheme = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — silently ignore.
    }
  };

  return { theme, toggle, mounted };
}

function readStoredTheme(): StillpointPageTheme | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Spruce context banner — the thin editorial bar above Stillpoint's own
 * header. Names the artifact and offers a way back to the catalog. Uses
 * Spruce's tokens (not Stillpoint's), since the banner is the Spruce
 * shell's voice, not Stillpoint's.
 *
 * The optional `crumb` prop lets sub-routes name where in the artifact
 * the visitor is — "Stillpoint home" on /case-study, "[Practice name]"
 * on /case-study/practice/[slug].
 */

export function ContextBanner({ crumb }: { crumb: string }) {
  return (
    <div className="border-b border-rule-subtle bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-baseline justify-between gap-x-6 text-sm">
        <div className="flex items-baseline gap-x-3 min-w-0">
          <Link
            href="/"
            className="font-display italic text-base text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            Spruce
          </Link>
          <span className="text-ink-subtle" aria-hidden>
            ·
          </span>
          <Link
            href="/case-study"
            className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-accent transition-colors duration-fast ease-considered"
          >
            Case study
          </Link>
          <span className="text-ink-subtle" aria-hidden>
            ·
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle truncate">
            {crumb}
          </span>
        </div>
        <Link
          href="/commands"
          className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-accent transition-colors duration-fast ease-considered whitespace-nowrap"
        >
          ← Commands catalog
        </Link>
      </div>
    </div>
  );
}
