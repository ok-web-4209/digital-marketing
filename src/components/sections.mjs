import { html, raw } from '../lib/html.mjs';
import { site, cta, trustPoints, principles, process, problems } from '../data/site.mjs';
import { promotedServices, services } from '../data/services.mjs';
import { industries, featuredIndustries, industryHref } from '../data/industries.mjs';
import { packages, pricingNote } from '../data/packages.mjs';
import { industryImage, hasIndustryPhoto } from '../lib/media.mjs';
import { icon } from './icons.mjs';
import { button, sectionHeading, checkList, linkCard, infoCard, figure, picture, section } from './ui.mjs';

/**
 * Display widths for the industry imagery, so the browser can pick the smallest
 * rendition that will do. Only takes effect once a width variant of the
 * photograph exists — see src/lib/media.mjs.
 */
const SIZES = {
  hero: '(min-width: 900px) 45vw, 92vw',
  card: '(min-width: 1000px) 25vw, (min-width: 600px) 46vw, 92vw',
  featuredCard: '(min-width: 1000px) 48vw, (min-width: 600px) 46vw, 92vw',
  mosaicTile: '(min-width: 900px) 22vw, 45vw',
};

/* ------------------------------------------------------------- page heroes */

/**
 * Inner-page hero. Light, spacious, with optional supporting artwork.
 *
 * `art` is either a path to an illustration or a media object from
 * `resolveImage()`, which may have resolved to a photograph. The hero image is
 * the largest-contentful-paint candidate on these pages, so it is the one image
 * per page that loads eagerly at high priority.
 */
export function pageHero({ eyebrow, title, serif = null, lead, actions = [], art = null, artAlt = '', aside = null }) {
  const media = art && (typeof art === 'string' ? { src: art, alt: artAlt, width: 1000, height: 720 } : art);
  return html`<section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <div class="container page-hero__inner${art || aside ? ' page-hero__inner--split' : ''}">
      <div class="page-hero__content">
        ${eyebrow && html`<p class="eyebrow">${eyebrow}</p>`}
        <h1 class="page-hero__title">${title}${serif ? html` <em class="display-serif">${serif}</em>` : ''}</h1>
        <p class="page-hero__lead">${lead}</p>
        ${actions.length > 0 && html`<div class="button-row">${actions.map((action) => button(action))}</div>`}
      </div>
      ${media &&
      html`<div class="page-hero__art">
        ${figure({
          ...media,
          sizes: media.sizes ?? SIZES.hero,
          className: media.isPhoto ? 'industry-photo-frame' : '',
          imgClassName: media.isPhoto ? 'industry-photo' : '',
          eager: true,
          priority: true,
        })}
      </div>`}
      ${aside && html`<div class="page-hero__art">${aside}</div>`}
    </div>
  </section>`;
}

