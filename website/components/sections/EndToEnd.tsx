"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { DURATION, EASE_CONSIDERED, FADE } from "@/lib/motion";

/**
 * End-to-end demonstration. Replaces the old Demonstration + Terminal-
 * Conversation sections with a single tighter argument: one project
 * (Stillpoint) moving through Spruce in four moments — Set context,
 * Discover users, Generate, Review.
 *
 * Single-pane stepper format: visitor advances through one beat at a
 * time. Each beat shows a small terminal snippet (the conversational
 * input) above the artifact it produced (the designed output). The
 * pairing is the section's signature: "command in, artifact out" at
 * every stage of the workflow.
 *
 * Deliberately distinct from /designing (which is the workflow page's
 * full beat-by-beat phase walkthrough) and from /commands (the catalog).
 * This is the high-level visual telling of the story; the deeper
 * surfaces are linked at the close.
 */

// ---------------------------------------------------------------------------
// Beats — four moments in the Spruce workflow, each with a short terminal
// snippet and a rendered artifact. Stillpoint as the running example.
// ---------------------------------------------------------------------------

type Turn = { role: "user" | "spruce"; content: string };

type Beat = {
  /** Step indicator label — appears in the dot-strip and the panel header. */
  label: string;
  /** Subtitle describing what this beat does. */
  caption: string;
  /** Source command for the terminal eyebrow. */
  command: string;
  /** Short conversational snippet — keep to 2–4 turns. Omit for beats
   *  whose artifact carries its own internal terminals (e.g., the
   *  diagnostic + corrective two-pane). */
  turns?: Turn[];
  /** The artifact produced at this stage. */
  artifact: ReactNode;
};

const BEATS: Beat[] = [
  {
    label: "Set context",
    caption: "Capture the product's character",
    command: "/spruce-up",
    turns: [
      { role: "user", content: "/spruce-up" },
      {
        role: "spruce",
        content:
          "I'll ask a few questions to capture your product's character — what it is, who uses it, what voice it speaks in. The answers go to .spruce.md and every Spruce command reads from it. What does this product do?",
      },
      {
        role: "user",
        content:
          "Stillpoint — a meditation app for adults building or maintaining a sustainable practice. Recovery, not transformation. Calm-supportive voice, restraint over performance.",
      },
      {
        role: "spruce",
        content: "Got it. Captured to .spruce.md.",
      },
    ],
    artifact: <SpruceMdTile />,
  },
  {
    label: "Discover",
    caption: "Ground the work in real users",
    command: "/personas",
    turns: [
      { role: "user", content: "/personas" },
      {
        role: "spruce",
        content:
          "Drafting personas from .spruce.md context. No research yet, so I'll label every persona as context-derived. Drafting Maya as primary (Daily Practitioner) and Jordan as secondary (Skeptical First-Timer). Writing to .personas.md.",
      },
    ],
    artifact: <PersonaTile />,
  },
  {
    label: "Generate",
    caption: "Compose design from the foundation",
    command: "/design",
    turns: [
      { role: "user", content: "/design home page hero" },
      {
        role: "spruce",
        content:
          "Designing Stillpoint's home page hero — calibrated to .spruce.md (warm, grounded, quietly confident) and .personas.md (Maya's morning-context entry point). Typography, palette, layout decisions composed from the foundation.",
      },
    ],
    artifact: <SurfaceTile />,
  },
  {
    label: "Refine",
    caption: "Find what's drifted, fix it",
    command: "/critique → /voice",
    // No top-level terminal block — this beat's artifact is a two-pane
    // diagnostic + corrective composition with its own internal terminals.
    artifact: <DiagnosticAndCorrectiveTile />,
  },
  {
    label: "Review",
    caption: "Evaluate against the personas",
    command: "/audit",
    turns: [
      { role: "user", content: "/audit" },
      {
        role: "spruce",
        content:
          "Evaluating Stillpoint home against .personas.md, .jtbd.md, .journeys.md, .scenarios.md. Findings tied to named personas + jobs, not general principles. Severity-tiered with behavioral anti-patterns where they apply.",
      },
    ],
    artifact: <AuditTile />,
  },
];

// ---------------------------------------------------------------------------
// Section export — header, opening declaration, stepper, closing pointer.
// ---------------------------------------------------------------------------

