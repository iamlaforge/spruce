"use client";

import type { CSSProperties, ReactNode } from "react";
import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointInput } from "@/src/case-studies/stillpoint/components/StillpointInput";

/**
 * /arrange before/after demonstration. A Stillpoint settings page shown
 * in two states: AI default with cramped, uneven, and symmetric spacing
 * vs after-/arrange with scale-conformant rhythm, asymmetric heading
 * margins, capped helper-text measure, and clear section breathing.
 *
 * Settings page chosen because spatial discipline shows most clearly in
 * stacked dense layouts where labels, inputs, helper text, and section
 * headings each have their own relationship to neighbors. Sections
 * (Practice preferences + Reminders) are Stillpoint-specific so the
 * demo threads with the workflow narrative the rest of the catalog has
 * been building.
 *
 * Typography and palette are held constant across both states (Söhne
 * sans + Stillpoint colors) so the only perceptible change is spacing —
 * visitors attribute every difference to /arrange. Both forms render
 * inside StillpointScope so colors, borders, fonts, and the input
 * primitive's hover/focus states all cascade with Spruce's theme
 * toggle.
 *
 * Inputs are read-only — they're demo decoration, not a functional
 * form. Making them editable invites visitors to type values that
 * disappear on toggle, which reads as broken; readOnly preserves the
 * visual without the misleading interactivity.
 */

const STP_FONT_SANS = "var(--stp-font-sans)";

const HELPER_TEXT =
  "Pick the voice that feels most calming. You can change this any time, even mid-practice.";

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Heading margin — asymmetric, with more space above the heading than below it. Symmetric margins make the heading float between sections; asymmetric margins make it visibly belong to the content underneath.",
  },
  {
    n: 2,
    text: "Label-to-input rhythm — consistent gap between every label and its input, scale-conformant. The AI default mixes arbitrary values (4px, 8px, 12px) that read as visual wobble.",
  },
  {
    n: 3,
    text: "Helper text measure — capped at a reading width instead of running edge-to-edge. Long lines of helper text become inscrutable; capping the measure restores readability.",
  },
  {
    n: 4,
    text: "Section breathing — clear vertical space between sections so each one reads as its own group. AI defaults pack sections close together, making the whole form feel like one long list.",
  },
];

export function ArrangeDemo() {
  return (
    <BeforeAfterDemo
      beforeLabel="Before /arrange"
      afterLabel="After /arrange"
      annotations={ANNOTATIONS}
      demoNote={
        <>
          Stillpoint&rsquo;s home doesn&rsquo;t include a settings form — this
          demo illustrates /arrange&rsquo;s principle on a related Stillpoint
          surface rather than on something currently shipped. The actual
          section spacing on Home.tsx is calibrated by /foundations + the
          Section component; /arrange&rsquo;s work on Stillpoint is
          verification, not incremental change.
        </>
      }
      before={
        <CloseUp>
          <BeforeForm />
        </CloseUp>
      }
      after={
        <CloseUp>
          <AfterForm />
        </CloseUp>
      }
    />
  );
}

// ---------------------------------------------------------------------------
// CloseUp — wraps the form in StillpointScope with internal padding so
// the visible Stillpoint surface has breathing room (matching the other
// Stillpoint-grounded demos' pattern).
// ---------------------------------------------------------------------------

function CloseUp({ children }: { children: ReactNode }) {
  return (
    <StillpointScope>
      <div style={{ padding: "var(--stp-space-12) var(--stp-space-8)" }}>
        {children}
      </div>
    </StillpointScope>
  );
}

// ---------------------------------------------------------------------------
// Shared style constants — held identical between forms so the diff
// isolates only the spacing decisions /arrange addresses.
// ---------------------------------------------------------------------------

const HEADING_STYLE: CSSProperties = {
  fontFamily: STP_FONT_SANS,
  fontSize: "var(--stp-text-sm)",
  fontWeight: 600,
  color: "var(--stp-color-text)",
  margin: 0,
};

const LABEL_STYLE: CSSProperties = {
  fontFamily: STP_FONT_SANS,
  fontSize: "var(--stp-text-xs)",
  color: "var(--stp-color-text-muted)",
  margin: 0,
  display: "block",
};

const HELPER_STYLE: CSSProperties = {
  fontFamily: STP_FONT_SANS,
  fontSize: "var(--stp-text-xs)",
  color: "var(--stp-color-text-subtle)",
  lineHeight: "var(--stp-leading-snug)",
  margin: 0,
};

