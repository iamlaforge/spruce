---
name: spruce-up
description: Set up or update the .spruce.md context file for a project. Walks the user through a short interview capturing the product's character, audience, density preference, voice direction, and explicit preferences — then writes the context file that every other Spruce command reads. Structured in tiers — five essential questions followed by optional depth questions the user can skip. Detects existing context files and offers to update or rewrite. Use once per project, or when significant context has changed.
user-invocable: true
---

# /spruce up

The context-establishing command. `/spruce up` is typically the first Spruce command a user runs in a project — it creates the `.spruce.md` file that every other command reads to calibrate its work to the specific product.

Without this file, every Spruce command is working from general principles alone. With it, every output is shaped by the specific product's character, audience, and preferences. The file is the difference between Spruce producing plausibly-designed generic output and Spruce producing output that feels like it belongs to this specific product.

The command's name is deliberate: "spruce up" as in getting the project ready, tidied, and prepared for Spruce to do its work.

---

## When to Use This Command

Use `/spruce up` when:

- Starting to use Spruce on a new project for the first time.
- The project's character, audience, or direction has shifted significantly and the context should be updated.
- Another Spruce command noted that context was thin and suggested running this first.
- An existing `.spruce.md` file is out of date or was created hastily.

Do not use `/spruce up` when:

- The context file already exists and accurately reflects the project (no need to rerun).
- The user wants specific design work rather than context setup (use the appropriate generative or corrective command).
- The project is too early to have answerable context (run it once the product has direction).

---

## Detecting Existing Files

At the start, check whether `.spruce.md` already exists in the project root.

**If it doesn't exist:** Proceed directly into the interview.

**If it exists:** Offer two paths:

> Found an existing `.spruce.md` context file. How should I proceed?
>
> - **Update** — I'll ask what's changed and update the file, preserving what's still accurate.
> - **Rewrite** — We'll start fresh. The existing file will be overwritten with the new version.
> - **Show me** — I can show you what's in the current file first, then you decide.

Wait for the user's choice before proceeding. If they choose "Show me," display the current file's contents and re-ask the update/rewrite choice.

For **Update**: ask targeted questions about what has changed rather than re-running the full interview. Preserve answers that are still accurate.

For **Rewrite**: run the full interview from scratch.

---

## The Interview Structure

The interview is tiered: five essential questions first, then optional depth questions the user can skip. Essentials produce a workable context file; depth adds nuance.

### The five essentials

These questions are required. Each one answers something that every subsequent command will need to know.

**Question 1: What is the product?** (Open text)

Frame: "In a sentence or two, what is the product and what does it do?"

This is the foundational context — what the product actually is. Users should describe it in their own words. Examples of useful answers: "A collaborative whiteboard for remote design teams," "A personal finance tracker for freelancers," "An analytics platform for senior marketers tracking campaign performance."

Don't accept generic answers. If someone says "a SaaS tool," push for specificity: "What does the tool help users do, and who uses it?"

**Question 2: Who uses it?** (Open text)

Frame: "Who's the primary user? Expertise level, context, relationship with the product?"

The audience shapes everything downstream — density, voice, complexity, visual register. Useful answers describe a specific kind of person, not a broad category: "Senior marketing directors at mid-size B2B companies, daily users, high domain expertise" is more useful than "professionals."

**Question 3: What's the product's character?** (Multiple choice, with "Other" option)

Frame: "In three to five words, what should the product feel like?"

Options:
- **Restrained and premium** — quiet confidence, refined execution, the product respects its own space
- **Technical and precise** — expert-oriented, directness, professionalism without softening
- **Warm and approachable** — humanist, inviting, treats users as people
- **Bold and expressive** — distinctive, committed to a point of view, not afraid to be specific
- **Editorial and considered** — content-focused, literary, deliberate pacing
- **Playful and energetic** — character-forward, willing to be charming, lively
- **Utilitarian and focused** — task-oriented, no decoration, efficiency as the virtue
- **Other** — (describe)

**Question 4: What density direction?** (Multiple choice)

Frame: "How dense should the interface be?"

Options:
- **Spacious** — generous whitespace, low information density, invites reading and reflection
- **Balanced** — moderate density, neither cramped nor excessive
- **Dense** — high information per screen, respects expert users' screen real estate

Include a brief note: "Most consumer products are spacious; most professional tools are balanced to dense."

**Question 5: What voice register?** (Multiple choice)

Frame: "What should the product sound like?"

