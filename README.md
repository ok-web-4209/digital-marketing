# Design Rank Studio

Marketing website for Design Rank Studio — a web design and local SEO studio for
US service businesses.

The site is static HTML, generated from reusable components by a zero-dependency
Node build. Generated files live in the repository root so any static host can
serve them directly.

## Commands

```bash
npm run build         # generate all pages, artwork, sitemap.xml and robots.txt
npm run check         # validate links, images, SEO metadata, headings and forms
npm run serve         # preview at http://localhost:4173
npm test              # build then check
npm run fetch-photos  # download the industry photographs (needs internet)
```

There are no dependencies to install — `npm install` is not required. Node 18+.

## How it works

```
src/
  data/          content: services, industries, projects, packages, FAQs, brand
  components/    layout shell, header, footer, sections, UI primitives, icons
  pages/         one module per page or page family
  lib/html.mjs   escaping tagged-template helper
  art.mjs        generates every SVG illustration
  build.mjs      renders pages + sitemap + robots + redirect stubs
  check.mjs      post-build validation
  serve.mjs      local preview server
assets/
  css/style.css  the complete design system (no framework)
  js/main.js     navigation, forms, reveals, analytics events
  fonts/         self-hosted Manrope and DM Serif Display (woff2)
  images/        generated SVG artwork
```

**Everything in the root is build output.** Edit `src/`, then run `npm run build`.
Editing a generated `.html` file directly will be overwritten on the next build.

### Internal URLs must stay relative

The site is served from a subpath on GitHub Pages
(`ok-web-4209.github.io/digital-marketing/`), so a root-relative URL like
`/assets/css/style.css` resolves against the origin and 404s.

Components author links as root-relative because it reads better, and
`relativizeUrls()` in `src/lib/urls.mjs` rewrites them to document-relative
paths (`assets/…`, `../assets/…`) as the last step of rendering each page. The
output therefore works from a subpath, from a domain root, and from the local
filesystem alike.

Two places are outside that rewrite and must be written relative by hand:

- `assets/css/style.css` — font `url()`s are relative to the stylesheet
  (`../fonts/…`).
- `assets/js/main.js` — use `link.pathname`, not the raw `href`, when matching
  internal links.

`npm run check` fails the build on any root-relative `href`/`src`, so this
cannot regress silently.

### Adding a page

Most content changes need no new code:

- **A new industry** — add one object to `src/data/industries.mjs`. The industry
  page, the hub listing, the navigation menu, the footer and the sitemap all
  pick it up automatically.
- **A new service** — add one object to `src/data/services.mjs`.
- **A new case study** — add one object to `src/data/projects.mjs`. Set
  `type: 'concept'` for demonstration builds; they are labelled as concept
  projects wherever they appear.

For a genuinely new page type, add a module under `src/pages/` and register it
in the `pages` array in `src/build.mjs`.

### Artwork

Illustrations are generated as SVG by `src/art.mjs` — small, resolution
independent, and consistent across the site. To use a photograph instead, drop
the file into `assets/images/` and point the relevant `art` field in
`src/data/` at it. Nothing else has to change.

Illustrations that explain a *concept* — website structure, rankings, analytics,
conversion flows, the before/after comparison, the review findings — stay as
SVG. A photograph cannot show a page structure.

### Photography

Industry imagery is photographic. The files themselves are **not** in this
repository and are never downloaded by the build — the build stays offline and
must not depend on a third party being reachable.

To fetch them, either run `npm run fetch-photos` locally, or start the **Fetch
industry photographs** workflow from the Actions tab, which needs no local
tooling at all and works from a phone. Both read each source page's own
`og:image`, save it into `assets/images/stock/` under the filename the data
expects, and list anything they could not get so it can be saved by hand.
Photographs already present are left alone unless `--force` is passed. The
workflow additionally converts to WebP, rebuilds and commits.

Nothing breaks while they are missing. `resolveImage()` in `src/lib/media.mjs`
checks the filesystem at build time and picks:

1. the photograph, if the `.webp` is there — plus an `.avif` sibling and a
   `-900.webp` rendition if those are there too, offered through `<picture>`
   and `srcset`;
2. otherwise the generated SVG illustration.

So a half-filled photo library renders as a mix of photographs and
illustrations, and an empty one renders exactly as the site did before. There is
never a broken `<img>`.

Each industry in `src/data/industries.mjs` carries `stockImage`,
`stockImageAlt` and `stockSourceUrl` alongside its `art`/`artAlt` illustration
fallback. `npm run build` regenerates
[`STOCK-IMAGE-DOWNLOADS.md`](STOCK-IMAGE-DOWNLOADS.md) in the repository root
with the required filenames, sizes, alt text, usage and current present/missing
status — that file is build output, so edit the data, not the Markdown.

`npm run check` fails the build on a broken `srcset` candidate and on any
`unsplash.com`/`pexels.com` URL used as an image source, so a stock webpage URL
cannot end up in the markup.

## Deployment

The build writes plain `.html` files to the repository root, matching the
existing hosting setup. Nothing about deployment configuration changed in the
2026 redesign.

## Notes

- Google Analytics 4 (`G-664QM0C3M2`) and the Formspree form endpoint are
  configured in `src/data/site.mjs`. Both are public client-side identifiers;
  no secrets are stored in this repository.
- URLs retired in the redesign are served as redirect stubs generated from the
  `redirects` map in `src/build.mjs`.
- Outstanding content the owner needs to supply is listed in
  [`docs/CONTENT-NEEDED.md`](docs/CONTENT-NEEDED.md).
