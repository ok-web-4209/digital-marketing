# Design Rank Studio

Marketing website for Design Rank Studio — a web design and local SEO studio for
US service businesses.

The site is static HTML, generated from reusable components by a zero-dependency
Node build. Generated files live in the repository root so any static host can
serve them directly.

## Commands

```bash
npm run build    # generate all pages, artwork, sitemap.xml and robots.txt
npm run check    # validate links, images, SEO metadata, headings and forms
npm run serve    # preview at http://localhost:4173
npm test         # build then check
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
