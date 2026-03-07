# Learnings - Blog Redesign

Project conventions, patterns discovered, and implementation notes.

---
# Blog Redesign - Learnings & Discoveries

## Task 3: Main.js Entry Point Architecture

### Successfully Implemented
- Created `/src/assets/js/main.js` as single JS entry point (58 lines)
- Moved theme toggle logic from base.njk:104-112 with null-check guard
- Moved reading progress logic from post.njk:109-117 with RAF throttling
- Added `prefersReducedMotion` utility at module level
- Implemented RAF throttling with ticking flag pattern for scroll handler
- Added explicit passthrough copy to eleventy.config.js (line 41)
- Build output confirmed: _site/assets/js/main.js generated correctly

### Architecture Decisions
1. **Null guards**: Both theme toggle and reading progress wrapped in element existence checks
   - Prevents errors when elements not present (e.g., reading progress on non-post pages)
2. **RAF Throttling**: Implemented ticking flag pattern to ensure scroll updates max ~60fps
3. **prefersReducedMotion check**: Applied to RAF block - respects accessibility preferences
4. **Module structure**: DOMContentLoaded wrapper ensures DOM ready before execution
5. **Placeholder comments**: Used as architectural roadmap markers for Tasks 6, 9, 11

### Key Technical Notes
- Theme-init script remains inline in base.njk (lines 30-35) - CRITICAL: prevents FOUC
- Theme toggle is in external JS (safe after DOMContentLoaded, theme already applied)
- Reading progress RAF throttling improves scroll performance significantly
- Passthrough copy redundancy (line 40 copies entire assets, line 41 is explicit) - acceptable for clarity

### Build Process Notes
- Dependencies required: npm install before first build
- Build command: `npm run build:css && eleventy` (sequential execution)
- Output structure: _site/assets/js/ mirrors src/assets/js/ perfectly
- All 14 files generated successfully on build

### Next Steps (Task 4 & Beyond)
- Task 4: Will add `<script src="/assets/js/main.js" defer></script>` to templates
- Task 4: Will remove inline theme toggle script from base.njk:104-112
- Task 4: Will remove inline reading progress script from post.njk:109-117
- Future: Add typing hero (Task 6), lightbox (Task 9), scroll features (Task 11) to existing placeholders

## Task 11: Scroll Enhancements & Visual Elements (Wave 4)

### Scroll-to-Top Button Implementation
- **Dynamic DOM creation**: Button created in JS with `document.createElement()` and appended to body
- **Visibility threshold**: Shows after 300px scroll (`window.scrollY > 300`)
- **RequestAnimationFrame throttling**: Prevents excessive scroll event handler calls
- **Smooth scrolling**: `window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })`
- **CSS classes**: Used `opacity-100`, `translate-y-0` for show state; `opacity-0`, `translate-y-2` + `hidden` for hide state
- **Accessibility**: `aria-label="Scroll to top"`, focus ring with `focus:ring-2 focus:ring-terminal-green`

### Scroll-Reveal Animations with IntersectionObserver
- **Observer pattern**: Much more performant than scroll event listeners
- **Configuration**: `threshold: 0.1` (trigger when 10% visible), `rootMargin: '0px 0px -50px 0px'` (bottom margin offset)
- **Once behavior**: `observer.unobserve(entry.target)` after first intersection (animations only run once)
- **Initial state**: `.reveal-hidden { opacity: 0; transform: translateY(20px); }`
- **Revealed state**: `.revealed { opacity: 1; transform: translateY(0); transition: opacity 0.6s, transform 0.6s; }`
- **Reduced motion**: Check `prefersReducedMotion` at DOMContentLoaded, skip observer and add `.revealed` immediately

### Smooth Scrolling & View Transitions
- **CSS-only smooth scrolling**: `html { scroll-behavior: smooth; }` works for anchor links
- **Media query override**: `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`
- **View Transitions**: CSS rule `@view-transition { navigation: auto; }` (meta tag already added in Task 4)
- **Browser support**: Progressive enhancement - gracefully degrades in unsupported browsers

