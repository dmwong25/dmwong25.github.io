import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createSongDraw,
  loadSongLibrary,
  validateSongLibrary,
} from "../song-picker.js";

const tracks = JSON.parse(
  readFileSync(new URL("../content/liked-songs.json", import.meta.url), "utf8"),
);
assert.equal(validateSongLibrary(tracks), tracks);
for (const random of [() => 0, () => 0.99999, Math.random]) {
  const draw = createSongDraw(tracks, random);
  let previous;
  for (let cycle = 0; cycle < 3; cycle++) {
    const seen = new Set();
    for (let i = 0; i < tracks.length; i++) {
      const track = draw();
      assert.notEqual(track, previous, "No immediate repeats across cycles");
      assert.ok(!seen.has(track), "No repeats within a cycle");
      seen.add(track);
      previous = track;
    }
    assert.equal(seen.size, tracks.length);
  }
}
assert.equal(createSongDraw([])(), undefined);
const single = createSongDraw([tracks[0]]);
assert.equal(single(), single());

const validTrack = {
  title: "A song",
  url: "https://open.spotify.com/track/example",
  artists: [
    { name: "An artist", url: "https://open.spotify.com/artist/example" },
  ],
  cover: "https://i.scdn.co/image/example",
};
const responseFor = (payload) => async () => ({
  ok: true,
  json: async () => payload,
});
const malformedCollections = [
  null,
  {},
  [],
  [null],
  [validTrack, validTrack],
  [{ ...validTrack, title: " " }],
  [{ ...validTrack, url: "javascript:alert(1)" }],
  [
    {
      ...validTrack,
      url: "https://open.spotify.com.evil.example/track/example",
    },
  ],
  [{ ...validTrack, artists: [] }],
  [{ ...validTrack, artists: [null] }],
  [
    {
      ...validTrack,
      artists: [{ name: "Artist", url: "https://example.com/artist" }],
    },
  ],
  [{ ...validTrack, cover: "http://example.com/cover.jpg" }],
  [{ ...validTrack, coverFallback: "data:image/svg+xml,example" }],
  [{ ...validTrack, cover: "https://user:password@example.com/cover.jpg" }],
];
for (const payload of malformedCollections) {
  await assert.rejects(
    loadSongLibrary({ fetcher: responseFor(payload) }),
    /song collection/,
    "Malformed data must fail before a draw can be created",
  );
}
await assert.rejects(
  loadSongLibrary({ fetcher: async () => ({ ok: false }) }),
  /Could not load songs/,
);
await assert.rejects(
  loadSongLibrary({
    fetcher: async () => {
      throw new Error("Offline");
    },
  }),
  /Offline/,
);
await assert.rejects(
  loadSongLibrary({
    fetcher: async () => ({
      ok: true,
      json: async () => {
        throw new SyntaxError("Invalid JSON");
      },
    }),
  }),
  SyntaxError,
);
let timedOutSignal;
await assert.rejects(
  loadSongLibrary({
    timeoutMs: 5,
    fetcher: async (_url, { signal }) => {
      timedOutSignal = signal;
      return new Promise((_resolve, reject) =>
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        }),
      );
    },
  }),
  { name: "AbortError" },
);
assert.ok(
  timedOutSignal.aborted,
  "A stalled request must release the picker for retry",
);
assert.deepEqual(
  await loadSongLibrary({ fetcher: responseFor([validTrack]) }),
  [validTrack],
  "A successful retry must load after a previous failure",
);
assert.equal(
  validateSongLibrary([{ ...validTrack, cover: undefined }]).length,
  1,
);
console.log(
  `Validated ${tracks.length} unique songs, shuffle cycles, malformed data, request failures, timeout, and retry.`,
);
