/**
 * Tiny YAML frontmatter parser/serializer scoped to the shapes Spruce
 * uses in source command and skill files:
 *
 *   ---
 *   name: typeface
 *   description: Apply typography discipline to an existing interface...
 *   user-invocable: true
 *   ---
 *
 * Not a general YAML parser. Handles plain `key: value` lines and
 * continuation lines (unindented prose that follows a value, joined
 * with a single space) — which is what `description:` typically uses.
 *
 * If the source frontmatter ever grows nested structures (lists, maps),
 * swap this for a real YAML library. Until then, the smaller surface
 * is worth the simpler code.
 */

const FENCE = '---';

/**
 * Parse a markdown file's leading frontmatter block.
 * Returns { frontmatter: object, body: string }.
 * Body excludes the closing fence and the newline after it.
 */
export function parseFrontmatter(content) {
  if (!content.startsWith(FENCE + '\n')) {
    return { frontmatter: {}, body: content };
  }
  const end = content.indexOf('\n' + FENCE + '\n', FENCE.length + 1);
  if (end === -1) {
    return { frontmatter: {}, body: content };
  }
  const fmText = content.slice(FENCE.length + 1, end);
  const body = content.slice(end + ('\n' + FENCE + '\n').length);

  const frontmatter = {};
  const lines = fmText.split('\n');
  let currentKey = null;
  let currentValue = [];

  const flush = () => {
    if (currentKey === null) return;
    const joined = currentValue.join(' ').trim();
    // Coerce booleans for known boolean keys; everything else is a string.
    if (joined === 'true') frontmatter[currentKey] = true;
    else if (joined === 'false') frontmatter[currentKey] = false;
    else frontmatter[currentKey] = joined;
  };

  for (const line of lines) {
    const m = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
    if (m) {
      flush();
      currentKey = m[1];
      currentValue = m[2] ? [m[2]] : [];
    } else if (currentKey !== null && line.trim()) {
      currentValue.push(line.trim());
    }
  }
  flush();

  return { frontmatter, body };
}

/**
 * Serialize a frontmatter object back to a YAML-ish block. Long strings
 * stay on one line — Cursor and Claude Code both tolerate long single-
 * line descriptions, and multi-line YAML scalars introduce parser risk.
 *
 * Keys are written in insertion order.
 */
export function serializeFrontmatter(fm) {
  const lines = [FENCE];
  for (const [k, v] of Object.entries(fm)) {
    if (v === undefined || v === null) continue;
    lines.push(`${k}: ${v}`);
  }
  lines.push(FENCE);
  return lines.join('\n') + '\n';
}

/**
 * Convenience: rewrite a file's frontmatter via a transformer function
 * and return the new full content. Body is preserved verbatim.
 */
export function rewriteFrontmatter(content, transform) {
  const { frontmatter, body } = parseFrontmatter(content);
  const next = transform({ ...frontmatter });
  return serializeFrontmatter(next) + body;
}
