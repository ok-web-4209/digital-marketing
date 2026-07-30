/**
 * The four promoted services plus one secondary add-on.
 *
 * `promoted: false` keeps maintenance out of the homepage service grid while
 * still giving it a real page, sitemap entry and footer link.
 */

export const services = [
  {
    slug: 'website-design',
    href: '/services/website-design.html',
    name: 'Lead-Generation Website Design',
    navLabel: 'Website Design',
    shortName: 'Website Design',
    promoted: true,
    icon: 'browser',
    art: '/assets/images/art/service-website-design.svg',
    artAlt:
      'Mockup of a tree-service website homepage with a call button, quote form and service cards, shown on desktop and mobile',
    homeImageUrl:
      'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1400&h=1050&q=82',
    homeImageAlt: 'Website designer reviewing responsive website wireframes on a laptop and tablet',
    homeImageSourceUrl: 'https://unsplash.com/photos/macbook-pro-beside-apple-magic-mouse-zvmZiw3vdsQ',
    tagline: 'A website built to turn visitors into quote requests',
    problem:
      'Most service-business websites are built like a brochure. They describe the company, list a phone number somewhere, and leave the visitor to work out the rest. Homeowners comparing three contractors on a phone will pick whichever one makes it easiest to get a price.',
    outcome:
      'A site where a homeowner can understand what you do, see that other people trust you, and request a quote in under a minute — on any device.',
    includes: [
      { title: 'Custom business website', body: 'Designed around your services and market, not a stock template every competitor in your state is also using.' },
      { title: 'Mobile-responsive design', body: 'Built for phone screens first, where most service-business traffic actually arrives.' },
      { title: 'Quote-request forms', body: 'Short, well-labelled forms placed where people decide, with the fields you need to price a job.' },
      { title: 'Click-to-call functionality', body: 'A tap-to-dial button in the header and at every decision point on mobile.' },
      { title: 'Service pages', body: 'A dedicated page for each service you want to sell, so both homeowners and search engines see the detail.' },
      { title: 'Service-area pages', body: 'Real pages for the towns and counties you cover, written to be genuinely useful rather than duplicated.' },
      { title: 'Reviews and trust elements', body: 'Google reviews, licence and insurance details, guarantees and project photos placed where they change a decision.' },
      { title: 'Analytics setup', body: 'Google Analytics and Search Console connected so you can see calls, form submissions and traffic sources.' },
    ],
    meta: {
      title: 'Lead-Generation Website Design',
      description:
        'Custom, mobile-first websites for US service businesses — with quote forms, click-to-call, service pages, service-area pages and analytics setup.',
    },
    faqs: [
      {
        q: 'How many pages does a service-business website need?',
        a: 'Most start between eight and fifteen pages: a home page, an about page, a contact page, a page for each service you want to sell, and pages for your main service areas. We agree the exact page list during discovery and write it into the scope.',
      },
      {
        q: 'Can you build the site around the way I already sell?',
        a: 'Yes. If most of your work comes from emergency calls we make the phone number impossible to miss. If you quote from photos we build the form around uploads and job details. The structure follows how you actually win work.',
      },
    ],
  },
  {
    slug: 'website-redesign',
    href: '/services/website-redesign.html',
    name: 'Website Redesign',
    navLabel: 'Website Redesign',
    shortName: 'Redesign',
    promoted: true,
    icon: 'refresh',
    art: '/assets/images/art/service-redesign.svg',
    artAlt:
      'Side-by-side comparison of a cluttered outdated contractor website and a clean modern redesign with a visible quote button',
    homeImageUrl:
      'https://images.unsplash.com/photo-1542744095-0d53267d353e?auto=format&fit=crop&w=1400&h=1050&q=82',
    homeImageAlt:
      'Designer working on a modern conversion-focused website displayed on a desktop monitor',
    homeImageSourceUrl:
      'https://unsplash.com/photos/woman-sitting-in-front-of-turned-on-computer-monitor-ARW7Ic7MSAM',
    tagline: 'Keep the business you have built. Replace the website holding it back.',
    problem:
      'Your business has grown but the website has not. It was built years ago, it is awkward on a phone, and it no longer reflects the quality of your work. Rebuilding feels risky because the site still brings in some calls.',
    outcome:
      'A modern site that keeps your existing rankings and content strengths, fixes what is losing you enquiries, and finally looks like the business your customers actually meet.',
    includes: [
      { title: 'Modernization of outdated design', body: 'A current, professional look that matches the standard of work you deliver.' },
      { title: 'Improved mobile experience', body: 'Readable text, tappable buttons and layouts rebuilt for phones rather than shrunk down from desktop.' },
      { title: 'Better calls to action', body: 'Clear next steps on every page instead of a single contact link in the navigation.' },
      { title: 'Improved speed and usability', body: 'Lighter pages, properly sized images and simpler navigation so visitors do not give up waiting.' },
      { title: 'Stronger trust and credibility', body: 'Reviews, credentials, guarantees and real project photos brought forward instead of hidden.' },
      { title: 'Conversion-focused page structure', body: 'Pages reorganized around the questions people ask before they call for a price.' },
    ],
    meta: {
      title: 'Website Redesign for Service Businesses',
      description:
        'Redesign an outdated service-business website: better mobile experience, clearer calls to action, faster pages, stronger trust signals and a conversion-focused structure.',
    },
    faqs: [
      {
        q: 'Will a redesign hurt my current Google rankings?',
        a: 'It should not, provided the migration is handled properly. We keep the URLs that already rank where we can, redirect the ones that have to change, carry the useful content across, and resubmit the sitemap after launch.',
      },
      {
        q: 'Can you keep parts of my existing site?',
        a: 'Yes. Photos, service descriptions, reviews and pages that already earn traffic are worth keeping. We audit what exists first and tell you plainly what to keep, rewrite or retire.',
      },
    ],
  },
  {
    slug: 'local-seo',
    href: '/services/local-seo.html',
    name: 'Local SEO',
    navLabel: 'Local SEO',
    shortName: 'Local SEO',
    promoted: true,
    icon: 'pin',
    art: '/assets/images/art/service-local-seo.svg',
    artAlt:
      'Local search results panel showing a map, a Google Business Profile card and a keyword ranking table for a service business',
    homeImageUrl:
      'https://images.unsplash.com/photo-1595374827334-4be516468272?auto=format&fit=crop&w=1400&h=1050&q=82',
    homeImageAlt: 'Laptop displaying website traffic and performance analytics in a modern workspace',
    homeImageSourceUrl: 'https://unsplash.com/photos/macbook-pro-beside-white-ceramic-mug-SK5jOjXxGRA',
    tagline: 'Be the business people find when they search in your area',
    problem:
      'When someone in your area searches for the work you do, the businesses at the top get the call. If your site has no service-area pages, thin service content or a neglected Google Business Profile, you are invisible for the searches that matter most.',
    outcome:
      'Steady visibility for the services and towns that produce your best jobs, with reporting that shows what moved and what is next.',
    includes: [
      { title: 'Keyword research', body: 'The searches homeowners in your area actually use, sorted by how likely they are to end in a booked job.' },
      { title: 'On-page optimization', body: 'Titles, headings, internal links and content structured for the terms each page should win.' },
      { title: 'Service and location pages', body: 'Substantial pages for each service and each area you cover — never thin, duplicated location filler.' },
      { title: 'Google Business Profile support', body: 'Categories, services, service areas, photos, posts and a practical process for collecting more reviews.' },
      { title: 'Technical SEO', body: 'Crawlability, page speed, mobile usability, schema markup, sitemaps and broken-link cleanup.' },
      { title: 'Local search strategy', body: 'Which towns to target first, which services to expand, and where competitors are beatable.' },
      { title: 'Rank tracking and reporting', body: 'A monthly report showing rankings, traffic, calls and form submissions in plain language.' },
    ],
    meta: {
      title: 'Local SEO for Service Businesses',
      description:
        'Local SEO for US service businesses: keyword research, service and location pages, Google Business Profile support, technical SEO and monthly rank tracking.',
    },
    faqs: [
      {
        q: 'How long before local SEO shows results?',
        a: 'Technical fixes and Google Business Profile improvements can show up within a few weeks. Competitive service and location terms usually take three to six months of consistent work. Anyone promising faster than that is guessing.',
      },
      {
        q: 'Do you guarantee first-page rankings?',
        a: 'No, and you should be wary of anyone who does. Nobody controls Google\'s results. What we control is the structure, content, technical health and profile signals that make ranking possible — and we report honestly on what they produce.',
      },
    ],
  },
  {
    slug: 'landing-pages',
    href: '/services/landing-pages.html',
    name: 'Landing Pages',
    navLabel: 'Landing Pages',
    shortName: 'Landing Pages',
    promoted: true,
    icon: 'bolt',
    art: '/assets/images/art/service-landing-pages.svg',
    artAlt:
      'Campaign landing page mockup with a headline, quote form and trust badges, next to a chart showing form submissions',
    homeImageUrl:
      'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?auto=format&fit=crop&w=1400&h=1050&q=82',
    homeImageAlt:
      'Close-up of a focused modern website landing page displayed on a computer screen',
    homeImageSourceUrl: 'https://unsplash.com/photos/computer-screen-displaying-website-home-page-Ylk5n_nd9dA',
    tagline: 'Focused pages for the campaigns and areas you are pushing hardest',
    problem:
      'Sending paid traffic to your homepage wastes it. Someone who clicked an ad for driveway replacement in a specific town should land on a page about exactly that, not on a general overview of everything you offer.',
    outcome:
      'Pages matched to what the visitor searched for, with one clear action, so more of the traffic you pay for turns into quote requests.',
    includes: [
      { title: 'Campaign-specific landing pages', body: 'Pages that mirror the wording of your Google or Meta ads so the visitor knows immediately they are in the right place.' },
      { title: 'Location landing pages', body: 'Pages for the towns you are expanding into, with local detail rather than a swapped-out place name.' },
      { title: 'Service landing pages', body: 'Deep pages for the single service you most want more of, covering pricing questions, process and objections.' },
      { title: 'Quote-generation pages', body: 'Stripped-back pages with one action, built to be tested and improved over time.' },
    ],
    meta: {
      title: 'Landing Pages for Service-Business Campaigns',
      description:
        'Campaign, location and service landing pages for US service businesses — built to convert paid and local search traffic into quote requests.',
    },
    faqs: [
      {
        q: 'Do landing pages work without paid ads?',
        a: 'Yes. Service and location landing pages are just as useful for organic local search, and they are often the pages that rank for "service + town" queries.',
      },
      {
        q: 'Can landing pages be added to my existing website?',
        a: 'Usually, yes — as long as your current site can take new pages without breaking its design. We look at the platform first and tell you if it is practical.',
      },
    ],
  },
  {
    slug: 'website-maintenance',
    href: '/services/website-maintenance.html',
    name: 'Website Maintenance',
    navLabel: 'Website Maintenance',
    shortName: 'Maintenance',
    promoted: false,
    icon: 'shield',
    art: '/assets/images/art/service-maintenance.svg',
    artAlt: 'Website health checklist showing uptime, backup, update and speed status indicators',
    tagline: 'Optional ongoing care once your site is live',
    problem:
      'A website is not finished at launch. Content goes stale, forms quietly break, and small technical problems accumulate until something visible fails.',
    outcome:
      'A site that stays fast, current and working, without you having to remember to check it.',
    includes: [
      { title: 'Content updates', body: 'New services, seasonal offers, updated photos and revised pricing as your business changes.' },
      { title: 'Technical upkeep', body: 'Backups, uptime monitoring, security updates and broken-link checks.' },
      { title: 'Form and tracking checks', body: 'Regular verification that quote forms deliver and analytics is still recording.' },
      { title: 'Performance monitoring', body: 'Page speed and Core Web Vitals watched so problems are caught before rankings move.' },
    ],
    meta: {
      title: 'Website Maintenance for Service Businesses',
      description:
        'Optional website maintenance for service businesses: content updates, backups, security, form checks and performance monitoring after launch.',
    },
    faqs: [
      {
        q: 'Is maintenance required?',
        a: 'No. It is an add-on. You own the site and can maintain it yourself or with anyone else. Most owners take it because they would rather not think about it.',
      },
    ],
  },
];

export const promotedServices = services.filter((service) => service.promoted);

export function serviceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}
