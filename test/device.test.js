import test from "node:test";
import assert from "node:assert/strict";
import { listDeviceCapabilities, previewDevice } from "../src/pixie/core.js";

test("device capabilities expose owner-controlled lifecycle choices", () => {
  const result = listDeviceCapabilities();
  assert.deepEqual(result.choices, ["keep-in-service", "repair", "repurpose", "transfer", "recycle"]);
  assert.equal(result.ownerAuthority, true);
});

test("device assessment does not make a replacement decision", () => {
  const result = previewDevice({
    id: "iphone-12-pro",
    kind: "smartphone",
    ownerRef: "owner-1",
    ageYears: 5,
    capabilities: ["camera", "mobile-compute"],
    accessibility: ["voice-control"],
    softwareCompatibility: ["pixie-web"],
    repairability: "supported-repair-path",
    batteryCondition: "unknown",
    localData: true,
    role: "companion"
  });

  assert.equal(result.type, "device");
  assert.equal(result.governance, "assessment-only");
  assert.equal(result.execution, "not-permitted");
  assert.equal(result.consequence.decisionAuthority, "owner");
  assert.equal(result.consequence.recommendation, null);
  assert.ok(result.consequence.options.includes("repair"));
  assert.ok(result.consequence.reasons.some((reason) => reason.includes("Local data")));
});
