import { createAppServer } from "../src/server.js";

const app = createAppServer();

export default function handler(request, response) {
  app.emit("request", request, response);
}
