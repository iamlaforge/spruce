import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Seven Dimensions section — first-class moment for the framework that
 * organizes Spruce's reasoning. Sits between Philosophy and Demonstration.
 *
 * Rendered as a centered-system diagram on desktop: a central editorial
 * label ("Interface design") with seven dimension labels arranged radially
 * around it, connected by thin hairline spokes from center to each label.
 * The diagram form communicates what prose alone cannot — that the
 * dimensions are layers organized around a central concept rather than a
 * sequential list.
 *
 * On mobile, the diagram falls back to a vertical editorial list (the
 * radial layout doesn't work at narrow widths). Same content, different
 * structural treatment per viewport.
 *
 * The seven dimension names are NOT mapped 1:1 to commands. The catalog
 * has 19 commands across four tiers; the intro frames this explicitly so
 * the diagram doesn't read as "Spruce has seven commands."
 */

type Dimension = {
  name: string;
  short: string;
  full: string;
};

const dimensions: Dimension[] = [
  {
    name: "Typography",
    short: "Typeface, scale, hierarchy, craft.",
    full: "Typeface selection, scale, hierarchy, and the craft details that separate considered work from default output.",
  },
  {
    name: "Color",
    short: "Palette, temperature, contrast, dark mode.",
    full: "Palette construction, neutral temperature, accent strategy, contrast, and dark mode as a parallel system.",
  },
  {
    name: "Spatial design",
    short: "Spacing, proximity, rhythm, density.",
    full: "Spacing scale, proximity, rhythm, and density calibrated to product character.",
  },
  {
    name: "Components",
    short: "Layout, anatomy, state completeness.",
    full: "Layout archetype, anatomy, and state completeness — the shape vocabulary that distinguishes one product from another.",
  },
  {
    name: "Motion",
    short: "Timing, easing, character.",
    full: "Timing, easing, and the character motion communicates about the product.",
  },
  {
    name: "UX writing",
    short: "Voice, labels, errors, empty states.",
    full: "Voice, button labels, error messages, empty state copy — the places friendly-professional SaaS template language reflexively appears.",
  },
  {
    name: "UX patterns",
    short: "IA, feedback, forms, recovery.",
    full: "Information architecture, feedback, forms, empty states, error recovery — the substrate that determines whether an interface actually works.",
  },
];

// Radial geometry — 7 labels distributed evenly around a circle. Start at
// the top (12 o'clock = -π/2 in standard polar coords), proceed clockwise.
// Radius is expressed as percent-of-container so the SVG and HTML labels
// share the same coordinate frame.
const ANGLE_STEP = (Math.PI * 2) / dimensions.length;
const RADIUS_PERCENT = 40;

function pointAt(index: number) {
  const angle = index * ANGLE_STEP - Math.PI / 2;
  const x = 50 + Math.cos(angle) * RADIUS_PERCENT;
  const y = 50 + Math.sin(angle) * RADIUS_PERCENT;
  return { x, y, angle };
}

export function SevenDimensions() {
  return (
    <Section id="dimensions" tone="default">
      <SectionHeader>Seven Dimensions &middot; The framework</SectionHeader>

      {/* Intro — two-clause editorial pattern matching Philosophy and
          Demonstration openers. Names what the dimensions are; clarifies
          they're not 1:1 with commands. */}
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            Seven dimensions of interface design.{" "}
            <span className="text-ink-muted">
              The layers where AI work most consistently defaults &mdash; and
              the framework Spruce reasons across. Every command in the
              catalog operates on one or more of these layers.
            </span>
          </p>
        </div>
      </div>

      {/* Desktop: centered-system diagram. Hidden below md. */}
      <div className="hidden md:block">
        <RadialDiagram />
      </div>

      {/* Mobile: vertical editorial list. Hidden md+. */}
      <div className="md:hidden">
        <VerticalList />
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// RadialDiagram — desktop infographic. Square aspect-ratio container with
// SVG spokes from center to each label position, an editorial center label
// ("Interface design"), and seven dimension labels positioned at the spoke
// endpoints. Each label gets italic Fraunces name + short description.
//
// Layout: items aligned to baseline at their (x,y) center via translate(-50%,
// -50%); per-position text alignment isn't used — center-alignment for all
// labels lets the diagram read as a balanced system rather than as labels
// reaching toward / away from the center.
// ---------------------------------------------------------------------------

function RadialDiagram() {
  return (
    <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
        <div className="relative aspect-square mx-auto max-w-[36rem]">
          {/* Hairline spokes from center to each label position. The
              heptagon perimeter has been cut — spokes alone communicate
              "centered system" with less visual chrome. The radial
              gradient on each label fades the spokes behind the text so
              they don't run through the words. */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {dimensions.map((_, i) => {
              const { x, y } = pointAt(i);
              return (
                <line
                  key={`spoke-${i}`}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="var(--color-rule)"
                  strokeWidth="0.2"
                />
              );
            })}
          </svg>

          {/* Center label — single italic Fraunces "design" without the
              previous mono-caps "Interface" eyebrow. The section header
              and intro already establish that these are seven dimensions
              of interface design; the center anchors visually without
              repeating that framing verbatim. The radial gradient
              background fades the spokes behind the text. */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 py-3"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-background) 50%, transparent 90%)",
            }}
          >
            <p className="font-display italic text-lg text-ink-muted leading-tight">
              design
            </p>
          </div>

          {/* Dimension labels — positioned radially at spoke endpoints.
              Each label's center sits exactly at (x%, y%) via the
              translate(-50%, -50%) trick. Width is bounded so descriptions
              wrap to readable lines without overflowing into adjacent
              positions. The radial-gradient background fades the lines
              behind each label so they don't run through the text — solid
              section-background near the center, transparent at the edges,
              creating a soft fade-out effect for the lines as they
              approach the labels. */}
          {dimensions.map((dim, i) => {
            const { x, y } = pointAt(i);
            return (
              <div
                key={dim.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center w-[12rem] px-3 py-3"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  background:
                    "radial-gradient(ellipse at center, var(--color-background) 35%, transparent 75%)",
                }}
              >
                <p className="font-display italic font-normal text-base lg:text-lg text-ink leading-tight mb-1">
                  {dim.name}
                </p>
                <p className="text-xs text-ink-subtle leading-snug text-pretty">
                  {dim.short}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VerticalList — mobile fallback. Same content as the radial diagram, in a
// straightforward editorial list. The diagram form doesn't translate to
// narrow widths (labels would overlap or have to be tiny), so mobile gets
// the same dimensions in a list layout. The full descriptions appear here
// since there's vertical room for them.
// ---------------------------------------------------------------------------

function VerticalList() {
  return (
    <div className="grid grid-cols-12 gap-x-6">
      <ul
        role="list"
        className="col-span-12 list-none border-y border-rule"
      >
        {dimensions.map((dim, i) => (
          <li
            key={dim.name}
            className={`py-5 ${
              i > 0 ? "border-t border-rule-subtle" : ""
            }`}
          >
            <p className="font-display italic font-normal text-lg text-ink leading-snug mb-1.5">
              {dim.name}
            </p>
            <p className="text-base text-ink-muted leading-relaxed text-pretty">
              {dim.full}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
