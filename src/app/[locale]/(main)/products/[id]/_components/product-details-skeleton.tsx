import React from 'react';

export default function ProductDetailsSkeleton() {
  return (
    <div className="container m-auto mb-12 mt-16 flex h-128 w-11/12 animate-pulse flex-row gap-16">
      {/* Gallery Skeleton */}
      <div className="flex w-1/2 flex-col gap-4">
        {/* Main Image Skeleton */}
        <div className="h-100 w-full rounded-xl bg-zinc-200 dark:bg-zinc-700" />

        {/* Thumbnails Skeleton */}
        <div className="flex flex-row gap-4">
          <div className="h-28 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-28 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-28 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex w-1/2 flex-col">
        {/* Title and Price Section */}
        <div className="border-b-2 border-b-zinc-100 pb-4 dark:border-b-zinc-700">
          <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-4 flex flex-row gap-3">
            <div className="h-8 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-8 w-40 rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>

        {/* Rating Skeleton */}
        <div className="mt-4 flex flex-row items-center gap-3 border-b-2 border-b-zinc-100 pb-4 dark:border-b-zinc-700">
          <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Description Skeleton */}
        <div className="mt-4 h-72 space-y-3 overflow-hidden">
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-4/6 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-4 flex gap-2">
          {/* Wishlist Button Placeholder */}
          <div className="h-10 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          {/* Add to Cart Button Placeholder */}
          <div className="h-10 flex-1 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
