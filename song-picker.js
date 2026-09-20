export function createSongDraw(tracks, random = Math.random) {
  let bag = [];
  let previous;
  return () => {
    if (!bag.length) {
      bag = [...tracks];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag.length > 1 && bag.at(-1) === previous) {
        [bag[0], bag[bag.length - 1]] = [bag.at(-1), bag[0]];
      }
    }
    previous = bag.pop();
    return previous;
  };
}

const picker =
  typeof document !== "undefined" &&
  document.querySelector("[data-song-picker]");
if (picker) {
  picker.hidden = false;
  const button = picker.querySelector("[data-pick-song]");
  const status = picker.querySelector("[data-picker-status]");
  const result = picker.querySelector("[data-song-result]");
  let draw;
  let total;
  const link = (text, url) => {
    const anchor = document.createElement("a");
    anchor.textContent = text;
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  };
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      if (!draw) {
        status.textContent = "Opening my song collection…";
        const response = await fetch("./content/liked-songs.json");
        if (!response.ok) throw new Error("Could not load songs");
        const tracks = await response.json();
        if (!Array.isArray(tracks) || !tracks.length)
          throw new Error("No songs available");
        total = tracks.length;
        draw = createSongDraw(tracks);
      }
      const track = draw();
      const artwork = document.createElement("div");
      artwork.className = "song-artwork";
      if (track.cover) {
        const image = document.createElement("img");
        image.src = track.cover;
        image.alt = `Artwork for ${track.title}`;
        image.width = 160;
        image.height = 160;
        image.addEventListener("error", () => {
          if (track.coverFallback && image.getAttribute("src") !== track.coverFallback) {
            image.src = track.coverFallback;
          } else {
            image.remove();
          }
        });
        artwork.append(image);
      }
      const copy = document.createElement("div");
      copy.className = "song-result-copy";
      const heading = document.createElement("h3");
      heading.append(link(track.title, track.url));
      const artists = document.createElement("p");
      artists.className = "song-artists";
      track.artists.forEach((artist, index) => {
        if (index) artists.append(", ");
        artists.append(link(artist.name, artist.url));
      });
      const listen = link("Listen ↗", track.url);
      listen.className = "text-link";
      copy.append(heading, artists, listen);
      result.replaceChildren(artwork, copy);
      button.textContent = "Pick another song ↻";
      status.replaceChildren();
      const announcement = document.createElement("span");
      announcement.className = "sr-only";
      announcement.textContent = `${track.title} — ${track.artists.map((a) => a.name).join(", ")}. `;
      status.append(
        announcement,
        `Picking from ${total} liked songs. No repeats until you’ve seen them all.`,
      );
    } catch {
      status.textContent = "The songs couldn’t load. Please try again.";
      button.textContent = "Try again ↻";
    } finally {
      button.disabled = false;
    }
  });
}
