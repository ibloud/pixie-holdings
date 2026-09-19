# Legal Validation Protocol — Architecture Inputs

**Status:** Design input / counsel-validation required  
**Purpose:** Preserve the legal-validation findings that should feed the Holdings build specification without treating them as settled legal conclusions.

## Architecture requirements surfaced by the validation protocol

1. **Immutable decision records**
   - Every action involving a persona, voice sample, or derivative work should produce a timestamped, write-once decision record.
   - The record should identify what was evaluated, which signal or evidence was used, and the resulting verdict.

2. **Hard quarantine as the default uncertain state**
   - Uncertain rights/conflict cases should enter quarantine rather than continuing through the normal pipeline.
   - Existing `QUARANTINE_PRIORITY` behavior is the reference pattern.

3. **Consent and rights metadata at ingest**
   - Capture consent/rights metadata when an asset enters the system.
   - Attach that metadata to the asset itself so it travels with the asset and preserves chain of custody.

4. **Separate detection from policy**
   - The detection layer identifies what an asset is and what signals are present.
   - The policy layer determines what action follows from those signals.
   - `RightsEnvelopeVersion` is a useful architectural direction for this separation.

5. **Jurisdictional tagging**
   - Tag every relevant asset with both subject domicile and intended output/distribution jurisdiction.
   - Where jurisdictional requirements conflict, apply the most restrictive applicable standard at the signal level rather than globally blocking the entire system.

6. **Tiered confidence bands**
   - High-confidence conflict: hard block.
   - Middle-band ambiguity: time-bounded human review.
   - Below-threshold signal: permit progression but preserve the signal in the audit record.
   - A calibration benchmark attributed to Ameya (`@LLC1hVNYWZWAfGh5NbPR`) suggests that human-review overrides above approximately 15–20% should trigger recalibration. Treat this as a proposed benchmark requiring independent validation, not as an established legal threshold.

7. **Actively managed human escalation**
   - Escalation needs a named/documented owner.
   - Review timelines should be explicit.
   - Holds should preserve the rationale for the decision and subsequent disposition.

## Independent counsel question

Ask IP counsel to identify the point at which an organization's knowledge of a potentially infringing asset, combined with continued operation of the system, could constitute actionable conduct.

This is jurisdiction-dependent and should inform the system's detection thresholds, quarantine behavior, review windows, and escalation policy.

## Build-spec implications

The implementation should be designed so that these controls can be represented explicitly rather than inferred from application behavior:

- `RightsEnvelopeVersion` (or successor) should carry rights/consent provenance and jurisdictional context.
- Detection outputs and policy decisions should be separate records/interfaces.
- Quarantine should be a first-class state with an auditable transition history.
- Decision/audit records should be append-only or otherwise tamper-evident.
- Human review should have ownership, SLA/deadline, rationale, and override fields.
- Confidence thresholds and calibration policy should be versioned configuration, not hard-coded assumptions.
- Jurisdiction should be evaluated per asset/signal/output context.
- The system should preserve enough provenance to reconstruct why an asset was allowed, held, blocked, or released.

## Boundary

This note records architecture implications and questions for counsel. It is **not legal advice**, does not establish that any particular threshold is legally sufficient, and does not replace jurisdiction-specific review by qualified IP counsel.

**Source context:** Legal-validation discussion concerning the Holdings build and the relationship between asset rights, detection, policy, quarantine, and continued system operation.
