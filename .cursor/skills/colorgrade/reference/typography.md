# Spruce Reference: Typography

---

## How to Use This File

This reference encodes the typographic reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted whenever an interface involves text — which is to say, always.

Typography is the most visible signal of design care. More than color, more than layout, more than component choice, typography communicates immediately whether an interface was made by someone paying attention. It is also the single most-abused domain in AI-generated design, because the safe default (Inter, system-ui, uniform weights) is both easy to reach for and immediately recognizable as AI output.

This file teaches the reasoning behind typographic decisions, then provides curated starting points for common product contexts. The goal is never to produce the same typography twice — it is to produce typography that fits the specific product, audience, and moment.

---

## Contents

1. The Foundational Commitment
2. Typeface Selection as Character Decision
3. The Type System
4. Hierarchy Through Contrast
5. Measure, Leading, and Rhythm
6. The Details That Separate Craft from Output
7. Font Pairing
8. Contextual Starting Points
9. Typography Anti-Patterns

---

## 1. The Foundational Commitment

### Typography is character before it is craft

**Principle:** A typeface is the voice of a product before any word has been read. The choice must be made deliberately, with the product's character as the primary input.

**Reasoning:** Before a user reads a single word, they've already read the type. Letterforms communicate before meaning does — they signal whether the product is serious or playful, traditional or contemporary, clinical or warm, restrained or expressive. AI-generated interfaces routinely ignore this first communication by defaulting to Inter or system fonts, which have one unified quality: they are the absence of a voice. They don't commit to a character because they were designed not to.

This is the single highest-leverage decision in typography. A deliberately chosen typeface with ordinary hierarchy beats a pile of rules applied to Inter every time. If one thing in this file is treated as non-negotiable, it should be this: the typeface choice must be made with the product's character in mind.

**Failure mode:** Products that feel generic because their typography could belong to any product. Interfaces where the letterforms communicate "AI-generated" before any content does.

**Implementation guidance:**
- Before any other typographic decision, answer: what does this product's voice sound like? Warm, clinical, technical, editorial, playful, confident, quiet, assertive? Translate that voice into type.
- Treat Inter, Roboto, system-ui, and Arial as forbidden defaults for any project where character matters. They have legitimate uses in specific contexts (developer tools that want to read as OS-native, for example), but they should be a deliberate choice, not a fallback.
- A typeface carries history, geography, and intent. A geometric sans built in the 1920s (Futura) communicates something structurally different from one built in the 2010s (Söhne). The references a typeface carries are part of what it says. Use them deliberately.

### Every typeface is a choice against all the others

**Principle:** The typeface you pick is defined as much by what it excludes as by what it includes. Understand what you're choosing against.

**Reasoning:** When the same typeface could be right for everything, it's right for nothing. Good typography is specific — it fits this product, this audience, this moment — and that specificity is only possible if the chosen typeface actively rejects alternatives. The question "could this product use Inter instead?" should almost always return a clear answer: yes and it would be worse, or no and here's why.

**Implementation guidance:**
- When proposing a typeface, articulate the alternatives it's being chosen over. A developer tool that picks a monospace display typeface is actively choosing against the neutral sans aesthetic — that's a meaningful choice worth stating.
- Beware of "safe" typefaces that feel like they could fit any product. Inter, Söhne (used generically), Helvetica Now, system-ui. These read as absence of commitment unless paired with strong typographic behavior elsewhere in the system.

---

## 2. Typeface Selection as Character Decision

### The character dimensions

Every typeface sits on several spectra. Before selection, locate the product along each:

**Warmth ↔ Neutrality.** Humanist typefaces (those that carry evidence of hand-drawn origins — varying stroke widths, organic curves) read as warm. Geometric typefaces (constructed from circles, squares, and mathematical proportions) read as neutral or cold. A wellness product wants warmth. A financial dashboard may want neutrality. Both are legitimate; they are different voices.

**Authority ↔ Approachability.** Higher-contrast typefaces with strong serifs or assertive letterforms read as authoritative. Rounded, open, low-contrast forms read as approachable. A law firm wants authority. A children's learning product wants approachability.

