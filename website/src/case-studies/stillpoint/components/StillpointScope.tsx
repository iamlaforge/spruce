import type { ReactNode } from "react";

/**
 * Wraps Stillpoint UI in the `.stillpoint` CSS scope so the tokens in
 * `tokens/stillpoint.css` cascade to its children. Use this around any
 * Stillpoint component or fragment rendered inside the catalog's demos
 * so Stillpoint's design system never leaks into Spruce's own brand.
 *
 * Usage:
 *   <StillpointScope>
 *     <StillpointButton />
 *     <StillpointHomeFragment />
 *   </StillpointScope>
 *
 * The component is intentionally minimal — it's just the wrapper that
 * applies the scope class. All actual styling comes from the imported
 * tokens.css plus components inside the scope referencing those tokens
 * via var(--stp-*) names.
 */
export function StillpointScope({
  children,
  className = "",
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Default 'div'. Use semantic tags (article, section) when fitting. */
  as?: "div" | "article" | "section" | "main";
}) {
  return (
    <Component className={`stillpoint${className ? ` ${className}` : ""}`}>
      {children}
    </Component>
  );
}
