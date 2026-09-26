import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// Check cross-page links and assets before a static GitHub Pages deployment.
const root = new URL("../", import.meta.url);
const pages = [
  "index.html",
  "work.html",
  "archive.html",
  "about.html",
  "notes.html",
  "recommendations.html",
  "404.html",
];
let checked = 0;
for (const page of pages) {
  const file = new URL(page, root);
  const html = readFileSync(file, "utf8");
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${page}: one main heading`,
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: no duplicate IDs`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(match[1])) continue;
    const target = match[1].startsWith("/")
      ? new URL(match[1].slice(1) || "index.html", root)
      : new URL(match[1], file);
    const fragment = target.hash.slice(1);
    target.hash = "";
    assert(existsSync(target), `${page}: missing ${match[1]}`);
    if (fragment) {
      assert(
        readFileSync(target, "utf8").includes(`id="${fragment}"`),
        `${page}: missing anchor ${match[1]}`,
      );
    }
    checked++;
  }
  for (const match of html.matchAll(/<img\b[^>]+>/g)) {
    assert(/\balt="[^"]*"/.test(match[0]), `${page}: image alternative text`);
    if (!/data-lightbox-image/.test(match[0])) {
      assert(
        /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
        `${page}: image dimensions`,
      );
    }
    const srcset = match[0].match(/\bsrcset="([^"]+)"/);
    if (srcset) {
      for (const source of srcset[1].split(",")) {
        const [path, descriptor] = source.trim().split(/\s+/);
        assert(
          /^[1-9]\d*w$/.test(descriptor),
          `${page}: valid responsive image width`,
        );
        if (!/^https?:/.test(path))
          assert(
            existsSync(new URL(path, file)),
            `${page}: missing responsive image ${path}`,
          );
      }
    }
  }
}
const archive = readFileSync(new URL("archive.html", root), "utf8");
const photoIds = [
  ...archive.matchAll(/<figure\b[^>]*\bid="([^"]+)"[^>]*>[\s\S]*?<\/figure>/g),
]
  .filter((match) => match[0].includes("data-gallery-item"))
  .map((match) => match[1]);
assert.equal(
  (archive.match(/data-gallery-item/g) || []).length,
  photoIds.length,
  "Every gallery photograph has a stable frame ID",
);
// Preserve retained frame IDs. Frames 29 and 32 were retired in David's photo review.
for (let frame = 1; frame <= 35; frame++) {
  if ([23, 29, 32].includes(frame)) continue;
  const id = `frame-${String(frame).padStart(2, "0")}`;
  assert(photoIds.includes(id), `Preserve existing archive photograph ${id}`);
}
assert(
  !archive.includes('id="frame-23"'),
  "Portrait remains on About, outside archive",
);
console.log(
  `Passed: ${pages.length} pages, ${checked} local links/assets, ${photoIds.length} photos, headings, image dimensions, responsive sources, and anchors.`,
);
