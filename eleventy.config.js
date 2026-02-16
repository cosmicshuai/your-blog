import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyImage from "@11ty/eleventy-img";
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTOC from "markdown-it-table-of-contents";

// Image shortcode for optimization
async function imageShortcode(src, alt, sizes = "100vw", classes = "") {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on image from: ${src}`);
  }

  let metadata = await eleventyImage(src, {
    widths: [400, 800, 1200, 1600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    class: classes,
    loading: "lazy",
    decoding: "async",
  };

  return eleventyImage.generateHTML(metadata, imageAttributes);
}

export default function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("./src/styles/output.css");
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  // Image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj, format) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return new Date(dateObj).getFullYear();
  });

  eleventyConfig.addFilter("dateMonth", (dateObj) => {
    return String(new Date(dateObj).getMonth() + 1).padStart(2, "0");
  });

  // Collection: Posts (sorted by date, reverse chronological)
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("./src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collection: Tags
  eleventyConfig.addCollection("tagList", (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags = tags.filter((tag) => !["posts", "all"].includes(tag));
        for (const tag of tags) {
          tagsSet.add(tag);
        }
      }
    });
    return Array.from(tagsSet).sort();
  });

  // Get posts by tag
  eleventyConfig.addFilter("getByTag", (collection, tag) => {
    if (!tag) return collection;
    return collection.filter((item) => {
      const tags = item.data.tags || [];
      return tags.includes(tag);
    });
  });

  // Limit filter for pagination
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Head filter (for excerpts)
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Markdown configuration with TOC and anchor links
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "anchor-link",
        symbol: "#",
        ariaLabel: "Permalink to this heading",
        wrapper: ['<span class="heading-wrapper">', "</span>"],
      }),
      slugify: (s) =>
        encodeURIComponent(
          String(s)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
        ),
    });

    mdLib.use(markdownItTOC, {
      includeLevel: [2, 3, 4],
      containerClass: "toc",
      containerHeaderHtml: '<h2 class="toc-title">Table of Contents</h2>',
      listType: "ul",
      linkClass: "toc-link",
    });
  });

  // Date-based permalinks for posts
  eleventyConfig.addPreprocessor("date-permalink", "md", (data) => {
    if (data.tags && data.tags.includes("posts") && data.date) {
      const date = new Date(data.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const slug = data.page.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      data.permalink = `/${year}/${month}/${slug}/`;
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
