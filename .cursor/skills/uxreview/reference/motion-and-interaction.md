# Spruce Reference: Motion & Interaction

---

## How to Use This File

This reference encodes the motion reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted whenever interfaces involve animation, transitions, micro-interactions, or any movement between states — which is to say, whenever interfaces respond to users.

Motion is the most easily misused domain in interface design. Done well, it's invisible — users feel the interface as responsive, alive, considered, without ever noticing the animation itself. Done poorly, it's immediately dated: bouncy easing that reads as 2015, linear transitions that feel mechanical, slow fades that make every state change feel sluggish, parallax scrolling that disorients without purpose.

The dominant motion failure in AI-generated interfaces is bad timing and easing — durations that miss the mark, curves that feel wrong for the motion, and a general lack of systematic thinking about how the product moves. A secondary failure is motion without purpose: animation applied because animation is available, rather than because it communicates something specific.

This file treats motion purpose, micro-interactions, state transitions, and scroll behavior as equal first-class concerns. It covers when to animate, when not to, how to time it, how to curve it, and how to make it feel like part of a coherent system rather than a pile of effects.

---

## Contents

1. The Foundational Commitment
2. The Purpose of Motion
3. Timing: Duration as Meaning
4. Easing: The Curve Is the Character
5. Micro-Interactions
6. State Transitions
7. Scroll Behavior
8. Page Transitions and Entry Animations
9. Motion Accessibility
10. The System Coherence Problem
11. Contextual Starting Points
12. Motion Anti-Patterns

---

## 1. The Foundational Commitment

### Motion must have a reason

**Principle:** Every animation in an interface should serve a specific communicative purpose: guiding attention, indicating state change, providing feedback, establishing relationship, or softening perceived latency. Motion without purpose is noise.

**Reasoning:** The temptation with motion is to add it because it's available. Scroll reveals, hover lifts, page transitions, loading animations, button bounces — once the capability is in place, it gets applied everywhere. The result is interfaces that feel busy and demanding rather than responsive and alive. Every unnecessary animation costs attention; every unnecessary animation makes the next animation less effective.

Good motion design is as much about restraint as execution. An interface with three well-chosen animations often feels more alive than one with thirty arbitrary ones.

**Implementation guidance:**
- Before adding any animation, identify what it's communicating. If the answer is "it makes things feel more dynamic" or "it adds polish," the animation is probably unnecessary.
- The highest-value motion moments are: state changes that would otherwise be invisible, feedback that would otherwise be missing, relationships that would otherwise be unclear, waiting periods that would otherwise feel broken.
- When motion is added, it should be felt rather than noticed. An animation the user specifically thinks about is usually over-designed.

### Motion is character expression

**Principle:** The way a product moves communicates its character as directly as how it looks. Fast, confident transitions read differently than slow, considered ones. Crisp easing reads differently than soft easing. Consistent timing reads as a coherent voice.

**Reasoning:** AI-generated interfaces frequently have motion that feels unrelated to the rest of the design. A brutalist, structured interface with bouncy elastic easing reads as inconsistent — the motion character doesn't match the visual character. A warm, organic consumer app with snappy 100ms transitions reads as mechanical and cold.

Motion is a dial on the product's character. It should be tuned deliberately, matching the voice established by typography, color, space, and components.

**Implementation guidance:**
- Consider the product's overall character before deciding motion timing. Confident, assertive products often want faster motion (150-200ms default transitions) with crisp easing. Considered, premium products often want slower motion (250-350ms) with softer easing.
- The motion character should feel related across every animated element. Buttons that transition in 100ms while panels transition in 600ms feel disconnected unless there's a clear hierarchy reason.
- Motion timing is one of the few character signals that's felt even when users can't articulate why. Two identical interfaces with different motion timing will feel like different products.

---

## 2. The Purpose of Motion

### The six legitimate purposes

Motion in interfaces serves specific functional purposes. Understanding which purpose a given animation serves helps determine whether it's needed and how it should behave.

**1. State change communication.** Motion makes invisible state changes perceptible. A toggle that animates its knob from left to right makes the state change tangible. A panel that slides out of view rather than simply disappearing communicates where it went. Without motion, many state changes would be abrupt enough to miss.

**2. Attention direction.** Motion draws the eye. A subtle pulse on a new notification badge, a brief color shift when data updates, a gentle scale on a hover — these are attention directives. Use sparingly; constant motion is exhausting and eventually ignored.

