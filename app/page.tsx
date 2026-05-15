import { Suspense } from "react";
import { getProducts, getCategories, searchProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import Pagination from "@/components/products/Pagination";
import SearchInput from "@/components/products/SearchInput";

const PER_PAGE = 20;

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { category, page: pageStr, q } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const skip = (page - 1) * PER_PAGE;

  const [productsData, categories] = await Promise.all([
    q ? searchProducts(q, PER_PAGE, skip) : getProducts(PER_PAGE, skip, category),
    getCategories(),
  ]);

  const heading = q
    ? `Results for "${q}"`
    : category
    ? category.replace(/-/g, " ")
    : "All Products";

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <h1 className="text-lg font-semibold capitalize flex-1">{heading}</h1>
        <Suspense fallback={null}>
          <SearchInput defaultValue={q} />
        </Suspense>
      </div>

      {!q && (
        <div className="mb-5">
          <Suspense fallback={<p className="text-sm text-gray-400">Loading filters…</p>}>
            <CategoryFilter categories={categories} selected={category} />
          </Suspense>
        </div>
      )}

      {productsData.products.length === 0 ? (
        <p className="text-gray-500 py-16 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {productsData.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination total={productsData.total} page={page} perPage={PER_PAGE} />
      </Suspense>
    </div>
  );
}
