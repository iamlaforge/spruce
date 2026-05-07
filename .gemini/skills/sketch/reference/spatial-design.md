# Spruce Reference: Spatial Design

---

## How to Use This File

This reference encodes the spatial reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted whenever interfaces involve the placement, spacing, and breathing room between elements — which is to say, whenever interfaces exist.

Spatial design is the third of the three high-visibility visual foundations, alongside typography and color. Unlike those two, spatial decisions are rarely noticed when they're right — good spacing reads as "this feels considered" rather than announcing itself. But bad spacing is always visible, in the specific ways AI-generated interfaces tend to fail: equal spacing everywhere with no rhythm, cramped elements with no room to breathe, or generous spacing applied uniformly so nothing feels more important than anything else.

This file covers the mechanics of spacing systems, rhythm, density, and proximity. It deliberately does *not* cover layout archetypes (asymmetric compositions, grid-breaking, editorial layouts) — those belong in the component patterns reference, which builds on the spatial vocabulary established here.

---

## Contents

1. The Foundational Commitment
2. The Spacing Scale
3. Proximity and Relationship
4. Rhythm and Vertical Meter
5. Density as Character
6. The Grid and Its Tensions
7. Breathing Room and Negative Space
8. Responsive Spatial Behavior
9. Contextual Starting Points
10. Spatial Anti-Patterns

---

## 1. The Foundational Commitment

### Space is a design decision, not a default

**Principle:** Every gap between elements, every margin around a container, every line of breathing room is a decision. Space communicates relationship, hierarchy, and importance. It is not padding that gets added at the end.

**Reasoning:** AI-generated interfaces treat spacing as a technical afterthought — elements are placed, then some padding is added to prevent them from touching. This produces interfaces where spacing is uniform because no one asked what each specific gap should communicate. A 16px gap between a section heading and its body text tells the reader one thing; a 48px gap tells them something completely different. When all gaps are the same, nothing is communicated except "the developer added some padding."

The highest-leverage spatial decision is recognizing that space itself is the primary tool for communicating hierarchy and grouping. More than color, more than typography, more than borders or backgrounds, the whitespace *between* things tells users what belongs together, what's separate, and what matters most.

**Implementation guidance:**
- Before placing any element, ask: what is its relationship to what's around it? Intimate (part of the same group), related (connected but distinct), separate (independent section)? The spacing should make the relationship visible.
- Treat every spacing decision as an opportunity to strengthen hierarchy. Two elements with identical content can feel completely different based solely on the space around them.
- When in doubt, more space rather than less. Cramped interfaces feel anxious; generous ones feel considered. The exception is when density is a deliberate character choice (see Section 5).

### Space is the cheapest and most effective hierarchy tool

**Principle:** Before reaching for color, weight, size, or decoration to create hierarchy, reach for space. Strategic use of whitespace can establish clearer hierarchy than any visual treatment.

**Reasoning:** AI-generated interfaces often try to create hierarchy through visual emphasis — bolder weights, larger sizes, stronger colors, heavier borders. These tools work, but they're the secondary tools. The primary tool is proximity: what's close together reads as related, what's separated reads as distinct. An interface that gets proximity right often needs very little additional emphasis to feel clearly structured. An interface that gets proximity wrong can't be rescued by any amount of color or weight.

**Implementation guidance:**
- When hierarchy feels weak, the first move is to examine spacing, not styling.
- Group related elements with small, consistent spacing. Separate distinct groups with noticeably larger spacing. The ratio between "related" and "distinct" spacing should be at least 2:1, often 3:1 or more.
- The absence of space is itself a hierarchy signal. Two elements pressed against each other with zero gap reads as "these are inseparable" — this can be intentional (a button group, a form field with its label) or accidental (crowding that signals sloppiness).

---

## 2. The Spacing Scale

### The base unit and why it matters

**Principle:** Every spacing value in an interface should derive from a single base unit, typically 4px or 8px. This produces mathematical coherence that registers perceptually as "considered design."

**Reasoning:** When spacing values are chosen arbitrarily — 13px here, 22px there, 31px somewhere else — the interface reads as uncomposed even when each individual choice seems fine in isolation. When all values are multiples of a shared base, the interface has underlying mathematical order that the eye reads as harmony even without consciously noticing the pattern. This is the same reason musical intervals sound harmonious: related frequencies produce coherence, unrelated frequencies produce dissonance.

