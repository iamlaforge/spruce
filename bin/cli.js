#!/usr/bin/env node

/**
 * spruce-skill CLI entry point.
 *
 * Branded wrapper around vercel-labs/skills (the open agent-skills
 * installer). Modeled on Impeccable's pattern (their `npx impeccable
 * skills install` shells out to `npx skills add pbakaus/impeccable`).
 *
 * Usage:
 *   npx spruce-skill add        Install Spruce into your project
 *   npx spruce-skill help       Show this help
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '-h' || command === '--help') {
  console.log(usage());
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
  console.log(pkg.version);
  process.exit(0);
}

if (command === 'add') {
  const { add } = await import('./commands/add.mjs');
  await add(args.slice(1));
} else {
  console.error(`Unknown command: ${command}`);
  console.error('Run `spruce-skill help` for usage.');
  process.exit(1);
}

function usage() {
  return `Usage: spruce-skill <command> [options]

Commands:
  add      Install Spruce into your project (auto-detects harness)
  help     Show this help

Options:
  --version, -v   Show version
  --help, -h      Show this help

Powered by vercel-labs/skills (https://github.com/vercel-labs/skills) for
harness detection and per-harness skill placement.
`;
}
