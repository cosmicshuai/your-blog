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
