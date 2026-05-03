# Roadmap

Forward-looking work for Spruce. Items here are planned but not yet scoped or scheduled — they represent identified gaps and additions that should land in a future release.

## Recently shipped

- **Workflow page + tutorials surfaces.** `/designing` presents the Spruce loop as five moments of design reasoning (Set up first, Ship last, Decide / Review / Refine intermingle in the middle), with the LoopVisualization as the centerpiece. `/designing/tutorials` lists situation-shaped walkthroughs ("From scratch," "Inherited code," "Critique-driven," "In the browser" — last is a coming-soon placeholder reserved for the Chrome extension). `/designing/tutorials/[slug]` renders each walkthrough as a sequence of beats. All surfaces live under a shared layout with a Workflow / Tutorials tab bar.
- **FAQ surfaces.** `/faq` dedicated page with nine questions across three groups (The system / Using it / License & support). Homepage FAQ accordion module (`§ 04`) surfaces a curated four for first-time visitors, with shared data source in `lib/faq.tsx`.
- **Homepage interactivity consolidation.** The Terminal section's three stacked snippets became one tabbed terminal (tabs inside the dark surface, terminal-app pattern). The Install section's three vertically-stacked patterns became tabs above a single panel with body copy restored. Both use the same shared-layout marker animation as the Designing tab bar — coherent vocabulary across all tabbed surfaces on the home page.

---

## Next release

### Imagery as an 8th dimension

Spruce currently has seven design dimensions (Typography, Color, Spatial, Component, Motion, UX Writing, UX Patterns). **Imagery is not first-class** — the `/spruce-up` interview doesn't ask about it, the `.spruce.md` template has no dedicated Imagery preferences section, no reference file documents imagery principles or anti-patterns, and no corrective command exists for imagery work.

A user installing Spruce today can't cleanly indicate "I want photography on my site," "I want generative illustration," "no imagery, typography only," or any other imagery direction through the structured interview. They'd have to express it indirectly in Character, "What this should NOT feel like," or Notes — and even then Spruce would have no reasoning about how to apply imagery decisions.

**Scope of the addition:**

