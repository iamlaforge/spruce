import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";

/**
 * /colorgrade before/after demonstration. A single featured-practice card
 * from the meditation app shown in two states: AI default (cool-blue ring,
 * blue badge, blue checkmarks, blue/purple gradient CTA, pure-black text on
 * cool surface) vs after-/colorgrade (warm Canvas neutrals + a single
 * committed amber accent on the CTA only).
 *
 * Featured-practice card chosen because color discipline shows most clearly
 * on a surface with multiple potential accent locations — CTA, badge, list
 * markers, ring — letting the demo argue accent scarcity by collapsing
 * five colored elements down to one.
 *
 * The "after" state uses the meditation app's actual design system —
 * Canvas #FAFAF9, amber-700 accent, Lora display + Source Sans body —
 * established by /foundations. This threads the corrective demo with the
 * surfaces shown in /design, /decide, /remix, /pace, /fortify so visitors
 * see /colorgrade running on the same project the catalog has been
 * building.
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Accent palette — a single committed amber, instead of the statistical AI-default blue (or purple-blue gradient).",
  },
  {
    n: 2,
    text: "Background and surface temperature — warm Canvas neutrals replace the cool gray-blue surface. Even the off-whites take a side.",
  },
  {
    n: 3,
    text: "Text color — tinted stone-900 instead of pure #000 on the title and body. Pure black reads as untreated; tinted near-black sits in the palette.",
  },
  {
    n: 4,
    text: "Accent scarcity — the amber lives only on the CTA. The AI default spreads color across the badge, the ring, three list markers, and the CTA gradient — a heatmap of attention with no single resolution.",
  },
];

const FEATURES = [
  "Five rounds of guided breath",
  "Soft ambient background",
  "For end-of-day recovery",
];

const SYSTEM_FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

export function ColorgradeDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /colorgrade"
      annotations={ANNOTATIONS}
      before={<BeforeCard />}
      after={<AfterCard />}
    />
  );
}

// ---------------------------------------------------------------------------
// BeforeCard — AI-default featured-practice card. Cool gray-blue surface,
// blue ring as "popular" indicator, blue badge, blue checkmarks on every
// list item, blue/purple gradient CTA. Color is everywhere; nothing carries
// it.
// ---------------------------------------------------------------------------

function BeforeCard() {
  return (
    <div
      className="relative max-w-xs ring-2 ring-blue-500 rounded-xl bg-white p-5 shadow-md"
      style={{ fontFamily: SYSTEM_FONT_STACK }}
    >
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
        ★ Most loved
      </span>
      <h3 className="text-lg font-bold text-gray-900 mb-1">Evening practice</h3>
      <p className="text-xs text-gray-500 mb-4">5 min · Beginner</p>
      <ul className="space-y-1.5 mb-5">
        {FEATURES.map((f) => (
          <li
            key={f}
            className="text-xs text-gray-700 flex items-start gap-1.5"
          >
            <span className="text-blue-500 font-bold leading-none mt-0.5">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold py-2 rounded-lg"
      >
        Begin
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AfterCard — same content, disciplined color, in the meditation app's
// established palette. Warm Canvas, tinted stone text, single committed
// amber accent on the CTA only. The "Most loved" treatment moves from a
// colored badge to a quiet eyebrow; list markers shift from blue
// checkmarks to neutral em-dashes.
// ---------------------------------------------------------------------------

function AfterCard() {
  return (
    <div
      className="relative max-w-xs border border-stone-200 rounded-md p-5"
      style={{ backgroundColor: "#FAFAF9", fontFamily: SOURCE_SANS }}
    >
      <p className="font-mono text-2xs uppercase tracking-widest text-stone-500 mb-3">
        Most loved
        <Marker n={4} />
      </p>
      <h3
        className="text-lg text-stone-900 mb-1 tracking-tight leading-tight"
        style={{ fontFamily: LORA }}
      >
        Evening practice
        <Marker n={3} />
      </h3>
      <p className="text-xs text-stone-500 mb-4">5 min · Beginner</p>
      <ul className="space-y-1.5 mb-5">
        {FEATURES.map((f, i) => (
          <li
            key={f}
            className="text-xs text-stone-700 flex items-start gap-2 leading-snug"
          >
            <span aria-hidden className="text-stone-400 leading-none mt-0.5">
              —
            </span>
            {f}
            {i === 0 ? <Marker n={2} /> : null}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="block w-full bg-amber-700 text-white text-sm font-medium py-2 rounded-md hover:bg-amber-800 transition-colors"
      >
        Begin
        <Marker n={1} />
      </button>
    </div>
  );
}