Options:
- **Direct and precise** — minimal words, no hedging, respects expertise
- **Warm but not saccharine** — human and kind without being performative
- **Formal and considered** — professional register, thoughtful language
- **Conversational and relaxed** — contractions OK, comfortable tone
- **Playful with personality** — character in the copy, willing to be distinctive
- **Other** — (describe)

---

### The optional depth questions

After the five essentials, offer the user a choice:

> Those five cover the essentials and give me what I need. There's a second tier of optional questions that will add more nuance and produce a richer context file. Each one is optional — skip any that don't apply.
>
> Want to continue with the depth questions, or finish here?

If they finish, generate the context file from the essentials. If they continue, proceed through the optional questions. They can stop at any time.

**Question 6: What should the product NOT feel like?** (Open text)

Frame: "Sometimes knowing what to avoid is as useful as knowing what to aim for. Any characters or aesthetics you specifically don't want?"

Captures explicit negative preferences — "Don't want it to feel like a typical enterprise tool," "Shouldn't feel childish even though the audience includes kids," etc.

**Question 7: Any typeface preferences or constraints?** (Open text)

Frame: "Any typefaces you want to use, avoid, or have available? Brand typefaces count here."

Useful for encoding brand requirements or known preferences — "Brand requires Söhne for display," "Avoid Inter," "Prefer serif body text," etc.

**Question 8: Any color preferences or constraints?** (Open text)

Frame: "Any colors that must be used (brand colors) or avoided? Palette direction?"

Useful for brand colors, avoided defaults, temperature preferences — "Primary brand color is `#2d4a3e`," "Avoid blue, too much of it in the category," "Warm palette feels right," etc.

**Question 9: What platforms?** (Multiple choice, multi-select)

Frame: "Which platforms does the product target?"

Options:
- Web (desktop primary)
- Web (mobile primary)
- Web (both, responsive)
- Native iOS
- Native Android
- Other

Platforms affect responsive behavior, component choices, and motion character.

**Question 10: Dark mode?** (Multiple choice)

Frame: "Does the product support dark mode?"

Options:
- Yes, light and dark are both first-class
- Light only for now
- Dark only
- Unsure yet

Affects whether color tokens should include dark mode, whether commands like `/colorgrade` should consider dark mode in their work.

**Question 11: Any UX patterns you want to always use or never use?** (Open text)

Frame: "Any specific patterns you want Spruce to always reach for, or to specifically avoid?"

Useful for encoding team preferences — "Always use inline validation, never validate on submit," "Don't use carousels," "Always enable keyboard shortcuts," etc.

**Question 12: Any tradeoff defaults?** (Multiple choice, with "Skip" option)

Frame: "When Spruce has to resolve ambiguity — when 'decide for me' comes up in `/decide`, for example — which direction should it lean?"

Three sub-questions (each with options):

*When choosing between restraint and expression, prefer:*
- Restraint — quiet, confident, understated
- Expression — bold, committed, distinctive
- Skip this

*When choosing between classic and distinctive typography, prefer:*
- Classic — proven, readable, traditional choices
- Distinctive — character-forward, unusual, memorable choices
- Skip this

*When choosing between symmetric and asymmetric layouts, prefer:*
- Symmetry — balanced, structured, predictable
- Tension — asymmetric, dynamic, unexpected
- Skip this

---

## Generating the Context File

After the interview (essentials only or essentials plus depth), generate the `.spruce.md` file. The file has a consistent structure:

```markdown
# Spruce Context

## Product
[One to two sentences describing what the product is and does, from Q1.]

## Audience
[Description of the primary user from Q2 — who they are, their expertise, their relationship with the product.]

## Character
[The character direction from Q3, expanded into two or three sentences that elaborate what the character means for this product specifically.]

## Density
[Density direction from Q4 with a brief note on what this means for component and layout decisions.]

## Voice
[Voice register from Q5 with examples of what this means — what kinds of phrasing feel right, what should be avoided.]

## Platform
[From Q9 if answered, or a reasonable default if skipped.]

## Dark mode
[From Q10 if answered, or "Not yet decided" if skipped.]

## Explicit preferences

### Typography
[From Q7 if answered — specific typefaces to use or avoid. Include a note if nothing specific was mentioned.]

### Color
[From Q8 if answered — brand colors, avoided colors, palette direction. Include a note if nothing specific.]

### What this should NOT feel like
[From Q6 if answered — specific characters to avoid.]

### UX patterns
[From Q11 if answered — always-use or never-use patterns.]

## Tradeoff defaults
[From Q12 if answered — how to resolve ambiguity when "decide for me" comes up. Skip this section if all three tradeoff questions were skipped.]

## Notes
[Space for any additional context. Leave as a placeholder for the user to fill in later: "Add any additional context that Spruce should know about — brand guidelines, specific constraints, historical decisions, etc."]
```

