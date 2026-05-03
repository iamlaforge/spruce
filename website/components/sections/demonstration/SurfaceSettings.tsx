"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FADE } from "@/lib/motion";
import type { Phase } from "./SurfaceDashboard";

type SurfaceSettingsProps = {
  phase: Phase;
  className?: string;
};

/**
 * The Settings surface — an enterprise admin / developer-tool context.
 * Structural layout is sidebar-nav + main-panel: the settings sections are
 * navigation-organized rather than stacked-on-the-page. AI default is
 * realistic settings output from contemporary AI tools: white background,
 * system-ui type, mild blue accents, friendly greeting with a subtitle,
 * emoji sidebar icons, blue save button.
 *
 * Each command produces a settings-product-specific transformation:
 *   /arrange   sidebar items get consistent rhythm; main-panel form fields
 *              align to a common left edge with consistent vertical spacing
 *   /typeface  Mona Sans + JetBrains Mono for technical labels; the
 *              greeting drops to direct "Settings"
 *   /colorgrade  zinc neutrals + indigo accent; emoji sidebar icons replaced
 *                with geometric bullets
 *   /reduce    sidebar icons stripped (text-only), main-panel cards
 *              dropped, form labels go inline with values, prominent Save
 *              button replaced with auto-save indicator
 *   /refine    consistent toggle styling, hover states on nav items
 */

const aiFontStyle: CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
};

const settingsBodyStyle: CSSProperties = {
  fontFamily: "var(--font-mona-sans), system-ui, sans-serif",
};

const settingsMonoStyle: CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
};

type NavIconKind = "user" | "bell" | "lock" | "card" | "users";

const navSections: Array<{
  id: string;
  label: string;
  iconKind: NavIconKind;
  bullet: string;
}> = [
  { id: "profile", label: "Profile", iconKind: "user", bullet: "◉" },
  { id: "notifications", label: "Notifications", iconKind: "bell", bullet: "◐" },
  { id: "privacy", label: "Privacy", iconKind: "lock", bullet: "◑" },
  { id: "billing", label: "Billing", iconKind: "card", bullet: "◒" },
  { id: "members", label: "Members", iconKind: "users", bullet: "◓" },
];

// Lucide-style outline icons — what tools like v0 actually output. Used as
// the AI-default sidebar treatment; /colorgrade swaps them for the more
// committed geometric bullets that pair with the zinc + indigo palette.
function NavIcon({ kind }: { kind: NavIconKind }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "user":
      return (
        <svg {...common}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
  }
}

