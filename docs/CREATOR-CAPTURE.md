# Creator capture and vocal commands

## Current prototype

PIXIE can request microphone, camera, or both from the browser after the creator
selects the sources and presses **Request selected access**. It can record the
authorized stream, provide a private in-page preview, download the take, or discard
it. Nothing is sent to the server, Audio.com, AT Protocol, Alexa+, or an Obsidian
vault.

Optional vocal commands use the browser's speech-recognition interface when it is
available. Button controls remain the reliable and accessible interface. Supported
commands are: `start recording`, `stop recording`, `discard recording`, and
`mute microphone`.

## Consent sequence

1. Camera and microphone start off.
2. The creator selects microphone, camera, or both.
3. The browser displays its own permission request after a direct button press.
4. PIXIE reports which sources are ready.
5. Recording starts only after another button action or a recognized explicit vocal command.
6. A persistent status announces recording and duration.
7. Stop creates a browser-local preview; discard destroys the current object URL and stops device tracks.
8. Download is a private device action. It does not mean approval to transcribe, upload, publish, or archive.

## Deployment requirements

- Use HTTPS in production; `localhost` is acceptable during development.
- Preserve the `Permissions-Policy` restriction to `self` for camera, microphone,
  and display capture. Geolocation remains disabled.
- Test Safari on iPad/iPhone separately; media formats and speech recognition vary
  by browser and operating-system version.
- Keep visible button controls even where vocal commands work.
- Do not request device access on page load or treat prior browser permission as
  permission to begin recording.

## Next build

- Add screen/window capture as a separately selected source using `getDisplayMedia`.
- Add an accessible input-level meter without storing analysis data.
- Define the verified Loptr Lab DAW import/export contract before claiming direct import.
- Produce a creator-approved production manifest only after a take is downloaded.
- Add local/offline transcription as a separately approved derivation when a suitable
  engine and device performance are verified.
- Add automated browser tests plus manual iPad, VoiceOver, keyboard, 200% zoom, and
  reduced-motion observations.

## Prohibited defaults

- No passive or wake-word listening in the web prototype.
- No background recording.
- No face recognition, identity matching, emotion analysis, medical interpretation,
  or behavioral scoring.
- No automatic upload, transcription, AT record, Audio.com handoff, or Obsidian move.
- No Alexa+ instruction may bypass the browser's device permission or PIXIE's visible
  recording confirmation.
