import type { ButtonHTMLAttributes, Ref } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-sm " +
  "transition-[background-color,border-color,color] duration-fast ease-considered " +
  "disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "bg-transparent text-ink border border-rule hover:bg-surface hover:border-rule-strong active:bg-surface-elevated",
  ghost:
    "bg-transparent text-ink-muted hover:text-ink hover:bg-surface active:bg-surface-elevated",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-pill border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}
