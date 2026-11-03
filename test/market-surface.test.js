import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initialLedger } from '../src/model.js';

test('home market exposes the synthetic ledger and a reachable radar', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.ticker\{[^}]*white-space:normal/);
  assert.match(html, /href="\/styles.css"/);
  for (const [key, value] of Object.entries(initialLedger)) {
    const label = key === 'capacity' ? 'human capacity' : key === 'access' ? 'accessibility' : key === 'pressure' ? 'system pressure' : key;
    assert.ok(html.includes(`<span>${label}</span><strong class="${key === 'pressure' ? 'warn' : 'good'}">${value}</strong>`));
  }
  assert.match(html, /id="open-market-radar"/);
  assert.match(html, /frame\.src = 'radar\.html\?role=admin'/);
  assert.match(html, /data-market=/);
});
