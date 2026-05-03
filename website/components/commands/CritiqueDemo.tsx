import { ManuscriptFrame } from "./DemoFrame";

/**
 * /critique demo. Editorial four-section narrative on Stillpoint's home
 * page (Home.tsx) — italic Fraunces section headings + body prose +
 * hairline dividers. No bulleted findings, no severity tiers, no command
 * pointers in the body. Reads as an editorial essay.
 *
 * Differentiated from the structured-findings demos (/survey, /uxreview,
 * /detect) through register: where those produce numbered or tiered
 * lists, /critique produces flowing observation. Differentiated from
 * /explain (also narrative) through scope: /critique addresses the
 * work-as-a-whole; /explain walks through individual decisions.
 *
 * Subject: Stillpoint's home page as it stands after /design produced
 * the first pass and /decide added the personalization banner. The
 * critique reads as the kind of design-director assessment that comes
 * before the corrective tier (/voice, /typeface, /refine) runs.
 */

export function CritiqueDemo() {
  return (
    <ManuscriptFrame
      eyebrow="A critique"
      scope="Subject · Stillpoint home page"
      caption="/critique speaks at the level of design feel — opinionated, grounded in specifics, willing to make a claim. The format is essay, not punch list; the value is seeing the whole."
    >
      <Section title="The overall take">
        Stillpoint&rsquo;s home is in strong directional shape. The
        character — warm, grounded, quietly confident, unhurried — comes
        through in the typography pair, the warm-neutral palette, the
        natural-light meditation photography, and the line iconography.
        The work isn&rsquo;t hedging on what Stillpoint is. The remaining
        concerns are voice and craft details, not direction. A few rough
        edges are slips rather than character problems.
      </Section>

      <Section title="Character and point of view">
        <p>
          The combination of Söhne for body and UI with Lora for the
          editorial moments expresses what the .spruce.md described —
          modern human warmth paired with content-first restraint. The
          warm cream and sand neutrals, anchored by sage and deep indigo,
          read as committed to a specific palette character rather than
          as the AI-default cool-blue-with-purple-accent the moodboard
          warned against.
        </p>
        <p>
          When you read the surfaces without context, you imagine a
          thoughtful product made by someone who has actually meditated.
          That matches what the .spruce.md describes — &ldquo;mindfulness
          for real life&rdquo; over performance. The signature moment is
          the hero pairing of the indoor-soft-light meditation
          photograph with &ldquo;Find your stillpoint.&rdquo; in Lora
          display. That single composition does the work the rest of the
          page builds on.
        </p>
      </Section>

      <Section title="Coherence across the work">
        Internal coherence is in good shape. Every section reads from
        the same foundation — same primitives, same tokens, same
        scope. The hero, practices grid, how-it-works steps, pull quote,
        and signup all use Stillpoint&rsquo;s sage-and-indigo register
        consistently. The voice is mostly aligned to the calm
        encouraging direction the .spruce.md specifies — except in two
        spots where it slips into SaaS register. Those slips are visible
        because the rest is so committed; in a more generic page they
        wouldn&rsquo;t register.
      </Section>

      <Section title="Specific moments">
        <p>
          The strongest moment is the hero — the indoor-soft-light
          photograph paired with &ldquo;Find your stillpoint.&rdquo; in
          Lora at 48px. The pairing carries the case study&rsquo;s
          argument in a single composition: real-life imagery (not
          wellness-influencer photography), editorial typography (not
          generic geometric sans), restrained palette. This is what the
          rest of the page should feel like, and mostly does.
        </p>
        <p>
          The pull quote with the candle still-life is the second
          strongest moment. The two-column composition (image left,
          quote right) breaks the page&rsquo;s vertical rhythm with an
          editorial moment that grounds an abstract sentence in a
          material image. The kind of small move that separates
          considered work from default output.
        </p>
        <p>
          The practices grid is the moment where the design hedges. The
          three-equal-cards layout is exactly the pattern the
          moodboard&rsquo;s anti-references named — &ldquo;asymmetric
          balance over rigid symmetry&rdquo; was the direction; three
          identical cards in a uniform grid is the opposite. The cards
          themselves are clean and the content is good; the layout
          archetype underweights what the moodboard committed to.
        </p>
        <p>
          The signup section is the moment where the design fails its
          intent. &ldquo;Join 10,000+ people finding their
          stillpoint&rdquo; is the performative social-proof copy the
          moodboard&rsquo;s anti-references explicitly excluded. Same
          for the &ldquo;Get Started&rdquo; CTA copy in both the hero
          and the signup form — the friendly-professional SaaS default
          rather than the calm-supportive-friend voice the .spruce.md
          establishes. These are voice slips, fixable with /voice.
        </p>
      </Section>

      <Section title="Direction forward" muted>
        Three small moves would tighten the work without changing
        direction. Run /voice on the hero and signup CTAs plus the
        social-proof line — they&rsquo;re the most visible character
        slips. Run /typeface on the practices eyebrow (apostrophe +
        letter-spacing) and any other craft details. Reconsider the
        practices grid layout — the three-equal-cards pattern is the
        clearest hedge in the page; an asymmetric arrangement matches
        the moodboard&rsquo;s direction. Once those land, /finish for
        the polish pass before ship.
      </Section>
    </ManuscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// Section — italic Fraunces section heading + body prose + hairline below.
// Matches the detail-page section heading register so the demo reads as
// part of the same editorial pattern as the rest of the catalog.
// ---------------------------------------------------------------------------

function Section({
  title,
  children,
  muted = false,
}: {
  title: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section className="mb-7 md:mb-8 last:mb-0">
      <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
        {title}
      </h3>
      <div
        className={`text-base md:text-lg leading-relaxed text-pretty max-w-prose space-y-4 ${
          muted ? "text-ink-muted" : "text-ink"
        }`}
      >
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
      {!muted ? (
        <div className="border-t border-rule-subtle mt-7 md:mt-8" />
      ) : null}
    </section>
  );
}
