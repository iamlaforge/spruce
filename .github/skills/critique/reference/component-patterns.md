# Spruce Reference: Component Patterns

---

## How to Use This File

This reference encodes how Spruce reasons about components and layouts — the building blocks that compose every interface. It is loaded alongside the core skill and consulted whenever components are being designed, chosen, combined, or composed into larger structures.

Components are where the visual foundations (typography, color, space) meet the UX substrate (hierarchy, feedback, navigation). A component isn't just a visual artifact — it's a small system of states, behaviors, and relationships that must work as well at scale as in isolation. The most common AI-generated component failure is reaching for the same shapes regardless of context: every button is a rounded rectangle, every badge is a pill, every sidebar looks identical. The result is interfaces that are technically functional and visually interchangeable.

This file covers both layers: layout archetypes (how components arrange into pages and sections) and individual component patterns (how each component type should think about its own role, states, and variations). It resists the temptation to prescribe universal shapes. Instead, it teaches the reasoning that produces components appropriate to their specific product.

---

## Contents

1. The Foundational Commitment
2. Layout Archetypes and Composition
3. The Component Anatomy
4. Buttons and Primary Actions
5. Form Components
6. Cards and Containers
7. Navigation Components
8. Data Display Components
9. Feedback Components
10. The System Coherence Problem
11. Contextual Starting Points
12. Component Anti-Patterns

---

## 1. The Foundational Commitment

### Components are products of their context

**Principle:** A component's shape, weight, and behavior should emerge from the specific product it serves, not from a universal template. The same functional component can and should look different across different products.

**Reasoning:** AI-generated interfaces reach for the same component shapes regardless of context because those shapes have become statistical defaults. Every button is a rounded rectangle with 8-12px border radius and medium padding. Every card has the same 16px interior padding and subtle shadow. Every sidebar is 240-280px wide with icons beside labels. These patterns work well enough that they don't fail, but they also don't succeed at expressing what any specific product actually is.

A financial trading platform and a children's learning app will both have buttons. Those buttons should not look similar. The trading platform's buttons might be sharp-cornered and dense, communicating precision and professional use. The learning app's buttons might be soft, rounded, and generous, communicating approachability and play. Both are correct — for their context. AI defaults produce a middle-ground button that serves neither.

**Implementation guidance:**
- Before designing any component, establish its character constraints from the product's overall voice. A button in a brutalist editorial product doesn't share DNA with a button in a warm consumer app.
- Resist the reflex toward "standard" component shapes. The 8px border radius on every button is a tell of AI output. Sharp corners, dramatically rounded corners, asymmetric corners, or no visible border at all can all be correct depending on context.
- Components should have a recognizable family resemblance within a single product. A product's buttons, inputs, cards, and badges should feel like they come from the same design system — sharing corner treatments, spacing logic, weight conventions. But that family resemblance is specific to the product, not universal.

### Components are systems, not shapes

**Principle:** A component is the sum of its states, variants, behaviors, and relationships — not just its default appearance. A button isn't a rectangle with text; it's a system of default, hover, active, focus, disabled, loading, and success states.

**Reasoning:** AI-generated components are frequently designed as single visual artifacts. The default state is rendered carefully; everything else is bolted on later or missing entirely. This produces interfaces where the happy path looks polished and every other path reveals that no one designed it.

Every component has a complete state model that must be designed together. The relationships between states — how a button transitions from default to hover to active to loading to success — are part of the component's design. Disconnected states feel mechanical; coordinated states feel intentional.

**Implementation guidance:**
- Every interactive component has at minimum: default, hover, active, focus, disabled states. Most also have loading, success, and error states. All of these must be designed, not just the default.
- States should feel connected — the hover state of a button should feel like a natural evolution of its default state, not a completely different component.
- Document component states explicitly. If you're building a button component, define what each state looks like before writing the CSS.

---

## 2. Layout Archetypes and Composition

### Layout is the first visible decision

**Principle:** Before any component is styled, the overall layout structure communicates what kind of product this is. Layout choice is one of the highest-leverage decisions because it's read before any individual element is examined.

**Reasoning:** When a user lands on a page, they process layout before they process content. A page with a centered hero, three equal cards, and a CTA at the bottom reads as "standard marketing page" before any words are read. A page with a dominant left column, asymmetric supporting content, and content that breaks the grid reads as "editorial" before any words are read. Layout is a communication channel of its own.

AI-generated layouts converge on a narrow set of templates because those templates are massively over-represented in training data. Breaking out of them requires explicit resistance to the statistical defaults and commitment to a deliberate layout choice for the specific product.

### The dominant layout archetypes

Different products need different layout thinking. These are the major archetypes, each appropriate in different contexts:

**The Symmetric Grid.** Content organized in equal columns with regular rhythm. This is the default AI reaches for: hero, three-card grid, testimonial row, CTA, footer. It's appropriate when genuinely parallel content exists — comparing equivalent features, displaying a gallery of equally important items. It's inappropriate as a default for every situation.

