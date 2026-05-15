# product-catalog

Next.js 15 take-home project. Product listing, detail pages, and a cart. Data from [DummyJSON](https://dummyjson.com).

## Setup

```bash
npm install
npm run dev
```

## Live

https://product-catalog-drab-gamma.vercel.app

---

## Notes

Server Components by default, `"use client"` only where actually needed — URL updates, image gallery, cart controls.

Each fetch in `lib/api.ts` has a comment explaining the cache choice. Cart is stored in a cookie (not localStorage) so the server can read it directly for the navbar badge. `useOptimistic` handles qty changes in the cart so the UI doesn't wait on the server action.

The first 20 product pages are statically generated via `generateStaticParams`. Search hits `/products/search` with a 400ms debounce on the URL param.

Would add tests and a real checkout given more time.
