import { CodeBlock } from "@/components/CodeBlock";
import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

const sessionCommands: string[] = [
  "/spruce up",
  "/design the pricing page",
  "/critique",
];

export function HeroSession() {
  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <Container>
        {/* Colophon rule (unchanged) */}
        <div className="flex items-center justify-between border-b border-rule pb-4 mb-14 md:mb-20 text-2xs font-mono uppercase tracking-widest text-ink-subtle">
          <span>Spruce &middot; v1.0</span>
          <span className="hidden md:inline">Design reasoning for AI coding tools</span>
          <span>MIT license</span>
        </div>

        {/* Frontispiece: wordmark + introduction (unchanged) */}
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

        {/* Session — three commands shown in order, replacing the abstract
            tri-column with a concrete demonstration of what using Spruce
            looks like. Caption on the left, commands stacked on the right. */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-8 border-t border-rule-subtle pt-10 md:pt-12">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
              A session
            </p>
            <p className="font-display font-normal text-xl md:text-2xl text-ink leading-snug tracking-tight text-balance">
              Three commands, in order.
            </p>
          </div>
          <ul
            role="list"
            className="col-span-12 md:col-span-8 lg:col-span-9 list-none space-y-3 md:space-y-4"
          >
            {sessionCommands.map((cmd) => (
              <li key={cmd}>
                <CodeBlock size="md">{cmd}</CodeBlock>
              </li>
            ))}
          </ul>
        </div>

        {/* Quiet action area — single committed install link plus philosophy. */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-8 gap-y-3">
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
            Read the philosophy &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
