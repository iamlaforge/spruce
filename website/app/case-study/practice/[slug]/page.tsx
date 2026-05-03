import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeDetailShell } from "./PracticeDetailShell";
import {
  PRACTICES,
  getPractice,
} from "@/src/case-studies/stillpoint/content/practices";

type RouteParams = { slug: string };

/**
 * Practice detail page — extends the case study beyond the home into a
 * second surface. Renders as a Stillpoint app page with the same theme
 * controller and Spruce context banner the case-study root carries, so
 * a visitor can navigate from /case-study (Stillpoint home) → click a
 * practice card → land here, all within the case-study experience.
 *
 * The page is client-rendered (via PracticeDetailShell) so it can carry
 * the same theme state as /case-study (localStorage-persisted, separate
 * from Spruce's). This page-level file stays a server component for
 * metadata + static-params generation.
 *
 * Adding a new practice: extend PRACTICES in content/practices.ts. The
 * detail route picks it up automatically — generateStaticParams iterates
 * the list, getPractice resolves the slug, and notFound() handles
 * unknown slugs gracefully.
 */

export function generateStaticParams(): RouteParams[] {
  return PRACTICES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) return {};
  return {
    title: `${practice.title} — Stillpoint · Spruce case study`,
    description: practice.shortDescription,
  };
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();
  // Pass slug only — the Practice object contains the Icon component
  // (a React function) which can't cross the server→client boundary.
  // PracticeDetailShell resolves the practice via getPractice(slug) on
  // the client.
  return <PracticeDetailShell slug={slug} />;
}
