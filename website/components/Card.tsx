import type { ComponentProps } from "react";

type Variant = "default" | "quiet" | "outlined";

type CardProps = ComponentProps<"div"> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  default: "bg-surface-elevated border border-rule-subtle",
  quiet: "bg-surface border border-transparent",
  outlined: "bg-transparent border border-rule",
};

export function Card({
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${variants[variant]} rounded-md p-6 md:p-8 ${className}`}
      {...props}
    />
  );
}
