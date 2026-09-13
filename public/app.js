import { evaluateAllocation, holdings, initialLedger, outcomeFor } from "/model.js";

const ledgerNode = document.querySelector("#ledger");
const holdingsNode = document.querySelector("#holdings");
const previewNode = document.querySelector("#preview");
const previewCopy = document.querySelector("#preview-copy");
const previewDeltas = document.querySelector("#preview-deltas");
const outcomeNode = document.querySelector("#outcome");
const statusNode = document.querySelector("#status");
const receiptButton = document.querySelector("#receipt");
const receiptOutput = document.querySelector("#receipt-output");
const fullscreenButton = document.querySelector("#fullscreen");
const windowedButton = document.querySelector("#windowed");
const modeLabel = document.querySelector("#mode-label");
let ledger = loadLedger();
let proposed = null;
let approved = loadApproved();
let captureStream = null;
let mediaRecorder = null;
let captureChunks = [];
let captureUrl = null;
let captureStartedAt = 0;
let captureTimer = null;
let speechRecognition = null;
let discardPending = false;

function loadLedger(){try{return JSON.parse(localStorage.getItem("pixie-ledger"))??{...initialLedger}}catch{return{...initialLedger}}}
function loadApproved(){try{return JSON.parse(localStorage.getItem("pixie-approved"))??[]}catch{return[]}}
function announce(message){statusNode.textContent="";requestAnimationFrame(()=>{statusNode.textContent=message})}
function captureNodes(){return{mic:document.querySelector("#use-microphone"),camera:document.querySelector("#use-camera"),enable:document.querySelector("#enable-capture"),start:document.querySelector("#start-recording"),stop:document.querySelector("#stop-recording"),discard:document.querySelector("#discard-recording"),state:document.querySelector("#capture-state"),time:document.querySelector("#capture-time"),preview:document.querySelector("#capture-preview"),download:document.querySelector("#download-recording"),voice:document.querySelector("#voice-controls"),voiceSupport:document.querySelector("#voice-support")}}
function updateCaptureState(message,recording=false){const {state}=captureNodes();state.textContent=message;state.classList.toggle("recording-now",recording);announce(message)}
function stopCaptureTracks(){captureStream?.getTracks().forEach(track=>track.stop());captureStream=null}
function clearCaptureTimer(){clearInterval(captureTimer);captureTimer=null;captureNodes().time.textContent=""}
function discardCapture(){const n=captureNodes();discardPending=true;if(mediaRecorder?.state==="recording")mediaRecorder.stop();clearCaptureTimer();stopCaptureTracks();if(captureUrl)URL.revokeObjectURL(captureUrl);captureUrl=null;captureChunks=[];n.preview.srcObject=null;n.preview.removeAttribute("src");n.preview.hidden=true;n.download.hidden=true;n.download.removeAttribute("href");n.start.disabled=true;n.stop.disabled=true;n.discard.disabled=true;n.enable.disabled=false;updateCaptureState("Camera off · microphone off · recording discarded")}
async function enableCapture(){const n=captureNodes();if(!n.mic.checked&&!n.camera.checked){updateCaptureState("Choose microphone, camera, or both before requesting access.");return}if(!navigator.mediaDevices?.getUserMedia){updateCaptureState("This browser does not provide camera or microphone capture here.");return}try{captureStream=await navigator.mediaDevices.getUserMedia({audio:n.mic.checked,video:n.camera.checked});n.preview.srcObject=captureStream;n.preview.muted=true;n.preview.hidden=!n.camera.checked;if(n.camera.checked)await n.preview.play();n.enable.disabled=true;n.start.disabled=false;n.discard.disabled=false;updateCaptureState(`${n.camera.checked?"Camera ready":"Camera off"} · ${n.mic.checked?"microphone ready":"microphone off"} · not recording`)}catch(error){updateCaptureState(`Access was not enabled: ${error.name||"permission declined"}. Nothing was recorded.`)}}
function startRecording(){const n=captureNodes();if(!captureStream||typeof MediaRecorder!=="function"){updateCaptureState("Recording is unavailable in this browser or access has not been enabled.");return}discardPending=false;captureChunks=[];mediaRecorder=new MediaRecorder(captureStream);mediaRecorder.addEventListener("dataavailable",event=>{if(event.data.size)captureChunks.push(event.data)});mediaRecorder.addEventListener("stop",()=>{if(discardPending||!captureChunks.length){discardPending=false;captureChunks=[];return}const blob=new Blob(captureChunks,{type:mediaRecorder.mimeType||"video/webm"});if(captureUrl)URL.revokeObjectURL(captureUrl);captureUrl=URL.createObjectURL(blob);n.preview.srcObject=null;n.preview.src=captureUrl;n.preview.muted=false;n.preview.hidden=false;n.download.href=captureUrl;n.download.download=`pixie-private-take-${new Date().toISOString().replaceAll(":","-")}.webm`;n.download.hidden=false;n.discard.disabled=false;updateCaptureState("Recording stopped · private preview ready · nothing uploaded")});mediaRecorder.start();captureStartedAt=Date.now();captureTimer=setInterval(()=>{n.time.textContent=`${Math.floor((Date.now()-captureStartedAt)/1000)} seconds`},1000);n.start.disabled=true;n.stop.disabled=false;n.enable.disabled=true;n.discard.disabled=false;updateCaptureState("Recording now · say or choose stop at any time",true)}
function stopRecording(){if(mediaRecorder?.state!=="recording")return;mediaRecorder.stop();clearCaptureTimer();stopCaptureTracks();const n=captureNodes();n.stop.disabled=true;n.enable.disabled=false;n.start.disabled=true}
function toggleMute(){const track=captureStream?.getAudioTracks()[0];if(!track){updateCaptureState("No active microphone is available to mute.");return}track.enabled=!track.enabled;updateCaptureState(track.enabled?"Microphone unmuted":"Microphone muted")}
function runVoiceCommand(command){if(command.includes("start recording"))startRecording();else if(command.includes("stop recording"))stopRecording();else if(command.includes("discard recording"))discardCapture();else if(command.includes("mute microphone"))toggleMute();else updateCaptureState(`Command not recognized: ${command}`)}
function enableVoiceControls(){const Recognition=globalThis.SpeechRecognition||globalThis.webkitSpeechRecognition;const n=captureNodes();if(!Recognition){n.voice.disabled=true;n.voiceSupport.textContent="This browser does not support the optional speech-command interface. All controls remain available as buttons.";announce(n.voiceSupport.textContent);return}speechRecognition=new Recognition();speechRecognition.continuous=true;speechRecognition.interimResults=false;speechRecognition.addEventListener("result",event=>{const command=event.results[event.results.length-1][0].transcript.trim().toLowerCase();runVoiceCommand(command)});speechRecognition.addEventListener("end",()=>{n.voice.textContent="Enable vocal commands";speechRecognition=null});speechRecognition.start();n.voice.textContent="Stop vocal commands";updateCaptureState("Vocal commands listening · recording remains off until commanded or selected")}
function setWorkspaceMode(mode){
  document.body.classList.toggle("windowed-mode",mode==="windowed");
  modeLabel.textContent=`${mode==="fullscreen"?"Full-screen":"Windowed"} mode · asks before acting`;
  localStorage.setItem("pixie-workspace-mode",mode);
}
function label(key){return({cash:"Cash",capacity:"Human capacity",access:"Accessibility",rights:"Rights clarity",trust:"Trust",pressure:"System pressure"})[key]}
function renderLedger(){ledgerNode.innerHTML=Object.entries(ledger).map(([key,value])=>`<div class="meter"><strong>${label(key)}</strong><span>${value}</span><small>out of 100</small></div>`).join("")}
function renderHoldings(){holdingsNode.innerHTML=holdings.map(holding=>`<article class="holding"><p class="eyebrow">Holding</p><h3>${holding.name}</h3><p>${holding.purpose}</p>${holding.actions.map(action=>`<button type="button" data-holding="${holding.id}" data-action="${action.id}">${action.label}<small> · ${action.cost} cash</small></button>`).join("")}</article>`).join("")}
function openPreview(holdingId,actionId){try{proposed=evaluateAllocation(ledger,holdingId,actionId);previewCopy.textContent=proposed.summary;previewDeltas.innerHTML=Object.entries(proposed.delta).map(([key,value])=>`<div><dt>${label(key)}</dt><dd>${value>0?"+":""}${value}</dd></div>`).join("");previewNode.hidden=false;previewNode.scrollIntoView({block:"center"});document.querySelector("#approve").focus();announce(`Preview ready for ${proposed.holding}: ${proposed.action}. Nothing has happened yet.`)}catch(error){announce(error.message)}}
holdingsNode.addEventListener("click",event=>{const button=event.target.closest("button[data-holding]");if(button)openPreview(button.dataset.holding,button.dataset.action)});
document.querySelector("#approve").addEventListener("click",()=>{if(!proposed)return;ledger=proposed.ledger;approved.push({holding:proposed.holding,action:proposed.action,summary:proposed.summary,approvedAt:new Date().toISOString()});localStorage.setItem("pixie-ledger",JSON.stringify(ledger));localStorage.setItem("pixie-approved",JSON.stringify(approved));previewNode.hidden=true;outcomeNode.textContent=outcomeFor(ledger);receiptButton.disabled=false;renderLedger();announce(`${proposed.action} approved. Portfolio ledgers updated.`);proposed=null});
document.querySelector("#cancel").addEventListener("click",()=>{previewNode.hidden=true;proposed=null;announce("Allocation cancelled. No portfolio values changed.")});
document.querySelector("#restart").addEventListener("click",()=>{ledger={...initialLedger};approved=[];proposed=null;localStorage.removeItem("pixie-ledger");localStorage.removeItem("pixie-approved");previewNode.hidden=true;receiptOutput.hidden=true;receiptButton.disabled=true;outcomeNode.textContent="No allocation has been approved. The portfolio remains entirely under your control.";renderLedger();announce("The synthetic portfolio has restarted.")});
receiptButton.addEventListener("click",()=>{const last=approved.at(-1);if(!last)return;const record={$type:"xyz.ibloud.pixie.holdingDecision",holding:last.holding,action:last.action,summary:last.summary,scenario:"synthetic",createdAt:last.approvedAt};receiptOutput.textContent=JSON.stringify({preview:true,published:false,record},null,2);receiptOutput.hidden=false;receiptOutput.focus();announce("Public receipt preview created. Nothing was published.")});
document.querySelector("#export").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({scenario:"synthetic",ledger,approved,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="pixie-holdings-session.json";link.click();URL.revokeObjectURL(link.href);announce("Private session export prepared on this device.")});
fullscreenButton.addEventListener("click",async()=>{try{await document.documentElement.requestFullscreen();setWorkspaceMode("fullscreen");document.querySelector("#game").scrollIntoView();announce("Full-screen workspace opened. Press Escape to leave at any time.")}catch{announce("This browser did not open full screen. The windowed experience is still available.")}});
windowedButton.addEventListener("click",async()=>{if(document.fullscreenElement)await document.exitFullscreen();setWorkspaceMode("windowed");document.querySelector("#game").scrollIntoView();announce("Windowed workspace selected.")});
document.addEventListener("fullscreenchange",()=>{if(!document.fullscreenElement)setWorkspaceMode("windowed")});
document.querySelector("#enable-capture").addEventListener("click",enableCapture);
document.querySelector("#start-recording").addEventListener("click",startRecording);
document.querySelector("#stop-recording").addEventListener("click",stopRecording);
document.querySelector("#discard-recording").addEventListener("click",discardCapture);
document.querySelector("#voice-controls").addEventListener("click",()=>{if(speechRecognition){speechRecognition.stop();return}enableVoiceControls()});
window.addEventListener("pagehide",()=>{speechRecognition?.stop();stopCaptureTracks();if(captureUrl)URL.revokeObjectURL(captureUrl)});
if(localStorage.getItem("pixie-workspace-mode")==="windowed")setWorkspaceMode("windowed");
renderLedger();renderHoldings();if(approved.length){receiptButton.disabled=false;outcomeNode.textContent=outcomeFor(ledger)}
