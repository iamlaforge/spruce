import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

export function Philosophy() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header — full-width rule, eyebrow on the left, section mark on the right */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
        <Heading level="eyebrow">Philosophy</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Essay column — asymmetric, left-of-center for editorial tension */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
        <article className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3">
          {/* Movement 1 — the problem */}
          <p className="font-display font-normal text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-ink">
            The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
            <span className="text-ink-muted">
              It&rsquo;s that all AI designs the same way.
            </span>
          </p>

          <p className="mt-10 md:mt-12 text-base md:text-lg text-ink leading-relaxed">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices appear
            far more often than others. When a model generates new design, it
            reaches for those defaults reflexively &mdash; not because
            they&rsquo;re right for your product, but because they&rsquo;re
            statistically most likely. We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            : the typography reflexes, the color defaults, the layouts
            everyone reaches for. They&rsquo;re everywhere because
            they&rsquo;re always available.
          </p>

          {/* Movement 2 — the alternative */}
          <p className="mt-16 md:mt-20 font-display font-normal text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-ink">
            Spruce is the alternative.
          </p>

          <p className="mt-10 md:mt-12 font-display italic font-normal text-xl md:text-2xl leading-snug tracking-snug text-ink">
            Design is not a style. It&rsquo;s a series of specific decisions
            about a specific product for specific people.
          </p>

          <p className="mt-10 md:mt-12 text-base md:text-lg text-ink leading-relaxed">
            Spruce works at two levels. First, it gives AI tools real design
            reasoning &mdash; the foundations of typography, color, spacing,
            components, motion, and voice that good design has always rested
            on. Second, it gives you tactical control through a set of
            commands that let you direct, refine, or rethink any decision.
            The reasoning runs in the background; the commands put you in
            the chair.
          </p>

          {/* Movement 3 — the outcome, set apart */}
          <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-rule-subtle">
            <p className="text-base md:text-lg text-ink leading-relaxed">
              What you get back is design that happens to be made with AI
              rather than AI design.
            </p>
            <p className="mt-6 font-display italic font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
              The product gets to look like itself.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
