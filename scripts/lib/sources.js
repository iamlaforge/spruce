/**
 * Source loader. Reads canonical Spruce source files into memory once
 * so each per-provider transformer can work from in-memory data rather
 * than re-walking the filesystem.
 *
 * Returned shape:
 *   {
 *     skill: { content, frontmatter, body },
 *     philosophy: { content },
 *     contextTemplate: { content },
 *     references: [{ name, content }, ...],   // 13 topic references
 *     commands: [{ name, content, frontmatter, body }, ...],  // 25 command files
 *     paths: { source, templates }
 *   }
 *
 * The `name` on each reference/command is the basename without `.md`.
 * Frontmatter is parsed for skill + commands (transformers need it for
 * the orchestrator's router table); references stay opaque content
 * since transformers copy them through unchanged.
 */

import path from 'node:path';
import { listFiles, readFile } from './utils.js';
import { parseFrontmatter } from './frontmatter.js';

export async function loadSources({ sourceDir, templatesDir }) {
  const skillPath = path.join(sourceDir, 'skills/spruce/SKILL.md');
  const philosophyPath = path.join(sourceDir, 'PHILOSOPHY.md');
  const referenceDir = path.join(sourceDir, 'skills/spruce/reference');
  const commandsDir = path.join(sourceDir, 'commands');
  const contextTemplatePath = path.join(templatesDir, 'spruce-context-template.md');

  const skillContent = await readFile(skillPath);
  const skillParsed = parseFrontmatter(skillContent);

  const philosophyContent = await readFile(philosophyPath);
  const contextTemplateContent = await readFile(contextTemplatePath);

  const referenceFiles = (await listFiles(referenceDir)).filter((f) => f.endsWith('.md'));
  const references = await Promise.all(
    referenceFiles.map(async (file) => ({
      name: file.replace(/\.md$/, ''),
      filename: file,
      content: await readFile(path.join(referenceDir, file)),
    }))
  );

  const commandFiles = (await listFiles(commandsDir)).filter((f) => f.endsWith('.md'));
  const commands = await Promise.all(
    commandFiles.map(async (file) => {
      const content = await readFile(path.join(commandsDir, file));
      const { frontmatter, body } = parseFrontmatter(content);
      return {
        name: file.replace(/\.md$/, ''),
        filename: file,
        content,
        frontmatter,
        body,
      };
    })
  );

  return {
    skill: { content: skillContent, frontmatter: skillParsed.frontmatter, body: skillParsed.body },
    philosophy: { content: philosophyContent },
    contextTemplate: { content: contextTemplateContent },
    references,
    commands,
    paths: { sourceDir, templatesDir, skillPath, philosophyPath, referenceDir, commandsDir, contextTemplatePath },
  };
}
