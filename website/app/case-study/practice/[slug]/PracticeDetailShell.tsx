"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StillpointScope,
  type StillpointTheme,
} from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointButton } from "@/src/case-studies/stillpoint/components/StillpointButton";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import { StillpointHeading } from "@/src/case-studies/stillpoint/components/StillpointHeading";
import { StillpointLink } from "@/src/case-studies/stillpoint/components/StillpointLink";
import { StillpointThemeToggle } from "@/src/case-studies/stillpoint/components/StillpointThemeToggle";
import { stillpointImagery } from "@/src/case-studies/stillpoint/content/imagery";
import {
  type Practice,
  getOtherPractices,
  getPractice,
} from "@/src/case-studies/stillpoint/content/practices";
import { ContextBanner, useStillpointTheme } from "../../_shared";

/**
 * Practice detail shell — the full Stillpoint detail page wrapping a
 * single practice. Same theme controller and Spruce context banner the
 * /case-study root carries, so the case-study experience reads as one
 * product across sub-routes.
 *
 * Page sections, top to bottom:
 *   1. Header     — Stillpoint wordmark + nav + theme toggle
 *   2. Hero       — image left + text right (reversed asymmetry from
 *                   /case-study's home, so the surfaces feel kindred but
 *                   not identical)
 *   3. About      — multi-paragraph editorial copy on the practice
 *   4. WhatToExpect — numbered steps describing the practice flow
 *   5. Specs      — duration / audio / type / environment panel
 *   6. Guide      — small avatar + bio for the practice's guide
 *   7. Related    — the other two practices as compact cards
 *   8. Footer     — Stillpoint wordmark + minimal links
 *
 * Header + footer are inlined here rather than imported from Home.tsx
 * (Home.tsx's Header/Footer aren't exported). If a third Stillpoint
 * surface lands, it's worth extracting to shared primitives.
 */

export function PracticeDetailShell({ slug }: { slug: string }) {
  const { theme, toggle, mounted } = useStillpointTheme();
  const resolvedTheme: StillpointTheme = mounted ? theme : "inherit";

  // Resolve the practice on the client — page.tsx already validated the
  // slug and called notFound() if invalid, so this lookup is guaranteed
  // to return a value at runtime. The early return is a defensive guard.
  const practice = getPractice(slug);
  if (!practice) return null;

  return (
    <>
      <ContextBanner crumb={practice.title} />
      <StillpointScope as="main" theme={resolvedTheme}>
        <div
          style={{
            background: "var(--stp-color-bg)",
            color: "var(--stp-color-text)",
            fontFamily: "var(--stp-font-sans)",
          }}
        >
          <Header
            themeToggle={
              <StillpointThemeToggle theme={theme} onToggle={toggle} />
            }
          />
          <Hero practice={practice} />
          <About practice={practice} />
          <WhatToExpect practice={practice} />
          <Specs practice={practice} />
          <Guide practice={practice} />
          <Related currentSlug={practice.slug} />
          <Footer />
        </div>
      </StillpointScope>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Shared layout — container + section wrappers matching Home.tsx's rhythm
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
  children: ReactNode;
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
// Header — mirrors Home.tsx's header. Wordmark + nav + theme toggle.
// Practices link goes back to /case-study#practices for visitors who
// landed here from elsewhere and want to browse the catalog.
// ──────────────────────────────────────────────────────────────────────

function Header({ themeToggle }: { themeToggle: ReactNode }) {
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
        <Link
          href="/case-study"
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-xl)",
            color: "var(--stp-color-text)",
            margin: 0,
            letterSpacing: "var(--stp-tracking-tight)",
            textDecoration: "none",
          }}
        >
          Stillpoint
        </Link>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--stp-space-5)",
            fontSize: "var(--stp-text-sm)",
          }}
        >
          <StillpointLink href="/case-study#practices">Practices</StillpointLink>
          <StillpointLink href="#about">About</StillpointLink>
          <StillpointLink href="#signin">Sign in</StillpointLink>
          {themeToggle}
        </nav>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Hero — image-left + text-right asymmetric grid (5/7 split, reversed
// from /case-study's home which uses 7/5 with text on the left). Carries
// the eyebrow, title, lede, primary CTA, and the secondary action row
// (favorite + add to calendar).
// ──────────────────────────────────────────────────────────────────────

const TIME_OF_DAY_LABEL: Record<Practice["timeOfDay"], string> = {
  morning: "Morning",
  midday: "Mid-day",
  evening: "Evening",
};

function Hero({ practice }: { practice: Practice }) {
  const photo = stillpointImagery[practice.imageKey];
  const eyebrow = `${TIME_OF_DAY_LABEL[practice.timeOfDay]} · ${
    practice.duration
  }`;

  return (
    <Section spacing="loose">
      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-x-12 gap-y-10 items-center">
        <HeroImage photo={photo} />
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
            {eyebrow}
          </p>
          <StillpointHeading level="display">{practice.title}</StillpointHeading>
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xl)",
              lineHeight: "var(--stp-leading-relaxed)",
              color: "var(--stp-color-text-muted)",
              margin: "var(--stp-space-6) 0 0 0",
              maxWidth: "48ch",
            }}
          >
            {practice.shortDescription}
          </p>
          <CtaRow />
        </div>
      </div>
    </Section>
  );
}

