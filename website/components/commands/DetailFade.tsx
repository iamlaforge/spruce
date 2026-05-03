"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { FADE } from "@/lib/motion";

/**
 * Client wrapper that fades the command detail content when the user
 * navigates between commands. Pathname is the AnimatePresence key, so each
 * slug change triggers an exit on the previous content and an entry on the
 * new one.
 *
 * mode="wait" sequences exit → entry instead of crossfading, keeping the
 * transition focused. The slight upward shift on entry reads as "new
 * content settling in" without the noisy slide of larger transforms.
 *
 * `prefers-reduced-motion: reduce` is honored automatically — the global
 * media-query rule in globals.css crushes CSS transition-duration to ~0,
 * and Motion's own runtime respects the preference for JS-driven motion.
 */
export function DetailFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={FADE}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
