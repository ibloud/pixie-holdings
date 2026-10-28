// Browser-only onboarding demonstration. No remote requests, identity or shell execution.
(() => {
 const form=document.getElementById('review-command-form'),input=document.getElementById('review-command'),output=document.getElementById('review-output'),status=document.getElementById('review-progress');
 if(!form)return;
 const seen=new Set();
 const messages={
 help:'PIXIE review console — local sample only\n\nreview   Inspect the sample result\nsources  Check provenance and limits\nnext     Choose an explicit handoff\nclear    Clear this view\n\nThese are demo commands, not installed CLI or MCP tools. Nothing is executed on your computer or published.',
 review:'SAMPLE / report-001\n\nResult: An event promotion draft prepared in a fictional Creator OS workflow.\nState: Draft — not published.\nAudience: Community event attendees.\nRights: Image permission still needs review.\nDecision: Hold publication until the permission is confirmed.\n\nThis is example content, not a retrieved Creator OS report.\nNext command: sources',
 sources:'EVIDENCE / report-001\n\nOrigin: Fictional onboarding example created for this preview.\nCreator attribution: Not assigned to a real creator.\nSource artifact: No external artifact was imported.\nPermission: Unverified — keep the draft private.\nAtmosphere record: None; no record was queried or written.\n\nFor the existing implementation, use the repository and Creator OS links below.\nNext command: next',
 next:'NEXT STEP / you choose\n\n1. Open Creator OS to inspect or prepare actual work.\n2. Join through Made-Sick using its own sign-in and consent flow.\n\nUse the links on this page. No report, identity, consent flag or membership is transferred by this console.'};
 function run(value){const command=value.trim().toLowerCase();const pre=document.createElement('pre');pre.textContent=command==='clear'?'View cleared. Type help to begin.':messages[command]||'Unknown command. Use help, review, sources, next or clear.';output.replaceChildren(pre);if(['review','sources','next'].includes(command))seen.add(command);if(command==='clear')seen.clear();status.textContent=seen.size+' of 3 review steps explored · sample data only';input.value='';}
 form.addEventListener('submit',event=>{event.preventDefault();run(input.value)});
 document.querySelectorAll('[data-review-command]').forEach(button=>button.addEventListener('click',()=>run(button.dataset.reviewCommand)));
})();
