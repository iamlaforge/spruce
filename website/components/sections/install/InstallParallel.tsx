"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { DURATION, EASE_CONSIDERED, MARKER_SPRING } from "@/lib/motion";

/**
 * Install section — install command on the left, "after installing"
 * patterns on the right. The right column was three vertically-stacked
 * pattern rows; it's now a tab strip with one panel below, swapping
 * heading + body + command for the active pattern.
 *
 * Why tabs: the three patterns (Setup / Generate / Critique) are
 * parallel by design, and the original Install section dropped body copy
 * to keep the stack compact. Tabs let us reintroduce the body for each
 * pattern without adding scroll — visitors flip between them at their
 * pace, and the tab strip itself communicates "three things here" at a
 * glance.
 *
 * The accent underline on the active tab uses Motion's shared-layout
 * (layoutId) so it slides between tabs, matching the DesigningTabBar and
 * the BeforeAfterDemo toggle.
 */

type Pattern = {
  label: string;
  heading: string;
  body: React.ReactNode;
  command: string;
};

const PATTERNS: Pattern[] = [
  {
    label: "Setup",
    heading: "Set up your project.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/spruce up</code>{" "}
        once. It walks through a short interview about your product,
        audience, and direction, then writes a context file that every
        subsequent command reads. Your design language travels with the
        project.
      </>
    ),
    command: "/spruce up",
  },
  {
    label: "Discover",
    heading: "Ground the work in users.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/personas</code>{" "}
        to capture who the product is for. Spruce drafts from your{" "}
        <code className="font-mono text-sm text-ink">.spruce.md</code>{" "}
        context when you don&rsquo;t have research yet, structures it
        when you do, or pressure-tests a finished artifact. Every
        downstream command reasons from{" "}
        <code className="font-mono text-sm text-ink">.personas.md</code>.
      </>
    ),
    command: "/personas",
  },
  {
    label: "Generate",
    heading: "Generate calibrated design.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/design</code>{" "}
        followed by what you want. The output is calibrated to your
        project&rsquo;s context and the personas you captured, not generic
        SaaS templates. Spruce reasons through typography, color, spacing,
        and component decisions before writing code.
      </>
    ),
    command: "/design the pricing page",
  },
  {
    label: "Critique",
    heading: "Get a design director’s read.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/critique</code> to
        receive opinionated feedback on what&rsquo;s been built — what&rsquo;s
        working, what isn&rsquo;t, what to address next. Less generation,
        more guidance.
      </>
    ),
    command: "/critique",
  },
];

export function InstallParallel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PATTERNS[activeIdx];

  return (
    <Section id="install" tone="default">
      <SectionHeader mark="§ 04">Install &middot; One command</SectionHeader>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-14 mb-16 md:mb-20">
        {/* LEFT: install action — unchanged. */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            One command.{" "}
            <span className="text-ink-muted">
              Spruce installs into Claude Code and stays out of your way until
              you ask for it.
            </span>
          </p>
          <CodeBlock size="md" prompt="$" className="mt-8 md:mt-10">
            npx spruce-skill add
          </CodeBlock>
          <p className="mt-5 text-sm text-ink-subtle leading-relaxed text-pretty">
            Cursor, Gemini, and other harnesses are coming soon.{" "}
            <Link href="/install" variant="subtle">
              More download options &rarr;
            </Link>
          </p>
        </div>

        {/* RIGHT: tabbed pattern explorer. Tab strip + animated panel. */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            After installing
          </p>
          <p className="mt-3 font-display font-normal text-xl md:text-2xl leading-tight tracking-tight text-ink text-balance">
            Four patterns to start with.
          </p>

          {/* Tab strip — sits below the heading on a hairline rule. The
              active tab gets an accent underline that slides between tabs
              via shared-layout. */}
          <div
            role="tablist"
            aria-label="Install pattern examples"
            className="mt-7 md:mt-8 flex items-center gap-6 border-b border-rule-subtle"
          >
            <LayoutGroup>
              {PATTERNS.map((pattern, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={pattern.label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`install-panel-${pattern.label.toLowerCase()}`}
                    id={`install-tab-${pattern.label.toLowerCase()}`}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative font-mono text-2xs uppercase tracking-widest py-3 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm ${
                      isActive
                        ? "text-accent"
                        : "text-ink-subtle hover:text-ink"
                    }`}
                  >
                    {pattern.label}
                    {isActive ? (
                      <motion.span
                        layoutId="install-tab-underline"
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

          {/* Panel — swaps content with a fade. AnimatePresence with
              mode="wait" ensures the outgoing content exits before the
              incoming content enters, so the panel doesn't double up on
              its own height during the swap. */}
          <div
            role="tabpanel"
            id={`install-panel-${active.label.toLowerCase()}`}
            aria-labelledby={`install-tab-${active.label.toLowerCase()}`}
            className="mt-6 md:mt-7"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
              >
                <h3 className="font-display font-normal text-base md:text-lg text-ink leading-snug tracking-snug">
                  {active.heading}
                </h3>
                <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed text-pretty max-w-prose">
                  {active.body}
                </p>
                <CodeBlock size="sm" className="mt-5">
                  {active.command}
                </CodeBlock>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer — pointers to walkthrough, catalog, and FAQ. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/designing" variant="subtle">
            Full walkthrough &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link href="/commands" variant="subtle">
            Browse all commands &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link href="/faq" variant="subtle">
            Common questions &rarr;
          </Link>
        </div>
      </div>
    </Section>
  );
}
