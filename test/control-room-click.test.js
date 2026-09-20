import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("PIXIE Control Room opens from a normal click", async () => {
  const html = await readFile(new URL("../public/radar.html", import.meta.url), "utf8");
  assert.match(html, /const openControlRoom = \(\) => frame\.contentWindow\.openWin\('control'\)/);
  assert.match(html, /icon\.addEventListener\('click', openControlRoom\)/);
  assert.doesNotMatch(html, /icon\.addEventListener\('dblclick'/);
});
