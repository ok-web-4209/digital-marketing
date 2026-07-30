import { html } from '../lib/html.mjs';
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
  industriesSection,
  industryMosaic,
  processSection,
  packagesSection,
  faqSection,
  finalCta,
  relatedIndustries,
} from '../components/sections.mjs';
import { industries, homeServiceIndustries, featuredIndustries, industryHref } from '../data/industries.mjs';
import { industryImage, resolveImage } from '../lib/media.mjs';
import { promotedServices } from '../data/services.mjs';
import { site, cta } from '../data/site.mjs';
import { faqs } from '../data/faqs.mjs';

/* ---------------------------------------------------------- industries hub */

export function industriesHubPage() {
  // A four-photo mosaic once the photographs exist, the overview illustration
  // until then.
  const mosaic = industryMosaic();

  return page({
    path: 'industries.html',
    title: 'Industries We Build Websites For',
    description:
      'Websites and local SEO for tree services, concrete contractors, fence installers, landscapers, roofers, real estate firms and law firms.',
    trail: [{ label: 'Industries' }],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Industries served',
        itemListElement: industries.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.name,
          url: `${site.origin}${industryHref(industry)}`,
        })),
      },
    ],
    content: html`
      ${pageHero({
        eyebrow: 'Industries',
        title: 'Built for Businesses That Depend on',
        serif: 'Local Customers',
        lead: 'We work primarily with specialty home-service companies — the trades where a homeowner searches, compares two or three options, and calls whoever makes it easiest. We also build for real estate firms, solo attorneys and other established local and professional-service businesses.',
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: 'See our work', href: '/portfolio.html', variant: 'secondary' },
        ],
        ...(mosaic
          ? { aside: mosaic }
          : {
              art: '/assets/images/art/industries-overview.svg',
              artAlt:
                'A grid of industry tiles for tree services, concrete, fencing, landscaping, roofing and pool services around a local search panel',
            }),
      })}

      ${industriesSection({ showAll: false })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Why specialise',
            title: 'A generalist agency will sell you',
            serif: 'the same site as everyone else',
            lead: 'Knowing the trade changes what gets built.',
          })}
          <div class="card-grid card-grid--3">
            ${[
              [
                'We know what the buyer asks first',
                'For fencing it is cost per foot. For concrete it is what a driveway runs per square foot. For garage doors it is how fast you can get there. Those answers belong above the fold, not on a FAQ page.',
              ],
              [
                'We know which pages need to exist',
                'A tree service needs an emergency path. A landscaper needs design-build and maintenance kept apart. A roofer needs an insurance-claim page. These are not optional extras.',
              ],
              [
                'We know how the searches are worded',
                'Homeowners do not search for "arboricultural services". They search for "tree removal near me" and "emergency tree service" plus a town name. Pages get built for the second kind.',
              ],
            ].map(([title, body]) => infoCard({ title, body }))}
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'Not on the list?',
            title: 'We work with other established local businesses too',
            lead: 'The approach transfers to most service businesses that sell to a defined geographic area — HVAC, plumbing, electrical, cleaning, moving, auto services, medical and dental practices, accountants and consultants.',
          })}
          <div class="section-actions">
            ${button({ label: cta.project.label, href: cta.project.href, variant: 'primary' })}
            ${button({ label: cta.review.label, href: cta.review.href, variant: 'secondary' })}
          </div>
        `,
      })}

      ${processSection()} ${finalCta()}
    `,
  });
}

/* ------------------------------------------------------- home services hub */

export function homeServicesPage() {
  const treeService = industries.find((entry) => entry.slug === 'tree-service-websites');
  const homeServiceFaqs = [
    {
      q: 'Why do you focus on home-service businesses?',
      a: 'Because the work suits them. Home-service companies sell to a defined area, compete on local search, and rely on quote requests and phone calls. That is exactly what a well-structured website and a local SEO campaign improve.',
    },
    {
      q: 'My trade is not listed. Can you still help?',
      a: 'Usually, yes. The structure that works for a fence company works for HVAC, plumbing, electrical, cleaning or moving companies too. Get in touch and we will tell you honestly whether we are a good fit.',
    },
    {
      q: 'Do I need service-area pages for every town?',
      a: 'No. A handful of substantial pages for the areas that actually produce work beats fifty thin pages with the town name swapped. We pick the list together during discovery.',
    },
    ...faqs.slice(0, 3),
  ];

  return page({
    path: 'industries/home-services.html',
    title: 'Home Service Websites & Local SEO',
    description:
      'Websites and local SEO for home-service companies: tree services, concrete, fencing, landscaping, pool, garage doors, roofing and outdoor services.',
    trail: [{ label: 'Industries', href: '/industries.html' }, { label: 'Home Services' }],
    schema: [
      faqSchema(homeServiceFaqs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Home service industries',
        itemListElement: homeServiceIndustries.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.name,
          url: `${site.origin}${industryHref(industry)}`,
        })),
      },
    ],
    content: html`
      ${pageHero({
        eyebrow: 'Home services',
        title: 'Websites and Local SEO for',
        serif: 'Home Service Businesses',
        lead: 'Home services is our primary market. These businesses live or die on local search, quote requests and phone calls — and most of them are running websites that actively get in the way of all three.',
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: 'See packages', href: '/pricing.html', variant: 'secondary' },
        ],
        // The tree-service photograph, described for this page's context so no
        // two images on the site share alt text.
        art: resolveImage({
          photo: treeService.stockImage,
          photoAlt: 'Arborist working from an elevated platform to trim a mature tree at a residential property',
          illustration: treeService.art,
          illustrationAlt: 'A certified arborist roped into a mature tree with a service truck parked below',
        }),
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'The pattern',
            title: 'What every home-service website',
            serif: 'needs to get right',
          })}
          <div class="card-grid card-grid--4">
            ${[
              ['Answer the price question', 'Not with a fixed number — with ranges, the factors that move them, and what happens on a site visit.'],
              ['Make contact effortless', 'Tap-to-call in the header, a short quote form on every service page, and a response time you actually meet.'],
              ['Prove you are safe to hire', 'Licence, insurance, certifications and real project photos, placed where the decision gets made.'],
              ['Cover the right geography', 'Genuine pages for the towns your crews reach, not a list of every county in the state.'],
            ].map(([title, body]) => infoCard({ title, body }))}
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Trades we build for',
            title: 'Eight home-service specialisms',
            lead: 'Each with its own page structure, search terms and buying pattern.',
          })}
          <div class="card-grid card-grid--4">
            ${homeServiceIndustries.map((industry) =>
              linkCard({ href: industryHref(industry), title: industry.name, body: industry.short }),
            )}
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({ eyebrow: 'Services', title: 'How we help home-service companies' })}
          <div class="card-grid card-grid--4">
            ${promotedServices.map((service) =>
              linkCard({
                href: service.href,
                iconName: service.icon,
                image: service.cardImage,
                title: service.name,
                body: service.tagline,
              }),
            )}
          </div>
        `,
      })}

      ${processSection()} ${packagesSection()}
      ${faqSection({ items: homeServiceFaqs, title: 'Home-service questions', tone: 'white' })}
      ${finalCta()}
    `,
  });
}

