# Devpost Submission — Build, Ship, Shape: Amazon Developer Hackathon

## Project
**PIXIE Holdings**

**Tagline:** A consent-first portfolio steward for Alexa+ that makes the human consequences of growth visible before anything happens.

## Primary track
**Alexa+**

PIXIE Holdings is a self-hosted MCP prototype using protocol version **2025-11-25**. Its HTTP `/mcp` endpoint exposes explicit, schema-bounded tools for fictional portfolio decisions, reversible file/media previews, and consent-gated public-receipt preparation.

## Mini challenge
**Open Source**

Contribution: https://github.com/ibloud/50-ways-to-leave-another/pull/41

The contribution connects the public 50 Ways PIXIE surface to PIXIE Holdings and adds a reduced-motion-aware Pixie CTA treatment.

## Project description
PIXIE Holdings is an accessibility-first portfolio economics game and Alexa+ MCP steward prototype from Loptr Lab.

The player stewards three fictional holdings — Veiled Dominion, Break the Grid, and Float Works — through a quarterly decision. Six visible ledgers make consequences explicit: **cash, human capacity, access, rights, trust, and system pressure**.

PIXIE previews consequences before execution and requires explicit approval. The same governance model is exposed through MCP tools including `list_holdings`, `evaluate_allocation`, `preview_file_action`, `prepare_media_package`, `prepare_public_receipt`, `list_file_capabilities`, `list_device_capabilities`, and `preview_device`.

The AT Protocol receipt is a preview, not automatic publication. Creator-controlled memory remains represented by an Obsidian-compatible vault contract. The project uses synthetic scenario data and does not use real financial data, health records, location data, private correspondence, or securities.

## Why Alexa+
Alexa+ provides an agent surface for a system whose purpose is helping a person reason about consequences before acting. PIXIE supplies the governed capability boundary and MCP makes it machine-readable:

**ask → inspect → preview → explain → require approval → optionally prepare a portable receipt**

## What was built during the hackathon
The `ibloud/pixie-holdings` repository was created September 13, 2026. During the hackathon window we built and iterated the three-holding decision loop, six-ledger consequence model, accessible UI, local state/export, self-hosted MCP endpoint, MCP regression tests, AT Protocol receipt preview, Obsidian-compatible creator-memory contract, reversible file actions, creator capture boundaries, media handoff preparation, continuity documentation, and public deployment.

## How to run
Requirements: Node.js 22+.

```bash
git clone https://github.com/ibloud/pixie-holdings.git
cd pixie-holdings
npm install
npm test
npm start
```

Open `http://localhost:3000`.

MCP: `POST http://localhost:3000/mcp`

Health: `GET http://localhost:3000/health`

## Public demo
Current deployment: https://pixie-holdings.ibloud-ivxx.chatgpt.site

Custom domain: https://holdings.loptrlab.com (registered; DNS activation may still be pending).

## Product feedback — MCP / Alexa+
**Tools used:** open Model Context Protocol, implemented directly as a lightweight self-hosted JSON-RPC HTTP server; Node.js built-in HTTP/runtime APIs.

**What worked well:** MCP maps cleanly onto governed assistant capabilities because each tool can be explicit, schema-bounded, and tested. JSON-RPC is straightforward to inspect. Structured results are useful for consequence previews. A self-hosted endpoint keeps the creator data boundary under project control.

**What needs work:** A single official end-to-end Alexa+ MCP example would make onboarding faster. A canonical stateless Streamable HTTP reference implementation, local conformance command/validator, and clearer distinction between MCP protocol guarantees and Alexa+ product expectations would reduce uncertainty.

**Onboarding:** We implemented from the MCP documentation and added direct tests for initialization, tool discovery, and tool calls. Confirming exact interoperability expectations required cross-checking multiple documentation surfaces.

**Build again:** Yes. The explicit MCP capability boundary fits PIXIE's consent model.

## Feature requests
1. **Important:** Official Alexa+ MCP interoperability harness covering protocol negotiation, transport, tool discovery, invocation, structured output, and common compatibility errors.
2. **Important:** Minimal Alexa+ MCP starter project with one governed tool and end-to-end connection instructions.
3. **Nice-to-have:** Track-specific submission checklist covering runtime evidence, video, feedback, and testing instructions.

## Friction log
**Task:** Verify a lightweight self-hosted implementation against the Alexa+ MCP requirement.

**Expected:** One authoritative way to confirm transport/interoperability.

**Actual:** The protocol was implementable, but exact transport/interoperability expectations required consulting multiple documentation surfaces.

**Workaround:** Explicit protocol-version reporting plus direct HTTP regression tests.

**Suggestion:** Publish a first-party conformance test command and canonical stateless Streamable HTTP example.

## Attribution / AI use
Concept, architecture, writing, and direction: Dominique Devereaux / Loptr Lab.

OpenAI Codex assisted implementation, testing, documentation, and accessibility checks under the creator's direction. Tool assistance does not transfer authorship or ownership.

## Rights / safety
Playable figures are synthetic. Third-party characters, trademarks, music, likenesses, and implied partnerships are not part of the playable product. PIXIE does not provide financial advice, execute real transactions, diagnose health conditions, infer sensitive attributes, or publish creator material without explicit approval.

## Final submission checklist
- [x] Public GitHub repository
- [x] MIT license
- [x] Setup instructions
- [x] Working web demo
- [x] Alexa+ track
- [x] MCP 2025-11-25 implementation
- [x] Automated MCP tests
- [x] Hackathon-period development documented
- [x] Open Source contribution
- [x] Product feedback
- [x] Feature requests
- [x] Friction log
- [ ] Public demo video URL
- [ ] Authenticated Devpost submission
