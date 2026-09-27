import assert from "node:assert/strict";
import { once } from "node:events";
import { request } from "node:http";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createPreviewServer, isWithinRoot } from "../server.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
assert.ok(isWithinRoot(root, resolve(root, "index.html")));
assert.ok(!isWithinRoot(root, resolve(root, "..", "outside.html")));
assert.ok(
  !isWithinRoot(
    root,
    resolve(`${root.replace(/[\\/]$/, "")}-private`, "index.html"),
  ),
  "A sibling directory sharing the root prefix must not be served",
);

const read = (port, path) =>
  new Promise((resolveRequest, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () =>
        resolveRequest({
          status: response.statusCode,
          headers: response.headers,
          body: Buffer.concat(chunks).toString("utf8"),
        }),
      );
      response.on("error", reject);
    });
    req.on("error", reject);
    req.end();
  });

const server = createPreviewServer({ root });
server.listen(0, "127.0.0.1");
await once(server, "listening");
try {
  const port = server.address().port;
  const home = await read(port, "/");
  assert.equal(home.status, 200);
  assert.match(home.headers["content-type"], /^text\/html/);
  assert.match(home.body, /<title>David Wong/);
  const script = await read(port, "/song-picker.js");
  assert.equal(script.status, 200);
  assert.match(script.headers["content-type"], /^text\/javascript/);
  assert.equal(
    (await read(port, "/file-that-does-not-exist.html")).status,
    404,
  );
  assert.equal((await read(port, "/assets")).status, 404);
  for (const path of ["/%", "/%C0%AF", "/%00"]) {
    assert.equal(
      (await read(port, path)).status,
      400,
      `Malformed path ${path}`,
    );
  }
  assert.equal(
    (await read(port, "/")).status,
    200,
    "The server must remain available after malformed requests",
  );
} finally {
  await new Promise((resolveClose, reject) =>
    server.close((error) => (error ? reject(error) : resolveClose())),
  );
}

// Serve a nested existing directory to test traversal to a real outside file.
const photoServer = createPreviewServer({
  root: resolve(root, "assets/photos/small"),
});
photoServer.listen(0, "127.0.0.1");
await once(photoServer, "listening");
try {
  const port = photoServer.address().port;
  assert.equal((await read(port, "/frame-01.webp")).status, 200);
  for (const path of ["/%2e%2e%2fframe-01.webp", "/%2e%2e%5cframe-01.webp"]) {
    assert.equal(
      (await read(port, path)).status,
      404,
      `Traversal path ${path}`,
    );
  }
} finally {
  await new Promise((resolveClose, reject) =>
    photoServer.close((error) => (error ? reject(error) : resolveClose())),
  );
}

console.log(
  "Validated preview responses, malformed URL recovery, and root containment.",
);
