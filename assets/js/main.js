/**
 * Design Rank Studio — site behaviour.
 *
 * Deliberately small and dependency-free: header state, an accessible mobile
 * menu and dropdowns, scroll reveals, the sticky mobile CTA, form validation
 * and submission, and GA4 event tracking.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------- footer */

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------- header scrolled state */

  var header = document.querySelector('[data-header]');
  if (header) {
    var applyHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    applyHeaderState();
    window.addEventListener('scroll', applyHeaderState, { passive: true });
  }

  /* ------------------------------------------------------ desktop dropdowns */

  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('[data-dropdown]'));

  function closeDropdown(dropdown) {
    var trigger = dropdown.querySelector('[data-dropdown-trigger]');
    var menu = dropdown.querySelector('[data-dropdown-menu]');
    if (!trigger || !menu) return;
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }

  function openDropdown(dropdown) {
    dropdowns.forEach(function (other) {
      if (other !== dropdown) closeDropdown(other);
    });
    var trigger = dropdown.querySelector('[data-dropdown-trigger]');
    var menu = dropdown.querySelector('[data-dropdown-menu]');
    if (!trigger || !menu) return;
    trigger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
  }

  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector('[data-dropdown-trigger]');
    if (!trigger) return;
    var hoverTimer;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeDropdown(dropdown);
      else openDropdown(dropdown);
    });

    // Pointer users get hover, with a short close delay so the gap is forgiving.
    dropdown.addEventListener('mouseenter', function () {
      if (!window.matchMedia('(min-width: 1080px)').matches) return;
      window.clearTimeout(hoverTimer);
      openDropdown(dropdown);
    });

    dropdown.addEventListener('mouseleave', function () {
      if (!window.matchMedia('(min-width: 1080px)').matches) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () {
        closeDropdown(dropdown);
      }, 260);
    });

    // Keyboard users get focus-within behaviour and Escape to close.
    dropdown.addEventListener('focusout', function (event) {
      if (!dropdown.contains(event.relatedTarget)) closeDropdown(dropdown);
    });

    dropdown.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDropdown(dropdown);
        trigger.focus();
      }
    });
  });

  document.addEventListener('click', function (event) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) closeDropdown(dropdown);
    });
  });

  /* ----------------------------------------------------------- mobile menu */

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  function setMobileNav(open) {
    if (!menuToggle || !mobileNav) return;
    mobileNav.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      setMobileNav(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMobileNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMobileNav(false);
        menuToggle.focus();
      }
    });

    // Reset when the layout crosses into desktop so state cannot get stuck.
    window.matchMedia('(min-width: 1080px)').addEventListener('change', function (event) {
      if (event.matches) setMobileNav(false);
    });
  }

  /* -------------------------------------------------------- scroll reveals */

  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (element) {
        element.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.05 },
      );
      revealTargets.forEach(function (element) {
        revealObserver.observe(element);
      });
    }
  }

  /* ------------------------------------------------------ sticky mobile CTA */

  var stickyCta = document.querySelector('[data-sticky-cta]');
  if (stickyCta) {
    // Never show it on the pages where the review form is already the content.
    var onReviewPage = Boolean(document.querySelector('#website-review, #review'));
    if (!onReviewPage) {
      stickyCta.hidden = false;
      var toggleSticky = function () {
        var scrolledEnough = window.scrollY > 620;
        var footer = document.querySelector('.site-footer');
        var footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
        stickyCta.classList.toggle('is-visible', scrolledEnough && !footerVisible);
      };
      toggleSticky();
      window.addEventListener('scroll', toggleSticky, { passive: true });
    }
  }

  /* ------------------------------------------------------------------ forms */

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_PATTERN = /^[+()\d][\d\s\-().]{6,}$/;

  function fieldLabel(field) {
    var label = field.form ? field.form.querySelector('label[for="' + field.id + '"]') : null;
    if (!label) return 'This field';
    return label.textContent.replace('*', '').trim();
  }

  function validateField(field) {
    var value = (field.value || '').trim();
    var name = fieldLabel(field);

    if (field.required && !value) {
      return name + ' is required.';
    }
    if (!value) return null;

    if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
      return 'Enter a valid email address, for example name@business.com.';
    }
    if (field.type === 'tel' && !PHONE_PATTERN.test(value)) {
      return 'Enter a valid phone number so we can reach you.';
    }
    if (field.type === 'url') {
      var candidate = /^https?:\/\//i.test(value) ? value : 'https://' + value;
      try {
        var parsed = new URL(candidate);
        if (!parsed.hostname.includes('.')) throw new Error('invalid');
      } catch (error) {
        return 'Enter a valid website address, for example yourbusiness.com.';
      }
    }
    if (field.minLength > 0 && value.length < field.minLength) {
      return name + ' needs at least ' + field.minLength + ' characters.';
    }
    return null;
  }

  function showFieldError(field, message) {
    var errorEl = document.querySelector('[data-error-for="' + field.id + '"]');
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.hidden = false;
        field.setAttribute('aria-describedby', errorEl.id || field.id + '-error');
        if (!errorEl.id) errorEl.id = field.id + '-error';
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
    }
  }

  function setStatus(statusEl, message, state) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-error', 'is-success', 'is-pending');
    if (state) statusEl.classList.add('is-' + state);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-ajax-form]'), function (form) {
    var statusEl = form.querySelector('.form__status');
    var submitButton = form.querySelector('button[type="submit"]');
    var labelEl = form.querySelector('[data-submit-label]');
    var originalLabel = labelEl ? labelEl.textContent : '';
    var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea')).filter(function (field) {
      return field.type !== 'hidden' && field.name !== '_gotcha';
    });

    fields.forEach(function (field) {
      // Validate on blur, then live-correct once the field has been marked bad.
      field.addEventListener('blur', function () {
        showFieldError(field, validateField(field));
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') showFieldError(field, validateField(field));
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        var message = validateField(field);
        showFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setStatus(statusEl, 'Please check the highlighted fields and try again.', 'error');
        firstInvalid.focus();
        return;
      }

      if (submitButton) submitButton.disabled = true;
      if (labelEl) labelEl.textContent = 'Sending…';
      setStatus(statusEl, 'Sending your request…', 'pending');

      fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed with status ' + response.status);
          form.reset();
          fields.forEach(function (field) {
            showFieldError(field, null);
          });
          setStatus(
            statusEl,
            'Thank you. Your request has been received and we will be in touch within two to three business days.',
            'success',
          );
          track('form_submit_success', { form_id: form.id || 'form', page_path: pagePath() });
        })
        .catch(function () {
          setStatus(
            statusEl,
            'Something went wrong sending your request. Please try again, or message us on WhatsApp and we will pick it up from there.',
            'error',
          );
        })
        .finally(function () {
          if (submitButton) submitButton.disabled = false;
          if (labelEl) labelEl.textContent = originalLabel;
        });
    });
  });

  /* ------------------------------------------------------- GA4 event tracking */

  function pagePath() {
    return window.location.pathname || '/';
  }

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
  }

  function textOf(element) {
    return (element.innerText || element.textContent || element.getAttribute('aria-label') || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 100);
  }

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element ? event.target : null;
    var link = target ? target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    // Internal links are document-relative so the site can be served from a
    // subpath; `link.pathname` resolves them, whatever the base path is.
    var path = link.pathname || '';
    var params = { link_text: textOf(link), page_path: pagePath(), target_url: link.href || href };

    if (href.indexOf('wa.me') !== -1) {
      track('contact_whatsapp', params);
    } else if (href.indexOf('tel:') === 0) {
      track('contact_phone', params);
    } else if (href.indexOf('mailto:') === 0) {
      track('contact_email', params);
    } else if (link.hostname && link.hostname !== window.location.hostname) {
      track('outbound_click', params);
    } else if (path.indexOf('/website-review') !== -1) {
      track('cta_website_review', params);
    } else if (path.indexOf('/contact') !== -1) {
      track('cta_contact', params);
    } else if (path.indexOf('/services/') !== -1) {
      track('service_click', params);
    } else if (path.indexOf('/industries/') !== -1) {
      track('industry_click', params);
    }
  });
})();
