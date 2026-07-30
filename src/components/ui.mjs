import { html, raw } from '../lib/html.mjs';
import { icon } from './icons.mjs';

/** Primary/secondary/ghost button or link. */
export function button({ label, href, variant = 'primary', size = '', block = false, external = false, withArrow = false, className = '' }) {
  const classes = [
    'button',
    `button--${variant}`,
    size && `button--${size}`,
    block && 'button--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const rel = external ? raw(' target="_blank" rel="noopener"') : '';
  return html`<a class="${classes}" href="${href}"${rel}>${label}${withArrow ? icon('arrow', { className: 'icon icon--xs button__arrow' }) : ''}</a>`;
}

/**
 * Section heading block. `serif` italicises a trailing phrase in the display
 * serif — used sparingly, on one phrase per heading at most.
 */
export function sectionHeading({ eyebrow, title, serif = null, lead = null, align = 'center', level = 2, id = null }) {
  const Tag = `h${level}`;
  return html`<div class="section-heading section-heading--${align}"${id ? raw(` id="${id}"`) : ''}>
    ${eyebrow && html`<p class="eyebrow">${eyebrow}</p>`}
    ${raw(`<${Tag} class="section-heading__title">`)}${title}${serif ? html` <em class="display-serif">${serif}</em>` : ''}${raw(`</${Tag}>`)}
    ${lead && html`<p class="section-heading__lead">${lead}</p>`}
  </div>`;
}

export function eyebrow(text) {
  return html`<p class="eyebrow">${text}</p>`;
}

/** Bulleted list with check marks. Accepts strings or {title, body} objects. */
export function checkList(items, { className = '' } = {}) {
  return html`<ul class="check-list ${className}">
    ${items.map(
      (item) => html`<li>
        <span class="check-list__icon" aria-hidden="true">${icon('check', { className: 'icon icon--xs' })}</span>
        <span class="check-list__body">
          ${typeof item === 'string'
            ? item
            : html`<strong>${item.title}</strong><span>${item.body}</span>`}
        </span>
      </li>`,
    )}
  </ul>`;
}

/**
 * Responsive image with intrinsic dimensions to avoid layout shift.
 *
 * `sources` and `srcset` come from `resolveImage()` in src/lib/media.mjs, which
 * only ever lists files that exist on disk — so a <picture> is emitted when
 * there is a genuine alternative encoding to offer, and a plain <img>
 * otherwise. `eager` marks an above-the-fold image; `priority` additionally
 * requests high fetch priority and belongs to one image per page at most.
 */
export function picture({
  src,
  alt,
  width = 1200,
  height = 800,
  className = '',
  sources = [],
  srcset = null,
  sizes = null,
  eager = false,
  priority = false,
}) {
  const loading = eager ? '' : ' loading="lazy"';
  const fetchPriority = priority ? ' fetchpriority="high"' : '';
  const img = html`<img
      ${raw(className ? `class="${className}" ` : '')}src="${src}"
      ${srcset ? raw(`srcset="${srcset}" `) : ''}${sizes && srcset ? raw(`sizes="${sizes}" `) : ''}alt="${alt}"
      width="${width}"
      height="${height}"
      ${raw(`decoding="async"${loading}${fetchPriority}`)}
    />`;

  if (sources.length === 0) return img;

  // `sizes` only means anything alongside width descriptors, so a source with a
  // single candidate does not get one.
  const describesWidths = (value) => /\s\d+w\s*(,|$)/.test(value);

  return html`<picture>
    ${sources.map(
      (source) =>
        html`<source srcset="${source.srcset}"${sizes && describesWidths(source.srcset)
          ? raw(` sizes="${sizes}"`)
          : ''} type="${source.type}" />`,
    )}
    ${img}
  </picture>`;
}

/**
 * `picture` wrapped in a <figure>. Accepts a resolved media object spread in,
 * so `figure({ ...industryImage(industry), eager: true })` works directly.
 * `className` styles the figure, `imgClassName` the image inside it.
 */
export function figure({ className = '', imgClassName = '', caption = null, ...image }) {
  return html`<figure class="figure ${className}">
    ${picture({ ...image, className: imgClassName })}
    ${caption && html`<figcaption>${caption}</figcaption>`}
  </figure>`;
}

/** Card linking to another page, used for services, industries and articles. */
export function linkCard({ href, iconName, title, body, meta = null, cta = 'Learn more' }) {
  return html`<a class="link-card" href="${href}">
    ${iconName && html`<span class="link-card__icon" aria-hidden="true">${icon(iconName)}</span>`}
    ${meta && html`<span class="link-card__meta">${meta}</span>`}
    <h3 class="link-card__title">${title}</h3>
    <p class="link-card__body">${body}</p>
    <span class="link-card__cta">${cta}${icon('arrow', { className: 'icon icon--xs' })}</span>
  </a>`;
}

/** Non-interactive sibling of `linkCard`, for content that has no destination. */
export function infoCard({ iconName, title, body, meta = null }) {
  return html`<article class="info-card">
    ${iconName && html`<span class="info-card__icon" aria-hidden="true">${icon(iconName)}</span>`}
    ${meta && html`<p class="info-card__meta">${meta}</p>`}
    <h3 class="info-card__title">${title}</h3>
    <p class="info-card__body">${body}</p>
  </article>`;
}

/** Section wrapper with an optional tinted or bordered background. */
export function section({ tone = 'white', id = null, className = '', children }) {
  return html`<section class="section section--${tone} ${className}"${id ? raw(` id="${id}"`) : ''}>
    <div class="container">${children}</div>
  </section>`;
}
