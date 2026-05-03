import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { LoopVisualization } from "@/components/designing/LoopVisualization";
import {
  PullQuoteArtifact,
  TerminalArtifact,
} from "@/components/designing/Walkthrough";

/**
 * /designing — the workflow page (Workflow tab). Presents Spruce as an
 * iteration loop sitting on a foundation: Set up establishes character,
 * Discover grounds the work in named users + jobs, the loop (decide,
 * review, refine) reasons from that foundation, and Ship closes.
 *
 * Structure:
 *   1. Hero — frame the workflow, point at the catalog for depth
 *   2. Set up phase — "First" indicator, full content
 *   3. Discover phase — "Foundation" indicator, full content (HCD tier)
 *   4. Iteration loop — section header + LoopVisualization (animates on scroll)
 *      then the three middle phases (Decide / Review / Refine), each
 *      marked "Loop" rather than numbered, since they intermingle in any
 *      order
 *   5. Ship phase — "Last" indicator, full content
 *   6. Closing — gentle indication that the loop continues
 *
 * Header, footer, and the Workflow / Tutorials tab bar live in the
 * /designing layout — this page just renders the workflow content. The
 * applied scenarios that previously lived here moved to /designing/tutorials.
 *
 * The page is "adjacent" to the catalog rather than duplicative: each
 * phase's artifact is a synthesized excerpt; visitors who want the full
 * demo follow the cross-reference to /commands.
 */

export const metadata: Metadata = {
  title: "Workflow — Spruce",
  description:
    "The Spruce workflow: set the project context, ground the work in named users + jobs, then run the iteration loop on top of that foundation. Ship last.",
};

export default function DesigningPage() {
  return (
    <>
      <PageHero />
      <SetUpPhase />
      <DiscoverPhase />
      <LoopIntro />
      <DecidePhase />
      <ReviewPhase />
      <RefinePhase />
      <ShipPhase />
      <ClosingNote />
    </>
  );
}

// ---------------------------------------------------------------------------
// PageHero — page opener. The intro paragraph names the loop's structure
// explicitly (first, middle, last) so visitors enter the page with the
// right mental model before encountering the phases. The colophon strip
// that used to sit at the top of this hero now lives in the
// DesigningTabBar, so the hero begins with the title.
// ---------------------------------------------------------------------------

