# PIXIE Device Independence

PIXIE treats the device as a capability endpoint, not as the source of the person's identity or authority.

```text
                    PIXIE CORE
                         |
          +--------------+--------------+
          |              |              |
       iPhone          iPad          Browser
          |              |              |
          +--------------+--------------+
                         |
                    SAME PERSON
                    SAME CONTROL
                    SAME CONSENT
```

## Stable-build contract

- Device identity is separate from owner identity.
- Device age is descriptive; age alone must not determine whether a device is obsolete.
- Capabilities, accessibility, software compatibility, repairability, battery condition, and local-data status are explicit inputs.
- PIXIE may assess lifecycle options but does not choose a replacement or disposal outcome for the owner.
- Lifecycle options are `keep-in-service`, `repair`, `repurpose`, `transfer`, and `recycle`.
- Local data creates a separate data-handling consideration before transfer or recycling.
- Device assessment is non-executing and does not perform repair, transfer, wiping, or recycling.
- Jailbreaking or other platform-control techniques are not required for the device-independence contract and should be evaluated separately for legal, security, warranty, and reliability implications.

## Demonstration intent

The first demonstration can use existing hardware rather than requiring a new dedicated PIXIE computer. The point is to show continuity of the person's control across capable devices, not to present a particular device as disposable or permanently supported.

A demo should distinguish:

1. **Interpretation** — an interface translates the person's request.
2. **Core** — PIXIE evaluates the request and records governance state.
3. **Consequence** — the owner sees what would happen.
4. **Consent** — consequential execution remains outside this assessment boundary.

## Boundary

This document describes a prototype architecture. It does not claim universal support for every iPhone, iPad, operating-system version, repair path, accessibility feature, or recycling program. It also does not authorize handling of clinical records or other protected data.
