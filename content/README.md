# Recommendations

Edit `recommendations.json`, then run `node scripts/build-recommendations.mjs`.
The generated HTML stays usable without JavaScript and works on GitHub Pages.

Each entry requires a unique `id`, `category`, `title`, and HTTPS `url`.
Optional fields: `detail`, `note`, `linkLabel`, and an HTTPS `cover` image URL.
Use categories such as Music, Books, Film, or Places; only populated categories appear.
Keep notes in David's own words. Do not label inferred Spotify listening activity as an all-time favorite.

The current selection keeps the first four artists from the original Spotify result and the first four songs from a subsequent listening-history request. No ranking or time window was provided. Entity names, links, and artwork URLs are retained from Spotify. Playback tokens and account credentials are not stored. This is a static selection, not automatic synchronization.

Use sentence case for headings and labels. Preserve proper names and intentional artist styling, including wave to earth and beabadoobee. CSS must not force uppercase or lowercase text.
