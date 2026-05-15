import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getTopProductIds } from "@/lib/api";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import AddToCartButton from "@/components/products/AddToCartButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import StarRating from "@/components/products/StarRating";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getTopProductIds();
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 155),
      images: [{ url: product.thumbnail, width: 400, height: 400, alt: product.title }],
    },
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="flex flex-col gap-3">
          {product.brand && (
            <p className="text-xs text-gray-400 uppercase">{product.brand}</p>
          )}
          <h1 className="text-xl font-semibold">{product.title}</h1>

          <StarRating rating={product.rating} />

          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-red-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          <div className="mt-2">
            <AddToCartButton
              productId={product.id}
              title={product.title}
              thumbnail={product.thumbnail}
              price={discountedPrice}
            />
          </div>

          <table className="mt-4 text-sm text-gray-600 w-full">
            <tbody>
              <tr>
                <td className="py-1 text-gray-400 w-1/3">Category</td>
                <td className="capitalize">{product.category.replace(/-/g, " ")}</td>
              </tr>
              {product.tags.length > 0 && (
                <tr>
                  <td className="py-1 text-gray-400">Tags</td>
                  <td>{product.tags.join(", ")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="mb-8" />

      <Suspense fallback={<p className="text-sm text-gray-400">Loading related products…</p>}>
        <RelatedProducts category={product.category} excludeId={product.id} />
      </Suspense>
    </div>
  );
}
