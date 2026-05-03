import NextLink from "next/link";
import { Container } from "@/components/Section";
import { Link } from "@/components/Link";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems: Array<{ href: string; label: string; external?: boolean }> = [
  { href: "/designing", label: "Spruce Workflow" },
  { href: "/commands", label: "Commands" },
  { href: "/install", label: "Install" },
  { href: "https://github.com/iamlaforge/spruce", label: "GitHub", external: true },
];

export function Header() {
  return (
    <header className="border-b border-rule-subtle bg-background/80 backdrop-blur-sm">
      <Container width="wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <NextLink
            href="/"
            className="font-display font-normal text-xl md:text-2xl text-ink tracking-tight rounded-sm"
          >
            Spruce.
          </NextLink>

          <nav className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant="nav"
                external={item.external}
                className="hidden sm:inline-block px-3 py-2 text-sm"
              >
                {item.label}
                {item.external ? <span aria-hidden> ↗</span> : null}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
