import NextLink from "next/link";
import type { ComponentProps } from "react";

type Variant = "inline" | "nav" | "subtle";

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: Variant;
  external?: boolean;
};

const variants: Record<Variant, string> = {
  inline:
    "text-accent underline underline-offset-[3px] decoration-1 decoration-accent/30 " +
    "transition-[text-decoration-color,color] duration-fast ease-considered " +
    "hover:decoration-accent",
  nav:
    "text-ink-muted hover:text-ink transition-colors duration-fast ease-considered",
  subtle:
    "text-ink-subtle hover:text-ink transition-colors duration-fast ease-considered",
};

export function Link({
  variant = "inline",
  external = false,
  className = "",
  ...props
}: LinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <NextLink
      className={`${variants[variant]} rounded-sm ${className}`}
      {...externalProps}
      {...props}
    />
  );
}
