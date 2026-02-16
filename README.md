# Personal Blog

A personal blog built with [Eleventy](https://www.11ty.dev/), [Tailwind CSS](https://tailwindcss.com/), and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- ⚡ **Fast** - Static site generation with Eleventy 3.x
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🏷️ **Tags** - Organize posts with tags
- 📑 **Table of Contents** - Auto-generated TOC for posts
- 🖼️ **Image Optimization** - Responsive images with WebP/JPEG
- 📅 **Date-based URLs** - Clean URLs like `/2024/01/hello-world/`
- 📡 **RSS Feed** - Auto-generated Atom feed
- 🌙 **Clean Design** - Minimal, readable design

## Quick Start

### 1. Clone and Install

```bash
cd blog
npm install
```

### 2. Development

```bash
# Start development server (includes Tailwind watch)
npm run dev

# Or run CSS and Eleventy separately
npm run watch:css    # Terminal 1: Watch Tailwind
npm run watch:11ty   # Terminal 2: Watch Eleventy
```

Site will be available at `http://localhost:8080`

### 3. Build

```bash
npm run build
```

Output will be in `_site/` directory.

## Writing Posts

### Create a New Post

1. Create a file in `src/posts/` with format: `YYYY-MM-DD-title.md`

```markdown
---
title: Your Post Title
date: 2024-03-15
description: Brief description for preview
tags:
  - tag1
  - tag2
---

[[toc]]

Your content here...
```

### Front Matter Options

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title |
| `date` | ✅ | Publish date (YYYY-MM-DD) |
| `description` | ❌ | Short description shown in list |
| `tags` | ❌ | Array of tags |

### Table of Contents

Add `[[toc]]` anywhere in your post to insert a table of contents. It will automatically link to H2, H3, and H4 headings.

### Images

Use the image shortcode for optimized images:

```nunjucks
{% image "./src/assets/images/photo.jpg", "Alt text", "100vw", "rounded-lg" %}
```

Images are automatically optimized to WebP/JPEG with multiple sizes.

### Code Highlighting

Use fenced code blocks with language:

<pre>
```javascript
function hello() {
  console.log("Hello, World!");
}
```
</pre>

## Project Structure

```
blog/
├── src/
│   ├── _data/
│   │   └── site.json          # Site configuration
│   ├── _includes/             # Include templates
│   ├── _layouts/              # Layout templates
│   │   ├── base.njk           # Base layout
│   │   └── post.njk           # Post layout
│   ├── assets/                # Static assets
│   ├── posts/                 # Blog posts
│   │   ├── posts.json         # Default post settings
│   │   └── YYYY-MM-DD-*.md    # Post files
│   ├── styles/
│   │   └── input.css          # Tailwind entry
│   ├── index.njk              # Homepage
│   ├── tags.njk               # Tags list page
│   └── tags-tag.njk           # Individual tag page
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions for deployment
├── eleventy.config.js         # Eleventy configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## Deployment to Cloudflare Pages

### 1. Create Cloudflare Pages Project

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your GitHub repository
4. Choose "Direct upload" or "Connect to Git"

### 2. Set Up GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `CLOUDFLARE_PROJECT_NAME` - Your Pages project name
- `CLOUDFLARE_API_TOKEN` - API token with Pages:Edit permission

To create an API token:
1. Go to Cloudflare dashboard → My Profile → API Tokens
2. Create token with **Cloudflare Pages:Edit** permission

### 3. Configure Build Settings (if using Git integration)

If connecting directly in Cloudflare dashboard:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory | `blog` (if repo root is different) |

### 4. Deploy

Push to the `main` branch - GitHub Actions will automatically deploy to Cloudflare Pages!

```bash
git add .
git commit -m "Initial blog setup"
git push origin main
```

## Customization

### Site Config

Edit `src/_data/site.json`:

```json
{
  "title": "Your Blog Name",
  "description": "Your blog description",
  "url": "https://your-blog.pages.dev",
  "author": "Your Name"
}
```

### Colors & Styling

Modify `tailwind.config.js` and `src/styles/input.css` to customize the design.

## License

MIT
