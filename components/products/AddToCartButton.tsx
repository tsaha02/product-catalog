"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/cart";

interface Props {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
}

export default function AddToCartButton({ productId, title, thumbnail, price }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await addToCart(productId, title, thumbnail, price);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-6 py-2 bg-gray-900 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
    >
      {isPending ? "Adding…" : "Add to Cart"}
    </button>
  );
}
