/**
 * Downloads the industry photographs listed in src/data/industries.mjs.
 *
 *   npm run fetch-photos            download everything still missing
 *   npm run fetch-photos -- --force re-download even if the file is there
 *   npm run fetch-photos -- tree    only industries matching "tree"
 *
 * Run this from a machine with internet access. It is deliberately not part of
 * `npm run build`: the build must stay offline and must never depend on a third
 * party being reachable.
 *
 * How it finds the file: each `stockSourceUrl` is a photo *page*, not an image.
 * The script reads that page and takes the `og:image` URL the site publishes
 * for it, then asks the CDN for a sensible width. That works on both Unsplash
 * and Pexels without hardcoding either one's URL scheme, and it keeps working
 * if they change those schemes.
 *
 * The extension is taken from what the server actually sends, so a JPEG lands
 * as .jpg and a WebP as .webp — both are accepted by the build.
 *
 * You are still responsible for the licence. This downloads files; it does not
 * agree to anything on your behalf. Check the terms on each page.
 */

import { unlinkSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { industries } from './data/industries.mjs';
import { assetExists, baseFile, BASE_FORMATS, PHOTO_WIDTH, STOCK_DIR } from './lib/media.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Some hosts refuse requests without a browser user agent. */
const HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'accept-language': 'en-US,en;q=0.9',
};

const EXTENSION_BY_TYPE = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'image/png': '.png',
};

const TIMEOUT_MS = 30_000;

/* ------------------------------------------------------------------ parsing */

export function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

/** Content of the first <meta property|name="key"> in a document. */
export function metaContent(html, key) {
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const property = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (property?.trim().toLowerCase() !== key) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (content) return decodeEntities(content);
  }
  return null;
}

/** Last resort: an ImageObject contentUrl in the page's JSON-LD. */
export function jsonLdImage(html) {
  for (const [, block] of html.matchAll(
    /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const found = JSON.stringify(JSON.parse(block)).match(/"contentUrl"\s*:\s*"([^"]+)"/);
      if (found) return decodeEntities(found[1]);
    } catch {
      // A page with unparseable JSON-LD is not worth failing over.
    }
  }
  return null;
}

/** Ask the CDN for roughly the width we need rather than the full original. */
export function atUsefulWidth(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return rawUrl;
  }

  // An og:image is cropped to a social-card shape — Pexels ships h=630 against
  // w=1200, Unsplash sometimes fit=crop. Drop the parameters that force that
  // shape, or asking for a wider image just produces a harder letterbox.
  for (const parameter of ['h', 'crop', 'fit', 'dpr']) url.searchParams.delete(parameter);

  if (url.hostname.endsWith('unsplash.com')) {
    url.searchParams.set('w', String(PHOTO_WIDTH));
    url.searchParams.set('q', '80');
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('fit', 'max'); // scale within the width, never crop
  } else if (url.hostname.endsWith('pexels.com')) {
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('w', String(PHOTO_WIDTH));
  }
  // No height is requested at all: the photograph keeps its own aspect ratio
  // and the CSS crops it to each slot with object-fit.
  return url.toString();
}

/* ------------------------------------------------------------------ network */

async function get(url, accept) {
  const response = await fetch(url, {
    headers: { ...HEADERS, accept },
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return response;
}

async function imageUrlFor(pageUrl) {
  const html = await (await get(pageUrl, 'text/html')).text();
  const found = metaContent(html, 'og:image') ?? metaContent(html, 'twitter:image') ?? jsonLdImage(html);
  if (!found) throw new Error('no og:image on the page — download this one by hand');
  return atUsefulWidth(found);
}

/** Remove any other format of the same base name, so nothing stale wins later. */
function clearSiblings(photoPath, keep) {
  for (const extension of BASE_FORMATS) {
    if (extension === keep) continue;
    const sibling = photoPath.replace(/\.[a-z0-9]+$/i, extension);
    if (assetExists(sibling)) unlinkSync(resolve(ROOT, sibling.slice(1)));
  }
}

async function downloadOne(industry) {
  const imageUrl = await imageUrlFor(industry.stockSourceUrl);
  const response = await get(imageUrl, 'image/*');

  const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  const extension = EXTENSION_BY_TYPE[type];
  if (!extension) throw new Error(`expected an image, got ${type || 'no content type'}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000) throw new Error(`suspiciously small response (${bytes.length} bytes)`);

  const target = industry.stockImage.replace(/\.[a-z0-9]+$/i, extension);
  clearSiblings(industry.stockImage, extension);
  mkdirSync(resolve(ROOT, STOCK_DIR.slice(1)), { recursive: true });
  writeFileSync(resolve(ROOT, target.slice(1)), bytes);

  return { target, kb: Math.round(bytes.length / 1024) };
}

/* --------------------------------------------------------------------- main */

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const filters = args.filter((arg) => !arg.startsWith('--')).map((arg) => arg.toLowerCase());

  const wanted = industries
    .filter((industry) => industry.stockImage)
    .filter(
      (industry) =>
        filters.length === 0 ||
        filters.some(
          (filter) => industry.name.toLowerCase().includes(filter) || industry.slug.includes(filter),
        ),
    );

  if (wanted.length === 0) {
    console.error(`No industries matched ${filters.join(', ')}.`);
    process.exit(1);
  }

  console.log(`Fetching ${wanted.length} photograph${wanted.length === 1 ? '' : 's'} into ${STOCK_DIR}/\n`);

  let downloaded = 0;
  let skipped = 0;
  const failures = [];

  for (const industry of wanted) {
    const existing = baseFile(industry.stockImage);
    if (existing && !force) {
      console.log(`  skip  ${industry.name} — already have ${existing.split('/').pop()}`);
      skipped += 1;
      continue;
    }

    try {
      const { target, kb } = await downloadOne(industry);
      console.log(`  ok    ${industry.name} → ${target.split('/').pop()} (${kb} KB)`);
      downloaded += 1;
    } catch (error) {
      console.log(`  FAIL  ${industry.name} — ${error.message}`);
      failures.push({ industry, error });
    }
  }

  console.log(`\n${downloaded} downloaded, ${skipped} already present, ${failures.length} failed.`);

  if (failures.length > 0) {
    console.log('\nDownload these by hand — open the page, save the image under the name shown:');
    for (const { industry } of failures) {
      console.log(`  ${industry.stockSourceUrl}`);
      console.log(`    → assets/images/stock/${industry.stockImage.split('/').pop()}  (.jpg is fine)`);
    }
  }

  if (downloaded > 0) {
    console.log('\nNext: npm run build && npm run check');
    console.log('Then check the licence on each source page before you publish.');
  }

  process.exit(failures.length > 0 && downloaded === 0 ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