**The Editorial Layout.** Asymmetric composition with clear hierarchy through size and position. One element dominates; supporting elements cluster around it. The relationships between elements are compositional, not gridded. Common in publications, portfolios, and products that want to feel curated rather than templated. Characterized by varying column widths, content that extends beyond typical container widths, and deliberate negative space.

**The Information-Dense Dashboard.** Grid-based but with widgets of varying size and importance. The grid provides alignment discipline while individual elements break out of uniform sizing. Characterized by a combination of metrics, charts, tables, and lists organized by priority rather than parallel structure.

**The Narrative Scroll.** Long-form sequential layout where each section tells part of a story. Sections have distinct character — they don't all look the same. Common for marketing sites that need to walk a visitor through a complex value proposition. Characterized by varied section layouts, dramatic spacing shifts, and content that unfolds rather than being presented all at once.

**The Application Shell.** Persistent navigation framework (sidebar, header, or both) with content areas that change based on context. Characterized by fixed structural elements and flexible content regions. Common for productivity tools and applications where users spend sustained time.

**The Document.** Content-first layout with minimal chrome. Typography and reading experience take priority over interactive framing. Common for documentation, articles, and content-primary experiences. Characterized by strong measure discipline, careful typographic hierarchy, and minimal visual interruption.

**The Brutalist Composition.** Deliberately aggressive layout choices — oversized type, unusual proportions, visible grid, unapologetic structure. Common for design-forward brands, cultural institutions, and products that want to signal distinctive character. Characterized by rule-breaking that feels deliberate rather than accidental.

### Choosing the archetype

**Principle:** The layout archetype is downstream of the product's character and purpose. Pick the archetype before designing individual sections.

**Implementation guidance:**
- Marketing sites for consumer products often default to symmetric grid, but editorial and narrative scroll layouts can produce more distinctive results.
- Professional tools and dashboards typically need application shell or information-dense dashboard archetypes. Resist marketing-style layouts for utility-first products.
- Documentation and content sites should lean into document or editorial archetypes. Card-heavy layouts rarely serve long-form content well.
- If the archetype decision isn't obvious from the product's purpose, run this test: what does the user most need to do on this page? Layout should serve that primary task, not decorate around it.

### Breaking the grid deliberately

**Principle:** Grid-breaking — content that extends beyond typical column boundaries, elements that overlap, compositions that disrupt the expected rhythm — is powerful when deliberate and exhausting when arbitrary.

**Reasoning:** A strictly gridded layout feels templated. A layout that breaks the grid in every section feels chaotic. The sweet spot is establishing a clear grid, then breaking it deliberately at moments of emphasis — a hero that spans wider than the body grid, a featured quote that extends into the margin, an image that overlaps two columns.

**Implementation guidance:**
- Establish the grid first. Grid-breaking only reads as intentional when the grid is consistent elsewhere.
- Use grid breaks sparingly — typically 1-3 moments per page. Every break diminishes the power of the next one.
- The break should be dramatic enough to read as intentional. A 20px overflow isn't a break; it's a mistake. A 120px overflow, or an element that clearly extends into a new spatial zone, is a break.
- Full-bleed elements (extending edge-to-edge of the viewport) are a specific kind of grid break that signals importance and transitions. Common at hero sections and between major content blocks.

---

## 3. The Component Anatomy

### The structural layers of a component

Every component has several structural layers that should be reasoned about deliberately:

**Shape.** The outline the component takes. Rectangular, rounded, pill, asymmetric, or even irregular. The shape is a character decision — sharp rectangles read as structured and precise; heavy rounding reads as soft and approachable; pills read as labels rather than actions.

**Weight.** The visual heft of the component. Thin, medium, or heavy borders; subtle or strong fills; light or dense text. Weight communicates importance and permanence.

**Surface treatment.** The component's material quality. Flat fills, layered surfaces, gradient fills, transparent overlays, textured fills. This carries significant character information.

**Depth.** How the component sits in relation to its surroundings. Flush with the surface, elevated through shadow, recessed through inset, floating through larger shadows. Depth creates hierarchy and indicates interactivity.

**Interior structure.** How content inside the component is organized. Padding, spacing between interior elements, alignment, proportional relationships.

**State transitions.** How the component moves between states. Duration, easing, which properties animate, which stay fixed.

### The corner radius decision

**Principle:** Border radius is a character decision that repeats across every component in the product. It should be decided once, at the system level, and applied consistently.

**Reasoning:** Corner radius is one of the most recognizable system-level decisions. A product with sharp corners throughout communicates something fundamentally different than a product with heavily rounded corners. AI-generated systems often default to 8-12px radius on everything, which has become so ubiquitous it's effectively invisible. Deliberate radius choices, at either extreme or in unusual proportions, can make a product feel immediately distinctive.

**Implementation guidance:**
- Establish the system's radius tokens at the start: typically a sharp option (0px or 2px), a standard option, and a rounded option (pill, 9999px). Three values is usually enough.
- Match radius to component scale. Large components can absorb larger radii without looking bubbly. Small components need proportionally smaller radii or they dominate their own content.
- Consider unusual radius approaches: asymmetric radii (rounded top, sharp bottom), large-scale radii that dominate component character, or 0px for products that want to feel architectural.
- Avoid the specific 8-12px range unless deliberately chosen. Heavily rounded (16-24px+) or sharp (0-4px) options almost always produce more distinctive results.

