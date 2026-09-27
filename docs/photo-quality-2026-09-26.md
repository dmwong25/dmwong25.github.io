# Photo quality pass — September 26, 2026

Seven of the 61 gallery photographs now use reviewed darktable 5.4.1 exports. Five received edge-preserving denoising; two received gentle lens deblurring. Original JPEGs remain unchanged, verified by SHA256 before and after processing. Composition, color treatment, display captions, stable URLs, and gallery selection are preserved.

## Tool choice

David requested a free tool if its results were good. The installed **darktable** was selected after comparing its output against the current website at full resolution. Its **diffuse or sharpen** module provides edge-preserving denoising and iterative deconvolution without generating new subjects or scene details. This pass used its built-in `denoise | fine`, `denoise | medium`, and `lens deblur | soft` presets. See the [official module documentation](https://docs.darktable.org/usermanual/development/en/module-reference/processing-modules/diffuse/).

**Topaz Photo** is the paid alternative worth testing for more difficult JPEG noise and focus problems. Its [Normal denoise model](https://docs.topazlabs.com/topaz-photo/enhancements/denoise-raw-and-non-raw) is intended for low-to-medium noise; its generative Denoise MAX mode is a different approach and was not used here. Adobe's documented [AI Denoise format support](https://helpx.adobe.com/lightroom/desktop/edit-photos/enhance-details.html) excludes ordinary JPEG and HEIC sources. No paid subscription, cloud upload, or image-generation tool was needed.

## Accepted changes

These frame numbers are the visible website captions; asset IDs differ because they preserve existing links.

| Visible caption | Photograph | Stable asset | Treatment |
| --- | --- | --- | --- |
| Frame 06 | Photographer among hanging glass spheres | frame-58.webp | Fine denoise; retain skin and glass texture |
| Frame 09 | Tower disappearing into fog | frame-61.webp | Medium denoise; retain fog, branches, and window lines |
| Frame 10 | Amber theater | frame-62.webp | Fine denoise; retain curtain folds and acoustic panels |
| Frame 15 | Turquoise lamps above a bar | frame-67.webp | Fine denoise; retain mosaic and wall detail |
| Frame 25 | Wave to earth concert with confetti | frame-49.webp | Soft lens deblur; preserve haze and light bloom |
| Frame 28 | Nighttime traffic light trails | frame-37.webp | Soft lens deblur; preserve the long-exposure trails |
| Frame 29 | Glass building reflected in water | frame-38.webp | Fine denoise; retain reflections and window edges |

The gallery was screened on contact sheets, with closer inspection of candidates and exported before/after crops. The other 54 gallery photographs were left as they were. Intentional motion blur, shallow focus, mist, and light diffusion were not treated as defects. The two deblurred photographs still contain genuine capture blur; the adjustment gives a modest clarity improvement, not a recovery of missing detail.

## Export and preservation

- darktable processed copies of preserved source JPEGs, with EXIF orientation applied. Its configuration was isolated from the user's library.
- Lossless PNG intermediates were encoded to metadata-free WebP at quality 90, method 6. Maximum dimensions and existing HTML dimensions are unchanged; there was no resolution upscaling. A one-pixel darktable rounding difference for frame-67 was normalized to the existing 1800 × 1200 layout size.
- Updated responsive copies are 640 pixels wide at WebP quality 85. `scripts/optimize_images.py` retains quality 85 for these seven assets on future thumbnail rebuilds.
- All accepted images were checked as exported WebP files. Private backups, intermediate files, source hashes, render logs, the applied manifest, and a before/after review page are under the ignored `.local/photo-review/quality-pass/` folder. They are excluded from publishing.
- Reusable XMP processing settings are saved under `scripts/photo-quality/`. They contain processing settings only; apply them to copies of the original JPEGs, not previously processed web images.

Example export with the installed darktable CLI (use forward slashes in paths):

```powershell
& 'C:/Program Files/darktable/bin/darktable-cli.exe' source-copy.jpg scripts/photo-quality/denoise-fine.xmp reviewed.png --width 1800 --height 1800 --hq true --upscale false --apply-custom-presets false --core --disable-opencl --configdir isolated-darktable-config --library ':memory:' --conf plugins/imageio/format/png/bpp=8
```

Always review the result before replacing a web asset, and strip metadata during WebP export. The XMP settings do not change exposure, white balance, crop, or subject content.

## Validation

The existing site checks passed: seven pages, 256 local links/assets, 61 gallery photographs, responsive sources, dimensions, anchors, song loading, and preview-server behavior. Browser checks passed at 1440 × 1000 and 390 × 844, both at 2× pixel density: all seven updated photos loaded, the lightbox selected the full-size image, the concert appeared on Favorites, and there was no horizontal overflow. All 14 replacements decode, retain their previous dimensions, and have no EXIF, XMP, or ICC metadata. Source hashes still match. The changed full-size and thumbnail files total 3.27 MB, up from 2.39 MB, for the higher-quality exports.
