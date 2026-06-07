'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductItem from '../product/product-item';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import useBestSellingProducts from '@/hooks/use-products-best-selling';
import BestSellingSkeleton from '@/components/skeleton/best-selling-skeleton';
import { useTranslations } from 'next-intl';

export default function BestSelling() {
  // Translation
  const t = useTranslations('pages.home.best-selling');

  // ^  Get products
  const { data, isLoading } = useBestSellingProducts();

  if (isLoading) {
    return <BestSellingSkeleton />;
  }

  return (
    <section className="mx-auto mb-32 mt-24 grid grid-cols-4 items-center gap-12">
      {/* ^ part one */}
      <div className="bg-warning-200 col-span-1 space-y-5">
        <h3 className="text-xl font-semibold tracking-widest text-pink-500 dark:text-maroon-400">
          {t('header.title')}
        </h3>
        <h4 className="text-3xl font-bold text-maroon-700 dark:text-pink-200">
          {t.rich('header.description', {
            span: (chunk: React.ReactNode) => (
              <span className="text-pink-500 dark:text-maroon-400">
                {chunk}
              </span>
            ),
          })}
        </h4>
        <p className="text-sm text-muted-foreground text-zinc-500 dark:text-zinc-400">
          {t('description')}
        </p>

        <Button className="flex items-center justify-center gap-5 rounded-lg bg-maroon-600 px-4 py-2 text-white dark:bg-pink-200 dark:text-zinc-800">
          {t('button')}{' '}
          <ArrowRight className="rtl:rotate-180" />
        </Button>
      </div>

      {/* ^ part two */}

      <div className="col-span-3 w-full">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <div className="w-full overflow-x-hidden overflow-y-visible">
            <CarouselContent>
              {data?.map((product: Product) => (
                <CarouselItem
                  key={product._id}
                  className="flex basis-1/3 items-center justify-center"
                >
                  <ProductItem
                    _id={product._id}
                    href={`/products/${product._id}`}
                    imgCover={product.imgCover}
                    title={product.title}
                    price={product.price}
                    priceAfterDiscount={
                      product.priceAfterDiscount
                    }
                    rateAvg={product.rateAvg}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <CarouselPrevious className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
          <CarouselNext className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
        </Carousel>
      </div>
    </section>
  );
}
