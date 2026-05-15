import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import StarRating from "./StarRating";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block border bg-white overflow-hidden hover:border-gray-400"
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        {product.brand && (
          <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
        )}
        <p className="text-sm text-gray-900 line-clamp-2 mb-1">{product.title}</p>
        <StarRating rating={product.rating} />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-red-600">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
