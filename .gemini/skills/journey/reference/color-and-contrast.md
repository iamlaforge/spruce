# Spruce Reference: Color & Contrast

---

## How to Use This File

This reference encodes the color reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted whenever color decisions are made — which, in any real interface, is constantly.

Color is the second-loudest signal of AI-generated design, after typography. The specific failure is recognizable at a glance: a purple gradient over a lightly tinted background, a teal accent on dark navy, a palette that wasn't chosen so much as defaulted-to. These aesthetics are so strongly associated with AI-generated output that their presence is effectively a watermark. Escaping them is not about finding different hues — it's about understanding why color works, and then making deliberate choices that serve the specific product.

This file teaches color reasoning in the modern color space (OKLCH), treats light and dark modes as first-class parallel concerns, and provides specific guidance on palette construction, contrast, and the details that separate deliberate color from default color.

---

## Contents

1. The Foundational Commitment
2. Thinking in OKLCH
3. Palette Construction
4. Neutrals Are Not Neutral
5. The Accent Strategy
6. Contrast as Hierarchy, Not Just Accessibility
7. Dark Mode as a Parallel System
8. Color in Context: Semantic and Interactive States
9. Gradients, Transparency, and Atmosphere
10. Contextual Starting Points
11. Color Anti-Patterns

---

## 1. The Foundational Commitment

### Color is a decision about character before it is a decision about hue

**Principle:** Before choosing any specific color, decide what the product's color system should *feel* like. Color choices follow from character; they do not establish it in a vacuum.

**Reasoning:** The purple-gradient-on-white aesthetic is not a color problem — it is a character problem. The AI reached for a color system without first deciding what the product's color voice should be, and the statistical default filled the vacuum. The correction isn't to swap purple for a different hue. It's to make the character decision first, then let specific colors follow from that decision.

AI-generated palettes tend to feel homogeneous across wildly different products because they're drawn from the same narrow band of safe-contemporary aesthetics. A developer tool and a wellness app shouldn't share a color system, and yet they often do. The fix is upstream of the color picker: what does this product's color want to *communicate*?

**Implementation guidance:**
- Before selecting any colors, articulate the product's color character in a short phrase. Examples: "quiet and editorial," "technical and precise," "warm and approachable," "premium and confident," "bold and youthful." This phrase is the brief every subsequent color decision answers to.
- Treat the purple-gradient aesthetic as effectively forbidden. Treat the teal-on-navy aesthetic as effectively forbidden. These have become so strongly AI-coded that their use now works against the product regardless of context.
- Understand that color carries cultural, historical, and emotional associations. Cool blues signal corporate and trustworthy. Warm oranges signal friendly and energetic. Deep greens signal natural and established. Reds demand attention and are read as urgent or bold. These associations are not absolute, but they are real and cumulative.

### The whole palette is the decision, not the accent color

**Principle:** A color system is not a brand color plus some neutrals. It is a coherent set of relationships — backgrounds, surfaces, text, borders, accents, semantic states — that together define the product's visual voice.

**Reasoning:** Most AI-generated palettes begin with an accent color and treat everything else as decoration around it. This produces systems where the accent feels disconnected from the neutral structure, because the neutrals were chosen generically (pure grays) and the accent was chosen expressively. The result is an interface where the "brand color" looks like it was pasted onto a generic template.

Good color systems work the opposite way: the neutrals are chosen first, with the same care as the accents, and the whole system hangs together because every color was chosen in relation to every other color. A warm cream background with a navy accent is a different system than a cool white background with the same navy — and the accent doesn't mean the same thing in each.

**Implementation guidance:**
- Design neutrals first, accents second. The neutral palette establishes the atmosphere; accents operate within that atmosphere.
- A complete palette defines: background(s), surface(s) for elevated components, primary/secondary/tertiary text, borders and dividers, primary accent, secondary accent (optional), and semantic states (success, warning, error, info). Every one of these is a decision, not a default.
- The relationship between colors matters more than any individual color. Two warm colors can clash; a warm and a cool color can harmonize if their saturation and lightness are considered together.

---

## 2. Thinking in OKLCH

### Why OKLCH

**Principle:** Modern color work happens in OKLCH (or its rectangular counterpart, OKLAB), not in HEX, RGB, or HSL. The reason is perceptual uniformity.

**Reasoning:** HEX and RGB describe colors by how they're rendered on a screen, not by how they look to humans. HSL is a transformation of RGB that makes it easier to reason about hue and saturation, but it isn't perceptually uniform — meaning two colors at the same HSL lightness value don't actually look equally bright to the human eye. A yellow at `hsl(60, 100%, 50%)` looks much brighter than a blue at `hsl(240, 100%, 50%)`, even though their L values are identical.

