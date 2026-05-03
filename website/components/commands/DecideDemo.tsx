"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FADE, PAYOFF } from "@/lib/motion";
import { TranscriptFrame } from "./DemoFrame";

/**
 * /decide demo. A stepped decision flow showing what guided design feels
 * like: the visitor advances through three real design decisions for a
 * post-practice reflection screen, sees options surfaced and one picked
 * at each step, then sees a brief preview of the resulting design.
 *
 * Same stepped mechanic as /spruce-up (each click reveals one decision
 * + its picked answer); different content (design decisions vs. context
 * questions). The reflection-screen preview at the close mirrors how
 * /spruce-up ends with the .spruce.md file snippet — both demos arc from
 * conversation to artifact, completing the narrative.
 *
 * Continues the meditation-app context from earlier demos (/spruce-up,
 * /foundations, /design): same product, different surface (a reflection
 * screen rather than the home).
 */

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

type Option = {
  label: string;
  description: string;
};

type Decision = {
  question: string;
  options: Option[];
  picked: string;
};

const DECISIONS: Decision[] = [
  {
    question: "How should the user enter their reflection?",
    options: [
      {
        label: "Open canvas",
        description: "A blank text area; write whatever comes up.",
      },
      {
        label: "Prompts",
        description: "One or two questions to respond to.",
      },
      {
        label: "Hybrid",
        description:
          "A prompt above an open canvas; the prompt is optional.",
      },
    ],
    picked: "Hybrid",
  },
  {
    question: "When does the reflection get saved?",
    options: [
      {
        label: "Auto-save",
        description: "Writes as the user types; no commit step.",
      },
      {
        label: "Explicit save",
        description: "User writes, then taps Save when done.",
      },
      {
        label: "Auto + revisit",
        description:
          "Saves continuously; user can mark “done” when they want.",
      },
    ],
    picked: "Auto-save",
  },
  {
    question: "How does the screen frame consistency?",
    options: [
      {
        label: "Daily streak",
        description: "Count days; surface the count prominently.",
      },
      {
        label: "Quiet record",
        description: "Past entries available but no streak, no urgency.",
      },
      {
        label: "No history",
        description: "Each reflection lands and disappears.",
      },
    ],
    picked: "Daily streak",
  },
];

