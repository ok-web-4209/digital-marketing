/**
 * Generates STOCK-IMAGE-DOWNLOADS.md — the record of every stock photograph the
 * site is wired up for, where it comes from, and whether the file has been
 * downloaded yet.
 *
 * It is generated rather than hand-maintained so the "present / missing" column
 * cannot drift from what is actually on disk: drop a file into
 * assets/images/stock/, run `npm run build`, and the table updates itself.
 *
 * The source URLs live here and in src/data/industries.mjs only. They are never
 * rendered on the website — they exist so the owner can find each photograph
 * again and confirm its licence.
 */

import { industries } from './data/industries.mjs';
import {
  assetExists,
  baseFile,
  BASE_FORMATS,
  isRemoteImage,
  PHOTO_WIDTH,
  PHOTO_HEIGHT,
  STOCK_DIR,
  VARIANT_WIDTHS,
} from './lib/media.mjs';

/** Where each industry's photograph appears once it exists. */
const USAGE = {
  'tree-service-websites': [
    'Homepage industry card (featured)',
    'Industries hub — hero mosaic tile 1 and industry card',
    'Tree service website-design page — hero',
    'Home services hub — hero',
  ],
  'concrete-contractor-websites': [
    'Homepage industry card (featured)',
    'Industries hub — hero mosaic tile 2 and industry card',
    'Concrete contractor website page — hero',
  ],
  'fence-company-websites': [
    'Homepage industry card (featured)',
    'Industries hub — hero mosaic tile 3 and industry card',
    'Fence company website page — hero',
  ],
  'landscaping-websites': [
    'Homepage industry card (featured)',
    'Industries hub — hero mosaic tile 4 and industry card',
    'Landscaping website page — hero',
  ],
  'pool-service-websites': ['Industries hub — industry card', 'Pool service website page — hero'],
  'garage-door-websites': ['Industries hub — industry card', 'Garage door website page — hero'],
  'roofing-websites': ['Industries hub — industry card', 'Roofing website page — hero'],
  'outdoor-services-websites': ['Industries hub — industry card', 'Outdoor services website page — hero'],
  'real-estate-websites': ['Industries hub — industry card', 'Real estate website page — hero'],
  'attorney-websites': ['Industries hub — industry card', 'Attorney website page — hero'],
};

/** Crop guidance for the person preparing each file. */
const FRAMING = {
  'tree-service-websites': 'Keep the arborist, the lift and the tree in frame; do not crop the subject out behind text.',
  'concrete-contractor-websites':
    'Keep the crew and the fresh pour visible. This is the flagship image — concrete contractors are the primary target market.',
  'fence-company-websites': 'Show both the installers and the fence structure clearly.',
  'landscaping-websites': 'Keep the worker and the mower in frame alongside the finished lawn.',
  'pool-service-websites': 'Favour the service professional over a crop that shows only the water.',
  'garage-door-websites': 'Landscape crop emphasising the garage doors and the residential exterior.',
  'roofing-websites': 'Keep the worker, safety equipment, shingles and roof structure visible.',
  'outdoor-services-websites': 'Show both the worker and a recognisable house exterior.',
  'real-estate-websites': 'An active property consultation — not a generic handshake crop.',
  'attorney-websites': 'Keep the whole consultation scene rather than cropping tightly to one person.',
};

const status = (path) => (assetExists(path) ? 'present' : 'missing');

/**
 * An industry whose photograph is loaded straight from the image CDN.
 *
 * There is no file to download and no present/missing state to report, but the
 * licence record matters more here rather than less: the photograph is being
 * served to visitors continuously, from a host outside this repository.
 */
function remoteEntry(industry) {
  return `### ${industry.name}

| Field | Value |
| --- | --- |
| Status | **REMOTE — served from the image CDN, no local file involved** |
| Source page | <${industry.stockSourceUrl}> |
| Image URL | \`${industry.stockImage}\` |
| Alt text | ${industry.stockImageAlt} |
| Crop | ${industry.photoPosition ? `\`object-position: ${industry.photoPosition}\`` : 'centred (default)'} |
| Fallback illustration | \`${industry.art.replace('/assets/images/art/', 'assets/images/art/')}\` — rendered only if the URL is removed from the data |

Framing: ${FRAMING[industry.slug]}

Used on:

${USAGE[industry.slug].map((place) => `- ${place}`).join('\n')}
`;
}