OKLCH solves this. It's a color space explicitly designed so that equal numerical steps produce equal perceived steps. A yellow at `oklch(70% 0.15 90)` and a blue at `oklch(70% 0.15 240)` genuinely look equally bright. This makes palette construction dramatically easier: you can build a system where all your primary text colors are at one lightness value, all your secondary text at another, and they'll look consistent across hues.

**Implementation guidance:**
- Use OKLCH for all new color systems. Syntax: `oklch(L% C H)` where L is lightness (0-100%), C is chroma/saturation (0-0.4 typically), and H is hue (0-360 degrees).
- Lightness values are perceptually uniform. A background at 98% L will feel equally light regardless of hue. Text at 20% L will feel equally dark regardless of hue.
- Chroma values describe saturation intensity. 0 is grayscale. Values above ~0.2 become quite saturated. Values above ~0.3 push into vivid territory. Most product palettes live in the 0.02-0.15 range for neutrals and supporting colors, with accents going up to 0.2-0.25.
- Hue values are standard degree positions: 0° is red, 30° orange, 60° yellow, 120° green, 180° cyan, 240° blue, 300° magenta. Between these are the more interesting hues — 20° is a warm red-orange, 200° is a cyan-blue, 280° is a violet.

### Thinking in lightness first

**Principle:** When constructing a palette, think in terms of lightness levels first, then assign hues. Lightness controls structure; hue controls character.

**Reasoning:** The hierarchical structure of an interface — what's background, what's foreground, what's emphasized — is communicated primarily through lightness, not hue. A dark-mode app and a light-mode app with the same hue palette are structurally different because their lightness relationships are inverted. Thinking in lightness first makes palette construction systematic rather than intuitive.

**Implementation guidance:**
- For a light-mode interface, a typical lightness structure might be: background at 98-99%, surfaces at 97%, primary text at 15-20%, secondary text at 40-45%, borders at 90-92%, accent at 45-55%.
- For a dark-mode interface, invert: background at 12-15%, surfaces at 16-20%, primary text at 92-96% (never pure white), secondary text at 65-70%, borders at 25-30%, accent at 65-75%.
- The exact values depend on context and character. Editorial products often want more contrast (text at 10% on background at 99%). Premium products often want less (text at 25% on background at 96%, producing a softer feel). These are character choices made at the lightness level.

### The chroma discipline

**Principle:** Chroma (saturation) is the primary dial for tuning emotional intensity. Low chroma across the palette produces a quiet, refined feel. Higher chroma produces energy and expressiveness. The discipline is choosing a chroma target deliberately and holding to it.

**Reasoning:** AI-generated palettes often feel visually loud because chroma is applied inconsistently — some colors at low chroma, others at high chroma, with no unifying logic. The result is a palette where certain elements "pop" accidentally, drawing attention to things that shouldn't be emphasized.

A disciplined system establishes a chroma range for each role: neutrals at 0.01-0.03, supporting colors at 0.05-0.12, accents at 0.15-0.25. Within each role, all colors operate at similar chroma, so emphasis is controlled through lightness and placement rather than accidental saturation.

**Implementation guidance:**
- Neutrals should have very low chroma (0.005-0.03) — high enough to feel tinted rather than dead gray, low enough not to compete with actual colored elements.
- Semantic colors (success, warning, error) can be slightly higher chroma (0.12-0.18) to ensure they're noticeable, but shouldn't be so saturated they dominate.
- Accent colors are the expressive moment of the palette. Their chroma depends on character: 0.10-0.15 for restrained, refined products; 0.18-0.25 for bold, expressive products.
- Match chroma across colors in the same role. If your primary accent is at chroma 0.18, your secondary accent should be at roughly 0.18 as well. Mismatched chroma produces a palette that feels accidental.

---

## 3. Palette Construction

### Start with neutrals, end with accents

**Principle:** Build the neutral palette first — backgrounds, surfaces, text, borders. Only after the neutral structure is complete should accent colors be introduced.

**Reasoning:** Neutrals carry more of an interface's visual weight than accents. A typical product is 85-95% neutral surfaces, text, and dividers, with accents used sparingly for emphasis. If the neutrals aren't right, nothing else will be. If the neutrals are right, even a simple accent choice will feel deliberate.

