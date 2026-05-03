"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FADE, PAYOFF } from "@/lib/motion";
import { TranscriptFrame } from "./DemoFrame";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import { StillpointHeading } from "@/src/case-studies/stillpoint/components/StillpointHeading";
import {
  MoonIcon,
  SunRisingIcon,
  WaveIcon,
} from "@/src/case-studies/stillpoint/components/StillpointIcons";
import { PersonalizationBanner } from "@/src/case-studies/stillpoint/fragments/PersonalizationBanner";

/**
 * /decide demo. Walks the visitor through a stepped option-card flow on
 * a real Stillpoint feature-ideation moment: adding a personalization
 * banner to the practices section of the home page.
 *
 * Catalog narrative position: /decide sits AFTER /design (which produced
 * the home page) and /remix (which surfaces alternative directions). At
 * this point a direction is chosen; /decide guides specific decisions
 * when ideating an addition or adjustment on top of that direction.
 *
 * Three decisions are surfaced sequentially:
 *   1. Where the personalization sits relative to the practices grid
 *   2. What recognition strategy the personalization uses
 *   3. What copy register the personalization speaks in
 *
 * Each step renders as a card showing the question, the options laid
 * out (the chosen one visually marked), and a one-line rationale. After
 * the third decision, the practices section reveals with the chosen
 * personalization banner above it. The current Home.tsx is unchanged —
 * this is /decide's worked example, not a modification of the live
 * design.
 */

// ──────────────────────────────────────────────────────────────────────
// Decision data
// ──────────────────────────────────────────────────────────────────────

type Decision = {
  number: string;
  name: string;
  frame: string;
  options: Array<{
    label: string;
    description: string;
    chosen?: boolean;
  }>;
  rationale: string;
};

const DECISIONS: Decision[] = [
  {
    number: "01",
    name: "Placement",
    frame:
      "Where does the personalization sit relative to the existing practices grid?",
    options: [
      {
        label: "Banner above grid",
        description:
          "A full-width recommendation band above the three practice cards. Reads as a personal moment, then catalog.",
        chosen: true,
      },
      {
        label: "Replaces a card",
        description:
          "The personalized recommendation takes one of the three card slots. Tighter, but loses one of the curated practices.",
      },
      {
        label: "Fourth card alongside",
        description:
          "Adds a fourth card to the grid. Equal visual weight to the existing three; risks compounding the equal-cards pattern.",
      },
      {
        label: "Inline within existing cards",
        description:
          "No new UI; existing cards reorder or get a small tag based on the visitor. Quietest.",
      },
    ],
    rationale:
      "Banner above grid keeps the curated three-practice rhythm intact while making the personal moment unmistakable. Replacing a card or adding a fourth shifts the section's information architecture; inline reordering is too quiet to do the work the feature is meant to do.",
  },
  {
    number: "02",
    name: "Recognition strategy",
    frame: "What does the personalization recognize about the visitor?",
    options: [
      {
        label: "Time-of-day",
        description:
          'Signals based on when the visitor lands. "Tonight, try a 7-minute Body Scan."',
        chosen: true,
      },
      {
        label: "Mood-prompt",
        description:
          'Asks the visitor how they\'re feeling. "How are you arriving today?"',
      },
      {
        label: "Continuation",
        description:
          'Picks up from the last session. "You ended Wednesday at 3 minutes — finish where you left off?"',
      },
    ],
    rationale:
      "Time-of-day works for both first-time visitors (no prior session) and returning ones (no commitment to a specific journey). Mood-prompt requires interaction before any value lands; continuation requires a session history that not every visitor has.",
  },
  {
    number: "03",
    name: "Copy register",
    frame: "How does the personalization speak?",
    options: [
      {
        label: "Warm-conversational",
        description:
          'Like a calm friend offering a suggestion. "It\'s evening — let the day settle with this one."',
        chosen: true,
      },
      {
        label: "Direct-functional",
        description:
          '"Recommended tonight: Evening Wind-down."',
      },
      {
        label: "Quiet recommendation",
        description: "Just the practice name + duration; no surrounding copy.",
      },
    ],
    rationale:
      "The Stillpoint voice in .spruce.md is calm, encouraging, like a supportive friend — direct without being curt, warm without being saccharine. Warm-conversational matches that register; direct-functional reads as utility and quiet feels like it underweights the moment.",
  },
];

// ──────────────────────────────────────────────────────────────────────
// Demo component — stepped option-card flow
// ──────────────────────────────────────────────────────────────────────

