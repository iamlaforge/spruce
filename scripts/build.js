#!/usr/bin/env node

/**
 * Spruce build script
 *
 * Reads canonical source files from source/ and writes the Claude Code
 * distribution to dist/claude-code/. Future providers (Cursor, Gemini, etc.)
 * can be added by extending the PROVIDERS array.
 *
 * Run with: npm run build
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'source');
const TEMPLATES = path.join(ROOT, 'templates');
const DIST = path.join(ROOT, 'dist');

/**
 * Provider configurations.
 *
 * Each provider defines where its files go within the distribution directory.
 * The distribution directory mirrors what a user would install into their
 * project root — for Claude Code, that means .claude/skills/spruce/ etc.
 */
const PROVIDERS = [
  {
    name: 'Claude Code',
    slug: 'claude-code',
    // Where files go inside the provider's dist directory
    // (paths relative to dist/claude-code/)
    skillDir: '.claude/skills/spruce',
    commandsDir: '.claude/commands',
    philosophyPath: '.claude/skills/spruce/PHILOSOPHY.md',
    contextTemplatePath: 'templates/spruce.md'
  }
];

// ---------------------------------------------------------------------------

/**
 * Ensure a directory exists, creating parent directories as needed.
 */
async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Copy a single file from source to destination, ensuring the destination
 * directory exists.
 */
async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}

/**
 * Copy all files from a source directory to a destination directory.
 * Creates destination if it doesn't exist.
 */
async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Clean a provider's distribution directory.
 */
async function cleanProviderDist(provider) {
  const providerDist = path.join(DIST, provider.slug);
  await fs.rm(providerDist, { recursive: true, force: true });
}

/**
 * Build one provider's distribution.
 */
async function buildProvider(provider) {
  const providerDist = path.join(DIST, provider.slug);

  console.log(`\nBuilding ${provider.name}...`);

  // Clean any existing dist
  await cleanProviderDist(provider);

  // 1. Copy SKILL.md to the skill directory
  const skillSrc = path.join(SOURCE, 'skills/spruce/SKILL.md');
  const skillDest = path.join(providerDist, provider.skillDir, 'SKILL.md');
  await copyFile(skillSrc, skillDest);
  console.log(`  Copied SKILL.md`);

  // 2. Copy the reference/ directory into the skill directory
  const referenceSrc = path.join(SOURCE, 'skills/spruce/reference');
  const referenceDest = path.join(providerDist, provider.skillDir, 'reference');
  await copyDir(referenceSrc, referenceDest);
  const referenceFiles = await fs.readdir(referenceSrc);
  console.log(`  Copied ${referenceFiles.length} reference files`);

  // 3. Copy all commands to the commands directory
  const commandsSrc = path.join(SOURCE, 'commands');
  const commandsDest = path.join(providerDist, provider.commandsDir);
  await copyDir(commandsSrc, commandsDest);
  const commandFiles = await fs.readdir(commandsSrc);
  console.log(`  Copied ${commandFiles.length} command files`);

  // 4. Copy PHILOSOPHY.md
  const philosophySrc = path.join(SOURCE, 'PHILOSOPHY.md');
  const philosophyDest = path.join(providerDist, provider.philosophyPath);
  await copyFile(philosophySrc, philosophyDest);
  console.log(`  Copied PHILOSOPHY.md`);

  // 5. Copy the context file template
  const contextSrc = path.join(TEMPLATES, 'spruce-context-template.md');
  const contextDest = path.join(providerDist, provider.contextTemplatePath);
  await copyFile(contextSrc, contextDest);
  console.log(`  Copied context file template`);

  // 6. Generate the install README for this provider
  await generateInstallReadme(provider, providerDist);
  console.log(`  Generated install README`);

  console.log(`  Done. Output: dist/${provider.slug}/`);
}

/**
 * Generate a provider-specific install README.
 */
async function generateInstallReadme(provider, providerDist) {
  const readmeContent = getInstallReadmeContent(provider);
  const readmePath = path.join(providerDist, 'README.md');
  await fs.writeFile(readmePath, readmeContent, 'utf8');
}

/**
 * Return the install README content for a provider.
 * Split into its own function to keep it readable and easy to update.
 */
function getInstallReadmeContent(provider) {
  if (provider.slug === 'claude-code') {
    return `# Spruce for Claude Code

A design reasoning system for AI-generated interfaces, installed into Claude Code.

## Install

1. Copy the \`.claude/\` directory from this bundle into the root of your project:

   \`\`\`bash
   cp -r .claude /path/to/your/project/
   \`\`\`

2. Copy the context file template to your project root and rename it:

   \`\`\`bash
   cp templates/spruce.md /path/to/your/project/.spruce.md
   \`\`\`

3. In your project, open the \`.spruce.md\` file and fill in your project's context — product, audience, character, density, voice direction, and any explicit preferences. You can also run \`/spruce up\` in Claude Code to set it up interactively.

## Usage

Once installed, every Spruce command is available in Claude Code via the \`/\` prefix. Start with:

\`\`\`
/spruce up
\`\`\`

to establish your project's context interactively. Then run any other command:

- \`/design\` — generate new work
- \`/survey\` — review the current state of your project
- \`/critique\` — opinionated design-director feedback
- \`/decide\` — walk through design tradeoffs before generating
- \`/remix\` — see three distinct design directions

The full command list is in \`.claude/commands/\`.

## What's installed

- \`.claude/skills/spruce/SKILL.md\` — The core orchestrating skill.
- \`.claude/skills/spruce/reference/\` — Seven reference files (typography, color, spatial design, components, motion, UX writing, UX decision patterns).
- \`.claude/skills/spruce/PHILOSOPHY.md\` — The design philosophy that governs Spruce's reasoning.
- \`.claude/commands/\` — Nineteen Spruce commands.
- \`templates/spruce.md\` — Template for your project's context file.

## Project structure after install

\`\`\`
your-project/
├── .claude/
│   ├── skills/
│   │   └── spruce/
│   │       ├── SKILL.md
│   │       ├── PHILOSOPHY.md
│   │       └── reference/
│   │           ├── typography.md
│   │           ├── color-and-contrast.md
│   │           └── ...
│   └── commands/
│       ├── design.md
│       ├── survey.md
│       └── ...
├── .spruce.md          ← your project's context
└── (your project files)
\`\`\`

## Learn more

The full Spruce documentation is at the project repository. The philosophy file (\`PHILOSOPHY.md\`) is a good starting point for understanding what Spruce is trying to do and why.
`;
  }

  // Future providers get their own content here
  return `# Spruce for ${provider.name}\n\nInstall instructions coming soon.\n`;
}

/**
 * Main build function.
 */
async function build() {
  console.log('Spruce build starting...');
  console.log(`Source: ${SOURCE}`);
  console.log(`Output: ${DIST}`);

  // Verify source exists
  try {
    await fs.access(SOURCE);
  } catch {
    console.error(`\nError: source directory not found at ${SOURCE}`);
    process.exit(1);
  }

  // Ensure dist exists
  await ensureDir(DIST);

  // Build each provider
  for (const provider of PROVIDERS) {
    try {
      await buildProvider(provider);
    } catch (error) {
      console.error(`\nError building ${provider.name}: ${error.message}`);
      process.exit(1);
    }
  }

  console.log(`\nBuild complete. ${PROVIDERS.length} provider(s) built.`);
}

build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
