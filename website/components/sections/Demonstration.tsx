import { Link } from "@/components/Link";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { DemonstrationPreview } from "./demonstration/DemonstrationPreview";

// The demo above transforms the three surfaces with five commands. The
// catalog below is the rest of the system. Keep these in sync if either
// changes.
const COMMANDS_DEMONSTRATED = 5;

const allCommands: Array<{ name: string; description: string }> = [
  { name: "/spruce-up", description: "Set up the project's design context." },
  { name: "/decide", description: "Direct each significant decision, one at a time." },
  { name: "/design", description: "Generate with Spruce reasoning applied." },
  { name: "/remix", description: "Three distinct directions for the same brief." },
  { name: "/foundations", description: "Generate design tokens and primitives." },
  { name: "/typeface", description: "Apply typography discipline." },
  { name: "/colorgrade", description: "Apply color system discipline." },
  { name: "/arrange", description: "Apply spatial discipline." },
  { name: "/refine", description: "Apply component discipline." },
  { name: "/pace", description: "Apply motion discipline." },
  { name: "/voice", description: "Apply UX writing discipline." },
  { name: "/reduce", description: "Strip an interface to its essentials." },
  { name: "/fortify", description: "Apply production readiness." },
  { name: "/finish", description: "Final polish before shipping." },
  { name: "/survey", description: "Structured review across every dimension." },
  { name: "/uxreview", description: "Review the UX substrate specifically." },
  { name: "/critique", description: "An opinionated design-director read." },
  { name: "/detect", description: "Anti-pattern scan across all dimensions." },
  { name: "/explain", description: "Walk through the reasoning behind a decision." },
];

export function Demonstration() {
  return (
    <Section id="demonstration" tone="default">
      <SectionHeader mark="§ 02">Demonstration &middot; See it work</SectionHeader>

      {/* Opening declaration */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Pick a surface.{" "}
            <span className="text-ink-muted">
              Watch five commands transform it.
            </span>
          </p>
        </div>
      </div>

      {/* Demonstration preview — the main scroll-pinned arc. Three surfaces,
          each with its own product context. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <DemonstrationPreview />
        </div>
      </div>

      {/* Bridge — declarative caption that picks up the demo's energy and
          frames the catalog below. The right-side "Browse the catalog" link
          was dropped because the catalog is the next thing visible — and
          because /commands doesn't exist yet to link to. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-8 md:mb-10 border-t border-rule pt-10 md:pt-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            {COMMANDS_DEMONSTRATED} demonstrated{" "}
            <span className="text-ink-muted">&middot;</span>{" "}
            {allCommands.length - COMMANDS_DEMONSTRATED} more in the catalog
          </p>
        </div>
      </div>

      {/* Catalog grid — each command links to its detail page on /commands.
          The catalog is reference material; it just renders. No arrival
          animation here — confidence reads as content that's just present. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
        <ul
          role="list"
          className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-5 md:gap-y-6 list-none"
        >
          {allCommands.map((cmd) => (
            <li key={cmd.name}>
              <Link
                href={`/commands/${cmd.name.replace("/", "")}`}
                variant="nav"
                className="group block py-1"
              >
                <span className="block font-mono text-sm text-ink group-hover:text-accent transition-colors duration-fast ease-considered">
                  {cmd.name}
                </span>
                <span className="block text-xs text-ink-subtle leading-snug mt-1 text-pretty">
                  {cmd.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
