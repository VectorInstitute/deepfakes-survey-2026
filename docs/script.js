// Deepfake Detection Beyond the Lab — interactive features
// =========================================================

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------------------------------------------
           Mobile navigation
           --------------------------------------------- */
        var navToggle = document.getElementById('navToggle');
        var navMenu = document.getElementById('navMenu');

        function closeMenu() {
            if (!navMenu || !navToggle) return;
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });

            navMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeMenu);
            });

            document.addEventListener('click', function (e) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    closeMenu();
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeMenu();
            });
        }

        /* ---------------------------------------------
           Smooth scroll for in-page anchors
           --------------------------------------------- */
        var navbar = document.getElementById('navbar');

        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href === '#') return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                var offset = navbar ? navbar.offsetHeight + 20 : 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({ top: top, behavior: 'smooth' });
                history.replaceState(null, '', href);
            });
        });

        /* ---------------------------------------------
           Copy BibTeX
           --------------------------------------------- */
        var copyBtn = document.getElementById('copyBtn');
        var bibtexCode = document.getElementById('bibtexCode');

        function flash(message, colour) {
            var original = copyBtn.textContent;
            copyBtn.textContent = message;
            if (colour) copyBtn.style.background = colour;
            setTimeout(function () {
                copyBtn.textContent = original;
                copyBtn.style.background = '';
            }, 2000);
        }

        function fallbackCopy(text) {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');
                flash('Copied!', '#10b981');
            } catch (err) {
                console.error('Copy failed:', err);
                flash('Copy failed', '');
            }

            document.body.removeChild(textarea);
        }

        if (copyBtn && bibtexCode) {
            copyBtn.addEventListener('click', function () {
                var text = bibtexCode.textContent;

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function () {
                        flash('Copied!', '#10b981');
                    }).catch(function () {
                        fallbackCopy(text);
                    });
                } else {
                    fallbackCopy(text);
                }
            });
        }

        /* ---------------------------------------------
           Scroll-driven UI: navbar shadow, back-to-top,
           active section highlight — one listener, rAF-throttled
           --------------------------------------------- */
        var scrollTopBtn = document.getElementById('scrollTop');
        var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
        var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a'));
        var ticking = false;

        function onScroll() {
            var y = window.pageYOffset;

            if (navbar) {
                navbar.style.boxShadow = y > 100 ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
            }

            if (scrollTopBtn) {
                scrollTopBtn.classList.toggle('show', y > 300);
            }

            var current = null;
            var probe = y + (navbar ? navbar.offsetHeight + 40 : 120);
            sections.forEach(function (section) {
                if (probe >= section.offsetTop && probe < section.offsetTop + section.offsetHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function (link) {
                link.classList.toggle('active', current !== null && link.getAttribute('href') === '#' + current);
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });

        onScroll();

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        /* ---------------------------------------------
           Fade-in on scroll (skipped for reduced motion)
           --------------------------------------------- */
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduceMotion && 'IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll('figure, .card, .card-simple, .table-wrap, .panel').forEach(function (el) {
                observer.observe(el);
            });
        }

        /* ---------------------------------------------
           External links open in a new tab
           --------------------------------------------- */
        document.querySelectorAll('a[href^="http"]').forEach(function (link) {
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    });
})();
