import type { ReactNode } from "react";
import { CommandSidebar } from "@/components/commands/CommandSidebar";
import { DetailFade } from "@/components/commands/DetailFade";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

/**
 * Persistent shell for all /commands routes. The sidebar lives here so it
 * survives client-side navigation between commands without re-mounting.
 *
 * Grid: 240px sidebar + 1fr main on lg+; single column below lg with the
 * sidebar collapsing into a drawer (handled inside CommandSidebar).
 */
export default function CommandsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-x-12 xl:gap-x-16">
            <CommandSidebar />
            <div className="py-10 lg:py-14 lg:min-h-[calc(100vh-8rem)]">
              <DetailFade>{children}</DetailFade>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
