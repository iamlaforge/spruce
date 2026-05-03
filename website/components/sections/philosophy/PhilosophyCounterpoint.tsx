import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

export function PhilosophyCounterpoint() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
        <Heading level="eyebrow">Philosophy</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Two-column counterpoint — left muted (the default), right full ink (the alternative) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
        {/* Left column — the default */}
        <div className="md:pr-10 lg:pr-16">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-6">
            The default
          </p>
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink-muted">
            The problem isn&rsquo;t that AI can&rsquo;t design. It&rsquo;s
            that all AI designs the same way.
          </p>
          <p className="mt-8 text-base text-ink-muted leading-relaxed">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices
            appear far more often than others. When a model generates new
            design, it reaches for those defaults reflexively &mdash; not
            because they&rsquo;re right for your product, but because
            they&rsquo;re statistically most likely.
          </p>
          <p className="mt-6 text-base text-ink-muted leading-relaxed">
            We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            : the typography reflexes, the color defaults, the layouts
            everyone reaches for. They&rsquo;re everywhere because
            they&rsquo;re always available.
          </p>
        </div>

        {/* Right column — the alternative */}
        <div className="md:pl-10 lg:pl-16 md:border-l md:border-rule">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-6">
            The alternative
          </p>
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            Spruce is the alternative.
          </p>
          <p className="mt-8 font-display italic font-normal text-lg md:text-xl leading-snug tracking-snug text-ink">
            Design is not a style. It&rsquo;s a series of specific decisions
            about a specific product for specific people.
          </p>
          <p className="mt-6 text-base text-ink leading-relaxed">
            Spruce works at two levels. First, it gives AI tools real design
            reasoning &mdash; the foundations of typography, color, spacing,
            components, motion, and voice that good design has always rested
            on. Second, it gives you tactical control through a set of
            commands that let you direct, refine, or rethink any decision.
            The reasoning runs in the background; the commands put you in
            the chair.
          </p>
        </div>
      </div>

      {/* Synthesis — left-aligned to stay consistent with the asymmetric default */}
      <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-rule">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
            <p className="text-base md:text-lg text-ink leading-relaxed">
              What you get back is design that happens to be made with AI
              rather than AI design.
            </p>
            <p className="mt-6 font-display italic font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
              The product gets to look like itself.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
