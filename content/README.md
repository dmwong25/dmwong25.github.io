# Recommendations

Edit `recommendations.json`, then run `node scripts/build-recommendations.mjs`.
The generated HTML stays usable without JavaScript and works on GitHub Pages.

Each entry requires a unique `id`, `category`, `title`, and HTTPS `url`.
Optional fields: `detail`, `note`, `linkLabel`, and an HTTPS `cover` image URL.
Use categories such as Music, Books, Film, or Places; only populated categories appear.
Keep notes in David's own words. Do not label inferred Spotify listening activity as an all-time favorite.

The current selection keeps the first four artists from the original Spotify result and the first four songs from a subsequent listening-history request. No ranking or time window was provided. Entity names, links, and artwork URLs are retained from Spotify. Playback tokens and account credentials are not stored. This is a static selection, not automatic synchronization.

Use sentence case for headings and labels. Preserve proper names and intentional artist styling, including wave to earth and beabadoobee. CSS must not force uppercase or lowercase text.

## Random song picker

`liked-songs.json` holds 270 unique tracks read from David's Liked Songs in the signed-in web player on September 19, 2026, with his authorization. All 270 displayed rows were accounted for. Only song titles, public track/artist links, artist names, and displayed artwork URLs were retained. No account credentials, tokens, or playback data are included.

The picker uses this static snapshot, separately from the four curated song recommendations above. It shuffles the full list without repeats during each page visit until every song has been drawn; refreshing starts a new shuffle. New likes require updating this file. Playback opens only when a visitor follows a link; nothing autoplays.

Run `node scripts/check-song-picker.mjs` to validate the library and shuffle behavior.

Artwork references were upgraded using public track oEmbed metadata where available (256 of 270); the remaining tracks retain the web player thumbnails. The picker reserves image space and keeps a record illustration if artwork fails to load.
