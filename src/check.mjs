/**
 * Post-build validation.
 *
 * Catches the failure modes that matter for a static marketing site: broken
 * internal links, missing images, duplicate or missing SEO metadata, heading
 * problems, unlabelled images and leftover placeholder text.
 *
 * Run with: npm run check
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveFromPage } from './lib/urls.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const errors = [];
const warnings = [];

const fail = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

/* ---------------------------------------------------------- collect pages */

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git' || entry === 'node_modules' || entry === 'src') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found);
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

const htmlFiles = walk(ROOT);
const titles = new Map();
const descriptions = new Map();

const PLACEHOLDER = /(lorem ipsum|TODO|FIXME|XXX_|\[insert|placeholder text|coming soon)/i;

/* ------------------------------------------------------------------ checks */

for (const file of htmlFiles) {
  const rel = file.slice(ROOT.length + 1);
  const html = readFileSync(file, 'utf8');
  const isRedirect = html.includes('http-equiv="refresh"');

  /* --- metadata --- */
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([\s\S]*?)"/)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

  if (!title) fail(rel, 'missing <title>');
  if (!canonical) fail(rel, 'missing canonical link');

  if (!isRedirect) {
    if (!description) fail(rel, 'missing meta description');
    if (description && (description.length < 70 || description.length > 175)) {
      warn(rel, `meta description is ${description.length} characters (aim for 70–175)`);
    }
    if (title && title.length > 65) warn(rel, `title is ${title.length} characters (aim for under 65)`);

    if (title) {
      if (titles.has(title)) fail(rel, `duplicate <title>, also used by ${titles.get(title)}`);
      else titles.set(title, rel);
    }
    if (description) {
      if (descriptions.has(description)) fail(rel, `duplicate meta description, also used by ${descriptions.get(description)}`);
      else descriptions.set(description, rel);
    }

    /* --- headings --- */
    const h1s = html.match(/<h1[\s>]/g) || [];
    if (h1s.length === 0) fail(rel, 'no <h1>');
    if (h1s.length > 1) fail(rel, `${h1s.length} <h1> elements (expected exactly 1)`);

    // Heading levels should not skip (h2 -> h4).
    const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));
    for (let i = 1; i < levels.length; i += 1) {
      if (levels[i] - levels[i - 1] > 1) {
        warn(rel, `heading level jumps from h${levels[i - 1]} to h${levels[i]}`);
        break;
      }
    }

    /* --- open graph --- */
    for (const property of ['og:title', 'og:description', 'og:url', 'og:image']) {
      if (!html.includes(`property="${property}"`)) fail(rel, `missing ${property}`);
    }
    if (!html.includes('name="twitter:card"')) fail(rel, 'missing twitter:card');

    /* --- structured data must parse --- */
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(match[1]);
      } catch (error) {
        fail(rel, `invalid JSON-LD: ${error.message}`);
      }
    }

    /* --- language and skip link --- */
    if (!html.includes('<html lang=')) fail(rel, 'missing lang attribute');
    if (!html.includes('class="skip-link"')) fail(rel, 'missing skip link');
  }

  /* --- placeholder copy --- */
  const placeholder = html.match(PLACEHOLDER);
  if (placeholder) fail(rel, `placeholder text found: "${placeholder[0]}"`);

  /* --- images --- */
  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = match[1];
    const src = attrs.match(/\ssrc="([^"]+)"/)?.[1];
    const alt = attrs.match(/\salt="([^"]*)"/);

    if (!src) {
      fail(rel, 'img without src');
      continue;
    }
    if (!alt) fail(rel, `img missing alt attribute: ${src}`);
    if (!/\swidth="\d+"/.test(attrs) || !/\sheight="\d+"/.test(attrs)) {
      warn(rel, `img without explicit width/height (layout shift risk): ${src}`);
    }
    if (/^(https?:|data:)/.test(src)) continue;
    if (src.startsWith('/')) {
      // Root-relative paths break when the site is served from a subpath.
      fail(rel, `root-relative image src (must be document-relative): ${src}`);
      continue;
    }
    const target = resolve(ROOT, resolveFromPage(rel, src.split('?')[0]));
    if (!existsSync(target)) fail(rel, `broken image: ${src}`);
  }

  /* --- srcset candidates must resolve too --- */
  for (const match of html.matchAll(/\ssrcset="([^"]*)"/g)) {
    for (const candidate of match[1].split(',')) {
      const [url] = candidate.trim().split(/\s+/);
      if (!url || /^(https?:|data:)/.test(url)) continue;
      if (url.startsWith('/')) {
        fail(rel, `root-relative srcset candidate (must be document-relative): ${url}`);
        continue;
      }
      if (!existsSync(resolve(ROOT, resolveFromPage(rel, url.split('?')[0])))) {
        fail(rel, `broken srcset candidate: ${url}`);
      }
    }
  }

  /* --- reject placeholders and unapproved stock hosts; service photos use the
     fixed Unsplash image CDN with explicit crop dimensions by design --- */
  for (const match of html.matchAll(/\s(?:src|srcset|poster)="([^"]*)"/g)) {
    if (/\b(pexels\.com|placehold(er)?\.|via\.placeholder|picsum\.photos)/i.test(match[1])
      || /\bunsplash\.com/i.test(match[1]) && !/^https:\/\/images\.unsplash\.com\/photo-[^?]+\?.*\bfit=crop\b.*\bw=\d+/i.test(match[1].replaceAll('&amp;', '&'))) {
      fail(rel, `remote stock or placeholder image source: ${match[1]}`);
    }
  }

  /* --- internal links and asset references --- */
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(value)) continue;
    if (value.startsWith('//')) continue;
    if (value.startsWith('/')) {
      fail(rel, `root-relative URL (must be document-relative): ${value}`);
      continue;
    }
    const [path] = value.split('#');
    if (!path) continue;
    const target = resolve(ROOT, resolveFromPage(rel, path));
    if (!existsSync(target)) fail(rel, `broken link: ${value}`);
  }

  /* --- meta refresh target must also resolve --- */
  const refresh = html.match(/http-equiv="refresh" content="\d+;\s*url=([^"]+)"/);
  if (refresh) {
    const hop = refresh[1];
    if (hop.startsWith('/')) fail(rel, `root-relative redirect target: ${hop}`);
    else if (!existsSync(resolve(ROOT, resolveFromPage(rel, hop)))) {
      fail(rel, `redirect points at a missing page: ${hop}`);
    }
  }

  /* --- forms --- */
  for (const match of html.matchAll(/<form\b([^>]*)>/g)) {
    if (!/\saction="https:\/\//.test(match[1])) fail(rel, 'form without an https action');
  }

  /* --- accidental secrets --- */
  if (/(api[_-]?key|secret|password|bearer\s)["'\s]*[:=]/i.test(html)) {
    fail(rel, 'possible credential in markup');
  }
}

/* ------------------------------------------------------- sitemap integrity */

const sitemapPath = resolve(ROOT, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml', 'missing');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (locs.length === 0) fail('sitemap.xml', 'contains no URLs');

  for (const loc of locs) {
    const path = loc.replace(/^https?:\/\/[^/]+\//, '');
    const target = resolve(ROOT, path === '' ? 'index.html' : path);
    if (!existsSync(target)) fail('sitemap.xml', `lists a URL with no file: ${loc}`);
  }

  // Redirect stubs must never appear in the sitemap.
  for (const loc of locs) {
    const path = loc.replace(/^https?:\/\/[^/]+\//, '') || 'index.html';
    const target = resolve(ROOT, path);
    if (existsSync(target) && readFileSync(target, 'utf8').includes('http-equiv="refresh"')) {
      fail('sitemap.xml', `lists a redirect stub: ${loc}`);
    }
  }
}

/* ------------------------------------------------------------------ report */

const pageCount = htmlFiles.length;
console.log(`Checked ${pageCount} HTML files.`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((message) => console.log(`  ! ${message}`));
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.forEach((message) => console.error(`  x ${message}`));
  process.exit(1);
}

console.log('\nNo errors.');
