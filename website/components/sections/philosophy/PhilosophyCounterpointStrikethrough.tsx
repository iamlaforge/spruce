import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { Section } from "@/components/Section";

const revisions: Array<{ defaultText: string; alternative: string }> = [
  { defaultText: "Inter for everything", alternative: "A typeface for this product" },
  { defaultText: "Blue and purple gradients", alternative: "Warm neutrals, one accent" },
  { defaultText: "Three equal cards", alternative: "Asymmetric, editorial" },
  { defaultText: "8px corners by reflex", alternative: "Restrained, specific" },
  { defaultText: "“Let’s get started!”", alternative: "Direct, no throat-clearing" },
  { defaultText: "Linear easing, 300ms", alternative: "Custom curves, paced" },
];

export function PhilosophyCounterpointStrikethrough() {
  return (
    <Section id="philosophy" tone="default">
      {/* Section header — eyebrow rendered as h2 so the section has a real
          heading for screen-reader navigation while staying visually quiet. */}
      <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-12 md:mb-16">
        <Heading level="eyebrow" as="h2">Philosophy &middot; A revision</Heading>
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          §
        </span>
      </div>

      {/* Movement 1 — the problem */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            The problem isn&rsquo;t that AI can&rsquo;t design.{" "}
            <span className="text-ink-muted">
              It&rsquo;s that all AI designs the same way.
            </span>
          </p>
          <p className="mt-8 md:mt-10 text-base md:text-lg text-ink leading-relaxed text-pretty">
            The cause is structural. AI models are trained on the same corpus
            of design examples, and inside that corpus, certain choices
            appear far more often than others. When a model generates new
            design, it reaches for those defaults reflexively &mdash; not
            because they&rsquo;re right for your product, but because
            they&rsquo;re statistically most likely.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink leading-relaxed text-pretty">
            We&rsquo;ve cataloged the{" "}
            <Link href="#slop" variant="inline">
              patterns we keep seeing
            </Link>
            . They&rsquo;re everywhere because they&rsquo;re always available.
          </p>
        </div>
      </div>

      {/* Movement 2 — the demonstration, immediately following the prose
          that introduces the cataloged patterns it represents.

          Semantic structure for assistive tech:
          - <ul role="list"> so VoiceOver announces it as a list even with
            list-style: none applied (WebKit drops list semantics otherwise).
          - <del> and <ins> carry the deletion/replacement meaning that the
            visual line-through can't communicate to non-sighted users.
          - sr-only "replaced with" gives natural-language flow between the
            struck text and its replacement on screen readers that don't
            announce del/ins by default. */}
      <div
        id="slop"
        className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16"
      >
        <ul
          role="list"
          className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-2 list-none space-y-3 md:space-y-4"
        >
          {revisions.map((row) => (
            <li
              key={row.alternative}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-baseline gap-y-1 gap-x-4 md:gap-x-6 font-display text-lg md:text-xl leading-snug"
            >
              <del className="line-through decoration-2 decoration-rule-strong text-ink-subtle">
                {row.defaultText}
              </del>
              <span
                aria-hidden
                className="hidden md:inline font-mono text-2xs text-accent uppercase tracking-widest"
              >
                &rarr;
              </span>
              <span>
                <span className="sr-only">replaced with </span>
                <ins className="text-ink no-underline">{row.alternative}</ins>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Movement 3 — the alternative */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Spruce is the alternative.
          </p>
          <p className="mt-8 md:mt-10 text-base md:text-lg text-ink leading-relaxed text-pretty">
            Spruce works at two levels. First, it gives AI tools real design
            reasoning &mdash; the foundations of typography, color, spacing,
            components, motion, and voice that good design has always rested
            on. Second, it gives you tactical control through a set of
            commands that let you direct, refine, or rethink any decision.
            The reasoning runs in the background; the commands put you in
            the chair.
          </p>
        </div>
      </div>

      {/* Closing — coda. Lighter divider, slightly tightened internal padding. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <p className="text-base md:text-lg text-ink leading-relaxed text-pretty">
            What you get back is design that happens to be made with AI
            rather than AI design.
          </p>
          <p className="mt-6 font-display italic font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            The product gets to look like itself.
          </p>
        </div>
      </div>
    </Section>
  );
}
