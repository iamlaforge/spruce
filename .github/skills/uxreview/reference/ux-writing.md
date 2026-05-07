# Spruce Reference: UX Writing

---

## How to Use This File

This reference encodes the UX writing reasoning that governs every Spruce output. It is loaded alongside the core skill and consulted whenever interfaces involve language — which, like components, means always. Every button label, every error message, every empty state, every form helper, every confirmation dialog is UX writing. Each is a moment where the product either sounds like itself or sounds like every other product.

The dominant UX writing failure in AI-generated interfaces is voice homogenization. Nearly every product ends up sounding like the same friendly-professional SaaS template: "Let's get started!" cheer in onboarding, "Oops, something went wrong!" apologies in errors, "Welcome back!" greetings at login, buttons labeled "Submit" and "Continue" and "Learn More." This voice is so pervasive that it's functionally invisible — users have learned to ignore it, which means the product has lost its opportunity to communicate through language.

This file focuses on product UI copy (buttons, labels, errors, empty states, confirmations, microcopy) rather than marketing copy. It treats voice as a character decision, provides concrete patterns for common product surfaces, and names the specific writing failures that make products sound generic.

---

## Contents

1. The Foundational Commitment
2. Voice as Character Decision
3. The Voice Dimensions
4. Buttons and Action Labels
5. Form Copy: Labels, Helpers, Placeholders
6. Error Messages
7. Empty States
8. Confirmations and Success States
9. Destructive Action Copy
10. Loading and Transition Copy
11. Settings and Configuration Copy
12. The System Coherence Problem
13. Contextual Starting Points
14. UX Writing Anti-Patterns

---

## 1. The Foundational Commitment

### Voice is a design decision

**Principle:** A product's voice is as much a design decision as its typography or color palette. It should be chosen deliberately, grounded in the product's character, and applied consistently across every piece of copy in the interface.

**Reasoning:** AI-generated UX writing defaults to a specific voice: friendly-professional, vaguely warm, slightly exclamatory, eager to help. This voice is statistically dominant in training data because it's the voice of the modal SaaS product circa 2018-2022. It works well enough that it doesn't fail, but it also doesn't succeed at communicating anything specific about any specific product. Two products built with this default voice are indistinguishable in language.

The correction isn't to pick a different template voice — it's to make the voice a deliberate character decision. A developer tool, a wellness app, a financial platform, and an editorial product should sound nothing alike. Their users, their tasks, their emotional registers, and their relationships with their audiences are all different. Language should reflect that.

**Implementation guidance:**
- Before writing any copy, establish the product's voice in a short phrase. Examples: "precise and respectful," "warm but never saccharine," "confident without marketing-speak," "plainspoken and direct."
- Treat the generic friendly-professional SaaS voice as effectively forbidden. "Let's get started!" "Oops!" "Welcome back!" "Awesome!" — these are voice defaults that should trigger immediate rewriting.
- Voice carries through the smallest pieces of copy. A single button label, read in isolation, often reveals the voice more clearly than a paragraph of marketing copy. Get the small moments right.

### Copy is the interface

**Principle:** In most products, users spend more time reading copy than looking at visual design. Copy is the primary channel through which the product communicates what it is, what it does, and how it regards its users. Treat it accordingly.

**Reasoning:** Visual design gets the credit for product quality; copy does the work. A visually mediocre product with clear, respectful, specific copy often feels more professional than a visually beautiful product with generic, hedging, template copy. AI-generated interfaces routinely invert this relationship — visual treatment receives intense attention, while copy is treated as a technical afterthought filled in by whatever the default suggests.

**Implementation guidance:**
- Every string that will appear in the interface is a product touchpoint. Error messages, empty states, loading text, confirmation dialogs, placeholder text, microcopy — all of these carry the product's voice.
- The care given to interface copy should match the care given to marketing copy. These aren't "developer strings" — they're what users actually read.
- When copy feels like it was written by someone who didn't care about the user, the product reads as one that doesn't care about the user.

---

## 2. Voice as Character Decision

### The character-to-voice translation

**Principle:** The product's character — established in the overall philosophy and expressed through typography, color, space, and components — must be consistent with its voice. Mismatched character and voice produce cognitive dissonance.

