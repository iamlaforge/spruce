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
        Run <code className="font-mono text-sm text-ink">/spruce up</code> once.
        It walks through a short interview about your product, audience, and
        direction, then writes a context file that every subsequent command
        reads. Your design language travels with the project.
      </>
    ),
    command: "/spruce up",
  },
  {
    label: "Generate",
    heading: "Generate calibrated design.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/design</code> followed
        by what you want. The output is calibrated to your project&rsquo;s
        context, not generic SaaS templates. Spruce reasons through typography,
        color, spacing, and component decisions before writing code.
      </>
    ),
    command: "/design the pricing page",
  },
  {
    label: "Critique",
    heading: "Get a design director’s read.",
    body: (
      <>
        Run <code className="font-mono text-sm text-ink">/critique</code> to
        receive opinionated feedback on what&rsquo;s been built &mdash;
        what&rsquo;s working, what isn&rsquo;t, what to address next. Less
        generation, more guidance.
      </>
    ),
    command: "/critique",
  },
];

export function Install() {
  return (
    <Section id="install" tone="default">
      {/* Section header — eyebrow as h2 for screen-reader navigation. */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-12 md:mb-16">
        <Heading level="eyebrow" as="h2">Install &middot; One command</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Movement 1 — the install action. The code block is the visual peak. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            One command.{" "}
            <span className="text-ink-muted">
              Spruce installs into Claude Code and stays out of your way until
              you ask for it.
            </span>
          </p>

          {/* Centerpiece: the install command. Larger type, stronger border,
              shell prompt prefix in the spruce accent. */}
          <div className="mt-10 md:mt-12 bg-surface border border-rule rounded-md px-6 py-5 md:px-8 md:py-6 font-mono text-lg md:text-xl leading-snug">
            <span className="text-accent select-none mr-3" aria-hidden>
              $
            </span>
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

      {/* Movement 2 — after installing. Mono sub-eyebrow leads into the
          three-pattern body. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            After installing
          </p>
          <p className="mt-3 font-display font-normal text-xl md:text-2xl leading-tight tracking-tight text-ink text-balance">
            Three patterns to start with.{" "}
            <span className="text-ink-muted">
              Each shows a different way of using the system.
            </span>
          </p>
        </div>
      </div>

      {/* Three patterns — copy on the left, command on the right. The same
          structural rhythm carries each pattern; the content varies. On
          narrower viewports, the code stacks beneath the copy. */}
      <ul role="list" className="list-none space-y-14 md:space-y-20 mb-16 md:mb-20">
        {patterns.map((pattern) => (
          <li
            key={pattern.command}
            className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-start"
          >
            <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-2">
              <p className="font-mono text-2xs uppercase tracking-widest text-accent">
                {pattern.label}
              </p>
              <h3 className="mt-3 font-display font-normal text-xl md:text-2xl leading-tight tracking-tight text-ink text-balance">
                {pattern.heading}
              </h3>
              <p className="mt-4 text-base text-ink-muted leading-relaxed text-pretty">
                {pattern.body}
              </p>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-8 mt-6 lg:mt-0">
              <div className="bg-surface border border-rule-subtle rounded-md px-5 py-4 md:px-6 md:py-5 font-mono text-base md:text-lg leading-snug">
                <span className="text-accent select-none mr-3" aria-hidden>
                  &rsaquo;
                </span>
                <span className="text-ink">{pattern.command}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer — secondary actions, separated by a hairline. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/designing" variant="subtle">
            Full walkthrough &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link href="/commands" variant="subtle">
            Browse all commands &rarr;
          </Link>
          <span aria-hidden className="text-ink-subtle">
            &middot;
          </span>
          <Link href="/faq" variant="subtle">
            Common questions &rarr;
          </Link>
        </div>
      </div>
    </Section>
  );
}
