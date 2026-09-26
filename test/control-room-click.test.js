import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("first-five desktop opens Intake and retains the Made Sick participant route", async () => {
  const html = await readFile(new URL("../public/radar.html", import.meta.url), "utf8");
  assert.match(html, /addIcon\('PIXIE'.*openWin\?\.\('intake'\)/);
  assert.match(html, /el\.addEventListener\('click',openFn\)/);
  assert.match(html, /params\.get\('role'\)==='participant'\) frame\.src='radar-core\.html'\+location\.search/);
  assert.match(html, /host\.querySelector\('#edit-action'\).*renderStage\(6\)/);
  assert.match(html, /host\.querySelector\('#undo-demo'\).*renderStage\(5\)/);
});
