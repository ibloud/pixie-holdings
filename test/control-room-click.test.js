import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("desktop keeps Creator Control Room, Intake, and Radar distinct", async () => {
  const html = await readFile(new URL("../public/radar.html", import.meta.url), "utf8");
  assert.match(html, /addIcon\('PIXIE'.*openWin\?\.\('creator-control'\)/);
  assert.match(html, /addIcon\('Intake'.*openWin\?\.\('intake'\)/);
  assert.match(html, /addIcon\('Radar'.*openWin\?\.\('control'\)/);
  assert.match(html, /pixie-creator-os\/\?from=superme/);
  assert.match(html, /src="control-room\.html"/);
  assert.match(html, /el\.addEventListener\('click',openFn\)/);
  assert.match(html, /params\.get\('role'\)==='participant'\) frame\.src='radar-core\.html'\+location\.search/);
  assert.match(html, /host\.querySelector\('#edit-action'\).*renderStage\(6\)/);
  assert.match(html, /host\.querySelector\('#undo-demo'\).*renderStage\(5\)/);
  assert.match(html, /icons\.appendChild\(trainingIcon\)/);
  assert.doesNotMatch(html, /\.demo-window\{[^}]*\b(?:left|top|width|height):[^;}]*!important/);
});
