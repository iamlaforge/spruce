"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { FADE, LAYOUT_FLIP } from "@/lib/motion";

export type Phase = 0 | 1 | 2 | 3 | 4 | 5;

type SurfaceDashboardProps = {
  phase: Phase;
  className?: string;
};

/**
 * The Dashboard surface — a financial/analytics product. AI default is
 * realistic dashboard output from contemporary AI tools: white background,
 * system-ui type, mild blue accents, decorated metric cards on top with
 * emoji icons, bar chart in its own card below. Generic enough that a
 * thoughtful viewer recognizes it from their own work — not a strawman.
 *
 * Each command produces a chart-product-specific transformation:
 *   /arrange   establishes hierarchy — chart promoted to the visual
 *              centerpiece, metrics demoted to a supporting strip below
 *   /typeface  IBM Plex Sans + Mono; tabular numerals on metrics; the
 *              greeting gives way to a specific chart title
 *   /colorgrade  cool slate; the peak bar is the only color moment (amber)
 *   /reduce    emoji icons stripped, trend arrows muted, metric and chart
 *              card decoration removed, grid lines stripped, header tightens
 *   /refine    consistent radii, hover state on bars
 */

const aiFontStyle: CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
};

const dashSansStyle: CSSProperties = {
  fontFamily: "var(--font-plex-sans), system-ui, sans-serif",
};

const dashMonoStyle: CSSProperties = {
  fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
};

// 14 days of synthetic activity data — heights as percentages.
const chartData = [42, 68, 51, 73, 88, 62, 77, 91, 56, 82, 95, 71, 86, 100];
const peakIndex = chartData.indexOf(Math.max(...chartData));
// Day-of-week labels for each bar — anchor the chart in real time.
const chartLabels = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"];

type Metric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
};

const metrics: Metric[] = [
  { label: "Revenue", value: "$24,580", change: "+12.4%", trend: "up", icon: "💰" },
  { label: "Active Users", value: "1,284", change: "+8.1%", trend: "up", icon: "👥" },
  { label: "Conversion", value: "3.2%", change: "-2.3%", trend: "down", icon: "📈" },
];

