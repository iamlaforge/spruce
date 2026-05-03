import { Button } from "@/components/Button";
import { Container } from "@/components/Section";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";

export function HeroManifesto() {
  return (
    <section className="min-h-[88vh] flex items-center pt-24 pb-20">
      <Container>
        <div className="max-w-4xl">
          <Heading level="eyebrow" className="mb-12 md:mb-16">
            Spruce · For AI coding tools
          </Heading>

          <h1 className="font-display font-normal text-4xl md:text-6xl lg:text-[5.5rem] leading-display tracking-tightest text-ink">
            <span className="block">AI coding tools don&rsquo;t think about design.</span>
            <span className="block text-ink-muted">Spruce teaches them to.</span>
          </h1>

          <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6">
            <p className="col-span-12 md:col-span-7 md:col-start-6 text-lg text-ink-muted leading-relaxed">
              A design reasoning system that installs into Claude Code, Cursor,
              and other AI coding tools. It teaches them how to approach design
              decisions &mdash; and hands you creative-director control over
              every output.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button variant="primary" size="lg">
              Install Spruce
            </Button>
            <Link href="/philosophy" variant="subtle">
              Read the philosophy &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
