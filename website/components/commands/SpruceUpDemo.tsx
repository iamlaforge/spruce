"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { DURATION, EASE_CONSIDERED, FADE, MARKER_SPRING, PAYOFF } from "@/lib/motion";
import { stillpointContextMarkdown } from "@/src/case-studies/stillpoint/content/context";
import { TranscriptFrame } from "./DemoFrame";

/**
 * /spruce-up demonstration. Two tabs at the top of the transcript frame:
 *
 *   1. Interview — stepped Q&A flow simulating the guided conversation
 *      /spruce-up runs in the terminal. Five essential questions; the
 *      transcript builds up as the visitor advances; on completion, the
 *      five-essential .spruce.md sections render as the immediate payoff.
 *
 *   2. Full .spruce.md — the complete Stillpoint context as it actually
 *      lands on disk after /spruce-up walks through both the essential
 *      questions AND the optional depth questions. Visitors see what
 *      /spruce-up genuinely produces — typography preferences, color
 *      preferences, anti-references, UX patterns, tradeoff defaults,
 *      notes — not just the five-essential view.
 *
 * Worked example: Stillpoint, the meditation-app case study threaded
 * through the catalog. Source content from
 * `src/case-studies/stillpoint/content/context.ts`; the demo stays in
 * sync with the canonical context as it evolves.
 */

const QA: Array<{ question: string; answer: string }> = [
  {
    question:
      "What does this product do, and what's the core experience you want users to have?",
    answer:
      "A calm, accessible companion for daily mindfulness. The goal is to help people build a sustainable practice in just a few minutes a day — not transform their lives in a weekend retreat. Mindfulness for real life.",
  },
  {
    question: "Who uses it? What do you know about them?",
    answer:
      "Adults 25–45 looking for stress relief, better sleep, emotional balance. Beginners through intermediate meditators. They want to be approached with respect and warmth, not as if they're broken.",
  },
  {
    question:
      "What character should the product have? Warm or cool? Restrained or expressive?",
    answer:
      "Warm, grounded, quietly confident. Modern and inclusive. Should feel like a calm friend — not a lifestyle product, not a clinical tool.",
  },
  {
    question: "How dense should the interface feel?",
    answer:
      "Spacious leaning balanced. Room to breathe but not so sparse it reads as precious or empty.",
  },
  {
    question: "What voice should the product speak in?",
    answer:
      "Calm and encouraging. Direct without being curt; warm without being saccharine. Treats users as competent adults pursuing peace.",
  },
];

type Tab = "interview" | "file";

