/**
 * Shared filesystem helpers used by build.js and the per-provider
 * transformers. Kept tiny on purpose — anything more substantial that
 * would belong here probably belongs in the transformer that needs it.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

export async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}

export async function copyDir(src, dest) {
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

export async function writeFile(dest, content) {
  await ensureDir(path.dirname(dest));
  await fs.writeFile(dest, content, 'utf8');
}

export async function readFile(src) {
  return fs.readFile(src, 'utf8');
}

export async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isFile()).map((e) => e.name);
}

export async function rmDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}
