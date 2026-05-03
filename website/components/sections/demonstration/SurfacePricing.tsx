"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { FADE, LAYOUT_FLIP } from "@/lib/motion";
import type { Phase } from "./SurfaceDashboard";

type SurfacePricingProps = {
  phase: Phase;
  className?: string;
};

/**
 * The Pricing surface — a consumer-facing SaaS pricing page. AI default
 * is realistic pricing-page output from contemporary AI tools: white
 * background, system-ui type, mild blue accents, three equal shadowed
 * cards, blue "MOST POPULAR" badge with ring, blue CTAs. Generic enough
 * that a thoughtful viewer recognizes it from their own work.
 *
 * Each command produces a pricing-specific transformation:
 *
 *  /arrange   establishes tier hierarchy spatially — three equal cards
 *             collapse into Pro-prominent / Free + Team supporting. This is
 *             the spatial move that matters for pricing surfaces: which
 *             tier is recommended is shown through visual weight, not
 *             through a screaming badge.
 *  /typeface  swaps system-ui for Lora (humanist serif) + Source Sans 3,
 *             warm and considered for a consumer product.
 *  /colorgrade  stone neutrals + deep rose accent.
 *  /reduce    drops the "MOST POPULAR" badge (now redundant — hierarchy is
 *             shown spatially), simplifies feature lists, tightens header
 *             copy, replaces filled CTAs with quiet text links.
 *  /refine    consistent radii, hover states.
 */

const aiFontStyle: CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
};

const pricingDisplayStyle: CSSProperties = {
  fontFamily: "var(--font-lora), Georgia, serif",
};

const pricingBodyStyle: CSSProperties = {
  fontFamily: "var(--font-source-sans), system-ui, sans-serif",
};

type Tier = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 projects", "Basic features", "Community support"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$24",
    period: "per month",
    features: ["Unlimited projects", "All features", "Priority support", "API access"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "per month",
    features: ["Everything in Pro", "5 seats included", "SSO", "Dedicated"],
    cta: "Contact Sales",
  },
];

