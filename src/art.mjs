/**
 * Generates every illustration used on the site.
 *
 * Artwork is authored as SVG rather than downloaded photography: it is a few
 * kilobytes per file, stays sharp on any display, needs no responsive variants,
 * and shares one palette so the whole site reads as a single system.
 *
 * Each figure is swappable — replace the file at the same path (or point the
 * `art` field in src/data/* at a photograph) and nothing else has to change.
 *
 * Run with: node src/art.mjs   (also called automatically by the build)
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const C = {
  navy: '#0b1f3a',
  navy800: '#16345c',
  navy700: '#23507f',
  navy600: '#3a6a9e',
  steel: '#7d93ae',
  mist: '#dbe4ef',
  sky: '#eaf1f8',
  paper: '#ffffff',
  warm: '#f7f5f1',
  warm2: '#ece7de',
  line: '#dde3ec',
  gold: '#b08948',
  goldLight: '#d9b877',
  goldPale: '#f3e8d3',
  green: '#1f7a52',
  greenLight: '#4da37b',
  greenPale: '#e2f0e9',
  red: '#b4472f',
  slate: '#5b6b80',
};

function svg({ width, height, title, desc, body, defs = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="t d" preserveAspectRatio="xMidYMid meet">
<title id="t">${title}</title><desc id="d">${desc}</desc>
<defs>${defs}</defs>
${body}
</svg>
`;
}

const write = (relPath, contents) => {
  const target = resolve(ROOT, relPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
  return relPath;
};

/* ---------------------------------------------------------- shared pieces */

/** A browser chrome frame with a page rendered inside it. */
function browserFrame({ x, y, w, h, inner, radius = 18, label = 'designrankstudio' }) {
  const barH = 30;
  return `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${C.paper}" stroke="${C.line}"/>
  <path d="M${x} ${y + barH} v-${radius - 4} a${radius} ${radius} 0 0 1 ${radius} -${radius} h${w - radius * 2} a${radius} ${radius} 0 0 1 ${radius} ${radius} v${radius - 4} Z" fill="${C.warm}"/>
  <line x1="${x}" y1="${y + barH}" x2="${x + w}" y2="${y + barH}" stroke="${C.line}"/>
  <circle cx="${x + 18}" cy="${y + 15}" r="4" fill="${C.mist}"/>
  <circle cx="${x + 32}" cy="${y + 15}" r="4" fill="${C.mist}"/>
  <circle cx="${x + 46}" cy="${y + 15}" r="4" fill="${C.mist}"/>
  <rect x="${x + 62}" y="${y + 8}" width="${Math.max(70, w * 0.38)}" height="14" rx="7" fill="${C.mist}"/>
  <text x="${x + 70}" y="${y + 19}" font-family="system-ui, sans-serif" font-size="9" fill="${C.slate}">${label}</text>
  <g transform="translate(${x} ${y + barH})">${inner}</g>
</g>`;
}

/** A phone frame with a page rendered inside it. */
function phoneFrame({ x, y, w, h, inner }) {
  const r = 22;
  return `<g>
  <rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="${r + 5}" fill="${C.navy}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${C.paper}"/>
  <rect x="${x + w / 2 - 18}" y="${y + 7}" width="36" height="5" rx="2.5" fill="${C.mist}"/>
  <g transform="translate(${x} ${y + 20})">${inner}</g>
</g>`;
}

/** Rounded bar used for placeholder text runs. */
const bar = (x, y, w, h, fill, r = null) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r ?? h / 2}" fill="${fill}"/>`;

/** A pill button. */
const pill = (x, y, w, h, fill, textFill, text, size = 11) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>` +
  (text
    ? `<text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${size}" font-weight="700" fill="${textFill}">${text}</text>`
    : '');

const label = (x, y, text, { size = 12, fill = C.navy, weight = 700, anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui, -apple-system, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`;

/** Soft drop shadow filter shared by floating cards. */
const shadowDef = `<filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
  <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0b1f3a" flood-opacity="0.10"/>
</filter>`;

/** Scene backdrop: sky wash, horizon and ground, used by industry cards. */
function scene({ w, h, skyTop = '#f2f7fc', skyBottom = '#e3edf7', ground = C.warm2, horizon = 0.66 }) {
  const gy = h * horizon;
  return {
    defs: `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${skyTop}"/><stop offset="1" stop-color="${skyBottom}"/></linearGradient>`,
    body: `<rect width="${w}" height="${h}" rx="20" fill="url(#sky)"/>
<path d="M0 ${gy} h${w} v${h - gy} a20 20 0 0 1 -20 20 h-${w - 40} a20 20 0 0 1 -20 -20 Z" fill="${ground}"/>`,
    gy,
  };
}

/** Simple suburban house used across several industry scenes. */
function house({ x, y, w = 200, roof = C.navy800, wall = C.paper, door = C.gold }) {
  const bodyH = w * 0.5;
  const roofH = w * 0.3;
  return `<g>
  <path d="M${x - 12} ${y - bodyH} L${x + w / 2} ${y - bodyH - roofH} L${x + w + 12} ${y - bodyH} Z" fill="${roof}"/>
  <rect x="${x}" y="${y - bodyH}" width="${w}" height="${bodyH}" fill="${wall}" stroke="${C.line}"/>
  <rect x="${x + w * 0.12}" y="${y - bodyH * 0.72}" width="${w * 0.2}" height="${bodyH * 0.34}" rx="3" fill="${C.sky}" stroke="${C.mist}"/>
  <rect x="${x + w * 0.68}" y="${y - bodyH * 0.72}" width="${w * 0.2}" height="${bodyH * 0.34}" rx="3" fill="${C.sky}" stroke="${C.mist}"/>
  <rect x="${x + w * 0.42}" y="${y - bodyH * 0.52}" width="${w * 0.16}" height="${bodyH * 0.52}" rx="3" fill="${door}"/>
</g>`;
}

/**
 * Deciduous tree used in landscaping / tree-service scenes.
 * Positional arguments, matching `worker` and `van`.
 */
function tree(x, y, scale = 1, canopy = C.green, trunk = '#6b4b34') {
  const shade = canopy === C.green ? C.greenLight : C.green;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
  <rect x="-8" y="-74" width="16" height="76" rx="6" fill="${trunk}"/>
  <path d="M0 -60 l-22 -18 M0 -74 l24 -20" stroke="${trunk}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-30" cy="-78" r="32" fill="${shade}"/>
  <circle cx="30" cy="-80" r="30" fill="${shade}"/>
  <circle cx="0" cy="-104" r="40" fill="${canopy}"/>
  <circle cx="-20" cy="-70" r="26" fill="${canopy}"/>
  <circle cx="22" cy="-66" r="24" fill="${canopy}"/>
</g>`;
}

/** Service van, reused with different body colours. */
function van(x, y, scale = 1, body = C.paper, accent = C.navy800, text = '') {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
  <path d="M0 0 h150 v-46 h-44 l-22 -26 H0 Z" fill="${body}" stroke="${C.line}" stroke-width="2"/>
  <path d="M6 -68 h74 l18 22 H6 Z" fill="${C.sky}"/>
  <rect x="10" y="-40" width="86" height="24" rx="5" fill="${accent}" opacity="0.14"/>
  ${text ? `<text x="53" y="-24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="${accent}">${text}</text>` : ''}
  <circle cx="34" cy="2" r="15" fill="${C.navy}"/><circle cx="34" cy="2" r="6" fill="${C.mist}"/>
  <circle cx="118" cy="2" r="15" fill="${C.navy}"/><circle cx="118" cy="2" r="6" fill="${C.mist}"/>
</g>`;
}

/** A worker figure — deliberately simple, no facial detail. */
function worker(x, y, scale = 1, shirt = C.green, hat = C.gold) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
  <rect x="-11" y="-34" width="22" height="34" rx="8" fill="${shirt}"/>
  <rect x="-9" y="0" width="7" height="26" rx="3.5" fill="${C.navy800}"/>
  <rect x="2" y="0" width="7" height="26" rx="3.5" fill="${C.navy800}"/>
  <circle cx="0" cy="-44" r="9" fill="#c8a288"/>
  <path d="M-13 -47 a13 13 0 0 1 26 0 Z" fill="${hat}"/>
  <rect x="-16" y="-48" width="32" height="4" rx="2" fill="${hat}"/>
</g>`;
}

/* --------------------------------------------------- home page composition */

