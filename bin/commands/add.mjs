/**
 * `spruce-skill add` subcommand.
 *
 * Installs Spruce into the user's project. Two pieces:
 *
 *   1. Skills installation via vercel-labs/skills.
 *      Delegates to `npx skills add iamlaforge/spruce`. That tool
 *      auto-detects which harnesses are present (Claude Code, Cursor,
 *      Codex, Gemini, etc.) and installs SKILL.md files to each
 *      harness's expected location.
 *
 *   2. Claude Code slash commands (extra, for Claude Code only).
 *      vercel-labs/skills handles .claude/skills/ but doesn't touch
 *      .claude/commands/, which is where Claude Code's slash UX reads
 *      from. We copy our slash command files there directly so users
 *      get /typeface, /decide, etc. as native slash commands alongside
 *      the skills installation.
 *
 * Flags pass through to `npx skills add`. Common ones:
 *   -y, --yes     Skip prompts; install with defaults
 *   --force       Reinstall even if already present
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, '..', '..');
const REPO = 'iamlaforge/spruce';

export async function add(args) {
  const cwd = process.cwd();

  console.log(`Installing Spruce into ${cwd}...\n`);

  // Step 1: skills installation via vercel-labs/skills.
  try {
    execSync(`npx -y skills add ${REPO} ${args.join(' ')}`.trim(), { stdio: 'inherit' });
  } catch (e) {
    console.error('\nSkills installation failed.');
    process.exit(e.status ?? 1);
  }

  // Step 2: Claude Code slash commands, if Claude Code is in scope.
  // We check for .claude/ in the project; vercel-labs/skills would
  // have created it during step 1 if Claude Code was detected.
  if (existsSync(join(cwd, '.claude'))) {
    console.log('\nClaude Code detected — installing Spruce slash commands...');
    const count = installClaudeCodeSlashCommands(cwd);
    console.log(`Copied ${count} slash command files to .claude/commands/`);
  }

  console.log('\nDone. Spruce is installed.');
  console.log('  In Claude Code: type / to see slash commands (/decide, /typeface, /personas, ...)');
  console.log('  In Cursor: describe a design task or use @<command> (e.g., @decide, @typeface)');
  console.log('\nFirst run: /spruce-up (Claude Code) or @spruce-up (Cursor) to set up your project context.');
}

function installClaudeCodeSlashCommands(cwd) {
  const sourceDir = join(PACKAGE_ROOT, '.claude/commands');
  const destDir = join(cwd, '.claude/commands');

  if (!existsSync(sourceDir)) {
    console.warn(
      `  Warning: package missing .claude/commands/ — slash commands not installed. (Looked in: ${sourceDir})`
    );
    return 0;
  }

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  const files = readdirSync(sourceDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    copyFileSync(join(sourceDir, file), join(destDir, file));
  }
  return files.length;
}
