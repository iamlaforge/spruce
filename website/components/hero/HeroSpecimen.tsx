import { Button } from "@/components/Button";
import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

export function HeroSpecimen() {
  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <Container>
        {/* Colophon rule */}
        <div className="flex items-center justify-between border-b border-rule pb-4 mb-14 md:mb-20 text-2xs font-mono uppercase tracking-widest text-ink-subtle">
          <span>Spruce &middot; v1.0</span>
          <span className="hidden md:inline">Design reasoning for AI coding tools</span>
          <span>MIT license</span>
        </div>

        {/* Frontispiece: wordmark + introduction */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          <h1 className="col-span-12 md:col-span-7 font-display font-normal text-5xl md:text-[8rem] leading-[0.9] tracking-tightest text-ink">
            Spruce.
          </h1>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-lg md:text-xl text-ink leading-snug tracking-snug text-balance">
              A design reasoning system that installs into AI coding tools and
              teaches them how to think.
            </p>
            <p className="mt-5 text-base text-ink-muted leading-relaxed text-pretty">
              Claude Code, Cursor, and the tools you already use &mdash; without
              the generic output.
            </p>
          </div>
        </div>

        {/* Tri-column breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-t border-rule-subtle pt-12">
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-ink-subtle mb-4">
              What
            </p>
            <p className="text-base text-ink leading-snug text-pretty">
              A vocabulary and a reasoning method for design, delivered as a
              set of commands your AI tools can run.
            </p>
          </div>
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-ink-subtle mb-4">
              How
            </p>
            <p className="text-base text-ink leading-snug text-pretty">
              <code className="font-mono text-sm text-ink">/design</code>{" "}
              generates.{" "}
              <code className="font-mono text-sm text-ink">/remix</code>{" "}
              explores alternatives.{" "}
              <code className="font-mono text-sm text-ink">/refine</code>{" "}
              improves. And more.
            </p>
          </div>
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-ink-subtle mb-4">
              For
            </p>
            <p className="text-base text-ink leading-snug text-pretty">
              Developers and designers tired of AI-generated interfaces that
              look AI-generated.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-rule-subtle flex flex-wrap items-center gap-5">
          <Button variant="primary" size="lg">
            Install
          </Button>
          <Button variant="secondary" size="lg">
            Browse commands
          </Button>
          <Link href="/philosophy" variant="subtle" className="md:ml-auto">
            Read the philosophy &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
