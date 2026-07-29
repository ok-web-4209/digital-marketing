/**
 * Single source of truth for brand, contact, navigation and shared copy.
 *
 * Only verifiable facts belong here. The studio has no published founder name,
 * physical address, domain email address or client testimonials, so none are
 * invented anywhere in the site. See docs/CONTENT-NEEDED.md.
 */

export const site = {
  name: 'Design Rank Studio',
  shortName: 'Design Rank',
  origin: 'https://designrankstudio.com',
  locale: 'en_US',
  lang: 'en',
  tagline: 'Websites and local SEO for service businesses',
  positioning:
    'Design Rank Studio builds professional, conversion-focused websites and local SEO campaigns that help service businesses generate more calls, quote requests and customers.',
  footerBlurb:
    'Websites and local SEO for tree services, concrete contractors, fence installers, landscapers and other established service businesses across the United States.',
  analyticsId: 'G-664QM0C3M2',
  // Formspree endpoints are public form IDs by design — no secret is exposed here.
  formEndpoint: 'https://formspree.io/f/xykayvzn',
  whatsapp: {
    number: '447827775084',
    display: '+44 7827 775084',
    url: 'https://wa.me/447827775084',
  },
  serviceArea: 'United States',
};

export const cta = {
  review: { label: 'Request a Free Website Review', href: '/website-review.html' },
  reviewShort: { label: 'Request a Website Review', href: '/website-review.html' },
  work: { label: 'View Our Work', href: '/portfolio.html' },
  project: { label: 'Discuss Your Project', href: '/contact.html' },
  proposal: { label: 'Request a Proposal', href: '/contact.html' },
};

