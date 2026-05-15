"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={images[selected]}
          alt={`${title} — image ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`Image ${i + 1}`}
              className={`relative w-14 h-14 bg-gray-100 border ${i === selected ? "border-gray-900" : "border-gray-200"}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
