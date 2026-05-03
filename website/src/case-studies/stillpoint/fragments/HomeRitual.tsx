import Image from "next/image";
import type { CSSProperties } from "react";
import { StillpointScope } from "../components/StillpointScope";
import { StillpointHeading } from "../components/StillpointHeading";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointInput } from "../components/StillpointInput";
import { StillpointLink } from "../components/StillpointLink";
import {
  MoonIcon,
  SunRisingIcon,
  WaveIcon,
} from "../components/StillpointIcons";
import { stillpointImagery } from "../content/imagery";

/**
 * Stillpoint home page — Direction 3: Ritual.
 *
 * The page is structured around the day: morning, mid-day, evening as
 * three chapters. Each chapter is a full editorial block with its own
 * image, its own background tint, and its own practice description.
 * Time-of-day is the spine of the page — the visitor reads down the
 * day rather than across a feature catalog.
 *
 * Distinct from v1 (Editorial spread — sections by content type) and
 * v2 (Letter — single-column narrative) by making time-of-day the
 * structural backbone. The same foundation tokens + primitives compose
 * into a fundamentally different feel: journey-led, time-aware,
 * chapter-organized rather than feature-organized.
 */

const CONTAINER_STYLE: CSSProperties = {
  maxWidth: "1080px",
  margin: "0 auto",
  paddingLeft: "var(--stp-space-6)",
  paddingRight: "var(--stp-space-6)",
};

export function StillpointHomeRitual() {
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
        <MorningChapter />
        <MidDayChapter />
        <EveningChapter />
        <Signup />
        <Footer />
      </div>
    </StillpointScope>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Header — wordmark + minimal nav
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
          <StillpointLink href="#about">About</StillpointLink>
          <StillpointLink href="#signin">Sign in</StillpointLink>
        </nav>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Hero — frames the day-as-practice idea. Centered, restrained.
// ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      style={{
        paddingTop: "var(--stp-space-20)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <div style={{ ...CONTAINER_STYLE, textAlign: "center" }}>
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
          A practice for every part of the day
        </p>
        <StillpointHeading level="display">
          Begin in the morning.
          <br />
          Reset by mid-day.
          <br />
          Settle at night.
        </StillpointHeading>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-lg)",
            lineHeight: "var(--stp-leading-relaxed)",
            color: "var(--stp-color-text-muted)",
            margin: "var(--stp-space-6) auto 0 auto",
            maxWidth: "52ch",
          }}
        >
          Stillpoint follows the day&rsquo;s rhythm. Three short practices,
          calibrated to the time you take them &mdash; each five to seven
          minutes, each guided.
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Chapter — shared shell for the three time-of-day sections.
//
// Each chapter has:
//   - A tinted background reflecting the time of day's color character
//   - An eyebrow naming the time
//   - A heading + body
//   - An image (from the photography library)
//   - A primary CTA pointing into the practice
// ──────────────────────────────────────────────────────────────────────

type ChapterProps = {
  eyebrow: string;
  heading: string;
  body: string;
  duration: string;
  cta: string;
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  background: string;
  imageOnRight?: boolean;
};

