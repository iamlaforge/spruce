import type { Metadata } from "next";
import Link from "next/link";
import { TUTORIALS } from "@/components/designing/tutorials";

/**
 * /designing/tutorials — the tutorials index. Lists each tutorial as an
 * editorial card. Available tutorials link to /designing/tutorials/[slug];
 * coming-soon tutorials show as a visually-distinct card with no link.
 *
 * The index opens with a tight editorial frame rather than a full page-
 * hero. The workflow page is the editorial moment for this branch of the
 * site; the tutorials index is the practical surface that supports it,
 * so visitors land directly into the list.
 *
 * Cards use situation-shaped markers ("From scratch", "Inherited code",
 * etc.) rather than curriculum numbering ("Tutorial 01") — the workflow
 * page argues the loop isn't sequential, and the tutorials are entry
 * points, not chapters. The marker labels match the First/Loop/Last
 * logic on the workflow page.
 */

export const metadata: Metadata = {
  title: "Tutorials — Spruce",
  description:
    "The Spruce loop applied. Pick the situation closest to yours and walk the loop from there.",
};

export default function TutorialsIndexPage() {
  return (
    <>
      <IndexFrame />
      <TutorialsList />
    </>
  );
}

// ---------------------------------------------------------------------------
// IndexFrame — short editorial frame above the list. Eyebrow + one-line
// italic Fraunces sentence + a short body line. Sits on the same
// reading register as a section frame elsewhere on the site, not a hero.
// ---------------------------------------------------------------------------

function IndexFrame() {
  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-baseline">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
              Tutorials
            </p>
            <p className="font-display italic font-normal text-3xl md:text-4xl leading-snug tracking-tight text-ink text-balance max-w-prose">
              The loop applied — pick the situation closest to yours.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-5 lg:mt-0">
            <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty">
              The{" "}
              <Link
                href="/designing"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                Workflow
              </Link>{" "}
              page is the framework. Each one below walks it from a different
              starting point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// TutorialsList — vertical stack of tutorial cards. Each card is a single
// reading-width row with marker + italic Fraunces title + description.
// Available tutorials are full-color links; coming-soon cards are muted
// and unlinked.
// ---------------------------------------------------------------------------

function TutorialsList() {
  return (
    <section className="pb-20 md:pb-28 border-t border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <ul role="list" className="space-y-px">
          {TUTORIALS.map((tutorial) => (
            <li key={tutorial.slug}>
              <TutorialCard
                slug={tutorial.slug}
                marker={tutorial.marker}
                title={tutorial.title}
                description={tutorial.description}
                status={tutorial.status}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TutorialCard({
  slug,
  marker,
  title,
  description,
  status,
}: {
  slug: string;
  marker: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
}) {
  if (status === "coming-soon") {
    return (
      <div className="border-t border-rule-subtle py-8 md:py-10">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-baseline">
          <div className="col-span-12 lg:col-span-2 mb-3 lg:mb-0">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
              {marker}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display italic font-normal text-2xl md:text-3xl tracking-tight text-ink-muted leading-snug">
              {title}
            </h2>
            <p className="mt-3 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
              {description}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:text-right mt-3 lg:mt-0">
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle inline-block">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/designing/tutorials/${slug}`}
      className="group block border-t border-rule-subtle py-8 md:py-10 transition-colors duration-fast ease-considered hover:bg-surface-elevated"
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-baseline">
        <div className="col-span-12 lg:col-span-2 mb-3 lg:mb-0">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent">
            {marker}
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <h2 className="font-display italic font-normal text-2xl md:text-3xl tracking-tight text-ink leading-snug group-hover:text-accent transition-colors duration-fast ease-considered">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
            {description}
          </p>
        </div>
        <div className="col-span-12 lg:col-span-3 lg:text-right mt-3 lg:mt-0">
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle group-hover:text-accent transition-colors duration-fast ease-considered inline-block">
            Walk through &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
