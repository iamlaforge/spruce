import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

const patterns: Array<{
  label: string;
  heading: string;
  body: React.ReactNode;
  command: string;
}> = [
  {
    label: "Setup",
    heading: "Set up your project.",
    body: (
      <>
        Run <code className="font-mono text-xs text-ink">/spruce up</code> once.
        It walks through a short interview, then writes a context file that
        every subsequent command reads.
      </>
    ),
    command: "/spruce up",
  },
  {
    label: "Generate",
    heading: "Generate calibrated design.",
    body: (
      <>
        Run <code className="font-mono text-xs text-ink">/design</code> followed
        by what you want. The output is calibrated to your context, not generic
        SaaS templates.
      </>
    ),
    command: "/design the pricing page",
  },
  {
    label: "Critique",
    heading: "Get a design director’s read.",
    body: (
      <>
        Run <code className="font-mono text-xs text-ink">/critique</code> for
        opinionated feedback on what&rsquo;s working, what isn&rsquo;t, what to
        address next.
      </>
    ),
    command: "/critique",
  },
];

export function InstallCompact() {
  return (
    <Section id="install" tone="default">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-12 md:mb-16">
        <Heading level="eyebrow" as="h2">Install &middot; One command</Heading>
        <span aria-hidden className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle">§</span>
      </div>

      {/* Movement 1 — install action (preserved at full prominence) */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            One command.{" "}
            <span className="text-ink-muted">
              Spruce installs into Claude Code and stays out of your way until
              you ask for it.
            </span>
          </p>
          <div className="mt-10 md:mt-12 bg-surface border border-rule rounded-md px-6 py-5 md:px-8 md:py-6 font-mono text-lg md:text-xl leading-snug">
            <span className="text-accent select-none mr-3" aria-hidden>$</span>
            <span className="text-ink">npx spruce-skill add</span>
          </div>
          <p className="mt-6 text-sm text-ink-subtle leading-relaxed text-pretty">
            Cursor, Gemini, and other harnesses are coming soon.{" "}
            <Link href="/install" variant="subtle">
              More download options &rarr;
            </Link>
          </p>
        </div>
      </div>

      {/* After installing intro — compressed (drops the muted continuation) */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-6 md:mb-8">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            After installing
          </p>
          <p className="mt-3 font-display font-normal text-xl md:text-2xl leading-tight tracking-tight text-ink text-balance">
            Three patterns to start with.
          </p>
        </div>
      </div>

      {/* Three compact rows — each pattern as a tight horizontal row,
          separated by hairlines. */}
      <ul role="list" className="list-none mb-16 md:mb-20">
        {patterns.map((pattern, i) => (
          <li
            key={pattern.command}
            className={`grid grid-cols-12 gap-x-6 md:gap-x-8 items-start py-5 md:py-6 ${
              i === 0 ? "border-y" : "border-b"
            } border-rule-subtle`}
          >
            <div className="col-span-12 md:col-span-7 md:col-start-2 lg:col-span-6 lg:col-start-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-mono text-2xs uppercase tracking-widest text-accent shrink-0">
                  {pattern.label}
                </span>
                <h3 className="font-display font-normal text-lg md:text-xl text-ink leading-snug tracking-snug">
                  {pattern.heading}
                </h3>
              </div>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed text-pretty">
                {pattern.body}
              </p>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-9 lg:col-span-4 lg:col-start-8 mt-4 md:mt-0">
              <div className="bg-surface border border-rule-subtle rounded-sm px-4 py-3 font-mono text-sm md:text-base leading-snug">
                <span className="text-accent select-none mr-2" aria-hidden>&rsaquo;</span>
                <span className="text-ink">{pattern.command}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/walkthrough" variant="subtle">Full walkthrough &rarr;</Link>
          <span aria-hidden className="text-ink-subtle">&middot;</span>
          <Link href="/commands" variant="subtle">Browse all commands &rarr;</Link>
        </div>
      </div>
    </Section>
  );
}
