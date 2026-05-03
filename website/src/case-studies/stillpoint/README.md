# Stillpoint

A fictional meditation app, built specifically as a demonstration corpus for Spruce.

This directory contains content, components, and homepage fragments for Stillpoint. They exist to provide concrete examples for two places on the Spruce site:

1. The command catalog (`/commands`), which walks through all 20 Spruce commands using fragments of Stillpoint as the demonstration material.
2. The case study writeup (`/case-study`), which tells the narrative of building Stillpoint with Spruce.

Stillpoint is intentionally distinct from Spruce's own brand. Its design system uses Söhne and Lora typography, a warm sand and sage palette, and a calm wellness voice — none of which overlap with Spruce's editorial restraint. To prevent style leakage, Stillpoint's design tokens (when generated) are scoped under the `.stillpoint` CSS class and only activate inside elements that wrap their content in that scope.

## What's here

- `content/context.ts` — the .spruce.md content for Stillpoint (the input to /sketch and /foundations)
- `content/sketch.ts` — the .sketch.md visual direction for Stillpoint (the input to /foundations)
- `content/voice.ts` — voice samples used in catalog illustrations
- `content/microcopy.ts` — UI strings used in catalog illustrations

Most of Stillpoint's design system (tokens, components, fragments) is generated through Spruce commands as part of the catalog narrative. Files in `components/` and `fragments/` will be populated by /foundations and /design as the catalog walkthrough advances.

Stillpoint is not a real product. It will not be deployed independently. It exists entirely as a teaching artifact for Spruce.