function heroComposition() {
  const w = 1040;
  const h = 880;

  // The website shown inside the browser frame: a tree-service homepage.
  const siteInner = `
  ${bar(24, 22, 92, 12, C.navy, 6)}
  ${bar(300, 24, 40, 8, C.mist)}${bar(352, 24, 40, 8, C.mist)}${bar(404, 24, 40, 8, C.mist)}
  ${pill(470, 16, 92, 26, C.gold, C.paper, 'Call now', 11)}
  <rect x="24" y="62" width="538" height="196" rx="14" fill="${C.navy}"/>
  <rect x="24" y="62" width="538" height="196" rx="14" fill="url(#heroWash)"/>
  ${bar(48, 96, 300, 17, C.paper, 8)}
  ${bar(48, 122, 232, 11, '#9fb6cf')}
  ${pill(48, 152, 132, 32, C.gold, C.navy, 'Get a free quote', 11)}
  ${pill(190, 152, 106, 32, 'rgba(255,255,255,0.16)', C.paper, 'See our work', 11)}
  <g>
    ${[0, 1, 2].map((i) => {
      const cx = 24 + i * 184;
      return `<rect x="${cx}" y="278" width="170" height="104" rx="12" fill="${C.warm}" stroke="${C.line}"/>
      <circle cx="${cx + 26}" cy="304" r="12" fill="${C.greenPale}"/>
      <path d="M${cx + 20} 304 l4 4 8 -9" stroke="${C.green}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${bar(cx + 48, 298, 78, 10, C.navy700)}
      ${bar(cx + 16, 328, 138, 8, C.mist)}
      ${bar(cx + 16, 344, 112, 8, C.mist)}
      ${bar(cx + 16, 360, 126, 8, C.mist)}`;
    }).join('')}
  </g>`;

  const phoneInner = `
  ${bar(16, 12, 58, 9, C.navy, 5)}
  ${pill(120, 6, 44, 22, C.gold, C.paper, 'Call', 9)}
  <rect x="16" y="38" width="148" height="86" rx="10" fill="${C.navy}"/>
  ${bar(28, 60, 104, 11, C.paper, 6)}
  ${bar(28, 80, 76, 7, '#9fb6cf')}
  ${pill(28, 96, 88, 20, C.gold, C.navy, 'Free quote', 8)}
  ${bar(16, 138, 148, 30, C.warm, 8)}
  ${bar(28, 148, 60, 8, C.navy700)}${bar(28, 160, 100, 6, C.mist)}
  ${bar(16, 178, 148, 30, C.warm, 8)}
  ${bar(28, 188, 74, 8, C.navy700)}${bar(28, 200, 92, 6, C.mist)}
  ${bar(16, 218, 148, 30, C.warm, 8)}
  ${bar(28, 228, 52, 8, C.navy700)}${bar(28, 240, 108, 6, C.mist)}
  ${pill(16, 262, 148, 30, C.navy, C.paper, 'Request a quote', 10)}`;

  const notification = `<g filter="url(#soft)">
  <rect x="0" y="0" width="330" height="104" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  <circle cx="42" cy="52" r="22" fill="${C.greenPale}"/>
  <path d="M32 52 l7 7 13 -15" stroke="${C.green}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${label(78, 42, 'New quote request', { size: 15, weight: 800 })}
  ${label(78, 63, 'Oak removal &#183; Fairview, TX', { size: 12, weight: 500, fill: C.slate })}
  ${label(78, 82, '2 minutes ago', { size: 11, weight: 600, fill: C.green })}
</g>`;

  const rankCard = `<g filter="url(#soft)">
  <rect x="0" y="0" width="330" height="212" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  ${label(22, 36, 'Local search rankings', { size: 14, weight: 800 })}
  <rect x="248" y="20" width="62" height="22" rx="11" fill="${C.greenPale}"/>
  ${label(279, 35, '&#8593; Rising', { size: 10, weight: 800, fill: C.green, anchor: 'middle' })}
  ${[
    ['tree removal near me', '2', 78],
    ['emergency tree service', '1', 122],
    ['stump grinding Fairview', '4', 166],
  ]
    .map(
      ([term, pos, y]) => `<rect x="22" y="${y - 22}" width="286" height="34" rx="10" fill="${C.warm}"/>
      ${label(36, y, term, { size: 11.5, weight: 600, fill: C.navy800 })}
      <circle cx="288" cy="${y - 5}" r="13" fill="${C.navy}"/>
      ${label(288, y - 1, `#${pos}`, { size: 11, weight: 800, fill: C.paper, anchor: 'middle' })}`,
    )
    .join('')}
</g>`;

  const body = `
<rect width="${w}" height="${h}" fill="none"/>
<circle cx="120" cy="130" r="110" fill="${C.goldPale}" opacity="0.55"/>
<circle cx="900" cy="720" r="150" fill="${C.sky}" opacity="0.85"/>
<g filter="url(#soft)">
${browserFrame({ x: 60, y: 40, w: 586, h: 430, inner: siteInner, label: 'ridgelinetreecare.com' })}
</g>
${phoneFrame({ x: 596, y: 322, w: 180, h: 332, inner: phoneInner })}
<g transform="translate(640 44)">${rankCard}</g>
<g transform="translate(24 690)">${notification}</g>`;

  return svg({
    width: w,
    height: h,
    title: 'Service business website and local search results',
    desc: 'A tree-service website shown on desktop and mobile, with a new quote-request notification and a local search ranking card.',
    defs: `${shadowDef}<linearGradient id="heroWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b1f3a"/><stop offset="1" stop-color="#23507f"/></linearGradient>`,
    body,
  });
}

/* ------------------------------------------------------ before / after art */

function beforeAfter() {
  const w = 900;
  const h = 1100;

  const before = `
  <rect x="0" y="0" width="756" height="360" rx="10" fill="#f0eeea"/>
  ${bar(22, 20, 150, 20, '#b9b3a8', 4)}
  ${bar(200, 26, 60, 9, '#c9c3b8', 3)}${bar(270, 26, 60, 9, '#c9c3b8', 3)}${bar(340, 26, 60, 9, '#c9c3b8', 3)}
  ${bar(560, 22, 174, 16, '#cfc9be', 3)}
  <rect x="22" y="60" width="712" height="120" rx="4" fill="#ddd7cc"/>
  ${bar(40, 96, 380, 16, '#a8a196', 3)}
  ${bar(40, 124, 460, 10, '#b9b3a8', 3)}
  ${bar(40, 144, 420, 10, '#b9b3a8', 3)}
  ${[0, 1, 2, 3].map((i) => `<rect x="${22 + i * 180}" y="196" width="164" height="66" rx="4" fill="#e6e1d8"/>${bar(34 + i * 180, 214, 90, 9, '#bbb5aa', 3)}${bar(34 + i * 180, 232, 130, 7, '#ccc6bb', 3)}${bar(34 + i * 180, 246, 110, 7, '#ccc6bb', 3)}`).join('')}
  ${bar(22, 280, 700, 8, '#d5cfc4', 3)}
  ${bar(22, 296, 660, 8, '#d5cfc4', 3)}
  ${bar(22, 312, 690, 8, '#d5cfc4', 3)}
  ${bar(22, 328, 540, 8, '#d5cfc4', 3)}`;

  const after = `
  <rect x="0" y="0" width="756" height="360" rx="10" fill="${C.paper}"/>
  ${bar(22, 20, 118, 14, C.navy, 7)}
  ${bar(300, 23, 44, 8, C.mist)}${bar(356, 23, 44, 8, C.mist)}${bar(412, 23, 44, 8, C.mist)}
  ${pill(600, 12, 134, 30, C.gold, C.paper, '(555) 010-2280', 12)}
  <rect x="22" y="58" width="712" height="164" rx="12" fill="${C.navy}"/>
  <rect x="22" y="58" width="712" height="164" rx="12" fill="url(#afterWash)"/>
  ${bar(46, 90, 342, 18, C.paper, 9)}
  ${bar(46, 118, 268, 10, '#9fb6cf')}
  ${pill(46, 146, 156, 34, C.gold, C.navy, 'Get a free quote', 12)}
  ${pill(212, 146, 120, 34, 'rgba(255,255,255,0.18)', C.paper, 'Our work', 12)}
  <rect x="468" y="82" width="244" height="116" rx="10" fill="rgba(255,255,255,0.12)"/>
  ${bar(486, 100, 128, 10, 'rgba(255,255,255,0.75)')}
  ${bar(486, 120, 208, 8, 'rgba(255,255,255,0.4)')}
  ${bar(486, 136, 180, 8, 'rgba(255,255,255,0.4)')}
  ${pill(486, 156, 116, 26, C.paper, C.navy, 'Request quote', 10)}
  ${[0, 1, 2].map((i) => `<rect x="${22 + i * 240}" y="238" width="224" height="102" rx="12" fill="${C.warm}" stroke="${C.line}"/>
    <circle cx="${52 + i * 240}" cy="266" r="13" fill="${C.greenPale}"/>
    <path d="M${45 + i * 240} 266 l5 5 9 -10" stroke="${C.green}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${bar(76 + i * 240, 260, 96, 11, C.navy700)}
    ${bar(40 + i * 240, 292, 188, 8, C.mist)}
    ${bar(40 + i * 240, 308, 154, 8, C.mist)}`).join('')}`;

  const body = `
<rect width="${w}" height="${h}" rx="22" fill="${C.warm}"/>
<g transform="translate(72 60)">
  <rect x="-10" y="-44" width="106" height="30" rx="15" fill="#e2ddd4"/>
  ${label(43, -24, 'Before', { size: 13, weight: 800, fill: '#8a8377', anchor: 'middle' })}
  <g filter="url(#soft)">${before}</g>
</g>
<g transform="translate(72 620)">
  <rect x="-10" y="-44" width="106" height="30" rx="15" fill="${C.greenPale}"/>
  ${label(43, -24, 'After', { size: 13, weight: 800, fill: C.green, anchor: 'middle' })}
  <g filter="url(#soft)">${after}</g>
</g>
<g transform="translate(450 520)">
  <circle r="34" fill="${C.navy}"/>
  <path d="M0 -14 v28 M-11 3 l11 11 11 -11" stroke="${C.paper}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>`;

  return svg({
    width: w,
    height: h,
    title: 'Website before and after redesign',
    desc: 'A cluttered outdated contractor website above a clean redesign with a visible phone number, quote button and trust cards.',
    defs: `${shadowDef}<linearGradient id="afterWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b1f3a"/><stop offset="1" stop-color="#23507f"/></linearGradient>`,
    body,
  });
}

