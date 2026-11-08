# Project Context: idenrai.github.io

## Overview
idenrai.github.io is a personal technical blog and website built with Astro and Tailwind CSS.
It delivers content using Markdown / MDX posts, features tag-based categorization, full-text search, RSS feeds, and responsive typography.

## Tech Stack
- **Framework**: Astro (v4)
- **Styling**: Tailwind CSS (v3) + `@tailwindcss/typography`
- **Content**: Markdown (`.md`) and MDX (`.mdx`) located in `src/content/blog/`
- **Linting**: `markdownlint-cli2`
- **Package Manager**: npm

## Content Conventions
- All blog posts must specify proper frontmatter: `title`, `description`, `pubDate`, `tags`.
- Adhere to clean markdown rules (`npm run lint:md`).

