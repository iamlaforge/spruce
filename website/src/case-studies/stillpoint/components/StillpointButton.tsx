import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Stillpoint Button primitive — output of /foundations.
 *
 * Three variants matching the foundation's accent strategy:
 *   - primary: filled sage. The dominant action.
 *   - secondary: outlined. The supporting action.
 *   - tertiary: ghost. The quiet/cancel action; sage-subtle on hover.
 *
 * All visual treatment lives in tokens/stillpoint.css under
 * `.stillpoint .stp-button`. Component is a minimal JSX wrapper that
 * applies the right class names. Must be rendered inside a
 * <StillpointScope> wrapper so the tokens cascade.
 *
 * States covered: default, hover, active, focus-visible, disabled.
 */

type Variant = "primary" | "secondary" | "tertiary";

type Props = {
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function StillpointButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const variantClass = `stp-button--${variant}`;
  const composed = `stp-button ${variantClass}${
    className ? ` ${className}` : ""
  }`;
  return (
    <button className={composed} {...props}>
      {children}
    </button>
  );
}
