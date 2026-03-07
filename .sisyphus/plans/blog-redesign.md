# Blog Redesign: Terminal-Inspired Dark & Techy Aesthetic

## TL;DR

> **Quick Summary**: Redesign "a journey about cosmic" blog from sky/purple palette to a terminal-inspired green/cyan monospace aesthetic. Add About, Photography Gallery, and Projects pages. Enhance with typing hero animation, improved code blocks, scroll effects, and mobile-responsive navigation.
> 
> **Deliverables**:
> - Complete visual re-theme: terminal green/cyan color system with dark/light modes
> - Monospace-driven typography system (JetBrains Mono primary)
> - 3 new pages: About, Photography Gallery (masonry + lightbox), Projects
> - Terminal-style hero with typing animation
> - Enhanced code blocks with copy button + language labels
> - Mobile hamburger navigation for 7 nav items
> - Scroll enhancements (scroll-to-top, smooth anchors, scroll-reveal)
> - Static branded OG image for social sharing
> - Modernized favicon
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Task 1 (partials) + Task 2 (tokens) → Task 3 (JS arch) → Task 4 (base re-theme) → Tasks 7-9 (new pages) → Task 12 (final QA)

---

## Context

### Original Request
User wants to make their personal blog "prettier and fancier." Blog covers tech, life, and photography topics. Currently deployed on Cloudflare Pages.

### Interview Summary
**Key Discussions**:
- **Aesthetic**: Dark & techy, terminal-inspired — developer who cares about design
- **Typography**: Monospace-driven (JetBrains Mono). NOT serif, NOT generic sans.
- **Colors**: Shift from sky/purple gradients to terminal green/cyan accents
- **Framework**: Stay with Eleventy 3.x + Tailwind CSS 3.4 — no migration
- **Interactivity**: Refined & polished — smooth transitions, scroll-reveal, hover effects. NOT heavy 3D/WebGL
- **New Pages**: About, Photography Gallery (masonry + lightbox, images local), Projects
- **Extras**: Enhanced code blocks (copy + language labels), terminal-style hero, scroll enhancements, social OG images
- **Testing**: No unit tests. Visual QA via Playwright screenshots + build checks.

**Research Findings**:
- Codebase is small: 11 source templates, 3 sample posts, 2 layouts, 1 CSS file
- Tailwind config already has `darkMode: 'class'` and basic animations
- `eleventy-img` already handles image optimization (webp/jpeg, 4 widths)
- No `_includes` directory — all templates in `_layouts` only. Partials need extraction.
- All JS is inline `<script>` tags — needs consolidation into single file
- ~40 hardcoded hex color values across config + CSS — large migration surface
- `output.css` (generated) is committed to git — needs `.gitignore`
- No `og:image`, `twitter:card`, or canonical URL meta tags — SEO gaps
- Current nav has 4 items; adding 3 pages = 7 items — mobile nav needed
- View Transitions API works as progressive enhancement via CSS rule only
- CSS Columns layout recommended for masonry (no JS, all browsers)
- Cloudflare Pages free: 20,000 files max, 25MB/file, 500 builds/month

### Metis Review
**Identified Gaps** (addressed):
- Missing `og:image` / `twitter:card` / canonical meta tags → Added to base layout re-theme task
- No mobile navigation pattern for 7 items → Added hamburger menu to base layout task
- Photography gallery needs defined data model → Added gallery data schema to photography task
- Per-post OG image generation too complex for V1 → Deferred to static branded image
- Line numbers in code blocks → Deferred to V2 (Prism complexity)
- `output.css` in git → Added `.gitignore` update to foundation task
- Reading progress bar doesn't throttle scroll → Fixed in JS architecture task
- Light mode design undefined → Applied default (light warm gray bg with muted green accents)
- Alpine.js mentioned in draft contradicts plan → Enforced vanilla JS only
- Empty states needed for new pages → Added to each page task

---

## Work Objectives

### Core Objective
Transform the blog's visual identity from a generic sky/purple palette to a distinctive terminal-inspired dark & techy aesthetic, while adding Photography, Projects, and About pages with polished interactive elements.

### Concrete Deliverables
- Re-themed `base.njk` layout with terminal color system, mobile nav, and updated meta tags
- Re-themed `post.njk` with enhanced code blocks and terminal-consistent styling
- Re-themed `index.njk` with terminal-style typing hero animation
- Re-themed `tags.njk` and `tags-tag.njk`
- New `about.njk` page
- New `photography.njk` page with masonry grid + vanilla JS lightbox
- New `projects.njk` page with card grid
- `src/assets/js/main.js` consolidating all interactive JS
- Updated `tailwind.config.js` with terminal color tokens
- Updated `input.css` with terminal-themed custom styles
- Updated `favicon.svg` with terminal aesthetic
- Static `og-image.png` for social sharing
- Updated `.gitignore` excluding `output.css`

### Definition of Done
- [ ] `npm run build` exits 0 and produces all expected pages in `_site/`
- [ ] Zero legacy sky/purple colors remain in source files
- [ ] All 8 pages render correctly at 375px, 768px, 1280px in both dark and light modes
- [ ] All existing post URLs (`/YYYY/MM/slug/`) preserved
- [ ] RSS feed valid XML
- [ ] Lighthouse Performance ≥ 90 on homepage

### Must Have
- Terminal green/cyan color tokens defined centrally in Tailwind config
- JetBrains Mono as primary font across all UI (Inter removed)
- Dark mode as default, light mode as alternative
- Mobile hamburger navigation
- Photography gallery with lightbox
- Code block copy button + language labels
- Terminal typing hero on homepage
- `prefers-reduced-motion` respected for all animations
- Scroll-to-top button
- `og:image`, `twitter:card`, canonical URL meta tags

### Must NOT Have (Guardrails)
- **NO Tailwind v4 upgrade** — stay on `^3.4.0`, completely different config model
- **NO Alpine.js or any JS framework** — vanilla JS only (draft mentions Alpine.js — ignore it)
- **NO per-post OG image generation** — use static branded image only (deferred to V2)
- **NO line numbers on code blocks** — Prism complexity, deferred to V2
- **NO photo albums/categories** — flat gallery only in V1
- **NO multi-layer parallax** — at most one subtle parallax on hero
- **NO interactive terminal emulator** — typing hero is decorative only, not a command prompt
- **NO features not in the task spec** — no "bonus" improvements by agents
- **NO hardcoded hex colors in templates or CSS** — use Tailwind token classes only
- **NO more than 2 widths for gallery thumbnails** — `[300, 600]` only
- **NO inline `<script>` tags** except the theme-init script in `<head>` (prevents FOUC)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: N/A
- **QA Method**: Playwright screenshots + build verification + grep checks

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot at 375px, 768px, 1280px
- **Build**: Use Bash — Run `npm run build`, verify exit code and output files
- **Color migration**: Use Bash (grep) — Verify zero legacy colors remain
- **Accessibility**: Use Playwright — axe-core scan, keyboard navigation, focus management

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — start immediately, all parallel):
├── Task 1: Extract template partials from base.njk [quick]
├── Task 2: Define terminal color tokens + typography system in Tailwind [quick]
└── Task 3: Create JS architecture (main.js) + .gitignore cleanup [quick]

Wave 2 (Re-theme — after Wave 1, all parallel):
├── Task 4: Re-theme base layout + mobile nav + meta tags [visual-engineering]
├── Task 5: Re-theme post layout + enhanced code blocks [visual-engineering]
├── Task 6: Re-theme homepage + terminal typing hero [visual-engineering]
└── Task 7: Re-theme tags pages [quick]

Wave 3 (New pages — after Wave 2, all parallel):
├── Task 8: Build About page [quick]
├── Task 9: Build Photography gallery + lightbox [visual-engineering]
└── Task 10: Build Projects page [quick]

Wave 4 (Polish — after Wave 3, all parallel):
├── Task 11: Scroll enhancements + View Transitions + favicon + OG image [unspecified-high]
└── Task 12: RSS feed update + final CSS cleanup [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Full visual QA across all pages (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)

Critical Path: Tasks 1+2+3 → Task 4 → Task 6 → Task 9 → Task 11 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Waves 2, 3)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 (Partials) | — | 4, 5, 6, 7, 8, 9, 10 | 1 |
| 2 (Tokens) | — | 4, 5, 6, 7, 8, 9, 10, 11 | 1 |
| 3 (JS arch) | — | 4, 5, 6, 9, 11 | 1 |
| 4 (Base layout) | 1, 2, 3 | 5, 6, 7, 8, 9, 10, 11, 12 | 2 |
| 5 (Post layout) | 1, 2, 3, 4 | 12 | 2 |
| 6 (Homepage) | 1, 2, 3, 4 | 11 | 2 |
| 7 (Tags) | 1, 2, 4 | — | 2 |
| 8 (About) | 1, 2, 4 | — | 3 |
| 9 (Photography) | 1, 2, 3, 4 | — | 3 |
| 10 (Projects) | 1, 2, 4 | — | 3 |
| 11 (Polish) | 2, 3, 4, 6 | — | 4 |
| 12 (RSS + cleanup) | 4, 5 | — | 4 |
| F1-F4 (Final) | ALL | — | FINAL |

