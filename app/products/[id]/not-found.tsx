import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-gray-700 mb-2">Product not found.</p>
      <Link href="/" className="text-sm underline text-gray-600 hover:text-gray-900">
        Browse products
      </Link>
    </div>
  );
}
