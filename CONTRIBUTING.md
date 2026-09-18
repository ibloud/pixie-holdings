# Contributing to PIXIE Holdings

PIXIE Holdings is an open-source prototype and a test bench for a larger Loptr Lab ecosystem. Contributions are welcome, especially around accessibility, MCP/Alexa+, creator tools, provenance, games, UX, testing, and documentation.

## Start here

1. Read the README and `docs/hackathon-build/demo-script.md`.
2. Run `npm install`, `npm test`, and `npm start`.
3. Explore the browser demo before proposing changes.
4. Open an issue for a substantial change; small fixes can go directly to a pull request.
5. Keep changes inspectable, reversible, and consistent with the project's consent and provenance boundaries.

## Good first contributions

- Accessibility and keyboard/screen-reader testing
- Reduced-motion and interruption-recovery improvements
- MCP protocol/transport tests
- Alexa+ interoperability documentation
- Consequence-model clarity and test coverage
- Obsidian/provenance workflow improvements
- Documentation, diagrams, examples, and onboarding
- Bug reports from running the project locally

## Boundaries

Do not add real financial records, health records, precise location data, credentials, private correspondence, contracts, or other sensitive personal information.

Do not turn a preview into an automatic external action. Publishing, spending, ordering, messaging, or other consequential actions require an explicit user-controlled boundary.

Do not imply affiliation, endorsement, licensing, or participation that has not been documented.

## Development

Requirements: Node.js 22+.

```bash
npm install
npm test
npm start
```

Please include tests when behavior changes. Explain accessibility impact and any new external dependency in the pull request.

## Relationship to the wider Loptr Lab ecosystem

PIXIE Holdings is the current hackathon/test-bench implementation. It is not the whole PIXIE ecosystem.

Current architecture:

```text
50 Ways
  -> Interdependence
  -> PIXIE / ATmosphere
  -> PIXIE Creator OS
  -> optional AT Protocol interoperability
```

PIXIE Holdings demonstrates a governed assistant/action surface within that ecosystem.

The broader Gamer OS vision remains a future direction; it should not be represented as a currently completed product.

## Community roles

Early contributors can participate as:

- **Travelers** — explore, test, and report observations.
- **Contributors** — submit code, documentation, accessibility findings, research, or design work.
- **Stewards** — help review contributions and protect project boundaries.
- **Keepers** — maintain canonical decisions and long-term project direction.

These are working community concepts, not employment titles or guaranteed access levels.

## Code of conduct

Be specific, respectful, and evidence-oriented. Protect private information. Critique the work rather than people. When provenance or rights are uncertain, flag the uncertainty instead of filling the gap with assumptions.
