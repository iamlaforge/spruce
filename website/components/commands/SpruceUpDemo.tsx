"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FADE, PAYOFF } from "@/lib/motion";
import { TranscriptFrame } from "./DemoFrame";

/**
 * /spruce-up demonstration. A stepped interview transcript: the visitor
 * advances through five Q&A pairs one at a time, simulating the guided
 * conversation /spruce-up runs in the terminal. The transcript builds up
 * as the visitor moves through it. On completion, a small "Context
 * captured" message frames what the answers feed into.
 *
 * Format diverges from the phase 1 BeforeAfterDemo shell because /spruce-up
 * doesn't transform an existing artifact — it produces a new one through
 * conversation. The toggle pattern doesn't fit; a stepped reveal does.
 *
 * Sample product (a meditation app for parents) is intentionally distinct
 * from the Spruce site itself so the demo doesn't read as recursive — and
 * distinct enough in character that visitors can see /spruce-up adapting
 * to a product unlike the site.
 */

const QA: Array<{ question: string; answer: string }> = [
  {
    question:
      "What does this product do, and what's the core experience you want users to have?",
    answer:
      "A short-session meditation app for parents — five-minute practices designed to fit into the gaps of a busy day. The core experience is recovery, not transformation.",
  },
  {
    question: "Who uses it? What do you know about them?",
    answer:
      "Parents of young children who never planned to meditate but need help recovering between moments. Skeptical of wellness theater. Short on time.",
  },
  {
    question:
      "What character should the product have? Warm or cool? Restrained or expressive?",
    answer:
      "Warm and unhurried. Calm without being precious. Closer to a deep breath than a yoga retreat.",
  },
  {
    question: "How dense should the interface feel?",
    answer:
      "Spacious. Single-purpose screens. Nothing competes with the practice itself.",
  },
  {
    question: "What voice should the product speak in?",
    answer:
      "Direct and gentle. Plain language. No “mindfulness journey” clichés. Address users as adults who chose to be here.",
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
// CompletionMessage — closes the transcript with the actual artifact. A
// faithful markdown rendering of the .spruce.md file (the answers compiled
// into the project context) leads; a brief caption below frames what other
// commands do with it. The mono code block creates a deliberate register
// shift from the editorial transcript above — signaling "now you're seeing
// the file, not the conversation."
// ---------------------------------------------------------------------------

const SPRUCE_MD = `# Project context

## Product
A short-session meditation app for parents — five-minute practices designed to fit into the gaps of a busy day. The core experience is recovery, not transformation.

## Audience
Parents of young children who never planned to meditate but need help recovering between moments. Skeptical of wellness theater. Short on time.

## Character
Warm and unhurried. Calm without being precious. Closer to a deep breath than a yoga retreat.

## Density
Spacious. Single-purpose screens. Nothing competes with the practice itself.

## Voice
Direct and gentle. Plain language. No "mindfulness journey" clichés. Address users as adults who chose to be here.`;

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
      <pre className="font-mono text-xs leading-relaxed text-ink border border-rule rounded-sm p-4 overflow-x-auto whitespace-pre-wrap">{SPRUCE_MD}</pre>
      <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-4">
        Every Spruce command reads from this file. Typography, color, voice,
        and spacing decisions calibrate to the character captured here.
      </p>
    </motion.div>
  );
}
