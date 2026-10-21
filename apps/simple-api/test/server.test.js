import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "../src/server.js";

test("exposes health and version endpoints", async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const health = await fetch(`http://127.0.0.1:${port}/health`);
  const version = await fetch(`http://127.0.0.1:${port}/api/version`);

  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, "ok");
  assert.equal(version.status, 200);
  assert.equal((await version.json()).service, "simple-api");

  await new Promise((resolve) => server.close(resolve));
});
