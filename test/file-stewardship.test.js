import assert from "node:assert/strict";
import test from "node:test";
import { listFileRoots, previewFileAction } from "../src/file-stewardship.js";

test("file roots expose stable semantic meanings", () => {
  assert.deepEqual(listFileRoots(), [
    { id: "00 Inbox", meaning: "items not yet processed" },
    { id: "10 Projects", meaning: "active work" },
    { id: "20 Sources", meaning: "reference material" },
    { id: "30 Decisions", meaning: "decisions and rationale" },
    { id: "40 Campaigns", meaning: "active communications and organizing" },
    { id: "90 Attachments", meaning: "supporting material that belongs with something else" }
  ]);
});

test("file action preserves the original filename and creates rollback", () => {
  const result = previewFileAction({ sourcePath: "00 Inbox/creator-sketch.png", destinationFolder: "90 Attachments", reason: "Preserve project evidence" });
  assert.equal(result.originalFilename, "creator-sketch.png");
  assert.equal(result.destinationPath, "90 Attachments/creator-sketch.png");
  assert.equal(result.applied, false);
  assert.equal(result.rollbackAction.destinationPath, "00 Inbox/creator-sketch.png");
});

test("file action rejects destinations outside the vault contract", () => {
  assert.throws(() => previewFileAction({ sourcePath: "00 Inbox/note.md", destinationFolder: "../Public" }), /approved vault folder/);
});