/** Homepage hero: headline, two calls to action, trust points and a composed visual. */
export function homeHero() {
  return html`<section class="hero">
    <div class="hero__pattern" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow">Web design &amp; local SEO studio</p>
        <h1 class="hero__title">
          Websites and Local SEO That Help Service Businesses
          <em class="display-serif">Generate More Leads</em>
        </h1>
        <p class="hero__lead">
          ${site.name} creates professional, conversion-focused websites and local SEO strategies for US service
          businesses that want more calls, quote requests and customers.
        </p>
        <div class="button-row">
          ${button({ label: cta.review.label, href: cta.review.href, variant: 'primary', size: 'lg' })}
          ${button({ label: cta.work.label, href: cta.work.href, variant: 'secondary', size: 'lg' })}
        </div>
        <ul class="hero__trust">
          ${trustPoints.map(
            (point) => html`<li>
              <span class="hero__trust-icon" aria-hidden="true">${icon(point.icon, { className: 'icon icon--xs' })}</span>
              ${point.label}
            </li>`,
          )}
        </ul>
      </div>

      <div class="hero__art">
        <img
          class="hero__art-image"
          src="/assets/images/art/hero-composition.svg"
          alt="A tree-service website shown on desktop and mobile, alongside a new quote-request notification and a local search ranking card"
          width="1040"
          height="880"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------ home sections */

export function problemsSection() {
  return section({
    tone: 'tint',
    id: 'problems',
    children: html`
      ${sectionHeading({
        eyebrow: 'The honest starting point',
        title: 'Is Your Website Costing You',
        serif: 'Potential Customers?',
        lead: 'Most service businesses do not have a traffic problem. They have a website that loses the people who already found them.',
      })}
      <div class="problems">
        <div class="problems__list">
          <ul class="problem-grid">
            ${problems.map(
              (problem) => html`<li class="problem">
                <span class="problem__icon" aria-hidden="true">${icon('warning', { className: 'icon icon--sm' })}</span>
                <div>
                  <h3 class="problem__title">${problem.title}</h3>
                  <p class="problem__body">${problem.body}</p>
                </div>
              </li>`,
            )}
          </ul>
        </div>
        <aside class="problems__visual">
          ${figure({
            src: '/assets/images/art/before-after.svg',
            alt: 'Before and after comparison: a cluttered outdated contractor website next to a clean redesign with a visible call button and quote form',
            width: 900,
            height: 1100,
          })}
          <div class="problems__cta">
            <p>Not sure which of these apply to you? A free review will tell you, in plain language.</p>
            ${button({ label: cta.review.label, href: cta.review.href, variant: 'primary', block: true })}
          </div>
        </aside>
      </div>
    `,
  });
}

export function servicesSection({ heading = true } = {}) {
  return section({
    tone: 'white',
    id: 'services',
    children: html`
      ${heading &&
      sectionHeading({
        eyebrow: 'What we do',
        title: 'Four services, built around',
        serif: 'one outcome',
        lead: 'More qualified enquiries from the people already searching for what you do.',
      })}
      <div class="service-stack">
        ${promotedServices.map(
          (service, index) => html`<article class="service-row${index % 2 === 1 ? ' service-row--reverse' : ''}">
            <div class="service-row__content">
              <p class="service-row__number">Service ${String(index + 1).padStart(2, '0')}</p>
              <h3 class="service-row__title">
                <a href="${service.href}">${service.name}</a>
              </h3>
              <p class="service-row__tagline">${service.tagline}</p>
              <p class="service-row__problem">${service.problem}</p>
              <ul class="service-row__includes">
                ${service.includes.slice(0, 6).map(
                  (item) => html`<li>
                    <span aria-hidden="true">${icon('check', { className: 'icon icon--xs' })}</span>${item.title}
                  </li>`,
                )}
              </ul>
              <p class="service-row__outcome"><strong>What you get:</strong> ${service.outcome}</p>
              ${button({ label: `Explore ${service.shortName}`, href: service.href, variant: 'tertiary', withArrow: true })}
            </div>
            <div class="service-row__art">
              ${figure({ src: service.art, alt: service.artAlt, width: 1000, height: 750 })}
            </div>
          </article>`,
        )}
      </div>
      <p class="service-stack__note">
        Website maintenance is available as an optional add-on once your site is live.
        <a href="/services/website-maintenance.html">See what it covers</a>.
      </p>
    `,
  });
}

/**
 * Industry cards.
 *
 * `media: 'featured'` gives imagery to the four flagship niches only and lists
 * the rest as compact text cards — used on the homepage, where ten equally
 * weighted image cards would flatten the hierarchy. `media: 'all'` keeps an
 * image on every card, which is what the industries hub wants.
 */
export function industriesSection({ limit = null, showAll = true, media = 'all' } = {}) {
  const list = limit ? industries.slice(0, limit) : industries;
  return section({
    tone: 'tint',
    id: 'industries',
    children: html`
      ${sectionHeading({
        eyebrow: 'Industries',
        title: 'Built for Businesses That Depend on',
        serif: 'Local Customers',
        lead: 'We work primarily with specialty home-service companies, alongside real estate firms, attorneys and other established local and professional-service businesses.',
      })}
      <div class="industry-grid">
        ${list.map((industry) => {
          const withMedia = media === 'all' || industry.featured;
          const classes = [
            'industry-card',
            industry.featured && 'industry-card--featured',
            !withMedia && 'industry-card--compact',
          ]
            .filter(Boolean)
            .join(' ');
          return html`<article class="${classes}">
            <a class="industry-card__link" href="${industryHref(industry)}">
              ${withMedia &&
              html`<span class="industry-card__media">
                ${picture(industryImage(industry, { sizes: industry.featured ? SIZES.featuredCard : SIZES.card }))}
              </span>`}
              <span class="industry-card__body">
                <span class="industry-card__name">${industry.name}</span>
                <span class="industry-card__short">${industry.short}</span>
                <span class="industry-card__cta">Learn more${icon('arrow', { className: 'icon icon--xs' })}</span>
              </span>
            </a>
          </article>`;
        })}
      </div>
      ${showAll &&
      html`<div class="section-actions">
        ${button({ label: 'See all industries', href: '/industries.html', variant: 'secondary', withArrow: true })}
        ${button({ label: cta.reviewShort.label, href: cta.reviewShort.href, variant: 'primary' })}
      </div>`}
    `,
  });
}

/**
 * Four-tile photographic mosaic of the flagship industries, used as the
 * industries hub hero in place of the single overview illustration.
 *
 * Returns null when none of the four photographs have been downloaded, so the
 * caller can keep the existing SVG rather than render a grid of nothing. Tiles
 * whose photograph is missing individually fall back to that industry's
 * illustration, which keeps the composition intact while the library is filled.
 */
export function industryMosaic() {
  const tiles = featuredIndustries.slice(0, 4);
  if (!tiles.some((industry) => hasIndustryPhoto(industry))) return null;

  return html`<div class="mosaic">
    <span class="mosaic__accent" aria-hidden="true"></span>
    <div class="mosaic__grid">
      ${tiles.map(
        (industry, index) => html`<figure class="mosaic__tile">
          ${picture({
            ...industryImage(industry, { sizes: SIZES.mosaicTile }),
            className: 'mosaic__image',
            eager: true,
            priority: index === 0,
          })}
          <figcaption class="mosaic__label">${industry.name}</figcaption>
        </figure>`,
      )}
    </div>
    <div class="mosaic__card">
      <span class="mosaic__card-icon" aria-hidden="true">${icon('check', { className: 'icon icon--xs' })}</span>
      <span class="mosaic__card-text">
        <span class="mosaic__card-title">New quote request</span>
        <span class="mosaic__card-meta">Straight from local search</span>
      </span>
    </div>
  </div>`;
}

export function whyChooseSection() {
  return section({
    tone: 'white',
    children: html`
      ${sectionHeading({
        eyebrow: 'Why work with us',
        title: 'A studio that understands how service businesses',
        serif: 'actually win work',
      })}
      <div class="principle-grid">
        ${principles.map(
          (principle) => html`<article class="principle">
            <span class="principle__icon" aria-hidden="true">${icon(principle.icon, { className: 'icon icon--sm' })}</span>
            <h3 class="principle__title">${principle.title}</h3>
            <p class="principle__body">${principle.body}</p>
          </article>`,
        )}
      </div>
    `,
  });
}

export function processSection() {
  return section({
    tone: 'navy',
    children: html`
      ${sectionHeading({
        eyebrow: 'How projects run',
        title: 'A clear process, from first call to',
        serif: 'launch and beyond',
        lead: 'You always know what stage the project is at and what happens next.',
      })}
      <ol class="process">
        ${process.map(
          (step) => html`<li class="process__step">
            <span class="process__number">${step.step}</span>
            <h3 class="process__title">${step.title}</h3>
            <p class="process__body">${step.body}</p>
            <ul class="process__points">
              ${step.points.map((point) => html`<li>${point}</li>`)}
            </ul>
          </li>`,
        )}
      </ol>
    `,
  });
}

export function packagesSection({
  eyebrow = 'Packages',
  title = 'Clear starting points, with',
  serif = 'no surprises',
  lead = 'Every project is scoped in writing before work begins.',
  tone = 'tint',
} = {}) {
  return section({
    tone,
    id: 'packages',
    children: html`
      ${sectionHeading({ eyebrow, title, serif, lead })}
      <div class="package-grid">
        ${packages.map(
          (pack) => html`<article class="package${pack.featured ? ' package--featured' : ''}">
            ${pack.badge && html`<span class="package__badge">${pack.badge}</span>`}
            <h3 class="package__name">${pack.name}</h3>
            <p class="package__price"><span class="package__unit">${pack.unit}</span><strong>${pack.price}</strong></p>
            <p class="package__summary">${pack.summary}</p>
            <p class="package__best">${pack.best}</p>
            ${checkList(pack.features, { className: 'check-list--compact' })}
            ${button({ label: pack.cta.label, href: pack.cta.href, variant: pack.featured ? 'primary' : 'secondary', block: true })}
          </article>`,
        )}
      </div>
      <p class="package-note">${pricingNote}</p>
    `,
  });
}

export function projectsSection({ projects, heading = true, tone = 'white' }) {
  return section({
    tone,
    id: 'work',
    children: html`
      ${heading &&
      sectionHeading({
        eyebrow: 'Our work',
        title: 'Projects, approach and',
        serif: 'what we would build for you',
        lead: 'Live client websites alongside clearly labelled concept projects that show how we structure home-service sites.',
      })}
      <div class="project-grid">
        ${projects.map(
          (project) => html`<article class="project">
            <div class="project__media">
              <img src="${project.art}" alt="${project.artAlt}" width="1200" height="760" loading="lazy" decoding="async" />
              ${project.type === 'concept' && html`<span class="project__flag">Concept Project</span>`}
            </div>
            <div class="project__body">
              <p class="project__industry">${project.industry}</p>
              <h3 class="project__name">${project.name}</h3>
              <div class="project__detail">
                <h4>Challenge</h4>
                <p>${project.challenge}</p>
              </div>
              <div class="project__detail">
                <h4>Approach</h4>
                <p>${project.approach}</p>
              </div>
              <div class="project__detail">
                <h4>Main features</h4>
                ${checkList(project.features, { className: 'check-list--compact' })}
              </div>
              ${project.url
                ? button({ label: 'Visit live website', href: project.url, variant: 'secondary', external: true, block: true })
                : html`<p class="project__note">
                    A demonstration build, not a client engagement. We can walk you through it on a call.
                  </p>`}
            </div>
          </article>`,
        )}
      </div>
    `,
  });
}

/* -------------------------------------------------------------- lead magnet */

const SERVICE_OPTIONS = [
  'Tree service',
  'Concrete',
  'Fencing',
  'Landscaping',
  'Pool service',
  'Garage doors',
  'Roofing',
  'Outdoor services (pressure washing, decks, lighting)',
  'Real estate',
  'Legal',
  'Other service business',
];

/**
 * The free website review form — the site's primary lead magnet.
 * Posts to Formspree (a public endpoint id, not a secret). Client-side
 * validation, loading and success states live in assets/js/main.js.
 */
export function reviewForm({ id = 'website-review-form', compact = false }) {
  return html`<form
    class="form${compact ? ' form--compact' : ''}"
    id="${id}"
    action="${site.formEndpoint}"
    method="post"
    novalidate
    data-ajax-form
    aria-describedby="${id}-status"
  >
    <div class="form__grid">
      <div class="field">
        <label for="${id}-name">Your name <span class="field__required" aria-hidden="true">*</span></label>
        <input id="${id}-name" name="name" type="text" autocomplete="name" required maxlength="80" />
        <p class="field__error" data-error-for="${id}-name" hidden></p>
      </div>
      <div class="field">
        <label for="${id}-business">Business name <span class="field__required" aria-hidden="true">*</span></label>
        <input id="${id}-business" name="business_name" type="text" autocomplete="organization" required maxlength="120" />
        <p class="field__error" data-error-for="${id}-business" hidden></p>
      </div>
      <div class="field">
        <label for="${id}-email">Email address <span class="field__required" aria-hidden="true">*</span></label>
        <input id="${id}-email" name="email" type="email" autocomplete="email" required maxlength="120" />
        <p class="field__error" data-error-for="${id}-email" hidden></p>
      </div>
      <div class="field">
        <label for="${id}-phone">Phone number <span class="field__required" aria-hidden="true">*</span></label>
        <input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required maxlength="40" />
        <p class="field__error" data-error-for="${id}-phone" hidden></p>
      </div>
      <div class="field field--wide">
        <label for="${id}-website">Website address</label>
        <input
          id="${id}-website"
          name="website"
          type="url"
          inputmode="url"
          placeholder="https://yourbusiness.com"
          maxlength="200"
          aria-describedby="${id}-website-hint"
        />
        <p class="field__hint" id="${id}-website-hint">Leave blank if you do not have a website yet.</p>
        <p class="field__error" data-error-for="${id}-website" hidden></p>
      </div>
      <div class="field">
        <label for="${id}-service">Primary service <span class="field__required" aria-hidden="true">*</span></label>
        <select id="${id}-service" name="primary_service" required>
          <option value="">Choose your main service</option>
          ${SERVICE_OPTIONS.map((option) => html`<option>${option}</option>`)}
        </select>
        <p class="field__error" data-error-for="${id}-service" hidden></p>
      </div>
      <div class="field">
        <label for="${id}-area">Main service area <span class="field__required" aria-hidden="true">*</span></label>
        <input
          id="${id}-area"
          name="service_area"
          type="text"
          required
          maxlength="120"
          placeholder="City, county or state"
          aria-describedby="${id}-area-hint"
        />
        <p class="field__hint" id="${id}-area-hint">The towns or counties where you want more work.</p>
        <p class="field__error" data-error-for="${id}-area" hidden></p>
      </div>
      <div class="field field--wide">
        <label for="${id}-challenge">Your biggest website or marketing challenge <span class="field__required" aria-hidden="true">*</span></label>
        <textarea id="${id}-challenge" name="challenge" rows="5" required minlength="10" maxlength="1200"></textarea>
        <p class="field__error" data-error-for="${id}-challenge" hidden></p>
      </div>
    </div>

    <input type="hidden" name="_subject" value="Website review request — ${site.name}" />
    <div class="field field--honeypot" aria-hidden="true">
      <label for="${id}-company-url">Do not fill this in</label>
      <input id="${id}-company-url" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <p class="form__status" id="${id}-status" role="status" aria-live="polite"></p>

    <button class="button button--primary button--lg button--block" type="submit">
      <span data-submit-label>Request My Free Website Review</span>
    </button>
    <p class="form__smallprint">
      No cost and no obligation. We use your details only to prepare and send your review — see our
      <a href="/privacy-policy.html">privacy policy</a>.
    </p>
  </form>`;
}

export function reviewSection({ tone = 'tint' } = {}) {
  const findings = [
    { title: 'Mobile usability issues', body: 'What breaks, shrinks or becomes untappable on a phone.' },
    { title: 'Weak calls to action', body: 'Where visitors are ready to act and nothing invites them to.' },
    { title: 'Missing service pages', body: 'Work you sell that has no page to rank or convert.' },
    { title: 'Local SEO opportunities', body: 'Searches in your area you could realistically win.' },
    { title: 'Speed or technical problems', body: 'What slows the site down or blocks it from being indexed properly.' },
    { title: 'Trust and credibility gaps', body: 'Reviews, credentials and proof that are missing or hidden.' },
  ];

  return section({
    tone,
    id: 'website-review',
    children: html`
      ${sectionHeading({
        eyebrow: 'Free website review',
        title: 'Find Out What Is Preventing Your Website From',
        serif: 'Generating More Leads',
        lead: 'Send us your details and we will look at your site the way a potential customer does — then tell you what we would change first.',
      })}
      <div class="review-layout">
        <div class="review-layout__info">
          <h3 class="review-layout__subtitle">What the review may identify</h3>
          ${checkList(findings)}
          <div class="review-layout__meta">
            <p><span aria-hidden="true">${icon('clock', { className: 'icon icon--sm' })}</span> Usually returned within two to three business days.</p>
            <p><span aria-hidden="true">${icon('document', { className: 'icon icon--sm' })}</span> Written for a business owner, not for a developer.</p>
          </div>
        </div>
        <div class="review-layout__form">${reviewForm({ id: 'review' })}</div>
      </div>
    `,
  });
}

/* -------------------------------------------------------------- faq + final */

export function faqSection({ items, title = 'Frequently asked questions', eyebrowText = 'FAQ', tone = 'white' }) {
  return section({
    tone,
    id: 'faq',
    children: html`
      ${sectionHeading({ eyebrow: eyebrowText, title, align: 'center' })}
      <div class="faq">
        ${items.map(
          (item) => html`<details class="faq__item">
            <summary>
              <span>${item.q}</span>
              <span class="faq__marker" aria-hidden="true"></span>
            </summary>
            <div class="faq__answer"><p>${item.a}</p></div>
          </details>`,
        )}
      </div>
    `,
  });
}

export function finalCta({
  title = 'Your Website Should Help You',
  serif = 'Win More Business',
  lead = 'Request a professional website review and discover practical ways to improve your design, credibility, local visibility and conversion rate.',
} = {}) {
  return html`<section class="final-cta">
    <div class="final-cta__pattern" aria-hidden="true"></div>
    <div class="container final-cta__inner">
      <h2 class="final-cta__title">${title} <em class="display-serif">${serif}</em></h2>
      <p class="final-cta__lead">${lead}</p>
      <div class="button-row button-row--center">
        ${button({ label: cta.reviewShort.label, href: cta.reviewShort.href, variant: 'primary', size: 'lg' })}
        ${button({ label: cta.project.label, href: cta.project.href, variant: 'secondary', size: 'lg' })}
      </div>
    </div>
  </section>`;
}

/** Cross-links to the other services, shown at the foot of each service page. */
export function relatedServices(currentSlug) {
  const others = services.filter((service) => service.slug !== currentSlug && service.promoted);
  return section({
    tone: 'tint',
    children: html`
      ${sectionHeading({ eyebrow: 'Other services', title: 'What else we can help with' })}
      <div class="card-grid card-grid--3">
        ${others.map((service) =>
          linkCard({
            href: service.href,
            iconName: service.icon,
            title: service.name,
            body: service.tagline,
          }),
        )}
      </div>
    `,
  });
}

/** Industry cross-links, shown at the foot of each industry page. */
export function relatedIndustries(currentSlug) {
  const others = (featuredIndustries.some((entry) => entry.slug === currentSlug)
    ? industries.filter((entry) => entry.slug !== currentSlug)
    : featuredIndustries
  ).slice(0, 4);

  return section({
    tone: 'white',
    children: html`
      ${sectionHeading({ eyebrow: 'More industries', title: 'Other businesses we build for' })}
      <div class="card-grid card-grid--4">
        ${others.map((industry) =>
          linkCard({ href: industryHref(industry), title: industry.name, body: industry.short }),
        )}
      </div>
      <div class="section-actions">
        ${button({ label: 'See all industries', href: '/industries.html', variant: 'secondary', withArrow: true })}
      </div>
    `,
  });
}

export { section, sectionHeading, button, checkList, figure, picture, linkCard, infoCard, raw };
