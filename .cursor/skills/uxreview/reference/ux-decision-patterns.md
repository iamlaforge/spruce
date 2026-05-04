# Spruce Reference: UX Decision Patterns

---

## How to Use This File

This reference encodes the UX reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted before any interface is generated, reviewed, or modified. UX decisions precede visual decisions — this file establishes what an interface needs to *do* before the visual design reference files determine how it should look.

Each section contains a small number of foundational patterns. Each pattern includes: the principle itself, the reasoning behind it, the specific failure mode it prevents, and concrete implementation guidance. The goal is understanding, not memorization — an AI that understands why a pattern works can apply it to situations this file never anticipated.

---

## Contents

1. Information Architecture & Navigation
2. System Feedback & State Communication
3. Forms & Guided Input
4. Empty States, Errors, and Recovery
5. Attention & Cognitive Load
6. Progressive Disclosure
7. First Impressions & Conversion
8. Interaction Contracts
9. Trust & Transparency
10. UX Anti-Patterns

---

## 1. Information Architecture & Navigation

### Navigation mirrors tasks, not org charts

**Principle:** The structure of navigation must map to how users think about what they're trying to accomplish, not to how the product is internally organized.

**Reasoning:** Every product has two structures: the internal one (how the team organizes features, how the database is modeled, how the code is divided) and the external one (how users think about their goals). These rarely match. When navigation reflects the internal structure, users must first learn the team's model before they can find anything — a burden that compounds every session and actively works against the user's reason for being there. AI-generated navigation almost universally inherits the internal structure because that's what the prompt context describes.

**Failure mode:** Users landing on a product and not knowing where to go even when the thing they want clearly exists. High drop-off in first sessions. Support queries that ask "where is X" when X is present but categorized invisibly.

**Implementation guidance:**
- Before labeling any navigation item, write down the top five jobs users come to the product to do. Navigation labels should be verb-oriented or outcome-oriented, not module-oriented.
- Test every navigation label by asking: does this describe what the user is trying to accomplish, or what the product contains? If the latter, rewrite it.
- For applications: organize primary navigation by user workflow. "Analytics" is a product area. "Understand performance" is a user task. Prefer the latter when you can make it read naturally.
- For marketing sites: the navigation should follow the visitor's decision-making journey. A typical sequence is: what it does → who it's for → what it costs → why trust it. Resist the instinct to mirror the company's org chart with "Product / Company / Resources."
- Administrative tasks (billing, account, team management) belong in a separate secondary navigation — usually a profile menu or footer. They should never compete for attention with primary workflow navigation.

### Wayfinding is a continuous obligation

**Principle:** At every moment, the user should be able to answer three questions without thinking: where am I, how did I get here, and how do I get back.

**Reasoning:** Disorientation is cognitive tax. Each moment the user spends reconstructing their location is a moment stolen from their actual goal. Products that fail at wayfinding train users to be cautious — to avoid navigating deeply because returning is uncertain, to avoid opening modals because they might lose context, to avoid clicking links because the behavior is unpredictable. This caution compounds into reduced engagement across the entire product.

**Failure mode:** Users who feel lost in multi-level products. Users who close a modal and can't tell what changed. Users who complete an action and don't know what happened or where they are now.

**Implementation guidance:**
- Every navigation destination must have an active state that is obvious to someone who has never used the product. A subtle color shift is not sufficient — weight, background, indicator marks, or position shifts make active states legible at a glance.
- Any page more than one level deep requires breadcrumbs. Not "optional if there's space." Required.
- Modals and drawers must communicate their context: what triggered them, what they relate to, and what the user's options are. An anonymous modal that appears over unchanged content is a wayfinding failure.
- After any significant action, confirm both what happened and where the user is now. Closing a modal and returning to a visually identical screen leaves the user wondering whether anything occurred.
- Deep-linkable pages must work in isolation. A user who arrives via URL should be able to understand their full context without having navigated there.

### Breadth before depth

**Principle:** A shallow, wide navigation structure imposes less cognitive load than a deep, narrow one. Three shallow levels beat two deep ones.

**Reasoning:** Each level of navigation depth doubles the working memory burden. The user must remember not only their current location but also the parent level, the siblings at each level, and the path back. Deep structures are often signs of IA that grew organically — features were added into nested submenus rather than the structure being periodically flattened and reorganized. AI-generated navigation frequently defaults to either flat lists that grow arbitrarily long or deeply nested trees that feel exhaustive but are hostile to use.

