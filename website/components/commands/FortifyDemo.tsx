"use client";

import { useState } from "react";
import { StillpointScope } from "@/src/case-studies/stillpoint/components/StillpointScope";
import { StillpointButton } from "@/src/case-studies/stillpoint/components/StillpointButton";
import { StillpointLink } from "@/src/case-studies/stillpoint/components/StillpointLink";

/**
 * /fortify demo. A state toggle controls both columns simultaneously —
 * left shows what AI-default code typically does for that state (stubbed,
 * null-checked, or absent), right shows what /fortify builds (skeleton
 * screens that match content shape, three-part empty states, error
 * states with recovery).
 *
 * The demo's argument made visible: a component isn't done when its
 * happy path looks right; it's done when every path a user might
 * encounter has been designed. The toggle steps the visitor through the
 * three most common gap states — Loading, Empty, Error — at fidelity.
 *
 * The list shells inside both columns render inside StillpointScope so
 * the surface, borders, copy, skeletons, error treatment, and CTAs all
 * pull from --stp-* tokens — and therefore cascade with Spruce's theme
 * toggle the same way every other Stillpoint-grounded demo does. The
 * argument here is state coverage (what's rendered), not palette
 * character (which colors); using Stillpoint tokens for both columns
 * isolates the state-coverage diff cleanly.
 *
 * The figure frame (header eyebrow, state toggle tabs, the outer card
 * stage's bg-surface, the annotations list) stays in Spruce styling —
 * those are catalog meta, not the Stillpoint surface being demonstrated.
 */

const STP_FONT_SANS = "var(--stp-font-sans)";
const STP_FONT_SERIF = "var(--stp-font-serif)";

type StateKey = "loading" | "empty" | "error";

const STATE_TABS: Array<{ key: StateKey; label: string }> = [
  { key: "loading", label: "Loading" },
  { key: "empty", label: "Empty" },
  { key: "error", label: "Error" },
];

