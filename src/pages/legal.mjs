import { html } from '../lib/html.mjs';
import { page } from '../components/layout.mjs';
import { pageHero, section } from '../components/sections.mjs';
import { site } from '../data/site.mjs';

const LAST_UPDATED = '29 July 2026';

/**
 * Both documents describe what this website actually does: Google Analytics 4,
 * a Formspree-hosted form endpoint, and no other data collection. Nothing is
 * claimed about company registration, offices or entity type, because none of
 * that has been supplied.
 */

export function privacyPage() {
  return page({
    path: 'privacy-policy.html',
    title: 'Privacy Policy',
    description:
      'How Design Rank Studio collects, uses and stores information submitted through this website, including form submissions and website analytics.',
    trail: [{ label: 'Privacy Policy' }],
    content: html`
      ${pageHero({
        eyebrow: 'Legal',
        title: 'Privacy Policy',
        lead: `How ${site.name} handles the information you send through this website. Last updated ${LAST_UPDATED}.`,
      })}
      ${section({
        tone: 'white',
        children: html`<div class="prose">
          <h2>Who this policy covers</h2>
          <p>
            This policy applies to ${site.name} and to the website at
            <a href="${site.origin}/">designrankstudio.com</a>. It explains what information we collect through this
            website, why we collect it, and what we do with it.
          </p>

          <h2>Information you give us</h2>
          <p>
            When you submit the website review form or the contact form, you choose to send us your name, business
            name, email address, phone number, website address, primary service, service area and a description of
            your challenge. We use this information only to respond to your enquiry, prepare the review or proposal
            you asked for, and follow up about that enquiry.
          </p>
          <p>
            We do not sell your information, we do not rent it, and we do not share it with third parties for their
            own marketing. We do not add you to a mailing list unless you separately ask us to.
          </p>

          <h2>How form submissions are handled</h2>
          <p>
            Forms on this website are delivered by Formspree, a third-party form processing service. When you submit a
            form, the information you entered is transmitted to Formspree and forwarded to us by email. Formspree
            processes that submission under its own privacy policy and may retain a copy of it in its system.
          </p>
          <p>
            Forms include a hidden anti-spam field. If it is completed, the submission is treated as automated and
            discarded.
          </p>

          <h2>Website analytics</h2>
          <p>
            This website uses Google Analytics 4 to understand how visitors find and use the site. Analytics collects
            information such as the pages you visit, how long you stay, the approximate geographic region you are
            browsing from, the type of device and browser you are using, and which link or search brought you here.
            It also records interactions such as clicking a call-to-action button or submitting a form.
          </p>
          <p>
            Google Analytics uses cookies and similar technologies to do this. This information is processed by Google
            under its own privacy terms. We use it in aggregate to improve the website — we do not use it to identify
            you personally.
          </p>
          <p>
            You can prevent analytics collection using your browser's cookie settings, a tracking-blocking extension,
            or Google's own opt-out browser add-on.
          </p>

          <h2>Cookies</h2>
          <p>
            The only cookies this website sets are those used by Google Analytics, described above. We do not use
            advertising cookies, retargeting pixels or cross-site tracking on this website.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep enquiry correspondence for as long as needed to respond to it and to maintain a record of work
            discussed or carried out. If you would like your enquiry and our correspondence deleted, contact us and we
            will remove it from our records.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to request a copy of the personal information we hold
            about you, ask us to correct it, ask us to delete it, or object to how we use it. To make any of these
            requests, contact us using the details on our <a href="/contact.html">contact page</a> and we will respond
            within a reasonable period.
          </p>

          <h2>Security</h2>
          <p>
            This website is served over HTTPS. No payment details are collected through this website. Please do not
            send sensitive personal information — financial details, identification documents or confidential case
            material — through the website forms.
          </p>

          <h2>Links to other websites</h2>
          <p>
            This website links to websites we have built and to third-party services. We are not responsible for the
            privacy practices or content of any website we link to.
          </p>

          <h2>Children</h2>
          <p>
            This website is intended for business owners and is not directed at children. We do not knowingly collect
            information from anyone under 16.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as the website or our services change. The date at the top of this page shows
            when it was last revised.
          </p>

          <h2>Contact</h2>
          <p>
            For any question about this policy or about information we hold, get in touch through our
            <a href="/contact.html">contact page</a> or message us on
            <a href="${site.whatsapp.url}" target="_blank" rel="noopener">WhatsApp at ${site.whatsapp.display}</a>.
          </p>
        </div>`,
      })}
    `,
  });
}

