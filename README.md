# David Wong — personal site

A lightweight, responsive personal page built from publicly visible LinkedIn profile details.

## Run locally

```powershell
npm start
```

Then open `http://127.0.0.1:4173`.

The site uses no framework or build step. It's four static pages sharing one stylesheet and one script:

- `index.html` — home
- `work.html` — project index and write-ups
- `archive.html` — photograph archive
- `about.html` — bio, experience, and credentials

Presentation lives in `styles.css`; shared interactions (scroll reveal, nav state, the photo lightbox) live in `site.js`. The header/nav and footer markup is duplicated across the four pages (no server-side includes on GitHub Pages) — keep them in sync using the `SHARED HEADER` / `SHARED FOOTER` comments in each file.

## Photography

The site contains 35 optimized WebP photographs under `assets/photos/`: 34 in the gallery and one portrait in the About section. The source photographs remain outside the project and are not used by the browser. See `assets/photos/README.md` for the privacy, processing, and update workflow.
