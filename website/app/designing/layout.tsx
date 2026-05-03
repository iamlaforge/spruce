import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DesigningTabBar } from "@/components/designing/DesigningTabBar";

/**
 * Shared layout for /designing and its descendants. Provides the global
 * Header, the Workflow / Tutorials tab bar, and the Footer. Each page
 * provides its own hero/intro + content.
 */
export default function DesigningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <DesigningTabBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