**Failure mode:** Sidebar menus with 20 items. Dropdown menus with sub-dropdowns. Navigation where the path to any given page is impossible to remember and must be rediscovered each time.

**Implementation guidance:**
- Cap navigation at three hierarchical levels. If a fourth level is needed, the information architecture itself needs revision — not another level added.
- Primary navigation lists longer than seven items must be grouped visually. Ungrouped lists beyond seven items exceed working memory and force the user to scan every time they navigate.
- Avoid hover-triggered submenus on desktop. They are fragile under imprecise mouse movement, invisible to users who don't know to hover, and inaccessible to keyboard navigation.
- Mobile bottom navigation should hold at most five destinations. If more than five are genuinely primary, the IA needs rethinking before more slots are added.

---

## 2. System Feedback & State Communication

### Every action demands an immediate visible response

**Principle:** When a user acts on the interface, the interface must acknowledge the action within 100 milliseconds, regardless of how long the underlying operation takes.

**Reasoning:** Humans developed in a physical world where touching something produced immediate, perceptible feedback. Interfaces that violate this expectation produce a specific kind of anxiety: the user acted, but the world didn't respond. They don't know whether the action registered. They click again, and now two actions may be in flight. They lose confidence in the interface's reliability. AI-generated interfaces frequently omit immediate feedback because the happy path is designed first and feedback is bolted on later, often as a toast that appears after the operation completes.

**Failure mode:** Double-submitted forms. Panicked re-clicks. Users who complete operations but don't realize it. Gradual erosion of trust that manifests as users adopting defensive habits (refreshing the page, clicking carefully, hesitating before committing).

**Implementation guidance:**
- Interactive elements must change state immediately on interaction — before any async work completes. Minimum: a pressed/active state. Better: a transition to a loading state with a spinner or progress indicator.
- The user's expectation hierarchy for response time: 100ms feels instant, 1 second feels responsive, 10 seconds requires a progress indicator, beyond 10 seconds requires a background pattern with notification on completion.
- Confirmation language must be specific to the action. "Are you sure?" is weak; it doesn't help the user verify they're about to do what they intended. "Delete project 'Q3 Campaign'? This will permanently remove all associated data and cannot be undone." is strong.
- Form submissions have four required states, not one: idle, submitting, success, error. Each state needs deliberate design. The happy-path "show the form" is not the whole job.
- State changes from background operations (other users editing, syncs completing, data arriving) need unobtrusive signals — visible but non-interrupting. A modal that interrupts the user to announce "new message received" is worse than no notification.

### Loading states are part of the design, not placeholders for it

**Principle:** Every surface that loads asynchronously requires a deliberately designed loading state that communicates structure and progress.

**Reasoning:** A blank rectangle where content will be is a UX failure. It communicates nothing about what's coming, reveals no progress, and creates uncertainty about whether the interface is working. When content finally appears, it produces layout shift that disorients the user. Good loading states do three things at once: confirm that something is happening, reveal what's coming, and minimize perceived wait time by showing structure before content.

**Failure mode:** Users concluding the page is broken. Layout shift that moves content under a cursor mid-click. First impressions destroyed by a flash of empty content before data arrives.

**Implementation guidance:**
- For content loading beyond 300 milliseconds, use skeleton screens — low-fidelity placeholders that match the approximate shape of the incoming content. This reduces perceived wait time and prevents layout shift.
- Skeleton structure must resemble the final layout. A generic gray block is better than nothing but still produces layout shift. A skeleton that matches card dimensions, text line counts, and component spacing is far better.
- Isolate loading states to the component loading data. Avoid full-page spinners for partial updates. The rest of the interface should remain interactive.
- Progressive loads (pagination, infinite scroll) need loading indicators at the point of insertion — where new content will appear — not at the top of the screen.
- Loading states must have a failure transition. If a load fails, the skeleton should transform into a specific error state with a retry option — not vanish and leave an empty container.

### Status must be legible at a glance

**Principle:** The state of items in a system — active, pending, processing, complete, failed — must be communicable through peripheral vision, without requiring investigation.

**Reasoning:** Users build mental models of a product's state through repeated observation. Their model is continuously updated by visible signals. When status is hidden, ambiguous, or requires clicking to discover, users compensate by checking more frequently — which is friction multiplied across every session. Status that can be scanned in peripheral vision reduces checking behavior to zero and builds confidence in the product's transparency.