### The elevation decision

**Principle:** How components indicate elevation — sitting above, below, or level with their surroundings — is a system-level decision that affects every component with depth.

**Reasoning:** AI-generated systems reach reflexively for subtle drop shadows (0 2px 4px rgba(0,0,0,0.1)-style) on every elevated element. This is the default Material Design-inspired approach and has become generic. Alternative approaches — crisp edges with border treatment, dramatic shadows that commit to depth, layered shadows that produce real three-dimensional feel, or no elevation at all with space carrying the hierarchy — all produce more distinctive systems.

**Implementation guidance:**
- Four elevation approaches to consider:
  - **Flat + space**: No shadows or borders; elevation communicated entirely through spacing and color. Clean, architectural, contemporary.
  - **Border + flat**: Elevated surfaces indicated by thin borders rather than shadows. Crisp, editorial, precise.
  - **Dramatic shadow**: Strong, committed shadows with larger blur radius and offset. Premium, material, physical.
  - **Subtle shadow**: The Material-inspired default. Use only if genuinely deliberate.
- Dark mode elevation works differently than light mode. Shadows are much less effective on dark backgrounds; elevation is better communicated through lightness changes (elevated surfaces are *lighter* than the background in dark mode).
- Be consistent. If some cards use shadows and others use borders, the system feels uncomposed.

---

## 4. Buttons and Primary Actions

### Buttons communicate action hierarchy

**Principle:** A product's button system communicates the hierarchy of possible actions. Primary, secondary, tertiary, and destructive actions need visually distinct treatments, and the visual relationships between them must reflect their importance relationships.

**Reasoning:** AI-generated button systems often have the inverse problem of too-similar or too-different button variants. Too-similar: primary and secondary buttons look nearly identical, confusing users about which action is the intended primary path. Too-different: each button variant looks like it comes from a different product, producing visual chaos.

The goal is a button family that shares clear DNA (typography, weight, padding logic, interaction states) while having meaningfully different visual weight based on action importance.

**Implementation guidance:**

**Primary button:** The most visually prominent interactive element on its surface. Solid fill in accent color. Used for the single most-likely action in the current context. There should usually be only one primary button visible at a time; two primary buttons create decision paralysis.

**Secondary button:** Clearly interactive but clearly subordinate to primary. Multiple common approaches:
- Outline/border with transparent fill (most common)
- Filled with neutral color (lower contrast than primary)
- Ghost button with background only on hover

**Tertiary button (text button):** Minimal visual weight, often just text with hover state. Used for actions that should be available but not emphasized — "Cancel" in a dialog, "Skip" in onboarding, less common actions.

**Destructive button:** Communicates irreversible or dangerous action. Not primary-by-default even when it's the action in focus. Often styled with warning color, but the color alone isn't enough — the context (confirmation dialog, explicit language) should carry most of the weight.

**Implementation guidance beyond the basic hierarchy:**
- Buttons in form contexts often have specific conventions: "Save" as primary, "Cancel" as tertiary, "Delete" as destructive but positioned to require deliberate selection.
- Button sizing should be systematic: typically three sizes (small, medium, large) with consistent padding ratios across all button variants.
- Text alignment within buttons: centered for standalone buttons, left-aligned for buttons within rows or lists, never mix approaches.
- Icon usage in buttons should follow a convention: either the icon precedes text (most common, 4-8px gap), or it replaces text entirely (icon-only buttons for common actions like close, search). Never mix leading and trailing icons within the same button system.

### The button state model

All buttons have these states, and all must be designed:

- **Default:** The resting state. What the button looks like when the user hasn't interacted.
- **Hover:** Indicates the button is interactive when the cursor enters it. Typically subtle darkening or lightening (4-6% lightness shift) plus cursor change.
- **Active (pressed):** Indicates the button is being clicked. Usually more pronounced than hover — deeper color shift, slight inset effect, or scale reduction.
- **Focus (keyboard):** Visible focus ring for keyboard navigation. Usually accent color at high visibility — 2-3px ring with offset. Not optional.
- **Disabled:** Button cannot be used. Typically reduced opacity (40-50%) combined with removed interaction states. Cursor becomes `not-allowed`.
- **Loading:** Button is processing. Typically replaces text with a spinner or progress indicator, maintains button dimensions to prevent layout shift.
- **Success:** Brief state confirming action completed. Often a checkmark animation or color shift before returning to default.

These states should feel connected — hover feels like a natural intensification of default, active feels like hover committed, disabled feels like default with the life drained out of it.

---

## 5. Form Components

### Inputs are conversations with users

**Principle:** Form inputs communicate what's being asked for and how the product is asking. Their design reflects the conversation's tone — formal or casual, precise or flexible, careful or confident.

