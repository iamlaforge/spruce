import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Stillpoint Link primitive — output of /foundations.
 *
 * Subtle but present text link. Default underline is sage-subtle
 * (low contrast); on hover the underline brightens to sage. The link
 * itself is sage-toned, not the text-color, so links read as
 * interactive without shouting.
 *
 * Visual treatment lives in tokens/stillpoint.css under
 * `.stillpoint .stp-link`. Must be rendered inside a <StillpointScope>.
 *
 * States covered: default, hover, focus-visible.
 */

type Props = {
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function StillpointLink({ className = "", children, ...props }: Props) {
  return (
    <a
      className={`stp-link${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
