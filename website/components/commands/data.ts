// Command catalog data model.
//
// TIERS holds the sidebar grouping and order. COMMANDS holds the per-slug
// content. For commands without a `detail` block, the detail page renders
// a stub ("documentation in progress") — we’ll fill those in over time.
//
// The order inside each tier matches the user-defined catalog order
// (intentionally not alphabetical; reflects how commands are typically
// reached for in practice).

export type CommandTier =
  | "setup"
  | "discovery"
  | "diagnostic"
  | "corrective"
  | "generative";

export type AntiPattern = {
  text: string;
  /** Optional anchor on the (future) /slop page. Renders as plain text
   *  for now; can be wired to a Link once /slop exists. */
  slopAnchor?: string;
};

export type CommandDetail = {
  whatItDoes: string[];
  whenToUse: string[];
  howToUse: {
    examples: string[];
    context: string;
  };
  antiPatterns: AntiPattern[];
  /** Slugs of related commands. Resolved against COMMANDS at render time. */
  seeAlso: string[];
};

export type CommandData = {
  slug: string;
  /** With the leading slash, e.g. "/typeface". */
  name: string;
  tier: CommandTier;
  tagline: string;
  detail?: CommandDetail;
};

export type Tier = {
  id: CommandTier;
  label: string;
  /** Essay paragraph for the /commands index. Longer than a tagline; treats
   *  the tier as a "shape of conversation" rather than a category label. */
  essay: string;
  slugs: string[];
};

// Tier order reflects a natural workflow path:
//   1. Setup the project context.
//   2. Discovery — ground the work in named users, jobs, journeys, scenarios.
//   3. Generate something (tokens first, then design work).
//   4. Diagnose what was generated.
//   5. Correct what’s drifted.
// Sidebar and index page render in this order.
export const TIERS: Tier[] = [
  {
    id: "setup",
    label: "Setup",
    essay:
      "One command, run before everything else. /spruce-up captures your project’s character — what you’re building, who uses it, what voice and visual direction you want — into a context file the rest of Spruce reads from. Every other command works better when this exists; many work poorly without it.",
    slugs: ["spruce-up"],
  },
  {
    id: "discovery",
    label: "Discovery",
    essay:
      "Reasoning about who the design serves, before reasoning about how it should look. The Discovery tier produces the HCD artifacts — personas, jobs-to-be-done, journeys, scenarios — that downstream commands read from when they need to ground a decision in a real user doing a real thing. Each command runs in three modes: draft from context when no research exists, structure user-supplied research when it does, or pressure-test a finished artifact for assumptions. /audit is the diagnostic counterpart — the only diagnostic command that frames findings against named personas + jobs rather than against general principles. Discovery is optional; every other tier can run without it, and most do. But work that’s grounded in Discovery reads as work made for someone specifically rather than work made for the average of training data.",
    slugs: ["personas", "jtbd", "journey", "scenarios", "audit"],
  },
  {
    id: "generative",
    label: "Generative",
    essay:
      "Producing new design work. The generative loop runs in sequence: /sketch establishes visual direction first; /foundations codifies it into tokens and primitives; /design produces a first-pass surface from that foundation; /remix surfaces alternative directions on that first pass; /decide guides specific decisions when you’re adjusting or extending — adding features, refining a section, ideating on top of the chosen direction. Each command can stand alone, but together they shape the path from a single context file to a designed surface and beyond.",
    slugs: ["sketch", "foundations", "design", "remix", "decide"],
  },
  {
    id: "diagnostic",
    label: "Diagnostic",
    essay:
      "Review and explanation, no code changes. The lens you reach for when the work feels off and you need a structured read on why. Diagnostic commands produce findings — formal audit, narrative critique, fast pattern scan, decision walkthrough — that you decide what to do with. They don’t presume.",
    slugs: ["survey", "uxreview", "critique", "detect", "explain"],
  },
  {
    id: "corrective",
    label: "Corrective",
    essay:
      "Discipline within a single dimension. The pass you reach for when one layer has drifted: typography looks generic, the palette has gone purple-and-blue, components are inconsistent, the voice has slipped into “Submit / Get Started” SaaS slop. Each corrective addresses one layer cleanly and leaves the rest alone.",
    // /finish sits last — it’s the polish pass before shipping, the natural
    // end of a corrective workflow.
    slugs: [
      "typeface",
      "colorgrade",
      "arrange",
      "refine",
      "pace",
      "voice",
      "reduce",
      "fortify",
      "finish",
    ],
  },
];

export const TIER_LABELS: Record<CommandTier, string> = {
  setup: "Setup",
  discovery: "Discovery",
  diagnostic: "Diagnostic",
  corrective: "Corrective",
  generative: "Generative",
};