export function EndToEnd() {
  return (
    <Section id="demonstration" tone="default">
      <SectionHeader mark="§ 02">
        Demonstration &middot; End to end
      </SectionHeader>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            One project. Five moments.{" "}
            <span className="text-ink-muted">
              From{" "}
              <code className="font-mono text-xl md:text-2xl text-accent">
                .spruce.md
              </code>{" "}
              to a designed surface — with the personas in between, and the
              find-and-fix loop that closes it.
            </span>
          </p>
          <p className="mt-5 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
            Stillpoint, a meditation app, moving through Spruce. Step
            through the workflow at high level — command in, artifact
            out, at every stage.
          </p>
        </div>
      </div>

      {/* Stepper — the section's centerpiece */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <BeatStepper beats={BEATS} />
        </div>
      </div>

      {/* Closing pointer to deeper surfaces */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-12 md:pt-16 mt-12 md:mt-16 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/designing"
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            Full workflow walkthrough &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link
            href="/commands"
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            Browse all commands &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link
            href="/case-study"
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See the Stillpoint case study &rarr;
          </Link>
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// BeatStepper — single-pane stepper. Dot-strip indicator at top with all
// four beats labelled; current beat's panel below; controls at bottom.
// ---------------------------------------------------------------------------

function BeatStepper({ beats }: { beats: Beat[] }) {
  const [step, setStep] = useState(0); // 0-indexed beat
  const total = beats.length;
  const beat = beats[step];
  const isFirst = step === 0;
  const isLast = step === total - 1;

  return (
    <div>
      {/* Dot-strip indicator — all four beats visible with their labels.
          Current beat highlighted; visited beats slightly muted; unvisited
          beats muted further. Click any dot to jump. */}
      <ol
        role="list"
        aria-label="Workflow beats"
        className="grid grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8"
      >
        {beats.map((b, i) => {
          const state =
            i === step ? "current" : i < step ? "visited" : "upcoming";
          return (
            <li key={b.label} className="contents">
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={state === "current" ? "step" : undefined}
                className={`group text-left flex flex-col gap-1.5 pt-3 border-t-2 transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  state === "current"
                    ? "border-accent"
                    : state === "visited"
                      ? "border-ink-subtle hover:border-accent"
                      : "border-rule hover:border-ink-subtle"
                }`}
              >
                <span
                  className={`font-mono text-2xs uppercase tracking-widest ${
                    state === "current"
                      ? "text-accent"
                      : "text-ink-subtle group-hover:text-ink"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {b.label}
                </span>
                <span
                  className={`font-display italic font-normal text-xs md:text-sm leading-snug ${
                    state === "current" ? "text-ink" : "text-ink-subtle"
                  }`}
                >
                  {b.caption}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Beat panel — terminal snippet on top, artifact below. Animates
          on beat change so the transition feels deliberate. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={beat.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
        >
          <BeatPanel beat={beat} step={step} total={total} />
        </motion.div>
      </AnimatePresence>

      {/* Controls — Back / Next or Restart on last beat */}
      <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-between gap-3">
        {!isFirst ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            &larr; Back
          </button>
        ) : (
          <span aria-hidden />
        )}

        {!isLast ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Next: {beats[step + 1].label} &rarr;
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            &larr; Restart
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BeatPanel — one beat: terminal snippet on top, artifact below.
// ---------------------------------------------------------------------------

function BeatPanel({
  beat,
  step,
  total,
}: {
  beat: Beat;
  step: number;
  total: number;
}) {
  return (
    <figure>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-y-2 mb-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent">
          Beat {step + 1} of {total} · {beat.command}
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {beat.label}
        </span>
      </figcaption>

      {/* Terminal snippet — dark surface, conversational input/output.
          Omitted for beats whose artifact carries its own internal terminals
          (e.g., Beat 5's diagnostic + corrective two-pane). */}
      {beat.turns && beat.turns.length > 0 ? (
        <div className="bg-ink text-ink-inverse rounded-md px-5 py-5 md:px-6 md:py-6 font-mono text-xs md:text-sm leading-relaxed">
          {beat.turns.map((turn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...FADE, delay: 0.05 + i * 0.08 }}
            >
              <TurnView turn={turn} isLast={i === beat.turns!.length - 1} />
            </motion.div>
          ))}
        </div>
      ) : null}

      {/* Artifact — emerges below the terminal as the designed output */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: EASE_CONSIDERED,
          delay: 0.15 + (beat.turns?.length ?? 0) * 0.08,
        }}
        className={beat.turns && beat.turns.length > 0 ? "mt-5 md:mt-6" : ""}
      >
        {beat.artifact}
      </motion.div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// TurnView — one terminal turn. User turns get accent ›; Spruce muted.
// ---------------------------------------------------------------------------

function TurnView({ turn, isLast }: { turn: Turn; isLast: boolean }) {
  const isUser = turn.role === "user";
  return (
    <div className={isLast ? "" : "mb-3"}>
      {isUser ? (
        <p className="text-ink-inverse">
          <span className="text-accent select-none">&rsaquo; </span>
          <span className="whitespace-pre-wrap">{turn.content}</span>
        </p>
      ) : (
        <p className="text-ink-inverse/80 whitespace-pre-wrap">
          {turn.content}
        </p>
      )}
    </div>
  );
}

// ===========================================================================
// Beat artifacts — four compact tiles, one per stage.
// ===========================================================================

// ---------------------------------------------------------------------------
// SpruceMdTile — Beat 1 artifact. Compact "captured" tile showing the key
// facts /spruce-up wrote to .spruce.md. Reads as a structured note, not a
// full file dump.
// ---------------------------------------------------------------------------

function SpruceMdTile() {
  return (
    <figure className="border border-rule bg-surface rounded-md overflow-hidden">
      <header className="bg-surface-elevated border-b border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          .spruce.md · Captured
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Project context
        </p>
      </header>

      <dl className="px-5 py-5 md:px-6 md:py-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <ContextField
          label="Audience"
          body="Adults 25–45 building or maintaining a sustainable mindfulness practice. Beginners through intermediate."
        />
        <ContextField
          label="Character"
          body="Warm, grounded, quietly confident. The product respects its own space and the user's time."
        />
        <ContextField
          label="Voice"
          body="Calm, encouraging, clear. Speaks like a supportive friend. Direct without being curt."
        />
        <ContextField
          label="Density"
          body="Spacious leaning balanced — enough room to breathe, not so sparse it feels precious."
        />
      </dl>
    </figure>
  );
}

function ContextField({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-1.5">
        {label}
      </dt>
      <dd className="text-sm text-ink leading-snug text-pretty">{body}</dd>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PersonaTile — Beat 2 artifact. Maya as primary persona drafted from
// .spruce.md context. Compact persona card — header band, avatar + name +
// role, anchor quote, confidence + link to full canvas.
// ---------------------------------------------------------------------------

function PersonaTile() {
  return (
    <figure className="border border-rule bg-surface rounded-md overflow-hidden">
      <header className="bg-surface-elevated border-b border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          .personas.md · Drafted
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Primary persona
        </p>
      </header>

      <div className="px-5 py-6 md:px-6 md:py-7">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-5 items-center">
          <div
            aria-hidden
            className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent text-white flex items-center justify-center font-display font-normal text-xl md:text-2xl"
          >
            M
          </div>
          <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight">
            Maya
            <span className="text-ink-muted"> — Daily Practitioner</span>
          </h3>
        </div>

        <blockquote className="mt-5 pt-4 border-t border-rule-subtle">
          <p className="font-display italic font-normal text-base md:text-lg text-ink leading-snug text-pretty">
            &ldquo;Wants the practice to be a small, reliable good choice
            in the day — not a project, not a transformation.&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="border-t border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Confidence ·{" "}
          <span className="text-ink-muted normal-case">
            Context-derived from .spruce.md
          </span>
        </p>
        <Link
          href="/commands/personas"
          className="font-mono text-2xs uppercase tracking-widest text-accent hover:text-accent-hover transition-colors duration-fast ease-considered"
        >
          View full canvas &rarr;
        </Link>
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// SurfaceTile — Beat 3 artifact. A small Stillpoint hero excerpt — the
// designed output that emerged from /design reasoning across the
// foundation. Editorial composition, calibrated to Stillpoint's character.
// ---------------------------------------------------------------------------

function SurfaceTile() {
  return (
    <figure className="border border-rule bg-surface rounded-md overflow-hidden">
      <header className="bg-surface-elevated border-b border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          Stillpoint home · Hero
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Designed surface
        </p>
      </header>

      <div className="px-6 py-10 md:px-8 md:py-14">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
          For tonight
        </p>
        <h3 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink text-balance max-w-prose">
          Find your stillpoint.
        </h3>
        <p className="mt-5 font-display italic font-normal text-base md:text-lg text-ink-muted leading-snug text-pretty max-w-prose">
          A few minutes for yourself, when it&rsquo;s right.
        </p>
        <p className="mt-3 text-sm md:text-base text-ink leading-relaxed text-pretty max-w-prose">
          Mindfulness for real life — practices designed to fit into the
          spaces of an ordinary day.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-white font-mono text-2xs uppercase tracking-widest">
            Begin practice
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Or see how it works
          </span>
        </div>
      </div>

      <div className="border-t border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Composed from .spruce.md + .personas.md
        </p>
        <Link
          href="/case-study"
          className="font-mono text-2xs uppercase tracking-widest text-accent hover:text-accent-hover transition-colors duration-fast ease-considered"
        >
          See the full case study &rarr;
        </Link>
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// AuditTile — Beat 4 artifact. Two findings from the HCD-grounded /audit
// — one Blocking, one Significant — each with severity badge, behavioral
// anti-pattern, and persona-grounded "Affects" line. The HCD differentiator
// is visible in the per-finding detail.
// ---------------------------------------------------------------------------

function AuditTile() {
  return (
    <figure className="border border-rule bg-surface rounded-md overflow-hidden">
      <header className="bg-surface-elevated border-b border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          /audit · HCD-grounded findings
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          2 of 6 shown
        </p>
      </header>

      <ul role="list" className="list-none divide-y divide-rule-subtle">
        <AuditFinding
          name="Post-practice close screen is undefined"
          severity="Blocking"
          severityTone="negative"
          antiPattern="Engagement Trap"
          affects="Maya doing F1 (settle the nervous system before the day's demands arrive). Highest-leverage moment in the journey."
        />
        <AuditFinding
          name="Practice detail page interstitial when starting from recommendation"
          severity="Significant"
          severityTone="caution"
          antiPattern="Cognitive Tax"
          affects="Maya doing F1. Surfaced as touchpoint 6 in the current-state journey; future-state recommends a banner-direct begin path."
        />
      </ul>

      <div className="border-t border-rule-subtle px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Evaluated against .personas.md + .jtbd.md + .journeys.md
        </p>
        <Link
          href="/commands/audit"
          className="font-mono text-2xs uppercase tracking-widest text-accent hover:text-accent-hover transition-colors duration-fast ease-considered"
        >
          See the full audit &rarr;
        </Link>
      </div>
    </figure>
  );
}

function AuditFinding({
  name,
  severity,
  severityTone,
  antiPattern,
  affects,
}: {
  name: string;
  severity: string;
  severityTone: "negative" | "caution";
  antiPattern: string;
  affects: string;
}) {
  const dotClass =
    severityTone === "negative" ? "bg-accent" : "bg-ink-subtle";
  return (
    <li className="px-5 py-5 md:px-6 md:py-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-2">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className={`block w-2 h-2 rounded-full ${dotClass}`} />
          <span className="font-mono text-2xs uppercase tracking-widest text-accent">
            {severity}
          </span>
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {antiPattern}
        </span>
      </div>
      <p className="text-sm md:text-base text-ink leading-snug font-medium mb-2 text-pretty max-w-prose">
        {name}
      </p>
      <p className="text-sm text-ink-muted leading-snug text-pretty max-w-prose">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent mr-2">
          Affects
        </span>
        {affects}
      </p>
    </li>
  );
}

// ---------------------------------------------------------------------------
// DiagnosticAndCorrectiveTile — Beat 5 artifact. Two-pane composition:
// left pane shows /critique surfacing a voice slip; right pane shows
// /voice applying the rewrite. Each pane carries its own internal
// terminal snippet + artifact, communicating "diagnostic in, corrective
// out" — the find-and-fix cycle that closes the loop on the workflow.
//
// Diagnostics surface what's drifted; correctives address it. Beat 5
// makes that handoff visible in a single composition.
// ---------------------------------------------------------------------------

function DiagnosticAndCorrectiveTile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      {/* Left pane — /critique surfaces the voice slip */}
      <CorrectivePane
        kind="Diagnostic"
        command="/critique"
        terminalTurns={[
          { role: "user", content: "/critique signup section" },
          {
            role: "spruce",
            content:
              "The signup section is the moment where the design fails its intent. The social-proof line and the CTA both slip into the SaaS-default voice the .spruce.md explicitly excluded.",
          },
        ]}
      >
        <CritiqueObservation />
      </CorrectivePane>

      {/* Right pane — /voice applies the rewrite */}
      <CorrectivePane
        kind="Corrective"
        command="/voice"
        terminalTurns={[
          { role: "user", content: "/voice hero + signup" },
          {
            role: "spruce",
            content:
              "Rewrote 2 voice slips. Removed the performative social-proof line; replaced the SaaS-default CTA with practice-led labels. Voice now matches the calm-supportive-friend register .spruce.md established.",
          },
        ]}
      >
        <VoiceRewriteDiff />
      </CorrectivePane>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CorrectivePane — one pane in the diagnostic + corrective composition.
// Header band names the kind + command; dark terminal block shows the
// snippet; light artifact area shows the output (children).
// ---------------------------------------------------------------------------

function CorrectivePane({
  kind,
  command,
  terminalTurns,
  children,
}: {
  kind: "Diagnostic" | "Corrective";
  command: string;
  terminalTurns: Turn[];
  children: ReactNode;
}) {
  return (
    <div className="border border-rule bg-surface rounded-md overflow-hidden flex flex-col">
      <header className="bg-surface-elevated border-b border-rule-subtle px-5 py-3 md:px-5 md:py-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          {kind} · {command}
        </p>
      </header>

      {/* Compact terminal snippet — fits the pane proportions */}
      <div className="bg-ink text-ink-inverse px-5 py-4 md:px-5 md:py-5 font-mono text-xs leading-relaxed">
        {terminalTurns.map((turn, i) => (
          <TurnView
            key={i}
            turn={turn}
            isLast={i === terminalTurns.length - 1}
          />
        ))}
      </div>

      {/* Artifact area */}
      <div className="px-5 py-5 md:px-5 md:py-6 flex-1">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CritiqueObservation — left-pane artifact. The /critique narrative
// observation about the signup section's voice slip, in editorial register.
// ---------------------------------------------------------------------------

function CritiqueObservation() {
  return (
    <figure>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        A specific moment
      </p>
      <blockquote className="border-l-2 border-accent pl-4">
        <p className="font-display italic font-normal text-base text-ink leading-snug text-pretty">
          The signup section uses &ldquo;Join 10,000+ people finding their
          stillpoint&rdquo; beneath the form, with &ldquo;Get Started&rdquo;
          on the CTA. Both are the friendly-professional SaaS template —
          the moodboard&rsquo;s anti-references named these specifically.
          A product that respects its audience doesn&rsquo;t reach for
          social proof or warm-up copy.
        </p>
      </blockquote>
      <p className="mt-4 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
        Recommended &middot;{" "}
        <code className="text-accent normal-case">/voice</code>
      </p>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// VoiceRewriteDiff — right-pane artifact. Before/after of the two
// rewrites /voice applied. Compact two-column diff.
// ---------------------------------------------------------------------------

function VoiceRewriteDiff() {
  return (
    <figure>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        2 rewrites applied
      </p>
      <ul role="list" className="list-none space-y-4">
        <RewriteRow
          before="“Get Started” (CTA)"
          after="“Begin practice”"
        />
        <RewriteRow
          before="“Join 10,000+ people finding their stillpoint”"
          after="(removed)"
          afterTone="muted"
        />
      </ul>
      <p className="mt-5 pt-3 border-t border-rule-subtle font-mono text-2xs uppercase tracking-widest text-ink-subtle">
        Voice now matches{" "}
        <code className="text-accent normal-case">.spruce.md</code>
      </p>
    </figure>
  );
}

function RewriteRow({
  before,
  after,
  afterTone = "default",
}: {
  before: string;
  after: string;
  afterTone?: "default" | "muted";
}) {
  return (
    <li className="space-y-2">
      <p className="text-sm text-ink-subtle leading-snug text-pretty line-through decoration-rule-strong">
        {before}
      </p>
      <p
        className={`text-sm leading-snug text-pretty ${
          afterTone === "muted" ? "text-ink-subtle italic" : "text-ink"
        }`}
      >
        <span aria-hidden className="text-accent mr-2">
          &rarr;
        </span>
        {after}
      </p>
    </li>
  );
}
