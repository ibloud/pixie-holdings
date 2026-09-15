import test from "node:test";
import assert from "node:assert/strict";
import { previewAllocation, previewFile, prepareReceipt, summarizeLedger } from "../src/pixie/core.js";
import { initialLedger } from "../src/model.js";

test("allocation remains a governed preview", () => {
  const result = previewAllocation({ ledger: initialLedger, holdingId: "float-works", actionId: "originalize" });
  assert.equal(result.allowed, true);
  assert.equal(result.requiresConfirmation, true);
  assert.equal(result.governance, "preview-only");
  assert.equal(result.consequence.consequence.delta.rights, 18);
});

test("file action remains reversible and unapplied", () => {
  const result = previewFile({ sourcePath: "00 Inbox/example.md", destinationFolder: "10 Projects", reason: "organize" });
  assert.equal(result.requiresConfirmation, true);
  assert.equal(result.rollbackAvailable, true);
  assert.equal(result.consequence.applied, false);
});

test("receipts are prepared but not published", () => {
  const result = prepareReceipt({ holding: "Float Works", action: "originalize", summary: "Preview" });
  assert.equal(result.consequence.published, false);
  assert.equal(result.governance, "publication-disabled");
});

test("ledger summaries remain deterministic", () => {
  assert.equal(summarizeLedger().ledger.cash, 100);
});
