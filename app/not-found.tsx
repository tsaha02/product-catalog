import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-2xl font-semibold text-gray-800 mb-2">404</p>
      <p className="text-gray-500 mb-4">Page not found.</p>
      <Link href="/" className="text-sm underline text-gray-600 hover:text-gray-900">
        Go home
      </Link>
    </div>
  );
}
