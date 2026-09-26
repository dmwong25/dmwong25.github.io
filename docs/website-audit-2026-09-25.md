# Website audit — September 25, 2026

Follow-up: [David’s September 26 photo selection](photo-selection-2026-09-26.md) supersedes the gallery counts and photo selections below. The current local gallery has 61 photographs.

The site already has a clear identity: straightforward writing, original photography, a restrained blue-and-paper design, and music that connects to David’s taste. Its biggest opportunity is to make the work more specific and the photography easier to explore. More decoration or more pages would add less value than better evidence and a few useful interactions.

This report covers the six main static pages: Home, Work, Photos, About, Notes, and Favorites. It records the local improvements made during this audit. It does not imply that these changes have been published.

## What is working

- **A believable introduction.** David’s role at PwC, computer science background, photography, and golf are described plainly. The writing does not need a more elaborate personal slogan.
- **A visual identity with real material behind it.** Original photographs do more to distinguish the site than stock illustrations or decorative effects would. The type and color choices give the different pages a consistent feel.
- **Concrete current work.** Revenue models, reconciliation, data-processing tools, and Python workflows establish a useful picture of David’s responsibilities. These are stronger than a generic list of technical interests.
- **Honest project presentation.** Repository links are available, and the Itara caption clearly distinguishes its current website from David’s 2018–2023 role. No unverified outcome metrics or live demos are claimed.
- **Relevant interactivity.** Saving photographs and drawing a song from the liked-song collection fit the content. Both can remain simple, with no visitor account required.
- **A lightweight foundation.** The main content is static, photographs have responsive WebP versions, and the site has page descriptions, canonical links, and social-sharing metadata.

## Main weaknesses and how they were addressed

| Finding | Status |
| --- | --- |
| Project introductions repeated the same purpose and contribution statements in their detail blocks. | **Improved.** Each project now separates its description from its existing verified details. No new contributions or outcomes were invented. |
| About repeated the full PwC description from Work. | **Improved.** About now has a short summary and a direct link to the detailed role. The Work page retains the responsibilities. |
| Home said “Recommendations,” while navigation and the destination said “Favorites.” | **Improved.** Wording is aligned around Favorites, with “Music I like and the cameras I use.” |
| Camera cards read mostly like product listings. | **Partly improved.** The section is now “What I shoot with,” reflecting the existing ownership information. David’s actual reasons for using each camera are still needed. |
| Notes promised longer entries despite containing one short photography note. | **Improved.** The introduction now describes short notes. Further substance should come from David’s real observations. |
| The photograph archive was easy to browse visually but difficult to search or discuss precisely. | **Improved.** Search, a selected-photograph collection, descriptive viewer captions, shareable photo links, and an email link about the current photograph were added. |
| Contact relied mainly on opening an email application. | **Improved.** The email address is visible and can be copied, with a fallback when copying is unavailable. |
| Failed or invalid song data could leave the picker waiting or behaving unpredictably. | **Improved.** The collection is validated, loading has a timeout, and visitors can retry after an error. |
| Missing pages had no designed recovery route. | **Improved.** A custom 404 page provides a route back into the site. |

The four chosen songs and their labels were preserved. The random picker still uses the separate snapshot of 270 liked songs; it is not a live feed.

## Photography review

All 34 original archive photographs were reviewed together in a contact sheet. The iCloud review added three initial photographs (frames 36–38), followed by 14 more (frames 39–52), bringing the gallery to **51 photographs**, plus the separate About portrait at frame 23. The site now contains 52 full-size WebP copies. The existing 37-image gallery and the new imports were also checked in contact sheets to assess subjects, composition, and variety.

The optional selected-photograph collection contains 18 images: **Frame 01, 09, 13, 15, 17, 20, 21, 29, 33, 35, 36, 37, 38, 41, 42, 47, 49, and 52**. It gives visitors a shorter introduction while preserving the full archive and its stable photo links.

The new viewer uses the descriptions already attached to the photographs rather than inventing locations or personal stories. Visitors can copy a link to the current frame or open an email draft that identifies the photograph. Saving photos continues to store a visitor’s choices only in that browser.

**New iCloud selection: completed.** The albums displayed portfolio (36 items), CA_IMAGES (228), GR Snap (1,948), and ImageSync (2,442). These are album sizes, not a count of individually inspected full-size photographs. Review coverage included all 228 CA_IMAGES items, approximately the first 790 GR Snap positions plus later samples around 1,090–1,200, 1,490–1,605, and 1,820–1,860, and approximately the first 210 ImageSync positions plus samples around 595–780, 1,100–1,180, 1,600–1,680, and a final sample around 2,100. The portfolio album was also sampled. This was broad sampling across the larger albums, not an exhaustive review; selected candidates were inspected at larger size before import.

