import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { askGemini } from "./ai/gemini.js";
import { buildAgentContext, routeAgentResult } from "./ai/router.js";
import { listHoldings, listDeviceCapabilities, prepareMedia, prepareReceipt, previewAllocation, previewDevice, previewFile } from "./pixie/core.js";

export const MCP_PROTOCOL_VERSION = "2025-11-25";
const root = fileURLToPath(new URL("../public/", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };
const MAX_BODY_BYTES = 16_384;
const AGENT_WINDOW_MS = 10 * 60 * 1000;
const AGENT_MAX_REQUESTS = Number(process.env.AGENT_MAX_REQUESTS || 30);
const agentBuckets = new Map();

export const toolDefinitions = [
  { name: "prepare_media_package", description: "Prepare a consent-bounded DAW or media handoff for Plyr and Audio.com without uploading files.", inputSchema: { type: "object", required: ["title", "assetKind", "filename"], properties: { title: { type: "string" }, assetKind: { type: "string" }, filename: { type: "string" }, mediaUrl: { type: "string" }, mimeType: { type: "string" }, visibility: { type: "string" }, description: { type: "string" }, license: { type: "string" }, rightsStatus: { type: "string" }, sourceProject: { type: "string" }, audioComUrl: { type: "string" }, tags: { type: "array", items: { type: "string" } }, captions: { type: "array", items: { type: "object" } } }, additionalProperties: false } },
  { name: "preview_file_action", description: "Preview a reversible move inside an Obsidian vault without changing any file.", inputSchema: { type: "object", required: ["sourcePath", "destinationFolder"], properties: { sourcePath: { type: "string" }, destinationFolder: { type: "string" }, reason: { type: "string" } }, additionalProperties: false } },
  { name: "list_holdings", description: "List the synthetic Loptr Lab holdings and available allocation choices.", inputSchema: { type: "object", properties: {}, additionalProperties: false } },
  { name: "evaluate_allocation", description: "Preview the ledger consequences of one fictional portfolio allocation.", inputSchema: { type: "object", required: ["holdingId", "actionId"], properties: { holdingId: { type: "string" }, actionId: { type: "string" }, ledger: { type: "object" } }, additionalProperties: false } },
  { name: "prepare_public_receipt", description: "Prepare, but do not publish, an AT Protocol-compatible receipt for an approved synthetic decision.", inputSchema: { type: "object", required: ["holding", "action", "summary"], properties: { holding: { type: "string" }, action: { type: "string" }, summary: { type: "string" }, sourceUrl: { type: "string" } }, additionalProperties: false } },
  { name: "list_device_capabilities", description: "List the device-independence lifecycle choices and governance boundary.", inputSchema: { type: "object", properties: {}, additionalProperties: false } },
  { name: "preview_device", description: "Assess an existing device's capabilities and lifecycle options without choosing replacement, transfer, wiping, repair, or recycling.", inputSchema: { type: "object", required: ["id", "kind"], properties: { id: { type: "string" }, kind: { type: "string" }, ownerRef: { type: "string" }, ageYears: { type: "number" }, capabilities: { type: "array", items: { type: "string" } }, accessibility: { type: "array", items: { type: "string" } }, softwareCompatibility: { type: "array", items: { type: "string" } }, repairability: { type: "string" }, batteryCondition: { type: "string" }, localData: { type: "boolean" }, role: { type: "string" } }, additionalProperties: false } }
];

function jsonRpcResult(id, result) { return { jsonrpc: "2.0", id, result }; }
function jsonRpcError(id, code, message) { return { jsonrpc: "2.0", id: id ?? null, error: { code, message } }; }

export async function handleMcp(message) {
  const { id, method, params = {} } = message ?? {};
  if (method === "initialize") return jsonRpcResult(id, { protocolVersion: MCP_PROTOCOL_VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: { name: "pixie-holdings", version: "0.1.0" }, instructions: "PIXIE Core is authoritative for governed actions. All figures are synthetic. Preview consequences and receipts; require explicit consent before consequential execution or publication. Device lifecycle assessments do not choose replacement or disposal outcomes." });
  if (method === "notifications/initialized") return null;
  if (method === "tools/list") return jsonRpcResult(id, { tools: toolDefinitions });
  if (method === "tools/call") {
    try {
      const name = params.name;
      const args = params.arguments ?? {};
      let structuredContent;
      if (name === "list_holdings") structuredContent = listHoldings();
      else if (name === "evaluate_allocation") structuredContent = previewAllocation({ ledger: args.ledger, holdingId: args.holdingId, actionId: args.actionId });
      else if (name === "preview_file_action") structuredContent = previewFile(args);
      else if (name === "prepare_media_package") structuredContent = prepareMedia(args);
      else if (name === "prepare_public_receipt") structuredContent = prepareReceipt(args);
      else if (name === "list_device_capabilities") structuredContent = listDeviceCapabilities();
      else if (name === "preview_device") structuredContent = previewDevice(args);
      else return jsonRpcError(id, -32602, `Unknown tool: ${name}`);
      return jsonRpcResult(id, { content: [{ type: "text", text: JSON.stringify(structuredContent) }], structuredContent, isError: false });
    } catch (error) {
      return jsonRpcResult(id, { content: [{ type: "text", text: error.message }], isError: true });
    }
  }
  return jsonRpcError(id, -32601, `Method not found: ${method}`);
}

async function parseJson(request) {
  let body = "";
  for await (const chunk of request) { body += chunk; if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw Object.assign(new Error("Request too large"), { code: "REQUEST_TOO_LARGE" }); }
  try { return JSON.parse(body || "{}"); } catch { throw Object.assign(new Error("Invalid JSON"), { code: "INVALID_JSON" }); }
}

function clientKey(request) {
  return request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown";
}

function allowAgentRequest(request) {
  const now = Date.now();
  const key = clientKey(request);
  const bucket = agentBuckets.get(key);
  if (!bucket || now - bucket.startedAt >= AGENT_WINDOW_MS) { agentBuckets.set(key, { startedAt: now, count: 1 }); return true; }
  if (bucket.count >= AGENT_MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

async function handleAgent(request, response) {
  const requestId = randomUUID();
  response.setHeader("X-Request-Id", requestId);
  if (!allowAgentRequest(request)) return sendJson(response, 429, { error: { code: "RATE_LIMITED", message: "Too many assistant requests. Try again later." } });
  try {
    const body = await parseJson(request);
    const result = await askGemini(body.message, { context: buildAgentContext() });
    return sendJson(response, 200, routeAgentResult(result));
  } catch (error) {
    const code = error.code === "REQUEST_TOO_LARGE" ? "REQUEST_TOO_LARGE" : error.code === "INVALID_JSON" ? "INVALID_JSON" : error.message === "message is required" ? "INVALID_REQUEST" : "AI_UNAVAILABLE";
    const status = code === "REQUEST_TOO_LARGE" || code === "INVALID_JSON" || code === "INVALID_REQUEST" ? 400 : 502;
    return sendJson(response, status, { error: { code, message: code === "AI_UNAVAILABLE" ? "The assistant is temporarily unavailable; PIXIE's core controls still work." : error.message }, requestId });
  }
}

function sendJson(response, status, body, extraHeaders = {}) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...extraHeaders });
  return response.end(JSON.stringify(body));
}

