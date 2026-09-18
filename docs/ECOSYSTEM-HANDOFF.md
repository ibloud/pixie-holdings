# Loptr Lab Ecosystem Handoff

## Purpose

This document reconciles the September 2026 ecosystem briefing with the current versioned repositories. It is the working handoff for contributors.

## Canonical distinction

The briefing describes a long-term **PIXIE Gamer OS** vision. Current repositories support a narrower and more concrete statement:

**PIXIE is the knowledge/infrastructure direction; PIXIE Creator OS is the current creator-workstation implementation; PIXIE Holdings is the current Alexa+/MCP hackathon test bench.**

The Gamer OS should remain a **future ecosystem layer**, not a claim that the current repositories already implement a player identity/progression/community operating system.

## Current architecture

```text
50 Ways
  |
  | maps patterns of co-dependence
  v
Interdependence
  |
  | defines the transition
  v
PIXIE / ATmosphere
  |
  | discovers, contextualizes, bridges, introduces, tours, releases
  v
PIXIE Creator OS
  |
  | creates, manages, preserves, authors
  v
AT Protocol
  |
  | optional public interoperability
  v
Public Network

PIXIE Holdings = Alexa+ / MCP consequence-governance test bench
Narrative Provenance = local provenance and rights-control component
```

## What is current

- `pixie-holdings`: working public prototype, synthetic economics, accessible UI, MCP surface, consequence previews, provenance/receipt preview.
- `50-ways-to-leave-another`: public development record and experimental Pixie/ATProto discovery handoff.
- `pixie-creator-os`: stable pre-alpha creator workstation with local-first Obsidian storage and explicit integration boundaries.
- `narrative-provenance`: released privacy-first Obsidian provenance plugin.
- `made-sick`: consent-first creator-directory/research prototype.
- `inpatient-corridors-review`: separate public-interest prototype; not a clinical feature of Creator OS.
- `duet_engine_architecture`: accessibility-first browser/game-engine architecture prototype.
- `violets-revenge`: larger game/world project requiring separate production audit.

## What remains strategic / unverified

- full PIXIE knowledge graph across every repository and Drive asset;
- Gamer OS player identity/progression/community layer;
- Windows/Xbox integration;
- Azure/PlayFab deployment;
- unified repository organization under the proposed target structure;
- complete Drive-to-canonical mapping;
- community governance infrastructure at scale;
- a production-grade cross-project dependency graph.

## Canon states

Use four states for future consolidation:

- **Canon** — current authoritative decision.
- **Experimental** — active test/prototype.
- **Archive** — historical material preserved for provenance.
- **Apocrypha** — community-created alternate interpretation/work.

Do not silently promote Archive or Apocrypha into Canon.

## Drive policy

Google Drive should become **cold storage**, not be deleted wholesale.

Before removing material from active storage:

1. inventory files and folders;
2. assign each item a project, canonical state, owner, rights status, and source;
3. identify duplicates and superseded versions;
4. record the canonical GitHub/asset destination;
5. preserve private/source material that GitHub must not contain;
6. create and verify a restorable archive;
7. only then remove redundant working copies.

### Determination

**CONDITIONAL YES** — the bulk of the imported Drive archive can eventually leave active workspace storage, but the archive should not be purged merely because repositories now exist. Current repositories explicitly retain protected source/working materials outside GitHub, and the full archive has not yet been reconciled item-by-item.

## Community handoff sequence

### Phase 1 — Ship the front door
- Finish Devpost submission.
- Publish the demo video.
- Put the contributor path in the PIXIE Holdings README.
- Open focused issues for first contributors.

### Phase 2 — Make contribution safe
- Add CONTRIBUTING and security guidance.
- Define Canon / Experimental / Archive / Apocrypha.
- Require provenance and rights notes for ecosystem additions.
- Keep external actions preview-first and explicit.

### Phase 3 — Build the map
Create a machine-readable ecosystem manifest linking:
- repository
- project
- canonical state
- dependencies
- major assets
- documentation
- owner/steward
- external integrations
- verification status

### Phase 4 — Reconcile Drive
Import only canonical/public-safe knowledge into repositories or PIXIE indexes. Keep source assets and private records in protected storage. Move the rest to verified cold archive.

### Phase 5 — Build PIXIE as the knowledge layer
Start with the manifest and provenance model, then add graph/search/discovery. Do not begin by trying to absorb all 570 files.

### Phase 6 — Future platform work
After the knowledge layer and production pipelines are stable, assess Windows/Xbox/Azure/PlayFab integration against actual technical requirements rather than positioning assumptions.

## Immediate contributor issues

Recommended first issues:

1. **Accessibility audit** — keyboard, screen reader, reduced motion, interruption recovery.
2. **MCP conformance** — Streamable HTTP and Alexa+ interoperability verification.
3. **Ecosystem manifest** — define the first machine-readable project/repository schema.
4. **Contributor onboarding** — improve local setup and first-contribution path.
5. **Drive archive mapper** — design the inventory and canonicalization workflow.

The hackathon project is the invitation surface. The broader ecosystem is the contribution field.