/* ------------------------------------------------------------ service art */

function serviceWebsiteDesign() {
  const inner = `
  ${bar(20, 18, 88, 12, C.navy, 6)}
  ${pill(430, 10, 96, 26, C.gold, C.paper, 'Call now', 11)}
  <rect x="20" y="50" width="506" height="150" rx="12" fill="${C.navy}"/>
  ${bar(42, 80, 268, 16, C.paper, 8)}
  ${bar(42, 106, 204, 10, '#9fb6cf')}
  ${pill(42, 132, 140, 30, C.gold, C.navy, 'Get a free quote', 11)}
  <rect x="332" y="70" width="176" height="110" rx="10" fill="rgba(255,255,255,0.12)"/>
  ${bar(350, 88, 96, 9, 'rgba(255,255,255,0.75)')}
  ${bar(350, 106, 140, 7, 'rgba(255,255,255,0.4)')}
  ${bar(350, 120, 120, 7, 'rgba(255,255,255,0.4)')}
  ${pill(350, 138, 96, 24, C.paper, C.navy, 'Send', 10)}
  ${[0, 1, 2, 3].map((i) => `<rect x="${20 + i * 130}" y="216" width="116" height="82" rx="10" fill="${C.warm}" stroke="${C.line}"/>
    <circle cx="${44 + i * 130}" cy="240" r="11" fill="${C.goldPale}"/>
    ${bar(20 + i * 130 + 12, 262, 78, 8, C.navy700)}
    ${bar(20 + i * 130 + 12, 278, 92, 6, C.mist)}`).join('')}`;

  const phoneInner = `
  ${bar(14, 10, 48, 8, C.navy, 4)}
  ${pill(96, 4, 40, 20, C.gold, C.paper, 'Call', 9)}
  <rect x="14" y="32" width="122" height="70" rx="9" fill="${C.navy}"/>
  ${bar(26, 50, 84, 9, C.paper, 5)}
  ${pill(26, 70, 76, 20, C.gold, C.navy, 'Free quote', 8)}
  ${[0, 1, 2].map((i) => `${bar(14, 114 + i * 34, 122, 26, C.warm, 7)}${bar(24, 122 + i * 34, 48, 7, C.navy700)}${bar(24, 133 + i * 34, 84, 5, C.mist)}`).join('')}
  ${pill(14, 220, 122, 26, C.navy, C.paper, 'Request a quote', 9)}`;

  return svg({
    width: 1000,
    height: 750,
    title: 'Lead-generation website design',
    desc: 'A service-business website mockup on desktop and mobile with a call button, hero quote form and service cards.',
    defs: shadowDef,
    body: `<rect width="1000" height="750" rx="20" fill="${C.warm}"/>
<circle cx="880" cy="120" r="96" fill="${C.goldPale}" opacity="0.6"/>
<g filter="url(#soft)">${browserFrame({ x: 60, y: 90, w: 546, h: 380, inner, label: 'ridgelinetreecare.com' })}</g>
${phoneFrame({ x: 640, y: 250, w: 150, h: 290, inner: phoneInner })}
<g filter="url(#soft)" transform="translate(520 560)">
  <rect width="404" height="116" rx="16" fill="${C.paper}" stroke="${C.line}"/>
  <circle cx="46" cy="58" r="22" fill="${C.greenPale}"/>
  <path d="M36 58 l7 7 13 -15" stroke="${C.green}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${label(82, 48, 'New quote request', { size: 15, weight: 800 })}
  ${label(82, 70, 'Driveway replacement &#183; 1,200 sq ft', { size: 12, weight: 500, fill: C.slate })}
  ${label(82, 90, 'Just now', { size: 11, weight: 700, fill: C.green })}
</g>`,
  });
}

function serviceRedesign() {
  const old = `<rect width="330" height="230" rx="10" fill="#f0eeea"/>
  ${bar(18, 16, 96, 14, '#b9b3a8', 3)}
  ${bar(200, 20, 44, 8, '#c9c3b8', 3)}${bar(252, 20, 44, 8, '#c9c3b8', 3)}
  <rect x="18" y="44" width="294" height="72" rx="3" fill="#ddd7cc"/>
  ${bar(32, 66, 180, 12, '#a8a196', 3)}${bar(32, 88, 220, 8, '#b9b3a8', 3)}
  ${[0, 1, 2].map((i) => `<rect x="${18 + i * 100}" y="130" width="90" height="52" rx="3" fill="#e6e1d8"/>${bar(28 + i * 100, 144, 52, 7, '#bbb5aa', 3)}${bar(28 + i * 100, 158, 68, 6, '#ccc6bb', 3)}`).join('')}
  ${bar(18, 196, 290, 7, '#d5cfc4', 3)}
  ${bar(18, 210, 250, 7, '#d5cfc4', 3)}`;

  const fresh = `<rect width="330" height="230" rx="10" fill="${C.paper}"/>
  ${bar(18, 16, 82, 11, C.navy, 6)}
  ${pill(232, 10, 82, 24, C.gold, C.paper, 'Call now', 10)}
  <rect x="18" y="44" width="294" height="96" rx="10" fill="${C.navy}"/>
  ${bar(36, 66, 176, 13, C.paper, 7)}
  ${bar(36, 88, 132, 8, '#9fb6cf')}
  ${pill(36, 106, 112, 24, C.gold, C.navy, 'Get a free quote', 9)}
  ${[0, 1, 2].map((i) => `<rect x="${18 + i * 100}" y="152" width="90" height="62" rx="9" fill="${C.warm}" stroke="${C.line}"/>
    <circle cx="${36 + i * 100}" cy="170" r="9" fill="${C.greenPale}"/>
    <path d="M${31 + i * 100} 170 l3.6 3.6 6.4 -7.2" stroke="${C.green}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${bar(28 + i * 100, 188, 62, 7, C.navy700)}${bar(28 + i * 100, 201, 72, 5, C.mist)}`).join('')}`;

  return svg({
    width: 1000,
    height: 750,
    title: 'Website redesign comparison',
    desc: 'A cluttered outdated contractor website beside a clean modern redesign with a visible quote button.',
    defs: shadowDef,
    body: `<rect width="1000" height="750" rx="20" fill="${C.warm}"/>
<circle cx="500" cy="375" r="250" fill="${C.sky}" opacity="0.6"/>
<g transform="translate(70 180)">
  <rect x="0" y="-40" width="92" height="28" rx="14" fill="#e2ddd4"/>
  ${label(46, -21, 'Before', { size: 12, weight: 800, fill: '#8a8377', anchor: 'middle' })}
  <g filter="url(#soft)">${old}</g>
</g>
<g transform="translate(600 340)">
  <rect x="0" y="-40" width="92" height="28" rx="14" fill="${C.greenPale}"/>
  ${label(46, -21, 'After', { size: 12, weight: 800, fill: C.green, anchor: 'middle' })}
  <g filter="url(#soft)">${fresh}</g>
</g>
<g transform="translate(500 300)"><circle r="36" fill="${C.navy}"/>
  <path d="M-14 -4 a14 14 0 0 1 24 -9 M12 4 a14 14 0 0 1 -24 9" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M10 -20 v9 h-9 M-10 20 v-9 h9" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>`,
  });
}