/* ---------------------------------------------------------- industry page */

export function industryPage(industry) {
  const heroImage = industryImage(industry);
  const industryFaqs = [
    {
      q: `How much does a ${industry.name.toLowerCase().replace(/s$/, '')} website cost?`,
      a: 'A redesign starts at $1,000 and a new lead-generation website starts at $1,500. The figure depends on how many service pages and service-area pages you need and how much of the content we write. You get a fixed written scope before work starts.',
    },
    {
      q: 'Can you write the content for my service pages?',
      a: 'Yes. We write service and service-area pages from a discovery call and whatever material you already have. If you would rather write it yourself, we supply outlines and target word counts.',
    },
    ...faqs.slice(0, 4),
  ];

  return page({
    path: `industries/${industry.slug}.html`,
    title: industry.meta.title,
    description: industry.meta.description,
    trail: [{ label: 'Industries', href: '/industries.html' }, { label: industry.name }],
    ogImage: heroImage.src,
    schema: [
      faqSchema(industryFaqs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Website design and local SEO for ${industry.name.toLowerCase()}`,
        description: industry.meta.description,
        url: `${site.origin}${industryHref(industry)}`,
        provider: { '@id': `${site.origin}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        audience: { '@type': 'BusinessAudience', name: industry.name },
      },
    ],
    content: html`
      ${pageHero({
        eyebrow: industry.name,
        title: industry.heading,
        lead: industry.intro,
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: cta.proposal.label, href: cta.proposal.href, variant: 'secondary' },
        ],
        art: heroImage,
      })}

      ${section({
        tone: 'tint',
        children: html`
          <div class="split">
            <div>
              <p class="eyebrow">The problem</p>
              <h2 class="section-heading__title">What usually goes wrong</h2>
              <p class="prose mt-lg">${industry.challenge}</p>
              ${industry.note && html`<div class="callout mt-lg"><p>${industry.note}</p></div>`}
            </div>
            <div>
              <p class="eyebrow">What we build</p>
              <h2 class="section-heading__title">Our approach</h2>
              ${checkList(industry.approach)}
            </div>
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Page structure',
            title: 'The pages a',
            serif: `${industry.name.toLowerCase().replace(/s$/, '')} site needs`,
            lead: 'Each of these gets a real page with real content, so it can rank on its own and answer a specific question.',
          })}
          <ul class="pill-list">
            ${industry.services.map((service) => html`<li>${service}</li>`)}
          </ul>
          <div class="mt-lg">
            <h3 class="review-layout__subtitle">Searches these pages target</h3>
            <ul class="pill-list pill-list--muted">
              ${industry.searches.map((search) => html`<li>${search}</li>`)}
            </ul>
            <p class="field__hint" style="margin-top:1rem">
              Bracketed terms stand in for your real towns and counties, agreed during discovery.
            </p>
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({ eyebrow: 'Services', title: 'How we can help' })}
          <div class="card-grid card-grid--4">
            ${promotedServices.map((service) =>
              linkCard({
                href: service.href,
                iconName: service.icon,
                image: service.cardImage,
                title: service.name,
                body: service.tagline,
              }),
            )}
          </div>
        `,
      })}

      ${processSection()} ${packagesSection()}
      ${faqSection({ items: industryFaqs, title: `${industry.name} questions`, tone: 'white' })}
      ${relatedIndustries(industry.slug)} ${finalCta()}
    `,
  });
}

export { featuredIndustries, figure };
