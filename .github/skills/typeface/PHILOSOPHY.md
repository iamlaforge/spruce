# The Spruce Design Philosophy

---

## Why This Exists

AI can generate a UI in seconds. The problem is that most of those UIs share the same quiet failure: they look like design without actually being design. The hierarchy is plausible. The components are recognizable. The color palette is inoffensive. And yet something is missing — the sense that a human being thought carefully about the person who will actually use this thing.

Spruce exists because looking designed and working well are not the same thing. Most AI design systems have learned to optimize for the former. Spruce is built around the latter.

This document describes the principles behind that bet. It isn't a style guide. It isn't a list of rules. It's a framework for reasoning about design decisions — one that you can direct, override, and adapt to the specific context of your product.

---

## The Principles

---

### 1. Design is a decision, not a style

Every element of a UI is the result of a choice: what to show, what to hide, what to emphasize, what to subordinate, when to ask for attention and when to stay out of the way. Good design makes those choices deliberately, with a clear understanding of why.

Most AI-generated UI skips the decision. It applies pattern-matching — this looks like a dashboard, dashboards have sidebars, sidebars have icons — without ever asking whether that pattern serves *this* product, *this* user, *this* moment in their journey.

Spruce treats every generation as a series of explicit decisions. Before producing anything, it identifies the choices involved, reasons through the tradeoffs, and either resolves them with context or surfaces them for you to direct. The output is always the result of a decision, never a default.

---

### 2. Function is the brief. Aesthetics is the execution.

A well-designed component serves its purpose so clearly that the visual treatment feels inevitable. The button is obviously clickable. The form is obviously fillable. The error message is obviously actionable. Aesthetics amplify that clarity — they don't substitute for it.

When aesthetics come first, you get interfaces that look polished in a demo and confuse people in use. The visual hierarchy points toward what looks important, not what *is* important. The color draws attention to the brand, not to the action the user needs to take. The motion impresses in the first three seconds and frustrates in the next three hundred.

Spruce starts every design task by establishing what the component or surface needs to *do* — what decision it supports, what action it enables, what information it conveys, what state it communicates. The visual language is built on top of that foundation, not instead of it.

---

### 3. Context is not optional

A developer tool and a consumer wellness app can both have excellent design. They will look nothing alike, because excellent design is inseparable from context. The right typeface for one is wrong for the other. The right information density for one would overwhelm or underwhelm the other. The right emotional register for one would feel cold or patronizing in the other.

Most AI design systems apply general principles uniformly. Spruce reasons from context first. It wants to know who the user is, what relationship they have with the product, what platform they're on, how sophisticated they are, and what they're trying to accomplish. These aren't nice-to-haves — they're the inputs that determine what good design actually looks like for this specific thing.

The Spruce context file exists for this reason. Fill it in once. Every command reads it. Every output is shaped by it.

---

### 4. The user is the creative director

Spruce is a system with opinions. Those opinions are grounded in deep design knowledge across visual craft, UX reasoning, and interaction principles. But opinions are not mandates.

You know things about your product that no skill file can encode. You know the brand's history, the team's taste, the constraints that exist for reasons nobody wrote down, the direction you're trying to grow toward. That knowledge should govern every design decision. Spruce's knowledge should serve it.

This means Spruce is built to be directed, not just activated. Commands surface tradeoffs before resolving them. The explain mode shows you the reasoning behind every choice so you can agree, override, or redirect. The context file lets you encode standing preferences so the system learns what "good" means for your specific product over time.

You are not a passenger. The system works for you.

---

### 5. Principles without understanding are just rules

There's a version of this kind of system that works by blocklist: don't use Inter, don't use purple gradients, don't nest cards. Those rules are useful as heuristics. They're useless as a foundation.

An AI that knows Inter is overused but doesn't understand *why* will avoid Inter and reach for Space Grotesk. An AI that knows purple gradients are clichéd but doesn't understand *why* will avoid purple and reach for teal. The anti-pattern shifts. The underlying failure — defaulting to the averaged-out safe choice — doesn't.

Spruce is built around understanding, not prohibition. Every anti-pattern in the system comes with an explanation of the design failure it represents, not just the visual symptom. Every principle in the reference files is grounded in reasoning about perception, cognition, and human behavior. The goal is an AI that can identify the *next* cliché, not just the current ones.

---

### 6. Good UX is invisible. Bad UX is all you see.

Visual design gets the credit. UX does the work. The most beautifully crafted interface in the world fails if the user can't find what they need, if the error message doesn't tell them what to do next, if the empty state leaves them stranded, if the loading state gives them no confidence that anything is happening.

Most AI design systems treat UX as a layer of polish on top of visual design. Spruce treats UX as the substrate. Information architecture, interaction feedback, cognitive load, progressive disclosure, form validation, edge case handling — these aren't afterthoughts. They're the conditions under which visual design either works or doesn't.

Spruce's reference files cover both layers, and the commands that address UX are not lighter versions of the visual ones. They're built on a separate body of knowledge about how people think, navigate, make decisions, and recover from errors.

---

### 7. Restraint is a skill. Confidence is a choice.

The default mode of AI-generated design is cautious. Every decision tilts toward the inoffensive: familiar layouts, predictable components, safe color palettes, conventional hierarchy. Nothing is wrong. Nothing is memorable. Nothing communicates that anyone made a choice.

Distinctive design requires committing to a direction and executing it fully. That doesn't mean loud or maximalist — restraint executed with confidence is as distinctive as expressiveness. It means having a point of view and not hedging it into oblivion.

Spruce is designed to help you find and commit to a direction — then execute it without retreating to the safe middle. The `/variant` command exists so you can see multiple distinct directions before choosing one. The `/decide` command exists so you can make the call on the tradeoffs that matter most. And once you've committed, the system executes fully, without softening the edges.

---

### 8. The work is never just the component

A button doesn't exist in isolation. It exists in a form, on a page, in a product, used by a person in a specific moment. The decisions that make a button excellent — its label, its weight, its position, its disabled state, its loading state, its relationship to the surrounding context — cannot be made by looking at the button alone.

Spruce thinks in systems. A component is a node in a larger structure. A color is part of a palette with internal relationships. A typeface choice carries implications for every other typographic decision. A spacing value ripples through every layout it touches.

This means Spruce will sometimes push back on a narrow request by asking about the broader context. It means the `/system` command exists to establish coherent foundations before individual components are built. And it means every output is evaluated not just on its own terms, but in relation to the whole it belongs to.

---

## What This Means in Practice

These principles have concrete implications for how Spruce works:

**Before generating, Spruce reasons.** It identifies the decisions involved, gathers or asks for context, and resolves tradeoffs explicitly — not by default.

**Spruce surfaces its reasoning.** Every output can be run in explain mode, which shows the design thinking behind each choice. This isn't just transparency — it's how you develop taste and take control.

**Spruce respects your overrides.** Your context file encodes your standing preferences. Your explicit instructions govern. The system's opinions yield to yours.

**Spruce covers both layers.** Visual craft and UX reasoning are equally first-class. A component isn't done when it looks right — it's done when it works right.

**Spruce teaches through use.** The goal is not dependence. The goal is that the more you use this system, the better your own design instincts become, and the more precisely you can direct it.

---

*Spruce is a system built around one belief: that the difference between a UI that looks designed and one that actually works is the quality of the thinking behind it. This document is that thinking, made explicit.*
