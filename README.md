# David Wong — personal site

A personal home for David Wong's work in data, software, photography, and music. Six responsive static pages with a blue-and-paper visual identity, original photographs, and no runtime dependencies.

## Run locally

```powershell
npm start
```

Then open `http://127.0.0.1:4173`.

Node.js is the only runtime requirement. `node server.mjs` also starts the preview directly. Run `npm run check` (or `node --check site.js` and `node scripts/check.mjs`) before publishing to verify local links, anchors, image dimensions, headings, and the gallery inventory.

The site uses no framework or required deployment build. Six static pages share the base stylesheet, a theme stylesheet, and one interaction script:

- `index.html` — home
- `work.html` — project index and write-ups
- `archive.html` — photograph archive
- `about.html` — bio, experience, and credentials
- `notes.html` — short entries about photography and projects
- `recommendations.html` — recommendations generated from `content/recommendations.json`

Base layout lives in `styles.css`; the wave to earth-inspired palette, typography, print borders, and responsive refinements live in `theme.css`. Shared interactions (nav state, year/subject filters, and the keyboard-accessible photo viewer) live in `site.js`. The header/nav and footer markup is duplicated across the six pages (no server-side includes on GitHub Pages) — keep them in sync using the `SHARED HEADER` / `SHARED FOOTER` comments in each file. Each navigation has a page-specific `aria-current` attribute.

The MusicMap card uses its original repository logo. The Itara image shows the current September 2026 site, not a historical screenshot of David's 2018–2023 contribution. P-5C uses decorative artwork. Repository and contribution links are included in the Work page; no unverified outcome metrics or live demos are claimed. See `assets/projects/README.md` for provenance.

The core content is visible without JavaScript. JavaScript enables year and subject filtering and the photo dialog. Filters retain document order, photo links use stable frame IDs, and the viewer uses the consecutive display captions independently of the current filter. Deep links reset filters when necessary. Escape closes the viewer; arrow keys navigate; closing restores keyboard focus. Reduced-motion preferences disable animation and smooth scrolling.

## Recommendations and notes

Edit `content/recommendations.json`, then run `npm run build:recommendations` or `node scripts/build-recommendations.mjs`. Only populated categories appear. Instructions are in `content/README.md`. The current music entries come from the connected Spotify listening-history request and are a static selection, not an automatic feed or ranked list. The page contains no Spotify credentials and does not automatically play audio.

Use sentence case throughout navigation, headings, and labels, while preserving proper names and artists' official capitalization. Neither stylesheet should force uppercase or lowercase text.

Add notes directly to `notes.html`, using stable article IDs and a homepage link when an entry should be featured. The first entry is based on the existing biography's film-class details. Add personal observations in David's own words.

## Photography

The repository contains 64 full-size optimized WebP photographs under `assets/photos/`: 61 in the gallery, one About portrait, and two previously published photographs retained for existing direct image links. The optional selected-photograph collection includes 21 images. Gallery captions run from Frame 01 through Frame 61; filenames and anchor IDs remain stable. The source photographs remain outside the project and are not used by the browser. See `assets/photos/README.md` for the processing and update workflow.

The September 26 selection retains 41 previous gallery photographs and adds 20 approved photographs following the album review. David's supplied wave to earth concert photograph appears on both Photos and Favorites. Newly reviewed photographs he removed from the selection remain local and are excluded from the repository. No iCloud photos were altered. The website uses metadata-free WebP copies; the photo README and `docs/photo-selection-2026-09-26.md` record the selection and provenance.

Responsive 640-pixel copies in `assets/photos/small/` reduce image transfers on smaller displays. The lightbox uses the full-size web copy. Rebuild the responsive copies with `python scripts/optimize_images.py` (requires Pillow).

## Publishing

The existing GitHub Pages setup can serve these files directly. Merge the reviewed changes into the publishing branch to release them; local preview changes do not update the live website. Keep page descriptions, canonical URLs, Open Graph metadata, `robots.txt`, and `sitemap.xml` aligned if paths or the domain change. Google Fonts are optional external resources with local fallback font stacks.

## September 2026 audit

The findings, completed improvements, and content still needing David’s input are recorded in `docs/website-audit-2026-09-25.md`.

The photo archive supports description/date search, year and subject filters, a selected-photograph collection, local saves, and per-photo share/email links. Image anchors work even when JavaScript is unavailable. Mark a gallery figure with `data-photo-selected` to include it in the curated collection; keep stable frame IDs when adding photos.

`npm run check` includes song-library validation and shuffle/failure/timeout tests, responsive-source checks, and local preview server regression checks. New photos can be added without changing a fixed count in the check script. Keep visible homepage/archive counts and documentation aligned with the gallery.

`404.html` provides navigation for broken links on GitHub Pages. Its root-relative asset URLs are intentional so nested missing URLs render correctly.
