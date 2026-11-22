# PIXIE Holdings

## Loptr Lab mission and participation

Loptr Lab is a pre-seed, people-over-profit, accessibility-first venture working toward a self-sustaining model within a capitalist economy. Money sustains the work; meaningful change for people is its purpose. We accept funding only on terms that keep people and accessibility first. Our long-term vision includes universal basic income. We aim to bring change to life and leave a transparent record of what we tried, what worked, and what failed so others can carry it forward. This mission governs our projects, funding decisions, and partnerships; it is not a temporary marketing position.

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

Financial support is optional and sustains infrastructure, maintenance, accessibility work, and documented development. Paying does not buy contributor status, canon authority, approvals, ownership, or employment. Participation and accessibility are not sponsorship rewards. Project-specific licenses and existing signed agreements continue to apply.

Current owner-designated support routes are [Buy Me a Coffee](https://buymeacoffee.com/loptrlab), [Patreon](https://www.patreon.com/LoptrLab/), [GitHub Sponsors](https://github.com/sponsors/ibloud), and [PayPal.me/ibloud](https://paypal.me/ibloud). Platform-specific tiers and terms remain on their respective provider pages; they are not a unified Mayhem membership ladder. See [`docs/FUNDING-AND-ENTITY-STATUS.md`](docs/FUNDING-AND-ENTITY-STATUS.md) for the evidence-qualified financial and legal status and [Issue #74](https://github.com/ibloud/pixie-holdings/issues/74) for the separate, pending evidence-backed entity, recipient and tax-reporting review. No entity-level financial statements or reconciled payout records are established in the public materials reviewed; this does not determine whether private records or a legal entity exist.

[Full mission and participation terms](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).


**Open-source prototype created for the Build, Ship, Shape: Amazon Developer Hackathon.**

PIXIE Holdings is an accessible portfolio-economics game. The player stewards three fictionalized Loptr Lab holdings while balancing cash, human capacity, accessibility, rights, trust, and system pressure.

The project demonstrates a deliberately different kind of embodied assistant:

- **Alexa+ is the voice** through a self-hosted MCP endpoint.
- **PIXIE is the consent and consequence steward.**
- **AT Protocol is the portable public evidence layer.**
- **Narrative Provenance for Obsidian remains the private creator-controlled memory.**

## Contributor launchpad

**Run it. Test it. Tell us what breaks.**

Start with [`CONTRIBUTING.md`](CONTRIBUTING.md). Good first contributions include accessibility testing, MCP/Alexa+ interoperability, documentation, provenance, UX, tests, and ecosystem mapping.

The [`Ecosystem Handoff`](docs/ECOSYSTEM-HANDOFF.md) explains how this hackathon prototype fits into the wider Loptr Lab / PIXIE architecture without treating future Gamer OS capabilities as already shipped.

## Obsidian vault contract

The prototype includes an additive, Obsidian-compatible project structure in
[`obsidian-vault/`](obsidian-vault/README.md). PIXIE may propose an inbox-to-project
move, but it must show the source path, destination path, reason, and rollback
receipt before changing anything. Original filenames and attachments are preserved.

## Run

Requires Node.js 22 or later.

```bash
npm install
npm start
```

Open `http://localhost:3000`. The MCP endpoint is `POST /mcp`; health is `GET /health`.

```bash
npm test
```

## New Economy market reference layer

The Holdings market surface uses server-side provider credentials for external reference data. The production GitHub Pages site receives a generated static snapshot at `public/market-data.json`; the Node server retains `/api/market` for local/server deployments:

- Financial Modeling Prep (`FMP_API_KEY`) for equities, ETFs, and crypto quotes.
- Federal Reserve Bank of St. Louis FRED (`FRED_API_KEY`) for macroeconomic observations such as the 10-year Treasury yield (`DGS10`) and volatility index (`VIXCLS`).

Set these variables in the deployment environment; never commit provider keys or put them in browser code. The Pages workflow reads `FMP_API_KEY` and `FRED_API_KEY` from GitHub Actions secrets, generates the static snapshot, and deploys only the resulting public data. It refreshes on `main` pushes, manual runs, and a 15-minute schedule. Provider freshness depends on the subscribed data plan; FRED is an observation series rather than a continuous ticker.

All market records are normalized with `referenceOnly: true`. External market data cannot mutate PXCOIN, allocations, trust, rights, capacity, governance, or other synthetic game state.

## Alexa+ MCP

The server implements the MCP `2025-11-25` JSON-RPC surface needed for the prototype:

- `initialize`
- `tools/list`
- `tools/call`

Tools:

- `list_holdings`
- `evaluate_allocation`
- `preview_file_action`
- `prepare_media_package`
- `prepare_public_receipt`

The receipt tool creates a preview only. It does not publish, spend, order, diagnose, or transmit private information.

## Training pathway

The [Loptr Lab training pathway](docs/TRAINING-PATHWAY.md) routes visitors by
creative interest and present capacity. Job-loss context remains device-local
and is never included in the public PDS-record preview.

## Rights boundary

The playable prototype uses original Loptr Lab names and mechanics. Umbrella Corporation, Wayne Enterprises, V.I.K.I., the Red Queen, Pennywise, *IT*, Resident Evil, artists, platforms, and publications may be discussed as commentary or inspiration but are not included as characters, branding, endorsements, or licensed properties.

The economic figures are synthetic scenario data, not valuations, investment advice, financial statements, or offers of securities.

## Project links

- [Loptr Lab](https://loptrlab.com/)
- [PIXIE Device Stewardship](https://github.com/ibloud/pixie-device-stewardship)
- [Narrative Provenance](https://github.com/ibloud/narrative-provenance)
- [Break the Grid](https://github.com/ibloud/inpatient-corridors-review)
- [Veiled Dominion Engine](https://github.com/Loptr-Lab/veiled-dominion-engine)

## Attribution

Concept, architecture, writing, and direction: Dominique Devereaux / Loptr Lab. Development assistance: OpenAI Codex. Tool assistance does not transfer authorship or ownership.


## PIXIE Control Plane — concept validation and delivery

**Breadcrumb:** [PIXIE Holdings](README.md) → Control Plane → [Creator OS](https://github.com/ibloud/pixie-creator-os) → [PIXIE Ecosystem Guide](https://github.com/Loptr-Lab/pixie-ecosystem-guide).

Holdings is the hardware-aware stewardship and decision surface in the proposed PIXIE control plane. It must not imply device access that has not been granted or tested. The first review slice should surface discovered hardware, capability evidence, permission state, connection status, and user-approved actions—with clear local, adapter-ready, connected, blocked, and unverified states. Hardware access stays behind explicit browser/native capability checks and consent.

The coordinated concept has three distinct ownership planes:

- **Holdings / device stewardship:** hardware and resource context, capability and permission boundaries, safety/consent decisions, and evidence of what was actually tested.
- **Creator OS:** project and creative-work coordination, a curated app/service directory, reviewed handoffs, and user-controlled launch/connection preferences. Discovery is not installation; launch is not authorization; a listing is not an integration.
- **My PIXIE / Companion:** private identity, project index, user consent, and private persistence. Portable PDS records are an optional interoperability layer, not a private file store. Never put sensitive private project data in public records.

### Curated discovery and validation layer

Build the source distribution organically from app/service directories, official docs and developer APIs, repository activity/releases, hardware specifications, ecosystem discussions, user submissions, and our own reproducible tests. Every entry records its source/provenance, discovery date, last checked date, confidence, capabilities, compatibility notes, and status. Use the states **Discovered → Evaluated → Verified → Adapter available → User connected**; do not collapse them. Stale or unverified records remain visibly unverified. Avoid scraping or automated outreach without a documented source/permission policy.

### Decision-maker review and proof sequence

Invite feedback from ATProto ecosystem stewards, app developers, hardware/creative-tool developers, MCP implementers, accessibility practitioners, and developer-relations/ecosystem leads. Ask whether the interoperability and permission model solves a concrete problem; do not imply endorsement or ask for access to private systems.

Delivery gates: (1) audit current Holdings, Creator OS, Companion and registry contracts; (2) map capability, data ownership, and consent; (3) demonstrate one vertical slice from device/context through PIXIE identity and Creator OS to one app adapter, with user-approved handoff; (4) test denied permissions, disconnect/recovery, wrong destination, stale catalog entries, and private-data leakage; (5) publish reproducible evidence, limits, and a focused review request. No live integration or hardware support is claimed until tested.

See the [Creator OS coordination contract](https://github.com/ibloud/pixie-creator-os) and [ecosystem guide breadcrumb](https://github.com/Loptr-Lab/pixie-ecosystem-guide).
