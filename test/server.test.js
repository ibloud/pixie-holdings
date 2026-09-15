import test from "node:test";
import assert from "node:assert/strict";
import { createAppServer, handleMcp, MCP_PROTOCOL_VERSION } from "../src/server.js";

async function withServer(run){
  const server=createAppServer();
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const address=server.address();
  try{await run(`http://127.0.0.1:${address.port}`)}finally{await new Promise(resolve=>server.close(resolve))}
}

test("health reports MCP protocol version and AI status",()=>withServer(async base=>{
  const response=await fetch(`${base}/health`);
  assert.equal(response.status,200);
  assert.deepEqual(await response.json(),{ok:true,protocolVersion:MCP_PROTOCOL_VERSION,ai:false});
}));

test("serves the accessible game",()=>withServer(async base=>{
  const response=await fetch(base);
  assert.equal(response.status,200);
  assert.equal(response.headers.get("permissions-policy"),"camera=(self), microphone=(self), display-capture=(self), geolocation=()");
  const html=await response.text();
  assert.match(html,/Can your portfolio grow/);
  assert.match(html,/Request selected access/);
  assert.match(html,/No passive listening/);
}));

test("MCP initializes with PIXIE Core as authority",async()=>{
  const result=await handleMcp({jsonrpc:"2.0",id:1,method:"initialize",params:{}});
  assert.equal(result.result.protocolVersion,MCP_PROTOCOL_VERSION);
  assert.match(result.result.instructions,/PIXIE Core/);
});

test("MCP initializes and lists tools",()=>withServer(async base=>{
  const initialize=await fetch(`${base}/mcp`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"initialize",params:{}})});
  assert.equal((await initialize.json()).result.protocolVersion,MCP_PROTOCOL_VERSION);
  const list=await fetch(`${base}/mcp`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:2,method:"tools/list",params:{}})});
  assert.equal((await list.json()).result.tools.length,5);
}));

test("MCP file tool previews without applying a move",()=>withServer(async base=>{
  const response=await fetch(`${base}/mcp`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:4,method:"tools/call",params:{name:"preview_file_action",arguments:{sourcePath:"00 Inbox/note.md",destinationFolder:"20 Sources"}}})});
  const body=await response.json();
  assert.equal(body.result.structuredContent.consequence.destinationPath,"20 Sources/note.md");
  assert.equal(body.result.structuredContent.consequence.applied,false);
  assert.equal(body.result.structuredContent.consequence.publication,"private");
  assert.equal(body.result.structuredContent.requiresConfirmation,true);
}));

test("MCP media tool prepares a handoff without upload",()=>withServer(async base=>{
  const response=await fetch(`${base}/mcp`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:5,method:"tools/call",params:{name:"prepare_media_package",arguments:{title:"Review mix",assetKind:"mix",filename:"review-mix.wav",visibility:"unlisted"}}})});
  const body=await response.json();
  assert.equal(body.result.structuredContent.consequence.audioCom.compatible,true);
  assert.equal(body.result.structuredContent.consequence.uploaded,false);
  assert.equal(body.result.structuredContent.requiresConfirmation,true);
}));

test("MCP allocation tool returns governed structured content",()=>withServer(async base=>{
  const response=await fetch(`${base}/mcp`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:3,method:"tools/call",params:{name:"evaluate_allocation",arguments:{holdingId:"float-works",actionId:"originalize"}}})});
  const body=await response.json();
  assert.equal(body.result.structuredContent.consequence.holding,"Float Works");
  assert.equal(body.result.structuredContent.requiresConfirmation,true);
  assert.equal(body.result.isError,false);
}));
