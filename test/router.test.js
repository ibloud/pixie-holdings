import test from "node:test";
import assert from "node:assert/strict";
import { buildAgentCatalog, buildAgentContext, routeAgentResult } from "../src/ai/router.js";

test("agent catalog is derived from PIXIE Core", () => {
  const catalog = buildAgentCatalog();
  assert.ok(catalog.length > 0);
  assert.ok(catalog.every(holding => holding.id && holding.actions.every(action => action.id)));
  assert.match(buildAgentContext(), /Choose only identifiers present in this catalog/);
});

test("supported allocation command routes to a governed preview", () => {
  const result = routeAgentResult({ reply: "Previewing it.", intent: "allocation", requiresConfirmation: true, command: { name: "evaluate_allocation", arguments: { holdingId: "float-works", actionId: "originalize" } } });
  assert.equal(result.routed, true);
  assert.equal(result.preview.governance, "preview-only");
  assert.equal(result.preview.consequence.delta.rights, 18);
});

test("invalid allocation identifiers are rejected at the Core boundary", () => {
  const result = routeAgentResult({ reply: "No.", intent: "allocation", requiresConfirmation: true, command: { name: "evaluate_allocation", arguments: { holdingId: "invented", actionId: "invented" } } });
  assert.equal(result.routed, false);
  assert.equal(result.routeError.code, "INVALID_COMMAND_ARGUMENTS");
});

test("unsupported commands never execute", () => {
  const result = routeAgentResult({ command: { name: "execute_everything", arguments: {} } });
  assert.equal(result.routed, false);
  assert.equal(result.preview, undefined);
});
