import { Fragment } from "react";
import type { ReactNode, CSSProperties } from "react";
import { SpecimenFrame } from "./DemoFrame";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointButton } from "@/src/case-studies/stillpoint/components/StillpointButton";
import { StillpointCard } from "@/src/case-studies/stillpoint/components/StillpointCard";
import { StillpointHeading } from "@/src/case-studies/stillpoint/components/StillpointHeading";
import { stillpointMicrocopy } from "@/src/case-studies/stillpoint/content/microcopy";

/**
 * /foundations demo. The specimen renders the actual Stillpoint design
 * system /foundations produced — tokens and primitive components from
 * src/case-studies/stillpoint/. Wrapping content in <StillpointScope>
 * activates the .stillpoint CSS scope so --stp-* variables cascade.
 *
 * Four movements:
 *   1. Type — display + body specimens, each with an explicit spec line
 *      naming the typeface, size, line-height, weight, and token refs.
 *   2. Color — six visible swatches plus a full spec table listing each
 *      color's name, OKLCH value, role, and CSS variable name.
 *   3. Composed — a Stillpoint session card built from real primitives:
 *      StillpointCard, StillpointHeading, StillpointButton (primary +
 *      tertiary variants). Microcopy from the case study.
 *   4. Space — six steps from the Stillpoint spacing scale with px
 *      values and token names.
 *
 * Sample context comes from the Stillpoint case study — visitors who
 * read /spruce-up and /sketch first see the through-line:
 *   .spruce.md → .sketch.md → these specific tokens and primitives.
 */

const SWATCHES: Array<{
  name: string;
  token: string;
  oklch: string;
  role: string;
}> = [
  {
    name: "Cream",
    token: "--stp-color-bg",
    oklch: "oklch(96% 0.018 75)",
    role: "Background",
  },
  {
    name: "Sand",
    token: "--stp-color-surface",
    oklch: "oklch(93% 0.024 75)",
    role: "Surface",
  },
  {
    name: "Sage",
    token: "--stp-color-sage",
    oklch: "oklch(58% 0.065 145)",
    role: "Primary accent",
  },
  {
    name: "Indigo",
    token: "--stp-color-text",
    oklch: "oklch(28% 0.060 270)",
    role: "Text + depth",
  },
  {
    name: "Lavender",
    token: "--stp-color-lavender",
    oklch: "oklch(72% 0.055 295)",
    role: "Warmth",
  },
  {
    name: "Peach",
    token: "--stp-color-peach",
    oklch: "oklch(80% 0.090 50)",
    role: "Energy",
  },
];

const SPACE_STEPS: Array<{ token: string; px: number }> = [
  { token: "--stp-space-1", px: 4 },
  { token: "--stp-space-2", px: 8 },
  { token: "--stp-space-4", px: 16 },
  { token: "--stp-space-6", px: 24 },
  { token: "--stp-space-8", px: 32 },
  { token: "--stp-space-12", px: 48 },
];