**Reasoning:** AI-generated form inputs tend toward a single universal treatment: rectangular, 40-48px tall, 1px border, 4-8px radius, 16px padding, default focus ring. This is serviceable but generic. Considered form design can use dramatically different input treatments — underline-only inputs for editorial products, heavy bordered inputs for brutalist contexts, rounded pill inputs for conversational products, or minimal inputs with no visible border until focus.

**Implementation guidance:**

**Text inputs:** The single most important form component. Establish the treatment once and apply it consistently.
- Height: typically 40-48px for default size, with compact (32-36px) and large (52-60px) variants for specific contexts.
- Padding: horizontal padding should be generous enough that text doesn't feel cramped against edges — typically 12-16px minimum.
- Borders: full border is most common but alternatives are worth considering. Bottom-border-only creates an underlined input that feels editorial. Inset shadow creates a recessed input that feels physical. Minimal borders with focus-only treatment feel modern and clean.
- Label placement: labels above inputs is the most reliable default (always visible, clear association). Floating labels (positioned inside inputs when empty, moving up on focus) can work but require careful execution to avoid awkwardness. Labels beside inputs work only in specific constrained contexts.

**Select dropdowns:** Similar treatment to text inputs but with visible affordance (chevron, arrow) indicating options. For rich selection (with descriptions, images, or grouping), consider custom selects over native; for simple selection, native performs and accessibility better.

**Checkboxes and radio buttons:** These are among the most abused components in AI output — oversized native-looking default styles applied everywhere. Consider custom styles that match the product's character. Size matters: checkboxes at 16-20px feel contemporary; 24px+ feel like mobile-first touch targets; 12-14px feel dense and professional.

**Toggle switches:** Communicate binary state where the user can see the current state without interaction. Different from checkboxes in that they imply immediate effect rather than form submission. Size and proportion should match the product's character — thin elegant toggles feel premium; chunky toggles feel playful.

**Textareas:** For longer text input. Should have consistent styling with text inputs but allow resize (either manual or automatic based on content).

### The focus state decision

**Principle:** Focus states for form inputs are the single most visible component behavior. They must be accessible, clear, and distinctive.

**Reasoning:** Focus states get the most play time of any component state — every form interaction includes focused inputs. The default browser focus ring is functional but generic. Custom focus treatments can be one of the most distinctive components of a design system.

**Implementation guidance:**
- Focus must be clearly visible. `outline: none` without replacement is an accessibility failure.
- Common focus treatments: colored border (change border color to accent), ring around input (typically 2-3px accent color with offset), inset background shift, or some combination.
- Focus color should typically match the accent color but can be deliberately different if the accent is being reserved for other purposes.
- Match focus treatment across all interactive elements — inputs, buttons, links, custom controls. Inconsistent focus treatments feel like a forgotten detail.

### Form validation visual treatment

**Principle:** Error states, warning states, and success states on form inputs are first-class parts of the component system, not edge cases.

**Implementation guidance:**
- Error inputs: red border or border-and-fill treatment, accompanied by an error message below the input. The error message should describe the fix, not the rule.
- Success inputs: subtle green treatment, optional but helpful for forms with many fields — helps users track what they've completed.
- Warning inputs: amber/orange treatment for conditions that aren't errors but merit attention.
- Message positioning: error, warning, and helper messages below the input, tightly coupled (4-8px gap). Messages beside the input rarely work at mobile widths.

---

## 6. Cards and Containers

### The card question: do you actually need a card?

**Principle:** Cards have become the default container for all content in AI-generated interfaces, regardless of whether containment is actually needed. Before reaching for a card, ask whether the content genuinely needs to be visually bounded.

**Reasoning:** The card pattern — a bounded rectangle containing related content — is legitimate for specific contexts: grid layouts of similar items, distinct clickable units, content that needs to feel separate from its surroundings. But AI generates cards reflexively, wrapping any group of related content in a card regardless of whether it needs one.

The result is "cardocalypse" — interfaces where everything is a card, cards contain other cards, the page becomes a mosaic of rectangles. This flattens hierarchy (everything is equally "contained"), adds visual noise (every card has a border or shadow), and obscures real relationships between elements.

Space, typography, and alignment can often establish grouping more elegantly than containment. Ask: is this content a discrete clickable unit? Is it one of several parallel items in a grid? Does it genuinely need to feel separate from surrounding content? If the answer to all three is no, it probably doesn't need a card.

**Implementation guidance:**
- Legitimate card uses: product cards in a grid, article previews, user profiles in a list, selectable options, elevated surfaces that contain rich content.
- Questionable card uses: wrapping every section of a page, containing a single piece of content with no grouping relationship, organizing settings pages (settings are usually better as a structured list without cards).
- If you're using cards, use them consistently. A page that mixes carded and uncarded sections usually works better if it commits to one approach.

### Card anatomy

When cards are the right choice, their structure follows patterns:

- **Interior padding:** Typically 16-32px depending on content density. Sparse cards (just a title and metadata) can use less; rich cards (image, title, description, actions) need more.
- **Content hierarchy within cards:** Mirror the typographic hierarchy of the broader page. A card's title should be clearly more prominent than its body, using real size and weight differences, not just subtle variations.
- **Image handling:** Cards with images typically use them as the top element, full-width with the card's radius. Aspect ratio should be consistent across cards in a grid — 16:9, 4:3, or 1:1 are common choices.
- **Card actions:** When cards have actions (buttons, links), position them consistently — typically at the bottom of the card, separated from the main content by clear spacing.
- **Card elevation:** Consistent with the system's elevation decision (border vs. shadow vs. flat + space).

