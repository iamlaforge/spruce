"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FADE, PAYOFF } from "@/lib/motion";
import { stillpointContext } from "@/src/case-studies/stillpoint/content/context";
import { TranscriptFrame } from "./DemoFrame";

/**
 * /spruce-up demonstration. A stepped interview transcript: the visitor
 * advances through five Q&A pairs one at a time, simulating the guided
 * conversation /spruce-up runs in the terminal. The transcript builds up
 * as the visitor moves through it. On completion, a faithful rendering of
 * the resulting `.spruce.md` file lands as the payoff.
 *
 * Worked example: Stillpoint, the meditation-app case study threaded
 * through the catalog. /spruce-up is the first command in the Stillpoint
 * build — every subsequent command (/sketch, /foundations, /design, the
 * corrective tier) reads from this file before reasoning. Answers and the
 * compiled context come from `src/case-studies/stillpoint/content/context.ts`
 * so the demo stays in sync with the canonical context as it evolves.
 *
 * Format diverges from the BeforeAfterDemo shell because /spruce-up doesn't
 * transform an existing artifact — it produces a new one through
 * conversation. The toggle pattern doesn't fit; a stepped reveal does.
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

export function SpruceUpDemo() {
  const [step, setStep] = useState(1);
  const total = QA.length;
  const isComplete = step > total;
  const visible = QA.slice(0, Math.min(step, total));

  return (
    <TranscriptFrame
      eyebrow="Transcript"
      scope={
        isComplete
          ? `Interview complete · ${total} of ${total}`
          : `Question ${step} of ${total}`
      }
    >
      <div className="space-y-7 md:space-y-8">
          {/* Each new step settles in with a fade + small upward shift.
              Previous steps stay still — they're already part of the
              transcript. AnimatePresence is not needed because items only
              add (never remove until reset, which re-keys the whole list). */}
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
            {isComplete ? <CompletionMessage key="completion" /> : null}
          </AnimatePresence>
        </div>

        {/* Controls — Next advances; Start over resets. After completion,
            Next is replaced by a "context captured" status. */}
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
              .spruce.md generated
            </span>
          )}

          {step > 1 || isComplete ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
            >
              Start over
            </button>
        ) : null}
      </div>
    </TranscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// CompletionMessage — closes the transcript with the actual artifact.
//
// Renders the five essential sections of Stillpoint's .spruce.md, templated
// from `stillpointContext` so the demo stays in sync with the canonical
// case-study context. The mono code block creates a deliberate register
// shift from the editorial transcript above — signaling "now you're seeing
// the file, not the conversation."
//
// A small caption notes that the full Stillpoint context has more — the
// optional depth questions in /spruce-up's tiered interview produce
// typography, color, anti-pattern, and other sections that subsequent
// commands in the catalog (/sketch, /foundations, /design) read from.
// ---------------------------------------------------------------------------

const ESSENTIAL_SECTIONS_MD = `# Spruce Context

## Product
${stillpointContext.product}

## Audience
${stillpointContext.audience}

## Character
${stillpointContext.character}

## Density
${stillpointContext.density}

## Voice
${stillpointContext.voice}`;

function CompletionMessage() {
  // Slightly longer duration than the per-step entry — this is the payoff,
  // and the visitor's eye should land on it as the demo's resolution.
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={PAYOFF}
      className="border-t border-rule-subtle pt-7 md:pt-8 mt-2"
    >
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        .spruce.md
      </p>
      <pre className="font-mono text-xs leading-relaxed text-ink border border-rule rounded-sm p-4 overflow-x-auto whitespace-pre-wrap">{ESSENTIAL_SECTIONS_MD}</pre>
      <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-4">
        Stillpoint starts here. Every Spruce command in this catalog reads
        from this file before reasoning &mdash; the visual direction in
        /sketch, the tokens in /foundations, the surfaces in /design, all
        calibrated to the character captured above.
      </p>
      <p className="text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose mt-3">
        The five essential questions produce the file you see here. Optional
        depth questions add typography preferences, color preferences,
        anti-patterns, and other sections — visible in the full Stillpoint
        context as the catalog walkthrough advances.
      </p>
    </motion.div>
  );
}
