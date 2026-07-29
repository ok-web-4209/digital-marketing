/**
 * Starting packages. Prices are starting points, never fixed quotes —
 * the scope note below is shown everywhere packages appear.
 */

export const packages = [
  {
    name: 'Website Refresh',
    price: '$1,000',
    unit: 'starting at',
    summary: 'For businesses that need to modernize and improve an existing website.',
    best: 'Best when the content is broadly right but the design, mobile experience and calls to action are losing you enquiries.',
    features: [
      'Design modernization across existing pages',
      'Mobile experience rebuilt',
      'Clear calls to action and quote paths',
      'Speed and usability improvements',
      'Reviews and trust elements added',
      'Analytics connected and verified',
    ],
    cta: { label: 'Request a Proposal', href: '/contact.html' },
    featured: false,
  },
  {
    name: 'Lead-Generation Website',
    price: '$1,500',
    unit: 'starting at',
    summary: 'For service businesses that need a professionally structured website designed to generate quote requests.',
    best: 'Best when you are starting fresh, or the current site is too dated to be worth saving.',
    features: [
      'Custom design built around your services',
      'Service page for each service you sell',
      'Service-area pages for your coverage',
      'Quote-request forms and click-to-call',
      'Reviews, credentials and trust elements',
      'Local SEO structure and schema markup',
      'Analytics and Search Console setup',
    ],
    cta: { label: 'Request a Proposal', href: '/contact.html' },
    featured: true,
    badge: 'Most requested',
  },
  {
    name: 'Local SEO',
    price: '$500',
    unit: 'per month, starting at',
    summary: 'For businesses that want stronger visibility in local search results.',
    best: 'Best once you have a site worth sending traffic to. Runs monthly with no long lock-in.',
    features: [
      'Keyword and competitor research',
      'On-page optimization across the site',
      'New service and location pages each month',
      'Google Business Profile management',
      'Technical SEO monitoring and fixes',
      'Rank tracking and a monthly report',
    ],
    cta: { label: 'Discuss Your Project', href: '/contact.html' },
    featured: false,
  },
];

export const pricingNote =
  'Final pricing depends on scope, page count, content, integrations and how competitive your market is. Every project starts with a written scope so you know exactly what is included before any work begins.';