**Traditional ↔ Contemporary.** Typefaces designed before roughly 1900 carry traditional associations regardless of their use. Contemporary typefaces (post-2000) carry currency. The same product can lean in either direction for different reasons — a traditional typeface can signal trust and heritage, a contemporary one can signal innovation and freshness.

**Restrained ↔ Expressive.** Some typefaces have minimal personality and recede into the background. Others have strong features — distinctive letterforms, unusual characters, expressive details — and demand attention. A dashboard likely wants restrained type for sustained reading. A marketing hero can afford expressive type that announces itself.

**Editorial ↔ Functional.** Editorial typefaces are designed for long-form reading — they have subtle contrast, careful spacing, legibility at body sizes. Functional typefaces are designed for interfaces — they perform well at small sizes, have clear distinguishing features between similar letters (Il1, O0), and hold up in dense UI. Products that combine long-form reading with interface elements often need both.

### The genre landscape

Beyond character dimensions, typefaces fall into genres, each carrying associations. Spruce considers these genres as starting territories, then makes a specific choice within them:

**Neo-grotesques.** The modern descendants of Helvetica. Neutral, industrial, precise. Legitimate when the product's character genuinely aligns with precision and industrial neutrality — otherwise, a sign of default-picking. Examples: Söhne, Neue Haas Grotesk, Haas Unica.

**Humanist sans.** Sans-serifs with evidence of handwriting — varying stroke widths, open apertures, organic curves. Warmer than neo-grotesques, still clean enough for interfaces. Strong default for products that want to feel human without being ornamental. Examples: Gill Sans, Frutiger, FF Meta, Fraunces (when variable), Work Sans.

**Geometric sans.** Built from mathematical shapes. Modern, confident, sometimes cold. Can feel contemporary and structured, or austere depending on execution. Examples: Futura, Avenir, Gotham, Poppins, Montserrat (though Poppins and Montserrat have become overused).

**Transitional and modern serifs.** Serifs with higher contrast, designed for editorial work. Communicate seriousness, tradition, craft. Strong for products where authority and readability matter equally — legal, financial, editorial, luxury. Examples: Tiempos, Source Serif, EB Garamond, Playfair Display (though Playfair is overused).

**Old-style serifs.** Serifs with lower contrast, evidence of pen-drawn origins. Warmer than modern serifs, readable at body sizes, carry literary and traditional associations. Examples: Caslon, Garamond, Lyon Text, Fraunces.

**Slab serifs.** Serifs with heavy, block-like terminals. Assertive, contemporary when done well, can feel dated when done poorly. Examples: Tiempos Slab, Roboto Slab (careful — cliché risk), Archivo.

**Monospace.** Every character occupies the same horizontal space. Signals technical, mechanical, or typewriter associations. Can be used functionally (code, data) or expressively (editorial display). Examples: JetBrains Mono, IBM Plex Mono, Berkeley Mono, Space Mono.

**Display typefaces.** Designed for large sizes and short strings. Can be expressive, unusual, even strange. Appropriate for hero text, headlines, branding elements. Rarely appropriate for body copy. Huge range.

### The choice procedure

Before committing to a typeface, Spruce runs this short procedure:

1. What is the product's character? (One sentence: three adjectives.)
2. What genres align with that character? (One or two genres maximum.)
3. What specific typefaces within those genres fit the product's moment (traditional vs. contemporary, editorial vs. functional)?
4. Of those candidates, which actively rejects the AI-default aesthetic of Inter/Roboto/system-ui?
5. Will this typeface hold up across the sizes and weights the product needs?

The output of this procedure is a deliberate choice with reasoning that can be explained. If the reasoning amounts to "it's clean and readable," the procedure wasn't run — those properties describe nearly every functional typeface.

---

## 3. The Type System

### A type scale is a commitment to hierarchy

**Principle:** Before any text is placed, a type scale exists that defines the sizes text can take. Every text element uses a scale step — no arbitrary sizes.

