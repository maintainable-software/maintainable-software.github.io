# SEO / GEO / Shareability Plan

## Assumptions

- Only these posts should be public right now:
  - Part 1: `agentic-engineering-part-1-introduction`
  - Part 2: `agentic-engineering-part-2-agentic-codebase-principles`
- There is no DEA article to publish right now.
- Part 3 and Part 4 exist as future drafts and must not be publicly routable or indexable yet.

## Goal

Make SEO the default, GEO a natural extension of the same setup, and social sharing predictable, while keeping the publishing model simple and static-first.

## Phase 1: Fix Publication Control (done)

### Why first

The current app publishes every Markdown file under `content/posts/`. That is the largest correctness problem because unfinished posts are currently part of the public crawl surface.

### Changes

- Add an explicit publish flag to post frontmatter.
  - Recommended field: `published: true | false`
- Update post loading so only published posts are returned by default.
- Ensure draft posts are excluded from:
  - homepage listing
  - `/posts/`
  - `/tags/`
  - `generateStaticParams()`
  - sitemap generation
- Decide whether drafts stay in `content/posts/` or move to a separate draft folder.
  - Simpler option: keep them in place and filter by `published`

### Files

- `lib/posts.ts`
- `content/posts/*.md`
- `app/[slug]/page.tsx`
- `app/page.tsx`
- `app/posts/page.tsx`
- `app/tags/page.tsx`

### Acceptance criteria

- Only Part 1 and Part 2 generate routes.
- Part 3 and Part 4 do not appear anywhere publicly.
- No internal links point to unpublished pages.

## Phase 2: Add Crawl and Index Controls

### Why second

Once the public set is correct, search engines and AI-oriented crawlers need explicit discovery and policy surfaces.

### Changes

- Add `app/robots.ts`
  - Allow public content
  - Expose sitemap location
  - Decide whether to allow or disallow training-oriented crawlers separately from search-oriented crawlers
- Add `app/sitemap.ts`
  - Include homepage
  - Include published post URLs only
  - Include about/author/tags/posts pages if they remain index-worthy
- Add `metadataBase` to root metadata so canonicals and OG URLs have a consistent site base

### Files

- `app/robots.ts`
- `app/sitemap.ts`
- `app/layout.tsx`

### Acceptance criteria

- `/robots.txt` exists
- `/sitemap.xml` exists
- sitemap contains only intended public URLs

## Phase 3: Strengthen Site-Level Metadata

### Why third

Post pages are already in reasonable shape. The rest of the site still shares generic metadata, which weakens both SEO and link previews.

### Changes

- Add route metadata for:
  - `/`
  - `/about/`
  - `/me/`
  - `/posts/`
  - `/tags/`
  - `/imprint/`
- Make titles descriptive and page-specific
- Add useful descriptions for non-post pages
- Add canonical URLs where appropriate
- Add Open Graph and Twitter metadata for important non-post pages

### Files

- `app/page.tsx`
- `app/about/page.tsx`
- `app/me/page.tsx`
- `app/posts/page.tsx`
- `app/tags/page.tsx`
- `app/imprint/page.tsx`

### Acceptance criteria

- Sharing any major page produces a sensible title and description
- non-post pages no longer inherit only the root default metadata

## Phase 4: Fix Author and Publisher Entity Signals

### Why fourth

Right now the author link on posts points to a placeholder page. That breaks the trust chain for both people and machines.

### Changes

- Turn `/me/` into the canonical author page
- Put real author information there:
  - full name
  - short bio
  - relevant experience
  - external profile links where appropriate
- Decide the relationship between `/about/` and `/me/`
  - Best option: `/me/` = author page, `/about/` = publication page
- Add structured data:
  - `Person` on `/me/`
  - `WebSite` and `Organization` in the global layout or home page

### Files

- `app/me/page.tsx`
- `app/about/page.tsx`
- `app/layout.tsx`

### Acceptance criteria

- Every article author link resolves to a meaningful author page
- site has explicit publisher and author entities in structured data

## Phase 5: Improve Article Page Retrieval Quality

### Why fifth

The live articles are already readable, but they still leave some retrieval and trust value on the table.

### Changes

