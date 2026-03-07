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
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery-image');
  if (galleryImages.length === 0) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  
  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;
  let lastFocusedElement = null;

  const imagesData = Array.from(galleryImages).map((img, index) => {
    const parent = img.closest('.photo-item');
    const captionEl = parent ? parent.querySelector('.photo-caption') : null;
    return {
      src: img.currentSrc || img.src,
      alt: img.alt,
      caption: captionEl ? captionEl.getAttribute('data-caption') : '',
      element: img
    };
  });

  function openLightbox(index) {
    lastFocusedElement = document.activeElement;
    currentIndex = index;
    updateLightboxContent();
    
    lightbox.classList.remove('hidden');
    setTimeout(() => {
      lightbox.classList.remove('opacity-0');
      lightbox.classList.add('opacity-100');
    }, 10);
    
    document.body.classList.add('lightbox-open');
    btnClose.focus();
    
    document.addEventListener('keydown', handleKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.classList.remove('lightbox-open');
    }, 300);
    
    document.removeEventListener('keydown', handleKeydown);
    
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function updateLightboxContent() {
    const data = imagesData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    
    if (data.caption) {
      lightboxCaption.textContent = data.caption;
      lightboxCaption.classList.remove('hidden');
    } else {
      lightboxCaption.classList.add('hidden');
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % imagesData.length;
    updateLightboxContent();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
    updateLightboxContent();
  }

  galleryImages.forEach((img, index) => {
    const parent = img.closest('.photo-item');
    if (parent) {
      parent.setAttribute('tabindex', '0');
      parent.setAttribute('role', 'button');
      parent.addEventListener('click', () => openLightbox(index));
      parent.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    } else {
      img.addEventListener('click', () => openLightbox(index));
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', nextImage);
  btnPrev.addEventListener('click', prevImage);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'Tab') {
      const focusableElements = [btnClose, btnPrev, btnNext].filter(el => el != null);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
});
// [TASK 11: Scroll Features]

// --- Scroll-to-Top Button ---
document.addEventListener('DOMContentLoaded', () => {
  // Create scroll-to-top button dynamically
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.className = 'hidden fixed bottom-8 right-8 z-40 bg-terminal-surface border border-terminal-border text-terminal-green hover:bg-terminal-green hover:text-terminal-darker p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terminal-green';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>';
  document.body.appendChild(scrollBtn);

  let scrollTicking = false;
  
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          scrollBtn.classList.remove('hidden');
          scrollBtn.classList.remove('opacity-0', 'translate-y-2');
          scrollBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
          scrollBtn.classList.remove('opacity-100', 'translate-y-0');
          scrollBtn.classList.add('opacity-0', 'translate-y-2');
          setTimeout(() => {
            scrollBtn.classList.add('hidden');
          }, 300);
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  });
});

// --- Scroll-Reveal Animations ---
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length === 0) return;

  // Add initial hidden state
  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
  });

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    revealElements.forEach(el => {
      el.classList.remove('reveal-hidden');
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // once: true
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    observer.observe(el);
  });
});
