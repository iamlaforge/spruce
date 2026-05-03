import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";

/**
 * /arrange before/after demonstration. The meditation app's settings page
 * shown in two states: AI default with cramped, uneven, and symmetric
 * spacing vs after-/arrange with scale-conformant rhythm, asymmetric
 * heading margins, capped helper-text measure, and clear section
 * breathing.
 *
 * Settings page chosen because spatial discipline shows most clearly in
 * stacked dense layouts where labels, inputs, helper text, and section
 * headings each have their own relationship to neighbors. Sections are
 * meditation-app-specific (Practice preferences + Reminders) so the demo
 * threads with the workflow narrative the rest of the catalog has been
 * building.
 *
 * Typography is held constant across both states (Source Sans throughout,
 * the meditation app's body face per /foundations) so the only perceptible
 * change is spacing — visitors attribute every difference to /arrange.
 */

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

const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

const HELPER_TEXT =
  "Pick the voice that feels most calming. You can change this any time, even mid-practice.";

export function ArrangeDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /arrange"
      annotations={ANNOTATIONS}
      before={<BeforeForm />}
      after={<AfterForm />}
    />
  );
}

// ---------------------------------------------------------------------------
// BeforeForm — cramped, uneven, symmetric. Inline styles deliberately use
// arbitrary px values to dramatize the lack of rhythm. Helper text runs
// edge-to-edge of the form column.
// ---------------------------------------------------------------------------

function BeforeForm() {
  return (
    <div
      className="max-w-md text-stone-900"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <h4
        className="text-sm font-semibold"
        style={{ marginTop: "6px", marginBottom: "6px" }}
      >
        Practice preferences
      </h4>
      <p
        className="text-xs text-stone-600"
        style={{ marginBottom: "3px" }}
      >
        Default session length
      </p>
      <input
        type="text"
        defaultValue="5 minutes"
        className="w-full text-sm border border-stone-300 rounded-sm px-2.5 py-1.5 bg-white"
        style={{ marginBottom: "11px" }}
      />
      <p
        className="text-xs text-stone-600"
        style={{ marginBottom: "8px" }}
      >
        Voice guide
      </p>
      <input
        type="text"
        defaultValue="Maya"
        className="w-full text-sm border border-stone-300 rounded-sm px-2.5 py-1.5 bg-white"
        style={{ marginBottom: "4px" }}
      />
      <p
        className="text-[11px] text-stone-500"
        style={{ marginBottom: "14px" }}
      >
        {HELPER_TEXT}
      </p>
      <h4
        className="text-sm font-semibold"
        style={{ marginTop: "6px", marginBottom: "8px" }}
      >
        Reminders
      </h4>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "5px" }}
      >
        <span className="text-sm text-stone-900">Daily reminder</span>
        <Toggle on />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-900">Weekly summary</span>
        <Toggle />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AfterForm — same content, scale-conformant rhythm. Asymmetric heading
// margins, consistent label-input pairs (mb-1.5 → input → next row at 16px),
// clear section break (mt-10), helper text capped at reading measure.
// ---------------------------------------------------------------------------

function AfterForm() {
  return (
    <div
      className="max-w-md text-stone-900"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <section>
        <h4 className="text-sm font-semibold mb-4">
          Practice preferences
          <Marker n={1} />
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-stone-600 mb-1.5">
              Default session length
              <Marker n={2} />
            </label>
            <input
              type="text"
              defaultValue="5 minutes"
              className="w-full text-sm border border-stone-300 rounded-sm px-2.5 py-1.5 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-600 mb-1.5">
              Voice guide
            </label>
            <p className="text-[11px] text-stone-500 mb-2 max-w-[20rem] leading-snug">
              {HELPER_TEXT}
              <Marker n={3} />
            </p>
            <input
              type="text"
              defaultValue="Maya"
              className="w-full text-sm border border-stone-300 rounded-sm px-2.5 py-1.5 bg-white"
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h4 className="text-sm font-semibold mb-4">
          Reminders
          <Marker n={4} />
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Daily reminder</span>
            <Toggle on />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Weekly summary</span>
            <Toggle />
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle — minimal visual pill. Not interactive; the demo is a still life.
// ---------------------------------------------------------------------------

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center w-9 h-5 rounded-full p-0.5 transition-colors ${
        on ? "bg-stone-700 justify-end" : "bg-stone-300 justify-start"
      }`}
    >
      <span className="block w-4 h-4 rounded-full bg-white" />
    </span>
  );
}
