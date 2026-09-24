# PIXIE Holdings

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