export function FoundationsDemo() {
  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/foundations · Stillpoint"
      caption="Tokens and primitives /foundations generated for Stillpoint, reading from .spruce.md and .sketch.md. Every other command in the Stillpoint thread composes within this system."
    >
      <StillpointScope>
        <div
          style={{
            background: "var(--stp-color-bg)",
            border: "1px solid var(--stp-color-border)",
            borderRadius: "var(--stp-radius-md)",
            padding: "var(--stp-space-8)",
          }}
        >
          {/* Type — display + body specimens with explicit spec lines */}
          <Section eyebrow="Type">
            <TypeSpecimen
              sample="Find your stillpoint."
              sampleStyle={{
                fontFamily: "var(--stp-font-serif)",
                fontSize: "var(--stp-text-4xl)",
                lineHeight: "var(--stp-leading-tight)",
                letterSpacing: "var(--stp-tracking-tight)",
                fontWeight: 400,
                color: "var(--stp-color-text)",
              }}
              typeface="Lora"
              role="Editorial serif"
              spec="48 px · 1.2 line-height · weight 400"
              tokens="--stp-font-serif · --stp-text-4xl · --stp-leading-tight"
            />

            <div
              style={{
                borderTop: "1px solid var(--stp-color-border)",
                marginTop: "var(--stp-space-6)",
                marginBottom: "var(--stp-space-6)",
              }}
            />

            <TypeSpecimen
              sample="A few minutes for yourself, when it&rsquo;s right. Mindfulness for real life — practices designed to fit into the spaces of an ordinary day."
              sampleStyle={{
                fontFamily: "var(--stp-font-sans)",
                fontSize: "var(--stp-text-lg)",
                lineHeight: "var(--stp-leading-relaxed)",
                color: "var(--stp-color-text-muted)",
                maxWidth: "60ch",
              }}
              typeface="Söhne"
              role="Humanist sans"
              spec="18 px · 1.7 line-height · weight 400"
              tokens="--stp-font-sans · --stp-text-lg · --stp-leading-relaxed"
            />
          </Section>

          <Divider />

          {/* Color — swatches at top for visual palette read; full spec
              table below with name + OKLCH value + role + token name. */}
          <Section eyebrow="Color">
            <ColorSwatches />
            <ColorSpecTable />
          </Section>

          <Divider />

          {/* Composed + Space, paired. */}
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] sm:gap-x-10 sm:gap-y-0 items-start">
            <Section eyebrow="Composed">
              <SessionCard />
            </Section>
            <Section eyebrow="Space">
              <SpacingScale />
            </Section>
          </div>
        </div>
      </StillpointScope>
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------

const EYEBROW_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-xs)",
  textTransform: "uppercase",
  letterSpacing: "var(--stp-tracking-wide)",
  fontWeight: 500,
  color: "var(--stp-color-text-subtle)",
  margin: "0 0 var(--stp-space-4) 0",
};

const SPEC_LINE_STYLE: CSSProperties = {
  fontFamily: "var(--stp-font-sans)",
  fontSize: "var(--stp-text-xs)",
  color: "var(--stp-color-text-subtle)",
  margin: 0,
  lineHeight: "var(--stp-leading-snug)",
};

const MONO_STYLE: CSSProperties = {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: "11px",
  color: "var(--stp-color-text-subtle)",
  letterSpacing: 0,
};

// ---------------------------------------------------------------------------
// Section / Divider — shared scaffolding
// ---------------------------------------------------------------------------

function Section({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section>
      <p style={EYEBROW_STYLE}>{eyebrow}</p>
      {children}
    </section>
  );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--stp-color-border)",
        marginTop: "var(--stp-space-8)",
        marginBottom: "var(--stp-space-8)",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// TypeSpecimen — sample line rendered in the actual typeface, paired
// with an explicit spec line beneath naming the typeface, size,
// line-height, weight, and token references.
// ---------------------------------------------------------------------------

function TypeSpecimen({
  sample,
  sampleStyle,
  typeface,
  role,
  spec,
  tokens,
}: {
  sample: string;
  sampleStyle: CSSProperties;
  typeface: string;
  role: string;
  spec: string;
  tokens: string;
}) {
  return (
    <div>
      <p
        style={{ ...sampleStyle, margin: 0 }}
        dangerouslySetInnerHTML={{ __html: sample }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--stp-space-2) var(--stp-space-3)",
          marginTop: "var(--stp-space-3)",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: "var(--stp-font-sans)",
            fontSize: "var(--stp-text-sm)",
            fontWeight: 500,
            color: "var(--stp-color-text)",
          }}
        >
          {typeface}
        </span>
        <span style={SPEC_LINE_STYLE}>·&nbsp; {role}</span>
        <span style={SPEC_LINE_STYLE}>·&nbsp; {spec}</span>
        <code style={MONO_STYLE}>{tokens}</code>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ColorSwatches — six tokens shown as a horizontal row. Each swatch
// renders against its own --stp-color-* token; name labels below.
// Detailed spec data lives in the ColorSpecTable beneath.
// ---------------------------------------------------------------------------