function entry(industry) {
  if (isRemoteImage(industry.stockImage)) return remoteEntry(industry);

  const webp = industry.stockImage;
  const avif = webp.replace(/\.webp$/, '.avif');
  const found = baseFile(webp);
  const file = webp.replace(`${STOCK_DIR}/`, '');

  return `### ${industry.name}

| Field | Value |
| --- | --- |
| Status | **${found ? `present — \`${found.replace(`${STOCK_DIR}/`, '')}\`` : 'MISSING — the SVG illustration is being used instead'}** |
| Source page | <${industry.stockSourceUrl}> |
| Required file | \`assets/images/stock/${file}\` (or the same name as ${BASE_FORMATS.slice(1).join('/')}) |
| Prepare at | ${PHOTO_WIDTH} × ${PHOTO_HEIGHT} px (14:9), WebP quality 78–82, under ~300 KB |
| Alt text | ${industry.stockImageAlt} |
| Fallback illustration | \`${industry.art.replace('/assets/images/art/', 'assets/images/art/')}\` |
| Optional AVIF | \`${avif.replace(`${STOCK_DIR}/`, 'assets/images/stock/')}\` — ${status(avif)} |
| Optional ${VARIANT_WIDTHS.join('/')} px variant | \`${file.replace(/\.webp$/, `-${VARIANT_WIDTHS[0]}.webp`)}\` — ${status(webp.replace(/\.webp$/, `-${VARIANT_WIDTHS[0]}.webp`))} |

Framing: ${FRAMING[industry.slug]}

Used on:

${USAGE[industry.slug].map((place) => `- ${place}`).join('\n')}
`;
}

export function buildStockRecord() {
  const withPhotos = industries.filter((industry) => industry.stockImage);
  const remote = withPhotos.filter((industry) => isRemoteImage(industry.stockImage));
  const local = withPhotos.filter((industry) => !isRemoteImage(industry.stockImage));
  const present = local.filter((industry) => baseFile(industry.stockImage));
  const missing = local.filter((industry) => !baseFile(industry.stockImage));

  return `<!-- Generated by \`npm run build\` (src/stock-record.mjs). Edits will be overwritten. -->

# Stock image downloads

Design Rank Studio uses photographs of real service work for its industry
imagery. A photograph is wired up one of two ways, and \`resolveImage()\` in
\`src/lib/media.mjs\` tells them apart:

- **Remote** — \`stockImage\` is an \`https://\` URL on the Unsplash or Pexels
  image CDN, and the browser loads it from there on every visit. Nothing is
  downloaded and nothing is stored in this repository. The licence still applies
  in full: serving a photograph from the host's CDN is still publishing it
  commercially, so the terms on each source page below are worth confirming
  exactly as they would be for a downloaded file.
- **Local** — \`stockImage\` is a path into \`assets/images/stock/\`. The build
  resolves it against the filesystem, using the photograph where the file exists
  and the generated SVG illustration where it does not.

**Status: ${remote.length} of ${withPhotos.length} photographs served remotely from the image CDN${
    local.length > 0
      ? `; of the ${local.length} on local paths, ${present.length} present and ${missing.length} still missing`
      : ''
  }.**

> The remote images depend on the CDN answering at page load. That is a runtime
> dependency the local path does not have: a committed file cannot fail once it
> is in the repository, whereas a hotlinked URL can be blocked by a visitor's
> browser, rate-limited, or withdrawn by the host. The SVG illustrations are
> kept in \`art\` for every industry and are rendered again the moment a
> \`stockImage\` URL is removed from the data.

${
    local.length === 0
      ? `_Everything below describes the local route — downloading a photograph into
\`assets/images/stock/\`. No industry uses it at the moment. It applies again as
soon as a \`stockImage\` is set back to a path instead of a URL, which is also
how you would stop depending on the CDN for one._

`
      : ''
  }## The quick way — no software needed

