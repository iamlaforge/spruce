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
  /** When true, applies the `.stp-card--interactive` modifier — cursor
   *  pointer + subtle lift and shadow deepen on hover. Used for cards
   *  that act as tap targets (practice cards, etc.). */
  interactive?: boolean;
} & HTMLAttributes<HTMLElement>;

export function StillpointCard({
  className = "",
  children,
  as: Component = "div",
  interactive = false,
  ...props
}: Props) {
  const cls = [
    "stp-card",
    interactive ? "stp-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Component className={cls} {...props}>
      {children}
    </Component>
  );
}
