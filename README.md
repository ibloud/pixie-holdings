# PIXIE Holdings

**Open-source prototype created for the Build, Ship, Shape: Amazon Developer Hackathon.**

PIXIE Holdings is an accessible portfolio-economics game. The player stewards three fictionalized Loptr Lab holdings while balancing cash, human capacity, accessibility, rights, trust, and system pressure.

The project demonstrates a deliberately different kind of embodied assistant:

- **Alexa+ is the voice** through a self-hosted MCP endpoint.
- **PIXIE is the consent and consequence steward.**
- **AT Protocol is the portable public evidence layer.**
- **Narrative Provenance for Obsidian remains the private creator-controlled memory.**

## Obsidian vault contract

The prototype includes an additive, Obsidian-compatible project structure in
[`obsidian-vault/`](obsidian-vault/README.md). PIXIE may propose an inbox-to-project
move, but it must show the source path, destination path, reason, and rollback
receipt before changing anything. Original filenames and attachments are preserved.

## Run

Requires Node.js 20 or later.

```bash
npm start
```

Open `http://localhost:3000`. The MCP endpoint is `POST /mcp`; health is `GET /health`.

```bash
npm test
```

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
