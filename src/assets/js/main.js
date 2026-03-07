// --- Prefers Reduced Motion ---
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Theme Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});

// --- Reading Progress ---
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
});

// --- Code Block Copy Button ---
document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const btn = e.target;
      const pre = btn.closest('pre');
      if (!pre) return;
      
      const code = pre.querySelector('code');
      if (!code) return;
      
      try {
        await navigator.clipboard.writeText(code.innerText);
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
});

// --- Placeholders for Future Tasks ---
// [TASK 6: Typing Hero]
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (!heroTitle || !heroSubtitle) return;
  
  const titleText = heroTitle.getAttribute('data-text') || '';
  const subtitleText = heroSubtitle.getAttribute('data-text') || '';
  
  const titleSpan = heroTitle.querySelector('.typing-title-text');
  const cursorSpan = heroTitle.querySelector('.typing-cursor');
  const subtitleSpan = heroSubtitle.querySelector('.typing-subtitle-text');
  
  if (!titleSpan || !subtitleSpan || !cursorSpan) return;

  if (prefersReducedMotion) {
    titleSpan.textContent = titleText;
    subtitleSpan.textContent = subtitleText;
    cursorSpan.classList.remove('hidden');
    return;
  }
  
  cursorSpan.classList.remove('hidden');
  titleSpan.textContent = '';
  subtitleSpan.textContent = '';
  
  const titleDuration = 1200;
  const subtitleDuration = 1200;
  
  const titleDelay = titleText.length > 0 ? titleDuration / titleText.length : 50;
  const subtitleDelay = subtitleText.length > 0 ? subtitleDuration / subtitleText.length : 50;
  
  let i = 0;
  let j = 0;
  
  function typeTitle() {
    if (i < titleText.length) {
      titleSpan.textContent += titleText.charAt(i);
      i++;
      setTimeout(typeTitle, titleDelay);
    } else {
      setTimeout(typeSubtitle, 300);
    }
  }
  
  function typeSubtitle() {
    if (j < subtitleText.length) {
      subtitleSpan.textContent += subtitleText.charAt(j);
      j++;
      setTimeout(typeSubtitle, subtitleDelay);
    }
  }
  
  setTimeout(typeTitle, 300);
});
// [TASK 9: Lightbox]
// [TASK 11: Scroll Features]
