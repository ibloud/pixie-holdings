import test from "node:test";
import assert from "node:assert/strict";
import { buildAgentCatalog, buildAgentContext, routeAgentResult } from "../src/ai/router.js";

test("agent catalog is derived from PIXIE Core", () => {
  const catalog = buildAgentCatalog();
  assert.equal(catalog.length, 3);
  assert.equal(catalog[0].actions.length, 2);
  assert.ok(catalog.some(item => item.id === "float-works"));
});

test("agent context contains only governed holding and action identifiers", () => {
  const context = JSON.parse(buildAgentContext());
  assert.equal(context.rule.includes("Do not invent"), true);
  assert.ok(context.holdings.every(item => item.actions.every(action => action.id)));
});

test("allocation intent routes into a Core preview", () => {
  const result = routeAgentResult({
    reply: "I can preview that allocation.",
    intent: "allocation",
    command: { name: "evaluate_allocation", arguments: { holdingId: "float-works", actionId: "originalize" } },
    requiresConfirmation: false
  });
  assert.equal(result.routed, true);
  assert.equal(result.requiresConfirmation, true);
  assert.equal(result.preview.consequence.holding, "Float Works");
});

test("unsupported commands never execute", () => {
  const result = routeAgentResult({
    reply: "No execution available.",
    intent: "file",
    command: { name: "move_file", arguments: {} },
    requiresConfirmation: true
  });
  assert.equal(result.routed, false);
  assert.equal(result.preview, undefined);
});
