"use client";

import { motion } from "motion/react";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { DURATION, EASE_CONSIDERED } from "@/lib/motion";

const revisions: Array<{ defaultText: string; alternative: string }> = [
  { defaultText: "Inter for everything", alternative: "A typeface for this product" },
  { defaultText: "Blue and purple gradients", alternative: "Warm neutrals, one accent" },
  { defaultText: "Three equal cards", alternative: "Asymmetric, editorial" },
  { defaultText: "8px corners by reflex", alternative: "Restrained, specific" },
  { defaultText: "“Let’s get started!”", alternative: "Direct, no throat-clearing" },
  { defaultText: "Linear easing, 300ms", alternative: "Custom curves, paced" },
];

export function PhilosophyCounterpointStrikethrough() {
  return (
    <Section id="philosophy" tone="default">
      <SectionHeader mark="§ 01">Philosophy &middot; A revision</SectionHeader>

      {/* Movement 1 — the problem */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
            <span className="text-ink-muted">
              It&rsquo;s that all AI designs the same way.
            </span>
          </p>
          <p className="mt-8 md:mt-10 text-base md:text-lg text-ink leading-relaxed text-pretty">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices
            appear far more often than others. When a model generates new
            design, it reaches for those defaults reflexively &mdash; not
            because they&rsquo;re right for your product, but because
            they&rsquo;re statistically most likely.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed text-pretty">
            We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            . They&rsquo;re everywhere because they&rsquo;re always available.
          </p>
        </div>
      </div>

      <RevisionsList />

      {/* Movement 3 — the alternative. Leads with the positioning claim
          (starts with users, not pixels), then unpacks the three levels
          as how that claim manifests in practice. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Spruce is the alternative.{" "}
            <span className="text-ink-muted">
              It starts with users, not pixels.
            </span>
          </p>
          <p className="mt-8 md:mt-10 text-base md:text-lg text-ink leading-relaxed text-pretty">
            Most AI design tools generate from prompts and fill in the
            decisions invisibly. Spruce starts upstream &mdash; with named
            personas, the jobs they&rsquo;re hiring the product to do, the
            moments they encounter the design. Captured into context files
            every command reads from, so every decision can be tied to a
            real person doing a real thing.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed text-pretty">
            From that grounding, Spruce composes the design reasoning that
            follows &mdash; typography, color, spacing, components, motion,
            voice. The fundamentals good design has always rested on, now
            calibrated to a specific product for a specific audience. And it
            gives you tactical control through a set of commands that let
            you direct, refine, or rethink any decision.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed text-pretty">
            The grounding makes the reasoning specific; the reasoning runs
            in the background; the commands put you in the chair.
          </p>
        </div>
      </div>

      {/* Closing — coda. Lighter divider, slightly tightened internal padding. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <p className="text-base md:text-lg text-ink leading-relaxed text-pretty">
            What you get back is design that happens to be made with AI
            rather than AI design.
          </p>
          <p className="mt-6 font-display italic font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            The product gets to look like itself.
          </p>
        </div>
      </div>
    </Section>
  );
}

/**
 * The signature visual moment of the section: each AI-default phrase has its
 * strike line drawn in left-to-right when the list enters the viewport. The
 * strike is a separately-rendered motion span (not text-decoration), animated
 * via scaleX from 0 to 1 with transform-origin: left.
 *
 * Stagger: 90ms between rows. Six rows × 90ms = 540ms total cascade — slow
 * enough to be felt as a sequence (the rhetorical move executing), fast
 * enough that the visitor's eye can hold them all in one read.
 *
 * The semantic <del> wraps the text for assistive tech; its visual
 * line-through is suppressed (no-underline) so the motion span can do the
 * visual work.
 */
function RevisionsList() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      id="slop"
      className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16"
    >
      <ul
        role="list"
        className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-2 list-none space-y-3 md:space-y-4"
      >
        {revisions.map((row, i) => (
          <li
            key={row.alternative}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-baseline gap-y-1 gap-x-4 md:gap-x-6 font-display text-lg md:text-xl leading-snug"
          >
            <del className="relative inline-block no-underline text-ink-subtle">
              {row.defaultText}
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 top-1/2 h-0.5 bg-rule-strong origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{
                  duration: DURATION.slow,
                  delay: inView ? 0.15 + i * 0.09 : 0,
                  ease: EASE_CONSIDERED,
                }}
              />
            </del>
            <span
              aria-hidden
              className="hidden md:inline font-mono text-2xs text-accent uppercase tracking-widest"
            >
              &rarr;
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{
                duration: DURATION.base,
                delay: inView ? 0.35 + i * 0.09 : 0,
                ease: EASE_CONSIDERED,
              }}
            >
              <span className="sr-only">replaced with </span>
              <ins className="text-ink no-underline">{row.alternative}</ins>
            </motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
}
