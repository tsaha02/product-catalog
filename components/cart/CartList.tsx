"use client";

import { useOptimistic, useTransition } from "react";
import Image from "next/image";
import { updateCartQty, removeFromCart } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

export default function CartList({ items }: { items: CartItem[] }) {
  const [optimistic, setOptimistic] = useOptimistic(
    items,
    (_: CartItem[], next: CartItem[]) => next
  );
  const [, startTransition] = useTransition();

  const total = optimistic.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function changeQty(productId: number, delta: number) {
    const next = optimistic
      .map((i) => i.productId === productId ? { ...i, quantity: i.quantity + delta } : i)
      .filter((i) => i.quantity > 0);
    startTransition(async () => {
      setOptimistic(next);
      await updateCartQty(productId, delta);
    });
  }

  function remove(productId: number) {
    const next = optimistic.filter((i) => i.productId !== productId);
    startTransition(async () => {
      setOptimistic(next);
      await removeFromCart(productId);
    });
  }

  return (
    <div>
      <ul className="divide-y border">
        {optimistic.map((item) => (
          <li key={item.productId} className="flex gap-4 p-4 bg-white">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100">
              <Image src={item.thumbnail} alt={item.title} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => changeQty(item.productId, -1)}
                    className="w-6 h-6 border flex items-center justify-center hover:bg-gray-50"
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => changeQty(item.productId, 1)}
                    className="w-6 h-6 border flex items-center justify-center hover:bg-gray-50"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <button
                  onClick={() => remove(item.productId)}
                  className="text-xs text-gray-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-medium flex-shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4 flex flex-col gap-2 max-w-xs ml-auto">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{optimistic.reduce((s, i) => s + i.quantity, 0)} items</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="mt-2 w-full py-2 bg-gray-900 text-white text-sm hover:bg-gray-700"
          onClick={() => alert("Checkout is out of scope for this demo.")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
