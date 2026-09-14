# Technical specification

## Architecture

- `public/`: dependency-free accessible web interface
- `src/model.js`: deterministic holdings and ledger rules
- `src/server.js`: static server and MCP 2025-11-25 JSON-RPC endpoint
- `src/atproto.js`: minimal public-receipt record builder
- `lexicons/`: custom AT Protocol record schema
- Browser storage: localStorage only
- Browser capture: `getUserMedia` and `MediaRecorder`, activated only by a direct user action; optional Web Speech recognition where supported

## MCP tools

### list_holdings
Returns the three synthetic holdings and available actions.

### evaluate_allocation
Accepts a holding and action, validates input, and returns ledger deltas plus an accessible explanation.

### prepare_public_receipt
Accepts an approved fictional decision and returns an AT-compatible record preview. It never publishes.

## Data boundary

No server database. No credentials. No health, location, ordering, or real financial data. Production AT OAuth and writes are explicitly deferred.
Captured media remains in browser memory until the creator downloads or discards it. Camera/microphone access, recording, transcription, upload, and publication are separate consent boundaries. No passive listening, biometric analysis, emotion inference, or health inference.

## Deployment

- Public interface: `holdings.loptrlab.com`
- Current public deployment: `https://pixie-holdings.ibloud-ivxx.chatgpt.site`
- MCP: HTTPS at `/api/mcp` on the same origin
- Custom domain is registered and remains pending until its DNS records validate
- The Docker build remains portable to AWS App Runner, but the prototype uses a
  managed Worker deployment so no unconfigured AWS account is implied

## Verification

- Node test suite for allocation validation and receipt construction
- HTTP tests for health, static app, MCP initialize, list, call, and invalid input
- Manual keyboard, zoom, screen-reader, and reduced-motion review before submission
