/**
 * Portfolio case studies.
 *
 * `type: 'live'`  — a real website we built that is publicly online.
 * `type: 'concept'` — a demonstration build. These are labelled as concept
 *   projects everywhere they appear and are never presented as client work.
 *
 * No performance figures, traffic numbers or ranking claims appear here
 * because none have been supplied or verified.
 */

export const projects = [
  {
    type: 'live',
    name: 'hoffman.legal',
    industry: 'Legal — Attorney Website',
    url: 'https://hoffman.legal',
    art: '/assets/images/portfolio/hoffman-legal.svg',
    artAlt: 'Website preview of hoffman.legal showing a legal practice homepage with practice areas and a consultation call to action',
    challenge:
      'A legal practice needed a website that established credibility immediately and made practice areas easy to understand for people who are not lawyers.',
    approach:
      'A restrained, professional design with a clear practice-area structure, plain-language service explanations and a consultation path visible from every page.',
    features: ['Practice area page structure', 'Consultation-focused calls to action', 'Plain-language service copy', 'Mobile-first layout'],
  },
  {
    type: 'live',
    name: 'floridadepositlaw.com',
    industry: 'Legal — Niche Local SEO',
    url: 'https://floridadepositlaw.com',
    art: '/assets/images/portfolio/florida-deposit-law.svg',
    artAlt: 'Website preview of floridadepositlaw.com showing a security deposit law resource site with guide navigation',
    challenge:
      'A specific legal niche — Florida security deposit disputes — needed content that matched how tenants and landlords actually search for help.',
    approach:
      'A content-led site organized around search intent, with guide pages covering the questions people ask before they contact an attorney, and internal linking that keeps visitors moving toward the enquiry path.',
    features: ['Search-intent page planning', 'Guide-style content structure', 'Internal linking between related topics', 'Fast static pages'],
  },
  {
    type: 'live',
    name: 'floridamugshotattorney.com',
    industry: 'Legal — Criminal Defense Niche',
    url: 'https://floridamugshotattorney.com',
    art: '/assets/images/portfolio/florida-mugshot-attorney.svg',
    artAlt: 'Website preview of floridamugshotattorney.com showing a criminal defense niche site with a clear enquiry path',
    challenge:
      'A narrow criminal-defense service needed a site that spoke to an urgent, sensitive situation without feeling clinical or alarming.',
    approach:
      'Direct positioning on a single service, a short path from landing to enquiry, and a layout that answers the immediate question before asking for contact details.',
    features: ['Single-service positioning', 'Short enquiry path', 'Local search structure', 'Lead-focused layout'],
  },
  {
    type: 'live',
    name: 'skillmigrate.com',
    industry: 'Education & Migration — Content Site',
    url: 'https://skillmigrate.com',
    art: '/assets/images/portfolio/skillmigrate.svg',
    artAlt: 'Website preview of skillmigrate.com showing an education and migration guide site with category navigation',
    challenge:
      'A large volume of guide content needed a structure people could navigate without getting lost.',
    approach:
      'A clear information architecture with category navigation, consistent guide templates and internal linking that surfaces related material at the right moment.',
    features: ['Information architecture for large content sets', 'Consistent guide templates', 'Category navigation', 'Clean, fast page delivery'],
  },
  {
    type: 'concept',
    name: 'Ridgeline Tree Care',
    industry: 'Tree Service — Concept Project',
    url: null,
    art: '/assets/images/portfolio/concept-tree-service.svg',
    artAlt: 'Concept website mockup for a tree service company showing an emergency call banner, service cards and a quote form',
    challenge:
      'Demonstration build showing how a tree-service site can serve planned trimming enquiries and 6am storm-damage calls from the same homepage.',
    approach:
      'A persistent tap-to-call bar on mobile with a separate emergency path, dedicated pages for removal, trimming and stump grinding, certification and insurance stated above the fold, and a quote form that accepts photos.',
    features: ['Emergency call path', 'Service page structure', 'Certification and insurance placement', 'Photo-upload quote form', 'Service-area page template'],
  },
  {
    type: 'concept',
    name: 'Granite Line Concrete',
    industry: 'Concrete Contractor — Concept Project',
    url: null,
    art: '/assets/images/portfolio/concept-concrete.svg',
    artAlt: 'Concept website mockup for a concrete contractor showing a project gallery, finish options and a pricing guide section',
    challenge:
      'Demonstration build showing how a concrete contractor can answer the cost question and present finishes without committing to fixed prices.',
    approach:
      'A page per finish, galleries captioned with square footage and finish type, a pricing guidance section that gives ranges and the factors that move them, and a quote form that captures dimensions before a site visit.',
    features: ['Finish-specific service pages', 'Captioned project galleries', 'Pricing guidance section', 'Dimension-capture quote form'],
  },
  {
    type: 'concept',
    name: 'Cedar & Post Fencing',
    industry: 'Fence Company — Concept Project',
    url: null,
    art: '/assets/images/portfolio/concept-fence.svg',
    artAlt: 'Concept website mockup for a fence company showing material comparison cards and a footage-based quote estimator',
    challenge:
      'Demonstration build showing how a fence company can handle material comparison and per-foot pricing questions before the first phone call.',
    approach:
      'Material pages covering appearance, lifespan and cost range, a side-by-side comparison table, and a quote form built around linear footage, gate count and property photos.',
    features: ['Material comparison pages', 'Cost-range guidance', 'Footage-based quote form', 'Installation gallery by material'],
  },
];

export const liveProjects = projects.filter((project) => project.type === 'live');
export const conceptProjects = projects.filter((project) => project.type === 'concept');