**Reasoning:** Typography without a scale looks like typography. AI-generated UI frequently produces text at whatever size felt right at the moment — a heading at 22px here, 26px there, body copy at 15px in one component and 16px in another. The result is hierarchy that feels noisy because the differences between levels aren't meaningful. A scale creates meaningful hierarchy by ensuring that size differences are perceptible and consistent.

**Implementation guidance:**
- Use a modular scale — a sequence where each step relates to the previous by a consistent ratio. Common ratios: 1.125 (major second, conservative), 1.2 (minor third, balanced), 1.25 (major third, generous), 1.333 (perfect fourth, expressive). Larger ratios produce more dramatic hierarchy; smaller ratios produce more subtle hierarchy.
- For most applications, a scale from roughly 12px (captions, metadata) to 48px+ (display headings) provides sufficient range. Marketing sites often extend to 96px+ for hero text.
- Fluid typography using `clamp()` is appropriate for marketing and content pages where text should scale with viewport. Avoid fluid typography in application UIs, where predictable sizes support scanability.
- Every size in the scale should have a named role: display, h1, h2, h3, body, caption, micro. When you need a new size, either it belongs in the scale or the design lacks hierarchy discipline.

### Weights are part of the scale

**Principle:** Type weight is as structural as type size. A type system defines which weights exist and what they mean.

**Reasoning:** AI-generated typography often uses weight inconsistently — bold for some headings, semibold for others, mixing weights within the same hierarchical level. This produces visual noise that reads as carelessness. A disciplined system assigns weights to roles: display headings always in one weight, body always in another, emphasis always in a specific weight.

**Implementation guidance:**
- Limit the system to three weights in most cases: one for body text (regular, 400 or book), one for emphasis and important interface text (medium or semibold, 500–600), one for display and strong headings (bold or heavier, 700+).
- When working with variable fonts, the expanded weight range is a creative tool — use it deliberately, not arbitrarily. Ultra-light for editorial display, black for assertive hero text.
- Light weights (300 and below) should be avoided at body sizes. They reduce readability, particularly on lower-resolution displays, and often read as thin rather than elegant.

---

## 4. Hierarchy Through Contrast

### Hierarchy is built through differences, not decoration

**Principle:** The user's eye moves through an interface based on visual contrast. The strongest contrasts capture attention first. Typography creates hierarchy primarily through four dimensions of contrast: size, weight, color, and space.

**Reasoning:** AI-generated typography frequently creates weak hierarchy because the contrasts are too subtle. Heading at 18px, body at 16px — the user can't tell which is which without reading. Heading in semibold, body in regular — a subtle difference that gets lost. Weak hierarchy is worse than no hierarchy because it implies structure that doesn't support scanning.

**Implementation guidance:**
- For any two hierarchical levels to read as distinct, they need meaningful contrast on at least two of: size, weight, color, space. One dimension alone is usually insufficient.
- The size ratio between adjacent hierarchical levels should be at least 1.2×. Smaller ratios produce weak hierarchy that's hard to scan.
- Strong hierarchy often comes from dramatic contrast — a display heading that's 3-4× the body size, paired with body text that's held to a single weight and size. Less variety in the middle produces more power at the extremes.
- Space is a hierarchy tool. Generous space above a heading tells the reader it starts a new section. Tight space between a heading and its body text tells them they belong together. The ratio of space above to space below a heading should be roughly 2:1 (more space above).

### Color contrast is hierarchy

**Principle:** Text color is a hierarchical signal. Primary text, secondary text, and tertiary text should each have a defined color that communicates their role.

**Reasoning:** The conventional pattern of "dark text on light background" collapses hierarchy into a single value. Better systems establish a gradient of text colors: primary (highest contrast), secondary (reduced contrast for supporting information), tertiary (further reduced for metadata and labels). Each level's color communicates its importance before any words are read.

