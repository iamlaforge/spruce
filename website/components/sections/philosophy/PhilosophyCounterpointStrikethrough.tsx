import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

const revisions: Array<{ defaultText: string; alternative: string }> = [
  { defaultText: "Inter for everything", alternative: "A typeface for this product" },
  { defaultText: "Blue and purple gradients", alternative: "Warm neutrals, one accent" },
  { defaultText: "Three equal cards", alternative: "Asymmetric, editorial" },
  { defaultText: "8px corners by reflex", alternative: "Considered shape" },
  { defaultText: "“Let’s get started!”", alternative: "Direct, no throat-clearing" },
  { defaultText: "Linear easing, 300ms", alternative: "Considered motion" },
];

export function PhilosophyCounterpointStrikethrough() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
        <Heading level="eyebrow">Philosophy &middot; A revision</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Opening prose */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
            <span className="text-ink-muted">
              It&rsquo;s that all AI designs the same way.
            </span>
          </p>
          <p className="mt-10 text-base md:text-lg text-ink leading-relaxed">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices
            appear far more often than others. When a model generates new
            design, it reaches for those defaults reflexively &mdash; not
            because they&rsquo;re right for your product, but because
            they&rsquo;re statistically most likely.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed">
            We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            . They&rsquo;re everywhere because they&rsquo;re always available.
          </p>
        </div>
      </div>

      {/* Revisions block — performs an edit, line by line */}
      <div
        id="slop"
        className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20"
      >
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-2 space-y-3 md:space-y-4">
          {revisions.map((row) => (
            <div
              key={row.alternative}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-baseline gap-y-1 gap-x-4 md:gap-x-6 font-display text-lg md:text-xl leading-snug"
            >
              <span className="line-through decoration-2 decoration-rule-strong text-ink-subtle">
                {row.defaultText}
              </span>
              <span
                aria-hidden
                className="hidden md:inline font-mono text-2xs text-accent uppercase tracking-widest"
              >
                &rarr;
              </span>
              <span className="text-ink">{row.alternative}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pivot + body */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            Spruce is the alternative.
          </p>
          <p className="mt-10 font-display italic font-normal text-xl md:text-2xl leading-snug tracking-snug text-ink">
            Design is not a style. It&rsquo;s a series of specific decisions
            about a specific product for specific people.
          </p>
          <p className="mt-10 text-base md:text-lg text-ink leading-relaxed">
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

      {/* Closing */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-10 md:pt-12 border-t border-rule">
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
    </Section>
  );
}