function serviceLocalSeo() {
  const row = (y, term, pos, delta) => `<rect x="24" y="${y}" width="392" height="46" rx="12" fill="${C.warm}"/>
  ${label(42, y + 29, term, { size: 13, weight: 600, fill: C.navy800 })}
  <rect x="306" y="${y + 12}" width="46" height="22" rx="11" fill="${C.greenPale}"/>
  ${label(329, y + 27, delta, { size: 10, weight: 800, fill: C.green, anchor: 'middle' })}
  <circle cx="386" cy="${y + 23}" r="15" fill="${C.navy}"/>
  ${label(386, y + 28, pos, { size: 12, weight: 800, fill: C.paper, anchor: 'middle' })}`;

  return svg({
    width: 1000,
    height: 750,
    title: 'Local SEO results and Google Business Profile',
    desc: 'A local search results panel with a map, a Google Business Profile card and a keyword ranking table.',
    defs: shadowDef,
    body: `<rect width="1000" height="750" rx="20" fill="${C.warm}"/>
<g filter="url(#soft)" transform="translate(56 70)">
  <rect width="440" height="300" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  <rect width="440" height="300" rx="18" fill="url(#mapWash)"/>
  <path d="M0 96 h440 M0 190 h440 M120 0 v300 M290 0 v300" stroke="${C.mist}" stroke-width="6" opacity="0.8"/>
  <path d="M0 140 C 120 130 180 210 440 200" stroke="${C.goldLight}" stroke-width="8" fill="none" opacity="0.7"/>
  <g transform="translate(210 120)">
    <path d="M0 44 C -26 14 -30 4 -30 -8 a30 30 0 0 1 60 0 c0 12 -4 22 -30 52 Z" fill="${C.navy}"/>
    <circle cy="-8" r="11" fill="${C.paper}"/>
  </g>
  ${[[86, 210], [352, 92], [130, 250], [380, 236]].map(([cx, cy]) => `<g transform="translate(${cx} ${cy})"><path d="M0 26 C -15 8 -18 2 -18 -5 a18 18 0 0 1 36 0 c0 7 -3 13 -18 31 Z" fill="${C.steel}" opacity="0.75"/><circle cy="-5" r="6" fill="${C.paper}"/></g>`).join('')}
</g>
<g filter="url(#soft)" transform="translate(536 108)">
  <rect width="416" height="232" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  <rect x="24" y="24" width="56" height="56" rx="14" fill="${C.navy}"/>
  <path d="M40 52 l7 7 14 -16" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${label(96, 46, 'Ridgeline Tree Care', { size: 16, weight: 800 })}
  ${label(96, 68, 'Tree service &#183; Fairview, TX', { size: 12, weight: 500, fill: C.slate })}
  <g transform="translate(24 104)">
    ${[0, 1, 2, 3, 4].map((i) => `<path transform="translate(${i * 26} 0)" d="M10 0 l3 6.4 7 1 -5 5 1.2 7 -6.2-3.4 -6.2 3.4 1.2 -7 -5 -5 7 -1 Z" fill="${C.gold}"/>`).join('')}
    ${label(146, 14, '4.9 &#183; 128 reviews', { size: 12, weight: 700, fill: C.navy800 })}
  </g>
  ${[['Verified profile', 0], ['Service areas set', 1], ['Photos updated weekly', 2]].map(([t, i]) => `<g transform="translate(24 ${150 + i * 26})">
    <circle cx="8" cy="0" r="8" fill="${C.greenPale}"/>
    <path d="M4.4 0 l2.6 2.6 4.6 -5.2" stroke="${C.green}" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${label(26, 4, t, { size: 12, weight: 600, fill: C.navy800 })}</g>`).join('')}
</g>
<g filter="url(#soft)" transform="translate(280 420)">
  <rect width="440" height="264" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  ${label(24, 44, 'Keyword rankings', { size: 15, weight: 800 })}
  ${label(416, 44, 'Last 90 days', { size: 11, weight: 700, fill: C.slate, anchor: 'end' })}
  ${row(64, 'tree removal near me', '2', '&#8593;6')}
  ${row(122, 'emergency tree service', '1', '&#8593;4')}
  ${row(180, 'stump grinding Fairview', '4', '&#8593;9')}
</g>`,
  }).replace('<defs>', `<defs><linearGradient id="mapWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f2f7fc"/><stop offset="1" stop-color="#e6eef7"/></linearGradient>`);
}

function serviceLandingPages() {
  const inner = `
  ${bar(20, 18, 76, 11, C.navy, 6)}
  ${pill(400, 10, 92, 26, C.gold, C.paper, 'Call now', 11)}
  ${bar(20, 58, 300, 18, C.navy, 9)}
  ${bar(20, 88, 240, 10, C.mist)}
  ${bar(20, 108, 200, 10, C.mist)}
  ${[0, 1, 2].map((i) => `<g transform="translate(20 ${140 + i * 26})"><circle cx="8" cy="0" r="8" fill="${C.greenPale}"/><path d="M4.4 0 l2.6 2.6 4.6 -5.2" stroke="${C.green}" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${bar(26, -5, 150, 8, C.mist)}</g>`).join('')}
  <rect x="304" y="52" width="188" height="212" rx="14" fill="${C.warm}" stroke="${C.line}"/>
  ${label(322, 78, 'Get your free quote', { size: 12, weight: 800 })}
  ${[0, 1, 2].map((i) => `<rect x="322" y="${92 + i * 40}" width="152" height="28" rx="8" fill="${C.paper}" stroke="${C.line}"/>${bar(332, 102 + i * 40, 60, 7, C.mist)}`).join('')}
  ${pill(322, 214, 152, 32, C.navy, C.paper, 'Request quote', 11)}
  ${[0, 1, 2].map((i) => `<rect x="${20 + i * 96}" y="228" width="84" height="34" rx="8" fill="${C.goldPale}"/>`).join('')}`;

  return svg({
    width: 1000,
    height: 750,
    title: 'Campaign landing page and conversions',
    desc: 'A campaign landing page mockup with a headline, quote form and trust badges, next to a bar chart of form submissions.',
    defs: shadowDef,
    body: `<rect width="1000" height="750" rx="20" fill="${C.warm}"/>
<circle cx="120" cy="640" r="110" fill="${C.goldPale}" opacity="0.55"/>
<g filter="url(#soft)">${browserFrame({ x: 60, y: 80, w: 512, h: 330, inner, label: 'driveway-replacement-fairview' })}</g>
<g filter="url(#soft)" transform="translate(608 200)">
  <rect width="332" height="290" rx="18" fill="${C.paper}" stroke="${C.line}"/>
  ${label(24, 44, 'Quote requests', { size: 15, weight: 800 })}
  ${label(308, 44, 'per week', { size: 11, weight: 700, fill: C.slate, anchor: 'end' })}
  ${[38, 52, 46, 74, 96, 118, 150].map((v, i) => {
    const x = 30 + i * 42;
    const barH = v * 1.05;
    const y = 244 - barH;
    const fill = i >= 4 ? C.navy : C.mist;
    return `<rect x="${x}" y="${y}" width="26" height="${barH}" rx="7" fill="${fill}"/>`;
  }).join('')}
  <line x1="24" y1="252" x2="308" y2="252" stroke="${C.line}"/>
  ${label(24, 274, 'Campaign pages launched', { size: 11, weight: 600, fill: C.slate })}
</g>
<g filter="url(#soft)" transform="translate(96 508)">
  <rect width="380" height="98" rx="16" fill="${C.paper}" stroke="${C.line}"/>
  <circle cx="44" cy="49" r="20" fill="${C.goldPale}"/>
  <path d="M45 36 l-9 15 h8 l-2 12 10 -16 h-8 Z" fill="${C.gold}"/>
  ${label(78, 42, 'One page, one action', { size: 14, weight: 800 })}
  ${label(78, 66, 'Matched to the search that brought them', { size: 12, weight: 500, fill: C.slate })}
</g>`,
  });
}

function serviceMaintenance() {
  const rows = [
    ['Uptime monitoring', 'All clear'],
    ['Daily backups', 'Complete'],
    ['Security updates', 'Applied'],
    ['Quote form delivery', 'Verified'],
    ['Page speed', 'Good'],
  ];
  return svg({
    width: 1000,
    height: 750,
    title: 'Website health checklist',
    desc: 'A website maintenance panel showing uptime, backup, update, form and speed checks all passing.',
    defs: shadowDef,
    body: `<rect width="1000" height="750" rx="20" fill="${C.warm}"/>
<circle cx="840" cy="620" r="130" fill="${C.greenPale}" opacity="0.7"/>
<g filter="url(#soft)" transform="translate(150 110)">
  <rect width="580" height="420" rx="20" fill="${C.paper}" stroke="${C.line}"/>
  <rect width="580" height="72" rx="20" fill="${C.navy}"/>
  <rect y="52" width="580" height="20" fill="${C.navy}"/>
  ${label(32, 45, 'Site health', { size: 17, weight: 800, fill: C.paper })}
  <rect x="440" y="24" width="108" height="26" rx="13" fill="rgba(255,255,255,0.16)"/>
  ${label(494, 42, 'All passing', { size: 11, weight: 800, fill: '#9ce0bd', anchor: 'middle' })}
  ${rows.map(([name, status], i) => `<g transform="translate(0 ${104 + i * 62})">
    <rect x="24" y="0" width="532" height="48" rx="12" fill="${C.warm}"/>
    <circle cx="52" cy="24" r="14" fill="${C.greenPale}"/>
    <path d="M45 24 l5 5 9 -10" stroke="${C.green}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${label(80, 29, name, { size: 13, weight: 700, fill: C.navy800 })}
    ${label(534, 29, status, { size: 12, weight: 700, fill: C.green, anchor: 'end' })}
  </g>`).join('')}
</g>
<g filter="url(#soft)" transform="translate(600 560)">
  <rect width="300" height="96" rx="16" fill="${C.paper}" stroke="${C.line}"/>
  <circle cx="44" cy="48" r="20" fill="${C.goldPale}"/>
  <path d="M44 36 l10 4.4 v8 c0 7 -4.4 13 -10 15.6 -5.6 -2.6 -10 -8.6 -10 -15.6 v-8 Z" fill="${C.gold}"/>
  ${label(78, 42, 'Checked every month', { size: 13, weight: 800 })}
  ${label(78, 64, 'Optional, cancel any time', { size: 12, weight: 500, fill: C.slate })}
</g>`,
  });
}

/* ---------------------------------------------------------- industry scenes */

const W = 800;
const H = 560;

function industryScene(bodyFn, { title, desc, skyTop, skyBottom, ground, horizon = 0.66 } = {}) {
  const s = scene({ w: W, h: H, skyTop, skyBottom, ground, horizon });
  return svg({
    width: W,
    height: H,
    title,
    desc,
    defs: `${shadowDef}${s.defs}`,
    body: `${s.body}\n${bodyFn(s.gy)}`,
  });
}

