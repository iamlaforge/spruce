import type { InputHTMLAttributes } from "react";

/**
 * Stillpoint Input primitive — output of /foundations.
 *
 * Text input with calm sage focus ring. Visual treatment lives in
 * tokens/stillpoint.css under `.stillpoint .stp-input`. Must be
 * rendered inside a <StillpointScope> wrapper.
 *
 * States covered: default, hover, focus, disabled, with placeholder.
 *
 * For form composition, pair with a <label> for accessibility — the
 * primitive doesn't enforce a labeling pattern so consumers can apply
 * the convention that fits their layout.
 */

export function StillpointInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`stp-input${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
