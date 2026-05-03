"use client";

import { useState } from "react";
import { BeforeAfterDemo, type Annotation } from "./BeforeAfterDemo";

/**
 * /refine before/after demonstration. A live primary button — the
 * meditation app's "Begin practice" CTA — that visitors actually interact
 * with. Hover for hover state, tab for focus, click for active. A small
 * toggle below the button flips it into a disabled state (since disabled
 * is a property the element holds, not an event you can trigger). The
 * before view shows the same button with the AI-default baseline: only
 * the default state has any treatment, focus is suppressed via
 * outline:none with no replacement, hover and active produce no visible
 * change. The contrast between the dead before button and the responsive
 * after button is the demonstration.
 *
 * Single live button (not a static grid) because interactive states are
 * temporal — they exist in time, not in space — and the demo's argument
 * is more honest when the visitor experiences the states by interacting
 * rather than by reading labels next to mock buttons.
 *
 * Both states use the meditation app's amber-700 accent (per /foundations
 * + /colorgrade) and Source Sans body. Color and typography are held
 * constant so the only perceptible variable is state coverage — what
 * /refine adds.
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Hover — surface darkens to confirm pointer interactivity. AI-generated buttons often skip the hover treatment; the cursor changes but the button doesn't.",
  },
  {
    n: 2,
    text: "Active — pressed state goes one step darker again, with subtle inset to confirm the click landed. Frequently missed; users tap and aren't sure whether the action registered.",
  },
  {
    n: 3,
    text: "Focus — visible ring with offset for keyboard navigation. Required for accessibility. AI defaults frequently strip the ring or fall back to the browser's outline.",
  },
  {
    n: 4,
    text: "Disabled — reduced opacity and a not-allowed cursor. Legible at a glance that the button can't be used right now, distinct from the default state.",
  },
];

const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

// Before — only the default state has any treatment. focus:outline-none
// suppresses the browser indicator with no replacement (the worst-case AI
// default). Hover and active have no variants so the button shows no visual
// change when interacted with.
const BUTTON_DEFAULT_ONLY =
  "bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-md focus:outline-none";

// After — full interactive state coverage. Each Tailwind variant attaches
// the treatment described in the annotations: hover darkens, active darkens
// further plus shadow-inner, focus-visible adds an offset accent ring,
// disabled fades and switches the cursor. The disabled:* overrides keep
// hover/active visuals from firing on top of the disabled treatment.
const BUTTON_FULL_STATES = [
  "bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-md",
  "transition-all duration-150",
  "hover:bg-amber-800",
  "active:bg-amber-900 active:shadow-inner",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "disabled:hover:bg-amber-700 disabled:active:bg-amber-700 disabled:active:shadow-none",
].join(" ");

export function RefineDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /refine"
      annotations={ANNOTATIONS}
      before={<BeforeButton />}
      after={<AfterButton />}
    />
  );
}

function BeforeButton() {
  return (
    <div
      className="flex flex-col items-center py-10"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <button type="button" className={BUTTON_DEFAULT_ONLY}>
        Begin practice
      </button>
    </div>
  );
}

function AfterButton() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-5 py-6"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <button
        type="button"
        disabled={disabled}
        className={BUTTON_FULL_STATES}
      >
        Begin practice
      </button>
      <p className="font-mono text-2xs uppercase tracking-widest text-stone-500">
        Hover &middot; Tab &middot; Click
      </p>
      <DisabledToggle
        on={disabled}
        onToggle={() => setDisabled((d) => !d)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// DisabledToggle — small pill switch that flips the live button into a
// disabled state. Disabled is a property of the element rather than an
// event, so it gets its own affordance rather than living in the action
// prompt. Label stays "Disabled"; the pill position visually carries on/off.
// ---------------------------------------------------------------------------

function DisabledToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm"
    >
      <span
        aria-hidden
        className={`inline-flex items-center w-9 h-5 rounded-full p-0.5 transition-colors duration-150 ${
          on ? "bg-stone-700 justify-end" : "bg-stone-300 justify-start"
        }`}
      >
        <span className="block w-4 h-4 rounded-full bg-white transition-all" />
      </span>
      <span className="text-xs text-stone-600 group-hover:text-stone-900 transition-colors">
        Disabled
      </span>
    </button>
  );
}
