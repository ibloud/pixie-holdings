import test from "node:test";
import assert from "node:assert/strict";
import { askGemini } from "../src/ai/gemini.js";

test("Gemini adapter has a deterministic local fallback without a key", async () => {
  const result = await askGemini("hello", { apiKey: "" });
  assert.equal(result.intent, "general");
  assert.equal(result.fallback, true);
  assert.equal(result.requiresConfirmation, false);
});
