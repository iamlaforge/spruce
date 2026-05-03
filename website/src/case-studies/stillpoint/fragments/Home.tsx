import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  StillpointScope,
  type StillpointTheme,
} from "../components/StillpointScope";
import { StillpointHeading } from "../components/StillpointHeading";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointCard } from "../components/StillpointCard";
import { StillpointInput } from "../components/StillpointInput";
import { StillpointLink } from "../components/StillpointLink";
import {
  LeafIcon,
  ListIcon,
  SettledIcon,
} from "../components/StillpointIcons";
import { stillpointImagery } from "../content/imagery";
import { PRACTICES } from "../content/practices";
import { PersonalizationBanner } from "./PersonalizationBanner";

/**
 * Stillpoint home page fragment — output of /design.
 *
 * Composes the foundation's tokens and primitives into a marketing home
 * page for Stillpoint. The page reads as a calm, editorial spread —
 * generous spacing, paper-like surfaces, restrained accents, slow-feel
 * typography — calibrated to the character .spruce.md and .sketch.md
 * established.
 *
 * Sections, top to bottom:
 *   1. Header   — wordmark + minimal nav
 *   2. Hero     — the largest moment; tagline, lede, two CTAs
 *   3. Practices — three featured practices in card layout
 *   4. How it works — three numbered steps
 *   5. Pull quote — editorial moment in Lora
 *   6. Signup — email capture for daily reminders
 *   7. Footer  — wordmark + minimal links
 *
 * Note: this is /design's first pass. A few intentional rough edges
 * remain so corrective commands have material to address as the
 * catalog narrative advances — generic CTA copy in spots, performative
 * social proof in the signup section, a missing apostrophe in one
 * eyebrow, and the practices card layout leaning into the
 * three-equal-cards pattern the moodboard's anti-references warned
 * against. /voice, /typeface, /refine, and /critique can address.
 */

