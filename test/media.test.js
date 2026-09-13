import assert from "node:assert/strict";
import test from "node:test";
import { prepareMediaPackage } from "../src/media.js";

test("master handoff is Plyr and Audio.com compatible without uploading", () => {
  const result = prepareMediaPackage({
    title: "Synthetic accessibility mix", assetKind: "master", filename: "accessibility-mix-v1.wav",
    mediaUrl: "https://example.invalid/accessibility-mix-v1.wav", mimeType: "audio/wav", visibility: "unlisted",
    captions: [{ src: "captions/accessibility-mix-v1.vtt", srclang: "en", label: "English", default: true }]
  });
  assert.equal(result.plyr.compatible, true);
  assert.equal(result.audioCom.compatible, true);
  assert.equal(result.uploaded, false);
  assert.equal(result.audioCom.uploadStatus, "manual-or-approved-api-required");
  assert.equal(result.originalFilename, "accessibility-mix-v1.wav");
});

test("DAW session remains private production material", () => {
  const result = prepareMediaPackage({ title: "Session", assetKind: "daw-session", filename: "session.logicx" });
  assert.equal(result.plyr.compatible, false);
  assert.equal(result.audioCom.compatible, false);
  assert.equal(result.publication, "private");
});
