# Photography portfolio images

The 35 `frame-*.webp` files are web-sized copies of David's selected photographs. The Photography gallery uses 34 images, while `frame-23.webp` is the About portrait. The files are capped at 1,800 pixels on the longest edge and saved without EXIF, location, or camera metadata. The original JPEG and HEIC files remain unchanged outside this project.

To rebuild the copies from the selected originals:

```powershell
python scripts/process_portfolio_photos.py
```

Gallery order, alternative text, dates, stable frame IDs, and year-filter metadata are maintained in `archive.html`. The portrait remains in `about.html`; selected previews also appear in `index.html`.

`small/` contains 640-pixel-wide responsive WebP copies generated from these metadata-free web images. Rebuild them with `python scripts/optimize_images.py` (Pillow required). Keep `srcset` and `sizes` on image tags when adding photos. The viewer uses the full-size `src`, while the browser selects a responsive source for thumbnails. Do not rename existing frame IDs, because homepage links point to them.
