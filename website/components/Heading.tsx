import type { ComponentProps, ElementType, ReactNode } from "react";

type Level = "display" | "h1" | "h2" | "h3" | "h4" | "eyebrow";

const styles: Record<Level, string> = {
  display:
    "font-display font-normal text-4xl md:text-5xl leading-display tracking-tightest text-ink",
  h1:
    "font-display font-normal text-3xl md:text-4xl leading-display tracking-tight text-ink",
  h2:
    "font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink",
  h3:
    "font-sans font-semibold text-xl md:text-2xl leading-tight tracking-snug text-ink",
  h4:
    "font-sans font-semibold text-lg md:text-xl leading-snug tracking-snug text-ink",
  eyebrow:
    "font-sans font-medium text-2xs uppercase tracking-widest text-ink-subtle",
};

const defaultTag: Record<Level, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  eyebrow: "p",
};

type HeadingProps = Omit<ComponentProps<"h1">, "ref"> & {
  level?: Level;
  as?: ElementType;
  children?: ReactNode;
};

export function Heading({
  level = "h2",
  as,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? defaultTag[level];
  return (
    <Tag className={`${styles[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
