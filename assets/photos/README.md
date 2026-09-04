# Photography portfolio images

The 35 `frame-*.webp` files are web-sized copies of David's selected photographs. The Photography gallery uses 34 images, while `frame-23.webp` is the About portrait. The files are capped at 1,800 pixels on the longest edge and saved without EXIF, location, or camera metadata. The original JPEG and HEIC files remain unchanged outside this project.

To rebuild the copies from the selected originals:

```powershell
python scripts/process_portfolio_photos.py
```

Gallery order, alternative text, and dates are maintained in the Photography section of `index.html`.
