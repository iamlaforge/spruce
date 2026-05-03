import Link from "next/link";
import {
  Beat,
  CommandList,
  DecisionCallout,
  PullQuoteArtifact,
  TerminalArtifact,
} from "./Walkthrough";

/**
 * Tutorial registry + content. Each tutorial has metadata (slug, title,
 * description, status) plus a renderBeats function returning the
 * walkthrough body. Status "available" tutorials render full content;
 * "coming-soon" tutorials render a placeholder card on the index and a
 * brief detail page.
 *
 * Tutorials available now:
 *   - starting-from-scratch — new product, empty codebase, full loop
 *   - iterating-existing-design — existing codebase, install + assess + refine
 *   - critique-and-refine — /critique-driven loop with corrective passes
 *
 * Coming soon:
 *   - chrome-extension — Spruce in the browser (per ROADMAP)
 */

export type TutorialStatus = "available" | "coming-soon";

export type Tutorial = {
  slug: string;
  /**
   * Situation-shaped marker rendered as a mono-caps eyebrow on the index
   * card and detail page header. Replaces curriculum numbering ("Tutorial
   * 01") so the tutorials read as entry points rather than as a
   * sequence — matching the First/Loop/Last logic on the workflow page.
   */
  marker: string;
  /** Italic Fraunces title used on the index card and detail page header. */
  title: string;
  /** One-sentence description used on the index card. */
  description: string;
  /** Longer context paragraph used at the top of the detail page. */
  context?: string;
  status: TutorialStatus;
  /** Beats rendered in the detail page body. Required when status is "available". */
  renderBeats?: () => React.ReactNode;
};

