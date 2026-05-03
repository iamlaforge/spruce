import { BeforeAfterDemo, Marker, type Annotation } from "./BeforeAfterDemo";

/**
 * /voice before/after demonstration. A meditation-app error-state alert
 * shown in two states: AI-default voice ("Oops! Something went wrong" +
 * apologetic verbose body + generic "Try again" CTA) vs after-/voice
 * (specific failure name, direct opening, explicit reassurance about user
 * work, action label tied to the actual fix).
 *
 * Mid-session connection drop chosen because it's a real meditation-app
 * failure moment — audio guides need network, dropouts happen — and the
 * user-work reassurance lands viscerally (losing your meditation practice
 * mid-session is a more felt worry than losing a draft).
 *
 * Container styling is held identical between states (Source Sans body +
 * amber CTA — the meditation app's design system per /foundations) so the
 * only perceptible change is copy. /voice doesn't redesign the surface;
 * it rewrites the words.
 */

const ANNOTATIONS: Annotation[] = [
  {
    n: 1,
    text: "Title — names the actual failure. “Connection dropped” tells the user what happened; “Oops! Something went wrong” doesn't, and the apologetic emoji adds nothing.",
  },
  {
    n: 2,
    text: "Direct opening — body starts with what happened (“Your audio cut out”), not a softening apology. Users in a failed state want information first; warmth-padding delays it.",
  },
  {
    n: 3,
    text: "Reassurance about user work — explicitly notes the practice progress is saved. Users worry about losing their session; the copy answers that worry directly.",
  },
  {
    n: 4,
    text: "Specific action — the button label names the fix (“Reconnect”) instead of the generic “Try again.” The user knows what tapping does.",
  },
];

const SOURCE_SANS = "var(--font-source-sans), system-ui, sans-serif";

export function VoiceDemo() {
  return (
    <BeforeAfterDemo
      afterLabel="After /voice"
      annotations={ANNOTATIONS}
      before={<BeforeAlert />}
      after={<AfterAlert />}
    />
  );
}

// ---------------------------------------------------------------------------
// BeforeAlert — friendly-professional SaaS template copy on an otherwise
// disciplined surface. Apologetic emoji, "Oops!" opener, vague body that
// doesn't say what failed or what's safe, generic "Try again" CTA. The
// container itself uses the meditation app's design system; only the words
// betray the AI default.
// ---------------------------------------------------------------------------

function BeforeAlert() {
  return (
    <div
      className="max-w-md border border-stone-200 rounded-md bg-white p-5"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <h4 className="text-base font-semibold text-stone-900 mb-1.5 flex items-center gap-2">
        <span aria-hidden>⚠️</span>
        Oops! Something went wrong
      </h4>
      <p className="text-sm text-stone-600 mb-4 leading-relaxed">
        We&apos;re having trouble processing your request. Please try again
        or contact support if the problem persists.
      </p>
      <button
        type="button"
        className="bg-amber-700 text-white text-sm font-medium px-3 py-1.5 rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AfterAlert — same container, rewritten copy. Title names the failure.
// Body opens directly with the cause, then names the fix, then explicitly
// reassures about preserved practice progress. Action button names the
// specific fix.
// ---------------------------------------------------------------------------

function AfterAlert() {
  return (
    <div
      className="max-w-md border border-stone-200 rounded-md bg-white p-5"
      style={{ fontFamily: SOURCE_SANS }}
    >
      <h4 className="text-base font-semibold text-stone-900 mb-1.5">
        Connection dropped
        <Marker n={1} />
      </h4>
      <p className="text-sm text-stone-700 mb-4 leading-relaxed">
        Your audio cut out.
        <Marker n={2} /> Reconnect to keep going — your progress through the
        practice is saved.
        <Marker n={3} />
      </p>
      <button
        type="button"
        className="bg-amber-700 text-white text-sm font-medium px-3 py-1.5 rounded-md"
      >
        Reconnect
        <Marker n={4} />
      </button>
    </div>
  );
}
