import { createReadStream, realpathSync, statSync } from "node:fs";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export function isWithinRoot(root, filePath) {
  const pathFromRoot = relative(root, filePath);
  return (
    !isAbsolute(pathFromRoot) &&
    pathFromRoot !== ".." &&
    !pathFromRoot.startsWith(`..${sep}`)
  );
}

export function createPreviewServer({ root = process.cwd() } = {}) {
  const documentRoot = realpathSync(resolve(root));
  return createServer((request, response) => {
    const fail = (status, message) => {
      response.writeHead(status, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end(message);
    };
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      if (pathname.includes("\0")) throw new Error("Invalid path");
    } catch {
      fail(400, "Bad request");
      return;
    }
    const relativePath =
      pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = resolve(documentRoot, relativePath);
    if (!isWithinRoot(documentRoot, filePath)) {
      fail(404, "Not found");
      return;
    }
    let resolvedFile;
    try {
      resolvedFile = realpathSync(filePath);
      if (
        !isWithinRoot(documentRoot, resolvedFile) ||
        !statSync(resolvedFile).isFile()
      ) {
        fail(404, "Not found");
        return;
      }
    } catch {
      fail(404, "Not found");
      return;
    }

    const stream = createReadStream(resolvedFile);
    stream.on("error", () => {
      if (!response.headersSent) fail(500, "Could not read file");
      else response.destroy();
    });
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type":
        types[extname(resolvedFile)] || "application/octet-stream",
    });
    stream.pipe(response);
  });
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const port = Number(process.env.PORT || 4173);
  createPreviewServer().listen(port, "127.0.0.1", () => {
    console.log(`David Wong portfolio: http://127.0.0.1:${port}`);
  });
}