function PageHero() {
  return (
    <section className="pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <h1 className="font-display font-normal text-5xl md:text-7xl leading-[0.95] tracking-tightest text-ink">
              Designing.
            </h1>
            <p className="mt-6 md:mt-8 font-display italic font-normal text-2xl md:text-3xl leading-snug tracking-tight text-ink-muted text-balance max-w-prose">
              The loop, on a foundation.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-base md:text-lg text-ink leading-relaxed text-pretty">
              Spruce isn&rsquo;t a single command — it&rsquo;s a loop on a
              foundation. First you set the project&rsquo;s character. Then
              you ground the work in named users and the jobs they&rsquo;re
              hiring the product to do. The iteration loop — decide, review,
              refine — sits on top of that grounding and intermingles in any
              order until you ship.
            </p>
            <p className="mt-5 text-sm text-ink-muted leading-relaxed text-pretty">
              This page walks through the loop with artifacts from the
              meditation-app project that threads through the catalog. For
              applied walkthroughs in specific situations, see{" "}
              <Link
                href="/designing/tutorials"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                Tutorials
              </Link>
              . For the full demo of any command,{" "}
              <Link
                href="/commands"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                /commands
              </Link>
              . For the cumulative live result of running through the loop,
              see the{" "}
              <Link
                href="/case-study"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                Stillpoint case study
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Phase — shared shell for the five workflow phases. Marker (e.g., "First",
// "Loop", "Last") sits in the left gutter above an italic Fraunces phase
// name; frame paragraph + artifact + cross-reference fill the right column.
// Hairline rule above (except first) marks transitions between phases.
// ---------------------------------------------------------------------------

function Phase({
  marker,
  name,
  frame,
  catalogPath,
  catalogText,
  isFirst = false,
  children,
}: {
  /** The category indicator (First / Loop / Last). Mono caps in accent. */
  marker: string;
  name: string;
  frame: React.ReactNode;
  catalogPath: string;
  catalogText: React.ReactNode;
  isFirst?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`py-16 md:py-20 ${
        isFirst ? "" : "border-t border-rule-subtle"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
          <div className="col-span-12 lg:col-span-3 mb-8 lg:mb-0">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
              {marker}
            </p>
            <h2 className="font-display italic font-normal text-3xl md:text-4xl tracking-tight text-ink leading-[1.05]">
              {name}
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5 space-y-8 md:space-y-10">
            <div className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose space-y-4">
              {typeof frame === "string" ? <p>{frame}</p> : frame}
            </div>

            {children}

            <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle pt-4 border-t border-rule-subtle">
              <Link
                href={catalogPath}
                className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
              >
                {catalogText} &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// SetUpPhase — the only phase that's genuinely first. Marked "First" rather
// than "01" so the indicator names the structural role rather than the
// sequence position.
// ---------------------------------------------------------------------------

function SetUpPhase() {
  return (
    <Phase
      marker="First"
      name="Set up"
      isFirst
      frame={
        <>
          <p>
            Before any design happens, Spruce needs to know what the product
            is. <code className="font-mono text-base text-accent">/spruce-up</code>{" "}
            runs a brief interview that captures the product&rsquo;s
            character — audience, voice, density, what it should and
            shouldn&rsquo;t feel like — into a{" "}
            <code className="font-mono text-base text-accent">.spruce.md</code>{" "}
            file every subsequent command reads.
          </p>
          <p>
            Five minutes of conversation; one persistent context. Without it,
            generative work has nothing to calibrate against.
          </p>
        </>
      }
      catalogPath="/commands/spruce-up"
      catalogText="See /spruce-up for the full interview"
    >
      <TerminalArtifact
        turns={[
          { role: "user", content: "/spruce-up" },
          {
            role: "spruce",
            content:
              "What does this product do, and what’s the core experience you want users to have?",
          },
          {
            role: "user",
            content:
              "A short-session meditation app for parents — five-minute practices designed to fit into the gaps of a busy day. The core experience is recovery, not transformation.",
          },
          {
            role: "spruce",
            content: "Got it. Next: who uses it? What do you know about them?",
          },
        ]}
      />
    </Phase>
  );
}

// ---------------------------------------------------------------------------
// DiscoverPhase — the Foundation phase. Optional but the iteration loop
// reasons better when the HCD artifacts exist. Marked "Foundation" rather
// than numbered or "Loop" because it's the substrate the loop reads from,
// not a step in the iteration itself.
// ---------------------------------------------------------------------------

function DiscoverPhase() {
  return (
    <Phase
      marker="Foundation"
      name="Discover"
      frame={
        <>
          <p>
            Optional, but the loop reads better when it&rsquo;s in place. The
            Discovery tier produces the HCD artifacts — personas, jobs,
            journeys, scenarios — that downstream commands ground decisions
            in.{" "}
            <code className="font-mono text-base text-accent">/personas</code>{" "}
            writes{" "}
            <code className="font-mono text-base text-accent">.personas.md</code>;{" "}
            <code className="font-mono text-base text-accent">/jtbd</code>{" "}
            writes{" "}
            <code className="font-mono text-base text-accent">.jtbd.md</code>;{" "}
            <code className="font-mono text-base text-accent">/journey</code>{" "}
            and{" "}
            <code className="font-mono text-base text-accent">/scenarios</code>{" "}
            write theirs.{" "}
            <code className="font-mono text-base text-accent">/audit</code>{" "}
            evaluates against all of them.
          </p>
          <p>
            Each command runs in three modes — draft from context when no
            research exists, structure user-supplied research when it does, or
            pressure-test a finished artifact for assumptions. Context-derived
            artifacts get labelled honestly, so the loop knows what to weight.
          </p>
          <p>
            Without Discovery, the loop reasons from{" "}
            <code className="font-mono text-base text-accent">.spruce.md</code>{" "}
            character alone. With Discovery, every decision can be tied to a
            named user doing a named thing.
          </p>
        </>
      }
      catalogPath="/commands/personas"
      catalogText="See /personas, /jtbd, /journey, /scenarios, /audit"
    >
      <DiscoveryArtifact />
    </Phase>
  );
}

// ---------------------------------------------------------------------------
// LoopIntro — the section break that introduces the iteration loop. Pairs
// an editorial frame (the loop's structure named explicitly) with the
// LoopVisualization (animated triangle showing Decide / Review / Refine
// connecting in any order). The visualization is small and restrained;
// its job is to communicate the loop's nature, not to dominate.
// ---------------------------------------------------------------------------

function LoopIntro() {
  return (
    <section className="py-16 md:py-20 border-t border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
          <div className="col-span-12 lg:col-span-3 mb-6 lg:mb-0">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
              The loop
            </p>
            <h2 className="font-display italic font-normal text-3xl md:text-4xl tracking-tight text-ink leading-[1.05]">
              Iterate.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <p className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose">
              The iteration loop sits on the foundation. Decide, review,
              refine — three moments that intermingle. You critique what you
              just decided, refine based on the critique, decide more after
              refining, critique again. Any order, any number of times.
            </p>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed text-pretty max-w-prose">
              Each is a different kind of conversation with Spruce; the loop
              is what happens when you string them together. Every command in
              the loop reads from{" "}
              <code className="font-mono text-sm text-accent">.spruce.md</code>{" "}
              and the Discovery artifacts when they exist — so decisions stay
              grounded in the product&rsquo;s character and the people it
              serves.
            </p>
          </div>
        </div>

        {/* Loop visualization — animated triangle of Decide / Review /
            Refine connected by curved hairlines. Sits in a centered column
            so it doesn't dominate the page. */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
            <LoopVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// DecidePhase, ReviewPhase, RefinePhase — the three iteration loop phases.
// Each is marked "Loop" (not numbered) since they intermingle in any
// order. Phase content depth is preserved — visitors who want each phase
// in detail can scroll through; the loop visualization above introduced
// the relationship.
// ---------------------------------------------------------------------------

function DecidePhase() {
  return (
    <Phase
      marker="Loop"
      name="Decide"
      frame={
        <>
          <p>
            Generative work in Spruce isn&rsquo;t one-shot.{" "}
            <code className="font-mono text-base text-accent">/decide</code>{" "}
            walks you through the significant calls before generating;{" "}
            <code className="font-mono text-base text-accent">/design</code>{" "}
            ships a confident first pass with notes on the decisions it made;{" "}
            <code className="font-mono text-base text-accent">/remix</code>{" "}
            produces three distinct directions for the same brief; and{" "}
            <code className="font-mono text-base text-accent">/foundations</code>{" "}
            establishes the tokens and primitives every other command
            composes within.
          </p>
          <p>
            You direct the work; Spruce executes the reasoning.
          </p>
        </>
      }
      catalogPath="/commands/decide"
      catalogText="See /decide, /design, /remix, /foundations"
    >
      <PullQuoteArtifact
        eyebrow="A decision from /decide — reflection screen"
        attribution="The Hybrid choice shaped the reflection screen visitors see in /design's Tonight home + /decide's reflection screen demos."
      >
        <p>
          <span className="font-display italic text-ink">Decision 1:</span>{" "}
          How should the user enter their reflection?
        </p>
        <p className="text-ink-subtle">
          Open canvas — write whatever comes up.
          <br />
          Prompts — one or two questions to respond to.
          <br />
          <span className="text-accent">
            — Hybrid — a prompt above an open canvas; the prompt is optional.
          </span>
          <br />
          Decide for me.
        </p>
      </PullQuoteArtifact>
    </Phase>
  );
}

function ReviewPhase() {
  return (
    <Phase
      marker="Loop"
      name="Review"
      frame={
        <>
          <p>
            Once something exists, you review it. Spruce offers four lenses,
            each with a different depth and a different question.{" "}
            <code className="font-mono text-base text-accent">/detect</code>{" "}
            for fast anti-pattern scans;{" "}
            <code className="font-mono text-base text-accent">/survey</code>{" "}
            for comprehensive findings with severity tiers;{" "}
            <code className="font-mono text-base text-accent">/uxreview</code>{" "}
            for the UX substrate;{" "}
            <code className="font-mono text-base text-accent">/critique</code>{" "}
            for design-director feedback at the level of feel.
          </p>
          <p>
            <code className="font-mono text-base text-accent">/explain</code>{" "}
            sits alongside as a fifth — not for finding problems, but for
            walking through the reasoning behind a recent design.
          </p>
        </>
      }
      catalogPath="/commands/critique"
      catalogText="See /survey, /uxreview, /critique, /detect, /explain"
    >
      <CritiqueArtifact />
    </Phase>
  );
}

function RefinePhase() {
  return (
    <Phase
      marker="Loop"
      name="Refine"
      frame={
        <>
          <p>
            Reviews surface what to address; the corrective tier addresses
            each layer.{" "}
            <code className="font-mono text-base text-accent">/typeface</code>,{" "}
            <code className="font-mono text-base text-accent">/colorgrade</code>,{" "}
            <code className="font-mono text-base text-accent">/arrange</code>,{" "}
            <code className="font-mono text-base text-accent">/refine</code>,{" "}
            <code className="font-mono text-base text-accent">/pace</code>,{" "}
            <code className="font-mono text-base text-accent">/voice</code>,{" "}
            <code className="font-mono text-base text-accent">/reduce</code>,{" "}
            <code className="font-mono text-base text-accent">/fortify</code>{" "}
            — each operates on a single design dimension.
          </p>
          <p>
            Run them based on what review surfaced; each command applies the
            discipline of its reference file. The corrective tier is where
            specific decisions get made about what changes — and what stays.
          </p>
        </>
      }
      catalogPath="/commands"
      catalogText="See the corrective tier"
    >
      <DeltaArtifact />
    </Phase>
  );
}

// ---------------------------------------------------------------------------
// ShipPhase — the only phase that's genuinely last. Marked "Last" to name
// the structural role.
// ---------------------------------------------------------------------------

function ShipPhase() {
  return (
    <Phase
      marker="Last"
      name="Ship"
      frame={
        <>
          <p>
            <code className="font-mono text-base text-accent">/finish</code>{" "}
            is the last conversation before deploy. By the time it runs, the
            heavy work has been done; what remains is a final tightening —
            straight quotes to smart quotes, balance on headlines, focus-ring
            offsets — and an honest verdict on ship-readiness.
          </p>
          <p>
            The verdict is the differentiator. Other commands produce work;{" "}
            <code className="font-mono text-base text-accent">/finish</code>{" "}
            produces a call.
          </p>
        </>
      }
      catalogPath="/commands/finish"
      catalogText="See /finish"
    >
      <VerdictArtifact />
    </Phase>
  );
}

// ---------------------------------------------------------------------------
// ClosingNote — gentle indication that the loop continues. The italic
// Fraunces line lands as the philosophical close: the loop never ends, it
// just begins again at /spruce-up. The navigational pointer to Tutorials
// already lives in the page hero and the layout's tab bar — keeping it
// out of this closing lets the moment stay a single beat.
// ---------------------------------------------------------------------------

function ClosingNote() {
  return (
    <Section tone="default">
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 border-t border-rule pt-12 md:pt-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <p className="font-display italic font-normal text-2xl md:text-3xl leading-snug tracking-tight text-ink-muted text-balance">
            Each new feature, each next iteration, starts again at{" "}
            <Link
              href="/commands/spruce-up"
              className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
            >
              /spruce-up
            </Link>
            .
          </p>
          <p className="mt-5 text-sm text-ink-subtle leading-relaxed max-w-prose mx-auto">
            The context evolves as the product does. Every command reads the
            latest version.
          </p>
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Phase-specific artifact components. Each renders a synthesized excerpt
// from the meditation-app project's catalog demos — kept inline because
// they're tied to the phases on this page rather than reused elsewhere.
// When the dedicated case study lands (per ROADMAP.md), these excerpts
// get replaced with real shipped output rather than stubbed copy.
// ---------------------------------------------------------------------------

function DiscoveryArtifact() {
  return (
    <figure className="border border-rule-subtle bg-surface rounded-md overflow-hidden">
      {/* Persona tile excerpt — Maya, the meditation app's primary persona */}
      <div className="px-5 py-5 md:px-6 md:py-6 bg-surface-elevated border-b border-rule-subtle">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-5 items-center">
          <div
            aria-hidden
            className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent text-white flex items-center justify-center font-display font-normal text-xl md:text-2xl"
          >
            M
          </div>
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
              Primary persona · from .personas.md
            </p>
            <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight">
              Maya
              <span className="text-ink-muted">— Daily Practitioner</span>
            </h3>
          </div>
        </div>
        <p className="mt-4 pt-3 border-t border-rule-subtle font-display italic font-normal text-sm md:text-base text-ink leading-snug text-pretty">
          &ldquo;Wants the practice to be a small, reliable good choice in the
          day — not a project, not a transformation.&rdquo;
        </p>
      </div>

      {/* Footer strip — the rest of the foundation, named */}
      <div className="px-5 py-4 md:px-6 md:py-5 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          + .jtbd.md{" "}
          <span className="text-ink-muted normal-case">— six jobs across three layers</span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          + .journeys.md{" "}
          <span className="text-ink-muted normal-case">— current-state and future-state mapped</span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          + .scenarios.md{" "}
          <span className="text-ink-muted normal-case">— concrete moments, persona by persona</span>
        </p>
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          + /audit{" "}
          <span className="text-ink-muted normal-case">— findings tied to named users + jobs</span>
        </p>
      </div>
    </figure>
  );
}

function CritiqueArtifact() {
  return (
    <figure className="border-l-2 border-accent pl-5 md:pl-6 py-2">
      <figcaption className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        From /critique on the meditation app
      </figcaption>
      <p className="font-display italic font-normal text-base md:text-lg text-ink-muted leading-snug mb-4">
        The overall take.
      </p>
      <p className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose">
        The meditation app is in strong directional shape. The character —
        warm, unhurried, calm without being precious — comes through in the
        typography and palette established by{" "}
        <code className="font-mono text-base text-accent">/foundations</code>{" "}
        and threads through every surface the corrective tier has touched.
        The work isn&rsquo;t hedging on its character. The remaining
        concerns are flow and state coverage rather than direction.
      </p>
    </figure>
  );
}

function DeltaArtifact() {
  return (
    <div className="border-y border-rule-subtle py-6 md:py-8">
      <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-5">
        From /colorgrade on the featured-practice card
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
            Before
          </p>
          <ul className="list-none text-sm md:text-base text-ink-muted leading-snug space-y-1">
            <li>Cool gray-blue surface</li>
            <li>Blue ring on the popular tier</li>
            <li>Blue-to-purple gradient CTA</li>
            <li>Pure black title text</li>
            <li>Five colored elements competing</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
            After /colorgrade
          </p>
          <ul className="list-none text-sm md:text-base text-ink leading-snug space-y-1">
            <li>Warm Canvas surface</li>
            <li>Quiet mono-caps eyebrow (no ring)</li>
            <li>Single committed amber-700 CTA</li>
            <li>Tinted stone-900 title</li>
            <li>One accent — on the CTA only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function VerdictArtifact() {
  return (
    <figure className="border-l-2 border-accent pl-5 md:pl-6 py-2">
      <figcaption className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
        From /finish on the meditation app
      </figcaption>
      <p className="font-display italic font-normal text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink max-w-prose">
        Ready to ship.{" "}
        <span className="text-ink-muted">With minor items noted.</span>
      </p>
      <p className="mt-5 text-sm text-ink-subtle leading-relaxed text-pretty max-w-prose">
        The verdict landed after eight polish items applied autonomously and
        three remaining concerns flagged at three severity tiers. The
        substantial item — touch targets on the practice library tier cards
        below 44×44px on mobile — was held for the next iteration; minor
        items can land later without affecting deployment.
      </p>
    </figure>
  );
}