export function SurfacePricing({ phase, className = "" }: SurfacePricingProps) {
  const post = (n: number) => phase >= n;
  const isAfterArrange = post(1);
  const isAfterTypeface = post(2);
  const isAfterColor = post(3);
  const isAfterReduce = post(4);
  const isAfterRefine = post(5);

  const containerStyle = isAfterTypeface ? pricingBodyStyle : aiFontStyle;
  const displayStyle = isAfterTypeface ? pricingDisplayStyle : aiFontStyle;

  // Palette — AI default is plain white with mild blue accents (the
  // contemporary AI-tool default); /colorgrade brings stone + deep rose.
  const containerBg = isAfterColor ? "bg-stone-50" : "bg-white";
  const containerText = isAfterColor ? "text-stone-900" : "text-gray-900";
  const subtleText = isAfterColor ? "text-stone-600" : "text-gray-500";
  const muteText = isAfterColor ? "text-stone-500" : "text-gray-400";
  const accentText = isAfterColor ? "text-rose-700" : "text-blue-600";
  const accentBg = isAfterColor ? "bg-rose-700" : "bg-blue-500";
  const cardBorder = isAfterColor ? "border-stone-200" : "border-gray-200";
  const cardSurface = "bg-white";

  const cardRadius = isAfterRefine ? "rounded-md" : "rounded-xl";
  const cardClass = isAfterReduce
    ? `border ${cardBorder}`
    : `border ${cardBorder} shadow-sm`;

  // Pro highlight ring — solid ring before /reduce strips it.
  const popularRing = isAfterReduce
    ? ""
    : isAfterColor
      ? "ring-2 ring-rose-700"
      : "ring-2 ring-blue-500";

  // Header — friendly default copy in phase 0; /typeface tightens to
  // declarative; /reduce splits to editorial eyebrow + title.
  const headerTitle = isAfterReduce
    ? "Pricing"
    : isAfterTypeface
      ? "Choose your plan."
      : "Choose the plan that's right for you!";

  // CTA: filled button before /reduce, quiet text link after
  const ctaButtonClass = isAfterReduce
    ? `${accentText} text-xs uppercase tracking-widest font-medium hover:underline`
    : `${accentBg} text-white text-xs font-semibold px-3 py-1.5 ${cardRadius} block w-full`;

  return (
    <div
      style={containerStyle}
      className={`surface-morph ${containerBg} ${containerText} h-full p-5 md:p-7 overflow-hidden ${className}`}
    >
      {/* Header — centered before /arrange (AI-default); left-anchored after */}
      <div className={`mb-4 md:mb-6 ${isAfterArrange ? "" : "text-center"}`}>
        {isAfterReduce ? (
          <p className={`text-[10px] uppercase tracking-widest ${subtleText} mb-1.5 font-medium`}>
            Plans
          </p>
        ) : null}
        <h2
          style={isAfterReduce ? displayStyle : containerStyle}
          className={`${
            isAfterTypeface ? "font-medium tracking-tight" : "font-bold tracking-tight"
          } text-xl md:text-2xl ${containerText} ${isAfterReduce ? "" : "mb-1"}`}
        >
          {headerTitle}
        </h2>
        {!isAfterReduce ? (
          <p className={`text-xs ${subtleText}`}>
            14-day free trial. No credit card required.
          </p>
        ) : null}
      </div>

      {/* Tiers — equal grid before /arrange; asymmetric (Pro prominent)
          after. The /arrange transformation is the spatial move that
          matters for pricing: hierarchy among parallel offerings.

          LayoutGroup + motion.div layout on each tier wrapper means the
          cards FLIP between equal positions and asymmetric ones — the
          visitor sees the rearrangement happen, which is the visual proof
          of /arrange. */}
      <LayoutGroup>
        <div
          className={
            isAfterArrange
              ? "grid grid-cols-12 gap-3 md:gap-4"
              : "grid grid-cols-3 gap-3"
          }
        >
          {tiers.map((tier) => {
            const isPro = tier.name === "Pro";
            const colSpan = !isAfterArrange
              ? "col-span-1"
              : isPro
                ? "col-span-6"
                : "col-span-3";
            const proCardWrapper =
              isAfterArrange && isPro && !isAfterReduce
                ? `${cardClass} ${cardRadius} ${cardSurface} ${popularRing} p-3 relative`
                : "";
            return (
              <motion.div
                key={tier.name}
                layout
                layoutId={`pricing-tier-${tier.name}`}
                transition={LAYOUT_FLIP}
                className={`${colSpan} ${proCardWrapper}`}
              >
                <AnimatePresence>
                  {!isAfterArrange ? (
                    <motion.div
                      key="equal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, position: "absolute" }}
                      transition={FADE}
                    >
                      <EqualTierCard
                        tier={tier}
                        cardClass={cardClass}
                        cardRadius={cardRadius}
                        cardSurface={cardSurface}
                        accentBg={accentBg}
                        accentText={accentText}
                        subtleText={subtleText}
                        muteText={muteText}
                        containerText={containerText}
                        containerStyle={containerStyle}
                        popularRing={popularRing}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="asymmetric"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={FADE}
                    >
                      <AnimatePresence>
                        {isPro && !isAfterReduce ? (
                          <motion.span
                            key="pro-badge"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={FADE}
                            className={`absolute -top-2 left-1/2 -translate-x-1/2 ${accentBg} text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded`}
                          >
                            ★ Most Popular
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                      <AsymmetricTier
                        tier={tier}
                        prominent={isPro}
                        compact={!isPro}
                        isAfterReduce={isAfterReduce}
                        accentText={accentText}
                        subtleText={subtleText}
                        containerText={containerText}
                        displayStyle={displayStyle}
                        ctaClass={ctaButtonClass}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Equal-grid tier card (used in phase 0, before /arrange)
// ---------------------------------------------------------------------------

type EqualTierCardProps = {
  tier: Tier;
  cardClass: string;
  cardRadius: string;
  cardSurface: string;
  accentBg: string;
  accentText: string;
  subtleText: string;
  muteText: string;
  containerText: string;
  containerStyle: CSSProperties;
  popularRing: string;
};

function EqualTierCard({
  tier,
  cardClass,
  cardRadius,
  cardSurface,
  accentBg,
  accentText,
  subtleText,
  muteText,
  containerText,
  containerStyle,
  popularRing,
}: EqualTierCardProps) {
  return (
    <div
      className={`${cardClass} ${cardRadius} ${cardSurface} p-3 relative ${tier.popular ? popularRing : ""}`}
    >
      {tier.popular ? (
        <span
          className={`absolute -top-2 left-1/2 -translate-x-1/2 ${accentBg} text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${cardRadius}`}
        >
          ★ Most Popular
        </span>
      ) : null}
      <h3 className={`font-bold text-sm ${containerText} mb-1`}>{tier.name}</h3>
      <p className={`font-bold text-xl ${containerText} leading-none mb-0.5`}>
        {tier.price}
      </p>
      <p className={`text-[10px] ${muteText} mb-3`}>{tier.period}</p>
      <ul className="space-y-1 mb-3">
        {tier.features.map((f) => (
          <li key={f} className={`text-[11px] ${subtleText} flex items-start gap-1.5`}>
            <span className={accentText}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        type="button"
        style={containerStyle}
        className={`${accentBg} text-white text-xs font-semibold px-3 py-1.5 ${cardRadius} block w-full`}
      >
        {tier.cta}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Asymmetric tier (used in phases 1+, after /arrange)
// ---------------------------------------------------------------------------

type AsymmetricTierProps = {
  tier: Tier;
  compact?: boolean;
  prominent?: boolean;
  isAfterReduce: boolean;
  accentText: string;
  subtleText: string;
  containerText: string;
  displayStyle: CSSProperties;
  ctaClass: string;
};

function AsymmetricTier({
  tier,
  compact = false,
  prominent = false,
  isAfterReduce,
  accentText,
  subtleText,
  containerText,
  displayStyle,
  ctaClass,
}: AsymmetricTierProps) {
  // After /reduce, feature lists shrink to a comma-joined inline string
  const featuresVisible = isAfterReduce
    ? tier.features.slice(0, compact ? 2 : 3)
    : tier.features.slice(0, compact ? 3 : 4);

  return (
    <div>
      <h3
        className={`text-xs uppercase tracking-widest ${subtleText} mb-1 font-medium`}
      >
        {tier.name}
      </h3>
      <p
        style={displayStyle}
        className={`font-medium ${prominent ? "text-2xl md:text-3xl" : "text-lg"} ${containerText} leading-none mb-1`}
      >
        {tier.price}
      </p>
      <p className={`text-[10px] ${subtleText} mb-3`}>{tier.period}</p>
      {isAfterReduce ? (
        // Reduced: inline comma-joined features, much less visual weight
        <p className={`text-[11px] ${containerText} leading-snug mb-3`}>
          {featuresVisible.join(" · ")}
        </p>
      ) : (
        <ul className="space-y-1 mb-3">
          {featuresVisible.map((f) => (
            <li
              key={f}
              className={`text-[11px] ${containerText} flex items-start gap-2 leading-snug`}
            >
              <span className={`${accentText} font-bold`}>—</span>
              {f}
            </li>
          ))}
        </ul>
      )}
      <button type="button" className={ctaClass}>
        {tier.cta} {isAfterReduce ? "→" : ""}
      </button>
    </div>
  );
}
