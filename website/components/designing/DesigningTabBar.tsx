"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "motion/react";
import { MARKER_SPRING } from "@/lib/motion";

/**
 * Tab bar that sits below the global Header on every page under
 * /designing. Two tabs: Workflow (the loop) and Tutorials (walkthroughs
 * for specific scenarios).
 *
 * Active state is derived from the URL via usePathname:
 *   - "Workflow" is active when path is exactly /designing
 *   - "Tutorials" is active for /designing/tutorials and any descendant
 *     (e.g., /designing/tutorials/starting-from-scratch)
 *
 * The accent underline on the active tab uses motion's shared-layout
 * (layoutId) so it slides between tabs as visitors navigate, matching
 * the home-page Demonstration tab strip and BeforeAfterDemo toggle.
 */

const TABS = [
  { href: "/designing", label: "Workflow" },
  { href: "/designing/tutorials", label: "Tutorials" },
];

export function DesigningTabBar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-rule-subtle bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <nav
          role="tablist"
          aria-label="Designing sections"
          className="flex items-center gap-8"
        >
          <LayoutGroup>
            {TABS.map((tab) => {
              const isActive =
                tab.href === "/designing"
                  ? pathname === "/designing"
                  : pathname === tab.href ||
                    pathname.startsWith(tab.href + "/");
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  role="tab"
                  aria-selected={isActive}
                  className={`relative font-mono text-2xs uppercase tracking-widest py-4 -mb-px border-b-2 border-transparent transition-colors duration-fast ease-considered ${
                    isActive ? "text-accent" : "text-ink-subtle hover:text-ink"
                  }`}
                >
                  {tab.label}
                  {isActive ? (
                    <motion.span
                      layoutId="designing-tab-underline"
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                      transition={MARKER_SPRING}
                    />
                  ) : null}
                </Link>
              );
            })}
          </LayoutGroup>
        </nav>
      </div>
    </div>
  );
}
