"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
};

/**
 * Fires once per element per session — when the element first crosses into
 * the viewport. Used for arrival animations on the manifesto, catalog, install
 * section, etc. Avoids the "everything pops in every time" feel of generic
 * scroll-reveal libraries.
 *
 * If `prefers-reduced-motion: reduce` is set, returns `true` immediately so
 * the consumer can render the final state without animation.
 */
export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options: Options = {},
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const { rootMargin = "0px 0px -10% 0px", threshold = 0.1 } = options;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setInView(true);
        return;
      }
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
}
