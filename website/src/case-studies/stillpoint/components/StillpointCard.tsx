import type { HTMLAttributes, ReactNode } from "react";

/**
 * Stillpoint Card primitive — output of /foundations.
 *
 * Paper-like surface for content groupings (session cards, journal
 * entries, settings panels, etc.). Subtle warm-tinted shadow + soft
 * 12px radius to express the paper/ceramic material direction.
 *
 * Visual treatment lives in tokens/stillpoint.css under
 * `.stillpoint .stp-card`. Must be rendered inside a <StillpointScope>.
 *
 * Polymorphic via the `as` prop so the right semantic tag is used
 * (article for self-contained content, section for grouped panels).
 */

type Props = {
  children: ReactNode;
  as?: "div" | "article" | "section";
} & HTMLAttributes<HTMLElement>;

export function StillpointCard({
  className = "",
  children,
  as: Component = "div",
  ...props
}: Props) {
  return (
    <Component
      className={`stp-card${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}
