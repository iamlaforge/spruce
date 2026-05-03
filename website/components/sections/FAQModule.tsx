"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { DURATION, EASE_CONSIDERED } from "@/lib/motion";
import { getFAQItem, type FAQItem } from "@/lib/faq";

/**
 * Homepage FAQ module — a curated subset of /faq's questions, presented
 * as an accordion. Catches first-time visitors who haven't yet learned
 * the question to ask, without forcing them to leave the marketing flow.
 *
 * The four questions surfaced here form a clean evaluation arc for
 * first-time visitors: what is this vs rules files, how does it
 * actually work, will it work with my tools, can I trust it. The fuller
 * /faq page covers practical questions for visitors already using Spruce.
 *
 * Interaction: single accordion (one open at a time). Clicking the
 * active question collapses it. Plus glyph rotates 45° to become a
 * close glyph when open. Honors prefers-reduced-motion via Motion's
 * built-in handling.
 */

const HOMEPAGE_QUESTION_SLUGS = [
  "vs-rules-files",
  "spruce-md",
  "tool-compatibility",
  "open-source-license",
];

export function FAQModule() {
  const items = HOMEPAGE_QUESTION_SLUGS.map(getFAQItem).filter(
    (item): item is FAQItem => item !== undefined,
  );

  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <Section id="faq" tone="default">
      <SectionHeader mark="§ 04">FAQ &middot; Common questions</SectionHeader>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12">
        {/* LEFT: editorial frame. One editorial line that says what the
            answers do (rather than describing the accordion mechanic),
            plus the pointer to the full FAQ. The strong/muted split
            matches the rhythm of the Install and Terminal section
            frames. */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-2 mb-10 lg:mb-0">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            What visitors ask most.{" "}
            <span className="text-ink-muted">Answered directly.</span>
          </p>
          <p className="mt-8 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            <Link
              href="/faq"
              className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
            >
              See the full FAQ &rarr;
            </Link>
          </p>
        </div>

        {/* RIGHT: accordion. Each row is a question button + collapsible
            answer panel. */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ul role="list" className="list-none">
            {items.map((item) => (
              <FAQRow
                key={item.slug}
                item={item}
                isOpen={openSlug === item.slug}
                onToggle={() =>
                  setOpenSlug(openSlug === item.slug ? null : item.slug)
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// FAQRow — one question + collapsible answer. Button row stays mounted;
// the answer panel mounts/unmounts via AnimatePresence, with height +
// opacity animated together so the row collapses cleanly.
// ---------------------------------------------------------------------------

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${item.slug}`;
  const buttonId = `faq-button-${item.slug}`;

  return (
    <li className="border-t border-rule-subtle last:border-b">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-baseline gap-4 py-5 md:py-6 text-left group transition-colors duration-fast ease-considered hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
      >
        <span
          className={`flex-1 font-display italic font-normal text-base md:text-lg leading-snug text-pretty transition-colors duration-fast ease-considered ${
            isOpen ? "text-accent" : "text-ink group-hover:text-accent"
          }`}
        >
          {item.question}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: DURATION.fast, ease: EASE_CONSIDERED }}
          className="font-mono text-lg leading-none text-accent flex-none mt-1"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_CONSIDERED }}
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-7 pr-10 text-base text-ink leading-relaxed text-pretty max-w-prose space-y-3">
              {item.answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
