import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { buildReceipt } from "./atproto.js";
import { previewFileAction } from "./file-stewardship.js";
import { prepareMediaPackage } from "./media.js";
import { evaluateAllocation, holdings, initialLedger } from "./model.js";

export const MCP_PROTOCOL_VERSION = "2025-11-25";
const root = fileURLToPath(new URL("../public/", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };

export const toolDefinitions = [
  {
    name: "prepare_media_package",
    description: "Prepare a consent-bounded DAW or media handoff for Plyr and Audio.com without uploading files.",
    inputSchema: {
      type: "object",
      required: ["title", "assetKind", "filename"],
      properties: {
        title: { type: "string" }, assetKind: { type: "string" }, filename: { type: "string" },
        mediaUrl: { type: "string" }, mimeType: { type: "string" }, visibility: { type: "string" },
        description: { type: "string" }, license: { type: "string" }, rightsStatus: { type: "string" },
        sourceProject: { type: "string" }, audioComUrl: { type: "string" }, tags: { type: "array", items: { type: "string" } },
        captions: { type: "array", items: { type: "object" } }
      },
      additionalProperties: false
    }
  },
  {
    name: "preview_file_action",
    description: "Preview a reversible move inside an Obsidian vault without changing any file.",
    inputSchema: {
      type: "object",
      required: ["sourcePath", "destinationFolder"],
      properties: { sourcePath: { type: "string" }, destinationFolder: { type: "string" }, reason: { type: "string" } },
      additionalProperties: false
    }
  },
  {
    name: "list_holdings",
    description: "List the synthetic Loptr Lab holdings and available allocation choices.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false }
  },
  {
    name: "evaluate_allocation",
    description: "Preview the ledger consequences of one fictional portfolio allocation.",
    inputSchema: {
      type: "object",
      required: ["holdingId", "actionId"],
      properties: {
        holdingId: { type: "string" },
        actionId: { type: "string" },
        ledger: { type: "object" }
      },
      additionalProperties: false
    }
  },
  {
    name: "prepare_public_receipt",
    description: "Prepare, but do not publish, an AT Protocol-compatible receipt for an approved synthetic decision.",
    inputSchema: {
      type: "object",
      required: ["holding", "action", "summary"],
      properties: {
        holding: { type: "string" }, action: { type: "string" }, summary: { type: "string" }, sourceUrl: { type: "string" }
      },
      additionalProperties: false
    }
  }
];

function jsonRpcResult(id, result) { return { jsonrpc: "2.0", id, result }; }
function jsonRpcError(id, code, message) { return { jsonrpc: "2.0", id: id ?? null, error: { code, message } }; }

export async function handleMcp(message) {
  const { id, method, params = {} } = message ?? {};
  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "pixie-holdings", version: "0.1.0" },
      instructions: "All figures are synthetic. Preview decisions and receipts; never infer health or publish without explicit approval."
    });
  }
  if (method === "notifications/initialized") return null;
  if (method === "tools/list") return jsonRpcResult(id, { tools: toolDefinitions });
  if (method === "tools/call") {
    try {
      const name = params.name;
      const args = params.arguments ?? {};
      let structuredContent;
      if (name === "list_holdings") structuredContent = { holdings };
      else if (name === "evaluate_allocation") structuredContent = evaluateAllocation(args.ledger ?? initialLedger, args.holdingId, args.actionId);
      else if (name === "preview_file_action") structuredContent = previewFileAction(args);
      else if (name === "prepare_media_package") structuredContent = prepareMediaPackage(args);
      else if (name === "prepare_public_receipt") structuredContent = { preview: true, published: false, record: buildReceipt(args) };
      else return jsonRpcError(id, -32602, `Unknown tool: ${name}`);
      return jsonRpcResult(id, {
        content: [{ type: "text", text: JSON.stringify(structuredContent) }],
        structuredContent,
        isError: false
      });
    } catch (error) {
      return jsonRpcResult(id, { content: [{ type: "text", text: error.message }], isError: true });
    }
  }
  return jsonRpcError(id, -32601, `Method not found: ${method}`);
}

async function parseJson(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error("Request too large");
  }
  return JSON.parse(body || "{}");
}

export function createAppServer() {
  return createServer(async (request, response) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Permissions-Policy", "camera=(self), microphone=(self), display-capture=(self), geolocation=()");
    if (request.url === "/health") {
      response.writeHead(200, { "Content-Type": "application/json" });
      return response.end(JSON.stringify({ ok: true, protocolVersion: MCP_PROTOCOL_VERSION }));
    }
    if (request.url === "/mcp" && request.method === "POST") {
      try {
        const body = await parseJson(request);
        const result = await handleMcp(body);
        response.writeHead(result === null ? 202 : 200, { "Content-Type": "application/json", "MCP-Protocol-Version": MCP_PROTOCOL_VERSION });
        return response.end(result === null ? "" : JSON.stringify(result));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        return response.end(JSON.stringify(jsonRpcError(null, -32700, error.message)));
      }
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405); return response.end("Method not allowed");
    }
    const pathname = new URL(request.url, "http://localhost").pathname;
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = normalize(join(root, relative));
    if (!file.startsWith(root)) { response.writeHead(403); return response.end("Forbidden"); }
    try {
      const content = await readFile(file);
      response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(404); response.end("Not found");
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  createAppServer().listen(port, () => console.log(`PIXIE Holdings listening on http://localhost:${port}`));
}
