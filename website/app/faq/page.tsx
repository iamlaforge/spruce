import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FAQ_GROUPS, type FAQGroup } from "@/lib/faq";

/**
 * /faq — common questions visitors arrive with. Reduces "I don't get it"
 * friction so the rest of the site can stay focused on the work rather
 * than the meta-questions about it.
 *
 * Structure:
 *   - Slim opening frame (eyebrow + italic Fraunces line + body), not a
 *     full hero — the FAQ is a practical surface, not an editorial moment.
 *   - Three sections: The system / Using it / License & support. Each
 *     question is italic Fraunces; each answer sits underneath in body.
 *     Hairline rule between entries.
 *   - Closing pointers back to Install and the catalog.
 *
 * Source of truth for the questions and answers lives in lib/faq.tsx so
 * the homepage FAQ module pulls from the same data.
 */

export const metadata: Metadata = {
  title: "FAQ — Spruce",
  description:
    "Common questions about Spruce — what it is, how it differs from rules files, what's calibrated to your product, and where to find the source.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <IndexFrame />
        {FAQ_GROUPS.map((group) => (
          <FAQSection key={group.marker} group={group} />
        ))}
        <ClosingPointer />
      </main>
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// IndexFrame — slim opening: eyebrow + one-line italic Fraunces sentence
// + a short body line in the right column. Same register as the tutorials
// index frame; the FAQ is a practical surface, not an editorial moment.
// ---------------------------------------------------------------------------

function IndexFrame() {
  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-baseline">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
              FAQ
            </p>
            <p className="font-display italic font-normal text-3xl md:text-4xl leading-snug tracking-tight text-ink text-balance max-w-prose">
              Questions visitors arrive with — answered directly.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-5 lg:mt-0">
            <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty">
              For the system itself, see the{" "}
              <Link
                href="/commands"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                catalog
              </Link>
              . For applied walkthroughs, see the{" "}
              <Link
                href="/designing"
                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
              >
                workflow
              </Link>
              . For everything else, this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQSection — one of the three groups. Left-gutter holds eyebrow +
// Fraunces section title; right column holds the questions stacked with
// hairline rules between.
// ---------------------------------------------------------------------------

function FAQSection({ group }: { group: FAQGroup }) {
  return (
    <section className="py-12 md:py-16 border-t border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
          <div className="col-span-12 lg:col-span-3 mb-8 lg:mb-0">
            <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-2">
              {group.marker}
            </p>
            <h2 className="font-display italic font-normal text-3xl md:text-4xl tracking-tight text-ink leading-[1.05]">
              {group.title}
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <ul role="list" className="list-none space-y-px">
              {group.items.map((item, i) => (
                <li
                  key={item.slug}
                  className={
                    i === 0
                      ? "py-6 md:py-8"
                      : "py-6 md:py-8 border-t border-rule-subtle"
                  }
                >
                  <h3 className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4 text-pretty">
                    {item.question}
                  </h3>
                  <div className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose space-y-4">
                    {item.answer}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ClosingPointer — short closing strip. Pairs Install and Commands as the
// two surfaces visitors most often want next, in the same two-column
// rhythm used elsewhere on the site.
// ---------------------------------------------------------------------------

function ClosingPointer() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12">
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
                  Install
                </p>
                <p className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
                  Ready to install?
                </p>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty mb-4 max-w-prose">
                  One command in Claude Code. Cursor, Codex, VS Code, and
                  Gemini are on the roadmap.
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                  <Link
                    href="/install"
                    className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
                  >
                    Install Spruce &rarr;
                  </Link>
                </p>
              </div>

              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
                  The catalog
                </p>
                <p className="font-display italic font-normal text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
                  See every command.
                </p>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed text-pretty mb-4 max-w-prose">
                  Nineteen commands across generative, diagnostic, and
                  corrective tiers. Each with its own demo and reference.
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
                  <Link
                    href="/commands"
                    className="text-ink hover:text-accent transition-colors duration-fast ease-considered"
                  >
                    Browse the catalog &rarr;
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
