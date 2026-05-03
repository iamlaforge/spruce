import type { ReactNode } from "react";
import { Heading } from "@/components/Heading";

type SectionHeaderProps = {
  /** The eyebrow content. Rendered as h2 for screen-reader navigation. */
  children: ReactNode;
  /** Right-side editorial mark. Defaults to `§`. Pass `null` to omit. */
  mark?: string | null;
  /** Additional classes applied to the outer wrapper. */
  className?: string;
};

/**
 * The standard editorial section header: small mono uppercase eyebrow on the
 * left, a quiet typographic mark on the right, hairline rule beneath. The
 * eyebrow is rendered as h2 so each section is navigable by assistive tech.
 */
export function SectionHeader({
  children,
  mark = "§",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-baseline justify-between border-b border-rule pb-4 mb-12 md:mb-16 ${className}`}
    >
      <Heading level="eyebrow" as="h2">
        {children}
      </Heading>
      {mark ? (
        <span
          aria-hidden
          className="hidden md:inline font-mono text-2xs uppercase tracking-widest text-ink-subtle"
        >
          {mark}
        </span>
      ) : null}
    </div>
  );
}
