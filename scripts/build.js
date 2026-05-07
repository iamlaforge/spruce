#!/usr/bin/env node

/**
 * Spruce build orchestrator.
 *
 * Generates 25 self-contained skill directories (one per command) and
 * writes them to the harness-specific paths at the repo root that
 * vercel-labs/skills reads from when users run `npx spruce-skill add`
 * (which delegates to `npx skills add iamlaforge/spruce`).
 *
 * Output layout:
 *   .claude/skills/<command>/SKILL.md + PHILOSOPHY.md + reference/
 *   .claude/commands/<command>.md           ← Claude Code slash commands (preserved)
 *   .cursor/skills/<command>/SKILL.md + PHILOSOPHY.md + reference/
 *   .agents/skills/<command>/SKILL.md + PHILOSOPHY.md + reference/
 *
 * Each skill is self-contained: bundles all 13 topic references plus
 * PHILOSOPHY.md so it has everything it needs without cross-skill
 * loading dependencies (the smoke-test failure mode this morning).
 *
 * The .claude/commands/ files are preserved separately because Claude
 * Code's slash UX reads from there, distinct from the skills system.
 *
 * Run with: npm run build
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSources } from './lib/sources.js';
import { buildSkill } from './lib/skill-bundle.js';
import { writeFile, rmDir } from './lib/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'source');
const TEMPLATES = path.join(ROOT, 'templates');

const HARNESS_SKILL_DIRS = [
  { name: 'Claude Code', path: path.join(ROOT, '.claude/skills') },
  { name: 'Cursor', path: path.join(ROOT, '.cursor/skills') },
  { name: 'GitHub Copilot (VS Code)', path: path.join(ROOT, '.github/skills') },
  { name: 'agents (harness-agnostic)', path: path.join(ROOT, '.agents/skills') },
];

const CLAUDE_COMMANDS_DIR = path.join(ROOT, '.claude/commands');

async function build() {
  console.log('Spruce build starting...');

  const sources = await loadSources({ sourceDir: SOURCE, templatesDir: TEMPLATES });
  console.log(
    `  Loaded ${sources.commands.length} commands, ${sources.references.length} references.`
  );

  // Clean each output location so we don't ship stale skills if a
  // command was renamed/removed in source.
  for (const harness of HARNESS_SKILL_DIRS) {
    await rmDir(harness.path);
  }
  await rmDir(CLAUDE_COMMANDS_DIR);

  // Generate each skill bundle once, write to every harness path.
  let skillDirsWritten = 0;
  for (const cmd of sources.commands) {
    const bundle = buildSkill(cmd, sources);
    for (const harness of HARNESS_SKILL_DIRS) {
      const skillDir = path.join(harness.path, cmd.name);
      await writeSkill(skillDir, bundle);
      skillDirsWritten++;
    }
  }

  // Claude Code bonus: slash commands at .claude/commands/<command>.md.
  // The slash UX reads from this directory; keeping it preserves
  // /typeface, /decide, etc. as first-class slash commands alongside
  // the Anthropic Agent Skills installation.
  for (const cmd of sources.commands) {
    await writeFile(path.join(CLAUDE_COMMANDS_DIR, cmd.filename), cmd.content);
  }

  console.log('\nBuild complete:');
  console.log(`  ${sources.commands.length} skills × ${HARNESS_SKILL_DIRS.length} harnesses = ${skillDirsWritten} skill directories`);
  console.log(`  ${sources.commands.length} Claude Code slash commands at .claude/commands/`);
}

async function writeSkill(skillDir, bundle) {
  await writeFile(path.join(skillDir, 'SKILL.md'), bundle.skillContent);
  await writeFile(path.join(skillDir, 'PHILOSOPHY.md'), bundle.philosophyContent);
  for (const ref of bundle.references) {
    await writeFile(path.join(skillDir, 'reference', ref.filename), ref.content);
  }
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
