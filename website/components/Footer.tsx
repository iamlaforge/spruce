import { Container } from "@/components/Section";
import { Link } from "@/components/Link";

export function Footer() {
  return (
    <footer className="border-t border-rule-subtle py-6 md:py-8">
      <Container width="wide">
        <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2 font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          <span>Made with Spruce by Chris Laforge</span>
          <span aria-hidden>&middot;</span>
          <span>Apache 2.0</span>
          <span aria-hidden>&middot;</span>
          <Link href="/faq" variant="subtle">
            FAQ
          </Link>
          <span aria-hidden>&middot;</span>
          <Link
            href="https://github.com/iamlaforge/spruce"
            external
            variant="subtle"
          >
            GitHub <span aria-hidden>↗</span>
          </Link>
          <span aria-hidden>&middot;</span>
          <span>&copy; 2026</span>
        </div>
      </Container>
    </footer>
  );
}
