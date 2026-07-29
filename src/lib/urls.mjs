/**
 * Root-relative to document-relative URL rewriting.
 *
 * Components author internal links as root-relative ("/services.html"), which
 * keeps them readable and lets one link work from any page. But the site is
 * served from a subpath on GitHub Pages
 * (ok-web-4209.github.io/digital-marketing/), where "/services.html" resolves
 * against the origin and 404s.
 *
 * So the final render rewrites every internal href/src to a document-relative
 * path. The result works at the origin root, at a project subpath, from a
 * custom domain, and from the local filesystem — no base-path configuration
 * anywhere.
 */

/** Number of directory levels a page sits below the site root. */
export function depthOf(path) {
  return path.split('/').length - 1;
}

/** "" at the root, "../" one level down, "../../" two levels down, and so on. */
export function prefixFor(path) {
  return '../'.repeat(depthOf(path));
}

/**
 * Rewrite root-relative href/src attributes in a rendered document.
 *
 * Left alone: absolute URLs, protocol-relative URLs, mailto:, tel:, data:,
 * and bare fragments. Those are either external or already correct.
 *
 * @param {string} html  Rendered document
 * @param {string} path  Output path of that document, e.g. "services/local-seo.html"
 */
export function relativizeUrls(html, path) {
  const prefix = prefixFor(path);

  return html.replace(/(\s(?:href|src)=")\/(?!\/)([^"]*)"/g, (_match, attr, rest) => {
    // "/" is the home page.
    const target = rest === '' ? 'index.html' : rest;
    return `${attr}${prefix}${target}"`;
  });
}

/**
 * Resolve a document-relative link back to a site-root path, so the build's
 * validator can check that the file it points at actually exists.
 */
export function resolveFromPage(pagePath, href) {
  const base = pagePath.includes('/') ? pagePath.slice(0, pagePath.lastIndexOf('/') + 1) : '';
  const segments = (base + href).split('/');
  const out = [];
  for (const segment of segments) {
    if (segment === '.' || segment === '') continue;
    if (segment === '..') out.pop();
    else out.push(segment);
  }
  return out.join('/');
}
