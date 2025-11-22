document.addEventListener('DOMContentLoaded', function () {
  var mobileBtn = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
    var links = mobileMenu.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var contactForm = document.getElementById('contact-form');
  var statusEl = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) {
        statusEl.textContent = 'Sending...';
        statusEl.className = 'mt-3 text-sm text-coffee-700';
      }
      setTimeout(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (statusEl) {
          statusEl.textContent = 'Thanks! We received your message.';
          statusEl.className = 'mt-3 text-sm text-green-700';
        }
        contactForm.reset();
      }, 800);
    });
  }
 
  var headerNavLinks = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
  var mobileNavLinks = Array.from(document.querySelectorAll('#mobile-menu a[href^="#"]'));
  var navLinksAll = headerNavLinks.concat(mobileNavLinks).filter(function (a) {
    return a.getAttribute('href') && a.getAttribute('href') !== '#';
  });

  function setActiveLinkById(id) {
    navLinksAll.forEach(function (a) {
      var isActive = (a.hash === '#' + id);
      a.classList.toggle('underline', isActive);
      a.classList.toggle('decoration-2', isActive);
      a.classList.toggle('underline-offset-8', isActive);
      if (isActive) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }
 
  navLinksAll.forEach(function (link) {
    link.addEventListener('click', function () {
      var targetId = (link.hash || '').slice(1);
      if (targetId) setActiveLinkById(targetId);
    });
  });
 
  var observedSections = [];
  navLinksAll.forEach(function (link) {
    var id = (link.hash || '').slice(1);
    var el = document.getElementById(id);
    if (el && observedSections.indexOf(el) === -1) observedSections.push(el);
  });
  if ('IntersectionObserver' in window && observedSections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLinkById(entry.target.id);
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    observedSections.forEach(function (s) { io.observe(s); });
  }
});
