import { html, raw } from '../lib/html.mjs';
import { page, faqSchema } from '../components/layout.mjs';
import {
  pageHero,
  section,
  sectionHeading,
  button,
  checkList,
  figure,
  linkCard,
  infoCard,
  processSection,
  packagesSection,
  faqSection,
  finalCta,
  relatedServices,
  reviewSection,
} from '../components/sections.mjs';
import { services, promotedServices } from '../data/services.mjs';
import { faqs, reviewFaqs } from '../data/faqs.mjs';
import { site, cta } from '../data/site.mjs';
import { featuredIndustries, industryHref } from '../data/industries.mjs';

/* ------------------------------------------------------------- services hub */

export function servicesHubPage() {
  return page({
    path: 'services.html',
    title: 'Website Design and Local SEO Services',
    description:
      'Four services for service businesses: lead-generation website design, website redesign, local SEO and landing pages. Website maintenance available as an add-on.',
    trail: [{ label: 'Services' }],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.name,
          url: `${site.origin}${service.href}`,
        })),
      },
    ],
    content: html`
      ${pageHero({
        eyebrow: 'Services',
        title: 'Everything your website needs to',
        serif: 'bring in work',
        lead: 'We do four things, and we do them for service businesses. No sprawling menu of services, no work outsourced to someone you never meet.',
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: 'See packages and pricing', href: '/pricing.html', variant: 'secondary' },
        ],
        art: '/assets/images/art/service-website-design.svg',
        artAlt:
          'Mockup of a service-business website on desktop and mobile with a call button, quote form and service cards',
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Core services',
            title: 'Pick the one that matches',
            serif: 'where you are now',
          })}
          <div class="card-grid card-grid--4">
            ${promotedServices.map((service) =>
              linkCard({
                href: service.href,
                iconName: service.icon,
                title: service.name,
                body: service.tagline,
                cta: 'See what is included',
              }),
            )}
          </div>
        `,
      })}

      ${services
        .filter((service) => service.promoted)
        .map(
          (service, index) => html`<section class="section section--${index % 2 === 0 ? 'tint' : 'white'}">
            <div class="container">
              <div class="split${index % 2 === 1 ? ' split--reverse' : ''}">
                <div>
                  <p class="eyebrow">${service.shortName}</p>
                  <h2 class="section-heading__title">${service.name}</h2>
                  <p class="service-row__tagline">${service.tagline}</p>
                  <p class="service-row__problem">${service.problem}</p>
                  <p class="service-row__outcome"><strong>What you get:</strong> ${service.outcome}</p>
                  ${button({ label: `Explore ${service.shortName}`, href: service.href, variant: 'primary' })}
                </div>
                <div>${figure({ src: service.art, alt: service.artAlt, width: 1000, height: 750 })}</div>
              </div>
            </div>
          </section>`,
        )}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'Add-on',
            title: 'Website maintenance, if you want it',
            lead: 'Optional ongoing care once your site is live. Never required, and never bundled in without you asking.',
          })}
          <div class="card-grid card-grid--4">
            ${services
              .find((service) => service.slug === 'website-maintenance')
              .includes.map((item) =>
                linkCard({
                  href: '/services/website-maintenance.html',
                  title: item.title,
                  body: item.body,
                  cta: 'Learn more',
                }),
              )}
          </div>
        `,
      })}

      ${processSection()} ${packagesSection()} ${finalCta()}
    `,
  });
}

/* --------------------------------------------------------- service detail */