/**
 * Commands that have modified the home page over the catalog narrative.
 * Each catalog demo can pass a subset to render the home as it stood at
 * a specific iteration point.
 *
 *   - 'design'   — the initial first-pass home (everything from /design's
 *                  output, none of the modifications from later commands)
 *   - 'decide'   — adds the personalization banner above the practices
 *                  grid
 *   - 'voice'    — rewrites the hero + signup primary CTAs from "Get
 *                  Started" to practice-led labels ("Begin practice" /
 *                  "Start practicing") and removes the performative
 *                  "Join 10,000+ people" social-proof line in the signup
 *                  section. Three discrete copy moves, all flagged by
 *                  the diagnostic tier (/survey, /detect, /critique).
 *   - 'typeface' — two surfaces, three craft moves. Practices eyebrow
 *                  gets the smart apostrophe ("TODAYS" → "TODAY’S") and
 *                  the foundation's tracking-wide token applied to the
 *                  all-caps text. Pull quote gets opening + closing
 *                  curly quotation marks added (the quote ran without
 *                  quote marks in the first pass — pull quote convention
 *                  carries them). Flagged by /survey and /detect as
 *                  cataloged anti-patterns.
 *   - 'refine'   — practices grid shifts from three-equal-cards to an
 *                  asymmetric arrangement (featured Morning Grounding
 *                  spans full width above two supporting cards stacked
 *                  beside each other). The featured card uses the
 *                  larger heading level for editorial weight. Cards
 *                  also get the .stp-card--interactive modifier so they
 *                  respond to hover with a subtle lift + deeper shadow.
 *                  Flagged by /survey, /uxreview, /detect (*The Three-
 *                  Equal-Cards*, "Practice cards lack interactivity").
 *   - 'colorgrade' — verification step. The palette /foundations
 *                  established (warm cream + sand neutrals, sage primary,
 *                  lavender warmth, deep indigo text) is intact across
 *                  Stillpoint's surfaces; no incremental Home.tsx
 *                  changes are gated on this command. The /colorgrade
 *                  demo uses the fabricated-before treatment (AI-default
 *                  cool tech-blue + purple-gradient palette vs actual
 *                  Stillpoint warm palette) to demonstrate what
 *                  /foundations + /colorgrade preserve at the level of
 *                  palette character.
 *   - 'pace'     — verification step. The motion tokens /foundations
 *                  established (--stp-duration-base 320ms +
 *                  --stp-ease-out cubic-bezier(0.16, 1, 0.3, 1)) are
 *                  already wired into .stp-card--interactive via /refine;
 *                  no incremental Home.tsx changes are gated on this
 *                  command. The /pace demo shows two columns of the same
 *                  drawer interaction with AI-default motion (200ms
 *                  linear) vs Stillpoint motion to demonstrate the
 *                  character difference.
 *   - 'reduce'   — verification step. The actual practice cards on
 *                  Stillpoint home are already lean (icon + duration +
 *                  title + one-sentence description); no incremental
 *                  Home.tsx changes are gated on this command. The
 *                  /reduce demo uses the fabricated-before treatment
 *                  scoped to a single featured card — same Stillpoint
 *                  palette + typography, but loaded with the badges,
 *                  meta lines, multi-paragraph description, rating row,
 *                  and dual CTAs AI tends to add — to demonstrate the
 *                  content-discipline argument.
 *   - 'fortify'  — verification step. /fortify's actual work on
 *                  Stillpoint surfaced as findings in /uxreview (signup
 *                  form's missing error/success/validation states; the
 *                  personalization banner's missing fallback); the
 *                  implementation of those state treatments is outside
 *                  the catalog narrative's scope. The /fortify demo
 *                  illustrates the principle on a "Today's practices"
 *                  list shell — toggling between Loading / Empty /
 *                  Error states with AI-default treatments (spinner,
 *                  null-check copy, failure announcement) vs the
 *                  designed treatments (skeleton matching list shape,
 *                  three-part empty state, error with recovery).
 *   - 'arrange'  — verification step. The actual section spacing and
 *                  vertical rhythm on Stillpoint home is calibrated by
 *                  the foundation's space scale + the Section component;
 *                  no incremental Home.tsx changes are gated on this
 *                  command. The /arrange demo illustrates the principle
 *                  on a settings form — same content + Stillpoint
 *                  palette + typography in both states, only spacing
 *                  decisions (heading margins, label-input rhythm,
 *                  helper-text measure, section breathing) differ.
 *   - 'finish'   — closing pass + ship-readiness verdict. Sweeps
 *                  micro-craft across the cumulative state (smart-quote
 *                  conversions, optical centering, focus-ring
 *                  verification, contrast confirmation, reduced-motion
 *                  audit, hairline neutral check) and produces the
 *                  verdict on whether to deploy. Adding 'finish' to the
 *                  applied set marks the workflow as complete; no
 *                  incremental Home.tsx changes are gated, since
 *                  /finish's micro-edits are too small to gate
 *                  individually (per the in-place-correction
 *                  convention).
 *
 * As more commands are run on the home page (corrective tier, /critique,
 * /finish), expand this type and the conditionals inside the section
 * components. /commands/[slug] demos pick the appropriate `applied` set
 * to show the iteration point that demo is illustrating.
 *
 * Convention for what gets gated by `applied` vs. direct-edited:
 *
 *   - GATE visible page-level changes. Additions (new banner, new
 *     section, new feature), layout shifts, copy rewrites that change
 *     the words visitors read, character-level changes the corrective
 *     tier flags as anti-patterns. These deserve to be representable as
 *     a before/after in the catalog demo for the corrective that
 *     produced the change.
 *
 *   - DIRECT-EDIT micro-craft details. Single-px line-height tweaks,
 *     small letter-spacing adjustments, smart-quote conversions in body
 *     copy that aren't individually showcased. The conditional overhead
 *     for changes nobody scrutinizes individually isn't worth the noise
 *     in the source.
 *
 * Per-change judgment when a corrective runs: if the catalog demo for
 * that command would benefit from showing a clear before/after using
 * the change, gate it. If the change is invisible at-a-glance and the
 * demo wouldn't surface it anyway, just edit the source.
 *
 * Example with /typeface: the apostrophe fix `TODAYS PRACTICES` →
 * `TODAY'S PRACTICES` carries narrative weight in a typeface demo and
 * should be gated. A 0.05-of-letter-spacing adjustment on the same
 * eyebrow can be direct-edited; the demo doesn't need to compare 0
 * vs. 0.05.
 */
