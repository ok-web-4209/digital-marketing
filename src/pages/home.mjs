import { html } from '../lib/html.mjs';
import { page, faqSchema } from '../components/layout.mjs';
import {
  homeHero,
  problemsSection,
  servicesSection,
  industriesSection,
  whyChooseSection,
  processSection,
  packagesSection,
  projectsSection,
  reviewSection,
  faqSection,
  finalCta,
} from '../components/sections.mjs';
import { projects } from '../data/projects.mjs';
import { faqs } from '../data/faqs.mjs';

const homeFaqs = faqs.slice(0, 6);

export function homePage() {
  return page({
    path: 'index.html',
    title: 'Websites & Local SEO for Service Businesses | Design Rank Studio',
    description:
      'Conversion-focused websites and local SEO for US service businesses — tree services, concrete, fencing, landscaping, roofing and more. Request a free website review.',
    schema: [faqSchema(homeFaqs)],
    content: html`
      ${homeHero()}
      ${problemsSection()}
      ${servicesSection()}
      ${/* Every card keeps its artwork. 'featured' would spotlight the four
            featured industries and strip the media from the other six, which
            is a different section from the one the homepage has always shown. */
      ''}
      ${industriesSection({ media: 'all' })}
      ${whyChooseSection()}
      ${processSection()}
      ${projectsSection({ projects: projects.slice(0, 3), tone: 'white' })}
      ${packagesSection()}
      ${reviewSection({ tone: 'white' })}
      ${faqSection({ items: homeFaqs, tone: 'tint' })}
      ${finalCta()}
    `,
  });
}
