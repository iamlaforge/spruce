/**
 * Stillpoint .spruce.md content.
 *
 * This is the context file Spruce’s /spruce up command would have produced
 * for the Stillpoint project. It is the input that downstream commands
 * (/sketch, /foundations, /design, and the corrective tier) read from when
 * reasoning about design decisions for Stillpoint.
 *
 * Two exports:
 *   - stillpointContext      — structured object for programmatic access
 *   - stillpointContextMarkdown — full markdown rendering for catalog
 *                                 illustrations that show the file in its
 *                                 document form
 *
 * Source for both: the Stillpoint moodboard. Brand promise: "Mindfulness
 * for real life."
 */

export const stillpointContext = {
  product:
    "A calm, accessible companion for daily mindfulness — helping users build a sustainable meditation practice in just minutes a day.",
  // Audience pointer to .personas.md — /personas ran on 2026-05-01 and
  // produced structured personas (Maya as primary daily practitioner;
  // Jordan as secondary skeptical first-timer). The personas file is now
  // the canonical audience source; this field is the brief pointer.
  audience:
    "Primary persona: Maya (Daily Practitioner). Secondary: Jordan (Skeptical First-Timer). See .personas.md for full persona work and downstream-design implications. The original lightweight capture: adults 25–45 seeking stress relief, better sleep, and emotional balance — beginners through intermediate meditators.",
  character:
    "Warm, grounded, quietly confident, modern, inclusive. The product respects its own space and the user’s time.",
  density:
    "Spacious leaning balanced — enough room to breathe, not so sparse it feels precious.",
  voice:
    "Calm, encouraging, clear. Speaks like a calm, supportive friend. Direct without being curt; warm without being saccharine.",
  platform:
    "Web and native mobile (iOS first, then Android). Both first-class.",
  darkMode: "Yes — light and dark both first-class.",
  typography:
    "Söhne (display, sans, designed for clarity, warmth, and modern human connection) and Lora (editorial moments, expressive storytelling, longer-form content, marketing). The pairing avoids the AI-default geometric sans and the meditation-app handwritten cliché.",
  color:
    "Sage, warm sand, and deep indigo as primaries. Cream as the neutral foundation. Lavender and sunset peach as restrained accents for moments of warmth and energy. Avoid clinical blues, generic medical/wellness gradients, and cliché meditation-app pastels.",
  notForFeel:
    "Clinical or sterile. Generic SaaS. Overly serene to the point of feeling fake. Stock photography of women meditating in sun-drenched windows. Performative wellness branding.",
  uxPatterns:
    "Always provide a way to skip onboarding. Never autoplay audio. Always honor reduced-motion preferences. Sessions should be interruptible without losing progress.",
  tradeoffDefaults: {
    restraintVsExpression:
      "Restraint — quiet, confident, understated. The product is about settling, not selling.",
    classicVsDistinctive:
      "Classic — this product values calm familiarity over novelty. Distinctive choices come through warmth of materials and voice rather than typographic or layout fireworks.",
    symmetryVsTension:
      "Symmetry — the product is about settling, not energizing. Predictable balance helps users land.",
  },
  notes: 'Brand promise is "Mindfulness for real life."',
} as const;

export const stillpointContextMarkdown = `# Spruce Context

## Product

${stillpointContext.product}

## Audience

${stillpointContext.audience}

## Character

${stillpointContext.character}

## Density

${stillpointContext.density}

## Voice

${stillpointContext.voice}

## Platform

${stillpointContext.platform}

## Dark mode

${stillpointContext.darkMode}

---

## Typography preferences

${stillpointContext.typography}

## Color preferences

${stillpointContext.color}

## What this should NOT feel like

${stillpointContext.notForFeel}

## UX patterns to always use or avoid

${stillpointContext.uxPatterns}

---

## When Spruce has to decide

**Restraint or expression?** ${stillpointContext.tradeoffDefaults.restraintVsExpression}

**Classic or distinctive typography?** ${stillpointContext.tradeoffDefaults.classicVsDistinctive}

**Symmetry or tension in layout?** ${stillpointContext.tradeoffDefaults.symmetryVsTension}

---

## Notes

${stillpointContext.notes}
`;