**Failure mode:** Users who can't tell which items are live vs. draft vs. archived. Notification systems that batch unrelated states under a single indicator. Dashboards where you have to open every item to understand its state.

**Implementation guidance:**
- Status must be encoded in at least two channels simultaneously — most commonly color and icon, or color and text label. This accommodates color vision differences and enables scanning from a distance.
- Status labels should describe specific states, not categories. "Synced 2 minutes ago" beats a green dot. "Failed — retry" beats a red dot.
- In tables and lists, status columns must be sortable and filterable. Users often need to act on status at scale: show me everything that failed, show me everything pending review.
- Each status category needs a visually distinct treatment. Using the same yellow for "warning" and "in progress" conflates two meanings that require different user responses.

---

## 3. Forms & Guided Input

### Forms are conversations, not interrogations

**Principle:** A well-designed form feels like a conversation with a product that respects the user's time and intelligence. It explains what it needs, why, and what will happen with the information.

**Reasoning:** AI-generated forms are typically technically correct and experientially cold. They collect the required fields in an order that makes sense to the developer. They use jargon as labels. They offer no explanation for why information is needed. The user experiences this as a bureaucratic requirement rather than a product interaction. Forms are often the highest-friction surface in any product, and small improvements to form UX compound directly into completion rates.

**Failure mode:** Form abandonment. Submissions with errors the user doesn't understand. Completion without confidence that the information was entered correctly.

**Implementation guidance:**
- Every label must answer a simple question: what information are you asking for, and why do you need it? When the "why" isn't obvious from context, explain inline — not in a tooltip hidden behind a question mark icon.
- Labels and placeholders serve different purposes. Labels identify the field and must remain visible when the field has content. Placeholders demonstrate format. Use both.
- Field width should hint at expected input length. A first name field and a street address field sharing the same width is a missed signal.
- Use semantic input types: `type="email"` for email addresses, `type="tel"` for phone numbers, `type="date"` for dates. These trigger appropriate mobile keyboards and enable browser-level validation.
- Group related fields with visible spacing and section headers. Name, contact, address, and payment fields should be visually distinct clusters — not an undifferentiated vertical stack.
- Single-column layouts complete faster than multi-column layouts in most cases. Multi-column is appropriate only for genuinely parallel fields (first / last name) or when horizontal space is constrained.

### Validation guides, it doesn't punish

**Principle:** Validation should help users succeed in the moment, not confront them with a list of failures after submission.

**Reasoning:** The conventional pattern of validating on submit is adversarial: the user believes they've completed the form, acts on that belief, and is met with a catalog of errors. This is the opposite of a guided interaction. Inline validation as users progress through the form turns potential errors into real-time corrections, and turns the form from an exam into a collaboration.

**Failure mode:** Users rage-quitting mid-form. Submissions that bounce back with errors the user doesn't know how to fix. Error messages that describe the violated rule instead of the required action.

**Implementation guidance:**
- Validate on blur, not on keystroke. Keystroke validation produces error states while the user is still typing, which is disorienting.
- Exception: for fields with a recognizable format (email, phone, URL, credit card), begin format-hinting once the user has typed enough to have diverged from the expected pattern.
- Error messages must describe the fix, not the failure. "Invalid email" is unhelpful. "Enter a complete email, like name@example.com" guides the user directly to success.
- Success states matter. A subtle confirmation on completed fields reassures the user and reduces the mental burden of remembering what's already been done correctly.
- For progressive validations (password strength, address verification), show the evaluation as the user types. Don't save feedback for blur — the user needs the signal immediately.
- Never clear a field on validation failure. Even incorrect input is the user's work and they need it preserved to understand their mistake. Clearing forces re-entry, which infuriates.

### Mark what's optional, not what's required

**Principle:** In most forms, most fields are required. Mark the exceptions — the optional fields — rather than marking the rule.

**Reasoning:** The asterisk-for-required convention assumes optional fields are the default, but this is almost never true. The result is asterisks on nearly every field, which quickly becomes visual noise users ignore. Marking optional fields instead flips the signal-to-noise ratio: the annotation appears only on the exceptional cases.

**Failure mode:** Forms that feel more demanding than necessary. Asterisks so common they lose meaning. Users who skip optional fields because they weren't clearly optional.

