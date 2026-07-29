/**
 * Static site build.
 *
 * Renders every page from the component library into the repository root so
 * the output can be served directly by any static host (the existing setup)
 * with no server-side rewriting. Also emits sitemap.xml, robots.txt and
 * redirect stubs for URLs retired in the 2026 redesign.
 *
 * Run with: npm run build
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildArt } from './art.mjs';
import { site } from './data/site.mjs';
import { services } from './data/services.mjs';
import { industries } from './data/industries.mjs';
import { homePage } from './pages/home.mjs';
import { servicesHubPage, servicePage, websiteReviewPage } from './pages/services.mjs';
import { industriesHubPage, homeServicesPage, industryPage } from './pages/industries.mjs';
import { portfolioPage, aboutPage, contactPage, pricingPage } from './pages/company.mjs';
import { privacyPage, termsPage } from './pages/legal.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* --------------------------------------------------------------- page list */

/** Every page, with the sitemap priority and change frequency it should get. */
const pages = [
  { render: homePage, path: 'index.html', priority: '1.0', changefreq: 'weekly' },
  { render: servicesHubPage, path: 'services.html', priority: '0.9', changefreq: 'monthly' },
  ...services.map((service) => ({
    render: () => servicePage(service),
    path: `services/${service.slug}.html`,
    priority: service.promoted ? '0.9' : '0.6',
    changefreq: 'monthly',
  })),
  { render: industriesHubPage, path: 'industries.html', priority: '0.9', changefreq: 'monthly' },
  { render: homeServicesPage, path: 'industries/home-services.html', priority: '0.9', changefreq: 'monthly' },
  ...industries.map((industry) => ({
    render: () => industryPage(industry),
    path: `industries/${industry.slug}.html`,
    priority: industry.featured ? '0.8' : '0.7',
    changefreq: 'monthly',
  })),
  { render: portfolioPage, path: 'portfolio.html', priority: '0.8', changefreq: 'monthly' },
  { render: pricingPage, path: 'pricing.html', priority: '0.8', changefreq: 'monthly' },
  { render: websiteReviewPage, path: 'website-review.html', priority: '0.9', changefreq: 'monthly' },
  { render: aboutPage, path: 'about.html', priority: '0.7', changefreq: 'yearly' },
  { render: contactPage, path: 'contact.html', priority: '0.8', changefreq: 'yearly' },
  { render: privacyPage, path: 'privacy-policy.html', priority: '0.2', changefreq: 'yearly' },
  { render: termsPage, path: 'terms-and-conditions.html', priority: '0.2', changefreq: 'yearly' },
];

/* --------------------------------------------------------------- redirects */

/**
 * URLs that existed before the 2026 repositioning, mapped to their closest
 * replacement. Emitted as meta-refresh stubs with a canonical tag so any
 * existing links and indexed URLs land somewhere sensible instead of 404ing.
 * Static hosting gives us no server-side redirects, so this is the honest
 * alternative.
 */
const redirects = {
  // Retired service pages
  'services/web-design.html': '/services/website-design.html',
  'services/web-development.html': '/services/website-design.html',
  'services/ui-ux-design.html': '/services/website-design.html',
  'services/app-development.html': '/services/website-design.html',
  'services/seo-services.html': '/services/local-seo.html',
  'services/traffic-generation.html': '/services/local-seo.html',
  'services/digital-marketing.html': '/services/landing-pages.html',
  'services/promotions.html': '/services/landing-pages.html',
  'services/content-creation.html': '/services/website-design.html',
  'services/data-analytics.html': '/services/local-seo.html',
  'services/ai-chatbots.html': '/services.html',
  'services/api-development.html': '/services.html',
  'services/automation.html': '/services.html',
  'services/bot-development.html': '/services.html',

  // Retired industry pages
  'industries/small-business-websites.html': '/industries.html',
  'industries/local-business-marketing.html': '/industries/home-services.html',
  'industries/websites-for-attorneys.html': '/industries/attorney-websites.html',
  'industries/websites-for-consultants.html': '/industries.html',
  'industries/startup-digital-services.html': '/industries.html',

  // Retired blog
  'blog.html': '/services.html',
  'blog/website-cost-for-small-business.html': '/pricing.html',
  'blog/website-seo-checklist.html': '/services/local-seo.html',
  'blog/why-small-businesses-need-seo-friendly-websites.html': '/services/local-seo.html',
  'blog/how-to-generate-leads-from-a-business-website.html': '/services/website-design.html',
  'blog/best-website-features-for-attorneys.html': '/industries/attorney-websites.html',
  'blog/web-design-vs-web-development.html': '/services/website-design.html',
  'blog/how-ai-chatbots-help-small-businesses.html': '/services.html',
  'blog/automation-ideas-for-service-businesses.html': '/services.html',
};

function redirectStub(target) {
  const url = site.origin + target;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Page moved | ${site.name}</title>
<meta http-equiv="refresh" content="0; url=${target}" />
<link rel="canonical" href="${url}" />
<meta name="robots" content="noindex, follow" />
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;background:#faf9f7;
font-family:'Manrope',system-ui,-apple-system,'Segoe UI',sans-serif;color:#16243a;text-align:center;line-height:1.6}
h1{font-size:1.4rem;margin:0 0 .5rem}
a{color:#0b1f3a;font-weight:700}
</style>
</head>
<body>
<main>
<h1>This page has moved</h1>
<p>You are being redirected. If nothing happens, <a href="${target}">continue to the new page</a>.</p>
</main>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ output */

function writeFile(relPath, contents) {
  const target = resolve(ROOT, relPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((entry) => {
      const loc = entry.path === 'index.html' ? `${site.origin}/` : `${site.origin}/${entry.path}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `# ${site.name}
User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`;
}

function build() {
  const artFiles = buildArt();

  for (const entry of pages) {
    writeFile(entry.path, entry.render());
  }

  for (const [from, to] of Object.entries(redirects)) {
    writeFile(from, redirectStub(to));
  }

  writeFile('sitemap.xml', buildSitemap());
  writeFile('robots.txt', buildRobots());

  console.log(
    `Built ${pages.length} pages, ${Object.keys(redirects).length} redirect stubs, ` +
      `${artFiles.length} artwork files, sitemap.xml and robots.txt.`,
  );
}

build();

export { pages, redirects };
