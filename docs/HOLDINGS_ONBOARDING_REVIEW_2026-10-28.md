# Holdings onboarding review — 28 October 2026

## Scope and evidence

Audience supplied by Dominique: business people reviewing Creator OS results on the Atmosphere through command-led interaction, with Made-Sick as the join destination. Current source baseline: 483813edafbde1f7188a664b884e526f85609d67. A separate local checkout had unpublished edits; it was inspected and left untouched. Open privacy PR #60 is a separate assignment and remains unmerged.

Current live entry and desktop were captured through the browser. Dominique also supplied an iPad screenshot showing Creator OS embedded in the desktop, an overlapping notice and blank taskbar controls. The browser audit independently observed blank-looking taskbar buttons and the notice overlap in the radar state. No real identity, report, account joining or publishing was submitted.

## Focused findings and proposed response

| Step | Current health | Evidence and consequence | Preview response |
|---|---|---|---|
| 1. Arrive and identify purpose | Weak for the intended audience | Home leads with a synthetic market decision, 3 equal actions (2 go to the same map), then quotes and project geography. Business report review is not the entry task. | One audience statement and a primary sample-review path; community join secondary. |
| 2. Reach a useful review | Missing for this audience | Desktop opens radar from role=admin; Creator OS appears as a nested workspace. Neither demonstrates a command-led business review. | A clearly fictional, browser-only command console demonstrates result → evidence → next step without inventing connected ingestion. Existing desktop remains available. |
| 3. Understand evidence and act | Mixed | Synthetic disclosures are a strength, but dense system labels and multiple nested frames burden orientation. The first-five notice overlaps a window; taskbar controls appear blank. | Keep sample labels adjacent to output; state draft, rights and next action; explicit control foreground/background; move notice above the demo work area. |
| 4. Join the relevant community | Unclear | Existing join/studio card routes to Companion rather than the owner-directed Made-Sick join flow. | Plain link to Made-Sick join.html; no identity, private data or forged consent flags in URLs. No membership claim. |
| 5. Maintain consistent design | Fragmented | Eight HTML pages had page style blocks, 49 static style attributes across sources, and JS-injected theme blocks alongside styles.css. | One main stylesheet; surface-scoped legacy rules and static classes. Dynamic window geometry stays behavioral. Legacy palette/type remain documented migration debt. |

## Sources used carefully

Userpilot's teardown provides short-task, demo-content and contextual-help patterns. It does not justify tracking visitors or copying a SaaS registration funnel. World@Meta's 2023 article supplies business-experience context; it is not evidence of current integration, AT Protocol capabilities or guaranteed commerce outcomes. AetherOS is owner-supplied lineage; its live contents could not be captured usefully in this run, so no fidelity claim is made.

## Preview validation

44 existing tests pass. All inline scripts and the console script parse. All eight public pages link exactly one main stylesheet; no static page style attributes, style blocks or injected style blocks remain. The market test now reads its CSS assertion from the actual stylesheet instead of expecting CSS inside HTML.

Chromium browser: review/source/next shortcut paths, typed next command and output state verified; no horizontal overflow at 390, 768, 1024 and 1366 CSS px, with equal entry gutters; heading tracking computes as normal. Existing seeded desktop and readable taskbar controls checked after extraction. This is not physical iPad/Safari or VoiceOver acceptance. No live Creator OS report/Atmosphere account handoff or Made-Sick registration was tested. The displayed percentages and demo reports are synthetic, not business evidence.

## Release boundary

Review branch and Vercel preview only. No main merge, production promotion or domain changes. No other product repository changed. Owner reviews the onboarding direction before connected reporting work or broader brand migration.

## Amendment review — 9 November 2026

### Existing work and review ancestry

PR #61 is already merged at `1b23162`; it cannot receive another open-review
amendment. The focused follow-up is based on PR #60's `a9ca912` security branch,
without merging or rewriting either PR. Existing business commands, synthetic
ledger/model, Creator desktop panels, intake consent steps and privacy safeguards
are retained. Only Holdings implementation/assets/tests/docs are changed.

### Before / after evidence

The baseline is the exact PR #60 source (`a9ca912`), which already includes merged
#61. Both baseline and amended source were served locally with external services
blocked. Captures use the same 1440×1000 and 390×1000 Chromium viewports. These
are code-review evidence, not screenshots of a newly deployed production site.