**3. Feedback confirmation.** Motion confirms user actions. A button that scales slightly on press, a heart that fills when liked, a checkmark that animates in on completion — these are feedback signals that tell users their action worked.

**4. Relationship establishment.** Motion shows where things come from and go to. A modal that expands from the button that opened it establishes the relationship between them. A search bar that transforms from a compact icon into a full field shows the connection between the two states.

**5. Perceived latency softening.** Motion makes waiting feel shorter. A loading spinner, a skeleton animation, a progress bar — these don't actually speed up the underlying operation, but they reduce the perceived wait. Without motion, even fast operations can feel broken.

**6. Delight and personality.** Motion can express character — a product's voice expressed through how it moves. A success animation with a satisfying flourish, a playful loading state, a distinctive hover effect. This purpose is legitimate but must be disciplined. Delight motion applied constantly becomes irritating.

### The restraint test

**Principle:** Before implementing any animation, ask: which of these six purposes does it serve? If the answer isn't clear, the animation probably doesn't belong.

**Implementation guidance:**
- Animations that fail the purpose test: scroll-triggered fades on every section, hover animations on non-interactive elements, autoplay video backgrounds, continuous "pulse" effects on neutral elements, parallax on hero images that already have sufficient visual interest.
- Animations that pass: modal entry/exit, loading states, success confirmations, state transitions on toggles and selects, focus state indicators, page transitions in SPAs.
- The bar for delight-and-personality motion is higher than for functional motion. It should be exceptional, specific to the product's character, and used at carefully chosen moments.

---

## 3. Timing: Duration as Meaning

### Duration is communication

**Principle:** The duration of an animation communicates as much as the animation itself. Fast motion reads as responsive and confident; slow motion reads as considered and deliberate. Wrong duration in either direction breaks the user's sense of the interface.

**Reasoning:** Duration is the most common place motion goes wrong. AI-generated animations often land at durations that are either too slow (making the interface feel sluggish) or too fast (making animations imperceptible, effectively canceling their purpose). The right duration depends on what's animating and what the animation is communicating.

### The duration hierarchy

Duration should scale with the distance and significance of what's moving:

**Immediate response (50-100ms):** Used for feedback that should feel instant — button press states, checkbox toggles, instant hover color shifts. This range is at the edge of perception; users feel the response rather than seeing the animation.

**Quick transitions (100-200ms):** The workhorse range for interface animations. Button hovers, input focus states, tooltip appearances, dropdown opens, small component transitions. This is where most motion lives in most products.

**Moderate transitions (200-350ms):** For transitions involving more movement or layout change. Modal entries, panel slides, significant state changes, confirmations. Long enough to be perceived clearly, short enough not to feel slow.

**Deliberate transitions (350-500ms):** For important transitions that deserve attention — onboarding step changes, major view transitions, celebratory confirmations. Use sparingly; anything longer feels slow.

**Extended transitions (500ms+):** Reserved for specific effects — hero animations on first load, complex orchestrated sequences, deliberate moments of drama. Most interfaces should have few or no animations in this range.

### The duration mistakes

**Too slow:** The most common timing failure in AI-generated interfaces. A 400ms button hover, a 600ms modal entry, a 1000ms page transition. All of these make the interface feel sluggish. Users have a finite patience budget; slow animations burn through it.

**Too fast:** Less common but real. A 50ms modal entry is imperceptible — the modal appears to pop in with no transition, which fails to establish the relationship between trigger and modal. Animations exist to communicate; too-fast animations fail at their job.

**Uniform duration:** Applying the same duration (usually 300ms) to every transition regardless of what's moving. A button hover shouldn't take as long as a full-page transition; a tooltip shouldn't match a modal entry. Motion with uniform timing feels mechanical.

**Implementation guidance:**
- Default your button hovers and small state changes to 100-150ms. Default your moderate component transitions to 200-250ms. Default your significant transitions to 300-400ms.
- When in doubt, faster. 150ms feels snappier than 300ms in most contexts, and snappy reads as quality.
- Test animations at their actual duration on real devices. What feels right in a designer's head is often too slow for the final context.

---

## 4. Easing: The Curve Is the Character

### Easing is never linear

**Principle:** Linear motion (constant velocity from start to finish) almost always looks wrong in interfaces. Real motion — in the physical world, in observed behavior — accelerates and decelerates. Interface motion should too.