**Implementation guidance:**
- Audit every field before building. Ask: what happens if we don't collect this? If the honest answer is "nothing critical," the field is either optional or shouldn't exist.
- Mark optional fields with "(optional)" in the label. Omit any marking on required fields.
- Each additional field reduces completion rate. Collect only what you strictly need to begin the relationship, and gather additional information progressively once the user has committed.
- When a field becomes required based on another field's value, communicate the new requirement at the moment the condition is triggered — not as a surprise validation error.

---

## 4. Empty States, Errors, and Recovery

### Empty states are onboarding

**Principle:** Every empty state is a guided introduction to the space it occupies, not a failure condition to be minimized.

**Reasoning:** Empty states appear at the most critical moment in a product: the first time a new user arrives. AI-generated interfaces routinely neglect this moment because the happy path (data present) is built first and the empty path renders a generic "no items" message or nothing at all. This is the precise moment most likely to determine whether a user continues using the product.

**Failure mode:** New-user paralysis. Users arriving, seeing nothing, and having no idea what to do next. Churn within the first session.

**Implementation guidance:**
- Every list, table, dashboard, and content container needs a first-class empty state design — not a null check.
- A strong empty state has three elements: an explanation of what this area is for, a reason it's empty (not just the fact of it), and a specific low-friction action that will change the state.
- The empty state's call to action should be the same primary action used elsewhere in the component. Don't invent a separate path — make the normal path feel approachable.
- Filter and search empty states are categorically different from first-use empty states. "No results for 'quarterly report'" requires a different response than "You haven't created any reports yet." Design both.
- Decorative illustrations that don't communicate anything specific add visual weight without information. If illustration is used, make it directly about the missing content or action.
- Dashboard empty states should show the full intended layout with placeholder values or zero-states, so users understand what completed value will look like before they've generated any.

### Error messages are not the user's fault

**Principle:** Error messages must presume the user is competent and tell them exactly what to do next.

**Reasoning:** Errors appear at the moment the user is most frustrated and most likely to abandon. The error message is often the final interaction before they leave. A message that describes the system's failure in technical terms pushes them out. A message that acknowledges the problem and provides a clear next action pulls them through. The difference between these outcomes is entirely in the writing.

**Failure mode:** Users abandoning at errors because they don't know what to do. Technical language that exposes implementation details or jargon. Errors that appear and disappear before they can be read.

**Implementation guidance:**
- Every error message must answer two questions: what happened, and what should I do now. If the message doesn't answer both, it isn't finished.
- Avoid technical language in user-facing copy: no naked error codes, no stack traces, no "500 Internal Server Error" without a human explanation. If error codes are useful for support, include them alongside human text, not instead of it.
- Errors appear near their source. A field-level validation error belongs adjacent to the field, not in a banner at the top of the form.
- Errors persist until resolved. Toast notifications that auto-dismiss are appropriate for confirmations, not for errors. Failures should remain visible until the user acts on them.
- For network and system errors, tell the user whether to retry, wait, or contact support — and make whichever is correct a one-click action.
- 404 and error pages must provide forward paths. A dead end with no navigation options is never acceptable.

### Recovery paths must be immediate

**Principle:** Every failure state must contain a visible, simple recovery mechanism — ideally inline, never requiring navigation away from the failure.

**Reasoning:** A user in a failure state is already frustrated. Adding any friction to recovery — unclear instructions, multi-step processes, navigation to a different page — compounds that frustration and increases abandonment. AI-generated interfaces regularly produce failure states with no recovery path, or recovery paths that assume the user understands the failure's cause.

**Failure mode:** Users stuck in broken states with no clear exit. Recovery flows that require starting over from scratch. Lost user data following errors.

**Implementation guidance:**
- Recovery actions appear inline with the failure. A failed payment form should have "Try again" adjacent to the failure, not a link to a payment settings page.
- User data must survive failures. If a form submission fails, the input is preserved. If a session expires, offer to restore the in-progress work.
- Multi-step processes resume from the failed step, not from step one. Resetting progress on failure treats the user's invested time as disposable.
- Distinguish recoverable from unrecoverable failures. Telling users to "try again" on errors that won't resolve on retry erodes trust. Permanent failures need different language and different next actions.
- Background operation failures (sync errors, export failures, notification delivery failures) need surfaced recovery — visible signals and specific recovery actions. Silent failures are the worst kind because the user doesn't know to recover.

---

## 5. Attention & Cognitive Load

### Attention is finite — allocate it deliberately