export function SurfaceSettings({ phase, className = "" }: SurfaceSettingsProps) {
  const post = (n: number) => phase >= n;
  const isAfterArrange = post(1);
  const isAfterTypeface = post(2);
  const isAfterColor = post(3);
  const isAfterReduce = post(4);
  const isAfterRefine = post(5);

  const containerStyle = isAfterTypeface ? settingsBodyStyle : aiFontStyle;
  const monoStyle: CSSProperties = isAfterTypeface ? settingsMonoStyle : {};

  // Palette — AI default is plain white with mild blue accents (the
  // contemporary AI-tool default); /colorgrade brings zinc + indigo.
  const containerBg = isAfterColor ? "bg-zinc-50" : "bg-white";
  const containerText = isAfterColor ? "text-zinc-900" : "text-gray-900";
  const subtleText = isAfterColor ? "text-zinc-600" : "text-gray-500";
  const muteText = isAfterColor ? "text-zinc-500" : "text-gray-400";
  const accentText = isAfterColor ? "text-indigo-700" : "text-blue-600";
  const accentBg = isAfterColor ? "bg-indigo-700" : "bg-blue-500";
  const accentSubtle = isAfterColor ? "bg-indigo-50" : "bg-blue-50";

  const sidebarBorder = isAfterColor ? "border-zinc-200" : "border-gray-200";
  const inputBorder = isAfterColor ? "border-zinc-300" : "border-gray-300";
  const cardBorder = isAfterColor ? "border-zinc-200" : "border-gray-200";

  const cardRadius = isAfterRefine ? "rounded-md" : "rounded-lg";
  const navItemRadius = isAfterRefine ? "rounded-sm" : "rounded";

  // /arrange normalizes spacing — phase 0 is cramped/uneven; phase 1+ rhythmic
  const navItemGap = isAfterArrange ? "gap-1" : "gap-0.5";
  const navPadding = isAfterArrange ? "p-3" : "p-2";

  // Header copy — friendly greeting in phase 0; /typeface tightens to
  // direct "Settings"; /reduce shifts to active section title.
  const headerTitle = isAfterReduce
    ? "Profile"
    : isAfterTypeface
      ? "Settings"
      : "Welcome to your settings";
  const showSub = !isAfterTypeface && !isAfterReduce;

  // Sidebar icons stripped at /reduce; Lucide-style outlines until /colorgrade
  // swaps them for the geometric bullets that pair with zinc + indigo.
  const showIcons = !isAfterReduce;

  // Display weight — Mona Medium post-/typeface; geometric heavy bold before
  const displayWeight = isAfterTypeface ? "font-medium tracking-tight" : "font-bold tracking-tight";

  const labelClass = isAfterTypeface
    ? "text-[10px] uppercase tracking-widest font-medium"
    : "text-[11px] uppercase tracking-wide font-bold";

  return (
    <div
      style={containerStyle}
      className={`surface-morph ${containerBg} ${containerText} h-full overflow-hidden flex ${className}`}
    >
      {/* Sidebar nav */}
      <nav
        className={`shrink-0 w-32 md:w-36 border-r ${sidebarBorder} ${navPadding} flex flex-col ${navItemGap} ${
          isAfterColor ? "bg-white" : "bg-gray-50"
        }`}
      >
        <AnimatePresence>
          {!isAfterReduce ? (
            <motion.p
              key="sidebar-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className={`${labelClass} ${muteText} px-2 mb-1.5`}
            >
              Settings
            </motion.p>
          ) : null}
        </AnimatePresence>
        {navSections.map((section, i) => {
          const isActive = i === 0; // Profile is the active section
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center gap-2 px-2 py-1.5 ${navItemRadius} text-xs ${
                isActive
                  ? isAfterColor
                    ? `${accentSubtle} ${accentText} font-medium`
                    : "bg-blue-50 text-blue-700 font-medium"
                  : `${subtleText} ${
                      isAfterRefine
                        ? "transition-colors duration-150 hover:bg-zinc-100"
                        : ""
                    }`
              }`}
            >
              {/* Icon variant — Lucide outlines (default) → geometric
                  bullet (after /colorgrade) → stripped (after /reduce).
                  Each variant gets a stable AnimatePresence key so the
                  swap reads as "icon style changes" rather than a flicker. */}
              <AnimatePresence mode="wait" initial={false}>
                {showIcons ? (
                  isAfterColor ? (
                    <motion.span
                      key="bullet"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={FADE}
                      aria-hidden
                      className={`${
                        isActive ? accentText : muteText
                      } text-[10px] leading-none`}
                    >
                      {section.bullet}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="lucide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={FADE}
                      aria-hidden
                      className={`${isActive ? accentText : muteText} shrink-0 leading-none`}
                    >
                      <NavIcon kind={section.iconKind} />
                    </motion.span>
                  )
                ) : null}
              </AnimatePresence>
              <span>{section.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Main panel */}
      <div className="flex-1 min-w-0 p-4 md:p-5 overflow-hidden flex flex-col">
        {/* Header */}
        <div className={isAfterArrange ? "mb-4" : "mb-2.5"}>
          <AnimatePresence>
            {isAfterReduce ? (
              <motion.p
                key="header-eyebrow"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={FADE}
                style={monoStyle}
                className={`${labelClass} ${muteText} mb-1`}
              >
                Configuration
              </motion.p>
            ) : null}
          </AnimatePresence>
          <h2
            className={`${displayWeight} text-sm md:text-base ${containerText}`}
          >
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
                Manage your account preferences
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Form area */}
        <div className={`flex-1 min-h-0 ${isAfterArrange ? "space-y-3" : "space-y-1.5"}`}>
          <FormRow
            label="Name"
            value="Chris Laforge"
            isAfterReduce={isAfterReduce}
            containerText={containerText}
            subtleText={subtleText}
            inputBorder={inputBorder}
            cardRadius={cardRadius}
            monoStyle={monoStyle}
          />
          <FormRow
            label="Email"
            value="chris@example.com"
            isAfterReduce={isAfterReduce}
            containerText={containerText}
            subtleText={subtleText}
            inputBorder={inputBorder}
            cardRadius={cardRadius}
            monoStyle={monoStyle}
          />
          <FormRow
            label="Role"
            value="Admin"
            isAfterReduce={isAfterReduce}
            containerText={containerText}
            subtleText={subtleText}
            inputBorder={inputBorder}
            cardRadius={cardRadius}
            monoStyle={monoStyle}
          />
        </div>

        {/* Save action — prominent button (default) → quiet auto-save row
            (after /reduce). The two read as different surfaces; AnimatePresence
            with mode="wait" sequences the exit + entry so the visitor reads
            this as "the noisy save UI was replaced" rather than as a flicker. */}
        <AnimatePresence mode="wait" initial={false}>
          {isAfterReduce ? (
            <motion.div
              key="auto-save"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className={`shrink-0 mt-3 pt-3 border-t ${sidebarBorder} flex items-center justify-between`}
            >
              <span style={monoStyle} className={`${labelClass} ${muteText}`}>
                Auto-saved · 2s ago
              </span>
              <button type="button" className={`${accentText} text-xs font-medium hover:underline`}>
                Done →
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="save-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              type="button"
              style={containerStyle}
              className={`shrink-0 mt-3 self-start ${accentBg} text-white text-xs font-bold px-3 py-1.5 ${cardRadius}`}
            >
              Save Changes
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormRow — inline label/value after /reduce; stacked label-above-input before
// ---------------------------------------------------------------------------

function FormRow({
  label,
  value,
  isAfterReduce,
  containerText,
  subtleText,
  inputBorder,
  cardRadius,
  monoStyle,
}: {
  label: string;
  value: string;
  isAfterReduce: boolean;
  containerText: string;
  subtleText: string;
  inputBorder: string;
  cardRadius: string;
  monoStyle: CSSProperties;
}) {
  if (isAfterReduce) {
    return (
      <div className="grid grid-cols-12 items-center gap-3 py-1">
        <label
          style={monoStyle}
          className={`col-span-3 text-[10px] uppercase tracking-widest ${subtleText} font-medium`}
        >
          {label}
        </label>
        <div className={`col-span-9 text-xs ${containerText}`}>{value}</div>
      </div>
    );
  }
  return (
    <div>
      <label className={`block text-[11px] ${subtleText} mb-1 font-medium`}>{label}</label>
      <input
        type="text"
        defaultValue={value}
        className={`w-full text-xs ${containerText} bg-white border ${inputBorder} ${cardRadius} px-2.5 py-1.5`}
      />
    </div>
  );
}
