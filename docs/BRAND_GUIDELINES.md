# PIXIE Holdings brand and onboarding guidelines

Owner direction: Dominique, 28 October 2026. This document applies to Holdings. Canonical ecosystem governance remains in ibloud/ibloud.github.io; individual products retain their own implementation authority.

## Identity and audience

PIXIE is one companion with complementary aspects. Guiding Star expresses orientation; Winged Spark expresses creative movement; PIXIE Cameo expresses personal presence. These directions were approved together; placement remains contextual and is not a fabricated chronological sequence. No replacement image assets are introduced by this onboarding preview.

Holdings addresses business people who use command-led interaction to inspect the results of Creator OS work on the Atmosphere. Creator OS prepares work; Holdings is the intended review lens; Made-Sick provides its own community/join flow. These are owner-directed roles, not evidence of implemented cross-site authentication or automatic report transfer.

## Brand foundation

Midnight #071923; velvet plum #211823; blue slate #354955; mist gray #93999F; parchment #F2E5CE; aged gold #D5AB68; glacial teal #A9E2E5. Midnight/parchment/gold anchor the identity, plum provides depth and teal signals guidance. Semantic contrast pairs may require adjusted surface variants. Avoid bright beige fields, compressed negative heading tracking, cramped text and oversized empty panels.

Use Material 3 foundations for color roles, typography hierarchy, states, shape and adaptive layouts. Adapt them to this brand; do not claim exact stock-component conformance. Body text is readable system type; commands and record excerpts use monospace. Headings and labels are semantic and sentence case. Controls and navigation need visible focus and generous targets. New controls use a 48px minimum target. Legacy surfaces still require further accessibility work.

## One presentation authority

public/styles.css is the only main stylesheet for all eight public HTML surfaces. Legacy page rules are explicitly scoped by html[data-holdings-surface] while keeping existing route behavior. Shared onboarding components use the approved palette. The page attributes select a surface, not a competing user theme.

Static style attributes, page style blocks and injected style blocks have been consolidated. JS may control window position, open state and canvas sizing; these are interaction geometry, not alternate design systems. Future work must first reuse semantic tokens and components, then add only the smallest justified surface exception. Legacy hard-coded colors and type remain migration debt inside the same file; consolidation is not a claim of full brand harmonization.

## Onboarding and copy

A person should understand their role and try one review before being asked to join. Show result → evidence → next action. Demonstrate a fictional report openly. Give the command names and accessible button equivalents. Keep community joining at https://made-sick.org/join.html with no identity/consent query parameters. Opening a link does not transfer a report or create Holdings membership.

The sample review console is browser-only. Its help/review/sources/next/clear commands are demo controls, not a shipped CLI or MCP catalog. Connected Creator OS intake and authenticated Atmosphere review are still to be designed and verified. Existing synthetic market/game material remains secondary and available; external market data must never mutate the synthetic ledger.

## References and lineage

Dominique identifies https://www.aetheros.computer as the original design reference. It is lineage, not shared product identity or runtime evidence. Its live contents did not render into a usable audit capture during this review. Preserve this distinction.

Material: https://m3.material.io/ . Onboarding comparison: https://userpilot.com/blog/user-onboarding-teardowns/ (retrieved 28 October 2026). The relevant patterns are a short first task, demonstration content, contextual help and visible progress; no analytics vendor or profiling is required.

World@Meta, 3 July 2023: https://medium.com/@worldatmetateam/the-metaverse-a-business-owners-guide-to-the-future-of-digital-commerce-f7d534d3a79f . Treat as historical business-experience context, not proof that the AT Protocol Atmosphere is a VR/metaverse product or that Holdings has commerce integrations.

## Change record — review branch only

28 October 2026: proposed business-facing entry and sample console; existing test bench retained below a disclosure; explicit Made-Sick and Creator OS handoffs. Static presentation consolidated into one scoped stylesheet; desktop taskbar button colors specified and notice moved away from the working window. Existing 44 tests pass. Review is not approval to merge or deploy production.