**Reasoning:** A visually brutalist product with cheerful exclamation-pointed copy feels broken. A warm, humanist consumer app with terse, clinical copy feels cold. The product's various character signals must reinforce each other, not contradict each other. Voice is often the signal that gets neglected, producing products where the visuals communicate one character and the language communicates another.

**Implementation guidance:**
- If the visual system is restrained, the voice should be too. Extended exclamation points and warm exclamations in a visually austere product read as forced.
- If the product is technical and precision-oriented, the voice should respect the user's expertise. Avoid over-explaining, simplifying, or using cute language.
- If the product is warm and approachable, the voice should be genuinely warm — but warm doesn't mean saccharine, and approachable doesn't mean cheerful. Calibrate carefully.
- A quick test: read your interface copy aloud. Does it sound like something a real person would say in a professional context that matches the product's character? Or does it sound like a template?

### What voice is not

**Principle:** Voice is not personality in the sense of quirky catchphrases or mascot-like cheerfulness. Voice is the consistent way the product talks — the vocabulary it chooses, the constructions it uses, the relationship it assumes with the user.

**Reasoning:** When products try to have "personality" in their UX writing, they often reach for surface-level markers: exclamation points, casual contractions, pop culture references, cute error messages. These get noticed, which is often confused with being effective. But they rarely survive second and third encounters — what feels charming the first time feels forced the tenth time.

Real voice is subtler and more durable. It's the choice to use "Save" versus "Save changes" versus "Keep your work." It's whether errors start with "Error:" or explain the situation directly. It's whether the product says "We" (speaking as the company) or speaks directly to the user without anthropomorphizing itself.

---

## 3. The Voice Dimensions

Every product's voice sits on several spectra. Before writing any copy, locate the product along each:

**Formal ↔ Casual.** Does the product speak with the restraint of a professional context, or with the ease of conversation? A legal platform should be formal; a consumer fitness app can be casual. Neither is better — they're appropriate to different products.

**Warm ↔ Neutral.** Does the language express emotional engagement with the user, or maintain professional distance? A wellness product should be warm; a developer tool should probably be neutral. Warm doesn't mean cheerful; it means the product acknowledges the user as a person.

**Confident ↔ Humble.** Does the product state things directly, or hedge with softening language? Confidence says "This project will be deleted." Humility says "Are you sure you'd like to delete this project?" Both have legitimate uses; over-humility becomes obsequious.

**Concise ↔ Expansive.** Does the product use the minimum words, or does it explain context and reasoning? Professional tools benefit from concision. Products for novice users often benefit from expansiveness. Neither is "right" in the abstract — the answer depends on audience expertise and task context.

**Playful ↔ Serious.** Does the product allow humor, wordplay, or levity, or does it maintain a serious register throughout? A children's learning product can be playful; a financial platform should be serious. The middle ground — occasional winks in an otherwise serious product — is tricky to execute and often fails.

**Direct ↔ Gentle.** Does the product tell the user plainly what happened, or soften and cushion its communication? "This will permanently delete your account" is direct; "Are you sure you want to proceed? This action cannot be undone" is gentler. Both have uses, but direct language is almost always clearer.

### The calibration procedure

Before writing any copy, run this short procedure:

1. What is the product's overall character? (One sentence.)
2. Where does the product sit on each voice dimension? (Six brief decisions.)
3. Who is the user? Are they expert or novice in this domain? What is their emotional state when they encounter this copy?
4. What is this specific copy trying to accomplish? (Confirm action? Explain error? Guide toward first value? Celebrate success?)
5. What voice defaults should be actively avoided for this product?

The output is a voice position the copy can answer to. Copy that doesn't match the voice position should be rewritten until it does.

---

## 4. Buttons and Action Labels

### Buttons describe the action, not the acknowledgment

**Principle:** Button labels should describe what the button does, in the most specific and direct language possible. They should not be generic acknowledgments like "Submit," "Continue," "OK," or "Done."

**Reasoning:** Generic button labels are the single most common UX writing failure in AI-generated interfaces. They appear because they work technically — the user understands that clicking them advances the flow — but they waste the opportunity to confirm what the user is actually doing. A button labeled "Submit" tells the user nothing about what happens next; a button labeled "Publish article" tells them exactly what they're about to do.

Specific button labels also reduce anxiety before commitment. When a user reads "Publish article," they've mentally confirmed the action before clicking. When they read "Submit," they may hesitate or hover — what am I submitting? Specific labels let confident users act faster and cautious users reassure themselves more easily.