export function DecideDemo() {
  const [step, setStep] = useState(1);
  const total = DECISIONS.length;
  const isComplete = step > total;
  const visible = DECISIONS.slice(0, Math.min(step, total));

  return (
    <TranscriptFrame
      eyebrow="Decision flow"
      scope={
        isComplete
          ? `Decisions made · ${total} of ${total}`
          : `Decision ${step} of ${total}`
      }
    >
      {/* Brief — the scope of the worked example, set above the cards */}
      <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty max-w-prose mb-7 md:mb-8">
        Brief:{" "}
        <span className="text-ink">
          adding a personalization banner to the practices section of
          Stillpoint&rsquo;s home page.
        </span>{" "}
        Three decisions surface; each picks a direction with a one-line
        rationale.
      </p>

      {/* Before-state — the practices section as it currently stands on
          /design's home output. Visitors see what's being modified before
          stepping through the decisions. */}
      <BeforePreview />

      <div className="space-y-6 md:space-y-7">
        {visible.map((d) => (
          <DecisionCard key={d.number} decision={d} />
        ))}

        <AnimatePresence>
          {isComplete ? <Payoff key="payoff" /> : null}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 md:mt-10 pt-6 border-t border-rule-subtle flex flex-wrap items-center justify-between gap-3">
        {!isComplete ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {step < total ? "Next decision →" : "Generate output →"}
          </button>
        ) : (
          <span className="font-mono text-2xs uppercase tracking-widest text-accent">
            Output generated
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

// ──────────────────────────────────────────────────────────────────────
// BeforePreview — the practices section as it currently exists on
// /design's home output, rendered as a "before" thumbnail above the
// option cards. Visitors who haven't read /commands/design first still
// see what's being modified before walking through the decisions. The
// "after" state lives in Payoff at the bottom for direct comparison.
// ──────────────────────────────────────────────────────────────────────

function BeforePreview() {
  return (
    <div className="mb-7 md:mb-8">
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        Before · current practices section
      </p>
      <StillpointScope>
        <div
          style={{
            background: "var(--stp-color-surface)",
            borderRadius: "var(--stp-radius-md)",
            padding: "var(--stp-space-6)",
            border: "1px solid var(--stp-color-border)",
          }}
        >
          {/* Eyebrow mirrors Home.tsx's current state — TODAYS
              PRACTICES (missing apostrophe + no letter-spacing) is the
              rough edge /design left for /typeface to address later.
              The before-state shows it accurately. */}
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--stp-color-text-subtle)",
              margin: "0 0 var(--stp-space-2) 0",
            }}
          >
            TODAYS PRACTICES
          </p>
          <StillpointHeading
            level="sub"
            style={{ marginBottom: "var(--stp-space-5)" }}
          >
            A practice for every moment.
          </StillpointHeading>
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "var(--stp-space-3)" }}
          >
            {PRACTICES.map((p) => {
              const Icon = p.Icon;
              return (
                <StillpointCard key={p.title}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--stp-space-2)",
                      color: "var(--stp-color-sage)",
                      margin: "0 0 var(--stp-space-2) 0",
                    }}
                  >
                    <Icon size={16} aria-hidden />
                    <span
                      style={{
                        fontFamily: "var(--stp-font-sans)",
                        fontSize: "var(--stp-text-xs)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--stp-tracking-wide)",
                        fontWeight: 500,
                      }}
                    >
                      {p.duration}
                    </span>
                  </div>
                  <StillpointHeading
                    level="minor"
                    style={{ marginBottom: "var(--stp-space-2)" }}
                  >
                    {p.title}
                  </StillpointHeading>
                  <p
                    style={{
                      fontFamily: "var(--stp-font-sans)",
                      fontSize: "var(--stp-text-sm)",
                      lineHeight: "var(--stp-leading-base)",
                      color: "var(--stp-color-text-muted)",
                      margin: 0,
                    }}
                  >
                    {p.description}
                  </p>
                </StillpointCard>
              );
            })}
          </div>
        </div>
      </StillpointScope>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// DecisionCard — one decision rendered as a card with question + options
