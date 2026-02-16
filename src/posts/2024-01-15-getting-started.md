---
title: Getting Started with My Blog
date: 2024-01-15
description: Welcome to my new blog! Here's what you need to know to get started.
tags:
  - eleventy
  - getting-started
---

[[toc]]

Welcome to my new blog! This post will walk you through the features and how to use them.

## Features Overview

This blog is built with [Eleventy](https://www.11ty.dev/) (11ty), a simple static site generator. Here are some of the key features:

- **Date-based URLs**: Posts are organized by year and month
- **Tags**: Organize posts with tags
- **Table of Contents**: Automatic TOC generation for posts
- **Image Optimization**: Automatic image optimization with WebP support
- **RSS Feed**: Subscribe to updates

## Writing Posts

Posts are written in Markdown and stored in the `src/posts/` directory. The filename format should be `YYYY-MM-DD-title.md`.

### Front Matter

Each post starts with front matter:

```yaml
---
title: Your Post Title
date: 2024-01-15
description: A brief description
tags:
  - tag1
  - tag2
---
```

### Table of Contents

To add a table of contents, simply include `[[toc]]` at the beginning of your post content. The TOC will automatically generate links to all H2, H3, and H4 headings.

## Images

To add images with optimization, use the image shortcode:

```njk
{% raw %}{% image "./src/assets/images/photo.jpg", "Alt text", "100vw", "my-image-class" %}{% endraw %}
```

This will automatically generate responsive images in WebP and JPEG formats.

## Next Steps

Happy blogging! 🚀
