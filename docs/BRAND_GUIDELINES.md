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

## Persistent PIXIE amendment — 9 November 2026

PR #61 is merged (`1b23162`), so this amendment uses a focused follow-up review
branch stacked on the existing, unmerged privacy PR #60 (`a9ca912`). The privacy
branch remains a separate dependency; its query/referrer protections are retained.
No canonical guideline, other product, synthetic economy or production setting is
changed by this amendment.

Current canonical sources inspected: `ibloud/ibloud.github.io` at
`6286726ca8b9443a328337877a039b985e1857fc`, especially
`docs/ECOSYSTEM_ARCHITECTURE.md`, `docs/PORTFOLIO_DESIGN.md`, the continuity audit,
`assets/portfolio-foundation.css`, and the existing ecosystem/Violet's Revenge
PIXIE launchers. Canonical project-specific colors and contextual symbol variants
remain distinct. Holdings retains its business-review/desktop identity and the
Gods of Mayhem name; this is not a site-wide palette replacement.

The exact approved `assets/pixie-companion-sigil.png` is copied without editing to
`public/pixie-companion-sigil.png`. SHA-256:
`8900781e2d0c5f8873ccc975395253fb5c609a92077a74940af121c9317eed12`.
It is the existing gold/teal guidance sigil, not a generated replacement, generic
chat icon or emoji. The desktop's PIXIE icon uses the same asset. Winged Spark,
Cameo and evolved/shimmer artwork are not substituted into an unrelated role.

`public/styles.css` remains the sole stylesheet. Shared semantic PIXIE surface,
text, accent, focus and geometry tokens implement the approved midnight/parchment/
gold/teal roles. The persistent control uses a 40px mark, at least 64px hit area,
fixed 16px edge gutter plus safe-area insets, normal tracking, visible focus and
system type. Root-scoped component selectors avoid legacy page resets silently
changing its size or padding. The image's approved seven-second opacity breathing
pattern is reused from Companion (`pixie-sigil-breathe`); reduced motion disables
it. No new illustration, stylesheet, theme or dependency is introduced.

`pixie-guide.js` provides one persistent launcher per top-level Holdings experience.
Wrapper pages leave it to their desktop iframe; nested desktop/market windows do
not create duplicate launchers. Its stacking stays above windows/notices, and a
ResizeObserver supplies only the measured taskbar height as runtime geometry.
Taskbar safe-area padding, horizontal scrolling and 48px buttons preserve mobile
operation. Standalone pages link directly to the canonical Project Companion
with no query or referrer. Desktop pages open the existing scripted local PIXIE
window, focus its input, and return focus to the launcher on Escape. The local
window explicitly discloses its simulated behavior. Control-room views whose
legacy desktop is hidden use the existing external Companion route instead.

The new discovery card, existing sitemap and seeded Projects window expose Gods
of Mayhem at `https://loptrlab.com/mayhem/`, with its 2013 lineage, competitive/
community role, free starter-kit and developing four-player game boundaries.
Business report review and desktop guidance offer explicit return to discovery.
The Threshold remains owned by Training. No published standalone reader was found
in its current source, so the interim route names Mayhem's introduction and the
Training entrance honestly, without opening raw Markdown for general readers.
PIXIE pckt identity/article discovery remains inactive: the proposed website and
verification endpoint were unretrieved, and standard handle resolution returned
"Unable to resolve handle". This does not prove the publication is absent. No
newsletter, membership, publishing scope, remote importer or new application is
introduced.

See the dated amendment section in `HOLDINGS_ONBOARDING_REVIEW_2026-10-28.md` for
before/after captures, exact browser states, destination verification and remaining
physical-device acceptance gates. Source and local/browser checks are separate
from any preview or production release.

### Embedded experience correction — 9 November 2026

The persistent guide belongs to the active experience, not simultaneously to its
background page and foreground desktop. Opening the landing's desktop overlay
hides the background launcher; closing it restores that launcher. The desktop
retains its approved sigil and safe-area/taskbar placement. The separate demo
launch action is inline, not a competing fixed bottom-right control. No new symbol,
assistant, stylesheet, theme or asset is introduced. See the embedded-launch
correction in the onboarding review for the owner's Safari finding and corrected
before/after evidence. Direct-entry checks alone are not end-to-end acceptance.


## Threshold reading-circle release — 10 November 2026

The Threshold now links directly to Training’s own human-readable reader at
`https://loptr-lab.github.io/training/threshold.html`, from both Holdings project
discovery and the desktop Projects window. The old interim Mayhem fallback is
removed from the reading card; Gods of Mayhem retains its separate identity and
entry. The reading practice is fifteen minutes a day with seven existing titles,
library-first access, optional written questions and original-work proposals.
Training owns its reader, notebook and facilitator handbook; Holdings only
provides discovery. See Training’s `THRESHOLD_BOOK_CLUB.md` for contribution roles,
facilitation and review boundaries. No scheduled group or automatic membership
is implied.

This change adds no theme, asset, stylesheet, assistant, runtime dependency or
identity-bearing URL. `public/styles.css`, the approved PIXIE sigil, single
persistent control and PR #60 privacy protections remain in place. Owner
authorized release after rollout documentation and verification on November 10;
release evidence is recorded in `docs/THRESHOLD_RELEASE.md`.
