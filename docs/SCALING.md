# PIXIE Holdings — Stability and Scaling Path

## Current boundary

PIXIE Core owns synthetic state, consequences, consent requirements, file stewardship previews, media handoffs, and public-receipt previews. AI is an interpretation layer; it is not an authority.

## Stable-build contract

A change is considered ready for integration when:

1. `npm test` passes on Node.js 20.
2. GitHub Actions reports the test workflow green for the pull request.
3. New governed behavior has deterministic Core tests.
4. AI behavior has fallback coverage and never bypasses Core validation.
5. Preview-only operations remain non-mutating until an explicit consent path is implemented.
6. README and architecture documentation distinguish implemented, proposed, and unverified capabilities.

## Scaling sequence

### Phase 1 — deterministic agent routing

Gemini may identify intent and a candidate command, but the command is validated against a catalog derived from PIXIE Core. Unsupported commands are rejected rather than executed. Allocation requests resolve to Core previews.

### Phase 2 — production request controls

Add request-size limits, per-client rate limiting, request IDs, timeouts, structured error codes, and redacted operational logs. Keep API keys server-side.

### Phase 3 — explicit consent and execution boundary

Separate `preview_*` and `prepare_*` capabilities from any future `execute_*` capabilities. Execution must require a server-verifiable consent record and an auditable receipt. No AI response should itself constitute consent.

### Phase 4 — Alexa+ transport

Keep PIXIE Core unchanged while adding an Alexa-facing MCP transport compatible with the current Alexa+ requirements. Treat transport, authentication, and deployment configuration as an adapter layer rather than changing the domain model.

### Phase 5 — persistence and multi-user isolation

Move the in-memory ledger to a durable store only after the state model and authorization boundary are stable. Scope every ledger, consent record, provenance record, and receipt to an explicit tenant/user identifier.

### Phase 6 — observability and evaluation

Track latency, error rate, fallback rate, tool-routing accuracy, confirmation rate, and policy violations. Add deterministic regression fixtures for representative accessibility and governance scenarios before increasing model autonomy.

## Investor / reviewer reading order

1. `README.md` — what the prototype is and what it deliberately does not claim.
2. `src/pixie/core.js` — governed application boundary.
3. `src/model.js` — deterministic scenario mechanics.
4. `src/ai/` — Gemini adapter and routing boundary.
5. `test/` — executable evidence for invariants.
6. `.github/workflows/test.yml` — reproducible CI gate.

The economic figures are synthetic scenario data. They are not company valuations, financial statements, investment advice, or offers of securities.
