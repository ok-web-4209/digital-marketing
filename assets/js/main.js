const header = document.querySelector('#siteHeader');
const menuToggle = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}


// Compact "Available now" contact button in the header on mobile
const desktopCta = document.querySelector('.header-consultation');
const headerToggle = document.querySelector('#menuToggle');
if (desktopCta && headerToggle && !document.querySelector('.header-cta-mobile')) {
  const mobileCta = document.createElement('a');
  mobileCta.className = 'btn header-cta-mobile lg:hidden';
  mobileCta.href = desktopCta.getAttribute('href') || '#';
  const ctaTarget = desktopCta.getAttribute('target');
  const ctaRel = desktopCta.getAttribute('rel');
  if (ctaTarget) mobileCta.setAttribute('target', ctaTarget);
  if (ctaRel) mobileCta.setAttribute('rel', ctaRel);
  mobileCta.setAttribute('aria-label', 'Contact us — available now');
  mobileCta.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg><span class="header-cta-mobile-label">Available now</span>';
  headerToggle.parentNode.insertBefore(mobileCta, headerToggle);
}

// Pulse all live indicators
document.querySelectorAll('.live-dot').forEach((dot) => dot.classList.add('blinking'));

const serviceDropdowns = document.querySelectorAll('.dropdown');

serviceDropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector('[aria-haspopup="true"]');
  let closeTimer;

  const openDropdown = () => {
    window.clearTimeout(closeTimer);
    dropdown.classList.add('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      dropdown.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }, 450);
  };

  dropdown.addEventListener('mouseenter', openDropdown);
  dropdown.addEventListener('mouseleave', scheduleClose);
  dropdown.addEventListener('focusin', openDropdown);
  dropdown.addEventListener('focusout', scheduleClose);
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const formspreeForms = document.querySelectorAll('.js-formspree-form');

formspreeForms.forEach((form) => {
  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const initialButtonText = submitButton ? submitButton.textContent : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (status) {
      status.textContent = 'Sending your request...';
      status.classList.remove('form-status-success', 'form-status-error');
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      if (status) {
        status.textContent = 'Thank you. We will get back shortly.';
        status.classList.add('form-status-success');
      }
    } catch (error) {
      if (status) {
        status.textContent = 'Something went wrong. Please try again or contact us on WhatsApp.';
        status.classList.add('form-status-error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = initialButtonText;
      }
    }
  });
});

