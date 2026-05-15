"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  total: number;
  page: number;
  perPage: number;
}

export default function Pagination({ total, page, perPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/?${params.toString()}`);
  }

  return (
    <nav className="flex items-center gap-4 mt-8 text-sm">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      <span className="text-gray-500">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </nav>
  );
}
