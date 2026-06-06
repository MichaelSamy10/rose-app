import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Rating from '../rating/rating';
import { Product } from '@/lib/types/product';
import { cn } from '@/lib/utils/tailwind-merge';
import AddToWishlistBtn from '@/components/shared/add-to-wishlist-btn';
import { Link } from '@/i18n/navigation';

type ProductItemPropsType = {
  divCustomClasses?: string;
  imgCustomClasses?: string;
  href: string;
} & Pick<
  Product,
  | '_id'
  | 'imgCover'
  | 'title'
  | 'price'
  | 'priceAfterDiscount'
  | 'rateAvg'
>;

export default function ProductItem({
  imgCover,
  price,
  priceAfterDiscount,
  rateAvg,
  title,
  divCustomClasses,
  imgCustomClasses,
  href,
  _id,
}: ProductItemPropsType) {
  return (
    <>
      <div
        className={cn(
          'relative z-10 w-full rounded-xl',
          divCustomClasses,
        )}
      >
        {/* Add To Wishlist Button */}
        <AddToWishlistBtn productId={_id} />

        {/* Product Image */}
        <div
          className={cn(
            'relative mb-4 h-64 overflow-hidden rounded-xl',
            imgCustomClasses,
          )}
        >
          <Image
            src={imgCover}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Summary */}
        <Link href={href} className="content">
          <div>
            <h2 className="h-10 text-start text-lg font-semibold text-maroon-700 dark:text-pink-200">
              {title.length > 30
                ? `${title.slice(0, 30)}...`
                : title}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Rating rating={rateAvg} />
              </div>
              <p className="flex items-center justify-center gap-3 text-lg font-semibold text-maroon-700 dark:text-pink-200">
                {priceAfterDiscount}EGP
                <del className="text-sm text-zinc-400 dark:text-zinc-500">
                  {price}EGP
                </del>
              </p>
            </div>
            <Button className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-maroon-600 p-2 text-maroon-50 dark:bg-maroon-500">
              <ShoppingCart className="size-7" />
            </Button>
          </div>
        </Link>

        {/* Badge */}
        <div className="utl: absolute right-2.5 top-2.5 flex h-4 w-11 items-center justify-center rounded-lg bg-zinc-100 rtl:left-2.5 rtl:right-auto">
          <span className="text-zinc-700">New</span>
        </div>
      </div>
    </>
  );
}
