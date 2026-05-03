import { ManuscriptFrame } from "./DemoFrame";

/**
 * /critique demo. A faithful render of what /critique's narrative review
 * looks like — italic Fraunces section headings + body prose + hairline
 * dividers between sections, no bulleted findings, no severity tiers, no
 * command pointers in the body. Reads as an editorial essay.
 *
 * Differentiated from the structured-findings demos (/survey, /uxreview,
 * /detect, /finish) through register: where those produce numbered or
 * tiered lists, /critique produces flowing observation. Differentiated
 * from /explain (also narrative) through scope: /critique addresses the
 * work-as-a-whole; /explain walks through individual decisions.
 *
 * Continues the meditation-app context. The critique reflects the project
 * as it stands after /spruce-up has set context, /foundations has
 * established tokens, the corrective tier has run, and the diagnostic
 * commands are scanning. It's the kind of read a design director would
 * give before recommending /finish.
 */

export function CritiqueDemo() {
  return (
    <ManuscriptFrame
      eyebrow="A critique"
      scope="Subject · Meditation app"
      caption="/critique speaks at the level of design feel — opinionated, grounded in specifics, willing to make a claim. The format is essay, not punch list; the value is seeing the whole."
    >

        <Section title="The overall take">
          The meditation app is in strong directional shape. The character —
          warm, unhurried, calm without being precious — comes through in the
          typography and palette established by /foundations and threads
          through every surface the corrective tier has touched. The work
          isn&rsquo;t hedging on its character. The remaining concerns are
          flow and state coverage rather than direction; what&rsquo;s on
          screen expresses what it should be expressing.
        </Section>

        <Section title="Character and point of view">
          <p>
            The combination of Lora display and Source Sans body, paired with
            the warm Canvas (#FAFAF9) and amber-700 accent, reads as a small
            literary publication that happens to be a meditation app. Italic
            Fraunces moments — section headings, the streak indicator, named
            items like &ldquo;Most loved&rdquo; — accumulate into an editorial
            register that distinguishes the product from the wellness-app
            default of cool blue gradients, geometric sans-serifs, and
            friendly-consumer voice.
          </p>
          <p>
            When you read the surfaces without context, you imagine a
            thoughtful product made by someone with editorial sensibilities.
            That matches what the .spruce.md describes — recovery, not
            transformation; calm without being precious. The product feels
            like itself.
          </p>
        </Section>

        <Section title="Coherence across the work">
          Internal coherence is in good shape. The corrective tier landed;
          every demo references the same project&rsquo;s surfaces, same
          palette, same typography. The reflection screen, practice library,
          and account settings read as one product. Voice is direct without
          being warm in an artificial way — error copy reassures specifically,
          empty states introduce the space rather than null-checking. The
          places coherence wobbles are subtle: system fonts in some Before
          states, slight register drift between editorial readings (Lora
          display) and transactional UI (Source Sans throughout). These are
          within tolerance.
        </Section>

        <Section title="Specific moments">
          <p>
            The strongest moment is the reflection screen&rsquo;s Day 12
            streak indicator. It&rsquo;s the only place in the product where
            a numeric value gets typographic prominence as a felt count
            rather than as metadata, and the contrast between the italic
            Fraunces &ldquo;Day 12&rdquo; and the surrounding mono-caps
            eyebrows is the kind of small editorial move that separates
            careful work from default output.
          </p>
          <p>
            The moment that hedges is the practice preferences form. The
            fields (Default session length, Voice guide) do their job but
            don&rsquo;t express the recovery framing — they read as a
            generic settings page that happens to be in a meditation app. A
            more committed surface might surface the practice-design
            intentions (&ldquo;How long do you want to spend recovering
            today?&rdquo; rather than &ldquo;Default session length&rdquo;)
            to thread the recovery framing through the configuration UI.
          </p>
        </Section>

      <Section title="Direction forward" muted>
        Two small moves would tighten the work: decide on the practice
        preferences form&rsquo;s voice — the labels currently read as
        utility, not as part of the product&rsquo;s recovery framing — and
        address the state-completeness gaps surfaced by /uxreview before
        final ship. /fortify covers the latter. The work is ready for
        /finish once those land.
      </Section>
    </ManuscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// Section — italic Fraunces section heading + body prose + hairline below.
// The section heading register matches the detail page's section heading
// vocabulary (italic Fraunces text-xl/2xl), tying the demo to the rest of
// the site's editorial pattern. Children render as prose; if multiple
// paragraphs are needed, the consumer passes <p> elements directly.
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
        {/* Wrap a string child in a <p> so the consumer can pass either a
            single string or pre-formatted paragraphs. */}
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
      {!muted ? (
        <div className="border-t border-rule-subtle mt-7 md:mt-8" />
      ) : null}
    </section>
  );
}