| State | Before | After |
| --- | --- | --- |
| Landing, desktop width | [Before](evidence/holdings-pixie-2026-11-09/before-landing-1440.png) | [After](evidence/holdings-pixie-2026-11-09/after-landing-1440.png) |
| PIXIE OS, desktop width | [Before](evidence/holdings-pixie-2026-11-09/before-desktop-1440.png) | [After](evidence/holdings-pixie-2026-11-09/after-desktop-1440.png) |
| Landing, mobile width | [Before](evidence/holdings-pixie-2026-11-09/before-landing-390.png) | [After](evidence/holdings-pixie-2026-11-09/after-landing-390.png) |
| PIXIE OS, mobile width | [Before](evidence/holdings-pixie-2026-11-09/before-desktop-390.png) | [After](evidence/holdings-pixie-2026-11-09/after-desktop-390.png) |

Asset authority and checksum are recorded in `BRAND_GUIDELINES.md`. All eight
HTML entries use one shared launcher script and the existing one stylesheet.
There is no new assistant panel: the desktop launcher opens the existing scripted
PIXIE window; standalone/control-room routes use the existing Project Companion.
Keyboard Enter opens the local guide, its input receives focus, and Escape closes
it and restores launcher focus. The guide cannot be hidden behind the desktop's
open/maximized/minimized windows. Nested windows do not grow another launcher.

### Onboarding and destinations

The existing fictional business sequence remains result → source evidence →
consequence → explicit next step. The `next` response now includes returning to
project discovery; button and typed-command equivalents remain. Mayhem discovery
uses the landing's existing section/card architecture, sitemap and Projects
window. A taskbar discovery button supplies a usable route when a mobile Intake
window covers desktop icons. No membership, payment or synthetic economy change
is triggered by navigation.

| Destination | Evidence and limit |
| --- | --- |
| `https://loptrlab.com/mayhem/` | Owning engine's `mayhem/index.html` and `starter-kit.html` inspected; canonical source explains 2013 lineage, free play/read/test/contribute paths and development status. Correct href and desktop discovery path exercised locally. Live HTTP retrieval was blocked by this environment's CONNECT policy; not claimed as live acceptance. |
| `https://loptr-lab.github.io/training/` | Existing reader-facing entrance returned HTTP 200. Training main's `THE_THRESHOLD.md` inspected; no dedicated published reader route found. Interim link is explicitly labelled, not presented as the full text. |
| Canonical Project Companion Railway origin | Existing portfolio launcher destination reused without identity/query/referrer. Navigation target checked; no private sign-in or live backend acceptance performed. |
| Made-Sick joining / Creator OS | Existing separate routes preserved. No automatic handoff of participant data, membership, consent or private report. No live join/ingestion claim. |
| Proposed `https://pixie.pckt.blog/` | Website and standard publication verification endpoint unretrieved; public ATproto resolveHandle failed. No DID, schema instance or useful article verified. Integration stays inactive; no fabricated feed/articles/subscriber access. Current Standard.site interoperability does not establish this particular publication's identity or legacy `blog.pckt.document` records. |

The reading-circle relationship remains a proposal: Training owns The Threshold,
Mayhem supplies narrative/community context, pckt is a possible external editorial
destination, and Holdings routes discovery. No new reader app, publication,
subscriber database or sign-in was created.

### Verification and release limits

`npm test`: 54 passing tests, including all PR #60 security tests and four new
contracts for asset identity, entry coverage, source routing and shared
accessibility styling. The synthetic economic implementation is unchanged.

`PIXIE_PLAYWRIGHT_MODULE=<external test harness> node scripts/check-pixie-browser.cjs`
checks all eight entries at 320, 390, 768, 1024 and 1440 CSS pixels. It separates
placement/hit-testing from behavior: bottom/right geometry, unobscured hit target,
40px mark, minimum 64px control, visible keyboard focus, Enter/Escape/focus return,
window open/maximize/minimize, project route, review/source/next buttons and
reduced-motion animation suppression. Machine-readable results:
[browser-checks.json](evidence/holdings-pixie-2026-11-09/browser-checks.json).
No runtime dependency was added. New controls use semantic names and native links/
buttons. Chromium viewport tests and labels do **not** establish physical iPad
Safari, VoiceOver reading order/announcements or hardware safe-area acceptance;
those remain NOT RUN. Legacy typography/palette outside the amended component
remains the previously documented migration debt.

Follow-up review only. No merge, production promotion, manual deployment, domain
change or authenticated integration is performed. An existing automatic PR preview,
if generated by hosting checks, is a review artifact and must be verified
separately; it does not authorize production deployment or close physical-device
acceptance gates.
