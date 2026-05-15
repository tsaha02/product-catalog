"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: string[];
  selected?: string;
}

export default function CategoryFilter({ categories, selected }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function select(cat: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        onClick={() => select(null)}
        className={`px-3 py-1 text-sm border ${!selected ? "bg-gray-900 text-white border-gray-900" : "text-gray-600 hover:border-gray-400"}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => select(cat)}
          className={`px-3 py-1 text-sm border capitalize ${selected === cat ? "bg-gray-900 text-white border-gray-900" : "text-gray-600 hover:border-gray-400"}`}
        >
          {cat.replace(/-/g, " ")}
        </button>
      ))}
    </div>
  );
}
