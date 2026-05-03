import Image from "next/image";
import type { CSSProperties } from "react";
import { StillpointScope } from "../components/StillpointScope";
import { StillpointHeading } from "../components/StillpointHeading";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointCard } from "../components/StillpointCard";
import { StillpointInput } from "../components/StillpointInput";
import { StillpointLink } from "../components/StillpointLink";
import {
  LeafIcon,
  ListIcon,
  MoonIcon,
  SettledIcon,
  SunRisingIcon,
  WaveIcon,
} from "../components/StillpointIcons";
import { stillpointImagery } from "../content/imagery";
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
export type AppliedCommand = "design" | "decide";

const DEFAULT_APPLIED: AppliedCommand[] = ["design", "decide"];

export type StillpointHomeProps = {
  /**
   * Which commands have been applied to the home page so far. Default:
   * all known commands applied (the cumulative live state).
   */
  applied?: AppliedCommand[];
};

export function StillpointHome({
  applied = DEFAULT_APPLIED,
}: StillpointHomeProps = {}) {
  const has = (cmd: AppliedCommand) => applied.includes(cmd);
  return (
    <StillpointScope as="main">
      <div
        style={{
          background: "var(--stp-color-bg)",
          color: "var(--stp-color-text)",
          fontFamily: "var(--stp-font-sans)",
        }}
      >
        <Header />
        <Hero />
        <Practices showPersonalization={has("decide")} />
        <HowItWorks />
        <PullQuote />
        <Signup />
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
}: {
  children: React.ReactNode;
  spacing?: "tight" | "default" | "loose";
  style?: CSSProperties;
}) {
  const py =
    spacing === "tight"
      ? "var(--stp-space-12)"
      : spacing === "loose"
        ? "var(--stp-space-20)"
        : "var(--stp-space-16)";
  return (
    <section style={{ paddingTop: py, paddingBottom: py, ...style }}>
      <div style={CONTAINER_STYLE}>{children}</div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Header — wordmark + minimal nav. Stays content-forward; the brand mark
// is a typographic moment, not a logo image.
// ──────────────────────────────────────────────────────────────────────

function Header() {
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
            gap: "var(--stp-space-6)",
            fontSize: "var(--stp-text-sm)",
          }}
        >
          <StillpointLink href="#practices">Practices</StillpointLink>
          <StillpointLink href="#about">About</StillpointLink>
          <StillpointLink href="#signin">Sign in</StillpointLink>
        </nav>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Hero — the page's largest editorial moment. Display heading sets the
// tagline; lede paragraph in sans below; two CTAs (primary + tertiary).
// ──────────────────────────────────────────────────────────────────────

function Hero() {
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
          <div
            style={{
              display: "flex",
              gap: "var(--stp-space-4)",
              flexWrap: "wrap",
              marginTop: "var(--stp-space-8)",
            }}
          >
            {/* INTENTIONAL: "Get Started" is the generic SaaS default —
                /voice can rewrite to something specific to Stillpoint's
                practice-led voice ("Begin Your Practice", "Start
                Practicing"). */}
            <StillpointButton variant="primary">Get Started</StillpointButton>
            <StillpointButton variant="tertiary">
              How it works ↓
            </StillpointButton>
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
// here is missing its apostrophe ("TODAYS PRACTICES") for /typeface to
// catch; the layout leans into the three-equal-cards pattern the
// moodboard's anti-references warned against ("aggressive symmetry"
// vs. "quietly asymmetric") for /critique to flag.
// ──────────────────────────────────────────────────────────────────────

const PRACTICES = [
  {
    title: "Morning Grounding",
    duration: "5 min · Breath",
    description: "Begin the day with a few mindful minutes.",
    Icon: SunRisingIcon,
  },
  {
    title: "Mid-day Reset",
    duration: "3 min · Breath",
    description: "A short pause to reset between meetings.",
    Icon: WaveIcon,
  },
  {
    title: "Evening Wind-down",
    duration: "7 min · Body scan",
    description: "Let the day settle before sleep.",
    Icon: MoonIcon,
  },
];

function Practices({
  showPersonalization,
}: {
  showPersonalization: boolean;
}) {
  return (
    <section
      id="practices"
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
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
            // INTENTIONAL: missing apostrophe in "TODAYS" + no
            // letter-spacing on this all-caps eyebrow. /typeface
            // can fix both.
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--stp-color-text-subtle)",
            margin: "0 0 var(--stp-space-3) 0",
          }}
        >
          TODAYS PRACTICES
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
        {/* INTENTIONAL: three-equal-cards layout. The moodboard's
            anti-references called out aggressive symmetry; /critique
            can recommend a more editorial / asymmetric arrangement. */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "var(--stp-space-6)",
          }}
        >
          {PRACTICES.map((p) => {
            const Icon = p.Icon;
            return (
              <StillpointCard key={p.title}>
                {/* Icon + duration eyebrow paired in a single line so the
                    icon reads as the category mark for the practice. */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--stp-space-2)",
                    color: "var(--stp-color-sage)",
                    margin: "0 0 var(--stp-space-3) 0",
                  }}
                >
                  <Icon size={20} aria-hidden />
                  <span
                    style={{
                      fontFamily: "var(--stp-font-sans)",
                      fontSize: "var(--stp-text-xs)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--stp-tracking-wide)",
                      fontWeight: 500,
                    }}
                  >
                    {p.duration}
                  </span>
                </div>
                <StillpointHeading
                  level="sub"
                  style={{ marginBottom: "var(--stp-space-3)" }}
                >
                  {p.title}
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
                  {p.description}
                </p>
              </StillpointCard>
            );
          })}
        </div>
      </div>
    </section>
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
    <Section>
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
// rhythm.
// ──────────────────────────────────────────────────────────────────────

function PullQuote() {
  const photo = stillpointImagery.stillLifeCandle;
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
              A few minutes for yourself are the ones you give back to
              everyone else.
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
// Signup — email capture for daily reminders. Below the form, a
// social-proof line that contradicts the moodboard's anti-references
// (no "join thousands" performative copy). Left intentionally so
// /critique and /voice can flag and rewrite.
// ──────────────────────────────────────────────────────────────────────

function Signup() {
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
          {/* INTENTIONAL: same generic "Get Started" as the hero CTA —
              /voice can address both at once. */}
          <StillpointButton variant="primary">Get Started</StillpointButton>
        </div>
        {/* INTENTIONAL: performative social-proof copy. The moodboard's
            anti-references explicitly said no "join thousands of users"
            patterns. /critique flags as anti-reference violation;
            /voice rewrites. */}
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
