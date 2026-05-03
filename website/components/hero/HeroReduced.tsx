import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

export function HeroReduced() {
  return (
    <section className="pt-12 md:pt-20 pb-16 md:pb-24">
      <Container>
        {/* Colophon rule */}
        <div className="flex items-center justify-between border-b border-rule pb-4 mb-14 md:mb-20 text-2xs font-mono uppercase tracking-widest text-ink-subtle">
          <span>Spruce &middot; v1.0</span>
          <span className="hidden md:inline">Design reasoning for AI coding tools</span>
          <span>MIT license</span>
        </div>

        {/* Frontispiece: wordmark + introduction */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
          <h1 className="col-span-12 md:col-span-7 font-display font-normal text-5xl md:text-[8rem] leading-[0.9] tracking-tightest text-ink">
            Spruce.
          </h1>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-lg md:text-xl text-ink leading-snug tracking-snug text-balance">
              The only AI design reasoning system that starts with users,
              not pixels.
            </p>
            <p className="mt-5 text-base text-ink-muted leading-relaxed text-pretty">
              Installs into Claude Code, Cursor, and the tools you already use
              &mdash; so the design is grounded in real people and the jobs
              they&rsquo;re doing, not the average of training data.
            </p>
          </div>
        </div>

        {/* Quiet action footer — links styled like a colophon row, no buttons.
            The mono uppercase echoes the colophon at the top of the section,
            framing the hero between two thin typographic strips. */}
        <div className="border-t border-rule-subtle pt-6 md:pt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="#install"
            variant="subtle"
            className="font-mono text-2xs uppercase tracking-widest"
          >
            Install &rarr;
          </Link>
          <Link
            href="#philosophy"
            variant="subtle"
            className="font-mono text-2xs uppercase tracking-widest"
          >
            Philosophy &rarr;
          </Link>
          <Link
            href="/commands"
            variant="subtle"
            className="font-mono text-2xs uppercase tracking-widest md:ml-auto"
          >
            Browse all commands &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
