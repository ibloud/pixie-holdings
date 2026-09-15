# Health Data Boundary

PIXIE Holdings does not currently integrate with MyChart, Epic, clinical records, or clinical-trial systems.

The stable build must not be used with real patient information, clinical-trial records, or protected health information (PHI) unless a separately authorized environment establishes the required privacy, security, research, and processing controls.

## Development rule

Use synthetic, manually prepared, or appropriately de-identified fixtures for development and demonstrations. Do not route a personal MyChart session, browser automation, or clinical export directly into the Gemini interface.

## Future adapter boundary

```text
Authorized health-data source
            |
            v
      HEALTH DATA ADAPTER
       FHIR / Epic / other
            |
      classification + authorization
            v
        PIXIE CORE
   consent / provenance / policy
            |
      approved processing
            v
      approved interfaces
```

Any future integration must explicitly define authorization, data classification, provenance, retention, security controls, approved processing providers, and execution boundaries before health data enters PIXIE Core or an external AI service.

This document is an architectural boundary, not a claim of HIPAA compliance or clinical authorization.