export function servicePage(service) {
  const pageFaqs = [...service.faqs, ...faqs.slice(0, 3)];

  return page({
    path: `services/${service.slug}.html`,
    title: service.meta.title,
    description: service.meta.description,
    trail: [{ label: 'Services', href: '/services.html' }, { label: service.navLabel }],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.meta.description,
        url: `${site.origin}${service.href}`,
        serviceType: service.name,
        provider: { '@id': `${site.origin}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.name} deliverables`,
          itemListElement: service.includes.map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item.title },
          })),
        },
      },
      faqSchema(pageFaqs),
    ],
    content: html`
      ${pageHero({
        eyebrow: service.shortName,
        title: service.name,
        lead: service.tagline,
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: cta.proposal.label, href: cta.proposal.href, variant: 'secondary' },
        ],
        art: service.art,
        artAlt: service.artAlt,
      })}

      ${section({
        tone: 'white',
        children: html`
          <div class="split">
            <div>
              <h2 class="section-heading__title">The problem this solves</h2>
              <p class="prose mt-lg">${service.problem}</p>
              <div class="callout mt-lg">
                <p><strong>The outcome.</strong> ${service.outcome}</p>
              </div>
            </div>
            <div>
              <div class="callout">
                <p><strong>Right for you if</strong></p>
                <p>${rightForYou(service.slug)}</p>
              </div>
              <ul class="pill-list mt-lg">
                ${service.includes.slice(0, 6).map((item) => html`<li>${item.title}</li>`)}
              </ul>
            </div>
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'What is included',
            title: 'Everything in a',
            serif: `${service.shortName.toLowerCase()} project`,
          })}
          <div class="card-grid card-grid--3">
            ${service.includes.map((item) => infoCard({ title: item.title, body: item.body }))}
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Who it is for',
            title: 'Industries we build this for',
            lead: 'Primarily specialty home-service companies, alongside real estate firms, attorneys and other established local businesses.',
          })}
          <div class="card-grid card-grid--4">
            ${featuredIndustries.map((industry) =>
              linkCard({ href: industryHref(industry), title: industry.name, body: industry.short }),
            )}
          </div>
          <div class="section-actions">
            ${button({ label: 'See all industries', href: '/industries.html', variant: 'secondary', withArrow: true })}
          </div>
        `,
      })}

      ${processSection()} ${packagesSection()}
      ${faqSection({ items: pageFaqs, title: `${service.shortName} questions`, tone: 'white' })}
      ${relatedServices(service.slug)} ${finalCta()}
    `,
  });
}

function rightForYou(slug) {
  switch (slug) {
    case 'website-design':
      return 'You have no website, or the one you have is beyond saving. You want a site built specifically to produce quote requests rather than to look tidy.';
    case 'website-redesign':
      return 'You have an established business and a site that no longer represents it. Some of it still works and you would rather improve it than start over.';
    case 'local-seo':
      return 'Your website is decent but nobody finds it. Competitors show up for the searches in your towns and you want to be there instead.';
    case 'landing-pages':
      return 'You are running ads or pushing into a new area and sending that traffic to a general homepage that was never built for it.';
    case 'website-maintenance':
      return 'Your site is live and you would rather not think about backups, updates, broken forms or slow pages again.';
    default:
      return 'Get in touch and we will tell you honestly whether this is the right starting point.';
  }
}

/* --------------------------------------------------------- website review */

export function websiteReviewPage() {
  return page({
    path: 'website-review.html',
    title: 'Request a Free Website Review',
    description:
      'Request a free website review for your service business. We will identify mobile usability issues, weak calls to action, missing service pages and local SEO opportunities.',
    trail: [{ label: 'Free Website Review' }],
    schema: [faqSchema(reviewFaqs)],
    content: html`
      ${pageHero({
        eyebrow: 'Free website review',
        title: 'Find Out What Is Preventing Your Website From',
        serif: 'Generating More Leads',
        lead: 'Tell us about your business and we will look at your website the way a potential customer does — then send you a written summary of what we would change first.',
        art: '/assets/images/art/review-findings.svg',
        artAlt:
          'A website screenshot marked up with review findings for mobile usability, calls to action and local SEO',
      })}
      ${reviewSection({ tone: 'tint' })}
      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'How it works',
            title: 'Three steps, no sales call required',
          })}
          <div class="card-grid card-grid--3">
            ${[
              ['You send the form', 'Takes about two minutes. We need enough to understand your services and your market.'],
              ['We review the site', 'We go through it on desktop and mobile, check your local search visibility, and note what is costing you enquiries.'],
              ['You get the write-up', 'A plain-language summary with prioritised recommendations. Act on it yourself or ask us to quote.'],
            ].map(([title, body], index) => infoCard({ meta: `Step ${index + 1}`, title, body }))}
          </div>
        `,
      })}
      ${faqSection({ items: reviewFaqs, title: 'About the review', tone: 'tint' })}
      ${finalCta({
        title: 'Prefer to talk it through',
        serif: 'first?',
        lead: 'Send us a message and describe what you are trying to fix. We will tell you whether a review, a redesign or a local SEO campaign is the right starting point.',
      })}
    `,
  });
}

export { raw };