**Principle:** Every element on screen is a request for the user's attention. Design with attention as the scarcest resource, not as something to maximize.

**Reasoning:** Cognitive load is the total mental effort required to operate an interface. AI-generated interfaces frequently maximize it — every section has equal weight, every action is equally prominent, every available feature is visible simultaneously. The effect is that the user must do the work of deciding what matters, because the interface did none of it. Good design did that work already.

**Failure mode:** Users who feel overwhelmed and cannot decide where to begin. Interfaces where the critical action is visually equivalent to administrative details. Decision paralysis produced by too many equally-weighted options.

**Implementation guidance:**
- Every screen has one primary action — the thing users most likely want to do next. That action should be the most visually prominent interactive element on the screen. Not tied for most prominent. Most prominent.
- Secondary actions exist but are visually subordinate. Tertiary actions (destructive, administrative, rarely used) must be accessible but not competing for attention with primary flows.
- Information hierarchy tracks task hierarchy. The most important information for the user's current task is the largest, highest-contrast, most prominent element on the screen. Everything else is support.
- Reduce simultaneous decisions. When a user needs to decide something, present the options clearly and remove competing choices from view. Don't surround decisions with other decisions.
- Limit the distinct visual elements competing for attention. A page with six equally weighted call-to-action buttons has no call to action.

### Complexity revealed in layers

**Principle:** Users need what's relevant to their current task, not a full inventory of what the product can do. Reveal additional complexity only as it becomes relevant.

**Reasoning:** The temptation in feature-rich products is to show everything — it demonstrates power, surfaces capabilities, and satisfies the team's wish for visibility. But users don't arrive wanting a tour of capabilities. They arrive wanting to accomplish a specific thing. Everything beyond that thing is noise until it becomes relevant.

**Failure mode:** New users overwhelmed before finding value. Power users unable to find advanced features because the UI was simplified for beginners. Interfaces that feel simultaneously too complex for beginners and too limited for experts.

**Implementation guidance:**
- Distinguish the first-use experience from the returning-user experience. First use is guided, minimal, focused on the core value. Returning users can handle — and often want — more surface.
- Advanced settings, edge-case options, and power features live in secondary UI: disclosure panels, dedicated settings pages, overflow menus. Not in the primary flow.
- Use layered disclosure patterns: summary first with expand-to-detail, default options first with access to advanced options, simple path first with deviation to the complex path.
- Contextual help should be findable but not intrusive. Inline explanations, tooltips, and guided tours belong where users look for them, not interrupting when users don't need them.

---

## 6. Progressive Disclosure

### Layer complexity by frequency, not by category

**Principle:** Product complexity should be organized by how often users need it, then revealed at the moment each layer becomes relevant.

**Reasoning:** Every product contains more complexity than any single user needs at any given moment. The question is not whether complexity exists, but how it is organized. Progressive disclosure is the practice of sorting complexity into layers — always needed, sometimes needed, rarely needed — and surfacing each layer at the appropriate moment. AI-generated interfaces often treat settings and options as a flat category, producing single pages that expose every configurable option at once.

**Failure mode:** Onboarding flows that tour every feature before users experience any value. Settings pages with hundreds of options in a flat list. Feature discovery that never happens because features are buried uniformly.

**Implementation guidance:**
- Classify every feature and option into a frequency tier: always needed, sometimes needed, rarely needed. The UI structure must reflect this tiering visually — not just logically.
- Use disclosure patterns consistently. Accordions collapse detail inline. Drawers reveal contextual secondary actions. Modals focus attention on a single task. Tooltips provide inline definitions. Each pattern signals a different kind of disclosure; using them inconsistently produces confusion.
- Modals are not a progressive disclosure pattern for information. Modals interrupt. Disclosure should feel like a natural expansion of the current context.
- Settings organize by frequency of use, not by feature category. Settings you adjust daily don't belong on the same level as settings you set once at account creation.
- Advanced features surface contextually — at the moment they become relevant — rather than in a dedicated "advanced" section that requires deliberate navigation.

---

## 7. First Impressions & Conversion

### The first screen is a pitch

**Principle:** The first thing a visitor sees on a marketing or product site must answer three questions immediately: what is this, who is it for, and why should I care.

**Reasoning:** Visitors arrive with attention to spend and skepticism to overcome. They will not read to discover what you do — they will decide in three to five seconds whether to continue reading. AI-generated marketing interfaces routinely fail this test with vague value propositions ("The platform for modern teams"), feature lists substituted for benefits, and hero sections designed for visual impressiveness rather than immediate clarity.

