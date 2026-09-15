import test from "node:test";
import assert from "node:assert/strict";
import { buildAgentContext, routeAgentResult } from "../src/ai/router.js";

test("agent context includes the Core device and semantic file contracts", () => {
  const context = JSON.parse(buildAgentContext());
  assert.deepEqual(context.deviceCapabilities.choices, ["keep-in-service", "repair", "repurpose", "transfer", "recycle"]);
  assert.equal(context.fileCapabilities.execution, "not-permitted");
  assert.equal(context.fileCapabilities.roots.find(root => root.id === "30 Decisions").meaning, "decisions and rationale");
});

test("device command routes to assessment without execution", () => {
  const result = routeAgentResult({
    reply: "I can assess the device.",
    intent: "device",
    command: {
      name: "preview_device",
      arguments: { id: "ipad-pro", kind: "tablet", capabilities: ["mobile-compute"] }
    },
    requiresConfirmation: false
  });

  assert.equal(result.routed, true);
  assert.equal(result.preview.governance, "assessment-only");
  assert.equal(result.preview.execution, "not-permitted");
  assert.equal(result.preview.consequence.recommendation, null);
});
