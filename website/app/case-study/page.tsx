import type { Metadata } from "next";
import { CaseStudyShell } from "./CaseStudyShell";

export const metadata: Metadata = {
  title: "Stillpoint — Spruce case study",
  description:
    "The cumulative live state of Stillpoint's home page as it stands after running through the Spruce design workflow.",
};

/**
 * Case study artifact — the Stillpoint home page rendered in its current
 * cumulative state across every Spruce command that's been applied to
 * it. Lives outside /commands so it can be linked to and viewed
 * standalone, without the catalog shell competing for attention.
 *
 * The actual rendering plus theme management lives in CaseStudyShell
 * (client) so this page can stay a server component for metadata.
 */
export default function CaseStudyPage() {
  return <CaseStudyShell />;
}
