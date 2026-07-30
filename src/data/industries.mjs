/**
 * Industry pages.
 *
 * Adding a new industry means adding one object here — the hub page, the
 * navigation menu, the footer, the sitemap and the industry page itself are
 * all generated from this list. `featured: true` marks the four most
 * prominent niches on the homepage and hub.
 *
 * Artwork comes in two layers:
 *
 * - `art` / `artAlt` — the generated SVG illustration, which is the fallback
 *   illustration and always exists (src/art.mjs writes it on every build).
 * - `stockImage` / `stockImageAlt` / `stockSourceUrl` — the photograph. This is
 *   either a path into assets/images/stock/ for a file the owner has downloaded,
 *   or an https:// URL served straight from the Unsplash or Pexels image CDN.
 *   `stockSourceUrl` always records the photo *page* it came from, for the
 *   licence record in STOCK-IMAGE-DOWNLOADS.md; it is never rendered as an src.
 * - `photoPosition` — optional `object-position` for photographs whose subject
 *   sits away from the centre, so a 3:2 card crop keeps them in frame. It
 *   applies to the photograph only, never to the illustration.
 *
 * `resolveImage()` in src/lib/media.mjs picks between the layers: a remote URL
 * is used as-is, a local path is used only once the file is on disk, and
 * anything else falls back to the illustration. Note that the remote branch
 * trades the build-time guarantee for a runtime one — the CDN has to answer for
 * the photograph to appear, where a local file cannot fail once committed.
 */

