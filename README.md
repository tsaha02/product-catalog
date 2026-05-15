# Product Catalog

A small e-commerce product catalog built with Next.js 15 App Router, TypeScript, and Tailwind. Uses [DummyJSON](https://dummyjson.com) as the data source.

## Running locally

```bash
npm install
npm run dev
```

## Live URL

> Add after Vercel deployment

---

## How it works

**3 pages:** product listing (`/`), product detail (`/products/[id]`), cart (`/cart`).

Everything is a Server Component by default. I only added `"use client"` where I actually needed browser APIs or hooks — the category filter, pagination, and search input update the URL client-side, the image gallery tracks the selected image, the cart list uses `useOptimistic` for instant qty feedback.

**Search:** the listing page reads `?q=` from `searchParams` and hits DummyJSON's search endpoint. The input debounces with a plain `setTimeout` (400ms) and pushes to the URL — no library needed. Searching clears the active category filter since the two don't combine in DummyJSON's API.

**Caching:** the product listing and category list use `force-cache` since they don't change mid-session. Product detail pages use `revalidate: 3600` (ISR). Related products and search results use `no-store` because they need to be fresh. The comments above each fetch in `lib/api.ts` explain the choice.

**Cart:** stored as a JSON cookie so it's readable server-side. The navbar badge is rendered by a Server Component that reads the cookie directly — no client JS needed for the count. Cart mutations are Server Actions that call `revalidatePath` so the badge and cart page stay in sync.

**Static generation:** the first 20 product detail pages are pre-built with `generateStaticParams`. Each has its own `generateMetadata` for title and OG image.

## What I skipped

- Tests (Server Actions are straightforward to test with a mocked `cookies()`)
- Checkout flow (out of scope per brief)