### Agent Dispatch Summary

| Wave | Tasks | Dispatch |
|------|-------|----------|
| 1 | 3 | T1 → `quick`, T2 → `quick`, T3 → `quick` |
| 2 | 4 | T4 → `visual-engineering` + `playwright`, T5 → `visual-engineering` + `playwright`, T6 → `visual-engineering` + `playwright`, T7 → `quick` |
| 3 | 3 | T8 → `quick`, T9 → `visual-engineering` + `playwright`, T10 → `quick` |
| 4 | 2 | T11 → `unspecified-high` + `playwright`, T12 → `quick` |
| FINAL | 4 | F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` + `playwright`, F4 → `deep` |

---

## TODOs

- [ ] 1. Extract Template Partials from Base Layout

  **What to do**:
  - Extract `src/_layouts/base.njk` into reusable partials in a new `src/_includes/` directory:
    - `src/_includes/head.njk` — `<head>` content (meta tags, fonts, CSS link, RSS link, theme-init script)
    - `src/_includes/nav.njk` — `<header>` with navigation bar and dark mode toggle
    - `src/_includes/footer.njk` — `<footer>` with copyright, social links, RSS icon
  - Update `src/_layouts/base.njk` to `{% include %}` these partials instead of inline HTML
  - Add `src/styles/output.css` to `.gitignore` (it's a generated file currently committed)
  - Verify the site builds and renders identically before and after extraction

  **Must NOT do**:
  - Do NOT change any visual styling, colors, or content — this is purely structural
  - Do NOT add new features or pages
  - Do NOT modify `post.njk`, `index.njk`, or any other template
  - Do NOT change the Eleventy config

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple file extraction, no complex logic
  - **Skills**: []
    - No special skills needed for template refactoring

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 5, 6, 7, 8, 9, 10
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/_layouts/base.njk:1-115` — The full base layout to be decomposed. Lines 3-35 become head.njk, lines 44-78 become nav.njk, lines 85-101 become footer.njk.
  - `src/_layouts/post.njk:1-3` — Shows how layout inheritance works: `layout: base.njk` in frontmatter

  **API/Type References**:
  - Nunjucks `{% include %}` syntax: `{% include "partialname.njk" %}`
  - Eleventy 3.x includes directory is configured in `eleventy.config.js:171` as `includes: "_includes"`

  **WHY Each Reference Matters**:
  - `base.njk` is the only file being modified — executor needs to see its exact structure to know where to split
  - `post.njk` layout inheritance confirms that `base.njk` changes propagate to all pages automatically

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build succeeds after partial extraction
    Tool: Bash
    Preconditions: npm install completed
    Steps:
      1. Run `npm run build`
      2. Check exit code is 0
      3. Verify _site/index.html exists
      4. Verify _site/2024/01/getting-started/index.html exists
    Expected Result: Build succeeds, all pages generated
    Failure Indicators: Non-zero exit code, missing output files
    Evidence: .sisyphus/evidence/task-1-build-succeeds.txt

  Scenario: Partials directory structure correct
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Verify src/_includes/head.njk exists
      2. Verify src/_includes/nav.njk exists
      3. Verify src/_includes/footer.njk exists
      4. Verify src/_layouts/base.njk contains {% include "head.njk" %}
      5. Verify src/_layouts/base.njk contains {% include "nav.njk" %}
      6. Verify src/_layouts/base.njk contains {% include "footer.njk" %}
    Expected Result: All 3 partials exist, base.njk includes them
    Failure Indicators: Missing files, missing include statements
    Evidence: .sisyphus/evidence/task-1-partials-structure.txt

  Scenario: output.css excluded from git tracking
    Tool: Bash
    Preconditions: .gitignore updated
    Steps:
      1. Run `grep "output.css" .gitignore`
      2. Verify match found
    Expected Result: output.css listed in .gitignore
    Evidence: .sisyphus/evidence/task-1-gitignore.txt
  ```

  **Commit**: YES
  - Message: `refactor(templates): extract partials from base layout`
  - Files: `src/_includes/head.njk`, `src/_includes/nav.njk`, `src/_includes/footer.njk`, `src/_layouts/base.njk`, `.gitignore`
  - Pre-commit: `npm run build`

- [ ] 2. Define Terminal Color Tokens + Monospace Typography System

  **What to do**:
  - Update `tailwind.config.js` to replace the entire color/typography system:
    - Add `extend.colors.terminal` with these token names:
      - `green`: primary accent (a bright terminal green, e.g., `#00ff41` or `#4ade80`)
      - `cyan`: secondary accent (e.g., `#22d3ee`)
      - `dim`: muted text (e.g., `#6b7280`)
      - `dark`: primary background for dark mode (e.g., `#0a0a0f`)
      - `darker`: deeper background (e.g., `#050508`)
      - `surface`: card/elevated surface (e.g., `#111118`)
      - `border`: border color (e.g., `#1e1e2e`)
      - `light-bg`: light mode background (warm gray, e.g., `#f5f5f0`)
      - `light-surface`: light mode card (e.g., `#ffffff`)
      - `light-border`: light mode border (e.g., `#e5e5e0`)
    - The exact hex values should be tuned by the implementer to ensure WCAG AA contrast (4.5:1 minimum for text)
    - Update font family: make JetBrains Mono the primary `sans` font (replace Inter entirely). Keep `mono` as fallback alias.
    - Remove Inter from Google Fonts preconnect (will be done in Task 4's head.njk update)
    - Update the `typography` plugin overrides to use terminal token colors instead of hardcoded hex values
    - Remove the old `animation` and `keyframes` for `fade-in` and `slide-up` — these will be replaced with new terminal-themed animations in Task 11
  - Update `src/styles/input.css`:
    - Replace ALL hardcoded sky/purple Tailwind classes with terminal token classes
    - Update `.hero-title` gradient to use terminal green → cyan
    - Update `.btn-primary` gradient to terminal green
    - Update `.tag` styling to terminal green tints
    - Update `.post-content` prose overrides to terminal colors
    - Update `.reading-progress` bar to terminal green gradient
    - Update `.toc` styling to terminal surface/border tokens
    - Update all hover states to terminal green/cyan
    - Ensure `html` font-family is changed from Inter to JetBrains Mono
    - Remove `code, pre` font-family override (no longer needed when base is mono)

  **Must NOT do**:
  - Do NOT change template files (.njk) — only config and CSS
  - Do NOT upgrade Tailwind to v4
  - Do NOT add new CSS classes — only modify existing ones
  - Do NOT change the Tailwind content globs or plugin list

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config file updates with clear token definitions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 4, 5, 6, 7, 8, 9, 10, 11
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `tailwind.config.js:1-117` — Current full Tailwind config. Lines 11-29 define fonts/animations. Lines 30-111 define typography plugin overrides with ~40 hardcoded hex values that ALL must be replaced.
  - `src/styles/input.css:1-186` — Current CSS with ~25 sky/purple Tailwind class references that ALL must be replaced.

  **External References**:
  - Tailwind CSS v3 `extend.colors` docs: custom color tokens are accessed as `text-terminal-green`, `bg-terminal-dark`, etc.
  - WCAG contrast checker: terminal green on dark backgrounds must be ≥4.5:1 ratio

  **WHY Each Reference Matters**:
  - `tailwind.config.js` typography overrides contain the majority of hardcoded colors — missing any leaves visual inconsistency
  - `input.css` contains all custom component classes that reference sky/purple — every single one must be migrated

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: No legacy sky/purple colors in config or CSS
    Tool: Bash
    Preconditions: Token migration complete
    Steps:
      1. Run `grep -rn "sky-\|purple-\|#0ea5e9\|#8b5cf6\|#ec4899\|#0284c7\|#38bdf8\|#7dd3fc" tailwind.config.js src/styles/input.css`
      2. Verify zero matches
    Expected Result: 0 matches — all legacy colors replaced
    Failure Indicators: Any match means missed migration
    Evidence: .sisyphus/evidence/task-2-no-legacy-colors.txt

  Scenario: Terminal color tokens defined in Tailwind config
    Tool: Bash
    Preconditions: tailwind.config.js updated
    Steps:
      1. Run `grep -c "terminal" tailwind.config.js`
      2. Verify count ≥ 10 (at least 10 token references)
      3. Verify `grep "green:" tailwind.config.js` matches inside terminal colors
      4. Verify `grep "cyan:" tailwind.config.js` matches inside terminal colors
    Expected Result: Terminal color namespace exists with all expected tokens
    Evidence: .sisyphus/evidence/task-2-tokens-defined.txt

  Scenario: CSS builds successfully with new tokens
    Tool: Bash
    Preconditions: Both files updated
    Steps:
      1. Run `npx tailwindcss -i ./src/styles/input.css -o /tmp/test-output.css`
      2. Check exit code is 0
    Expected Result: Tailwind compiles without errors
    Failure Indicators: Unknown utility class errors, syntax errors
    Evidence: .sisyphus/evidence/task-2-css-builds.txt

  Scenario: JetBrains Mono is primary font
    Tool: Bash
    Preconditions: Config updated
    Steps:
      1. Verify `grep "JetBrains Mono" tailwind.config.js` appears in sans font family
      2. Verify `grep "Inter" tailwind.config.js` returns no matches
    Expected Result: JetBrains Mono is sans primary, Inter removed
    Evidence: .sisyphus/evidence/task-2-fonts.txt
  ```

  **Commit**: YES
  - Message: `feat(design): add terminal color tokens and monospace typography`
  - Files: `tailwind.config.js`, `src/styles/input.css`
  - Pre-commit: `npx tailwindcss -i ./src/styles/input.css -o /tmp/test.css`

- [ ] 3. Create JS Architecture (main.js) + Gitignore Cleanup

  **What to do**:
  - Create `src/assets/js/main.js` as the single JavaScript entry point for all interactive features
  - Initial content should include:
    - Theme toggle logic (moved from inline script in base.njk footer — the `themeToggle.addEventListener` block at lines 104-112)
    - Reading progress bar update logic (moved from inline script in post.njk — lines 109-117), wrapped in `requestAnimationFrame` for performance
    - A `prefers-reduced-motion` check utility: `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;`
    - DOMContentLoaded wrapper for initialization
    - Clearly commented sections/placeholders for features to be added in later tasks: typing hero, lightbox, scroll-to-top, scroll-reveal
  - Add passthrough copy for JS directory in `eleventy.config.js`: `eleventyConfig.addPassthroughCopy("./src/assets/js");`
  - The inline theme-init script in `<head>` (base.njk lines 30-35) MUST remain inline — it prevents FOUC. Do NOT move it to main.js.
  - Note: The actual removal of inline scripts from templates and addition of `<script src="/assets/js/main.js" defer></script>` will happen in Task 4 when the base layout is re-themed. This task only creates the JS file and configures passthrough.

  **Must NOT do**:
  - Do NOT remove inline scripts from templates yet (that happens in Task 4)
  - Do NOT add Alpine.js or any framework
  - Do NOT add `<script>` tag to templates yet (Task 4 will do this)
  - Do NOT implement typing animation, lightbox, or scroll features yet — only create placeholders

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file creation with straightforward JS patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 4, 5, 6, 9, 11
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/_layouts/base.njk:104-112` — Current theme toggle script to be moved to main.js
  - `src/_layouts/post.njk:109-117` — Current reading progress script to be moved to main.js (wrap in rAF)
  - `src/_layouts/base.njk:30-35` — Theme init script that MUST remain inline (do NOT move)
  - `eleventy.config.js:39-40` — Existing passthrough copy pattern to follow for JS directory

  **WHY Each Reference Matters**:
  - The two inline scripts show the exact JS logic to consolidate into main.js
  - The theme-init script is the exception — explains WHY it stays inline (FOUC prevention)
  - Passthrough copy pattern shows the existing convention to follow

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: main.js file exists with correct structure
    Tool: Bash
    Preconditions: File created
    Steps:
      1. Verify `src/assets/js/main.js` exists
      2. Verify file contains `DOMContentLoaded` event listener
      3. Verify file contains `prefersReducedMotion` check
      4. Verify file contains theme toggle logic
      5. Verify file contains reading progress logic with requestAnimationFrame
    Expected Result: File exists with all expected sections
    Evidence: .sisyphus/evidence/task-3-main-js-structure.txt

  Scenario: Eleventy passthrough copy configured for JS
    Tool: Bash
    Preconditions: eleventy.config.js updated
    Steps:
      1. Run `grep "assets/js" eleventy.config.js`
      2. Verify passthrough copy line exists
    Expected Result: JS directory is configured for passthrough copy
    Evidence: .sisyphus/evidence/task-3-passthrough.txt

  Scenario: Build succeeds with new JS file
    Tool: Bash
    Preconditions: All files in place
    Steps:
      1. Run `npm run build`
      2. Verify exit code 0
      3. Verify `_site/assets/js/main.js` exists in output
    Expected Result: JS file copied to output directory
    Evidence: .sisyphus/evidence/task-3-build.txt
  ```

  **Commit**: YES
  - Message: `feat(js): create main.js entry point and configure passthrough`
  - Files: `src/assets/js/main.js`, `eleventy.config.js`
  - Pre-commit: `npm run build`

- [ ] 4. Re-theme Base Layout + Mobile Nav + Meta Tags

  **What to do**:
  - Completely re-theme `src/_layouts/base.njk` and its extracted partials (`head.njk`, `nav.njk`, `footer.njk`) with the terminal aesthetic:
  - **head.njk updates**:
    - Update Google Fonts link: remove Inter, keep JetBrains Mono (weights 400, 500, 600, 700)
    - Add `<meta name="twitter:card" content="summary_large_image">`
    - Add `<meta name="twitter:image" content="{{ site.url }}/assets/og-image.png">`
    - Add `<meta property="og:image" content="{{ site.url }}/assets/og-image.png">`
    - Add `<link rel="canonical" href="{{ site.url }}{{ page.url }}">`
    - Add `<meta name="view-transition" content="same-origin">` for View Transitions API
    - Add `<script src="/assets/js/main.js" defer></script>` before closing `</head>`
  - **nav.njk updates**:
    - Add new nav items: About (`/about/`), Photography (`/photography/`), Projects (`/projects/`)
    - Implement hamburger menu for mobile (hidden on md+ breakpoint):
      - Hamburger button with 3-line icon (visible below md breakpoint)
      - Slide-down mobile menu panel with all nav items + dark mode toggle
      - Toggle logic added to `main.js` (add `data-nav-toggle` and `data-nav-menu` attributes for JS targeting)
      - Close on click outside, close on Escape key
      - Accessible: `aria-expanded`, `aria-controls`, `aria-label` on hamburger button
    - Re-theme all nav links: replace `text-slate-600 hover:text-sky-600` with terminal token classes
    - Replace the gradient title with terminal green monospace title
    - Replace sky-blue animated underlines with terminal green underlines
    - Replace dark mode toggle button styling with terminal surface/border tokens
    - Animated background blobs (lines 39-42): replace sky/purple colors with terminal green/cyan at very low opacity, or remove entirely for cleaner terminal feel (implementer's judgment)
  - **footer.njk updates**:
    - Re-theme with terminal surface background, terminal dim text, terminal green accent links
    - Keep GitHub and RSS icons, update hover colors to terminal green
  - **base.njk body updates**:
    - Update `<body>` classes: `bg-white dark:bg-terminal-dark` instead of `bg-white dark:bg-slate-900`
    - Remove the inline theme toggle script (now in main.js)
    - Add `@view-transition { navigation: auto; }` to input.css (for cross-document transitions)
  - Desktop nav items should be styled like terminal commands: monospace, possibly with a `>` or `$` prefix on hover

  **Must NOT do**:
  - Do NOT change page content templates (index, post, tags)
  - Do NOT add features not specified (no search, no notifications)
  - Do NOT use Alpine.js — hamburger toggle is vanilla JS in main.js

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Core visual redesign work, needs design sensibility for terminal aesthetic
  - **Skills**: [`playwright`]
    - `playwright`: Visual QA at multiple breakpoints and themes

  **Parallelization**:
  - **Can Run In Parallel**: NO — foundational for all other Wave 2+ tasks
  - **Parallel Group**: Wave 2 (starts first, others can start after this completes)
  - **Blocks**: Tasks 5, 6, 7, 8, 9, 10, 11, 12
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/_includes/head.njk` (created in Task 1) — the head partial to update with meta tags and font changes
  - `src/_includes/nav.njk` (created in Task 1) — the nav partial to add mobile hamburger and new links
  - `src/_includes/footer.njk` (created in Task 1) — the footer partial to re-theme
  - `src/_layouts/base.njk:37` — Body class string to update with terminal tokens
  - `src/_layouts/base.njk:39-42` — Animated background blobs to re-theme or remove
  - `src/assets/js/main.js` (created in Task 3) — Add hamburger toggle JS here

  **API/Type References**:
  - `tailwind.config.js` (updated in Task 2) — Terminal color tokens to use: `terminal-green`, `terminal-cyan`, `terminal-dark`, `terminal-surface`, `terminal-border`, etc.
  - View Transitions: `<meta name="view-transition" content="same-origin">` + CSS `@view-transition { navigation: auto; }`

  **WHY Each Reference Matters**:
  - All partials are the direct files being modified — executor needs to see them
  - Terminal tokens from Task 2 are the color vocabulary — executor must use ONLY these, never raw hex
  - main.js is where hamburger toggle logic goes — executor adds to existing file

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Desktop navigation renders all 7 items
    Tool: Playwright
    Preconditions: Dev server running at localhost:8080
    Steps:
      1. Navigate to http://localhost:8080/
      2. Set viewport to 1280x800
      3. Verify nav contains links: Home, Tags, About, Photography, Projects, RSS
      4. Verify dark mode toggle button is visible
      5. Screenshot the header area
    Expected Result: All nav items visible, terminal green styling, monospace font
    Failure Indicators: Missing nav items, sky/purple colors visible
    Evidence: .sisyphus/evidence/task-4-desktop-nav.png

  Scenario: Mobile hamburger menu works
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812 (iPhone)
      2. Navigate to http://localhost:8080/
      3. Verify hamburger button visible (aria-label contains "menu" or "navigation")
      4. Verify nav links are NOT visible initially
      5. Click hamburger button
      6. Verify nav links appear (all 6 + dark mode toggle)
      7. Press Escape key
      8. Verify nav links hidden
      9. Screenshot both open and closed states
    Expected Result: Hamburger toggles mobile menu, Escape closes it
    Failure Indicators: Menu doesn't open, items missing, no Escape handler
    Evidence: .sisyphus/evidence/task-4-mobile-menu-open.png, .sisyphus/evidence/task-4-mobile-menu-closed.png

  Scenario: Dark/light mode works with new theme
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Click dark mode toggle
      3. Screenshot in dark mode at 1280px
      4. Click toggle again
      5. Screenshot in light mode at 1280px
      6. Verify no sky/purple colors in either mode (visual check)
      7. Reload page — verify theme persisted
    Expected Result: Both modes render with terminal palette, theme persists
    Evidence: .sisyphus/evidence/task-4-dark-mode.png, .sisyphus/evidence/task-4-light-mode.png

  Scenario: Meta tags present in HTML output
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run `grep "og:image" _site/index.html`
      2. Run `grep "twitter:card" _site/index.html`
      3. Run `grep "canonical" _site/index.html`
      4. Run `grep "view-transition" _site/index.html`
      5. Verify all 4 present
    Expected Result: All meta tags in output HTML
    Evidence: .sisyphus/evidence/task-4-meta-tags.txt
  ```

  **Commit**: YES
  - Message: `feat(design): re-theme base layout with terminal aesthetic and mobile nav`
  - Files: `src/_includes/head.njk`, `src/_includes/nav.njk`, `src/_includes/footer.njk`, `src/_layouts/base.njk`, `src/assets/js/main.js`, `src/styles/input.css`
  - Pre-commit: `npm run build`

- [ ] 5. Re-theme Post Layout + Enhanced Code Blocks

  **What to do**:
  - Re-theme `src/_layouts/post.njk` with terminal aesthetic:
    - Replace all slate/sky/purple color classes with terminal tokens
    - Tag pills: terminal green tint background, terminal green text
    - Post title: terminal light text color (NOT gradient — clean monospace)
    - Date and reading time: terminal dim color
    - Author box: terminal surface background, terminal border, terminal green avatar gradient
    - Prev/next navigation: terminal border, terminal green hover
  - Enhanced code blocks in `src/styles/input.css`:
    - Code block container: terminal darker background with terminal border, subtle terminal green glow on hover
    - Add a language label overlay (top-right corner) styled as a terminal badge — this uses CSS `::before` pseudo-element on `pre[class*="language-"]` with `content: attr(data-language)`. Note: Eleventy's syntax highlight plugin may need the `data-language` attribute — check if it's already added or if a custom transform is needed in `eleventy.config.js`
    - Copy button: position absolute top-right, terminal surface background, terminal green icon, appears on hover of the code block. The copy logic goes in `main.js` using `navigator.clipboard.writeText()`. Add a brief "Copied!" feedback tooltip.
    - Inline `code` styling: terminal surface background with terminal green text
  - Update `.post-content` prose overrides in `input.css`:
    - All headings: terminal light text
    - Links: terminal cyan with underline on hover
    - Blockquotes: terminal green left border, terminal surface background
    - Lists: terminal dim bullets
    - Tables: terminal border, terminal surface header background
  - Reading progress bar: already in main.js (Task 3), just ensure CSS class `.reading-progress` uses terminal green gradient

  **Must NOT do**:
  - Do NOT add line numbers to code blocks (deferred to V2)
  - Do NOT change the syntax highlighting plugin or theme (Prism default is fine)
  - Do NOT modify post content (Markdown files)
  - Do NOT change post URL structure

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual redesign with attention to code block micro-interactions
  - **Skills**: [`playwright`]
    - `playwright`: Visual verification of code blocks and post layout

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 4 completes)
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:

  **Pattern References**:
  - `src/_layouts/post.njk:1-118` — Full post layout to re-theme. Lines 11-18 = tags, line 21 = title, lines 23-37 = meta, lines 41-43 = content, lines 46-105 = footer with author box and prev/next nav
  - `src/styles/input.css:61-105` — Current `.post-content` prose overrides to update
  - `src/styles/input.css:140-143` — Current `.reading-progress` bar styling
  - `src/assets/js/main.js` (from Task 3) — Add code block copy button logic here

  **External References**:
  - `navigator.clipboard.writeText()` API — for copy functionality (HTTPS only, Cloudflare Pages is HTTPS)
  - Eleventy syntax highlight plugin: check if `data-language` attribute is added to `<pre>` tags automatically

  **WHY Each Reference Matters**:
  - `post.njk` is the primary file being re-themed — executor needs full context
  - `input.css` prose overrides affect ALL rendered Markdown — must be comprehensive
  - `main.js` is where copy button JS goes — keeps all interactive logic centralized

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Post page renders with terminal theme
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/2024/03/web-performance/
      2. Screenshot at 1280px in dark mode
      3. Screenshot at 375px in dark mode
      4. Verify title is monospace, terminal light color
      5. Verify tags use terminal green styling
      6. Verify date/reading time use terminal dim color
      7. Verify no sky/purple colors visible
    Expected Result: Full terminal theme applied to post layout
    Evidence: .sisyphus/evidence/task-5-post-desktop.png, .sisyphus/evidence/task-5-post-mobile.png

  Scenario: Code block copy button works
    Tool: Playwright
    Preconditions: Dev server running, on a post with code blocks
    Steps:
      1. Navigate to http://localhost:8080/2024/03/web-performance/
      2. Scroll to first code block
      3. Hover over code block — verify copy button appears
      4. Click copy button
      5. Verify button shows "Copied!" feedback
      6. Screenshot the code block with copy button visible
    Expected Result: Copy button appears on hover, copies code to clipboard, shows feedback
    Failure Indicators: Button doesn't appear, no clipboard action, no feedback
    Evidence: .sisyphus/evidence/task-5-code-copy.png

  Scenario: Code block language label displays
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/2024/03/web-performance/
      2. Scroll to a code block with language specified (e.g., `html`, `javascript`)
      3. Verify language label visible in top-right or top-left corner
      4. Screenshot
    Expected Result: Language label renders as terminal-styled badge
    Evidence: .sisyphus/evidence/task-5-code-language.png

  Scenario: Post content typography correct
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/2024/03/web-performance/
      2. Verify headings (h2, h3) use terminal light text color
      3. Verify links use terminal cyan color
      4. Verify blockquote has terminal green left border
      5. Verify table has terminal border styling
      6. Screenshot full article content area
    Expected Result: All prose elements use terminal color tokens
    Evidence: .sisyphus/evidence/task-5-prose-typography.png
  ```

  **Commit**: YES
  - Message: `feat(design): re-theme post layout with enhanced code blocks`
  - Files: `src/_layouts/post.njk`, `src/styles/input.css`, `src/assets/js/main.js`
  - Pre-commit: `npm run build`

- [ ] 6. Re-theme Homepage + Terminal Typing Hero

  **What to do**:
  - Re-theme `src/index.njk` with terminal aesthetic:
    - **Terminal typing hero**: Replace the current hero section with a terminal-inspired hero:
      - Dark terminal "window" container with terminal surface background, terminal border, rounded corners
      - Optional: three dots (red/yellow/green) in the top-left as a window chrome decoration
      - A `$` prompt character followed by the site title typed character-by-character
      - Below: the tagline ("Not all who wander are lost") typed after the title finishes
      - Blinking block cursor (CSS `animation: blink 1s step-end infinite` on a `▌` character)
      - Total animation duration ≤ 4 seconds
      - `prefers-reduced-motion: reduce` → skip animation, show text immediately
      - For screen readers: text is in the DOM immediately with `aria-live="polite"` or visually hidden text
      - Typing animation logic added to `main.js`
    - **Stats section**: Re-theme with terminal dim colors, terminal green numbers
    - **Posts list**: Re-theme post cards:
      - Terminal border-bottom instead of slate
      - Title hover: terminal green color
      - Tags: terminal green tint
      - Date: terminal dim
      - Arrow indicator: terminal green on hover
    - **CTA/RSS section**: Re-theme with terminal surface gradient background, terminal green button
    - **"Start Reading" button**: Terminal green solid button (not gradient)
    - **"Browse Tags" button**: Terminal surface background, terminal border
  - All hero content uses `site.title` and `site.description` from `_data/site.json` — no hardcoding

  **Must NOT do**:
  - Do NOT make the hero an interactive terminal emulator (it's decorative only)
  - Do NOT accept keyboard input in the hero
  - Do NOT make the typing animation longer than 4 seconds
  - Do NOT add parallax to the hero yet (that's Task 11)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Signature visual element (typing hero) + homepage redesign
  - **Skills**: [`playwright`]
    - `playwright`: Visual verification of typing animation and responsive layout

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 4 completes)
  - **Parallel Group**: Wave 2 (with Tasks 5, 7)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:

  **Pattern References**:
  - `src/index.njk:1-105` — Full homepage template to re-theme. Lines 6-20 = hero, lines 23-33 = stats, lines 36-89 = posts list, lines 93-104 = CTA section
  - `src/assets/js/main.js` (from Task 3) — Add typing animation logic in the designated section
  - `src/_data/site.json` — Site title ("a journey about cosmic") and description ("Not all who wander are lost") — typing hero types THESE values dynamically

  **WHY Each Reference Matters**:
  - `index.njk` is the file being redesigned — executor needs full template context
  - `main.js` is where typing JS goes — keeps all interactive logic centralized
  - `site.json` values must be used dynamically, not hardcoded

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Terminal typing hero animates
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Wait 5 seconds for animation to complete
      3. Screenshot the hero section
      4. Verify site title text is visible
      5. Verify tagline text is visible
      6. Verify blinking cursor element exists
      7. Verify terminal "window" container has terminal surface background
    Expected Result: Typing animation completes, showing title + tagline with blinking cursor
    Evidence: .sisyphus/evidence/task-6-hero-typed.png

  Scenario: Typing hero respects reduced motion
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Emulate prefers-reduced-motion: reduce
      2. Navigate to http://localhost:8080/
      3. Screenshot immediately (no waiting)
      4. Verify all text is visible immediately (no animation delay)
    Expected Result: Text appears instantly without typing animation
    Evidence: .sisyphus/evidence/task-6-hero-reduced-motion.png

  Scenario: Homepage responsive at all breakpoints
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Screenshot at 375px width (dark mode)
      2. Screenshot at 768px width (dark mode)
      3. Screenshot at 1280px width (dark mode)
      4. Verify no horizontal scroll at any breakpoint
      5. Verify post cards stack properly at mobile
      6. Verify hero terminal window doesn't overflow
    Expected Result: Clean responsive layout at all sizes, no overflow
    Evidence: .sisyphus/evidence/task-6-responsive-375.png, .sisyphus/evidence/task-6-responsive-768.png, .sisyphus/evidence/task-6-responsive-1280.png

  Scenario: No legacy colors on homepage
    Tool: Bash
    Preconditions: Template updated
    Steps:
      1. Run `grep -n "sky-\|purple-\|#0ea5e9\|#8b5cf6" src/index.njk`
      2. Verify zero matches
    Expected Result: 0 legacy color references in homepage
    Evidence: .sisyphus/evidence/task-6-no-legacy-colors.txt
  ```

  **Commit**: YES
  - Message: `feat(homepage): terminal typing hero and re-themed homepage`
  - Files: `src/index.njk`, `src/assets/js/main.js`
  - Pre-commit: `npm run build`

- [ ] 7. Re-theme Tags Pages

  **What to do**:
  - Re-theme `src/tags.njk`:
    - Hero heading: terminal green monospace (replace gradient text)
    - Tag cards: terminal surface background, terminal border, terminal green text, terminal green hover border
    - Post count badges: terminal surface background, terminal dim text
    - "Back to All Posts" button: terminal green styling
    - Empty state: terminal surface background, terminal border, terminal dim text
  - Re-theme `src/tags-tag.njk`:
    - Hero heading with `#tag` in terminal green
    - Post cards: same terminal styling as homepage post cards (Task 6)
    - Active tag highlight: brighter terminal green background
    - Navigation buttons: terminal styled (same as homepage buttons)

  **Must NOT do**:
  - Do NOT change tag URL structure (`/tags/`, `/tags/tagname/`)
  - Do NOT add new features to tag pages
  - Do NOT change the pagination logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward color class replacement on 2 small templates
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 4 completes)
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 4

  **References**:

  **Pattern References**:
  - `src/tags.njk:1-47` — Full tags listing page, all sky/purple classes to replace
  - `src/tags-tag.njk:1-80` — Full per-tag page, all sky/purple classes to replace
  - `src/index.njk` (as re-themed in Task 6) — Post card styling should match for consistency

  **WHY Each Reference Matters**:
  - Both tag templates are the files being modified — executor needs full context
  - Post card consistency with homepage (Task 6) ensures unified design language

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Tags listing page renders with terminal theme
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/tags/
      2. Screenshot at 1280px in dark mode
      3. Verify heading uses terminal green, monospace font
      4. Verify tag cards use terminal surface/border styling
      5. Verify no sky/purple colors visible
    Expected Result: Tags page fully terminal-themed
    Evidence: .sisyphus/evidence/task-7-tags-page.png

  Scenario: Individual tag page renders correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/tags/web/ (or any existing tag)
      2. Screenshot at 1280px in dark mode
      3. Verify post cards match homepage styling
      4. Verify active tag is highlighted
    Expected Result: Tag page consistent with overall terminal design
    Evidence: .sisyphus/evidence/task-7-tag-detail.png

  Scenario: No legacy colors in tag templates
    Tool: Bash
    Steps:
      1. Run `grep -n "sky-\|purple-\|#0ea5e9\|#8b5cf6" src/tags.njk src/tags-tag.njk`
      2. Verify zero matches
    Expected Result: 0 legacy color references
    Evidence: .sisyphus/evidence/task-7-no-legacy.txt
  ```

  **Commit**: YES
  - Message: `feat(design): re-theme tags pages with terminal aesthetic`
  - Files: `src/tags.njk`, `src/tags-tag.njk`
  - Pre-commit: `npm run build`

- [ ] 8. Build About Page

  **What to do**:
  - Create `src/about.njk` with terminal-themed About page:
    - Layout: `base.njk` (via frontmatter `layout: base.njk`, `title: About`)
    - Terminal-style header with `$ whoami` command prompt motif
    - Author avatar: a large circular frame with terminal green gradient border (use the existing gradient avatar pattern from post.njk author box, but larger)
    - Bio section: use `site.author` from `_data/site.json`, add a few paragraphs of placeholder bio text about tech, life, and photography interests
    - Skills/interests section: terminal-styled list or grid showing interests (coding, photography, etc.) with terminal green icons or bullets
    - Social links section: GitHub, RSS (use existing icons from footer), and placeholder links for Twitter/X, email — styled as terminal-themed inline buttons
    - Contact/connect CTA at bottom: terminal surface card with "Let's connect" message
  - The page should feel personal but match the terminal aesthetic — not a resume, more like a `man cosmic` manual page

  **Must NOT do**:
  - Do NOT create an actual resume or CV — this is a personal "about me" page
  - Do NOT add a contact form (just links)
  - Do NOT hardcode the author name — use `site.author` from data

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single template page, follows established patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 4

  **References**:

  **Pattern References**:
  - `src/index.njk` (re-themed in Task 6) — Follow the same terminal styling patterns for page structure
  - `src/_layouts/post.njk:62-70` — Author box pattern to reference for avatar styling
  - `src/_data/site.json` — Author name and site data to reference

  **WHY Each Reference Matters**:
  - Homepage shows the established terminal page structure — About should follow the same visual language
  - Author box in post layout has the avatar gradient pattern to reuse at larger scale
  - `site.json` provides dynamic data to use instead of hardcoding

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: About page builds and renders
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/about/
      2. Verify page loads (HTTP 200)
      3. Verify page title contains "About"
      4. Screenshot at 1280px in dark mode
      5. Screenshot at 375px in dark mode
      6. Verify terminal aesthetic (no sky/purple colors)
    Expected Result: About page renders with terminal theme at all breakpoints
    Evidence: .sisyphus/evidence/task-8-about-desktop.png, .sisyphus/evidence/task-8-about-mobile.png

  Scenario: About page uses dynamic site data
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run `grep "cosmic" _site/about/index.html`
      2. Verify author name appears in output
    Expected Result: Author name from site.json rendered in output
    Evidence: .sisyphus/evidence/task-8-dynamic-data.txt

  Scenario: About page accessible from nav
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Click "About" nav link
      3. Verify URL is /about/
      4. Verify page content loads
    Expected Result: Navigation to About page works
    Evidence: .sisyphus/evidence/task-8-nav-link.png
  ```

  **Commit**: YES
  - Message: `feat(pages): add About page with terminal aesthetic`
  - Files: `src/about.njk`
  - Pre-commit: `npm run build`

- [ ] 9. Build Photography Gallery + Lightbox

  **What to do**:
  - Create `src/photography.njk` with a terminal-themed photography gallery:
    - Layout: `base.njk` (via frontmatter `layout: base.njk`, `title: Photography`)
    - Terminal-style header: `$ ls ~/photos` or similar command motif
    - Gallery data model: Create `src/_data/photos.json` with an array of photo objects:
      ```json
      [
        { "src": "./src/assets/photos/sample-1.jpg", "alt": "Description", "caption": "Optional caption" },
        ...
      ]
      ```
    - Add 3-5 sample/placeholder images to `src/assets/photos/` (implementer should create simple placeholder images or download free stock photos for development)
    - Masonry layout using CSS Columns (no JavaScript):
      - 1 column at mobile (< 640px)
      - 2 columns at tablet (640px-1023px)
      - 3 columns at desktop (≥ 1024px)
      - Gap between images using CSS `column-gap` and `margin-bottom`
    - Each photo rendered using the existing `image` shortcode for optimization, BUT with gallery-specific widths `[300, 600]` (not the post widths `[400, 800, 1200, 1600]`):
      - Create a new `galleryImage` shortcode in `eleventy.config.js` with `widths: [300, 600]` and `formats: ["webp", "jpeg"]`
    - Click on any photo opens a vanilla JS lightbox:
      - Full-viewport overlay with dark semi-transparent background
      - Centered image displayed at its natural size (up to viewport bounds)
      - Close button (X) in top-right corner
      - Left/right arrow navigation (keyboard ArrowLeft/ArrowRight + click)
      - Escape key to close
      - Click on backdrop to close
      - Focus trap: Tab cycles through close button and arrows only
      - Return focus to triggering image on close
      - Optional: caption displayed below image in lightbox
      - All lightbox JS goes in `main.js`
    - CSS for gallery and lightbox goes in `input.css`
    - Empty state: if `photos.json` has 0 entries, show a terminal-styled empty message
    - All images MUST have meaningful `alt` text
    - All images MUST have `loading="lazy"`
    - Add passthrough copy for photos: `eleventyConfig.addPassthroughCopy("./src/assets/photos");` — or let eleventy-img handle output

  **Must NOT do**:
  - Do NOT implement photo albums or categories (flat gallery only)
  - Do NOT show EXIF metadata
  - Do NOT add a download button
  - Do NOT use JavaScript for the masonry layout (CSS columns only)
  - Do NOT use more than 2 widths for gallery thumbnails (`[300, 600]`)
  - Do NOT add infinite scroll

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex visual component (masonry grid + lightbox interaction)
  - **Skills**: [`playwright`]
    - `playwright`: Test lightbox interactions, responsive gallery layout, keyboard navigation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 10)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:

  **Pattern References**:
  - `eleventy.config.js:9-30` — Existing `imageShortcode` function. Copy and modify for `galleryImage` with `widths: [300, 600]`
  - `eleventy.config.js:39-40` — Passthrough copy pattern to follow for photos directory
  - `src/assets/js/main.js` (from Task 3) — Add lightbox JS in the designated lightbox section
  - `src/styles/input.css` — Add gallery and lightbox CSS classes

  **External References**:
  - CSS Columns: `column-count: 3; column-gap: 1rem;` + `break-inside: avoid;` on children
  - `navigator.clipboard` not needed here — focus trap pattern: save `document.activeElement`, trap Tab key, restore on close

  **WHY Each Reference Matters**:
  - `imageShortcode` is the pattern to clone for gallery — same optimization pipeline, different widths
  - `main.js` centralization means lightbox logic goes there, not inline
  - CSS Columns is the recommended approach (no JS, all browsers) per Metis research

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Gallery renders with masonry layout
    Tool: Playwright
    Preconditions: Dev server running, sample photos in place
    Steps:
      1. Navigate to http://localhost:8080/photography/
      2. Screenshot at 1280px — verify 3-column layout
      3. Screenshot at 768px — verify 2-column layout
      4. Screenshot at 375px — verify 1-column layout
      5. Verify all images have loading="lazy" attribute
      6. Verify all images have alt text
    Expected Result: Responsive masonry grid with optimized images
    Evidence: .sisyphus/evidence/task-9-gallery-desktop.png, .sisyphus/evidence/task-9-gallery-tablet.png, .sisyphus/evidence/task-9-gallery-mobile.png

  Scenario: Lightbox opens and navigates
    Tool: Playwright
    Preconditions: Dev server running, gallery has ≥3 photos
    Steps:
      1. Navigate to http://localhost:8080/photography/
      2. Click first photo
      3. Verify lightbox overlay appears
      4. Screenshot lightbox with image displayed
      5. Press ArrowRight — verify next image shown
      6. Press ArrowLeft — verify previous image shown
      7. Verify close button (X) visible
      8. Click close button — verify lightbox closes
    Expected Result: Lightbox opens, navigates, closes properly
    Failure Indicators: Lightbox doesn't open, navigation broken, can't close
    Evidence: .sisyphus/evidence/task-9-lightbox-open.png, .sisyphus/evidence/task-9-lightbox-nav.png

  Scenario: Lightbox keyboard accessibility
    Tool: Playwright
    Preconditions: Lightbox open
    Steps:
      1. Open lightbox by clicking a photo
      2. Press Tab — verify focus cycles within lightbox (close btn, arrows)
      3. Press Escape — verify lightbox closes
      4. Verify focus returns to the photo that was clicked
    Expected Result: Full keyboard accessibility — focus trap, Escape, focus restore
    Evidence: .sisyphus/evidence/task-9-lightbox-keyboard.txt

  Scenario: Empty gallery state
    Tool: Bash
    Preconditions: photos.json exists with empty array
    Steps:
      1. Temporarily set photos.json to `[]`
      2. Run `npm run build`
      3. Check _site/photography/index.html contains empty state message
    Expected Result: Empty state message rendered, no errors
    Evidence: .sisyphus/evidence/task-9-empty-state.txt
  ```

  **Commit**: YES
  - Message: `feat(pages): add Photography gallery with masonry grid and lightbox`
  - Files: `src/photography.njk`, `src/_data/photos.json`, `src/assets/photos/*`, `eleventy.config.js`, `src/assets/js/main.js`, `src/styles/input.css`
  - Pre-commit: `npm run build`

- [ ] 10. Build Projects Page

  **What to do**:
  - Create `src/projects.njk` with a terminal-themed projects showcase:
    - Layout: `base.njk` (via frontmatter `layout: base.njk`, `title: Projects`)
    - Terminal-style header: `$ ls ~/projects` or similar command motif
    - Data source: Create `src/_data/projects.json` with project array:
      ```json
      [
        {
          "name": "Project Name",
          "description": "Brief description of what it does",
          "url": "https://github.com/...",
          "tags": ["python", "cli"],
          "status": "active"
        }
      ]
      ```
    - Add 2-3 placeholder projects for development
    - Project cards in a responsive grid:
      - 1 column at mobile, 2 columns at desktop
      - Terminal surface background, terminal border
      - Project name in terminal green (monospace)
      - Description in terminal dim text
      - Tags as small terminal green pills
      - Status indicator: green dot for "active", amber dot for "wip", dim dot for "archived"
      - Hover effect: subtle terminal green border glow (reuse `.glow` class pattern from input.css)
      - Link: entire card is clickable, opens project URL
    - Empty state: terminal-styled message when no projects defined
    - Accessible: cards are `<a>` tags with proper `aria-label`

  **Must NOT do**:
  - Do NOT create detailed project case study pages (just cards with links)
  - Do NOT add GitHub API integration
  - Do NOT add screenshot/image support for projects
  - Do NOT add filtering or search on the projects page

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple template + data file, follows established card patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 4

  **References**:

  **Pattern References**:
  - `src/index.njk` (re-themed in Task 6) — Post card styling pattern to follow for project cards
  - `src/styles/input.css:173-185` — `.glow` class pattern to reuse for project card hover
  - `src/_data/site.json` — Pattern for 11ty global data file structure

  **WHY Each Reference Matters**:
  - Homepage post cards establish the card design language — projects should be visually consistent
  - `.glow` hover effect already exists and matches the terminal aesthetic
  - `site.json` shows the data file convention (simple JSON in `_data/`)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Projects page renders with cards
    Tool: Playwright
    Preconditions: Dev server running, projects.json has ≥2 entries
    Steps:
      1. Navigate to http://localhost:8080/projects/
      2. Verify page loads (HTTP 200)
      3. Verify project cards display name, description, tags
      4. Screenshot at 1280px in dark mode (2 columns)
      5. Screenshot at 375px in dark mode (1 column)
      6. Verify terminal aesthetic — no sky/purple colors
    Expected Result: Project cards render responsively with terminal theme
    Evidence: .sisyphus/evidence/task-10-projects-desktop.png, .sisyphus/evidence/task-10-projects-mobile.png

  Scenario: Project card links work
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/projects/
      2. Verify each project card is a clickable link (has href attribute)
      3. Verify links have proper aria-label
    Expected Result: Cards are accessible links to project URLs
    Evidence: .sisyphus/evidence/task-10-card-links.txt

  Scenario: Projects page empty state
    Tool: Bash
    Preconditions: projects.json set to empty array
    Steps:
      1. Set projects.json to `[]`
      2. Run `npm run build`
      3. Verify _site/projects/index.html contains empty state message
    Expected Result: Empty state message shown, no build errors
    Evidence: .sisyphus/evidence/task-10-empty-state.txt
  ```

  **Commit**: YES
  - Message: `feat(pages): add Projects page with terminal-themed cards`
  - Files: `src/projects.njk`, `src/_data/projects.json`
  - Pre-commit: `npm run build`

- [ ] 11. Scroll Enhancements + View Transitions + Favicon + OG Image

  **What to do**:
  - **Scroll-to-top button** (in `main.js`):
    - Floating button fixed to bottom-right corner
    - Hidden until user scrolls past 300px (use `IntersectionObserver` on a sentinel element near the top, or simple `scroll` event with `requestAnimationFrame` throttle)
    - Terminal surface background, terminal green arrow icon (use CSS triangle or `↑` character in monospace)
    - Smooth scroll to top on click: `window.scrollTo({ top: 0, behavior: 'smooth' })`
    - `prefers-reduced-motion: reduce` → instant jump (no smooth scroll)
    - `aria-label="Scroll to top"`, accessible focus styling
    - CSS in `input.css` for the button and its show/hide transition (opacity + translateY)
  - **Smooth anchor scrolling** (in `input.css`):
    - Add `html { scroll-behavior: smooth; }` to `input.css`
    - Override with `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` 
    - This affects TOC anchor links in posts and any in-page navigation
  - **Scroll-reveal animations** (in `main.js`):
    - Use `IntersectionObserver` to detect when elements enter the viewport
    - Apply a subtle fade-in + slight upward translate animation
    - Target: post cards on homepage, project cards, gallery photos, about page sections
    - Add a `data-reveal` attribute to elements in the templates that should animate
    - CSS class `.revealed` triggers the animation (add to `input.css`)
    - Initial state: `opacity: 0; transform: translateY(20px)` via `.reveal-hidden` class
    - Revealed state: `opacity: 1; transform: translateY(0)` with `transition: opacity 0.6s, transform 0.6s`
    - `prefers-reduced-motion: reduce` → set `transition-duration: 0s` (elements appear instantly, no motion)
    - Intersection threshold: `0.1` (trigger when 10% visible)
    - `once: true` — only animate on first intersection, don't re-animate on scroll back
  - **View Transitions CSS** (in `input.css`):
    - The `<meta name="view-transition">` tag was already added in Task 4
    - Add CSS rule: `@view-transition { navigation: auto; }` to `input.css`
    - This enables browser-native cross-document view transitions as progressive enhancement
    - No JavaScript needed — browsers that support it get smooth page transitions, others get normal navigation
  - **Favicon update**:
    - Redesign `src/assets/favicon.svg` to match terminal aesthetic:
      - Simple monochrome design: terminal green on transparent background
      - Consider: `>_` cursor prompt, `{ }` braces, or a simple geometric mark
      - Keep it recognizable at 16x16 and 32x32
      - SVG format (already in use, no format change needed)
  - **Static OG image**:
    - Create `src/assets/og-image.png` (1200×630px, standard OG size)
    - Terminal-themed design: dark background, terminal green text showing site title and tagline
    - Can be created manually or via canvas/SVG-to-PNG — this is a static branded image, NOT generated per-post
    - Add passthrough copy in `eleventy.config.js` if not already covered by existing `addPassthroughCopy("./src/assets")`
  - **Add `data-reveal` attributes** to templates:
    - `src/index.njk`: Add `data-reveal` to each post card in the loop, and to the stats section
    - `src/projects.njk`: Add `data-reveal` to each project card
    - `src/photography.njk`: Add `data-reveal` to each gallery photo
    - `src/about.njk`: Add `data-reveal` to each content section

  **Must NOT do**:
  - Do NOT add multi-layer parallax or heavy motion effects
  - Do NOT add JavaScript for view transitions — CSS-only progressive enhancement
  - Do NOT make scroll-reveal use `scroll` event listener (use `IntersectionObserver`)
  - Do NOT animate elements that are above the fold (hero, nav) — only below-fold content
  - Do NOT generate OG images per-post — static branded image only

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple interconnected features (scroll behavior, animations, assets) requiring careful coordination
  - **Skills**: [`playwright`]
    - `playwright`: Verify scroll-to-top button visibility, scroll-reveal animations, favicon rendering

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 12)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 3, 4, 6 (needs tokens, main.js, base layout, and homepage for data-reveal attributes)

  **References**:

  **Pattern References**:
  - `src/assets/js/main.js` (from Tasks 3, 4, 5, 6, 9) — Add scroll-to-top, scroll-reveal logic in designated sections
  - `src/styles/input.css` (from Task 2) — Add scroll-to-top button CSS, scroll-reveal animation classes, view transitions rule
  - `src/assets/favicon.svg` — Current favicon to redesign
  - `src/index.njk` (from Task 6) — Add `data-reveal` attributes to post cards and stats
  - `src/projects.njk` (from Task 10) — Add `data-reveal` to project cards
  - `src/photography.njk` (from Task 9) — Add `data-reveal` to gallery photos
  - `src/about.njk` (from Task 8) — Add `data-reveal` to content sections

  **External References**:
  - `IntersectionObserver` API: `new IntersectionObserver(callback, { threshold: 0.1 })` + `observer.observe(el)`
  - View Transitions CSS: `@view-transition { navigation: auto; }` — progressive enhancement, no polyfill needed
  - OG image spec: 1200×630px, PNG or JPEG, referenced by `<meta property="og:image">`

  **WHY Each Reference Matters**:
  - `main.js` is where ALL JavaScript goes — executor must add to existing file, not create new ones
  - Templates need `data-reveal` attributes added — executor must modify 4 template files
  - Existing favicon is the file to replace — maintain SVG format
  - OG image meta tag was added in Task 4 — now the actual image file must exist at the path referenced

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Scroll-to-top button appears on scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Verify scroll-to-top button is NOT visible at top of page
      3. Scroll down 500px
      4. Verify scroll-to-top button IS visible (check for aria-label="Scroll to top")
      5. Click the scroll-to-top button
      6. Wait 1 second
      7. Verify page scrolled to top (window.scrollY < 50)
      8. Screenshot with button visible
    Expected Result: Button appears after scrolling, clicking scrolls to top smoothly
    Failure Indicators: Button never appears, button doesn't scroll, button always visible
    Evidence: .sisyphus/evidence/task-11-scroll-to-top.png

  Scenario: Scroll-reveal animations work on homepage
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Verify elements with data-reveal attribute start with opacity 0
      3. Scroll to the posts section
      4. Wait 1 second
      5. Verify post cards have transitioned to opacity 1
      6. Screenshot the revealed cards
    Expected Result: Cards fade in as they enter viewport
    Failure Indicators: Cards invisible, no animation, cards visible before scroll
    Evidence: .sisyphus/evidence/task-11-scroll-reveal.png

  Scenario: Scroll-reveal respects reduced motion
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Emulate prefers-reduced-motion: reduce
      2. Navigate to http://localhost:8080/
      3. Verify all data-reveal elements are immediately visible (opacity 1)
      4. Screenshot
    Expected Result: No animation delays, all content visible immediately
    Evidence: .sisyphus/evidence/task-11-reduced-motion.png

  Scenario: Favicon updated to terminal design
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:8080/
      2. Check the favicon link element in HTML: querySelector('link[rel="icon"]')
      3. Verify it points to /assets/favicon.svg
      4. Fetch the favicon and verify it's valid SVG
    Expected Result: Terminal-themed favicon loads
    Evidence: .sisyphus/evidence/task-11-favicon.txt

  Scenario: OG image exists and is referenced
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Verify `_site/assets/og-image.png` exists
      2. Verify file size > 0 bytes
      3. Run `grep "og-image.png" _site/index.html`
      4. Verify og:image meta tag references the image
    Expected Result: OG image exists and is referenced in HTML
    Evidence: .sisyphus/evidence/task-11-og-image.txt
  ```

  **Commit**: YES
  - Message: `feat(polish): scroll enhancements, view transitions, favicon, and OG image`
  - Files: `src/assets/js/main.js`, `src/styles/input.css`, `src/assets/favicon.svg`, `src/assets/og-image.png`, `src/index.njk`, `src/projects.njk`, `src/photography.njk`, `src/about.njk`
  - Pre-commit: `npm run build`

- [ ] 12. RSS Feed Update + Final CSS Cleanup

  **What to do**:
  - **RSS feed update** (`src/feed.xml.njk`):
    - Review current feed template and verify it still produces valid XML after all changes
    - Ensure feed title uses `site.title` ("a journey about cosmic")
    - Ensure feed description uses `site.description`
    - Ensure feed link points to `site.url`
    - Verify each `<entry>` has proper `<title>`, `<link>`, `<updated>`, `<summary>` from post frontmatter
    - No visual styling in RSS — but verify the metadata is consistent with updated site identity
  - **Final CSS cleanup** (`src/styles/input.css`):
    - Run a full search for any remaining legacy color references in ALL source files:
      - `sky-`, `purple-`, `pink-`, `slate-` Tailwind classes
      - Hardcoded hex values: `#0ea5e9`, `#8b5cf6`, `#ec4899`, `#0284c7`, `#38bdf8`, `#7dd3fc`
      - Any `bg-white` or `text-white` that should be terminal token (note: some `text-white` may be correct for high contrast text — review context)
    - Remove any orphaned CSS classes that no longer correspond to template usage
    - Verify all custom classes in `input.css` are still used in at least one template
    - Ensure no duplicate CSS rules exist
    - Check `tailwind.config.js` typography overrides have no remaining hardcoded hex values
    - Run `npm run build` as final verification

  **Must NOT do**:
  - Do NOT change the RSS feed format or add new fields
  - Do NOT change the feed URL (`/feed.xml`)
  - Do NOT add new features — this is cleanup only
  - Do NOT modify template structure — only CSS class values if legacy colors found

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Review + grep + minor fixes, no complex logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 11)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 5

  **References**:

  **Pattern References**:
  - `src/feed.xml.njk:1-42` — Current RSS template to review (already read, just verify post-changes)
  - `tailwind.config.js` (from Task 2) — Check typography overrides for stray hex values
  - `src/styles/input.css` (from Task 2+) — Final CSS file to audit

  **WHY Each Reference Matters**:
  - Feed template must produce valid XML — even though it wasn't directly modified, changes to site data or layouts could affect it
  - CSS file has been modified by multiple tasks — final audit catches anything missed
  - Tailwind config typography overrides had ~40 hardcoded colors — verify Task 2 caught them all

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: RSS feed is valid XML
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run `npm run build`
      2. Verify `_site/feed.xml` exists
      3. Run `xmllint --noout _site/feed.xml` (or check well-formedness manually: grep for `<?xml`, `<feed`, `</feed>`)
      4. Verify feed contains at least 3 `<entry>` elements (one per existing post)
      5. Verify `<title>` contains "a journey about cosmic"
    Expected Result: Valid XML feed with all posts
    Failure Indicators: XML parse errors, missing entries, wrong title
    Evidence: .sisyphus/evidence/task-12-rss-valid.txt

  Scenario: Zero legacy colors in source files
    Tool: Bash
    Preconditions: All tasks completed
    Steps:
      1. Run `grep -rn "sky-\|purple-\|pink-\|#0ea5e9\|#8b5cf6\|#ec4899\|#0284c7\|#38bdf8\|#7dd3fc" src/ --include="*.njk" --include="*.css" --include="*.js"`
      2. Run `grep -rn "sky-\|purple-\|#0ea5e9\|#8b5cf6" tailwind.config.js`
      3. Verify both return zero matches
    Expected Result: 0 legacy color references in any source file
    Failure Indicators: Any match means incomplete migration
    Evidence: .sisyphus/evidence/task-12-no-legacy-colors.txt

  Scenario: No orphaned CSS classes
    Tool: Bash
    Preconditions: All source files finalized
    Steps:
      1. Extract all custom class names from input.css (classes defined with `.classname`)
      2. For each custom class, grep across all .njk templates to verify usage
      3. List any classes defined in CSS but not used in any template
    Expected Result: All custom CSS classes are used in at least one template
    Evidence: .sisyphus/evidence/task-12-no-orphans.txt

  Scenario: Final build succeeds
    Tool: Bash
    Steps:
      1. Run `npm run build`
      2. Verify exit code 0
      3. Verify all expected pages exist in _site/:
         - index.html, about/index.html, photography/index.html, projects/index.html
         - tags/index.html, feed.xml
         - 2024/01/getting-started/index.html
         - 2024/02/coding-tips/index.html
         - 2024/03/web-performance/index.html
         - assets/js/main.js
    Expected Result: Clean build with all pages generated
    Evidence: .sisyphus/evidence/task-12-final-build.txt
  ```

  **Commit**: YES
  - Message: `fix(cleanup): update RSS feed metadata and remove legacy colors`
  - Files: `src/feed.xml.njk`, `src/styles/input.css`, `tailwind.config.js` (if changes needed)
  - Pre-commit: `npm run build`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` (verify exit 0). Review all changed files for: hardcoded hex colors, inline scripts (except head theme-init), `console.log`, unused CSS classes, Tailwind v4 syntax. Check: all images have alt text, all links have accessible labels, no empty `href`, WCAG AA contrast for terminal green on dark/light backgrounds.
  Output: `Build [PASS/FAIL] | Color Tokens [N hardcoded found] | A11y [N issues] | VERDICT`

- [ ] F3. **Full Visual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. For EVERY page [/, /about/, /photography/, /projects/, /tags/, /2024/01/getting-started/, /2024/02/coding-tips/, /2024/03/web-performance/]:
  Screenshot at 375px, 768px, 1280px in BOTH dark and light mode (48 screenshots total). Verify: no text overflow, no invisible text, no broken images, no horizontal scroll at mobile. Test hamburger menu open/close. Test lightbox open/close/keyboard. Test typing hero with reduced-motion. Test code block copy button. Test scroll-to-top button. Test dark/light toggle persistence. Save all to `.sisyphus/evidence/final-qa/`.
  Output: `Pages [N/N rendered] | Screenshots [N/N] | Interactions [N/N] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Verify no sky/purple colors remain (grep). Verify existing URLs preserved. Verify RSS valid XML.
  Output: `Tasks [N/N compliant] | Legacy Colors [CLEAN/N found] | URLs [N/N preserved] | VERDICT`

---

## Commit Strategy

| After Task(s) | Commit Message | Files |
|---------------|---------------|-------|
| 1 | `refactor(templates): extract partials from base layout` | `src/_includes/*`, `src/_layouts/base.njk` |
| 2 | `feat(design): add terminal color tokens and monospace typography` | `tailwind.config.js`, `src/styles/input.css` |
| 3 | `feat(js): create main.js entry point and update gitignore` | `src/assets/js/main.js`, `.gitignore`, `src/_includes/head.njk` |
| 4 | `feat(design): re-theme base layout with terminal aesthetic` | `src/_includes/*`, `src/_layouts/base.njk` |
| 5 | `feat(design): re-theme post layout with enhanced code blocks` | `src/_layouts/post.njk`, `src/styles/input.css` |
| 6 | `feat(homepage): terminal typing hero and re-themed homepage` | `src/index.njk`, `src/assets/js/main.js` |
| 7 | `feat(design): re-theme tags pages` | `src/tags.njk`, `src/tags-tag.njk` |
| 8 | `feat(pages): add About page` | `src/about.njk` |
| 9 | `feat(pages): add Photography gallery with lightbox` | `src/photography.njk`, `src/assets/js/main.js`, `src/styles/input.css` |
| 10 | `feat(pages): add Projects page` | `src/projects.njk`, `src/_data/projects.json` |
| 11 | `feat(polish): scroll enhancements, view transitions, favicon, OG image` | `src/assets/js/main.js`, `src/assets/favicon.svg`, `src/assets/og-image.png`, `src/styles/input.css` |
| 12 | `fix(feed): update RSS and final CSS cleanup` | `src/feed.xml.njk`, `src/styles/input.css` |

---

## Success Criteria

### Verification Commands
```bash
npm run build                    # Expected: exit 0, _site/ populated
ls _site/index.html              # Expected: exists
ls _site/about/index.html        # Expected: exists
ls _site/photography/index.html  # Expected: exists
ls _site/projects/index.html     # Expected: exists
ls _site/feed.xml                # Expected: exists
ls _site/assets/js/main.js       # Expected: exists

# No legacy colors
grep -r "sky-" src/ --include="*.njk" --include="*.css" | wc -l    # Expected: 0
grep -r "purple-" src/ --include="*.njk" --include="*.css" | wc -l # Expected: 0
grep -r "#0ea5e9" src/ | wc -l                                      # Expected: 0

# Existing URLs preserved
ls _site/2024/01/getting-started/index.html  # Expected: exists
ls _site/2024/02/coding-tips/index.html      # Expected: exists
ls _site/2024/03/web-performance/index.html  # Expected: exists

# RSS valid
xmllint --noout _site/feed.xml               # Expected: valid
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] `npm run build` succeeds
- [ ] All pages render at 3 breakpoints × 2 themes
- [ ] All existing URLs preserved
- [ ] RSS feed valid
- [ ] No horizontal scroll at mobile
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Lighthouse Performance ≥ 90
