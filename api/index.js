import { createAppServer } from "../src/app.js";

const app = createAppServer();

export default function handler(request, response) {
  const originalUrl = request.url || "/";
  if (originalUrl === "/api/health") request.url = "/health";
  if (originalUrl === "/api/mcp") request.url = "/mcp";
  app.emit("request", request, response);
}
