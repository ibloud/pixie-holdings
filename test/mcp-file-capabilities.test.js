import assert from "node:assert/strict";
import test from "node:test";
import { handleMcp, toolDefinitions } from "../src/server.js";

test("MCP exposes the semantic file capability catalog", async () => {
  const result = await handleMcp({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "list_file_capabilities", arguments: {} } });
  assert.equal(result.result.isError, false);
  assert.deepEqual(result.result.structuredContent.roots.map(root => root.id), [
    "00 Inbox", "10 Projects", "20 Sources", "30 Decisions", "40 Campaigns", "90 Attachments"
  ]);
  assert.equal(result.result.structuredContent.execution, "not-permitted");
});

test("MCP tool catalog includes file capabilities", () => {
  assert.equal(toolDefinitions.some(tool => tool.name === "list_file_capabilities"), true);
});
