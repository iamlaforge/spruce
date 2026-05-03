import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

const indexEntries: Array<{
  number: string;
  label: string;
  href: string;
  external?: boolean;
}> = [
  { number: "01", label: "Philosophy", href: "#philosophy" },
  { number: "02", label: "Installation", href: "#install" },
  { number: "03", label: "Source", href: "https://github.com/iamlaforge/spruce", external: true },
];

export function HeroIndex() {
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

        {/* Index — editorial table-of-contents replacing the tri-column.
            Each entry: mono number on the left, Fraunces label, mono arrow
            pushed right. Replaces both the tri-column and the CTA cluster
            with a single coherent navigational element. */}
        <div className="border-t border-rule-subtle pt-10 md:pt-12">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-6 md:mb-8">
            Index
          </p>
          <ul role="list" className="list-none">
            {indexEntries.map((entry) => (
              <li
                key={entry.href}
                className="border-t border-rule-subtle first:border-t-0"
              >
                <Link
                  href={entry.href}
                  external={entry.external}
                  variant="nav"
                  className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-6"
                >
                  <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle group-hover:text-accent shrink-0 transition-colors duration-fast ease-considered">
                    {entry.number}
                  </span>
                  <span className="font-display font-normal text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                    {entry.label}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto font-mono text-2xs uppercase tracking-widest text-ink-subtle group-hover:text-accent shrink-0 transition-colors duration-fast ease-considered"
                  >
                    {entry.external ? "↗" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
