"use client";

import { useState } from "react";
import NavActiveLink from "./NavActiveLink";

interface Props {
  cartCount: number;
}

export default function MobileMenu({ cartCount }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="text-sm text-gray-600 border px-3 py-1"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b z-50 px-4 py-4 flex flex-col gap-4 text-sm">
          <NavActiveLink
            href="/"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            Home
          </NavActiveLink>
          <NavActiveLink
            href="/cart"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </NavActiveLink>
        </div>
      )}
    </div>
  );
}
