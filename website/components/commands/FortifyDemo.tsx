"use client";

import { useState } from "react";

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
 * Continuing the meditation-app context from earlier demos. The surface
 * is a "Today's practices" list, the kind of list that needs all three
 * non-default states to feel complete.
 */

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

type StateKey = "loading" | "empty" | "error";

const STATE_TABS: Array<{ key: StateKey; label: string }> = [
  { key: "loading", label: "Loading" },
  { key: "empty", label: "Empty" },
  { key: "error", label: "Error" },
];

export function FortifyDemo() {
  const [state, setState] = useState<StateKey>("loading");

  return (
    <figure className="my-10 md:my-12">
      <header className="flex flex-wrap items-center justify-between gap-y-3 mb-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Interactive
        </p>
        <StateToggle current={state} onChange={setState} />
      </header>

      <div className="border border-rule-subtle bg-surface rounded-md px-5 py-7 md:px-7 md:py-9">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6">
          <Column label="AI default" sublabel="happy path only">
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
// /pace demo's columns: eyebrow + sublabel above the surface.
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
// ListShell — the surrounding "Today's practices" list card. Both columns
// share this shell so visitors read the demo as "same component, different
// state coverage" rather than "two different products."
// ---------------------------------------------------------------------------

function ListShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-[220px] md:h-[240px] border border-stone-200 rounded-md px-4 py-4 overflow-hidden"
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <p
        className="font-mono text-2xs uppercase tracking-widest text-stone-500 mb-3"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Today&rsquo;s practices
      </p>
      <div className="relative h-[calc(100%-32px)]">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AI-default state treatments — what tools like v0 / Cursor / Claude
// commonly produce when a state is technically handled but not designed.
// ---------------------------------------------------------------------------

function DefaultLoading() {
  // Centered spinner regardless of content shape — the most common AI
  // default, and the one /fortify most often replaces.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        aria-hidden
        className="size-5 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin"
      />
    </div>
  );
}

function DefaultEmpty() {
  // Null-check copy. No introduction of the space, no path forward.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p
        className="text-sm text-stone-400"
        style={{ fontFamily: SOURCE_SANS }}
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
        className="text-sm text-red-500"
        style={{ fontFamily: SOURCE_SANS }}
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
    <ul role="list" className="list-none space-y-3 mt-1">
      {[
        { title: "60%", meta: "20%" },
        { title: "75%", meta: "18%" },
        { title: "55%", meta: "22%" },
      ].map((row, i) => (
        <li key={i} className="space-y-1.5">
          <div
            className="h-2.5 bg-stone-200 rounded-sm"
            style={{ width: row.title }}
          />
          <div
            className="h-2 bg-stone-100 rounded-sm"
            style={{ width: row.meta }}
          />
        </li>
      ))}
    </ul>
  );
}

function BuiltEmpty() {
  // Three-part introduction: what the space is, why it's empty now,
  // what to do about it. Editorial, calibrated to the meditation-app
  // voice (warm, direct).
  return (
    <div className="flex flex-col h-full">
      <p
        className="text-base text-stone-900 leading-snug mb-1"
        style={{ fontFamily: LORA }}
      >
        Practices land here once you schedule them.
      </p>
      <p
        className="text-xs text-stone-600 leading-relaxed mb-3"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Nothing scheduled for today.
      </p>
      <p
        className="text-xs text-amber-700 font-medium mt-auto"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Browse the library →
      </p>
    </div>
  );
}

function BuiltError() {
  // What happened, what to do, retry affordance. Voice respects the
  // user — describes the fix, not the failure.
  return (
    <div className="flex flex-col h-full">
      <p
        className="text-sm text-stone-900 leading-snug mb-1"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Couldn&rsquo;t load today&rsquo;s practices.
      </p>
      <p
        className="text-xs text-stone-600 leading-relaxed mb-3"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Check your connection and try again.
      </p>
      <button
        type="button"
        className="self-start text-xs text-stone-900 border border-stone-300 rounded-sm px-2.5 py-1 mt-auto hover:bg-stone-100 transition-colors duration-fast ease-considered"
        style={{ fontFamily: SOURCE_SANS }}
      >
        Retry
      </button>
    </div>
  );
}
