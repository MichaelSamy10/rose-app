import React, { Suspense } from 'react';
import UpdateProductForm from './_components/update-product-form';
import { Product } from '@/lib/types/product';
import { getProductDetailsService } from '@/lib/services/product-details.service';
import {
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import UpdateProductFormSkeleton from './_skeleton/update-product-form-skeleton';

export default async function UpdateProduct({
  params,
}: {
  params: { locale: 'en' | 'ar'; id: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations(
    'pages.dashboard.products-page.update-product',
  );

  const product: Product = await getProductDetailsService(
    params.id,
  );

  return (
    <div className="w-4/5 p-6">
      <h2 className="mb-6 flex items-center gap-1 text-2xl font-semibold text-zinc-800">
        <span className="shrink-0">{t('header')}:</span>
        <span className="truncate" title={product.title}>
          {product.title}
        </span>
      </h2>

      <div className="mb-20 rounded-2xl bg-white">
        <Suspense fallback={<UpdateProductFormSkeleton />}>
          <UpdateProductForm product={product} />
        </Suspense>
      </div>
    </div>
  );
}
