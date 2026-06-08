import CategoryFilter from './_components/filter/category-filter';
import RatingFilter from './_components/filter/rating-filter';
import ResetAllFilters from './_components/filter/reset-all-filter';
import React, { Suspense } from 'react';
import ProductsList from './_components/products-list';
import ProductsListSkeleton from './_skeleton/products-list.skeleton';
import { BuildSearchparamsProps } from '@/components/features/build-searchparams';

export default function ProductPage({
  searchParams,
}: BuildSearchparamsProps) {
  return (
    <div className="container mx-auto mb-44 mt-12 grid w-11/12 grid-cols-4 gap-6">
      <div className="filtration col-span-1 space-y-6 border-b border-zinc-100 p-2 pr-6 *:py-2 md:border-b-0 md:border-e">
        {/* By Category */}
        <CategoryFilter searchParams={searchParams} />

        {/* By Rating */}
        <RatingFilter searchParams={searchParams} />

        {/* Reset All Filters */}
        <ResetAllFilters />
      </div>

      {/* display products */}
      <div className="products-content col-span-1 border-b border-zinc-100 pb-6 pe-5 md:col-span-2 lg:col-span-3">
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList
            queryString={new URLSearchParams(
              searchParams,
            ).toString()}
          />
        </Suspense>
      </div>
    </div>
  );
}