**Failure mode:** High bounce rates from visitors who don't understand what the product does. Conversion loss from visitors who understand the product but don't see why it matters for them. Loss of credibility from marketing copy that sounds like every other SaaS product.

**Implementation guidance:**
- The headline describes the outcome the user gets, not the features the product has. "Spend less time on payroll" (outcome) beats "Automated payroll processing" (feature).
- The sub-headline answers whichever question the headline didn't: who this is for, or how it works.
- The first CTA should be low-commitment and specific. "Try it free" beats "Get started." "See how it works" beats "Learn more."
- Social proof (logos, testimonials, numbers) appears above the fold or immediately below. Trust signals that require scrolling to find are weaker trust signals.
- The visual language of the hero communicates the product's character immediately. A developer tool, an enterprise platform, and a consumer app should look clearly different from each other — not interchangeable.

### Conversion is a series of commitments

**Principle:** Conversion is not a single decision. It is a sequence of progressively larger commitments — and each step must earn the next.

**Reasoning:** Asking a first-time visitor to sign up immediately asks for the largest commitment first. Most visitors aren't ready. The design task is to construct a path of increasing commitment — awareness, interest, intent, action — with content calibrated to each stage. AI-generated conversion flows routinely skip from awareness directly to action and then wonder why conversion is low.

**Failure mode:** Signup flows that feel demanding before users have seen enough value to commit. Abandoned trials from users who signed up without understanding the product. Low activation from users who converted without investment.

**Implementation guidance:**
- Map the conversion funnel as a sequence of commitment levels. Design content for each level — not just the final action.
- Provide micro-conversions before primary conversion: watching a demo, exploring an interactive feature, reading a case study. Each one increases investment and intent.
- Remove friction from high-intent moments. If a user is ready to sign up, don't require eight fields. Collect only what's needed to begin; gather the rest progressively.
- Pricing pages answer the visitor's actual question, which isn't "how much does it cost" but "is this worth it for someone like me." Label pricing tiers by customer type, not by feature count.
- The post-signup experience is part of the conversion funnel. A user who signs up and immediately doesn't know what to do has been acquired and lost, not converted.

---

## 8. Interaction Contracts

### Every interactive element makes a promise

**Principle:** Interactive elements make an implicit commitment: interact with me and something will happen. That commitment must be kept, immediately, every time.

**Reasoning:** The interaction contract is the foundation of trust in an interface. A button that does nothing perceptible when clicked breaks the contract. An element that looks clickable but isn't breaks the contract. A form that submits and produces no confirmation breaks the contract. Each broken contract erodes trust incrementally. A user who has experienced five broken contracts approaches every subsequent action with caution — and cautious users are slower, more frustrated, and more likely to abandon.

**Failure mode:** User uncertainty about whether actions registered. Repeated interactions caused by missing feedback. Gradual loss of trust in the product's reliability.

**Implementation guidance:**
- All interactive elements need hover, active, and focus states that are visually distinct from the default. These are not enhancements — they are part of the interaction contract.
- Hover states apply to all clickable elements. If something looks potentially interactive, it must respond to hover or it's a false affordance.
- Active (pressed) states must be visually distinct from hover states. Users should be able to tell the difference between "I'm considering this" and "I've clicked."
- Focus states for keyboard navigation must be visible and clearly scoped to the focused element. Removing focus outlines without replacing them is both an accessibility failure and a UX failure.
- Touch interfaces need touch feedback — ripple, highlight, or equivalent — on every interactive element. Silent touch interactions feel broken on mobile.

### Micro-interactions communicate care

**Principle:** Small, purposeful animations and transitions signal that the interface is alive, responsive, and built with attention. They are functional, not decorative.

**Reasoning:** Micro-interactions — the small visual changes that acknowledge input and communicate state — are the difference between an interface that feels inert and one that feels alive. They serve specific communicative purposes: confirming success, indicating progress, directing attention to change, softening perceived wait time. Used well, they are invisible. Used poorly, they are the most dated-looking feature of an interface.

**Failure mode:** Interfaces that feel dead. State changes users miss because they happened instantly. Transitions that feel jarring because they lack easing. Motion that looks like it belongs in a product from a decade ago.

