import Link from "next/link";
import { cookies } from "next/headers";
import NavActiveLink from "./NavActiveLink";
import MobileMenu from "./MobileMenu";
import type { Cart } from "@/lib/types";

async function getCartCount(): Promise<number> {
  const store = await cookies();
  const raw = store.get("cart")?.value;
  if (!raw) return 0;
  try {
    const cart = JSON.parse(raw) as Cart;
    return cart.items.reduce((sum, i) => sum + i.quantity, 0);
  } catch {
    return 0;
  }
}

export default async function Navbar() {
  const cartCount = await getCartCount();

  return (
    <header className="border-b bg-white">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900">
          ShopCatalog
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavActiveLink
            href="/"
            className="text-gray-600 hover:text-gray-900"
          >
            Home
          </NavActiveLink>
          <NavActiveLink
            href="/cart"
            className="text-gray-600 hover:text-gray-900"
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </NavActiveLink>
        </div>

        <MobileMenu cartCount={cartCount} />
      </nav>
    </header>
  );
}