function HeroImage({
  photo,
}: {
  photo: (typeof stillpointImagery)[keyof typeof stillpointImagery];
}) {
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
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// CtaRow — primary "Begin practice" + secondary favorite + add-to-calendar.
// Favorite is stateful (toggles filled/outline heart). Add-to-calendar is
// visual-only for the demo. Both secondaries render as tertiary buttons
// with text+icon so they read as quiet sibling actions, not as competing
// primaries.
// ──────────────────────────────────────────────────────────────────────

function CtaRow() {
  const [favorited, setFavorited] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--stp-space-4)",
        flexWrap: "wrap",
        marginTop: "var(--stp-space-8)",
        alignItems: "center",
      }}
    >
      <StillpointButton variant="primary">Begin practice</StillpointButton>
      <StillpointButton
        variant="tertiary"
        onClick={() => setFavorited((f) => !f)}
        aria-pressed={favorited}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <HeartIcon filled={favorited} /> {favorited ? "Favorited" : "Favorite"}
      </StillpointButton>
      <StillpointButton variant="tertiary">
        <CalendarIcon /> Add to calendar
      </StillpointButton>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// About — multi-paragraph editorial copy. Lora display heading + sans
// body. Text caps at a comfortable reading measure.
// ──────────────────────────────────────────────────────────────────────

function About({ practice }: { practice: Practice }) {
  return (
    <section
      id="about"
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
      }}
    >
      <div style={CONTAINER_STYLE}>
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
          About this practice
        </p>
        <StillpointHeading level="page">
          What this is for.
        </StillpointHeading>
        <div
          style={{
            display: "grid",
            gap: "var(--stp-space-5)",
            maxWidth: "60ch",
            marginTop: "var(--stp-space-8)",
          }}
        >
          {practice.longDescription.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-lg)",
                lineHeight: "var(--stp-leading-relaxed)",
                color: "var(--stp-color-text)",
                margin: 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// WhatToExpect — numbered steps. Same Lora-numeral pattern as the home
// page's how-it-works section, scoped to this practice.
// ──────────────────────────────────────────────────────────────────────

