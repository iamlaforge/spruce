"use client";

import { StillpointHome } from "@/src/case-studies/stillpoint/fragments/Home";
import { StillpointThemeToggle } from "@/src/case-studies/stillpoint/components/StillpointThemeToggle";
import { ContextBanner, useStillpointTheme } from "./_shared";

/**
 * Client wrapper for /case-study. Holds Stillpoint's local theme state
 * (independent of Spruce's html.dark class) and renders the toggle into
 * the Stillpoint header. Uses the shared theme hook + context banner so
 * /case-study and /case-study/practice/[slug] feel like one product
 * across sub-routes.
 *
 * The theme controller logic + Spruce context banner live in _shared.tsx
 * so practice detail pages can reuse them without duplicating state.
 */

export function CaseStudyShell() {
  const { theme, toggle, mounted } = useStillpointTheme();

  return (
    <>
      <ContextBanner crumb="Stillpoint home" />
      <StillpointHome
        // Until the post-mount theme is resolved, fall back to 'inherit'
        // so the cascade picks up whatever Spruce is rendering. Once
        // mounted, we own the theme explicitly.
        theme={mounted ? theme : "inherit"}
        themeToggle={
          <StillpointThemeToggle theme={theme} onToggle={toggle} />
        }
      />
    </>
  );
}