export function SurfaceDashboard({ phase, className = "" }: SurfaceDashboardProps) {
  const post = (n: number) => phase >= n;
  const isAfterArrange = post(1);
  const isAfterTypeface = post(2);
  const isAfterColor = post(3);
  const isAfterReduce = post(4);
  const isAfterRefine = post(5);

  const containerStyle = isAfterTypeface ? dashSansStyle : aiFontStyle;
  const monoStyle: CSSProperties = isAfterTypeface ? dashMonoStyle : {};

  // Palette — AI default is plain white with mild blue accents (the
  // contemporary AI-tool default); /colorgrade brings cool slate.
  const containerBg = isAfterColor ? "bg-slate-50" : "bg-white";
  const containerText = isAfterColor ? "text-slate-900" : "text-gray-900";
  const subtleText = isAfterColor ? "text-slate-500" : "text-gray-500";

  // Bars — solid blue default; /colorgrade swaps in slate with an amber peak.
  const barDefault = isAfterColor ? "bg-slate-300" : "bg-blue-500";
  const barPeak = isAfterColor ? "bg-amber-600" : "bg-blue-500";
  const barRadius = isAfterRefine ? "rounded-sm" : "rounded-t-md";

  // Metric card decoration — bordered + mild shadow default; tightens at
  // /arrange; gone at /reduce.
  const metricCardClass = isAfterReduce
    ? ""
    : isAfterColor
      ? `border border-slate-200 ${isAfterRefine ? "rounded-md" : "rounded-xl"} ${
          isAfterArrange ? "p-2.5" : "p-3"
        } bg-white`
      : `border border-gray-200 shadow-sm ${isAfterRefine ? "rounded-md" : "rounded-xl"} ${
          isAfterArrange ? "p-2.5" : "p-3"
        } bg-white`;

  // Chart container — bordered + mild shadow default; gone at /reduce.
  const chartCardClass = isAfterReduce
    ? ""
    : isAfterColor
      ? `border border-slate-200 ${isAfterRefine ? "rounded-md" : "rounded-xl"} p-2.5 bg-white`
      : `border border-gray-200 shadow-sm ${isAfterRefine ? "rounded-md" : "rounded-xl"} p-3 bg-white`;

  // Display weight — Plex Medium post-/typeface; geometric heavy bold before.
  const displayWeight = isAfterTypeface ? "font-medium tracking-tight" : "font-bold tracking-tight";

  // Label class
  const labelClass = isAfterTypeface
    ? "text-[10px] uppercase tracking-widest font-medium"
    : "text-[10px] font-semibold";

  // Header — at /reduce, "Sales Overview" is split into editorial
  // eyebrow + title so the surface stays unmistakably a sales dashboard.
  const headerEyebrowVisible = isAfterReduce;
  const headerTitle = isAfterReduce
    ? "Sales"
    : isAfterTypeface
      ? "Sales Overview"
      : "Welcome back, Chris";
  const showSub = !isAfterTypeface;
  const dateLabel = "Last 14 days";

  // Trend colors — green/red until /colorgrade mutes both to slate.
  const trendUpColor = isAfterColor ? "text-slate-500" : "text-green-600";
  const trendDownColor = isAfterColor ? "text-slate-500" : "text-red-600";

  // Toggles
  const showIcons = !isAfterReduce;
  const showTrendArrow = !isAfterReduce;
  const showGridLines = !isAfterReduce;

  // Layout — phase 0 has metrics on top (chunky), chart below (subordinate).
  // After /arrange, chart is promoted to the visual centerpiece.
  const metricsOrder = isAfterArrange ? "order-2" : "order-1";
  const chartOrder = isAfterArrange ? "order-1" : "order-2";

  return (
    // surface-morph (defined in globals.css) transitions colors, radii,
    // padding, font-weight, etc. on every descendant — so when phase classes
    // flip between phases, the swap animates rather than snaps. LayoutGroup
    // bundles the metrics + chart wrappers so motion's layout prop animates
    // their order swap at /arrange via FLIP.
    <LayoutGroup>
      <div
        style={containerStyle}
        className={`surface-morph ${containerBg} ${containerText} h-full p-5 md:p-6 flex flex-col gap-3 md:gap-4 overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="flex items-baseline justify-between shrink-0 gap-3">
          <div className="min-w-0">
            <AnimatePresence>
              {headerEyebrowVisible ? (
                <motion.p
                  key="header-eyebrow"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={FADE}
                  style={monoStyle}
                  className={`${labelClass} ${subtleText} mb-0.5`}
                >
                  Overview
                </motion.p>
              ) : null}
            </AnimatePresence>
            <h2 className={`${displayWeight} text-base md:text-lg ${containerText} truncate`}>
              {headerTitle}
            </h2>
            <AnimatePresence>
              {showSub ? (
                <motion.p
                  key="header-sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE}
                  className={`text-xs ${subtleText} mt-0.5`}
                >
                  Here&apos;s your performance overview
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
          {isAfterReduce ? (
            <span style={monoStyle} className={`${labelClass} ${subtleText} shrink-0`}>
              {dateLabel} ↓
            </span>
          ) : (
            <button
              type="button"
              style={containerStyle}
              className={`shrink-0 text-[11px] font-medium px-2.5 py-1 ${
                isAfterColor
                  ? "border border-slate-300 bg-white text-slate-700"
                  : "border border-gray-300 bg-white text-gray-700"
              } ${isAfterRefine ? "rounded" : "rounded-md"}`}
            >
              {dateLabel} ▾
            </button>
          )}
        </div>

        {/* Metrics row — three cards by default; supporting strip after /arrange.
            motion.div with layoutId animates the order swap with the chart. */}
        <motion.div
          layout
          layoutId="dashboard-metrics-row"
          transition={LAYOUT_FLIP}
          className={`shrink-0 ${metricsOrder} grid grid-cols-3 ${
            isAfterArrange ? "gap-3" : "gap-2"
          }`}
        >
          {metrics.map((m) => (
            <div key={m.label} className={metricCardClass}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <AnimatePresence>
                  {showIcons ? (
                    <motion.span
                      key="icon"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={FADE}
                      aria-hidden
                      className="text-sm leading-none overflow-hidden"
                    >
                      {m.icon}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
                <p style={monoStyle} className={`${labelClass} ${subtleText}`}>
                  {m.label}
                </p>
              </div>
              <p
                style={monoStyle}
                className={`${displayWeight} text-sm md:text-base ${containerText} leading-none`}
              >
                {m.value}
              </p>
              <p
                style={monoStyle}
                className={`text-[10px] mt-1 font-medium ${
                  isAfterReduce
                    ? "text-slate-700 tracking-wide"
                    : m.trend === "up"
                      ? trendUpColor
                      : trendDownColor
                }`}
              >
                {showTrendArrow ? `${m.trend === "up" ? "↑" : "↓"} ` : ""}
                {m.change}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Chart — flex-1 to fill remaining vertical. layoutId pairs with the
            metrics row so the /arrange order swap animates as one synchronized
            move. */}
        <motion.div
          layout
          layoutId="dashboard-chart"
          transition={LAYOUT_FLIP}
          className={`${chartOrder} flex-1 min-h-0 ${chartCardClass} flex flex-col`}
        >
          <div className="flex-1 min-h-0 relative">
            <AnimatePresence>
              {showGridLines ? (
                <motion.div
                  key="gridlines"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE}
                  className="absolute inset-0 flex flex-col justify-between pointer-events-none"
                  aria-hidden
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`border-t border-dashed ${
                        isAfterColor ? "border-slate-200" : "border-gray-200"
                      }`}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="absolute inset-0 flex items-end gap-1">
              {chartData.map((value, i) => {
                const isPeak = i === peakIndex && isAfterColor;
                return (
                  <div
                    key={i}
                    style={{ height: `${value}%` }}
                    className={`flex-1 ${isPeak ? barPeak : barDefault} ${barRadius} ${
                      isAfterRefine ? "hover:opacity-80" : ""
                    }`}
                  />
                );
              })}
            </div>
          </div>
          {/* Day-of-week labels — anchor the chart in real time. */}
          <div className="shrink-0 mt-1.5 flex items-center gap-1">
            {chartLabels.map((label, i) => (
              <p
                key={i}
                style={monoStyle}
                className={`flex-1 text-center text-[8px] ${subtleText} leading-none`}
              >
                {label}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
