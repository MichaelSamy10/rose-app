import ProductItemSkeleton from '@/components/skeleton/product-item.skeleton';
import React from 'react';

export default function MostPopularSkeleton() {
  return (
    <section className="mx-auto mt-16 w-11/12" aria-hidden>
      {/* heading + tabs skeleton */}
      <div className="my-5 flex animate-pulse items-center justify-between">
        <div className="text-2xl font-bold text-maroon-700">
          <div className="h-6 w-48 rounded bg-zinc-200" />
        </div>

        <div className="flex gap-4 text-sm font-medium">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 rounded bg-zinc-200"
            />
          ))}
        </div>
      </div>

      {/* product grid skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
          >
            <ProductItemSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