**Implementation guidance:**
- Transition duration scales to the distance and significance of the change. Button state changes: 100–150ms. Panels entering: 200–300ms. Page transitions: 300–400ms. Beyond 400ms feels slow.
- Easing curves, never linear motion. Linear animation looks mechanical. Ease-out (fast start, slow end) suits elements arriving on screen. Ease-in (slow start, fast end) suits elements leaving. Ease-in-out suits elements moving within the screen.
- Avoid bounce and elastic easing for interface transitions. These feel dated, extend perceived time, and undermine the sense of professional craft in most product contexts.
- Acknowledge success with purposeful motion: a checkmark that completes on form success, a brief color confirmation when data saves, a satisfying micro-animation when a task completes.
- Respect `prefers-reduced-motion`. Every animation needs a no-motion alternative that communicates the same information through other channels.

---

## 9. Trust & Transparency

### Trust accumulates in details

**Principle:** Users form trust judgments continuously, based on small signals. Every broken detail is evidence against trusting the product.

**Reasoning:** Trust is not awarded for a single impressive feature. It accumulates from hundreds of small signals: a typo in an error message, a tooltip that's said "Coming soon" for a year, a mobile layout clearly not tested, a form that forgets user input after validation failure. Each of these is individually small. Collectively, they form a picture of a product that wasn't built carefully — and a team that isn't paying attention. That picture is incompatible with trust.

**Failure mode:** Prospects who don't convert because the product doesn't feel polished. Enterprise buyers who disqualify products based on UI quality signals. Users who abandon during onboarding because something didn't work as expected.

**Implementation guidance:**
- UI copy is consistent in tone, capitalization, and terminology throughout the product. The same action is called the same thing everywhere.
- Every string that will appear to users — error messages, empty states, confirmation dialogs, loading text — is written with the care of marketing copy. These are product touch points, not developer strings.
- Date, number, and currency formats are consistent and appropriate to the user's locale.
- Never expose raw data structures to users. No `null`, no `undefined`, no `[object Object]`, no database IDs visible in the interface.
- Mobile and desktop are both genuinely designed, not one primary and one awkwardly adapted. A desktop layout that wraps badly on mobile signals that mobile users weren't considered.

### Transparency reduces anxiety

**Principle:** When a product is honest about what it's doing, why, and what happens next, users feel in control. When it isn't, they feel anxious.

**Reasoning:** Anxiety in an interface comes from uncertainty: not knowing whether an action succeeded, not knowing what happens after a commitment, not knowing whether data is being handled appropriately, not understanding why a permission is being requested. AI-generated interfaces routinely create this anxiety by omission — they design the happy path and leave users to wonder about everything else.

**Failure mode:** Users who don't complete flows because they aren't sure what happens next. Permission prompts denied because they don't explain why the permission is needed. Data collection that generates distrust because it isn't explained.

**Implementation guidance:**
- Before any significant commitment (signup, payment, permission grant), tell the user exactly what will happen after they take the action.
- Permission requests explain why the permission is needed and what won't work without it. "We need camera access to scan documents" is dramatically more effective than a bare OS-level prompt.
- Destructive actions — delete, archive, revoke, disconnect — explain consequences before the user commits. Not after. The confirmation dialog isn't the place to discover that deletion is permanent.
- Data collection is explained at the point of collection: why it's needed, how it will be used, what the user receives in exchange. This isn't just legal compliance — it's a trust signal.
- Multi-step flows show progress. Users know how many steps exist, which step they're on, and ideally how long remains. Users aware of their progress complete at dramatically higher rates than users operating blind.

---

## 10. UX Anti-Patterns

These are the UX failures that appear most often in AI-generated interfaces. Each has a name to make it memorable, a description of the failure, the reason AI produces it, and the correct alternative.

### The Feature Tour Trap
**What it is:** Onboarding flows that walk users through every feature before they've experienced any value.
**Why AI produces it:** It's the apparent logical introduction to a product — show everything it can do. But users don't want a tour; they want to accomplish something.
**The correction:** Replace feature tours with goal-oriented onboarding. Ask what the user wants to accomplish, then guide them through exactly the steps to accomplish that one thing. Feature discovery happens naturally after first value is experienced.

### The Settings Dumping Ground
**What it is:** A settings page that exposes every configurable option in a flat list, organized by feature module.
**Why AI produces it:** Settings pages are often built by iterating through available options and grouping by the code module that owns them.
**The correction:** Organize settings by frequency of use and user mental model. Separate one-time setup from regularly-adjusted preferences from rarely-used administrative controls. Use progressive disclosure within settings for advanced options.

