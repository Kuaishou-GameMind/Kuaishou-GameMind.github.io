/* ============================================================
   _shared/ui.js — Shared UI engine for project pages
   Provides: i18n switch, navbar scroll effect, scroll animations
   (data-aos), counter animation (data-count), smooth anchor scroll.
   Loaded before each project's script.js via classic <script> tag.

   Usage (in project script.js, after defining the I18N dict):
     initSite({
       storageKey: 'cutscene-lang',
       i18n: I18N,
       counterDuration: 1200,
       onRefresh: () => { if (typeof refreshFigures === 'function') refreshFigures(); },
     });
   ============================================================ */
(function () {
  'use strict';

  var currentLang = 'en';
  var _config = null;

  function getInitialLanguage() {
    try {
      var saved = localStorage.getItem(_config.storageKey);
      if (saved && _config.i18n[saved]) return saved;
    } catch (e) {}
    return currentLang;
  }

  function setLanguage(lang) {
    currentLang = lang;
    var data = _config.i18n[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (data[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = data[key];
        } else {
          el.innerHTML = data[key];
        }
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    try {
      localStorage.setItem(_config.storageKey, lang);
    } catch (e) {}

    if (typeof _config.onRefresh === 'function') _config.onRefresh();
  }

  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    var ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  function initAOS() {
    var elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var duration = _config.counterDuration || 1200;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.dataset.count, 10);
            animateCounter(el, 0, target, duration);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el, start, end, duration) {
    var range = end - start;
    var startTime = performance.now();
    function step(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(start + range * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  function initSite(config) {
    _config = config;
    currentLang = document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    currentLang = getInitialLanguage();

    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          setLanguage(btn.dataset.lang);
        });
      });
      setLanguage(currentLang);
      initNavbar();
      initAOS();
      initCounters();
      initSmoothScroll();
    });
  }

  // Expose globals for project scripts and figures.js
  window.initSite = initSite;
  window.setLanguage = setLanguage;
  Object.defineProperty(window, 'currentLang', {
    get: function () {
      return currentLang;
    },
    configurable: true,
  });
  window.getCurrentLang = function () {
    return currentLang;
  };
})();