**Actions tab → "Fetch industry photographs" → "Run workflow".**

That downloads every photograph still missing, converts them to WebP, rebuilds
the site and commits the result to whichever branch you started it from. It runs
entirely on GitHub, so a phone or tablet browser is enough. The run page shows
which photographs arrived and which need saving by hand.

One-time setup if the run fails at the commit step: **Settings → Actions →
General → Workflow permissions → Read and write permissions**.

## The same thing from a terminal

If you have Node 18+ and a checkout:

\`\`\`bash
npm run fetch-photos          # everything still missing
npm run fetch-photos -- tree  # just one, by name
npm run build && npm run check
\`\`\`

It reads each source page below, takes the image URL that page publishes for
itself, and saves it under the right filename at about ${PHOTO_WIDTH}px wide. Anything
it cannot fetch is listed at the end for you to save by hand — it never leaves
a half-written file, and it skips photographs you already have unless you pass
\`--force\`.

**It does not agree to any licence on your behalf.** Check the terms on each
source page before you publish, as described in step 2 below.

## How to add a photograph by hand

1. Open the source page listed for the image below.
2. **Check the licence and the download conditions on the page at the time you
   download.** Unsplash and Pexels licences are permissive but they do change,
   individual photographers can add restrictions, and some images carry
   model or property release limits that matter for commercial marketing use.
   Confirm the terms before you publish, and keep a note of what they were.
3. Download the largest version offered.
4. Save it into \`assets/images/stock/\` under the exact base name listed below.
   **Any of ${BASE_FORMATS.join(', ')} is accepted**, so a JPEG straight out of the
   download works — e.g. \`tree-service-arborist.jpg\`. The build finds it by name,
   whatever the extension.
5. Run \`npm run build && npm run check\`. The photograph is now live.

That is enough to see the site with real photography. Steps 6 and 7 are
optimisation, worth doing before launch but not before looking at it:

6. Crop to the framing note and resize to ${PHOTO_WIDTH} × ${PHOTO_HEIGHT}.
7. Convert to WebP at quality 78–82 and delete the original. Squoosh
   (squoosh.app), \`cwebp\` or any image editor will do:

   \`\`\`bash
   cwebp -q 80 -resize ${PHOTO_WIDTH} 0 source.jpg -o assets/images/stock/<name>.webp
   \`\`\`

   A ${PHOTO_WIDTH}px JPEG is typically 400–700 KB against 150–250 KB for the same
   image as WebP, so this is worth roughly half the page weight.

### Optional extras

Both are picked up automatically when present and ignored when absent, so
neither is required:

- **AVIF** — an \`.avif\` sibling of the same name is offered ahead of the WebP
  through \`<picture>\`, typically 20–30% smaller again.
- **A ${VARIANT_WIDTHS.join('/')} px variant** — \`<name>-${VARIANT_WIDTHS[0]}.webp\` (${VARIANT_WIDTHS[0]} × 600, under ~180 KB) is
  added to the \`srcset\` so card and mosaic slots do not download the full-size
  hero file. Worth doing for the four featured industries at least.

The **source page** URLs below are the licence record. They are never rendered
on the site and are never used as an image source — that is the separate image
URL listed for each remote photograph.

## Images

${withPhotos.map((industry) => entry(industry)).join('\n')}
## Not replaced

These stay as illustrations on purpose:

- \`hero-composition.svg\`, \`before-after.svg\`, \`review-findings.svg\`,
  \`industries-overview.svg\` and the five \`service-*.svg\` files — they explain
  website structure, rankings, analytics and conversion, which a photograph
  cannot do.
- \`about-remote.svg\` — the About page. A stock portrait must not stand in for
  the founder. See \`docs/CONTENT-NEEDED.md\` item 4.
- Portfolio thumbnails, the logo, the favicon, the OG preview and every
  interface icon.
`;
}