The 4px base is the most common choice because it's divisible by both 2 and 4, allowing for fine-grained control at small scales (4, 8, 12, 16) and broader strokes at large scales (24, 32, 48, 64). The 8px base is cleaner but offers less granularity at small scales. Both are legitimate; 4px is typically preferred for interface-heavy products, 8px for simpler marketing contexts.

**Implementation guidance:**
- Choose a base unit at the start of a project and derive all spacing from it. 4px is the recommended default.
- Don't mix base units within a single system. If your base is 4px, avoid 5px, 6px, 10px values. This discipline is what makes systematic spacing feel systematic.
- Sub-pixel values and odd numbers should almost never appear in user-facing spacing. 1px and 2px exist for borders and hairlines; 3px is rarely needed; 5px and 7px are code smells.

### A reference spacing scale

**Principle:** A complete spacing scale covers both intimate spacing (gaps within components) and architectural spacing (gaps between sections). The scale should feel proportional, with meaningful differences between adjacent values.

**Reasoning:** AI-generated interfaces often use only a narrow range of spacing values — everything between 12px and 24px — producing uniform texture throughout. Good spatial design uses the full range, from very tight intimate values to very generous architectural ones. The presence of dramatic spacing contrast is what makes some interfaces feel composed and others feel flat.

**Implementation guidance:**

A reference 4px-based scale that works for most product contexts:

| Token | Value | Primary Use |
|-------|-------|-------------|
| `space-0` | 0px | No gap, flush elements |
| `space-1` | 4px | Micro-spacing between closely related atoms (icon + label) |
| `space-2` | 8px | Tight spacing within components (input padding, button padding) |
| `space-3` | 12px | Spacing between related form fields, list items |
| `space-4` | 16px | Standard component padding, gap between related elements |
| `space-5` | 20px | Medium spacing, intermediate gaps |
| `space-6` | 24px | Spacing between distinct grouped elements |
| `space-8` | 32px | Space between component groups, content blocks |
| `space-10` | 40px | Section-internal spacing |
| `space-12` | 48px | Space between major sections in dense layouts |
| `space-16` | 64px | Comfortable section separation |
| `space-20` | 80px | Generous section separation |
| `space-24` | 96px | Architectural spacing, marketing sections |
| `space-32` | 128px | Heroic spacing, major section breaks |

Not every scale step needs to be used in every project. A typical product might use 8-10 values from this scale actively. What matters is that all values used are drawn from the scale, not invented ad hoc.

For 8px-based scales, the same principles apply with doubled base values: 0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192.

### The geometric temptation

**Principle:** Purely geometric scales (where each step is a fixed multiplier of the previous) sound appealing in theory but often feel awkward in practice. Use judgment, not formulas.

**Reasoning:** Some spacing systems are built on pure geometric progressions — 4, 8, 16, 32, 64, 128, each value doubling. This produces mathematical elegance but creates large gaps in the middle range where many interfaces need more granular control. The jump from 16 to 32 is often too much for the "slightly more than standard" spacing that comes up constantly in real interfaces.

A more practical scale is semi-geometric: smaller increments in the frequently-used middle range (16, 20, 24, 32) and larger leaps at the extremes (64, 96, 128). This matches actual usage patterns — fine control where it's needed, broad strokes where it isn't.

**Implementation guidance:**
- At small scales (up to ~24px), increments of 4px give useful granularity.
- In the medium range (24-64px), increments of 8px are appropriate.
- Above 64px, larger jumps (16px, 32px, even 64px between adjacent scale steps) work fine because these values are used less frequently and for architectural purposes.

---

## 3. Proximity and Relationship

### The law of proximity

**Principle:** Elements placed close together are perceived as related. Elements separated by space are perceived as distinct. This is one of the most reliable perceptual principles in design, and it's the primary lever for establishing grouping without visual decoration.

**Reasoning:** The human visual system groups elements based on distance before it processes any other cue. Two items with 4px of space between them are perceived as parts of a single unit; the same two items with 32px between them are perceived as separate units — even if they're identical in every other way. This means spacing can establish grouping more reliably than color, borders, or containers.