const initializeGa4Tracking = () => {
  if (window.__designRankGa4TrackingInitialized) return;
  window.__designRankGa4TrackingInitialized = true;

  const hasGtag = () => typeof window.gtag === 'function';
  const cleanText = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const pagePath = () => window.location.pathname || '/';
  const elementText = (element) => cleanText(
    element?.innerText
    || element?.textContent
    || element?.getAttribute?.('aria-label')
    || element?.getAttribute?.('title')
    || element?.getAttribute?.('value')
    || element?.name
  );
  const targetUrl = (element) => element?.href || element?.formAction || element?.getAttribute?.('action') || '';
  const sendEvent = (eventName, parameters) => {
    if (!hasGtag()) return;
    // GA4 custom events must be sent with the 'event' command.
    window.gtag('event', eventName, parameters);
  };

  const keywords = {
    contact: [
      'contact', 'consult', 'consultation', 'call', 'phone', 'email', 'mail', 'whatsapp', 'wa.me',
      'available', 'availability', 'live now', '24/7', 'urgent', 'help', 'inquiry', 'inquiries',
      'request', 'quote', 'proposal', 'project', 'business', 'start', 'plan', 'scope', 'message', 'submit', 'send'
    ],
    primary: [
      'free consultation', 'start', 'get started', 'request', 'contact', 'quote', 'proposal', 'view services',
      'learn more', 'book', 'schedule', 'live now', 'available', 'urgent', 'help', 'business inquiry', 'send', 'submit'
    ]
  };

  const textContext = (element) => {
    const pieces = [];
    if (element) {
      pieces.push(elementText(element));
      pieces.push(element.getAttribute?.('href'));
      pieces.push(element.getAttribute?.('class'));
      pieces.push(element.getAttribute?.('id'));
      pieces.push(element.getAttribute?.('name'));
    }

    const contactArea = element?.closest?.('form, .contact, .consultation-section, .cta-section, header, .pricing-card');
    if (contactArea) {
      pieces.push(elementText(contactArea));
      pieces.push(contactArea.getAttribute?.('class'));
      pieces.push(contactArea.getAttribute?.('id'));
    }

    return cleanText(pieces.filter(Boolean).join(' ')).toLowerCase();
  };

  const matchesAny = (value, terms) => terms.some((term) => value.includes(term));
  const ctaType = (element, context) => {
    const href = (element?.getAttribute?.('href') || '').toLowerCase();
    if (href.startsWith('tel:')) return 'phone';
    if (href.startsWith('mailto:')) return 'email';
    if (href.includes('wa.me') || href.includes('whatsapp')) return 'whatsapp';
    if (context.includes('urgent')) return 'urgent_help';
    if (context.includes('available') || context.includes('live now') || context.includes('24/7')) return 'live_availability';
    if (context.includes('consult')) return 'consultation';
    if (context.includes('business') || context.includes('inquir')) return 'business_inquiry';
    if (context.includes('contact') || context.includes('message')) return 'contact';
    return 'primary_cta';
  };

  const serviceName = (element) => {
    const card = element.closest?.('.service-card, .pricing-card, article, .dropdown-panel');
    return cleanText(card?.querySelector?.('h2, h3, .section-kicker')?.textContent) || elementText(element);
  };

  const portfolioName = (element) => {
    const card = element.closest?.('.portfolio-card, article');
    return cleanText(card?.querySelector?.('h2, h3, .section-kicker')?.textContent) || elementText(element);
  };

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const clickable = target?.closest?.('a, button, input[type="button"], input[type="submit"]');
    if (!clickable) return;

    const context = textContext(clickable);
    const text = elementText(clickable);
    const url = targetUrl(clickable);
    const isContact = matchesAny(context, keywords.contact) || clickable.closest?.('form, .consultation-section, .cta-section');
    const isPrimary = clickable.matches?.('.btn, .text-link, button, input[type="submit"]') || matchesAny(context, keywords.primary);

    if (isPrimary && (isContact || matchesAny(context, keywords.primary))) {
      sendEvent('cta_click', {
        button_text: text,
        page_path: pagePath(),
        target_url: url,
        cta_type: ctaType(clickable, context),
      });
    }

    if (isContact) {
      sendEvent('contact_interaction', {
        interaction_type: ctaType(clickable, context),
        button_text: text,
        page_path: pagePath(),
        target_url: url,
      });
    }

    const href = (clickable.getAttribute?.('href') || '').toLowerCase();
    if (clickable.closest?.('.service-card, .service-dropdown, .mini-link-list') || href.includes('/services/') || href.includes('services.html')) {
      sendEvent('service_click', {
        service_name: serviceName(clickable),
        page_path: pagePath(),
        target_url: url,
      });
    }

    if (clickable.closest?.('.portfolio-card') || href.includes('portfolio') || context.includes('portfolio') || context.includes('visit website')) {
      sendEvent('portfolio_click', {
        portfolio_name: portfolioName(clickable),
        portfolio_url: url,
        page_path: pagePath(),
      });
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const submitter = event.submitter || form.querySelector('button[type="submit"], input[type="submit"]');
    const formName = cleanText(form.getAttribute('aria-label') || form.getAttribute('id') || form.getAttribute('name') || form.querySelector('h2, h3, legend')?.textContent || 'Contact form');

    sendEvent('form_submit', {
      form_name: formName,
      page_path: pagePath(),
      form_action: form.getAttribute('action') || '',
    });

    sendEvent('contact_interaction', {
      interaction_type: 'form_submit',
      button_text: elementText(submitter) || 'Submit',
      page_path: pagePath(),
      target_url: form.getAttribute('action') || '',
    });
  });
};

initializeGa4Tracking();
