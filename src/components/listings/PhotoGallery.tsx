"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div key={i} className="relative aspect-square w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-4 bg-marigold-500" : "w-1.5 bg-coffee-950/20"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