export function termsPage() {
  return page({
    path: 'terms-and-conditions.html',
    title: 'Terms and Conditions',
    description:
      'The terms that apply to using the Design Rank Studio website and to website design, redesign and local SEO engagements.',
    trail: [{ label: 'Terms and Conditions' }],
    content: html`
      ${pageHero({
        eyebrow: 'Legal',
        title: 'Terms and Conditions',
        lead: `The terms that apply to this website and to work carried out by ${site.name}. Last updated ${LAST_UPDATED}.`,
      })}
      ${section({
        tone: 'white',
        children: html`<div class="prose">
          <h2>About these terms</h2>
          <p>
            These terms apply to your use of <a href="${site.origin}/">designrankstudio.com</a>. Where we carry out
            work for you, a separate written proposal and scope will govern that engagement. If anything in a signed
            proposal conflicts with these terms, the proposal takes precedence.
          </p>

          <h2>Using this website</h2>
          <p>
            You may use this website to learn about our services and to contact us. You may not use it to send
            automated submissions, attempt to gain unauthorised access, interfere with its operation, or copy its
            content or design for resale.
          </p>

          <h2>Information on this website</h2>
          <p>
            The content here is general information about our services. It is not a guarantee of any particular
            outcome, and it does not form a contract. Prices shown are starting points based on typical projects — the
            price for your project is the one stated in your written proposal.
          </p>

          <h2>No guarantee of rankings or leads</h2>
          <p>
            We do not guarantee search engine rankings, traffic volumes, lead counts or revenue. Nobody can. Search
            engines change their systems, competitors change their strategies, and demand varies by season and market.
            What we commit to is the work described in your scope, carried out to a professional standard, with
            honest reporting on what it produces.
          </p>

          <h2>Project engagements</h2>
          <p>
            Every engagement begins with a written scope covering deliverables, page count, timeline and price. Work
            outside that scope is quoted separately before it begins. Payment terms, revision rounds and the schedule
            are set out in the proposal.
          </p>
          <p>
            Projects depend on receiving content, photographs, access and feedback from you. Where those are delayed,
            timelines move accordingly.
          </p>

          <h2>Ownership</h2>
          <p>
            On full payment, you own the website we build for you, along with its content and design as delivered.
            Your domain name, hosting account and analytics accounts are registered in your name and remain yours at
            all times. We retain the right to reference the work in our portfolio unless you ask us in writing not to.
          </p>
          <p>
            Third-party components — fonts, stock assets, plugins and hosted services — remain subject to their own
            licences, which pass to you where the licence allows.
          </p>

          <h2>Ongoing services</h2>
          <p>
            Local SEO and website maintenance are monthly services. Either party may end them with reasonable written
            notice as set out in the proposal. Work completed up to the end date remains payable, and deliverables
            produced up to that point remain yours.
          </p>

          <h2>Your responsibilities</h2>
          <p>
            You are responsible for the accuracy of the information you supply — including licence numbers,
            certifications, insurance details, service areas, pricing and claims about your business — and for making
            sure it complies with the laws and professional rules that apply to your trade or profession.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, our liability arising from any engagement is limited to the fees you have
            paid us for the work in question. We are not liable for indirect or consequential losses, including lost
            profits, lost business or lost data.
          </p>

          <h2>Third-party services</h2>
          <p>
            Websites we build may rely on third-party services such as hosting providers, domain registrars, analytics
            and form processors. We are not responsible for outages, changes or discontinuation of services operated
            by others, though we will help you work around them.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The date at the top of this page shows when they were last
            revised. Changes do not affect engagements already underway under a signed proposal.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent through our <a href="/contact.html">contact page</a> or by
            <a href="${site.whatsapp.url}" target="_blank" rel="noopener">WhatsApp to ${site.whatsapp.display}</a>.
          </p>
        </div>`,
      })}
    `,
  });
}