**Reasoning:** Linear easing looks mechanical because it is — nothing in the physical world moves at perfectly constant velocity from a standing start. Cars accelerate from rest and decelerate before stopping. Elevators ramp up and ramp down. Even dropped objects accelerate due to gravity. Our perception is calibrated to this, so linear motion reads as unnatural, robotic, and low-quality.

The AI default of `transition: all 0.3s ease` uses CSS's built-in ease function (a specific cubic-bezier curve), which is fine but generic. Committing to specific curves for specific purposes produces more distinctive, more considered motion.

### The easing families

Different easing curves communicate different qualities of motion:

**Ease-out (decelerating):** Fast at the start, slowing to a stop. Feels confident and arriving. Most appropriate for elements entering the screen — modals opening, panels sliding in, content appearing. The motion starts with energy and settles into place.
- CSS: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (soft), `cubic-bezier(0.2, 0, 0, 1)` (strong)

**Ease-in (accelerating):** Slow at the start, accelerating to the end. Feels like leaving. Most appropriate for elements exiting the screen — modals closing, panels sliding out, content disappearing. The motion starts gently and accelerates away.
- CSS: `cubic-bezier(0.55, 0.055, 0.675, 0.19)` (soft), `cubic-bezier(0.7, 0, 1, 0.5)` (strong)

**Ease-in-out (both):** Slow at start, fast in the middle, slow at end. Symmetric motion. Most appropriate for elements moving within the screen — content shifting position, properties animating between two stable states. The motion feels deliberate and controlled.
- CSS: `cubic-bezier(0.4, 0.0, 0.2, 1)` (balanced), `cubic-bezier(0.65, 0, 0.35, 1)` (stronger)

**Linear:** Constant velocity. The correct choice for specific effects — rotating spinners, continuous scrolling marquees, progress bars where velocity represents actual progress. Wrong for everything else.

### The curves to avoid

**Bounce and elastic easing:** Curves that overshoot the target and oscillate back. These were heavily used in web animation around 2014-2018 and now read as dated. They add perceived duration (the bounce extends the animation) and rarely serve communicative purposes. In most contemporary product contexts, they should be avoided.
- The exception: specific playful contexts where the character genuinely calls for it — children's products, games, celebration animations. Even there, use sparingly.

**The default `ease`:** CSS's built-in `ease` keyword is a specific cubic-bezier that's fine but generic. Using it everywhere produces motion that reads as default rather than designed. Prefer specific named curves that match your motion character.

### Choosing easing for context

**Implementation guidance:**
- Elements entering: ease-out
- Elements exiting: ease-in
- Elements moving in place or changing properties: ease-in-out
- Instant feedback (press states, focus): fast ease-out, very short duration
- Continuous motion (spinners, progress): linear
- Playful contexts only, occasional use: bounce or elastic

For a unified system, define three to five easing tokens at the project level (standard, enter, exit, emphasis) and apply them consistently across components. This produces coherent motion personality.

---

## 5. Micro-Interactions

### Micro-interactions are functional, not decorative

**Principle:** Small, purposeful animations that respond to user actions are the texture of a well-designed interface. They confirm actions, acknowledge state, and make the interface feel alive — but only when they serve specific purposes.

**Reasoning:** The term "micro-interaction" has become associated with decorative flourish — delightful animations that make interfaces feel premium. This framing is misleading. The most valuable micro-interactions are functional: they make state changes perceptible, confirm that actions registered, and reduce user uncertainty. Decorative micro-interactions are legitimate but secondary.

AI-generated interfaces often produce micro-interactions at the wrong level of prominence — either absent entirely (every click feels dead, every state change happens silently) or applied with too much weight (every hover lifts dramatically, every form field bounces on focus).

### The micro-interaction vocabulary

**Button press:** The single most important micro-interaction. On press, the button should visually acknowledge the action before any async operation completes. Common techniques: subtle scale reduction (0.97-0.98), brief color deepening, slight inset shadow. Duration: 100-150ms. Release returns to default state.

**Input focus:** When a form field receives focus, the change should be perceptible but not dramatic. Color shift on the border, subtle ring appearance, or subtle background change. Duration: 150-200ms with ease-out.

**Hover states on interactive elements:** Should signal interactivity clearly but not be visually exhausting across many hover targets. Subtle background shifts, slight lightness changes, cursor changes. Duration: 100-150ms.

**Toggle state change:** The knob sliding from one side to the other communicates the state change tangibly. Duration: 200-250ms with ease-in-out. Optional: color change of the track synchronized with knob motion.

