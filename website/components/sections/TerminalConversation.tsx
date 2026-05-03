"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { DURATION, EASE_CONSIDERED, FADE, MARKER_SPRING } from "@/lib/motion";

/**
 * In your terminal section. Two-part demonstration of what Spruce actually
 * looks like when you run it in Claude Code:
 *
 * 1. One terminal window with three tabs at the top — opening exchanges
 *    from /spruce-up, /critique, and /decide. Visitors flip between
 *    sessions the way they would in a real terminal app, seeing the
 *    conversational register, the editorial voice, and the guided-decision
 *    mechanic without scrolling through three stacked blocks.
 *
 * 2. One interactive live conversation below — visitors advance through
 *    a full /decide flow on the meditation app's reflection screen,
 *    watching the back-and-forth unfold turn by turn. Shows the
 *    conversational rhythm that the static snippets only sample.
 *
 * Sits between Demonstration (visual proof) and FAQ + Install (action) in
 * the page flow. The visitor sees what Spruce produces (Demonstration),
 * what it feels like to run (Terminal), then commits or asks (FAQ /
 * Install).
 *
 * Visual register: dark terminal surface using the warm-tinted ink color
 * and inverse cream text. The terminal-style tab bar sits inside the dark
 * window, matching how real terminal apps present multiple sessions —
 * tabs at top, content below, active tab marked with an accent underline.
 */

type Turn = {
  role: "user" | "spruce";
  content: string;
};

type Snippet = {
  /** Tab label — short, command-style, the way real terminal tabs read. */
  tabLabel: string;
  /** One-line caption inside the panel describing what this session is. */
  caption: string;
  turns: Turn[];
};

const SNIPPETS: Snippet[] = [
  {
    tabLabel: "/spruce-up",
    caption: "The interview",
    turns: [
      { role: "user", content: "/spruce-up" },
      {
        role: "spruce",
        content:
          "I'll ask you a few questions to set up the design context for your project. The answers will be saved to .spruce.md and read by every Spruce command going forward.\n\nWhat does this product do, and what's the core experience you want users to have?",
      },
      {
        role: "user",
        content:
          "A short-session meditation app for parents — five-minute practices designed to fit into the gaps of a busy day. The core experience is recovery, not transformation.",
      },
      {
        role: "spruce",
        content: "Got it. Next: who uses it? What do you know about them?",
      },
    ],
  },
  {
    tabLabel: "/critique",
    caption: "A design-director read",
    turns: [
      { role: "user", content: "/critique reflection screen" },
      {
        role: "spruce",
        content:
          "### The overall take\n\nThe reflection screen is in strong directional shape. The hybrid input pattern (an optional prompt above an open canvas) gives users agency without forcing structure on the practice; the auto-save and the prominent “Day 12” streak indicator reinforce the consistency framing your .spruce.md describes. The work isn't hedging on its character — what's on screen expresses what it should be expressing. The remaining concerns are flow and state coverage, not direction.\n\n[continues with character, coherence, specific moments, direction forward]",
      },
    ],
  },
  {
    tabLabel: "/decide",
    caption: "Guided design",
    turns: [
      { role: "user", content: "/decide dashboard overview page" },
      {
        role: "spruce",
        content:
          "Okay — we're designing a dashboard overview page for your product, which your context file describes as a data-heavy analytics tool for senior marketers. Before I generate, I want to walk you through a few decisions. Ready?",
      },
      { role: "user", content: "ready" },
      {
        role: "spruce",
        content:
          "**Decision 1: Information density**\n\nDashboards sit on a spectrum from spacious (few widgets, lots of whitespace) to dense (many widgets, optimized for sustained use by experts).\n\nOptions:\n- Spacious — 3-4 primary widgets, generous padding\n- Balanced — 6-8 widgets with clear hierarchy\n- Dense — 10+ widgets, tight spacing\n- Decide for me\n\nWhich direction?",
      },
      { role: "user", content: "balanced" },
    ],
  },
];