### Alternatives to cards

When cards aren't the right choice, what is? Several alternatives:

**List items.** Horizontal rows of information separated by subtle dividers or just space. More efficient than cards for displaying many items. Scannable, dense, appropriate for data-forward contexts.

**Sections with space.** Major content regions separated by generous vertical space without explicit containment. Feels editorial and considered. Appropriate when groupings are few and clearly distinct.

**Tiles.** Similar to cards but without heavy treatment — perhaps just a background color or subtle border. Less visual weight than full cards.

**Grouped content with dividers.** Related items separated by hairline dividers within a larger container. Appropriate for settings, menu items, dense lists.

---

## 7. Navigation Components

### Navigation as a system, not a component

**Principle:** Navigation is a multi-component system — primary navigation, secondary navigation, contextual navigation, wayfinding indicators. These components must work together as a coherent whole, not be designed in isolation.

**Reasoning:** AI-generated navigation often treats each nav component as a separate challenge — design a sidebar, design breadcrumbs, design tabs, design a user menu — without considering how they interact. The result is products where each navigation element is fine individually but the combined experience feels incoherent.

**Implementation guidance:**

**Top-level navigation** typically takes one of several forms:
- **Horizontal top nav:** Best for 3-7 primary destinations. Common for marketing sites and products with shallow hierarchy.
- **Left sidebar nav:** Best for applications with many primary destinations or deep hierarchy. Provides more room for labels and subnavigation.
- **Bottom nav (mobile):** Best for mobile apps with 3-5 primary destinations.
- **Hamburger menu:** Last resort on desktop — hides navigation behind interaction. Appropriate for mobile when primary nav doesn't fit visibly, but avoid on desktop where space exists.

**Secondary navigation** patterns include:
- **Tabs:** For switching between parallel views of the same context. Works well for 2-5 options.
- **Segmented controls:** Similar to tabs but visually more unified — all options within a single container. Works well when the options are clearly a set.
- **Vertical secondary nav:** Common in app sidebars, typically indented under primary items.
- **Filter chips:** For refining content views. Horizontal arrangement with inline state indication.

**Wayfinding components:**
- **Breadcrumbs:** Show hierarchical position. Required for products with more than two levels of depth.
- **Page titles with context:** An h1 at the top of each page that clearly identifies the user's location.
- **Active state indicators:** In persistent navigation, the current page must be unmistakably marked. A subtle color shift isn't sufficient; use weight, background, indicator marks, or position shifts.

### The sidebar trap

**Principle:** The default application sidebar (icon + label, 240-280px wide, fixed position) has become so common it's effectively a cliché. Question whether your product actually needs one.

**Reasoning:** Sidebars consume significant horizontal real estate permanently. For products with genuinely many navigation destinations and deep hierarchy, they earn that cost. For products with 5-7 primary destinations, a sidebar is often overkill — a top nav would use less space and achieve the same result.

AI-generated products frequently reach for sidebars by default because most SaaS products have them. But many SaaS products have them unnecessarily. Consider the alternatives before committing to a sidebar.

**Implementation guidance:**
- If primary nav has 7 or fewer destinations, horizontal top nav is often better.
- If the sidebar is right, it should have meaningful hierarchical content — either multiple levels of navigation, or navigation + contextual tools (filters, folders, search within the sidebar).
- Collapsible sidebars (that can toggle to icon-only mode) are common but add complexity. Only implement if there's genuine user benefit — power users often prefer the reclaimed space.
- Avoid the icon-only sidebar with tooltip-on-hover pattern unless labels are genuinely inferable from icons. For most product vocabulary, icon-only navigation fails recognition tests for new users.

---

## 8. Data Display Components

### Tables for data, not for layout

**Principle:** Tables are the correct component for genuinely tabular data — rows and columns of related information that benefits from comparison. They are not a general-purpose layout tool.

**Reasoning:** Tables are sometimes used to lay out non-tabular content because they're familiar and provide alignment. This produces heavy, rigid layouts for content that would work better in list or card form. Meanwhile, actual data contexts sometimes avoid tables and use card grids instead, producing layouts where comparison is difficult.

Match the component to the content: tabular data → table; heterogeneous item lists → cards; mixed content → editorial sections.

**Implementation guidance for tables:**
- Table row height should reflect density character. Dashboard tables: 40-48px rows. Data-heavy professional tables: 32-36px. Comfortable reading tables: 48-56px.
- Row separators: subtle horizontal borders or alternating row backgrounds. Both work; commit to one approach. Full borders around every cell produce visual noise.
- Column alignment follows data type: numeric values right-aligned, text left-aligned, categorical data left-aligned, status/state centered when iconographic.
- Headers should be clearly distinguished from data — weight difference, background shade, or both.
- For sortable columns, indicator (arrow) appears when sorted, ideally only on the sorted column initially with hover revealing sort affordance on others.