**Checkbox and radio selection:** When a checkbox or radio is selected, the fill and check/dot should animate in rather than appearing instantly. Duration: 150-200ms. A subtle scale-up on the selection indicator adds satisfaction.

**Success confirmation:** When an action completes successfully, a brief confirmation animation acknowledges completion. A checkmark drawing itself, a color pulse on the confirmed element, a subtle celebratory scale. Duration: 300-500ms. These are moments where slightly more motion is appropriate because the communication is important.

**Error shake:** When input validation fails, a brief horizontal shake on the input signals the error. Duration: 200-300ms total, 3-4 oscillations. This is the legitimate exception to the "avoid bounce" rule — error shake is a recognized convention.

**Loading indication:** Continuous motion during async operations. Can be a spinner (most common), a pulsing skeleton, or a more elaborate loading indicator. The motion communicates "working" — its specific form can express character.

### The principle of proportional feedback

**Principle:** The intensity of a micro-interaction should match the significance of what it's communicating. Small actions deserve small acknowledgments; important moments can bear more dramatic motion.

**Implementation guidance:**
- A button press is a small action; a subtle scale is sufficient.
- A form submission success is a larger moment; a more pronounced confirmation is appropriate.
- A major milestone (onboarding complete, first task finished, significant achievement) can support genuinely celebratory motion.
- Getting this proportion wrong is a common failure — tiny actions getting elaborate animations, important moments getting the same treatment as everything else.

---

## 6. State Transitions

### States should be connected, not replaced

**Principle:** When a component changes state — from default to hover, from idle to loading, from empty to populated — the transition between states should feel like continuous motion, not a cut between two separate views.

**Reasoning:** AI-generated interfaces often handle state changes by simply swapping one view for another. A loading state appears, then the loaded state appears instantly. An empty state shows, then gets replaced by data instantly. The transitions are functionally fine but visually abrupt — they read as a sequence of cuts rather than a continuous experience.

Thoughtful state transitions smooth these discontinuities. The loading spinner fades out as content fades in. The empty state's illustration gently shrinks as the first content item appears. The transitions don't need to be elaborate; they just need to exist.

### The common state transitions

**Idle → Loading:** When an action triggers a loading state, the transition should feel immediate. Button content can fade out while a spinner fades in. Disable other interactions. The visual change should communicate "working now" within the first 100ms.

**Loading → Content:** When data arrives, content should replace loading state with deliberate motion. Skeleton screens can fade as real content fades in, or content can appear to "replace" skeletons by overlaying them briefly. Abrupt replacement of skeletons with content is a common failure — it produces layout shift and breaks continuity.

**Loading → Error:** When a load fails, the transition should be deliberate but not dramatic. The loading indicator fades out; the error state fades in. Error states deserve calm motion — bouncing error messages add anxiety to an already frustrating moment.

**Empty → Populated:** When a user takes their first action that populates an empty state, the transition should feel satisfying. The empty state's illustration or message can fade or shrink as content appears. This is one of the legitimate places for slightly more motion because the transition represents meaningful user progress.

**Default → Disabled:** When a component becomes disabled, the transition should be clear but not dramatic. Reduced opacity, possibly desaturated colors. Duration: 150-200ms. The change should communicate "no longer available" without being alarming.

**Enter and exit for layered components:** Modals, drawers, tooltips, popovers all need consistent enter and exit animations. They should feel like a matched pair — what comes in should go back out in a reverse-symmetric way.

### Coordinating multiple transitions

**Principle:** When multiple elements animate simultaneously, their timing and easing should feel orchestrated, not parallel. Small amounts of staggering often feel more composed than perfectly synchronized motion.

**Implementation guidance:**
- When a list of items enters (cards appearing, notifications arriving, search results populating), a small stagger between items (30-50ms per item) produces more satisfying motion than simultaneous appearance.
- Stagger should have a limit — typically 300-500ms total cascade time across a list. Beyond that, later items feel delayed rather than choreographed.
- When coordinating a parent and child (a modal with content inside), the parent should lead the motion — the modal frame arrives first, the content inside settles into place after. This establishes hierarchy through timing.

---

## 7. Scroll Behavior

### Scroll is the user's motion, not yours

**Principle:** Users control scroll. Interfaces should respect that control and add scroll-triggered motion only when it genuinely aids comprehension — not as decoration on what should be static content.

