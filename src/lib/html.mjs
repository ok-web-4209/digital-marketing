/**
 * Minimal HTML templating helpers.
 *
 * `html` is a tagged template that escapes interpolated values by default.
 * Values that are already trusted markup (produced by another `html` call,
 * or wrapped in `raw()`) pass through untouched. Arrays are joined, and
 * null/undefined/false render as an empty string so conditionals read cleanly:
 *
 *   html`<p>${maybe && html`<b>${userText}</b>`}</p>`
 */

const RAW = Symbol('raw-html');

export function raw(value) {
  const text = String(value ?? '');
  // `toString` lets trusted markup drop straight into a plain template literal.
  return { [RAW]: text, toString: () => text };
}

export function isRaw(value) {
  return Boolean(value) && typeof value === 'object' && RAW in value;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function render(value) {
  if (value === null || value === undefined || value === false || value === true) return '';
  if (isRaw(value)) return value[RAW];
  if (Array.isArray(value)) return value.map(render).join('');
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i += 1) {
    out += render(values[i]) + strings[i + 1];
  }
  return raw(out);
}

/** Serialize an object as JSON-LD, safe to embed inside a <script> element. */
export function jsonLd(data) {
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return raw(`<script type="application/ld+json">\n${json}\n</script>`);
}

/** Collapse a multi-line template into a single-line attribute-safe string. */
export function oneLine(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}
