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
  projectsSection,
  processSection,
  packagesSection,
  whyChooseSection,
  reviewForm,
  faqSection,
  finalCta,
} from '../components/sections.mjs';
import { projects, liveProjects, conceptProjects } from '../data/projects.mjs';
import { promotedServices } from '../data/services.mjs';
import { featuredIndustries, industryHref } from '../data/industries.mjs';
import { packages, pricingNote } from '../data/packages.mjs';
import { faqs } from '../data/faqs.mjs';
import { site, cta, principles } from '../data/site.mjs';
import { icon } from '../components/icons.mjs';

/* ---------------------------------------------------------------- our work */

export function portfolioPage() {
  return page({
    path: 'portfolio.html',
    title: 'Our Work — Website Case Studies',
    description:
      'Website case studies from Design Rank Studio: live client websites and clearly labelled concept projects showing how we structure home-service sites for enquiries.',
    trail: [{ label: 'Our Work' }],
    content: html`
      ${pageHero({
        eyebrow: 'Our work',
        title: 'Live projects and',
        serif: 'concept builds',
        lead: 'Below are websites we have built and put online, alongside concept projects created to demonstrate how we structure home-service sites. Concept projects are labelled as such — they are not client engagements.',
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: cta.project.label, href: cta.project.href, variant: 'secondary' },
        ],
        art: '/assets/images/portfolio/concept-tree-service.svg',
        artAlt:
          'Concept website mockup for a tree service company showing an emergency call banner, service cards and a quote form',
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'Live projects',
            title: 'Websites we have built and',
            serif: 'put online',
            lead: 'We do not publish traffic, ranking or lead figures for client sites. Anything we cannot verify, we do not claim.',
          })}
          <div class="project-grid">
            ${liveProjects.map((project) => projectCard(project))}
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'Concept projects',
            title: 'How we would build for',
            serif: 'home services',
            lead: 'Demonstration builds, created to show structure and conversion thinking for the trades we focus on. These are not client work and are not presented as such.',
          })}
          <div class="project-grid">
            ${conceptProjects.map((project) => projectCard(project))}
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'What you can expect',
            title: 'The same things on every project',
            lead: 'Regardless of trade, budget or size.',
          })}
          <div class="card-grid card-grid--4">
            ${[
              ['A written scope', 'Page list, deliverables, timeline and price agreed before anything is built.'],
              ['Mobile-first build', 'Designed for the phone screen your customers actually use.'],
              ['Local SEO structure', 'Titles, headings, schema, internal links and service-area pages set up from the start.'],
              ['Full ownership', 'The site, the domain and the analytics accounts are yours, registered in your name.'],
            ].map(([title, body]) => infoCard({ title, body }))}
          </div>
        `,
      })}

      ${finalCta({
        title: 'Want something like this for',
        serif: 'your business?',
        lead: 'Send us your current website and we will tell you exactly what we would change, and what it would take.',
      })}
    `,
  });
}

function projectCard(project) {
  return html`<article class="project">
    <div class="project__media">
      <img src="${project.art}" alt="${project.artAlt}" width="1200" height="760" loading="lazy" decoding="async" />
      ${project.type === 'concept' && html`<span class="project__flag">Concept Project</span>`}
    </div>
    <div class="project__body">
      <p class="project__industry">${project.industry}</p>
      <h3 class="project__name">${project.name}</h3>
      <div class="project__detail"><h4>Challenge</h4><p>${project.challenge}</p></div>
      <div class="project__detail"><h4>Approach</h4><p>${project.approach}</p></div>
      <div class="project__detail"><h4>Main features</h4>${checkList(project.features, { className: 'check-list--compact' })}</div>
      ${project.url
        ? button({ label: 'Visit live website', href: project.url, variant: 'secondary', external: true, block: true })
        : html`<p class="project__note">A demonstration build, not a client engagement. We can walk you through it on a call.</p>`}
    </div>
  </article>`;
}

/* ------------------------------------------------------------------- about */

export function aboutPage() {
  return page({
    path: 'about.html',
    title: 'About Design Rank Studio',
    description:
      'A web design and local SEO studio working remotely with service businesses across the United States. Direct communication, clear scope, conversion-focused work.',
    trail: [{ label: 'About' }],
    content: html`
      ${pageHero({
        eyebrow: 'About',
        title: 'A small studio doing',
        serif: 'one thing properly',
        lead: `${site.name} builds websites and runs local SEO for service businesses. That is the whole offering. We are not a full-service agency and we are not trying to become one.`,
        actions: [
          { label: cta.review.label, href: cta.review.href, variant: 'primary' },
          { label: 'See our work', href: '/portfolio.html', variant: 'secondary' },
        ],
        // FOUNDER IMAGE REQUIRED — deliberately still an illustration.
        //
        // No genuine founder photograph exists anywhere in this project, so
        // this hero keeps the abstract "how we work" artwork. It must not be
        // replaced with a stock portrait: a purchased headshot presented as the
        // founder of this studio would be a straightforward misrepresentation,
        // and the same goes for stock photographs of a team, an office or a US
        // location that do not exist.
        //
        // To fix properly: add a real photograph of the founder to
        // assets/images/ and point `art` at it, with alt text naming the person.
        // See docs/CONTENT-NEEDED.md item 4.
        art: '/assets/images/art/about-remote.svg',
        artAlt:
          'A project conversation panel connected to a map of the United States with service-area markers',
      })}

      ${section({
        tone: 'tint',
        children: html`
          <div class="split">
            <div>
              <p class="eyebrow">How we work</p>
              <h2 class="section-heading__title">Remote, direct and specific</h2>
              <div class="prose mt-lg">
                <p>
                  ${site.name} works remotely with service businesses across the United States. Everything happens over
                  calls, email and messages — there are no in-person visits, and none are needed to build a website or
                  run a local search campaign.
                </p>
                <p>
                  You deal directly with the person doing the work. There is no account manager passing messages along
                  and no junior handed the project after the sale. When you ask why a page is structured the way it is,
                  you get the actual reason.
                </p>
                <p>
                  We start with strategy: what you sell, where you sell it, which jobs are worth the most, and what your
                  competitors are already doing well. Design follows from that. So does the local SEO structure, which
                  is built in from the start rather than added later.
                </p>
                <p>
                  We would rather tell you a project is not worth doing than sell you one. If a review shows your site
                  is already working, we will say so.
                </p>
              </div>
            </div>
            <div>
              <div class="callout">
                <p><strong>What we do</strong></p>
                <p>Lead-generation website design, website redesign, local SEO and landing pages for US service businesses.</p>
              </div>
              <div class="callout mt-lg">
                <p><strong>Who we do it for</strong></p>
                <p>
                  Primarily specialty home-service companies — tree services, concrete, fencing, landscaping, pool,
                  garage doors, roofing and outdoor services — plus real estate firms, solo attorneys and other
                  established local businesses.
                </p>
              </div>
              <div class="callout mt-lg">
                <p><strong>What we do not do</strong></p>
                <p>
                  Guarantee rankings or lead volume. Lock you into contracts you cannot leave. Hold your domain,
                  hosting or analytics hostage. Sell you services you do not need.
                </p>
              </div>
            </div>
          </div>
        `,
      })}

      ${whyChooseSection()}

      ${section({
        tone: 'tint',
        children: html`
          ${sectionHeading({
            eyebrow: 'Track record',
            title: 'Websites we have built',
            lead: 'Live projects across legal and content-driven websites, plus concept builds for the home-service trades we focus on.',
          })}
          <div class="card-grid card-grid--4">
            ${liveProjects.map((project) =>
              linkCard({
                href: '/portfolio.html',
                meta: project.industry,
                title: project.name,
                body: project.approach.split('.')[0] + '.',
                cta: 'See the case study',
              }),
            )}
          </div>
        `,
      })}

      ${processSection()} ${finalCta()}
    `,
  });
}

/* ----------------------------------------------------------------- contact */

export function contactPage() {
  return page({
    path: 'contact.html',
    title: 'Contact Design Rank Studio',
    description:
      'Get in touch about a website, redesign or local SEO project for your service business. Tell us what you want to improve and we will reply with a practical next step.',
    trail: [{ label: 'Contact' }],
    content: html`
      ${pageHero({
        eyebrow: 'Contact',
        title: 'Tell us what you want to',
        serif: 'improve',
        lead: 'Describe your business and what is not working. We will reply with a straight answer about whether a redesign, a new website or a local SEO campaign is the right starting point — and what it would cost.',
        aside: html`
          <div class="contact-methods">
            <a class="contact-method" href="${site.whatsapp.url}" target="_blank" rel="noopener">
              <span class="contact-method__icon" aria-hidden="true">${icon('chat')}</span>
              <span>
                <span class="contact-method__label">WhatsApp</span>
                <span class="contact-method__value">${site.whatsapp.display} — often the fastest way to reach us</span>
              </span>
            </a>
            <div class="contact-method">
              <span class="contact-method__icon" aria-hidden="true">${icon('clock')}</span>
              <span>
                <span class="contact-method__label">Response time</span>
                <span class="contact-method__value">We reply to project enquiries within one business day</span>
              </span>
            </div>
            <div class="contact-method">
              <span class="contact-method__icon" aria-hidden="true">${icon('pin')}</span>
              <span>
                <span class="contact-method__label">Where we work</span>
                <span class="contact-method__value">Remotely with service businesses across the United States</span>
              </span>
            </div>
          </div>
        `,
      })}

      ${section({
        tone: 'tint',
        id: 'contact-form',
        children: html`
          <div class="review-layout">
            <div class="review-layout__info">
              <p class="eyebrow">Project enquiry</p>
              <h2 class="section-heading__title">What to include</h2>
              ${checkList([
                { title: 'Your trade and main services', body: 'Especially the jobs you want more of.' },
                { title: 'The areas you cover', body: 'Towns or counties where you actually want work.' },
                { title: 'Your current website', body: 'If you have one — even if you are not happy with it.' },
                { title: 'What is not working', body: 'Too few enquiries, wrong kind of enquiries, invisible in search, or all three.' },
                { title: 'Timeline and budget', body: 'Rough is fine. It helps us recommend something realistic.' },
              ])}
              <div class="callout mt-lg">
                <p>
                  <strong>Not ready for a project conversation?</strong> Request a
                  <a href="/website-review.html">free website review</a> instead. No cost, no obligation, and you get a
                  written summary either way.
                </p>
              </div>
            </div>
            <div class="review-layout__form">${reviewForm({ id: 'contact' })}</div>
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({ eyebrow: 'Services', title: 'What we can help with' })}
          <div class="card-grid card-grid--4">
            ${promotedServices.map((service) =>
              linkCard({
                href: service.href,
                iconName: service.icon,
                title: service.name,
                body: service.tagline,
              }),
            )}
          </div>
        `,
      })}

      ${faqSection({ items: faqs.slice(0, 6), tone: 'tint' })}
    `,
    schema: [faqSchema(faqs.slice(0, 6))],
  });
}

/* ----------------------------------------------------------------- pricing */

export function pricingPage() {
  const pricingFaqs = [
    faqs[0],
    faqs[1],
    {
      q: 'What is not included in the starting price?',
      a: 'Domain registration, hosting and any paid third-party tools are billed to you directly at cost — we do not mark them up or resell them. Photography, logo design and paid advertising budgets are separate. Anything outside the agreed scope is quoted before it is started.',
    },
    {
      q: 'Do you require a long contract for local SEO?',
      a: 'No. Local SEO runs month to month. We ask for a realistic commitment of three to six months because that is how long meaningful movement takes, but you are not locked in.',
    },
    faqs[4],
    faqs[9],
  ];

  return page({
    path: 'pricing.html',
    title: 'Packages and Pricing',
    description:
      'Website refresh from $1,000, lead-generation website from $1,500, local SEO from $500 per month. Written scope agreed before any work starts.',
    trail: [{ label: 'Packages & Pricing' }],
    schema: [
      faqSchema(pricingFaqs),
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Website and local SEO packages',
        itemListElement: packages.map((pack, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: pack.name,
          description: pack.summary,
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: pack.price.replace(/[$,]/g, ''),
            priceCurrency: 'USD',
            valueAddedTaxIncluded: false,
            description: `${pack.unit} ${pack.price}`,
          },
        })),
      },
    ],
    content: html`
      ${pageHero({
        eyebrow: 'Packages & pricing',
        title: 'Clear starting points, with',
        serif: 'no surprises',
        lead: 'These are starting prices, not fixed quotes. Every project gets a written scope with a firm figure before any work begins.',
        actions: [
          { label: cta.proposal.label, href: cta.proposal.href, variant: 'primary' },
          { label: cta.review.label, href: cta.review.href, variant: 'secondary' },
        ],
        art: '/assets/images/art/service-landing-pages.svg',
        artAlt: 'A landing page mockup beside a chart showing quote requests rising over time',
      })}

      ${packagesSection({
        eyebrow: 'Three packages',
        title: 'Pick the starting point that matches',
        serif: 'where you are',
        lead: 'Each one can be expanded. None of them lock you into anything.',
      })}

      ${section({
        tone: 'white',
        children: html`
          ${sectionHeading({
            eyebrow: 'What moves the price',
            title: 'The four things that change a quote',
            lead: 'None of them are hidden, and all of them are agreed before work starts.',
          })}
          <div class="card-grid card-grid--4">
            ${[
              ['Page count', 'How many services and service areas need their own page. This is the single biggest factor.'],
              ['Content', 'Whether we write your service and location pages or you supply the copy.'],
              ['Integrations', 'Booking systems, CRMs, payment links, call tracking or anything else that needs connecting.'],
              ['Market competition', 'How hard the local search market is affects the SEO effort, not the build price.'],
            ].map(([title, body]) => infoCard({ title, body }))}
          </div>
          <div class="callout mt-lg">
            <p><strong>No aggressive sales tactics.</strong> There are no countdown timers, no limited-time discounts and no pressure to sign today. The price is the price, and it will be the same next week.</p>
          </div>
        `,
      })}

      ${processSection()}
      ${faqSection({ items: pricingFaqs, title: 'Pricing questions', tone: 'tint' })}
      ${finalCta({
        title: 'Not sure which package',
        serif: 'fits?',
        lead: 'Describe your business and what you want to improve. We will tell you which starting point makes sense and what it would cost.',
      })}
    `,
  });
}

export { raw, projects, featuredIndustries, industryHref, pricingNote, principles, figure };