### Lists for sequences, not collections of cards

**Principle:** Lists are often a better choice than card grids for displaying collections of items. Consider lists first; reach for cards only when specific card properties are needed.

**Reasoning:** AI-generated interfaces default to card grids for any collection of items. This works for small numbers (3-12 items) but scales poorly — a list of 50 items in cards is visually exhausting. Lists scale much better and often provide better scanning and comparison.

**Implementation guidance:**
- List items: typically 56-80px tall, with title, metadata, and optional avatar or icon. Dense list items can be 40-48px.
- Separation between items: subtle dividers or consistent spacing — not boxy borders around each item.
- Action reveal: hover states can reveal secondary actions (edit, delete, archive) that otherwise stay hidden to reduce visual noise.
- Lists scale from very simple (text + timestamp) to very rich (avatar, title, description, metadata, actions) — match the density to content and context.

### Charts and data visualization

**Principle:** Data visualization components are specialized — their design is primarily functional rather than decorative. Prioritize clarity and accuracy over visual flair.

**Implementation guidance:**
- Chart color palettes should be systematic, not random. Use structured palettes with consistent chroma and lightness, differentiated primarily through hue.
- Avoid rainbow palettes that give every category its own wildly different color. For 2-5 series, thoughtful hue variation works; for more series, consider lightness/chroma variation within narrower hue ranges.
- Axis labels, legends, and annotations should be clearly legible without dominating the chart. Typically lower contrast than chart data itself.
- Interactive states (hover to reveal data values, click to filter) should feel integrated rather than bolted on.

---

## 9. Feedback Components

### Feedback components communicate state

**Principle:** Feedback components — toasts, alerts, banners, badges, status indicators — communicate temporary or persistent state about the system. Their design should match the urgency and persistence of what they communicate.

**Implementation guidance:**

**Toasts/notifications:** Temporary messages for confirmations and low-priority updates.
- Position consistently — top-right and bottom-right are most common on desktop; bottom-center on mobile.
- Duration: 3-5 seconds for informational toasts; longer or persistent for important messages; never auto-dismiss for errors.
- Multiple toasts should stack, not overlap. Queue or limit display count to prevent stacking becoming overwhelming.

**Alerts/banners:** Persistent messages requiring attention. Typically inline with content rather than floating.
- Distinct treatments by severity: info, success, warning, error.
- Clear action when action is possible — dismissing the banner, taking the suggested action, expanding for details.
- Match visual weight to severity. Errors should be more visually prominent than informational messages.

**Badges:** Persistent indicators of state or category.
- Pill badges have become the default and are effectively generic. Consider alternatives: rectangular badges with sharp corners (more structured feel), text-only badges with color but no fill (lighter), badges with subtle backgrounds rather than solid fills.
- Size matters — badges should feel proportionate to the content they annotate. Too-large badges dominate; too-small badges are missed.
- Restrict badge colors to meaningful states. A product with 12 different badge colors has lost the ability to communicate through badge color.

**Status indicators (dots, icons):** Small, glanceable state communication.
- Color alone isn't sufficient — combine with icons, text, or shape variation for accessibility.
- Consistent positioning within components — always before or after labels, never varied within the same system.

---

## 10. The System Coherence Problem

### Components must share DNA

**Principle:** A product's components should feel like they come from the same family — sharing visual treatment conventions, state transition patterns, spacing logic, and typographic choices.

**Reasoning:** AI-generated component sets often feel like assemblages from different design systems. The buttons look like one system, the form inputs look like another, the cards look like a third. Each component in isolation is fine; together they feel uncomposed.

Coherence requires decisions made once at the system level and applied consistently across components:

- **Radius conventions:** Either all components share the same radius, or there's a deliberate logic to variation (large components larger radius, small components smaller).
- **Border treatment:** If some components use 1px borders, others shouldn't use 2px borders without reason.
- **Elevation approach:** Commit to the system's elevation strategy (shadow vs. border vs. flat) and apply it consistently.
- **State transition duration:** Button hovers, input focus, modal entry — these should feel like they operate at similar speeds.
- **Focus treatment:** Same focus ring style across all interactive elements.
- **Typography within components:** The type scale used inside buttons, inputs, cards, and dialogs should relate to the system's overall type scale.

### The single-source-of-truth discipline

**Principle:** System-level decisions (tokens, conventions, patterns) should be decided once, documented explicitly, and referenced by every component. Diverging from the system should require explicit justification.

**Implementation guidance:**
- Design tokens for colors, spacing, typography, radius, and shadows should be defined once at the system level. Components reference tokens; they don't invent values.
- When a component needs a value not in the system, either add it to the system or reconsider whether it's needed.
- The most common system failure is sprawl: each new component introduces new values until the system is incoherent. Resist this by making system additions deliberate.

---

## 11. Contextual Starting Points

These are component pattern starting points for common product contexts. They provide concrete references for what deliberate component choices look like in each context.

