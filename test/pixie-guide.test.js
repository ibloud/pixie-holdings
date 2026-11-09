import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=name=>readFile(new URL('../public/'+name,import.meta.url),'utf8');
test('every Holdings entry reuses the single stylesheet and shared persistent guide',async()=>{
 const pages=(await readdir(new URL('../public/',import.meta.url))).filter(n=>n.endsWith('.html'));
 assert.equal(pages.length,8);
 for(const page of pages){const html=await read(page);assert.equal((html.match(/src="\/pixie-guide.js" defer/g)||[]).length,1,page);assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1,page);assert.doesNotMatch(html,/<style\b|\sstyle=/i,page);}
});
test('approved canonical sigil is reused byte-identically rather than replaced',async()=>{
 const bytes=await readFile(new URL('../public/pixie-companion-sigil.png',import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),'8900781e2d0c5f8873ccc975395253fb5c609a92077a74940af121c9317eed12');
 const core=await read('radar-core.html');assert.match(core,/class="pixie-desktop-mark" src="\/pixie-companion-sigil.png"/);assert.doesNotMatch(core,/icon-face hs-static-13">🤖/);assert.match(core,/Scripted local demo · no live assistant/);
});
test('guidance routes use existing surfaces and cannot forward navigation identity',async()=>{
 const js=await read('pixie-guide.js');assert.match(js,/https:\/\/pixie-project-companion-production.up.railway.app\//);assert.doesNotMatch(js,/location\.search|URLSearchParams|fetch\(|innerHTML/);assert.match(js,/no-referrer/);
 const index=await read('index.html');assert.match(index,/Gods of Mayhem — Play, Read, Test, Contribute/);assert.match(index,/href="https:\/\/loptrlab.com\/mayhem\/"/);assert.doesNotMatch(index,/href="https:\/\/pixie.pckt.blog/);assert.match(index,/a dedicated published reader page was not found/);
});
test('launcher geometry and accessibility are centralized, including safe areas and reduced motion',async()=>{
 const css=await read('styles.css');assert.match(css,/--pixie-edge: 16px/);assert.match(css,/env\(safe-area-inset-right\)/);assert.match(css,/env\(safe-area-inset-bottom\)/);assert.match(css,/\.pixie-launcher:focus-visible/);assert.match(css,/@media \(prefers-reduced-motion: reduce\)[^}]*\.pixie-launcher/);
});