export const nav = [
  {
    label: 'Services',
    href: '/services.html',
    children: [
      { label: 'Lead-Generation Website Design', href: '/services/website-design.html', blurb: 'New websites built to produce enquiries' },
      { label: 'Website Redesign', href: '/services/website-redesign.html', blurb: 'Modernize an outdated website' },
      { label: 'Local SEO', href: '/services/local-seo.html', blurb: 'Show up when neighbours search' },
      { label: 'Landing Pages', href: '/services/landing-pages.html', blurb: 'Campaign, service and location pages' },
      { label: 'Website Maintenance', href: '/services/website-maintenance.html', blurb: 'Optional ongoing care' },
      { label: 'Packages & Pricing', href: '/pricing.html', blurb: 'Starting points and scope' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries.html',
    children: [
      { label: 'Home Services Overview', href: '/industries/home-services.html', blurb: 'Our primary market' },
      { label: 'Tree Services', href: '/industries/tree-service-websites.html', blurb: 'Removal, trimming, emergency work' },
      { label: 'Concrete Contractors', href: '/industries/concrete-contractor-websites.html', blurb: 'Driveways, patios, flatwork' },
      { label: 'Fence Companies', href: '/industries/fence-company-websites.html', blurb: 'Wood, vinyl, aluminium, chain link' },
      { label: 'Landscaping', href: '/industries/landscaping-websites.html', blurb: 'Design, build and maintenance' },
      { label: 'Pool Services', href: '/industries/pool-service-websites.html', blurb: 'Cleaning, repair, renovation' },
      { label: 'Garage Doors', href: '/industries/garage-door-websites.html', blurb: 'Repair, install, openers' },
      { label: 'Roofing', href: '/industries/roofing-websites.html', blurb: 'Repair, replacement, storm work' },
      { label: 'Outdoor Services', href: '/industries/outdoor-services-websites.html', blurb: 'Pressure washing, decks, lighting' },
      { label: 'Real Estate', href: '/industries/real-estate-websites.html', blurb: 'Agents, teams and brokerages' },
      { label: 'Attorneys & Law Firms', href: '/industries/attorney-websites.html', blurb: 'Solo attorneys and small firms' },
    ],
  },
  { label: 'Our Work', href: '/portfolio.html' },
  { label: 'About', href: '/about.html' },
  { label: 'Contact', href: '/contact.html' },
];

export const trustPoints = [
  { label: 'Conversion-focused design', icon: 'target' },
  { label: 'Local SEO structure', icon: 'pin' },
  { label: 'Mobile-first development', icon: 'phone' },
  { label: 'Clear project scope', icon: 'clipboard' },
  { label: 'Direct communication', icon: 'chat' },
];

export const principles = [
  {
    title: 'Strategy before design',
    body: 'We start with your services, your service area and the jobs you actually want more of. Layout decisions come after that, not before.',
    icon: 'compass',
  },
  {
    title: 'Built to generate enquiries',
    body: 'Every page has an obvious next step: call, request a quote or send a message. Nothing important is buried two clicks deep.',
    icon: 'target',
  },
  {
    title: 'Local SEO from the beginning',
    body: 'Service pages, service-area pages and page titles are structured for local search while the site is being built, not bolted on later.',
    icon: 'pin',
  },
  {
    title: 'Clear pricing and project scope',
    body: 'You get a written scope with page count, deliverables and timeline before work starts, so there are no surprise invoices.',
    icon: 'clipboard',
  },
  {
    title: 'Mobile-first development',
    body: 'Most service-business visitors arrive on a phone. Layouts are designed for that screen first, then expanded for desktop.',
    icon: 'phone',
  },
  {
    title: 'Direct communication',
    body: 'You talk to the person doing the work. No account manager relaying messages, no ticket queue.',
    icon: 'chat',
  },
  {
    title: 'No unnecessary technical complexity',
    body: 'Fast, maintainable websites without plugin sprawl or systems you will need to pay someone else to operate.',
    icon: 'layers',
  },
  {
    title: 'Designed for long-term growth',
    body: 'Structure that lets you add services, locations and landing pages over time without rebuilding the site.',
    icon: 'growth',
  },
];

export const process = [
  {
    step: '01',
    title: 'Discovery',
    body: 'We go through your services, the areas you cover, the jobs worth the most to you, your competitors and what is working now.',
    points: ['Services and job types', 'Target towns and counties', 'Current site and analytics review', 'Competitor comparison'],
  },
  {
    step: '02',
    title: 'Strategy and Content',
    body: 'We map the page structure, the conversion path and the local search opportunities, then write or shape the content to match.',
    points: ['Sitemap and page plan', 'Keyword and service-area research', 'Conversion flow and calls to action', 'Content outlines or full copy'],
  },
  {
    step: '03',
    title: 'Design and Development',
    body: 'We design and build the site mobile-first, with quote forms, click-to-call, review displays and clean, fast code.',
    points: ['Mobile-first design', 'Quote forms and click-to-call', 'Reviews and trust elements', 'Speed and accessibility checks'],
  },
  {
    step: '04',
    title: 'Launch and Growth',
    body: 'We test everything, launch, connect analytics, and give you the option to keep improving rankings and conversions.',
    points: ['Pre-launch testing', 'Analytics and call tracking setup', 'Search Console and sitemap submission', 'Optional ongoing local SEO'],
  },
];

export const problems = [
  { title: 'The website looks outdated', body: 'A design that looks ten years old makes an established business feel less capable than it is.' },
  { title: 'It is difficult to use on a phone', body: 'Text too small to read and buttons too small to tap send people straight back to search results.' },
  { title: 'Visitors cannot easily request a quote', body: 'No visible form, no click-to-call button, and a contact page hidden at the end of the menu.' },
  { title: 'Services are not clearly explained', body: 'One vague page listing everything you do, instead of a real page for each service you want to sell.' },
  { title: 'The business does not appear in local searches', body: 'Competitors show up for "near me" searches in your towns and you do not.' },
  { title: 'The website lacks service-area pages', body: 'Nothing on the site tells Google or a homeowner which towns and counties you actually cover.' },
  { title: 'Good Google reviews are not shown', body: 'Years of five-star reviews sitting on a profile page instead of building trust on your website.' },
  { title: 'Competitors appear more established', body: 'Sharper photos, clearer pricing and better structure make a smaller competitor look like the safer choice.' },
];