export type AppliedCommand =
  | "design"
  | "decide"
  | "voice"
  | "typeface"
  | "refine"
  | "colorgrade"
  | "pace"
  | "reduce"
  | "fortify"
  | "arrange"
  | "finish";

const DEFAULT_APPLIED: AppliedCommand[] = [
  "design",
  "decide",
  "voice",
  "typeface",
  "refine",
  "colorgrade",
  "pace",
  "reduce",
  "fortify",
  "arrange",
  "finish",
];

export type StillpointHomeProps = {
  /**
   * Which commands have been applied to the home page so far. Default:
   * all known commands applied (the cumulative live state).
   */
  applied?: AppliedCommand[];
  /**
   * Theme override for the rendered home. Default 'inherit' — follows
   * ancestor html.dark via CSS cascade (so demos embedded in the Spruce
   * catalog match the surrounding shell). 'light' or 'dark' force the
   * theme explicitly, used by /case-study where Stillpoint owns its own
   * theme state independently of Spruce.
   */
  theme?: StillpointTheme;
  /**
   * Optional slot rendered in the header nav after the standard links.
   * /case-study passes a <StillpointThemeToggle /> so visitors can flip
   * Stillpoint's theme from the page itself; demos pass nothing.
   */
  themeToggle?: ReactNode;
};

export function StillpointHome({
  applied = DEFAULT_APPLIED,
  theme = "inherit",
  themeToggle,
}: StillpointHomeProps = {}) {
  const has = (cmd: AppliedCommand) => applied.includes(cmd);
  return (
    <StillpointScope as="main" theme={theme}>
      <div
        style={{
          background: "var(--stp-color-bg)",
          color: "var(--stp-color-text)",
          fontFamily: "var(--stp-font-sans)",
        }}
      >
        <Header themeToggle={themeToggle} />
        <Hero voiceApplied={has("voice")} />
        <Practices
          showPersonalization={has("decide")}
          typefaceApplied={has("typeface")}
          refineApplied={has("refine")}
        />
        <HowItWorks />
        <PullQuote typefaceApplied={has("typeface")} />
        <Signup voiceApplied={has("voice")} />
        <Footer />
      </div>
    </StillpointScope>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Shared layout primitives — section wrapper + container constrain page
// content to a comfortable reading width and apply consistent vertical
// rhythm via the spacing scale.
// ──────────────────────────────────────────────────────────────────────

const CONTAINER_STYLE: CSSProperties = {
  maxWidth: "1080px",
  margin: "0 auto",
  paddingLeft: "var(--stp-space-6)",
  paddingRight: "var(--stp-space-6)",
};

function Section({
  children,
  spacing = "default",
  style,
  id,
}: {
  children: React.ReactNode;
  spacing?: "tight" | "default" | "loose";
  style?: CSSProperties;
  /** Optional anchor id for in-page navigation (e.g., "how-it-works"). */
  id?: string;
}) {
  const py =
    spacing === "tight"
      ? "var(--stp-space-12)"
      : spacing === "loose"
        ? "var(--stp-space-20)"
        : "var(--stp-space-16)";
  return (
    <section id={id} style={{ paddingTop: py, paddingBottom: py, ...style }}>
      <div style={CONTAINER_STYLE}>{children}</div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Header — wordmark + minimal nav. Stays content-forward; the brand mark
// is a typographic moment, not a logo image.
// ──────────────────────────────────────────────────────────────────────

function Header({ themeToggle }: { themeToggle?: ReactNode }) {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--stp-color-border)",
        background: "var(--stp-color-bg)",
      }}
    >
      <div
        style={{
          ...CONTAINER_STYLE,
          paddingTop: "var(--stp-space-5)",
          paddingBottom: "var(--stp-space-5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--stp-space-6)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-xl)",
            color: "var(--stp-color-text)",
            margin: 0,
            letterSpacing: "var(--stp-tracking-tight)",
          }}
        >
          Stillpoint
        </p>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--stp-space-5)",
            fontSize: "var(--stp-text-sm)",
          }}
        >
          <StillpointLink href="#practices">Practices</StillpointLink>
          <StillpointLink href="#about">About</StillpointLink>
          <StillpointLink href="#signin">Sign in</StillpointLink>
          {themeToggle}
        </nav>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Hero — the page's largest editorial moment. Display heading sets the
