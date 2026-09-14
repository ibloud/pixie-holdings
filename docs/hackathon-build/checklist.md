# Build checklist

Mode: autonomous

- [x] Establish bounded scope, PRD, technical specification, and rights boundary
  - Verify: planning files agree on the three-holding loop and exclusions
- [x] Implement deterministic economics model
  - Verify: automated tests cover valid and invalid allocations
- [x] Build accessible decision and consent interface
  - Verify: keyboard actions, status updates, restart, and export work
- [x] Implement MCP 2025-11-25 endpoint and tools
  - Verify: HTTP tests initialize, list tools, and call tools
- [x] Add AT Protocol receipt preview and Lexicon
  - Verify: required record fields and no private payload fields
- [x] Add ecosystem and promotion documentation
  - Verify: pitch lengths, links, calls to action, and rights language are present
- [x] Add Obsidian-compatible vault structure and provenance templates
  - Verify: original filenames remain intact; proposed moves require preview and rollback receipts
- [x] Add creator production and media handoff contracts
  - Verify: DAW originals remain private; Plyr playback and Audio.com handoff are previews, not invented uploads
- [x] Add user-chosen full-screen and windowed workspace modes
  - Verify: full screen requires a direct user gesture and Escape/windowed mode restores the page
- [x] Add consent-gated creator camera, microphone, and vocal-command capture
  - Verify: capture begins only after selected browser permission; recording is visibly indicated; stop, discard, and private download work; no upload or publication occurs
- [x] Publish new public GitHub repository
  - Verify: repository URL resolves, license is visible, and source is complete
- [ ] Configure public subdomain and production MCP hosting
  - Verify: HTTPS endpoints resolve and live MCP call succeeds
- [ ] Conduct participant accessibility review
  - Verify: iPad, keyboard, zoom, reduced-motion, and screen-reader observations recorded
- [x] Add privacy-bounded Loptr Lab training pathway
  - Verify: routing covers relevant ecosystem doors; job-loss support is optional; sensitive answers remain local and are excluded from PDS previews
