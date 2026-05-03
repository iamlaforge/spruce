import type { HTMLAttributes, ReactNode } from "react";

/**
 * Stillpoint Heading primitive — output of /foundations.
 *
 * Five hierarchical levels matching the type scale. Display through
 * section render in Lora (editorial serif); minor renders in the sans
 * (humanist, UI-leaning) so labels read as interface rather than as
 * editorial moments.
 *
 * Levels:
 *   - display: 48px — page hero / first-impression display
 *   - page:    36px — page titles
 *   - section: 28px — section headings
 *   - sub:     22px — subsections
 *   - minor:   18px sans (medium weight) — UI labels, group titles
 *
 * Visual treatment lives in tokens/stillpoint.css under
 * `.stillpoint .stp-heading`. Must be rendered inside a <StillpointScope>.
 *
 * Default semantic tag is derived from the level (display/page → h1,
 * section → h2, sub → h3, minor → h4) but can be overridden via `as`
 * when the heading's place in the document outline differs from its
 * visual size.
 */

type Level = "display" | "page" | "section" | "sub" | "minor";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const LEVEL_TO_TAG: Record<Level, HeadingTag> = {
  display: "h1",
  page: "h1",
  section: "h2",
  sub: "h3",
  minor: "h4",
};

type Props = {
  level?: Level;
  /** Override the default tag derived from `level`. */
  as?: HeadingTag;
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export function StillpointHeading({
  level = "section",
  as,
  className = "",
  children,
  ...props
}: Props) {
  const Tag = as ?? LEVEL_TO_TAG[level];
  return (
    <Tag
      className={`stp-heading stp-heading--${level}${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </Tag>
  );
}