function Chapter({
  eyebrow,
  heading,
  body,
  duration,
  cta,
  Icon,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  background,
  imageOnRight = true,
}: ChapterProps) {
  const text = (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--stp-space-2)",
          color: "var(--stp-color-sage)",
          margin: "0 0 var(--stp-space-4) 0",
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
          {eyebrow}
        </span>
      </div>
      <StillpointHeading level="page">{heading}</StillpointHeading>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-lg)",
          lineHeight: "var(--stp-leading-relaxed)",
          color: "var(--stp-color-text-muted)",
          margin: "var(--stp-space-5) 0",
          maxWidth: "48ch",
        }}
      >
        {body}
      </p>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-sm)",
          color: "var(--stp-color-text-subtle)",
          margin: "0 0 var(--stp-space-6) 0",
        }}
      >
        {duration}
      </p>
      <StillpointButton variant="primary">{cta}</StillpointButton>
    </div>
  );

  const image = (
    <div
      style={{
        aspectRatio: "4 / 5",
        borderRadius: "var(--stp-radius-lg)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "var(--stp-shadow-card)",
        background: "var(--stp-color-surface-elevated)",
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 460px, 100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );

  return (
    <section
      style={{
        background,
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
        borderTop: "1px solid var(--stp-color-border)",
      }}
    >
      <div style={CONTAINER_STYLE}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center"
        >
          {imageOnRight ? text : image}
          {imageOnRight ? image : text}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Three chapters: morning / mid-day / evening
// Image-on-right alternates per chapter for editorial rhythm.
// ──────────────────────────────────────────────────────────────────────

function MorningChapter() {
  return (
    <Chapter
      eyebrow="Morning"
      heading="Begin grounded."
      body="A short breath practice to start the day with presence. Five minutes is enough to notice the first edge of stress softening before it builds."
      duration="5 min · Breath"
      cta="Try Morning Grounding"
      Icon={SunRisingIcon}
      imageSrc={stillpointImagery.meditationIndoor.src}
      imageAlt={stillpointImagery.meditationIndoor.alt}
      imageWidth={stillpointImagery.meditationIndoor.width}
      imageHeight={stillpointImagery.meditationIndoor.height}
      background="var(--stp-color-bg)"
      imageOnRight={true}
    />
  );
}

function MidDayChapter() {
  return (
    <Chapter
      eyebrow="Mid-day"
      heading="Reset between."
      body="Three minutes between meetings, errands, or whatever the day's middle has become. A short pause to let the noise quiet before the next thing starts."
      duration="3 min · Breath"
      cta="Try Mid-day Reset"
      Icon={WaveIcon}
      imageSrc={stillpointImagery.stillLifeJournal.src}
      imageAlt={stillpointImagery.stillLifeJournal.alt}
      imageWidth={stillpointImagery.stillLifeJournal.width}
      imageHeight={stillpointImagery.stillLifeJournal.height}
      background="var(--stp-color-surface)"
      imageOnRight={false}
    />
  );
}

function EveningChapter() {
  return (
    <Chapter
      eyebrow="Evening"
      heading="Settle gently."
      body="Seven minutes of body scan to let the day settle before sleep. Move through the body, notice what's holding on, let it loosen."
      duration="7 min · Body scan"
      cta="Try Evening Wind-down"
      Icon={MoonIcon}
      imageSrc={stillpointImagery.meditationNature.src}
      imageAlt={stillpointImagery.meditationNature.alt}
      imageWidth={stillpointImagery.meditationNature.width}
      imageHeight={stillpointImagery.meditationNature.height}
      background="var(--stp-color-bg)"
      imageOnRight={true}
    />
  );
}

// ──────────────────────────────────────────────────────────────────────
// Signup
// ──────────────────────────────────────────────────────────────────────

function Signup() {
  return (
    <section
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
        borderTop: "1px solid var(--stp-color-border)",
      }}
    >
      <div
        style={{
          ...CONTAINER_STYLE,
          maxWidth: "560px",
          textAlign: "center",
        }}
      >
        <StillpointHeading level="page">Walk the day with us.</StillpointHeading>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-lg)",
            lineHeight: "var(--stp-leading-relaxed)",
            color: "var(--stp-color-text-muted)",
            margin: "var(--stp-space-5) 0 var(--stp-space-8) 0",
          }}
        >
          We&rsquo;ll send a quiet reminder for the time of day you choose.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--stp-space-3)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <StillpointInput
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
            />
          </div>
          <StillpointButton variant="primary">Send reminders</StillpointButton>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Footer
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
          <StillpointLink href="#privacy">Privacy</StillpointLink>
          <StillpointLink href="#terms">Terms</StillpointLink>
        </nav>
      </div>
    </footer>
  );
}