AI-generated interfaces frequently violate this principle by using the same spacing for elements that should be grouped and elements that should be separated. The result is interfaces where everything feels like a flat list of equal items, regardless of the underlying hierarchy.

**Implementation guidance:**
- Establish at least three distinct spacing levels for vertical relationships:
  - **Intimate:** elements that belong to the same atomic unit (label + input, icon + text). Typical range: 4-8px.
  - **Related:** elements that belong to the same group but are distinct items (form fields within a section, cards in a list). Typical range: 12-24px.
  - **Separated:** elements that belong to distinct groups (sections of a form, distinct content blocks). Typical range: 32-64px.
- The ratios between these levels should be perceptible. If your intimate spacing is 8px and your related spacing is 12px, the difference is too subtle to read as hierarchy. A 2x jump (8 → 16, 16 → 32) produces clearer grouping than smaller increments.
- When in doubt about whether two elements are "related" or "separated," look at the content. Do they answer the same question or different questions? Do they belong to the same user task or different tasks? Spacing should follow the underlying relationship, not just the visual appearance.

### Asymmetric padding

**Principle:** Padding around elements is often asymmetric by design. A heading's top margin should be larger than its bottom margin. A form section's bottom padding should be larger than its top padding. Symmetric padding frequently produces weaker hierarchy than asymmetric.

**Reasoning:** When a heading sits 24px below the preceding content and 24px above its own body text, the visual grouping is ambiguous — does the heading belong to what's above or what's below? Asymmetric spacing (say, 48px above and 16px below) makes the grouping immediate: the heading clearly introduces the content that follows.

This same principle applies throughout an interface: top padding typically differs from bottom padding, the space before an element differs from the space after. AI-generated interfaces often apply symmetric padding as a default, producing weaker hierarchy.

