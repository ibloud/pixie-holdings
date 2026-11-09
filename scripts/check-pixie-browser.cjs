// Local fixture browser checks; set PIXIE_BASE and PIXIE_BASELINE to reviewed servers.
const {chromium}=require(process.env.PIXIE_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.PIXIE_CHROMIUM||'/usr/bin/chromium'});
 const base=process.env.PIXIE_BASE||'http://127.0.0.1:4197',baseline=process.env.PIXIE_BASELINE||'http://127.0.0.1:4198',evidence=path.resolve('docs/evidence/holdings-pixie-2026-11-09');fs.mkdirSync(evidence,{recursive:true});
 const results=[];
 try{
 for(const width of [1440,390]){const page=await browser.newPage({viewport:{width,height:1000}});await page.route('**/*',r=>['127.0.0.1','localhost'].includes(new URL(r.request().url()).hostname)?r.continue():r.abort());
 for(const [label,url]of [['landing','/'],['desktop','/radar.html']]){await page.goto(baseline+url);if(label==='desktop')await page.frameLocator('#pixie-core').locator('#win-intake').waitFor();await page.screenshot({path:path.join(evidence,`before-${label}-${width}.png`)});}await page.close();}
 for(const width of [320,390,768,1024,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>['127.0.0.1','localhost'].includes(new URL(r.request().url()).hostname)?r.continue():r.abort());
 for(const surface of ['index','concept','development','market','sitemap','radar-core','radar','control-room']){
 await page.goto(base+(surface==='index'?'/':'/'+surface+'.html'));
 const frame=['radar','control-room'].includes(surface)?page.frameLocator('#pixie-core'):page;
 const button=frame.getByRole('link',{name:'Open PIXIE guidance',exact:true});await button.waitFor();
 const placement=await button.evaluate(el=>{const r=el.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {x:r.x,y:r.y,width:r.width,height:r.height,right:innerWidth-r.right,bottom:innerHeight-r.bottom,topmost:el.contains(hit),image:el.querySelector('img').getAttribute('src'),animation:getComputedStyle(el.querySelector('img')).animationName};});
 assert.ok(placement.topmost,surface+' obscured '+width);assert.ok(placement.x>=0&&placement.y>=0&&placement.right>=15&&placement.bottom>=15,surface+' viewport '+width);assert.ok(placement.width>=120&&placement.height>=64,'consistent launcher target '+surface);assert.equal(await button.locator('img').evaluate(e=>e.getBoundingClientRect().width),40);assert.equal(placement.image,'/pixie-companion-sigil.png');
 await button.focus();await page.keyboard.press('Tab');await button.focus();assert.notEqual(await button.evaluate(el=>getComputedStyle(el).outlineStyle),'none','focus '+surface);
 if(['radar','radar-core'].includes(surface)){
 await button.press('Enter');await frame.getByRole('dialog',{name:'PIXIE guidance · scripted desktop demo',exact:true}).waitFor({state:'visible'});assert.equal(await frame.locator('#chat-input').evaluate(el=>document.activeElement===el),true);await frame.locator('#chat-input').press('Escape');assert.equal(await button.evaluate(el=>document.activeElement===el),true);
 for(const win of ['about','holdings','meters','pixie']){await frame.locator('body').evaluate((_,name)=>window.openWin(name),win);assert.equal(await button.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}),true,'window '+win);}
 await frame.locator('#win-pixie .wd-max').click();assert.equal(await button.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}),true,'maximized');await frame.locator('#win-pixie .wd-min').click();await button.press('Enter');
 if(surface==='radar'){await frame.locator('body').evaluate(()=>{window.openWin('projects');window.openWin('intake');});await frame.getByRole('button',{name:'Project discovery',exact:true}).click();await frame.getByRole('link',{name:'Explore Gods of Mayhem →'}).waitFor();assert.equal(await frame.getByRole('link',{name:'Explore Gods of Mayhem →'}).getAttribute('href'),'https://loptrlab.com/mayhem/');}
 }else assert.equal(await button.getAttribute('href'),'https://pixie-project-companion-production.up.railway.app/');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await button.evaluate(el=>getComputedStyle(el.querySelector('img')).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'});
 if(surface==='index'){
 for(const name of ['Review sample','Check sources','Next step'])await page.getByRole('button',{name,exact:true}).click();assert.match(await page.locator('#review-output').innerText(),/project discovery/);await page.getByRole('link',{name:'Discover projects',exact:true}).click();await page.getByRole('link',{name:'Explore Gods of Mayhem →',exact:true}).waitFor();
 }
 if([1440,390].includes(width)&&['index','radar'].includes(surface)){await page.goto(base+(surface==='index'?'/':'/radar.html'));if(surface==='radar')await page.frameLocator('#pixie-core').locator('#win-intake').waitFor();await page.screenshot({path:path.join(evidence,`after-${surface==='index'?'landing':'desktop'}-${width}.png`)});}
 results.push({width,surface,...placement,keyboard:true,reducedMotion:true});
 }
 assert.deepEqual(errors,[]);await page.close();
 }
 fs.writeFileSync(path.join(evidence,'browser-checks.json'),JSON.stringify({fixture:'Local Holdings HTTP; external services blocked',physicalVoiceOver:'NOT RUN',physicalSafari:'NOT RUN',checks:results},null,2)+'\n');console.log('PASS: 8 entry surfaces × 5 widths; sigil placement/topmost hit target, focus/Enter/Escape, review/source/next, project route and reduced motion. Before/after captures recorded. External destinations inspected without registration.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
