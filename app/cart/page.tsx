import type { Metadata } from "next";
import { getCartItems } from "@/lib/cart";
import CartList from "@/components/cart/CartList";
import EmptyCart from "@/components/cart/EmptyCart";

export const metadata: Metadata = { title: "Cart" };

export default async function CartPage() {
  const items = await getCartItems();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartList items={items} />
      )}
    </div>
  );
}
