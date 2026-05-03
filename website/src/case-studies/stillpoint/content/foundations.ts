/**
 * Stillpoint design system foundation guide — output of /foundations.
 *
 * This is the third artifact /foundations produces, alongside the tokens
 * (tokens/stillpoint.css) and the primitive components (components/
 * Stillpoint{Button,Card,Input,Heading,Link}.tsx). It documents the
 * character the system expresses, the key decisions made when codifying
 * .sketch.md's direction into specific values, and how to extend the
 * system as Stillpoint grows.
 *
 * Two exports:
 *   - stillpointFoundations         — structured object for programmatic
 *                                     access (catalog detail page reads
 *                                     from this)
 *   - stillpointFoundationsMarkdown — full markdown rendering for catalog
 *                                     illustrations that show the guide
 *                                     in document form
 */

export const stillpointFoundations = {
  character:
    "Warm, grounded, quietly confident. Paper-like surfaces, slow settled motion, editorial typography that respects users as thoughtful adults. Restraint is the primary aesthetic signal — every layer commits to character without shouting.",

  keyDecisions: [
    {
      label: "Typography",
      summary:
        "Söhne for the sans (humanist, modern human warmth), Lora for the serif (editorial register, longer-form moments). 1.25 ratio scale on a 16px base; three weights (400 / 500 / 600); generous line-heights — 1.55 for body, 1.2 for display.",
    },
    {
      label: "Color",
      summary:
        "Warm-neutral foundation in cream and warm sand. Sage as primary accent (~58% lightness, hue 145°). Deep indigo for type and depth (~28% lightness, hue 270°). Lavender and sunset peach as restrained accents for warmth and energy. Both light and dark modes produced; dark mode is warm-tinted, never cold.",
    },
    {
      label: "Density",
      summary:
        "Spacious-leaning-balanced. 4px-based spacing scale with 12 named steps from 4px (micro) through 96px (architectural). Generous component padding so the system feels unhurried.",
    },
    {
      label: "Radius",
      summary:
        "Soft moderate — 6px on most components, 12px on cards, 20px on hero containers. Reads as paper/ceramic; never sharp, never aggressively rounded.",
    },
    {
      label: "Elevation",
      summary:
        "Subtle warm-tinted shadows (cast in indigo-toned color, not black) plus 1px borders for structural separation. Paper-like, never glassy.",
    },
    {
      label: "Motion",
      summary:
        "Slow and settled. Duration ladder: 100 / 180 / 320 / 420 / 600ms. Strong-deceleration easings — primary ease-out is cubic-bezier(0.16, 1, 0.3, 1). Direct manipulation gets fast (180ms); primary transitions sit in the 320–420ms band /sketch named.",
    },
    {
      label: "Voice",
      summary:
        'Calm and encouraging. Buttons say what they do ("Start Session", not "Submit"). Errors describe the fix calmly. Confirmations are warm without being saccharine. Treats users as competent adults pursuing peace.',
    },
  ],

  primitives: [
    {
      name: "StillpointButton",
      role: "The primary affordance. Three variants — primary (filled sage), secondary (outline), tertiary (ghost). All states covered: default, hover, active, focus-visible, disabled.",
    },
    {
      name: "StillpointCard",
      role: "Paper-like surface for content groupings. Subtle warm-tinted shadow + 12px radius. Polymorphic via `as` prop for semantic accuracy (article, section, div).",
    },
    {
      name: "StillpointInput",
      role: "Text input with calm sage focus ring. States: default, hover, focus, disabled, placeholder. No labeling pattern enforced — consumers pair with `<label>` per their layout.",
    },
    {
      name: "StillpointHeading",
      role: "Five hierarchical levels (display, page, section, sub, minor) on the type scale. Lora for editorial moments, sans for minor (UI labels). Default semantic tag derived from level; overridable via `as`.",
    },
    {
      name: "StillpointLink",
      role: "Sage-toned text link with subtle underline that brightens on hover. States: default, hover, focus-visible.",
    },
  ],

  howToExtend:
    "Reference existing tokens via var(--stp-*); never invent values. New tokens land in tokens/stillpoint.css under the .stillpoint scope, prefixed --stp-* to avoid collisions with Spruce's own tokens. Components get rendered inside <StillpointScope> so the variables cascade. Follow the established patterns: soft-moderate radius, warm-tinted elevation, slow settled motion, calm voice. The type scale and weight set are deliberately restrained — resist adding more.",

  notIncluded:
    "This foundation covers tokens (typography, color, spacing, radius, elevation, motion in light + dark mode) and five primitives (Button, Card, Input, Heading, Link). Other components — navigation, modals, tabs, forms, lists, audio player, session timer — extend this foundation when /design generates them. Page fragments (home, practice library, reflection screen) land in fragments/.",
} as const;

export const stillpointFoundationsMarkdown = `# Stillpoint Design System Foundation

Generated by /foundations from .spruce.md and .sketch.md. Companion to tokens/stillpoint.css and the primitive components in components/.

## The character

${stillpointFoundations.character}

## Key decisions

${stillpointFoundations.keyDecisions
  .map((d) => `- **${d.label}.** ${d.summary}`)
  .join("\n")}

## Primitive components

${stillpointFoundations.primitives
  .map((p) => `- **${p.name}** — ${p.role}`)
  .join("\n")}

## How to extend

${stillpointFoundations.howToExtend}

## What's not included

${stillpointFoundations.notIncluded}
`;
