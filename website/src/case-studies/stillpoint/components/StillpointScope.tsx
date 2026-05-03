import type { ReactNode } from "react";

/**
 * Wraps Stillpoint UI in the `.stillpoint` CSS scope so the tokens in
 * `tokens/stillpoint.css` cascade to its children. Use this around any
 * Stillpoint component or fragment rendered inside the catalog's demos
 * so Stillpoint's design system never leaks into Spruce's own brand.
 *
 * Theme behavior:
 *   - 'inherit' (default) — the scope follows ancestor html.dark via
 *     CSS cascade. Spruce dark → Stillpoint dark, automatically. Right
 *     for catalog demos where the embedded surface should match the
 *     surrounding Spruce shell.
 *   - 'light' / 'dark' — the scope sets data-theme explicitly, winning
 *     over the cascade. Right for /case-study, where Stillpoint owns
 *     its own theme state separately from Spruce's.
 *
 * Usage:
 *   <StillpointScope>{...}</StillpointScope>          // cascades
 *   <StillpointScope theme="dark">{...}</StillpointScope>  // forced
 *
 * The component is intentionally minimal — it's just the wrapper that
 * applies the scope class plus the optional theme attribute. All actual
 * styling comes from tokens.css plus components inside the scope.
 */

export type StillpointTheme = "inherit" | "light" | "dark";

export function StillpointScope({
  children,
  className = "",
  as: Component = "div",
  theme = "inherit",
}: {
  children: ReactNode;
  className?: string;
  /** Default 'div'. Use semantic tags (article, section) when fitting. */
  as?: "div" | "article" | "section" | "main";
  theme?: StillpointTheme;
}) {
  const dataTheme = theme === "inherit" ? undefined : theme;
  return (
    <Component
      className={`stillpoint${className ? ` ${className}` : ""}`}
      data-theme={dataTheme}
    >
      {children}
    </Component>
  );
}