**Reasoning:** Scroll-triggered animations have become ubiquitous in AI-generated marketing sites. Every section fades in as it enters the viewport. Every element slides in from the side. Every image scales up on entry. The cumulative effect is a page that feels like a slideshow rather than content — every section demands its own entry, every scroll produces choreographed motion the user didn't ask for.

Most of this scroll-triggered motion fails the purpose test from Section 2. It doesn't communicate state, provide feedback, establish relationship, or soften latency. It just happens. And because it happens on every section, each instance becomes less meaningful.

### Legitimate scroll motion

Scroll-triggered motion has specific legitimate uses:

**Revealing content progressively** in long-form content where the pacing matters — interactive essays, data visualizations, narrative scroll experiences. The motion here is purposeful: it controls how information unfolds.

**Parallax for depth communication** when the depth illusion genuinely serves the content — layered imagery where foreground and background relationships matter. Most marketing parallax doesn't meet this bar.

**Sticky elements** that remain visible as context changes. A sticky header that condenses as the user scrolls past the hero serves both wayfinding and space efficiency.

**Scroll progress indicators** for long content where users benefit from knowing how much remains. Article progress bars, documentation page position indicators.

### Scroll motion to avoid

**Generic "fade and slide up" entry animations** applied to every section. If every piece of content requires a choreographed entry to feel alive, the content itself isn't strong enough.

**Aggressive parallax** that moves elements at dramatically different speeds than the scroll. Causes motion sickness in many users and rarely communicates anything meaningful.

**Scroll-hijacking** that intercepts scroll events to produce pseudo-pagination or forced transitions. Breaks user expectations about how scrolling works and frustrates users trying to read at their own pace.

**Autoplay video backgrounds** in hero sections. Demand attention the user didn't grant, cost bandwidth and battery, rarely communicate anything the static equivalent couldn't.

### Implementation guidance for scroll motion

- Default assumption: scroll should reveal content that was already there, not trigger animations as if each section is arriving fresh.
- If scroll motion is used, it should be subtle (small movement, quick duration) and should complete well before the user has scrolled past the element.
- Scroll motion must respect `prefers-reduced-motion`. For users with that preference set, all scroll-triggered animation should be disabled.
- Test scroll behavior on actual devices, including slower hardware and different input methods (mouse wheel, trackpad, touch). Scroll motion that feels fine on a fast desktop can be painful on a mobile device.

---

## 8. Page Transitions and Entry Animations

### Page transitions in SPAs

**Principle:** In single-page applications, transitions between routes can establish continuity between screens, but they must be fast enough not to slow down the perceived experience.

**Reasoning:** The appeal of page transitions is establishing continuity — a sense that routes flow into each other rather than being disconnected screens. The risk is imposing transition time on every navigation, making the app feel slower than a traditional page load. The sweet spot: transitions fast enough to feel instant while still providing continuity.

**Implementation guidance:**
- Route transitions should complete in 150-250ms total. Any longer and users perceive waiting.
- Simple crossfades are often sufficient and feel fast. More elaborate transitions (slides, scales) should be reserved for specific navigation patterns where the relationship between routes is meaningful.
- Persistent elements (headers, sidebars) should not animate on route changes — they provide stable context and shouldn't participate in the transition.
- Consider using View Transitions API (`document.startViewTransition()`) where supported, which handles cross-fade transitions natively and performantly.

### Initial page load animations

**Principle:** The first time a user sees a page, a considered entry animation can establish character and guide attention. But initial load animations should be executed carefully — they're easy to overdo.

**Reasoning:** A well-orchestrated initial load makes a strong first impression. A poorly-orchestrated one makes the page feel slow or delayed. The goal is motion that feels like the page is settling into place, not motion that makes users wait.

**Implementation guidance:**
- Initial load motion should begin as soon as content is ready, not after a deliberate delay.
- Staggered entry for hero elements (headline, subheadline, CTA, supporting content) can feel considered when timing is tight. Total cascade time: 400-600ms from first element appearing to last settling.
- Subsequent sections shouldn't require their own entry animations. Let users scroll into content that's already there.
- Test with slow connections. Entry animations that feel polished on fast connections can become frustrating when content takes time to load.

---

## 9. Motion Accessibility

### Reduced motion is not optional

**Principle:** Users who have set `prefers-reduced-motion` have signaled that motion causes them difficulty — vestibular disorders, attention issues, motion sensitivity, or simply preference. Interfaces must respect this signal. Complete disabling of animations is the safe baseline, though more nuanced approaches are better.

