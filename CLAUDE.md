# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (Turbopack, localhost:3000)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

This is a **Next.js 16.2.2** App Router project with TypeScript and Tailwind CSS v4.

- `app/` — App Router. All routes, layouts, and pages go here.
- `app/layout.tsx` — Root layout (Geist fonts, metadata)
- `app/globals.css` — Global styles via Tailwind v4 (`@import "tailwindcss"`)
- `public/` — Static assets
- `next.config.ts` — TypeScript-based Next.js config
- `postcss.config.mjs` — Uses `@tailwindcss/postcss` (Tailwind v4)
- `eslint.config.mjs` — ESLint flat config (v9)

Path alias `@/*` maps to the project root.

## Next.js 16 Breaking Changes

The full version guide is at `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`. Key breaking changes:

**Async Request APIs** — synchronous access is fully removed. These must be awaited:
- `cookies()`, `headers()`, `draftMode()`
- `params` in layouts, pages, routes, image files
- `searchParams` in pages

```tsx
// Correct in v16
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const query = await props.searchParams
}
```

Run `npx next typegen` to generate `PageProps`, `LayoutProps`, and `RouteContext` helper types.

**`middleware` → `proxy`** — rename `middleware.ts` to `proxy.ts` and the exported function to `proxy`. The `edge` runtime is not supported in `proxy`; use `middleware` if you need edge.

**Turbopack by default** — `next dev` and `next build` use Turbopack. Custom `webpack` config in `next.config.ts` will break builds. Use `--webpack` flag to opt out, or migrate config to `turbopack:` (top-level, no longer under `experimental`).

**PPR** — `experimental.ppr` is removed. Use `cacheComponents: true` in `next.config` instead.

**Caching APIs** — `unstable_` prefix removed from `cacheLife` and `cacheTag`. New APIs: `updateTag` (immediate refresh, Server Actions only) and `refresh` (refresh client router from Server Action).

**`next/image`** — local images with query strings require `images.localPatterns.search` config. Default `minimumCacheTTL` changed from 60s → 4 hours. `16` removed from default `imageSizes`.