// tagline; lede paragraph in sans below; two CTAs (primary + tertiary).
// ──────────────────────────────────────────────────────────────────────

function Hero({ voiceApplied }: { voiceApplied: boolean }) {
  // /voice rewrites "Get Started" → "Begin practice" — practice-led
  // language matching Stillpoint's calm-supportive-friend voice.
  const primaryCta = voiceApplied ? "Begin practice" : "Get Started";
  return (
    <Section spacing="loose">
      {/* Two-column hero — text on the left, photo placeholder on the
          right. Asymmetric 7/5 split favors the editorial moment.
          Single column on mobile with the placeholder below the text. */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-x-12 gap-y-10 items-center">
        <div>
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--stp-tracking-wide)",
              fontWeight: 500,
              color: "var(--stp-color-sage)",
              margin: "0 0 var(--stp-space-5) 0",
            }}
          >
            Mindfulness for real life
          </p>
          <StillpointHeading level="display">
            Find your stillpoint.
          </StillpointHeading>
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xl)",
              lineHeight: "var(--stp-leading-relaxed)",
              color: "var(--stp-color-text-muted)",
              margin: "var(--stp-space-6) 0 0 0",
              maxWidth: "52ch",
            }}
          >
            Five-minute practices designed to fit into the spaces of an
            ordinary day. Take a breath. Begin where you are.
          </p>
          {/* Primary CTA copy is gated on /voice. Default /design output
              used "Get Started" — the friendly-professional SaaS default
              the moodboard's anti-references warned against. /voice
              rewrites to "Begin practice." The "How it works" path used
              to sit as a tertiary button at near-equal weight; subordinated
              to a small text link beneath the primary so the directed path
              reads as primary and the exploration path as quietly available. */}
          <div style={{ marginTop: "var(--stp-space-8)" }}>
            <StillpointButton variant="primary">{primaryCta}</StillpointButton>
            <p
              style={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-sm)",
                color: "var(--stp-color-text-subtle)",
                margin: "var(--stp-space-4) 0 0 0",
              }}
            >
              Or <StillpointLink href="#how-it-works">see how it works</StillpointLink>.
            </p>
          </div>
        </div>
        <HeroImage />
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// HeroImage — the Stillpoint hero photograph. The indoor-soft-light
// meditation portrait — real, grounded, the "everyday and imperfect"
// direction the moodboard named.
//
// Photo lives at public/case-studies/stillpoint/imagery/. The image
// container uses 4:5 aspect ratio with object-fit cover so the photo
// crops gracefully (the original is 1:2 portrait); soft corners and
// warm shadow keep the paper-like surface character.
// ──────────────────────────────────────────────────────────────────────

