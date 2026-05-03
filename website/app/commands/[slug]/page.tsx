import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommandDetail } from "@/components/commands/CommandDetail";
import { ALL_SLUGS, COMMANDS } from "@/components/commands/data";
import { ArrangeDemo } from "@/components/commands/ArrangeDemo";
import { AuditDemo } from "@/components/commands/AuditDemo";
import { ColorgradeDemo } from "@/components/commands/ColorgradeDemo";
import { CritiqueDemo } from "@/components/commands/CritiqueDemo";
import { DecideDemo } from "@/components/commands/DecideDemo";
import { DesignDemo } from "@/components/commands/DesignDemo";
import { DetectDemo } from "@/components/commands/DetectDemo";
import { ExplainDemo } from "@/components/commands/ExplainDemo";
import { FinishDemo } from "@/components/commands/FinishDemo";
import { FortifyDemo } from "@/components/commands/FortifyDemo";
import { FoundationsDemo } from "@/components/commands/FoundationsDemo";
import { JourneyDemo } from "@/components/commands/JourneyDemo";
import { JtbdDemo } from "@/components/commands/JtbdDemo";
import { PaceDemo } from "@/components/commands/PaceDemo";
import { PersonasDemo } from "@/components/commands/PersonasDemo";
import { ReduceDemo } from "@/components/commands/ReduceDemo";
import { RefineDemo } from "@/components/commands/RefineDemo";
import { RemixDemo } from "@/components/commands/RemixDemo";
import { ScenariosDemo } from "@/components/commands/ScenariosDemo";
import { SketchDemo } from "@/components/commands/SketchDemo";
import { SpruceUpDemo } from "@/components/commands/SpruceUpDemo";
import { SurveyDemo } from "@/components/commands/SurveyDemo";
import { UxreviewDemo } from "@/components/commands/UxreviewDemo";
import { TypographyDemo } from "@/components/commands/TypographyDemo";
import { VoiceDemo } from "@/components/commands/VoiceDemo";

// Per-command demo opt-in. Add new entries here as additional commands get
// bespoke before/after demonstrations built. Slugs without an entry render
// no demo (the detail page falls through to prose-only).
const DEMOS: Record<string, ReactNode> = {
  "spruce-up": <SpruceUpDemo />,
  personas: <PersonasDemo />,
  jtbd: <JtbdDemo />,
  journey: <JourneyDemo />,
  scenarios: <ScenariosDemo />,
  audit: <AuditDemo />,
  sketch: <SketchDemo />,
  foundations: <FoundationsDemo />,
  design: <DesignDemo />,
  decide: <DecideDemo />,
  remix: <RemixDemo />,
  typeface: <TypographyDemo />,
  colorgrade: <ColorgradeDemo />,
  arrange: <ArrangeDemo />,
  refine: <RefineDemo />,
  pace: <PaceDemo />,
  fortify: <FortifyDemo />,
  finish: <FinishDemo />,
  detect: <DetectDemo />,
  survey: <SurveyDemo />,
  uxreview: <UxreviewDemo />,
  critique: <CritiqueDemo />,
  explain: <ExplainDemo />,
  voice: <VoiceDemo />,
  reduce: <ReduceDemo />,
};

type RouteParams = { slug: string };

// Pre-render every command at build time. Adding a new command in data.ts
// automatically generates its route on the next build.
export function generateStaticParams(): RouteParams[] {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const command = COMMANDS[slug];
  if (!command) return {};
  return {
    title: `${command.name} — Spruce`,
    description: command.tagline,
  };
}

export default async function CommandPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const command = COMMANDS[slug];
  if (!command) notFound();
  return <CommandDetail command={command} demo={DEMOS[slug]} />;
}
