// Prefers reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // THEME TOGGLE (moved from base.njk)
  // ============================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('hidden');
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !navMenu.classList.contains('hidden')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.add('hidden');
      }
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && !navMenu.classList.contains('hidden')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.add('hidden');
      }
    });
  }

  // Connect mobile theme toggle to desktop toggle (sync both)
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ============================================
  // READING PROGRESS BAR (moved from post.njk)
  // ============================================
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking && !prefersReducedMotion) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          progressBar.style.width = progress + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ============================================
  // TYPING HERO ANIMATION (Task 6)
  // ============================================
  // Placeholder for typing animation feature

  // ============================================
  // LIGHTBOX (Task 9)
  // ============================================
  // Placeholder for lightbox feature

  // ============================================
  // SCROLL-TO-TOP BUTTON (Task 11)
  // ============================================
  // Placeholder for scroll-to-top feature

  // ============================================
  // SCROLL-REVEAL ANIMATIONS (Task 11)
  // ============================================
  // Placeholder for scroll-reveal feature
});