// Live conversation — full /decide flow on the meditation app's reflection
// screen. Mirrors the decisions in the existing /decide demo (entry method,
// save behavior, consistency framing) but rendered as the actual
// conversation rather than as decision-card blocks.
const LIVE_TURNS: Turn[] = [
  { role: "user", content: "/decide reflection screen" },
  {
    role: "spruce",
    content:
      "Okay — we're designing a reflection screen for the meditation app, which your context describes as warm and unhurried, calm without being precious. Three decisions to walk through. Ready?",
  },
  { role: "user", content: "ready" },
  {
    role: "spruce",
    content:
      "**Decision 1: How should the user enter their reflection?**\n\nOptions:\n- Open canvas — a blank text area; write whatever comes up\n- Prompts — one or two questions to respond to\n- Hybrid — a prompt above an open canvas; the prompt is optional\n- Decide for me\n\nWhich direction?",
  },
  { role: "user", content: "hybrid" },
  {
    role: "spruce",
    content:
      "Got it — hybrid. Next:\n\n**Decision 2: When does the reflection get saved?**\n\nOptions:\n- Auto-save — writes as the user types; no commit step\n- Explicit save — user writes, then taps Save when done\n- Auto + revisit — saves continuously; user can mark “done” when they want\n- Decide for me\n\nWhich direction?",
  },
  { role: "user", content: "auto-save" },
  {
    role: "spruce",
    content:
      "Auto-save. Last one:\n\n**Decision 3: How does the screen frame consistency?**\n\nOptions:\n- Daily streak — count days; surface the count prominently\n- Quiet record — past entries available but no streak, no urgency\n- No history — each reflection lands and disappears\n- Decide for me\n\nWhich direction?",
  },
  { role: "user", content: "daily streak" },
  {
    role: "spruce",
    content:
      "All three decisions made. Generating the reflection screen now — hybrid input above an optional prompt, auto-save with a quiet “saved” status, and a prominent “Day 12” streak indicator at the top of the screen.\n\nHappy to iterate if anything doesn't feel right.",
  },
];

