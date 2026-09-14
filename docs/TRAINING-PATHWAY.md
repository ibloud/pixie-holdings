# Loptr Lab training pathway

## Purpose

The pathway helps a visitor find a useful door into the Loptr Lab ecosystem
without ranking them, diagnosing them, or treating recovery as a productivity
test. It asks:

1. What kind of work or learning interests them.
2. What level of participation fits their capacity today.
3. Whether layoff or job loss is relevant, with a prefer-not-to-say option.

## Routing

| Interest | Starting door |
| --- | --- |
| Story, writing, provenance | Made Sick Story Finder and Narrative Provenance |
| Games, characters, worldbuilding | Veiled Dominion, Break the Grid, and rpg.actor |
| Music, video, streaming, production | PIXIE Creator Capture and the Loptr Lab production workflow |
| Creative business and sustainable income | Made Sick's optional referral to The Futur |
| Open systems, accessibility, engineering | PIXIE Device Stewardship and Veiled Dominion Engine |

rpg.actor is an external AT Protocol character registry whose character
records and sheets are public. The pathway must never place job-loss, grief,
health, disability, counseling, or other sensitive support information in an
actor.rpg record.

## Job-loss support

If a visitor says job loss is relevant, the pathway acknowledges that loss
without diagnosing it and offers separate doors for:

- expression that is not required to become content;
- SAMHSA's layoff-stress and grief-support information; and
- U.S. Department of Labor job-seeker, training, and unemployment resources.

Loptr Lab and Made Sick do not present themselves as employment, medical,
crisis, or counseling providers.

## Data boundary

- Full questionnaire answers remain in browser-local storage.
- The visitor can delete them without contacting Loptr Lab.
- Loptr Lab receives no questionnaire answers in the current prototype.
- A public PDS preview may contain only a broad interest, capacity preference,
  record type, and timestamp.
- Layoff status and support needs are always excluded from the PDS preview.
- A real PDS write requires a reviewed Lexicon, AT Protocol OAuth, a field-level
  disclosure, preview, explicit approval, and a deletion path.

The preview is not consent to directory enrollment, public profiling,
notifications, counseling contact, or recommendations based on inferred
health or economic status.

## Agent boundary

The first release uses deterministic routing rather than an Anthropic or other
model API. This keeps the recommendation logic inspectable and prevents
sensitive questionnaire answers from being transmitted to an AI provider.
An agent-assisted layer may be evaluated later only after a separate privacy,
security, accessibility, cost, and prompt-injection review.
