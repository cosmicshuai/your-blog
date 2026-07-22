# AGENTS.md

Eleventy 3.x (ESM, `type: module`) + Tailwind CSS 3.4 blog. Deployed to Cloudflare Pages via GitHub Actions on `main`.

## Commands

- `npm run build` — CSS then Eleventy; outputs `_site/`. Always use this for verification (exits 0 = ok).
- `npm run build:css` — `tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --minify`. Output is at `src/styles/output.css` and is **gitignored** but required for site to render. Passthrough-copied by Eleventy.
- `npm run dev` — Builds CSS then runs concurrent watchers (`watch:css` + `watch:11ty`) on :8080.
- `npm run watch:css` / `npm run watch:11ty` — Individual watchers.
- `npm run serve` — Eleventy serve only, no CSS watch.
- No lint, typecheck, or test scripts. `playwright` is listed but not wired to a test runner.

## Structure

- `src/` is Eleventy input, `_site/` output, includes `_includes/`, layouts `_layouts/`, data `_data/`.
- Layouts: `_layouts/base.njk` (chrome) + `_layouts/post.njk` (post). Partials in `_includes/` (head, nav, footer).
- JS: single `src/assets/js/main.js` — all interactivity lives here, vanilla JS only.
- Styles: `src/styles/input.css` (Tailwind + custom) -> `src/styles/output.css` (generated).
- Content: `src/posts/YYYY-MM-DD-slug.md` — date prefix stripped in permalink preprocessor (`/{year}/{month}/{slug}/`). Default front matter in `src/posts/posts.json` sets layout + `posts` tag.
- Global data: `src/_data/site.json` (title, url, author).
- Tags: `src/tags.njk` + `src/tags-tag.njk`. Filters `isValidTagSlug`, `slugifySafe`, `getValidTagList` exclude `posts`/`all`/`tags`.
- Images: shortcodes `{% image %}` / `{% galleryImage %}` backed by `@11ty/eleventy-img` (webp/jpeg, widths 400/800/1200/1600 or 300/600). Sources must exist at build time or throws.
- Markdown: `markdown-it-anchor` + `markdown-it-table-of-contents`. Use `[[toc]]` for TOC (h2-h4). Code transform in `eleventy.config.js` injects `data-language` + copy button.

## Conventions & Quirks

- Tailwind scans `src/**/*.{html,njk,md}`. Custom `terminal` colors + JetBrains Mono font in `tailwind.config.js`. Dark mode is `class`-based (`darkMode: 'class'`).
- Front matter for posts: `title` (required), `date` (required YYYY-MM-DD), `description` (optional), `tags` (optional). Posts sorted reverse chronological in `posts` collection.
- Passthrough copy: `output.css` + `src/assets` + `src/assets/photos`. If adding new static dirs, update `addPassthroughCopy` in `eleventy.config.js`.
- CI: `.github/workflows/deploy.yml` — Node 20, `npm ci` → `npm run build` → `cloudflare/pages-action@v1` with `directory: _site`. Requires secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PROJECT_NAME`.
- No `.opencode` / `CLAUDE.md` — this file is the sole agent instruction source.

## Gotchas

- `src/styles/output.css` must exist for styles; run `npm run build:css` or `npm run build` first. Don't commit it.
- Build order matters: CSS before Eleventy (default in `build` script).
- Image shortcodes throw if `alt` missing — always provide alt text.
- `eleventy.config.js` uses `addPreprocessor` for date permalinks and `addTransform` for code blocks — changes there affect all posts.
- Photography page uses CSS columns masonry, vanilla JS lightbox in `main.js`, images expected in `src/assets/photos/`.
