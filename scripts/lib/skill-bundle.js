/**
 * Skill bundle generator.
 *
 * Given a source command + the full sources, produces the content for
 * a single self-contained skill directory:
 *   - SKILL.md  (frontmatter + Spruce framing preamble + command body)
 *   - PHILOSOPHY.md (bundled in)
 *   - reference/<13 topic refs> (all bundled in)
 *
 * Same bundle is written to each harness path (.claude/skills/<name>/,
 * .cursor/skills/<name>/, .agents/skills/<name>/) since the Anthropic
 * Agent Skills format is harness-agnostic. Per-harness differences are
 * handled outside this function — Claude Code, for example, also gets
 * slash command files at .claude/commands/<name>.md so its slash UX
 * stays preserved alongside the skills installation.
 *
 * Self-contained = no cross-skill loading dependency. When Cursor's
 * matcher fires for a skill, everything that skill needs is already
 * in the same directory.
 */

import { serializeFrontmatter } from './frontmatter.js';

export function buildSkill(command, sources) {
  return {
    skillContent: composeSkillFile(command, sources),
    philosophyContent: sources.philosophy.content,
    references: sources.references,
  };
}

function composeSkillFile(command, sources) {
  const frontmatter = {
    name: command.name,
    description: composeDescription(command),
  };

  const preamble = composeSprucePreamble(command);
  const body = command.body.trim();

  return serializeFrontmatter(frontmatter) + '\n' + preamble + '\n\n---\n\n' + body + '\n';
}

/**
 * The skill's `description` is what Cursor's matcher reads to decide
 * when to fire the skill, and what shows in agent skill listings. We
 * prefix the source description with a Spruce identifier so it's
 * clear which ecosystem the skill belongs to and to bias matching
 * toward broader design intent (not just the literal command name).
 */
function composeDescription(command) {
  const sourceDescription = command.frontmatter.description || `Spruce ${command.name}`;
  return `Spruce design reasoning — ${sourceDescription}`;
}

/**
 * Compressed Spruce framing that sits at the top of every skill so the
 * AI loads the foundational stance whenever any Spruce skill matches.
 *
 * Why compressed (not the full source SKILL.md): each skill bundles
 * the same preamble, so length compounds. ~1.2KB × 25 skills × 3
 * harnesses = ~90KB total redundancy on disk — fine. But context-
 * wise, every skill load includes this preamble, so we keep it tight
 * while still covering the load-bearing principles. Deeper reading
 * is in the bundled PHILOSOPHY.md and reference/ files.
 */
function composeSprucePreamble(command) {
  return `# Spruce skill

You are operating as part of Spruce — a design reasoning system for AI-generated interfaces. Spruce starts with users (HCD foundation: personas, jobs-to-be-done, journeys, scenarios), reasons across the UX substrate and seven design dimensions (typography, color, spatial, components, motion, voice, UX patterns), and keeps the user in the creative-director seat.

## Foundational stance

- **Design is a decision, not a style.** Every element you produce is the result of a choice. When you reach for a default because it's the obvious pattern, slow down and ask whether that default actually serves this specific product.
- **Function is the brief. Aesthetics is the execution.** Establish what something needs to do before deciding how it should look.
- **Context is not optional.** Read the project's \`.spruce.md\` before generating. If \`.personas.md\`, \`.jtbd.md\`, \`.journeys.md\`, or \`.scenarios.md\` exist in the project root, read those too — they're the foundation downstream commands calibrate to.
- **The user is the creative director.** Major decisions get surfaced for the user to direct; minor ones resolve in the direction matching their established preferences. Your default posture is to serve their vision, not override it.
- **Resist the averaged-out safe choice.** AI defaults — Inter typography, purple gradients, 8px-radius rounded rectangles, friendly-professional SaaS voice — work well enough that they don't fail, but they don't succeed at expressing what any specific product is. Notice when you're pulled toward a default and consider what's actually right for this specific context.

## Knowledge available in this skill

This skill bundles Spruce's full reference library:

- \`PHILOSOPHY.md\` — the design philosophy that governs Spruce's reasoning
- \`reference/\` — Discovery references (human-centered-design, personas, jobs-to-be-done, user-journeys, scenarios, research-and-evaluation) and design references (typography, color-and-contrast, spatial-design, component-patterns, motion-and-interaction, ux-writing, ux-decision-patterns)

Load the references relevant to the work. Each reference file teaches the reasoning behind good decisions in its dimension and names the specific anti-patterns to resist.`;
}