**Implementation guidance:**
- Establish three text colors for light backgrounds: primary (roughly 90-95% darkness — rarely pure black), secondary (roughly 60-70%), tertiary (roughly 45-55%).
- For dark backgrounds, the inverse: primary at 90-95% white (again, rarely pure white), secondary at 70-75%, tertiary at 55-60%.
- Pure black (#000) on pure white (#FFF) produces eye strain at sustained reading sizes. Tinted near-blacks (slightly warm or slightly cool) read more naturally. See the color reference for tinting guidance.
- All three levels must meet accessibility contrast minimums for their size. Tertiary text at small sizes is where this is most often violated — metadata rendered at 12px in light gray fails readability.

---

## 5. Measure, Leading, and Rhythm

### Measure: the line length that supports reading

**Principle:** The number of characters per line — the measure — determines whether text can be read comfortably. Text that's too wide is exhausting; text that's too narrow is fragmented.

**Reasoning:** Readers' eyes need to find the start of each new line. When lines are too long, the return sweep becomes error-prone — the reader may skip a line or re-read the same line. When lines are too short, the sweep is constant and the content is fragmented into tiny chunks. The ideal falls in a known range.

**Implementation guidance:**
- Body text: 45–75 characters per line is the ideal range. 65 is often cited as the sweet spot.
- For body text at 16px in most typefaces, this corresponds to roughly 30–42rem of container width.
- Use `max-width` on text containers to enforce measure — don't let text expand to fill available width.
- Sidebar text, captions, and short labels don't need full measure enforcement. The principle applies to sustained reading text.
- Mobile layouts typically have narrower measures simply because viewport width constrains them. This is fine — mobile users are generally reading in shorter sessions and shorter passes.

### Leading: the space between lines

**Principle:** Line-height must be calibrated to the typeface and size. Tight leading makes text feel compressed and hard to scan; loose leading makes text feel disconnected.

**Reasoning:** Different typefaces have different built-in vertical metrics and need different line-heights to feel correctly spaced. The same 1.5 line-height that works for one typeface may feel too tight for another. AI-generated typography often applies a single line-height value across all text, producing uneven vertical rhythm.

**Implementation guidance:**
- Body text: line-height 1.5–1.7× the font size for most typefaces. Serifs and text typefaces often need slightly more (1.6–1.75); contemporary sans-serifs often work at 1.5–1.6.
- Headings: line-height tightens as text gets larger. Display headings may use 1.0–1.1. H1 and H2: 1.1–1.3. H3 and smaller: 1.2–1.4.
- Single-line text (buttons, labels, metadata): line-height can match the font size (1.0–1.2) for compact layouts.
- The line-height unit should be unitless (1.5, not 1.5rem or 24px) so it scales proportionally with font size.

### Rhythm: the vertical meter

**Principle:** Text elements on a page should relate to each other through consistent vertical rhythm — predictable spacing that creates visual music.

**Reasoning:** When every element's spacing is unique, the eye struggles to find pattern. When spacing follows a consistent rhythm — multiples of a base unit — the interface feels orderly and composed even when content varies.

**Implementation guidance:**
- Establish a spacing base unit (typically 4px or 8px). All vertical space between text elements should be a multiple of this base.
- The space above a heading should be greater than the space below it. A roughly 2:1 ratio (more above) signals that the heading belongs to the content below it, not the content above it.
- Within a paragraph, line-height handles rhythm. Between paragraphs, margin handles it. Between sections, more generous margin or an explicit separator handles it. Each level has a different spacing allocation.

---

## 6. The Details That Separate Craft from Output

These are the small details that distinguish typography produced with care from typography produced mechanically. AI-generated typography consistently misses these. Spruce treats them as required, not optional.

### Use real typographic characters

- Smart quotes instead of straight quotes: " " ' ' not " ' for prose. Straight quotes are for code only.
- Em dashes (—) for parenthetical breaks and attributions. En dashes (–) for number ranges (2020–2024). Hyphens (-) for compound words only.
- Proper ellipses (…) as a single character, not three periods.
- A non-breaking space between numbers and their units (10&nbsp;km) to prevent awkward line breaks.

### Tabular figures for numeric data

- In data tables, financial figures, statistics, and any context where numbers should align vertically, enable tabular figures via `font-feature-settings: "tnum"` or `font-variant-numeric: tabular-nums`.
- Proportional figures (the default) look better in body copy but misalign in columns.

### OpenType features

Most contemporary typefaces include OpenType features that meaningfully improve typography. They are disabled by default in CSS. Enabling them is basic craft:

- **Ligatures** (`liga`): standard ligatures like fi, fl are enabled by most browsers by default but worth confirming.
- **Contextual alternates** (`calt`): improves letter combinations that look awkward by default.
- **Stylistic sets** (`ss01`, `ss02`, etc.): typeface-specific alternate characters. Worth exploring for typefaces with notable alternate sets.
- **Small caps** (`smcp`): for acronyms in running text, small caps prevent them from shouting.

### Avoid orphans and widows in controlled contexts

- In marketing headlines and hero text, ensure the last line has at least two words. Use `text-wrap: balance` (where supported) or `<br>` tags strategically to prevent single-word last lines.
- In prose, prevent single words on the last line of a paragraph using `orphans` and `widows` CSS properties, or text-wrap pretty.

### Letter-spacing

- Body text: use the typeface's default letter-spacing. Don't tighten or loosen.
- Large display text: often benefits from slight tightening (-0.01em to -0.02em) to compensate for the visual loosening that occurs at large sizes.
- All-caps text: always needs loosened letter-spacing (0.05em to 0.1em). Uppercase characters are designed with tighter default spacing than they need when used in runs.
- Small caps: if not using true OpenType small caps, slight letter-spacing increase (0.02em to 0.04em).

### Don't fake weights

- Use the typeface's actual font weights, not CSS `font-weight: bold` applied to a typeface that doesn't have a bold weight. Synthesized bold looks visibly broken.
- Similarly, don't use CSS `font-style: italic` on a typeface without a real italic. Synthesized italic is a slanted roman, which is structurally different from a designed italic.

---

## 7. Font Pairing

### The pairing decision

**Principle:** Most products need at most two typefaces. Pairing requires either strong contrast (two typefaces that feel clearly different) or structural harmony (two typefaces designed as a family system).

**Reasoning:** A single typeface can carry an entire product if it has sufficient range (multiple weights, italic, small caps). Two typefaces can create richer hierarchy and character. Three or more typefaces almost always produces visual noise. AI-generated design often reaches for pairing as decoration rather than function — adding a second typeface without a clear role.

**Implementation guidance:**
- Prefer single-typeface systems when possible. A well-chosen typeface with strong weight range (a variable font or a family with 4+ weights) can handle display through body without needing a second family.
- When pairing, commit to a clear role for each typeface. Common patterns:
  - Serif for display + sans for body (editorial feel, common in marketing)
  - Sans for display + serif for body (reverses the convention, can feel distinctive)
  - Geometric sans for display + humanist sans for body (subtle contrast, feels designed)
  - Monospace for specific elements (code, data, technical labels) + sans for everything else
- For strong-contrast pairings, the two typefaces should feel intentionally different — not similar enough to be confused, not wildly different enough to fight. A modern serif + contemporary sans works; a script display face + industrial sans can work for specific contexts.
- For harmonious pairings, consider type families designed as systems (Söhne + Söhne Schmal + Söhne Mono, or IBM Plex Sans + Plex Serif + Plex Mono). These carry coherent character across genres.
- Body typeface is the high-stakes decision. Display can be expressive because it's used sparingly. Body must be readable for sustained use across many sizes and weights.

---

## 8. Contextual Starting Points

These are curated starting points for common product contexts. They are not prescriptions — every product should make its own character decision. But they provide concrete references for what "appropriate for this context" can look like, and they actively move away from the AI-default aesthetic.

**Developer tool, technical, precision-oriented.** Consider JetBrains Mono or Berkeley Mono for code and technical strings. Pair with Inter Display or Söhne for interface text if a neutral character is wanted, or with IBM Plex Sans for a subtly warmer technical feel. Avoid pairing code monospace with another expressive display face — let the mono carry the character.

**Financial, legal, enterprise — trust and authority.** Consider a modern serif like Tiempos Text or Source Serif for body in content contexts. Neue Haas Grotesk or Söhne for interface type. If leaning more traditional, consider Canela or GT Sectra for display.

**Consumer product, warmth and humanity.** Consider humanist sans options: Fraunces (variable, serif/sans behaviors), Work Sans, or a pairing like Söhne with Tiempos. Avoid geometric sans like Poppins and Montserrat — they've become ubiquitous in consumer products and read as generic.

**Editorial, content-heavy, reading-focused.** Consider serif body with sans display. Source Serif Pro, Lyon Text, or EB Garamond for body. Lyon Display, Söhne, or a contemporary sans for interface elements. Measure discipline is particularly important here.

**Marketing site, brand expression, distinctive voice.** Consider expressive display faces: Migra, Canela, Editorial New, or display cuts of contemporary fonts. Pair with a neutral sans for body (Söhne, Neue Haas Grotesk). Display here can be distinctive and committed — this is where character expression is most appropriate.

**Data-heavy dashboard, interface-first.** Consider interface-optimized typefaces: Inter (if you're going to use it, make it deliberate), Söhne, or IBM Plex Sans. Enable tabular figures. Keep hierarchy sharp with limited weights. A supporting monospace for data values can add clarity.

**Playful, consumer, youth-oriented.** Consider typefaces with personality: Gambarino, General Sans, Satoshi, or rounded geometrics. Avoid the overuse of Comic Sans-adjacent pseudo-playful options. Playful doesn't mean juvenile — it means the letterforms have life in them.

**Luxury, premium, high-end.** Consider high-contrast display serifs like Canela, Domaine Display, or Playfair (used carefully to avoid cliché). Pair with restrained sans for body. Generous space, tight letter-spacing on display, minimal weights. The restraint is the luxury signal.

These lists are starting points. The correct move is often to browse typography foundries (Commercial Type, Grilli Type, Pangram Pangram, Klim, Dinamo, Displaay) for typefaces that align with the specific character you've identified — and to explicitly resist the pull toward whichever typeface has become the current AI default.

---

## 9. Typography Anti-Patterns

These are the typographic failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Inter Reflex
**What it is:** Using Inter (or Roboto, or system-ui) as the default typeface regardless of product context.
**Why AI produces it:** Inter is ubiquitous in contemporary design education, widely available via Google Fonts, and has become the statistical default in AI training data.
**The correction:** Make typeface selection a deliberate character decision. Inter is acceptable when a genuinely neutral, interface-first character is wanted and the choice is explicit. It is unacceptable as a fallback. When in doubt, reach for something else — even a slightly less perfect typeface chosen deliberately beats Inter chosen by default.

### The Flat Hierarchy
**What it is:** Typography where all text sits at similar sizes and weights, producing an interface with no visual structure for the eye to follow.
**Why AI produces it:** The pattern of "heading slightly larger than body" produces apparent hierarchy without committing to meaningful contrast.
**The correction:** Establish real size differences between hierarchical levels — at least 1.2× between adjacent levels, often more. Use weight contrast as well as size contrast. Allow display headings to be dramatically larger than body text when the composition supports it.

### The Overweighted Middle
**What it is:** Using semibold or bold weights across many elements — paragraphs with bold scattered through them, subheadings in bold, buttons in bold, labels in semibold — until nothing reads as emphasized because everything is.
**Why AI produces it:** Bold is reached for whenever something might be important. The cumulative effect is emphasis inflation.
**The correction:** Reserve bold for true emphasis. Use medium weight for subtle emphasis. Use regular weight for the bulk of the interface. The ratio of bold-to-regular text in a well-designed interface is typically 1:10 or lower.

### The Ambiguous Metadata
**What it is:** Metadata text (timestamps, authors, categories, counts) rendered at small sizes in light gray, technically present but practically unreadable.
**Why AI produces it:** Metadata "should be subtle," so it's made smaller and lighter, often past the point of readability.
**The correction:** Metadata should be perceptibly less prominent than primary content, but still readable. 12-14px body with ~55% color contrast (on light backgrounds) keeps metadata subordinate while remaining legible. Anything less fails both accessibility and functional legibility.

### The Measure Failure
**What it is:** Body text that spans the full width of a wide container, producing 100+ character lines that are exhausting to read.
**Why AI produces it:** Text elements are given no max-width and expand to fill their parent container.
**The correction:** All sustained reading text needs a max-width constraint that enforces measure discipline — typically 30–42rem for body text. This applies to articles, documentation, long-form content, and any context where the user will read more than a sentence.

### The Straight Quote
**What it is:** Using ASCII straight quotes (" ') in prose text instead of proper typographic quotes (" " ' ').
**Why AI produces it:** Keyboard defaults produce straight quotes; converting them requires active effort.
**The correction:** Use proper typographic characters throughout user-facing content. Smart quotes in prose. Em dashes for parenthetical breaks. En dashes for number ranges. Proper ellipses. These details are the difference between text that reads as typed and text that reads as typeset.

### The Proportional Number Misalignment
**What it is:** Numeric data in tables and financial contexts that misaligns vertically because proportional figures are used where tabular figures are needed.
**Why AI produces it:** Tabular figures require explicit opt-in via `font-feature-settings`, which is frequently omitted.
**The correction:** Enable tabular figures on any element displaying numeric data that should align — tables, financial figures, statistics, counters. `font-variant-numeric: tabular-nums` is the CSS property.

### The Synthetic Weight
**What it is:** Using `font-weight: bold` on a typeface that doesn't have a true bold weight, producing synthesized bold that looks visibly broken.
**Why AI produces it:** Bold is requested without checking that the loaded typeface has a bold cut.
**The correction:** Load the specific weights being used. If a typeface is available in regular only, don't use bold with it — choose a different typeface or use a different emphasis technique (size, color, space).

### The All-Caps Without Spacing
**What it is:** Uppercase text (labels, buttons, headings) set at the typeface's default letter-spacing, producing cramped-looking text.
**Why AI produces it:** Uppercase is applied via `text-transform: uppercase` without compensating letter-spacing adjustment.
**The correction:** Uppercase text always needs increased letter-spacing — typically 0.05em to 0.1em. The exact value depends on the typeface and size. Small caps need a smaller increase (0.02em–0.04em).

### The Line-Height Default
**What it is:** Applying a single line-height value (usually 1.5) to all text regardless of size — leaving headings with too much air and body text possibly appropriately spaced.
**Why AI produces it:** One global line-height value is applied to all text.
**The correction:** Line-height varies with size. Body text: 1.5–1.7. Subheadings: 1.2–1.4. Display headings: 1.0–1.15. This produces vertical rhythm that reads as composed rather than uniformly spaced.

### The Orphan Word
**What it is:** Marketing headlines and hero text where the last line contains a single word, dangling awkwardly after a full line of text.
**Why AI produces it:** Text wraps naturally without typographic adjustment.
**The correction:** Marketing headlines should use `text-wrap: balance` (where supported) or strategic `<br>` tags to ensure last lines have at least two words. For body prose, `text-wrap: pretty` handles this automatically in supporting browsers.

### The Too-Thin Body
**What it is:** Body text set in light weights (300 and below), producing text that's hard to read, particularly on lower-resolution displays or in bright viewing conditions.
**Why AI produces it:** Light weights look elegant in display contexts, and the pattern is extended to body text.
**The correction:** Body text needs sufficient weight to render cleanly. Regular (400) or book (450) for most typefaces. Light weights are for display contexts at large sizes, not for sustained reading text.

---

*This reference file is loaded alongside the Spruce core skill. Typography decisions follow from the product's character and the UX reasoning about what the interface needs to do. A deliberate typeface choice is the single highest-leverage typographic decision — make it with character as the primary input, not legibility (which is assumed) or familiarity (which is the AI default).*
