# Decisions - Blog Redesign

Architectural and design choices made during implementation.

---

## Task 11: Scroll Enhancements & Visual Elements

### Design Decisions

**Scroll-to-Top Button Appearance Threshold**
- Decision: Show button after 300px scroll
- Rationale: Below 300px users can easily scroll up manually; above 300px button provides convenience
- Alternative considered: 500px (too late for long pages), 100px (too early, clutters UI)

**Scroll-Reveal Animation Timing**
- Decision: 0.6s duration for opacity and transform
- Rationale: Fast enough to feel responsive, slow enough to be noticeable and smooth
- Alternative considered: 0.4s (too fast, jarring), 1s (too slow, feels sluggish)

**IntersectionObserver Once-Only Behavior**
- Decision: Animations trigger only on first viewport entry
- Rationale: Re-animating on scroll up/down is distracting; once is sufficient for visual interest
- Alternative considered: Always animate (annoying on repeated scrolls)

**Favicon Design: L-Shape Terminal Cursor**
- Decision: Simple L-shape path + square cursor instead of text or complex symbol
- Rationale: 
  - Text unreadable at 16×16 favicon size
  - ">_" cursor prompt too thin at small sizes
  - L-shape resembles terminal window corner + cursor
  - Monochrome green on dark = instant terminal recognition
- Alternative considered: "{}" braces (too generic), "T" letter (lacks terminal aesthetic)

**OG Image: Static vs Per-Post Generation**
- Decision: Single static branded image for all pages
- Rationale:
  - Simpler implementation (one-time generation vs build-time templating)
  - Consistent brand identity across all shares
  - No Eleventy plugin needed for dynamic OG images
  - Per-post OG images require custom shortcode/filter (out of scope for Task 11)
- Alternative considered: Dynamic per-post images (future enhancement, not current requirement)

**View Transitions: CSS-Only Approach**
- Decision: Use `@view-transition { navigation: auto; }` CSS rule only
- Rationale:
  - Progressive enhancement (works in supporting browsers, ignored in others)
  - No JavaScript needed (simpler, more performant)
  - Meta tag already added in Task 4 (HTML side complete)
- Alternative considered: JavaScript View Transitions API (more complex, not necessary for basic transitions)

**Reduced Motion: Immediate Reveal vs No Animation**
- Decision: Show all content immediately with `.revealed` class when `prefers-reduced-motion: reduce`
- Rationale:
  - WCAG 2.1 guideline: respect user motion preferences
  - Instant reveal ensures content never hidden from users who need reduced motion
  - Avoids accessibility barrier (content must always be accessible)
- Alternative considered: Slow fade-in (still motion, defeats purpose), no transition property (correct, implemented)

**Scroll-Reveal Elements Selection**
- Decision: Add data-reveal to below-fold sections (stats, post cards, project cards, gallery photos)
- Rationale:
  - Hero/nav already visible (no need to animate above-fold content)
  - Below-fold content benefits from progressive reveal on scroll
  - Keeps animations subtle, not overwhelming
- Alternative considered: Animate everything (too busy, distracting), animate nothing (misses opportunity for polish)

**Button Position: Bottom-Right vs Bottom-Center**
- Decision: Fixed bottom-right corner (bottom-8 right-8)
- Rationale:
  - Standard web convention (users expect scroll-to-top button in bottom-right)
  - Doesn't interfere with center content
  - Easily clickable on mobile (thumb zone on right-handed users)
- Alternative considered: Bottom-center (conflicts with content, less conventional)

