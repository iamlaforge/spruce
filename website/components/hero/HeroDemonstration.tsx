import { Button } from "@/components/Button";
import { Container } from "@/components/Section";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";

export function HeroDemonstration() {
  return (
    <section className="pt-20 md:pt-28 pb-16 md:pb-24">
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Pitch */}
          <div className="lg:col-span-5">
            <Heading level="eyebrow" className="mb-6">
              Design reasoning for AI coding tools
            </Heading>
            <Heading level="display">
              Show,<br />
              don&rsquo;t tell.
            </Heading>
            <p className="mt-8 text-lg text-ink-muted leading-relaxed max-w-md">
              Spruce installs into Claude Code, Cursor, and other AI coding
              tools. Type a command; get a considered design, not a generic
              one.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg">
                Install Spruce
              </Button>
              <Link href="/commands" variant="subtle">
                Browse commands &rarr;
              </Link>
            </div>
          </div>

          {/* Demo panel */}
          <div className="lg:col-span-7 lg:col-start-6">
            <DemoPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DemoPanel() {
  return (
    <div className="bg-surface border border-rule rounded-lg shadow-subtle overflow-hidden">
      {/* Panel chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-rule-subtle">
        <span className="size-2.5 rounded-pill bg-rule" />
        <span className="size-2.5 rounded-pill bg-rule" />
        <span className="size-2.5 rounded-pill bg-rule" />
        <span className="ml-3 text-2xs font-mono uppercase tracking-widest text-ink-subtle">
          Claude Code &middot; spruce/website
        </span>
      </div>

      {/* Session */}
      <div className="p-6 md:p-8 font-mono text-sm leading-relaxed">
        <div>
          <span className="text-accent">&rsaquo;</span>{" "}
          <span className="text-ink">/design a pricing card for a developer tool</span>
        </div>

        <div className="mt-6 text-ink-muted">
          Reading context, establishing character&hellip;
        </div>
        <div className="mt-1 text-ink-muted">
          Resolving decisions across typography, color, space, component&hellip;
        </div>

        {/* Rendered result */}
        <div className="mt-6 p-6 md:p-7 bg-surface-elevated border border-rule-subtle rounded-md font-sans">
          <p className="text-2xs font-mono uppercase tracking-widest text-ink-subtle">
            Team
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl text-ink leading-none tracking-tight">
              $24
            </span>
            <span className="text-sm text-ink-muted">per seat / month</span>
          </div>
          <p className="mt-4 text-sm text-ink-muted leading-snug max-w-xs">
            For small teams shipping together.
          </p>
          <div className="mt-5 pt-4 border-t border-rule-subtle text-xs text-ink-subtle leading-relaxed">
            Unlimited projects &middot; priority support
          </div>
        </div>

        <div className="mt-5 text-xs text-ink-subtle leading-relaxed">
          Decisions: restrained palette, display face on the price anchor,
          mono eyebrow for the plan name. No gradient.
        </div>
      </div>
    </div>
  );
}