export function TerminalConversation() {
  return (
    <Section id="terminal" tone="default">
      <SectionHeader mark="§ 03">
        In your terminal &middot; See it run
      </SectionHeader>

      {/* Intro paragraph — names the structure without instructing
          visitors how to use the tabs. The tab bar is self-evident; the
          editorial copy stays editorial. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Three real interactions.{" "}
            <span className="text-ink-muted">
              What Spruce looks like when you run it in Claude Code.
            </span>
          </p>
        </div>
      </div>

      {/* Tabbed terminal — one dark window, three tabs at the top, one
          panel below that swaps content for the active tab. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <TabbedTerminal snippets={SNIPPETS} />
        </div>
      </div>

      {/* Bridge paragraph — frames the live conversation as the deeper
          showcase. Heavier rule above to mark the structural transition
          from static snippets to interactive playback. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2 border-t border-rule pt-12 md:pt-16">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Or watch one unfold.{" "}
            <span className="text-ink-muted">
              The full guided-design flow through three decisions on the
              meditation app's reflection screen, in real time.
            </span>
          </p>
        </div>
      </div>

      {/* Live conversation — same terminal styling as the snippets, but
          interactive. Visitor advances through the conversation turn by
          turn via a Next button below the block. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <LiveConversation turns={LIVE_TURNS} />
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// TabbedTerminal — single dark window with three tabs at the top. Tabs sit
// inside the dark surface (terminal-app pattern, not page-level tabs), so
// the whole block reads as one terminal session-switcher rather than as a
// page section split into tabbed slices. Active tab gets an accent
// underline that slides between tabs via shared-layout.
// ---------------------------------------------------------------------------

function TabbedTerminal({ snippets }: { snippets: Snippet[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = snippets[activeIdx];

  return (
    <div className="bg-ink text-ink-inverse rounded-md overflow-hidden">
      {/* Tab bar — sits inside the dark surface. Bottom border is a
          subtle hairline using the inverse text color at low opacity, so
          it reads as part of the terminal chrome rather than as a page
          rule. */}
      <div
        role="tablist"
        aria-label="Terminal sessions"
        className="flex items-center gap-2 md:gap-4 px-3 md:px-4 border-b border-ink-inverse/10"
      >
        <LayoutGroup>
          {snippets.map((snippet, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={snippet.tabLabel}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`terminal-panel-${idx}`}
                id={`terminal-tab-${idx}`}
                onClick={() => setActiveIdx(idx)}
                className={`relative font-mono text-xs md:text-sm py-3 md:py-3.5 px-2 md:px-3 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm ${
                  isActive
                    ? "text-ink-inverse"
                    : "text-ink-inverse/50 hover:text-ink-inverse/80"
                }`}
              >
                {snippet.tabLabel}
                {isActive ? (
                  <motion.span
                    layoutId="terminal-tab-underline"
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                    transition={MARKER_SPRING}
                  />
                ) : null}
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Panel — caption + conversation. AnimatePresence with mode="wait"
          ensures the outgoing content exits before the incoming content
          enters, so the panel doesn't double-stack during the swap. */}
      <div
        role="tabpanel"
        id={`terminal-panel-${activeIdx}`}
        aria-labelledby={`terminal-tab-${activeIdx}`}
        className="px-5 py-5 md:px-6 md:py-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.tabLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
          >
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-inverse/60 mb-4">
              {active.caption}
            </p>
            <div className="font-mono text-xs md:text-sm leading-relaxed">
              {active.turns.map((turn, i) => (
                <TurnView
                  key={i}
                  turn={turn}
                  isLast={i === active.turns.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LiveConversation — interactive stepper through a longer captured
// conversation. Same terminal styling as the snippets so the visitor reads
// it as the same kind of artifact, but with manual advance controls.
// ---------------------------------------------------------------------------

function LiveConversation({ turns }: { turns: Turn[] }) {
  const [step, setStep] = useState(1); // visible turn count
  const total = turns.length;
  const isComplete = step >= total;
  const visible = turns.slice(0, step);

  return (
    <figure>
      <figcaption className="flex flex-wrap items-center justify-between gap-y-3 mb-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          /decide &mdash; reflection screen
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {isComplete
            ? `Conversation complete · ${total} of ${total}`
            : `Turn ${step} of ${total}`}
        </span>
      </figcaption>

      <div className="bg-ink text-ink-inverse rounded-md px-5 py-5 md:px-6 md:py-6 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
        {visible.map((turn, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={FADE}
          >
            <TurnView turn={turn} isLast={i === visible.length - 1} />
          </motion.div>
        ))}
      </div>

      {/* Controls — Next advances; on the last turn the button label
          becomes Restart for replay. */}
      <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-between gap-3">
        {!isComplete ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(total, s + 1))}
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent border border-rule rounded-sm px-3 py-1.5 transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {step === total - 1 ? "Generate →" : "Next turn →"}
          </button>
        ) : (
          <span className="font-mono text-2xs uppercase tracking-widest text-accent">
            Reflection screen generated
          </span>
        )}

        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="font-mono text-2xs uppercase tracking-widest text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            Restart
          </button>
        ) : null}
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// TurnView — one conversation turn rendered inside a terminal block. User
// turns get an accent-colored › prefix and full-bright cream text;
// Spruce turns have no prefix and slightly muted text so the back-and-forth
// reads as visually distinct without color-coding the content itself.
// ---------------------------------------------------------------------------

function TurnView({ turn, isLast }: { turn: Turn; isLast: boolean }) {
  const isUser = turn.role === "user";
  return (
    <div className={isLast ? "" : "mb-4"}>
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
