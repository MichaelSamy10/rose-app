import { cn } from '@/lib/utils/tailwind-merge';
import { DashboardProducts } from '@/lib/types/dashboard-products';
import {
  getFormatter,
  getLocale,
  getTranslations,
} from 'next-intl/server';

const colors = [
  'bg-gradient-to-r from-[#DFAC16]/25 to-[#DFAC16]/10 ',
  'bg-gradient-to-r from-[#757F95]/25 to-[#757F95]/10 ',
  'bg-gradient-to-r from-[#914400]/25 to-[#914400]/10 ',
];

export default async function TopSellingCard() {
  const locale = await getLocale();

  // ^ Translations
  const t = await getTranslations('pages.dashboard');
  const format = await getFormatter({ locale });

  // ^ fetch data
  const response = await fetch(
    `${process.env.API_URL}/products?sort=-sold`,
  );
  const data: DashboardProducts = await response.json();

  return (
    <>
      {data?.products?.map((product, index) => (
        <div
          key={product._id}
          className={cn(
            'mb-2.5 flex items-center justify-between rounded-md px-2.5 py-1.5',
            colors[index] || 'bg-zinc-100',
          )}
        >
          <div className="flex items-center gap-2">
            <h3 className="max-w-[220px] truncate text-xl font-semibold capitalize text-zinc-800">
              {product.title}
            </h3>
            <span className="text-lg capitalize text-zinc-800">
              (
              {format.number(product.price, {
                style: 'currency',
                currency: 'EGP',
                maximumFractionDigits: 0,
              })}
              )
            </span>
          </div>
          <span className="font-bold">
            {product.sold} {t('sales')}
          </span>
        </div>
      ))}
    </>
  );
}
