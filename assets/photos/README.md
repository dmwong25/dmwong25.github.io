# Photography portfolio images

The repository's 64 `frame-*.webp` files are web-sized copies of David's photographs. The Photography gallery uses 61 images, while `frame-23.webp` is the About portrait. Previously published frames 29 and 32 remain available at their existing direct image links. Eight other retired copies (36, 39, 40, 41, 43, 44, 48, 51) are kept only in the local workspace for the private review and are excluded from the commit. The optional selected-photograph collection contains 21 gallery images, identified by stable asset IDs: 01, 09, 13, 15, 17, 20, 21, 33, 35, 37, 38, 42, 47, 49, 52, 53, 58, 63, 64, 66, 67. The files are capped at 1,800 pixels on the longest edge and saved without embedded EXIF, location, or camera metadata. The original JPEG and HEIC files remain unchanged outside this project.

To rebuild the original set of 35 copies from the selected source files:

```powershell
python scripts/process_portfolio_photos.py
```

That script's source list covers frames 01–35. The 17 September 25 audit additions were processed separately from downloaded originals retained outside the project; rebuilding the original set does not recreate frames 36–52.

## September 25, 2026 additions

The iCloud review added three initial images (frames 36–38), then 14 more (frames 39–52). The albums displayed portfolio (36 items), CA_IMAGES (228), GR Snap (1,948), and ImageSync (2,442). Those totals describe album sizes, not a count of individually inspected full-size photographs.

Review coverage included all 228 CA_IMAGES items; approximately the first 790 GR Snap positions plus later samples around 1,090–1,200, 1,490–1,605, and 1,820–1,860; and approximately the first 210 ImageSync positions plus samples around 595–780, 1,100–1,180, 1,600–1,680, and a final sample around 2,100. This was broad sampling across the larger albums, not an exhaustive review. The portfolio album was also sampled. Selected candidates were checked at larger size before import.

| Frame | Description | Date verified from original | Camera verified from original |
| --- | --- | --- | --- |
| 36 | Horizontal wave to earth marquee | September 2026 | Ricoh GR III HDF |
| 37 | Vertical nighttime road with light trails | September 2026 | Ricoh GR III HDF |
| 38 | Illuminated glass building reflected in water | February 2025 | Ricoh GR III HDF |
| 39 | Pink stucco building with blue awnings | August 8, 2026 | Sony ILCE-6700 |
| 40 | Photographer reflected in a seaside binocular viewer | August 8, 2026 | Sony ILCE-6700 |
| 41 | City window reflection | June 22, 2026 | Ricoh GR III HDF |
| 42 | Orange stairwell | June 28, 2026 | Ricoh GR III HDF |
| 43 | Golden church interior | June 29, 2026 | Ricoh GR III HDF |
| 44 | Waterfall framed by green foliage | July 2, 2026 | Ricoh GR III HDF |
| 45 | Rainbow above a waterfall walkway | July 3, 2026 | Ricoh GR III HDF |
| 46 | White alpaca with a colorful garland | July 8, 2026 | Ricoh GR III HDF |
| 47 | Terraced salt pools | July 8, 2026 | Ricoh GR III HDF |
| 48 | White daisies with yellow centers | August 8, 2026 | Ricoh GR III HDF |
| 49 | Concert audience under warm lights and haze | September 8, 2026 | Ricoh GR III HDF |
| 50 | Person in an orange jacket lying in snow | March 15, 2025 | Ricoh GR III HDF |
| 51 | Two iced matcha drinks on a cafe table | June 1, 2025 | Ricoh GR III HDF |
| 52 | Striped parasols beside an indoor pool | June 6, 2025 | Ricoh GR III HDF |

Frames 39–40 came from CA_IMAGES, frames 41–49 from GR Snap, and frames 50–52 from ImageSync. Their dates and camera models were read from original EXIF. The 14 new downloads were copied byte-for-byte to `C:\Users\david\Pictures\Portfolio originals\2026-09 audit` with descriptive filenames; SHA256 checks verified preservation. The three earlier downloads also remain outside the project. No iCloud photographs were altered. These verified camera attributions apply to frames 36–52, not automatically to the older archive.