- **Reference file** — `references/imagery.md` documenting imagery principles (when imagery serves the product, when it doesn't), categories (functional product imagery, decorative/character, diagrammatic, brand mark), and an anti-pattern catalog (stock photo defaults, abstract gradient blobs, AI-generated illustration tropes, hero-with-abstract-blob, decorative-without-purpose imagery).
- **`/spruce-up` interview question** — adds an imagery preferences moment to the conversation, calibrated to the product's character.
- **`.spruce.md` template section** — dedicated "Imagery preferences" section parallel to "Typography preferences" and "Color preferences," covering yes/no, what kind, what to avoid.
- **`/imagery` corrective command** — operates on existing imagery in code, applying the imagery reference's discipline. Removes decorative-without-purpose imagery; flags stock-photo or AI-generated tropes; recommends functional alternatives.
- **`/detect` and `/survey` updates** — anti-pattern catalog from the imagery reference file gets included in scans; severity-tiered findings cover imagery alongside the other dimensions.
- **Catalog page additions** — `/imagery` gets its own detail page with bespoke demo (probably a before/after showing decorative-stock-photo replaced with functional product imagery, or a side-by-side of imagery directions for the same product).

**Why next release rather than now:** Adding a dimension touches the reference files, the interview, the template, the data model, and adds at least one corrective command. It's a meaningful expansion rather than an incremental fix, and it deserves its own release window with proper scoping and design.

---

## Site additions

### Release notes section on the home page

A new section on the marketing site that previews ongoing Spruce updates — wired into GitHub so it pulls live release/changelog data rather than being maintained by hand.

**Implementation considerations:**

- **Source of truth** — GitHub Releases on the spruce repo (using semantic versioning + release notes per tag). Could also pull from `CHANGELOG.md` if we maintain one.
- **Fetch strategy** — likely build-time (`generateStaticParams` + GitHub API at build) for performance and to avoid rate-limit issues on the client. Could fall back to ISR (Incremental Static Regeneration) for periodic updates without rebuilds.
- **Display** — most recent 3–5 releases in the section, each with title, date, and a brief excerpt or summary. "View all releases →" link out to GitHub or to a dedicated `/releases` page.
- **Design** — editorial restraint. Each release as a small entry with version + date + summary, hairline rules between. No badges, no "NEW" labels, no decorative version-bump styling.
- **Where on the home page** — likely between Demonstration and Install, or at the close of the page after Install. Worth deciding when the section is built.

**Why hold:** No releases to show yet. This section comes alive after the imagery dimension lands or the first multi-tool integration ships — premature to build the showcase before there's anything to showcase.

### Case studies

Real shipped artifacts designed entirely with Spruce, showcased as dedicated case studies. The biggest credibility move on the site: visitors see what Spruce actually produces in real product contexts, not just demo cards.

**Three project paths:**

1. **Build the meditation app for real.** Pick a small but real product scope: a marketing site for a hypothetical-but-detailed meditation app, with at least Home / Practice library / Reflection screens as live HTML at `meditation.spruce.style` or similar. Designed entirely through Spruce commands; the design conversation is documented.
2. **Document the Spruce site itself.** Meta-honest: the Spruce marketing site IS a Spruce-designed product. Show the design conversation, the `/spruce-up` setup, the iterative `/critique` rounds, the corrective passes. Visitors see Spruce eating its own dog food.
3. **Partner case study.** Find a real company/product that's used Spruce, document their experience. Highest-credibility but depends on external partnerships.

**Recommendation:** Path 2 in the near term (lowest external dependencies, meta-honest, the work is already done — documentation is the deliverable). Path 1 in the medium term (more ambitious, demonstrates Spruce on a non-meta product). Path 3 long-term as partnerships emerge.

**Implementation:**

- Dedicated Case section on the home page (between Demonstration and Install), or a separate `/case` / `/cases` page if it grows.
- Each case structured as: brief / setup → key decisions → corrective passes → final ship. With artifacts at each stage (reference imagery → tokens → mockups → live ship).
- A reusable case-study format/template so future cases (Path 1, Path 3) can land in the same structure.

**Catalog enrichment:** as case study artifacts become real (e.g., Path 1's actual shipped meditation app), the demos in `/commands/*` should be updated to pull from those real artifacts rather than the current stylized mockups. The `/designing` workflow page is built on the "adjacent" model — it references the catalog's meditation-app threading rather than duplicating it — so when the catalog enriches with real artifacts, the workflow page automatically benefits without rewriting.

---

## Distribution + integrations

### Chrome extension

A browser extension for Spruce. Scope and purpose to be defined — possibilities include:

- **In-page design audit** — run Spruce reasoning against any open web page (analyze typography, color, spacing, motion in the live DOM and report findings).
- **AI tool injection** — a way to install Spruce reasoning into AI tools that don't have native CLI install (e.g., chat-based tools, web-based AI editors).
- **Design-system inspector** — surface the design tokens, type scale, color palette of any page for inspection or comparison.
- **Spruce companion** — quick access to the catalog, reference files, or `/decide` flow from any page.

The product question is *what does the extension do that the CLI doesn't* — answering that defines the scope. The "In the browser" tutorial slot at `/designing/tutorials/chrome-extension` is reserved as a placeholder; when the extension ships, that walkthrough lands with it.

### Multi-tool support: Codex, Cursor, VS Code, Gemini

Currently Spruce installs into Claude Code via `npx spruce-skill add`. Need integrations for the other major AI coding tools.

**Per-tool considerations:**

- **Codex (OpenAI)** — integration model TBD. Codex is OpenAI's coding interface; likely has an extension or plugin pattern for adding context-providing tools.
- **Cursor** — has rules / context files (`.cursorrules`, `.mdc` rule files). Spruce could install as a set of rule files that load the references and enable command-style invocation.
- **VS Code** — likely a VS Code extension that wraps Spruce reasoning. Could integrate with Copilot, Continue, or other AI extensions in the editor.
- **Gemini (Google's coding tool)** — integration model TBD. Likely an API-based or extension-based pattern.

**Shared concerns:**

- The Spruce skill / reference files / commands are the same content across all tools. Each tool gets a tool-specific *adapter* that exposes the same content via the tool's preferred mechanism.
- Installation should be one command per tool (`npx spruce-skill add cursor`, `npx spruce-skill add vscode`, etc.) — same pattern as the current Claude Code install.
- The `/install` page on the marketing site needs to reflect available tools and install commands as integrations land.

The website currently says "Cursor, Gemini, and other harnesses are coming soon" in the Install section — this work is what makes that claim true.