**Implementation guidance:**

**Replace generic with specific.** Whenever you find yourself writing a generic action label, try replacing it with the specific action:
- "Submit" → "Send message" / "Create account" / "Save changes"
- "Continue" → "Next: Review order" / "Next: Add payment" / "Continue to billing"
- "OK" → Whatever the OK is acknowledging specifically
- "Done" → "Save draft" / "Finish setup" / "Close"
- "Learn more" → "Read the docs" / "See how it works" / "View examples"

**Use verbs that match the action's nature.** Not all actions are equal:
- Creative actions: "Create," "Add," "New"
- Destructive actions: "Delete," "Remove," "Discard"
- Saving actions: "Save," "Keep," "Store"
- Sending actions: "Send," "Share," "Publish"
- Navigating actions: "View," "Open," "Go to"
- Reversing actions: "Undo," "Cancel," "Discard"

**Match specificity to context.** A button in isolation ("Create account") should be more specific than a button in context ("Create" when the surrounding UI makes clear what's being created). Over-specificity in context feels redundant.

**The first-person question.** Some products use first-person button labels ("Send my message," "Delete my account") while others use neutral phrasing ("Send message," "Delete account"). First-person feels more committed — the user is explicitly owning the action — but can read as heavy-handed at scale. Neutral phrasing is usually right for routine actions; first-person can be reserved for high-commitment moments.

### Button label length

**Principle:** Button labels should be as short as possible while remaining specific. Usually two to four words. Very long labels (5+ words) suggest the action is too complex to fit on a button.

**Implementation guidance:**
- Most button labels should be 1-3 words: "Save draft," "Delete account," "Send invitation."
- 4-word labels are acceptable for actions that require specificity: "Schedule for next Tuesday," "Publish to production."
- 5+ word labels usually indicate the action is too complex and should be broken into steps, or the button should open a flow where the specifics happen.

---

## 5. Form Copy: Labels, Helpers, Placeholders

### Labels identify, helpers explain, placeholders demonstrate

**Principle:** Form fields have three potential pieces of copy — label, helper text, placeholder — and each has a distinct purpose. Confusing their roles produces ambiguous form experiences.

**Reasoning:** AI-generated forms often conflate these three copy types, putting explanations in placeholders (which disappear when the user types), format examples in labels (which should identify the field, not demonstrate it), or using labels that are really instructions. Each piece of copy has a specific job, and using them correctly produces forms that guide users without overwhelming them.

**The three roles:**

**Label:** Identifies what information the field is collecting. Should be a noun or noun phrase, not a question or instruction. Always visible, even when the field has content.
- Good: "Email address," "Phone number," "Project name"
- Bad: "Please enter your email address," "What's your phone number?", "Enter project name"

**Helper text:** Explains what's needed, why, or provides context. Appears below or alongside the field. Used when the label alone isn't self-explanatory or when the user benefits from understanding the purpose.
- Good: "We'll send a verification link to this address"
- Good: "Must be between 8 and 64 characters"
- Good: "Only visible to you and collaborators you invite"

**Placeholder:** Demonstrates the expected format or provides an example. Disappears when the user types. Should never contain information the user needs to remember.
- Good: "name@example.com" (demonstrates email format)
- Good: "+1 (555) 000-0000" (demonstrates phone format)
- Bad: "Enter your email" (redundant with label)
- Bad: "This is required" (critical info that disappears)

### When to use which

**Implementation guidance:**
- Use labels always. Labels are not optional.
- Use helper text when the label isn't self-explanatory, when there are format requirements, when users benefit from understanding purpose, or when data handling deserves explanation.
- Use placeholders only for format demonstration or examples. If there's no format demonstration to give, don't include a placeholder at all — an empty field is fine.
- Never put critical information only in placeholders. If users need to remember it, it belongs in the label or helper text.

### Required and optional markers

**Principle:** In most forms, most fields are required. Mark the exceptions — the optional fields — with "(optional)" rather than marking every required field with an asterisk.

**Implementation guidance:**
- Mark optional fields with "(optional)" in the label: "Company name (optional)"
- Omit any marking on required fields. Their requiredness is the default state.
- This produces less visual noise than asterisks on nearly every field, and the signal is carried by the exception rather than the rule.

---

## 6. Error Messages

### Error messages describe the fix, not the failure

**Principle:** When something goes wrong, the error message should tell the user what to do about it — not just announce that something went wrong. The goal is to restore the user's ability to continue, not to document the system's failure.

**Reasoning:** Error messages are the highest-stakes UX writing in any product. They appear at the moment the user is most frustrated and most likely to abandon. A message that describes the system's failure in technical terms pushes them out. A message that takes responsibility and provides a clear next action pulls them through. The difference is entirely in the writing.

AI-generated error messages fall into recognizable failure patterns: technical jargon that exposes implementation ("Request failed with status 500"), apologetic hedging that doesn't help ("Oops! Something went wrong. Please try again."), or generic descriptions that don't specify the fix ("Invalid input"). Each of these fails the user at a critical moment.

### The two-question test

**Principle:** Every error message must answer two questions: what happened, and what should I do now. If the message doesn't answer both, it isn't finished.

**Examples:**

Bad: "Error"
Good: "Your session expired. Please sign in again to continue."

Bad: "Invalid email"
Good: "Enter a complete email address, like name@example.com."

Bad: "Server error. Please try again later."
Good: "We're having trouble saving your changes. Check your connection and try again."

Bad: "Password does not meet requirements"
Good: "Password needs at least 8 characters and one number."

Bad: "Oops! Something went wrong."
Good: "We couldn't upload your file. It may be too large (max 50MB) or in an unsupported format."

### Error message language

**Implementation guidance:**

**Avoid jargon and codes.** No raw error codes in user-facing messages (unless also providing a human explanation). No stack traces. No "500 Internal Server Error" without a human translation.

**Own the problem when appropriate.** "We couldn't process this" is better than passive "This couldn't be processed." The product taking responsibility feels more trustworthy than passive voice deflection.

**Don't over-apologize.** One "sorry" is enough; "We're so sorry for the inconvenience, please accept our apologies" starts to feel performative. For many errors, no apology is needed — just clear guidance.

**Avoid the "Oops!" reflex.** "Oops! Something went wrong" has become so generic it now signals low quality. Errors are serious; treat them with appropriate gravity without being alarming.

**Match severity to tone.** A failed auto-save is mild; a lost payment is serious. The copy's weight should match the stakes. Light, breezy copy on serious errors feels dismissive; heavy, alarming copy on minor errors feels overdramatic.

**Provide specific recovery when possible.** "Try again" is weak. "Check your internet connection and try again" is stronger. "Your last edit was saved — try refreshing to recover" is strongest.

### Categorized error patterns

**Validation errors (the user's input doesn't meet requirements):**
- Describe the specific requirement, not just the rule
- Point to the expected format when applicable
- Appear inline, near the field in question

**System errors (something failed that's not the user's fault):**
- Acknowledge briefly without over-apologizing
- Explain what went wrong in user terms
- Provide a specific next action (retry, wait, contact support)

**Connectivity errors (network or service issues):**
- Explain the likely cause
- Suggest what the user can do (check connection, try again in a moment)
- Reassure about data preservation if applicable ("Your changes are saved locally")

**Permission errors (the user isn't authorized):**
- Explain why, not just that they can't
- Provide the path to authorization when possible (ask an admin, upgrade a plan)

**Not-found errors (a resource doesn't exist or is gone):**
- Don't just say "Not found"
- Explain what was expected and what happened
- Provide a path forward (search, return to previous context)

---

## 7. Empty States

### Empty states are guided introductions

**Principle:** Every empty state is an opportunity to introduce a user to the space they're looking at. It should explain what will be here, why it's empty now, and what specific action will change that.

**Reasoning:** Empty states appear at the most critical moment in a product — often the first time a new user arrives. The empty state's copy is doing onboarding work whether it's treated that way or not. AI-generated empty states routinely default to "No items found" or "No data available" — technically correct, experientially empty. The user arrives at what should be a guided introduction and receives instead a null check output.

### The three-part empty state

**Principle:** A well-written empty state has three parts: explanation of the space, reason it's empty, and a specific next action.

**Examples:**

Bad: "No items found."
Good: "You haven't created any projects yet. Start a project to track your work and collaborate with your team."

Bad: "No data available."
Good: "Your dashboard will show your team's activity once you invite members and start logging work."

Bad: "No results."
Good: "No documents match 'quarterly report'. Try broader search terms or check your spelling."

Bad: "This folder is empty."
Good: "Drop files here or click to browse. Supported formats: PDF, DOCX, PNG, JPG."

### Types of empty states

Different empty state types need different approaches:

**First-use empty states:** The user has never created content in this space. Copy should orient them and invite creation. This is the highest-stakes empty state because it determines whether new users continue.

**Filter/search empty states:** Content exists, but the current filter or search produced no results. Copy should acknowledge what was searched and suggest alternatives (clear filter, try different terms, view all).

**Resolved empty states:** Content was here, but it's been completed or archived. A cleared to-do list, an empty inbox. Copy should celebrate the state or explain what happened.

**Conditional empty states:** The user doesn't have permission or the feature isn't available. Copy should explain why and, when possible, provide the path to access.

---

## 8. Confirmations and Success States

### Success copy confirms specifically

**Principle:** When an action completes successfully, the confirmation should specify what was accomplished — not just announce that something succeeded.

**Reasoning:** Generic success copy ("Success!", "Done!", "Saved!") is the counterpart to generic error copy. It technically works but wastes the opportunity to confirm what the user actually did. Specific success copy provides reassurance (the right thing happened), closure (the action is complete), and sometimes context (what happens next).

**Implementation guidance:**

Bad: "Success!"
Good: "Draft saved. It will auto-save every 30 seconds as you work."

Bad: "Message sent."
Good: "Your message was sent to 3 recipients. You'll be notified when anyone responds."

Bad: "Account created."
Good: "Your account is ready. We've sent a verification link to your email — click it to access all features."

### When to show confirmation

**Principle:** Different actions deserve different levels of confirmation. Some warrant only a brief acknowledgment; others deserve a full confirmation dialog; others need no confirmation at all because the result is self-evident.

**Implementation guidance:**
- Routine actions with visible results often need no explicit confirmation. If the user types in a field and sees the field populated, that's confirmation. Don't add unnecessary "Field updated" toasts.
- Actions where the result happens off-screen or would otherwise be invisible need confirmation. Sending a message, scheduling a task, creating a record — all need acknowledgment.
- Significant actions (account changes, bulk operations, irreversible actions) deserve persistent confirmation states rather than transient toasts.

---

## 9. Destructive Action Copy

### Destructive copy is direct about consequences

**Principle:** When a user is about to take a destructive action, the copy must clearly communicate what will be destroyed, whether it can be recovered, and what they'll lose. Hedging or vague language at this moment is a failure.

**Reasoning:** Destructive actions — delete, archive, revoke, remove, unsubscribe, cancel — are moments where the user's comprehension matters most. AI-generated destructive copy often hedges ("Are you sure?") instead of describing consequences ("This will permanently delete the project and all 47 associated files. This cannot be undone.").

Hedging language feels polite but fails the user. A clear statement of consequences lets users make informed decisions. A vague warning forces them to guess at what they're about to lose.

**Implementation guidance:**

Bad: "Are you sure you want to continue?"
Good: "Delete project 'Q3 Campaign'? This will permanently remove all associated files and comments. This cannot be undone."

Bad: "This action cannot be undone."
Good: "Once deleted, your account and all data will be permanently removed within 30 days. You won't be able to recover your projects, history, or settings."

Bad: "Remove member?"
Good: "Remove Sarah from this project? They'll lose access immediately but their contributions will remain."

### Destructive button labels

**Principle:** The button that confirms a destructive action should name the action specifically, not use generic confirmation language.

**Implementation guidance:**
- Not: "OK," "Confirm," "Yes"
- Instead: "Delete project," "Remove member," "Cancel subscription," "Revoke access"
- The destructive button should also be visually distinguished (warning color, secondary position) — but the language alone should make the action clear.

### Reversibility

**Principle:** When a destructive action is reversible, say so. When it isn't, say that too. Never let the user guess.

**Implementation guidance:**
- Reversible: "Move to trash. Items in trash are kept for 30 days before permanent deletion."
- Irreversible: "Permanently delete. This cannot be undone."
- Partially reversible: "Archive conversation. You can unarchive within 90 days."

---

## 10. Loading and Transition Copy

### Loading copy respects the user's time

**Principle:** When something takes long enough to require loading copy, the copy should acknowledge what's happening and, when possible, provide information about duration or progress.

**Reasoning:** Generic loading copy ("Loading..." "Please wait...") is technically functional but communicates nothing. For operations taking more than a second or two, users benefit from knowing what's happening and how long it might take. AI-generated loading states frequently default to the generic patterns even when the specific operation would benefit from specific copy.

**Implementation guidance:**

Brief operations (under 1 second): no copy needed, visual indicator only.

Medium operations (1-10 seconds):
- "Saving your changes..."
- "Processing payment..."
- "Generating your report..."

Long operations (10+ seconds):
- Copy should specify what's happening and optionally progress: "Analyzing 1,247 records (this may take a minute)."
- Progress indicators are essential — spinners alone don't tell users anything about how much time remains.
- Consider letting the user continue using other parts of the interface while the long operation completes in the background, with notification when done.

### Transition language

**Principle:** When the interface transitions between states (from setup to active, from draft to published, from trial to paid), the copy bridging the transition matters. Clear transition copy helps users understand state changes.

**Implementation guidance:**
- At the moment of transition, confirm the change: "Your account is active. You can now invite team members."
- In the post-transition interface, orient the user: first-time copy explaining the new state, with the option to dismiss once understood.
- For significant transitions, consider brief walkthrough copy that introduces new capabilities. Keep it short; resist the feature tour trap.

---

## 11. Settings and Configuration Copy

### Settings labels describe what they control

**Principle:** Setting labels should make it clear what the setting does — not just name the technical property being configured.

**Reasoning:** AI-generated settings often use labels that describe the technical configuration rather than the user's benefit. "Enable notifications" is fine, but "Email me when someone comments on my posts" is dramatically more useful. The user doesn't have to mentally translate from technical property to outcome.

**Implementation guidance:**

Bad: "Notifications: On/Off"
Good: "Email me when someone replies to my messages"

Bad: "Dark mode"
Good: "Dark theme (easier on the eyes in low light)"

Bad: "Two-factor authentication"
Good: "Two-factor authentication (requires a code from your phone when signing in)"

Bad: "Cache: Enabled"
Good: "Save recent data locally for faster loading"

### Setting descriptions

**Principle:** Settings that aren't self-evident deserve a brief description beneath the label. The description should explain the setting's purpose and, when relevant, what happens when it's on versus off.

**Implementation guidance:**
- Setting description should be one to two sentences.
- Describe the effect of the setting, not just its mechanics.
- When defaults are meaningful, explain why the default is what it is.
- Group related settings with a section header that explains the category's purpose.

### Configuration language for technical users

**Principle:** In developer tools and technical products, settings can use more technical vocabulary — but even there, clarity beats jargon.

**Implementation guidance:**
- Technical users still benefit from clear language. "API rate limit: 1000 requests per minute" is better than "RPM threshold."
- Acronyms and technical terms are acceptable when they're genuinely shorter and widely understood by the audience.
- When in doubt, clarity wins over brevity.

---

## 12. The System Coherence Problem

### Copy needs a consistent voice

**Principle:** A product's UX writing should sound like it comes from one writer. Consistency in voice, vocabulary, terminology, and tone across every piece of copy is as important as consistency in visual design.

**Reasoning:** The most common UX writing failure at scale is inconsistency. Some error messages are direct; others apologize extensively. Some buttons use title case; others use sentence case. Some success states are terse; others are cheerful. Each piece of copy works individually, but together they feel like they were written by different people with different voices.

This happens because UX copy is often written by different people (developers, designers, product managers) at different times, without a shared voice reference. The result is products where the voice is effectively undefined — present in each individual piece of copy but incoherent across the whole.

**Implementation guidance:**
- Establish voice standards at the project level: where the product sits on each voice dimension, specific vocabulary choices (e.g., "sign in" vs. "log in"), case conventions (title case vs. sentence case for buttons, labels, headings), punctuation conventions (periods at the end of button labels or not, Oxford commas or not).
- Create a terminology reference for domain-specific concepts. If the product has "projects," don't sometimes call them "workspaces." If actions are "sent," don't sometimes say "delivered."
- Review new copy against existing copy. New error messages should sound like existing error messages. New empty states should match existing empty states in structure and tone.

### The consistency test

**Implementation guidance:**

A simple test for voice consistency: pull five random pieces of copy from different parts of the product. Do they sound like they were written by the same person? If you removed the product context, could you tell they belong to the same product?

If the answer is no, the copy needs systematic review. The goal isn't identical tone — error messages appropriately sound more serious than empty states — but underlying consistency in voice, vocabulary, and approach.

---

## 13. Contextual Starting Points

These are voice starting points for common product contexts. They're starting references, not prescriptions — the right voice for your product is whatever matches its specific character.

**Developer tool, technical, precision-oriented.**
- Direct, concise, respects expertise
- Assumes users can handle technical language when it's genuinely shorter
- No hedging, no apologizing, no cheerfulness
- Error messages explain precisely what failed and what to do
- Success states are brief confirmations
- Settings language can be technical but must be clear

**Financial, legal, enterprise — trust and authority.**
- Formal, considered, precise
- Serious tone even for routine actions
- No casual contractions, no playfulness
- Very clear about consequences — especially for financial actions
- Legal language where required, plain language where possible
- Error messages acknowledge seriousness appropriately

**Consumer product, warmth and humanity.**
- Warm but not saccharine
- Contractions acceptable, casual register acceptable
- Avoids jargon; speaks in natural language
- Acknowledges users as people, not as data entries
- Errors soften appropriately without over-apologizing
- Empty states welcoming, not technical

**Editorial, content-heavy, reading-focused.**
- Refined, literary register
- Well-crafted sentences, considered word choices
- Quality of prose visible even in small UI copy
- Button labels can be slightly more evocative ("Begin reading" vs "Start")
- Error messages written with the same care as body content

**Marketing site — out of scope for this reference.** Marketing copy is a different discipline governed by different principles (conversion, persuasion, brand expression) and warrants its own treatment. This reference focuses on product UI copy.

**Data-heavy dashboard, interface-first.**
- Clear, concise, functional
- Numeric labels describe what they measure, not just the metric
- Status labels describe specific states ("Synced 2 min ago") not categories ("Active")
- Error messages specify what went wrong in data terms
- No cheerfulness — users are working, not being entertained

**Playful, consumer, youth-oriented.**
- Personality can show more in language than elsewhere
- Humor acceptable but should be genuinely funny, not just attempted
- Can use casual contractions, exclamations sparingly
- Still clear — playfulness never compromises comprehension
- Errors can be lighter in tone but must still guide clearly

**Luxury, premium, high-end.**
- Restrained, confident, understated
- Very few exclamations, no superlatives
- Quality of writing is itself a luxury signal
- Silence often better than unnecessary copy
- Actions stated directly, with minimal hedging
- The absence of friendly-professional template voice is strongly felt here

---

## 14. UX Writing Anti-Patterns

These are the UX writing failures that appear most frequently in AI-generated interfaces. Each has a name, a description, the reason AI produces it, and the correction.

### The Friendly Professional
**What it is:** The generic SaaS voice — warm but not too warm, professional but not too formal, slightly exclamatory, eager to help. It sounds like every product made between 2018 and 2022.
**Why AI produces it:** This voice is massively over-represented in training data as the default for product copy.
**The correction:** Make voice a deliberate character decision. Identify the specific product's voice position on each of the six voice dimensions. Actively avoid the generic register — if the copy sounds like it could belong to any product, rewrite it until it sounds like yours.

### The Generic Button
**What it is:** Button labels like "Submit," "Continue," "OK," "Done," "Learn More," "Get Started" that describe generic interaction rather than specific action.
**Why AI produces it:** These are the statistical defaults for button labels in training data.
**The correction:** Replace every generic button label with a specific action description. "Submit" → "Send message" or "Create account." "Continue" → "Next: review order." "Learn more" → "Read the docs."

### The Oops Reflex
**What it is:** Error messages beginning with "Oops!" or other casual apologetic exclamations, followed by vague descriptions of failure.
**Why AI produces it:** "Oops! Something went wrong" is a ubiquitous pattern in training data.
**The correction:** Treat errors with gravity appropriate to their stakes. Skip the casual apology. Tell the user what happened and what to do next in plain, direct language.

### The Null Empty State
**What it is:** Empty states that render "No items found," "No data available," "Nothing to display," or similar null-check output.
**Why AI produces it:** The empty state is implemented as a conditional render of minimal fallback text.
**The correction:** Write empty states as first-class copy. Explain what will be here, why it's empty now, and what specific action will populate it. Make the empty state feel like an invitation, not an error.

### The Vague Validation
**What it is:** Form validation errors like "Invalid input," "Please enter a valid email," "This field is required," or "Value must be valid."
**Why AI produces it:** These are the default validation messages in training data and framework defaults.
**The correction:** Every validation message should describe both what's wrong and how to fix it. "Invalid email" → "Enter a complete email, like name@example.com." "This field is required" → deleted; just mark the field clearly as required.

### The Hedged Destructive
**What it is:** Destructive confirmation dialogs that ask "Are you sure?" without describing what will be destroyed or whether it can be recovered.
**Why AI produces it:** "Are you sure?" is the default confirmation language and feels polite.
**The correction:** Destructive copy must be direct about consequences. Name what will be deleted, specify whether it can be recovered, and use the destructive action itself as the button label ("Delete project" not "Confirm").

### The Technical Leak
**What it is:** User-facing copy that exposes technical implementation — error codes without explanation, stack traces in error messages, database terminology in labels, raw JSON values displayed to users.
**Why AI produces it:** Technical strings are pulled from backend responses directly into the UI without translation.
**The correction:** Every piece of copy that reaches the user should be written in user language. Technical information can appear alongside human explanations (for support purposes) but never instead of them.

### The Apology Cascade
**What it is:** Error messages layered with repeated apologies — "We're so sorry for the inconvenience. Our sincere apologies. Please forgive us for this issue. We apologize that..."
**Why AI produces it:** Training data includes overly apologetic customer service copy, especially for failure scenarios.
**The correction:** One brief acknowledgment is enough. For many errors, no apology is needed at all — clear guidance matters more. Over-apology reads as performative and wastes the user's time at an already frustrating moment.

### The Inconsistent Terminology
**What it is:** Products where the same concept is called different things in different places — "projects" here, "workspaces" there, "boards" somewhere else. Or actions described with different verbs in different contexts ("send" vs. "deliver" vs. "submit" for the same operation).
**Why AI produces it:** Copy is generated piece by piece without a shared terminology reference.
**The correction:** Establish a terminology reference at the project level. One name per concept. One verb per action. Apply consistently. When introducing a new term, audit existing copy to ensure the new term doesn't conflict with existing usage.

### The Marketing Invasion
**What it is:** Product UI copy that sounds like marketing copy — "Unleash your productivity!" "Supercharge your workflow!" "Experience next-generation collaboration!" — in contexts where users are trying to accomplish tasks.
**Why AI produces it:** Marketing-style enthusiasm bleeds into product copy when the two aren't distinguished as separate disciplines.
**The correction:** Product UI copy should sound like helpful communication, not persuasion. Save marketing voice for marketing surfaces. In the product itself, the voice is more restrained and functional.

### The Invisible Placeholder
**What it is:** Form placeholders that contain information the user needs to remember after they start typing — "Required field," "Must be at least 8 characters," "Enter your email to continue."
**Why AI produces it:** Placeholder text is used as a generic "hint" location without recognizing that placeholders disappear on input.
**The correction:** Placeholders only for format examples that the user doesn't need to remember. Critical information goes in labels or helper text — both of which remain visible as the user types.

### The Unspecified Success
**What it is:** Success confirmations that don't specify what succeeded — "Success!", "Done!", "Saved!", "Submitted!"
**Why AI produces it:** Generic success language is the default for confirmation toasts and dialogs.
**The correction:** Confirm specifically what happened. "Draft saved" instead of "Saved." "Message sent to 3 recipients" instead of "Sent." "Account created — verification email on its way" instead of "Success."

### The Endless Loading
**What it is:** Loading states that say "Loading..." for operations that take 5-30 seconds, providing no information about what's happening or how long it will take.
**Why AI produces it:** Default loading copy is applied uniformly regardless of operation duration.
**The correction:** Loading copy should scale with duration. Brief operations need no copy. Medium operations specify what's happening. Long operations provide progress and estimated time. Users tolerate waits better when they understand what they're waiting for.

---

*This reference file is loaded alongside the Spruce core skill. Copy decisions follow from the product's character established in the philosophy and interact with every other domain — voice inconsistency with visual character produces cognitive dissonance. The highest-leverage UX writing decision is committing to a voice that isn't the generic friendly-professional SaaS default, and applying that voice consistently across every string the user encounters.*