function HeroImage() {
  const photo = stillpointImagery.meditationIndoor;
  return (
    <div
      style={{
        aspectRatio: "4 / 5",
        borderRadius: "var(--stp-radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--stp-shadow-card)",
        background: "var(--stp-color-surface)",
        position: "relative",
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 768px) 420px, 100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority={false}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Practices — three featured practices in a card grid. The eyebrow
// has two craft details gated on /typeface: smart apostrophe ("TODAYS"
// → "TODAY’S") and the foundation's tracking-wide token applied to the
// all-caps text. Both are cataloged as anti-patterns in /detect (*The
// Missing Apostrophe* and *The Untracked All-Caps*) and surface in
// /survey under Typography. The layout leans into the three-equal-cards
// pattern the moodboard's anti-references warned against ("aggressive
// symmetry" vs. "quietly asymmetric") for /refine to address.
// ──────────────────────────────────────────────────────────────────────

// PRACTICES content lives in the shared content module (imported at top
// of file) — same data powers the practice detail pages at
// /case-study/practice/[slug]. The home cards use slug, title, Icon,
// duration, shortDescription. The detail pages use the rest.

function Practices({
  showPersonalization,
  typefaceApplied,
  refineApplied,
}: {
  showPersonalization: boolean;
  typefaceApplied: boolean;
  refineApplied: boolean;
}) {
  // /typeface fixes the practices eyebrow on two craft details: smart
  // apostrophe and the foundation's tracking-wide token on the all-caps
  // text.
  const eyebrowText = typefaceApplied
    ? "TODAY’S PRACTICES"
    : "TODAYS PRACTICES";
  const eyebrowTracking = typefaceApplied
    ? "var(--stp-tracking-wide)"
    : "normal";
  return (
    <section
      id="practices"
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
        scrollMarginTop: "var(--stp-space-6)",
      }}
    >
      <div style={CONTAINER_STYLE}>
        {/* Personalization banner — output of /decide. Sits above the
            eyebrow + heading + grid when the home page is rendered with
            the 'decide' command applied. Catalog demos that show the
            post-design, pre-decide state (e.g., /commands/design) opt
            out by passing applied={['design']}. */}
        {showPersonalization ? (
          <div style={{ marginBottom: "var(--stp-space-10)" }}>
            <PersonalizationBanner />
          </div>
        ) : null}
        <p
          style={{
            // Apostrophe + letter-spacing both gated on /typeface.
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            fontWeight: 500,
            letterSpacing: eyebrowTracking,
            color: "var(--stp-color-text-subtle)",
            margin: "0 0 var(--stp-space-3) 0",
          }}
        >
          {eyebrowText}
        </p>
        <StillpointHeading level="page">
          A practice for every moment.
        </StillpointHeading>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-lg)",
            lineHeight: "var(--stp-leading-relaxed)",
            color: "var(--stp-color-text-muted)",
            margin: "var(--stp-space-5) 0 var(--stp-space-12) 0",
            maxWidth: "60ch",
          }}
        >
          A small library of guided practices for the moments that need them.
          Pick one when you&rsquo;re ready.
        </p>
        {/* Layout + card interactivity both gated on /refine. Default
            (pre-refine) renders the three-equal-cards grid the moodboard
            warned against; refined renders an asymmetric arrangement —
            the morning practice featured full-width above the two
            supporting practices side-by-side. Cards become interactive
            (hover lift + shadow) only with /refine applied. */}
        {refineApplied ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "var(--stp-space-6)" }}
          >
            <PracticeCard
              practice={PRACTICES[0]}
              featured
              interactive
              style={{ gridColumn: "1 / -1" }}
            />
            <PracticeCard practice={PRACTICES[1]} interactive />
            <PracticeCard practice={PRACTICES[2]} interactive />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "var(--stp-space-6)" }}
          >
            {PRACTICES.map((p) => (
              <PracticeCard key={p.title} practice={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// PracticeCard — single practice rendering used by both the default
// three-equal-cards layout and /refine's asymmetric arrangement.
// `featured` enlarges the heading (StillpointHeading "section" instead
// of "sub") and bumps the icon size; `interactive` opts the card into
// .stp-card--interactive so it gets the hover lift treatment.
// ──────────────────────────────────────────────────────────────────────

function PracticeCard({
  practice,
  featured = false,
  interactive = false,
  style,
}: {
  practice: (typeof PRACTICES)[number];
  featured?: boolean;
  interactive?: boolean;
  style?: CSSProperties;
}) {
  const Icon = practice.Icon;
  // Cards link to the practice detail page at /case-study/practice/[slug].
  // Wrapping in Link rather than only relying on .stp-card--interactive's
  // hover affordance — the hover treatment signals interactivity, the
  // anchor wraps it for actual navigation + screen-reader semantics.
  return (
    <Link
      href={`/case-study/practice/${practice.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        ...style,
      }}
    >
      <StillpointCard interactive={interactive}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--stp-space-2)",
            color: "var(--stp-color-sage)",
            margin: "0 0 var(--stp-space-3) 0",
          }}
        >
          <Icon size={featured ? 24 : 20} aria-hidden />
          <span
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--stp-tracking-wide)",
              fontWeight: 500,
            }}
          >
            {practice.duration}
          </span>
        </div>
        <StillpointHeading
          level={featured ? "section" : "sub"}
          style={{ marginBottom: "var(--stp-space-3)" }}
        >
          {practice.title}
        </StillpointHeading>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-base)",
            lineHeight: "var(--stp-leading-base)",
            color: "var(--stp-color-text-muted)",
            margin: 0,
          }}
        >
          {practice.shortDescription}
        </p>
      </StillpointCard>
    </Link>
  );
}

// ──────────────────────────────────────────────────────────────────────
// HowItWorks — three numbered steps. Editorial layout: the numbers in
// Lora as ordinal moments, sans descriptions beneath. Sits as a quieter
// section between the noisier Practices and the editorial PullQuote.
// ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    label: "Pick a practice",
    description:
      "Browse by mood, time of day, or duration. Five minutes is enough.",
    Icon: ListIcon,
  },
  {
    number: "02",
    label: "Settle in",
    description:
      "Find a comfortable place. We&rsquo;ll guide you through the rest.",
    Icon: LeafIcon,
  },
  {
    number: "03",
    label: "Let it land",
    description:
      "End with a moment to notice what&rsquo;s shifted. Then carry on with your day.",
    Icon: SettledIcon,
  },
];

function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      style={{ scrollMarginTop: "var(--stp-space-6)" }}
    >
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--stp-tracking-wide)",
          fontWeight: 500,
          color: "var(--stp-color-text-subtle)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        How it works
      </p>
      <StillpointHeading level="page">Three small steps.</StillpointHeading>
      <ol
        className="grid grid-cols-1 md:grid-cols-3"
        style={{
          listStyle: "none",
          padding: 0,
          margin: "var(--stp-space-12) 0 0 0",
          gap: "var(--stp-space-10)",
        }}
      >
        {STEPS.map((s) => {
          const Icon = s.Icon;
          return (
            <li key={s.number}>
              <p
                style={{
                  fontFamily: "var(--stp-font-serif)",
                  fontSize: "var(--stp-text-3xl)",
                  lineHeight: "var(--stp-leading-tight)",
                  color: "var(--stp-color-sage)",
                  margin: "0 0 var(--stp-space-3) 0",
                }}
              >
                {s.number}
              </p>
              {/* Step icon — sits between numeral and heading as a quiet
                  visual cue for what the step is about. */}
              <div
                style={{
                  color: "var(--stp-color-sage)",
                  margin: "0 0 var(--stp-space-3) 0",
                }}
              >
                <Icon size={24} aria-hidden />
              </div>
              <StillpointHeading
                level="minor"
                style={{ marginBottom: "var(--stp-space-2)" }}
              >
                {s.label}
              </StillpointHeading>
              <p
                style={{
                  fontFamily: "var(--stp-font-sans)",
                  fontSize: "var(--stp-text-base)",
                  lineHeight: "var(--stp-leading-base)",
                  color: "var(--stp-color-text-muted)",
                  margin: 0,
                }}
                dangerouslySetInnerHTML={{ __html: s.description }}
              />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// PullQuote — editorial moment in Lora. The page's most distinctive
// typographic beat; a calm, settled sentence to break the marketing
// rhythm. The opening + closing curly quotation marks are gated on
// /typeface — the first pass shipped the quote without quote marks
// (pull quotes typically carry them); /typeface adds the proper
// editorial pair.
// ──────────────────────────────────────────────────────────────────────

function PullQuote({ typefaceApplied }: { typefaceApplied: boolean }) {
  const photo = stillpointImagery.stillLifeCandle;
  const quoteOpen = typefaceApplied ? "“" : "";
  const quoteClose = typefaceApplied ? "”" : "";
  return (
    <section
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-20)",
        paddingBottom: "var(--stp-space-20)",
      }}
    >
      <div style={CONTAINER_STYLE}>
        {/* Two-column editorial composition: still-life photograph on
            the left grounds the quote on the right in a real material
            moment. Reverses the hero's image-right asymmetry so the page
            alternates rhythm. Stacks on mobile with photo above quote. */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-x-12 gap-y-8 items-center">
          <figure style={{ margin: 0 }}>
            <div
              style={{
                aspectRatio: "4 / 3",
                borderRadius: "var(--stp-radius-md)",
                overflow: "hidden",
                background: "var(--stp-color-surface-elevated)",
                position: "relative",
                boxShadow: "var(--stp-shadow-subtle)",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-xs)",
                color: "var(--stp-color-text-subtle)",
                margin: "var(--stp-space-3) 0 0 0",
                fontStyle: "italic",
              }}
            >
              {photo.caption}
            </figcaption>
          </figure>
          <div>
            <p
              style={{
                fontFamily: "var(--stp-font-serif)",
                fontSize: "var(--stp-text-3xl)",
                lineHeight: "var(--stp-leading-snug)",
                color: "var(--stp-color-text)",
                letterSpacing: "var(--stp-tracking-tight)",
                margin: 0,
              }}
            >
              {quoteOpen}A few minutes for yourself are the ones you give
              back to everyone else.{quoteClose}
            </p>
            <p
              style={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-sm)",
                color: "var(--stp-color-text-subtle)",
                margin: "var(--stp-space-6) 0 0 0",
                letterSpacing: "var(--stp-tracking-wide)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              A note we hold close
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Signup — email capture for daily reminders. The primary CTA copy and
// the social-proof line below the form are both gated on /voice. /design's
// first pass had "Get Started" + "Join 10,000+ people finding their
// stillpoint." — the SaaS-default CTA and the performative-proof pattern
// the moodboard's anti-references explicitly excluded. /voice rewrites
// the CTA and removes the social-proof line entirely.
// ──────────────────────────────────────────────────────────────────────

function Signup({ voiceApplied }: { voiceApplied: boolean }) {
  const primaryCta = voiceApplied ? "Start practicing" : "Get Started";
  return (
    <Section>
      <div style={{ maxWidth: "560px" }}>
        <SignupAccent />
        <StillpointHeading level="page">Start tomorrow.</StillpointHeading>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-lg)",
            lineHeight: "var(--stp-leading-relaxed)",
            color: "var(--stp-color-text-muted)",
            margin: "var(--stp-space-5) 0 var(--stp-space-8) 0",
          }}
        >
          A daily reminder to take five for yourself, sent at the time you pick.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--stp-space-3)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <StillpointInput
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
            />
          </div>
          <StillpointButton variant="primary">{primaryCta}</StillpointButton>
        </div>
        {voiceApplied ? null : (
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-sm)",
              color: "var(--stp-color-text-subtle)",
              margin: "var(--stp-space-5) 0 0 0",
            }}
          >
            Join 10,000+ people finding their stillpoint.
          </p>
        )}
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SignupAccent — quiet abstract organic shape that anchors the signup
// section visually. Soft sage-to-lavender ellipse; reads as a calm
// editorial mark before the heading rather than as an illustration.
// ──────────────────────────────────────────────────────────────────────

function SignupAccent() {
  return (
    <svg
      width={88}
      height={56}
      viewBox="0 0 88 56"
      style={{ display: "block", marginBottom: "var(--stp-space-6)" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="signup-anchor" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0%"
            stopColor="var(--stp-color-sage)"
            stopOpacity="0.32"
          />
          <stop
            offset="100%"
            stopColor="var(--stp-color-lavender)"
            stopOpacity="0.22"
          />
        </linearGradient>
      </defs>
      <ellipse cx="44" cy="28" rx="40" ry="22" fill="url(#signup-anchor)" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Footer — wordmark + tagline + minimal links. Quiet close to the page.
// ──────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--stp-color-border)",
        background: "var(--stp-color-bg)",
        paddingTop: "var(--stp-space-10)",
        paddingBottom: "var(--stp-space-10)",
      }}
    >
      <div
        style={{
          ...CONTAINER_STYLE,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--stp-space-6)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--stp-font-serif)",
              fontSize: "var(--stp-text-lg)",
              color: "var(--stp-color-text)",
              margin: 0,
            }}
          >
            Stillpoint
          </p>
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-sm)",
              color: "var(--stp-color-text-subtle)",
              margin: "var(--stp-space-1) 0 0 0",
            }}
          >
            Mindfulness for real life.
          </p>
        </div>
        <nav
          aria-label="Footer"
          style={{
            display: "flex",
            gap: "var(--stp-space-6)",
            fontSize: "var(--stp-text-sm)",
          }}
        >
          <StillpointLink href="#about">About</StillpointLink>
          <StillpointLink href="#practices">Practices</StillpointLink>
          <StillpointLink href="#privacy">Privacy</StillpointLink>
          <StillpointLink href="#terms">Terms</StillpointLink>
        </nav>
      </div>
    </footer>
  );
}
