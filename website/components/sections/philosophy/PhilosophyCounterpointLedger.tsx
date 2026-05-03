import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

const ledgerRows: Array<{
  layer: string;
  defaultText: string;
  alternative: string;
}> = [
  {
    layer: "Typography",
    defaultText: "Inter, Geist, system-ui",
    alternative: "A typeface chosen for the product",
  },
  {
    layer: "Color",
    defaultText: "Blue and purple gradients",
    alternative: "Warm neutrals with one considered accent",
  },
  {
    layer: "Layout",
    defaultText: "Three equal cards, centered hero",
    alternative: "Asymmetric, editorial",
  },
  {
    layer: "Shape",
    defaultText: "8–12px corners on everything",
    alternative: "Considered, deliberate",
  },
  {
    layer: "Voice",
    defaultText: "“Let’s get started!”",
    alternative: "Direct, no throat-clearing",
  },
  {
    layer: "Motion",
    defaultText: "Linear easing, 300ms defaults",
    alternative: "Considered curves",
  },
];

export function PhilosophyCounterpointLedger() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
        <Heading level="eyebrow">Philosophy &middot; A ledger</Heading>
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

      {/* The ledger — categorical comparison */}
      <div id="slop" className="border-y border-rule mb-16 md:mb-20">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 py-4 border-b border-rule-subtle">
          <span className="col-span-3 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Layer
          </span>
          <span className="col-span-4 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            The default
          </span>
          <span className="col-span-5 font-mono text-2xs uppercase tracking-widest text-accent">
            The alternative
          </span>
        </div>

        {ledgerRows.map((row) => (
          <div
            key={row.layer}
            className="grid grid-cols-12 gap-x-6 md:gap-x-8 py-5 md:py-6 border-b border-rule-subtle last:border-b-0"
          >
            <span className="col-span-3 font-display text-base md:text-lg text-ink-muted">
              {row.layer}
            </span>
            <span className="col-span-4 text-sm md:text-base text-ink-muted leading-snug">
              {row.defaultText}
            </span>
            <span className="col-span-5 text-sm md:text-base text-ink leading-snug">
              {row.alternative}
            </span>
          </div>
        ))}
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
