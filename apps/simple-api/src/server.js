import http from "node:http";
import { fileURLToPath } from "node:url";

const version = process.env.APP_VERSION || "v1";
const port = Number(process.env.PORT || 8080);

export function createServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const body = JSON.stringify({
      service: "simple-api",
      version,
      timestamp: new Date().toISOString()
    });

    if (url.pathname === "/health") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ status: "ok", version }));
      return;
    }

    if (url.pathname === "/api/version") {
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type": "application/json"
      });
      response.end(body);
      return;
    }

    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not found" }));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer().listen(port, () => {
    console.log(`simple-api ${version} listening on ${port}`);
  });
}
