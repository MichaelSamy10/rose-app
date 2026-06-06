'use client';

import ProductItem from '../product/product-item';
import { Product } from '@/lib/types/product';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useAllOccasions from '@/hooks/use-all-occasions';
import useProductsByOccasions from '@/hooks/use-products-by-occasions';
import MostPopularSkeleton from '@/components/skeleton/most-popular-skeleton';

export default function MostPopular() {
  // ^ 1 // Hooks
  const { activeOccasion, setActiveOccasion, occasions } =
    useAllOccasions();

  const { products } = useProductsByOccasions({
    activeOccasion,
  });

  // ^ 2 // Conditional Rendering
  if (!products) {
    return <MostPopularSkeleton />;
  }

  return (
    <section className="mx-auto">
      {/* tabs */}
      <div className="my-5 flex items-center justify-between">
        {/* ToDo : hady is working on the component  */}
        <div className="text-2xl font-bold text-maroon-700 dark:text-pink-200">
          <h2>Most Popular</h2>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          {occasions?.map(occasion => (
            <button
              key={occasion._id}
              onClick={() =>
                setActiveOccasion(occasion._id)
              }
              className={
                activeOccasion === occasion._id
                  ? 'text-maroon-600 dark:text-pink-200'
                  : 'text-zinc-700 dark:text-zinc-400'
              }
            >
              {occasion.name}
            </button>
          ))}
        </div>
      </div>

      {/* product */}
      <div className="grid grid-cols-4 gap-4">
        {products?.map((product: Product) => (
          <ProductItem
            _id={product._id}
            href={`/products/${product._id}`}
            key={product._id}
            imgCover={product.imgCover}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            rateAvg={product.rateAvg}
          />
        ))}
      </div>

      <Link
        href={`/product`}
        className="text-semibold flex items-center justify-end gap-2 p-2 text-maroon-700"
      >
        View Product
        <ArrowRight />
      </Link>
    </section>
  );
}
