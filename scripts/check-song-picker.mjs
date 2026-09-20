import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createSongDraw } from "../song-picker.js";

const tracks = JSON.parse(
  readFileSync(new URL("../content/liked-songs.json", import.meta.url), "utf8"),
);
assert.equal(tracks.length, 270);
assert.equal(new Set(tracks.map((t) => t.url)).size, tracks.length);
for (const track of tracks) {
  assert.ok(track.title.trim());
  assert.match(
    track.url,
    /^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]+$/,
  );
  assert.ok(track.artists.length);
  for (const artist of track.artists) {
    assert.ok(artist.name.trim());
    assert.match(
      artist.url,
      /^https:\/\/open\.spotify\.com\/artist\/[A-Za-z0-9]+$/,
    );
  }
}
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
console.log("Validated 270 unique songs and shuffle cycles without repeats.");