export const industries = [
  {
    slug: 'tree-service-websites',
    name: 'Tree Services',
    featured: true,
    homeService: true,
    art: '/assets/images/art/industry-tree-service.svg',
    artAlt: 'Illustration of a certified arborist roped into a mature tree with a chipper truck parked below',
    stockImage:
      'https://images.unsplash.com/photo-1754321889123-0485c7fea5f1?auto=format&fit=crop&w=1400&h=900&q=82',
    stockImageAlt:
      'Professional tree-service crew trimming a large mature tree beside a residential home',
    stockSourceUrl:
      'https://unsplash.com/photos/a-tree-service-worker-is-trimming-a-large-tree-SAgO9i9Mzvo',
    photoPosition: 'center 48%',
    short: 'Removals, trimming and storm work — including the emergency calls that will not wait for a callback.',
    heading: 'Websites and Local SEO for Tree Service Companies',
    intro:
      'Tree work splits into two very different jobs: the planned trimming a homeowner researches for a week, and the limb on the roof at 6am. Your website has to serve both without making either one hunt for a phone number.',
    challenge:
      'Most tree-service sites bury the phone number, show a handful of dark photos, and say nothing about insurance or certification — the two things a homeowner worries about most before letting someone drop a limb near their house.',
    approach: [
      'A tap-to-call button fixed in view on mobile, with a clearly marked emergency path for storm damage.',
      'Separate pages for removal, trimming and pruning, stump grinding, emergency and storm work, and land clearing.',
      'Insurance, ISA certification and licence details stated plainly near the top rather than buried in a footer.',
      'Before-and-after galleries organized by job type so the scale of work you handle is obvious.',
      'Service-area pages for the towns and counties your crews actually cover.',
    ],
    services: ['Tree Removal', 'Trimming & Pruning', 'Stump Grinding', 'Emergency Storm Work', 'Land Clearing', 'Tree Health & Disease'],
    searches: ['tree removal near me', 'emergency tree service [town]', 'stump grinding cost', 'tree trimming [county]'],
    meta: {
      title: 'Tree Service Website Design & Local SEO',
      description:
        'Websites and local SEO for tree service companies: emergency click-to-call, service pages for removal and trimming, before-and-after galleries and service-area pages.',
    },
  },
  {
    slug: 'concrete-contractor-websites',
    name: 'Concrete Contractors',
    featured: true,
    homeService: true,
    art: '/assets/images/art/industry-concrete.svg',
    artAlt: 'Illustration of a freshly poured and finished concrete driveway in front of a suburban house',
    stockImage:
      'https://images.pexels.com/photos/33405139/pexels-photo-33405139/free-photo-of-concrete-workers-building-driveway-in-fort-worth.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Concrete contractors pouring and finishing a residential driveway',
    stockSourceUrl:
      'https://www.pexels.com/photo/concrete-workers-building-driveway-in-fort-worth-33405139/',
    short: 'Driveways, patios, slabs and decorative work, where photographs of finished jobs do most of the selling.',
    heading: 'Websites and Local SEO for Concrete Contractors',
    intro:
      'Concrete is a considered purchase. Homeowners compare finishes, ask what a driveway costs per square foot, and want to see work that looks like the job they are planning before they call anyone.',
    challenge:
      'Concrete sites tend to be a single page of thumbnails with no explanation of finishes, no sense of price, and no separation between a residential patio and a commercial slab pour.',
    approach: [
      'A page per finish and application — stamped, broom, exposed aggregate, coloured, polished — so search terms have somewhere to land.',
      'Project galleries grouped by job type with square footage and finish named in the caption.',
      'Honest pricing guidance that answers the cost question without committing you to a number.',
      'Clear separation of residential and commercial work so both audiences see themselves.',
      'Quote forms that collect dimensions, finish preference and photos, so you can price without a site visit.',
    ],
    services: ['Driveways', 'Patios & Walkways', 'Stamped & Decorative Concrete', 'Foundations & Slabs', 'Concrete Repair', 'Commercial Flatwork'],
    searches: ['concrete driveway cost [town]', 'stamped concrete patio near me', 'concrete contractors [county]', 'driveway replacement [state]'],
    meta: {
      title: 'Concrete Contractor Websites & Local SEO',
      description:
        'Websites and local SEO for concrete contractors: pages for driveways, patios and stamped finishes, project galleries and quote forms that capture job details.',
    },
  },
  {
    slug: 'fence-company-websites',
    name: 'Fence Companies',
    featured: true,
    homeService: true,
    art: '/assets/images/art/industry-fence.svg',
    artAlt: 'Illustration of an installer setting a new wooden privacy fence along a suburban property line',
    stockImage:
      'https://images.unsplash.com/photo-1747407823747-bcb76a476350?auto=format&fit=crop&w=1400&h=900&q=82',
    stockImageAlt:
      'Construction workers installing a wooden residential fence',
    stockSourceUrl:
      'https://unsplash.com/photos/construction-workers-build-a-wooden-fence-outdoors-htI5kXnidLw',
    photoPosition: 'center center',
    short: 'Wood, vinyl, aluminium and chain link — where most enquiries start with "what would this cost per foot?"',
    heading: 'Websites and Local SEO for Fence Companies',
    intro:
      'Fence buyers shop by material and by the foot. If your site does not explain the difference between cedar and vinyl, or give any sense of cost, they will find a competitor who does.',
    challenge:
      'Fence company websites usually list materials as a single sentence each and send every visitor to the same generic contact form, losing the detail that would let you quote quickly.',
    approach: [
      'A page per material — wood, vinyl, aluminium, chain link, composite — covering appearance, lifespan and typical cost range.',
      'Residential and commercial paths kept distinct, including gates, access control and temporary fencing.',
      'Quote forms that ask for linear footage, material, gate count and property photos.',
      'Galleries showing completed runs on real properties, not manufacturer stock imagery.',
      'Service-area pages for the towns your install crews reach comfortably.',
    ],
    services: ['Wood Fencing', 'Vinyl Fencing', 'Aluminium & Ornamental', 'Chain Link', 'Gates & Automation', 'Fence Repair'],
    searches: ['fence installation cost per foot', 'vinyl fence company near me', 'privacy fence [town]', 'fence repair [county]'],
    meta: {
      title: 'Fence Company Website Design & Local SEO',
      description:
        'Websites and local SEO for fence installers: material pages for wood, vinyl and aluminium, cost guidance, footage-based quote forms and service-area pages.',
    },
  },
  {
    slug: 'landscaping-websites',
    name: 'Landscaping Companies',
    featured: true,
    homeService: true,
    art: '/assets/images/art/industry-landscaping.svg',
    artAlt: 'Illustration of a landscaped front garden with new planting beds, edging and a stone path',
    stockImage:
      'https://images.pexels.com/photos/9029162/pexels-photo-9029162.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Professional landscaping worker mowing and maintaining a green lawn',
    stockSourceUrl:
      'https://www.pexels.com/photo/a-man-cutting-the-grass-using-a-lawn-mower-9029162/',
    short: 'Design-build projects and recurring maintenance, which need to be sold in completely different ways.',
    heading: 'Websites and Local SEO for Landscaping Companies',
    intro:
      'Landscaping covers a five-figure design-build project and a weekly mowing route. The buyers are different people with different questions, and a single "services" page serves neither of them well.',
    challenge:
      'Most landscaping websites mix one-off installations and recurring maintenance into one list, so high-value design-build enquiries arrive alongside price-shopping mowing requests with no way to tell them apart.',
    approach: [
      'Separate paths for design-build projects and recurring maintenance contracts, each with its own form.',
      'Project pages that show the full transformation, not a single finished photo.',
      'Seasonal service pages — spring cleanup, irrigation start-up, fall leaf removal, snow removal where relevant.',
      'Hardscape work given proper weight: patios, retaining walls, walkways, outdoor lighting.',
      'Service-area pages targeting the neighbourhoods where your best contracts already are.',
    ],
    services: ['Landscape Design & Build', 'Lawn Care & Maintenance', 'Hardscaping & Patios', 'Irrigation', 'Planting & Garden Beds', 'Seasonal Cleanups'],
    searches: ['landscaping companies near me', 'landscape design [town]', 'lawn care service [county]', 'retaining wall installation'],
    meta: {
      title: 'Landscaping Website Design & Local SEO',
      description:
        'Websites and local SEO for landscaping companies: separate paths for design-build and maintenance, project galleries and seasonal service pages.',
    },
  },
  {
    slug: 'pool-service-websites',
    name: 'Pool Services',
    featured: false,
    homeService: true,
    art: '/assets/images/art/industry-pool.svg',
    artAlt: 'Illustration of a clean residential swimming pool with patio furniture and service equipment nearby',
    stockImage:
      'https://images.pexels.com/photos/17410701/pexels-photo-17410701/free-photo-of-rubber-hosepipe-in-swimming-pool.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Clean residential swimming pool with professional pool-cleaning equipment in the water',
    stockSourceUrl:
      'https://www.pexels.com/photo/rubber-hosepipe-in-swimming-pool-17410701/',
    short: 'Recurring cleaning routes, equipment repair and renovation work, each on a different sales cycle.',
    heading: 'Websites and Local SEO for Pool Service Companies',
    intro:
      'Pool service is part subscription business, part repair business, part renovation contractor. Recurring cleaning is what makes the year predictable, so the website should make signing up for it effortless.',
    challenge:
      'Pool company sites often lead with renovation photos and hide the weekly service plans, which are the revenue that carries the off-season.',
    approach: [
      'Clear service plans with what is included and how scheduling works, so signing up needs no phone call.',
      'Separate pages for cleaning, equipment repair, green-pool recovery and resurfacing.',
      'Seasonal opening and closing pages that go live before the calls start.',
      'Route-realistic service-area pages rather than a claim to cover an entire state.',
      'Repair enquiry forms that capture equipment make and model up front.',
    ],
    services: ['Weekly Pool Cleaning', 'Equipment Repair', 'Green Pool Recovery', 'Openings & Closings', 'Resurfacing & Renovation', 'Leak Detection'],
    searches: ['pool cleaning service near me', 'pool repair [town]', 'pool opening [county]', 'green pool cleanup'],
    meta: {
      title: 'Pool Service Website Design & Local SEO',
      description:
        'Websites and local SEO for pool service companies: recurring service plans, repair and renovation pages, seasonal opening pages and route-based service-area pages.',
    },
  },
  {
    slug: 'garage-door-websites',
    name: 'Garage Door Companies',
    featured: false,
    homeService: true,
    art: '/assets/images/art/industry-garage-door.svg',
    artAlt: 'Illustration of a technician servicing a residential garage door with a branded service van on the driveway',
    stockImage:
      'https://images.unsplash.com/photo-1770756051811-1612ac8bedfa?auto=format&fit=crop&w=1400&h=900&q=82',
    stockImageAlt:
      'Modern residential house with professionally installed garage doors',
    stockSourceUrl:
      'https://unsplash.com/photos/modern-garage-doors-on-a-white-house-3qRx6B4cT6g',
    short: 'Urgent repairs and planned replacements, where response speed usually decides who gets the job.',
    heading: 'Websites and Local SEO for Garage Door Companies',
    intro:
      'A broken spring is an emergency: the car is trapped and the homeowner is calling whoever answers first. A new door is a considered purchase with colour and style decisions. Both need to be handled in the same few seconds of attention.',
    challenge:
      'Garage door sites often present repair and installation identically, so the urgent caller has to read through style galleries to find a phone number.',
    approach: [
      'A same-day repair path that is unmistakable on mobile, with hours and response expectations stated.',
      'Separate pages for spring repair, opener repair and installation, off-track doors and full replacement.',
      'A door style and material browser for replacement buyers, with brands you actually carry.',
      'Warranty, licensing and technician credentials shown up front.',
      'Service-area pages matched to realistic drive times.',
    ],
    services: ['Spring Repair', 'Opener Repair & Installation', 'New Door Installation', 'Off-Track & Cable Repair', 'Commercial Doors', 'Maintenance Tune-Ups'],
    searches: ['garage door repair near me', 'broken garage door spring [town]', 'new garage door installation', 'garage door opener repair'],
    meta: {
      title: 'Garage Door Websites & Local SEO',
      description:
        'Websites and local SEO for garage door companies: same-day repair calls to action, spring and opener repair pages, replacement door browsing and service-area pages.',
    },
  },
  {
    slug: 'roofing-websites',
    name: 'Roofing Companies',
    featured: false,
    homeService: true,
    art: '/assets/images/art/industry-roofing.svg',
    artAlt: 'Illustration of roofers installing new architectural shingles on a suburban house roof',
    stockImage:
      'https://images.pexels.com/photos/33404248/pexels-photo-33404248/free-photo-of-professional-roofer-installing-shingles-on-new-roof.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Professional roofer installing shingles on a residential roof with a nail gun',
    stockSourceUrl:
      'https://www.pexels.com/photo/professional-roofer-installing-shingles-on-new-roof-33404248/',
    short: 'Replacements, repairs, storm response and insurance claims — the highest-competition local market of all.',
    heading: 'Websites and Local SEO for Roofing Companies',
    intro:
      'Roofing is the most competitive local search market in home services. Winning it takes genuine depth: real answers about materials, cost, insurance claims and what happens after a storm.',
    challenge:
      'Most roofing sites say the same three things — free estimates, licensed and insured, quality workmanship — and give a homeowner no reason to choose one over the next.',
    approach: [
      'Substantial pages for replacement, repair, storm damage and inspection, each written to actually answer the question.',
      'A plain-English guide to the insurance claim process, which is often the highest-converting page on a roofing site.',
      'Material comparison pages: architectural shingle, metal, tile, flat and low-slope.',
      'Manufacturer certifications and warranty tiers displayed where they influence a decision.',
      'Storm-response pages ready before the weather arrives, not written after.',
    ],
    services: ['Roof Replacement', 'Roof Repair', 'Storm & Hail Damage', 'Roof Inspections', 'Metal Roofing', 'Gutters'],
    searches: ['roof replacement cost [town]', 'roofing contractors near me', 'storm damage roof repair', 'roof inspection [county]'],
    meta: {
      title: 'Roofing Website Design & Local SEO',
      description:
        'Websites and local SEO for roofing companies: replacement and repair pages, storm damage response, insurance claim guidance, material comparisons and service-area pages.',
    },
  },
  {
    slug: 'outdoor-services-websites',
    name: 'Outdoor Services',
    featured: false,
    homeService: true,
    art: '/assets/images/art/industry-outdoor.svg',
    artAlt: 'Illustration of a contractor pressure washing a suburban driveway and deck',
    stockImage:
      'https://images.pexels.com/photos/5652626/pexels-photo-5652626.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Outdoor-service professional pressure washing the exterior siding of a house',
    stockSourceUrl:
      'https://www.pexels.com/photo/back-view-of-a-person-pressure-washing-a-house-5652626/',
    photoPosition: '45% center',
    short: 'Pressure washing, decks, outdoor lighting, gutters and the seasonal work that fills the calendar between them.',
    heading: 'Websites and Local SEO for Outdoor Service Companies',
    intro:
      'Outdoor services are often bought on impulse after a neighbour has theirs done. The work photographs extremely well, and the website should take full advantage of that.',
    challenge:
      'These businesses usually offer six or seven services with a sentence each, which means no single service page is strong enough to rank for anything.',
    approach: [
      'A real page for each service instead of a shared list, so each one can compete on its own terms.',
      'Before-and-after sliders and galleries, which sell pressure washing and deck restoration better than any paragraph.',
      'Bundle and package pricing presented clearly, since these jobs are frequently bought together.',
      'Seasonal pages timed to demand — spring washing, fall gutter clearing, holiday lighting.',
      'Neighbourhood-level service areas, because this work spreads street by street.',
    ],
    services: ['Pressure Washing', 'Deck Building & Restoration', 'Outdoor Lighting', 'Gutter Cleaning', 'Paver & Patio Cleaning', 'Holiday Lighting'],
    searches: ['pressure washing near me', 'deck staining [town]', 'gutter cleaning service', 'outdoor lighting installation'],
    meta: {
      title: 'Outdoor Services Website Design & Local SEO',
      description:
        'Websites and local SEO for outdoor service companies: pressure washing, decks, lighting and gutters — with before-and-after galleries, bundle pricing and seasonal pages.',
    },
  },
  {
    slug: 'real-estate-websites',
    name: 'Real Estate Firms',
    featured: false,
    homeService: false,
    art: '/assets/images/art/industry-real-estate.svg',
    artAlt: 'Illustration of a suburban home with a for-sale sign and an agent greeting a couple at the door',
    stockImage:
      'https://images.pexels.com/photos/8292801/pexels-photo-8292801.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Real-estate agent showing a bright modern home to a prospective buyer',
    stockSourceUrl:
      'https://www.pexels.com/photo/a-real-estate-agent-showing-a-house-to-a-client-8292801/',
    photoPosition: 'center 38%',
    short: 'Agents, teams and brokerages that need to be found for neighbourhood and seller searches.',
    heading: 'Websites and Local SEO for Real Estate Firms',
    intro:
      'Portal sites already own the property search. What they do not own is the local expertise a seller is looking for when they type a neighbourhood name and "homes for sale" or "what is my home worth".',
    challenge:
      'Most agent sites are an IDX feed with a headshot attached — indistinguishable from every other agent in the market, and invisible in local search.',
    approach: [
      'Neighbourhood guides that demonstrate real local knowledge and earn the searches portals ignore.',
      'A seller path built around valuation requests, separate from the buyer path.',
      'Agent and team profiles written to build trust rather than list credentials.',
      'Sold-listing case studies with the story behind the result.',
      'Clear compliance handling for brokerage identification and fair housing requirements.',
    ],
    services: ['Neighbourhood Guides', 'Home Valuation Pages', 'Agent & Team Profiles', 'Seller Resources', 'Buyer Guides', 'Sold Case Studies'],
    searches: ['[neighbourhood] homes for sale', 'realtor in [town]', 'what is my home worth [town]', 'best real estate agent [county]'],
    meta: {
      title: 'Real Estate Website Design & Local SEO',
      description:
        'Websites and local SEO for real estate agents, teams and brokerages: neighbourhood guides, home valuation pages, agent profiles and sold-listing case studies.',
    },
  },
  {
    slug: 'attorney-websites',
    name: 'Attorneys & Law Firms',
    featured: false,
    homeService: false,
    art: '/assets/images/art/industry-legal.svg',
    artAlt: 'Illustration of a law office desk with a scales-of-justice motif and a consultation booking card',
    stockImage:
      'https://images.pexels.com/photos/8112166/pexels-photo-8112166.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
    stockImageAlt:
      'Attorney reviewing legal documents with clients during an office consultation',
    stockSourceUrl:
      'https://www.pexels.com/photo/clients-and-lawyer-in-an-office-8112166/',
    short: 'Solo attorneys and small firms competing against far larger advertising budgets.',
    heading: 'Websites and Local SEO for Solo Attorneys and Small Firms',
    intro:
      'People choosing a lawyer are usually anxious, comparing two or three firms, and deciding largely on whether the site feels credible and the process is explained clearly.',
    challenge:
      'Small firm websites either read like a legal brief or say nothing specific at all. Neither helps someone decide whether to make a call they are already nervous about.',
    approach: [
      'A substantial page for each practice area, written for the client rather than for other lawyers.',
      'The consultation process explained step by step, including what it costs and what happens next.',
      'Attorney biographies that establish credibility without reading as a CV.',
      'Careful, compliant handling of results and case outcomes.',
      'Local search structure for the counties and courts you actually practise in.',
    ],
    services: ['Practice Area Pages', 'Consultation Booking', 'Attorney Profiles', 'Client Resource Guides', 'Case Result Presentation', 'Local Search Structure'],
    searches: ['[practice area] attorney [town]', 'lawyer near me free consultation', 'best [practice area] lawyer [county]'],
    meta: {
      title: 'Attorney Website Design & Local SEO',
      description:
        'Websites and local SEO for solo attorneys and small law firms: practice area pages, consultation booking, attorney profiles and county-level local search structure.',
    },
    note: 'We have built and maintain live legal websites, including hoffman.legal and floridadepositlaw.com.',
  },
];

export const featuredIndustries = industries.filter((industry) => industry.featured);
export const homeServiceIndustries = industries.filter((industry) => industry.homeService);

export function industryHref(industry) {
  return `/industries/${industry.slug}.html`;
}
