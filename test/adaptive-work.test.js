import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const root=new URL('../public/',import.meta.url);
test('sample commands remain local and disclose limits for adaptive work and repair',()=>{
 const listeners={};const buttons=['adaptive','repair','repair-sources','repair-resources'].map(command=>({dataset:{reviewCommand:command},addEventListener:(name,fn)=>listeners[command]=fn}));
 const output={replaceChildren(pre){this.text=pre.textContent},focus(){this.focused=true}};const input={value:''};const status={};const form={addEventListener(){}};
 const document={getElementById:id=>({'review-command-form':form,'review-command':input,'review-output':output,'review-progress':status}[id]),createElement:()=>({}),querySelectorAll:()=>buttons};
 const js=fs.readFileSync(new URL('business-review.js',root),'utf8');assert.doesNotMatch(js,/fetch\(|XMLHttpRequest|localStorage|innerHTML/);vm.runInNewContext(js,{document});
 for(const command of Object.keys(listeners)){listeners[command]();assert.ok(output.focused);assert.ok(output.text.length>100);}
 listeners.adaptive();assert.match(output.text,/No generative AI/);assert.match(output.text,/Medicare/);assert.match(output.text,/No Xsens compatibility/);listeners['repair-sources']();assert.match(output.text,/CLOSED/);listeners['repair-resources']();assert.match(output.text,/VERIFIED GRANT FUNDING: None/);
});