const ROW_LABEL_STYLE: CSSProperties = {
  fontFamily: STP_FONT_SANS,
  fontSize: "var(--stp-text-sm)",
  color: "var(--stp-color-text)",
};

// ---------------------------------------------------------------------------
// BeforeForm — cramped, uneven, symmetric. Inline styles deliberately use
// arbitrary px values (3px, 6px, 8px, 11px, 14px) to dramatize the lack
// of rhythm. Helper text runs edge-to-edge of the form column.
// ---------------------------------------------------------------------------

function BeforeForm() {
  return (
    <div style={{ maxWidth: "28rem" }}>
      <h4 style={{ ...HEADING_STYLE, marginTop: 6, marginBottom: 6 }}>
        Practice preferences
      </h4>
      <p style={{ ...LABEL_STYLE, marginBottom: 3 }}>Default session length</p>
      <div style={{ marginBottom: 11 }}>
        <StillpointInput type="text" defaultValue="5 minutes" readOnly />
      </div>
      <p style={{ ...LABEL_STYLE, marginBottom: 8 }}>Voice guide</p>
      <div style={{ marginBottom: 4 }}>
        <StillpointInput type="text" defaultValue="Maya" readOnly />
      </div>
      <p style={{ ...HELPER_STYLE, marginBottom: 14 }}>{HELPER_TEXT}</p>
      <h4 style={{ ...HEADING_STYLE, marginTop: 6, marginBottom: 8 }}>
        Reminders
      </h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span style={ROW_LABEL_STYLE}>Daily reminder</span>
        <Toggle on />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={ROW_LABEL_STYLE}>Weekly summary</span>
        <Toggle />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AfterForm — same content, scale-conformant rhythm. Asymmetric heading
// margins (more space above than below), consistent label-input pairs,
// clear section break, helper text capped at reading measure.
// ---------------------------------------------------------------------------

function AfterForm() {
  return (
    <div style={{ maxWidth: "28rem" }}>
      <section>
        <h4
          style={{
            ...HEADING_STYLE,
            marginBottom: "var(--stp-space-4)",
          }}
        >
          Practice preferences
          <Marker n={1} />
        </h4>
        <div style={{ display: "grid", gap: "var(--stp-space-4)" }}>
          <div>
            <label
              style={{
                ...LABEL_STYLE,
                marginBottom: "var(--stp-space-2)",
              }}
            >
              Default session length
              <Marker n={2} />
            </label>
            <StillpointInput type="text" defaultValue="5 minutes" readOnly />
          </div>
          <div>
            <label style={LABEL_STYLE}>Voice guide</label>
            <p
              style={{
                ...HELPER_STYLE,
                margin: "var(--stp-space-2) 0",
                maxWidth: "20rem",
              }}
            >
              {HELPER_TEXT}
              <Marker n={3} />
            </p>
            <StillpointInput type="text" defaultValue="Maya" readOnly />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "var(--stp-space-10)" }}>
        <h4
          style={{
            ...HEADING_STYLE,
            marginBottom: "var(--stp-space-4)",
          }}
        >
          Reminders
          <Marker n={4} />
        </h4>
        <div style={{ display: "grid", gap: "var(--stp-space-4)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={ROW_LABEL_STYLE}>Daily reminder</span>
            <Toggle on />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={ROW_LABEL_STYLE}>Weekly summary</span>
            <Toggle />
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle — minimal visual pill in Stillpoint colors. On state uses sage;
// off uses border-strong. Knob uses elevated surface so the contrast
// against either track reads cleanly. Not interactive — the demo is a
// still life of the surface, not a functional form.
// ---------------------------------------------------------------------------

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: 36,
        height: 20,
        borderRadius: "var(--stp-radius-pill)",
        padding: 2,
        background: on
          ? "var(--stp-color-sage)"
          : "var(--stp-color-border-strong)",
        justifyContent: on ? "flex-end" : "flex-start",
        transition:
          "background-color var(--stp-duration-fast) var(--stp-ease-out)",
      }}
    >
      <span
        style={{
          display: "block",
          width: 16,
          height: 16,
          borderRadius: "9999px",
          background: "var(--stp-color-surface-elevated)",
        }}
      />
    </span>
  );
}