### Favicon Design (Terminal Aesthetic)
- **SVG format**: Lightweight (285 bytes), scales perfectly at any size
- **Design**: L-shape terminal path (`M30 30 L30 70 L70 70`) with cursor square at bottom-right
- **Colors**: Terminal dark background (#0a0a0f), terminal green stroke (#4ade80)
- **Recognizability**: Simple geometric shape works well at 16×16 and 32×32 favicon sizes
- **No text**: Avoided text in favicon (too small to read, better to use symbols/shapes)

### OG Image Generation (Node Canvas)
- **Library**: `node-canvas` for server-side image generation (34KB output)
- **Dimensions**: 1200×630px (standard OG image size for social media)
- **Design elements**: 
  - Dark background (#0a0a0f)
  - Grid pattern (horizontal lines every 20px, stroke #1e1e2e)
  - Main title: 72px monospace bold, terminal green (#4ade80)
  - Tagline: 36px monospace, terminal cyan (#22d3ee)
  - Border stroke: 4px terminal green
- **CommonJS module**: Had to rename script to `.cjs` because package.json has `"type": "module"`
- **Cleanup**: Deleted generation script after creating image (one-time generation, static file)

### Template Updates (data-reveal attributes)
- **index.njk**: Stats section + each post card in loop
- **projects.njk**: Each project card in grid
- **photography.njk**: Each photo item in masonry gallery
- **about.njk**: Bio section, interests grid, social links section
- **Pattern**: Added `data-reveal` to parent container elements (not individual text nodes)

### Testing Patterns (Playwright)
- **Scroll testing**: `page.evaluate(() => window.scrollTo(0, 500))` + `waitForTimeout(500)` before checking state
- **Class verification**: `element.getAttribute('class')` + `.includes('revealed')` check
- **Reduced motion**: `page.emulateMedia({ reducedMotion: 'reduce' })` before reload
- **DOM click workaround**: Used `page.evaluate(() => document.querySelector('#scroll-to-top').click())` instead of `locator.click()` when element is outside viewport
- **Favicon verification**: Checked file exists, HTTP accessible, SVG content valid (curl test)

### WCAG Accessibility Compliance
- **Scroll-to-top**: aria-label, keyboard focus ring, visible at all zoom levels
- **Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce`
- **CSS transitions**: Set `transition: none` in reduced-motion media query
- **JS animations**: Check `prefersReducedMotion` const and skip IntersectionObserver setup
- **Keyboard navigation**: All interactive elements (button, links) keyboard accessible

### Build & Asset Pipeline
- **Passthrough copy**: `eleventy.config.js` line 64 already copies `./src/assets` to `_site/assets`
- **No additional config needed**: favicon.svg and og-image.png automatically copied on build
- **File sizes**: favicon.svg (285B), og-image.png (34KB) - both lightweight
- **Build output**: 17 files in 0.16 seconds, all assets verified in `_site/assets/`

### Performance Considerations
- **IntersectionObserver > scroll events**: Much more performant, browser-optimized
- **RequestAnimationFrame throttling**: Prevents layout thrashing on scroll
- **CSS transitions over JS**: Hardware-accelerated, smoother animations
- **Once-only animations**: `observer.unobserve()` after first trigger reduces observer overhead
- **Lightweight assets**: SVG favicon (285B) vs typical PNG (several KB)

### Gotchas & Solutions
- **ES module error**: Had to rename `.js` to `.cjs` for node-canvas script (package.json has `"type": "module"`)
- **Button outside viewport**: Playwright `.click()` failed when button fixed at bottom-right; used `evaluate()` click instead
- **Reduced motion timing**: Must check `prefersReducedMotion` in DOMContentLoaded, not at module level
- **IntersectionObserver browser support**: Modern browsers only, but graceful degradation (elements still visible, just no animation)
- **Favicon caching**: Browser may cache old favicon; hard refresh (Cmd+Shift+R) may be needed

