import Image from "next/image";
import type { CSSProperties } from "react";
import { StillpointScope } from "../components/StillpointScope";
import { StillpointButton } from "../components/StillpointButton";
import { StillpointInput } from "../components/StillpointInput";
import { StillpointLink } from "../components/StillpointLink";
import { stillpointImagery } from "../content/imagery";

/**
 * Stillpoint home page — Direction 2: Letter.
 *
 * The page reads as a personal letter from Stillpoint to the visitor:
 * single narrow column, no grids, no cards, no card-based UI chrome.
 * Pure typography flowing top to bottom, broken occasionally by a
 * pull quote and a single still-life interlude. Maximum editorial
 * restraint; the page commits to typography as the entire visual
 * argument.
 *
 * Distinct from v1 (Editorial spread) and v3 (Ritual journey) by
 * stripping away grid structure entirely. The same foundation tokens
 * + primitives compose into a fundamentally different feel: intimate,
 * slow, almost handwritten in register.
 */

const COLUMN_STYLE: CSSProperties = {
  maxWidth: "640px",
  margin: "0 auto",
  paddingLeft: "var(--stp-space-6)",
  paddingRight: "var(--stp-space-6)",
};

export function StillpointHomeLetter() {
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
        <Opening />
        <Why />
        <FirstPullQuote />
        <How />
        <ImageInterlude />
        <SecondPullQuote />
        <Closing />
        <Signup />
        <Footer />
      </div>
    </StillpointScope>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Header — wordmark only, centered. No nav. Quiet.
// ──────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-12)",
        textAlign: "center",
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
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Opening — display heading + lede. The page's first moment.
// ──────────────────────────────────────────────────────────────────────

function Opening() {
  return (
    <section
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-8)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--stp-font-serif)",
          fontSize: "var(--stp-text-4xl)",
          lineHeight: "var(--stp-leading-tight)",
          color: "var(--stp-color-text)",
          letterSpacing: "var(--stp-tracking-tight)",
          margin: 0,
          textWrap: "balance",
        }}
      >
        On stillness.
      </h1>
      <p
        style={{
          fontFamily: "var(--stp-font-serif)",
          fontStyle: "italic",
          fontSize: "var(--stp-text-xl)",
          lineHeight: "var(--stp-leading-relaxed)",
          color: "var(--stp-color-text-muted)",
          margin: "var(--stp-space-6) 0 0 0",
        }}
      >
        We made Stillpoint for the moments between everything else.
      </p>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Why — long-form prose explaining the idea behind the product.
// ──────────────────────────────────────────────────────────────────────

function Why() {
  return (
    <section
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-8)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <p style={BODY_STYLE}>
        There&rsquo;s a quiet idea at the center of every meditation
        practice: that a few minutes for yourself are the ones you give back
        to everyone else.
      </p>
      <p style={BODY_STYLE}>
        Stillpoint is built around that idea. Five minutes, taken when
        it&rsquo;s right, repeated until it becomes part of the day. Not a
        course to complete. Not a streak to defend. A small habit to keep,
        when the rest of your life is louder.
      </p>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// FirstPullQuote — breaks the body rhythm with a Lora display moment.
// ──────────────────────────────────────────────────────────────────────

function FirstPullQuote() {
  return (
    <section
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-12)",
        borderTop: "1px solid var(--stp-color-border)",
        borderBottom: "1px solid var(--stp-color-border)",
      }}
    >
      <div style={COLUMN_STYLE}>
        <p
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-2xl)",
            lineHeight: "var(--stp-leading-snug)",
            color: "var(--stp-color-text)",
            letterSpacing: "var(--stp-tracking-tight)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          A practice doesn&rsquo;t have to be perfect. It just has to be
          present.
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// How — describes the practices as a narrative, not as a card grid.
// ──────────────────────────────────────────────────────────────────────