### The Optimistic Submission
**What it is:** A form that submits and either shows nothing (silent success) or displays a brief toast that disappears before the user can read it.
**Why AI produces it:** The happy path is the initial focus; feedback is added later and toasts are the default component for feedback.
**The correction:** Significant submissions deserve persistent confirmation — a dedicated success state, not a toast. The user should see what they completed, understand what happens next, and have a clear path forward.

### The Invisible Error
**What it is:** Validation errors that appear in a banner at the top of the page while the user's focus is on the fields that caused them.
**Why AI produces it:** Top-of-form error summaries are a simple implementation pattern and a common convention.
**The correction:** Errors appear inline, adjacent to the fields they reference. If a top-level summary is needed for accessibility, display errors both at the summary level and inline. Never rely on remote error messages alone.

### The Empty Table
**What it is:** A data table or list that renders an empty container with "No data available" when there's no content.
**Why AI produces it:** The populated state is built first; the empty state is appended as a null check render.
**The correction:** Design the empty state as a first-class component that explains what the table will contain, why it's empty, and what action will populate it.

### The Infinite Settings Scroll
**What it is:** Mobile interfaces where all settings, options, or fields live on a single infinitely-scrolling page.
**Why AI produces it:** Desktop layouts are ported to mobile without rethinking information architecture.
**The correction:** On mobile, use section-based navigation for settings — tap to enter a section, back to exit. Long scrolling settings pages on mobile offer no wayfinding and make finding anything specific difficult.

### The Modal Cascade
**What it is:** A modal that opens another modal, or a confirmation dialog that opens from within a modal.
**Why AI produces it:** Actions within modals sometimes need confirmation, and the modal pattern is reused without consideration.
**The correction:** Modals should not spawn other modals. If an action within a modal needs confirmation, inline the confirmation within the existing modal using a contextual warning state — never a new modal layer.

### The False Affordance
**What it is:** UI elements that look interactive but aren't, or elements that look static but are.
**Why AI produces it:** Visual styling gets applied without consideration of the interaction contract — cards styled to look clickable but which don't do anything, text that's actually a link but doesn't look like one.
**The correction:** Interactive elements must look interactive; non-interactive elements must not. This is a functional requirement, not a visual preference. Cursors, hover states, and visual affordances must accurately reflect what is and isn't actionable.

### The Premature Empty
**What it is:** Showing a generic "no results" state when a search or filter returns nothing, without explaining what was searched or suggesting alternatives.
**Why AI produces it:** The search empty state is implemented as a simple null check.
**The correction:** Search and filter empty states are contextual. Show what was searched, acknowledge the absence, and provide actionable alternatives — clear the filter, try different terms, broaden the search, or view all items.

### The Confidence Vacuum
**What it is:** Multi-step flows (checkout, signup, onboarding) that give no signal of progress, completion, or time remaining.
**Why AI produces it:** Steps are built independently; progress indication isn't part of the individual step component.
**The correction:** Every multi-step flow needs a persistent progress indicator showing total steps, current step, and ideally estimated time remaining. Users who know their progress complete at dramatically higher rates than users operating without that information.

### The Silent Background Failure
**What it is:** Background operations (syncs, exports, scheduled jobs, notifications) that fail without visible indication to the user.
**Why AI produces it:** Background operations are out of the user's main flow, so their failures are logged to the console or to error tracking rather than surfaced in the UI.
**The correction:** Background failures that affect the user's data or expectations must be surfaced in the UI with specific recovery actions. Silent failures are the worst kind because the user doesn't know they need to recover.

### The Destructive Default
**What it is:** Confirmation dialogs where the destructive action is the default button, or is styled more prominently than the cancel action.
**Why AI produces it:** The dialog was built around the action being confirmed, and the primary button styling was applied to the confirming action by convention.
**The correction:** In destructive confirmation dialogs, the destructive action should require deliberate selection — either styled as a secondary or warning-colored button, with the safe action (cancel) as the default. Better still: match the friction to the consequence. Typing the name of a project to delete it is better than a one-click confirmation for irreversible operations.

---

*This reference file is loaded alongside the Spruce core skill. UX reasoning precedes visual decisions. Before generating or reviewing any interface, consult the relevant patterns here to establish what the interface needs to do — then apply the visual design reference files to determine how it should look.*
