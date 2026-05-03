import type { ReactNode } from "react";

type Size = "lg" | "md" | "sm";

const sizeStyles: Record<Size, string> = {
  // lg — install command at full prominence; centerpiece treatment with the
  // strongest border, biggest padding, biggest type.
  lg: "border border-rule rounded-md px-6 py-5 md:px-8 md:py-6 text-lg md:text-xl",
  // md — same border weight as lg but smaller; for code blocks living in
  // narrower columns or beside other dominant content (parallel layouts).
  md: "border border-rule rounded-md px-5 py-4 md:px-6 md:py-5 text-base md:text-lg",
  // sm — secondary code reference. Subtler border, sharper corners, smaller
  // type; for command examples that aren't the section's centerpiece.
  sm: "border border-rule-subtle rounded-sm px-4 py-3 text-sm md:text-base",
};

type CodeBlockProps = {
  /** Size variant. Drives padding, border weight, type size, and corner radius. */
  size?: Size;
  /** Prompt prefix character — `$` for shell, `›` for Claude Code commands.
   *  Pass `null` to omit. Always rendered in the spruce accent and hidden from
   *  assistive tech. */
  prompt?: string | null;
  /** Additional classes (margin, layout) applied to the outer block. */
  className?: string;
  children: ReactNode;
};

export function CodeBlock({
  size = "lg",
  prompt = "›",
  className = "",
  children,
}: CodeBlockProps) {
  const promptMargin = size === "sm" ? "mr-2" : "mr-3";
  return (
    <div className={`bg-surface font-mono leading-snug ${sizeStyles[size]} ${className}`}>
      {prompt ? (
        <span aria-hidden className={`text-accent select-none ${promptMargin}`}>
          {prompt}
        </span>
      ) : null}
      <span className="text-ink">{children}</span>
    </div>
  );
}
