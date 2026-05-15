"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-20 text-center">
      <p className="text-gray-700 mb-4">Something went wrong.</p>
      <button
        onClick={reset}
        className="text-sm underline text-gray-600 hover:text-gray-900"
      >
        Try again
      </button>
    </div>
  );
}
