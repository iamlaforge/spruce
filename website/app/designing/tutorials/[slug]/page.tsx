import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTutorialBySlug,
  TUTORIALS,
} from "@/components/designing/tutorials";

/**
 * /designing/tutorials/[slug] — tutorial detail page. Renders the
 * walkthrough body (a sequence of Beats) for available tutorials, or a
 * brief placeholder for coming-soon entries.
 *
 * Layout structure:
 *   - Eyebrow with tutorial number + back link to the index
 *   - Italic Fraunces title at hero size
 *   - Context paragraph
 *   - Beats: each rendered via the tutorial's renderBeats() function
 *   - Footer pointer back to the workflow page and to other tutorials
 *
 * Header, footer, and the Workflow / Tutorials tab bar live in the
 * /designing layout.
 */

export function generateStaticParams() {
  return TUTORIALS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) {
    return { title: "Tutorial — Spruce" };
  }
  // Strip trailing period from title for metadata cleanliness.
  const cleanTitle = tutorial.title.replace(/\.$/, "");
  return {
    title: `${cleanTitle} — Spruce Tutorials`,
    description: tutorial.description,
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <>
      <article className="pt-12 md:pt-20 pb-16 md:pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <header className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              {/* Back link — sits as quiet eyebrow above the marker so the
                  navigational return doesn't compete with the situational
                  marker for attention. */}
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-6">
                <Link
                  href="/designing/tutorials"
                  className="text-ink-subtle hover:text-accent transition-colors duration-fast ease-considered"
                >
                  &larr; All tutorials
                </Link>
              </p>

              {/* Situation-shaped marker — matches the workflow page's
                  First/Loop/Last labeling. Replaces curriculum numbering. */}
              <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-4">
                {tutorial.marker}
              </p>

              <h1 className="font-display italic font-normal text-4xl md:text-6xl tracking-tight text-ink leading-[1.05] text-balance max-w-prose">
                {tutorial.title}
              </h1>

              {tutorial.context ? (
                <p className="mt-6 md:mt-8 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
                  {tutorial.context}
                </p>
              ) : null}
            </div>
          </header>

          {/* Body — beats for available tutorials, placeholder for
              coming-soon entries. */}
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              {tutorial.status === "available" && tutorial.renderBeats ? (
                <div className="space-y-12 md:space-y-16 border-t border-rule-subtle pt-10 md:pt-12">
                  {tutorial.renderBeats()}
                </div>
              ) : (
                <ComingSoonNote />
              )}
            </div>
          </div>
        </div>
      </article>

      <TutorialFooter currentSlug={tutorial.slug} />
    </>
  );
}

// ---------------------------------------------------------------------------
// ComingSoonNote — placeholder rendered for tutorials with status
// "coming-soon". Sits in a single reading column and points back to
// the index.
// ---------------------------------------------------------------------------

function ComingSoonNote() {
  return (
    <div className="border-t border-rule-subtle pt-10 md:pt-12 max-w-prose">
      <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-4">
        Coming soon
      </p>
      <p className="font-display italic font-normal text-2xl md:text-3xl leading-snug tracking-tight text-ink text-balance">
        Tutorials ship with the surfaces they cover.
      </p>
      <p className="mt-5 text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
        This one ships when its surface does. The other tutorials cover what
        Spruce supports today.
      </p>
      <p className="mt-8 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
        <Link
          href="/designing/tutorials"
          className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
        >
          &larr; All tutorials
        </Link>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TutorialFooter — closing strip with two pointers: back to the loop on
// the workflow page (the conceptual frame), and forward to the next
// tutorial (or all tutorials, if this is the last). Sits inside a
// reading column so it doesn't dominate.
// ---------------------------------------------------------------------------

function TutorialFooter({ currentSlug }: { currentSlug: string }) {
  const currentIndex = TUTORIALS.findIndex((t) => t.slug === currentSlug);
  const nextTutorial = TUTORIALS.slice(currentIndex + 1).find(
    (t) => t.status === "available",
  );

  return (
    <section className="border-t border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12">
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
                  The framework
                </p>
                <p className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
                  Back to the loop.
                </p>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty mb-4 max-w-prose">
                  First sets context. Last ships. The middle three — decide,
                  review, refine — intermingle.
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                  <Link
                    href="/designing"
                    className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
                  >
                    See the workflow &rarr;
                  </Link>
                </p>
              </div>

              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
                  {nextTutorial ? nextTutorial.marker : "Other paths"}
                </p>
                <p className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
                  {nextTutorial ? nextTutorial.title : "Pick another situation."}
                </p>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty mb-4 max-w-prose">
                  {nextTutorial
                    ? nextTutorial.description
                    : "Each one walks the loop from a different starting point."}
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                  <Link
                    href={
                      nextTutorial
                        ? `/designing/tutorials/${nextTutorial.slug}`
                        : "/designing/tutorials"
                    }
                    className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
                  >
                    {nextTutorial ? "Walk through" : "All tutorials"} &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
