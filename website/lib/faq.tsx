import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Shared FAQ data. The full /faq page renders all groups; the homepage
 * FAQModule pulls a subset by slug for its accordion. Single source of
 * truth so an answer rewritten in one place updates everywhere.
 */

export type FAQItem = {
  /** Stable slug for cross-referencing (e.g., from the homepage module). */
  slug: string;
  question: string;
  answer: ReactNode;
};

export type FAQGroup = {
  marker: string;
  title: string;
  items: FAQItem[];
};

export const FAQ_GROUPS: FAQGroup[] = [
  {
    marker: "The system",
    title: "What Spruce is.",
    items: [
      {
        slug: "vs-rules-files",
        question:
          "How is Spruce different from .cursorrules, .mdc files, or other AI rules?",
        answer: (
          <>
            <p>
              Rules files are passive — they load context the AI consults
              while it generates. Spruce is a reasoning system invoked by
              command. Twenty-five commands across five tiers — setup,
              discovery, generative, diagnostic, corrective — each with its
              own reference file that loads only when the command runs.
            </p>
            <p>
              The deeper difference is positioning. Rules tell the AI what
              to avoid. Spruce gives you a vocabulary to direct the work,
              grounds the work in who the product is for, and surfaces the
              calls a creative director would make.
            </p>
          </>
        ),
      },
      {
        slug: "meditation-aesthetic",
        question:
          "Does my product need to use the meditation-app aesthetic?",
        answer: (
          <p>
            No. The meditation app is the example threading the site
            together — every demo, every artifact references the same
            fictional product so the page reads as one coherent narrative.
            Your product calibrates to its own context. You describe what it
            is in{" "}
            <code className="font-mono text-base text-accent">/spruce-up</code>
            , and every Spruce command reasons against that context, not
            against the example.
          </p>
        ),
      },
      {
        slug: "spruce-md",
        question: "What's .spruce.md, and where does it live?",
        answer: (
          <p>
            A markdown file at the root of your project. It captures your
            product&rsquo;s character — what it does, who uses it, what
            voice it speaks in, how dense it should feel.{" "}
            <code className="font-mono text-base text-accent">/spruce-up</code>{" "}
            creates it through a five-minute interview; every other Spruce
            command reads it before reasoning about your work. The context
            evolves as the product does.
          </p>
        ),
      },
      {
        slug: "customize-dimensions",
        question: "Can I customize the seven dimensions?",
        answer: (
          <>
            <p>
              The dimensions themselves are fixed — Typography, Color,
              Spatial, Component, Motion, UX Writing, UX Patterns. They form
              the substrate Spruce reasons across. What you customize is how
              each dimension applies to your product, through the
              preferences captured in{" "}
              <code className="font-mono text-base text-accent">.spruce.md</code>
              .
            </p>
            <p>
              Imagery is on the roadmap as an eighth dimension — adding it
              touches the interview, the template, and the catalog, so it
              gets its own release rather than sliding in incrementally.
            </p>
          </>
        ),
      },
    ],
  },
  {
    marker: "Using it",
    title: "Working with Spruce.",
    items: [
      {
        slug: "discovery-research",
        question:
          "Do I need user research to use the Discovery commands?",
        answer: (
          <>
            <p>
              No. Every Discovery command (
              <code className="font-mono text-base text-accent">/personas</code>
              ,{" "}
              <code className="font-mono text-base text-accent">/jtbd</code>,{" "}
              <code className="font-mono text-base text-accent">/journey</code>
              ,{" "}
              <code className="font-mono text-base text-accent">/scenarios</code>
              ) runs in three modes — drafting from your{" "}
              <code className="font-mono text-base text-accent">.spruce.md</code>{" "}
              context when no research exists, structuring user-supplied
              research when it does, or pressure-testing a finished
              artifact for assumptions.
            </p>
            <p>
              Context-derived artifacts are labelled honestly so downstream
              commands know what to weight as a finding versus a structured
              assumption. The point is to ground design decisions in named
              users either way; research strengthens the artifact, but its
              absence doesn&rsquo;t block the work.
            </p>
          </>
        ),
      },
      {
        slug: "review-commands-difference",
        question:
          "What's the difference between /survey, /critique, /uxreview, /detect, and /audit?",
        answer: (
          <>
            <p>
              Five review lenses, each with a different depth and a
              different question.{" "}
              <code className="font-mono text-base text-accent">/detect</code>{" "}
              is fast — a scan for named anti-patterns.{" "}
              <code className="font-mono text-base text-accent">/survey</code>{" "}
              is comprehensive — findings with severity tiers and an action
              plan.{" "}
              <code className="font-mono text-base text-accent">/uxreview</code>{" "}
              audits the UX substrate specifically — IA, feedback, forms,
              state coverage.{" "}
              <code className="font-mono text-base text-accent">/critique</code>{" "}
              speaks at the level of feel — does the design have a point of
              view, does it hedge, is it expressing what it&rsquo;s trying
              to express.
            </p>
            <p>
              <code className="font-mono text-base text-accent">/audit</code>{" "}
              is the HCD-grounded counterpart — the only diagnostic that
              frames findings against named personas and the jobs
              they&rsquo;re hiring the product to do. Requires a{" "}
              <code className="font-mono text-base text-accent">.personas.md</code>{" "}
              and{" "}
              <code className="font-mono text-base text-accent">.jtbd.md</code>{" "}
              in place; without them, /audit recommends running{" "}
              <code className="font-mono text-base text-accent">/personas</code>{" "}
              first rather than degrading to generic findings.
            </p>
            <p>
              For a fuller breakdown, see{" "}
              <Link
                href="/commands"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                the catalog
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        slug: "tool-compatibility",
        question:
          "Does it work with Cursor, VS Code, Codex, or Gemini?",
        answer: (
          <p>
            Today, only Claude Code via{" "}
            <code className="font-mono text-base text-accent">
              npx spruce-skill add
            </code>
            . Cursor, Codex, VS Code, and Gemini integrations are on the
            roadmap — same content across all tools, with tool-specific
            adapters that expose it through each tool&rsquo;s preferred
            mechanism. Track progress on GitHub or come back here as new
            harnesses land.
          </p>
        ),
      },
    ],
  },
  {
    marker: "License & support",
    title: "The basics.",
    items: [
      {
        slug: "open-source-license",
        question: "Is it open source? What's the license?",
        answer: (
          <p>
            Apache 2.0. Source is on GitHub at{" "}
            <a
              href="https://github.com/iamlaforge/spruce"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
            >
              iamlaforge/spruce
              <span aria-hidden> ↗</span>
            </a>
            . Read it, fork it, file issues, send pull requests.
          </p>
        ),
      },
      {
        slug: "cost",
        question: "How much does it cost?",
        answer: (
          <p>
            Spruce itself is free under Apache 2.0. You pay for the AI tool
            you run it through (a Claude Code subscription, or eventually
            the equivalent for whichever harness you use). Spruce adds no
            additional cost on top of that.
          </p>
        ),
      },
      {
        slug: "report-issues",
        question: "Where do I report a bug or request a feature?",
        answer: (
          <p>
            GitHub issues at{" "}
            <a
              href="https://github.com/iamlaforge/spruce/issues"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
            >
              iamlaforge/spruce/issues
              <span aria-hidden> ↗</span>
            </a>
            . Bug reports, feature requests, and direction-level questions
            all welcome — feedback shapes the roadmap.
          </p>
        ),
      },
    ],
  },
];

/**
 * Helper to look up a single FAQ item by slug — used by the homepage
 * module to pull a curated subset from the registry.
 */
export function getFAQItem(slug: string): FAQItem | undefined {
  for (const group of FAQ_GROUPS) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return item;
  }
  return undefined;
}
