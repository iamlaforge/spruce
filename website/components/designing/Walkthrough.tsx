import type { ReactNode } from "react";

/**
 * Shared walkthrough components for the /designing pages — used by the
 * workflow page's phase artifacts and by the tutorial detail pages'
 * beat-by-beat content. Extracted so the same vocabulary renders the
 * same way across surfaces.
 *
 * Components:
 *   - Beat: italic Fraunces sub-heading + narrative + artifact + cross-ref
 *   - CommandList: em-dash bulleted list of commands with descriptions
 *   - DecisionCallout: editorial aside marking branch points / recommendations
 *   - TerminalArtifact: dark-surface terminal-style conversation excerpt
 *   - PullQuoteArtifact: left-rail-bordered editorial extract
 */

// ---------------------------------------------------------------------------
// Beat — one beat in a walkthrough. Italic Fraunces sub-heading at
// text-xl/2xl (one step below scenario titles, two below page section
// titles). Narrative paragraphs in body register, optional artifact
// children, optional cross-reference at the foot.
// ---------------------------------------------------------------------------

export function Beat({
  heading,
  narrative,
  crossRef,
  children,
}: {
  heading: string;
  narrative: ReactNode;
  crossRef?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section>
      <h4 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
        {heading}
      </h4>
      <div className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose space-y-4 mb-6">
        {narrative}
      </div>
      {children ? <div className="space-y-5 mb-4">{children}</div> : null}
      {crossRef ? (
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {crossRef}
        </p>
      ) : null}
    </section>
  );
}

// ---------------------------------------------------------------------------
// CommandList — em-dash bulleted list. Used when a beat lists multiple
// commands the visitor could run. Mono accent for the command itself,
// ink-muted for the description, em-dash separator.
// ---------------------------------------------------------------------------

export function CommandList({
  items,
}: {
  items: Array<{ command: string; text: string }>;
}) {
  return (
    <ul role="list" className="list-none space-y-3 max-w-prose">
      {items.map((item) => (
        <li
          key={item.command}
          className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
        >
          <span
            aria-hidden
            className="absolute left-0 top-[0.55em] font-mono text-sm leading-none text-ink-muted"
          >
            —
          </span>
          <code className="font-mono text-sm md:text-base text-accent">
            {item.command}
          </code>
          <span className="text-ink-subtle"> — </span>
          <span className="text-ink-muted">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// DecisionCallout — small editorial aside marking branch points or
// recommendations. Italic Fraunces in ink-muted with a hairline left
// rule. Reads as editorial sidebar rather than as instructional callout.
// ---------------------------------------------------------------------------

export function DecisionCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="border-l border-rule pl-5 md:pl-6 py-1 max-w-prose">
      <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug text-pretty">
        {children}
      </p>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// TerminalArtifact — dark-surface terminal-style block. User turns get
// an accent-colored ‹ prefix and full-bright cream text; Spruce turns
// have no prefix and slightly muted text.
// ---------------------------------------------------------------------------

type Turn = { role: "user" | "spruce"; content: string };

export function TerminalArtifact({ turns }: { turns: Turn[] }) {
  return (
    <div className="bg-ink text-ink-inverse rounded-md px-5 py-5 md:px-6 md:py-6 font-mono text-xs md:text-sm leading-relaxed">
      {turns.map((turn, i) => (
        <div key={i} className={i === turns.length - 1 ? "" : "mb-4"}>
          {turn.role === "user" ? (
            <p>
              <span className="text-accent select-none">&rsaquo; </span>
              <span className="whitespace-pre-wrap">{turn.content}</span>
            </p>
          ) : (
            <p className="text-ink-inverse/80 whitespace-pre-wrap">
              {turn.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PullQuoteArtifact — left-rail-bordered editorial extract. Used for
// pulling out a real /critique paragraph, /finish verdict, or similar
// editorial moment.
// ---------------------------------------------------------------------------

export function PullQuoteArtifact({
  eyebrow,
  children,
  attribution,
}: {
  eyebrow?: string;
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="border-l-2 border-accent pl-5 md:pl-6 py-2">
      {eyebrow ? (
        <figcaption className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
          {eyebrow}
        </figcaption>
      ) : null}
      <div className="text-base md:text-lg text-ink leading-relaxed text-pretty space-y-3">
        {children}
      </div>
      {attribution ? (
        <p className="mt-5 text-sm text-ink-subtle leading-relaxed text-pretty">
          {attribution}
        </p>
      ) : null}
    </figure>
  );
}