export function SpruceUpDemo() {
  const [tab, setTab] = useState<Tab>("interview");
  const [step, setStep] = useState(1);
  const total = QA.length;
  const isComplete = step > total;

  // Scope label reflects the active tab's state.
  const scope =
    tab === "interview"
      ? isComplete
        ? `Interview complete · ${total} of ${total}`
        : `Question ${step} of ${total}`
      : "Stillpoint context · full file";

  return (
    <TranscriptFrame eyebrow="Transcript" scope={scope}>
      {/* Tab strip — Interview (default) | Full .spruce.md. Same
          shared-layout marker pattern as the home page tabbed surfaces
          and the /sketch payoff tabs. */}
      <div
        role="tablist"
        aria-label="/spruce-up demo views"
        className="flex items-center gap-6 md:gap-8 border-b border-rule-subtle mb-6 md:mb-8"
      >
        <LayoutGroup>
          <SpruceUpTab
            tab="interview"
            label="Interview"
            isActive={tab === "interview"}
            onClick={() => setTab("interview")}
          />
          <SpruceUpTab
            tab="file"
            label="Full .spruce.md"
            isActive={tab === "file"}
            onClick={() => setTab("file")}
          />
        </LayoutGroup>
      </div>

      {/* Active panel */}
      <AnimatePresence mode="wait" initial={false}>
        {tab === "interview" ? (
          <InterviewPanel
            key="interview"
            step={step}
            setStep={setStep}
            isComplete={isComplete}
            total={total}
          />
        ) : (
          <FilePanel key="file" />
        )}
      </AnimatePresence>
    </TranscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// SpruceUpTab — version of the home-page tab pattern, scoped to this demo.
// ---------------------------------------------------------------------------

function SpruceUpTab({
  tab,
  label,
  isActive,
  onClick,
}: {
  tab: Tab;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`sprucup-panel-${tab}`}
      id={`spruceup-tab-${tab}`}
      onClick={onClick}
      className={`relative font-mono text-2xs uppercase tracking-widest py-3 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${
        isActive ? "text-accent" : "text-ink-subtle hover:text-ink"
      }`}
    >
      {label}
      {isActive ? (
        <motion.span
          layoutId="spruceup-tab-underline"
          aria-hidden
          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
          transition={MARKER_SPRING}
        />
      ) : null}
    </button>
  );
}

// ---------------------------------------------------------------------------
// InterviewPanel — the existing stepped Q&A flow. The visitor advances
// through the five essential questions; on completion, a five-essential
// .spruce.md preview lands as the immediate payoff. Visitors who want
// to see the full file (with depth questions) flip to the second tab.
// ---------------------------------------------------------------------------

function InterviewPanel({
  step,
  setStep,
  isComplete,
  total,
}: {
  step: number;
  setStep: (updater: (s: number) => number) => void;
  isComplete: boolean;
  total: number;
}) {
  const visible = QA.slice(0, Math.min(step, total));

  return (
    <motion.div
      role="tabpanel"
      id="sprucup-panel-interview"
      aria-labelledby="spruceup-tab-interview"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
    >
      <div className="space-y-7 md:space-y-8">
        {visible.map((qa, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
          >
            <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-3 max-w-prose">
              {qa.question}
            </p>
            <p className="text-base text-ink leading-relaxed text-pretty max-w-prose">
              {qa.answer}
            </p>
          </motion.article>
        ))}

        <AnimatePresence>
          {isComplete ? <EssentialsPreview key="essentials" /> : null}
        </AnimatePresence>
      </div>

      {/* Controls — Next advances; Start over resets. */}
      <div className="mt-8 md:mt-10 pt-6 border-t border-rule-subtle flex flex-wrap items-center justify-between gap-3">
        {!isComplete ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {step < total ? "Next question →" : "Generate context →"}
          </button>
        ) : (
          <span className="font-mono text-2xs uppercase tracking-widest text-accent">
            .spruce.md generated · see full file in next tab
          </span>
        )}

        {step > 1 || isComplete ? (
          <button
            type="button"
            onClick={() => setStep(() => 1)}
            className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            Start over
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// EssentialsPreview — closes the interview tab with a brief confirmation
// and a pointer to the file tab. The full .spruce.md (with depth-question
// sections) lives in the second tab, so this panel doesn't re-render the
// same content twice.
// ---------------------------------------------------------------------------

function EssentialsPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={PAYOFF}
      className="border-t border-rule-subtle pt-7 md:pt-8 mt-2"
    >
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        .spruce.md captured
      </p>
      <p className="text-base text-ink leading-relaxed text-pretty max-w-prose">
        Stillpoint&rsquo;s context is now written. Every Spruce command in
        this catalog reads from this file before reasoning &mdash; the
        visual direction in /sketch, the tokens in /foundations, the
        surfaces in /design.
      </p>
      <p className="text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose mt-3">
        See the full file &mdash; with typography preferences, color
        preferences, anti-references, UX patterns, and tradeoff defaults
        &mdash; in the next tab.
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FilePanel — the full Stillpoint .spruce.md as it actually lives on
// disk after /spruce-up walks through essential AND depth questions.
// Renders `stillpointContextMarkdown` from
// src/case-studies/stillpoint/content/context.ts directly.
// ---------------------------------------------------------------------------

function FilePanel() {
  return (
    <motion.div
      role="tabpanel"
      id="sprucup-panel-file"
      aria-labelledby="spruceup-tab-file"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
    >
      <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty max-w-prose mb-5">
        Stillpoint&rsquo;s actual{" "}
        <code className="font-mono text-ink">.spruce.md</code> as it lives
        on disk after /spruce-up walks through the essential questions plus
        the optional depth questions. Every Spruce command on Stillpoint
        reads from this file before reasoning.
      </p>
      <pre className="font-mono text-xs leading-relaxed text-ink border border-rule rounded-sm p-4 md:p-5 overflow-auto max-h-[560px] whitespace-pre-wrap">
        {stillpointContextMarkdown}
      </pre>
      <p className="text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose mt-4">
        The depth sections — typography preferences, color preferences,
        what this should NOT feel like, UX patterns, tradeoff defaults —
        are what /sketch, /foundations, /design, and the corrective tier
        read when calibrating their output. They&rsquo;re the difference
        between &ldquo;a generic meditation app&rdquo; and Stillpoint.
      </p>
    </motion.div>
  );
}
