"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Cart, CartItem } from "@/lib/types";

async function getCart(): Promise<Cart> {
  const store = await cookies();
  const raw = store.get("cart")?.value;
  if (!raw) return { items: [] };
  try {
    return JSON.parse(raw) as Cart;
  } catch {
    return { items: [] };
  }
}

async function saveCart(cart: Cart) {
  const store = await cookies();
  store.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
}

export async function addToCart(productId: number, title: string, thumbnail: string, price: number) {
  const cart = await getCart();
  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ productId, title, thumbnail, price, quantity: 1 });
  }
  await saveCart(cart);
  revalidatePath("/");
  revalidatePath("/cart");
}

export async function updateCartQty(productId: number, delta: number): Promise<CartItem[]> {
  const cart = await getCart();
  const item = cart.items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = Math.max(0, item.quantity + delta);
    if (item.quantity === 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    }
  }
  await saveCart(cart);
  revalidatePath("/cart");
  return cart.items;
}

export async function removeFromCart(productId: number): Promise<CartItem[]> {
  const cart = await getCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  await saveCart(cart);
  revalidatePath("/cart");
  return cart.items;
}

export async function getCartItems() {
  const cart = await getCart();
  return cart.items;
}