export const TUTORIALS: Tutorial[] = [
  {
    slug: "starting-from-scratch",
    marker: "From scratch",
    title: "Starting from scratch.",
    description:
      "A new product, an empty codebase. Walk through the loop from first decision to ship.",
    context:
      "You arrive with a new product idea. The codebase is empty or has barely begun. You want Spruce to help shape what you build, from the first decision onward — not as a styling layer applied later, but as design reasoning threaded through the whole project.",
    status: "available",
    renderBeats: () => <StartingFromScratchBeats />,
  },
  {
    slug: "iterating-existing-design",
    marker: "Inherited code",
    title: "Iterating on existing design.",
    description:
      "Bring Spruce into a codebase that already exists. Install, assess what's there, and refine from the inside out.",
    context:
      "You have an existing project. The design has accumulated over time — some of it works, some of it drifted, some of it never got the attention it needed. You want Spruce to help you see what's there and improve it without starting over.",
    status: "available",
    renderBeats: () => <IteratingExistingBeats />,
  },
  {
    slug: "critique-and-refine",
    marker: "Critique-driven",
    title: "Critique and refine.",
    description:
      "Something feels off but you can't name it. Run /critique for a design-director read; apply correctives based on what landed; review again; converge.",
    context:
      "Functional issues you can solve. Direction issues are harder — the work runs, the layout is reasonable, but something's not right. The problems may be directional rather than technical. /critique surfaces them; the corrective tier addresses them.",
    status: "available",
    renderBeats: () => <CritiqueAndRefineBeats />,
  },
  {
    slug: "chrome-extension",
    marker: "In the browser",
    title: "Spruce in the browser.",
    description:
      "Coming as the Chrome extension lands. Spruce's reasoning available against any open page — in-page audits, design-system inspection, conversational refinement.",
    status: "coming-soon",
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}

// ---------------------------------------------------------------------------
// StartingFromScratchBeats — the canonical first-encounter tutorial. Six
// beats covering Set up → Foundations → First call → Review → Refine →
// Ship. Same content that lived in /designing's Scenarios section before
// the split, now living on its own tutorial page.
// ---------------------------------------------------------------------------

function StartingFromScratchBeats() {
  return (
    <>
      <Beat
        heading="Set the context."
        narrative={
          <>
            <p>
              Run{" "}
              <code className="font-mono text-base text-accent">
                /spruce-up
              </code>
              . Spruce asks five questions about your product — what it does,
              who uses it, what character it should have, how dense it should
              feel, what voice it should speak in. The answers compile into{" "}
              <code className="font-mono text-base text-accent">
                .spruce.md
              </code>{" "}
              at the root of your project. Every command from this point
              reads it.
            </p>
            <p>
              This is the only command that has to come first. Without
              context, the rest of Spruce&rsquo;s reasoning has nothing to
              calibrate against.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/spruce-up"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/spruce-up &rarr;
          </Link>
        }
      >
        <TerminalArtifact
          turns={[
            { role: "user", content: "/spruce-up" },
            {
              role: "spruce",
              content:
                "What does this product do, and what's the core experience you want users to have?",
            },
            {
              role: "user",
              content:
                "A short-session meditation app for parents — five-minute practices designed to fit into the gaps of a busy day.",
            },
            {
              role: "spruce",
              content:
                "Got it. Next: who uses it? What do you know about them?",
            },
          ]}
        />
      </Beat>

      <Beat
        heading="Establish the foundations."
        narrative={
          <>
            <p>
              With context in place, run{" "}
              <code className="font-mono text-base text-accent">
                /foundations
              </code>
              . Spruce reads{" "}
              <code className="font-mono text-base text-accent">
                .spruce.md
              </code>{" "}
              and generates the design tokens every other command will
              compose within: a type system calibrated to the character you
              described, a palette with the right temperature and accent
              strategy, a spacing scale, a small set of composed primitives.
            </p>
            <p>
              The output is a specimen sheet you wire into your project&rsquo;s
              CSS or design tokens. From here, the rest of the loop has a
              system to draw from.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/foundations"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/foundations &rarr;
          </Link>
        }
      />

      <Beat
        heading="Make the first call."
        narrative={
          <p>
            Foundations established. Time to design something. Spruce gives
            you three commitment levels for the work itself:
          </p>
        }
      >
        <CommandList
          items={[
            {
              command: "/decide <surface>",
              text: "Spruce walks you through the significant decisions before generating.",
            },
            {
              command: "/design <surface>",
              text: "Spruce makes the calls and ships a first pass with notes on what was decided.",
            },
            {
              command: "/remix <surface>",
              text: "Spruce produces three distinct directions for the same brief.",
            },
          ]}
        />
        <DecisionCallout>
          For your first surface,{" "}
          <code className="font-mono text-sm text-accent">/decide</code> is
          often the right move. Walking through the decisions makes
          Spruce&rsquo;s reasoning visible — useful when you&rsquo;re
          learning what the tool produces.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Review what you made."
        narrative={
          <p>
            You have a designed surface. Now review it. Spruce offers four
            lenses, each with a different depth and a different question:
          </p>
        }
      >
        <CommandList
          items={[
            {
              command: "/detect",
              text: "Fast anti-pattern scan. Names what's wrong, points to the corrective.",
            },
            {
              command: "/survey",
              text: "Comprehensive findings with severity tiers and an action plan.",
            },
            {
              command: "/uxreview",
              text: "UX substrate specifically — IA, feedback, forms, state coverage.",
            },
            {
              command: "/critique",
              text: "Design-director feedback at the level of feel and direction.",
            },
          ]}
        />
        <DecisionCallout>
          For a first surface,{" "}
          <code className="font-mono text-sm text-accent">/critique</code>{" "}
          is often the right next move — it tells you whether what you
          generated has a point of view, before you start refining the
          details.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Refine through the loop."
        narrative={
          <>
            <p>
              Reviews surface what to address; the corrective tier handles
              each layer.{" "}
              <code className="font-mono text-base text-accent">/typeface</code>{" "}
              for typography,{" "}
              <code className="font-mono text-base text-accent">
                /colorgrade
              </code>{" "}
              for color,{" "}
              <code className="font-mono text-base text-accent">/arrange</code>{" "}
              for spacing, and so on through the corrective tier.
            </p>
            <p>
              The corrective and review tiers loop with each other. Refine
              based on what review surfaced; review again to see what
              changed; refine more. The loop runs as many times as the work
              needs.
            </p>
          </>
        }
      >
        <DecisionCallout>
          When refinements stop producing meaningful changes — when reviews
          return only minor items — the loop has converged. That&rsquo;s the
          signal you&rsquo;re ready for the next beat.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Ship with a verdict."
        narrative={
          <>
            <p>
              When the loop has converged, run{" "}
              <code className="font-mono text-base text-accent">/finish</code>
              . It runs a final polish pass — straight quotes to smart
              quotes, balance on headlines, focus-ring offsets — and produces
              an honest verdict on ship-readiness.
            </p>
            <p>
              The verdict is the differentiator. Other commands produce
              work;{" "}
              <code className="font-mono text-base text-accent">/finish</code>{" "}
              produces a call.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/finish"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/finish &rarr;
          </Link>
        }
      >
        <PullQuoteArtifact>
          <p className="font-display italic font-normal text-2xl md:text-3xl leading-[1.1] tracking-tight text-ink max-w-prose">
            Ready to ship.{" "}
            <span className="text-ink-muted">With minor items noted.</span>
          </p>
        </PullQuoteArtifact>
      </Beat>
    </>
  );
}

// ---------------------------------------------------------------------------
// IteratingExistingBeats — bringing Spruce into an existing codebase.
// Different shape than starting-from-scratch: install, assess what's
// there, refine from the inside out. Five beats.
// ---------------------------------------------------------------------------

function IteratingExistingBeats() {
  return (
    <>
      <Beat
        heading="Install Spruce alongside your project."
        narrative={
          <>
            <p>
              Run{" "}
              <code className="font-mono text-base text-accent">
                npx spruce-skill add
              </code>{" "}
              from your project root. Spruce installs as a skill in your AI
              tool (Claude Code today; more harnesses coming). No code
              changes to your project — Spruce reads your codebase to
              reason, but doesn&rsquo;t require you to restructure anything
              first.
            </p>
            <p>
              When the install completes, you have access to all 19 commands
              from your AI conversation interface.
            </p>
          </>
        }
      >
        <TerminalArtifact
          turns={[
            { role: "user", content: "$ npx spruce-skill add" },
            {
              role: "spruce",
              content:
                "Installed Spruce skill. 19 commands available. Run /spruce-up to set up project context, or run /detect to scan what's already in the codebase.",
            },
          ]}
        />
      </Beat>

      <Beat
        heading="Set or import context."
        narrative={
          <>
            <p>
              If your project doesn&rsquo;t already have a{" "}
              <code className="font-mono text-base text-accent">
                .spruce.md
              </code>
              , run{" "}
              <code className="font-mono text-base text-accent">
                /spruce-up
              </code>{" "}
              to create one. Even on existing codebases, the context file is
              what calibrates everything else — Spruce needs to know what the
              product is trying to be before it can tell you whether the
              existing design is on or off character.
            </p>
            <p>
              If a context file exists, every command will read it
              automatically.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/spruce-up"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/spruce-up &rarr;
          </Link>
        }
      />

      <Beat
        heading="Assess what's there."
        narrative={
          <p>
            With context in place, run a diagnostic. The right starting
            lens depends on what you want to learn:
          </p>
        }
      >
        <CommandList
          items={[
            {
              command: "/detect",
              text: "Fast scan for named anti-patterns and accessibility blockers. Best for triage — what's clearly broken or generic.",
            },
            {
              command: "/survey",
              text: "Comprehensive review with severity tiers. Best for shipping prep or full-project assessment.",
            },
            {
              command: "/critique",
              text: "Design-director read. Best when something feels off but you can't name it.",
            },
          ]}
        />
        <DecisionCallout>
          For an inherited codebase, start with{" "}
          <code className="font-mono text-sm text-accent">/survey</code>.
          The severity-tiered findings show you what&rsquo;s critical, what&rsquo;s
          significant, and what&rsquo;s polish — useful for triaging where
          to invest.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Address from the outside in."
        narrative={
          <>
            <p>
              Reviews surface findings; the corrective tier addresses each
              layer. With existing code, the order matters: visible layers
              first (typography, color), then structural (spacing,
              components), then content (voice, state coverage).
            </p>
            <p>
              The point isn&rsquo;t to fix everything at once. Pick the
              highest-impact findings from the review, run the relevant
              corrective, review again to see what changed.
            </p>
          </>
        }
      >
        <DecisionCallout>
          On legacy code, expect bigger gains from{" "}
          <code className="font-mono text-sm text-accent">/typeface</code>{" "}
          and{" "}
          <code className="font-mono text-sm text-accent">/colorgrade</code>{" "}
          early — these are the layers that most often default in AI-
          generated code, and the visible character shifts the most when
          they change.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Iterate, then ship."
        narrative={
          <>
            <p>
              After the first round of correctives, re-review with the same
              diagnostic to see what changed and what remains. Refine
              again. The loop converges as findings drop in severity.
            </p>
            <p>
              When you&rsquo;re ready to deploy a milestone, run{" "}
              <code className="font-mono text-base text-accent">/finish</code>{" "}
              for the final polish pass and a ship-readiness verdict.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/finish"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/finish &rarr;
          </Link>
        }
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// CritiqueAndRefineBeats — the loop in compressed form. When something
// works but feels off, /critique surfaces what's wrong, and the
// corrective tier addresses it. Four beats focused on the diagnostic →
// corrective → re-diagnostic loop.
// ---------------------------------------------------------------------------

function CritiqueAndRefineBeats() {
  return (
    <>
      <Beat
        heading="Run /critique on what's bothering you."
        narrative={
          <>
            <p>
              Pass the surface or area as scope:{" "}
              <code className="font-mono text-base text-accent">
                /critique pricing page
              </code>
              ,{" "}
              <code className="font-mono text-base text-accent">
                /critique onboarding flow
              </code>
              ,{" "}
              <code className="font-mono text-base text-accent">/critique</code>{" "}
              for a full-project read. Spruce reads your context file and
              produces a narrative critique in five sections: overall take,
              character and point of view, coherence, specific moments,
              direction forward.
            </p>
            <p>
              Unlike{" "}
              <code className="font-mono text-base text-accent">/survey</code>
              ,{" "}
              <code className="font-mono text-base text-accent">
                /critique
              </code>{" "}
              is opinionated. It will name when a design is hedging and
              recommend specific shifts in direction.
            </p>
          </>
        }
        crossRef={
          <Link
            href="/commands/critique"
            className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            See /commands/critique &rarr;
          </Link>
        }
      >
        <PullQuoteArtifact eyebrow="From a sample /critique">
          <p>
            This reads as a capable but undercommitted design. The craft is
            mostly there — components are clean, spacing is systematic,
            copy is serviceable — but the product isn&rsquo;t declaring
            what it is. The question I&rsquo;d bring to this is whether
            &ldquo;nothing wrong&rdquo; is the bar, or whether this product
            deserves to be recognizable.
          </p>
        </PullQuoteArtifact>
      </Beat>

      <Beat
        heading="Read for direction, not punch list."
        narrative={
          <>
            <p>
              <code className="font-mono text-base text-accent">/critique</code>{" "}
              outputs read like an essay, not like a list of issues to
              tick through. The Direction Forward section at the end names
              two or three specific moves that would meaningfully shift the
              work.
            </p>
            <p>
              Treat that section as the brief. It tells you which
              correctives to run and in what order — usually a typography
              shift, a palette move, or a voice change comes before
              fine-grained polish.
            </p>
          </>
        }
      />

      <Beat
        heading="Apply the recommended correctives."
        narrative={
          <p>
            Run each command Direction Forward named, in order. The
            corrective tier:
          </p>
        }
      >
        <CommandList
          items={[
            {
              command: "/typeface",
              text: "Typography discipline — typeface, scale, hierarchy, craft.",
            },
            {
              command: "/colorgrade",
              text: "Color discipline — palette, contrast, accent strategy.",
            },
            {
              command: "/voice",
              text: "Copy discipline — labels, errors, empty states, terminology.",
            },
            {
              command: "/refine",
              text: "Component-level work — state coverage, anatomy, interactions.",
            },
          ]}
        />
        <DecisionCallout>
          Each corrective applies discipline autonomously where the call is
          clear, and surfaces character-level shifts for your approval.
          You stay in the chair on the calls that matter; Spruce handles
          the discipline.
        </DecisionCallout>
      </Beat>

      <Beat
        heading="Re-critique. Converge."
        narrative={
          <>
            <p>
              After applying correctives, run{" "}
              <code className="font-mono text-base text-accent">
                /critique
              </code>{" "}
              again on the same scope. The output should shift — character
              concerns from the first pass should now register as
              addressed; new observations may surface at finer levels of
              detail.
            </p>
            <p>
              Repeat until the critique has nothing significant to say. At
              that point, the work has the point of view it needed.
            </p>
          </>
        }
      >
        <DecisionCallout>
          When{" "}
          <code className="font-mono text-sm text-accent">/critique</code>{" "}
          starts confirming the direction rather than questioning it, the
          loop has converged. You&rsquo;re ready for{" "}
          <code className="font-mono text-sm text-accent">/finish</code> and
          ship.
        </DecisionCallout>
      </Beat>
    </>
  );
}
