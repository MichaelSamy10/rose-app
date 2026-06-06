import ProductItemSkeleton from '@/components/skeleton/product-item.skeleton';
import React from 'react';

export default function BestSellingSkeleton() {
  return (
    <div
      className="mx-auto mt-24 grid w-11/12 animate-pulse grid-cols-1 items-start gap-8 md:grid-cols-4"
      aria-hidden
    >
      {/* left content skeleton */}
      <div className="col-span-1 space-y-4 p-3">
        <div className="h-6 w-40 rounded bg-zinc-200" />
        <div className="h-10 w-full rounded bg-zinc-200" />
        <div className="h-24 w-full rounded bg-zinc-200" />
        <div className="h-10 w-40 rounded bg-zinc-200" />
      </div>

      {/* right carousel skeleton */}
      <div className="col-span-3 grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
          >
            <ProductItemSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