For essentials-only runs, the file will be shorter (sections after "Voice" may say "Not specified — ask the user or use defaults"). For full runs, every section is filled in.

After generating the file, confirm completion:

> Your `.spruce.md` context file is ready in the project root. This is what every Spruce command will read to calibrate its work to your specific product.
>
> Happy to:
> - Adjust anything in the file if I've misinterpreted what you described
> - Add additional context later — just edit the file directly or run `/spruce up` again to revise
> - Get started with design work now — `/design`, `/foundations`, or any other command will use this context

---

## Tone

- **Warm but efficient.** This is the user's first real interaction with Spruce (often). The tone should invite participation without feeling like a form.
- **Specific framings.** Each question should feel purposeful — the user should understand why it's being asked.
- **Acknowledging effort.** The interview is quick, but it's still work. Make it feel like an investment in better output rather than a chore.

---

## What Not to Do

**Don't expand the essentials beyond five questions.** The whole point of tiering is that essentials stay short. If a sixth essential seems necessary, move it to the depth tier instead.

**Don't reject open-text answers that are informal or brief.** A user who answers "a writing app for students" has given enough. Don't push for formality the user didn't invite.

**Don't force depth questions.** After the essentials, make it genuinely easy to stop. Users should feel that continuing is optional, not that they've been set up for a longer interview.

**Don't generate a vague context file.** If answers are thin, probe for specificity rather than shipping vague output. "Professionals" isn't useful; "Senior developers who work in distributed teams" is.

**Don't lecture about what the right answers are.** Present options neutrally. The user's product is the user's product.

**Don't invent values the user didn't provide.** If they didn't answer the color question, don't guess at their brand colors. Note "not specified" and move on.

---

## Edge Cases

**When the user wants to quickly set up without the interview.** Accept a shortcut: "I can build a minimal context file from just a product description if you'd prefer. What is the product, in a sentence?" This produces a very lean file but gets them started. Flag that running the full `/spruce up` later would produce better context.

**When the user's answers contradict each other.** Reflect the contradiction back and ask for clarification. "You described the product as 'technical and precise' but said the voice should be 'playful with personality.' Those can coexist but point in different directions — can you say more about how they fit together for this product?"

**When the user doesn't know the answer to an essential question.** Don't skip it — explore it briefly. "No worries. What's the closest you can get? We can refine the context file later as the project develops."

**When the project is very early and nothing is decided yet.** Acknowledge that context will evolve. "This context file is a starting point, not a commitment. You can update it anytime as decisions get made."

**When the user skips all depth questions.** Generate the file with essentials only, note in the closing that running `/spruce up` again later can add more context, and move on. Don't perform disappointment.

---

## Example Interaction (Abbreviated)

**User:** `/spruce up`

**Spruce:**

Let's set up your project's context. This is a short interview — five essentials, then optional depth questions you can skip.

*[Checks for existing file, doesn't find one, proceeds.]*

**Question 1 of 5:** In a sentence or two, what is the product and what does it do?

**User:** A scheduling tool for small medical practices — lets front-desk staff manage patient appointments, send reminders, and handle rescheduling.

**Spruce:** Got it.

**Question 2 of 5:** Who's the primary user? Expertise level, context, relationship with the product?

**User:** Front-desk staff at practices with 2-10 clinicians. Non-technical users, moderate turnover, often juggling the app alongside phones and patient interactions.

**Spruce:** That's helpful context — I'll calibrate toward clarity over sophistication, and toward surfaces that hold up under distraction.

*[Continues through Q3-Q5 with multiple-choice options, collecting: Warm and approachable / Balanced density / Direct and precise voice.]*

**Spruce:** That's the essentials. There's a second tier of optional questions that will add more nuance and produce a richer context file. Want to continue with the depth questions, or finish here?

**User:** Continue.

*[Runs through Q6-Q12, collecting optional context.]*

**Spruce:** Your `.spruce.md` context file is ready in the project root.

*[Writes the file with the structure described above, populated from the interview answers.]*

This is what every Spruce command will read to calibrate its work to your scheduling tool. Happy to adjust anything in the file if I've misinterpreted what you described. Ready to do some design work whenever you are — `/design`, `/foundations`, or any other command will use this context.

---

*This command is part of Spruce. `/spruce up` establishes the project's context once, producing the file that every other Spruce command reads to shape its output to this specific product.*