The new frames retain their aspect ratios, with EXIF orientation applied before export. Full web copies use WebP quality 82 at a maximum 1,800-pixel long edge; responsive copies use quality 80 at 640 pixels wide. EXIF, XMP, and ICC metadata are absent from the exported copies. Each output was decoded and visually checked. Processing manifests for frames 39–43, 44–47, and 48–52 are stored with the originals and record source filenames, dimensions, dates, camera models, byte sizes, and hashes.

The additions broaden the archive with architectural details, interiors, reflections, a concert, an animal portrait, and everyday human moments alongside landscapes. Near-duplicate views were skipped during selection; distinct compositions of familiar subjects remain in the full archive. Frames 41, 42, 47, 49, and 52 join the shorter selected collection for their reflections, color, pattern, and atmosphere.

## September 26, 2026 user selection

David completed the private 83-photo review with 61 Keep and 22 Remove decisions. The local gallery now retains 41 existing photographs and adds 20 approved photographs as frames 53–72. Frames 29, 32, 36, 39, 40, 41, 43, 44, 48 and 51 are no longer listed in the gallery. Twelve other new candidates were not imported. Original files and the private decision record are preserved.

The 20 additions were exported directly from the preserved originals with EXIF orientation applied: WebP quality 82, maximum 1,800-pixel long edge, plus 640-pixel-wide responsive copies at quality 78. All exports were decoded and checked for absent EXIF, XMP and ICC metadata. The gallery now spans 2023–2026. See [the selection record](../../docs/photo-selection-2026-09-26.md) for the reference-to-frame mapping.

The shorter Selected collection retains 15 approved highlights and adds six highlights from the new photographs. The Favorites page uses the approved concert audience image (`frame-49`); all remaining photo links point to retained frames.

### Concert replacement and display numbers

David supplied a new wave to earth concert photograph on September 26 for both Favorites and Photos. It replaces the image at `frame-49` (now displayed as Frame 25): confetti above the stage and audience. The supplied JPEG is preserved unchanged with the album-review originals, and the previous web copies are backed up in the private review folder. The replacement exports are 1,280 × 853 and 640 × 426, without upscaling or embedded metadata. The supplied JPEG contains no camera or capture-date metadata; the camera attribution was removed from Favorites, while the existing September 2026 event date is retained. The September 25 table above records the superseded image.

Visible captions now run consecutively from Frame 01 through Frame 61 in gallery order. These display numbers remain consistent when filtering. Asset filenames and anchor IDs retain their original numbers so shared links and saved picks continue to work; historical frame references in these records refer to those stable IDs.

## Gallery maintenance

### September 26 quality pass

Seven photographs now use reviewed darktable exports: stable assets 37, 38, 49, 58, 61, 62, and 67. Five received denoising and two gentle lens deblurring. Their full WebP copies use quality 90 and responsive copies quality 85, with unchanged dimensions and no embedded metadata. All source JPEGs remain unchanged. See [the quality-pass record](../../docs/photo-quality-2026-09-26.md) for the tool comparison, visible frame numbers, settings, and preservation details.

Gallery order, consecutive display captions, alternative text, dates, stable frame IDs, and year-filter metadata are maintained in `archive.html`. When adding or removing photographs, renumber the display captions in gallery order without changing IDs or asset filenames. Update any cross-page accessible labels that name a frame. The portrait remains in `about.html`; selected previews also appear in `index.html`.

`small/` contains 640-pixel-wide responsive WebP copies generated from these metadata-free web images. Rebuild them with `python scripts/optimize_images.py` (Pillow required). Keep `srcset` and `sizes` on image tags when adding photos. The viewer uses the full-size `src`, while the browser selects a responsive source for thumbnails. Do not rename existing frame IDs, because homepage links point to them.