export const COMMANDS: Record<string, CommandData> = {
  // -------------------------------------------------------------------------
  // /typeface — full demo content. Drawn from source/commands/typeface.md.
  // -------------------------------------------------------------------------
  typeface: {
    slug: "typeface",
    name: "/typeface",
    tier: "corrective",
    tagline: "Typography corrections — typeface, scale, hierarchy, and craft.",
    detail: {
      whatItDoes: [
        "Inter on a white background with blue accents — that’s the typography signature of AI-generated UI, inherited from training data rather than chosen. /typeface replaces the inheritance with type that fits the product: a deliberate typeface, a scale that establishes hierarchy, and the dozens of craft details (smart quotes, tabular figures, asymmetric heading margins, letter-spacing on all-caps) that accumulate into perceived quality.",
        "Like the other correctives, it uses a smart-default autonomy model: small craft fixes — smart quotes, tabular figures, line-height normalization — get applied directly. Character-level shifts — replacing the project’s typeface, changing the scale ratio, introducing a second face — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "Typography feels generic, defaulted, or inconsistent across the project.",
        "The interface uses Inter, Roboto, or system-ui as an apparent default rather than a deliberate choice.",
        "Type hierarchy is weak — headings and body text don’t read as meaningfully different.",
        "Spacing around type feels uneven: inconsistent line-heights, arbitrary margins, no clear vertical rhythm.",
        "Craft details are missing — straight quotes instead of smart quotes, numeric data misaligned, no letter-spacing on all-caps labels.",
        "A /survey has flagged typography issues and you want them addressed systematically.",
      ],
      howToUse: {
        examples: ["/typeface", "/typeface scale", "/typeface craft"],
        context:
          "By default /typeface runs a full audit covering typeface, scale, hierarchy, measure, leading, and craft details. Pass a scope argument to focus on one area — scale, hierarchy, measure, leading, rhythm, craft — or describe what you want fixed in plain language. Spruce stays focused on the requested area without drifting into adjacent typography concerns.",
      },
      antiPatterns: [
        {
          text: "Inter, Roboto, or system-ui as silent defaults — typefaces that haven’t been chosen so much as inherited from training data.",
          slopAnchor: "default-typefaces",
        },
        {
          text: "Weak type hierarchy where h2 and body text differ by just a few pixels and a slight weight bump.",
        },
        {
          text: "Symmetric heading margins that obscure which content the heading introduces.",
        },
        {
          text: "Inconsistent line-heights — body text at 1.4 in one component and 1.75 in another, with no system.",
        },
        {
          text: 'Straight quotes (\' ") in prose, three-period ellipses where a single character (…) belongs, hyphens used where en-dashes or em-dashes do.',
        },
        {
          text: "Lining figures in tables and pricing — numerals that don’t align vertically because they aren’t tabular.",
          slopAnchor: "non-tabular-figures",
        },
        {
          text: "All-caps labels with default tracking — 0 letter-spacing where 0.05–0.1em would establish rhythm.",
        },
      ],
      seeAlso: ["colorgrade", "arrange", "remix"],
    },
  },

  // -------------------------------------------------------------------------
  // /sketch — visual direction between /spruce-up and /foundations.
  // -------------------------------------------------------------------------
  sketch: {
    slug: "sketch",
    name: "/sketch",
    tier: "generative",
    tagline: "Establish visual direction before tokens commit.",
    detail: {
      whatItDoes: [
        "Most AI design workflows skip a step: nothing asks 'what should this *feel* like?' before production starts. Without that step, design tokens emerge from text alone — exactly the kind of process that produces generic AI-default output. /sketch fills the gap. It reads `.spruce.md` and produces visual direction across the dimensions where character lives — typography, color, texture, iconography, layout, motion, anti-references — and writes the result to `.sketch.md` as a persistent direction document.",
        "Character, not commitment. /sketch reasons about what the product should *feel* like and names the families and bands that express that feel — 'a humanist sans paired with an editorial serif (candidates: Söhne, Halyard, Inter Display; Lora, Tiempos, Newsreader)', 'warm-neutral palette anchored by sage and deep indigo with restrained lavender and peach accents’, 'primary transitions in the slow range, around 300–500ms.' It doesn’t pick the specific typeface, the specific OKLCH values, the specific durations. Those are /foundations’ work. Keeping the line clean preserves real creative work for both commands.",
      ],
      whenToUse: [
        "You’ve run /spruce-up and have a `.spruce.md` context file, but haven’t yet generated a design system.",
        "You want to explore visual character before committing to specific tokens or components.",
        "You want to see what the product could feel like across multiple dimensions — typography, color, texture, motion, iconography — with cohesive direction.",
        "You’re working with stakeholders who need to align on visual character before implementation begins.",
        "The product’s character is clear in your head but you want help articulating it specifically.",
      ],
      howToUse: {
        examples: ["/sketch", "/sketch --auto"],
        context:
          "Conversational by default — /sketch walks through the dimensions one at a time, surfacing options and asking for direction at key moments. The --auto flag produces a complete brief in one pass, useful when you’ve already done the thinking and just need it written up. Output is `.sketch.md` at the project root, alongside `.spruce.md`. /foundations reads both files next, picking the specific values that express the character /sketch established.",
      },
      antiPatterns: [
        {
          text: "Skipping /sketch and going straight from /spruce-up to /foundations. Tokens emerge from text alone — exactly the kind of process that produces generic AI-default output. The visual exploration step exists for a reason.",
        },
        {
          text: "Committing to single specific typefaces, hex values, or precise durations in the sketch. /sketch is character, not values. Name typeface candidates that fit the character; name color families that anchor the palette; name motion bands that match the tempo. /foundations picks the specific values.",
        },
        {
          text: "Producing a tokenized system inside .sketch.md. 'A 1.25 ratio type scale starting at 16px’ is /foundations’ work. /sketch establishes 'editorial typography that prioritizes readability at body size.' Crossing this line makes /foundations look like mechanical translation.",
        },
        {
          text: "Vague direction. 'Modern and clean’ is not direction. Push for specific character qualities, specific palette families, specific motion tempo. Specificity at the character level is the whole point of the command.",
        },
        {
          text: "Reaching for AI-default visual directions — purple gradients, tech-blue accents, geometric sans everywhere, drop-shadow elevation. /sketch exists to resist these attractors; lean toward direction tied to the product’s character.",
        },
        {
          text: "Running /sketch without `.spruce.md`. The command requires the context file as input — without it, there’s nothing to calibrate direction against. Run /spruce-up first.",
        },
      ],
      seeAlso: ["spruce-up", "foundations", "remix"],
    },
  },

  // -------------------------------------------------------------------------
  // /personas — Discovery tier. Drafts user types from context (Mode A),
  // structures supplied research (Mode B), or pressure-tests an existing
  // file (Mode C). Output: .personas.md.
  // -------------------------------------------------------------------------
  personas: {
    slug: "personas",
    name: "/personas",
    tier: "discovery",
    tagline: "Establish who the design is for, not just what it should look like.",
    detail: {
      whatItDoes: [
        "Most AI design workflows treat “the user” as an undifferentiated abstraction — a stand-in for whoever the model has seen most. /personas replaces the abstraction with named primary and secondary user types calibrated to the product, written into `.personas.md` so every downstream command (/design, /decide, /critique, /uxreview, /audit) can ground decisions in a specific person doing a specific thing rather than an average reader.",
        "Three modes, surfaced before the work begins. Mode A drafts personas from `.spruce.md` when no research exists — every persona explicitly labelled as a structured assumption rather than a finding. Mode B structures user-supplied research into the artifact format. Mode C pressure-tests a finished `.personas.md` against context for character drift, missing dimensions, or unstated assumptions. The mode question protects the artifact’s truth value — context-derived personas don’t get presented as research-grounded.",
      ],
      whenToUse: [
        "Starting a project where downstream design decisions should be grounded in named users rather than an average reader.",
        "You have user research and want it structured into the artifact format Spruce reads from.",
        "An existing `.personas.md` exists but hasn’t been pressure-tested for assumptions or drift.",
        "Another command flagged that audience context was thin and suggested grounding work in named users first.",
        "Preparing to run /audit and want HCD artifacts in place to ground its findings.",
      ],
      howToUse: {
        examples: ["/personas", "/personas pressure-test", "/personas update"],
        context:
          "By default /personas asks which mode to run — drafting from context, structuring supplied research, or pressure-testing an existing file. Every persona names its confidence (research-grounded / context-derived / assumed) so downstream commands can weight findings appropriately. Output is `.personas.md` at the project root, alongside `.spruce.md`.",
      },
      antiPatterns: [
        {
          text: "Stock-template personas with names, photos, and demographics that read as marketing personas rather than design tools. Personas should serve specific design decisions, not populate a slide.",
        },
        {
          text: "Context-derived personas presented as research-grounded findings. Without the confidence label, downstream commands can’t weight the artifact correctly — and the team can’t tell what they actually know about their users.",
        },
        {
          text: "Personas that describe demographics (“34-year-old marketing manager in Austin”) without naming what jobs they’re doing or what they need from the design. Demographics aren’t a design constraint; jobs and needs are.",
        },
        {
          text: "Five-or-more personas that fragment design attention. The artifact is most useful with a primary + secondary; additional personas dilute focus without adding decision-grounding power.",
        },
        {
          text: "Personas that don’t inform any design decision. If a persona’s existence wouldn’t change a design call, it’s documentation rather than a design tool — cut it.",
        },
      ],
      seeAlso: ["jtbd", "journey", "scenarios", "audit"],
    },
  },

  // -------------------------------------------------------------------------
  // /jtbd — Discovery tier. Articulates the underlying jobs the personas in
  // .personas.md are trying to accomplish, independent of any specific
  // solution. Output: .jtbd.md.
  // -------------------------------------------------------------------------
  jtbd: {
    slug: "jtbd",
    name: "/jtbd",
    tier: "discovery",
    tagline: "Name the jobs the personas hire the product to do.",
    detail: {
      whatItDoes: [
        "Personas describe who the user is; jobs describe what they’re trying to accomplish. /jtbd articulates the underlying jobs — functional, emotional, social — that the personas in `.personas.md` are hiring the product to do, independent of any specific feature or solution. Output is `.jtbd.md`, read by every command that should ground feature or copy decisions in real user motivation rather than in surface-level feature descriptions.",
        "Three layers, captured per persona. Functional jobs name what someone is trying to get done in the world. Emotional jobs name how they want to feel about it. Social jobs name how they want to be perceived. Cross-persona analysis surfaces shared jobs (designs that serve multiple personas at once), diverging jobs (same situation, different motivation), and conflicting jobs (serving one works against another) — each with downstream design implications.",
      ],
      whenToUse: [
        "Personas exist (`.personas.md`) but feature decisions feel disconnected from underlying user motivation.",
        "Multiple legitimate features could be built and you want a way to evaluate them against real user jobs.",
        "Copy is drifting toward feature descriptions (“Manage your projects with our tool”) rather than job descriptions (“Settle the day’s loose ends before they become tomorrow’s problem”).",
        "You want cross-persona conflict to surface as design tradeoffs rather than getting averaged-away in implementation.",
        "Preparing to /design or /decide a new feature and want to ground the decisions in jobs rather than competitive feature parity.",
      ],
      howToUse: {
        examples: ["/jtbd", "/jtbd update", "/jtbd pressure-test"],
        context:
          "By default /jtbd asks which mode to run — drafting from `.personas.md`, structuring supplied research, or pressure-testing an existing file. Every job names its confidence so downstream commands can weight it. Output is `.jtbd.md`, organized by persona with cross-persona analysis at the end.",
      },
      antiPatterns: [
        {
          text: "Feature descriptions disguised as jobs (“Use the calendar to schedule meetings”). A real job is solution-independent — it would still exist if the feature didn’t.",
        },
        {
          text: "Functional jobs only, no emotional or social. The functional layer is the easiest to articulate but the most generic; the emotional and social layers are where character-driven design decisions live.",
        },
        {
          text: "Jobs that don’t connect to any persona. Floating jobs without a named user can’t be evaluated — every job should belong to a specific persona doing a specific thing.",
        },
        {
          text: "Cross-persona conflicts averaged away rather than surfaced. The value of /jtbd is naming the conflicts so /decide can address them deliberately, not hiding them in a compromise neither persona wants.",
        },
        {
          text: "Stock JTBD framings (“I want to save time and reduce friction”) that could apply to any product. Specificity is the point — jobs that could be on any company’s website aren’t doing design work.",
        },
      ],
      seeAlso: ["personas", "journey", "scenarios", "audit"],
    },
  },

  // -------------------------------------------------------------------------
  // /journey — Discovery tier. Maps how a specific persona accomplishes a
  // specific job through real touchpoints, with emotional state, friction,
  // and opportunity tracked along the way. Output: .journeys.md.
  // -------------------------------------------------------------------------
  journey: {
    slug: "journey",
    name: "/journey",
    tier: "discovery",
    tagline: "Map a persona’s path through a real flow, with emotional arc and friction.",
    detail: {
      whatItDoes: [
        "Personas and jobs describe who and what; journeys describe how. /journey maps a specific persona accomplishing a specific job through real touchpoints — what happens at each step, what emotional state they’re in, what friction they encounter, what opportunity each touchpoint represents. Output is `.journeys.md`, read by /design, /decide, and /audit when decisions should be grounded in the lived experience of a flow rather than in its idealized happy path.",
        "Current-state vs. future-state, paired. The default /journey output maps the current-state journey (how it works today, friction included) and an optional future-state journey (how it should work after the design intervention) so the comparison itself becomes the design brief. The journey’s emotional arc, key moments, and named opportunities feed directly into /design briefs, /decide tradeoffs, and /audit findings.",
      ],
      whenToUse: [
        "A specific flow feels off and you want to understand where the friction actually lives, not where it’s most visible.",
        "Designing a new flow and want to map the lived experience before committing to the structure.",
        "The team is debating multiple flow designs and a journey would surface which design serves the persona’s emotional arc better.",
        "Preparing to /audit a flow and want a journey artifact in place to ground the findings.",
        "Comparing current-state vs. proposed-state and want the comparison to be specific rather than abstract.",
      ],
      howToUse: {
        examples: [
          "/journey",
          "/journey Maya morning practice",
          "/journey checkout flow current-state + future-state",
        ],
        context:
          "By default /journey asks which persona, which job, and whether to map current-state, future-state, or both. The journey’s setup grounds the moment in specifics (time of day, device, surrounding context); each touchpoint names what happens, the persona’s emotional state, friction (if any), and opportunity (if any). Output is `.journeys.md` with a comparison section when both states are mapped.",
      },
      antiPatterns: [
        {
          text: "Idealized happy-path journeys with no friction. The value of a journey is surfacing where the lived experience diverges from the design’s intent — a frictionless journey is documentation, not design tool.",
        },
        {
          text: "Touchpoint counts that double as feature lists. A journey isn’t a feature inventory; it’s a sequence of moments the persona moves through. If every feature gets a touchpoint, the journey is too granular to be useful.",
        },
        {
          text: "Generic emotional states (“neutral,” “engaged,” “satisfied”). Emotional states should be specific to the moment — “task-focused, slightly impatient because she came to start, not to choose” is useful; “engaged” is not.",
        },
        {
          text: "Opportunity callouts that don’t map to design decisions. Every opportunity should connect to a specific corrective or generative move; opportunities without next steps become aspirational notes.",
        },
        {
          text: "Future-state journeys that magically remove all friction. The strongest future-states preserve the friction the design can’t solve (system-level constraints, OS-level interruptions) and only address the friction the design owns.",
        },
      ],
      seeAlso: ["personas", "jtbd", "scenarios", "audit"],
    },
  },

  // -------------------------------------------------------------------------
  // /scenarios — Discovery tier. Concrete narratives anchoring a named
  // persona doing a specific job in a specific moment where the design
  // will be encountered. Output: .scenarios.md.
  // -------------------------------------------------------------------------
  scenarios: {
    slug: "scenarios",
    name: "/scenarios",
    tier: "discovery",
    tagline: "Anchor design decisions in concrete moments, not abstract use cases.",
    detail: {
      whatItDoes: [
        "Personas describe types; jobs describe motivations; journeys describe sequences. Scenarios are the lightest of the Discovery artifacts and the most concrete — short narratives anchoring a named persona doing a specific job in a specific moment where the design will be encountered. Output is `.scenarios.md`, the artifact designers keep on the wall while making specific design decisions.",
        "A scenario is one moment, not one flow. Where /journey maps a sequence, /scenarios captures the lived specificity of a single moment — Tuesday morning at 6:45am, kitchen counter, coffee brewing, fourteen unread notifications, half-attention. The specificity is the point: a scenario lets the design team test whether a design serves the moment as it actually exists, rather than the moment as the design team imagines it.",
      ],
      whenToUse: [
        "Personas and jobs exist but design decisions feel abstract — the team wants concrete moments to test against.",
        "A specific surface (a home page, a dialog, an empty state) needs design decisions and you want a scenario to anchor them.",
        "The team is debating attention assumptions (“how much can we ask of the user here?”) and a scenario would clarify the actual context of use.",
        "Two scenarios from different personas would surface a tradeoff worth designing for explicitly.",
        "You want a quick HCD artifact without committing to the depth of /journey.",
      ],
      howToUse: {
        examples: [
          "/scenarios",
          "/scenarios Maya morning kitchen",
          "/scenarios Jordan first-time on the couch",
        ],
        context:
          "By default /scenarios drafts one or two scenarios per significant decision surface, anchored to specific personas + jobs. Each scenario names the persona, the job, the lived narrative, and the design implication. Output is `.scenarios.md` — short, readable, designed to live on the wall during design work.",
      },
      antiPatterns: [
        {
          text: "Generic use-case descriptions (“user logs in to view dashboard”) instead of lived narratives. The whole point of a scenario is its specificity — a use case with a name attached isn’t a scenario.",
        },
        {
          text: "Scenarios that describe the design instead of the moment (“the user sees the personalization banner and taps Begin practice”). Scenarios should describe the world the design enters, not the design itself.",
        },
        {
          text: "Aspirational scenarios where the persona is fully attentive, fully informed, and ready to engage. Real scenarios capture half-attention, interruption, fatigue, skepticism — the conditions the design has to work in, not the conditions the design wishes for.",
        },
        {
          text: "Twenty-scenario inventories that try to cover every possible context. Scenarios are most useful when there are few of them and each one carries weight; padding undermines the artifact’s role.",
        },
        {
          text: "Scenarios without design implications. The closing line of every scenario should answer “so what does this mean for the design?” — without it, the scenario is fiction rather than a design tool.",
        },
      ],
      seeAlso: ["personas", "jtbd", "journey", "audit"],
    },
  },

  // -------------------------------------------------------------------------
  // /audit — Discovery tier (diagnostic counterpart). HCD-grounded
  // evaluation: findings tied to named personas + jobs, not general
  // principles. Output: structured findings document, no code changes.
  // -------------------------------------------------------------------------
  audit: {
    slug: "audit",
    name: "/audit",
    tier: "discovery",
    tagline: "HCD-grounded evaluation against named personas and their jobs.",
    detail: {
      whatItDoes: [
        "Where /survey, /uxreview, /critique, and /detect frame findings against general principles, /audit frames them against the specific HCD artifacts — `.personas.md`, `.jtbd.md`, `.journeys.md`, `.scenarios.md`. Every finding is tied to a named persona doing a named job, with the journey or scenario that surfaced it called out explicitly. The frame is “this empty state fails Maya doing her morning practice job because…” rather than “every list needs an empty state.”",
        "Findings include severity (Blocking / Significant / Friction / Polish), confidence (research-grounded / context-derived / assumed), and behavioral anti-pattern when applicable (Choice Overload, Premature Commitment, Cognitive Tax, Missing Recovery, Engagement Trap, Persona Mismatch). Cross-persona conflicts get surfaced as deliberate /decide calls rather than averaged away. /audit doesn’t modify code; it produces findings the team acts on.",
      ],
      whenToUse: [
        "HCD artifacts exist (at minimum `.personas.md` + `.jtbd.md`) and you want findings tied to specific users + jobs.",
        "A /survey returned generic findings and you want a sharper, persona-grounded read on what to address first.",
        "Cross-persona conflicts are likely (multiple personas with diverging jobs at the same touchpoint) and you want them surfaced explicitly.",
        "Behavioral anti-patterns (Choice Overload, Engagement Trap, Cognitive Tax) are suspected and you want them named with their HCD-grounded justification.",
        "Preparing to ship and want a final HCD-grounded read alongside the cross-dimensional /finish polish pass.",
      ],
      howToUse: {
        examples: [
          "/audit",
          "/audit home page",
          "/audit checkout flow",
        ],
        context:
          "By default /audit reads every Discovery artifact in the project and evaluates the full surface against them. Pass a scope (page, flow, area) to focus the audit. Without HCD artifacts in place, /audit recommends running /personas + /jtbd first rather than degrading to generic findings — it’s explicitly the HCD-grounded lens.",
      },
      antiPatterns: [
        {
          text: "Findings framed against general UX principles (“every list needs an empty state”) instead of against specific personas + jobs. That’s /uxreview’s frame; /audit’s value is the HCD grounding.",
        },
        {
          text: "Running /audit without HCD artifacts and producing generic findings anyway. The command should redirect to /personas + /jtbd rather than degrading silently.",
        },
        {
          text: "Cross-persona conflicts averaged away in single recommendations (“design for both”) rather than surfaced as deliberate /decide tradeoffs.",
        },
        {
          text: "Severity assigned mechanically (every empty state = Significant) rather than calibrated to which persona it affects, doing which job, in which scenario.",
        },
        {
          text: "Behavioral anti-patterns named without justification. “This is Choice Overload” is weaker than “This is Choice Overload because Maya’s morning context can’t carry a six-option choice — surfaced in her morning kitchen scenario as half-attention.”",
        },
      ],
      seeAlso: ["personas", "jtbd", "journey", "scenarios"],
    },
  },

  // -------------------------------------------------------------------------
  // Stubs — name + tier + tagline only. Detail content TBD.
  // -------------------------------------------------------------------------
  "spruce-up": {
    slug: "spruce-up",
    name: "/spruce-up",
    tier: "setup",
    tagline: "Set up the project’s design context. Run this first.",
    detail: {
      whatItDoes: [
        "Run any Spruce command without context and the output is plausible but generic — calibrated to no product in particular, just the average of training data. /spruce-up writes the file that fixes this: a short interview captures your product’s character — what it is, who uses it, what voice and visual direction you want — into `.spruce.md` at the project root, where every other command reads from it before reasoning.",
        "The interview is tiered. Five essential questions produce a workable file; optional depth questions add nuance and can be skipped or revisited later. Run /spruce-up once at the start of a project; re-run it when the product’s direction shifts significantly.",
      ],
      whenToUse: [
        "Starting to use Spruce on a new project for the first time.",
        "The project’s character, audience, or direction has shifted significantly and the existing context is now stale.",
        "Another Spruce command noted that context was thin and suggested running this first.",
        "An existing `.spruce.md` file exists but was created hastily and doesn’t actually reflect the product.",
      ],
      howToUse: {
        examples: ["/spruce-up", "/spruce-up update"],
        context:
          "Run /spruce-up at the start of a project; you generally won’t run it again. If a `.spruce.md` already exists, the command detects it and offers to update specific answers, rewrite the whole file, or show you what’s there before deciding. The interview takes a few minutes; depth questions can be skipped and revisited later.",
      },
      antiPatterns: [
        {
          text: "Running other Spruce commands without context first. Output looks plausible but feels generic — every command is reasoning from training data rather than from the specific product’s character.",
        },
        {
          text: "Filling in the interview reflexively, picking the safest-sounding answer to each question. The context file is only as useful as the specificity in your answers; vague inputs produce generic outputs.",
        },
        {
          text: "Treating the context file as set-and-forget. As the product’s audience or direction shifts, the file gets stale. Re-running /spruce-up update keeps it current.",
        },
      ],
      seeAlso: ["sketch", "foundations", "design"],
    },
  },
  foundations: {
    slug: "foundations",
    name: "/foundations",
    tier: "generative",
    tagline: "Generate design tokens and primitives.",
    detail: {
      whatItDoes: [
        "AI tools generate the same baseline for every product — Inter on white, blue accents, 8px radii, Tailwind’s default scale. /foundations replaces the inheritance with a starter system calibrated to your project’s character: color tokens, type scale, spacing, radius, motion, plus the primitive components everything else composes from.",
        "/foundations is the commit-to-specifics step. It reads `.spruce.md` for context and `.sketch.md` for visual direction, then picks the specific values that express the character /sketch established — which typeface from the candidates, what specific OKLCH values for the color families /sketch named, what scale, what spacing rhythm, what specific durations within /sketch’s motion bands, what primitive components anchor the system. The creative work at this stage is selection and codification, not character discovery — that already happened in /sketch.",
        "The output is end-to-end: design tokens across all domains, three to five primitive components implementing the system, plus a brief system guide. Significant decisions inside the codification step (accent strategy, type pairing, spacing base) are surfaced for your approval before commitment. When `.sketch.md` doesn’t exist, /foundations can still run — it makes the character calls inside itself but flags them clearly so they’re easy to redirect.",
      ],
      whenToUse: [
        "Starting a new project after /spruce-up has captured context and /sketch has captured visual direction.",
        "The project has no design tokens or primitive components yet.",
        "Existing tokens are arbitrary — no scale, no system, just one-off values.",
        "A project’s existing design system needs regenerating for a new direction.",
        "Another command flagged that there’s no foundation to work with.",
      ],
      howToUse: {
        examples: ["/foundations", "/foundations color", "/foundations type"],
        context:
          "By default /foundations runs the full pass — color tokens, type scale, spacing, radius, motion, plus a small set of primitive components (button, card, link, heading). Pass a scope to focus on one layer, or describe what you need. Significant character shifts within each layer are surfaced for your approval rather than applied silently.",
      },
      antiPatterns: [
        {
          text: "Inter, blue accents, and 8px radii shipped because the AI didn’t have anything else to draw from. Tokens by inheritance, not by choice.",
          slopAnchor: "default-tokens",
        },
        {
          text: "Arbitrary spacing values (15px, 22px, 31px) with no underlying scale — visual wobble accumulating across the system.",
        },
        {
          text: "Primitives that don’t reference tokens — colors hardcoded inline, sizes set in pixels rather than scale steps. The system has tokens, but components ignore them.",
        },
        {
          text: "Three different type families because no decision was made about the typographic voice — geometric sans for headings, system-ui for body, a serif somewhere for variety.",
        },
        {
          text: "Six different corner radii across components. The shape system was never established; each component picks its own.",
        },
        {
          text: "“Custom” tokens that just rename Tailwind defaults without character consideration — `color.primary = blue-500`.",
        },
      ],
      seeAlso: ["sketch", "spruce-up", "design"],
    },
  },
  decide: {
    slug: "decide",
    name: "/decide",
    tier: "generative",
    tagline: "Direct each significant decision when extending or adjusting a chosen direction.",
    detail: {
      whatItDoes: [
        "Most AI design tools take a prompt and produce output — deciding everything in between invisibly. /decide makes those intermediate decisions visible. It surfaces the meaningful tradeoffs as named options, lets you pick or delegate each one, and generates only after you’ve directed the significant calls.",
        "/decide sits late in the generative loop. /design produces a first-pass surface; /remix surfaces alternative directions; once a direction is chosen, /decide is the command for ideating *on top of* it — adding a feature, refining a section, deciding how a new piece of UI should fit. It identifies the two to four decisions that will most shape the addition, presents them one at a time with named options, and stops to wait for your call. Each decision is a real creative-director choice — not a survey question, not a preference selection — with downstream implications you can think through before committing.",
      ],
      whenToUse: [
        "Adding a feature or new piece of UI to an existing screen, and the placement / prominence / pattern decisions are genuinely open.",
        "Adjusting a section of a chosen design direction, where multiple legitimate alternatives exist.",
        "The task has more than one reasonable answer and the right call depends on preferences you haven’t yet articulated.",
        "You want creative-director control over the meaningful decisions, not an autonomous output to react to.",
        "The deliverable is significant enough that rework from wrong assumptions would cost time.",
      ],
      howToUse: {
        examples: [
          "/decide adding a personalization banner to the practices section",
          "/decide a daily-reminder feature for the home page",
          "/decide how to extend the pricing page with a comparison view",
        ],
        context:
          "/decide accepts a brief describing what you’re adding, adjusting, or ideating on. It walks through the meaningful decisions one at a time. Each decision presents two or three named options plus a “Decide for me” delegation. After all decisions are made, /decide generates output that reflects what you directed — a new component, a modified section, or a small new piece of the surface.",
      },
      antiPatterns: [
        {
          text: "Reaching for /decide when starting from scratch — that’s /design’s territory. /decide assumes a direction already exists; it ideates on top of it rather than producing the foundation.",
        },
        {
          text: "Tools that decide everything invisibly, leaving the user to react to output rather than direct it.",
        },
        {
          text: "Survey-fatigue flows that ask 15 questions before producing anything. /decide stops at 2-4 decisions — the ones that genuinely shape the result.",
        },
        {
          text: "Template-based tools that present pre-made variations for selection. /decide is a guided process, not a curated menu.",
        },
        {
          text: "Decision flows that surface trivial choices (button color, spacing values) instead of the substantive ones (placement, prominence, register, pattern).",
        },
      ],
      seeAlso: ["remix", "design", "foundations"],
    },
  },
  design: {
    slug: "design",
    name: "/design",
    tier: "generative",
    tagline: "Generate with Spruce reasoning applied.",
    detail: {
      whatItDoes: [
        "Most AI design tools take a prompt and produce output — calibrated to the average of training data, generic by default. /design takes context and produces output that fits: reading from `.spruce.md`, composing within the tokens /foundations established, applying the seven dimensions of Spruce reasoning to a coherent artifact in one pass.",
        "/design ships in one pass — making calls autonomously based on context, then noting the significant ones in the output. If you want to direct each call yourself, use /decide. If you want to see three different directions for the same brief, use /remix.",
      ],
      whenToUse: [
        "Starting a fresh artifact — page, feature, screen, or component — once /spruce-up and /foundations have established the context and substrate.",
        "The task is well-specified enough that walking through every decision would slow you down.",
        "You want autonomous output to refine, not a guided walkthrough.",
        "Building something concrete that should sit naturally inside the project’s existing system.",
      ],
      howToUse: {
        examples: [
          "/design",
          "/design pricing page",
          "/design checkout-success state",
        ],
        context:
          "/design takes a brief and produces output. Describe a page, feature, component, or moment with enough specificity that the output has a clear target. The command composes within the project’s foundations (color tokens, type scale, spacing, primitives) so output sits inside the established system. Significant decisions are noted in a brief change-list at the end so you can redirect specific calls.",
      },
      antiPatterns: [
        {
          text: "Vague prompts like “design something” or “make a UI” produce vague output. /design works best with a specific brief.",
        },
        {
          text: "Generated artifacts that ignore the project’s foundations — arbitrary colors, off-scale spacing, or type that doesn’t reference the established tokens.",
        },
        {
          text: "Output that compounds AI defaults (Inter on white, blue accents, 8px radii) because /spruce-up wasn’t run first and the command had no context to reason from.",
          slopAnchor: "no-context-output",
        },
        {
          text: "Output without noted decisions, leaving you unable to see what was made autonomously and unable to redirect specific calls.",
        },
      ],
      seeAlso: ["foundations", "decide", "remix"],
    },
  },
  remix: {
    slug: "remix",
    name: "/remix",
    tier: "generative",
    tagline: "Three distinct directions for the same brief.",
    detail: {
      whatItDoes: [
        "Most design tasks have multiple legitimate answers. AI defaults to one — usually the statistically most likely — and produces it as if it were the answer. /remix produces three genuinely distinct directions for the same brief, executed at equal fidelity, so you can see real alternatives before committing to one.",
        "The variants commit to fundamentally different aesthetics — different typography, different color, different character register. They’re three different points of view on the same product, anchored to your context but diverging in how they express it. Pick one to develop further, or combine elements across them.",
      ],
      whenToUse: [
        "The brief has multiple legitimate directions and the right one isn’t obvious from context.",
        "You want to see alternatives before committing — preference clarifies faster from seeing options than from discussing them in the abstract.",
        "Existing work feels right but you wonder what else is possible.",
        "You’re exploring direction early in a project, before locking in a system.",
        "The request is exploration-framed: “show me options,” “what else could this look like.”",
      ],
      howToUse: {
        examples: [
          "/remix",
          "/remix hero section",
          "/remix typography",
        ],
        context:
          "By default /remix produces three directions for the most recent design output or current scope. Pass a target — a component, page, or feature — to focus the variants. Pass a domain like 'typography’ or 'layout’ when the rest of the design is locked and only one axis is being explored.",
      },
      antiPatterns: [
        {
          text: "Three variations on the same direction — same typography with minor color shifts — disguised as alternatives. Variations on a theme aren’t variants.",
        },
        {
          text: "A “best one + two alternatives” presentation that defeats the purpose. /remix presents three directions as equals; you decide.",
        },
        {
          text: "A pre-combined “hybrid fourth option” that undermines the three-direction structure — usually muddier than any of the three distinct ones.",
        },
        {
          text: "Variants in wildly different fidelity — one fully built, one half-fleshed, one a sketch. Comparison breaks down when the variants aren’t equivalent.",
        },
        {
          text: "Arbitrary divergence — three variants that ignore the product’s context to “be different.” Distinct doesn’t mean unanchored.",
        },
      ],
      seeAlso: ["design", "decide", "foundations"],
    },
  },
  colorgrade: {
    slug: "colorgrade",
    name: "/colorgrade",
    tier: "corrective",
    tagline: "Color discipline — palette, contrast, accent scarcity.",
    detail: {
      whatItDoes: [
        "The purple gradient. The tech-blue accent. Pure black on pure white. These are the watermarks of AI-generated UI — patterns common enough that they function as visual signatures of default output. /colorgrade leaves them behind, replacing them with palette decisions that match the product’s character rather than the training data’s.",
        "Like the other correctives, it uses a smart-default autonomy model. Small craft fixes — tinting pure black and pure white, fixing contrast failures, establishing text-color hierarchy — get applied directly. Palette-character shifts — replacing a tech-blue accent with something committed, converting hex to OKLCH, changing the temperature of the neutrals — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "The palette feels generic, defaulted, or has the AI-default color aesthetic.",
        "The interface uses a purple gradient, tech-blue accent, or similar pattern that wasn’t deliberately chosen.",
        "Pure black (#000) and pure white (#FFF) appear without tinting, producing a flat, lifeless feel.",
        "Accent color is overused — appearing in too many places without clear reason.",
        "Contrast is either failing accessibility or sitting exactly at minimums (4.5:1) across the board.",
        "Dark mode exists but was implemented as a mechanical inversion rather than a parallel system.",
      ],
      howToUse: {
        examples: [
          "/colorgrade",
          "/colorgrade accent",
          "/colorgrade neutrals",
        ],
        context:
          "By default /colorgrade runs a full pass — palette construction, neutral tinting, accent strategy, contrast, semantic colors, and dark mode if present. Pass a scope argument to focus on one area, or describe what you want fixed in plain language. Spruce stays focused on the requested area without drifting.",
      },
      antiPatterns: [
        {
          text: "Purple-to-blue gradients as the dominant accent treatment — the most recognizable visual watermark of AI-generated UI.",
          slopAnchor: "purple-gradient",
        },
        {
          text: "Tech-blue (#3B82F6 and its neighbors) as a silent default accent on every CTA, link, and active state.",
          slopAnchor: "tech-blue",
        },
        {
          text: "Pure black on pure white. No tinting on either end. Reads as untreated — characters who don’t know they’re in a palette.",
        },
        {
          text: "Accent color used in five places per screen. Badge, ring, checkmarks, button, hover state — all the same hue. Nothing carries the eye because everything is shouting.",
          slopAnchor: "accent-overuse",
        },
        {
          text: "Contrast sitting exactly at WCAG minimums (4.5:1) across the board, suggesting the palette was sampled rather than tuned.",
        },
        {
          text: "Dark mode as a mechanical light-to-dark inversion, instead of a parallel palette where the relationships have been re-thought for the dark surface.",
        },
      ],
      seeAlso: ["typeface", "arrange", "remix"],
    },
  },
  arrange: {
    slug: "arrange",
    name: "/arrange",
    tier: "corrective",
    tagline: "Spatial discipline — scale, rhythm, hierarchy through space.",
    detail: {
      whatItDoes: [
        "Spacing is the design layer that’s invisible when it works and cumulative when it doesn’t — every gap arbitrary, every section crowded, hierarchy weak because proximity isn’t doing the work. /arrange brings systematic spatial discipline to existing code while keeping the structural layout decisions with you.",
        "Like the other correctives, it uses a smart-default autonomy model. Small scale-conformance fixes — rounding arbitrary values to scale steps, fixing symmetric heading margins, adding measure caps to body text, normalizing section padding — get applied directly. Character-level shifts — establishing a spacing scale where none exists, density adjustments that cascade across the whole interface — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "Spacing feels arbitrary — gaps that don’t relate to each other, no visible rhythm.",
        "Hierarchy is weak because proximity relationships don’t communicate grouping.",
        "The interface feels cramped in some places and excessive in others.",
        "Content runs edge-to-edge without breathing room, especially body text and helper labels.",
        "Headings have symmetric margins that make it ambiguous which content they introduce.",
        "A /survey has flagged spatial issues and you want them addressed systematically.",
      ],
      howToUse: {
        examples: ["/arrange", "/arrange rhythm", "/arrange hierarchy"],
        context:
          "By default /arrange runs a full pass — scale adherence, vertical rhythm, proximity relationships, breathing room, density. Pass a scope to focus on one area, or describe what you want fixed in plain language. Layout-structural problems — three-equal-cards that should be asymmetric, missing grid alignment — get flagged for /refine or /design rather than restructured here.",
      },
      antiPatterns: [
        {
          text: "Spacing values pulled from nowhere — 13px here, 22px there, 31px somewhere else. No scale, no rhythm, just numbers.",
        },
        {
          text: "Symmetric heading margins. The h2 has the same space above and below; it floats between sections instead of belonging to the content underneath.",
          slopAnchor: "symmetric-heading-margin",
        },
        {
          text: "Body text running container-edge to container-edge with no measure cap, producing 90+ character lines that fall apart by the third one.",
          slopAnchor: "no-measure-cap",
        },
        {
          text: "Cards crammed flush against page borders or each other — no horizontal padding, no gap.",
        },
        {
          text: "Sections separated by the same gap as form rows, making the whole page read as one continuous list with no architectural rhythm.",
        },
        {
          text: "Density that contradicts the product’s character — generous whitespace in a data-heavy dashboard, or cramped layouts in a premium consumer product.",
        },
      ],
      seeAlso: ["typeface", "refine", "reduce"],
    },
  },
  refine: {
    slug: "refine",
    name: "/refine",
    tier: "corrective",
    tagline: "Component discipline — coherence, state completeness, shape system.",
    detail: {
      whatItDoes: [
        "The default state is the one AI-generated components ship. Hover, active, focus, and disabled — usually undefined or rendering identically to default. Add inconsistent radii across variants and stripped focus rings on top, and you have the component layer most products never finish. /refine catches and corrects these patterns: missing states, drift across variants, the small system-level decisions that get skipped in favor of one-off choices.",
        "Like the other correctives, it uses a smart-default autonomy model. Small consolidations and state additions get applied directly. Larger structural shifts — replacing the button system, rebuilding component primitives — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "Components feel inconsistent — radii, padding, weights drift across variants without an articulated reason.",
        "Interactive elements only show their default state; hover, active, focus, and disabled treatments are missing or render identically.",
        "Focus rings are stripped via outline:none with no replacement, breaking keyboard navigation.",
        "Disabled states are signalled only by cursor-not-allowed, with no visual treatment indicating the button can’t be used.",
        "Custom one-off components proliferate where shared primitives could carry the work.",
        "A /survey has flagged component issues and you want them addressed systematically.",
      ],
      howToUse: {
        examples: ["/refine", "/refine states", "/refine buttons"],
        context:
          "By default /refine runs a full pass — component coherence, state coverage, shape system, focus indicators, disabled treatment. Pass a scope to focus on one area, or describe the components you want refined in plain language. Component-level structural decisions (collapsing variants, restructuring a component’s anatomy) are surfaced for approval rather than applied silently.",
      },
      antiPatterns: [
        {
          text: "Buttons with inconsistent radii — one variant uses rounded-sm, another rounded-md, a third pill-shaped — without an articulated reason.",
          slopAnchor: "inconsistent-radii",
        },
        {
          text: "Interactive components defined only in their default state, with hover, active, focus, and disabled rendering identically.",
          slopAnchor: "missing-states",
        },
        {
          text: "Focus rings stripped via `outline: none` with no replacement, leaving keyboard users without an indicator.",
        },
        {
          text: "Disabled states signalled only by `cursor: not-allowed`, with no visual treatment distinguishing them from default.",
        },
        {
          text: "Custom one-off components proliferating where shared primitives could carry the work.",
        },
      ],
      seeAlso: ["arrange", "fortify", "typeface"],
    },
  },
  pace: {
    slug: "pace",
    name: "/pace",
    tier: "corrective",
    tagline: "Motion discipline — timing, easing, reduced-motion handling.",
    detail: {
      whatItDoes: [
        "Linear easing on every transition. 300ms applied to small state changes that should feel instant. Bounce easing read as playful five years ago and dated now. Scroll-triggered fades on every section, producing a slideshow rather than a page. Motion is the most easily misused domain in interface design, and AI defaults stack the misuses. /pace replaces them with timing calibrated to the moment, easing curves matched to the motion type, and discipline across the project.",
        "Like the other correctives, /pace uses a smart-default autonomy model. Easing corrections, duration adjustments, token consolidation, and removal of motion that doesn’t serve a specific purpose get applied directly. Reduced-motion support is added when missing — autonomous but called out for awareness, since it affects every animation in the codebase.",
      ],
      whenToUse: [
        "Motion feels sluggish — 300ms+ on small state changes that should feel instant.",
        "Animations use linear easing, producing mechanical motion.",
        "Bounce or elastic easing applied to standard transitions, reading as dated.",
        "Each component animates with different timing — motion feels uncoordinated.",
        "Scroll-triggered animations fire on every section of the page, producing a slideshow.",
        "Hover states have multi-property animations beyond the 100ms perception window.",
        "Missing reduced-motion support needs to be added for accessibility.",
      ],
      howToUse: {
        examples: [
          "/pace",
          "/pace timing",
          "/pace easing",
        ],
        context:
          "By default /pace runs a full pass — timing corrections, easing replacements, motion-token consolidation, and reduced-motion support. Pass a scope to focus on one area: 'timing’ for durations, 'easing’ for curves, 'scroll’ for scroll-triggered motion, 'accessibility’ for reduced-motion handling.",
      },
      antiPatterns: [
        {
          text: "Linear easing on standard interface motion. Linear belongs on spinners and progress bars, not on elements arriving or leaving. Curves communicate motion character; linear strips it.",
        },
        {
          text: "300ms default applied to button hovers and small state changes. Small interactions belong in the 100-150ms range; 300ms reads as sluggish.",
        },
        {
          text: "Bounce or elastic easing on routine transitions. Bounce serves specific moments (an error shake, a deliberately playful element); applied broadly, it adds perceived duration and undermines restraint.",
        },
        {
          text: "Scroll-triggered fade-up animations on every section of a marketing page, producing a slideshow rather than a content surface.",
        },
        {
          text: "Imperceptible 50-80ms modal entries that read as jump cuts because the motion didn’t have time to register.",
        },
        {
          text: "Motion tokens absent — durations and easing scattered as magic numbers throughout the codebase. Without tokens, motion drifts component by component until each animates with its own timing.",
        },
        {
          text: "Reduced-motion preference ignored. Users with vestibular sensitivity, motion-related migraines, or who simply prefer less motion are forced through every animation regardless.",
        },
      ],
      seeAlso: ["arrange", "refine", "fortify"],
    },
  },
  voice: {
    slug: "voice",
    name: "/voice",
    tier: "corrective",
    tagline: "UX writing discipline — register, specificity, voice.",
    detail: {
      whatItDoes: [
        "Most AI-generated copy apologizes before describing what failed. The opening “Oops!” — the warmth-padding sentence — the generic “Try again” at the bottom. /voice replaces this friendly-professional SaaS template with copy that respects the audience: errors that name the failure, buttons that name the action, empty states that introduce the space rather than null-checking it.",
        "Like the other correctives, it uses a smart-default autonomy model. Small replacements (specific verbs, removed apologetics, dropped warmth-padding) get applied directly. Larger voice-character shifts — moving from formal to casual, technical to plain, friendly to direct — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "Errors begin with “Oops!” or apologize before describing what failed.",
        "Buttons are labeled with generic verbs (“Submit”, “Continue”, “Get Started”) that don’t name the action they trigger.",
        "Empty states say “No data available” or similar — placeholders that describe absence rather than guiding action.",
        "Helper text restates the label rather than adding what the user couldn’t infer.",
        "Confirmations say “Success!” or “Done!” without naming what was saved or completed.",
        "Voice drifts across surfaces — formal in one area, casual in another, with no character-driven reason.",
      ],
      howToUse: {
        examples: ["/voice", "/voice errors", "/voice ctas"],
        context:
          "By default /voice runs a full pass across errors, empty states, confirmations, button labels, and helper text. Pass a scope to focus on one type of copy, or describe the surfaces you want corrected. Voice character is calibrated to the project context — /voice doesn’t inject warmth into a precision-oriented product, and won’t strip directness from a product whose context calls for it.",
      },
      antiPatterns: [
        {
          text: "“Oops! Something went wrong” — the AI-default error opener that apologizes before saying what failed.",
          slopAnchor: "oops-errors",
        },
        {
          text: "“Submit”, “Continue”, “Get Started”, “Learn more” — generic CTAs that don’t name what the action does.",
          slopAnchor: "generic-ctas",
        },
        {
          text: "“No data available” / “No results found” — empty states that describe absence rather than guiding the user toward action.",
        },
        {
          text: "Helper text that paraphrases the label (“Email: enter your email address”).",
        },
        {
          text: "“Success!” / “Done!” confirmations that don’t name what was saved or completed.",
        },
        {
          text: "Voice drift — formal language in one surface, casual in another, with no character-driven reason for the difference.",
        },
      ],
      seeAlso: ["reduce", "critique", "explain"],
    },
  },
  reduce: {
    slug: "reduce",
    name: "/reduce",
    tier: "corrective",
    tagline: "Strip an interface to its essentials.",
    detail: {
      whatItDoes: [
        "AI-generated interfaces add. They accumulate decoration, redundant labels, action bars, status badges, gradient surfaces — each element earning a quiet “maybe” rather than a “yes.” /reduce subtracts. It questions whether each element is doing work, removes the ones that aren’t, and surfaces the design that was hiding underneath the chrome.",
        "Like the other correctives, it uses a smart-default autonomy model. Small reductions — removing decorative icons, unnecessary borders, redundant copy — get applied directly. Larger reductions — collapsing multiple action buttons into one, removing entire sections, restructuring information — are surfaced for your approval before executing.",
      ],
      whenToUse: [
        "The interface feels busy or cluttered, with elements competing for attention.",
        "Card decoration (borders, shadows, backgrounds) is applied without earning its place.",
        "Multiple action buttons clutter the top of pages or sections, with most rarely used.",
        "Copy is verbose — subtitles repeating titles, helper text restating labels.",
        "Decorative icons and emojis appear next to text that already communicates clearly.",
        "A /survey has flagged excess elements and you want them addressed systematically.",
      ],
      howToUse: {
        examples: ["/reduce", "/reduce header", "/reduce decoration"],
        context:
          "By default /reduce runs a full pass — decoration, redundant copy, action consolidation, and surface chrome. Pass a scope to focus on one area, or describe what you want stripped in plain language. /reduce surfaces the design that was hiding under decoration; if you want net-new design work, use /design.",
      },
      antiPatterns: [
        {
          text: "Decorative icons next to text that already communicates the same meaning. The icon + word pairing doubles the attention without adding information.",
          slopAnchor: "decorative-icons",
        },
        {
          text: "Subtitles that repeat the title in different words — “Q3 Analytics — performance insights for the third quarter.” The reader already knows.",
        },
        {
          text: "Breadcrumb chains that just trail back to the page title — “Workspace › Projects › Q3 Analytics” when the next thing on screen is a heading that says Q3 Analytics.",
        },
        {
          text: "Action button bars at the top of every page with four to six utility buttons (Export, Share, Filter, More, Settings, Help) — most of which are rarely the primary task.",
          slopAnchor: "action-bar-bloat",
        },
        {
          text: "Status badges, “updated N hours ago” timestamps, and ornament that adds visual weight without earning attention.",
        },
        {
          text: "Card surfaces with borders + shadows + backgrounds + rounded corners stacked together when one of those treatments would do the job.",
        },
      ],
      seeAlso: ["arrange", "refine", "finish"],
    },
  },
  fortify: {
    slug: "fortify",
    name: "/fortify",
    tier: "corrective",
    tagline: "Production readiness — states, accessibility, error handling.",
    detail: {
      whatItDoes: [
        "The default state is polished; loading, empty, error, and disabled states are absent or stubbed. Focus rings are removed without replacement. ARIA is an afterthought. AI generates the happy path and leaves every other path undone — and a component isn’t done when its happy path looks right, it’s done when every path a user might encounter has been designed and built.",
        "Like the other correctives, /fortify uses smart-default autonomy. Building loading skeletons that match content shape, three-part empty states (what / why / next action), error states with recovery affordances, focus rings, ARIA labels on icon-only buttons, contrast fixes — these get applied directly. Architectural decisions (error recovery patterns, onboarding flows that reveal missing product work) are surfaced for approval.",
      ],
      whenToUse: [
        "The happy path looks right but loading, empty, and error states are absent or stubbed.",
        "Empty states across the project use different structures — some null-check (“No items”), some elaborate, some missing entirely.",
        "Accessibility has been neglected — focus rings missing, ARIA absent, contrast failing on metadata or disabled text.",
        "Preparing to ship and want to address production readiness systematically before a final polish pass.",
        "A /survey or /uxreview has flagged state completeness or accessibility as significant issues.",
      ],
      howToUse: {
        examples: [
          "/fortify",
          "/fortify states",
          "/fortify accessibility",
        ],
        context:
          "By default /fortify runs a full pass — state coverage (loading, empty, error, success, disabled), accessibility (focus, keyboard, ARIA, contrast), and reduced-motion handoff. Pass a scope to focus: 'states’ for state coverage only, 'accessibility’ for a11y only, or finer scopes like 'empty’ or 'errors’ for a single domain.",
      },
      antiPatterns: [
        {
          text: "Components polished on the default path with every other state absent or stubbed. Empty arrays render nothing; failed requests produce silent failures; loading shows a flicker.",
        },
        {
          text: "Empty states using null-check copy — “No items found,” “No data” — language that describes the absence rather than introducing the space.",
          slopAnchor: "null-check-empty",
        },
        {
          text: "Error states that announce the failure with no path forward. “Something went wrong” or a stack trace dropped into the UI.",
        },
        {
          text: "Loading states as a generic centered spinner regardless of content shape — instead of skeleton screens that match what’s arriving.",
        },
        {
          text: "`outline: none` on interactive elements without a replacement focus treatment, leaving keyboard users with nothing to anchor to.",
          slopAnchor: "outline-none",
        },
        {
          text: "Icon-only buttons without `aria-label`, leaving screen reader users with “button, button, button” across the interface.",
        },
        {
          text: "Contrast sitting just above WCAG minimums on body and exactly at 3:1 on large text — the palette was sampled rather than tuned.",
        },
      ],
      seeAlso: ["voice", "refine", "finish"],
    },
  },
  finish: {
    slug: "finish",
    name: "/finish",
    tier: "corrective",
    tagline: "Final polish before shipping.",
    detail: {
      whatItDoes: [
        "/finish is the last corrective run before deployment. It addresses the small details that accumulate into perceived quality across all seven Spruce dimensions — straight quotes still in prose, headlines that would benefit from text-wrap: balance, hover darkening that drifted between similar components, an accent that crept back where it shouldn’t be — and produces an honest ship-readiness assessment with any remaining concerns identified.",
        "/finish is deliberately scoped to polish. It does not swap typefaces, shift palettes, build missing states, or restructure layouts — those are the dedicated correctives’ work, and if they’re needed, /finish flags them and recommends running them first. The whole point is that by the time /finish runs, the heavy work has been done; only the final tightening and the verdict remain.",
      ],
      whenToUse: [
        "The interface is approaching deployment and needs a final quality pass.",
        "Substantial corrective work is complete (typography, color, components, states) and what remains is small refinements.",
        "You want a confidence signal about ship-readiness plus any last concerns identified before deploying.",
        "The project is being handed off, submitted, or published and deserves a final craft pass.",
      ],
      howToUse: {
        examples: [
          "/finish",
          "/finish home page",
          "/finish onboarding",
        ],
        context:
          "By default /finish runs a full polish pass across every dimension and produces a ship-readiness assessment. Pass a page or area to narrow scope when shipping a specific surface. /finish does not accept domain-specific scopes (like /finish typography) — domain polish belongs to the domain commands; /finish is explicitly the cross-domain final pass.",
      },
      antiPatterns: [
        {
          text: "Substantial work disguised as polish — swapping a typeface, rewriting error messages systemically, establishing states where none exist. If the work requires a dedicated corrective, /finish flags it rather than absorbing it.",
        },
        {
          text: "A ship-ready verdict on a project that isn’t ship-ready. The verdict’s value depends on its honesty; padded confidence is worse than acknowledged remaining work.",
        },
        {
          text: "Padded polish reports — minor tweaks invented to make the change list look substantial. A short report on a strong project is a strong report.",
        },
        {
          text: "Re-running other correctives’ work. If /typeface or /colorgrade have already run, trust their work; polish any small drift since, but don’t repeat the substantial decisions.",
        },
        {
          text: "Introducing new patterns under the guise of polish. Polish is tightening existing patterns, not introducing new tokens, conventions, or approaches.",
        },
      ],
      seeAlso: ["fortify", "voice", "refine"],
    },
  },
  survey: {
    slug: "survey",
    name: "/survey",
    tier: "diagnostic",
    tagline: "Structured review across every dimension.",
    detail: {
      whatItDoes: [
        "The diagnostic workhorse — a comprehensive structured review across all seven Spruce dimensions, calibrated to the product’s context, with each finding paired to a fix and grouped by severity. The output is methodical: characterization paragraph, severity-tiered findings, numbered action plan.",
        "/survey doesn’t modify code. It produces findings the user can act on, usually by running the corrective commands the findings point to. The four severity tiers (Critical / Significant / Polish / Opportunity) calibrate to context — a missing focus state is critical on accessibility-sensitive products and significant on internal tools. Findings depend on what the product is trying to be, which is what the .spruce.md context file establishes.",
      ],
      whenToUse: [
        "You want a comprehensive understanding of an interface’s current state before making changes.",
        "A codebase has grown organically and accumulated issues need to be assessed.",
        "Preparing to ship and want a final quality review identifying what to address and at what severity.",
        "Inherited work needs assessment before figuring out what to do with it.",
        "You’re asking “what’s wrong with this,” “review this,” or “tell me what needs work.”",
      ],
      howToUse: {
        examples: [
          "/survey",
          "/survey dashboard",
          "/survey checkout-flow",
        ],
        context:
          "By default /survey reviews the full project across all seven dimensions. Pass a scope (page, area, directory) to focus the review while still considering how that scope relates to the rest of the project. /survey calibrates findings to the .spruce.md context file when one exists; without context, findings that depend on character (density, voice register) are flagged as needing context to evaluate.",
      },
      antiPatterns: [
        {
          text: "Forty-finding surveys that overwhelm rather than guide. A survey that’s exhaustive isn’t actionable — aim for representative findings on systemic issues, not every instance of a recurring problem.",
        },
        {
          text: "Padded Opportunity tiers with filler items invented to look thorough. A genuine opportunity finding is rare; if there are no real ones, skip the section.",
        },
        {
          text: "Findings reported as opinions (“could use more whitespace”) rather than as observations grounded in specific principles or measurable criteria.",
        },
        {
          text: "Severity assigned mechanically rather than calibrated to context. Identical findings get different severities in different products — what’s critical for a consumer product may be minor for an internal tool.",
        },
        {
          text: "Missing the action plan. Without numbered next steps, the survey is a problem inventory rather than a direction. The closing should answer “what to do first” in three or four prioritized moves.",
        },
      ],
      seeAlso: ["detect", "critique", "uxreview"],
    },
  },
  uxreview: {
    slug: "uxreview",
    name: "/uxreview",
    tier: "diagnostic",
    tagline: "Review the UX substrate specifically.",
    detail: {
      whatItDoes: [
        "A review of the UX substrate — information architecture, system feedback, forms, empty states, error recovery, cognitive load, progressive disclosure, interaction contracts, and state completeness. The layer that determines whether an interface actually works for the person using it, regardless of how it looks.",
        "/uxreview exists because UX is consistently the layer that AI-generated interfaces get wrong while visual design gets the attention. An interface can look polished and still fail every UX fundamental — navigation that mirrors internal structure instead of user tasks, feedback that’s missing or unclear, forms that interrogate instead of guide, empty states that abandon new users, errors that describe failures instead of fixes. A dedicated state-completeness audit runs on every review.",
      ],
      whenToUse: [
        "Visual design is generally solid but something feels wrong about how the interface works.",
        "You want UX-specific analysis, not full-system review.",
        "Preparing to ship and want to verify UX fundamentals are in place — especially state coverage.",
        "An interface has grown through feature accumulation and needs a usability check.",
        "You’re asking “is this usable,” “will people understand this,” “what’s confusing about this.”",
      ],
      howToUse: {
        examples: [
          "/uxreview",
          "/uxreview onboarding",
          "/uxreview checkout-flow",
        ],
        context:
          "By default /uxreview reviews the full project’s UX substrate. Pass a scope (page, area, flow) to focus the review while still considering how that scope integrates with surrounding flows. State completeness is audited as a dedicated pass on every review — it’s the layer where AI-generated interfaces most consistently fail silently.",
      },
      antiPatterns: [
        {
          text: "Confusing UX with visual. “The button looks generic” is a visual finding (handled by /survey or /refine); “the button’s disabled state is indistinguishable from its default state” is a UX finding — the user can’t tell whether they can act on it.",
        },
        {
          text: "Over-reporting state completeness as instance findings when the gap is systemic. If every list is missing an empty state, that’s one finding (“empty states missing across all lists”), not forty.",
        },
        {
          text: "Inflated reviews on UX-solid interfaces. A clean UX substrate gets a short review; padding to look thorough degrades credibility.",
        },
        {
          text: "Findings that don’t ground in user impact. “This state lacks feedback” is weaker than “users encountering this state won’t know whether their action registered.” The user-impact framing keeps findings concrete.",
        },
        {
          text: "Missing the state-completeness audit. The check is mandatory on every /uxreview — it’s the most common UX gap in AI-generated interfaces and the place a polished-looking surface most often fails silently.",
        },
      ],
      seeAlso: ["survey", "fortify", "critique"],
    },
  },
  critique: {
    slug: "critique",
    name: "/critique",
    tier: "diagnostic",
    tagline: "An opinionated design-director read.",
    detail: {
      whatItDoes: [
        "The design-director read. /critique engages the work at the level of design feel: does this feel like what it’s trying to be, does it have a point of view, does the whole add up to more than the sum of the parts. It speaks with the willingness to make a claim — willing to say something doesn’t land, willing to name when a design is hedging, willing to question direction — but always tied to specific observations and the product’s stated context. Opinionated, not imperious.",
        "/critique doesn’t modify code. It produces feedback in narrative form — overall take, character and point of view, coherence across the work, specific moments, brief direction forward. The format is essay, not punch list; the value is in seeing the work at the level of design feel rather than at the level of cataloged issues.",
      ],
      whenToUse: [
        "The interface is functionally sound but something about it feels off, generic, or undercommitted.",
        "You want feedback on whether the design has a point of view, not just whether it’s technically correct.",
        "The product’s emotional register or brand coherence is in question.",
        "A /survey returned few issues but the work still doesn’t feel right — the problems may be directional rather than technical.",
        "You’re evaluating whether to continue a direction or pivot and want a design-minded take.",
        "You’re asking “what do you think,” “does this feel right,” or “does this have a point of view.”",
      ],
      howToUse: {
        examples: [
          "/critique",
          "/critique pricing page",
          "/critique onboarding",
        ],
        context:
          "By default /critique addresses the full project. Pass a page or area to focus the critique on a specific surface. Unlike /survey and /uxreview, /critique doesn’t accept domain-specific scope (no /critique typography) — its value is in looking at the whole, not the parts. A domain-specific critique would collapse into the perspective of a dedicated corrective command.",
      },
      antiPatterns: [
        {
          text: "Producing a structured finding report with severity tiers and bulleted findings. /critique is narrative, not punch-list — that format belongs to /survey.",
        },
        {
          text: "Hedging on every claim. The value of critique is its willingness to make a claim. “This might be too cool, or it might be right” is not useful. Make the claim, acknowledge the counterargument if one exists, move on.",
        },
        {
          text: "Padding with generic design wisdom. Every observation should be specific to this work — sentences that could apply to any product belong on a blog post, not in a critique.",
        },
        {
          text: "Inventing problems to look thorough. When the work is in strong shape, a short confident critique is the right output. A critique that fabricates concerns to fill space is worse than a brief honest one.",
        },
        {
          text: "Lecturing rather than offering perspective. The user has context the critique doesn’t; /critique offers a perspective, not a verdict.",
        },
      ],
      seeAlso: ["survey", "uxreview", "explain"],
    },
  },
  detect: {
    slug: "detect",
    name: "/detect",
    tier: "diagnostic",
    tagline: "Anti-pattern scan across all dimensions.",
    detail: {
      whatItDoes: [
        "The fast scan. /detect does one thing: flag the named anti-patterns and accessibility blockers present in a project and point to the commands that would fix them. The lightest of the diagnostic commands — fast, structured, optimized for speed of decision rather than depth of analysis.",
        "Each Spruce reference file (Typography, Color, Spatial, Component, Motion, Voice, UX Patterns) ends with a catalog of named anti-patterns. /detect runs through those catalogs plus a small set of accessibility blockers, flags matches, notes locations, and points to the corrective command. The output names what’s wrong and tells you what to run next — nothing more.",
      ],
      whenToUse: [
        "You want a quick scan for specific anti-patterns without a full review.",
        "You’ve heard “there’s probably some AI slop in here” and want to know what specifically.",
        "You’re triaging — deciding whether any corrective work is needed before committing to a full review.",
        "You want a fast check before running /finish for ship readiness.",
        "A quick sanity check during active development.",
        "You’re asking “quick scan,” “anything wrong here,” or “any anti-patterns to flag.”",
      ],
      howToUse: {
        examples: [
          "/detect",
          "/detect home page",
          "/detect components/Button.tsx",
        ],
        context:
          "By default /detect scans the full project. Pass a page, area, or file path to narrow the scope. The scan stays fast regardless — the command’s value is speed of decision, not depth of analysis. For a comprehensive review with severity tiers and action plans, use /survey; for narrative design-direction feedback, use /critique.",
      },
      antiPatterns: [
        {
          text: "Diagnostic creep — the command starts producing severity ratings, action plans, or narrative analysis. That’s /survey’s role; /detect’s value is speed, and the moment it starts analyzing, it stops being fast.",
        },
        {
          text: "Padded output — findings invented or stretched to make the report look thorough. A clean scan with three findings is a useful scan; a padded scan with twelve is noise.",
        },
        {
          text: "Severity ratings on findings. /detect is binary — the anti-pattern is present or it isn’t. Severity belongs to /survey.",
        },
        {
          text: "Instance lists when a pattern is systemic. The same anti-pattern appearing across forty files should be flagged once as systemic, not listed forty times.",
        },
        {
          text: "Findings without command pointers. Every finding should connect to an action; an anti-pattern noted without a corrective command pointer leaves the user with nothing to do.",
        },
      ],
      seeAlso: ["survey", "critique", "uxreview"],
    },
  },
  explain: {
    slug: "explain",
    name: "/explain",
    tier: "diagnostic",
    tagline: "Walk through the reasoning behind a decision.",
    detail: {
      whatItDoes: [
        "Spruce’s “show your work” command. The other generative and corrective commands produce designs with brief decision notes; /explain opens up the full reasoning behind those decisions — what was considered, why specific choices were made, how they connect to the product’s character and the design principles that governed them.",
        "/explain serves Spruce’s deepest commitment: that users should develop taste and direction, not just receive outputs. Each walkthrough shows how the decisions actually got made, so the next brief lands with more confidence and more specific direction. /explain operates on prior context — the most recent design output in the conversation — and walks through decisions in order of impact, from character direction down to craft details.",
      ],
      whenToUse: [
        "You want to understand why a design looks the way it does.",
        "You’re evaluating whether the choices fit your product and want the reasoning to evaluate against.",
        "You’re learning design thinking and want to see how decisions connect to principles.",
        "Something in the output surprised you (positively or negatively) and you want to know why.",
        "You’re asking “walk me through this,” “explain your choices,” or “why did you pick X.”",
      ],
      howToUse: {
        examples: [
          "/explain",
          "/explain typography",
          "/explain the hero section",
        ],
        context:
          "By default /explain produces a comprehensive walkthrough across all relevant decision areas of the most recent design output. Pass a domain (typography, color, layout, motion) to go deeper into one area. Pass a specific element (“the button,” “the hero section”) to focus on that part of the design. /explain operates on prior context — it doesn’t generate new work.",
      },
      antiPatterns: [
        {
          text: "Walking through every micro-decision rather than the high-impact ones. The hierarchy matters: character direction shapes layout shapes typography shapes color, and visitors who read only the first half should still get the decisions that mattered most.",
        },
        {
          text: "Reasoning that ties to general design principles instead of the specific product. “This typeface was chosen for legibility” is generic; “chosen because the .spruce.md describes a warm humanist character and Lora’s drawn-quality letterforms express that” is grounded.",
        },
        {
          text: "Justifying every choice as if defending it. The walkthrough is informational, not defensive. If a choice is genuinely uncertain or could legitimately go another way, say so.",
        },
        {
          text: "Going deep on craft details before establishing the higher-impact decisions. Craft is the closing register, not the opening.",
        },
        {
          text: "Operating on no prior context. /explain explains a recent output; without one, it should ask what to discuss rather than invent a design to explain.",
        },
      ],
      seeAlso: ["decide", "design", "critique"],
    },
  },
};

export const ALL_SLUGS: string[] = Object.keys(COMMANDS);
