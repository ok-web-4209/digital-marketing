import { html, raw } from '../lib/html.mjs';

/**
 * Inline SVG icon set. 24x24 stroke icons on a shared grid so weight stays
 * consistent. Inlining avoids an extra request and lets icons inherit colour.
 */
const paths = {
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6"/>',
  pin: '<path d="M12 21.2s-6.6-5.1-6.6-10.4a6.6 6.6 0 1 1 13.2 0c0 5.3-6.6 10.4-6.6 10.4Z"/><circle cx="12" cy="10.4" r="2.5"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.4 18.4h3.2"/>',
  clipboard: '<path d="M9 4.5H7.4A1.9 1.9 0 0 0 5.5 6.4v13.2a1.9 1.9 0 0 0 1.9 1.9h9.2a1.9 1.9 0 0 0 1.9-1.9V6.4a1.9 1.9 0 0 0-1.9-1.9H15"/><rect x="9" y="2.6" width="6" height="3.8" rx="1.3"/><path d="M8.8 12h6.4M8.8 16h4.4"/>',
  chat: '<path d="M20.5 11.6a7.7 7.7 0 0 1-11.1 6.9L4.3 20l1.6-4.8a7.7 7.7 0 1 1 14.6-3.6Z"/><path d="M9 11.5h.01M12.4 11.5h.01M15.8 11.5h.01"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.4 8.6-2 4.8-4.8 2 2-4.8Z"/>',
  layers: '<path d="m12 3 8.4 4.4L12 11.8 3.6 7.4Z"/><path d="m3.6 12.4 8.4 4.4 8.4-4.4M3.6 16.9 12 21.3l8.4-4.4"/>',
  growth: '<path d="M3.5 17.4 9 11.9l3.6 3.6L20.5 7.6"/><path d="M15.6 7.6h4.9v4.9"/><path d="M3.5 20.5h17"/>',
  browser: '<rect x="3" y="4.5" width="18" height="15" rx="2.4"/><path d="M3 9.3h18"/><path d="M6.2 7h.01M8.6 7h.01M11 7h.01"/>',
  refresh: '<path d="M20.2 12a8.2 8.2 0 0 1-14 5.8L3.8 15.4"/><path d="M3.8 12a8.2 8.2 0 0 1 14-5.8l2.4 2.4"/><path d="M20.2 4v4.6h-4.6M3.8 20v-4.6h4.6"/>',
  bolt: '<path d="M13 2.5 5.2 13.4h5.4l-1.2 8.1 8-11.1h-5.5Z"/>',
  shield: '<path d="M12 2.6 4.6 5.8v5.6c0 4.5 3.1 8.4 7.4 9.9 4.3-1.5 7.4-5.4 7.4-9.9V5.8Z"/><path d="m9.2 12 2 2 3.6-4"/>',
  check: '<path d="m4.5 12.6 4.8 4.8 10.2-10.8"/>',
  arrow: '<path d="M4.5 12h15"/><path d="m13.4 5.9 6.1 6.1-6.1 6.1"/>',
  star: '<path d="m12 3.4 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.4-4.4"/>',
  chart: '<path d="M4 20.5V4"/><path d="M4 20.5h16.5"/><rect x="7.4" y="12" width="3.2" height="5.6" rx="1"/><rect x="13" y="8" width="3.2" height="9.6" rx="1"/>',
  users: '<circle cx="9.4" cy="8.4" r="3.6"/><path d="M3.2 20.2a6.2 6.2 0 0 1 12.4 0"/><path d="M16.4 5.2a3.6 3.6 0 0 1 0 6.9M17.6 20.2a6.2 6.2 0 0 0-2.3-4.8"/>',
  document: '<path d="M14 2.8H7.4a1.9 1.9 0 0 0-1.9 1.9v14.6a1.9 1.9 0 0 0 1.9 1.9h9.2a1.9 1.9 0 0 0 1.9-1.9V7.4Z"/><path d="M14 2.8v4.6h4.5"/><path d="M9 12.6h6M9 16.2h4"/>',
  house: '<path d="m3.6 10.5 8.4-6.6 8.4 6.6"/><path d="M5.8 12.2v7.4a1 1 0 0 0 1 1h10.4a1 1 0 0 0 1-1v-7.4"/><path d="M10 20.6v-4.9h4v4.9"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 2"/>',
  mail: '<rect x="3" y="5.4" width="18" height="13.2" rx="2.2"/><path d="m3.8 7 7.1 5a2 2 0 0 0 2.2 0l7.1-5"/>',
  warning: '<path d="M12 4.2 3.2 19.4h17.6Z"/><path d="M12 10v4.2M12 17.2h.01"/>',
  wrench: '<path d="M15.6 3.6a5.4 5.4 0 0 0-5.1 7.1L3.8 17.4a2 2 0 1 0 2.8 2.8l6.7-6.7a5.4 5.4 0 0 0 6.9-6.9l-3 3-2.8-2.8 3-3a5.4 5.4 0 0 0-1.8-.2Z"/>',
  sparkle: '<path d="M12 3.2 13.8 9l5.8 1.8L13.8 12.6 12 18.4 10.2 12.6 4.4 10.8 10.2 9Z"/><path d="M18.6 3.2v3M20.1 4.7h-3"/>',
};

export function icon(name, { className = 'icon', title = null } = {}) {
  const body = paths[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  const labelling = title
    ? `role="img" aria-label="${title.replace(/"/g, '&quot;')}"`
    : 'aria-hidden="true" focusable="false"';
  return raw(
    `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${labelling}>${body}</svg>`,
  );
}

/** Brand wordmark + logo mark, used in the header and footer. */
export function logo({ variant = 'dark' } = {}) {
  return html`<span class="logo logo--${variant}">
    <span class="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" focusable="false">
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path d="M11 26.5 17.4 20l4.2 4.2L29 15.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M23.6 15.5H29v5.4" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="11" cy="26.5" r="2.3" fill="#c9a227" />
      </svg>
    </span>
    <span class="logo__text"><span class="logo__name">Design Rank</span><span class="logo__suffix">Studio</span></span>
  </span>`;
}