function ColorSwatches() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--stp-space-3)",
      }}
    >
      {SWATCHES.map((s) => (
        <div key={s.name} style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              height: "56px",
              borderRadius: "var(--stp-radius-sm)",
              border: "1px solid var(--stp-color-border)",
              background: `var(${s.token})`,
            }}
            aria-label={`${s.name}: ${s.role}, ${s.oklch}`}
          />
          <p
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-sm)",
              fontWeight: 500,
              color: "var(--stp-color-text)",
              margin: "var(--stp-space-2) 0 0 0",
            }}
          >
            {s.name}
          </p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ColorSpecTable — explicit listing of every color's OKLCH value, role,
// and CSS variable name. Four-column grid; the OKLCH and token-name
// columns render in mono so they read as code.
// ---------------------------------------------------------------------------

function ColorSpecTable() {
  return (
    <div
      style={{
        marginTop: "var(--stp-space-6)",
        paddingTop: "var(--stp-space-5)",
        borderTop: "1px solid var(--stp-color-border)",
        display: "grid",
        gridTemplateColumns: "max-content max-content 1fr max-content",
        rowGap: "var(--stp-space-2)",
        columnGap: "var(--stp-space-5)",
        alignItems: "baseline",
      }}
    >
      {SWATCHES.map((s) => (
        <Fragment key={s.name}>
          <span
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-sm)",
              fontWeight: 500,
              color: "var(--stp-color-text)",
            }}
          >
            {s.name}
          </span>
          <code style={MONO_STYLE}>{s.oklch}</code>
          <span
            style={{
              fontFamily: "var(--stp-font-sans)",
              fontSize: "var(--stp-text-xs)",
              color: "var(--stp-color-text-muted)",
            }}
          >
            {s.role}
          </span>
          <code style={MONO_STYLE}>{s.token}</code>
        </Fragment>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SpacingScale — six steps with sage bars + explicit token + px labels.
// ---------------------------------------------------------------------------

function SpacingScale() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--stp-space-2)",
      }}
    >
      {SPACE_STEPS.map(({ token, px }) => (
        <div
          key={token}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--stp-space-3)",
          }}
        >
          <div
            style={{
              height: "6px",
              width: `${px * 2}px`,
              background: "var(--stp-color-sage)",
              borderRadius: "3px",
            }}
            aria-hidden
          />
          <code style={MONO_STYLE} aria-label={`${token}, ${px} pixels`}>
            {token} · {px}px
          </code>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SessionCard — composed primitive: StillpointCard wrapping
// StillpointHeading + body + two StillpointButton variants.
// Microcopy from the case study so the catalog material flows from the
// canonical Stillpoint source.
// ---------------------------------------------------------------------------

function SessionCard() {
  return (
    <StillpointCard style={{ maxWidth: "320px" }}>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--stp-tracking-wide)",
          fontWeight: 500,
          color: "var(--stp-color-sage)",
          margin: "0 0 var(--stp-space-2) 0",
        }}
      >
        {stillpointMicrocopy.appScreen.duration}
      </p>
      <StillpointHeading
        level="sub"
        style={{ marginBottom: "var(--stp-space-3)" }}
      >
        {stillpointMicrocopy.appScreen.morningGrounding}
      </StillpointHeading>
      <p
        style={{
          fontFamily: "var(--stp-font-sans)",
          fontSize: "var(--stp-text-sm)",
          lineHeight: "var(--stp-leading-base)",
          color: "var(--stp-color-text-muted)",
          margin: "0 0 var(--stp-space-5) 0",
        }}
      >
        Five minutes of breath to begin the day.
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--stp-space-3)",
          flexWrap: "wrap",
        }}
      >
        <StillpointButton variant="primary">
          {stillpointMicrocopy.buttons.primary.startSession}
        </StillpointButton>
        <StillpointButton variant="tertiary">
          {stillpointMicrocopy.buttons.secondary.skip}
        </StillpointButton>
      </div>
    </StillpointCard>
  );
}
