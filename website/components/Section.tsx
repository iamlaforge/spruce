import type { ComponentProps, ReactNode } from "react";

type Tone = "default" | "muted" | "inverse";
type Width = "reading" | "standard" | "wide";

const tones: Record<Tone, string> = {
  default: "bg-background text-ink",
  muted: "bg-surface text-ink",
  inverse: "bg-ink text-ink-inverse",
};

const widths: Record<Width, string> = {
  reading: "max-w-2xl",    // ~672px — narrow prose only
  standard: "max-w-7xl",   // ~1280px — default; matches the header so sections
                           //           don't feel concentrated in the middle
                           //           on wide viewports. Asymmetric column
                           //           placements within sections still create
                           //           the editorial offset.
  wide: "max-w-7xl",       // ~1280px — alias of standard for now; reserved
                           //           for an even wider treatment later.
};

type SectionProps = ComponentProps<"section"> & {
  tone?: Tone;
  bare?: boolean;
  children?: ReactNode;
};

export function Section({
  tone = "default",
  bare = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${tones[tone]} ${bare ? "" : "py-20 md:py-28"} ${className}`}
      {...props}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}

type ContainerProps = ComponentProps<"div"> & {
  width?: Width;
};

export function Container({
  width = "standard",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${widths[width]} px-6 md:px-8 ${className}`}
      {...props}
    />
  );
}
