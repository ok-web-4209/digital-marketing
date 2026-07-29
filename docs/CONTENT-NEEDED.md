# Content still needed from the owner

The 2026 redesign deliberately contains no invented facts. Every claim on the
site is either verifiable from the previous version of the website or is a
description of how we work. The items below are gaps that only the owner can
fill — each one would measurably strengthen the site.

## High impact

### 1. Real testimonials or client quotes
There are no testimonials anywhere on the site, because none exist in the
repository. As instructed, none were invented. In their place the site uses
project outcomes, working principles, review benefits and case studies.

**What to send:** two to five short quotes with the client's name, business name
and town. Even one real quote from an existing legal client would help.
**Where it goes:** a new testimonials section — add the data and a component and
it can drop into the homepage between "Why work with us" and the process.

### 2. A domain email address
The footer and contact page currently offer WhatsApp (+44 7827 775084) and the
contact form. A `hello@designrankstudio.com` style address would look more
established to a US business owner than WhatsApp alone.

**Where it goes:** `site.email` in `src/data/site.mjs`, then the footer and
contact page pick it up.

### 3. A US phone number
A US number would materially improve conversion for a site targeting US service
businesses — a UK WhatsApp number is a friction point for a homeowner-facing
contractor. A forwarding number would be enough.

**Where it goes:** `site.phone` in `src/data/site.mjs`, plus a click-to-call
button in the header.

### 4. Founder name and photograph
The About page is written at studio level because no founder name appears
anywhere in the existing website content, and no founder photograph exists in
the project assets. Neither was invented.

**What to send:** the name you want to trade under and a professional headshot.
**Where it goes:** an About page founder block, and `Person` schema.

## Medium impact

### 5. Home-service client work
The portfolio has four live projects, all legal or content sites, plus three
clearly labelled concept projects for tree service, concrete and fencing. Once
a real home-service site launches, replace a concept project with it.

**Where it goes:** `src/data/projects.mjs` — change `type: 'concept'` to
`type: 'live'` and add the URL.

### 6. Verified performance figures
No traffic, ranking or lead figures appear anywhere, because none were supplied
or verifiable. If you have before/after data you can stand behind — with the
client's permission — case studies become considerably more persuasive.

### 7. Real project screenshots
Portfolio thumbnails are stylised SVG mockups. Actual screenshots of the four
live sites would be more convincing.

**Where it goes:** drop images into `assets/images/portfolio/` and update the
`art` field in `src/data/projects.mjs`.

### 8. Photography
Every section has a visual, but all artwork is custom SVG illustration rather
than photography. Photographs of real crews, trucks and completed jobs would
raise the credibility of the industry pages.

*Note for future sessions: stock photo hosts (`images.unsplash.com`,
`images.pexels.com`) are blocked by this environment's egress policy, which is
why the illustrations were generated rather than downloaded. Any environment
with access to those hosts can swap them in by replacing the file at the same
path or repointing the `art` field.*

## Before launch

### 9. Legal review
`privacy-policy.html` and `terms-and-conditions.html` describe accurately what
this website does — Google Analytics 4, a Formspree form endpoint, and no other
data collection. They deliberately make no claims about company registration,
entity type or physical address, because none were supplied.

They are a solid starting point, not legal advice. Have them reviewed against
the jurisdiction you operate from and the states you sell into before launch,
particularly if you begin collecting data from California residents (CCPA/CPRA)
or offering services in the EU/UK (GDPR).

### 10. Verify the analytics and form endpoints
Both were carried over unchanged from the previous site:

- Google Analytics 4: `G-664QM0C3M2`
- Formspree: `https://formspree.io/f/xykayvzn`

Confirm both are still active and that the Formspree account receives the new
field names (`business_name`, `primary_service`, `service_area`, `challenge`,
`website`) before going live.

### 11. Decide the canonical domain

The site is currently published at
`https://ok-web-4209.github.io/digital-marketing/`, but every canonical tag,
Open Graph URL and sitemap entry points at `https://designrankstudio.com`.
There is no `CNAME` file in the repository, so the custom domain is not
attached to GitHub Pages. The previous version of the site had the same
mismatch, so this is carried over rather than introduced.

Pick one:

- **Use the custom domain** (recommended if you own it): add it under
  *Settings → Pages → Custom domain*. GitHub writes a `CNAME` file and the
  existing canonicals become correct with no code change.
- **Stay on github.io**: change `origin` in `src/data/site.mjs` to
  `https://ok-web-4209.github.io/digital-marketing` and rebuild.

Leaving it as it is means search engines are told the content lives at a
domain that does not serve it, which will hold back indexing.

### 12. Submit the new sitemap
The redesign changed most URLs. After deploying, submit
`https://designrankstudio.com/sitemap.xml` in Google Search Console and check
the coverage report for the retired URLs listed in the `redirects` map in
`src/build.mjs`.

Those retired URLs are served as meta-refresh redirect stubs, which is the best
available option on static hosting. If the host supports server-side redirects
(Netlify `_redirects`, Vercel `vercel.json`, Cloudflare `_redirects`), 301s
would be better — say the word and they can be added.
