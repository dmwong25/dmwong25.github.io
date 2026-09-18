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
    const target = new URL(match[1], file);
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
  }
}
const archive = readFileSync(new URL("archive.html", root), "utf8");
assert.equal(
  (archive.match(/data-gallery-item/g) || []).length,
  34,
  "Preserve all 34 archive photographs",
);
assert(
  !archive.includes('id="frame-23"'),
  "Portrait remains on About, outside archive",
);
console.log(
  `Passed: ${pages.length} pages, ${checked} local links/assets, 34 photos, headings, image dimensions, and anchors.`,
);