- Render visible `Updated` dates when available
- Show a short visible summary near the top when `teaser` exists
- Keep title, summary, author, published, and updated together in the article header
- Add a lightweight "Related posts" or "Series" block based only on published content
- Remove or rewrite links to unreleased parts
  - use plain text "coming later" instead of live links until published

### Files

- `app/[slug]/page.tsx`
- `content/posts/2026-03-28-agentic-engineering-part-1-introduction.md`
- `content/posts/2026-03-28-agentic-engineering-part-2-agentic-codebase-principles.md`

### Acceptance criteria

- live posts show both published and updated information when available
- Part 1 and Part 2 reference each other cleanly without leaking future URLs

## Phase 6: Add Site-Wide Structured Data

### Why sixth

You already have `BlogPosting` for articles. The site still lacks higher-level entity and navigation semantics.

### Changes

- Add `WebSite` JSON-LD
- Add `Organization` JSON-LD for the publication
- Add `Person` JSON-LD on the author page
- Add `BreadcrumbList` JSON-LD on article pages

### Files

- `app/layout.tsx`
- `app/me/page.tsx`
- `app/[slug]/page.tsx`

### Acceptance criteria

- articles expose both `BlogPosting` and breadcrumb semantics
- site-level entities are machine-readable and consistent

## Phase 7: Improve Information Architecture

### Why seventh

The current URL structure is acceptable, but the topic and journey model is still thin for a programming publication.

### Changes

- Keep the clean slug model
- Decide whether `/tags/` stays a single hub or evolves into dedicated tag routes
  - For a very small site, the current hub is fine
  - Once the post count grows, dedicated topic pages will be stronger
- Add a lightweight series model
  - series slug
  - series title
  - series order
- If only Part 1 and Part 2 are live, expose the series as:
  - current installments
  - future parts coming later

### Files

- `lib/posts.ts`
- `content/posts/*.md`
- `app/[slug]/page.tsx`
- optionally new routes if series pages are added later

### Acceptance criteria

- the two live posts form a coherent cluster
- future installments are signaled without being published prematurely

## Phase 8: Review Low-Value Pages for Indexation

### Why eighth

Not every page needs to be indexed. Thin utility pages can dilute crawl focus if they do not add value.

### Changes

- Decide whether `/imprint/` should be indexed
- Decide whether `/posts/` and `/tags/` deserve indexation in their current form
- If a page is too thin, improve it or mark it `noindex`

### Files

- `app/imprint/page.tsx`
- `app/posts/page.tsx`
- `app/tags/page.tsx`

### Acceptance criteria

- only pages with real user value are indexable
- no obviously thin page competes with article pages in search

## Phase 9: Content Template Hardening

### Why ninth

Once the platform basics are fixed, the long-term win comes from making each future article easier to retrieve, quote, and trust.

### Changes

- Standardize post frontmatter:
  - `title`
  - `description`
  - `date`
  - `updated`
  - `author`
  - `author_url`
  - `canonical_url`
  - `image`
  - `tags`
  - `teaser`
  - `published`
  - optional `series`
  - optional `series_order`
- Standardize article structure:
  - summary near top
  - stable headings
  - visible freshness information
  - related links
  - version/testing context where applicable

### Files

- `lib/posts.ts`
- `content/posts/*.md`

### Acceptance criteria

- new posts naturally inherit the SEO/GEO model instead of needing cleanup later

## Recommended Execution Order

1. Phase 1: publication control
2. Phase 2: robots + sitemap + metadata base
3. Phase 4: real author page
4. Phase 3: route metadata for non-post pages
5. Phase 5: visible article freshness + summary + related links
6. Phase 6: site-wide structured data
7. Phase 7: series model
8. Phase 8: indexation review
9. Phase 9: content template hardening

## Short-Term Definition of Done

The site is in a good baseline state when all of the following are true:

- only Part 1 and Part 2 are publicly routable
- draft/future posts are not listed or indexed
- robots and sitemap exist
- every public route has route-specific metadata
- `/me/` is a real author page
- articles visibly show published and updated dates
- articles expose `BlogPosting` plus breadcrumb data
- future parts are referenced without publishing them
