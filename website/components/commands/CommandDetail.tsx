import type { ReactNode } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import {
  COMMANDS,
  TIER_LABELS,
  type CommandData,
} from "./data";

type CommandDetailProps = {
  command: CommandData;
  /** Optional demo node rendered inside the "What it does" section,
   *  beneath the prose. Used today for /typeface; other commands can
   *  add their own as they're written. */
  demo?: ReactNode;
};

/**
 * Renders the full detail view for a single command.
 *
 * Article structure (per spec): h1 command name → tagline → tier pill → then
 * five editorial sections separated by hairline rules: What it does, When to
 * use it, How to use it, Anti-patterns it addresses, See also.
 *
 * If the command has no `detail` block, renders a stub. We've only filled in
 * /typeface so far; the other 18 will follow.
 */
export function CommandDetail({ command, demo }: CommandDetailProps) {
  return (
    <article className="max-w-2xl">
      <header className="mb-14 md:mb-20">
        {/* Tier eyebrow — relocates the tier indicator from a small pill
            below the tagline to an editorial chapter mark above the h1. */}
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-4 md:mb-5">
          § {TIER_LABELS[command.tier]}
        </p>
        <h1 className="font-display font-normal text-5xl md:text-6xl tracking-tight text-ink mb-5 leading-[1.05]">
          {command.name}
        </h1>
        {/* Tagline rendered as a real editorial subhead — Fraunces italic
            paired with the regular Fraunces h1, instead of body Hanken. */}
        <p className="font-display italic font-normal text-2xl md:text-3xl text-ink-muted leading-snug text-balance">
          {command.tagline}
        </p>
      </header>

      {command.detail ? (
        <FullDetail command={command} demo={demo} />
      ) : (
        <StubDetail command={command} />
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Full detail body — used when command.detail exists.
// ---------------------------------------------------------------------------

function FullDetail({
  command,
  demo,
}: {
  command: CommandData;
  demo?: ReactNode;
}) {
  const detail = command.detail!;
  const related = detail.seeAlso
    .map((slug) => COMMANDS[slug])
    .filter((c): c is CommandData => Boolean(c));

  return (
    <>
      <DetailSection title="What it does">
        <Prose>
          {detail.whatItDoes.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Prose>
        {demo}
      </DetailSection>

      <DetailSection title="When to use it">
        <BulletList items={detail.whenToUse} />
      </DetailSection>

      <DetailSection title="How to use it">
        <div className="mb-6">
          <CodeBlock size="sm">{command.name}</CodeBlock>
        </div>
        <Prose>
          <p>{detail.howToUse.context}</p>
        </Prose>
        {detail.howToUse.examples.length > 1 ? (
          <ul role="list" className="list-none space-y-3 mt-6">
            {detail.howToUse.examples
              .filter((ex) => ex !== command.name)
              .map((example) => (
                <li key={example}>
                  <CodeBlock size="sm">{example}</CodeBlock>
                </li>
              ))}
          </ul>
        ) : null}
      </DetailSection>

      <DetailSection title="Anti-patterns it addresses">
        <BulletList items={detail.antiPatterns.map((ap) => ap.text)} />
      </DetailSection>

      <DetailSection title="See also" muted>
        <ul role="list" className="list-none space-y-5">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/commands/${r.slug}`}
                className="group block"
              >
                <span className="block font-mono text-base text-ink group-hover:text-accent transition-colors duration-fast ease-considered">
                  {r.name}
                </span>
                <span className="block text-sm text-ink-subtle leading-snug mt-1 text-pretty">
                  {r.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DetailSection>
    </>
  );
}

// ---------------------------------------------------------------------------
// Stub body — used when command.detail is undefined.
// ---------------------------------------------------------------------------

function StubDetail({ command }: { command: CommandData }) {
  return (
    <div className="border-t border-rule pt-10">
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-4">
        Documentation in progress
      </p>
      <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
        Full documentation for{" "}
        <span className="font-mono text-ink">{command.name}</span> hasn&rsquo;t
        landed yet. The command is implemented and usable today — see the
        catalog overview for its place in the system, or pick another command
        from the sidebar.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared section frame — hairline rule above + regular Fraunces heading +
// content. Regular (non-italic) Fraunces here so italic Fraunces stays
// reserved for the page tagline + content-bearing editorial moments inside
// demos (severity tier labels, anti-pattern names, decision questions, the
// /finish verdict). Structural section headings on every detail page were
// over-applying the italic signature — turning a special editorial gesture
// into the new default for headings.
//
// Heading scale sits one step below the tagline (xl/2xl vs 2xl/3xl) so
// the page-opening h1 + tagline pair stays dominant and section markers
// read as clearly subordinate subdivisions of the article.
// ---------------------------------------------------------------------------

function DetailSection({
  title,
  children,
  muted = false,
}: {
  title: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className="mb-14 md:mb-16 last:mb-0">
      <div
        className={`border-t mb-7 md:mb-8 ${
          muted ? "border-rule-subtle" : "border-rule"
        }`}
      />
      <h2 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Prose — paragraph rhythm for body copy. Constrained to ~prose width.
// ---------------------------------------------------------------------------

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// BulletList — em-dash markers in ink-muted; editorial rather than disc.
// ---------------------------------------------------------------------------

function BulletList({ items }: { items: string[] }) {
  return (
    <ul role="list" className="list-none space-y-3 max-w-prose">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-6 text-base md:text-lg text-ink leading-relaxed text-pretty"
        >
          <span
            aria-hidden
            className="absolute left-0 top-[0.55em] font-mono text-sm leading-none text-ink-muted"
          >
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