export function DecideDemo() {
  const [step, setStep] = useState(1);
  const total = DECISIONS.length;
  const isComplete = step > total;
  const visible = DECISIONS.slice(0, Math.min(step, total));

  return (
    <TranscriptFrame
      eyebrow="Transcript"
      scope={
        isComplete
          ? `Decisions complete · ${total} of ${total}`
          : `Decision ${step} of ${total}`
      }
    >
      <div className="space-y-7 md:space-y-8">
          {visible.map((decision, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={FADE}
            >
              <DecisionBlock
                decision={decision}
                number={i + 1}
                isFirst={i === 0}
              />
            </motion.div>
          ))}

          <AnimatePresence>
            {isComplete ? <ReflectionScreenPreview key="preview" /> : null}
          </AnimatePresence>
        </div>

        {/* Controls — Next advances; on the last decision the label
            becomes "Generate design"; after completion, "Start over"
            persists for replay. */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-rule-subtle flex flex-wrap items-center justify-between gap-3">
          {!isComplete ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {step < total ? "Next decision →" : "Generate design →"}
            </button>
          ) : (
            <span className="font-mono text-2xs uppercase tracking-widest text-accent">
              Reflection screen generated
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
// DecisionBlock — one decision: numbered eyebrow, italic Fraunces question,
// list of options with the picked one highlighted via em-dash + accent.
// Borders separate decisions from one another within the stepped stack.
// ---------------------------------------------------------------------------

function DecisionBlock({
  decision,
  number,
  isFirst,
}: {
  decision: Decision;
  number: number;
  isFirst: boolean;
}) {
  return (
    <article className={isFirst ? "" : "border-t border-rule-subtle pt-7 md:pt-8"}>
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        Decision {number}
      </p>
      <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug mb-5 max-w-prose">
        {decision.question}
      </p>
      <ul className="list-none space-y-2.5">
        {decision.options.map((opt) => {
          const isPicked = opt.label === decision.picked;
          return (
            <li
              key={opt.label}
              className={`pl-6 relative ${isPicked ? "" : "opacity-50"}`}
            >
              {isPicked ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.15em] text-accent font-mono text-sm leading-none"
                >
                  —
                </span>
              ) : null}
              <p className="text-sm md:text-base leading-snug text-ink">
                <span className={isPicked ? "text-ink" : "text-ink-muted"}>
                  {opt.label}
                </span>
                <span className="text-ink-subtle"> — {opt.description}</span>
              </p>
            </li>
          );
        })}
        {/* "Decide for me" — the universal delegation option present on
            every /decide step. Surfaced here as a 4th line so visitors see
            this feature; rendered dimmed since it's never the picked
            option in the demo. */}
        <li className="pl-6 relative opacity-50">
          <p className="text-sm md:text-base leading-snug text-ink">
            <span className="text-ink-muted">Decide for me</span>
            <span className="text-ink-subtle"> — based on context</span>
          </p>
        </li>
      </ul>
    </article>
  );
}

// ---------------------------------------------------------------------------
// ReflectionScreenPreview — closes the demo with a brief render of the
// reflection screen the decisions produced. Each design choice on the
// screen traces back to one of the picked decisions above; the explainer
// below the mock names the trace.
// ---------------------------------------------------------------------------

function ReflectionScreenPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={PAYOFF}
      className="border-t border-rule-subtle pt-7 md:pt-8 mt-2"
    >
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-5">
        Generated screen
      </p>

      {/* Brief reflection-screen mockup. Same Canvas (#FAFAF9) and stone
          palette as /foundations and /design — workflow narrative
          carries across demos. */}
      <div
        className="border border-stone-200 rounded-md px-5 py-6 max-w-sm"
        style={{ backgroundColor: "#FAFAF9" }}
      >
        {/* Top row — eyebrow on the left; the prominent streak count on
            the right. The streak placement reflects Decision 3 ("Daily
            streak — surface the count prominently"); it lands at the top
            of the screen, not tucked in a footer. */}
        <div className="flex items-baseline justify-between mb-3">
          <span
            className="font-mono text-2xs uppercase tracking-widest text-stone-500"
            style={{ fontFamily: SOURCE_SANS }}
          >
            Tuesday evening
          </span>
          <span
            className="font-mono text-2xs uppercase tracking-widest text-amber-700"
            style={{ fontFamily: SOURCE_SANS }}
          >
            Day 12
          </span>
        </div>

        <h4
          className="text-xl text-stone-900 leading-tight tracking-tight mb-5"
          style={{ fontFamily: LORA }}
        >
          Reflection
        </h4>

        {/* Optional prompt — the "Hybrid" decision: prompt visible above
            the open canvas. */}
        <p
          className="text-sm italic text-stone-600 mb-3"
          style={{ fontFamily: LORA }}
        >
          What stayed with you?
        </p>

        {/* Canvas — represented as a dashed empty area to read as
            "input space" without faking content. */}
        <div className="border border-dashed border-stone-300 rounded-sm h-16 mb-5" />

        {/* Footer — auto-save status (Decision 2) sits alone now; the
            "Past →" link is gone since Decision 3 chose Daily streak
            (the streak count above replaces the quiet past affordance). */}
        <div>
          <span
            className="font-mono text-2xs uppercase tracking-widest text-stone-500"
            style={{ fontFamily: SOURCE_SANS }}
          >
            Saved · just now
          </span>
        </div>
      </div>

      <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-4">
        Each decision shaped a specific choice in the screen above: the
        optional prompt sitting over the open canvas, the auto-save status
        in the corner, and the prominent “Day 12” streak indicator at the
        top of the screen.
      </p>
    </motion.div>
  );
}
