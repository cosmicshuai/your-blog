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
