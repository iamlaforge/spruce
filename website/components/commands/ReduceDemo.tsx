import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";

/**
 * /reduce before/after demonstration. The meditation app's practice library
 * header shown in two states: AI default with breadcrumb chain, emoji-
 * prefixed title, status badge, verbose subtitle, "updated N days ago"
 * tag, four utility filter buttons, gradient surface, soft shadow vs
 * after-/reduce with the title, a crisp metadata line, and a single quiet
 * filter action — sitting on the canvas with no chrome.
 *
 * Practice library header chosen because it accumulates the kinds of
 * decorative cruft AI tools tend to add to library/index pages (icons,
 * badges, breadcrumbs, action bars, gradients), making the reduction story
 * legible at a glance — and because it's a real surface in the meditation
 * app, threading the corrective demo with the rest of the catalog.
 *
 * Three markers, not four. /reduce demonstrates its own principle: don't
 * include what isn't doing work. Three honest annotations beat four where
 * the fourth was manufactured.
 *
 * The "after" state uses the meditation app's design system — Lora display
 * + Source Sans body, no surface chrome — so /reduce reads as Spruce
 * running on the same project /foundations and /design have established.
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Decoration stripped — moon emoji, status badge, breadcrumb chain, “updated 3 days ago” tag, gradient surface, and soft shadow are all gone. Each was performing work the title and content already did.",
  },
  {
    n: 2,
    text: "Copy tightened — the verbose subtitle (“Curated short meditations for winding down at the end of the day”) becomes a crisp metadata line. The original sentence repeated what the title already implied; the metadata is what wasn't yet on screen.",
  },
  {
    n: 3,
    text: "Actions consolidated — four utility buttons (Filter, Sort, View, Saved) become one quiet text action. Sort and view-toggle don't earn header space when there's a single sensible default; saved and filter live in the library's own controls, not at the top of every page.",
  },
];

const SYSTEM_FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

const TITLE = "Evening practices";

export function ReduceDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /reduce"
      annotations={ANNOTATIONS}
      before={<BeforeHeader />}
      after={<AfterHeader />}
    />
  );
}

// ---------------------------------------------------------------------------
// BeforeHeader — heavy chrome. Gradient surface, decorative emoji, status
// badge, breadcrumb, verbose subtitle, "updated" tag, and four utility
// buttons all crammed into the page header.
// ---------------------------------------------------------------------------

function BeforeHeader() {
  return (
    <div
      className="max-w-md bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 shadow-sm"
      style={{ fontFamily: SYSTEM_FONT_STACK }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
        <span>Library</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700">{TITLE}</span>
      </div>

      {/* Title row with emoji + status badge */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl leading-none" aria-hidden>
          🌙
        </span>
        <h2 className="text-xl font-bold text-gray-900">{TITLE}</h2>
        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
          <span aria-hidden className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          12 new
        </span>
      </div>

      {/* Verbose subtitle */}
      <p className="text-sm text-gray-600 mb-2">
        Curated short meditations for winding down at the end of the day
      </p>

      {/* Updated tag */}
      <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
        <span aria-hidden>⏱</span> Updated 3 days ago
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-1.5">
        <UtilityButton icon="▽" label="Filter" />
        <UtilityButton icon="↕" label="Sort" />
        <UtilityButton icon="▦" label="View" />
        <UtilityButton icon="♥" label="Saved" />
      </div>
    </div>
  );
}

function UtilityButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
    >
      <span aria-hidden>{icon}</span> {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// AfterHeader — title + metadata line + one quiet filter action. No
// surface, no border, no shadow, no decoration. The card stage's own
// surface is what the header sits on now. Lora display + Source Sans body
// match the meditation app's typography established by /foundations.
// ---------------------------------------------------------------------------

function AfterHeader() {
  return (
    <div
      className="max-w-md text-stone-900"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          className="text-xl tracking-tight leading-tight"
          style={{ fontFamily: LORA }}
        >
          {TITLE}
          <Marker n={1} />
        </h2>
        <button
          type="button"
          className="text-sm text-stone-700 hover:text-stone-900 underline-offset-4 hover:underline transition-colors"
        >
          Filter →
          <Marker n={3} />
        </button>
      </div>
      <p className="text-xs text-stone-500 mt-1">
        12 sessions · Updated weekly
        <Marker n={2} />
      </p>
    </div>
  );
}