function WhatToExpect({ practice }: { practice: Practice }) {
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
        What to expect
      </p>
      <StillpointHeading level="page">
        The practice, step by step.
      </StillpointHeading>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: "var(--stp-space-12) 0 0 0",
          display: "grid",
          gap: "var(--stp-space-10)",
          gridTemplateColumns: "1fr",
          maxWidth: "64ch",
        }}
      >
        {practice.steps.map((step, i) => (
          <li
            key={step.label}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "var(--stp-space-6)",
              alignItems: "baseline",
            }}
          >
            <p
              style={{
                fontFamily: "var(--stp-font-serif)",
                fontSize: "var(--stp-text-3xl)",
                lineHeight: "var(--stp-leading-tight)",
                color: "var(--stp-color-sage)",
                margin: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <StillpointHeading
                level="minor"
                style={{ marginBottom: "var(--stp-space-2)" }}
              >
                {step.label}
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
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Specs — small structured panel: duration / audio length / type /
// environment. Sage border-left as a quiet visual accent so the panel
// reads as factual reference within the surrounding editorial register.
// ──────────────────────────────────────────────────────────────────────

function Specs({ practice }: { practice: Practice }) {
  return (
    <section
      style={{
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <div style={CONTAINER_STYLE}>
        <div
          style={{
            borderLeft: "2px solid var(--stp-color-sage)",
            paddingLeft: "var(--stp-space-6)",
            paddingTop: "var(--stp-space-3)",
            paddingBottom: "var(--stp-space-3)",
            display: "grid",
            gap: "var(--stp-space-5)",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            maxWidth: "60ch",
          }}
          className="md:grid-cols-4"
        >
          <Spec label="Duration" value={practice.duration.split(" · ")[0]} />
          <Spec label="Audio" value={practice.audioLength} />
          <Spec label="Type" value={practice.type} />
          <Spec
            label="Best for"
            value={TIME_OF_DAY_LABEL[practice.timeOfDay]}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-base)",
            lineHeight: "var(--stp-leading-relaxed)",
            color: "var(--stp-color-text-muted)",
            margin: "var(--stp-space-6) 0 0 0",
            maxWidth: "60ch",
          }}
        >
          <span
            style={{
              fontStyle: "italic",
              fontFamily: "var(--stp-font-serif)",
              color: "var(--stp-color-text)",
            }}
          >
            Setup —
          </span>{" "}
          {practice.environment}
        </p>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--stp-tracking-wide)",
          fontWeight: 500,
          color: "var(--stp-color-text-subtle)",
          margin: "0 0 var(--stp-space-1) 0",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-base)",
          color: "var(--stp-color-text)",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Guide — small avatar mark (initials in a sage-tinted circle) + name +
// brief bio. Quiet treatment so the guide reads as the practice's
// teacher without becoming a personality moment.
// ──────────────────────────────────────────────────────────────────────

function Guide({ practice }: { practice: Practice }) {
  return (
    <section
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-16)",
        paddingBottom: "var(--stp-space-16)",
      }}
    >
      <div style={CONTAINER_STYLE}>
        <p
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--stp-tracking-wide)",
            fontWeight: 500,
            color: "var(--stp-color-text-subtle)",
            margin: "0 0 var(--stp-space-6) 0",
          }}
        >
          Your guide
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "var(--stp-space-6)",
            alignItems: "start",
            maxWidth: "60ch",
          }}
        >
          <div
            aria-hidden
            style={{
              width: 64,
              height: 64,
              borderRadius: "9999px",
              background: "var(--stp-color-sage-subtle)",
              color: "var(--stp-color-sage)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--stp-font-serif)",
              fontSize: "var(--stp-text-xl)",
              letterSpacing: "var(--stp-tracking-tight)",
            }}
          >
            {practice.guide.initials}
          </div>
          <div>
            <StillpointHeading
              level="minor"
              style={{ marginBottom: "var(--stp-space-2)" }}
            >
              {practice.guide.name}
            </StillpointHeading>
            <p
              style={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-base)",
                lineHeight: "var(--stp-leading-relaxed)",
                color: "var(--stp-color-text-muted)",
                margin: 0,
              }}
            >
              {practice.guide.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Related — the other two practices as cards. Same StillpointCard +
// interactive treatment as the home's supporting cards (.stp-card
// --interactive picks up hover lift + shadow). Each card links to its
// own detail page.
// ──────────────────────────────────────────────────────────────────────

function Related({ currentSlug }: { currentSlug: string }) {
  const others = getOtherPractices(currentSlug);
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
        Other practices
      </p>
      <StillpointHeading level="page">You might also try.</StillpointHeading>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: "var(--stp-space-6)",
          marginTop: "var(--stp-space-12)",
        }}
      >
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/case-study/practice/${p.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <RelatedCard practice={p} />
          </Link>
        ))}
      </div>
    </Section>
  );
}

function RelatedCard({ practice }: { practice: Practice }) {
  const Icon = practice.Icon;
  return (
    <StillpointCard interactive>
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
          {practice.duration}
        </span>
      </div>
      <StillpointHeading
        level="sub"
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
  );
}

// ──────────────────────────────────────────────────────────────────────
// Footer — mirrors Home.tsx's footer. Kept inline rather than imported
// because Home's Footer isn't exported.
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
          <StillpointLink href="/case-study#practices">Practices</StillpointLink>
          <StillpointLink href="#privacy">Privacy</StillpointLink>
          <StillpointLink href="#terms">Terms</StillpointLink>
        </nav>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Inline glyphs — heart + calendar for the secondary CTA row. Stillpoint
// icon system uses currentColor stroke-only, so these match the
// established line-iconography character.
// ──────────────────────────────────────────────────────────────────────

const GLYPH_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      {...GLYPH_PROPS}
      fill={filled ? "currentColor" : "none"}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...GLYPH_PROPS} aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}
