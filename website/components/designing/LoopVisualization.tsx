"use client";

import { motion } from "motion/react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { EASE_CONSIDERED } from "@/lib/motion";

/**
 * The iteration loop visualization for the workflow page. Three labels —
 * Decide, Review, Refine — arranged at the corners of a triangle, with
 * three curved connectors between them. The connectors bend inward
 * forming a stylized closed shape that visually communicates "these three
 * intermingle in any order."
 *
 * Motion: when scrolled into view, each curve draws in via Motion's
 * pathLength (stroke-dasharray under the hood) with a small stagger so the
 * three lines feel like one unified motion arc rather than independent
 * animations. Labels fade in after the curves settle. Once landed, the
 * visualization stays still — no perpetual motion (which the .spruce.md
 * "no autoplay burden" anti-pattern explicitly avoids).
 *
 * Reduced-motion is honored automatically — useInViewOnce returns true
 * immediately under prefers-reduced-motion, so the diagram renders at its
 * final state without animation.
 */

const NODES = [
  { name: "Decide", x: 50, y: 18 },
  { name: "Review", x: 15, y: 78 },
  { name: "Refine", x: 85, y: 78 },
];

// Quadratic Bezier curves with inward-bending control points so the three
// sides of the triangle visibly arc rather than reading as a hard polygon.
const EDGES = [
  // Decide ↔ Review (left side, curves inward toward center)
  { from: 0, to: 1, cx: 35, cy: 50 },
  // Decide ↔ Refine (right side, curves inward toward center)
  { from: 0, to: 2, cx: 65, cy: 50 },
  // Review ↔ Refine (bottom, curves inward upward)
  { from: 1, to: 2, cx: 50, cy: 65 },
];

export function LoopVisualization() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-lg mx-auto aspect-square"
      aria-label="The iteration loop: Decide, Review, Refine — three moments that intermingle in any order"
    >
      {/* Hairline curves connecting the three labels. Drawn in with motion's
          pathLength prop, which animates stroke-dasharray under the hood. */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {EDGES.map((edge, i) => {
          const from = NODES[edge.from];
          const to = NODES[edge.to];
          const d = `M ${from.x} ${from.y} Q ${edge.cx} ${edge.cy} ${to.x} ${to.y}`;
          return (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="var(--color-rule-strong)"
              strokeWidth="0.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: inView ? 1 : 0,
                opacity: inView ? 1 : 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.15,
                ease: EASE_CONSIDERED,
              }}
            />
          );
        })}
      </svg>

      {/* Labels positioned at the triangle vertices. Italic Fraunces in ink
          to match the page's editorial register. The radial-gradient
          background fades the curves behind each label so they don't run
          through the typography (same trick as the previous
          SevenDimensions diagram). */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center px-3 py-2"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            background:
              "radial-gradient(ellipse at center, var(--color-background) 50%, transparent 90%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{
            duration: 0.4,
            delay: 1.1 + i * 0.1,
            ease: EASE_CONSIDERED,
          }}
        >
          <p className="font-display italic font-normal text-xl md:text-2xl text-ink leading-snug whitespace-nowrap">
            {node.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
