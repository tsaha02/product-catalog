import { cache } from "react";
import type { Product, ProductsResponse } from "@/lib/types";

const BASE = "https://dummyjson.com";

// force-cache: catalog data rarely changes
export async function getProducts(limit = 20, skip = 0, category?: string) {
  const url = category
    ? `${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    : `${BASE}/products?limit=${limit}&skip=${skip}`;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<ProductsResponse>;
}

// force-cache: category list never changes at runtime
export async function getCategories() {
  const res = await fetch(`${BASE}/products/category-list`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<string[]>;
}

// React.cache so generateMetadata and the page share one fetch per request
// revalidate: 3600 — product detail is stable enough to cache for an hour
export const getProduct = cache(async (id: number) => {
  const res = await fetch(`${BASE}/products/${id}`, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json() as Promise<Product>;
});

// no-store: related products should reflect current stock, not a cached snapshot
export async function getRelatedProducts(category: string, excludeId: number, limit = 4) {
  const res = await fetch(
    `${BASE}/products/category/${encodeURIComponent(category)}?limit=10`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as ProductsResponse;
  return data.products.filter((p) => p.id !== excludeId).slice(0, limit);
}

// no-store: search results depend on user input, can't cache them
export async function searchProducts(q: string, limit = 20, skip = 0) {
  const res = await fetch(
    `${BASE}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json() as Promise<ProductsResponse>;
}

// force-cache: used only in generateStaticParams at build time
export async function getTopProductIds() {
  const res = await fetch(`${BASE}/products?limit=20`, { cache: "force-cache" });
  if (!res.ok) return [];
  const data = (await res.json()) as ProductsResponse;
  return data.products.map((p) => p.id);
}