**Implementation guidance:**
- A minimum neutral palette has: one background, one elevated surface, three text levels (primary, secondary, tertiary), two border levels (strong for structure, subtle for division).
- In dark mode, add: an elevated surface two steps above the background (deeper elevation needs more separation), and a hover/pressed state treatment.
- The step between adjacent neutral levels should be perceptible but not jarring. In OKLCH lightness, a 2-4% step is usually right. Larger steps fragment the interface; smaller steps feel indistinct.

### The question of how many colors

**Principle:** Most product palettes need fewer colors than they use. A disciplined palette often lives in 5-7 total colors (including neutrals) and feels richer for it.

**Reasoning:** There's a common temptation — especially in AI-generated systems — to give every category its own color. Primary actions are blue. Success is green. Warning is amber. Error is red. Info is another blue. The marketing highlight is purple. The chart has six more colors. By the time you're done, the palette fights itself.

Restrained palettes communicate confidence. A product with a single accent color uses that color deliberately; the eye learns to associate it with importance. A product with six accent colors has taught the user nothing.

**Implementation guidance:**
- One strong primary accent is often enough. Semantic states (success, warning, error) are functional necessities but should be held at the minimum chroma needed to communicate their meaning.
- A secondary accent is justified when there's a structural reason for it — for example, a primary action color and a distinct "destructive" color, or a brand color used for marketing elements distinct from the interaction color.
- If a palette has more than one accent, the accents should relate to each other — similar chroma, harmonious hues, or explicitly complementary positioning on the color wheel. Random selection of unrelated accents produces visual noise.
- Chart and data visualization palettes are a separate concern and can legitimately need more colors. Those palettes should still relate to the main palette in chroma and lightness, even when they diverge in hue.

### Harmony over novelty

**Principle:** The purpose of a palette is coherence, not surprise. Accent colors should sit naturally alongside neutrals, not fight them.

**Reasoning:** AI-generated palettes often pair neutrals from one color family with accents from another — cool gray neutrals with a warm orange accent, or warm cream backgrounds with a cold electric blue accent. The mismatch registers as "designed but not considered." Harmony doesn't require monotony; it requires that the accent feels like it grew from the same soil as the rest of the palette.

**Implementation guidance:**
- If your neutrals are tinted warm (yellow-green undertones, 60-100° hue range), your accents read as more natural when they share some warmth.
- If your neutrals are tinted cool (blue-purple undertones, 240-280° hue range), cool accents harmonize more easily.
- Truly neutral grays (chroma near zero) can accept accents of any hue, which is why they're often chosen — but they also feel less designed than tinted neutrals.
- Strong contrasts can work when deliberate — a warm cream background with a cool navy accent is a classic editorial pairing — but the contrast should feel intentional, not accidental.

---

## 4. Neutrals Are Not Neutral

### Every neutral is tinted

**Principle:** Pure grays (chroma 0) rarely produce good interfaces. Neutrals should be tinted — slightly warm, slightly cool, or slightly chromatic toward another hue. The tint is subtle but carries the atmosphere of the entire palette.