**Developer tool, technical, precision-oriented.**
- Sharp corners (0-4px radius) or minimal rounding throughout
- Dense component scales (buttons 32-36px tall, inputs similar)
- Monospace font in data contexts and code adjacency
- Minimal elevation — prefer borders to shadows
- Tight table rows (32-40px), dense list items
- Subtle state transitions, fast (100-150ms)

**Financial, legal, enterprise — trust and authority.**
- Moderate corner radius (4-6px) or sharp corners
- Comfortable component scales (buttons 40-48px)
- Serif body in content contexts, sans in interface
- Deliberate elevation — either subtle shadows or clear borders
- Medium-density tables (40-48px rows)
- Moderate state transitions, considered (200-250ms)

**Consumer product, warmth and humanity.**
- Generous corner radius (8-16px) or pill buttons
- Comfortable-to-generous component scales
- Humanist sans-serif throughout
- Soft shadows if any elevation
- Spacious list items, generous card padding
- Moderate-to-slow state transitions with easing (250-350ms)

**Editorial, content-heavy, reading-focused.**
- Consider dramatic corner choices — sharp or heavily rounded, not middle ground
- Components that recede in favor of content
- Serif body, distinctive display type
- Minimal component chrome — let typography carry character
- Tables rare; prefer structured lists
- Subtle, confident state transitions

**Marketing site, brand expression, distinctive voice.**
- Component treatments that express brand character — whatever that specifically is
- Can afford more dramatic choices than product interfaces
- Display type in hero; body type matches product personality
- Elevation used expressively, not just functionally
- Card usage judicious — editorial layouts often outperform card grids
- State transitions used for delight at key moments

**Data-heavy dashboard, interface-first.**
- Sharp corners or minimal radius
- Dense component scales
- Interface-optimized type, potentially tabular figures
- Minimal elevation — borders preferred for defining regions
- Very dense tables (32-36px rows) and lists
- Fast state transitions (100-150ms) — professional users want responsiveness

**Playful, consumer, youth-oriented.**
- Generous corner radius, possibly asymmetric
- Expressive component treatments
- Distinctive type with personality
- Layered elevation, visible depth
- Spacious components with room to breathe
- Expressive transitions with character, occasional bounce acceptable if genuinely playful

**Luxury, premium, high-end.**
- Sharp corners or minimal radius for restraint
- Generous component scales, dramatic whitespace
- Distinctive display type, refined body
- Minimal elevation — the space is the luxury signal
- Minimal use of cards and heavy containers
- Slow, confident state transitions (300-400ms)

---

## 12. Component Anti-Patterns

These are the component failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Universal Rounded Rectangle
**What it is:** Every component — buttons, inputs, cards, badges, containers — uses the same 8-12px border radius, producing interfaces where every shape is interchangeable.
**Why AI produces it:** The 8-12px radius range is massively overrepresented in training data, having become the default for contemporary product interfaces.
**The correction:** Commit to a distinctive radius decision at the system level. Sharp corners (0-2px), dramatically rounded (16-24px), pill/fully rounded, or deliberately asymmetric all produce more distinctive results. The specific choice should match product character.

### The Pill Reflex
**What it is:** Using pill-shaped (fully rounded) badges on everything — status indicators, category labels, counts, tags, interactive filters — without differentiation.
**Why AI produces it:** Pills are the current default shape for badges and have become ubiquitous.
**The correction:** Reserve pills for specific badge types (perhaps interactive filters) and use different shapes for other annotation types. Rectangular badges with slight radius, text-only color-coded badges, or differently-shaped indicators can produce more variety and better semantic differentiation.

### The Standard Sidebar
**What it is:** A 240-280px left sidebar with icon-plus-label navigation items, a logo at the top, and user profile at the bottom.
**Why AI produces it:** This specific sidebar structure has become the default SaaS product layout.
**The correction:** First ask whether a sidebar is needed at all. If yes, consider variations: no icons (just labels), no labels (just icons, only for truly iconic products), variable sidebar width, sidebar with richer hierarchical content, or entirely different navigation approach (top nav, bottom nav on mobile).

### The Cardocalypse
**What it is:** An interface where everything is wrapped in a card — page sections, form regions, lists of lists, cards containing other cards.
**Why AI produces it:** Cards are a safe way to group content; they become the default for any group.
**The correction:** Ask whether each card is actually needed. Space, typography, and alignment often group content more elegantly than containment. If a group doesn't need to feel separate from its surroundings or doesn't function as a discrete unit, it probably doesn't need a card.

### The Identity-less Button System
**What it is:** Button variants — primary, secondary, tertiary — that look generic and could belong to any product. Usually solid blue primary, gray-bordered secondary, blue text tertiary.
**Why AI produces it:** These are the statistical defaults for each variant in training data.
**The correction:** Button treatment is character expression. Consider: sharp-cornered buttons, buttons with unusual proportions (very tall or very squat), buttons with distinctive fills (not just the accent color), buttons with textured or patterned backgrounds. Match to product character.

