import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const picks = JSON.parse(
  readFileSync(new URL("content/recommendations.json", root), "utf8"),
);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const order = ["Songs", "Artists", "Cameras"];
const categories = [...new Set(picks.map((pick) => pick.category))].sort(
  (a, b) => order.indexOf(a) - order.indexOf(b),
);
const labels = {
  Songs: "Song favorites",
  Artists: "Artists I like",
  Cameras: "Camera recommendations",
};
const ids = new Set();
for (const pick of picks) {
  assert(pick.id && !ids.has(pick.id), "Each recommendation needs a unique ID");
  ids.add(pick.id);
  assert(
    pick.title && pick.category && pick.url,
    "A pick needs title, category, and URL",
  );
  assert(
    new URL(pick.url).protocol === "https:",
    "Recommendation links must use HTTPS",
  );
  if (pick.cover)
    assert(
      new URL(pick.cover).protocol === "https:",
      "Cover images must use HTTPS",
    );
}
const output = categories
  .map(
    (category) =>
      `<section class="recommendation-group" id="${escape(category.toLowerCase())}" data-category="${escape(category.toLowerCase())}" aria-label="${escape(category)}"><div class="collection-heading"><h2>${escape(labels[category] || category)}</h2><span class="mono">${picks.filter((p) => p.category === category).length} ${picks.filter((p) => p.category === category).length === 1 ? "entry" : "entries"}</span></div><div class="recommendation-grid">${picks
        .filter((pick) => pick.category === category)
        .map(
          (pick, index) =>
            `<article class="recommendation-card" id="${escape(pick.id)}"><div class="recommendation-art" aria-hidden="true"><span class="mono">${String(index + 1).padStart(2, "0")} / ${escape(category)}</span>${pick.cover ? `<img class="recommendation-cover${pick.art === "camera" ? " camera-product" : ""}" src="${escape(pick.cover)}" width="640" height="640" alt="" loading="lazy" />` : pick.art === "camera" ? `<div class="camera-drawing"><span></span></div>` : `<div class="record-disc"><span>dw</span></div>`}</div><div class="recommendation-copy"><p class="eyebrow">${escape(pick.detail || category)}</p><h3>${escape(pick.title)}</h3>${pick.note ? `<p>${escape(pick.note)}</p>` : ""}<a class="text-link" href="${escape(pick.url)}" target="_blank" rel="noreferrer">${escape(pick.linkLabel || "Explore")} ↗</a></div></article>`,
        )
        .join("")}</div></section>`,
  )
  .join("\n");
const file = new URL("recommendations.html", root);
const html = readFileSync(file, "utf8");
writeFileSync(
  file,
  html.replace(
    /<!-- PICKS START -->[\s\S]*?<!-- PICKS END -->/,
    `<!-- PICKS START -->\n${output}\n<!-- PICKS END -->`,
  ),
);
console.log(
  `Built ${picks.length} recommendations in ${categories.length} categories.`,
);
