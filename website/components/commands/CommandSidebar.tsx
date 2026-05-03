"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { MARKER_SPRING } from "@/lib/motion";
import { COMMANDS, TIERS } from "./data";

/**
 * The /commands sidebar.
 *
 * On lg+ it renders as a sticky left rail in the layout's grid column.
 * Below lg it collapses: a fixed hamburger button at top-left of the
 * viewport opens a slide-in drawer covering the screen. The drawer auto-
 * closes on navigation (pathname change) and on Escape.
 *
 * Both viewports share the same SidebarNav body — the only difference is
 * the wrapping chrome.
 */
export function CommandSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Body scroll lock while drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Mobile trigger — fixed top-left, hidden on lg+. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command navigation"
        aria-expanded={open}
        aria-controls="command-drawer"
        className="lg:hidden fixed top-4 left-4 z-30 inline-flex items-center gap-2 px-3 py-2 bg-canvas border border-rule rounded-sm font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent transition-colors duration-fast ease-considered"
      >
        <span aria-hidden className="block w-3.5 h-px bg-current" />
        <span aria-hidden className="block w-3.5 h-px bg-current" />
        <span aria-hidden className="block w-3.5 h-px bg-current" />
        <span className="ml-1">Commands</span>
      </button>

      {/* Mobile drawer — fixed overlay with backdrop, hidden on lg+. */}
      {open ? (
        <div
          className="lg:hidden fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Command navigation"
          id="command-drawer"
        >
          <button
            type="button"
            aria-label="Close command navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
          />
          <aside className="absolute inset-y-0 left-0 w-[18rem] max-w-[85%] bg-canvas border-r border-rule overflow-y-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <SidebarHeader pathname={pathname} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="font-mono text-sm text-ink-muted hover:text-accent transition-colors duration-fast ease-considered"
              >
                ✕
              </button>
            </div>
            <SidebarNav pathname={pathname} />
          </aside>
        </div>
      ) : null}

      {/* Desktop sticky rail — hidden below lg. */}
      <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto py-12 pr-4">
        <SidebarHeader pathname={pathname} className="mb-8" />
        <SidebarNav pathname={pathname} />
      </aside>
    </>
  );
}

// ---------------------------------------------------------------------------
// SidebarHeader — small editorial eyebrow that doubles as a Link to the
// /commands index. Active when at /commands (no slug).
// ---------------------------------------------------------------------------

function SidebarHeader({
  pathname,
  className = "",
}: {
  pathname: string;
  className?: string;
}) {
  const isAtIndex = pathname === "/commands";
  return (
    <Link
      href="/commands"
      className={`block font-mono text-2xs uppercase tracking-widest pb-4 border-b border-rule transition-colors duration-fast ease-considered ${
        isAtIndex ? "text-accent" : "text-ink-subtle hover:text-accent"
      } ${className}`}
      aria-current={isAtIndex ? "page" : undefined}
    >
      § Commands
    </Link>
  );
}

// ---------------------------------------------------------------------------
// SidebarNav — the actual list. Tier headings + per-command Links. Active
// state from `pathname`. Em-dash marker on active items so the highlight
// reads as editorial rather than as a software-toolbar selection.
// ---------------------------------------------------------------------------

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Commands">
      {/* LayoutGroup spans every tier so the marker animates across tier
          boundaries (e.g., clicking from a Diagnostic command to a Corrective
          one). The shared layoutId reads as "the active marker is one object
          moving between positions" rather than "marker disappears here, marker
          appears there." */}
      <LayoutGroup>
        {TIERS.map((tier) => (
          <div key={tier.id} className="mb-8 last:mb-0">
            <h2 className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-3">
              {tier.label}{" "}
              <span className="text-ink-subtle/70">({tier.slugs.length})</span>
            </h2>
            <ul role="list" className="list-none space-y-0.5">
              {tier.slugs.map((slug) => {
                const cmd = COMMANDS[slug];
                if (!cmd) return null;
                const href = `/commands/${slug}`;
                const isActive = pathname === href;
                return (
                  <li key={slug} className="relative">
                    {isActive ? (
                      <motion.span
                        layoutId="sidebar-active-marker"
                        aria-hidden
                        className="absolute -left-4 top-1/2 -translate-y-1/2 text-accent font-mono text-sm leading-none"
                        transition={MARKER_SPRING}
                      >
                        —
                      </motion.span>
                    ) : null}
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block font-mono text-sm py-1 transition-colors duration-fast ease-considered ${
                        isActive
                          ? "text-accent"
                          : "text-ink hover:text-accent"
                      }`}
                    >
                      {cmd.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </LayoutGroup>
    </nav>
  );
}