**Reasoning:** Pure gray is what defaults produce. Pure black (#000) and pure white (#FFF) have the same problem — they're correct but lifeless. The eye reads tinted neutrals as "designed" and pure neutrals as "generic." Additionally, high-contrast black-on-white produces eye strain at sustained reading sizes; tinted near-blacks and near-whites are more comfortable.

**Implementation guidance:**
- Instead of pure black text, use something like `oklch(18% 0.01 250)` for a cool near-black, or `oklch(18% 0.01 60)` for a warm near-black. The 1% chroma is barely perceptible in isolation but establishes the tint across the whole system.
- Instead of pure white backgrounds, use something like `oklch(98% 0.005 85)` for a warm off-white, or `oklch(98% 0.005 250)` for a cool off-white. The effect is subtle but immediately legible once compared side-by-side with true white.
- Gray borders and dividers similarly benefit from tinting. A subtle warm tint on borders in an otherwise cool palette can feel wrong; match the tint direction.
- The tint direction is a character decision. Warm tints feel inviting, organic, humanist. Cool tints feel technical, precise, restrained. Neither is better — the choice should match the product's character.

### The temperature of the system

**Principle:** A palette has an overall temperature — warm, cool, or neutral. That temperature should be intentional and consistent across neutrals and accents.

**Reasoning:** Products that feel "right" in their color choices usually have a consistent temperature. Products that feel off often have mismatched temperatures — warm neutrals with cool accents, or vice versa, without deliberate intent behind the contrast. Establishing temperature early makes subsequent color decisions easier to evaluate.

**Implementation guidance:**
- Warm palettes (neutrals tinted toward yellow/orange/red, 30-90° hues) feel: inviting, human, editorial, established.
- Cool palettes (neutrals tinted toward blue/cyan/purple, 200-280° hues) feel: technical, clean, precise, contemporary.
- Near-neutral palettes (chroma below 0.01 across neutrals) feel: austere, brutalist, utilitarian — and also the AI default, so they require other strong character signals to avoid reading as generic.
- The temperature choice is not about hue family exclusively; it's about the consistent undertone across the palette. A cool-temperature palette can still have a warm accent if the contrast is deliberate.

---

## 5. The Accent Strategy

### The accent is the voice of the palette

**Principle:** The accent color carries more character weight than any other single decision in the palette. It is the color users will associate with the product. Choose it with the full weight of that association in mind.

**Reasoning:** Ask someone to name the color of a brand they use, and they'll name its accent — not its neutrals. The accent becomes shorthand for the product. This means the accent choice must actively resist the defaults that have become culturally coded as generic — especially the AI-default purple.

**Implementation guidance:**
- Avoid the reflex defaults: purple (280-290°), purple-blue gradient ranges (270-250°), teal (180-190°), "electric blue" (230-240°). These have become the signatures of AI-generated design and carry that association regardless of execution.
- Productive hue territories that are currently underused: deep greens (130-150°), warm oranges (30-50°), muted reds (10-20°), ochres and mustards (70-90°), deep teals that resist the standard teal (160-175° or 195-210°), unusual pinks (340-360°).
- The chroma of the accent should match the character: 0.10-0.14 for restrained, 0.15-0.20 for confident, 0.20-0.28 for bold. Higher chroma accents need to be used more sparingly — they can't carry the visual weight of large surfaces without overwhelming.
- A single accent is often enough. If a second accent is needed, consider using the same hue at a different chroma/lightness (a vivid version and a muted version) before reaching for a different hue entirely.

### Using accent color sparingly

**Principle:** Accent colors earn their emphasis by being scarce. The more an accent is used, the less it communicates.

**Reasoning:** In a typical interface, accent color should cover perhaps 2-5% of the visible surface. Primary action buttons, active navigation states, key data visualizations, occasional emphasis — these are accent-worthy. Dividers, borders, background panels, card surfaces — these are not. AI-generated interfaces often spread accent color across too many elements, producing designs where the accent has lost its ability to direct attention.

**Implementation guidance:**
- Reserve accent color for: primary CTAs, active/current states in navigation, focused or selected states, key numbers in dashboards, links, interactive highlights.
- Don't use accent color for: decorative dividers, card backgrounds (unless the card is itself the accented element), icons that aren't serving an active function, gradient overlays.
- When a secondary accent is used — for example, a "destructive" red distinct from the primary blue — both accents should still be scarce. The relationship is "two specific attention signals," not "two colors sprinkled throughout."

---

## 6. Contrast as Hierarchy, Not Just Accessibility

### Contrast communicates importance

**Principle:** Contrast ratios between text and background communicate more than readability — they communicate hierarchy. Primary information should have the highest contrast; secondary information deliberately less; tertiary information less still.

**Reasoning:** The WCAG contrast minimums (4.5:1 for body text, 3:1 for large text) are a floor, not a target. Hitting the minimum doesn't make the hierarchy strong; it makes it passable. Interfaces that use the full range of contrast — from very high primary contrast to deliberately softer secondary contrast — feel more composed than interfaces that use a single text color everywhere.

Conversely, AI-generated interfaces frequently violate accessibility minimums for "subtle" metadata text — small gray type on light backgrounds that falls below 4.5:1 — producing text that's neither accessible nor meaningfully subordinate.

**Implementation guidance:**
- Primary text: target 12:1+ contrast ratio for sustained reading. This is well above the WCAG minimum and produces text that reads as effortless.
- Secondary text: target 7:1-10:1 contrast. Still fully readable but perceptibly less emphasized.
- Tertiary text (metadata, captions, labels): target 4.5:1-6:1 contrast. This is the range where legibility is maintained but the text clearly reads as subordinate.
- Never go below 4.5:1 for body-sized text. Never go below 3:1 for large text (18pt+ or 14pt+ bold). Tertiary text at 3.5:1 is a failure mode — it reads as broken rather than subtle.

### The perceptual meaning of contrast

**Principle:** Contrast ratios are mathematical, but their perceptual effect depends on context — surrounding colors, ambient lighting, viewing device. Treat ratios as guidance, not as certainty.

**Reasoning:** Two text/background combinations with identical mathematical contrast can feel meaningfully different. Text on a tinted surface often reads as softer than text on an equivalent-contrast white surface. Text surrounded by strong colors can read as lower-contrast than the same text in isolation. Ratios capture technical compliance but not perceptual reality.

**Implementation guidance:**
- Test actual text against actual surfaces in actual contexts. Don't rely exclusively on calculated ratios.
- When text sits on colored surfaces (not pure white or near-white), you may need higher mathematical contrast to achieve the same perceived legibility.
- Consider the Accessible Perceptual Contrast Algorithm (APCA) as an alternative/complement to WCAG ratios. APCA is designed to reflect perceptual reality more accurately than WCAG's luminance-based formula.

---

## 7. Dark Mode as a Parallel System

### Dark mode is a different system, not an inverted one

**Principle:** Dark mode is not light mode with the colors flipped. It is a parallel design system with its own logic, its own relationships, and its own rules. Treat it that way.

**Reasoning:** The simplest approach to dark mode — invert the lightness values of every color — produces technically dark interfaces that feel wrong. Colors that look refined at high lightness often look harsh or muddy at low lightness. Accent colors that pop at lightness 50% on a white background may vanish or overpower on a dark background. Pure black (`oklch(0% 0 0)`) as a dark-mode background produces eye strain equivalent to pure white on light mode.

Dark mode requires its own color thinking: elevated surfaces become *lighter* than their base (light mode: elevated surfaces are *darker* than the base in appearance of depth, but structurally on a darker base); saturation usually needs to *decrease* to avoid vibration against dark surfaces; text lightness needs to stay below pure white to prevent ghosting and eye strain.

**Implementation guidance:**
- Dark mode backgrounds are not black. Use something in the 12-18% lightness range — roughly `oklch(13% 0.01 250)` for a cool dark or `oklch(14% 0.01 60)` for a warm dark. Pure black is for OLED optimization in specific contexts, not for default dark mode.
- Elevated surfaces in dark mode are *lighter* than the background, not darker. A card on a dark background sits at higher lightness than the background — roughly 4-6% higher. This inverts the usual light-mode convention where elevation is implied through shadow rather than lightness change.
- Text in dark mode tops out around 92-96% lightness. Pure white text on dark backgrounds produces visible ghosting and fatigue. The primary text should feel bright but not glaring.
- Accent colors in dark mode often need adjustment from their light-mode counterparts. A color that works at chroma 0.20 on white may need to drop to 0.14-0.16 on a dark background to avoid vibration. Saturated colors against dark backgrounds create visual buzzing that's exhausting to look at.

### Semantic meaning across modes

**Principle:** The semantic meaning of colors (success green, warning amber, error red) should be consistent across light and dark modes, but the specific color values must be adjusted for each.

**Reasoning:** Users learn color meanings and expect them to persist across modes. A successful save should feel successful in both light and dark contexts. But the specific green that reads as "success" at 45% lightness on white will likely be too dark to read on a dark background, so dark mode needs a brighter, potentially less saturated version of the same hue.

**Implementation guidance:**
- Establish semantic colors in both modes simultaneously, not as afterthoughts.
- Light-mode semantic colors typically sit in the 40-55% lightness range. Dark-mode semantic colors typically sit in the 65-75% range.
- Semantic chroma often needs to decrease slightly in dark mode to prevent vibration.
- Test semantic colors together on their respective mode surfaces before finalizing. A green and a red that both feel right individually may feel unbalanced together.

### The shared decisions

**Principle:** Some decisions transcend mode. The product's character, the relative importance of colors, the hue territory of the accent — these are decisions made once and expressed in both modes.

**Implementation guidance:**
- The accent hue is typically the same across modes (same degree value in OKLCH), with adjusted lightness and chroma.
- The overall temperature of the palette (warm vs. cool tinting) should be consistent across modes.
- The hierarchy of colors (which colors are most prominent, which are most subtle) is the same across modes — the specific values differ.

---

## 8. Color in Context: Semantic and Interactive States

### Semantic colors carry meaning, not just attention

**Principle:** Success, warning, error, and info colors are not interchangeable decoration. Each has a specific communicative role. Treat them as a functional vocabulary, not a visual toolkit.

**Reasoning:** AI-generated interfaces sometimes use semantic colors decoratively — using green because "this section is positive" when no success state is actually being communicated, or using amber to highlight a feature that has nothing to do with warnings. This dilutes the colors' semantic meaning. Users learn to associate green with success through repetition; every non-success use of green weakens that association.

**Implementation guidance:**
- Reserve semantic colors for their semantic meanings. Success is for confirmation of action. Warning is for recoverable issues that require attention but don't block. Error is for failures and blocking issues. Info is for neutral informational callouts.
- Don't use semantic colors for brand or decorative purposes. If you need a green that isn't "success," use a different green at different chroma/lightness or source it from a different hue territory.
- Semantic state colors are often used with subtle background tints in addition to the color itself — a pale green background behind success content, a pale amber behind warning content. These tinted backgrounds should derive from the same hue as the semantic color, at very low chroma (0.02-0.05) and high lightness (95-97% in light mode, 15-20% in dark mode).

### Interactive states and color

**Principle:** Hover, active, focused, and selected states are color relationships, not single colors. Design them systematically across the palette.

**Reasoning:** Interactive state colors are often afterthoughts — a slight darkening on hover, a slight lift on press, without systemic logic. A well-designed palette defines how interactive states work across all interactive elements, so that hover on a primary button, a secondary button, a nav item, and a list row all feel related.

**Implementation guidance:**
- Define interactive state adjustments in relative terms: "hover darkens by 4% lightness," "pressed darkens by 7% lightness and reduces chroma by 0.02," "focused adds a 2px ring at accent hue." These relative rules apply consistently across the palette.
- Focus states must be visible to keyboard users without being decorative noise for mouse users. A clear focus ring using the accent color at high chroma is typically correct. Outline removed without replacement is both an accessibility failure and a UX failure.
- Selected states (in lists, tables, multi-select UIs) should use accent color at low chroma and high lightness (in light mode) — a tint of the accent rather than the accent itself. This signals selection without dominating.

---

## 9. Gradients, Transparency, and Atmosphere

### Gradients require a reason

**Principle:** Gradients are a powerful effect, which is why they're overused. Every gradient should serve a purpose — communicating depth, directing attention, creating atmosphere — not merely decorating.

**Reasoning:** The purple-to-blue gradient is the single most recognizable signature of AI-generated design. Its overuse has made gradients in general feel suspect. The correction isn't to avoid gradients entirely — it's to use them with clear purpose. A subtle gradient within a single hue family can create elegant depth; a dramatic multi-stop gradient can be a distinctive brand moment. Gradients across disparate hues (purple to cyan, orange to pink) are now so strongly AI-coded that they should be avoided unless the specific reference is intentional.

**Implementation guidance:**
- Prefer single-hue gradients — variation in lightness and chroma within one hue range — over multi-hue gradients. A gradient from a deep blue to a lighter blue of the same hue feels considered; a gradient from blue to purple feels generic.
- If a multi-hue gradient is used, keep the hue range narrow (adjacent on the color wheel) unless the contrast is the point.
- Avoid the specific gradient families that have become AI-coded: purple-to-blue (270°→240°), purple-to-pink (290°→340°), cyan-to-blue (190°→230°). These ranges are so overused they now signal default rather than design.
- Mesh gradients, noise-textured gradients, and subtle radial gradients can add atmosphere without reading as generic — they feel more like painted surfaces than CSS defaults.

### Transparency and layering

**Principle:** Semi-transparent surfaces can create depth and atmosphere, but they require background awareness. Treat transparency as a deliberate layering tool, not a default effect.

**Reasoning:** Semi-transparent surfaces shift based on what's behind them, which can create dynamic interest or unintended color shifts. Used thoughtfully, transparency creates depth (a navigation bar that subtly takes on the color of the content below), atmosphere (a modal that lets the background color softly influence the foreground), or material feel (glass-like surfaces that feel layered rather than stacked). Used thoughtlessly, transparency produces muddy, inconsistent interfaces where colors feel arbitrary.

**Implementation guidance:**
- When using transparency, also define a fallback solid color for contexts where the background can't be guaranteed (for example, when content scrolls behind a sticky header).
- Backdrop blur combined with transparency creates the "frosted glass" effect. Used sparingly, it's elegant. Applied to every surface, it becomes exhausting and reads as imitation of iOS design.
- Tinted transparency (rgba with a slight color shift) can create warmth or coolness in layering. A slightly warm-tinted semi-transparent white over content feels different from a pure white with the same alpha.

---

## 10. Contextual Starting Points

These are curated starting points for common product contexts. They are not prescriptions — every product should make its own character decision. But they provide concrete references for what deliberate color choices look like, and they actively move away from the AI-default aesthetics.

**Developer tool, technical, precision-oriented.** Consider restrained warm neutrals with a muted accent. Background: warm off-white like `oklch(98% 0.005 80)` or a deeper technical charcoal like `oklch(18% 0.01 80)`. Accent: avoid standard tech-blue; consider amber (`oklch(65% 0.15 75)`), deep green (`oklch(50% 0.12 145)`), or a muted terra-cotta (`oklch(60% 0.14 40)`). Saturation kept low to communicate precision over exuberance.

**Financial, legal, enterprise — trust and authority.** Consider cool, restrained neutrals with a classic accent. Background: cool near-white like `oklch(98% 0.003 250)` paired with deep navy text like `oklch(22% 0.03 250)`. Accent: deep blue (`oklch(45% 0.15 245)` — aiming for "considered navy," not "tech startup blue"), or burgundy (`oklch(42% 0.16 15)`) for a more traditional feel. Low chroma throughout; the restraint signals seriousness.

**Consumer product, warmth and humanity.** Consider warm neutrals and an accent with natural associations. Background: warm cream like `oklch(97% 0.015 80)` or a soft sage background for wellness products. Accent: natural hues — terracotta, sage, muted coral, dusty rose, forest green. Avoid cool blues and grays; avoid purple especially. The palette should feel like materials from the natural world, not from a tech product.

**Editorial, content-heavy, reading-focused.** Consider high contrast and classical proportions. Background: near-white, possibly slightly warm like `oklch(98% 0.008 70)`. Text: near-black at high contrast. Accent used sparingly — perhaps a single editorial red (`oklch(48% 0.18 25)`) or a forest green. Dark mode for editorial should lean toward soft charcoal backgrounds like `oklch(16% 0.008 80)`, not pure black.

**Marketing site, brand expression, distinctive voice.** Consider bolder palettes with more expressive accents. This is where committed color choices live — a deep emerald, a saturated ochre, an assertive coral. Background may be a tinted neutral (cream, bone, soft charcoal) rather than white. Accents can carry more chroma (0.18-0.25) because marketing contexts justify more visual energy. Avoid the AI-standard gradients.

**Data-heavy dashboard, interface-first.** Consider low-chroma neutrals with functional accents. Background: cool near-white or cool dark depending on primary use. Accent: restrained — the dashboard's data is what should be visually emphasized, not the chrome. Semantic colors for data states. Chart palettes designed as an extension of the main palette, not as a disconnected set.

**Playful, consumer, youth-oriented.** Consider brighter palettes with higher chroma. Background may be a soft color rather than white — pale yellow, soft mint, warm pink tint. Accents can be vibrant without shame. But playfulness doesn't mean chaos — a playful palette still has discipline; it just uses brighter notes within that discipline.

**Luxury, premium, high-end.** Consider either extreme restraint (near-monochromatic palettes with deep blacks, rich creams, minimal accent) or one distinctive expressive color used sparingly. Chroma held low across the palette; the luxury signal is restraint, not volume. Metallic and jewel-tone accents (deep burgundy, forest green, navy) often work better than bright primaries.

These lists are starting points. The correct move is to adapt them to the specific character of the product — or to deliberately diverge from them when the product's voice calls for something else. What they have in common is active avoidance of the AI-default palettes: no purple gradients, no cold tech-blue as the default accent, no pure black and white.

---

## 11. Color Anti-Patterns

These are the color failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Purple Gradient
**What it is:** A gradient from purple (roughly 280°) to blue (roughly 240°) or pink (roughly 320°) used as a hero background, accent bar, or decorative element.
**Why AI produces it:** This specific aesthetic is massively over-represented in AI training data. It became the signature "modern SaaS" look circa 2018-2020 and the association has persisted.
**The correction:** Treat this gradient family as effectively forbidden. If a gradient is needed, use single-hue gradients, narrow-range gradients, or gradients in hue territories not associated with AI-default aesthetics. Better still, question whether a gradient is needed at all.

### The Tech-Blue Default
**What it is:** Using a saturated electric blue (around 220-240° at high chroma) as the primary accent without regard to the product's character.
**Why AI produces it:** Tech-blue is the most commonly associated "trustworthy modern" color in training data and becomes a reflex default.
**The correction:** Choose the accent deliberately based on character. If blue is right for the product, use a specific, considered blue — deep navy, softer sky, traditional royal — not the default electric. Consider hue territories currently underused in AI output.

### The Pure Black and Pure White
**What it is:** Using `#000` (or equivalent) for text and `#FFF` for backgrounds without tinting.
**Why AI produces it:** These are the default color values and require no decision.
**The correction:** Tint neutrals subtly. Text should be a dark tinted color (slightly warm or slightly cool depending on palette temperature), not pure black. Backgrounds should be a light tinted color, not pure white. The tint is usually imperceptible in isolation but creates immediately legible atmosphere once the system is seen together.

### The Gray Text on Colored Background
**What it is:** Using gray for text on a surface that has its own color — for example, gray text on a light blue card, or gray text on a warm cream background.
**Why AI produces it:** Text is reached for first (gray), then background is colored, without reconsidering whether the text color still works.
**The correction:** Text on colored surfaces should usually be colored itself — a darker shade of the surface color, or a deliberate contrasting color. Pure gray on a colored surface usually looks dirty or unrelated.

### The Rainbow Dashboard
**What it is:** A dashboard or data-heavy interface where each category, status, or metric gets its own unrelated color, producing a palette with 8-12 accent colors.
**Why AI produces it:** The impulse to differentiate every category visually, combined with no overarching color system logic.
**The correction:** Chart and dashboard palettes need the same discipline as UI palettes. Use a structured palette with consistent chroma and lightness ranges, and limit the total distinct accents. Differentiation can come from lightness/chroma variation within a single hue family, not only from hue shifts.

### The Inverted Dark Mode
**What it is:** A dark mode that was produced by mechanically inverting light mode's colors — pure black backgrounds, pure white text, accents unchanged.
**Why AI produces it:** Dark mode is treated as a color transformation rather than as a parallel design system.
**The correction:** Design dark mode as a parallel system with its own logic. Backgrounds at 13-18% lightness, not 0%. Text at 92-96% lightness, not 100%. Accents adjusted (typically desaturated and brightened) for dark surfaces. Surface elevation expressed through lightness increase, not through shadow alone.

### The Saturated Error
**What it is:** Error states using fully saturated red (`oklch(55% 0.25 25)` or similar) in ways that dominate the interface — large error backgrounds, heavy red borders, alarming red text.
**Why AI produces it:** Red means error, so more red means clearer error.
**The correction:** Error states should be legible and clear, not alarming. A deliberately muted error red (`oklch(50% 0.15 25)`) is often more effective than a fully saturated one. Error contexts can combine color, iconography, and copy to communicate severity without shouting.

### The Accessibility-Technically-Passed
**What it is:** Text that sits exactly at 4.5:1 contrast — the WCAG minimum — and reads as worn-out rather than intentionally subtle.
**Why AI produces it:** "Meets contrast requirements" is treated as the goal rather than the floor.
**The correction:** Treat WCAG minimums as the floor, not the target. Primary text should sit well above 4.5:1 (often 10:1+). Reserve the 4.5:1 range for tertiary text where subtlety is genuinely wanted, not for primary reading content.

### The Accent Everywhere
**What it is:** An interface where accent color appears in dozens of places — buttons, borders, icons, highlights, backgrounds, dividers — until it has lost its ability to direct attention.
**Why AI produces it:** The accent color is treated as decoration rather than signal.
**The correction:** Reserve accent color for genuine attention-worthy moments. In a typical interface, accent should cover 2-5% of visible surface, not 20%. Everything else lives in the neutral palette.

### The Semantic Drift
**What it is:** Using semantic colors (success green, warning amber) for non-semantic purposes — green because "this section is positive," amber because "this feature is highlighted."
**Why AI produces it:** The colors are treated as a general palette rather than as a functional vocabulary.
**The correction:** Reserve semantic colors for their semantic meanings. If a non-semantic green is needed, source it from a different hue range or different chroma/lightness than the success green.

### The Temperature Mismatch
**What it is:** A palette where neutrals are tinted in one temperature direction (warm) and accents in the opposite (cool), without deliberate contrast intent.
**Why AI produces it:** Neutrals and accents are chosen separately without considering their relationship.
**The correction:** Establish the palette's overall temperature first. Accents usually harmonize best when they respect that temperature, unless temperature contrast is explicitly the goal.

### The Oklch-Unaware System
**What it is:** A palette built in HEX or HSL where "equivalent" lightnesses don't actually look equivalent — a yellow at 50% L looking dramatically brighter than a blue at 50% L.
**Why AI produces it:** HEX and HSL remain the most common color specifications in training data.
**The correction:** Build palettes in OKLCH where lightness is perceptually uniform. If HEX values are needed for compatibility, derive them from OKLCH-constructed palettes rather than the reverse.

---

*This reference file is loaded alongside the Spruce core skill. Color decisions follow from the product's character and the typographic voice already established. The highest-leverage color move is almost always upstream of the color picker — deciding what the palette should feel like before choosing any specific hue. And in every case: actively avoid the AI-coded defaults. The purple gradient is not a color choice. It is the absence of one.*
