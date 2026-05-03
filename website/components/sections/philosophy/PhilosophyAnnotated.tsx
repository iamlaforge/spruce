import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

type AnnotationProps = {
  number: string;
  label: string;
  body: string;
};

function Annotation({ number, label, body }: AnnotationProps) {
  return (
    <aside className="font-mono text-2xs leading-relaxed text-ink-subtle">
      <span className="block uppercase tracking-widest text-ink-muted mb-2">
        Note {number} &middot; {label}
      </span>
      {body}
    </aside>
  );
}

function Ref({ number }: { number: string }) {
  return (
    <sup className="font-mono text-[0.625em] text-accent ml-0.5 tracking-wide">
      [{number}]
    </sup>
  );
}

export function PhilosophyAnnotated() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
        <Heading level="eyebrow">Philosophy &middot; Annotated</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Annotated essay — marginalia in left col, body in right col on desktop */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
        {/* Movement 1 */}
        <div className="col-span-12 md:col-span-3">
          <Annotation
            number="01"
            label="Statistical defaults"
            body="Models reach for high-frequency choices because they're high-frequency, not because they fit your product."
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
            <span className="text-ink-muted">
              It&rsquo;s that all AI designs the same way.
            </span>
            <Ref number="01" />
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices
            appear far more often than others. When a model generates new
            design, it reaches for those defaults reflexively &mdash; not
            because they&rsquo;re right for your product, but because
            they&rsquo;re statistically most likely.
          </p>
        </div>

        {/* Movement 2 */}
        <div className="col-span-12 md:col-span-3">
          <Annotation
            number="02"
            label="The cataloged set"
            body="Typography reflexes (Inter, Geist), accent gradients (blue → purple), three-equal-cards layout, friendly-professional voice."
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="text-base md:text-lg text-ink leading-relaxed">
            We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            <Ref number="02" />: the typography reflexes, the color defaults,
            the layouts everyone reaches for. They&rsquo;re everywhere because
            they&rsquo;re always available.
          </p>
        </div>

        {/* Movement 3 */}
        <div className="col-span-12 md:col-span-3">
          <Annotation
            number="03"
            label="Two levels"
            body="A reasoning substrate that runs continuously, plus a command surface that gives you direct control over any decision."
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink">
            Spruce is the alternative.
          </p>
          <p className="mt-6 font-display italic font-normal text-xl md:text-2xl leading-snug tracking-snug text-ink">
            Design is not a style. It&rsquo;s a series of specific decisions
            about a specific product for specific people.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed">
            Spruce works at two levels.
            <Ref number="03" /> First, it gives AI tools real design reasoning
            &mdash; the foundations of typography, color, spacing, components,
            motion, and voice that good design has always rested on. Second,
            it gives you tactical control through a set of commands that let
            you direct, refine, or rethink any decision. The reasoning runs
            in the background; the commands put you in the chair.
          </p>
        </div>

        {/* Closing — spans full width but offset to match body column */}
        <div className="col-span-12 mt-8 pt-10 border-t border-rule-subtle">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
            <div className="col-span-12 md:col-span-9 md:col-start-4">
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
      </div>
    </Section>
  );
}