**Reasoning:** Motion accessibility is frequently treated as an edge case — something to consider if there's time. This is backwards. Users with motion sensitivity experience animation-heavy interfaces as genuinely painful: nausea from parallax, disorientation from elaborate transitions, migraines from pulsing or rotating elements. Ignoring `prefers-reduced-motion` isn't a nice-to-have omission; it's a user experience failure.

**Implementation guidance:**
- At minimum: when `prefers-reduced-motion: reduce` is set, all transitions should either be disabled or reduced to essential state changes (instant or very short fades).
- Better: provide alternative motion that communicates the same information with less movement. A fade instead of a slide. A color change instead of a scale. An instant state change instead of a transition.
- Specific things that must respect reduced motion: scroll-triggered animations, parallax, automatic carousels, autoplay video, hover effects that involve motion beyond color change, loading spinners that rotate continuously.
- Test with `prefers-reduced-motion` enabled. Many developers never see what their interface looks like with the setting active.

### CSS implementation

A minimum implementation pattern:

```css
/* Default: motion as designed */
.modal {
  transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
}

/* Reduced motion: minimal or no transition */
@media (prefers-reduced-motion: reduce) {
  .modal {
    transition: none;
  }
  
  /* Or, for essential transitions, very short fades only */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The nuclear-option approach (blanket disable everything) is acceptable but crude. More thoughtful implementations preserve essential feedback (button press states, focus indicators) while eliminating decorative motion.

### Other accessibility considerations

**Autoplay content:** Video backgrounds, auto-advancing carousels, animated GIFs that loop continuously — all should either be disabled by default or include a pause control. Users may have cognitive or attention reasons for wanting to control when media plays.

**Flashing and rapid motion:** Avoid anything that flashes more than three times per second. This is a WCAG requirement and protects users with photosensitive epilepsy.

**Motion-based critical interactions:** Never require a user to perceive motion to understand critical information. If a state change is communicated only through animation, users with reduced motion settings miss it.

---

## 10. The System Coherence Problem

### Motion needs a system, not a collection

**Principle:** A product's motion should feel like one coherent voice, not a pile of transitions each designed in isolation. This requires systematic decisions at the project level: duration tokens, easing tokens, and shared transition patterns.

**Reasoning:** The most common motion failure in AI-generated interfaces is that each component's motion is designed individually. Buttons hover at 100ms with one curve, modals open at 400ms with another, toasts slide in at 250ms with a third. Each is fine alone; together they feel inconsistent.

A motion system solves this by establishing a small vocabulary of timing and easing values, then applying them consistently across all components.

### A reference motion system

A minimal motion system has:

**Duration tokens:**
- `duration-instant`: 50-75ms (press states, instant feedback)
- `duration-fast`: 100-150ms (hovers, small transitions)
- `duration-base`: 200-250ms (default, most component transitions)
- `duration-slow`: 300-400ms (larger transitions, modals, significant state changes)
- `duration-slower`: 500-700ms (hero animations, deliberate moments)

**Easing tokens:**
- `ease-in`: For elements leaving
- `ease-out`: For elements arriving
- `ease-in-out`: For elements moving in place
- `ease-emphasis`: A more pronounced curve for moments of emphasis

**Standard transition patterns:**
- Hover states: `duration-fast`, `ease-out`
- Focus states: `duration-fast`, `ease-out`
- Modal/drawer enter: `duration-slow`, `ease-out`
- Modal/drawer exit: `duration-base`, `ease-in`
- State changes within components: `duration-base`, `ease-in-out`

Components reference these tokens rather than inventing their own values. New motion adds to the system deliberately or reuses existing tokens.

### Coherence across motion types

**Principle:** Micro-interactions, state transitions, page transitions, and entry animations should feel like they come from the same design. The character established in one should be present in all.

**Implementation guidance:**
- If your product uses crisp, confident motion (fast durations, sharp easing), that character should be present everywhere — not just in hover states while entry animations are slow and soft.
- If your product uses considered, deliberate motion (longer durations, smooth easing), that character should extend to micro-interactions — not just reserved for big moments while buttons snap instantly.
- A quick system audit: watch a user complete a common task. Does the motion feel like one experience, or like a sequence of components with different personalities?

---

## 11. Contextual Starting Points

These are motion system starting points for common product contexts. They're starting references, not prescriptions — the right motion for your product is whatever matches its specific character.

**Developer tool, technical, precision-oriented.**
- Fast, snappy motion throughout (100-150ms default)
- Crisp ease-out curves; avoid anything that lingers
- Minimal decorative motion — motion serves function only
- Press states and focus states as primary motion moments
- Most transitions invisible in operation; users feel responsiveness, not animation

**Financial, legal, enterprise — trust and authority.**
- Moderate, considered motion (200-300ms default)
- Balanced ease-in-out curves; avoid anything snappy or playful
- Motion communicates thoughtfulness — every transition is deliberate
- Success and confirmation animations slightly more pronounced than daily interactions
- No bounce, no elastic, no playfulness

**Consumer product, warmth and humanity.**
- Moderate motion (200-300ms default) with soft easing
- Curves that feel organic rather than mechanical
- More room for delight moments — satisfying confirmations, welcoming entries
- Micro-interactions on successful actions reinforce positive feelings
- Avoid aggressive or fast motion that could feel cold

**Editorial, content-heavy, reading-focused.**
- Minimal motion overall — let content carry the experience
- Subtle transitions where motion is used (150-250ms)
- Scroll behavior refined; no aggressive scroll-triggered effects
- Page transitions between articles can be more considered (300ms+)
- Reading experience should feel calm, not animated

**Marketing site, brand expression, distinctive voice.**
- Motion can express brand character — whatever specifically that is
- More room for distinctive entry animations, characteristic easing curves
- Hero animations can be deliberately crafted moments
- Scroll-triggered motion should still be restrained and purposeful
- The risk of overmotion is highest here; restraint still wins

**Data-heavy dashboard, interface-first.**
- Fast motion throughout (100-150ms for most transitions)
- Instant feedback on all interactions — no delay between action and response
- Data updates should animate subtly (fade transitions, brief highlights) rather than abruptly
- Loading states critical; data contexts often have significant async work
- Minimal decorative motion

**Playful, consumer, youth-oriented.**
- More expressive motion throughout
- Character easing — this is one of the few contexts where deliberate bounce or elastic might serve
- Satisfying micro-interactions on actions — satisfying sounds built in if possible
- Delight animations at meaningful moments (achievements, completions)
- Still systematic; character doesn't mean chaotic

**Luxury, premium, high-end.**
- Slow, confident motion (300-400ms default)
- Smooth easing that feels considered and deliberate
- Negative space in motion — pauses and settling time
- Less is more; one beautifully executed motion beats dozens of small ones
- Character expressed through restraint and precision

---

## 12. Motion Anti-Patterns

These are the motion failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Linear Transition
**What it is:** Animations using linear timing, producing motion that feels mechanical and robotic.
**Why AI produces it:** Linear is the default when specific easing isn't specified, and is sometimes explicitly added for "even" motion.
**The correction:** Default to ease-out for entering elements, ease-in for exiting, ease-in-out for in-place movement. Reserve linear only for continuous motion (spinners, progress bars) where constant velocity genuinely serves.

### The Slow Default
**What it is:** Transitions set at 300-400ms (or the default CSS `ease` at 0.3s) applied across all interface motion, making the entire product feel sluggish.
**Why AI produces it:** 0.3s is the statistical default for CSS transitions in training data.
**The correction:** Default your micro-interactions and small state changes to 100-150ms. Reserve 300ms+ for transitions that genuinely involve significant movement. Fast feels like quality.

### The Bounce Return
**What it is:** Using bounce or elastic easing (curves that overshoot and oscillate) for standard interface transitions — modals that bounce in, buttons that elastic on hover.
**Why AI produces it:** These curves were popular in training data from 2014-2018 web animation.
**The correction:** Avoid bounce and elastic for standard interface motion. Reserve them only for specific playful contexts or convention-following patterns (error shake on invalid input). Everywhere else, cleaner curves outperform.

### The Universal Animation
**What it is:** Applying the same transition duration and easing (usually 300ms ease) to every animated property in the interface — from button hovers to modal entries to page transitions.
**Why AI produces it:** Single global transition rules are the simplest implementation pattern.
**The correction:** Different motion types need different timing. Button hovers at 100-150ms, moderate transitions at 200-250ms, larger transitions at 300-400ms. Each with easing appropriate to its direction (in/out/both).

### The Scroll Choreography
**What it is:** Every section of a page fading in and sliding up as it enters the viewport, making the entire page feel like a choreographed sequence rather than content.
**Why AI produces it:** Scroll-triggered "fade-up" animations are massively over-represented in contemporary marketing training data.
**The correction:** Question every scroll-triggered animation against the purpose test. If the motion doesn't communicate state, provide feedback, establish relationship, or soften latency, remove it. Let users scroll into content that's already there.

### The Autoplay Burden
**What it is:** Hero videos that autoplay, carousels that auto-advance, slideshows that progress without user input — demanding attention users didn't grant.
**Why AI produces it:** Autoplay is the default for hero media patterns.
**The correction:** Autoplay should be the exception, not the default. Static hero imagery with considered motion on interaction usually outperforms autoplay video. When autoplay is used, it must be muted, respect reduced-motion settings, and include clear pause affordances.

### The Missing Reduced Motion
**What it is:** Interfaces where `prefers-reduced-motion` has no effect — all animations play at full intensity regardless of user preference.
**Why AI produces it:** Accessibility-specific media queries are commonly omitted from motion implementations.
**The correction:** Every animation implementation should include reduced-motion handling. At minimum, disable or drastically shorten transitions when `prefers-reduced-motion: reduce` is set. Better: provide alternative motion that communicates the same information with less movement.

### The Persistent Pulse
**What it is:** Elements that pulse, breathe, or continuously animate without purpose — a "live" dot that pulses forever, a button that gently scales in perpetuity, a notification badge that never stops drawing attention.
**Why AI produces it:** The pattern of "make it feel alive with a gentle animation" applied without consideration of whether the attention is warranted.
**The correction:** Continuous motion must serve continuous communication. A recording indicator pulsing while recording is legitimate; a generic element pulsing forever is noise. If an element isn't currently active or demanding attention, it shouldn't be moving.

### The Imperceptible Animation
**What it is:** Animations set at 50ms or less for moments that would benefit from perception — modal entries that appear to pop in without transition, state changes that look abrupt despite being "animated."
**Why AI produces it:** In reaction to concerns about slow animations, some implementations overcorrect toward effectively instant.
**The correction:** Animations exist to be perceived. If a modal or significant state change happens in 50ms, users don't perceive motion; they perceive a jump cut. For meaningful transitions, 150-300ms is the range where motion registers without feeling slow.

### The Hover Cascade
**What it is:** Complex hover animations with multiple synchronized effects — an element that simultaneously scales, shifts color, adds a shadow, and reveals a ring, all on mouse enter.
**Why AI produces it:** The temptation to "make the hover state feel rich" by stacking effects.
**The correction:** Hover states should be perceptible but not elaborate. One or two coordinated changes (background + slight lift, color shift + cursor) are usually enough. Users don't linger on hover states; complex animations are rarely fully perceived before the user has moved on.

### The Disorienting Parallax
**What it is:** Parallax scrolling where foreground and background elements move at dramatically different rates, producing visual disorientation without communicative purpose.
**Why AI produces it:** Parallax has been a popular marketing technique for over a decade.
**The correction:** Most parallax doesn't justify itself. If the depth illusion genuinely serves the content (layered imagery where foreground and background relationships matter), subtle parallax (10-20% rate difference) can work. Aggressive parallax (50%+ differences) causes motion sickness in many users and rarely communicates anything meaningful.

### The Loading Jumpcut
**What it is:** A loading state that abruptly swaps to loaded content without transition, producing layout shift and breaking continuity.
**Why AI produces it:** The loading-to-loaded transition is often implemented as a conditional render without transition handling.
**The correction:** Treat loading-to-content as a transition, not a swap. Skeleton screens can fade or crossfade to actual content. Content can fade in over skeletons. The specific technique matters less than the presence of a considered transition.

### The Page-Transition Theatre
**What it is:** Route transitions in SPAs that take 400-600ms or longer, making every navigation feel slower than a traditional page load.
**Why AI produces it:** Elaborate transitions are implemented in pursuit of "delight" without considering their cost on every navigation.
**The correction:** Route transitions should complete in 150-250ms total. Simple crossfades are often sufficient and feel fast. Elaborate transitions should be rare, reserved for specific relationships between routes where the motion communicates hierarchy.

---

*This reference file is loaded alongside the Spruce core skill. Motion decisions follow from the product's character established in the philosophy and interact with every other visual domain. The highest-leverage motion decision is restraint: committing to motion that serves specific communicative purpose and resisting the temptation to animate because animation is available.*
