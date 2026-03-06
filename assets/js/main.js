(function(){
  'use strict';

  /* ── CURSOR ─────────────────────────────── */
  const cursor = document.getElementById('cursor');
  if (cursor) {
    let mx = -100, my = -100;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
    document.querySelectorAll('a, button, .ptab, .service-card, .tcard').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ── LOADER ─────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.classList.add('loading');
    const letters = loader.querySelectorAll('.loader-letter');
    const line    = loader.querySelector('.loader-line');
    const sub     = loader.querySelector('.loader-sub');

    // Stagger letters in
    letters.forEach((l, i) => {
      setTimeout(() => l.classList.add('visible'), 120 + i * 80);
    });
    setTimeout(() => {
      if (line) line.classList.add('expand');
      if (sub) sub.classList.add('visible');
    }, 600);
    setTimeout(() => {
      loader.classList.add('exit');
      document.body.classList.remove('loading');
      triggerHeroAnimations();
    }, 1800);
    setTimeout(() => { loader.style.display = 'none'; }, 2900);
  } else {
    triggerHeroAnimations();
  }

  /* ── HERO ANIMATIONS ─────────────────────── */
  function triggerHeroAnimations() {
    document.querySelectorAll('.hero-title-inner').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 120);
    });
    setTimeout(() => {
      document.querySelectorAll('.hero-eyebrow').forEach(el => el.classList.add('in'));
    }, 200);
    setTimeout(() => {
      document.querySelectorAll('.hero-lead').forEach(el => el.classList.add('in'));
    }, 400);
    setTimeout(() => {
      document.querySelectorAll('.hero-actions').forEach(el => el.classList.add('in'));
    }, 600);
  }

  /* ── STICKY NAV ─────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ── MOBILE NAV ─────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── PRICING TABS ───────────────────────── */
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.tab;
      document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── FAQ ACCORDION ──────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── FOOTER YEAR ────────────────────────── */
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
