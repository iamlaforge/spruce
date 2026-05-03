import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";

/**
 * /typeface before/after demonstration. A meditation-app reading-card
 * shown in two states: AI default (system-ui, straight quotes, double-
 * hyphens, default tracking, sentence-cased byline) vs after-/typeface
 * (Lora display + Source Sans body — the meditation app's pair per
 * /foundations — smart quotes, em dash, mono-caps metadata, tabular
 * figures). Numbered markers point at each change; legend below the card
 * decodes them.
 *
 * Reading-card chosen because the meditation app's daily readings are a
 * real surface where typography carries the editorial register —
 * published reflections from teachers and guides — and the surface has
 * the right structural opportunities for a typography demo (display
 * title, mono-caps metadata, body text with quotes and dashes).
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Display typeface — Lora serif, paired with Source Sans body. The AI default reaches for system-ui sans on both, treating display and body as the same register.",
  },
  {
    n: 2,
    text: "Byline — mono caps with letter-spacing, treated as editorial metadata rather than a sentence-cased label.",
  },
  {
    n: 3,
    text: "Date — tabular figures so the numerals align vertically when stacked. Compare “2024” and “5 min” digits side by side.",
  },
  {
    n: 4,
    text: "Body — smart quotes and a proper em dash, replacing the AI-default straight quotes and double-hyphen.",
  },
];

const SYSTEM_FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

const LORA = 'var(--font-lora), Georgia, "Times New Roman", serif';
const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

const TITLE = "On returning to the breath";
const AUTHOR = "Maya Okafor";
const DATE_BEFORE = "October 24, 2024 -- 5 min read";
const DATE_AFTER = "October 24, 2024 — 5 min read";
const BODY_BEFORE =
  'The practice isn\'t to stop thinking -- it\'s to notice when you\'ve drifted, and return. "Returning" is the practice.';
const BODY_AFTER =
  "The practice isn’t to stop thinking — it’s to notice when you’ve drifted, and return. “Returning” is the practice.";

export function TypographyDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /typeface"
      annotations={ANNOTATIONS}
      before={<BeforeCard />}
      after={<AfterCard />}
    />
  );
}

function BeforeCard() {
  return (
    <article
      className="max-w-md text-stone-900"
      style={{ fontFamily: SYSTEM_FONT_STACK }}
    >
      <h3 className="text-2xl font-bold leading-tight mb-3">{TITLE}</h3>
      <p className="text-sm text-stone-600 mb-1">By {AUTHOR}</p>
      <p className="text-sm text-stone-600 mb-5">{DATE_BEFORE}</p>
      <p className="text-base leading-normal">{BODY_BEFORE}</p>
    </article>
  );
}

function AfterCard() {
  return (
    <article
      className="max-w-md text-stone-900"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <h3
        className="text-3xl tracking-tight leading-[1.1] mb-3"
        style={{ fontFamily: LORA }}
      >
        {TITLE}
        <Marker n={1} />
      </h3>
      <p className="font-mono text-2xs uppercase tracking-widest text-stone-500 mb-1">
        {AUTHOR}
        <Marker n={2} />
      </p>
      <p
        className="font-mono text-2xs uppercase tracking-widest text-stone-500 mb-5"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {DATE_AFTER}
        <Marker n={3} />
      </p>
      <p className="text-base leading-relaxed text-pretty">
        {BODY_AFTER}
        <Marker n={4} />
      </p>
    </article>
  );
}