export function createAppServer() {
  return createServer(async (request, response) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Permissions-Policy", "camera=(self), microphone=(self), display-capture=(self), geolocation=()");
    if (request.url === "/health") return sendJson(response, 200, { ok: true, protocolVersion: MCP_PROTOCOL_VERSION, ai: Boolean(process.env.GEMINI_API_KEY) });
    if (request.url === "/api/agent" && request.method === "POST") return handleAgent(request, response);
    if (request.url === "/mcp" && request.method === "POST") {
      try {
        const body = await parseJson(request);
        const result = await handleMcp(body);
        response.writeHead(result === null ? 202 : 200, { "Content-Type": "application/json", "MCP-Protocol-Version": MCP_PROTOCOL_VERSION });
        return response.end(result === null ? "" : JSON.stringify(result));
      } catch (error) { return sendJson(response, 400, jsonRpcError(null, -32700, error.message)); }
    }
    if (request.method !== "GET" && request.method !== "HEAD") { response.writeHead(405); return response.end("Method not allowed"); }
    const pathname = new URL(request.url, "http://localhost").pathname;
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = normalize(join(root, relative));
    if (!file.startsWith(root)) { response.writeHead(403); return response.end("Forbidden"); }
    try { const content = await readFile(file); response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" }); response.end(request.method === "HEAD" ? undefined : content); }
    catch { response.writeHead(404); response.end("Not found"); }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  createAppServer().listen(port, () => console.log(`PIXIE Holdings listening on http://localhost:${port}`));
}