function How() {
  return (
    <section
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <p style={BODY_STYLE}>
        In the morning, we begin with breath. By mid-day, we pause to
        reset. By evening, we soften into rest. Each practice is short.
        Each is guided. Each is yours to take when you need it.
      </p>
      <p style={BODY_STYLE}>
        There are no levels to unlock, no tiers to upgrade. The library is
        small by design. We&rsquo;d rather you finish a practice than start
        ten. We&rsquo;d rather it become routine than feel like a commitment.
      </p>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// ImageInterlude — a single still-life photograph breaks the prose with
// a quiet material moment. Journal + tea image — intentional, intimate.
// ──────────────────────────────────────────────────────────────────────

function ImageInterlude() {
  const photo = stillpointImagery.stillLifeJournal;
  return (
    <section
      style={{
        paddingTop: "var(--stp-space-6)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <div style={COLUMN_STYLE}>
        <figure style={{ margin: 0 }}>
          <div
            style={{
              aspectRatio: "4 / 3",
              borderRadius: "var(--stp-radius-md)",
              overflow: "hidden",
              position: "relative",
              boxShadow: "var(--stp-shadow-subtle)",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
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
              textAlign: "center",
            }}
          >
            {photo.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SecondPullQuote — a second editorial moment, near the close.
// ──────────────────────────────────────────────────────────────────────

function SecondPullQuote() {
  return (
    <section
      style={{
        background: "var(--stp-color-surface)",
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-12)",
        borderTop: "1px solid var(--stp-color-border)",
        borderBottom: "1px solid var(--stp-color-border)",
      }}
    >
      <div style={COLUMN_STYLE}>
        <p
          style={{
            fontFamily: "var(--stp-font-serif)",
            fontSize: "var(--stp-text-2xl)",
            lineHeight: "var(--stp-leading-snug)",
            color: "var(--stp-color-text)",
            letterSpacing: "var(--stp-tracking-tight)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          The few minutes you take for yourself are the ones you give back
          to everyone else.
        </p>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Closing — a brief, personal note before the signup.
// ──────────────────────────────────────────────────────────────────────

function Closing() {
  return (
    <section
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-12)",
        paddingBottom: "var(--stp-space-8)",
      }}
    >
      <p style={BODY_STYLE}>
        Begin where you are. We&rsquo;ll meet you there.
      </p>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Signup — minimal, single CTA.
// ──────────────────────────────────────────────────────────────────────

function Signup() {
  return (
    <section
      style={{
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-6)",
        paddingBottom: "var(--stp-space-12)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-sm)",
          color: "var(--stp-color-text-muted)",
          margin: "0 0 var(--stp-space-4) 0",
        }}
      >
        Send a daily reminder, when it&rsquo;s right for you.
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--stp-space-3)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <StillpointInput
            type="email"
            placeholder="you@email.com"
            aria-label="Email address"
          />
        </div>
        <StillpointButton variant="primary">Begin</StillpointButton>
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
        ...COLUMN_STYLE,
        paddingTop: "var(--stp-space-8)",
        paddingBottom: "var(--stp-space-10)",
        borderTop: "1px solid var(--stp-color-border)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-xs)",
          color: "var(--stp-color-text-subtle)",
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "var(--stp-tracking-wide)",
        }}
      >
        Stillpoint &middot; Mindfulness for real life
      </p>
      <div
        style={{
          marginTop: "var(--stp-space-4)",
          display: "flex",
          justifyContent: "center",
          gap: "var(--stp-space-5)",
          fontSize: "var(--stp-text-sm)",
        }}
      >
        <StillpointLink href="#about">About</StillpointLink>
        <StillpointLink href="#privacy">Privacy</StillpointLink>
        <StillpointLink href="#terms">Terms</StillpointLink>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Shared body paragraph style
// ──────────────────────────────────────────────────────────────────────

const BODY_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-lg)",
  lineHeight: "var(--stp-leading-relaxed)",
  color: "var(--stp-color-text-muted)",
  margin: "0 0 var(--stp-space-6) 0",
};