// (chosen marked) + rationale. Each option is a small card; the chosen
// one gets a sage outline + sage-subtle background.
// ──────────────────────────────────────────────────────────────────────

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={FADE}
      className="border border-rule rounded-md px-5 py-5 md:px-6 md:py-6"
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent">
          Decision {decision.number}
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {decision.name}
        </span>
      </div>
      <p className="font-display italic font-normal text-lg md:text-xl text-ink leading-snug max-w-prose">
        {decision.frame}
      </p>

      {/* Options laid out as small cards. Chosen one is visually marked. */}
      <ul role="list" className="list-none mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {decision.options.map((opt) => {
          const isChosen = opt.chosen;
          return (
            <li
              key={opt.label}
              className={`relative rounded-sm px-4 py-3 transition-colors duration-fast ease-considered ${
                isChosen
                  ? "border border-accent bg-accent/5"
                  : "border border-rule-subtle"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p
                  className={`font-mono text-2xs uppercase tracking-widest ${
                    isChosen ? "text-accent" : "text-ink-subtle"
                  }`}
                >
                  {opt.label}
                </p>
                {isChosen ? (
                  <span
                    aria-label="Chosen"
                    className="font-mono text-2xs uppercase tracking-widest text-accent"
                  >
                    ✓ Chosen
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-ink-muted leading-snug text-pretty">
                {opt.description}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Rationale */}
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mt-5 mb-2">
        Why
      </p>
      <p className="text-sm text-ink leading-relaxed text-pretty max-w-prose">
        {decision.rationale}
      </p>
    </motion.article>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Payoff — renders the resulting practices section with the chosen
// personalization banner above the existing three-card grid. The cards
// themselves match the live home page; the banner is the new piece
// /decide produced.
// ──────────────────────────────────────────────────────────────────────

const PRACTICES = [
  {
    title: "Morning Grounding",
    duration: "5 min · Breath",
    description: "Begin the day with a few mindful minutes.",
    Icon: SunRisingIcon,
  },
  {
    title: "Mid-day Reset",
    duration: "3 min · Breath",
    description: "A short pause to reset between meetings.",
    Icon: WaveIcon,
  },
  {
    title: "Evening Wind-down",
    duration: "7 min · Body scan",
    description: "Let the day settle before sleep.",
    Icon: MoonIcon,
  },
];

function Payoff() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={PAYOFF}
      className="border-t border-rule-subtle pt-7 md:pt-8 mt-2"
    >
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        After · practices section with personalization banner
      </p>

      <StillpointScope>
        <div
          style={{
            background: "var(--stp-color-surface)",
            borderRadius: "var(--stp-radius-md)",
            padding: "var(--stp-space-8)",
            border: "1px solid var(--stp-color-border)",
          }}
        >
          {/* Personalization banner — banner-above-grid placement,
              time-of-day recognition, warm-conversational copy */}
          <PersonalizationBanner />

          {/* Existing three-card practices grid below — eyebrow mirrors
              Home.tsx's current rough-edge state (missing apostrophe + no
              letter-spacing). /typeface will address both later. */}
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--stp-color-text-subtle)",
              margin: "var(--stp-space-10) 0 var(--stp-space-3) 0",
            }}
          >
            TODAYS PRACTICES
          </p>
          <StillpointHeading
            level="sub"
            style={{ marginBottom: "var(--stp-space-6)" }}
          >
            A practice for every moment.
          </StillpointHeading>
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "var(--stp-space-4)" }}
          >
            {PRACTICES.map((p) => {
              const Icon = p.Icon;
              return (
                <StillpointCard key={p.title}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--stp-space-2)",
                      color: "var(--stp-color-sage)",
                      margin: "0 0 var(--stp-space-3) 0",
                    }}
                  >
                    <Icon size={18} aria-hidden />
                    <span
                      style={{
                        fontFamily: "var(--stp-font-sans)",
                        fontSize: "var(--stp-text-xs)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--stp-tracking-wide)",
                        fontWeight: 500,
                      }}
                    >
                      {p.duration}
                    </span>
                  </div>
                  <StillpointHeading
                    level="minor"
                    style={{ marginBottom: "var(--stp-space-2)" }}
                  >
                    {p.title}
                  </StillpointHeading>
                  <p
                    style={{
                      fontFamily: "var(--stp-font-sans)",
                      fontSize: "var(--stp-text-sm)",
                      lineHeight: "var(--stp-leading-base)",
                      color: "var(--stp-color-text-muted)",
                      margin: 0,
                    }}
                  >
                    {p.description}
                  </p>
                </StillpointCard>
              );
            })}
          </div>
        </div>
      </StillpointScope>

      <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose mt-5">
        The personalization banner is the new piece /decide produced —
        placement, recognition, and copy all reflect the directions you
        named above. The three-card practices grid sits below unchanged.
      </p>
    </motion.div>
  );
}

// PersonalizationBanner is now imported from
// `src/case-studies/stillpoint/fragments/PersonalizationBanner` — same
// component renders here in the demo Payoff and on the live home page,
// so what /decide produced lives in the actual Stillpoint site rather
// than only in the catalog illustration.
