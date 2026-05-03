import type { ReactNode } from "react";
import { SpecimenFrame } from "./DemoFrame";
import { ExpandablePanel } from "./ExpandablePanel";
import { stillpointPersonas } from "@/src/case-studies/stillpoint/content/personas";

/**
 * /personas demo. Renders the actual Stillpoint .personas.md content
 * as a proper persona canvas — header band (geometric avatar + name +
 * role + anchor quote), four-quadrant body (Context+Expertise / Jobs /
 * Motivations / Fears+Constraints), and a footer band naming how the
 * persona informs design. Two canvases stacked (Maya primary + Jordan
 * secondary), with a closing forward-implications panel.
 *
 * Avatar: geometric circular badge with the persona's initial. No
 * stock photos — Spruce explicitly calls demographic-driven personas
 * an anti-pattern. Primary uses filled accent treatment; secondary
 * uses outlined treatment so the relationship is visible at a glance.
 *
 * Visual register: SpecimenFrame + Spruce-system tokens (text-ink,
 * accent, font-display, font-mono). The canvas reads as a proper
 * design-research deliverable, not as a typeset document.
 */

const PRIMARY_QUOTE =
  "Wants the practice to be a small, reliable good choice in the day — not a project, not a transformation.";

const SECONDARY_QUOTE =
  "Wants to find out if the practice helps without committing to a daily habit upfront.";

