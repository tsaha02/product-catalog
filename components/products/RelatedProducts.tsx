import { getRelatedProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  excludeId: number;
}

export default async function RelatedProducts({ category, excludeId }: Props) {
  const products = await getRelatedProducts(category, excludeId, 4);
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold mb-4">More from this category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
