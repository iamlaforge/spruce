import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

export function PhilosophyCounterpointInversion() {
  return (
    <>
      {/* The default — dark band, anchored for the in-page link */}
      <section
        id="philosophy"
        className="bg-ink text-ink-inverse py-20 md:py-28"
      >
        <Container>
          <div className="flex items-baseline justify-between border-b border-ink-inverse/20 pb-4 mb-16 md:mb-20">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-inverse/60">
              Philosophy &middot; The default
            </p>
            <span
              aria-hidden
              className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-inverse/40"
            >
              §
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
              <p className="font-display font-normal text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
                <span className="text-ink-inverse/55">
                  It&rsquo;s that all AI designs the same way.
                </span>
              </p>
              <p className="mt-10 text-base md:text-lg leading-relaxed text-ink-inverse/85">
                The cause is structural. AI models are trained on the same
                corpus of design examples, and inside that corpus, certain
                choices appear far more often than others. When a model
                generates new design, it reaches for those defaults
                reflexively &mdash; not because they&rsquo;re right for your
                product, but because they&rsquo;re statistically most likely.
              </p>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-inverse/85">
                We&rsquo;ve cataloged the{" "}
                <Link href="#slop" variant="inline">
                  patterns we keep seeing
                </Link>
                : the typography reflexes, the color defaults, the layouts
                everyone reaches for. They&rsquo;re everywhere because
                they&rsquo;re always available.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The alternative — light band */}
      <section className="bg-background text-ink py-20 md:py-28">
        <Container>
          <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-16 md:mb-20">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent">
              Philosophy &middot; The alternative
            </p>
            <span
              aria-hidden
              className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
            >
              §
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
              <p className="font-display font-normal text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-ink">
                Spruce is the alternative.
              </p>
              <p className="mt-10 font-display italic font-normal text-xl md:text-2xl leading-snug tracking-snug text-ink">
                Design is not a style. It&rsquo;s a series of specific
                decisions about a specific product for specific people.
              </p>
              <p className="mt-10 text-base md:text-lg text-ink leading-relaxed">
                Spruce works at two levels. First, it gives AI tools real
                design reasoning &mdash; the foundations of typography, color,
                spacing, components, motion, and voice that good design has
                always rested on. Second, it gives you tactical control
                through a set of commands that let you direct, refine, or
                rethink any decision. The reasoning runs in the background;
                the commands put you in the chair.
              </p>

              <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-rule-subtle">
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
        </Container>
      </section>
    </>
  );
}