export function FortifyDemo() {
  const [state, setState] = useState<StateKey>("loading");

  return (
    <figure className="my-10 md:my-12 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
      <header className="flex flex-wrap items-center justify-between gap-y-3 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Interactive
        </p>
        <StateToggle current={state} onChange={setState} />
      </header>

      <div className="border border-rule-subtle bg-surface rounded-md px-8 py-10 md:px-14 md:py-14">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6">
          <Column label="Before /fortify" sublabel="happy path only">
            <ListShell>
              {state === "loading" ? <DefaultLoading /> : null}
              {state === "empty" ? <DefaultEmpty /> : null}
              {state === "error" ? <DefaultError /> : null}
            </ListShell>
          </Column>
          <Column label="After /fortify" sublabel="every state designed" isAfter>
            <ListShell>
              {state === "loading" ? <BuiltLoading /> : null}
              {state === "empty" ? <BuiltEmpty /> : null}
              {state === "error" ? <BuiltError /> : null}
            </ListShell>
          </Column>
        </div>
      </div>

      <ol role="list" className="list-none mt-7 md:mt-8 space-y-3 max-w-prose">
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            1
          </span>
          Loading shows the shape of the content arriving. A skeleton
          matched to the list pattern reads as intent — the content is
          coming — rather than as a generic spinner.
        </li>
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            2
          </span>
          Empty states use the three-part pattern: what this space is, why
          it&rsquo;s empty now, what to do about it. Null-check copy
          (&ldquo;No items found&rdquo;) is replaced by language that
          introduces the space.
        </li>
        <li className="text-sm md:text-base text-ink-subtle leading-snug pl-7 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-sm md:text-base text-accent leading-snug"
          >
            3
          </span>
          Error states describe the fix with a recovery affordance, not
          the failure. Beyond visible states, /fortify also addresses
          focus rings, ARIA on icon-only buttons, contrast minimums, and
          keyboard navigation — the parts that don&rsquo;t show up on the
          page but matter to every user.
        </li>
      </ol>

      {/* Demo note — Stillpoint's home doesn't currently render a state-
          aware "Today's practices" list, so this demo illustrates the
          principle on a related abstraction. /uxreview's findings on the
          actual signup form + personalization banner remain noted. */}
      <div className="border-t border-rule-subtle mt-7 md:mt-8 pt-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          On Stillpoint
        </p>
        <p className="text-sm text-ink-muted leading-snug max-w-prose text-pretty">
          Stillpoint&rsquo;s home doesn&rsquo;t currently render a
          state-aware &ldquo;Today&rsquo;s practices&rdquo; list — this
          demo illustrates /fortify&rsquo;s principle on a related
          abstraction. /uxreview surfaced real state-coverage gaps on
          Stillpoint (signup form&rsquo;s missing error/success/validation
          states; personalization banner&rsquo;s missing fallback); their
          implementation sits in the corrective queue, outside this
          catalog narrative&rsquo;s scope.
        </p>
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// StateToggle — three-tab strip in the header. Active tab marked with the
// accent underline pattern shared across the site's other tab strips.
// ---------------------------------------------------------------------------

function StateToggle({
  current,
  onChange,
}: {
  current: StateKey;
  onChange: (k: StateKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Component state"
      className="inline-flex gap-x-5 border-b border-rule-subtle"
    >
      {STATE_TABS.map(({ key, label }) => {
        const active = current === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(key)}
            className={`font-mono text-2xs uppercase tracking-widest pb-2 -mb-px border-b-2 transition-colors duration-fast ease-considered ${
              active
                ? "border-accent text-accent"
                : "border-transparent text-ink-subtle hover:text-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column — the labeled wrapper for one variant. Shared shell with the
// /pace demo's columns: eyebrow + sublabel above the surface in Spruce
// mono so labels read as catalog meta, not as Stillpoint UI.
// ---------------------------------------------------------------------------

function Column({
  label,
  sublabel,
  isAfter = false,
  children,
}: {
  label: string;
  sublabel: string;
  isAfter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3">
        <p
          className={`font-mono text-2xs uppercase tracking-widest mb-0.5 ${
            isAfter ? "text-accent" : "text-ink-subtle"
          }`}
        >
          {label}
        </p>
        <p className="font-mono text-2xs text-ink-subtle">{sublabel}</p>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ListShell — the surrounding "Today's practices" list card. Wrapped in
// StillpointScope so the surface, borders, eyebrow, and inner state
// content all pull from --stp-* tokens. Both columns share this shell so
// visitors read the demo as "same component, different state coverage"
// rather than "two different products."
// ---------------------------------------------------------------------------

function ListShell({ children }: { children: React.ReactNode }) {
  return (
    <StillpointScope>
      <div
        className="relative h-[220px] md:h-[240px] rounded-md overflow-hidden"
        style={{
          background: "var(--stp-color-bg)",
          border: "1px solid var(--stp-color-border)",
          padding: "var(--stp-space-4)",
        }}
      >
        <p
          style={{
            fontFamily: STP_FONT_SANS,
            fontSize: "var(--stp-text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--stp-tracking-wide)",
            fontWeight: 500,
            color: "var(--stp-color-text-subtle)",
            margin: "0 0 var(--stp-space-3) 0",
          }}
        >
          Today&rsquo;s practices
        </p>
        <div className="relative" style={{ height: "calc(100% - 32px)" }}>
          {children}
        </div>
      </div>
    </StillpointScope>
  );
}

// ---------------------------------------------------------------------------
// AI-default state treatments — what tools like v0 / Cursor / Claude
// commonly produce when a state is technically handled but not designed.
// Treatments are AI-default in form (spinner, null-check copy, failure
// announcement) but rendered with Stillpoint tokens so the diff isolates
// the form difference rather than mixing in palette character.
// ---------------------------------------------------------------------------

function DefaultLoading() {
  // Centered spinner regardless of content shape — the most common AI
  // default, and the one /fortify most often replaces.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        aria-hidden
        className="size-5 rounded-full animate-spin"
        style={{
          border: "2px solid var(--stp-color-border)",
          borderTopColor: "var(--stp-color-sage)",
        }}
      />
    </div>
  );
}

function DefaultEmpty() {
  // Null-check copy. No introduction of the space, no path forward.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p
        style={{
          fontFamily: STP_FONT_SANS,
          fontSize: "var(--stp-text-sm)",
          color: "var(--stp-color-text-subtle)",
          margin: 0,
        }}
      >
        No items found
      </p>
    </div>
  );
}

function DefaultError() {
  // Failure announcement with no recovery affordance.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p
        style={{
          fontFamily: STP_FONT_SANS,
          fontSize: "var(--stp-text-sm)",
          color: "var(--stp-color-error)",
          margin: 0,
        }}
      >
        Something went wrong
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// /fortify-built state treatments — what /fortify produces when state
// coverage is treated as part of the component, not an afterthought.
// ---------------------------------------------------------------------------

function BuiltLoading() {
  // Skeleton bars matched to the list shape — three rows, each with a
  // title-width and meta-width segment. Tells the visitor what's arriving.
  return (
    <ul role="list" className="list-none space-y-3" style={{ marginTop: 4 }}>
      {[
        { title: "60%", meta: "20%" },
        { title: "75%", meta: "18%" },
        { title: "55%", meta: "22%" },
      ].map((row, i) => (
        <li key={i} className="space-y-1.5">
          <SkeletonBar width={row.title} prominent />
          <SkeletonBar width={row.meta} />
        </li>
      ))}
    </ul>
  );
}

function SkeletonBar({
  width,
  prominent = false,
}: {
  width: string;
  prominent?: boolean;
}) {
  return (
    <div
      style={{
        height: prominent ? 10 : 8,
        width,
        borderRadius: 2,
        background: prominent
          ? "var(--stp-color-border-strong)"
          : "var(--stp-color-border)",
        opacity: prominent ? 0.7 : 0.6,
      }}
    />
  );
}

function BuiltEmpty() {
  // Three-part introduction: what the space is, why it's empty now,
  // what to do about it. Editorial, calibrated to Stillpoint's
  // calm-supportive-friend voice.
  return (
    <div className="flex flex-col h-full">
      <p
        style={{
          fontFamily: STP_FONT_SERIF,
          fontSize: "var(--stp-text-base)",
          lineHeight: "var(--stp-leading-snug)",
          color: "var(--stp-color-text)",
          margin: "0 0 var(--stp-space-1) 0",
        }}
      >
        Practices land here once you schedule them.
      </p>
      <p
        style={{
          fontFamily: STP_FONT_SANS,
          fontSize: "var(--stp-text-xs)",
          lineHeight: "var(--stp-leading-relaxed)",
          color: "var(--stp-color-text-muted)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        Nothing scheduled for today.
      </p>
      <div style={{ marginTop: "auto" }}>
        <StillpointLink href="#">Browse the library →</StillpointLink>
      </div>
    </div>
  );
}

function BuiltError() {
  // What happened, what to do, retry affordance. Voice respects the
  // user — describes the fix, not the failure.
  return (
    <div className="flex flex-col h-full">
      <p
        style={{
          fontFamily: STP_FONT_SANS,
          fontSize: "var(--stp-text-sm)",
          lineHeight: "var(--stp-leading-snug)",
          color: "var(--stp-color-text)",
          margin: "0 0 var(--stp-space-1) 0",
          fontWeight: 500,
        }}
      >
        Couldn&rsquo;t load today&rsquo;s practices.
      </p>
      <p
        style={{
          fontFamily: STP_FONT_SANS,
          fontSize: "var(--stp-text-xs)",
          lineHeight: "var(--stp-leading-relaxed)",
          color: "var(--stp-color-text-muted)",
          margin: "0 0 var(--stp-space-3) 0",
        }}
      >
        Check your connection and try again.
      </p>
      <div style={{ marginTop: "auto" }}>
        <StillpointButton variant="secondary">Retry</StillpointButton>
      </div>
    </div>
  );
}
