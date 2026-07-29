import { html, raw, jsonLd, oneLine } from '../lib/html.mjs';
import { relativizeUrls } from '../lib/urls.mjs';
import { site, nav, cta } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { icon, logo } from './icons.mjs';

const OG_IMAGE = '/assets/og-preview.svg';

function abs(path) {
  if (!path) return site.origin + '/';
  if (/^https?:\/\//.test(path)) return path;
  return site.origin + (path.startsWith('/') ? path : `/${path}`);
}

/* ------------------------------------------------------------------ header */

function navItem(item, currentPath) {
  const isCurrent = currentPath === item.href;
  const isSection = item.children?.some((child) => child.href === currentPath) || isCurrent;

  if (!item.children) {
    return html`<li class="nav__item">
      <a class="nav__link${isCurrent ? ' is-current' : ''}" href="${item.href}"${isCurrent ? raw(' aria-current="page"') : ''}>${item.label}</a>
    </li>`;
  }

  const menuId = `menu-${item.label.toLowerCase()}`;
  return html`<li class="nav__item nav__item--has-menu" data-dropdown>
    <button
      class="nav__link nav__link--button${isSection ? ' is-current' : ''}"
      type="button"
      aria-expanded="false"
      aria-controls="${menuId}"
      data-dropdown-trigger
    >
      ${item.label}
      <span class="nav__chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4" /></svg>
      </span>
    </button>
    <div class="nav__menu" id="${menuId}" data-dropdown-menu hidden>
      <ul class="nav__menu-list">
        ${item.children.map(
          (child) => html`<li>
            <a href="${child.href}"${child.href === currentPath ? raw(' aria-current="page"') : ''}>
              <span class="nav__menu-label">${child.label}</span>
              ${child.blurb && html`<span class="nav__menu-blurb">${child.blurb}</span>`}
            </a>
          </li>`,
        )}
      </ul>
      <a class="nav__menu-all" href="${item.href}">All ${item.label} ${icon('arrow', { className: 'icon icon--xs' })}</a>
    </div>
  </li>`;
}

function mobileNavItem(item, currentPath) {
  if (!item.children) {
    return html`<li>
      <a class="mobile-nav__link" href="${item.href}"${item.href === currentPath ? raw(' aria-current="page"') : ''}>${item.label}</a>
    </li>`;
  }
  return html`<li>
    <details class="mobile-nav__group"${item.children.some((c) => c.href === currentPath) ? raw(' open') : ''}>
      <summary class="mobile-nav__link mobile-nav__summary">
        ${item.label}
        <span class="mobile-nav__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4" /></svg>
        </span>
      </summary>
      <ul class="mobile-nav__sublist">
        <li><a href="${item.href}">All ${item.label}</a></li>
        ${item.children.map(
          (child) => html`<li><a href="${child.href}"${child.href === currentPath ? raw(' aria-current="page"') : ''}>${child.label}</a></li>`,
        )}
      </ul>
    </details>
  </li>`;
}

function header(currentPath) {
  return html`<header class="site-header" id="siteHeader" data-header>
    <div class="site-header__inner container">
      <a class="site-header__brand" href="/" aria-label="${site.name} — home">${logo()}</a>

      <nav class="nav" aria-label="Primary">
        <ul class="nav__list">${nav.map((item) => navItem(item, currentPath))}</ul>
      </nav>

      <div class="site-header__actions">
        <a class="button button--primary button--sm site-header__cta" href="${cta.reviewShort.href}">${cta.reviewShort.label}</a>
        <button
          class="menu-toggle"
          type="button"
          id="menuToggle"
          aria-expanded="false"
          aria-controls="mobileNav"
          aria-label="Open menu"
          data-menu-toggle
        >
          <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>

    <div class="mobile-nav" id="mobileNav" data-mobile-nav hidden>
      <div class="mobile-nav__inner">
        <ul class="mobile-nav__list">${nav.map((item) => mobileNavItem(item, currentPath))}</ul>
        <a class="button button--primary button--block" href="${cta.reviewShort.href}">${cta.reviewShort.label}</a>
        <a class="mobile-nav__whatsapp" href="${site.whatsapp.url}" target="_blank" rel="noopener">
          ${icon('chat', { className: 'icon icon--sm' })} Message us on WhatsApp
        </a>
      </div>
    </div>
  </header>`;
}

/* ------------------------------------------------------------------ footer */

function footer() {
  const industryLinks = nav.find((item) => item.label === 'Industries').children.slice(0, 7);
  return html`<footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <a href="/" aria-label="${site.name} — home">${logo({ variant: 'light' })}</a>
          <p class="site-footer__blurb">${site.footerBlurb}</p>
          <a class="site-footer__contact-link" href="${site.whatsapp.url}" target="_blank" rel="noopener">
            ${icon('chat', { className: 'icon icon--sm' })} WhatsApp ${site.whatsapp.display}
          </a>
        </div>

        <nav class="site-footer__col" aria-label="Services">
          <h2 class="site-footer__heading">Services</h2>
          <ul>
            ${services.map((service) => html`<li><a href="${service.href}">${service.navLabel}</a></li>`)}
            <li><a href="/pricing.html">Packages &amp; Pricing</a></li>
          </ul>
        </nav>

        <nav class="site-footer__col" aria-label="Industries">
          <h2 class="site-footer__heading">Industries</h2>
          <ul>
            ${industryLinks.map((item) => html`<li><a href="${item.href}">${item.label}</a></li>`)}
            <li><a href="/industries.html">All industries</a></li>
          </ul>
        </nav>

        <nav class="site-footer__col" aria-label="Company">
          <h2 class="site-footer__heading">Company</h2>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/portfolio.html">Our Work</a></li>
            <li><a href="/website-review.html">Free Website Review</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions.html">Terms and Conditions</a></li>
          </ul>
        </nav>
      </div>

      <div class="site-footer__bottom">
        <p>&copy; <span data-year>2026</span> ${site.name}. All rights reserved.</p>
        <p class="site-footer__note">${site.name} works remotely with service businesses across the United States.</p>
      </div>
    </div>
  </footer>`;
}

/* ------------------------------------------------------- sticky mobile CTA */

function mobileCtaBar() {
  return html`<div class="sticky-cta" data-sticky-cta hidden>
    <a class="button button--primary button--block" href="${cta.reviewShort.href}">${cta.reviewShort.label}</a>
  </div>`;
}

/* ------------------------------------------------------------- breadcrumbs */

export function breadcrumbs(trail) {
  if (!trail?.length) return '';
  return html`<nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="container">
      <li><a href="/">Home</a></li>
      ${trail.map(
        (crumb, index) =>
          html`<li>${crumb.href && index < trail.length - 1
            ? html`<a href="${crumb.href}">${crumb.label}</a>`
            : html`<span aria-current="page">${crumb.label}</span>`}</li>`,
      )}
    </ol>
  </nav>`;
}

function breadcrumbSchema(trail, path) {
  if (!trail?.length) return null;
  const items = [{ name: 'Home', item: abs('/') }, ...trail.map((crumb, index) => ({
    name: crumb.label,
    item: abs(index === trail.length - 1 ? path : crumb.href),
  }))];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/** Organization-level schema, emitted on every page so it is always available. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.origin}/#organization`,
    name: site.name,
    url: `${site.origin}/`,
    description: site.positioning,
    image: abs(OG_IMAGE),
    logo: abs('/assets/favicon.svg'),
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'Website design for service businesses',
      'Website redesign',
      'Local SEO',
      'Service-area pages',
      'Landing pages',
    ],
    serviceType: services.map((service) => service.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website and local SEO services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, url: abs(service.href) },
      })),
    },
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/* --------------------------------------------------------------- page shell */

/**
 * Render a complete HTML document.
 *
 * @param {object} page
 * @param {string} page.path      Output path, e.g. "services/local-seo.html"
 * @param {string} page.title     Unique <title> (brand suffix added here)
 * @param {string} page.description Unique meta description
 * @param {object[]} [page.trail] Breadcrumb trail
 * @param {object[]} [page.schema] Extra JSON-LD objects
 * @param {string} [page.bodyClass]
 * @param {*} page.content        Page markup (raw)
 */
export function page({
  path,
  title,
  description,
  trail = null,
  schema = [],
  bodyClass = '',
  content,
  ogImage = OG_IMAGE,
  ogType = 'website',
}) {
  const canonical = abs(path === 'index.html' ? '/' : `/${path}`);
  const fullTitle = path === 'index.html' ? title : `${title} | ${site.name}`;
  const currentPath = path === 'index.html' ? '/' : `/${path}`;
  const allSchema = [organizationSchema(), breadcrumbSchema(trail, `/${path}`), ...schema].filter(Boolean);

  // Components author internal links as root-relative; relativizeUrls rewrites
  // them so the site works from a subpath as well as from a domain root.
  return relativizeUrls(
    `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${oneLine(fullTitle)}</title>
<meta name="description" content="${oneLine(description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#0b1f3a" />

<meta property="og:type" content="${ogType}" />
<meta property="og:site_name" content="${site.name}" />
<meta property="og:locale" content="${site.locale}" />
<meta property="og:title" content="${oneLine(fullTitle)}" />
<meta property="og:description" content="${oneLine(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${abs(ogImage)}" />
<meta property="og:image:alt" content="${site.name} — ${site.tagline}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${oneLine(fullTitle)}" />
<meta name="twitter:description" content="${oneLine(description)}" />
<meta name="twitter:image" content="${abs(ogImage)}" />

<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/dm-serif-display-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/assets/css/style.css" />

<script async src="https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.analyticsId}');
</script>

${allSchema.map((entry) => String(jsonLd(entry))).join('\n')}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to main content</a>
${header(currentPath)}
<main id="main">
${trail ? breadcrumbs(trail) : ''}
${content}
</main>
${footer()}
${mobileCtaBar()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`,
    path,
  );
}
