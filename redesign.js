(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchLike = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    mark3DElements();
    setupScrollReveal();
    setupTilt();
    setupHeroParallax();
    setupSmoothInternalTransitions();
    enhanceNavToggleA11y();
    enableLazyMedia();
  });

  function mark3DElements() {
    const selectors = [
      '.card',
      '.f1-news-card',
      '.stat-card',
      '.analysis-card',
      '.nav-card',
      '.f1-car-card',
      '.addon-card',
      '.partner-card',
      '.timeline-item',
      '.pattern-card',
      '.relationship-card',
      '.wbs-node',
      '.gantt-card',
      '.risk-card',
      '.subtab-btn',
      '.sort-btn',
      '.filter-btn',
      '.f1-hero-btn',
      '.f1-car-btn',
      '.cd-btn'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el) => {
      if (!el.classList.contains('tilt-ready')) {
        el.classList.add('tilt-ready');
      }
      if (!el.classList.contains('reveal-up')) {
        el.classList.add('reveal-up');
      }
    });

    document.querySelectorAll('section, .page-hero, .f1-hero').forEach((el) => {
      if (!el.classList.contains('reveal-up')) {
        el.classList.add('reveal-up');
      }
    });
  }

  function setupScrollReveal() {
    const revealEls = Array.from(document.querySelectorAll('.reveal-up'));
    if (!revealEls.length) return;

    revealEls.forEach((el, index) => {
      const delay = (index % 8) * 70;
      el.style.setProperty('--reveal-delay', `${delay}ms`);
      if (reducedMotion) {
        el.classList.add('is-visible');
      }
    });

    if (reducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

  function setupTilt() {
    if (reducedMotion || isTouchLike || window.innerWidth < 900) return;

    const elements = document.querySelectorAll('.tilt-ready');
    elements.forEach((el) => {
      let rafId = null;

      const onMove = (event) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const px = (x / rect.width) * 2 - 1;
          const py = (y / rect.height) * 2 - 1;

          const maxTilt = el.classList.contains('f1-hero-btn') || el.classList.contains('f1-car-btn') ? 4 : 8;
          const ry = px * maxTilt;
          const rx = -py * maxTilt;

          el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
          el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        });
      };

      const reset = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };

      el.addEventListener('mousemove', onMove, { passive: true });
      el.addEventListener('mouseleave', reset, { passive: true });
      el.addEventListener('blur', reset, true);
    });
  }

  function setupHeroParallax() {
    if (reducedMotion || isTouchLike) return;

    const hero = document.querySelector('.f1-hero');
    if (!hero) return;

    const layers = [
      { el: hero.querySelector('.f1-hero-bg'), depth: 8 },
      { el: hero.querySelector('.f1-hero-content'), depth: 18 },
      { el: hero.querySelector('.f1-hero-news'), depth: 22 },
      { el: hero.querySelector('.f1-hero-red-stripe'), depth: 12 }
    ].filter((layer) => layer.el);

    if (!layers.length) return;

    let rafId = null;
    const onMove = (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (event.clientX - cx) / rect.width;
        const dy = (event.clientY - cy) / rect.height;

        layers.forEach(({ el, depth }) => {
          const tx = dx * depth;
          const ty = dy * depth;
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });
      });
    };

    const reset = () => {
      layers.forEach(({ el }) => {
        el.style.transform = 'translate3d(0,0,0)';
      });
    };

    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', reset, { passive: true });
  }

  function enhanceNavToggleA11y() {
    const toggle = document.getElementById('topnavToggle');
    const menu = document.getElementById('topnavLinks');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-controls', 'topnavLinks');
    toggle.setAttribute('aria-expanded', menu.classList.contains('active') ? 'true' : 'false');

    toggle.addEventListener('click', () => {
      const expanded = menu.classList.contains('active');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
          menu.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function setupSmoothInternalTransitions() {
    if (typeof window.navigateWithTransition !== 'function') return;

    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (!href.includes('.html')) return;

      link.addEventListener('click', (event) => {
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        window.navigateWithTransition(href);
      });
    });
  }

  function enableLazyMedia() {
    document.querySelectorAll('img:not(.logo-img)').forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
  }
})();
