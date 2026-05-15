import type { MetadataRoute } from "next";
import { getTopProductIds } from "@/lib/api";

const BASE = "https://product-catalog-drab-gamma.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await getTopProductIds();

  const productUrls = ids.map((id) => ({
    url: `${BASE}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/cart`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
    ...productUrls,
  ];
}