**Implementation guidance:**
- Headings: more space above, less below. A typical ratio is 2:1 (for example, 48px above, 24px below).
- Sections: typically more space between sections than within them, but within a section, the first element may have less top padding than subsequent elements.
- Form sections: a section header or group title typically needs generous top margin (indicating it's starting something new) but tighter bottom margin (indicating it belongs to the fields that follow).

---

## 4. Rhythm and Vertical Meter

### Vertical rhythm through consistent meter

**Principle:** An interface reads as composed when its vertical spacing follows a consistent rhythm. The gaps between elements shouldn't feel arbitrary; they should feel like beats in a meter.

**Reasoning:** When every vertical gap in an interface is a multiple of the base spacing unit, the eye registers underlying rhythm — the interface has visual meter, the way music has time signatures. When gaps are arbitrary (22px here, 29px there), the interface feels like prose without punctuation. The reader can still parse it, but it takes more effort and the result is harder to scan.

**Implementation guidance:**
- All vertical spacing between elements should be multiples of the base unit. No exceptions.
- Within a single region of the interface (a form, a card, a section), the number of distinct spacing values used should be small — typically 3-4 values covering intimate, related, separated, and architectural relationships.
- Rhythm is most perceptible in content-heavy surfaces like articles, documentation, and form-heavy pages. In these contexts, spacing discipline has outsized impact on perceived quality.

### Breaking rhythm for emphasis

**Principle:** Once a rhythm is established, deliberately breaking it can be a powerful emphasis technique. A section surrounded by dramatically more whitespace than its neighbors reads as important precisely because the rhythm has been interrupted.

**Reasoning:** Breaking a pattern only works when the pattern is first established. An interface where every gap is different has no rhythm to break. An interface with clear, consistent rhythm can use an unusually generous gap to signal "pay attention, this is different" — and the eye will respond to the break as meaningful rather than arbitrary.

**Implementation guidance:**
- Use rhythm-breaking spacing sparingly. The more places you break the rhythm, the less effective each break becomes.
- Marketing hero sections, pricing CTAs, testimonial blocks, and major transition points are common legitimate places to break rhythm.
- The break should be dramatic enough to register as intentional. Adding 8px more than the usual rhythm isn't a break; it's a wobble. Adding 64px more is a break.

---

## 5. Density as Character

### Density is a character decision

**Principle:** Before deciding on specific spacing values, decide how dense the interface should feel. Density is a product character decision — it signals the type of product, the expertise level of the user, and the nature of the task.

**Reasoning:** Interfaces exist on a density spectrum from extremely spacious (editorial, marketing, luxury) to extremely dense (professional tools, data-heavy applications, terminals). Both ends are legitimate — they signal different product characters for different audiences. A financial trading dashboard with generous whitespace looks toylike; a meditation app with dense data tables looks overwhelming. The right density depends on what the product is and who uses it.

AI-generated interfaces tend toward a middle-density default that works okay for many products and is ideal for none. Explicitly deciding on density at the start produces interfaces that feel appropriate for their context.

**Implementation guidance:**

Three density archetypes:

**Spacious (editorial, marketing, consumer):**
- Generous section spacing (64-128px between major sections)
- Comfortable component padding (24-32px)
- Line-length discipline (45-75 characters)
- Pages feel like they invite reading rather than scanning

**Balanced (standard product interfaces, dashboards with moderate data):**
- Medium section spacing (32-64px)
- Standard component padding (16-24px)
- Intentional but not extreme use of whitespace
- The default mode for most SaaS products

**Dense (professional tools, data-heavy dashboards, power-user interfaces):**
- Compact section spacing (16-32px)
- Tight component padding (8-16px)
- High information-per-pixel ratio
- Signals expertise and professional use

These are starting points, not formulas. The right density is whatever matches the product's character and the user's task.

### Density and audience expertise

**Principle:** The density that feels right depends on how expert the user is. Beginners need space to orient themselves. Experts want information density to reduce the cost of scanning.

**Reasoning:** A new user lands on a product and needs to understand what's available. Generous spacing helps — each element has room to be noticed, read, and understood. A daily power user of the same product doesn't need orientation; they need efficiency. Dense information lets them scan quickly without scrolling, process more data at once, and complete tasks faster.

**Implementation guidance:**
- Consumer-facing products and marketing sites should generally lean spacious. The audience is broad, and space signals approachability.
- Professional tools used daily should generally lean dense. The audience is expert, and density signals respect for their time.
- Products with mixed audiences (some beginners, some experts) can benefit from density settings — a UI preference to toggle between comfortable and compact modes. This is an increasingly common pattern and worth considering for data-heavy products.

---

## 6. The Grid and Its Tensions

### Grids provide structure without prescribing layout

**Principle:** A grid system provides alignment discipline across components and pages. It does not prescribe specific layouts — those are composed within the grid's constraints.

**Reasoning:** AI-generated interfaces often show two failure modes with grids: either no grid at all (producing misaligned elements that feel uncomposed) or rigid grid adherence (producing the generic 12-column layouts with 3-card rows that signal "AI generated"). The grid should be visible in the alignment of elements across the page but invisible as a specific pattern.

A good grid creates consistency without monotony. Elements align to the same vertical lines across the page. Proportions are consistent. But the specific composition — how many columns are used, where content breaks, how elements are arranged — varies based on content.

**Implementation guidance:**
- For most product interfaces, a 12-column grid provides sufficient flexibility. 16 columns offer more granular control for dense interfaces.
- The gutter (space between columns) should be consistent with the spacing scale — typically 16-24px on desktop, 12-16px on mobile.
- Maximum content width should be constrained for readability. 1200-1440px is typical for most content; narrower (800-1000px) for reading-focused contexts; wider (1600px+) for data-heavy applications that genuinely benefit from horizontal space.
- Don't use all 12 columns equally. Most real layouts use columns asymmetrically — 8/4 splits, 9/3 splits, 7/5 splits. Equal splits (6/6, 3/3/3/3, 4/4/4) tend to produce the generic layouts that feel AI-generated.

### The cost of strict symmetry

**Principle:** Strictly symmetric layouts (equal-width cards, evenly split columns, centered everything) produce the specific visual signature of AI-generated design. Deliberate asymmetry is almost always more interesting.

**Reasoning:** Symmetry is the easiest composition to produce — three equal cards, two equal columns, centered hero. It's also the most visually tired pattern. Real editorial and design work tends toward asymmetry because asymmetry creates visual tension and directs attention. A layout where one column is clearly dominant and another supports it is more dynamic than two equal columns.

This doesn't mean symmetry is wrong — it has legitimate uses, particularly for dashboards and reference interfaces where parallel content should read as parallel. But reaching for symmetry as a default produces visually predictable results.

**Implementation guidance:**
- When composing a section with multiple elements, first ask: do these elements have equal importance, or is one more important than the others? If one is more important, it should be visually larger, creating asymmetry.
- Avoid the reflexive "3 equal cards in a row" pattern. If three items genuinely have equal weight, the pattern is legitimate. If they don't, make the most important one larger.
- Asymmetric layouts often feel more editorial because they mirror how real editorial design works — a feature story has more visual weight than supporting content, not equal weight.

---

## 7. Breathing Room and Negative Space

### Negative space is positive design

**Principle:** The empty space in an interface is as designed as the filled space. Treat whitespace as a primary element, not as the absence of elements.

**Reasoning:** AI-generated interfaces tend to fill space because empty space reads as "not done yet." The result is interfaces where every pixel is doing work, which produces visual exhaustion. Good design uses emptiness as a tool — to frame important content, to create pauses between sections, to signal quality and craft.

Products that feel premium, considered, or refined almost always use more negative space than products that feel generic. The space around a hero headline, the gap between pricing cards, the margin around a featured image — these are where quality lives.

**Implementation guidance:**
- When a section feels overwhelming, the first move is usually to add space, not to remove content or simplify styling.
- Negative space at the edges of containers is often where premium feel comes from. A hero section with 128px of space above and below content feels more considered than the same content with 64px.
- Don't be afraid of empty space within components. A card with generous interior padding feels more considered than the same card with tight padding, even if the card itself is then larger.

### Framing through space

**Principle:** Space frames content. Generous space around an element signals its importance more effectively than any visual treatment applied to the element itself.

**Reasoning:** Take a piece of content — a testimonial, a statistic, a key message — and place it with minimal space around it. It reads as ordinary. Take the same content and surround it with dramatically more space than its neighbors. It now reads as important, not because of what the content says but because of how it's positioned. Space signals importance more reliably than color, size, or weight because the eye naturally focuses on what's unconstrained.

**Implementation guidance:**
- For content that should feel significant — hero headlines, major testimonials, featured stats, pull quotes — surround them with notably more space than their neighbors. The space itself is the emphasis.
- This technique is especially effective in marketing contexts where a key message or value proposition needs to land. Rather than bolding it, enlarging it, or coloring it, give it room.
- In interface contexts, the same principle applies to primary actions. A primary CTA surrounded by generous space reads as more important than the same button crowded by other elements.

---

## 8. Responsive Spatial Behavior

### Spacing scales with viewport, but not linearly

**Principle:** Spacing should respond to viewport size, but the relationship isn't linear. Small screens need proportionally less spacing than the largest screens, but not dramatically less.

**Reasoning:** A hero section with 128px of top and bottom padding on desktop doesn't need 128px on mobile — the screen is smaller, and the proportions would feel excessive. But reducing it to 32px (linear scaling) would feel cramped. The right relationship is typically that large architectural spacing reduces by 40-60% on mobile, while small intimate spacing stays roughly the same.

**Implementation guidance:**

Rough responsive ratios (desktop → mobile):

| Spacing type | Desktop | Mobile |
|--------------|---------|--------|
| Architectural (between major sections) | 96-128px | 48-80px |
| Section-internal | 48-64px | 32-48px |
| Component grouping | 24-32px | 20-24px |
| Within components | 16-24px | 12-20px |
| Intimate | 4-8px | 4-8px (unchanged) |

These are starting points. Fluid spacing using `clamp()` can produce smoother scaling:

```css
/* Architectural spacing that scales with viewport */
padding-block: clamp(3rem, 8vw, 8rem);
```

- Architectural and section-level spacing benefit most from fluid responsive scaling.
- Component-internal spacing usually doesn't need to scale — a button doesn't need different padding at different viewports.
- The goal is that the interface feels correctly proportioned at every size, not that specific values are used everywhere.

### Horizontal vs. vertical spatial behavior

**Principle:** On mobile, horizontal space is the primary constraint. On desktop, vertical space is less constrained but attention span is. Both directions need different considerations.

**Implementation guidance:**
- Mobile spacing prioritizes vertical flow. Elements stack; horizontal margins can be tight (16-24px from edges); vertical spacing within stacks can be more generous.
- Desktop spacing prioritizes horizontal composition. Content width is constrained to reasonable reading widths; horizontal whitespace beyond content boundaries is a major quality signal.
- Avoid the temptation to just "use more whitespace" on desktop without considering whether it's horizontal or vertical. Expanded vertical space on desktop can produce pages that require excessive scrolling; expanded horizontal space usually improves the composition.

---

## 9. Contextual Starting Points

These are spatial starting points for common product contexts. They are not prescriptions — every product should make its own density and rhythm decisions — but they provide concrete references for what deliberate spatial design looks like in practice.

**Developer tool, technical, precision-oriented.** Lean dense. Component padding: 12-16px. Section spacing: 24-48px. Tight but intentional — the density signals professional use. Generous whitespace would feel out of character. Keep interior padding of data elements tight (8-12px in tables and code-adjacent UI).

**Financial, legal, enterprise — trust and authority.** Balanced to spacious. Component padding: 20-24px. Section spacing: 48-80px. The generous spacing signals seriousness and considered decision-making. Avoid dense-feeling layouts that might signal "information overload."

**Consumer product, warmth and humanity.** Spacious to balanced. Section spacing: 64-96px. The breathing room signals accessibility — this is a product that respects the user's attention. Avoid dense layouts that would feel technical or cold.

**Editorial, content-heavy, reading-focused.** Very spacious. Section spacing: 80-128px. Line-length discipline critical. Generous margins around reading content. Paragraph spacing that creates visible rhythm. This is where spatial craft has the most impact.

**Marketing site, brand expression, distinctive voice.** Spacious. Section spacing: 96-128px minimum for hero and primary sections. The whitespace is the luxury signal. Marketing contexts can afford generous space because the reader is in evaluation mode, not task mode.

**Data-heavy dashboard, interface-first.** Dense. Component padding: 8-12px. Section spacing: 16-32px. Power users want information density; generous spacing would waste their screen real estate. The tradeoff is that density requires excellent typography and color discipline to remain readable.

**Playful, consumer, youth-oriented.** Balanced with expressive moments. Standard component padding, but with occasional dramatic spacing shifts — a hero moment with unusually generous space, a product showcase with unexpected negative space. The spatial variety matches the character.

**Luxury, premium, high-end.** Extremely spacious. Section spacing: 128px+. Component padding generous but not excessive. The space is the product — it signals quality, confidence, and restraint. Avoid any crowding.

---

## 10. Spatial Anti-Patterns

These are the spatial failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Uniform Gap
**What it is:** An interface where every vertical gap is the same value (typically 16px or 24px), producing uniform texture and weak hierarchy.
**Why AI produces it:** Applying a single default margin to every element is the simplest possible implementation.
**The correction:** Establish at least three levels of spacing (intimate, related, separated) and apply them based on the relationships between elements. The ratios between levels should be perceptible — at least 2:1 between adjacent levels.

### The Symmetric Heading
**What it is:** Headings with equal space above and below, making it ambiguous which content they introduce.
**Why AI produces it:** Symmetric margins are the default pattern unless explicitly designed otherwise.
**The correction:** Apply asymmetric margins to headings — more space above than below, typically a 2:1 ratio. The heading then clearly introduces the content that follows rather than floating ambiguously between two sections.

### The Cramped Card
**What it is:** Cards or containers with tight interior padding (8-12px) regardless of their content, producing elements that feel crowded and rushed.
**Why AI produces it:** Minimum padding is applied to prevent elements from touching, without considering whether more generous padding would better serve the content.
**The correction:** Card interior padding should reflect the card's importance and content density. A feature card with a title, description, and CTA typically needs 24-32px of interior padding. A compact list item might use 12-16px. Match padding to purpose.

### The Edge-to-Edge Text
**What it is:** Body text or content that extends to the full width of its container with no horizontal margin for breathing room, producing text that feels claustrophobic against the edges.
**Why AI produces it:** Horizontal padding is applied at the outer container level but not considered for interior text elements.
**The correction:** Text needs breathing room on both sides. In reading contexts, enforce measure discipline (45-75 characters). In narrower contexts (cards, sidebars), ensure at least 16-24px of horizontal space between text and container edges.

### The Floating Archipelago
**What it is:** A layout where elements are scattered across the page with inconsistent alignment, no shared vertical axis, and no clear relationship to each other.
**Why AI produces it:** Elements are positioned based on content without grid discipline.
**The correction:** Every element on a page should align to at least one vertical axis shared with other elements. The grid doesn't need to be visible, but its presence should be felt in consistent alignment. Arbitrary positioning reads as careless.

### The Equal Column
**What it is:** The reflexive use of equal-width columns (6/6, 4/4/4, 3/3/3/3) that produces the generic "3 cards in a row" layouts characteristic of AI output.
**Why AI produces it:** Equal columns are the easiest grid composition.
**The correction:** Ask whether the content in each column has equal weight. If one is more important (a hero image with supporting text, a feature with illustration), use asymmetric columns (8/4, 7/5) to express that hierarchy. Reserve equal columns for genuinely parallel content.

### The Missing Architectural Space
**What it is:** A page where all sections use the same (usually medium) spacing between them, producing a long scroll with no sense of structural transitions.
**Why AI produces it:** Section margins are applied uniformly without considering the relative weight of different sections.
**The correction:** Major sections need architectural spacing between them — 80-128px minimum for marketing contexts, 48-64px for product interfaces. Subsections within a major section can use smaller spacing. The contrast between architectural and internal spacing creates a clear sense of structure.

### The Phantom Responsive
**What it is:** Mobile layouts that use identical spacing to desktop, producing excessive whitespace on small screens where space is at a premium.
**Why AI produces it:** Spacing values are applied uniformly across breakpoints.
**The correction:** Architectural and section-level spacing should reduce significantly on mobile — typically 40-60% of desktop values. Component-internal spacing often stays similar. Use fluid spacing with `clamp()` for smooth scaling.

### The Overstuffed Hero
**What it is:** Hero sections crammed with content — headline, subheadline, image, CTA, stats, social proof — without sufficient internal spacing, producing a wall of content that doesn't invite engagement.
**Why AI produces it:** Every element that could support the hero is included, with minimum spacing applied to fit everything.
**The correction:** Heroes benefit from generous space and reduced content. Let the headline breathe. Give the CTA room. Consider whether secondary elements belong in the hero or in the section below it. A spacious hero with one or two strong messages outperforms a cramped hero with five weak ones.

### The Hairline Border Noise
**What it is:** Using 1-2px borders between every element — list items, sections, cards — as the primary separation mechanism, producing interfaces that feel busy and boxed-in.
**Why AI produces it:** Borders are a simple way to communicate separation without considering whether space alone would do the job.
**The correction:** Space should be the primary separator. Borders are appropriate when space alone isn't sufficient to establish separation (particularly in dense data contexts). In most other contexts, increasing the gap between elements is preferable to adding a border.

### The Uniform Horizontal Padding
**What it is:** Every section on a page using the same horizontal padding (typically 16px or 24px), making the page feel monotonous regardless of content variety.
**Why AI produces it:** Global container padding is applied without considering how different sections might benefit from different proportions.
**The correction:** Different sections can use different horizontal proportions. A hero might extend edge-to-edge with only text constrained to a centered column. A dense section might have minimal padding. A focused reading section might be narrower than the main grid. Vary padding deliberately to create visual variety.

### The Section Mismatch
**What it is:** Sections where the top padding and bottom padding are wildly different (say, 128px top, 24px bottom), producing visual wobble where each section feels uneven.
**Why AI produces it:** Top and bottom padding are decided independently without considering how they'll compose when sections are stacked.
**The correction:** Section padding should be symmetric or deliberately asymmetric. Symmetric padding produces even rhythm; deliberate asymmetry can direct the reader's flow through the page. Accidental asymmetry produces visual noise.

---

*This reference file is loaded alongside the Spruce core skill. Spatial decisions follow from the product's character established in the philosophy, and interact with typography and color to produce the visual voice of the product. The highest-leverage spatial decision is almost always the decision about density — made once at the start, it shapes every subsequent spacing choice.*
