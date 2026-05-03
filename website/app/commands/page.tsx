import type { Metadata } from "next";
import Link from "next/link";
import { ALL_SLUGS, TIERS } from "@/components/commands/data";

export const metadata: Metadata = {
  title: "Commands — Spruce",
  description:
    "Nineteen commands across three tiers — diagnostic, corrective, generative. Each opens a specific conversation with your AI tool.",
};

/**
 * Index page at /commands. Treated as an essay introduction to the system,
 * not a regrid of the home-page catalog: the sidebar already lists every
 * command, so this page does the work of explaining the tiers — what kind
 * of conversation each one is — and trusts the sidebar to surface the
 * specific commands.
 */
export default function CommandsIndex() {
  return (
    <article className="max-w-3xl">
      <header className="mb-14 md:mb-20">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-5">
          § Commands &middot; The catalog
        </p>
        <h1 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink mb-6 leading-[1.05] text-balance">
          {ALL_SLUGS.length} commands.{" "}
          <span className="text-ink-muted">
            Each opens a specific conversation with your AI tool.
          </span>
        </h1>
        <p className="font-display italic font-normal text-xl md:text-2xl text-ink-muted leading-snug text-balance max-w-prose">
          Spruce is structured as three tiers. They aren&rsquo;t levels of
          capability — they&rsquo;re shapes of conversation. Picking the right
          tier matters more than picking the right command within it.
        </p>
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose mt-7">
          For what running the full catalog produces on a real product, see
          the{" "}
          <Link
            href="/case-study"
            className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-fast ease-considered"
          >
            Stillpoint case study
          </Link>
          .
        </p>
      </header>

      {TIERS.map((tier) => (
        <section key={tier.id} className="mb-14 md:mb-16 last:mb-0">
          <div className="border-t border-rule mb-7 md:mb-8" />
          <h2 className="font-display italic font-normal text-2xl md:text-3xl tracking-tight text-ink leading-tight mb-6">
            {tier.label}
          </h2>
          <p className="text-base md:text-lg text-ink leading-relaxed text-pretty max-w-prose">
            {tier.essay}
          </p>
        </section>
      ))}
    </article>
  );
}
