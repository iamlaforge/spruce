import { ManuscriptFrame } from "./DemoFrame";

/**
 * /explain demo. Faithful render of /explain's reasoning walkthrough —
 * italic Fraunces decision-area headings + brief framing paragraph +
 * reasoning paragraph for each section, working from highest-impact
 * decisions down to craft details.
 *
 * Subject: the personalization banner /decide produced for Stillpoint's
 * practices section. /explain works best on a recent specific moment —
 * the banner is the freshest case-study artifact in the catalog and
 * carries enough decisions to walk through.
 *
 * Differentiated from /critique through scope and structure: /critique
 * addresses the work-as-a-whole in 4 essay sections; /explain walks
 * through individual decisions in 5-9 sections, each scoped to one
 * decision area. /explain's tone is informational ("here's what was
 * decided and why") rather than evaluative ("does this work").
 */

export function ExplainDemo() {
  return (
    <ManuscriptFrame
      eyebrow="A walkthrough"
      scope="Subject · Personalization banner"
      caption="/explain shows the work behind a recent design — what was considered, why specific choices were made, how they connect to the product's context. The format is a walkthrough, ordered by decision impact: feature direction first, craft last."
    >
      <DecisionSection
        title="The feature direction"
        framing="Picked personalization over filtering, save-for-later, or adding a fourth featured card."
        reasoning="Filtering puts the work on the visitor — they have to know what mood or duration they want before the system helps. Save-for-later requires sign-in and breaks the home page's marketing-first frame. A fourth card would have compounded the three-equal-cards pattern the moodboard already flagged as an anti-reference. Personalization moves the work to Stillpoint — the product makes a small thoughtful suggestion based on context the visitor has already given (time of day) without asking for any input. Matches the .spruce.md voice description of a “calm, supportive friend” more directly than the alternatives."
      />

      <DecisionSection
        title="Placement"
        framing="Sat the banner above the existing eyebrow + heading + grid rather than replacing a card or sitting alongside as a fourth."
        reasoning="The .sketch.md's layout direction was “editorial spreads, quietly asymmetric.” Replacing a card or adding a fourth would have compounded the three-equal-cards pattern already in the practices grid — a worse outcome than the existing layout, which /critique was already going to flag. Above-grid keeps the curated three intact while making the personal moment unmistakable. Reads as a different KIND of UI than the cards beneath, which is the desired distinction — recommendation, not catalog entry."
      />

      <DecisionSection
        title="Recognition strategy"
        framing="Time-of-day signal over mood-prompt or session-continuation."
        reasoning="The .spruce.md describes the audience as adults building a sustainable practice — not specialists who'd answer a 12-question mood survey before being recommended a practice. Time-of-day works equally well for first-time visitors (no session history) and returning ones (no specific journey to continue). Mood-prompt would have required interaction before any value lands — adds friction for nothing. Continuation would have required session history not every visitor has. Time-of-day is the lowest-friction signal that delivers the most value, and it ties naturally to the practices' existing morning/mid-day/evening framing."
      />

      <DecisionSection
        title="Copy register"
        framing={`“It’s evening — let the day settle with Evening Wind-down.” over “Recommended tonight: Evening Wind-down.”`}
        reasoning="The .spruce.md voice direction is calm and encouraging — like a calm, supportive friend; direct without being curt; warm without being saccharine. Direct-functional copy reads as utility (the SaaS-template register the moodboard explicitly excluded). Quiet-recommendation (no surrounding copy, just the practice name) underweights the moment — it'd land as system metadata rather than as a personal suggestion. Warm-conversational matches the voice already established in Stillpoint's body copy and gives the recommendation the conversational pacing the rest of the page commits to."
      />

      <DecisionSection
        title="Visual treatment"
        framing="Soft sage-to-lavender gradient with a sage border. Not a tinted band, not a callout box, not a system-alert pattern."
        reasoning="The personalization is a personal moment, not a system message — the visual treatment had to read as a quiet recommendation rather than as a UI alert. The gradient uses two of the foundation's established accent families (sage primary + lavender warmth) so the banner stays inside Stillpoint's palette without introducing a new color zone. Sage border provides just enough definition to read as a contained surface; a heavier border or shadow would have signaled “card” and competed with the practices grid below. Soft tones keep it as a quiet visual moment that yields to the cards underneath when the visitor is ready to browse."
        isLast
      />

      {/* Closing meta-line — heavier rule above marks document close. */}
      <div className="border-t border-rule mt-2 pt-6">
        <p className="text-sm text-ink-muted leading-relaxed text-pretty max-w-prose">
          Want any decision unpacked further? Run{" "}
          <code className="font-mono text-sm text-accent">/explain copy</code>{" "}
          for a deeper read on the voice register, or{" "}
          <code className="font-mono text-sm text-accent">/decide</code> if
          you want to revisit a specific call.
        </p>
      </div>
    </ManuscriptFrame>
  );
}

// ---------------------------------------------------------------------------
// DecisionSection — one decision area with framing + reasoning. Italic
// Fraunces title + body-register framing sentence + reasoning paragraph
// that connects the decision to context and design principles. Hairline
// rule between sections except the last.
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
  /** Suppress the bottom hairline so the closing meta-line's heavier
   *  rule above marks the document's close cleanly. */
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