const industryArt = {
  'industry-tree-service': () =>
    industryScene(
      (gy) => `
  ${house({ x: 560, y: gy - 6, w: 200 })}
  ${tree(690, gy + 4, 0.72, C.greenLight)}
  <g transform="translate(250 ${gy - 236})">
    <rect x="-13" y="0" width="26" height="240" rx="8" fill="#6b4b34"/>
    <path d="M0 66 l-58 -34 M0 30 l64 -30" stroke="#6b4b34" stroke-width="11" stroke-linecap="round"/>
    <circle cx="-8" cy="-30" r="76" fill="${C.green}"/>
    <circle cx="-72" cy="16" r="50" fill="${C.greenLight}"/>
    <circle cx="66" cy="8" r="54" fill="${C.greenLight}"/>
    <circle cx="14" cy="30" r="46" fill="${C.green}"/>
    <line x1="10" y1="96" x2="128" y2="150" stroke="${C.goldLight}" stroke-width="4" stroke-dasharray="11 8"/>
    ${worker(18, 118, 1.0, C.gold, C.paper)}
  </g>
  ${van(432, gy + 8, 1.0, C.paper, C.green, 'TREE CARE')}
  <ellipse cx="250" cy="${gy + 12}" rx="96" ry="9" fill="${C.navy}" opacity="0.07"/>`,
      {
        title: 'Tree service crew at work',
        desc: 'A certified arborist roped into a mature tree with a chipper truck parked below.',
        skyTop: '#f1f8f3',
        skyBottom: '#e2efe8',
        ground: '#dfe6da',
      },
    ),

  'industry-concrete': () =>
    industryScene(
      (gy) => `
  ${house({ x: 480, y: gy - 4, w: 250 })}
  <path d="M120 ${H - 20} L300 ${gy - 6} L560 ${gy - 6} L470 ${H - 20} Z" fill="#d9d5cd"/>
  <path d="M120 ${H - 20} L300 ${gy - 6} L560 ${gy - 6} L470 ${H - 20} Z" fill="none" stroke="${C.paper}" stroke-width="3"/>
  <path d="M196 ${H - 20} L342 ${gy - 6} M272 ${H - 20} L384 ${gy - 6} M348 ${H - 20} L426 ${gy - 6} M424 ${H - 20} L468 ${gy - 6}" stroke="${C.paper}" stroke-width="2.5" opacity="0.9"/>
  ${worker(210, gy + 44, 1.05, C.navy700, C.gold)}
  <path d="M222 ${gy + 12} l84 -40" stroke="#8a8377" stroke-width="6" stroke-linecap="round"/>
  <rect x="296" y="${gy - 34}" width="52" height="12" rx="4" fill="${C.gold}"/>
  ${tree(700, gy + 4, 0.8, C.greenLight)}
  <g transform="translate(70 96)" filter="url(#soft)">
    <rect width="196" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Stamped finish', { size: 13, weight: 800 })}
    ${label(20, 50, '1,200 sq ft driveway', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Newly poured concrete driveway',
        desc: 'A freshly finished concrete driveway leading to a suburban house, with a finisher at work.',
        skyTop: '#f4f7fb',
        skyBottom: '#e7eef6',
        ground: '#e8e3d9',
      },
    ),

  'industry-fence': () =>
    industryScene(
      (gy) => `
  ${house({ x: 500, y: gy - 30, w: 220 })}
  ${tree(78, gy - 96, 0.62, C.greenLight)}
  <g>
    ${Array.from({ length: 13 }, (_, i) => {
      const x = 60 + i * 46;
      return `<rect x="${x}" y="${gy - 118}" width="30" height="150" rx="6" fill="${i > 8 ? '#c9a06a' : '#d9b27c'}"/>
      <path d="M${x} ${gy - 118} h30 l-15 -14 Z" fill="#b98f5c"/>`;
    }).join('')}
    <rect x="60" y="${gy - 84}" width="612" height="11" rx="4" fill="#b98f5c" opacity="0.85"/>
    <rect x="60" y="${gy - 20}" width="612" height="11" rx="4" fill="#b98f5c" opacity="0.85"/>
  </g>
  ${worker(700, gy + 22, 1.05, C.green, C.gold)}
  <g transform="translate(80 92)" filter="url(#soft)">
    <rect width="212" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Cedar privacy fence', { size: 13, weight: 800 })}
    ${label(20, 50, '180 linear feet &#183; 2 gates', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'New privacy fence installation',
        desc: 'An installer setting a new wooden privacy fence along a suburban property line.',
        skyTop: '#f6f4ef',
        skyBottom: '#ebe6db',
        ground: '#dfe3d6',
      },
    ),

  'industry-landscaping': () =>
    industryScene(
      (gy) => `
  ${house({ x: 452, y: gy - 16, w: 280 })}
  ${tree(120, gy - 6, 1.05, C.green)}
  ${tree(714, gy - 12, 0.72, C.greenLight)}
  <path d="M338 ${gy - 16} L386 ${gy - 16} L470 ${H - 16} L268 ${H - 16} Z" fill="#e7e2d6"/>
  <path d="M344 ${gy - 16} L380 ${gy - 16} L452 ${H - 16} L288 ${H - 16} Z" fill="${C.warm}"/>
  ${[0, 1, 2, 3].map((i) => {
    const t = i / 4;
    const y = gy - 16 + (H - gy) * (t + 0.16);
    const half = 20 + i * 15;
    return `<path d="M${362 - half} ${y.toFixed(0)} h${half * 2}" stroke="#ded8c9" stroke-width="3"/>`;
  }).join('')}
  <ellipse cx="152" cy="${gy + 62}" rx="92" ry="26" fill="#7a6046" opacity="0.45"/>
  ${[[104, 0], [148, 1], [192, 0], [126, 1], [170, 0]].map(([x, alt], i) => `<g transform="translate(${x} ${gy + (i % 2 ? 74 : 54)})">
    <rect x="-2.5" y="-16" width="5" height="18" rx="2" fill="${C.green}"/>
    <circle cy="-23" r="12" fill="${alt ? C.goldLight : C.greenLight}"/>
  </g>`).join('')}
  ${[604, 648, 692].map((x) => `<rect x="${x}" y="${gy + 4}" width="30" height="15" rx="5" fill="${C.greenLight}"/>`).join('')}
  ${worker(600, gy + 70, 1.05, C.green, C.gold)}
  <g transform="translate(70 88)" filter="url(#soft)">
    <rect width="200" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Design &amp; build', { size: 13, weight: 800 })}
    ${label(20, 50, 'Front garden renovation', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Landscaped front garden',
        desc: 'A landscaped front garden with new planting beds, edging and a stone path.',
        skyTop: '#f2f8f3',
        skyBottom: '#e3efe6',
        ground: '#d9e2d2',
      },
    ),

  'industry-pool': () =>
    industryScene(
      (gy) => `
  ${house({ x: 520, y: gy - 60, w: 230 })}
  ${tree(120, gy - 40, 0.85, C.greenLight)}
  <rect x="90" y="${gy - 10}" width="520" height="230" rx="26" fill="#cfe3ee"/>
  <rect x="112" y="${gy + 8}" width="476" height="194" rx="18" fill="url(#water)"/>
  ${[0, 1, 2, 3].map((i) => `<path d="M140 ${gy + 44 + i * 40} q 44 -14 88 0 t 88 0 t 88 0 t 88 0" stroke="${C.paper}" stroke-width="4" fill="none" opacity="0.5"/>`).join('')}
  <rect x="640" y="${gy + 26}" width="86" height="12" rx="6" fill="${C.paper}"/>
  <rect x="646" y="${gy + 38}" width="10" height="42" rx="4" fill="${C.mist}"/>
  <rect x="710" y="${gy + 38}" width="10" height="42" rx="4" fill="${C.mist}"/>
  <path d="M632 ${gy + 24} q 44 -46 96 -4" stroke="${C.gold}" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${worker(660, gy - 12, 0.85, C.navy700, C.paper)}
  <g transform="translate(72 84)" filter="url(#soft)">
    <rect width="204" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Weekly service plan', { size: 13, weight: 800 })}
    ${label(20, 50, 'Chemistry balanced &#183; filter clean', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Clean residential swimming pool',
        desc: 'A clean residential swimming pool with patio furniture and service equipment nearby.',
        skyTop: '#f1f7fc',
        skyBottom: '#e2eef8',
        ground: '#e9e4da',
        horizon: 0.5,
      },
    ).replace('<defs>', `<defs><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#6fb6d8"/><stop offset="1" stop-color="#3f8fb8"/></linearGradient>`),

  'industry-garage-door': () =>
    industryScene(
      (gy) => `
  <g>
    <path d="M120 ${gy - 60} L330 ${gy - 190} L540 ${gy - 60} Z" fill="${C.navy800}"/>
    <rect x="140" y="${gy - 60}" width="380" height="60" fill="${C.paper}" stroke="${C.line}"/>
  </g>
  <rect x="166" y="${gy - 168}" width="328" height="168" rx="6" fill="${C.warm2}"/>
  <rect x="176" y="${gy - 158}" width="308" height="148" rx="4" fill="${C.paper}" stroke="${C.mist}"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="184" y="${gy - 150 + i * 36}" width="292" height="30" rx="3" fill="${C.warm}" stroke="${C.mist}"/>`).join('')}
  ${[0, 1, 2, 3].map((i) => `<rect x="${200 + i * 72}" y="${gy - 148}" width="52" height="26" rx="3" fill="${C.sky}"/>`).join('')}
  ${worker(560, gy + 4, 1.05, C.navy700, C.gold)}
  <rect x="588" y="${gy - 34}" width="12" height="46" rx="4" fill="${C.gold}"/>
  ${van(596, gy + 8, 0.78, C.paper, C.navy700, 'DOORS')}
  <path d="M60 ${gy} h680" stroke="${C.mist}" stroke-width="3"/>
  <g transform="translate(70 84)" filter="url(#soft)">
    <rect width="196" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Same-day repair', { size: 13, weight: 800 })}
    ${label(20, 50, 'Spring replaced in 90 minutes', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Garage door service call',
        desc: 'A technician servicing a residential garage door with a branded service van on the driveway.',
        skyTop: '#f5f7fa',
        skyBottom: '#e8edf4',
        ground: '#dcdcd6',
        horizon: 0.76,
      },
    ),

  'industry-roofing': () =>
    industryScene(
      (gy) => `
  <path d="M110 ${gy + 10} L400 ${gy - 210} L690 ${gy + 10} Z" fill="${C.navy800}"/>
  <path d="M150 ${gy + 10} L400 ${gy - 180} L650 ${gy + 10} Z" fill="#4a5a6d"/>
  ${Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 14 }, (_, c) => {
      const rowY = gy - 12 - r * 24;
      const spread = 250 - r * 32;
      const startX = 400 - spread;
      const step = (spread * 2) / 13;
      const x = startX + c * step;
      if (x < 400 - spread || x > 400 + spread - step) return '';
      return `<rect x="${x.toFixed(1)}" y="${rowY}" width="${(step - 3).toFixed(1)}" height="20" rx="2" fill="${r > 3 ? '#5d6e83' : '#3f4f63'}" />`;
    }).join(''),
  ).join('')}
  <rect x="440" y="${gy - 168}" width="46" height="66" rx="4" fill="${C.warm2}"/>
  <rect x="434" y="${gy - 176}" width="58" height="12" rx="4" fill="${C.mist}"/>
  ${worker(320, gy - 70, 0.92, C.gold, C.paper)}
  ${worker(486, gy - 28, 0.86, C.green, C.paper)}
  <rect x="150" y="${gy + 10}" width="500" height="16" rx="6" fill="${C.paper}" stroke="${C.line}"/>
  <g transform="translate(66 82)" filter="url(#soft)">
    <rect width="200" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Full replacement', { size: 13, weight: 800 })}
    ${label(20, 50, 'Architectural shingle &#183; 28 sq', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Roof replacement in progress',
        desc: 'Roofers installing new architectural shingles on a suburban house roof.',
        skyTop: '#f3f6fb',
        skyBottom: '#e5ecf5',
        ground: '#dfe3da',
        horizon: 0.82,
      },
    ),

  'industry-outdoor': () =>
    industryScene(
      (gy) => `
  ${house({ x: 470, y: gy - 20, w: 250 })}
  <path d="M80 ${H - 24} L250 ${gy - 4} L520 ${gy - 4} L440 ${H - 24} Z" fill="#c8c2b6"/>
  <path d="M80 ${H - 24} L250 ${gy - 4} L370 ${gy - 4} L250 ${H - 24} Z" fill="#eeeae2"/>
  ${worker(300, gy + 62, 1.1, C.navy700, C.gold)}
  <path d="M312 ${gy + 26} l70 26" stroke="${C.mist}" stroke-width="7" stroke-linecap="round"/>
  <path d="M382 ${gy + 52} q 30 12 44 40" stroke="#9fc9e0" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
  <path d="M388 ${gy + 46} q 40 16 56 52" stroke="#bfdcee" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
  ${tree(110, gy - 10, 0.75, C.greenLight)}
  ${[560, 600, 640, 680].map((x) => `<circle cx="${x}" cy="${gy - 96}" r="7" fill="${C.goldLight}"/>`).join('')}
  <path d="M548 ${gy - 96} h150" stroke="${C.gold}" stroke-width="2.4" opacity="0.7"/>
  <g transform="translate(66 84)" filter="url(#soft)">
    <rect width="206" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Pressure washing', { size: 13, weight: 800 })}
    ${label(20, 50, 'Driveway, patio and walkways', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Pressure washing a driveway',
        desc: 'A contractor pressure washing a suburban driveway and patio, with outdoor lighting on the house.',
        skyTop: '#f4f7fa',
        skyBottom: '#e6eef5',
        ground: '#dde2d7',
      },
    ),

  'industry-real-estate': () =>
    industryScene(
      (gy) => `
  ${house({ x: 300, y: gy - 10, w: 320, roof: C.navy, door: C.gold })}
  ${tree(120, gy + 4, 0.85, C.greenLight)}
  ${tree(720, gy + 2, 0.7, C.green)}
  <g transform="translate(150 ${gy - 16})">
    <rect x="-5" y="-116" width="10" height="120" rx="4" fill="#8a8377"/>
    <rect x="0" y="-126" width="150" height="76" rx="8" fill="${C.paper}" stroke="${C.navy}" stroke-width="3"/>
    ${label(75, -96, 'FOR SALE', { size: 17, weight: 800, anchor: 'middle', fill: C.navy })}
    ${label(75, -72, 'Design Rank Realty', { size: 10, weight: 600, anchor: 'middle', fill: C.slate })}
  </g>
  ${worker(500, gy + 22, 0.95, C.navy700, C.paper)}
  ${worker(556, gy + 22, 0.9, C.gold, C.paper)}
  <g transform="translate(548 78)" filter="url(#soft)">
    <rect width="196" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Neighbourhood guide', { size: 13, weight: 800 })}
    ${label(20, 50, 'Schools, prices, commute times', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Suburban home listed for sale',
        desc: 'A suburban home with a for-sale sign and an agent greeting buyers at the door.',
        skyTop: '#f4f7fc',
        skyBottom: '#e6eef7',
        ground: '#dee5d8',
      },
    ),

  'industry-legal': () =>
    industryScene(
      (gy) => `
  <rect x="180" y="${gy - 250}" width="440" height="250" rx="14" fill="${C.paper}" stroke="${C.line}"/>
  <rect x="180" y="${gy - 250}" width="440" height="56" rx="14" fill="${C.navy}"/>
  <rect x="180" y="${gy - 208}" width="440" height="14" fill="${C.navy}"/>
  ${label(210, gy - 214, 'Consultation request', { size: 15, weight: 800, fill: C.paper })}
  <g transform="translate(400 ${gy - 118})">
    <rect x="-2.6" y="-52" width="5.2" height="104" rx="2.6" fill="${C.gold}"/>
    <rect x="-56" y="-54" width="112" height="5" rx="2.5" fill="${C.gold}"/>
    <path d="M-56 -50 l-18 34 h36 Z" fill="${C.goldLight}"/>
    <path d="M56 -50 l-18 34 h36 Z" fill="${C.goldLight}"/>
    <rect x="-30" y="50" width="60" height="8" rx="4" fill="${C.gold}"/>
  </g>
  ${[0, 1].map((i) => `<rect x="${216 + i * 200}" y="${gy - 60}" width="168" height="34" rx="10" fill="${C.warm}"/>`).join('')}
  <g transform="translate(96 96)" filter="url(#soft)">
    <rect width="188" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Free consultation', { size: 13, weight: 800 })}
    ${label(20, 50, 'Booked in under a minute', { size: 11, weight: 500, fill: C.slate })}
  </g>
  <g transform="translate(560 380)" filter="url(#soft)">
    <rect width="180" height="66" rx="14" fill="${C.paper}" stroke="${C.line}"/>
    ${label(20, 30, 'Practice area pages', { size: 13, weight: 800 })}
    ${label(20, 50, 'Written for clients', { size: 11, weight: 500, fill: C.slate })}
  </g>`,
      {
        title: 'Law firm consultation booking',
        desc: 'A law office consultation panel with a scales-of-justice motif and a booking card.',
        skyTop: '#f6f5f1',
        skyBottom: '#eeebe3',
        ground: '#e2ded4',
        horizon: 0.86,
      },
    ),
};

/* -------------------------------------------------------- portfolio mockups */

function siteMockup({ title, desc, accent, chrome, headline, sub, ctaText, cards, badge = null }) {
  const inner = `
  ${bar(24, 20, 96, 13, C.navy, 6)}
  ${bar(320, 23, 46, 8, C.mist)}${bar(378, 23, 46, 8, C.mist)}${bar(436, 23, 46, 8, C.mist)}
  ${pill(880, 12, 118, 28, accent, C.paper, ctaText, 11)}
  <rect x="24" y="58" width="1104" height="228" rx="14" fill="${C.navy}"/>
  <rect x="24" y="58" width="1104" height="228" rx="14" fill="url(#mockWash)"/>
  ${label(56, 130, headline, { size: 30, weight: 800, fill: C.paper })}
  ${label(56, 166, sub, { size: 15, weight: 500, fill: '#a9bed4' })}
  ${pill(56, 190, 176, 40, accent, C.navy, ctaText, 13)}
  ${pill(244, 190, 150, 40, 'rgba(255,255,255,0.15)', C.paper, 'Our work', 13)}
  ${badge ? `<rect x="880" y="92" width="216" height="76" rx="12" fill="rgba(255,255,255,0.12)"/>${label(898, 122, badge[0], { size: 13, weight: 800, fill: C.paper })}${label(898, 146, badge[1], { size: 11, weight: 500, fill: '#a9bed4' })}` : ''}
  ${cards
    .map((card, i) => {
      const x = 24 + i * 282;
      return `<rect x="${x}" y="306" width="262" height="128" rx="12" fill="${C.warm}" stroke="${C.line}"/>
      <circle cx="${x + 32}" cy="338" r="14" fill="${C.goldPale}"/>
      ${label(x + 58, 344, card[0], { size: 13, weight: 800 })}
      ${bar(x + 20, 364, 214, 8, C.mist)}
      ${bar(x + 20, 382, 186, 8, C.mist)}
      ${label(x + 20, 414, card[1], { size: 11, weight: 700, fill: C.navy600 })}`;
    })
    .join('')}`;

  return svg({
    width: 1200,
    height: 760,
    title,
    desc,
    defs: `${shadowDef}<linearGradient id="mockWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b1f3a"/><stop offset="1" stop-color="#23507f"/></linearGradient>`,
    body: `<rect width="1200" height="760" rx="24" fill="${C.warm}"/>
<g filter="url(#soft)">${browserFrame({ x: 12, y: 90, w: 1176, h: 500, inner, label: chrome, radius: 20 })}</g>`,
  });
}

const portfolioArt = {
  'hoffman-legal': () =>
    siteMockup({
      title: 'hoffman.legal website preview',
      desc: 'Preview of the hoffman.legal attorney website showing practice areas and a consultation call to action.',
      accent: C.gold,
      chrome: 'hoffman.legal',
      headline: 'Clear legal guidance',
      sub: 'Practice areas explained in plain language',
      ctaText: 'Free consultation',
      badge: ['Consultation', 'Response within one business day'],
      cards: [['Practice areas', 'View all'], ['About the firm', 'Read more'], ['Client resources', 'Browse guides']],
    }),
  'florida-deposit-law': () =>
    siteMockup({
      title: 'floridadepositlaw.com website preview',
      desc: 'Preview of the floridadepositlaw.com resource site showing guide navigation and search-focused content.',
      accent: C.green,
      chrome: 'floridadepositlaw.com',
      headline: 'Florida deposit law, explained',
      sub: 'Guides for tenants and landlords',
      ctaText: 'Get help',
      badge: ['Guide library', 'Organized by question'],
      cards: [['Deposit returns', 'Read guide'], ['Dispute process', 'Read guide'], ['Landlord duties', 'Read guide']],
    }),
  'florida-mugshot-attorney': () =>
    siteMockup({
      title: 'floridamugshotattorney.com website preview',
      desc: 'Preview of the floridamugshotattorney.com criminal defense site showing a short, direct enquiry path.',
      accent: C.navy700,
      chrome: 'floridamugshotattorney.com',
      headline: 'Record removal help',
      sub: 'One service, explained clearly',
      ctaText: 'Talk to us',
      badge: ['Confidential', 'Private case review'],
      cards: [['How it works', 'See steps'], ['Eligibility', 'Check now'], ['Contact', 'Start here']],
    }),
  skillmigrate: () =>
    siteMockup({
      title: 'skillmigrate.com website preview',
      desc: 'Preview of the skillmigrate.com education and migration guide site showing category navigation.',
      accent: C.navy600,
      chrome: 'skillmigrate.com',
      headline: 'Study and migration guides',
      sub: 'Structured for a large content library',
      ctaText: 'Start reading',
      badge: ['Categories', 'Guides grouped by topic'],
      cards: [['Study routes', 'Explore'], ['Visa guides', 'Explore'], ['Country pages', 'Explore']],
    }),
  'concept-tree-service': () =>
    siteMockup({
      title: 'Tree service concept website',
      desc: 'Concept website mockup for a tree service company showing an emergency call banner, service cards and a quote form.',
      accent: C.gold,
      chrome: 'concept &#183; ridgelinetreecare.com',
      headline: 'Tree removal &amp; storm work',
      sub: 'Licensed, insured, ISA certified arborists',
      ctaText: 'Free quote',
      badge: ['24/7 storm response', 'Call answered by a person'],
      cards: [['Tree removal', 'View service'], ['Trimming &amp; pruning', 'View service'], ['Stump grinding', 'View service']],
    }),
  'concept-concrete': () =>
    siteMockup({
      title: 'Concrete contractor concept website',
      desc: 'Concept website mockup for a concrete contractor showing a project gallery, finish options and a pricing guide.',
      accent: C.navy700,
      chrome: 'concept &#183; granitelineconcrete.com',
      headline: 'Driveways, patios &amp; flatwork',
      sub: 'Stamped, broom and exposed aggregate finishes',
      ctaText: 'Get a price',
      badge: ['Pricing guide', 'What moves the cost per sq ft'],
      cards: [['Driveways', 'See projects'], ['Stamped concrete', 'See finishes'], ['Patios', 'See projects']],
    }),
  'concept-fence': () =>
    siteMockup({
      title: 'Fence company concept website',
      desc: 'Concept website mockup for a fence company showing material comparison cards and a footage-based quote estimator.',
      accent: C.green,
      chrome: 'concept &#183; cedarandpostfencing.com',
      headline: 'Fence installation by the foot',
      sub: 'Wood, vinyl, aluminium and chain link',
      ctaText: 'Estimate cost',
      badge: ['Cost estimator', 'Footage, material and gates'],
      cards: [['Wood fencing', 'Compare'], ['Vinyl fencing', 'Compare'], ['Aluminium', 'Compare']],
    }),
};

/* ------------------------------------------------------- brand + page art */

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="t d">
<title id="t">Design Rank Studio</title><desc id="d">Navy rounded square with a rising rank line and a gold origin point.</desc>
<rect width="64" height="64" rx="16" fill="${C.navy}"/>
<path d="M16 43 L27 32 L34 39 L48 24" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M39.5 24 H48 V32.5" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="16" cy="43" r="4.6" fill="${C.gold}"/>
</svg>
`;
}

function ogPreview() {
  return svg({
    width: 1200,
    height: 630,
    title: 'Design Rank Studio',
    desc: 'Design Rank Studio — websites and local SEO that help service businesses generate more leads.',
    defs: shadowDef,
    body: `<rect width="1200" height="630" fill="${C.paper}"/>
<rect x="0" y="0" width="1200" height="630" fill="url(#ogWash)"/>
<circle cx="1090" cy="90" r="150" fill="${C.goldPale}" opacity="0.7"/>
<circle cx="120" cy="580" r="130" fill="${C.sky}" opacity="0.9"/>
<g transform="translate(88 96)">
  <rect width="64" height="64" rx="17" fill="${C.navy}"/>
  <path d="M17 45 L28 34 L35 41 L49 26" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40.5 26 H49 V34.5" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="17" cy="45" r="4.6" fill="${C.gold}"/>
  ${label(84, 30, 'DESIGN RANK', { size: 21, weight: 800, fill: C.navy })}
  ${label(84, 55, 'STUDIO', { size: 21, weight: 800, fill: C.gold })}
</g>
${label(88, 268, 'Websites and Local SEO', { size: 62, weight: 800, fill: C.navy })}
${label(88, 344, 'That Help Service Businesses', { size: 62, weight: 800, fill: C.navy })}
<text x="88" y="420" font-family="Georgia, serif" font-style="italic" font-size="62" fill="${C.gold}">Generate More Leads</text>
${label(88, 492, 'Tree services &#183; Concrete &#183; Fencing &#183; Landscaping &#183; Roofing &#183; and more', { size: 22, weight: 600, fill: C.slate })}
<rect x="88" y="524" width="300" height="56" rx="28" fill="${C.navy}"/>
${label(238, 559, 'designrankstudio.com', { size: 18, weight: 700, fill: C.paper, anchor: 'middle' })}`,
  }).replace('<defs>', `<defs><linearGradient id="ogWash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#f7f5f1"/></linearGradient>`);
}

/** Abstract art for the About page — remote working relationship. */
function aboutArt() {
  return svg({
    width: 1000,
    height: 780,
    title: 'Working remotely with service businesses',
    desc: 'A project conversation panel connected to a map of the United States with service-area markers.',
    defs: shadowDef,
    body: `<rect width="1000" height="780" rx="20" fill="${C.warm}"/>
<g filter="url(#soft)" transform="translate(70 70)">
  <rect width="470" height="330" rx="20" fill="${C.paper}" stroke="${C.line}"/>
  ${label(28, 52, 'Project conversation', { size: 16, weight: 800 })}
  <rect x="28" y="76" width="300" height="62" rx="14" fill="${C.warm}"/>
  ${label(46, 104, 'We get five calls a week but almost', { size: 12.5, weight: 500, fill: C.navy800 })}
  ${label(46, 124, 'no quote requests from the website.', { size: 12.5, weight: 500, fill: C.navy800 })}
  <rect x="142" y="154" width="300" height="82" rx="14" fill="${C.navy}"/>
  ${label(160, 182, 'The quote form is three clicks deep', { size: 12.5, weight: 500, fill: C.paper })}
  ${label(160, 202, 'and there is no service page for the', { size: 12.5, weight: 500, fill: C.paper })}
  ${label(160, 222, 'work you actually want. Start there.', { size: 12.5, weight: 500, fill: C.paper })}
  <rect x="28" y="252" width="230" height="52" rx="14" fill="${C.warm}"/>
  ${label(46, 283, 'When can we start?', { size: 12.5, weight: 600, fill: C.navy800 })}
</g>
<g filter="url(#soft)" transform="translate(300 440)">
  <rect width="620" height="280" rx="20" fill="${C.paper}" stroke="${C.line}"/>
  ${label(32, 52, 'Remote, across the United States', { size: 15, weight: 800 })}
  <path d="M60 96 C 110 78 180 74 250 88 C 330 104 400 92 470 86 C 520 82 550 96 560 118 C 566 154 540 186 500 200 C 430 224 340 226 260 214 C 180 202 110 186 76 156 C 56 138 50 112 60 96 Z" fill="${C.sky}" stroke="${C.mist}" stroke-width="2"/>
  ${[[150, 130], [250, 160], [340, 120], [430, 168], [500, 132], [200, 190], [390, 196]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><path d="M0 20 C -12 6 -14 2 -14 -4 a14 14 0 0 1 28 0 c0 6 -2 10 -14 24 Z" fill="${i % 3 === 0 ? C.gold : C.navy}"/><circle cy="-4" r="5" fill="${C.paper}"/></g>`).join('')}
  ${label(32, 254, 'Clients served remotely &#183; no in-person visits required', { size: 12, weight: 600, fill: C.slate })}
</g>`,
  });
}

/** Art for the free review page — a marked-up audit. */
function reviewArt() {
  return svg({
    width: 1000,
    height: 800,
    title: 'Website review findings',
    desc: 'A website screenshot marked up with review findings for mobile usability, calls to action and local SEO.',
    defs: shadowDef,
    body: `<rect width="1000" height="800" rx="20" fill="${C.warm}"/>
<g filter="url(#soft)" transform="translate(60 60)">
  <rect width="560" height="400" rx="16" fill="${C.paper}" stroke="${C.line}"/>
  <rect width="560" height="40" rx="16" fill="${C.warm}"/><rect y="24" width="560" height="16" fill="${C.warm}"/>
  <line y1="40" x2="560" y2="40" stroke="${C.line}"/>
  ${bar(24, 62, 110, 14, '#c4bdb2', 5)}
  ${bar(300, 66, 50, 8, '#d3cdc3')}${bar(360, 66, 50, 8, '#d3cdc3')}${bar(420, 66, 50, 8, '#d3cdc3')}
  <rect x="24" y="98" width="512" height="130" rx="6" fill="#e6e1d8"/>
  ${bar(48, 138, 250, 16, '#b3aca1', 4)}${bar(48, 168, 320, 10, '#c4bdb2')}${bar(48, 190, 280, 10, '#c4bdb2')}
  ${[0, 1, 2].map((i) => `<rect x="${24 + i * 176}" y="248" width="160" height="76" rx="6" fill="#efeae1"/>${bar(40 + i * 176, 268, 84, 9, '#c4bdb2')}${bar(40 + i * 176, 288, 124, 7, '#d3cdc3')}`).join('')}
  ${bar(24, 344, 500, 8, '#ddd7cc')}${bar(24, 362, 460, 8, '#ddd7cc')}
  <g stroke="${C.red}" fill="none" stroke-width="2.6">
    <rect x="286" y="52" width="200" height="34" rx="8" stroke-dasharray="7 5"/>
    <rect x="34" y="238" width="500" height="96" rx="10" stroke-dasharray="7 5"/>
  </g>
</g>
${[
  ['1', 'No visible quote button', 96, C.red],
  ['2', 'Services not separated', 176, C.gold],
  ['3', 'No service-area pages', 256, C.gold],
  ['4', 'Reviews not displayed', 336, C.navy700],
].map(([n, text, y, colour]) => `<g filter="url(#soft)" transform="translate(560 ${y + 160})">
  <rect width="380" height="62" rx="14" fill="${C.paper}" stroke="${C.line}"/>
  <circle cx="34" cy="31" r="16" fill="${colour}"/>
  ${label(34, 36, n, { size: 13, weight: 800, fill: C.paper, anchor: 'middle' })}
  ${label(64, 37, text, { size: 13.5, weight: 700, fill: C.navy800 })}
</g>`).join('')}
<g filter="url(#soft)" transform="translate(60 560)">
  <rect width="440" height="180" rx="18" fill="${C.navy}"/>
  ${label(32, 56, 'What you receive', { size: 16, weight: 800, fill: C.paper })}
  ${['A plain-language summary', 'The changes we would make first', 'Ranked by likely impact'].map((t, i) => `<g transform="translate(32 ${86 + i * 30})">
    <circle cx="9" cy="0" r="9" fill="rgba(255,255,255,0.14)"/>
    <path d="M5 0 l3 3 5.4 -6" stroke="#9ce0bd" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${label(30, 4, t, { size: 12.5, weight: 500, fill: '#c9d8e8' })}</g>`).join('')}
</g>`,
  });
}

/** Art for the industries hub and home-services page. */
function industriesArt() {
  const tile = (x, y, iconPath, name) => `<g transform="translate(${x} ${y})" filter="url(#soft)">
  <rect width="200" height="120" rx="16" fill="${C.paper}" stroke="${C.line}"/>
  <g transform="translate(24 24)" stroke="${C.navy}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">${iconPath}</g>
  ${label(24, 96, name, { size: 13.5, weight: 800 })}
</g>`;

  return svg({
    width: 1000,
    height: 700,
    title: 'Industries we build for',
    desc: 'A grid of industry tiles for tree services, concrete, fencing, landscaping, roofing and pool services around a local search map.',
    defs: shadowDef,
    body: `<rect width="1000" height="700" rx="20" fill="${C.warm}"/>
<circle cx="500" cy="350" r="220" fill="${C.sky}" opacity="0.7"/>
${tile(60, 60, '<path d="M18 34V22"/><path d="M18 22 6 22 18 4 30 22 24 22"/>', 'Tree services')}
${tile(400, 40, '<rect x="4" y="12" width="28" height="18" rx="2"/><path d="M4 20h28M13 12v18M23 12v18"/>', 'Concrete')}
${tile(740, 70, '<path d="M6 30V12l5-5 5 5v18M20 30V12l5-5 5 5v18M4 16h28M4 24h28"/>', 'Fencing')}
${tile(60, 300, '<path d="M18 32v-12"/><path d="M18 20c-7 0-11-5-11-10 6 0 11 4 11 10zM18 20c7 0 11-5 11-10-6 0-11 4-11 10z"/>', 'Landscaping')}
${tile(740, 310, '<path d="M4 26c4-6 8-6 12 0s8 6 12 0M4 16c4-6 8-6 12 0s8 6 12 0"/>', 'Pool services')}
${tile(60, 540, '<path d="M4 20 18 6l14 14M8 20v10h20V20"/>', 'Roofing')}
${tile(400, 550, '<rect x="5" y="6" width="26" height="24" rx="3"/><path d="M5 14h26M11 22h14"/>', 'Garage doors')}
${tile(740, 540, '<path d="M18 4l14 8v18H4V12z"/><path d="M14 30v-9h8v9"/>', 'Real estate')}
<g filter="url(#soft)" transform="translate(340 250)">
  <rect width="320" height="200" rx="20" fill="${C.navy}"/>
  ${label(32, 58, 'Local search', { size: 19, weight: 800, fill: C.paper })}
  ${label(32, 86, 'The businesses at the top', { size: 13, weight: 500, fill: '#a9bed4' })}
  ${label(32, 108, 'get the call.', { size: 13, weight: 500, fill: '#a9bed4' })}
  <g transform="translate(32 130)">
    ${[0, 1, 2].map((i) => `<g transform="translate(0 ${i * 22})"><circle cx="8" cy="0" r="8" fill="${i === 0 ? C.gold : 'rgba(255,255,255,0.16)'}"/>${label(26, 4, i === 0 ? 'Your business' : 'Competitor', { size: 11.5, weight: 600, fill: i === 0 ? C.paper : '#8ba3bd' })}</g>`).join('')}
  </g>
</g>`,
  });
}

/* ------------------------------------------------------------------- build */

export function buildArt() {
  const written = [];
  written.push(write('assets/images/art/hero-composition.svg', heroComposition()));
  written.push(write('assets/images/art/before-after.svg', beforeAfter()));
  written.push(write('assets/images/art/service-website-design.svg', serviceWebsiteDesign()));
  written.push(write('assets/images/art/service-redesign.svg', serviceRedesign()));
  written.push(write('assets/images/art/service-local-seo.svg', serviceLocalSeo()));
  written.push(write('assets/images/art/service-landing-pages.svg', serviceLandingPages()));
  written.push(write('assets/images/art/service-maintenance.svg', serviceMaintenance()));
  written.push(write('assets/images/art/about-remote.svg', aboutArt()));
  written.push(write('assets/images/art/review-findings.svg', reviewArt()));
  written.push(write('assets/images/art/industries-overview.svg', industriesArt()));

  for (const [name, fn] of Object.entries(industryArt)) {
    written.push(write(`assets/images/art/${name}.svg`, fn()));
  }
  for (const [name, fn] of Object.entries(portfolioArt)) {
    written.push(write(`assets/images/portfolio/${name}.svg`, fn()));
  }

  written.push(write('assets/favicon.svg', favicon()));
  written.push(write('assets/og-preview.svg', ogPreview()));
  return written;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = buildArt();
  console.log(`Generated ${files.length} artwork files.`);
}
