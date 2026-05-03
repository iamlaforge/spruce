import { ManuscriptFrame } from "./DemoFrame";

/**
 * /explain demo. A faithful render of what /explain's reasoning
 * walkthrough looks like — italic Fraunces decision-area headings + brief
 * framing paragraph + reasoning paragraph for each section, working from
 * highest-impact decisions (character, layout, typography) down to craft
 * details.
 *
 * Differentiated from /critique through scope and structure: /critique
 * addresses the work-as-a-whole in 4 essay sections; /explain walks
 * through individual decisions in 5-9 sections, each scoped to one
 * decision area. /explain's tone is informational ("here's what was
 * decided and why") rather than evaluative ("does this work").
 *
 * Continues the meditation-app context. The walkthrough explains the
 * decisions made when /design generated the Tonight home screen visible
 * in the /design demo — so visitors who've seen that surface can read the
 * /explain output as the show-your-work for what they already saw.
 */

export function ExplainDemo() {
  return (
    <ManuscriptFrame
      eyebrow="A walkthrough"
      scope="Subject · Tonight home screen"
      caption="/explain shows the work behind a recent design — what was considered, why specific choices were made, how they connect to the product's context. The format is a walkthrough, ordered by decision impact: character first, craft last."
    >
      {/* Walkthrough opener — orienting frame paragraph. The Manuscript
          frame provides the subject metadata in its header, so the demo
          opens directly with the reader-facing frame sentence. */}
      <p className="text-base md:text-lg text-ink-muted leading-snug max-w-prose text-pretty mb-8">
        Working from the highest-impact decisions down to the specific
        details — the choices that shaped this surface and why each one
        fits the meditation app&rsquo;s context.
      </p>

        <DecisionSection
          title="Character direction"
          framing="Chose to express the meditation app's recovery framing through compositional restraint rather than explicit copy."
          reasoning="The home screen leads with the date (Tuesday evening), names tonight's practice, and offers a single quiet action. Nothing competes with the practice itself — the framing is enacted through what isn't on screen as much as through what is. This matches the .spruce.md's “spacious, single-purpose” density direction and avoids the wellness-app default of stacking encouragement copy, motivational stats, and feature affordances around the primary action."
        />

        <DecisionSection
          title="Layout archetype"
          framing="Used a hero-with-secondary-cards composition rather than a list or feed."
          reasoning="The Tonight hero anchors visual attention on the primary practice; the secondary cards (Body scan, For sleep) sit below as quiet alternatives without competing for the hero's prominence. This is asymmetric on purpose — the .spruce.md asks for tension over symmetry, and an editorial layout where one element clearly leads expresses that tension better than three equal-weight cards would."
        />

        <DecisionSection
          title="Typography direction"
          framing="Lora regular for display, Source Sans 3 for body and metadata, JetBrains Mono for small-caps eyebrows and date stamps."
          reasoning="Lora carries the editorial register the .spruce.md describes — drawn-quality letterforms that feel warm rather than geometric. Source Sans keeps body copy comfortable for mid-evening reading; the mono caps mark eyebrows as structural rather than as content. The combination commits to the warm humanist character explicitly — and explicitly avoids the Inter / Geist / generic-grotesque defaults the context file calls out as unacceptable."
        />

        <DecisionSection
          title="Color direction"
          framing="Warm Canvas (#FAFAF9) base, stone-900 ink, single committed amber-700 accent."
          reasoning="Accent appears only on the Begin CTA — amber lives as a single committed point of attention rather than as a heatmap across multiple surfaces. The warm temperature is honey-light, not cool-clinical, which fits the recovery framing better than the wellness-app cool-blue default. Stone-900 over pure #000 gives the ink palette a temperature that sits inside the warm system rather than punching out of it."
        />

        <DecisionSection
          title="Voice direction"
          framing="Direct and unhurried. “Settle the day. Five minutes of guided breath — sit or lie down,” not “Tonight's mindfulness practice for a peaceful evening.”"
          reasoning="The voice respects the user as someone who chose to be here, not someone who needs to be warmed up. The friendly-professional SaaS register (“Welcome back!”, “Your daily moment of calm”) is explicitly avoided per the .spruce.md's voice direction. The em-dash structure of the body line creates a gentle pause that fits the product's pacing — punctuation as voice."
          isLast
        />

      {/* Closing meta-line — heavier rule above (border-rule vs the
          border-rule-subtle between decision sections) marks this as the
          document's close rather than as another paragraph in sequence.
          The line itself models how /explain actually exits a walkthrough
          in conversation. */}
      <div className="border-t border-rule mt-2 pt-6">
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose">
          Want any decision unpacked further? Run{" "}
          <code className="font-mono text-sm text-accent">
            /explain typography
          </code>{" "}
          for a deeper read on the type system, or{" "}
          <code className="font-mono text-sm text-accent">/decide</code> if
          you want to revisit a specific call.
        </p>
      </div>
    </ManuscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// DecisionSection — one decision area with framing + reasoning. Italic
// Fraunces title (matching /critique's section register) + a body-register
// framing sentence that summarizes what was decided + a reasoning
// paragraph that connects the decision to the .spruce.md context and the
// design principle that governs it. Hairline rule between sections except
// the last.
// ---------------------------------------------------------------------------

function DecisionSection({
  title,
  framing,
  reasoning,
  isLast = false,
}: {
  title: string;
  framing: string;
  reasoning: string;
  /** When true, suppress the bottom hairline so the closing meta-line's
   *  heavier rule above can mark the document's close cleanly. */
  isLast?: boolean;
}) {
  return (
    <section className="mb-7 md:mb-8">
      <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-3">
        {title}
      </h3>
      <p className="text-base md:text-lg text-ink leading-snug text-pretty max-w-prose mb-3">
        {framing}
      </p>
      <p className="text-sm md:text-base text-ink-subtle leading-relaxed text-pretty max-w-prose">
        {reasoning}
      </p>
      {!isLast ? (
        <div className="border-t border-rule-subtle mt-7 md:mt-8" />
      ) : null}
    </section>
  );
}
