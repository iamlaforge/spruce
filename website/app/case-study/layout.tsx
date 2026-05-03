import type { ReactNode } from "react";

// Stillpoint case-study tokens — defined under the .stillpoint scope so
// they cascade only to elements wrapped in <StillpointScope>. Imported
// here so the case-study route can render the cumulative home page
// without each fragment importing the CSS itself.
import "@/src/case-studies/stillpoint/tokens/stillpoint.css";

/**
 * Layout for the case-study artifact route. Deliberately minimal — no
 * Spruce header or sidebar, since the artifact is meant to surface the
 * Stillpoint home page on its own terms (the way a visitor would
 * experience a real product), with only a thin context banner above it
 * to clarify what's being viewed and how to get back to the catalog.
 */
export default function CaseStudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