### The Symmetric 3-Card Row
**What it is:** A features section, testimonial section, or value proposition section implemented as three equal-width cards arranged horizontally.
**Why AI produces it:** The three-equal-cards layout is the statistical default for presenting three related items.
**The correction:** Ask whether the three items have genuinely equal weight. If one is more important, make it larger. Consider editorial alternatives — a dominant feature with two supporting, asymmetric compositions, or vertical arrangements where order creates hierarchy.

### The Missing State
**What it is:** A component that only has a default state designed — hover is default-with-opacity-change, disabled is default-with-reduced-opacity, loading and error states are absent.
**Why AI produces it:** The happy path is designed first and other states are left as implementation details.
**The correction:** Design all states as first-class components. Every interactive component has default, hover, active, focus, disabled, loading, and (for some) success/error states. Design them together, ensuring they feel like coherent variations.

### The Shadow Default
**What it is:** Every elevated surface — cards, dropdowns, modals, buttons — uses a subtle drop shadow (0 2px 4px rgba(0,0,0,0.1)-ish) that has become completely generic.
**Why AI produces it:** Subtle drop shadow is the default elevation treatment in contemporary design.
**The correction:** Commit to a distinctive elevation approach at the system level. Crisp borders instead of shadows, dramatic shadows that actually produce depth, layered shadows with offset and spread, or no elevation at all with space doing the work. Any of these produces more character than the default subtle shadow.

### The Generic Input
**What it is:** Form inputs as 40-44px rectangles with 1px borders, 4-8px radius, 16px padding, and a default blue focus ring.
**Why AI produces it:** These exact values are the training-data default for form inputs.
**The correction:** Inputs are one of the most-used components — their treatment is worth considering deliberately. Underline-only inputs, dramatically different heights, unusual focus treatments, or inputs integrated with labels (floating labels done well, or labels-inside-border designs) can all produce distinctive treatments.

### The Toast Parade
**What it is:** Every notification — successful save, new message, background sync, error, warning — uses the same toast component with only color variation for severity.
**Why AI produces it:** Toasts are a versatile component reused for many purposes.
**The correction:** Different notification types need different treatments. Confirmations can be toasts. Errors should often be persistent (never auto-dismissed). Important status changes may deserve modal attention. Background updates may deserve unobtrusive inline indication. Match the component to the communication need.

### The Tab Overflow
**What it is:** Navigation tabs that work at one viewport width but become awkward or unusable at other widths — either wrapping to two rows, scrolling horizontally without indication, or truncating labels.
**Why AI produces it:** Tabs are designed at one size without considering responsive behavior.
**The correction:** Tabs need explicit responsive strategies: horizontal scroll with affordance (chevrons or fade indicators), transformation to dropdown at narrow widths, or prioritization (some tabs stay visible, others move to overflow menu).

### The Ambiguous Interactive
**What it is:** UI elements where it's unclear whether they're interactive — cards that could be clicked but have no hover state, text that might be a link but doesn't look like one, regions that should be expandable but show no affordance.
**Why AI produces it:** Visual treatment is applied without considering the interaction contract.
**The correction:** Interactive elements must look interactive. If something will respond to click, it needs hover state, cursor change, and ideally visual affordance (underline for links, button styling for buttons, clear hover lift for clickable cards). If something shouldn't be interactive, it shouldn't have interactive-looking styling.

### The Component Soup
**What it is:** An interface that uses too many different components for similar purposes — some lists styled as cards, others as table rows, others as plain divs — without clear logic for when to use which.
**Why AI produces it:** Components are chosen individually without considering systematic relationships.
**The correction:** Establish clear rules for when to use each component type. Lists of similar items: always list or always card, not mixed. Settings sections: always structured list, not sometimes cards. Documentation examples: always code block, not sometimes inline. Systematic choices feel intentional; mixed choices feel accidental.

### The Edge-to-Edge Modal
**What it is:** Modal dialogs that extend nearly to the edges of the viewport, producing dialogs that feel more like pages than focused interactions.
**Why AI produces it:** Modal widths are set without considering appropriate sizing for focused tasks.
**The correction:** Modal sizing should reflect content complexity. Simple confirmations: 400-500px wide. Forms with multiple fields: 500-700px. Rich content or multi-step flows: 700-900px. Full-screen modals are legitimate for specific tasks (image viewers, complex editing) but shouldn't be the default.

### The Persistent CTA
**What it is:** A call-to-action button that follows the user down the page, remains fixed during scrolling, and appears in the header, hero, mid-page, and footer — repeating the same message everywhere.
**Why AI produces it:** The pattern of "always show the CTA" is common in conversion-focused training data.
**The correction:** CTAs work through contrast. When a CTA appears in every section, it loses power in each. Use CTAs at moments where the user has absorbed enough content to be ready to convert. For long pages, one sticky CTA can work — but replacing every section's content with "see features + CTA" produces a page that feels like relentless selling.

---

*This reference file is loaded alongside the Spruce core skill. Component decisions follow from the visual foundations (typography, color, space) and the UX substrate (hierarchy, feedback, navigation). The highest-leverage component decision is resisting the statistical defaults — the 8px-radius rounded rectangle, the subtle drop shadow, the three-equal-card grid — and committing to treatments that match the specific product's character.*
