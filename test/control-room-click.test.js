import vm from "node:vm";
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
  assert.match(html, /host\.querySelector\('#edit-action'\).*renderStage\(6\)/);
  assert.match(html, /host\.querySelector\('#undo-demo'\).*renderStage\(5\)/);
  assert.match(html, /icons\.appendChild\(trainingIcon\)/);
  assert.doesNotMatch(html, /\.demo-window\{[^}]*\b(?:left|top|width|height):[^;}]*!important/);
});


for (const query of [
  '?role=participant&card=missing&did=did:plc:forged&displayName=Private&milestone=Sensitive&consent=1&return_to=https://evil.example/',
  '?role=participant&card=existing&did=did:plc:forged&public_record_consent=1',
  '?tool=care', ''
]) {
  test('desktop does not forward query data into the iframe: ' + query.split('&')[0], async () => {
    const html = await readFile(new URL('../public/radar.html', import.meta.url), 'utf8');
    const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
      .map(match => match[1]).find(source => source.includes('const frame='));
    assert.ok(script);
    const frame = {src:'radar-core.html?shell=1', contentDocument:null, addEventListener(){}};
    vm.runInNewContext(script, {
      document:{getElementById(id){assert.equal(id,'pixie-core');return frame;}},
      window:{addEventListener(){}},location:{search:query,origin:'https://holdings.example'},
      URLSearchParams, console
    });
    assert.equal(frame.src,'radar-core.html?shell=1');
  });
}