| Added photograph | Date | Verified camera |
| --- | --- | --- |
| Frame 36 — horizontal wave to earth marquee | September 2026 | Ricoh GR III HDF |
| Frame 37 — vertical nighttime road with light trails | September 2026 | Ricoh GR III HDF |
| Frame 38 — illuminated glass building reflected in water | February 2025 | Ricoh GR III HDF |
| Frame 39 — pink stucco building with blue awnings | August 8, 2026 | Sony ILCE-6700 |
| Frame 40 — photographer reflected in a seaside binocular viewer | August 8, 2026 | Sony ILCE-6700 |
| Frame 41 — city window reflection | June 22, 2026 | Ricoh GR III HDF |
| Frame 42 — orange stairwell | June 28, 2026 | Ricoh GR III HDF |
| Frame 43 — golden church interior | June 29, 2026 | Ricoh GR III HDF |
| Frame 44 — waterfall framed by green foliage | July 2, 2026 | Ricoh GR III HDF |
| Frame 45 — rainbow above a waterfall walkway | July 3, 2026 | Ricoh GR III HDF |
| Frame 46 — white alpaca with a colorful garland | July 8, 2026 | Ricoh GR III HDF |
| Frame 47 — terraced salt pools | July 8, 2026 | Ricoh GR III HDF |
| Frame 48 — white daisies with yellow centers | August 8, 2026 | Ricoh GR III HDF |
| Frame 49 — concert audience under warm lights and haze | September 8, 2026 | Ricoh GR III HDF |
| Frame 50 — person in an orange jacket lying in snow | March 15, 2025 | Ricoh GR III HDF |
| Frame 51 — two iced matcha drinks on a cafe table | June 1, 2025 | Ricoh GR III HDF |
| Frame 52 — striped parasols beside an indoor pool | June 6, 2025 | Ricoh GR III HDF |

The 14 further additions came from CA_IMAGES (frames 39–40), GR Snap (41–49), and ImageSync (50–52). The dates and camera models were verified from original EXIF. Those 14 downloaded originals were copied byte-for-byte to `C:\Users\david\Pictures\Portfolio originals\2026-09 audit`, with descriptive filenames and matching SHA256 hashes; the three earlier originals also remain outside the project. Processing manifests preserve the source mapping, dimensions, byte sizes, and verified metadata. No iCloud photographs were altered.

The website receives metadata-free WebP copies with the original aspect ratios and corrected EXIF orientation. For frames 39–52, full copies use quality 82 and a maximum 1,800-pixel long edge; responsive copies use quality 80 at 640 pixels wide. EXIF, XMP, and ICC metadata were removed, and every export was decoded and visually checked. A factual Favorites cross-link connects the photography to the existing music and camera content.

The selection expands the archive beyond its existing auroras, waterfronts, and mountain views. Architectural color and geometry, layered reflections, a church interior, concert atmosphere, an animal portrait, and informal everyday scenes add variety. Near-duplicate views were skipped; a few distinct compositions of familiar subjects remain in the broad archive. The five new selected frames—41, 42, 47, 49, and 52—emphasize reflections, color, repeating forms, and atmosphere without putting every addition in the shorter collection.

Camera attribution for the older photographs still needs verified original metadata or David’s confirmation before a complete camera filter could be added. The verified attribution for frames 36–52 does not establish which camera took the rest of the archive.

## Technical and usability work completed

- Reviewed the content and structure of all six main pages.
- Checked the mobile page layouts at a **390-pixel viewport**; the inspected pages did not have horizontal overflow.
- Added search and more useful photograph details without removing existing year, collection, or saved-photo controls.
- Added photo-link and email-copy interactions with visible feedback and fallbacks.
- Added 17 iCloud photographs, including the 14 further selections at frames 39–52, as optimized, metadata-free WebP images with responsive copies. The final gallery contains 51 photographs and an optional 18-image selected collection.
- Added structured Person information using the existing public profile facts.
- Added song-library validation, a loading timeout, and expanded checks for the collection, shuffle behavior, and failures.
- Strengthened the local preview server’s path handling and added checks for malformed requests, missing files, and attempts to access files outside its serving directory.
- Rebuilt the generated Favorites markup and checked page headings, internal links and anchors, image dimensions, responsive image sources, and the archive inventory. Checks also cover the new 404 page (seven HTML pages in total).

These are focused inspections and functional checks. They are **not a WCAG certification, a complete assistive-technology audit, a comprehensive security assessment, or a full Core Web Vitals measurement**. The 390-pixel check is evidence for that viewport, not a claim that every browser and device combination has been tested. External artwork and linked services can still change independently of this site.

## Prioritized next improvements

### 1. Make the work more specific

The most important missing content is David’s individual contribution to **P-5C Events**. Its current description explains what the product did and how it was built, but not which parts David owned. Confirm:

- What David built or changed.
- One meaningful decision or difficulty and how he handled it.
- An observable result, with a source if an outcome or metric is included.

The same kind of detail would strengthen MusicMap and Itara. A verified screenshot, short workflow, or example of a technical decision would add more credibility than another general-purpose paragraph. Keep the distinction between a team’s product and David’s own work clear.

### 2. Add personal reasons in David’s own words

The camera section now says what David uses; it still does not explain why. Useful additions would be when he reaches for each camera, what he likes about using it, and a real limitation. Do not turn manufacturer specifications into a claimed personal experience.

Likewise, one or two genuine notes about the selected music would make Favorites more personal. Preserve the chosen tracks rather than inferring rankings or reasons from listening data.

### 3. Give Notes one substantial next entry

The current film-class note is a good starting point. A real photograph with a short account of the situation, the choice David made, and what he learned would provide depth. If a class print or contact sheet is available, it would connect the film story to actual work. Avoid adding several thin categories or empty “coming soon” sections.

### 4. Keep adding connections before adding pages

The useful next features are links between existing material: a note to its photographs, a project to a verified demonstration, or a camera to photographs with verified provenance. The new Favorites cross-link, search, photo sharing, and contextual email links already make the site more useful and personal without adding unnecessary accounts, forms, or complexity.

### 5. Continue photo curation when there is new material

The current additional-photo selection is complete. Further album review is optional. Future additions should strengthen the existing edit, add a distinct subject or composition, or improve on a similar frame. Preserve original files, stable links, and the consistent gallery presentation; add dates and descriptions only when supported. Adding every new image is not necessary.
