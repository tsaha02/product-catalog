import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="py-20 text-center">
      <p className="text-gray-500 mb-4">Your cart is empty.</p>
      <Link href="/" className="text-sm underline text-gray-700 hover:text-gray-900">
        Browse products
      </Link>
    </div>
  );
}