export function PersonasDemo() {
  const { primary, secondary, forwardImplications } = stillpointPersonas;

  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/personas · Stillpoint"
      caption="/personas writes .personas.md — a primary + secondary user type calibrated to the product, with confidence labelled honestly so downstream commands can weight findings appropriately. Every Spruce command that should ground decisions in named users reads from this file."
    >
      <div className="space-y-6 md:space-y-8">
        <PersonaCanvas
          tier="Primary persona"
          name={primary.name}
          role={primary.role}
          confidence={primary.confidence}
          anchorQuote={PRIMARY_QUOTE}
          contextOfUse={primary.contextOfUse}
          expertiseLevel={primary.expertiseLevel}
          knowsComingIn={primary.knowsComingIn}
          primaryJobs={[...primary.primaryJobs]}
          motivations={primary.motivations}
          fears={primary.fears}
          constraints={primary.constraints}
          informsDesign={[...primary.informsDesign]}
          variant="primary"
        />

        <PersonaCanvas
          tier="Secondary persona"
          name={secondary.name}
          role={secondary.role}
          confidence={secondary.confidence}
          anchorQuote={SECONDARY_QUOTE}
          contextOfUse={secondary.contextOfUse}
          expertiseLevel={secondary.expertiseLevel}
          knowsComingIn={secondary.knowsComingIn}
          primaryJobs={[...secondary.primaryJobs]}
          motivations={secondary.motivations}
          fears={secondary.fears}
          constraints={secondary.constraints}
          relationshipToPrimary={secondary.relationshipToPrimary}
          tradeoffResolution={secondary.tradeoffResolution}
          informsDesign={[...secondary.informsDesign]}
          variant="secondary"
        />

        <ForwardImplications items={[...forwardImplications]} />
      </div>
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// PersonaCanvas — the canvas itself: header band, quadrant body, footer
// band. Reads as a recognized persona-canvas artifact.
// ---------------------------------------------------------------------------

type PersonaCanvasProps = {
  tier: string;
  name: string;
  role: string;
  confidence: string;
  anchorQuote: string;
  contextOfUse: string;
  expertiseLevel: string;
  knowsComingIn: string;
  primaryJobs: string[];
  motivations: string;
  fears: string;
  constraints: string;
  relationshipToPrimary?: string;
  tradeoffResolution?: string;
  informsDesign: string[];
  variant: "primary" | "secondary";
};

function PersonaCanvas({
  tier,
  name,
  role,
  confidence,
  anchorQuote,
  contextOfUse,
  expertiseLevel,
  knowsComingIn,
  primaryJobs,
  motivations,
  fears,
  constraints,
  relationshipToPrimary,
  tradeoffResolution,
  informsDesign,
  variant,
}: PersonaCanvasProps) {
  const signature = (
    <header className="bg-surface-elevated px-6 py-6 md:px-8 md:py-7 pr-14 md:pr-16">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-6 gap-y-4 md:gap-x-8 items-center">
        <PersonaAvatar name={name} variant={variant} />

        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
            {tier}
          </p>
          <h3 className="font-display font-normal text-2xl md:text-3xl tracking-tight text-ink leading-tight">
            {name}
          </h3>
          <p className="font-display italic font-normal text-base md:text-lg text-ink-muted leading-snug mt-1">
            {role}
          </p>
        </div>

        <div className="md:max-w-xs md:text-right md:border-l md:border-rule-subtle md:pl-6">
          <p className="font-display italic font-normal text-sm md:text-base text-ink leading-snug text-pretty">
            &ldquo;{anchorQuote}&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-rule-subtle">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          Confidence ·{" "}
          <span className="text-ink-muted normal-case">{confidence}</span>
        </p>
      </div>
    </header>
  );

  return (
    <ExpandablePanel
      ariaLabel={`${name}'s persona canvas`}
      signature={signature}
    >
      {/* Quadrant body — 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Quadrant label="Context + expertise" position="top-left">
          <Field label="Context of use" body={contextOfUse} />
          <Field label="Expertise level" body={expertiseLevel} />
          <Field label="Knows coming in" body={knowsComingIn} />
        </Quadrant>

        <Quadrant label="Primary jobs" position="top-right">
          <ul role="list" className="list-none space-y-2.5">
            {primaryJobs.map((job, i) => (
              <li
                key={i}
                className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
              >
                <span aria-hidden className="absolute left-0 top-0 text-accent">
                  &mdash;
                </span>
                {job}
              </li>
            ))}
          </ul>
        </Quadrant>

        <Quadrant label="Motivations" position="bottom-left" tone="positive">
          <p className="text-sm md:text-base text-ink leading-snug text-pretty">
            {motivations}
          </p>
        </Quadrant>

        <Quadrant label="Fears + constraints" position="bottom-right" tone="negative">
          <Field label="Fears" body={fears} />
          <Field label="Constraints" body={constraints} />
          {relationshipToPrimary ? (
            <Field
              label="Relationship to primary"
              body={relationshipToPrimary}
            />
          ) : null}
          {tradeoffResolution ? (
            <Field label="When tradeoffs surface" body={tradeoffResolution} />
          ) : null}
        </Quadrant>
      </div>

      {/* Footer band — informs design strip */}
      <footer className="border-t border-rule bg-surface-elevated px-6 py-6 md:px-8 md:py-7">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
          Informs design
        </p>
        <ul role="list" className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {informsDesign.map((item, i) => (
            <li
              key={i}
              className="text-sm text-ink-muted leading-snug pl-4 relative text-pretty"
            >
              <span aria-hidden className="absolute left-0 top-0 text-accent">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </footer>
    </ExpandablePanel>
  );
}

// ---------------------------------------------------------------------------
// PersonaAvatar — geometric circular badge with the persona's initial.
// Primary: filled accent. Secondary: outlined. Restrained, unmistakably
// "an avatar" without the stock-photo anti-pattern.
// ---------------------------------------------------------------------------

function PersonaAvatar({
  name,
  variant,
}: {
  name: string;
  variant: "primary" | "secondary";
}) {
  const initial = name.charAt(0);
  const isPrimary = variant === "primary";

  return (
    <div
      className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
        isPrimary
          ? "bg-accent text-white"
          : "border-2 border-ink text-ink bg-surface"
      }`}
      aria-hidden
    >
      <span className="font-display font-normal text-2xl md:text-3xl">
        {initial}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quadrant — one cell of the canvas body. Border treatment depends on
// position (interior borders only) so the canvas reads as a real grid.
// ---------------------------------------------------------------------------

function Quadrant({
  label,
  position,
  tone,
  children,
}: {
  label: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  tone?: "positive" | "negative";
  children: ReactNode;
}) {
  // Interior borders: top row has bottom border on mobile + right border on md.
  // Left column has right border on md.
  const borderClass =
    {
      "top-left": "md:border-r md:border-b border-b border-rule-subtle",
      "top-right": "md:border-b border-b border-rule-subtle",
      "bottom-left": "md:border-r border-b md:border-b-0 border-rule-subtle",
      "bottom-right": "",
    }[position];

  const labelTone =
    tone === "positive"
      ? "text-accent"
      : tone === "negative"
        ? "text-ink"
        : "text-ink-subtle";

  return (
    <div className={`px-6 py-6 md:px-8 md:py-7 ${borderClass}`}>
      <p
        className={`font-mono text-2xs uppercase tracking-widest mb-4 ${labelTone}`}
      >
        {label}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Field — labelled paragraph for inside a quadrant. Smaller eyebrow than
// the quadrant label so the hierarchy stays intact.
// ---------------------------------------------------------------------------

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-2xs uppercase tracking-wider text-ink-subtle mb-1">
        {label}
      </p>
      <p className="text-sm md:text-base text-ink leading-snug text-pretty">
        {body}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ForwardImplications — closing panel naming what the personas mean for
// design work going forward. The "so what" of the artifact.
// ---------------------------------------------------------------------------

function ForwardImplications({ items }: { items: string[] }) {
  return (
    <article className="border border-rule-subtle bg-surface rounded-md px-6 py-7 md:px-8 md:py-9">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
        Forward implications
      </p>
      <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-5">
        What these personas mean for design work going forward
      </h3>
      <ul role="list" className="list-none space-y-4 max-w-prose">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm md:text-base text-ink leading-snug pl-5 relative text-pretty"
          >
            <span aria-hidden className="absolute left-0 top-0 text-accent">
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
